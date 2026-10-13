"use client";
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Phone,
  Sparkles,
  CheckCircle2,
  Award,
  Clock,
  Building2
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
    <section id="home" className="pt-0 lg:pt-24 pb-6 bg-[#f8fafc] flex flex-col justify-center">
      <div className="max-w-[1800px] mx-auto px-0 sm:px-6 lg:px-8 w-full">

        {/* DESKTOP (Split 50/50) & MOBILE (100% Fullscreen Viewport) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-10 items-center">

          {/* CỘT TRÁI TRÊN MÁY TÍNH (Chiếm 50% - lg:col-span-6): Giới thiệu thương hiệu & Uy tín */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-6 pr-4">

            {/* Tag Uy Tín */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#285c9a] text-xs font-bold tracking-wide uppercase w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tiêu chuẩn Châu Âu EN 81 · ISO 9001</span>
            </div>

            {/* Tiêu đề lớn Desktop */}
            <div className="space-y-3">
              <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-[#0d1f35] leading-[1.15] tracking-tight">
                Kiến Tạo <span className="text-[#285c9a]">Kiệt Tác Thang Máy</span> Cho Biệt Thự & Nhà Phố
              </h1>
              <p className="text-slate-600 text-base xl:text-lg leading-relaxed max-w-xl">
                Giải pháp thang máy may đo tinh tế, tích hợp công nghệ biến tần Fuji Nhật Bản & Montanari Ý. Thiết kế hố PIT siêu nông, tối ưu 100% diện tích không gian sống.
              </p>
            </div>

            {/* 4 Điểm nhấn dịch vụ */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                'Hố PIT nông từ 200mm',
                'Linh kiện nhập khẩu 100%',
                'Bảo hành chính hãng 36T',
                'Cứu hộ 24/7 có mặt 30 phút'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#285c9a] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Nút Call To Action */}
            <div className="flex items-center gap-4 pt-3">
              <Link
                href="/lien-he"
                className="group inline-flex items-center gap-2.5 bg-[#285c9a] hover:bg-[#1e4676] text-white px-7 py-3.5 rounded-full font-bold text-sm xl:text-base transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:scale-[1.02]"
              >
                <span>Nhận Tư Vấn & Báo Giá 3D</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="tel:0898424666"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3.5 rounded-full font-semibold text-sm xl:text-base transition-colors shadow-sm"
              >
                <Phone size={15} className="text-[#285c9a]" />
                <span>0898.424.666</span>
              </a>
            </div>

            {/* Micro Stats Bar */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-extrabold text-[#0d1f35]">5+ Năm</div>
                <div className="text-xs text-slate-500 font-medium">Kinh nghiệm chuyên sâu</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#285c9a]">1.000+</div>
                <div className="text-xs text-slate-500 font-medium">Công trình hoàn thành</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-600">98%</div>
                <div className="text-xs text-slate-500 font-medium">Khách hàng hài lòng</div>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI TRÊN MÁY TÍNH (Chiếm 50% - lg:col-span-6) & TOÀN MÀN HÌNH TRÊN MOBILE (100% Viewport) */}
          <div className="w-full lg:col-span-6 flex justify-center items-center">

            {/* Phone/Cinematic Frame Container: Fullscreen on mobile, 50% on desktop */}
            <div className="relative w-full h-[100dvh] sm:h-[680px] lg:h-[640px] xl:h-[700px] rounded-none sm:rounded-[36px] overflow-hidden shadow-2xl bg-[#091524] border-0 sm:border sm:border-slate-800/80">

              {/* Embla Viewport */}
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {displayBanners.map((slide: BannerSlide, index: number) => {
                    const isActive = selectedIndex === index;

                    return (
                      <div
                        key={slide.id || index}
                        className="relative min-w-0 flex-[0_0_100%] h-full flex flex-col justify-between pt-24 sm:pt-8 pb-8 sm:pb-8 p-5 sm:p-8 lg:p-10 select-none"
                      >
                        {/* Background Image with warm architectural dusk lights */}
                        <div className="absolute inset-0 overflow-hidden">
                          <img
                            src={slide.image_url}
                            alt={slide.title}
                            className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'
                              }`}
                          />
                          {/* Dark Ambient Fade Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-[#091524]/60 to-black/35" />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#091524]/70 via-transparent to-[#091524]/40" />
                        </div>

                        {/* TOP HEADER: Glass Badge / Highlight Tag */}
                        <div className="relative z-10 flex items-center justify-between gap-3 w-full pt-1">
                          <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full shadow-lg">
                            <img
                              src="/logo-icon.png"
                              alt="Logo"
                              className="w-4 h-4 object-contain rounded-full border border-white/30"
                            />
                            <span className="text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase">
                              Hải Phát Elevator
                            </span>
                          </div>

                          {slide.highlight_tag && (
                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-blue-500/20 backdrop-blur-md border border-amber-400/30 text-amber-200 px-3 py-1 rounded-full text-[11px] font-semibold shadow-md ml-auto sm:ml-0">
                              <Sparkles size={11} className="text-amber-300" />
                              <span className="truncate max-w-[180px] sm:max-w-none">{slide.highlight_tag}</span>
                            </div>
                          )}
                        </div>

                        {/* BOTTOM CONTENT: Serif Headline, Subtitle & White Pill CTA */}
                        <div className="relative z-10 space-y-3.5 sm:space-y-4 mt-auto pb-4 sm:pb-2">

                          {slide.subtitle && (
                            <div className="inline-flex items-center gap-2 text-blue-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-3 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="truncate max-w-[240px] sm:max-w-none">{slide.subtitle}</span>
                            </div>
                          )}

                          {/* Tiêu đề chính đậm chất sang trọng */}
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
                            {slide.title}
                          </h2>

                          {/* Đoạn mô tả ngắn gọn */}
                          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed line-clamp-3 font-normal drop-shadow">
                            {slide.description}
                          </p>

                          {/* Nút bấm trắng Pill Button nổi bật */}
                          <div className="pt-2">
                            {slide.primary_button_text && (
                              <Link
                                href={slide.primary_button_link || '/san-pham'}
                                className="group w-full flex items-center justify-center gap-2 bg-white text-[#0d1f35] hover:bg-blue-50 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                              >
                                <span>{slide.primary_button_text}</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </Link>
                            )}
                          </div>

                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Indicators & Dots */}
              <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 px-2.5 py-1.5 rounded-full">
                  {displayBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === selectedIndex
                        ? 'w-6 bg-white shadow-sm'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      aria-label={`Chuyển đến slide ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="hidden sm:flex items-center gap-1">
                  <button
                    onClick={scrollPrev}
                    className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all"
                    aria-label="Next"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* PHẦN GIỚI THIỆU & NĂNG LỰC DOANH NGHIỆP */}
        <div className="mt-8 sm:mt-12 px-4 sm:px-0">
          <AboutUs />
        </div>

      </div>
    </section>
  );
}
