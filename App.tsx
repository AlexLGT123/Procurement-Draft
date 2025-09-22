
import React, { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { DocumentEditor } from './components/DocumentEditor';
import { TemplateLibrary } from './components/TemplateLibrary';
import type { ChatMessage, Template, HistoryEntry } from './types';
import { MessageSender, HistoryEventType } from './types';
import { generateDocumentUpdate, refineDocumentSection } from './services/geminiService';
import { TEMPLATES } from './components/templates';

// Lazy load the modal component
const HistoryLogModal = lazy(() => import('./components/HistoryLogModal').then(module => ({ default: module.HistoryLogModal })));


// Declarations for CDN libraries
declare var htmlDocx: any;
declare var saveAs: any;
declare var mammoth: any;
declare var DOMPurify: any;

type AppView = 'templates' | 'editor';
type SaveStatus = 'idle' | 'saving' | 'saved';

const LOCAL_STORAGE_KEY = 'procurementdraft_autosave';
const HISTORY_STORAGE_KEY = 'procurementdraft_history';

const getDocumentTitle = (htmlContent: string): string => {
  if (!htmlContent) return 'Untitled Document';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  const firstH1 = tempDiv.querySelector('h1');
  if (firstH1 && firstH1.textContent) {
      return firstH1.textContent.trim();
  }
  const firstLine = (tempDiv.textContent || '').trim().split('\n')[0];
  return firstLine || 'Untitled Document';
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('templates');
  const [documentContent, setDocumentContent] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [hasUnrefinedEdits, setHasUnrefinedEdits] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'initial-bot-message',
      sender: MessageSender.BOT,
      text: "Welcome to ProcurementDraft IA. Please select a template or start with a blank document.",
    },
  ]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const isInitialMount = useRef(true);
  
  const updateDocument = useCallback((content: string, fromUser: boolean) => {
    setDocumentContent(content);
    setSaveStatus('saving');
    if (fromUser) {
        setHasUnrefinedEdits(true);
    }
  }, []);

  const logHistoryEvent = useCallback((type: HistoryEventType, docContent: string, details?: string) => {
    const newEntry: HistoryEntry = {
        id: `hist-${Date.now()}`,
        type,
        timestamp: Date.now(),
        documentTitle: getDocumentTitle(docContent),
        details,
    };

    setHistory(prevHistory => {
        const updatedHistory = [newEntry, ...prevHistory].slice(0, 50); // Keep latest 50
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
        return updatedHistory;
    });
  }, []);

  // Load content and history from localStorage on initial render
  useEffect(() => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedContent && savedContent.trim() !== '') {
      setDocumentContent(DOMPurify.sanitize(savedContent));
      setChatHistory([
        {
          id: `bot-autosave-${Date.now()}`,
          sender: MessageSender.BOT,
          text: "Welcome back! I've loaded your last saved session.",
        },
      ]);
      setView('editor');
    }

    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
        try {
            setHistory(JSON.parse(savedHistory));
        } catch (e) {
            console.error("Failed to parse history from localStorage", e);
            setHistory([]);
        }
    }
  }, []); // Run only on mount

  // Auto-save document content to localStorage
  useEffect(() => {
    if (view === 'editor') {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (saveStatus === 'saving') {
            const handler = setTimeout(() => {
                localStorage.setItem(LOCAL_STORAGE_KEY, documentContent);
                setSaveStatus('saved');
                
                const lastSave = history.find(h => h.type === HistoryEventType.DRAFT_SAVED);
                if (!lastSave || (Date.now() - lastSave.timestamp > 5 * 60 * 1000)) { // 5 minutes
                    logHistoryEvent(HistoryEventType.DRAFT_SAVED, documentContent, 'Auto-save');
                }
            }, 1500); // Debounce time

            return () => clearTimeout(handler);
        }
    }
  }, [documentContent, saveStatus, view, logHistoryEvent, history]);

  // Effect to revert "saved" status to "idle" for a clean UI
  useEffect(() => {
    if (saveStatus === 'saved') {
        const timer = setTimeout(() => {
            setSaveStatus('idle');
        }, 2000);
        return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  // Effect to clear AI highlight tags after 10 seconds
  useEffect(() => {
    if (documentContent.includes('<mark')) {
      const timer = setTimeout(() => {
        setDocumentContent(currentContent => currentContent.replace(/<mark[^>]*>|<\/mark>/g, ''));
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [documentContent]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: MessageSender.USER,
      text: message,
    };
    
    setHasUnrefinedEdits(false);
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // The AI will now return the document with <mark> tags around changes
      const updatedDocument = await generateDocumentUpdate(documentContent.replace(/<mark[^>]*>|<\/mark>/g, ''), message);
      updateDocument(DOMPurify.sanitize(updatedDocument), false);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: MessageSender.BOT,
        text: "I've updated the document. Changes are highlighted.",
      };
      setChatHistory(prev => [...prev, botMessage]);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Sorry, I couldn't process that. ${errorMessage}`);
      const botErrorMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        sender: MessageSender.BOT,
        text: `An error occurred: ${errorMessage}`,
      };
      setChatHistory(prev => [...prev, botErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, documentContent, updateDocument]);

  const handleSelectTemplate = (template: Template) => {
    updateDocument(DOMPurify.sanitize(template.content), false);
    logHistoryEvent(HistoryEventType.TEMPLATE_LOADED, template.content, template.name);
    setHasUnrefinedEdits(false);
    setChatHistory([
      {
        id: `bot-template-${Date.now()}`,
        sender: MessageSender.BOT,
        text: `I've loaded the ${template.name} template. Use the chat to build your document.`,
      },
    ]);
    setView('editor');
  };
  
  const handleStartBlank = () => {
    const blankContent = `<h1>New Document</h1><p>Start writing here...</p>`;
    updateDocument(DOMPurify.sanitize(blankContent), false);
    logHistoryEvent(HistoryEventType.STARTED_BLANK, blankContent);
    setHasUnrefinedEdits(false);
    setChatHistory([
      {
        id: `bot-blank-${Date.now()}`,
        sender: MessageSender.BOT,
        text: "Starting with a blank slate. What should we create first?",
      },
    ]);
    setView('editor');
  };

  const handleFileImport = (file: File) => {
    const reader = new FileReader();
    reader.onloadstart = () => setIsImporting(true);
    reader.onerror = () => {
        setError("Failed to read the file.");
        setIsImporting(false);
    };

    const processImportSuccess = (html: string) => {
      updateDocument(DOMPurify.sanitize(html), false);
      logHistoryEvent(HistoryEventType.IMPORTED, html, file.name);
      setHasUnrefinedEdits(false);
      setChatHistory([
        {
          id: `bot-import-${Date.now()}`,
          sender: MessageSender.BOT,
          text: `I've imported and converted ${file.name}. Let's get to work!`,
        },
      ]);
      setView('editor');
    };
    
    const cleanFileName = file.name.replace(/\.[^/.]+$/, "");
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.md') || fileName.endsWith('.txt')) {
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const html = `<h1>${cleanFileName}</h1><p>${text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
        processImportSuccess(html);
        setIsImporting(false);
      };
      reader.readAsText(file);
    } else if (fileName.endsWith('.docx')) {
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          .then((result: { value: string; messages: any[] }) => {
            const html = `<h1>${cleanFileName}</h1>${result.value}`;
            processImportSuccess(html);
          })
          .catch((error: any) => {
            console.error("Error converting docx to html", error);
            setError(`Failed to convert ${file.name}. The file might be corrupted.`);
          })
          .finally(() => {
            setIsImporting(false);
          });
      };
      reader.readAsArrayBuffer(file);
    } else if (fileName.endsWith('.doc')) {
        alert("Sorry, .doc files are not supported. Please save the file as a .docx and try again.");
        setIsImporting(false);
    } else {
      alert("Sorry, only .md, .txt, and .docx files can be imported at this time.");
      setIsImporting(false);
    }
  };

  const handleContentChange = useCallback((newContent: string) => {
    updateDocument(newContent, true);
  }, [updateDocument]);

  const handleRefineDocument = useCallback(async () => {
    if (!documentContent.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setHasUnrefinedEdits(false);

    try {
      const updatedDocument = await refineDocumentSection(documentContent);
      updateDocument(DOMPurify.sanitize(updatedDocument), false);

      const botMessage: ChatMessage = {
        id: `bot-refine-${Date.now()}`,
        sender: MessageSender.BOT,
        text: "I've refined your recent edits. The changes are highlighted.",
      };
      setChatHistory(prev => [...prev, botMessage]);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Sorry, I couldn't process that. ${errorMessage}`);
      const botErrorMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        sender: MessageSender.BOT,
        text: `An error occurred: ${errorMessage}`,
      };
      setChatHistory(prev => [...prev, botErrorMessage]);
      setHasUnrefinedEdits(true); // Let user try again
    } finally {
      setIsLoading(false);
    }
  }, [documentContent, isLoading, updateDocument]);

  const handleDismissRefinement = useCallback(() => {
    setHasUnrefinedEdits(false);
  }, []);

  const handleSaveDraft = useCallback(() => {
    setSaveStatus('saving');
    setTimeout(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, documentContent);
        logHistoryEvent(HistoryEventType.DRAFT_SAVED, documentContent, 'Manual Save');
        setSaveStatus('saved');
    }, 300);
  }, [documentContent, logHistoryEvent]);

  const handleExportDOCX = () => {
    if (!documentContent) return;
    logHistoryEvent(HistoryEventType.EXPORTED_DOCX, documentContent);
    const title = getDocumentTitle(documentContent);
    const contentToExport = documentContent.replace(/<mark[^>]*>|<\/mark>/g, '');
    const bodyHtml = contentToExport;
    
    // The html-docx-js library is very particular. It does not handle CSS in a <style> block.
    // We pass a clean HTML structure without it to prevent file corruption.
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          ${bodyHtml}
        </body>
      </html>
    `;

    try {
        const docxBlob = htmlDocx.asBlob(fullHtml);
        saveAs(docxBlob, `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.docx`);
    } catch (error) {
        console.error("Error exporting DOCX:", error);
        setError("Failed to export document as .docx.");
    }
  };
  
  const handleShowTemplates = useCallback(() => setView('templates'), []);

  if (view === 'templates') {
    return <TemplateLibrary onSelectTemplate={handleSelectTemplate} onStartBlank={handleStartBlank} onFileImport={handleFileImport} isImporting={isImporting} />;
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-[#0D0D0D] text-[#F5F5F5]">
      <Header 
        onShowTemplates={handleShowTemplates} 
        onExportDOCX={handleExportDOCX}
        saveStatus={saveStatus}
        onShowHistory={() => setIsHistoryOpen(true)}
        onSaveDraft={handleSaveDraft}
      />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-hidden">
        <div className="flex flex-col h-full bg-[#1A1A1A] rounded-lg border border-[#262626] overflow-hidden min-w-0">
          <ChatInterface
            messages={chatHistory}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <div className="flex flex-col h-full bg-[#1A1A1A] rounded-lg border border-[#262626] overflow-hidden min-w-0">
          <DocumentEditor
            content={documentContent}
            onContentChange={handleContentChange}
            hasUnrefinedEdits={hasUnrefinedEdits}
            isRefining={isLoading}
            onRefineDocument={handleRefineDocument}
            onDismissRefinement={handleDismissRefinement}
          />
        </div>
      </main>
      <Suspense fallback={<div>Loading...</div>}>
        <HistoryLogModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
        />
      </Suspense>
    </div>
  );
};

export default App;