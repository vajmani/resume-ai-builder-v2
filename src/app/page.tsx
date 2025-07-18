'use client';

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/Header';
import { PersonalInfoForm } from '@/components/PersonalInfoForm';
import { ProgressCelebration } from '@/components/ProgressCelebration';
import { AchievementBadge } from '@/components/AchievementBadge';
import { ExportButton } from '@/components/ExportButton';
import { useResumeForm } from '@/hooks/useResumeForm';
import { useBreakReminder } from '@/hooks/useBreakReminder';
import { PersonalInfoFormData } from '@/lib/validations';
import { getCompletionMessage } from '@/utils/affirmations';
import toast from 'react-hot-toast';

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [showBadge, setShowBadge] = useState(false);
  const [currentBadge, setCurrentBadge] = useState('');
  const [currentSection, setCurrentSection] = useState('personalInfo');
  
  const {
    resumeData,
    isLoading,
    updateResumeData,
    completeSection,
    getProgressPercentage,
    getCompletedSections,
  } = useResumeForm();
  
  useBreakReminder();

  useEffect(() => {
    if (!isLoading && !getCompletedSections().includes('personalInfo')) {
      setCurrentBadge('first-step');
      setShowBadge(true);
      toast.success('Welcome to your resume building journey! 🌟', {
        duration: 4000,
        style: {
          background: '#10B981',
          color: 'white',
        },
      });
    }
  }, [isLoading, getCompletedSections]);

  const handlePersonalInfoSubmit = (data: PersonalInfoFormData) => {
    updateResumeData({ personalInfo: data });
    
    setTimeout(() => {
      completeSection('personalInfo', 'personal-complete');
      setCelebrationMessage(getCompletionMessage('personalInfo'));
      setShowCelebration(true);
      
      setTimeout(() => {
        setCurrentBadge('personal-complete');
        setShowBadge(true);
      }, 2000);
    }, 500);
  };

  const handleNext = () => {
    toast.success('Ready for the next step! 🚀', {
      duration: 3000,
      style: {
        background: '#3B82F6',
        color: 'white',
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your amazing resume builder... ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Toaster position="top-right" />
      
      <Header progressPercentage={getProgressPercentage()} />
      
      <main className="container mx-auto py-8">
        {currentSection === 'personalInfo' && (
          <PersonalInfoForm
            initialData={resumeData.personalInfo}
            onSubmit={handlePersonalInfoSubmit}
            onNext={handleNext}
          />
        )}
        
        {/* Placeholder for other sections */}
        {currentSection !== 'personalInfo' && (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              More sections coming soon! 🚀
            </h2>
            <p className="text-gray-600 mb-8">
              You&apos;ve completed the personal information section. More form sections will be added in the next phase.
            </p>
            <ExportButton
              resumeData={resumeData}
              completedSections={getCompletedSections()}
              disabled={getCompletedSections().length === 0}
            />
          </div>
        )}
      </main>
      
      <ProgressCelebration
        isVisible={showCelebration}
        message={celebrationMessage}
        onComplete={() => setShowCelebration(false)}
      />
      
      <AchievementBadge
        badgeId={currentBadge}
        isVisible={showBadge}
        onClose={() => setShowBadge(false)}
      />
    </div>
  );
}