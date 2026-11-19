import React from 'react';

interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

export function SectionBadge({
  children,
  variant = 'light',
  className = '',
}: SectionBadgeProps) {
  const variantStyles =
    variant === 'dark'
      ? 'bg-white/15 border-white/20 text-white backdrop-blur-sm'
      : 'bg-blue-50 border-blue-200/60 text-[#285c9a]';

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full border font-mono text-xs font-semibold uppercase tracking-wider shadow-sm ${variantStyles} ${className}`}
    >
      <span>{children}</span>
    </div>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark';
  className?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  variant = 'light',
  className = '',
  action,
}: SectionHeaderProps) {
  const isCenter = align === 'center' && !action;
  const hasMarginBottom = /\bmb-/.test(className);

  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      } ${action ? 'md:flex-row md:items-end md:justify-between gap-6' : ''} ${
        hasMarginBottom ? '' : 'mb-12 sm:mb-16'
      } ${className}`}
    >
      <div className={isCenter ? 'max-w-3xl mx-auto' : 'max-w-3xl'}>
        {badge && (
          <SectionBadge variant={variant} className="mb-3.5">
            {badge}
          </SectionBadge>
        )}

        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
            variant === 'dark' ? 'text-white' : 'text-[#0d1f35]'
          }`}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={`mt-3.5 text-sm sm:text-base leading-relaxed max-w-2xl ${
              isCenter ? 'mx-auto' : ''
            } ${variant === 'dark' ? 'text-blue-100/90' : 'text-slate-600'}`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
