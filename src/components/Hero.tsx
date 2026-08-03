"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Award, Wrench, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, DbBanner } from '../lib/supabase';
import { getYouTubeEmbedUrl, isDirectVideo } from '../lib/video';

const stats = [
  { icon: Award, value: '15+', label: 'Năm kinh nghiệm' },
  { icon: ShieldCheck, value: '500+', label: 'Công trình hoàn thành' },
  { icon: Wrench, value: '24/7', label: 'Hỗ trợ kỹ thuật' },
];

export default function Hero() {
  const [banners, setBanners] = useState<DbBanner[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const fetchBanners = async () => {
    let { data } = await supabase
      .from('banners')
      .select('*')
      .eq('position', 'hero')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    // Nếu không có banner nào đặt vị trí 'hero', tự động lấy các banner được kích hoạt (is_active = true)
    if (!data || data.length === 0) {
      const fallbackRes = await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      data = fallbackRes.data;
    }

    if (data && data.length > 0) setBanners(data);
  };

  const goTo = (idx: number) => setCurrentIdx(idx);

  const currentBanner = banners[currentIdx];

  const defaultHero = {
    title: 'Giải Pháp Thang Máy Hiện Đại & Uy Tín',
    subtitle: 'Chất lượng khẳng định thương hiệu',
    description: 'Chuyên lắp đặt thang máy gia đình và thang máy tải khách cao cấp. Chúng tôi mang đến sự an toàn, sang trọng và đẳng cấp cho không gian sống của bạn.',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
  };

  const heroTitle = currentBanner?.title || defaultHero.title;
  const heroSubtitle = currentBanner?.subtitle || defaultHero.subtitle;
  const heroDescription = currentBanner?.description || defaultHero.description;

  // Split title for colored styling
  const titleWords = heroTitle.split(' ');
  const titlePart1 = titleWords.slice(0, 2).join(' ');
  const titlePart2 = titleWords.slice(2, 4).join(' ');
  const titlePart3 = titleWords.slice(4).join(' ');

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {currentBanner?.media_type === 'video' && currentBanner.video_url
          ? getYouTubeEmbedUrl(currentBanner.video_url)
            ? (
              <iframe
                key={currentBanner.id}
                src={getYouTubeEmbedUrl(currentBanner.video_url)!}
                className="w-full h-full object-cover pointer-events-none"
                allow="autoplay; encrypted-media"
                title={currentBanner.title}
              />
            )
            : isDirectVideo(currentBanner.video_url)
              ? (
                <video
                  key={currentBanner.id}
                  src={currentBanner.video_url}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )
              : currentBanner.image_url
                ? (
                  <img
                    src={currentBanner.image_url}
                    alt={currentBanner.title}
                    className="w-full h-full object-cover"
                  />
                )
                : (
                  <img
                    src={defaultHero.image}
                    alt="Thang máy gia đình sang trọng"
                    className="w-full h-full object-cover"
                  />
                )
        : currentBanner?.image_url ? (
          <img
            src={currentBanner.image_url}
            alt={currentBanner.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={defaultHero.image}
            alt="Thang máy gia đình sang trọng"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f35]/90 via-[#285c9a]/70 to-[#285c9a]/20" />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[55%] w-px bg-white/5" />
        <div className="absolute top-0 bottom-0 left-[70%] w-px bg-white/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 text-xs font-medium tracking-wide uppercase">
              {heroSubtitle}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            {titlePart1}{' '}
            {titlePart2 && <span className="text-blue-300">{titlePart2}</span>}
            {titlePart3 && (
              <>
                <br />
                {titlePart3}
              </>
            )}
          </h1>

          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
            {heroDescription}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#285c9a]/40 hover:shadow-[#285c9a]/60 hover:-translate-y-0.5"
            >
              Tư vấn miễn phí
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#projects"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Xem dự án
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-1.5">
                <Icon size={20} className="text-blue-300" />
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-white/60 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner navigation dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIdx ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Arrow controls */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIdx((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIdx((prev) => (prev + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
        <span className="text-white/40 text-xs">Cuộn xuống</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
