import React from 'react';

interface ProductWindowProps {
  title?: string;
  badge?: string;
  badgeType?: 'default' | 'success' | 'warning' | 'purple';
  children: React.ReactNode;
  className?: string;
  actionContent?: React.ReactNode;
}

export const ProductWindow: React.FC<ProductWindowProps> = ({
  title = 'EgyKode Pilot',
  badge,
  badgeType = 'default',
  children,
  className = '',
  actionContent
}) => {
  const getBadgeStyle = () => {
    switch (badgeType) {
      case 'success':
        return 'text-[#059669] dark:text-[#22de7e] bg-[#059669]/10 dark:bg-[#22de7e]/10 border-[#059669]/30 dark:border-[#22de7e]/30';
      case 'warning':
        return 'text-[#d97706] dark:text-[#fbbf24] bg-[#d97706]/10 dark:bg-[#fbbf24]/10 border-[#d97706]/30 dark:border-[#fbbf24]/30';
      case 'purple':
        return 'text-[#7c3aed] dark:text-[#c084fc] bg-[#7c3aed]/10 dark:bg-[#c084fc]/10 border-[#7c3aed]/30 dark:border-[#c084fc]/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10';
    }
  };

  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200/80 dark:border-white/10 shadow-lg dark:shadow-2xl relative bg-white dark:bg-[#0f1316] transition-colors duration-200 ${className}`}>
      {/* Top Window Bar */}
      <div className="bg-[#f3f4f6] dark:bg-[#0b0e11] border-b border-gray-200 dark:border-white/10 px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between gap-2 select-none transition-colors duration-200">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400 ml-2 tracking-wide flex items-center gap-1.5 min-w-0 truncate">
            <span className="text-[#059669] dark:text-[#22de7e] font-semibold shrink-0">pilot://</span>
            <span className="truncate">{title}</span>
            <span className="shrink-0 text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">· Example</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {badge && (
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider whitespace-nowrap ${getBadgeStyle()}`}>
              {badge}
            </span>
          )}
          {actionContent}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 bg-white dark:bg-[#080a0c]/90 transition-colors duration-200">
        {children}
      </div>
    </div>
  );
};
