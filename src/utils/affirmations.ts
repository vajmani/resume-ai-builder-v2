export const dailyAffirmations = [
  "Your experience matters and deserves to be shared ✨",
  "Every step in your career journey has value 🌟",
  "You have unique talents that employers need 💫",
  "Your story is worth telling - and worth hearing 📚",
  "You're building something amazing about yourself 🚀",
  "Your achievements deserve to be celebrated 🏆",
  "The right opportunity is looking for someone like you 🎯",
  "Your professional growth is inspiring 📈",
  "You bring value wherever you go 💎",
  "Your skills and experience make you stand out 🌈",
  "Every challenge has made you stronger 💪",
  "You're exactly where you need to be in your journey 🛤️",
  "Your potential is limitless 🌌",
  "You have everything it takes to succeed 🔥",
  "Your unique perspective is your superpower 🦸‍♀️",
];

export const sectionMotivationalMessages = {
  personalInfo: "You're sharing your professional identity with the world - how exciting! 🌟",
  workExperience: "Every role has taught you something valuable - let's showcase that growth! 📈",
  education: "Your learning journey shaped who you are today - that's powerful! 🎓",
  skills: "Look at all the amazing abilities you've developed - you're incredible! 🚀",
  projects: "Your creativity and problem-solving skills shine through your projects! 💡",
};

export const completionMessages = {
  personalInfo: "Amazing! You've beautifully introduced yourself to potential employers! 🎉",
  workExperience: "Fantastic! You've shown the incredible value you bring to any team! 🌟",
  education: "Wonderful! Your educational foundation shows your commitment to growth! 📚",
  skills: "Impressive! You've highlighted the diverse talents that make you unique! 🎯",
  projects: "Outstanding! Your projects demonstrate your passion and capability! 🚀",
};

export const achievementBadges = [
  { id: 'first-step', title: 'First Step', description: 'Started your resume journey!', icon: '🌱' },
  { id: 'personal-complete', title: 'Personal Touch', description: 'Completed personal information!', icon: '✨' },
  { id: 'experience-complete', title: 'Experience Expert', description: 'Showcased your work experience!', icon: '🏆' },
  { id: 'education-complete', title: 'Learning Legend', description: 'Highlighted your education!', icon: '🎓' },
  { id: 'skills-complete', title: 'Skill Showcase', description: 'Displayed your amazing skills!', icon: '🌟' },
  { id: 'projects-complete', title: 'Project Pro', description: 'Featured your creative projects!', icon: '🚀' },
  { id: 'halfway-hero', title: 'Halfway Hero', description: 'You\'re halfway to an amazing resume!', icon: '🎯' },
  { id: 'resume-complete', title: 'Resume Rockstar', description: 'Completed your entire resume!', icon: '👑' },
  { id: 'persistent-builder', title: 'Persistent Builder', description: 'Worked on your resume for 30+ minutes!', icon: '💪' },
  { id: 'detail-oriented', title: 'Detail Oriented', description: 'Added extra details to make it shine!', icon: '💎' },
];

export const getRandomAffirmation = (): string => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % dailyAffirmations.length;
  return dailyAffirmations[index];
};

export const getMotivationalMessage = (sectionId: string): string => {
  return sectionMotivationalMessages[sectionId as keyof typeof sectionMotivationalMessages] || 
         "You're doing great! Keep building your amazing resume! 🌟";
};

export const getCompletionMessage = (sectionId: string): string => {
  return completionMessages[sectionId as keyof typeof completionMessages] || 
         "Section completed! You're making fantastic progress! 🎉";
};

export const getAchievementBadge = (badgeId: string) => {
  return achievementBadges.find(badge => badge.id === badgeId);
};