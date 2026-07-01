import { memo, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

// ============================================================
//  SearchBox Component
// ============================================================

interface SearchBoxProps {
  query: string;
  resultCount: number;
  totalCount: number;
  onQueryChange: (value: string) => void;
  onClear: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const SearchBox = memo(function SearchBox({
  query,
  resultCount,
  totalCount,
  onQueryChange,
  onClear,
  onMoveUp,
  onMoveDown,
  inputRef,
}: SearchBoxProps) {
  const { isDark } = useAppContext();
  const localRef = useRef<HTMLInputElement>(null);
  const ref = inputRef ?? localRef;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); onMoveUp(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); onMoveDown(); }
      if (e.key === 'Escape') { e.preventDefault(); onClear(); }
    },
    [onMoveUp, onMoveDown, onClear]
  );

  const isFiltering = query.trim().length > 0;

  return (
    <div className="px-3 py-2">
      <div className={`
        relative flex items-center rounded-xl overflow-hidden
        transition-all duration-200
        ${isDark
          ? 'bg-gov-800 ring-1 ring-gov-700 focus-within:ring-accent-500'
          : 'bg-gray-100 ring-1 ring-transparent focus-within:ring-gov-400 focus-within:bg-white'
        }
      `}>
        <Search className={`
          flex-shrink-0 w-4 h-4 ml-3
          ${isDark ? 'text-gov-500' : 'text-gray-400'}
        `} />

        <input
          ref={ref}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm kiếm thôn/xã..."
          className={`
            flex-1 px-3 py-2.5 text-sm bg-transparent outline-none
            placeholder:text-opacity-50
            ${isDark
              ? 'text-white placeholder:text-gov-500'
              : 'text-gray-800 placeholder:text-gray-400'
            }
          `}
          aria-label="Tìm kiếm thôn xã"
          autoComplete="off"
        />

        {isFiltering && (
          <motion.button
            onClick={onClear}
            className={`
              flex-shrink-0 mr-2 p-1 rounded-full transition-colors
              ${isDark
                ? 'text-gov-500 hover:text-white hover:bg-gov-700'
                : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'
              }
            `}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Xóa tìm kiếm"
          >
            <X className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>

      {/* Results counter */}
      {isFiltering && (
        <motion.p
          className={`text-xs mt-1.5 px-1 ${isDark ? 'text-gov-500' : 'text-gray-400'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {resultCount === 0
            ? 'Không tìm thấy kết quả'
            : `${resultCount} / ${totalCount} thôn`
          }
        </motion.p>
      )}
    </div>
  );
});
