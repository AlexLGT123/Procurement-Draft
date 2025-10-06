
import React, { lazy, Suspense } from 'react';
import { Header } from './Header';
import { ChatInterface } from './ChatInterface';
import { DocumentEditor } from './DocumentEditor';
import type { ChatMessage, HistoryEntry } from '../types';
import { useResizablePanels } from '../hooks/useResizablePanels';

const HistoryLogModal = lazy(() => import('./HistoryLogModal').then(module => ({ default: module.HistoryLogModal })));

interface EditorViewProps {
    documentContent: string;
    documentTitle: string;
    chatHistory: ChatMessage[];
    saveStatus: 'idle' | 'saving' | 'saved';
    isLoading: boolean;
    hasUnrefinedEdits: boolean;
    error: string | null;
    loadingMessage: string;
    isHistoryOpen: boolean;
    history: HistoryEntry[];
    isGuidedMode: boolean;
    onContentChange: (newContent: string) => void;
    onSendMessage: (message: string) => void;
    onRefineDocument: () => void;
    onDismissRefinement: () => void;
    onShowTemplates: () => void;
    onExportDOCX: () => void;
    onShowHistory: () => void;
    onSaveDraft: () => void;
    onCloseHistory: () => void;
    onRestoreFromHistory: (entry: HistoryEntry) => void;
    onToggleGuidedMode: () => void;
    onClearChat: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
    documentContent,
    documentTitle,
    chatHistory,
    saveStatus,
    isLoading,
    hasUnrefinedEdits,
    error,
    loadingMessage,
    isHistoryOpen,
    history,
    isGuidedMode,
    onContentChange,
    onSendMessage,
    onRefineDocument,
    onDismissRefinement,
    onShowTemplates,
    onExportDOCX,
    onShowHistory,
    onSaveDraft,
    onCloseHistory,
    onRestoreFromHistory,
    onToggleGuidedMode,
    onClearChat
}) => {
    const { panelSize, handleMouseDown } = useResizablePanels(50);

    return (
        <div className="flex flex-col h-screen font-sans bg-[#0D0D0D] text-[#F5F5F5]">
            <Header
                documentTitle={documentTitle}
                onShowTemplates={onShowTemplates}
                onExportDOCX={onExportDOCX}
                saveStatus={saveStatus}
                onShowHistory={onShowHistory}
                onSaveDraft={onSaveDraft}
            />
            <main className="flex-grow flex p-4 overflow-hidden gap-4">
                <div 
                    className="flex flex-col h-full bg-[#1A1A1A] rounded-lg border border-[#262626] overflow-hidden min-w-[300px]"
                    style={{ flexBasis: `${panelSize}%`, flexShrink: 0 }}
                >
                    <ChatInterface
                        messages={chatHistory}
                        onSendMessage={onSendMessage}
                        isLoading={isLoading}
                        error={error}
                        loadingMessage={loadingMessage}
                        isGuidedMode={isGuidedMode}
                        onToggleGuidedMode={onToggleGuidedMode}
                        onClearChat={onClearChat}
                    />
                </div>

                <div 
                    className="w-2 h-full cursor-col-resize flex items-center justify-center group flex-shrink-0 -mx-1"
                    onMouseDown={handleMouseDown}
                >
                     <div className="w-1 h-12 bg-[#262626] group-hover:bg-[#7F56D9] transition-colors rounded-full"></div>
                </div>

                <div className="flex-grow flex flex-col h-full bg-[#1A1A1A] rounded-lg border border-[#262626] overflow-hidden min-w-[300px]">
                    <DocumentEditor
                        content={documentContent}
                        onContentChange={onContentChange}
                        hasUnrefinedEdits={hasUnrefinedEdits}
                        isRefining={isLoading && !!loadingMessage.includes( 'Refining' )}
                        onRefineDocument={onRefineDocument}
                        onDismissRefinement={onDismissRefinement}
                        loadingMessage={loadingMessage}
                    />
                </div>
            </main>
            <Suspense fallback={null}>
                <HistoryLogModal
                    isOpen={isHistoryOpen}
                    onClose={onCloseHistory}
                    history={history}
                    onRestore={onRestoreFromHistory}
                />
            </Suspense>
        </div>
    );
};

export default EditorView;
