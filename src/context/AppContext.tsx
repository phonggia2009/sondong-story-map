import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Village } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { useFullscreen } from '@/hooks/useFullscreen';

// ============================================================
//  APP CONTEXT
//  Global UI state shared across all components.
// ============================================================

interface AppContextValue {
  // Village selection
  selectedVillage: Village | null;
  selectVillage: (village: Village | null) => void;

  // View mode
  isOverview: boolean;

  // Presentation mode
  isPresenting: boolean;
  enterPresentation: () => void;
  exitPresentation: () => void;
  togglePresentation: () => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Info panel
  infoPanelOpen: boolean;
  setInfoPanelOpen: (open: boolean) => void;
  toggleInfoPanel: () => void;

  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Fullscreen
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [isPresenting, setIsPresenting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [infoPanelOpen, setInfoPanelOpen] = useState(true);

  const { isDark, toggle: toggleTheme } = useTheme();
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();

  const selectVillage = useCallback((village: Village | null) => {
    setSelectedVillage(village);
    if (village === null) {
      // Auto-hide panel when returning to overview
      setInfoPanelOpen(false);
    } else if (!infoPanelOpen) {
      setInfoPanelOpen(true);
    }
  }, [infoPanelOpen]);

  const toggleInfoPanel = useCallback(() => {
    setInfoPanelOpen((o) => !o);
  }, []);

  const enterPresentation = useCallback(() => {
    setIsPresenting(true);
    setSidebarOpen(false);
  }, []);

  const exitPresentation = useCallback(() => {
    setIsPresenting(false);
    setSidebarOpen(true);
  }, []);

  const togglePresentation = useCallback(() => {
    if (isPresenting) {
      exitPresentation();
    } else {
      enterPresentation();
    }
  }, [isPresenting, enterPresentation, exitPresentation]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((o) => !o);
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    selectedVillage,
    selectVillage,
    isOverview: selectedVillage === null,
    isPresenting,
    enterPresentation,
    exitPresentation,
    togglePresentation,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    infoPanelOpen,
    setInfoPanelOpen,
    toggleInfoPanel,
    isDark,
    toggleTheme,
    isFullscreen,
    toggleFullscreen,
  }), [
    selectedVillage, selectVillage,
    isPresenting, enterPresentation, exitPresentation, togglePresentation,
    sidebarOpen, setSidebarOpen, toggleSidebar,
    infoPanelOpen, setInfoPanelOpen, toggleInfoPanel,
    isDark, toggleTheme,
    isFullscreen, toggleFullscreen,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return ctx;
}
