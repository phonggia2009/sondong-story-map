# 🗺️ Hệ Thống Bản Đồ Hành Chính

**Story Map Presentation System for Vietnamese Government Agencies**

> An interactive Story Map + GIS-like presentation platform for UBND, HĐND, and Ban Chỉ đạo. Built for presenting administrative boundaries of villages (thôn/xã) with professional animations, presentation mode, and real-time search.

![Tech Stack](https://img.shields.io/badge/React-19-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-cyan?logo=tailwindcss)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Story Map Mode** | Click a village → smooth cross-fade transition to village map |
| **Presentation Mode** | Fullscreen mode with keyboard nav (← → ESC F) |
| **Autoplay** | Configurable 5s / 10s / 15s / 30s auto-advance |
| **Real-time Search** | Vietnamese diacritic-aware village search |
| **Zoom & Pan** | Mouse wheel, pinch, double-click zoom on all maps |
| **Dark Mode** | Persisted in localStorage, system preference aware |
| **Fullscreen** | Native Fullscreen API support |
| **Data-Driven** | Replace JSON + images — no code changes needed |
| **GIS-Ready** | Architecture supports future Leaflet/MapLibre integration |

---

## 🚀 Quick Start

### Installation

```bash
# Clone or download the project
cd your-project-folder

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at **http://localhost:5173**

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
story-map-gov/
├── public/
│   ├── data/
│   │   └── villages.json          ← YOUR DATA FILE
│   ├── maps/
│   │   └── overview.png           ← YOUR OVERVIEW MAP
│   └── villages/
│       ├── ngoai.png              ← YOUR VILLAGE IMAGES
│       ├── noi.png
│       └── ...
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── SearchBox/
│   │   ├── MapViewer/
│   │   ├── InformationPanel/
│   │   ├── VillageCard/
│   │   ├── Toolbar/
│   │   ├── PresentationControls/
│   │   ├── Loading/
│   │   ├── EmptyState/
│   │   └── Footer/
│   ├── pages/
│   │   ├── Home/HomePage.tsx
│   │   └── Presentation/PresentationPage.tsx
│   ├── hooks/
│   │   ├── useVillages.ts
│   │   ├── usePresentation.ts
│   │   ├── useSearch.ts
│   │   ├── useKeyboard.ts
│   │   ├── useFullscreen.ts
│   │   ├── useTheme.ts
│   │   └── useImagePreloader.ts
│   ├── context/
│   │   └── AppContext.tsx
│   ├── services/
│   │   └── dataService.ts
│   ├── config/
│   │   └── index.ts               ← CUSTOMIZE HERE
│   └── types/
│       └── index.ts
└── README.md
```

---

## 📊 JSON Data Format

Create your `public/data/villages.json` using this schema:

```json
[
  {
    "id": 1,
    "name": "Thôn Ngoại",
    "image": "ngoai.png",
    "area": "95 ha",
    "partyMembers": 121,
    "households": 342,
    "population": 1256,
    "north": "Giáp xã Bình Minh",
    "south": "Giáp thôn Nội",
    "east": "Giáp xã Tam Hưng",
    "west": "Giáp sông Đáy",
    "landmarks": ["Tỉnh lộ 422", "Đình làng Ngoại"],
    "description": "Mô tả về thôn..."
  }
]
```

### Field Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `number` | ✅ | Unique village ID |
| `name` | `string` | ✅ | Village display name |
| `image` | `string` | ✅ | Image filename (placed in `public/villages/`) |
| `area` | `string` | ✅ | Area (e.g., `"95 ha"`) |
| `partyMembers` | `number` | ✅ | Party member count |
| `households` | `number` | ☐ | Household count (optional) |
| `population` | `number` | ☐ | Population count (optional) |
| `north` | `string` | ✅ | Northern boundary description |
| `south` | `string` | ✅ | Southern boundary description |
| `east` | `string` | ✅ | Eastern boundary description |
| `west` | `string` | ✅ | Western boundary description |
| `landmarks` | `string[]` | ✅ | List of roads / notable places |
| `description` | `string` | ✅ | Village description paragraph |
| `coordinates` | `{ lat, lng }` | ☐ | Future GIS support |
| `polygon` | `[number, number][]` | ☐ | Future GeoJSON polygon |

---

## 🖼️ Image Specification

### Overview Map (`public/maps/overview.png`)
- **Recommended size**: 1600×900 px (16:9)
- **Format**: PNG or JPEG
- **Content**: Full administrative map showing all village boundaries

### Village Images (`public/villages/`)
- **Recommended size**: 1280×720 px minimum
- **Format**: PNG or JPEG
- **Naming**: Must match `"image"` field in `villages.json`

> ⚠️ If an image is missing, the app displays a professional placeholder — **it will never crash**.

---

## ⚙️ Customization

Edit `src/config/index.ts` to customize the app without touching any component:

```typescript
export const APP_CONFIG = {
  title: 'Hệ Thống Bản Đồ Hành Chính',
  subtitle: 'Nền Tảng Trình Bày Ranh Giới Hành Chính',
  organization: 'UBND Xã / Ban Chỉ Đạo',
  logo: null,                    // Set to '/logo.png' to show a logo

  colors: {
    primary: '#1e3a8a',          // Government deep blue
    accent:  '#3b82f6',
    gold:    '#f59e0b',
  },

  animation: {
    duration: 400,               // Transition speed in ms
    ease: 'easeInOut',
  },

  presentation: {
    interval: 10000,             // Default autoplay interval
    autoPlay: false,
    intervals: [5000, 10000, 15000, 30000],  // Available speeds
  },

  paths: {
    maps:     '/maps',           // Folder for overview map
    villages: '/villages',       // Folder for village images
    data:     '/data',           // Folder for JSON data
  },
};
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `←` / `→` | Navigate between villages |
| `ESC` | Return to overview / Exit presentation |
| `Space` | Play / Pause autoplay (presentation mode) |
| `F` | Toggle fullscreen (presentation mode) |

---

## 🖥️ Presentation Mode

1. Click **"Trình Chiếu"** in the sidebar
2. Use `←` `→` to navigate manually
3. Click **"Phát"** or press `Space` to enable autoplay
4. Select speed: 5s / 10s / 15s / 30s
5. Press `ESC` to exit presentation mode

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Upload dist/ to Vercel or connect GitHub repo
```

### Static Hosting (Apache/Nginx)

```bash
npm run build
# Copy dist/ to your web server root
```

Configure your web server to redirect all routes to `index.html` for React Router:

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . /index.html [L]
```

---

## 🔮 Future GIS Upgrade Path

The architecture is designed to support future GIS integration without rewriting:

1. **Add Leaflet/MapLibre** — Replace `MapViewer` center panel with an interactive map
2. **GeoJSON polygons** — Use `"polygon"` field in `villages.json` to render clickable regions
3. **Coordinate support** — Use `"coordinates"` field to place markers on the map
4. **Tile layers** — Connect to OpenStreetMap, MapTiler, or ArcGIS tile services
5. **WMS layers** — Add government WMS services for official administrative layers

The `MapLayer` type in `src/types/index.ts` is ready for this integration.

---

## 📝 License

Government internal use. Customize freely for your administrative district.

---

*Built with ❤️ for Vietnamese Government Digital Transformation*
