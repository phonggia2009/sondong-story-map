import { memo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import {
  Map,
  Presentation,
  ChevronLeft,
  ChevronRight,
  Home,
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { VillageCard } from '@/components/VillageCard/VillageCard';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { useSearch } from '@/hooks/useSearch';
import type { Village } from '@/types';

// ============================================================
//  Sidebar Component
// ============================================================

interface SidebarProps {
  villages: Village[];
  currentIndex: number;
  onVillageSelect: (village: Village) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Sidebar = memo(function Sidebar({
  villages,
  currentIndex,
  onVillageSelect,
  onPrev,
  onNext,
}: SidebarProps) {
  const navigate = useNavigate();

  const {
    isDark,
    sidebarOpen,
    isPresenting,
    enterPresentation,
    selectedVillage,
    selectVillage,
  } = useAppContext();

  const handleStartPresentation = useCallback(() => {
    enterPresentation();
    navigate('/presentation');
  }, [enterPresentation, navigate]);

  const {
    query,
    results,
    activeIndex,
    inputRef,
    hasResults,
    isFiltering,
    handleQueryChange,
    clearSearch,
    moveUp,
    moveDown,
    setActiveIndex,
  } = useSearch(villages);

  // Scroll active card into view
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedVillage) {
      const card = document.getElementById(`village-card-${selectedVillage.id}`);
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedVillage]);

  const handleVillageClick = (village: Village) => {
    onVillageSelect(village);
    setActiveIndex(results.findIndex((v) => v.id === village.id));
  };

  const handleReturnHome = () => {
    selectVillage(null);
  };

  return (
    <AnimatePresence>
      {sidebarOpen && !isPresenting && (
        <motion.aside
          className={`
            flex flex-col w-72 flex-shrink-0 h-full
            border-r transition-colors duration-300 z-20
            ${isDark
              ? 'bg-gov-950 border-gov-800'
              : 'bg-white border-gray-200'
            }
          `}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 288, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Header */}
          <div className={`
            flex-shrink-0 px-3 py-3 border-b
            ${isDark ? 'border-gov-800' : 'border-gray-100'}
          `}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Map className={`w-4 h-4 ${isDark ? 'text-accent-400' : 'text-gov-600'}`} />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Danh Sách Thôn
                </span>
                <span className={`
                  text-xs px-1.5 py-0.5 rounded-full font-medium
                  ${isDark ? 'bg-gov-800 text-gov-400' : 'bg-gray-100 text-gray-500'}
                `}>
                  {villages.length}
                </span>
              </div>

              {selectedVillage && (
                <motion.button
                  onClick={handleReturnHome}
                  className={`
                    p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors
                    ${isDark
                      ? 'text-gov-400 hover:text-white hover:bg-gov-800'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Về tổng quan"
                >
                  <Home className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </div>

            {/* Search */}
            <SearchBox
              query={query}
              resultCount={results.length}
              totalCount={villages.length}
              onQueryChange={handleQueryChange}
              onClear={clearSearch}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
              inputRef={inputRef}
            />
          </div>

          {/* Village list */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2 space-y-1 scrollbar-thin"
          >
            {!hasResults ? (
              <EmptyState
                type={isFiltering ? 'search' : 'empty'}
                message={isFiltering
                  ? `Không tìm thấy kết quả cho "${query}"`
                  : 'Chưa có dữ liệu thôn xã'
                }
              />
            ) : (
              results.map((village, idx) => (
                <VillageCard
                  key={village.id}
                  village={village}
                  isSelected={selectedVillage?.id === village.id}
                  isActive={isFiltering && idx === activeIndex}
                  searchQuery={query}
                  onClick={handleVillageClick}
                />
              ))
            )}
          </div>

          {/* Footer controls */}
          <div className={`
            flex-shrink-0 border-t p-3 space-y-2
            ${isDark ? 'border-gov-800' : 'border-gray-100'}
          `}>
            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={onPrev}
                className={`
                  flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium
                  transition-colors
                  ${isDark
                    ? 'bg-gov-800 text-gov-300 hover:bg-gov-700 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={villages.length === 0}
              >
                <ChevronLeft className="w-4 h-4" />
                Trước
              </motion.button>

              <span className={`text-xs ${isDark ? 'text-gov-500' : 'text-gray-400'}`}>
                {selectedVillage
                  ? `${currentIndex + 1}/${villages.length}`
                  : `0/${villages.length}`
                }
              </span>

              <motion.button
                onClick={onNext}
                className={`
                  flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium
                  transition-colors
                  ${isDark
                    ? 'bg-gov-800 text-gov-300 hover:bg-gov-700 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={villages.length === 0}
              >
                Sau
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Presentation Mode */}
            <motion.button
              onClick={handleStartPresentation}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold
                         bg-gradient-to-r from-gov-700 to-accent-600 text-white
                         hover:from-gov-600 hover:to-accent-500 transition-all shadow-glow"
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Presentation className="w-4 h-4" />
              Trình Chiếu
            </motion.button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
});
