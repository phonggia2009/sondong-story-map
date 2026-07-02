import { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useVillages } from '@/hooks/useVillages';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { MapViewer } from '@/components/MapViewer/MapViewer';
import { InformationPanel } from '@/components/InformationPanel/InformationPanel';
import { LoadingScreen } from '@/components/Loading/LoadingScreen';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { getOverviewMapUrl, getVillageImageUrl } from '@/config';
import type { Village } from '@/types';

// ============================================================
//  HomePage
//  Three-panel layout: Sidebar | MapViewer | InformationPanel
// ============================================================

export default function HomePage() {
  const {
    selectedVillage,
    selectVillage,
    infoPanelOpen,
    setInfoPanelOpen,
    isPresenting,
  } = useAppContext();

  const { villages, isLoading, isError, error, refetch } = useVillages();

  // Current index tracking
  const currentIndex = useMemo(() => {
    if (!selectedVillage) return 0;
    return villages.findIndex((v) => v.id === selectedVillage.id);
  }, [selectedVillage, villages]);

  // Navigation handlers
  const handleVillageSelect = useCallback((village: Village) => {
    selectVillage(village);
  }, [selectVillage]);

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

  // Image preloading for adjacent villages
  useImagePreloader(villages, currentIndex);

  // Keyboard shortcuts
  useKeyboard([
    { key: 'ArrowLeft',  handler: handlePrev, description: 'Village précédente' },
    { key: 'ArrowRight', handler: handleNext, description: 'Village suivante' },
    { key: 'Escape',     handler: () => selectVillage(null), description: 'Retour à la vue générale' },
  ], !isPresenting);

  // Computed values
  const imageUrl = selectedVillage
    ? getVillageImageUrl(selectedVillage.image)
    : getOverviewMapUrl();

  const imageAlt = selectedVillage?.name ?? 'Bản đồ tổng quan';

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
      className="flex flex-1 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* LEFT — Information Panel */}
      {infoPanelOpen && (
        <InformationPanel
          village={selectedVillage}
          onClose={() => setInfoPanelOpen(false)}
        />
      )}

      {/* CENTER — Map Viewer */}
      <MapViewer
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        isOverview={!selectedVillage}
        label={selectedVillage?.name ?? 'Tổng quan'}
      />

      {/* RIGHT — Sidebar */}
      <Sidebar
        villages={villages}
        currentIndex={currentIndex}
        onVillageSelect={handleVillageSelect}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </motion.div>
  );
}
