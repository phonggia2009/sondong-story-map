import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
//  ImageWithFallback Component
//  Safe image loader — shows placeholder on error, never crashes.
// ============================================================

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  onLoad?: () => void;
  priority?: boolean;
  svgFallback?: string;  // Alternative SVG URL to try before showing placeholder
}

const PlaceholderSVG = ({ text }: { text: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center
                  bg-gradient-to-br from-gov-800 to-gov-900
                  border border-gov-700 rounded-inherit">
    <svg
      className="w-16 h-16 mb-3 text-gov-500 opacity-60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
      />
    </svg>
    <p className="text-gov-400 text-sm font-medium text-center px-4">{text}</p>
    <p className="text-gov-600 text-xs mt-1">Chưa có hình ảnh</p>
  </div>
);

export const ImageWithFallback = memo(function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackText,
  onLoad,
  priority = false,
  svgFallback,
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [triedSvg, setTriedSvg] = useState(false);

  // Reset state when src changes
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setCurrentSrc(src);
    setStatus('loading');
    setTriedSvg(false);
  }

  const handleLoad = useCallback(() => {
    setStatus('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    // Try SVG fallback before showing placeholder
    if (!triedSvg && svgFallback) {
      setTriedSvg(true);
      setCurrentSrc(svgFallback);
      setStatus('loading');
    } else {
      setStatus('error');
    }
  }, [triedSvg, svgFallback]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {status === 'error' ? (
          <motion.div
            key="placeholder"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PlaceholderSVG text={fallbackText ?? alt} />
          </motion.div>
        ) : (
          <motion.img
            key={currentSrc}
            src={currentSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              status === 'loaded' ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0 }}
            animate={{ opacity: status === 'loaded' ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Skeleton loading state */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gov-800 animate-pulse" />
      )}
    </div>
  );
});
