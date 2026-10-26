import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  action,
}: SectionHeaderProps) {
  const isCenter = align === 'center' && !action;

  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      } ${action ? 'md:flex-row md:items-end md:justify-between' : ''} mb-12 sm:mb-16 ${className}`}
    >
      <div className={isCenter ? 'max-w-3xl mx-auto' : 'max-w-3xl'}>
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#285c9a] font-mono text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#285c9a] animate-pulse" />
            <span>{badge}</span>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0d1f35] tracking-tight leading-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="mt-6 md:mt-0 flex-shrink-0">{action}</div>}
    </div>
  );
}
