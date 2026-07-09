import { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Ruler, ChevronUp } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { useVillages } from '@/hooks/useVillages';

// ============================================================
//  MapOverlayStats — Floating stats overlay on the map
//  Shows aggregate data when no village is selected
// ============================================================

export const MapOverlayStats = memo(function MapOverlayStats() {
  const { selectedVillage, isDark } = useAppContext();
  const { villages } = useVillages();

  const stats = useMemo(() => {
    const totalPopulation = villages.reduce((sum, v) => sum + (v.population || 0), 0);
    const totalHouseholds = villages.reduce((sum, v) => sum + (v.households || 0), 0);
    return {
      villageCount: villages.length,
      totalPopulation,
      totalHouseholds,
    };
  }, [villages]);

  return (
    <AnimatePresence>
      {!selectedVillage && villages.length > 0 && (
        <motion.div
          key="map-stats"
          className={`
            absolute bottom-6 right-4 z-[400] pointer-events-auto
            flex items-center gap-3 px-4 py-2.5 rounded-2xl
            backdrop-blur-md border shadow-lg
            ${isDark
              ? 'bg-gov-900/85 border-gov-700/50 text-white'
              : 'bg-white/85 border-gray-200/80 text-gray-800'
            }
          `}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <StatChip
            icon={<MapPin className="w-3.5 h-3.5" />}
            label="Thôn/Tổ"
            value={stats.villageCount}
            isDark={isDark}
            color="blue"
          />
          <Divider isDark={isDark} />
          <StatChip
            icon={<Users className="w-3.5 h-3.5" />}
            label="Dân số"
            value={stats.totalPopulation.toLocaleString('vi-VN')}
            isDark={isDark}
            color="emerald"
          />
          <Divider isDark={isDark} />
          <StatChip
            icon={<Ruler className="w-3.5 h-3.5" />}
            label="Hộ dân"
            value={stats.totalHouseholds.toLocaleString('vi-VN')}
            isDark={isDark}
            color="amber"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

function StatChip({
  icon,
  label,
  value,
  isDark,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  isDark: boolean;
  color: 'blue' | 'emerald' | 'amber';
}) {
  const colorMap = {
    blue: isDark ? 'text-blue-400' : 'text-blue-600',
    emerald: isDark ? 'text-emerald-400' : 'text-emerald-600',
    amber: isDark ? 'text-amber-400' : 'text-amber-600',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={colorMap[color]}>{icon}</div>
      <div className="flex flex-col">
        <span className={`text-[10px] uppercase tracking-wider font-medium leading-none ${isDark ? 'text-gov-400' : 'text-gray-400'}`}>
          {label}
        </span>
        <span className="text-sm font-bold font-display leading-tight">{value}</span>
      </div>
    </div>
  );
}

function Divider({ isDark }: { isDark: boolean }) {
  return (
    <div className={`w-px h-8 ${isDark ? 'bg-gov-700/60' : 'bg-gray-200'}`} />
  );
}
