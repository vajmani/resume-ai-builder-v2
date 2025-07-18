import { ResumeData, UserProgress } from '@/types/resume';

const RESUME_STORAGE_KEY = 'resume-ai-builder-data';
const PROGRESS_STORAGE_KEY = 'resume-ai-builder-progress';

export const saveResumeData = (data: Partial<ResumeData>): void => {
  try {
    const existingData = getResumeData();
    const updatedData = { ...existingData, ...data };
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Failed to save resume data:', error);
  }
};

export const getResumeData = (): Partial<ResumeData> => {
  try {
    const data = localStorage.getItem(RESUME_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to get resume data:', error);
    return {};
  }
};

export const clearResumeData = (): void => {
  try {
    localStorage.removeItem(RESUME_STORAGE_KEY);
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear resume data:', error);
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save user progress:', error);
  }
};

export const getUserProgress = (): UserProgress | null => {
  try {
    const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get user progress:', error);
    return null;
  }
};

export const updateProgress = (
  sectionId: string,
  isCompleted: boolean = false,
  achievement?: string
): void => {
  try {
    const currentProgress = getUserProgress() || {
      completedSections: [],
      currentSection: '',
      timeSpent: 0,
      lastActivity: new Date(),
      achievements: []
    };

    const updatedProgress: UserProgress = {
      ...currentProgress,
      currentSection: sectionId,
      lastActivity: new Date(),
      completedSections: isCompleted 
        ? [...new Set([...currentProgress.completedSections, sectionId])]
        : currentProgress.completedSections,
      achievements: achievement 
        ? [...currentProgress.achievements, achievement]
        : currentProgress.achievements
    };

    saveUserProgress(updatedProgress);
  } catch (error) {
    console.error('Failed to update progress:', error);
  }
};