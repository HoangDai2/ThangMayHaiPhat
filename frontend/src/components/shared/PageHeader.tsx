import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  telemetryTag?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  badge,
  title,
  subtitle,
  breadcrumbs,
  telemetryTag = 'EN 81-20/50 · ISO 9001:2015',
  children,
}: PageHeaderProps) {
  return (
    <header className="relative bg-[#0d1f35] text-white pt-32 sm:pt-36 pb-20 sm:pb-24 overflow-hidden border-b border-slate-800">
      {/* Blueprint Grid & Ambient Oceanic Radial Glows */}
      <div className="absolute inset-0 bg-grid-blueprint pointer-events-none opacity-20" />
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#285c9a]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-[#1e4a80]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation & Technical Telemetry Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              <Home size={13} className="text-[#4a7bbf]" />
              <span>Trang chủ</span>
            </Link>

            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  <ChevronRight size={12} className="text-slate-600" />
                  {isLast || !item.href ? (
                    <span className="text-blue-300 font-medium truncate max-w-[200px] sm:max-w-none">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors duration-200 truncate max-w-[150px] sm:max-w-none"
                    >
                      {item.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {telemetryTag && (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{telemetryTag}</span>
            </div>
          )}
        </div>

        {/* Content Block */}
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#285c9a]/25 border border-[#4a7bbf]/40 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </header>
  );
}
