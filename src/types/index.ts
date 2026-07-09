// ============================================================
//  VILLAGE DATA TYPES
// ============================================================

export interface Village {
  id: number;
  name: string;
  image: string;           // filename only, e.g. "ngoai.png"
  area: string;            // e.g. "95 ha"
  partyMembers: number;
  households?: number;
  population?: number;
  east: string;
  west: string;
  south: string;
  north: string;
  landmarks: string[];
  description: string;
  coordinates?: {          // future GIS support
    lat: number;
    lng: number;
  };
  polygon?: [number, number][];  // future GeoJSON support
  geojson_boundary_index?: number;
  geojson_label_index?: number;
}

// ============================================================
//  APP CONFIGURATION TYPES
// ============================================================

export interface AnimationConfig {
  duration: number;
  ease: string;
}

export interface PresentationConfig {
  interval: number;       // ms between slides
  autoPlay: boolean;
  intervals: number[];    // available intervals in ms
}

export interface PathsConfig {
  maps: string;
  villages: string;
  data: string;
}

export interface ColorsConfig {
  primary: string;
  accent: string;
  gold: string;
}

export interface AppConfig {
  title: string;
  subtitle: string;
  organization: string;
  logo: string | null;
  colors: ColorsConfig;
  animation: AnimationConfig;
  presentation: PresentationConfig;
  paths: PathsConfig;
}

// ============================================================
//  UI STATE TYPES
// ============================================================

export type ViewMode = 'overview' | 'village';
export type Theme = 'light' | 'dark';
export type PanelLayout = 'standard' | 'presentation' | 'compact';

export interface AppState {
  selectedVillage: Village | null;
  viewMode: ViewMode;
  theme: Theme;
  isPresenting: boolean;
  isFullscreen: boolean;
  isAutoPlaying: boolean;
  autoPlayInterval: number;
  sidebarOpen: boolean;
  infoPanelOpen: boolean;
}

// ============================================================
//  SEARCH TYPES
// ============================================================

export interface SearchState {
  query: string;
  results: Village[];
  activeIndex: number;
}

// ============================================================
//  VIEWER TYPES
// ============================================================

export interface ViewerState {
  scale: number;
  positionX: number;
  positionY: number;
}

// ============================================================
//  PRESENTATION TYPES
// ============================================================

export interface PresentationState {
  currentIndex: number;
  totalCount: number;
  isPlaying: boolean;
  interval: number;
  progress: number;       // 0–1
}

// ============================================================
//  MAP OVERLAY TYPES (future GIS/GeoJSON support)
// ============================================================

export interface MapLayer {
  id: string;
  name: string;
  type: 'image' | 'geojson' | 'tile' | 'wms';
  visible: boolean;
  opacity: number;
  url?: string;
  data?: unknown;
}

export interface BoundaryDirection {
  direction: 'north' | 'south' | 'east' | 'west';
  label: string;
  value: string;
}

// ============================================================
//  ERROR TYPES
// ============================================================

export interface AppError {
  code: string;
  message: string;
  details?: string;
}
