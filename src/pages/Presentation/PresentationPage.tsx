import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppContext } from '@/context/AppContext';
import { useVillages } from '@/hooks/useVillages';
import { usePresentation } from '@/hooks/usePresentation';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { MapViewer } from '@/components/MapViewer/MapViewer';
import { InformationPanel } from '@/components/InformationPanel/InformationPanel';
import { PresentationControls } from '@/components/PresentationControls/PresentationControls';
import { LoadingScreen } from '@/components/Loading/LoadingScreen';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { getVillageImageUrl } from '@/config';
import type { Village } from '@/types';

// ============================================================
//  PresentationPage
//  Fullscreen presentation mode with autoplay and keyboard nav.
// ============================================================

export default function PresentationPage() {
  const navigate = useNavigate();
  const { isDark, exitPresentation } = useAppContext();
  const { villages, isLoading, isError, error, refetch } = useVillages();

  // Village change callback (can be used to sync with other systems)
  const handleVillageChange = useCallback((_village: Village) => {
    // Intentionally empty — extend here for analytics/sync
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    currentIndex,
    currentVillage,
    totalCount,
    isPlaying,
    interval,
    progress,
    goNext,
    goPrev,
    toggleAutoPlay,
    setIntervalDuration,
  } = usePresentation({
    villages,
    onVillageChange: handleVillageChange,
  });

  // Preload adjacent images
  useImagePreloader(villages, currentIndex, 3);

  const handleExit = useCallback(() => {
    exitPresentation();
    navigate('/');
  }, [exitPresentation, navigate]);

  // Keyboard shortcuts for presentation mode
  useKeyboard([
    { key: 'ArrowRight', handler: goNext },
    { key: 'ArrowLeft',  handler: goPrev },
    { key: ' ',          handler: toggleAutoPlay },
    { key: 'Escape',     handler: handleExit },
    { key: 'f',          handler: () => document.documentElement.requestFullscreen?.() },
    { key: 'F',          handler: () => document.documentElement.requestFullscreen?.() },
  ]);

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? 'bg-gov-950' : 'bg-gray-50'}`}>
        <EmptyState type="error" error={error} onRetry={() => refetch()} />
      </div>
    );
  }

  const imageUrl = currentVillage
    ? getVillageImageUrl(currentVillage.image)
    : '/maps/overview.png';

  return (
    <motion.div
      className={`flex flex-col flex-1 overflow-hidden ${isDark ? 'bg-gov-950' : 'bg-white'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Exit button */}
      <motion.button
        onClick={handleExit}
        className={`
          absolute top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          ${isDark
            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
            : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
          }
          transition-colors
        `}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        title="Thoát (ESC)"
      >
        <X className="w-3.5 h-3.5" />
        Thoát (ESC)
      </motion.button>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map viewer — takes most of the space */}
        <MapViewer
          imageUrl={imageUrl}
          imageAlt={currentVillage?.name ?? 'Bản đồ tổng quan'}
          isOverview={!currentVillage}
          label={currentVillage?.name}
        />

        {/* Info panel */}
        <AnimatePresence>
          {currentVillage && (
            <motion.div
              className="flex-shrink-0"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <InformationPanel
                village={currentVillage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <AnimatePresence>
        <PresentationControls
          currentIndex={currentIndex}
          totalCount={totalCount}
          isPlaying={isPlaying}
          progress={progress}
          interval={interval}
          villageName={currentVillage?.name}
          onPrev={goPrev}
          onNext={goNext}
          onTogglePlay={toggleAutoPlay}
          onIntervalChange={setIntervalDuration}
        />
      </AnimatePresence>
    </motion.div>
  );
}
