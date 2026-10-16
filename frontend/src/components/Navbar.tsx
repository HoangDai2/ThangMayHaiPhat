"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Phone,
  ChevronRight,
  Home,
  Box,
  Wrench,
  FolderKanban,
  FileText,
  Users,
  Mail,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { useArticlesData } from '../hooks/useArticlesData';

const navLinks = [
  { label: 'Trang chủ', href: '/', icon: Home },
  { label: 'Sản phẩm', href: '/san-pham', icon: Box },
  { label: 'Dịch vụ', href: '/dich-vu', icon: Wrench },
  { label: 'Dự án', href: '/du-an', icon: FolderKanban },
  { label: 'Bài viết', href: '/bai-viet', icon: FileText },
  { label: 'Về chúng tôi', href: '/ve-chung-toi', icon: Users },
  { label: 'Liên hệ', href: '/lien-he', icon: Mail },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { articles } = useArticlesData();
  const hasArticles = (articles && articles.length > 0) || false;
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const filteredNavLinks = navLinks.filter(
    (link) => link.label !== 'Bài viết' || hasArticles
  );

  // Determine current theme style based on scroll state & page route
  // Subpages start with dark hero, homepage starts with light/translucent hero
  const isDarkNavbar = !menuOpen && !scrolled && !isHomePage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        menuOpen
          ? 'bg-white shadow-md border-b border-slate-200 py-2.5 sm:py-3'
          : scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/80 py-2 sm:py-2.5'
          : isHomePage
          ? 'bg-transparent border-transparent py-3 sm:py-3.5 lg:bg-[#f8fafc]/90 lg:backdrop-blur-md lg:border-b lg:border-slate-200/50 lg:py-2.5 lg:sm:py-3'
          : 'bg-[#0d1f35]/90 backdrop-blur-md border-b border-white/10 py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 group relative z-10">
          {menuOpen || scrolled ? (
            <img
              src="/logo dang dai khong nen.png"
              alt="Thang Máy Hải Phát"
              className="h-10 sm:h-12 lg:h-11 xl:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : isHomePage ? (
            <>
              {/* On mobile homepage: transparent navbar over slidebar -> white logo */}
              <img
                src="/logohp-light.png"
                alt="Thang Máy Hải Phát"
                className="block lg:hidden h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
              {/* On desktop homepage: light navbar over light hero -> dark logo */}
              <img
                src="/logo dang dai khong nen.png"
                alt="Thang Máy Hải Phát"
                className="hidden lg:block lg:h-11 xl:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </>
          ) : (
            <img
              src="/logohp-light.png"
              alt="Thang Máy Hải Phát"
              className="h-10 sm:h-12 lg:h-11 xl:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center shrink-0 gap-1 xl:gap-2">
          {filteredNavLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative whitespace-nowrap px-3 xl:px-3.5 py-1.5 rounded-lg text-sm xl:text-[15px] font-semibold transition-all duration-200 ${
                  isActive
                    ? isDarkNavbar
                      ? 'text-white bg-white/10 shadow-xs font-bold'
                      : 'text-[#285c9a] bg-blue-50/80 shadow-xs font-bold'
                    : isDarkNavbar
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-700 hover:text-[#285c9a] hover:bg-slate-100/70'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full ${
                      isDarkNavbar ? 'bg-blue-400' : 'bg-[#285c9a]'
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Hotline on Desktop */}
        <div className="hidden lg:flex items-center shrink-0 gap-2 xl:gap-3">
          <a
            href="tel:0987603588"
            className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 border whitespace-nowrap ${
              isDarkNavbar
                ? 'border-white/20 text-slate-200 hover:bg-white/10'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100/80 hover:text-[#285c9a]'
            }`}
          >
            <Phone size={13} className="text-[#285c9a]" />
            <span className="font-mono">0987.603.588</span>
          </a>

          <a
            href="tel:0898424666"
            className="group relative flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-bold bg-[#285c9a] hover:bg-[#1e4a80] text-white shadow-md shadow-[#285c9a]/25 hover:shadow-lg hover:shadow-[#285c9a]/35 transition-all duration-200 select-none active:scale-[0.98] whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Phone size={13} className="group-hover:rotate-12 transition-transform" />
            <span className="font-mono">0898.424.666</span>
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-colors ${
            menuOpen
              ? 'text-slate-800 bg-slate-100'
              : scrolled
              ? 'text-slate-800 hover:bg-slate-100'
              : 'text-white hover:bg-white/15 drop-shadow-sm'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Floating Dropdown Menu */}
      {menuOpen && (
        <>
          {/* Backdrop Overlay - Closes menu on outside tap */}
          <div
            className="fixed inset-0 bg-slate-950/45 backdrop-blur-[2px] z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />

          {/* Floating Card under Header */}
          <div className="absolute top-[calc(100%+8px)] left-3.5 right-3.5 sm:left-6 sm:right-6 max-w-md mx-auto z-50 bg-white lg:hidden overflow-hidden rounded-2xl border border-slate-200 shadow-2xl max-h-[calc(100vh-90px)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Top Navigation Links Section */}
            <div className="p-3.5 sm:p-4 space-y-2.5">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-mono uppercase tracking-wider text-slate-400">
                <span>DANH MỤC ĐIỀU HƯỚNG</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  SLA 24/7 SẴN SÀNG
                </span>
              </div>

              {/* Navigation Links Grid - Increased to comfortable text-base (16px) */}
              <nav className="space-y-1.5">
                {filteredNavLinks.map((link) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : pathname === link.href || pathname.startsWith(`${link.href}/`);
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl font-bold text-[15px] sm:text-base transition-all duration-200 ${
                        isActive
                          ? 'bg-[#285c9a] text-white shadow-xs'
                          : 'bg-slate-50 text-slate-800 hover:bg-blue-50/80 hover:text-[#285c9a] border border-slate-100/90'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isActive ? 'bg-white/20 text-white' : 'bg-white text-[#285c9a] shadow-xs'
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <span className="tracking-tight">{link.label}</span>
                      </div>
                      <ChevronRight size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Support & Emergency Hotline Section */}
            <div className="p-3.5 sm:p-4 bg-slate-50/90 border-t border-slate-200/80 space-y-2.5">
              <div className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#285c9a]" />
                <span>HỖ TRỢ & BÁO GIÁ TRỰC TIẾP</span>
              </div>

              {/* Hotlines Grid */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:0898424666"
                  className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <Phone size={14} className="shrink-0" />
                  <span className="font-mono truncate">0898.424.666</span>
                </a>

                <a
                  href="tel:0987603588"
                  className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-2.5 bg-white border border-slate-300 text-slate-800 hover:border-[#285c9a] hover:text-[#285c9a] rounded-xl font-bold text-xs sm:text-sm transition-all shadow-2xs"
                >
                  <Phone size={14} className="text-[#285c9a] shrink-0" />
                  <span className="font-mono truncate">0987.603.588</span>
                </a>
              </div>

              {/* Quick Zalo Chat Button */}
              <a
                href="https://zalo.me/0898424666"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3.5 bg-blue-50 border border-blue-200 text-[#285c9a] rounded-xl font-bold text-xs sm:text-[13px] transition-all"
              >
                <MessageCircle size={15} />
                <span>Nhắn tin Zalo với Kỹ sư Hải Phát</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
