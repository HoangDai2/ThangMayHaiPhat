"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Phone,
  ChevronRight,
  ChevronDown,
  Home,
  Box,
  Wrench,
  FolderKanban,
  FileText,
  Users,
  Mail,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useArticlesData } from '../hooks/useArticlesData';
import { useProductsData } from '../hooks/useProductsData';
import { products as staticProducts } from '../data/products';
import { useQuickQuote } from '../context/QuickQuoteContext';

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
  const { openQuoteModal } = useQuickQuote();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isProductActive = pathname.startsWith('/san-pham');
  const [mobileProductOpen, setMobileProductOpen] = useState(isProductActive);

  const { articles } = useArticlesData();
  const hasArticles = (articles && articles.length > 0) || false;

  const { products } = useProductsData();
  const productItems = products && products.length > 0 ? products : staticProducts;

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setProductDropdownOpen(false);
    if (pathname.startsWith('/san-pham')) {
      setMobileProductOpen(true);
    }
  }, [pathname]);

  // Handle outside click & Escape key for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProductDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setProductDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductDropdownOpen(false);
    }, 180);
  };

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
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 group relative z-10">
          {menuOpen || scrolled ? (
            <img
              src="/logo dang dai khong nen.png"
              alt="Thang Máy Hải Phát"
              className="h-10 sm:h-11 lg:h-11 xl:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : isHomePage ? (
            <>
              {/* On mobile homepage: transparent navbar over slidebar -> white logo */}
              <img
                src="/logohp-light.png"
                alt="Thang Máy Hải Phát"
                className="block lg:hidden h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
              {/* On desktop homepage: light navbar over light hero -> dark logo */}
              <img
                src="/logo dang dai khong nen.png"
                alt="Thang Máy Hải Phát"
                className="hidden lg:block lg:h-11 xl:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </>
          ) : (
            <img
              src="/logohp-light.png"
              alt="Thang Máy Hải Phát"
              className="h-10 sm:h-11 lg:h-11 xl:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center shrink-0 gap-0.5 xl:gap-1.5">
          {filteredNavLinks.map((link) => {
            // "Sản phẩm" with Dropdown Submenu
            if (link.label === 'Sản phẩm') {
              return (
                <div
                  key="desktop-san-pham-dropdown"
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setProductDropdownOpen((prev) => !prev)}
                    className={`relative whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-lg text-xs lg:text-[13px] xl:text-sm font-semibold transition-all duration-200 inline-flex items-center gap-1 cursor-pointer select-none ${
                      isProductActive
                        ? isDarkNavbar
                          ? 'text-white bg-white/10 shadow-xs font-bold'
                          : 'text-[#285c9a] bg-blue-50/80 shadow-xs font-bold'
                        : isDarkNavbar
                        ? 'text-slate-300 hover:text-white hover:bg-white/5'
                        : 'text-slate-700 hover:text-[#285c9a] hover:bg-slate-100/70'
                    }`}
                    aria-expanded={productDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span>Sản phẩm</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 shrink-0 ${
                        productDropdownOpen ? 'rotate-180' : ''
                      } ${
                        isProductActive
                          ? isDarkNavbar
                            ? 'text-blue-300'
                            : 'text-[#285c9a]'
                          : 'opacity-70'
                      }`}
                    />
                    {isProductActive && (
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-5 xl:w-6 h-0.5 rounded-full ${
                          isDarkNavbar ? 'bg-blue-400' : 'bg-[#285c9a]'
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu Panel on Desktop */}
                  {productDropdownOpen && (
                    <div
                      className="absolute top-[calc(100%+6px)] left-0 xl:-left-6 w-[560px] xl:w-[620px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(13,31,53,0.18)] border border-slate-200/90 p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150 before:absolute before:-top-2.5 before:left-0 before:right-0 before:h-2.5 before:content-['']"
                      role="menu"
                      aria-label="Danh mục sản phẩm thang máy"
                    >
                      {/* Top Header Strip */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        <span className="flex items-center gap-1.5 font-bold text-slate-700">
                          <Box size={13} className="text-[#285c9a]" />
                          DÒNG THANG MÁY CHỦ LỰC (100% MAY ĐO)
                        </span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1.5 text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          TIÊU CHUẨN EN 81 // CO/CQ
                        </span>
                      </div>

                      {/* Products Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {productItems.map((p) => {
                          const isCurrent = pathname === `/san-pham/${p.id}`;
                          return (
                            <Link
                              key={p.id}
                              href={`/san-pham/${p.id}`}
                              onClick={() => setProductDropdownOpen(false)}
                              className={`group/item flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 border text-left ${
                                isCurrent
                                  ? 'bg-blue-50/90 border-[#285c9a]/30 shadow-2xs'
                                  : 'bg-white hover:bg-slate-50/90 border-slate-100 hover:border-slate-200/90 hover:shadow-2xs'
                              }`}
                            >
                              <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-900 shrink-0 relative border border-slate-200/80">
                                <img
                                  src={p.image}
                                  alt={p.title}
                                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <h4
                                    className={`text-xs font-bold leading-snug truncate transition-colors ${
                                      isCurrent
                                        ? 'text-[#285c9a]'
                                        : 'text-[#0d1f35] group-hover/item:text-[#285c9a]'
                                    }`}
                                  >
                                    {p.title}
                                  </h4>
                                  <ArrowRight
                                    size={12}
                                    className={`shrink-0 transition-all ${
                                      isCurrent
                                        ? 'text-[#285c9a] opacity-100'
                                        : 'text-[#285c9a] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0'
                                    }`}
                                  />
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 leading-tight">
                                  {p.subtitle || p.shortDescription}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Bottom Footer Action */}
                      <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between px-1 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Khảo sát hố thang &amp; lên bản vẽ 3D miễn phí</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setProductDropdownOpen(false);
                            openQuoteModal();
                          }}
                          className="font-bold text-[#285c9a] hover:text-[#1e4a80] inline-flex items-center gap-1 cursor-pointer bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1 rounded-lg transition-colors text-[11px]"
                        >
                          <Sparkles size={12} className="text-amber-500" />
                          <span>Báo giá nhanh (30 Giây)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Standard Nav Links
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-lg text-xs lg:text-[13px] xl:text-sm font-semibold transition-all duration-200 ${
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
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-5 xl:w-6 h-0.5 rounded-full ${
                      isDarkNavbar ? 'bg-blue-400' : 'bg-[#285c9a]'
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Hotline on Desktop */}
        <div className="hidden lg:flex items-center shrink-0 gap-2 xl:gap-2.5">
          <a
            href="tel:0987603588"
            title="Kỹ thuật & cứu hộ: 0987.603.588"
            className={`hidden xl:inline-flex items-center justify-center gap-1.5 h-9 xl:h-9.5 px-2.5 xl:px-3 rounded-xl text-xs xl:text-[13px] font-semibold transition-all duration-200 border whitespace-nowrap ${
              isDarkNavbar
                ? 'border-white/20 text-slate-200 hover:bg-white/10'
                : 'border-slate-300 text-slate-700 bg-white/80 hover:bg-slate-100 hover:text-[#285c9a]'
            }`}
          >
            <Phone size={13} className="text-[#285c9a] shrink-0" />
            <span className="font-mono">0987.603.588</span>
          </a>

          <a
            href="tel:0898424666"
            title="Hotline: 0898.424.666"
            className="group relative inline-flex items-center justify-center gap-2 h-9 xl:h-9.5 px-3 xl:px-3.5 rounded-xl text-xs xl:text-[13px] font-bold bg-[#285c9a] hover:bg-[#1e4a80] text-white border border-transparent shadow-sm hover:shadow-md transition-all duration-200 select-none active:scale-[0.98] whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <Phone size={13} className="group-hover:rotate-12 transition-transform shrink-0" />
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

              {/* Quick Quote CTA for Mobile */}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1E5AA8] hover:bg-[#174C91] active:scale-[0.98] text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer select-none"
              >
                <Sparkles size={16} className="text-amber-300" />
                <span>Nhận Dự Toán & Báo Giá Nhanh (30 Giây)</span>
              </button>

              {/* Navigation Links Grid with Expandable Products */}
              <nav className="space-y-1.5">
                {filteredNavLinks.map((link) => {
                  if (link.label === 'Sản phẩm') {
                    return (
                      <div key="mobile-san-pham" className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setMobileProductOpen((prev) => !prev)}
                          className={`w-full flex items-center justify-between py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl font-bold text-[15px] sm:text-base transition-all duration-200 cursor-pointer ${
                            isProductActive
                              ? 'bg-[#285c9a] text-white shadow-xs'
                              : 'bg-slate-50 text-slate-800 hover:bg-blue-50/80 hover:text-[#285c9a] border border-slate-100/90'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                isProductActive
                                  ? 'bg-white/20 text-white'
                                  : 'bg-white text-[#285c9a] shadow-xs'
                              }`}
                            >
                              <Box size={18} />
                            </div>
                            <span className="tracking-tight">Sản phẩm</span>
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ml-1 ${
                                isProductActive
                                  ? 'bg-white/20 text-white'
                                  : 'bg-blue-50 text-[#285c9a] border border-blue-100'
                              }`}
                            >
                              {productItems.length} dòng
                            </span>
                          </div>
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${
                              mobileProductOpen ? 'rotate-180' : ''
                            } ${isProductActive ? 'text-white' : 'text-slate-400'}`}
                          />
                        </button>

                        {/* Submenu Accordion Items for Mobile */}
                        {mobileProductOpen && (
                          <div className="pl-3 pr-1 py-1 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                            {productItems.map((p) => {
                              const isCurrent = pathname === `/san-pham/${p.id}`;
                              return (
                                <Link
                                  key={p.id}
                                  href={`/san-pham/${p.id}`}
                                  onClick={() => setMenuOpen(false)}
                                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all border ${
                                    isCurrent
                                      ? 'bg-blue-50 border-blue-200 text-[#285c9a] shadow-2xs font-bold'
                                      : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700'
                                  }`}
                                >
                                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                                    <img
                                      src={p.image}
                                      alt={p.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs font-bold text-slate-900 truncate">
                                      {p.title}
                                    </div>
                                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                      {p.subtitle || p.shortDescription}
                                    </div>
                                  </div>
                                  <ChevronRight size={14} className="text-slate-400 shrink-0" />
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

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
                  title="Hotline: 0898.424.666"
                  className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <Phone size={14} className="shrink-0" />
                  <span className="font-mono truncate">0898.424.666</span>
                </a>

                <a
                  href="tel:0987603588"
                  title="Kỹ thuật & cứu hộ: 0987.603.588"
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
