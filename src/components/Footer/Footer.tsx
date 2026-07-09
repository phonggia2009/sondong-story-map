import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { useVillages } from '@/hooks/useVillages';
import { useIsMobile } from '@/hooks/useIsMobile';
import { APP_CONFIG } from '@/config';

// ============================================================
//  Footer Component — with quick navigation buttons
// ============================================================

export const Footer = memo(function Footer() {
  const { isDark, selectedVillage, selectVillage } = useAppContext();
  const { villages } = useVillages();
  const isMobile = useIsMobile();

  // Hide footer on mobile to save space
  if (isMobile) return null;

  const currentIndex = selectedVillage
    ? villages.findIndex((v) => v.id === selectedVillage.id)
    : -1;

  const handlePrev = () => {
    if (villages.length === 0) return;
    const idx = currentIndex > 0 ? currentIndex - 1 : villages.length - 1;
    selectVillage(villages[idx]);
  };

  const handleNext = () => {
    if (villages.length === 0) return;
    const idx = currentIndex < villages.length - 1 ? currentIndex + 1 : 0;
    selectVillage(villages[idx]);
  };

  return (
    <footer className={`
      flex-shrink-0 flex items-center justify-between px-4 h-9 text-xs
      border-t transition-colors duration-300
      ${isDark
        ? 'bg-gov-950 border-gov-800/60 text-gov-500'
        : 'bg-gray-50 border-gray-200 text-gray-400'
      }
    `}>
      {/* Left — branding */}
      <span className="truncate max-w-[200px]">
        {APP_CONFIG.title} — {APP_CONFIG.organization}
      </span>

      {/* Center — navigation buttons (only when a village is selected) */}
      {selectedVillage ? (
        <div className="flex items-center gap-1">
          <motion.button
            onClick={handlePrev}
            className={`
              flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
              transition-colors
              ${isDark
                ? 'hover:bg-gov-800 text-gov-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-800'
              }
            `}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Thôn trước</span>
          </motion.button>

          <span className={`
            px-2 py-0.5 rounded text-[10px] font-mono tabular-nums
            ${isDark ? 'bg-gov-800 text-gov-300' : 'bg-gray-100 text-gray-600'}
          `}>
            {currentIndex + 1} / {villages.length}
          </span>

          <motion.button
            onClick={handleNext}
            className={`
              flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
              transition-colors
              ${isDark
                ? 'hover:bg-gov-800 text-gov-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-800'
              }
            `}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden lg:inline">Thôn tiếp</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      ) : (
        <span>Bản đồ tổng quan</span>
      )}

      {/* Right — copyright */}
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
});
