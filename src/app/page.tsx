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
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  
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
    if (!isLoading && !getCompletedSections().includes('personalInfo') && !hasShownWelcome) {
      setCurrentBadge('first-step');
      setShowBadge(true);
      setHasShownWelcome(true);
      toast.success('Welcome to your resume building journey! 🌟', {
        duration: 4000,
        style: {
          background: '#10B981',
          color: 'white',
        },
      });
    }
  }, [isLoading, getCompletedSections, hasShownWelcome]);

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
    setCurrentSection('completed');
    toast.success('Fantastic work! Check out your progress below! 🎉', {
      duration: 5000,
      style: {
        background: '#3B82F6',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
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
        
        {/* Completion section */}
        {currentSection === 'completed' && (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  🎉 Congratulations! You&apos;re Amazing!
                </h2>
                <p className="text-gray-600 mb-4">
                  You&apos;ve completed the personal information section! You&apos;re building something incredible.
                </p>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-bold text-green-600">{getProgressPercentage()}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Phase 2 will add more sections - for now, you can export your current progress!
                  </p>
                </div>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Ready to Download Your Resume? ✨
                </h3>
                <p className="text-gray-600 mb-6">
                  You&apos;ve created a solid foundation. Export your resume and see your amazing work!
                </p>
                <ExportButton
                  resumeData={resumeData}
                  completedSections={getCompletedSections()}
                  disabled={getCompletedSections().length === 0}
                />
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Coming in Phase 2:</strong> Live preview, professional templates, and more sections to make your resume even more powerful! 🚀
                  </p>
                </div>
              </div>
            </div>
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