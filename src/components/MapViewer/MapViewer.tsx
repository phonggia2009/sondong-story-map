import { memo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './ImageWithFallback';
import { Toolbar } from '@/components/Toolbar/Toolbar';

// ============================================================
//  MapViewer Component
//  Center panel with zoom/pan + animated image transitions.
// ============================================================

interface MapViewerProps {
  imageUrl: string;
  imageAlt: string;
  isOverview: boolean;
  label?: string;
}

export const MapViewer = memo(function MapViewer({
  imageUrl,
  imageAlt,
  isOverview,
  label,
}: MapViewerProps) {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden bg-gov-950">
      {/* Label overlay */}
      <AnimatePresence>
        {label && (
          <motion.div
            key={label}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="
              px-4 py-1.5 rounded-full text-sm font-semibold text-white
              bg-gov-800/80 backdrop-blur-sm border border-gov-700/60 shadow-glass
            ">
              {isOverview ? '🗺 Bản đồ tổng quan' : `📍 ${label}`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom/Pan Wrapper */}
      <TransformWrapper
        key={imageUrl}  // Reset transform when image changes
        initialScale={1}
        minScale={0.3}
        maxScale={8}
        wheel={{ step: 0.08 }}
        doubleClick={{ step: 0.7 }}
        centerOnInit
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full"
            >
              {/* Animated image cross-fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageUrl}
                  className="w-full h-full min-h-[400px]"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                  <ImageWithFallback
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-full"
                    fallbackText={imageAlt}
                    svgFallback={isOverview ? '/maps/overview.png' : undefined}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </TransformComponent>

            {/* Toolbar (zoom controls) */}
            <Toolbar
              onZoomIn={() => zoomIn()}
              onZoomOut={() => zoomOut()}
              onReset={() => resetTransform()}
            />
          </>
        )}
      </TransformWrapper>

      {/* Corner grid decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gov-800 via-accent-600/40 to-gov-800 pointer-events-none" />
    </div>
  );
});
