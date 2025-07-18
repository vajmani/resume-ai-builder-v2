import { useState, useEffect } from 'react';
import { ResumeData, UserProgress } from '@/types/resume';
import { saveResumeData, getResumeData, saveUserProgress, getUserProgress, updateProgress } from '@/utils/storage';

export const useResumeForm = () => {
  const [resumeData, setResumeData] = useState<Partial<ResumeData>>({});
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const savedData = getResumeData();
      const savedProgress = getUserProgress();
      
      setResumeData(savedData);
      setUserProgress(savedProgress);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const updateResumeData = (sectionData: Partial<ResumeData>) => {
    const newData = { ...resumeData, ...sectionData };
    setResumeData(newData);
    saveResumeData(newData);
  };

  const updateUserProgress = (sectionId: string, isCompleted: boolean = false, achievement?: string) => {
    updateProgress(sectionId, isCompleted, achievement);
    const updatedProgress = getUserProgress();
    setUserProgress(updatedProgress);
  };

  const completeSection = (sectionId: string, achievement?: string) => {
    updateUserProgress(sectionId, true, achievement);
  };

  const getCurrentSection = () => {
    return userProgress?.currentSection || 'personalInfo';
  };

  const getCompletedSections = () => {
    return userProgress?.completedSections || [];
  };

  const getAchievements = () => {
    return userProgress?.achievements || [];
  };

  const getProgressPercentage = () => {
    const totalSections = 5; // personalInfo, workExperience, education, skills, projects
    const completedCount = getCompletedSections().length;
    return Math.round((completedCount / totalSections) * 100);
  };

  return {
    resumeData,
    userProgress,
    isLoading,
    updateResumeData,
    updateUserProgress,
    completeSection,
    getCurrentSection,
    getCompletedSections,
    getAchievements,
    getProgressPercentage,
  };
};