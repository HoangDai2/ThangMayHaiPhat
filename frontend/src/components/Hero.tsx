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

export default function Hero() {
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
      className="w-full bg-[#f8fafc] border-b border-slate-200/60 overflow-hidden lg:pt-28 lg:pb-16"
    >
      <div className="w-full lg:max-w-7xl lg:mx-auto lg:px-8">
        {/*
          RESPONSIVE FLOW:
          - Mobile (< lg): Slider is order-1 (at the very top, full-bleed 100dvh).
                           Authority text is order-2 (below the slider).
          - Desktop (>= lg): Authority text is left column (col-span-6, order-1).
                             Slider is right column (col-span-6, order-2, boxed card h-[560px]).
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-0 lg:gap-12 items-center">
          {/* =========================================================================
              SLIDER: FULLSCREEN ON MOBILE (top of screen), BOXED CARD ON DESKTOP
              ========================================================================= */}
          <div className="order-1 lg:order-2 lg:col-span-6 w-full flex justify-center items-center">
            <div className="relative w-full h-[100dvh] min-h-[580px] lg:h-[560px] rounded-none lg:rounded-3xl overflow-hidden shadow-none lg:shadow-2xl bg-[#091524] border-0 lg:border lg:border-slate-800">
              {/* Embla Viewport */}
              <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                <div className="flex h-full w-full">
                  {displayBanners.map((slide: BannerSlide, index: number) => {
                    const isActive = selectedIndex === index;

                    return (
                      <div
                        key={slide.id || index}
                        className="relative min-w-0 flex-[0_0_100%] h-full flex flex-col justify-center p-6 sm:p-8 lg:p-10 select-none pt-20 sm:pt-24 lg:pt-8 pb-20 sm:pb-24 lg:pb-8"
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
                          <div className="absolute inset-0 bg-gradient-to-b from-[#091524]/70 via-transparent to-transparent lg:hidden" />
                        </div>

                        {/* Top Highlights Badge - Anchored to Top */}
                        <div className="absolute top-20 sm:top-24 lg:top-8 left-6 sm:left-8 lg:left-10 right-6 sm:right-8 lg:right-10 z-10 flex items-center justify-between gap-3">
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
                        <div className="relative z-10 space-y-3.5 sm:space-y-4 my-auto w-full max-w-xl lg:max-w-none">
                          {slide.subtitle && (
                            <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold tracking-wider uppercase bg-cyan-950/70 backdrop-blur-md border border-cyan-400/35 px-3 py-1 rounded-full shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                              <span className="truncate max-w-[280px] sm:max-w-none">{slide.subtitle}</span>
                            </div>
                          )}

                          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
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
                              <Link
                                href={slide.primary_button_link || '/san-pham'}
                                className="group w-full flex items-center justify-center gap-2 bg-white text-[#0d1f35] hover:bg-blue-50 py-3 sm:py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl active:scale-[0.98]"
                              >
                                <span>{slide.primary_button_text}</span>
                                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Scroll-Down Indicator */}
              <div className="absolute bottom-4 left-5 z-20 flex lg:hidden items-center gap-1.5 text-white/70 text-xs font-mono uppercase tracking-wider select-none pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Cuộn khám phá</span>
                <ChevronDown size={14} className="animate-bounce" />
              </div>

              {/* Slider Dots & Navigation Controls */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md border border-white/15 px-2.5 py-1.5 rounded-full shadow-lg">
                  {displayBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === selectedIndex ? 'w-6 bg-white shadow-sm' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Chuyển đến slide ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={scrollPrev}
                    className="w-7 h-7 rounded-full bg-black/55 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="w-7 h-7 rounded-full bg-black/55 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              LEFT COLUMN: AUTHORITY TEXT, SPECS & CTAS
              (order-2 on mobile below slider, order-1 on desktop in left col)
              ========================================================================= */}
          <div className="order-2 lg:order-1 lg:col-span-6 w-full px-4 sm:px-6 lg:px-0 py-10 lg:py-0 flex flex-col justify-center space-y-6">
            {/* Engineering Standard Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#285c9a] font-mono text-xs font-semibold uppercase tracking-wider w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tiêu chuẩn Châu Âu EN 81 // ISO 9001:2015</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-3.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d1f35] leading-[1.15] tracking-tight">
                Kiến Tạo <span className="text-[#285c9a]">Kiệt Tác Thang Máy</span> Cho Biệt Thự & Nhà Phố
              </h1>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                Giải pháp may đo cơ khí tinh xảo, tích hợp công nghệ biến tần Fuji Nhật Bản & Montanari Ý. Tối ưu 100% diện tích không gian sống với hố PIT siêu nông.
              </p>
            </div>

            {/* 4 Technical Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: 'Hố PIT siêu nông từ', value: '200mm' },
                { title: 'Linh kiện chính hãng', value: '100% CO/CQ' },
                { title: 'Bảo hành chính hãng', value: '36 Tháng' },
                { title: 'Cứu hộ 24/7 có mặt', value: '≤ 30 Phút' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white/80 border border-slate-200/80 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#285c9a] shrink-0" />
                  <span>
                    {item.title} <span className="font-mono font-bold text-[#285c9a]">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Conversion CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/lien-he"
                className="group inline-flex items-center gap-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md shadow-[#285c9a]/25 hover:shadow-xl hover:shadow-[#285c9a]/35 active:scale-[0.98]"
              >
                <span>Nhận Tư Vấn & Báo Giá 3D</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={14} />
                </span>
              </Link>

              <a
                href="tel:0898424666"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-5 sm:px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-colors shadow-sm active:scale-[0.98]"
              >
                <Phone size={15} className="text-[#285c9a]" />
                <span className="font-mono font-bold">0898.424.666</span>
              </a>
            </div>

            {/* Telemetry Stats Bar */}
            <div className="pt-6 sm:pt-8 border-t border-slate-200">
              <div className="grid grid-cols-3 divide-x divide-slate-200 bg-slate-50/80 sm:bg-transparent rounded-2xl sm:rounded-none py-3.5 px-1 sm:p-0 border border-slate-200/70 sm:border-0 shadow-xs sm:shadow-none">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-1 sm:px-0 sm:pr-4">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0d1f35] font-mono tracking-tight">5+ Năm</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight sm:leading-normal mt-1">
                    Kinh nghiệm <span className="block sm:inline">chuyên sâu</span>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-1 sm:px-4">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#285c9a] font-mono tracking-tight">1.000+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight sm:leading-normal mt-1">
                    Công trình <span className="block sm:inline">hoàn thành</span>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-1 sm:px-0 sm:pl-4">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-600 font-mono tracking-tight">98%</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight sm:leading-normal mt-1">
                    Khách hàng <span className="block sm:inline">hài lòng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Authority Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-0 pb-12 sm:pb-16 lg:pb-0">
          <AboutUs />
        </div>
      </div>
    </section>
  );
}
