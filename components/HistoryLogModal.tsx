import React, { memo } from 'react';
import { HistoryEntry, HistoryEventType } from '../types';
import { CloseIcon, SaveIcon, DocumentIcon, FileImportIcon, FileExportIcon, HistoryIcon } from './Icon';
import { useTranslation } from '../hooks/useTranslation';

interface HistoryLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onRestore: (entry: HistoryEntry) => void;
}

const timeAgo = (timestamp: number, t: (key: string, vars?: any) => string): string => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return t('time.yearsAgo').replace('{{count}}', String(Math.floor(interval)));
  interval = seconds / 2592000;
  if (interval > 1) return t('time.monthsAgo').replace('{{count}}', String(Math.floor(interval)));
  interval = seconds / 86400;
  if (interval > 1) return t('time.daysAgo').replace('{{count}}', String(Math.floor(interval)));
  interval = seconds / 3600;
  if (interval > 1) return t('time.hoursAgo').replace('{{count}}', String(Math.floor(interval)));
  interval = seconds / 60;
  if (interval > 1) return t('time.minutesAgo').replace('{{count}}', String(Math.floor(interval)));
  return t('time.justNow');
};

const RESTORABLE_EVENT_TYPES = [
    HistoryEventType.DRAFT_SAVED,
    HistoryEventType.TEMPLATE_LOADED,
    HistoryEventType.IMPORTED,
    HistoryEventType.STARTED_BLANK,
    HistoryEventType.RESTORED,
];

const getEventDetails = (entry: HistoryEntry, t: (key: string, vars?: any) => string) => {
    switch (entry.type) {
        case HistoryEventType.DRAFT_SAVED:
            const isManualSave = entry.details === 'Manual Save';
            return {
                icon: <SaveIcon className="h-5 w-5 text-green-400" />,
                title: isManualSave ? t('history.draftSaved.manual.title') : t('history.draftSaved.auto.title'),
                description: t('history.draftSaved.description', { documentTitle: entry.documentTitle }),
            };
        case HistoryEventType.TEMPLATE_LOADED:
            return {
                icon: <DocumentIcon className="h-5 w-5 text-blue-400" />,
                title: t('history.templateLoaded.title'),
                description: t('history.templateLoaded.description', { templateName: t(`templates.${entry.details}.name`) }),
            };
        case HistoryEventType.STARTED_BLANK:
            return {
                icon: <DocumentIcon className="h-5 w-5 text-gray-400" />,
                title: t('history.startedBlank.title'),
                description: t('history.startedBlank.description'),
            };
        case HistoryEventType.IMPORTED:
            return {
                icon: <FileImportIcon className="h-5 w-5 text-purple-400" />,
                title: t('history.imported.title'),
                description: t('history.imported.description', { fileName: entry.details }),
            };
        case HistoryEventType.EXPORTED_DOCX:
            return {
                icon: <FileExportIcon className="h-5 w-5 text-blue-500" />,
                title: t('history.exported.title'),
                description: t('history.exported.description', { documentTitle: entry.documentTitle }),
            };
        case HistoryEventType.RESTORED:
            return {
                icon: <HistoryIcon className="h-5 w-5 text-yellow-400" />,
                title: t('history.restored.title'),
                description: t('history.restored.description', { documentTitle: entry.documentTitle }),
            };
        default:
            return {
                icon: <DocumentIcon className="h-5 w-5 text-gray-400" />,
                title: t('history.unknown.title'),
                description: '',
            };
    }
};

interface HistoryListItemProps {
    entry: HistoryEntry;
    onRestore: (entry: HistoryEntry) => void;
    t: (key: string, vars?: any) => string;
    language: string;
}

const HistoryListItem: React.FC<HistoryListItemProps> = memo(({ entry, onRestore, t, language }) => {
    const { icon, title, description } = getEventDetails(entry, t);
    const isRestorable = RESTORABLE_EVENT_TYPES.includes(entry.type) && !!entry.documentContent;
    
    return (
        <li className="flex items-start gap-4 p-3 rounded-md bg-[#262626]/50">
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <div className="flex-grow">
                <p className="font-semibold text-[#F5F5F5]">{title}</p>
                <p className="text-sm text-[#A3A3A3]">{description}</p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-4 mt-1">
                <button
                    onClick={() => onRestore(entry)}
                    disabled={!isRestorable}
                    className="transition-colors duration-200 bg-[#333333] hover:bg-[#7F56D9] text-[#A3A3A3] hover:text-white rounded-md px-2 py-1 text-xs font-semibold flex items-center gap-1"
                    style={{ visibility: isRestorable ? 'visible' : 'hidden' }}
                    aria-label={isRestorable ? t('history.restoreAria', { date: new Date(entry.timestamp).toLocaleString(language) }) : undefined}
                >
                    <HistoryIcon className="h-3 w-3" />
                    <span>{t('history.restoreButton')}</span>
                </button>
                <time className="flex-shrink-0 text-xs text-[#A3A3A3] whitespace-nowrap">{timeAgo(entry.timestamp, t)}</time>
            </div>
        </li>
    );
});


export const HistoryLogModal: React.FC<HistoryLogModalProps> = ({ isOpen, onClose, history, onRestore }) => {
  const { t, language } = useTranslation();
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 modal-backdrop-animate"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-modal-title"
    >
      <div 
        className="bg-[#1A1A1A] border border-[#262626] rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col modal-content-animate"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-[#262626] flex-shrink-0">
          <h2 id="history-modal-title" className="text-lg font-semibold text-[#F5F5F5]">{t('history.modalTitle')}</h2>
          <button onClick={onClose} className="text-[#A3A3A3] hover:text-white" aria-label={t('history.closeAria')}>
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-grow overflow-y-auto p-4">
          {history.length === 0 ? (
            <div className="text-center text-[#A3A3A3] py-16">
              <p>{t('history.noActivity')}</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {history.map(entry => (
                <HistoryListItem 
                    key={entry.id}
                    entry={entry}
                    onRestore={onRestore}
                    t={t}
                    language={language}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};