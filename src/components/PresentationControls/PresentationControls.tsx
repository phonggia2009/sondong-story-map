import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Timer,
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { APP_CONFIG, INTERVAL_LABELS } from '@/config';

// ============================================================
//  PresentationControls Component
//  Bottom bar shown in presentation mode.
// ============================================================

interface PresentationControlsProps {
  currentIndex: number;
  totalCount: number;
  isPlaying: boolean;
  progress: number;       // 0–1
  interval: number;
  villageName?: string;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onIntervalChange: (ms: number) => void;
}

export const PresentationControls = memo(function PresentationControls({
  currentIndex,
  totalCount,
  isPlaying,
  progress,
  interval,
  villageName,
  onPrev,
  onNext,
  onTogglePlay,
  onIntervalChange,
}: PresentationControlsProps) {
  const { isDark } = useAppContext();

  const handleIntervalChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onIntervalChange(Number(e.target.value));
    },
    [onIntervalChange]
  );

  const progressPct = Math.round(progress * 100);

  return (
    <motion.div
      className={`
        flex-shrink-0 relative border-t
        ${isDark
          ? 'bg-gov-950/95 border-gov-800'
          : 'bg-white/95 border-gray-200'
        }
        backdrop-blur-sm
      `}
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      exit={{ y: 80 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Progress bar */}
      <div className={`h-1 ${isDark ? 'bg-gov-800' : 'bg-gray-200'}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-accent-500 to-accent-400"
          style={{ width: `${((currentIndex + (isPlaying ? progress : 0)) / totalCount) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Autoplay progress bar (within current slide) */}
      {isPlaying && (
        <motion.div
          className="absolute top-1 left-0 h-0.5 bg-gold-400/70"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.1 }}
        />
      )}

      {/* Controls row */}
      <div className="flex items-center justify-between px-6 py-3 gap-4">
        {/* Left — Village info */}
        <div className="flex-1 min-w-0">
          {villageName ? (
            <motion.div
              key={villageName}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className={`text-xs ${isDark ? 'text-gov-500' : 'text-gray-400'}`}>
                Đang trình chiếu
              </p>
              <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {villageName}
              </p>
            </motion.div>
          ) : (
            <p className={`text-sm ${isDark ? 'text-gov-500' : 'text-gray-400'}`}>
              Bản đồ tổng quan
            </p>
          )}
        </div>

        {/* Center — Navigation */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onPrev}
            className={`
              p-2.5 rounded-xl transition-colors
              ${isDark
                ? 'bg-gov-800 text-gov-300 hover:bg-gov-700 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Trước (←)"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Play/Pause */}
          <motion.button
            onClick={onTogglePlay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                       bg-gradient-to-r from-gov-700 to-accent-600 text-white
                       hover:from-gov-600 hover:to-accent-500 transition-all shadow-glow"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            title={isPlaying ? 'Dừng (Space)' : 'Phát (Space)'}
          >
            {isPlaying
              ? <Pause className="w-4 h-4" />
              : <Play className="w-4 h-4" />
            }
            {isPlaying ? 'Dừng' : 'Phát'}
          </motion.button>

          <motion.button
            onClick={onNext}
            className={`
              p-2.5 rounded-xl transition-colors
              ${isDark
                ? 'bg-gov-800 text-gov-300 hover:bg-gov-700 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Tiếp (→)"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Right — Counter + Interval */}
        <div className="flex-1 flex items-center justify-end gap-3 min-w-0">
          {/* Interval selector */}
          <div className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-gov-500' : 'text-gray-400'}`}>
            <Timer className="w-3.5 h-3.5" />
            <select
              value={interval}
              onChange={handleIntervalChange}
              className={`
                text-xs rounded-lg px-2 py-1 outline-none border transition-colors
                ${isDark
                  ? 'bg-gov-800 border-gov-700 text-gov-300 hover:border-gov-600'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                }
              `}
            >
              {APP_CONFIG.presentation.intervals.map((ms) => (
                <option key={ms} value={ms}>
                  {INTERVAL_LABELS[ms]}
                </option>
              ))}
            </select>
          </div>

          {/* Slide counter */}
          <div className={`text-sm font-mono ${isDark ? 'text-gov-400' : 'text-gray-500'}`}>
            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {currentIndex + 1}
            </span>
            <span> / {totalCount}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
