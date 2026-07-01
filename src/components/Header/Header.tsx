import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  Map,
  Moon,
  Sun,
  Maximize,
  Minimize,
  Monitor,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { APP_CONFIG } from '@/config';

// ============================================================
//  Header Component
// ============================================================

export const Header = memo(function Header() {
  const {
    isDark,
    toggleTheme,
    isFullscreen,
    toggleFullscreen,
    isPresenting,
    exitPresentation,
    sidebarOpen,
    toggleSidebar,
    selectedVillage,
  } = useAppContext();

  return (
    <motion.header
      className={`
        relative z-30 flex items-center justify-between px-4 h-14
        border-b transition-colors duration-300
        ${isDark
          ? 'bg-gov-950 border-gov-800 shadow-glass-dark'
          : 'bg-white border-gray-200 shadow-sm'
        }
      `}
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Left — Logo + Title */}
      <div className="flex items-center gap-3">
        {/* Sidebar toggle */}
        {!isPresenting && (
          <motion.button
            onClick={toggleSidebar}
            className={`
              p-1.5 rounded-lg transition-colors
              ${isDark
                ? 'text-gov-400 hover:text-white hover:bg-gov-800'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={sidebarOpen ? 'Ẩn thanh bên' : 'Hiện thanh bên'}
          >
            {sidebarOpen
              ? <ChevronLeft className="w-5 h-5" />
              : <ChevronRight className="w-5 h-5" />
            }
          </motion.button>
        )}

        {/* Map icon */}
        <div className="flex items-center gap-2.5">
          <div className={`
            p-1.5 rounded-lg
            ${isDark ? 'bg-gov-800' : 'bg-gov-50'}
          `}>
            <Map className="w-5 h-5 text-accent-500" />
          </div>

          <div className="hidden sm:block">
            <h1 className={`
              text-sm font-display font-bold leading-tight
              ${isDark ? 'text-white' : 'text-gov-900'}
            `}>
              {APP_CONFIG.title}
            </h1>
            <p className={`
              text-xs leading-none
              ${isDark ? 'text-gov-400' : 'text-gray-500'}
            `}>
              {APP_CONFIG.organization}
            </p>
          </div>
        </div>
      </div>

      {/* Center — Breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className={isDark ? 'text-gov-500' : 'text-gray-400'}>
          Tổng quan
        </span>
        {selectedVillage && (
          <>
            <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gov-600' : 'text-gray-300'}`} />
            <motion.span
              key={selectedVillage.id}
              className={`font-medium ${isDark ? 'text-accent-400' : 'text-gov-700'}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              {selectedVillage.name}
            </motion.span>
          </>
        )}
      </div>

      {/* Right — Controls */}
      <div className="flex items-center gap-1.5">
        {/* Presentation Mode button */}
        {isPresenting ? (
          <motion.button
            onClick={exitPresentation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                       bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors border border-red-500/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Thoát trình chiếu</span>
          </motion.button>
        ) : null}

        {/* Dark mode toggle */}
        <motion.button
          onClick={toggleTheme}
          className={`
            p-1.5 rounded-lg transition-colors
            ${isDark
              ? 'text-gov-400 hover:text-white hover:bg-gov-800'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
        >
          {isDark
            ? <Sun className="w-4.5 h-4.5" />
            : <Moon className="w-4.5 h-4.5" />
          }
        </motion.button>

        {/* Fullscreen */}
        <motion.button
          onClick={toggleFullscreen}
          className={`
            p-1.5 rounded-lg transition-colors
            ${isDark
              ? 'text-gov-400 hover:text-white hover:bg-gov-800'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
        >
          {isFullscreen
            ? <Minimize className="w-4.5 h-4.5" />
            : <Maximize className="w-4.5 h-4.5" />
          }
        </motion.button>
      </div>
    </motion.header>
  );
});
