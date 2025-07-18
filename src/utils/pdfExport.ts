import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '@/types/resume';

export const generatePDF = async (resumeData: Partial<ResumeData>, fileName: string = 'resume.pdf'): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Add header
    pdf.setFontSize(24);
    pdf.setTextColor(33, 37, 41);
    const fullName = `${resumeData.personalInfo?.firstName || ''} ${resumeData.personalInfo?.lastName || ''}`.trim();
    pdf.text(fullName, margin, yPosition);
    yPosition += 15;

    // Add contact info
    pdf.setFontSize(12);
    pdf.setTextColor(108, 117, 125);
    const contactInfo = [
      resumeData.personalInfo?.email,
      resumeData.personalInfo?.phone,
      `${resumeData.personalInfo?.city || ''}, ${resumeData.personalInfo?.state || ''}`.trim().replace(/^,\s*|,\s*$/g, ''),
      resumeData.personalInfo?.linkedIn,
      resumeData.personalInfo?.website,
    ].filter(Boolean);

    contactInfo.forEach(info => {
      if (info) {
        pdf.text(info, margin, yPosition);
        yPosition += 6;
      }
    });

    yPosition += 5;

    // Add summary
    if (resumeData.personalInfo?.summary) {
      pdf.setFontSize(16);
      pdf.setTextColor(33, 37, 41);
      pdf.text('Professional Summary', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setTextColor(73, 80, 87);
      const summaryLines = pdf.splitTextToSize(resumeData.personalInfo.summary, contentWidth);
      summaryLines.forEach((line: string) => {
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 5;
    }

    // Add work experience
    if (resumeData.workExperience && resumeData.workExperience.length > 0) {
      pdf.setFontSize(16);
      pdf.setTextColor(33, 37, 41);
      pdf.text('Work Experience', margin, yPosition);
      yPosition += 8;

      resumeData.workExperience.forEach(exp => {
        pdf.setFontSize(14);
        pdf.setTextColor(33, 37, 41);
        pdf.text(`${exp.jobTitle} at ${exp.company}`, margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(11);
        pdf.setTextColor(108, 117, 125);
        const dateRange = exp.isCurrentRole ? 
          `${exp.startDate} - Present` : 
          `${exp.startDate} - ${exp.endDate || 'Present'}`;
        pdf.text(`${dateRange} | ${exp.location}`, margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(11);
        pdf.setTextColor(73, 80, 87);
        const descLines = pdf.splitTextToSize(exp.description, contentWidth);
        descLines.forEach((line: string) => {
          pdf.text(line, margin, yPosition);
          yPosition += 5;
        });

        if (exp.achievements && exp.achievements.length > 0) {
          yPosition += 2;
          exp.achievements.forEach(achievement => {
            pdf.text(`• ${achievement}`, margin + 5, yPosition);
            yPosition += 5;
          });
        }
        yPosition += 8;
      });
    }

    // Add education
    if (resumeData.education && resumeData.education.length > 0) {
      pdf.setFontSize(16);
      pdf.setTextColor(33, 37, 41);
      pdf.text('Education', margin, yPosition);
      yPosition += 8;

      resumeData.education.forEach(edu => {
        pdf.setFontSize(14);
        pdf.setTextColor(33, 37, 41);
        pdf.text(`${edu.degree} - ${edu.institution}`, margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(11);
        pdf.setTextColor(108, 117, 125);
        const details = [edu.location, edu.graduationDate, edu.gpa ? `GPA: ${edu.gpa}` : ''].filter(Boolean);
        pdf.text(details.join(' | '), margin, yPosition);
        yPosition += 6;

        if (edu.relevantCourses && edu.relevantCourses.length > 0) {
          pdf.setFontSize(11);
          pdf.setTextColor(73, 80, 87);
          pdf.text('Relevant Courses: ' + edu.relevantCourses.join(', '), margin, yPosition);
          yPosition += 5;
        }
        yPosition += 8;
      });
    }

    // Add skills
    if (resumeData.skills && resumeData.skills.length > 0) {
      pdf.setFontSize(16);
      pdf.setTextColor(33, 37, 41);
      pdf.text('Skills', margin, yPosition);
      yPosition += 8;

      const skillsByCategory = resumeData.skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(`${skill.name} (${skill.level})`);
        return acc;
      }, {} as Record<string, string[]>);

      Object.entries(skillsByCategory).forEach(([category, skills]) => {
        pdf.setFontSize(12);
        pdf.setTextColor(33, 37, 41);
        pdf.text(`${category}:`, margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(11);
        pdf.setTextColor(73, 80, 87);
        const skillsText = skills.join(', ');
        const skillLines = pdf.splitTextToSize(skillsText, contentWidth);
        skillLines.forEach((line: string) => {
          pdf.text(line, margin + 5, yPosition);
          yPosition += 5;
        });
        yPosition += 3;
      });
    }

    // Add projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      pdf.setFontSize(16);
      pdf.setTextColor(33, 37, 41);
      pdf.text('Projects', margin, yPosition);
      yPosition += 8;

      resumeData.projects.forEach(project => {
        pdf.setFontSize(14);
        pdf.setTextColor(33, 37, 41);
        pdf.text(project.name, margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(11);
        pdf.setTextColor(108, 117, 125);
        const projectDate = project.endDate ? 
          `${project.startDate} - ${project.endDate}` : 
          `${project.startDate} - Present`;
        pdf.text(projectDate, margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(11);
        pdf.setTextColor(73, 80, 87);
        const descLines = pdf.splitTextToSize(project.description, contentWidth);
        descLines.forEach((line: string) => {
          pdf.text(line, margin, yPosition);
          yPosition += 5;
        });

        if (project.technologies && project.technologies.length > 0) {
          yPosition += 2;
          pdf.text('Technologies: ' + project.technologies.join(', '), margin, yPosition);
          yPosition += 5;
        }

        if (project.url || project.github) {
          const links = [project.url, project.github].filter(Boolean);
          pdf.text('Links: ' + links.join(', '), margin, yPosition);
          yPosition += 5;
        }
        yPosition += 8;
      });
    }

    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const getEncouragingCompletionMessage = (sectionsCompleted: number): string => {
  const messages = [
    "🎉 Congratulations! You've created something amazing! Your resume showcases your incredible journey and achievements. You should be proud of the professional story you've built!",
    "✨ What a fantastic accomplishment! Your resume beautifully captures your skills, experience, and unique value. You're ready to share your story with the world!",
    "🌟 Incredible work! You've transformed your experiences into a compelling professional narrative. Your resume reflects the amazing person and professional you are!",
    "🚀 Outstanding! You've successfully created a resume that highlights your strengths and achievements. This is your ticket to exciting new opportunities!",
    "💫 Brilliant! Your dedication to building this resume shows your commitment to your career growth. You've created something that truly represents your professional excellence!"
  ];
  
  return messages[sectionsCompleted % messages.length] || messages[0];
};