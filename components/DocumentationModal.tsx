import React from 'react';
import { CloseIcon } from './Icon';
import { useTranslation } from '../hooks/useTranslation';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DocSection {
    title: string;
    content: string[];
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const docSections: DocSection[] = t('documentation.sections', {}) as unknown as DocSection[];

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 modal-backdrop-animate"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-modal-title"
    >
      <div
        className="bg-[#1A1A1A] border border-[#262626] rounded-lg shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col modal-content-animate"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-[#262626] flex-shrink-0">
          <h2 id="doc-modal-title" className="text-lg font-semibold text-[#F5F5F5]">{t('documentation.modalTitle')}</h2>
          <button onClick={onClose} className="text-[#A3A3A3] hover:text-white" aria-label={t('documentation.closeAria')}>
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {docSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold text-[#7F56D9] mb-3">{section.title}</h3>
              <div className="space-y-3 text-sm text-[#A3A3A3] leading-relaxed">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentationModal;
