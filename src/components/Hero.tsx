"use client";
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useBannersData } from '../hooks/useBannersData';
import Link from 'next/link';
import AboutUs from './AboutUs';

export default function Hero() {
  const { banners, loading } = useBannersData();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
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
      <section id="home" className="pt-20 pb-16 bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#285c9a] h-[380px] sm:h-[450px] lg:h-[500px] flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-white animate-spin opacity-50" />
          </div>
        </div>
      </section>
    );
  }

  // Fallback if no banners
  const displayBanners = banners.length > 0 ? banners : [{
    id: 'fallback-1',
    title: 'Giai Phap Thang May Hien Dai & Uy Tin',
    subtitle: 'Chat luong khang dinh thuong hieu',
    description: 'Chuyen lap dat thang may gia dinh va thang may tai khach cao cap.',
    image_url: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
    primary_button_text: 'Tu van mien phi',
    primary_button_link: '#contact',
    secondary_button_text: 'Xem du an',
    secondary_button_link: '#projects',
  }];

  return (
    <section id="home" className="pt-20 pb-8 bg-gray-50 min-h-screen flex flex-col justify-center">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8 sm:gap-10">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#285c9a]">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {displayBanners.map((slide) => {
                const titleWords = slide.title.split(' ');
                const titlePart1 = titleWords.slice(0, 2).join(' ');
                const titlePart2 = titleWords.slice(2, 4).join(' ');
                const titlePart3 = titleWords.slice(4).join(' ');

                return (
                  <div key={slide.id} className="relative min-w-0 flex-[0_0_100%] h-[380px] sm:h-[450px] lg:h-[500px]">
                    {/* Background Image */}
                    <img
                      src={slide.image_url}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-[#285c9a]/80 sm:bg-transparent sm:bg-gradient-to-r sm:from-[#285c9a] sm:from-30% sm:via-[#285c9a]/80 sm:via-60% sm:to-transparent" />
                    
                    {/* Decorative lines */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute top-0 bottom-0 left-[55%] w-px bg-white/5" />
                      <div className="absolute top-0 bottom-0 left-[70%] w-px bg-white/5" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-center h-full px-5 sm:px-8 md:px-16 max-w-3xl">
                      {/* Badge */}
                      <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 w-fit">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white/90 text-xs font-medium tracking-wide uppercase">
                          {slide.subtitle}
                        </span>
                      </div>

                      {/* H1 */}
                      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-5">
                        {titlePart1}{' '}
                        {titlePart2 && <span className="text-blue-200">{titlePart2}</span>}
                        {titlePart3 && (
                          <>
                            <br />
                            {titlePart3}
                          </>
                        )}
                      </h1>

                      <p className="text-sm sm:text-lg text-white/90 leading-relaxed mb-5 sm:mb-8 max-w-xl">
                        {slide.description}
                      </p>

                      {/* CTA buttons */}
                      <div className="flex flex-wrap gap-3 sm:gap-4">
                        {slide.primary_button_text?.trim() && (
                          <Link
                            href={slide.primary_button_link || '#contact'}
                            className="group flex items-center gap-2 bg-white text-[#285c9a] px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                          >
                            {slide.primary_button_text}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        )}
                        {slide.secondary_button_text?.trim() && (
                          <Link
                            href={slide.secondary_button_link || '#projects'}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5"
                          >
                            {slide.secondary_button_text}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors z-20 hidden md:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors z-20 hidden md:flex"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
            {displayBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
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
