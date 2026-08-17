"use client";
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2, ShieldCheck, Settings, Clock, Headphones } from 'lucide-react';
import { useBannersData, FALLBACK_BANNERS, Banner } from '../hooks/useBannersData';
import Link from 'next/link';
import AboutUs from './AboutUs';

export default function Hero() {
  const { banners, loading } = useBannersData();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]);
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

  if (loading) {
    return (
      <section id="home" className="pt-20 pb-6 bg-gray-50 flex flex-col justify-center min-h-[calc(100vh-72px)]">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#285c9a] h-[340px] sm:h-[400px] lg:h-[460px] flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-white animate-spin opacity-50" />
          </div>
        </div>
      </section>
    );
  }

  // Fallback if no banners
  const displayBanners: Banner[] = banners.length > 0 ? banners : FALLBACK_BANNERS;

  return (
    <section id="home" className="pt-20 pb-2 lg:pb-4 bg-gray-50 flex flex-col justify-center min-h-[calc(100vh-72px)]">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-[#1e4474] shrink-0">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {displayBanners.map((slide: Banner, index: number) => {
                const template = slide.template_type || (index % 5 === 0 ? 'standard' : index % 5 === 1 ? 'centered' : index % 5 === 2 ? 'split' : index % 5 === 3 ? 'accent' : 'features');
                const titleWords = (slide.title || '').split(' ');
                const titlePart1 = titleWords.slice(0, 2).join(' ');
                const titlePart2 = titleWords.slice(2, 5).join(' ');
                const titlePart3 = titleWords.slice(5).join(' ');

                return (
                  <div key={slide.id || index} className="relative min-w-0 flex-[0_0_100%] h-[380px] sm:h-[460px] md:h-[510px] lg:h-[550px] xl:h-[570px]">
                    {/* Background Image */}
                    <img
                      src={slide.image_url}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* TEMPLATE 1: STANDARD (Left-aligned gradient) */}
                    {template === 'standard' && (
                      <>
                        <div className="absolute inset-0 bg-[#285c9a]/85 sm:bg-transparent sm:bg-gradient-to-r sm:from-[#1b3d68] sm:via-[#285c9a]/80 sm:to-transparent" />
                        <div className="relative z-10 flex flex-col justify-center h-full px-5 sm:px-8 md:px-14 max-w-3xl">
                          {slide.subtitle && (
                            <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 mb-3 w-fit">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">
                                {slide.subtitle}
                              </span>
                            </div>
                          )}
                          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 sm:mb-3">
                            {titlePart1}{' '}
                            {titlePart2 && <span className="text-blue-200">{titlePart2}</span>}
                            {titlePart3 && (
                              <>
                                <br />
                                {titlePart3}
                              </>
                            )}
                          </h1>
                          <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed mb-4 max-w-xl">
                            {slide.description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {slide.primary_button_text?.trim() && (
                              <Link
                                href={slide.primary_button_link || '#contact'}
                                className="group flex items-center gap-2 bg-white text-[#285c9a] px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                              >
                                {slide.primary_button_text}
                                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                              </Link>
                            )}
                            {slide.secondary_button_text?.trim() && (
                              <Link
                                href={slide.secondary_button_link || '#projects'}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5"
                              >
                                {slide.secondary_button_text}
                              </Link>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* TEMPLATE 2: CENTERED LUXURY */}
                    {template === 'centered' && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-900/40" />
                        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-5 sm:px-10 max-w-4xl mx-auto">
                          {slide.subtitle && (
                            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/40 rounded-full px-4 py-1 mb-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              <span className="text-amber-200 text-xs font-bold tracking-wider uppercase">
                                {slide.subtitle}
                              </span>
                            </div>
                          )}
                          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-md">
                            {slide.title}
                          </h1>
                          <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed mb-5 max-w-2xl">
                            {slide.description}
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-3">
                            {slide.primary_button_text?.trim() && (
                              <Link
                                href={slide.primary_button_link || '#contact'}
                                className="group flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5"
                              >
                                {slide.primary_button_text}
                                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                              </Link>
                            )}
                            {slide.secondary_button_text?.trim() && (
                              <Link
                                href={slide.secondary_button_link || '#products'}
                                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5"
                              >
                                {slide.secondary_button_text}
                              </Link>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* TEMPLATE 3: SPLIT LAYOUT WITH FEATURE BULLETS & SHOWCASE CARD */}
                    {template === 'split' && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30" />
                        <div className="relative z-10 grid lg:grid-cols-12 items-center h-full px-5 sm:px-8 md:px-14 max-w-7xl mx-auto gap-6">
                          <div className="lg:col-span-7 flex flex-col justify-center">
                            {slide.subtitle && (
                              <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
                                {slide.subtitle}
                              </span>
                            )}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 leading-snug">
                              {slide.title}
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-300 mb-4 line-clamp-2">
                              {slide.description}
                            </p>

                            {/* Feature list bullets */}
                            {slide.features && slide.features.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                                {slide.features.map((feat, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                                    <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex flex-wrap gap-3">
                              {slide.primary_button_text?.trim() && (
                                <Link
                                  href={slide.primary_button_link || '#products'}
                                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md hover:-translate-y-0.5"
                                >
                                  {slide.primary_button_text}
                                  <ArrowRight size={15} />
                                </Link>
                              )}
                              {slide.secondary_button_text?.trim() && (
                                <Link
                                  href={slide.secondary_button_link || '#contact'}
                                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all"
                                >
                                  {slide.secondary_button_text}
                                </Link>
                              )}
                            </div>
                          </div>

                          {/* Right floating card */}
                          <div className="hidden lg:flex lg:col-span-5 justify-end">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl max-w-sm text-white space-y-3">
                              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-lg">
                                360°
                              </div>
                              <h3 className="font-bold text-lg text-white">Kiến Trúc Kính Hiện Đại</h3>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                Đột phá phong cách thiết kế với khung kính chịu lực sang trọng, tối đa góc nhìn toàn cảnh.
                              </p>
                              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-300">
                                <span>{slide.highlight_tag || 'Công nghệ Châu Âu'}</span>
                                <span>★ 4.9/5</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* TEMPLATE 4: ACCENT / HIGH-TECH */}
                    {template === 'accent' && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-900/90 to-transparent" />
                        <div className="relative z-10 flex flex-col justify-center h-full px-5 sm:px-8 md:px-14 max-w-3xl">
                          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-lg px-3 py-1 mb-3 text-xs font-bold w-fit">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                            {slide.subtitle || 'Dịch vụ khẩn cấp 24/7'}
                          </div>
                          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                            {slide.title}
                          </h1>
                          <p className="text-xs sm:text-sm text-slate-300 mb-5 max-w-xl">
                            {slide.description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {slide.primary_button_text?.trim() && (
                              <Link
                                href={slide.primary_button_link || '#contact'}
                                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-rose-600/30 hover:-translate-y-0.5"
                              >
                                {slide.primary_button_text}
                                <ArrowRight size={15} />
                              </Link>
                            )}
                            {slide.secondary_button_text?.trim() && (
                              <Link
                                href={slide.secondary_button_link || '#services'}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all"
                              >
                                {slide.secondary_button_text}
                              </Link>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* TEMPLATE 5: FEATURES */}
                    {template === 'features' && (
                      <>
                        <div className="absolute inset-0 bg-[#285c9a]/90 sm:bg-gradient-to-r sm:from-[#1b3d68] sm:via-[#285c9a]/80 sm:to-transparent" />
                        <div className="relative z-10 flex flex-col justify-center h-full px-5 sm:px-8 md:px-14 w-full pb-10 sm:pb-16 lg:pb-0">
                          <div className="mb-4 sm:mb-10 max-w-xl mt-4 sm:mt-0">
                            {slide.subtitle && (
                              <span className="inline-block text-amber-400 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-1.5 sm:mb-2">
                                {slide.subtitle}
                              </span>
                            )}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-snug">
                              {slide.title || 'Cam Kết Chất Lượng'}
                            </h1>
                            <p className="hidden sm:block text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                              {slide.description || 'Chúng tôi mang đến những giá trị tốt nhất cho khách hàng.'}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 w-full">
                            {/* Feature 1 */}
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-5 border border-white/20 hover:bg-white/15 transition-colors flex items-center gap-3 sm:block">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center sm:mb-3 shrink-0">
                                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-[11px] sm:text-sm line-clamp-2 sm:line-clamp-1">An toàn tuyệt đối</h4>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-5 border border-white/20 hover:bg-white/15 transition-colors flex items-center gap-3 sm:block">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center sm:mb-3 shrink-0">
                                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-[11px] sm:text-sm line-clamp-2 sm:line-clamp-1">Lắp đặt chuyên nghiệp</h4>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-5 border border-white/20 hover:bg-white/15 transition-colors flex items-center gap-3 sm:block">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center sm:mb-3 shrink-0">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-[11px] sm:text-sm line-clamp-2 sm:line-clamp-1">Bảo hành 18 tháng</h4>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-5 border border-white/20 hover:bg-white/15 transition-colors flex items-center gap-3 sm:block">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center sm:mb-3 shrink-0">
                                <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-[11px] sm:text-sm line-clamp-2 sm:line-clamp-1">Hỗ trợ 24/7</h4>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md transition-colors z-20 hidden md:flex border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md transition-colors z-20 hidden md:flex border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {displayBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-white w-7' : 'bg-white/40 hover:bg-white/70 w-2.5'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* About Us */}
        <AboutUs />
      </div>
    </section>
  );
}
