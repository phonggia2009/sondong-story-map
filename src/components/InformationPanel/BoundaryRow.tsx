import { memo } from 'react';
import { useAppContext } from '@/context/AppContext';

// ============================================================
//  BoundaryRow Component
//  Displays a single compass direction boundary.
// ============================================================

interface BoundaryRowProps {
  direction: 'north' | 'south' | 'east' | 'west';
  value: string;
}

const DIRECTION_CONFIG = {
  north: { label: 'Phía Bắc', emoji: '⬆', color: 'text-blue-400' },
  south: { label: 'Phía Nam', emoji: '⬇', color: 'text-green-400' },
  east:  { label: 'Phía Đông', emoji: '➡', color: 'text-orange-400' },
  west:  { label: 'Phía Tây', emoji: '⬅', color: 'text-purple-400' },
} as const;

export const BoundaryRow = memo(function BoundaryRow({
  direction,
  value,
}: BoundaryRowProps) {
  const { isDark } = useAppContext();
  const config = DIRECTION_CONFIG[direction];

  if (!value?.trim()) return null;

  return (
    <div className={`
      flex items-start gap-3 py-2.5 px-3 rounded-lg
      ${isDark ? 'bg-gov-800/50' : 'bg-gray-50'}
    `}>
      <div className={`
        flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-sm
        ${isDark ? 'bg-gov-800' : 'bg-white border border-gray-200'}
      `}>
        <span className={config.color}>{config.emoji}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium mb-0.5 ${isDark ? 'text-gov-400' : 'text-gray-500'}`}>
          {config.label}
        </p>
        <p className={`text-sm leading-snug ${isDark ? 'text-gov-200' : 'text-gray-700'}`}>
          {value}
        </p>
      </div>
    </div>
  );
});
