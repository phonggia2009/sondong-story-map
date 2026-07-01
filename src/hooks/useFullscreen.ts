import { useState, useCallback, useEffect } from 'react';

// ============================================================
//  useFullscreen Hook
//  Wraps the Fullscreen API with a clean interface.
// ============================================================

export function useFullscreen(targetRef?: React.RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const enter = useCallback(async () => {
    const element = targetRef?.current ?? document.documentElement;
    try {
      await element.requestFullscreen();
    } catch {
      console.warn('Fullscreen not supported or denied.');
    }
  }, [targetRef]);

  const exit = useCallback(async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        console.warn('Failed to exit fullscreen.');
      }
    }
  }, []);

  const toggle = useCallback(() => {
    if (isFullscreen) {
      exit();
    } else {
      enter();
    }
  }, [isFullscreen, enter, exit]);

  return { isFullscreen, enter, exit, toggle };
}
