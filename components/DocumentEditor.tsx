import React, { useRef, useEffect, memo, useState, useCallback } from 'react';
import { SparkleIcon, CloseIcon, SpinnerIcon } from './Icon';
import { useTimer } from '../hooks/useTimer';
import { EditorToolbar, ActiveFormats } from './EditorToolbar';
import { useTranslation } from '../hooks/useTranslation';

interface DocumentEditorProps {
  content: string;
  onContentChange: (newContent: string) => void;
  hasUnrefinedEdits: boolean;
  isRefining: boolean;
  onRefineDocument: () => void;
  onDismissRefinement: () => void;
  loadingMessage?: string;
}

const DocumentEditorComponent: React.FC<DocumentEditorProps> = ({ 
    content, 
    onContentChange,
    hasUnrefinedEdits,
    isRefining,
    onRefineDocument,
    onDismissRefinement,
    loadingMessage
}) => {
  const { t } = useTranslation();
  const editorRef = useRef<HTMLDivElement>(null);
  const elapsedTime = useTimer(isRefining);

  const [activeFormats, setActiveFormats] = useState<ActiveFormats>({
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      ul: false,
      ol: false,
      blockquote: false,
      blockType: 'p',
  });
  
  // This effect syncs the editor's display when the content prop changes
  // from an external source (like an AI update or history restore).
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const updateFormatState = useCallback(() => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const getParentTag = (node: Node | null): string => {
          let currentNode = node;
          while (currentNode) {
              if (currentNode.nodeName.match(/^(P|H1|H2|H3|BLOCKQUOTE|LI)$/)) {
                  // For LI, check its parent (UL or OL)
                  if (currentNode.nodeName === 'LI') {
                      return currentNode.parentElement?.nodeName.toLowerCase() || 'li';
                  }
                  return currentNode.nodeName.toLowerCase();
              }
              if (currentNode === editorRef.current) break;
              currentNode = currentNode.parentElement;
          }
          return 'p';
      };

      const blockType = getParentTag(selection.getRangeAt(0).startContainer);
      
      setActiveFormats({
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          underline: document.queryCommandState('underline'),
          strikethrough: document.queryCommandState('strikethrough'),
          ul: document.queryCommandState('insertUnorderedList'),
          ol: document.queryCommandState('insertOrderedList'),
          blockquote: blockType === 'blockquote',
          blockType: blockType.replace(/li|ul|ol/, 'p'), // Reset to paragraph for list items in dropdown
      });
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleSelectionChange = () => {
        if (document.activeElement === editor) {
            updateFormatState();
        }
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    editor.addEventListener('keyup', updateFormatState);
    editor.addEventListener('mouseup', updateFormatState);
    editor.addEventListener('focus', updateFormatState);


    return () => {
        document.removeEventListener('selectionchange', handleSelectionChange);
        editor.removeEventListener('keyup', updateFormatState);
        editor.removeEventListener('mouseup', updateFormatState);
        editor.removeEventListener('focus', updateFormatState);
    };
  }, [updateFormatState]);

  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    onContentChange(newContent);
  };

  return (
    <div className="flex flex-col h-full relative">
      <style>{`
        .prose-custom h1 {
          font-size: 1.875rem; /* 30px */
          line-height: 2.25rem; /* 36px */
          font-weight: 700;
          margin-bottom: 1em;
          margin-top: 1.5em;
        }
        .prose-custom h2 {
          font-size: 1.5rem; /* 24px */
          line-height: 2rem; /* 32px */
          font-weight: 600;
          margin-bottom: 0.8em;
          margin-top: 1.2em;
        }
        .prose-custom h3 {
          font-size: 1.25rem; /* 20px */
          line-height: 1.75rem; /* 28px */
          font-weight: 600;
          margin-bottom: 0.6em;
          margin-top: 1em;
        }
        .prose-custom p {
          margin-bottom: 1rem;
        }
        .prose-custom ul, .prose-custom ol {
            margin-bottom: 1rem;
            padding-left: 1.5em;
        }
        .prose-custom li {
            margin-bottom: 0.5rem;
        }
        .prose-custom blockquote {
            border-left: 3px solid #7F56D9;
            padding-left: 1rem;
            margin-left: 0;
            font-style: italic;
            color: #A3A3A3;
        }
        .prose-custom .placeholder-highlight {
          background-color: rgba(220, 38, 38, 0.15);
          color: #f87171;
          border-bottom: 1px dashed #ef4444;
          border-radius: 3px;
          padding: 1px 3px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .prose-custom .placeholder-highlight:hover {
            background-color: rgba(220, 38, 38, 0.3);
        }
      `}</style>
      <div className="p-4 border-b border-[#262626] flex-shrink-0">
        <div className="flex items-start justify-between">
            <div>
                <h2 className="text-lg font-semibold text-[#F5F5F5]">{t('editor.title')}</h2>
                <p className="text-sm text-[#A3A3A3]">{t('editor.subtitle')}</p>
            </div>
        </div>
      </div>
       <div className="flex-grow relative flex flex-col overflow-y-auto no-scrollbar">
            <EditorToolbar activeFormats={activeFormats} editorRef={editorRef} />
            <div 
              ref={editorRef}
              contentEditable={true}
              onInput={handleInput}
              suppressContentEditableWarning={true}
              className="w-full h-full p-6 bg-[#1A1A1A] prose-custom prose-invert text-[#F5F5F5] leading-relaxed focus:outline-none flex-grow" 
              style={{ minHeight: '100%' }}
            />
       </div>
      {hasUnrefinedEdits && (
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto bg-[#262626] border border-[#333333] rounded-lg shadow-2xl p-2 flex items-center gap-3 animate-fade-in-up">
            <style>
                {`
                    @keyframes fade-in-up {
                        from { opacity: 0; transform: translate(-50%, 10px); }
                        to { opacity: 1; transform: translate(-50%, 0); }
                    }
                    .animate-fade-in-up {
                        animation: fade-in-up 0.3s ease-out forwards;
                    }
                `}
            </style>
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#7F56D9]/10 flex items-center justify-center border border-[#7F56D9]/20">
                <SparkleIcon className="h-4 w-4 text-[#7F56D9]" />
            </div>
            <div>
                <p className="text-sm font-semibold text-[#F5F5F5]">{t('editor.refine.aiAssistant')}</p>
                <p className="text-xs text-[#A3A3A3]">{t('editor.refine.prompt')}</p>
            </div>
            <button
                onClick={onRefineDocument}
                disabled={isRefining}
                className="ml-auto bg-[#7F56D9] hover:bg-[#6941C6] disabled:bg-[#333333] disabled:cursor-not-allowed text-white text-sm font-semibold py-1 px-3 rounded-md flex items-center justify-center transition-colors duration-200 whitespace-nowrap min-w-[170px]"
            >
                {isRefining ? (
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="flex items-center justify-center gap-2">
                            <SpinnerIcon className="h-4 w-4 animate-spin"/>
                            <span>{loadingMessage ? t('editor.refine.refining') : t('common.thinking')}</span>
                            <span className="tabular-nums">{t('common.runningFor', { seconds: elapsedTime })}</span>
                        </div>
                        {loadingMessage && <span className="text-xs mt-1 font-normal text-[#A3A3A3]">{loadingMessage}</span>}
                    </div>
                ) : t('editor.refine.button')}
            </button>
            <button
                onClick={onDismissRefinement}
                className="text-[#A3A3A3] hover:text-white transition-colors duration-200 p-1"
                aria-label={t('editor.refine.dismissAria')}
            >
                <CloseIcon className="w-4 h-4" />
            </button>
         </div>
      )}
    </div>
  );
};

export const DocumentEditor = memo(DocumentEditorComponent);