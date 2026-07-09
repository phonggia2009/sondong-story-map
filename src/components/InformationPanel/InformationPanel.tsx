import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Users,
  Home,
  BarChart3,
  FileText,
  X,
  Map,
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { BoundaryRow } from './BoundaryRow';
import { LandmarkList } from './LandmarkList';

import { useIsMobile } from '@/hooks/useIsMobile';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import type { Village } from '@/types';

// ============================================================
//  InformationPanel Component
//  Right panel displaying all village details.
// ============================================================

interface InformationPanelProps {
  village: Village | null;
  onClose?: () => void;
}

function StatCard({
  icon,
  label,
  value,
  isDark,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  isDark: boolean;
}) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
      className={`
      flex flex-col gap-1.5 p-3.5 rounded-xl border
      ${isDark 
        ? 'bg-gradient-to-br from-gov-800/80 to-gov-900/80 border-gov-700/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
        : 'bg-gradient-to-br from-white to-gray-50 border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
      }
    `}>
      <div className={`flex items-center gap-2 ${isDark ? 'text-gov-400' : 'text-gray-400'}`}>
        {icon}
        <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gov-400' : 'text-gray-500'}`}>{label}</p>
      </div>
      <p className={`text-lg font-bold font-display tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
      </p>
    </motion.div>
  );
}

function OverviewPanel({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={`
        w-16 h-16 rounded-2xl flex items-center justify-center
        ${isDark ? 'bg-gov-800' : 'bg-gov-50'}
      `}>
        <Map className={`w-8 h-8 ${isDark ? 'text-gov-500' : 'text-gov-400'}`} />
      </div>
      <div>
        <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-gov-300' : 'text-gray-600'}`}>
          Chọn một thôn để xem thông tin
        </h3>
        <p className={`text-xs ${isDark ? 'text-gov-500' : 'text-gray-400'}`}>
          Nhấn vào ranh giới hoặc tên thôn trên bản đồ để xem chi tiết
        </p>
      </div>
      <div className={`
        flex items-center gap-2 px-3 py-2 rounded-lg text-xs
        ${isDark ? 'bg-gov-800 text-gov-500' : 'bg-gray-100 text-gray-400'}
      `}>
        <kbd className={`px-1.5 py-0.5 rounded text-xs font-mono ${isDark ? 'bg-gov-700 text-gov-300' : 'bg-white border text-gray-600'}`}>←</kbd>
        <kbd className={`px-1.5 py-0.5 rounded text-xs font-mono ${isDark ? 'bg-gov-700 text-gov-300' : 'bg-white border text-gray-600'}`}>→</kbd>
        <span>điều hướng</span>
      </div>
    </motion.div>
  );
}

export const InformationPanel = memo(function InformationPanel({
  village,
  onClose,
}: InformationPanelProps) {
  const { isDark } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <motion.aside
      className={`
        flex flex-col flex-shrink-0 transition-colors duration-300 overflow-hidden
        ${isMobile 
          ? 'absolute bottom-0 left-0 right-0 z-50 h-[60vh] rounded-t-2xl shadow-2xl border-t' 
          : 'w-80 h-full border-l'
        }
        ${isDark
          ? 'bg-gov-950 border-gov-800'
          : 'bg-white border-gray-200'
        }
      `}
      initial={isMobile ? { y: 300, opacity: 0 } : { x: 40, opacity: 0 }}
      animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
      exit={isMobile ? { y: 300, opacity: 0 } : { x: 40, opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Mobile drag handle */}
      {isMobile && (
        <div className="flex-shrink-0 flex justify-center py-2">
          <div className={`w-10 h-1 rounded-full ${isDark ? 'bg-gov-600' : 'bg-gray-300'}`} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!village ? (
          <OverviewPanel key="overview" isDark={isDark} />
        ) : (
          <motion.div
            key={village.id}
            className="flex flex-col h-full overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Village name header */}
            <div className={`flex-shrink-0 flex items-center justify-between px-4 py-4 border-b ${isDark ? 'border-gov-800' : 'border-gray-200'
              }`}>
              <h2 className={`text-base font-display font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-800'
                }`}>
                {village.name}
              </h2>
              {onClose && (
                <motion.button
                  onClick={onClose}
                  className={`p-1.5 rounded-full transition-colors ${isDark
                      ? 'text-gov-400 hover:bg-gov-800 hover:text-white'
                      : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            {/* Scrollable content with stagger */}
            <motion.div 
              className="flex-1 overflow-y-auto px-4 py-4 space-y-5"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                }
              }}
              initial="hidden"
              animate="visible"
            >

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2">
                <StatCard
                  isDark={isDark}
                  icon={<MapPin className="w-4 h-4" />}
                  label="Diện tích"
                  value={village.area}
                />
                <StatCard
                  isDark={isDark}
                  icon={<Users className="w-4 h-4" />}
                  label="Đảng viên"
                  value={village.partyMembers}
                />
                {village.households !== undefined && (
                  <StatCard
                    isDark={isDark}
                    icon={<Home className="w-4 h-4" />}
                    label="Hộ dân"
                    value={village.households}
                  />
                )}
                {village.population !== undefined && (
                  <StatCard
                    isDark={isDark}
                    icon={<BarChart3 className="w-4 h-4" />}
                    label="Dân số"
                    value={village.population}
                  />
                )}
              </div>

              {/* Divider */}
              <div className={`h-px ${isDark ? 'bg-gov-800' : 'bg-gray-100'}`} />

              {/* Boundaries */}
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gov-400' : 'text-gray-500'}`}>
                  Ranh Giới Hành Chính
                </p>
                <div className="space-y-1.5">
                  <BoundaryRow direction="north" value={village.north} />
                  <BoundaryRow direction="south" value={village.south} />
                  <BoundaryRow direction="east" value={village.east} />
                  <BoundaryRow direction="west" value={village.west} />
                </div>
              </div>

              {/* Divider */}
              <div className={`h-px ${isDark ? 'bg-gov-800' : 'bg-gray-100'}`} />

              {/* Landmarks */}
              <LandmarkList landmarks={village.landmarks} />

              {/* Divider */}
              {village.description && (
                <>
                  <div className={`h-px ${isDark ? 'bg-gov-800' : 'bg-gray-100'}`} />

                  {/* Description */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className={`w-3.5 h-3.5 ${isDark ? 'text-gov-400' : 'text-gray-400'}`} />
                      <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gov-400' : 'text-gray-500'}`}>
                        Mô tả
                      </p>
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gov-300' : 'text-gray-600'}`}>
                      {village.description}
                    </p>
                  </div>
                </>
              )}

              {/* Bottom padding */}
              <div className="h-4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
});
