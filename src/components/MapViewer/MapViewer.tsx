import { memo, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl, Tooltip, useMapEvents } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import type { Village } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { useVillages } from '@/hooks/useVillages';
import { MapOverlayStats } from './MapOverlayStats';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon path issues with Vite/Webpack bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// ============================================================
//  MapViewer Component
//  Center panel with Leaflet map
// ============================================================

interface MapViewerProps {
  selectedVillage: Village | null;
}

// Click handler: deselect village when clicking empty map area
function MapClickHandler({ onDeselect }: { onDeselect: () => void }) {
  useMapEvents({
    click: (e: any) => {
      // Only deselect if the click was NOT on a layer (polygon/marker)
      if (!e.originalEvent._stopped) {
        onDeselect();
      }
    },
  });
  return null;
}

export const MapViewer = memo(function MapViewer({ selectedVillage }: MapViewerProps) {
  const isOverview = !selectedVillage;
  const label = selectedVillage?.name;

  const { selectVillage } = useAppContext();
  const { villages } = useVillages();


  const [ranhGioiXaData, setRanhGioiXaData] = useState<any>(null);
  const [ranhGioiThonData, setRanhGioiThonData] = useState<any>(null);
  const [thonNhanTenData, setThonNhanTenData] = useState<any>(null);

  useEffect(() => {
    fetch('/data/danhgioixa.geojson').then(r => r.json()).then(setRanhGioiXaData).catch(console.error);
    fetch('/data/ranhgioithon.geojson').then(r => r.json()).then(setRanhGioiThonData).catch(console.error);
    fetch('/data/thon_nhan_ten.geojson').then(r => r.json()).then(setThonNhanTenData).catch(console.error);
  }, []);

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden bg-gov-950">
      {/* Label overlay */}
      <AnimatePresence>
        {label && (
          <motion.div
            key={label}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] pointer-events-none"
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

      <MapContainer 
        center={[21.037, 105.703]} 
        zoom={14} 
        className="w-full h-full z-0"
        zoomControl={true}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Bản đồ mặc định (OSM)">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Bản đồ vệ tinh (Esri)">
            <TileLayer
              attribution='&copy; <a href="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">Esri</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Bản đồ sáng (CartoDB)" checked>
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Bản đồ tối (CartoDB)">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {ranhGioiXaData && (
          <GeoJSON 
            data={ranhGioiXaData}
            style={{
              color: '#eab308', // Yellow for commune boundary
              weight: 3,
              opacity: 1,
              fillColor: 'transparent',
              fillOpacity: 0,
              className: 'animate-marching-ants'
            }}
          />
        )}

        {ranhGioiThonData && (
          <GeoJSON 
            key={`geojson-${selectedVillage?.id || 'none'}`}
            data={ranhGioiThonData}
            style={(feature: any) => {
              const isSelected = selectedVillage?.id === feature.properties.village_id;
              const hasSelection = !!selectedVillage;

              if (hasSelection && !isSelected) {
                return {
                  color: '#ef4444', // Red border
                  weight: 2,
                  opacity: 0.6,
                  fillColor: '#fecaca', // Light red fill
                  fillOpacity: 0.2,
                  dashArray: '4, 4',
                  className: 'transition-all duration-300'
                };
              }
              
              return {
                color: isSelected ? '#facc15' : 'white', // Yellow borders for selected, white for non-selected
                weight: isSelected ? 4 : 2,
                opacity: 1,
                fillColor: isSelected ? '#eab308' : '#dc2626', // Yellow if selected, Red if not
                fillOpacity: isSelected ? 0.7 : 0.4, // Higher opacity for more color
                dashArray: isSelected ? '' : '',
                className: isSelected ? 'animate-pulse-glow transition-all duration-300' : 'transition-all duration-300'
              };
            }}
            onEachFeature={(feature, layer: any) => {
              const isSelected = selectedVillage?.id === feature.properties.village_id;
              const hasSelection = !!selectedVillage;

              // Bind tooltip with village name for hover preview
              const matchedVillage = villages.find((v: Village) => v.id === feature.properties.village_id);
              if (matchedVillage) {
                layer.bindTooltip(
                  `<div style="font-weight:700;font-size:13px;margin-bottom:2px">${matchedVillage.name}</div><div style="font-size:11px;color:#6b7280">Diện tích: ${matchedVillage.area}</div>`,
                  { sticky: true, direction: 'auto', className: 'custom-polygon-tooltip' }
                );
              }
              
              layer.on({
                mouseover: (e: any) => {
                  const target = e.target;
                  target.setStyle({
                    fillColor: isSelected ? '#eab308' : '#ef4444', // Keep yellow if selected, else lighter red
                    fillOpacity: isSelected ? 0.8 : 0.5,
                    weight: isSelected ? 4 : 3,
                  });
                  target.bringToFront();
                },
                mouseout: (e: any) => {
                  const target = e.target;
                  if (hasSelection && !isSelected) {
                    target.setStyle({
                      color: '#ef4444',
                      weight: 2,
                      opacity: 0.6,
                      fillColor: '#fecaca',
                      fillOpacity: 0.2,
                      dashArray: '4, 4'
                    });
                  } else {
                    target.setStyle({
                      color: isSelected ? '#facc15' : 'white',
                      weight: isSelected ? 4 : 2,
                      opacity: 1,
                      fillColor: isSelected ? '#eab308' : '#dc2626',
                      fillOpacity: isSelected ? 0.7 : 0.4,
                      dashArray: isSelected ? '' : ''
                    });
                  }
                },
                click: (e: any) => {
                  // Stop propagation so MapClickHandler doesn't deselect
                  e.originalEvent._stopped = true;
                  const villageId = feature.properties?.village_id;
                  if (villageId !== undefined) {
                    const matchedVillage = villages.find((v: Village) => v.id === villageId);
                    if (matchedVillage) {
                      selectVillage(matchedVillage);
                    }
                  }
                }
              });
            }}
          />
        )}

        {thonNhanTenData?.features?.map((feature: any, index: number) => {
          if (feature.geometry?.type === 'Point') {
            const coordinates = feature.geometry.coordinates;
            const name = feature.properties.ten_thon;
            const isSelected = selectedVillage?.geojson_label_index === index;
            const hasSelection = !!selectedVillage;
            // GeoJSON coordinates are [lng, lat]
            return (
              <Marker 
                key={`label-${index}`} 
                position={[coordinates[1], coordinates[0]]}
                icon={L.divIcon({
                  html: `<div style="
                    text-align: center;
                    text-shadow: 1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff, 0px 1px 2px rgba(0,0,0,0.5);
                    font-family: 'Be Vietnam Pro', sans-serif;
                    font-weight: 800;
                    font-size: ${isSelected ? '14px' : '11px'};
                    color: ${isSelected ? '#eab308' : '#374151'};
                    white-space: nowrap;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                    letter-spacing: 0.5px;
                  ">
                    ${name}
                  </div>`,
                  className: 'bg-transparent border-0 shadow-none',
                  iconSize: [100, 30],
                  iconAnchor: [50, 15]
                })}
                eventHandlers={{
                  click: () => {
                    // Stop propagation so MapClickHandler doesn't deselect
                    const matchedVillage = villages.find((v: Village) => v.geojson_label_index === index);
                    if (!matchedVillage) {
                      // Fallback: find closest village by coordinates
                      let closest: Village | null = null;
                      let minDist = Infinity;
                      villages.forEach((v: Village) => {
                        if (!v.coordinates) return;
                        const dx = v.coordinates.lat - coordinates[1];
                        const dy = v.coordinates.lng - coordinates[0];
                        const dist = dx * dx + dy * dy;
                        if (dist < minDist) { minDist = dist; closest = v; }
                      });
                      if (closest) selectVillage(closest);
                    } else {
                      selectVillage(matchedVillage);
                    }
                  }
                }}
              />
            );
          }
          return null;
        })}
        



        <MapClickHandler onDeselect={() => selectVillage(null)} />

      </MapContainer>

      {/* Floating stats overlay */}
      <MapOverlayStats />

      {/* Corner grid decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gov-800 via-accent-600/40 to-gov-800 pointer-events-none z-[400]" />
    </div>
  );
});
