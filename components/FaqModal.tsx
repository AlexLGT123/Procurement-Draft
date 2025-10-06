import React from 'react';
import { CloseIcon } from './Icon';
import { useTranslation } from '../hooks/useTranslation';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
    q: string;
    a: string;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  // The translation hook can return complex objects/arrays, so we cast it.
  const faqItems: FaqItem[] = t('faq.items', {}) as unknown as FaqItem[];

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 modal-backdrop-animate"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="faq-modal-title"
    >
      <div
        className="bg-[#1A1A1A] border border-[#262626] rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col modal-content-animate"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-[#262626] flex-shrink-0">
          <h2 id="faq-modal-title" className="text-lg font-semibold text-[#F5F5F5]">{t('faq.modalTitle')}</h2>
          <button onClick={onClose} className="text-[#A3A3A3] hover:text-white" aria-label={t('faq.closeAria')}>
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {faqItems.map((item, index) => (
            <details key={index} className="group bg-[#262626]/50 rounded-lg">
              <summary className="p-4 cursor-pointer list-none flex justify-between items-center font-semibold text-[#F5F5F5] group-hover:text-white">
                {item.q}
                <span className="transform transition-transform duration-200 group-open:rotate-180">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
              </summary>
              <div className="p-4 border-t border-[#333333]">
                <p className="text-sm text-[#A3A3A3] leading-relaxed whitespace-pre-wrap">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};