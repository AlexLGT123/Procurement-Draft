
import React, { memo } from 'react';
import { RocketIcon, FileExportIcon, CheckIcon, HistoryIcon, SaveIcon } from './Icon';
import { LoadingSpinner } from './LoadingSpinner';

type SaveStatus = 'idle' | 'saving' | 'saved';

interface HeaderProps {
    onShowTemplates: () => void;
    onExportDOCX: () => void;
    saveStatus: SaveStatus;
    onShowHistory: () => void;
    onSaveDraft: () => void;
}

const SaveStatusIndicator: React.FC<{ status: SaveStatus }> = ({ status }) => {
    if (status === 'idle') {
        return <div className="w-48 h-full" />; // Placeholder to prevent layout shift
    }

    return (
        <div className="w-48 flex items-center justify-center text-sm text-[#A3A3A3] transition-opacity duration-300">
            {status === 'saving' && (
                <>
                    <LoadingSpinner />
                    <span className="ml-2">Saving...</span>
                </>
            )}
            {status === 'saved' && (
                <div className="flex items-center text-green-400">
                    <CheckIcon className="h-4 w-4" />
                    <span className="ml-2">All changes saved</span>
                </div>
            )}
        </div>
    );
};

const HeaderComponent: React.FC<HeaderProps> = ({ onShowTemplates, onExportDOCX, saveStatus, onShowHistory, onSaveDraft }) => {
  return (
    <header className="flex-shrink-0 bg-[#131313]/80 backdrop-blur-sm border-b border-[#262626] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
            <RocketIcon className="h-8 w-8 text-[#7F56D9]" />
            <h1 className="text-xl font-bold tracking-wider text-[#F5F5F5]">
            ProcurementDraft <span className="text-[#7F56D9]">IA</span>
            </h1>
        </div>

        <SaveStatusIndicator status={saveStatus} />
        
        <div className="flex items-center gap-2">
            <button
                onClick={onShowTemplates}
                className="bg-[#7F56D9] hover:bg-[#6941C6] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-white"
            >
                Templates
            </button>
            
            <div className="w-[1px] h-6 bg-[#262626] mx-2"></div>

            <button
                onClick={onSaveDraft}
                className="bg-[#262626] hover:bg-[#333333] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-[#7F56D9] flex items-center gap-2"
                >
                <SaveIcon className="h-4 w-4" />
                <span>Save Draft</span>
            </button>
            <button
                onClick={onShowHistory}
                className="bg-[#262626] hover:bg-[#333333] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-[#7F56D9] flex items-center gap-2"
                >
                <HistoryIcon className="h-4 w-4" />
                <span>History</span>
            </button>
            <button
                onClick={onExportDOCX}
                className="flex items-center gap-2 bg-[#262626] hover:bg-[#333333] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-[#7F56D9]"
            >
                <FileExportIcon className="h-4 w-4" />
                <span>Export DOCX</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export const Header = memo(HeaderComponent);