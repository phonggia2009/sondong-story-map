import { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftOpen } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { useVillages } from '@/hooks/useVillages';
import { useKeyboard } from '@/hooks/useKeyboard';
import { MapViewer } from '@/components/MapViewer/MapViewer';
import { InformationPanel } from '@/components/InformationPanel/InformationPanel';
import { LoadingScreen } from '@/components/Loading/LoadingScreen';
import { EmptyState } from '@/components/EmptyState/EmptyState';

// ============================================================
//  HomePage
//  Map-first layout: MapViewer (full) + InformationPanel overlay
//  Users click directly on the map to select a village
// ============================================================

export default function HomePage() {
  const {
    selectedVillage,
    selectVillage,
    infoPanelOpen,
    setInfoPanelOpen,
    toggleInfoPanel,
    isPresenting,
    isDark,
  } = useAppContext();

  const { villages, isLoading, isError, error, refetch } = useVillages();

  // Current index tracking
  const currentIndex = useMemo(() => {
    if (!selectedVillage) return 0;
    return villages.findIndex((v) => v.id === selectedVillage.id);
  }, [selectedVillage, villages]);

  // Navigation handlers (keyboard arrows cycle through villages)
  const handlePrev = useCallback(() => {
    if (villages.length === 0) return;
    const idx = selectedVillage
      ? (currentIndex - 1 + villages.length) % villages.length
      : villages.length - 1;
    selectVillage(villages[idx]);
  }, [villages, selectedVillage, currentIndex, selectVillage]);

  const handleNext = useCallback(() => {
    if (villages.length === 0) return;
    const idx = selectedVillage
      ? (currentIndex + 1) % villages.length
      : 0;
    selectVillage(villages[idx]);
  }, [villages, selectedVillage, currentIndex, selectVillage]);

  // Keyboard shortcuts
  useKeyboard([
    { key: 'ArrowLeft', handler: handlePrev, description: 'Thôn trước' },
    { key: 'ArrowRight', handler: handleNext, description: 'Thôn tiếp theo' },
    { key: 'Escape', handler: () => selectVillage(null), description: 'Quay về tổng quan' },
  ], !isPresenting);

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          type="error"
          error={error}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (villages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState type="empty" />
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-1 overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* LEFT — Information Panel (slides in when a village is selected on the map) */}
      <AnimatePresence>
        {infoPanelOpen && selectedVillage && (
          <InformationPanel
            village={selectedVillage}
            onClose={() => setInfoPanelOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* FULL — Map Viewer */}
      <div className="relative flex-1 flex overflow-hidden">
        <MapViewer
          selectedVillage={selectedVillage}
        />

        {/* Nút mở lại panel — chỉ hiện khi xem thôn cụ thể và panel đang ẩn */}
        <AnimatePresence>
          {selectedVillage && !infoPanelOpen && (
            <motion.button
              key="open-panel-btn"
              onClick={toggleInfoPanel}
              title="Hiện thông tin chi tiết"
              className={`
                absolute top-3 left-3 z-20
                flex items-center gap-2 px-3 py-2 rounded-xl
                text-xs font-semibold shadow-lg backdrop-blur-sm
                transition-colors
                ${isDark
                  ? 'bg-gov-900/80 text-gov-300 hover:bg-gov-800 border border-gov-700'
                  : 'bg-white/90 text-gray-700 hover:bg-white border border-gray-200'
                }
              `}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <PanelLeftOpen className="w-4 h-4" />
              Thông tin
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

