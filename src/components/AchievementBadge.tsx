'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { getAchievementBadge } from '@/utils/affirmations';

interface AchievementBadgeProps {
  badgeId: string;
  isVisible: boolean;
  onClose: () => void;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  badgeId,
  isVisible,
  onClose,
}) => {
  const badge = getAchievementBadge(badgeId);
  
  if (!badge) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-4 shadow-2xl max-w-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="text-3xl"
                >
                  {badge.icon}
                </motion.div>
                <div>
                  <h3 className="font-bold text-sm">{badge.title}</h3>
                  <p className="text-xs opacity-90">{badge.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white text-lg leading-none"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};