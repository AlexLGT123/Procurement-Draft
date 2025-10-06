
import React, { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { TemplateLibrary } from './components/TemplateLibrary';
import type { ChatMessage, Template, HistoryEntry } from './types';
import { MessageSender, HistoryEventType } from './types';
import { generateDocumentUpdate, refineDocumentSection, generateGuidingQuestions } from './services/geminiService';
import { useTranslation } from './hooks/useTranslation';
import { LOCAL_STORAGE_KEY, HISTORY_STORAGE_KEY } from './constants';
import { ConfirmationModal } from './components/ConfirmationModal';

const EditorView = lazy(() => import('./components/EditorView'));


declare var htmlDocx: any;
declare var saveAs: any;
declare var mammoth: any;
declare var DOMPurify: any;

type AppView = 'templates' | 'editor';
type SaveStatus = 'idle' | 'saving' | 'saved';
interface ConfirmationState {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const getDocumentTitle = (htmlContent: string): string => {
    if (!htmlContent) return 'Untitled Document';
    const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match && h1Match[1]) {
        const tempEl = document.createElement('span');
        tempEl.innerHTML = h1Match[1];
        const decodedTitle = tempEl.textContent || '';
        if (decodedTitle.trim()) return decodedTitle.trim();
    }
    const textContent = htmlContent.replace(/<[^>]+>/g, '').trim();
    const firstLine = textContent.split('\n')[0];
    return firstLine || 'Untitled Document';
};

const getLoadingMessageFromPrompt = (prompt: string): string => {
    const p = prompt.toLowerCase();
    const actions: { [key: string]: string } = { add: 'Adding', create: 'Creating', write: 'Writing', insert: 'Inserting', generate: 'Generating', draft: 'Drafting', summarize: 'Summarizing', update: 'Updating', change: 'Changing', rephrase: 'Rephrasing', improve: 'Improving' };
    const subjects: { [key: string]: string } = { section: 'section', paragraph: 'paragraph', conclusion: 'conclusion', introduction: 'introduction', summary: 'summary', list: 'list', table: 'table', clause: 'clause', title: 'title', heading: 'heading' };
    let foundAction = '';
    for (const key in actions) if (p.includes(key)) { foundAction = actions[key]; break; }
    let foundSubject = '';
    for (const key in subjects) if (p.includes(key)) { foundSubject = subjects[key]; break; }
    if (foundAction && foundSubject) return `${foundAction} ${foundSubject}...`;
    if (foundAction) return `${foundAction} content...`;
    return 'Processing request...';
};

const highlightPlaceholders = (html: string, tooltipText: string): string => {
  return html.replace(/\[([^\[\]]+)\]/g, (match) => {
    return `<span class="placeholder-highlight" title="${tooltipText}">${match}</span>`;
  });
};


const App: React.FC = () => {
    const { t, language } = useTranslation();
    const [view, setView] = useState<AppView>('templates');
    const [documentContent, setDocumentContent] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
    const [hasUnrefinedEdits, setHasUnrefinedEdits] = useState(false);
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isGuidedMode, setIsGuidedMode] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null);

    const saveTimeoutRef = useRef<number | null>(null);

    const addHistoryEntry = useCallback((type: HistoryEventType, details?: string) => {
        setHistory(prev => {
            const newEntry: HistoryEntry = { id: `${type}-${Date.now()}`, type, timestamp: Date.now(), documentTitle: getDocumentTitle(documentContent), documentContent, details };
            if (type === HistoryEventType.DRAFT_SAVED && details !== 'Manual Save') {
                const lastEntry = prev[0];
                if (lastEntry && lastEntry.type === HistoryEventType.DRAFT_SAVED && lastEntry.documentContent === newEntry.documentContent) return prev;
            }
            const updatedHistory = [newEntry, ...prev].slice(0, 50);
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
            return updatedHistory;
        });
    }, [documentContent]);

    const handleSaveDraft = useCallback((isAutoSave = false) => {
        setSaveStatus('saving');
        localStorage.setItem(LOCAL_STORAGE_KEY, documentContent);
        addHistoryEntry(HistoryEventType.DRAFT_SAVED, isAutoSave ? 'Auto Save' : 'Manual Save');
        if (!isAutoSave) {
            setHasUnrefinedEdits(false);
        }
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 500);
    }, [addHistoryEntry, documentContent]);

    useEffect(() => {
        const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedContent) {
            setDocumentContent(savedContent);
            setChatHistory([{ id: 'bot-welcome-back', sender: MessageSender.BOT, text: t('chat.welcomeBack') }]);
            setView('editor');
        } else {
            setChatHistory([{ id: 'bot-initial-welcome', sender: MessageSender.BOT, text: t('chat.initialWelcome') }]);
        }
    }, [t]);

    const handleContentChange = useCallback((newContent: string) => {
        setDocumentContent(newContent);
        setHasUnrefinedEdits(true);
    }, []);

    useEffect(() => {
        if (hasUnrefinedEdits) {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
            saveTimeoutRef.current = window.setTimeout(() => handleSaveDraft(true), 3000);
        }
        return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); };
    }, [documentContent, hasUnrefinedEdits, handleSaveDraft]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                if (view === 'editor') handleSaveDraft(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSaveDraft, view]);

    const handleSendMessage = useCallback(async (message: string) => {
        const userMessage: ChatMessage = { id: `user-${Date.now()}`, sender: MessageSender.USER, text: message };
        setChatHistory(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);
        setLoadingMessage(getLoadingMessageFromPrompt(message));
        try {
            const updatedHtml = await generateDocumentUpdate(documentContent, message, language);
            const sanitizedHtml = DOMPurify.sanitize(updatedHtml);
            setDocumentContent(sanitizedHtml);
            const botMessage: ChatMessage = { id: `bot-${Date.now()}`, sender: MessageSender.BOT, text: t('chat.documentUpdated') };
            setChatHistory(prev => [...prev, botMessage]);
            setHasUnrefinedEdits(false);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            setError(t('chat.errorOccurred', { errorMessage }));
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [documentContent, language, t]);
    
    const handleRefineDocument = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setLoadingMessage(t('editor.refine.refining'));
        try {
            const updatedHtml = await refineDocumentSection(documentContent, language);
            const sanitizedHtml = DOMPurify.sanitize(updatedHtml);
            setDocumentContent(sanitizedHtml);
            const botMessage: ChatMessage = { id: `bot-refine-${Date.now()}`, sender: MessageSender.BOT, text: t('chat.documentRefined') };
            setChatHistory(prev => [...prev, botMessage]);
            setHasUnrefinedEdits(false);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            setError(t('chat.errorOccurred', { errorMessage }));
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [documentContent, language, t]);

    const handleToggleGuidedMode = useCallback(() => {
        setIsGuidedMode(prev => {
            const newState = !prev;
            if (newState) {
                const botMessage: ChatMessage = { id: `bot-${Date.now()}`, sender: MessageSender.BOT, text: t('chat.guidedMode.activated') };
                setChatHistory(prevChat => [...prevChat, botMessage]);
            }
            return newState;
        });
    }, [t]);

    useEffect(() => {
        if (isGuidedMode && chatHistory.length > 0 && chatHistory[chatHistory.length - 1].sender === MessageSender.USER) {
            const fetchGuidingQuestion = async () => {
                try {
                    const questions = await generateGuidingQuestions(documentContent, chatHistory, language);
                    if (questions.length > 0) {
                        const botMessage: ChatMessage = { id: `bot-guide-${Date.now()}`, sender: MessageSender.BOT, text: questions[0] };
                        setChatHistory(prev => [...prev, botMessage]);
                    }
                } catch (e) {
                    const botMessage: ChatMessage = { id: `bot-guide-error-${Date.now()}`, sender: MessageSender.BOT, text: t('chat.guidedMode.error') };
                    setChatHistory(prev => [...prev, botMessage]);
                }
            };
            fetchGuidingQuestion();
        }
    }, [isGuidedMode, chatHistory, documentContent, language, t]);

    const handleSelectTemplate = useCallback((template: Template) => {
        const placeholderContent = highlightPlaceholders(template.content, t('editor.placeholderTooltip'));
        setDocumentContent(placeholderContent);
        setChatHistory([{ id: 'bot-template-loaded', sender: MessageSender.BOT, text: t('chat.templateLoaded', { templateName: t(template.name) }) }]);
        addHistoryEntry(HistoryEventType.TEMPLATE_LOADED, template.key);
        setView('editor');
    }, [t, addHistoryEntry]);

    const handleStartBlank = useCallback(() => {
        setDocumentContent(`<h1>${t('editor.newDocumentTitle')}</h1><p>${t('editor.startWriting')}</p>`);
        setChatHistory([{ id: 'bot-start-blank', sender: MessageSender.BOT, text: t('chat.startedBlank') }]);
        addHistoryEntry(HistoryEventType.STARTED_BLANK);
        setView('editor');
    }, [t, addHistoryEntry]);
    
    const handleFileImport = useCallback(async (file: File) => {
        setIsImporting(true);
        setError(null);
        try {
            let htmlContent: string;
            if (file.name.endsWith('.docx')) {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                htmlContent = result.value;
            } else if (file.name.endsWith('.doc')) {
                setError(t('errors.docNotSupported'));
                setIsImporting(false);
                return;
            } else if (file.name.endsWith('.md') || file.name.endsWith('.txt')) {
                htmlContent = await file.text();
            } else {
                 setError(t('errors.unsupportedFileType'));
                 setIsImporting(false);
                 return;
            }
            setDocumentContent(DOMPurify.sanitize(htmlContent));
            setChatHistory([{ id: 'bot-imported', sender: MessageSender.BOT, text: t('chat.importedFile', { fileName: file.name }) }]);
            addHistoryEntry(HistoryEventType.IMPORTED, file.name);
            setView('editor');
        } catch (e) {
             setError(t('errors.fileReadFailed'));
        } finally {
            setIsImporting(false);
        }
    }, [t, addHistoryEntry]);

    const handleExportDOCX = useCallback(() => {
        const title = getDocumentTitle(documentContent);
        const fileName = `${title}.docx`;
        try {
            const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${documentContent}</body></html>`;
            const converted = htmlDocx.asBlob(content);
            saveAs(converted, fileName);
            addHistoryEntry(HistoryEventType.EXPORTED_DOCX, title);
        } catch (e) {
            setError(t('errors.exportFailed'));
        }
    }, [documentContent, t, addHistoryEntry]);

    const handleRestoreFromHistory = useCallback((entry: HistoryEntry) => {
        if (entry.documentContent) {
            setDocumentContent(entry.documentContent);
            setChatHistory(prev => [...prev, { id: `bot-restored-${Date.now()}`, sender: MessageSender.BOT, text: t('chat.restoredVersion', { documentTitle: entry.documentTitle, date: new Date(entry.timestamp).toLocaleString(language) }) }]);
            addHistoryEntry(HistoryEventType.RESTORED, entry.documentTitle);
            setIsHistoryOpen(false);
        } else {
            setError(t('errors.restoreNoContent'));
        }
    }, [t, language, addHistoryEntry]);

    const handleNavigateToTemplates = useCallback(() => {
        if (hasUnrefinedEdits) {
            setConfirmation({
                title: t('confirmation.title'),
                message: t('confirmation.message'),
                confirmText: t('confirmation.confirmLeave'),
                onConfirm: () => {
                    setView('templates');
                    setConfirmation(null);
                },
                onCancel: () => setConfirmation(null),
            });
        } else {
            setView('templates');
        }
    }, [hasUnrefinedEdits, t]);

    const handleClearChat = useCallback(() => {
        setChatHistory(prev => prev.slice(0, 1));
    }, []);

    return (
        <div className="flex flex-col h-screen font-sans bg-[#0D0D0D] text-[#F5F5F5]">
            {view === 'templates' ? (
                <TemplateLibrary 
                    onSelectTemplate={handleSelectTemplate} 
                    onStartBlank={handleStartBlank}
                    onFileImport={handleFileImport}
                    isImporting={isImporting}
                />
            ) : (
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Editor...</div>}>
                    <EditorView
                        documentContent={documentContent}
                        documentTitle={getDocumentTitle(documentContent)}
                        chatHistory={chatHistory}
                        saveStatus={saveStatus}
                        isLoading={isLoading}
                        hasUnrefinedEdits={!isLoading && hasUnrefinedEdits}
                        error={error}
                        loadingMessage={loadingMessage}
                        isHistoryOpen={isHistoryOpen}
                        history={history}
                        isGuidedMode={isGuidedMode}
                        onContentChange={handleContentChange}
                        onSendMessage={handleSendMessage}
                        onRefineDocument={handleRefineDocument}
                        onDismissRefinement={() => setHasUnrefinedEdits(false)}
                        onShowTemplates={handleNavigateToTemplates}
                        onExportDOCX={handleExportDOCX}
                        onShowHistory={() => setIsHistoryOpen(true)}
                        onSaveDraft={() => handleSaveDraft(false)}
                        onCloseHistory={() => setIsHistoryOpen(false)}
                        onRestoreFromHistory={handleRestoreFromHistory}
                        onToggleGuidedMode={handleToggleGuidedMode}
                        onClearChat={handleClearChat}
                    />
                </Suspense>
            )}
            <ConfirmationModal 
                isOpen={!!confirmation}
                title={confirmation?.title ?? ''}
                message={confirmation?.message ?? ''}
                confirmText={confirmation?.confirmText}
                onConfirm={() => confirmation?.onConfirm()}
                onCancel={() => confirmation?.onCancel()}
            />
        </div>
    );
};

export default App;
