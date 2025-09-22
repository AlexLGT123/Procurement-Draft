import React, { useState, useEffect } from 'react';
import { SpinnerIcon } from './Icon';

export const ThinkingIndicator: React.FC = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setElapsedTime(((Date.now() - startTime) / 1000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
      <SpinnerIcon className="h-4 w-4 animate-spin text-[#7F56D9]" />
      <span className="font-medium">Thinking...</span>
      <span className="tabular-nums">Running for {Math.floor(elapsedTime)}s</span>
    </div>
  );
};
