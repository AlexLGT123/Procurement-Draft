import React, { useRef, useEffect, memo } from 'react';
import { SparkleIcon, CloseIcon, SpinnerIcon } from './Icon';
import { useTimer } from '../hooks/useTimer';
import { EditorToolbar } from './EditorToolbar';

interface DocumentEditorProps {
  content: string;
  onContentChange: (newContent: string) => void;
  hasUnrefinedEdits: boolean;
  isRefining: boolean;
  onRefineDocument: () => void;
  onDismissRefinement: () => void;
}

const DocumentEditorComponent: React.FC<DocumentEditorProps> = ({ 
    content, 
    onContentChange,
    hasUnrefinedEdits,
    isRefining,
    onRefineDocument,
    onDismissRefinement
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const elapsedTime = useTimer(isRefining);

  useEffect(() => {
    // Only update the editor's innerHTML if the content has changed from an external source (like AI update)
    // This prevents the cursor from jumping during user input.
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);
  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      const newContent = e.currentTarget.innerHTML;
      onContentChange(newContent);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="p-4 border-b border-[#262626] flex-shrink-0">
        <div className="flex items-start justify-between">
            <div>
                <h2 className="text-lg font-semibold text-[#F5F5F5]">Document Editor</h2>
                <p className="text-sm text-[#A3A3A3]">Edit your document directly. Use the toolbar for formatting.</p>
            </div>
        </div>
      </div>
      <EditorToolbar />
      <div 
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        suppressContentEditableWarning={true}
        className="flex-grow w-full p-4 bg-[#1A1A1A] overflow-y-scroll overflow-x-auto min-h-0 prose prose-invert prose-sm text-[#F5F5F5] leading-relaxed focus:outline-none" 
      />
      {hasUnrefinedEdits && (
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto bg-[#262626] border border-[#333333] rounded-lg shadow-2xl p-3 flex items-center gap-4 animate-fade-in-up">
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
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7F56D9]/10 flex items-center justify-center border border-[#7F56D9]/20">
                <SparkleIcon className="h-5 w-5 text-[#7F56D9]" />
            </div>
            <div>
                <p className="text-sm font-semibold text-[#F5F5F5]">AI Assistant</p>
                <p className="text-xs text-[#A3A3A3]">Refine your changes for clarity and impact?</p>
            </div>
            <button
                onClick={onRefineDocument}
                disabled={isRefining}
                className="ml-auto bg-[#7F56D9] hover:bg-[#6941C6] disabled:bg-[#333333] disabled:cursor-not-allowed text-white text-sm font-semibold py-1.5 px-4 rounded-md flex items-center justify-center transition-colors duration-200 whitespace-nowrap"
            >
                {isRefining ? (
                    <div className="flex items-center justify-center gap-2">
                        <SpinnerIcon className="h-4 w-4 animate-spin"/>
                        <span>Thinking...</span>
                        <span className="tabular-nums">Running for {elapsedTime}s</span>
                    </div>
                ) : 'Refine with AI'}
            </button>
            <button
                onClick={onDismissRefinement}
                className="text-[#A3A3A3] hover:text-white transition-colors duration-200"
                aria-label="Dismiss AI suggestion"
            >
                <CloseIcon className="w-5 h-5" />
            </button>
         </div>
      )}
    </div>
  );
};

export const DocumentEditor = memo(DocumentEditorComponent);