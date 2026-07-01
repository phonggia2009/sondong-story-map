import { useState, useCallback, useEffect, useRef } from 'react';
import type { Village } from '@/types';
import { APP_CONFIG } from '@/config';

// ============================================================
//  usePresentation Hook
//  Manages presentation mode state, autoplay, and navigation.
// ============================================================

interface UsePresentationOptions {
  villages: Village[];
  initialIndex?: number;
  onVillageChange?: (village: Village) => void;
}

export function usePresentation({
  villages,
  initialIndex = 0,
  onVillageChange,
}: UsePresentationOptions) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interval, setIntervalDuration] = useState(
    APP_CONFIG.presentation.interval
  );
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const totalCount = villages.length;
  const currentVillage = villages[currentIndex] ?? null;

  // Notify on village change
  useEffect(() => {
    if (currentVillage && onVillageChange) {
      onVillageChange(currentVillage);
    }
  }, [currentVillage, onVillageChange]);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % totalCount);
    setProgress(0);
  }, [totalCount]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + totalCount) % totalCount);
    setProgress(0);
  }, [totalCount]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalCount) {
      setCurrentIndex(index);
      setProgress(0);
    }
  }, [totalCount]);

  // Autoplay engine
  const startAutoPlay = useCallback(() => {
    clearTimers();
    setIsPlaying(true);
    setProgress(0);
    startTimeRef.current = Date.now();

    // Progress ticker (60fps)
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min(elapsed / interval, 1));
    }, 16);

    // Advance to next village
    timerRef.current = setTimeout(() => {
      goNext();
    }, interval);
  }, [interval, goNext, clearTimers]);

  const stopAutoPlay = useCallback(() => {
    clearTimers();
    setIsPlaying(false);
    setProgress(0);
  }, [clearTimers]);

  const toggleAutoPlay = useCallback(() => {
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }, [isPlaying, startAutoPlay, stopAutoPlay]);

  // Restart timer when index changes during autoplay
  useEffect(() => {
    if (isPlaying) {
      startAutoPlay();
    }
    return clearTimers;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPlaying, interval]);

  // Cleanup on unmount
  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  return {
    currentIndex,
    currentVillage,
    totalCount,
    isPlaying,
    interval,
    progress,
    goNext,
    goPrev,
    goTo,
    startAutoPlay,
    stopAutoPlay,
    toggleAutoPlay,
    setIntervalDuration,
  };
}
