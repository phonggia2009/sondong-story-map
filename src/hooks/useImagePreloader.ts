import { useEffect, useRef } from 'react';
import { preloadImage } from '@/services/dataService';
import { getVillageImageUrl } from '@/config';
import type { Village } from '@/types';

// ============================================================
//  useImagePreloader Hook
//  Preloads adjacent village images for smooth transitions.
// ============================================================

export function useImagePreloader(
  villages: Village[],
  currentIndex: number,
  lookahead: number = 2
) {
  const preloadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (villages.length === 0) return;

    const toPreload: string[] = [];

    for (let i = 1; i <= lookahead; i++) {
      const nextIndex = (currentIndex + i) % villages.length;
      const prevIndex = (currentIndex - i + villages.length) % villages.length;

      const nextImg = villages[nextIndex]?.image;
      const prevImg = villages[prevIndex]?.image;

      if (nextImg) toPreload.push(getVillageImageUrl(nextImg));
      if (prevImg) toPreload.push(getVillageImageUrl(prevImg));
    }

    // Only preload images not already loaded
    toPreload.forEach((url) => {
      if (!preloadedRef.current.has(url)) {
        preloadedRef.current.add(url);
        preloadImage(url).catch(() => {
          // Silently fail — the ImageWithFallback component handles the error
          preloadedRef.current.delete(url);
        });
      }
    });
  }, [villages, currentIndex, lookahead]);
}
