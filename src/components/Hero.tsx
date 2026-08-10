"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../lib/api';
import { DbBanner } from '../lib/types';
import { getYouTubeEmbedUrl, isDirectVideo } from '../lib/video';

const stats = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '1000+', label: 'Dự án thành công' },
  { value: '4000+', label: 'Thang máy lắp đặt' },
  { value: '95%', label: 'Khách hàng hài lòng' },
];

const defaultHero = {
  title: 'Giải Pháp Thang Máy Hiện Đại & Uy Tín',
  subtitle: 'Chất lượng khẳng định thương hiệu',
  image: '/image copy.png',
};

export default function Hero() {
  const [banners, setBanners] = useState<DbBanner[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get('/banners');
        const activeBanners = (response.data || [])
          .filter((banner: DbBanner) => banner.is_active && banner.position === 'hero')
          .sort((a: DbBanner, b: DbBanner) => (a.sort_order || 0) - (b.sort_order || 0));
        setBanners(activeBanners);
      } catch (error) {
        console.error('Lỗi khi tải banner:', error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => setCurrentIdx((prev) => (prev + 1) % banners.length), 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const currentBanner = banners[currentIdx];
  const title = currentBanner?.title || defaultHero.title;
  const subtitle = currentBanner?.subtitle || defaultHero.subtitle;
  const image = currentBanner?.image_url || defaultHero.image;
  const titleWords = title.split(' ');
  const titleLineOne = titleWords.slice(0, 4).join(' ');
  const titleLineTwo = titleWords.slice(4).join(' ');

  const background = currentBanner?.media_type === 'video' && currentBanner.video_url
    ? getYouTubeEmbedUrl(currentBanner.video_url)
      ? <iframe src={getYouTubeEmbedUrl(currentBanner.video_url)!} className="h-full w-full pointer-events-none" allow="autoplay; encrypted-media" title={title} />
      : isDirectVideo(currentBanner.video_url)
        ? <video src={currentBanner.video_url} className="h-full w-full object-cover" autoPlay muted loop playsInline />
        : <img src={image} alt={title} className="h-full w-full object-cover" />
    : <img src={image} alt={title} className="h-full w-full object-cover" />;

  return (
    <div id="home">
      <div className="relative h-[540px] overflow-hidden bg-[#173f70] sm:h-[580px] lg:h-[600px]">
        <div className="absolute inset-0">{background}</div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3765]/95 via-[#174b83]/75 to-[#174b83]/10" />
        <div className="absolute inset-y-0 left-[40%] hidden w-px bg-white/10 lg:block" />
        <div className="absolute inset-y-0 left-[65%] hidden w-px bg-white/10 lg:block" />

        <div className="relative z-10 flex h-full items-center px-7 pb-12 pt-12 sm:px-12 lg:px-16">
          <div className="max-w-[560px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-white">{subtitle}</span>
            </div>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[54px]">
              {titleLineOne}
              {titleLineTwo && <><br /><span className="text-[#a9d0ff]">{titleLineTwo}</span></>}
            </h1>
            <p className="mt-5 max-w-[500px] text-sm leading-6 text-white/85 sm:text-base">
              Chuyên lắp đặt thang máy gia đình và thang máy tải khách cao cấp. Chúng tôi mang đến sự an toàn, sang trọng và đẳng cấp cho không gian sống của bạn.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#285c9a] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-50">
                Tư vấn miễn phí <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#projects" className="inline-flex items-center rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20">
                Xem dự án
              </a>
            </div>
          </div>
        </div>

        {banners.length > 1 && (
          <>
            <button aria-label="Banner trước" onClick={() => setCurrentIdx((prev) => (prev - 1 + banners.length) % banners.length)} className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40 sm:left-4">
              <ChevronLeft size={18} />
            </button>
            <button aria-label="Banner tiếp theo" onClick={() => setCurrentIdx((prev) => (prev + 1) % banners.length)} className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40 sm:right-4">
              <ChevronRight size={18} />
            </button>
          </>
        )}

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {(banners.length > 1 ? banners : [defaultHero]).map((_, index) => (
            <button key={index} aria-label={`Chuyển tới banner ${index + 1}`} onClick={() => setCurrentIdx(index)} className={`h-1.5 rounded-full transition-all ${index === currentIdx ? 'w-7 bg-white' : 'w-1.5 bg-white/45'}`} />
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-12 grid max-w-[920px] grid-cols-2 divide-x divide-gray-100 rounded-[20px] bg-white px-3 py-5 shadow-[0_12px_35px_rgba(30,74,128,0.14)] sm:grid-cols-4 sm:px-6 lg:-mt-14">
        {stats.map((stat) => (
          <div key={stat.label} className="px-3 text-center sm:px-5">
            <div className="text-2xl font-bold text-[#285c9a] sm:text-3xl">{stat.value}</div>
            <div className="mt-1 text-[11px] font-medium text-gray-500 sm:text-xs">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
