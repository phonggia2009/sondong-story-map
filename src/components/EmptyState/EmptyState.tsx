import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Database } from 'lucide-react';

// ============================================================
//  EmptyState Component
// ============================================================

interface EmptyStateProps {
  type?: 'error' | 'empty' | 'search';
  title?: string;
  message?: string;
  error?: Error | null;
  onRetry?: () => void;
}

export function EmptyState({
  type = 'empty',
  title,
  message,
  error,
  onRetry,
}: EmptyStateProps) {
  const defaults = {
    error: {
      icon: <AlertTriangle className="w-12 h-12 text-red-400" />,
      title: 'Không thể tải dữ liệu',
      message: 'Đã xảy ra lỗi khi tải thông tin bản đồ.',
    },
    empty: {
      icon: <Database className="w-12 h-12 text-gov-400" />,
      title: 'Chưa có dữ liệu',
      message: 'Chưa có thông tin thôn/xã nào. Vui lòng kiểm tra tệp dữ liệu.',
    },
    search: {
      icon: (
        <svg className="w-12 h-12 text-gov-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
      title: 'Không tìm thấy kết quả',
      message: 'Thử tìm kiếm với từ khóa khác.',
    },
  }[type];

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 opacity-60">{defaults.icon}</div>

      <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {title ?? defaults.title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 max-w-xs">
        {message ?? defaults.message}
      </p>

      {error && (
        <details className="mt-2 text-left max-w-sm">
          <summary className="text-xs text-red-400 cursor-pointer hover:text-red-300">
            Chi tiết lỗi
          </summary>
          <pre className="mt-2 text-xs text-red-300 bg-red-950/30 rounded-lg p-3 overflow-auto max-h-32 whitespace-pre-wrap">
            {error.message}
          </pre>
        </details>
      )}

      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-gov-700 hover:bg-gov-600
                     text-white text-sm font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-4 h-4" />
          Thử lại
        </motion.button>
      )}
    </motion.div>
  );
}
