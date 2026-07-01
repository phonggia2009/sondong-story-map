import type { AppConfig } from '@/types';

// ============================================================
//  APPLICATION CONFIGURATION
//  Modify this file to customize the application without
//  touching any component source code.
// ============================================================

export const APP_CONFIG: AppConfig = {
  // ─── Identity ─────────────────────────────────────────────
  title: 'Hệ Thống Bản Đồ Hành Chính',
  subtitle: 'Nền Tảng Trình Bày Ranh Giới Hành Chính',
  organization: 'UBND Xã Sơn Đồng',
  logo: null, // Set to '/logo.png' if you have a logo

  // ─── Brand Colors ──────────────────────────────────────────
  colors: {
    primary: '#1e3a8a',   // Government deep blue
    accent:  '#3b82f6',   // Interactive blue
    gold:    '#f59e0b',   // Accent gold for highlights
  },

  // ─── Animation ─────────────────────────────────────────────
  animation: {
    duration: 400,        // milliseconds
    ease: 'easeInOut',
  },

  // ─── Presentation ──────────────────────────────────────────
  presentation: {
    interval: 10000,      // default autoplay interval (ms)
    autoPlay: false,
    intervals: [5000, 10000, 15000, 30000], // configurable options
  },

  // ─── Public Asset Paths ────────────────────────────────────
  paths: {
    maps:     '/maps',
    villages: '/villages',
    data:     '/data',
  },
};

// ─── Derived helpers ───────────────────────────────────────────

/** Returns the full URL for the overview map image.
 *  Looks for overview.png first. If missing, falls back to overview.svg.
 *  Replace public/maps/overview.png with your real map image.
 */
export const getOverviewMapUrl = (): string =>
  `${APP_CONFIG.paths.maps}/overview.png`;

/** Returns the full URL for a village image by filename */
export const getVillageImageUrl = (filename: string): string =>
  `${APP_CONFIG.paths.villages}/${filename}`;

/** Returns the full URL for the JSON data file */
export const getDataUrl = (): string =>
  `${APP_CONFIG.paths.data}/villages.json`;

/** Interval labels in Vietnamese for the UI */
export const INTERVAL_LABELS: Record<number, string> = {
  5000:  '5 giây',
  10000: '10 giây',
  15000: '15 giây',
  30000: '30 giây',
};

/** Boundary direction labels in Vietnamese */
export const DIRECTION_LABELS: Record<string, string> = {
  north: 'Phía Bắc',
  south: 'Phía Nam',
  east:  'Phía Đông',
  west:  'Phía Tây',
};

export const DIRECTION_ICONS: Record<string, string> = {
  north: '↑',
  south: '↓',
  east:  '→',
  west:  '←',
};
