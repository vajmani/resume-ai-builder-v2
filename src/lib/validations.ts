import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "We'd love to know your first name! ✨"),
  lastName: z.string().min(1, "Your last name helps complete your professional identity 💫"),
  email: z.string().email("Let's make sure your email looks perfect for employers 📧"),
  phone: z.string().min(10, "Your phone number helps employers reach you easily 📱"),
  address: z.string().min(1, "Your address shows employers you're ready to work 🏠"),
  city: z.string().min(1, "Which wonderful city do you call home? 🌆"),
  state: z.string().min(1, "Your state helps employers understand your location 🗺️"),
  zipCode: z.string().min(5, "Your zip code completes your professional address 📍"),
  linkedIn: z.string().url("Let's make sure your LinkedIn URL is formatted correctly 🔗").optional().or(z.literal("")),
  website: z.string().url("Your website URL should start with https:// 🌐").optional().or(z.literal("")),
  summary: z.string().min(50, "Your summary is where you shine! Tell us more about your amazing journey (at least 50 characters) ⭐").max(500, "Let's keep your summary focused and impactful (under 500 characters) 🎯"),
});

export const workExperienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, "What was your awesome role called? 🚀"),
  company: z.string().min(1, "Which company was lucky to have you? 🏢"),
  location: z.string().min(1, "Where did this amazing experience take place? 📍"),
  startDate: z.string().min(1, "When did you start this incredible journey? 📅"),
  endDate: z.string().optional(),
  isCurrentRole: z.boolean(),
  description: z.string().min(20, "Tell us about the impact you made in this role! (at least 20 characters) 💪").max(1000, "Let's keep this focused and powerful (under 1000 characters) 🎯"),
  achievements: z.array(z.string()).min(1, "Share at least one achievement - you accomplished amazing things! 🏆"),
});

export const educationSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, "What degree did you earn? Every educational step counts! 🎓"),
  institution: z.string().min(1, "Which institution had the privilege of educating you? 🏫"),
  location: z.string().min(1, "Where did this learning adventure take place? 📍"),
  graduationDate: z.string().optional(),
  gpa: z.string().optional(),
  relevantCourses: z.array(z.string()).default([]),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "What's this amazing skill you possess? 🌟"),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'], {
    message: "Every skill level is valuable - pick the one that fits you best! 📈"
  }),
  category: z.enum(['Technical', 'Soft', 'Language', 'Other'], {
    message: "Help us categorize your wonderful skill! 🏷️"
  }),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "What's the name of this amazing project? 🚀"),
  description: z.string().min(20, "Tell us about this fantastic project! (at least 20 characters) 💡").max(500, "Let's keep it concise and impactful (under 500 characters) 🎯"),
  technologies: z.array(z.string()).min(1, "Which technologies did you master for this project? 🔧"),
  url: z.string().url("Project URL should start with https:// 🌐").optional().or(z.literal("")),
  github: z.string().url("GitHub URL should start with https:// 📂").optional().or(z.literal("")),
  startDate: z.string().min(1, "When did you start building this masterpiece? 📅"),
  endDate: z.string().optional(),
});

export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type WorkExperienceFormData = z.infer<typeof workExperienceSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type SkillFormData = z.infer<typeof skillSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type ResumeFormData = z.infer<typeof resumeDataSchema>;