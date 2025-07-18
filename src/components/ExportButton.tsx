'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ResumeData } from '@/types/resume';
import { generatePDF, getEncouragingCompletionMessage } from '@/utils/pdfExport';
import toast from 'react-hot-toast';

interface ExportButtonProps {
  resumeData: Partial<ResumeData>;
  completedSections: string[];
  disabled?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  resumeData,
  completedSections,
  disabled = false,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!resumeData.personalInfo?.firstName || !resumeData.personalInfo?.lastName) {
      toast.error('Please complete your personal information first! 💫');
      return;
    }

    setIsExporting(true);
    
    try {
      const fileName = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`;
      await generatePDF(resumeData, fileName);
      
      const message = getEncouragingCompletionMessage(completedSections.length);
      toast.success(message, {
        duration: 8000,
        style: {
          background: '#10B981',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          maxWidth: '500px',
        },
      });
    } catch (error) {
      toast.error('Oops! Something went wrong with the export. Please try again! 🔧');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={handleExport}
      disabled={disabled || isExporting}
      className={`
        px-8 py-4 rounded-xl font-semibold text-white text-lg shadow-lg transition-all duration-200
        ${disabled || isExporting
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:shadow-xl'
        }
      `}
    >
      {isExporting ? (
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Creating your amazing resume...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span>📄</span>
          <span>Export Your Resume</span>
        </div>
      )}
    </motion.button>
  );
};