import React from 'react';

interface SectionHeaderProps {
  sceneNumber: string;
  category: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  sceneNumber,
  category,
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 sm:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {/* Scene Identifier Eyebrow */}
      <div className={`inline-flex items-center gap-2 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        <span className="font-mono text-[11px] font-semibold text-[#047857] dark:text-[#22de7e] tracking-widest uppercase bg-[#ecfdf5] dark:bg-[#22de7e]/10 border border-[#a7f3d0] dark:border-[#22de7e]/25 px-3 py-1 rounded-full shadow-xs transition-colors duration-200">
          {sceneNumber} · {category}
        </span>
      </div>

      {/* Main Display Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-gray-900 dark:text-white mb-4 leading-[1.15] transition-colors duration-200">
        {title}
      </h2>

      {/* Supporting Narrative Subtitle */}
      {subtitle && (
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-sans leading-relaxed transition-colors duration-200">
          {subtitle}
        </p>
      )}
    </div>
  );
};
