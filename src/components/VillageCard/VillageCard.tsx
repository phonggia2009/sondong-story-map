import { memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Maximize2 } from 'lucide-react';
import type { Village } from '@/types';
import { useAppContext } from '@/context/AppContext';

// ============================================================
//  VillageCard Component
// ============================================================

interface VillageCardProps {
  village: Village;
  isSelected: boolean;
  isActive?: boolean;   // keyboard navigation highlight
  searchQuery?: string;
  onClick: (village: Village) => void;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} className="bg-accent-400/30 text-accent-300 rounded px-0.5 not-italic">{part}</mark>
      : part
  );
}

export const VillageCard = memo(function VillageCard({
  village,
  isSelected,
  isActive = false,
  searchQuery = '',
  onClick,
}: VillageCardProps) {
  const { isDark } = useAppContext();

  return (
    <motion.button
      id={`village-card-${village.id}`}
      onClick={() => onClick(village)}
      className={`
        w-full text-left px-3 py-3 rounded-xl transition-all duration-200
        flex items-center gap-3 group relative overflow-hidden
        ${isSelected
          ? isDark
            ? 'bg-gov-700 ring-1 ring-accent-500/60 shadow-glow'
            : 'bg-gov-50 ring-1 ring-gov-400 shadow-card'
          : isActive
            ? isDark
              ? 'bg-gov-800/70 ring-1 ring-gov-600'
              : 'bg-gray-50 ring-1 ring-gray-200'
            : isDark
              ? 'hover:bg-gov-800/60'
              : 'hover:bg-gray-50'
        }
      `}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      layout
      aria-pressed={isSelected}
      aria-label={`Xem thôn ${village.name}`}
    >
      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-400 rounded-r"
          layoutId="selectedIndicator"
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      )}

      {/* Village number badge */}
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
        transition-colors duration-200
        ${isSelected
          ? 'bg-accent-500 text-white'
          : isDark
            ? 'bg-gov-800 text-gov-400 group-hover:bg-gov-700 group-hover:text-gov-300'
            : 'bg-gray-100 text-gray-500 group-hover:bg-gov-100 group-hover:text-gov-600'
        }
      `}>
        {village.id}
      </div>

      {/* Name + details */}
      <div className="flex-1 min-w-0">
        <p className={`
          text-sm font-semibold truncate
          ${isSelected
            ? isDark ? 'text-white' : 'text-gov-800'
            : isDark ? 'text-gov-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
          }
        `}>
          {highlightText(village.name, searchQuery)}
        </p>

        <div className="flex items-center gap-2 mt-0.5">
          <span className={`
            flex items-center gap-1 text-xs
            ${isDark ? 'text-gov-500' : 'text-gray-400'}
          `}>
            <MapPin className="w-3 h-3" />
            {village.area}
          </span>
          <span className={`
            flex items-center gap-1 text-xs
            ${isDark ? 'text-gov-500' : 'text-gray-400'}
          `}>
            <Users className="w-3 h-3" />
            {village.partyMembers} đảng viên
          </span>
        </div>
      </div>

      {/* Arrow icon */}
      <Maximize2 className={`
        flex-shrink-0 w-3.5 h-3.5 transition-all duration-200
        ${isSelected
          ? 'text-accent-400 opacity-100'
          : isDark
            ? 'text-gov-600 opacity-0 group-hover:opacity-100'
            : 'text-gray-300 opacity-0 group-hover:opacity-100'
        }
      `} />
    </motion.button>
  );
});
