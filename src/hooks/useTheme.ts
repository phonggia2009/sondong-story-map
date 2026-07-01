import { useState, useEffect, useCallback } from 'react';

// ============================================================
//  useTheme Hook
//  Manages light/dark theme with localStorage persistence.
// ============================================================

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('gov-map-theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    // System preference fallback
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('gov-map-theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const setLight = useCallback(() => setTheme('light'), []);
  const setDark = useCallback(() => setTheme('dark'), []);

  return { theme, toggle, setLight, setDark, isDark: theme === 'dark' };
}
