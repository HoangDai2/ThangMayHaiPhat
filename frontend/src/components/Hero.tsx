"use client";

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { DEFAULT_BANNERS, BannerSlide } from '../data/banners';
import Link from 'next/link';
import AboutUs from './AboutUs';
import QuickQuoteWidget from './QuickQuoteWidget';
import PricingOverview from './PricingOverview';
import { useQuickQuote } from '../context/QuickQuoteContext';

export default function Hero() {
  const { openQuoteModal } = useQuickQuote();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const displayBanners: BannerSlide[] = DEFAULT_BANNERS;

  return (
    <section
      id="home"
      className="w-full bg-[#f8fafc] bg-grid-light border-b border-slate-200/60 overflow-hidden lg:pt-28 lg:pb-16 relative"
    >
      <div className="w-full lg:max-w-7xl lg:mx-auto lg:px-8">
        {/*
          RESPONSIVE STRATEGY:
          - Mobile (< lg): Retains original slider (100dvh full-bleed at top, order-1)
                           Authority text sits below (order-2).
          - Desktop (>= lg): Authority text on left (col-span-6, order-1).
                             QuickQuoteWidget on right (col-span-6, order-2) replacing slider.
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 lg:items-stretch">
          {/* =========================================================================
              MOBILE ONLY: ORIGINAL FULLSCREEN SLIDER AT TOP OF SCREEN (< lg)
              ========================================================================= */}
          <div className="order-1 lg:hidden w-full flex justify-center items-center">
            <div className="relative w-full h-[100dvh] min-h-[580px] rounded-none overflow-hidden shadow-none bg-[#091524] border-0">
              {/* Embla Viewport */}
              <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                <div className="flex h-full w-full">
                  {displayBanners.map((slide: BannerSlide, index: number) => {
                    const isActive = selectedIndex === index;

                    return (
                      <div
                        key={slide.id || index}
                        className="relative min-w-0 flex-[0_0_100%] h-full flex flex-col justify-center p-6 sm:p-8 select-none pt-20 sm:pt-24 pb-36 sm:pb-24"
                      >
                        {/* Background Image with Architectural Dusk Lights */}
                        <div className="absolute inset-0 overflow-hidden">
                          <img
                            src={slide.image_url}
                            alt={slide.title}
                            className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                              isActive ? 'scale-105' : 'scale-100'
                            }`}
                          />
                          {/* Ambient Contrast Gradient Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-[#091524]/65 to-black/40" />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#091524]/85 via-[#091524]/40 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-b from-[#091524]/70 via-transparent to-transparent" />
                        </div>

                        {/* Top Highlights Badge - Anchored to Top */}
                        <div className="absolute top-20 sm:top-24 left-6 sm:left-8 right-6 sm:right-8 z-10 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 bg-black/45 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full shadow-lg">
                            <img
                              src="/logo-icon.png"
                              alt="Hải Phát Logo"
                              className="w-4 h-4 object-contain rounded-full border border-white/30"
                            />
                            <span className="text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase font-mono">
                              Hải Phát Elevator
                            </span>
                          </div>

                          {slide.highlight_tag && (
                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/25 to-blue-500/25 backdrop-blur-md border border-amber-400/35 text-amber-200 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold shadow-md">
                              <Sparkles size={11} className="text-amber-300" />
                              <span className="truncate max-w-[180px] sm:max-w-none">{slide.highlight_tag}</span>
                            </div>
                          )}
                        </div>

                        {/* Content Area - Vertically Centered in Screen */}
                        <div className="relative z-10 space-y-3.5 sm:space-y-4 my-auto w-full max-w-xl">
                          {slide.subtitle && (
                            <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold tracking-wider uppercase bg-cyan-950/70 backdrop-blur-md border border-cyan-400/35 px-3 py-1 rounded-full shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                              <span className="truncate max-w-[280px] sm:max-w-none">{slide.subtitle}</span>
                            </div>
                          )}

                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                            {slide.title}
                          </h2>

                          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal line-clamp-3 sm:line-clamp-2">
                            {slide.description}
                          </p>

                          {/* Stats on slide if present */}
                          {slide.stats && slide.stats.length > 0 && (
                            <div className="grid grid-cols-3 gap-2.5 pt-1">
                              {slide.stats.map((st, sIdx) => (
                                <div key={sIdx} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2 text-center">
                                  <div className="text-base sm:text-lg font-extrabold text-white font-mono">
                                    {st.value}
                                  </div>
                                  <div className="text-[10px] sm:text-xs text-white/80 font-medium truncate">
                                    {st.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* CTA Button on Slider */}
                          <div className="pt-2">
                            {slide.primary_button_text && (
                              <button
                                type="button"
                                onClick={() => {
                                  const text = slide.primary_button_text?.toLowerCase() || '';
                                  const link = slide.primary_button_link || '';
                                  if (
                                    text.includes('tư vấn') ||
                                    text.includes('báo giá') ||
                                    link === '#contact' ||
                                    link === '#quote'
                                  ) {
                                    openQuoteModal();
                                  } else if (link.startsWith('#')) {
                                    const target = document.querySelector(link);
                                    if (target) {
                                      target.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                      openQuoteModal();
                                    }
                                  } else if (link) {
                                    window.location.href = link;
                                  } else {
                                    openQuoteModal();
                                  }
                                }}
                                className="group w-full flex items-center justify-center gap-2 bg-white text-[#0d1f35] hover:bg-blue-50 py-3 sm:py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl active:scale-[0.98] cursor-pointer"
                              >
                                <span>{slide.primary_button_text}</span>
                                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Integrated Centered Slider Navigation Capsule */}
              <div className="absolute bottom-[72px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-xl select-none">
                <button
                  onClick={scrollPrev}
                  className="w-6 h-6 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition-all active:scale-90"
                  aria-label="Slide trước"
                >
                  <ChevronLeft size={14} />
                </button>

                <div className="flex items-center gap-1.5 px-1">
                  {displayBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === selectedIndex ? 'w-5 bg-white shadow-sm' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Chuyển đến slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={scrollNext}
                  className="w-6 h-6 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition-all active:scale-90"
                  aria-label="Slide sau"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              AUTHORITY TEXT, SPECS & CTAS (LEFT COLUMN)
              - Order-2 on mobile (below slider)
              - Order-1 on desktop (col-span-6 on left, vertically centered with right column)
              ========================================================================= */}
          <div className="order-2 lg:order-1 lg:col-span-6 w-full px-4 sm:px-6 lg:px-0 py-2 flex flex-col justify-center space-y-5 lg:space-y-6">
            {/* Top: Standard Badge & Headline */}
            <div className="space-y-3 sm:space-y-3.5">
              {/* Engineering Standard Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-[#1E5AA8] font-mono text-xs font-semibold uppercase tracking-wider w-fit shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tiêu chuẩn Châu Âu EN 81 // ISO 9001:2015</span>
              </div>

              {/* Display Headline */}
              <div className="space-y-2.5">
                <h1 className="text-3xl sm:text-4xl lg:text-[34px] xl:text-[38px] font-extrabold text-[#0d1f35] leading-[1.2] tracking-tight">
                  <span className="block">Kiến Tạo <span className="text-[#1E5AA8] whitespace-nowrap bg-gradient-to-r from-[#1E5AA8] to-[#285c9a] bg-clip-text text-transparent">Kiệt Tác Thang Máy</span></span>
                  <span className="block text-slate-800">Cho Biệt Thự & Nhà Phố</span>
                </h1>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-pretty max-w-xl">
                  Giải pháp may đo cơ khí tinh xảo, tích hợp công nghệ biến tần Fuji Nhật Bản & Montanari Ý. Tối ưu 100% diện tích không gian sống với hố PIT siêu nông.
                </p>
              </div>
            </div>

            {/* Middle: 4 Technical Highlights & CTAs */}
            <div className="space-y-4">
              {/* 4 Technical Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { label: 'Hố PIT siêu nông', value: 'từ 600mm' },
                  { label: 'Linh kiện chính hãng', value: '100% CO/CQ' },
                  { label: 'Bảo hành chính hãng', value: '18 Tháng' },
                  { label: 'Cứu hộ khẩn cấp 24/7', value: '≤ 120 Phút' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-slate-700 bg-white hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200/80 px-3.5 py-2.5 rounded-xl transition-all shadow-xs group"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1E5AA8] group-hover:scale-110 transition-transform shrink-0" />
                    <div className="leading-snug">
                      <span>{item.label}</span>{' '}
                      <span className="font-mono font-bold text-[#1E5AA8] tabular-nums whitespace-nowrap">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Conversion CTA Group */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                      const el = document.getElementById('quick-quote-card');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        return;
                      }
                    }
                    openQuoteModal();
                  }}
                  className="group inline-flex items-center gap-2.5 bg-[#1E5AA8] hover:bg-[#174C91] text-white px-5 sm:px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md shadow-[#1E5AA8]/25 hover:shadow-xl hover:shadow-[#1E5AA8]/35 active:scale-[0.98] cursor-pointer"
                >
                  <span>Nhận Tư Vấn & Báo Giá 3D</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={14} />
                  </span>
                </button>

                <a
                  href="tel:0898424666"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 px-4 sm:px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors shadow-xs active:scale-[0.98]"
                >
                  <Phone size={15} className="text-[#1E5AA8]" />
                  <span className="font-mono font-bold">0898.424.666</span>
                </a>
              </div>
            </div>

            {/* Bottom: Telemetry Stats Bar */}
            <div className="pt-1 sm:pt-2">
              <div className="grid grid-cols-3 divide-x divide-slate-200/80 bg-white rounded-2xl py-3 px-1 sm:px-2 border border-slate-200/70 shadow-xs">
                <div className="flex flex-col items-center text-center px-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0d1f35] font-mono tracking-tight tabular-nums">
                    5+ Năm
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Kinh nghiệm chuyên sâu
                  </div>
                </div>
                <div className="flex flex-col items-center text-center px-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#1E5AA8] font-mono tracking-tight tabular-nums">
                    1.000+
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Công trình hoàn thành
                  </div>
                </div>
                <div className="flex flex-col items-center text-center px-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 font-mono tracking-tight tabular-nums">
                    98%
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Khách hàng hài lòng
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              DESKTOP ONLY: QUICK QUOTE WIDGET (col-span-6 on right, >= lg)
              ========================================================================= */}
          <div
            id="quick-quote-card"
            className="hidden lg:flex lg:order-2 lg:col-span-6 w-full flex-col h-full"
          >
            <QuickQuoteWidget className="h-full" />
          </div>
        </div>

        {/* Brand Authority Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-0">
          <AboutUs />
        </div>

        {/* Pricing Overview Section (Bảng giá tham khảo 2026) */}
        <div className="mt-8 sm:mt-12 lg:mt-14 px-4 sm:px-6 lg:px-0 pb-12 sm:pb-16 lg:pb-12">
          <PricingOverview />
        </div>
      </div>
    </section>
  );
}
