import { memo } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

// ============================================================
//  LandmarkList Component
// ============================================================

interface LandmarkListProps {
  landmarks: string[];
}

export const LandmarkList = memo(function LandmarkList({ landmarks }: LandmarkListProps) {
  const { isDark } = useAppContext();

  if (!landmarks || landmarks.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Navigation className={`w-3.5 h-3.5 ${isDark ? 'text-gold-400' : 'text-gold-600'}`} />
        <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gov-400' : 'text-gray-500'}`}>
          Đường & Địa Danh
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {landmarks.map((landmark, idx) => (
          <motion.span
            key={idx}
            className={`
              inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium
              ${isDark
                ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
              }
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.06 }}
          >
            {landmark}
          </motion.span>
        ))}
      </div>
    </div>
  );
});
