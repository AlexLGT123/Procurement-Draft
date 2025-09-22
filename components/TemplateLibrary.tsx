import React, { useRef } from 'react';
import { RocketIcon, FileImportIcon } from './Icon';
import { TEMPLATES } from './templates';
import type { Template } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface TemplateLibraryProps {
    onSelectTemplate: (template: Template) => void;
    onStartBlank: () => void;
    onFileImport: (file: File) => void;
    isImporting: boolean;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate, onStartBlank, onFileImport, isImporting }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileImport(file);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D0D0D] p-8">
            <header className="text-center mb-12">
                <div className="inline-flex items-center gap-4 mb-4">
                    <RocketIcon className="h-16 w-16 text-[#7F56D9]" />
                    <h1 className="text-5xl font-bold tracking-wider text-[#F5F5F5]">
                        ProcurementDraft <span className="text-[#7F56D9]">IA</span>
                    </h1>
                </div>
                <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto">
                    Your intelligent partner for building structured, professional documents.
                    Start with a template or import your own work.
                </p>
            </header>

            <main className="w-full max-w-6xl">
                <h2 className="text-2xl font-semibold text-center text-[#F5F5F5] mb-6">Choose a Starting Point</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {TEMPLATES.map((template) => (
                        <button
                            key={template.key}
                            onClick={() => onSelectTemplate(template)}
                            className="flex flex-col bg-[#1A1A1A] border border-[#262626] rounded-lg p-6 text-left hover:bg-[#222222] hover:border-[#7F56D9]/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D0D0D] focus:ring-[#7F56D9] h-48"
                        >
                            <h3 className="font-bold text-lg text-[#7F56D9] mb-2">{template.name}</h3>
                            <p className="text-sm text-[#A3A3A3] flex-grow">{template.description}</p>
                        </button>
                    ))}
                </div>
                
                <div className="flex items-center justify-center gap-4">
                    <button 
                        onClick={handleImportClick}
                        disabled={isImporting}
                        className="flex items-center gap-2 bg-[#262626] hover:bg-[#333333] text-[#F5F5F5] font-bold py-3 px-6 rounded-lg transition"
                    >
                       {isImporting ? <LoadingSpinner /> : <FileImportIcon className="w-5 h-5" />}
                       {isImporting ? 'Importing...' : 'Import from File'}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".md,.txt,.docx"
                    />
                    <span className="text-[#A3A3A3]">or</span>
                    <button
                        onClick={onStartBlank}
                        className="bg-[#7F56D9] hover:bg-[#6941C6] text-white font-bold py-3 px-6 rounded-lg transition"
                    >
                        Start with a Blank Document
                    </button>
                </div>
            </main>
        </div>
    );
};