import { memo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { APP_CONFIG } from '@/config';

// ============================================================
//  Footer Component
// ============================================================

export const Footer = memo(function Footer() {
  const { isDark, selectedVillage } = useAppContext();

  return (
    <footer className={`
      flex-shrink-0 flex items-center justify-between px-4 h-8 text-xs
      border-t transition-colors duration-300
      ${isDark
        ? 'bg-gov-950 border-gov-800/60 text-gov-600'
        : 'bg-gray-50 border-gray-200 text-gray-400'
      }
    `}>
      <span>{APP_CONFIG.title} — {APP_CONFIG.organization}</span>
      <span>
        {selectedVillage
          ? `Đang xem: ${selectedVillage.name}`
          : 'Bản đồ tổng quan'
        }
      </span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
});
