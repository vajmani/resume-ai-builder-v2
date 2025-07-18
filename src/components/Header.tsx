'use client';

import { useEffect, useState } from 'react';
import { getRandomAffirmation } from '@/utils/affirmations';
import { useBreakReminder } from '@/hooks/useBreakReminder';

interface HeaderProps {
  progressPercentage: number;
}

export const Header: React.FC<HeaderProps> = ({ progressPercentage }) => {
  const [affirmation, setAffirmation] = useState('');
  const { getSessionTimeFormatted } = useBreakReminder();

  useEffect(() => {
    setAffirmation(getRandomAffirmation());
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Resume AI Builder</h1>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <p className="text-sm font-medium">{affirmation}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm opacity-80">Progress</p>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{progressPercentage}%</span>
              </div>
            </div>
            
            <div className="text-right text-sm">
              <p className="opacity-80">Session Time</p>
              <p className="font-semibold">{getSessionTimeFormatted()}</p>
            </div>
          </div>
        </div>
        
        <div className="md:hidden mt-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-sm font-medium text-center">{affirmation}</p>
          </div>
        </div>
      </div>
    </header>
  );
};