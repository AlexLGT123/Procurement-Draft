import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen, title, message, onConfirm, onCancel, confirmText, cancelText
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 modal-backdrop-animate"
        onClick={onCancel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
    >
      <div 
        className="bg-[#1A1A1A] border border-[#262626] rounded-lg shadow-2xl w-full max-w-md modal-content-animate"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 id="confirmation-modal-title" className="text-lg font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm text-[#A3A3A3]">{message}</p>
        </div>
        <div className="bg-[#131313] px-6 py-3 flex justify-end items-center gap-3 rounded-b-lg">
          <button
            onClick={onCancel}
            className="bg-[#262626] hover:bg-[#333333] text-[#F5F5F5] text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-[#7F56D9]"
          >
            {cancelText || t('confirmation.cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#b91c1c] hover:bg-[#991b1b] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-white"
          >
            {confirmText || t('confirmation.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};
