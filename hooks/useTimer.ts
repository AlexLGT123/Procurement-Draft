import { useState, useEffect } from 'react';

export const useTimer = (isActive: boolean): string => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setElapsedTime(0);
      return;
    }

    const startTime = Date.now();
    const intervalId = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(intervalId);
  }, [isActive]);

  return Math.floor(elapsedTime).toString();
};
