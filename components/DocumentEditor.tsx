import React from 'react';
import { DownloadIcon } from './Icon';

interface DocumentEditorProps {
  content: string;
  onContentChange: (newContent: string) => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ content, onContentChange }) => {
  const handleExport = () => {
    // Create a blob from the document content
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    
    // Create a link element
    const link = document.createElement('a');
    
    // Create a URL for the blob and set it as the href of the link
    link.href = URL.createObjectURL(blob);
    
    // Set the download attribute with a filename
    link.setAttribute('download', 'document.md');
    
    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div>
            <h2 className="text-lg font-semibold text-slate-200">Document Editor</h2>
            <p className="text-sm text-slate-400">Your generated document appears here. You can also edit it directly.</p>
        </div>
        <button
          onClick={handleExport}
          title="Export as Markdown (.md)"
          aria-label="Export document as Markdown"
          className="p-2 text-slate-400 rounded-md hover:bg-slate-700 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors duration-200"
        >
          <DownloadIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-full p-4 bg-transparent text-slate-200 resize-none focus:outline-none placeholder:text-slate-500 leading-relaxed font-mono text-sm"
          placeholder="Your document will be generated here..."
        />
      </div>
    </div>
  );
};
