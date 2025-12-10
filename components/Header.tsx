
import React, { memo } from 'react';
import { RocketIcon, FileExportIcon, CheckIcon, HistoryIcon, SaveIcon, BookIcon } from './Icon';
import { LoadingSpinner } from './LoadingSpinner';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../context/AuthContext';

type SaveStatus = 'idle' | 'saving' | 'saved';

interface HeaderProps {
    documentTitle: string;
    onShowTemplates: () => void;
    onExportDOCX: () => void;
    saveStatus: SaveStatus;
    onShowHistory: () => void;
    onSaveDraft: () => void;
    onShowDocumentation: () => void;
}

const SaveStatusIndicator: React.FC<{ status: SaveStatus }> = ({ status }) => {
    const { t } = useTranslation();
    
    return (
        <div className="flex items-center text-sm text-[#A3A3A3] transition-opacity duration-300">
            {status === 'saving' && (
                <>
                    <LoadingSpinner />
                    <span className="ml-2 whitespace-nowrap">{t('header.saving')}</span>
                </>
            )}
            {status === 'saved' && (
                <div className="flex items-center text-green-400 whitespace-nowrap">
                    <CheckIcon className="h-4 w-4" />
                    <span className="ml-2">{t('header.saved')}</span>
                </div>
            )}
        </div>
    );
};

const HeaderComponent: React.FC<HeaderProps> = ({ documentTitle, onShowTemplates, onExportDOCX, saveStatus, onShowHistory, onSaveDraft, onShowDocumentation }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  
  return (
    <header className="flex-shrink-0 bg-[#131313]/80 backdrop-blur-sm border-b border-[#262626] p-4">
      <div className="container mx-auto flex items-center justify-between gap-6">
        
        {/* Left Section: Logo & Status */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
            <button
            onClick={onShowTemplates}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-white rounded-lg p-1 -m-1 flex-shrink-0"
            aria-label={t('header.landingPageAria')}
            >
                <RocketIcon className="h-8 w-8 text-[#7F56D9]" />
                <h1 className="text-xl font-bold tracking-wider text-[#F5F5F5] group-hover:text-white transition-colors duration-200 hidden sm:block">
                {t('header.title')} <span className="text-[#7F56D9]">IA</span>
                </h1>
            </button>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-6 bg-[#262626] flex-shrink-0"></div>

            {/* Document Title or Save Status */}
            <div className="hidden md:block min-w-0">
                {saveStatus !== 'idle' ? (
                    <SaveStatusIndicator status={saveStatus} />
                ) : (
                    <span className="text-sm text-[#A3A3A3] truncate block font-medium max-w-[200px] lg:max-w-md" title={documentTitle}>
                        {documentTitle}
                    </span>
                )}
            </div>
        </div>
        
        {/* Right Section: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
            <button
                onClick={onShowTemplates}
                className="bg-[#7F56D9] hover:bg-[#6941C6] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-white"
            >
                {t('header.templates')}
            </button>
            
            <div className="w-[1px] h-6 bg-[#262626] mx-2"></div>

            <button
                onClick={onSaveDraft}
                className="bg-[#262626] hover:bg-[#333333] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-[#7F56D9] flex items-center gap-2"
                >
                <SaveIcon className="h-4 w-4" />
                <span className="hidden lg:inline">{t('header.saveDraft')}</span>
            </button>
            <button
                onClick={onShowHistory}
                className="bg-[#262626] hover:bg-[#333333] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-[#7F56D9] flex items-center gap-2"
                >
                <HistoryIcon className="h-4 w-4" />
                <span className="hidden lg:inline">{t('header.history')}</span>
            </button>
            <button
                onClick={onShowDocumentation}
                className="bg-[#262626] hover:bg-[#333333] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-[#7F56D9] flex items-center gap-2"
            >
                <BookIcon className="h-4 w-4" />
                <span className="hidden lg:inline">{t('header.documentation')}</span>
            </button>
            <button
                onClick={onExportDOCX}
                className="flex items-center gap-2 bg-[#262626] hover:bg-[#333333] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-[#7F56D9]"
            >
                <FileExportIcon className="h-4 w-4" />
                <span className="hidden lg:inline">{t('header.export')}</span>
            </button>
            <div className="w-[1px] h-6 bg-[#262626] mx-2"></div>
            <button
              onClick={logout}
              className="text-[#A3A3A3] hover:text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
            >
              Sign Out
            </button>
        </div>
      </div>
    </header>
  );
};

export const Header = memo(HeaderComponent);
