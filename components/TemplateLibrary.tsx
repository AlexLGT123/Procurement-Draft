import React, { useRef, useState, lazy, Suspense } from 'react';
import { RocketIcon, QuestionMarkCircleIcon, DocumentIcon, FilePlusIcon, UploadIcon } from './Icon';
import { TEMPLATES } from './templates';
import type { Template } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { useTranslation } from '../hooks/useTranslation';

// Lazy load the modal component
const FaqModal = lazy(() => import('./FaqModal').then(module => ({ default: module.FaqModal })));

// Component for language selection
const LanguageSwitcher: React.FC = () => {
    const { language, changeLanguage } = useTranslation();
    
    return (
        <div className="flex items-center gap-1 border border-[#262626] rounded-lg p-0.5 bg-[#131313]/50 backdrop-blur-sm">
            <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-colors duration-200 ${language === 'en' ? 'bg-[#7F56D9] text-white' : 'text-[#A3A3A3] hover:bg-[#333333]'}`}
                aria-pressed={language === 'en'}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('fr')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-colors duration-200 ${language === 'fr' ? 'bg-[#7F56D9] text-white' : 'text-[#A3A3A3] hover:bg-[#333333]'}`}
                aria-pressed={language === 'fr'}
            >
                FR
            </button>
        </div>
    );
};


interface TemplateLibraryProps {
    onSelectTemplate: (template: Template) => void;
    onStartBlank: () => void;
    onFileImport: (file: File) => void;
    isImporting: boolean;
}

const ActionCard: React.FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean }> = ({ onClick, children, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="group flex flex-col items-center justify-center bg-[#1A1A1A] border border-[#262626] rounded-lg p-6 text-center hover:bg-[#222222] hover:border-[#7F56D9]/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D0D0D] focus:ring-[#7F56D9] h-48 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {children}
    </button>
);


export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate, onStartBlank, onFileImport, isImporting }) => {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isFaqOpen, setIsFaqOpen] = useState(false);

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
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0D0D0D] p-8">
            <div className="absolute top-8 right-8 z-10 flex items-center gap-4">
                <LanguageSwitcher />
                <div className="relative group">
                    <button
                        onClick={() => setIsFaqOpen(true)}
                        className="text-[#A3A3A3] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D0D0D] focus:ring-[#7F56D9] p-1.5 rounded-full hover:bg-[#262626]"
                        aria-label={t('templates.faqLink')}
                    >
                        <QuestionMarkCircleIcon className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-[#131313] border border-[#262626] text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        {t('templates.faqLink')}
                    </div>
                </div>
            </div>

            <header className="text-center mb-12">
                <div className="inline-flex items-center gap-4 mb-4">
                    <RocketIcon className="h-16 w-16 text-[#7F56D9]" />
                    <h1 className="text-5xl font-bold tracking-wider text-[#F5F5F5]">
                        {t('header.title')} <span className="text-[#7F56D9]">IA</span>
                    </h1>
                </div>
                <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto">
                    {t('templates.subtitle')}
                </p>
            </header>

            <main className="w-full max-w-6xl">
                <h2 className="text-2xl font-semibold text-center text-[#F5F5F5] mb-8">{t('templates.chooseStartPoint')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TEMPLATES.map((template) => (
                         <button
                            key={template.key}
                            onClick={() => onSelectTemplate(template)}
                            className="group flex flex-col bg-[#1A1A1A] border border-[#262626] rounded-lg p-6 text-left hover:bg-[#222222] hover:border-[#7F56D9]/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D0D0D] focus:ring-[#7F56D9] h-48"
                        >
                            <div className="flex-shrink-0 mb-4">
                               <DocumentIcon className="h-8 w-8 text-[#7F56D9]/50 group-hover:text-[#7F56D9] transition-colors" />
                            </div>
                            <h3 className="font-bold text-lg text-[#F5F5F5] group-hover:text-white mb-2">{t(template.name)}</h3>
                            <p className="text-sm text-[#A3A3A3] flex-grow">{t(template.description)}</p>
                        </button>
                    ))}
                    <ActionCard onClick={onStartBlank}>
                        <FilePlusIcon className="h-8 w-8 text-[#A3A3A3] group-hover:text-white transition-colors mb-4" />
                        <h3 className="font-bold text-lg text-[#F5F5F5] group-hover:text-white">{t('templates.startBlank')}</h3>
                        <p className="text-sm text-[#A3A3A3]">Begin with a clean slate.</p>
                    </ActionCard>
                     <ActionCard onClick={handleImportClick} disabled={isImporting}>
                        {isImporting ? <LoadingSpinner /> : <UploadIcon className="h-8 w-8 text-[#A3A3A3] group-hover:text-white transition-colors mb-4" />}
                        <h3 className="font-bold text-lg text-[#F5F5F5] group-hover:text-white">{isImporting ? t('templates.importing') : t('templates.importFromFile')}</h3>
                        <p className="text-sm text-[#A3A3A3]">Supports .docx, .md, .txt</p>
                    </ActionCard>
                </div>
                 <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".md,.txt,.docx"
                />
            </main>
            
            <Suspense fallback={<div>Loading...</div>}>
                <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
            </Suspense>
        </div>
    );
};