
import React from 'react';
import { HistoryEntry, HistoryEventType } from '../types';
import { CloseIcon, SaveIcon, DocumentIcon, FileImportIcon, FileExportIcon } from './Icon';

interface HistoryLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
}

const timeAgo = (timestamp: number): string => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "Just now";
};

const getEventDetails = (entry: HistoryEntry) => {
    switch (entry.type) {
        case HistoryEventType.DRAFT_SAVED:
            const isManualSave = entry.details === 'Manual Save';
            return {
                icon: <SaveIcon className="h-5 w-5 text-green-400" />,
                title: isManualSave ? 'Draft Saved' : 'Draft Auto-Saved',
                description: `"${entry.documentTitle}" was saved ${isManualSave ? 'manually' : 'automatically'}.`,
            };
        case HistoryEventType.TEMPLATE_LOADED:
            return {
                icon: <DocumentIcon className="h-5 w-5 text-blue-400" />,
                title: 'Template Loaded',
                description: `Started new document from "${entry.details}" template.`,
            };
        case HistoryEventType.STARTED_BLANK:
            return {
                icon: <DocumentIcon className="h-5 w-5 text-gray-400" />,
                title: 'New Document',
                description: 'Started a new blank document.',
            };
        case HistoryEventType.IMPORTED:
            return {
                icon: <FileImportIcon className="h-5 w-5 text-purple-400" />,
                title: 'File Imported',
                description: `Imported "${entry.details}".`,
            };
        case HistoryEventType.EXPORTED_DOCX:
            return {
                icon: <FileExportIcon className="h-5 w-5 text-blue-500" />,
                title: 'Exported as DOCX',
                description: `Exported "${entry.documentTitle}" as DOCX.`,
            };
        default:
            return {
                icon: <DocumentIcon className="h-5 w-5 text-gray-400" />,
                title: 'Unknown Event',
                description: '',
            };
    }
};

export const HistoryLogModal: React.FC<HistoryLogModalProps> = ({ isOpen, onClose, history }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-modal-title"
    >
      <div 
        className="bg-[#1A1A1A] border border-[#262626] rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-[#262626] flex-shrink-0">
          <h2 id="history-modal-title" className="text-lg font-semibold text-[#F5F5F5]">Activity History</h2>
          <button onClick={onClose} className="text-[#A3A3A3] hover:text-white" aria-label="Close history log">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-grow overflow-y-auto p-4">
          {history.length === 0 ? (
            <div className="text-center text-[#A3A3A3] py-16">
              <p>No activity has been logged yet.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {history.map(entry => {
                const { icon, title, description } = getEventDetails(entry);
                return (
                  <li key={entry.id} className="flex items-start gap-4 p-3 rounded-md bg-[#262626]/50">
                    <div className="flex-shrink-0 mt-1">{icon}</div>
                    <div className="flex-grow">
                      <p className="font-semibold text-[#F5F5F5]">{title}</p>
                      <p className="text-sm text-[#A3A3A3]">{description}</p>
                    </div>
                    <time className="flex-shrink-0 text-xs text-[#A3A3A3] whitespace-nowrap mt-1">{timeAgo(entry.timestamp)}</time>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
