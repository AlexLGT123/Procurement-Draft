
import React, { useState, useEffect } from 'react';
import { SpinnerIcon } from './Icon';
import { useTranslation } from '../hooks/useTranslation';

interface ThinkingIndicatorProps {
  message?: string;
}

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ message }) => {
  const { t } = useTranslation();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setElapsedTime(((Date.now() - startTime) / 1000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
            <SpinnerIcon className="h-4 w-4 animate-spin text-[#7F56D9]" />
            <span className="font-medium">{t('common.thinking')}</span>
            <span className="tabular-nums">{t('common.runningFor', { seconds: Math.floor(elapsedTime) })}</span>
        </div>
        {message && <p className="text-xs text-[#A3A3A3] pl-6">{message}</p>}
    </div>
  );
};
