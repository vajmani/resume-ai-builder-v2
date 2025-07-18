import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useBreakReminder = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const [lastBreakTime, setLastBreakTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastBreak = now - lastBreakTime;
      
      // 20 minutes in milliseconds
      const TWENTY_MINUTES = 20 * 60 * 1000;
      
      if (timeSinceLastBreak >= TWENTY_MINUTES) {
        toast.success(
          "You've been working hard! 🌟 Consider taking a quick break to recharge your energy. You deserve it! ☕",
          {
            duration: 8000,
            style: {
              background: '#10B981',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
            },
          }
        );
        setLastBreakTime(now);
      }
      
      setSessionTime(Math.floor(timeSinceLastBreak / 1000));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [lastBreakTime]);

  const resetBreakTimer = () => {
    setLastBreakTime(Date.now());
    setSessionTime(0);
  };

  const getSessionTimeFormatted = () => {
    const minutes = Math.floor(sessionTime / 60);
    const seconds = sessionTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    sessionTime,
    resetBreakTimer,
    getSessionTimeFormatted,
  };
};