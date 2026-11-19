"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import SectionHeader from './shared/SectionHeader';
import { useQuickQuote } from '../context/QuickQuoteContext';
import { useProductsData } from '../hooks/useProductsData';
import { Product } from '../data/products';

export interface FeaturedElevatorItem {
  id: string;
  title: string;
  price: string;
  priceColor: string;
  desc: string;
  tags: string[];
  img: string;
  badge: string;
  caption: string;
  quoteType?: 'thangxay' | 'khungthep';
}

const COLOR_PALETTE = [
  'text-blue-700',
  'text-amber-800',
  'text-emerald-800',
  'text-slate-800',
  'text-indigo-800',
  'text-rose-800',
];

export const FEATURED_ELEVATORS: FeaturedElevatorItem[] = [
  {
    id: '5a0c4a0a-aa1f-4ad6-a564-eec5e2a4121e',
    title: 'Thang máy hố xây gia đình',
    price: 'Từ 290 Triệu',
    priceColor: 'text-blue-700',
    desc: 'Hải Phát lắp thang máy hố xây tải 350–650 kg, cabin gia công theo kích thước hố thật của từng nhà.',
    tags: ['Nhà phố - Biệt thự', '350 - 650kg', 'Hố từ 1300×1300 mm'],
    img: 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435936672-mrkll2obexe.png',
    badge: 'DÒNG CHỦ LỰC',
    caption: 'Thang Máy Hố Xây Tiêu Chuẩn · Nhà Phố Starlake',
    quoteType: 'thangxay',
  },
  {
    id: 'f4920e71-6a1e-4ca7-a50d-6efd7a5dadda',
    title: 'Thang máy khung thép vách kính',
    price: 'Từ 380 Triệu',
    priceColor: 'text-amber-800',
    desc: 'Thang máy kính hố thép định hình, cabin 4 mặt kính cường lực đón trọn ánh sáng tự nhiên qua giếng trời.',
    tags: ['Kính an toàn 2 lớp', 'Trong nhà & giếng trời', 'Lắp đặt 5–7 ngày'],
    img: 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423677456-x93ehnbq5h.png',
    badge: 'ĐẲNG CẤP BIỆT THỰ',
    caption: 'Thang Khung Thép Vách Kính Panorama · Biệt Thự Ecopark',
    quoteType: 'khungthep',
  },
  {
    id: '0857710f-a18b-474c-a736-9ff60cf39642',
    title: 'Thang máy không hố pit (thang máy mini)',
    price: 'Từ 320 Triệu',
    priceColor: 'text-emerald-800',
    desc: 'Thang máy không hố pit – còn gọi là thang máy nhỏ gọn – là dòng thang cứu cánh cho nhà cải tạo đang ở.',
    tags: ['Hố pit chỉ từ 200 mm', 'Nhà đã hoàn thiện', 'Điện 1 pha 220V'],
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    badge: 'PIT NÔNG 200MM',
    caption: 'Homelift Mini Lắp Lòng Thang Bộ · Nhà Cải Tạo Ba Đình',
    quoteType: 'khungthep',
  },
  {
    id: '9534651f-b83f-49c0-8cb2-6efea1f0017e',
    title: 'Thang máy tải khách & tải hàng công nghiệp',
    price: 'Từ 320 Triệu',
    priceColor: 'text-slate-800',
    desc: 'Giải pháp di chuyển chuyên nghiệp, tải trọng lớn cho nhà xưởng, showroom, văn phòng và khách sạn.',
    tags: ['Tải 500 - 3.000kg', 'Lưu thông lớn', 'Tiêu chuẩn quốc tế'],
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    badge: 'TẢI NẶNG CÔNG NGHIỆP',
    caption: 'Thang Máy Tải Khách & Hàng Hóa · KCN Quang Minh',
    quoteType: 'thangxay',
  },
];

export function mapProductToFeaturedElevator(product: Product, index: number): FeaturedElevatorItem {
  const titleLower = (product.title || '').toLowerCase();

  // 1. Badge determination
  let badge = 'TIÊU CHUẨN';
  if (titleLower.includes('hố xây') || titleLower.includes('thang máy xây')) {
    badge = 'DÒNG CHỦ LỰC';
  } else if (titleLower.includes('khung thép') || titleLower.includes('vách kính')) {
    badge = 'ĐẲNG CẤP BIỆT THỰ';
  } else if (titleLower.includes('không hố pit') || titleLower.includes('homelift') || titleLower.includes('mini')) {
    badge = 'PIT NÔNG 200MM';
  } else if (titleLower.includes('công nghiệp') || titleLower.includes('tải hàng') || titleLower.includes('tòa nhà')) {
    badge = 'TẢI NẶNG CÔNG NGHIỆP';
  } else if (titleLower.includes('panorama') || titleLower.includes('quan sát')) {
    badge = 'PANORAMA 360°';
  } else if (product.subtitle) {
    badge = product.subtitle.slice(0, 18).toUpperCase();
  }

  // 2. Quote Type
  const quoteType: 'thangxay' | 'khungthep' =
    titleLower.includes('kính') ||
    titleLower.includes('khung thép') ||
    titleLower.includes('homelift') ||
    titleLower.includes('mini') ||
    titleLower.includes('quan sát')
      ? 'khungthep'
      : 'thangxay';

  // 3. Price extraction
  let price = '';
  // Check FAQs first
  if (product.faqs && product.faqs.length > 0) {
    for (const faq of product.faqs) {
      const match = (faq.answer || '').match(
        /(?:giá|khoảng|từ)\s*(?:khởi điểm\s*)?(?:trọn gói\s*)?(?:từ\s*)?(\d+[\d\.,]*\s*(?:triệu|tỷ))/i
      );
      if (match) {
        price = `Từ ${match[1].replace(/triệu/i, 'Triệu').trim()}`;
        break;
      }
    }
  }
  // Check descriptions if not in FAQs
  if (!price) {
    const textToSearch = `${product.shortDescription || ''} ${product.fullDescription || ''}`;
    const match = textToSearch.match(
      /(?:giá|khoảng|từ)\s*(?:khởi điểm\s*)?(?:trọn gói\s*)?(?:từ\s*)?(\d+[\d\.,]*\s*(?:triệu|tỷ))/i
    );
    if (match) {
      price = `Từ ${match[1].replace(/triệu/i, 'Triệu').trim()}`;
    }
  }
  // Fallbacks if no price found
  if (!price) {
    if (titleLower.includes('khung thép') || titleLower.includes('vách kính')) {
      price = 'Từ 380 Triệu';
    } else if (titleLower.includes('không hố pit') || titleLower.includes('homelift') || titleLower.includes('mini')) {
      price = 'Từ 320 Triệu';
    } else if (titleLower.includes('công nghiệp') || titleLower.includes('tòa nhà')) {
      price = 'Từ 320 Triệu';
    } else if (titleLower.includes('panorama') || titleLower.includes('quan sát')) {
      price = 'Từ 360 Triệu';
    } else {
      price = 'Từ 290 Triệu';
    }
  }

  // 4. Tags extraction
  let tags: string[] = [];
  if (product.specifications && product.specifications.length > 0) {
    tags = product.specifications
      .filter((s) => {
        if (!s.value) return false;
        const l = s.label.toLowerCase();
        return !l.includes('bảo hành') && !l.includes('bảo trì') && !l.includes('công suất');
      })
      .slice(0, 3)
      .map((s) => (s.value.length > 25 ? s.value.slice(0, 22) + '...' : s.value));
  }
  if (tags.length < 2 && product.features && product.features.length > 0) {
    const featureTags = product.features
      .filter((f) => f.length <= 25)
      .slice(0, 3 - tags.length);
    tags = [...tags, ...featureTags];
  }
  if (tags.length === 0) {
    if (titleLower.includes('khung thép') || titleLower.includes('kính')) {
      tags = ['Kính an toàn 2 lớp', 'Trong nhà & giếng trời', 'Lắp đặt 5–7 ngày'];
    } else if (titleLower.includes('hố xây')) {
      tags = ['Nhà phố - Biệt thự', '350 - 650kg', 'Hố từ 1300×1300 mm'];
    } else if (titleLower.includes('homelift') || titleLower.includes('mini')) {
      tags = ['Hố pit chỉ từ 200 mm', 'Nhà đã hoàn thiện', 'Điện 1 pha 220V'];
    } else {
      tags = ['Tiêu chuẩn quốc tế', 'Vận hành êm ái', 'Bảo hành 18 tháng'];
    }
  }

  // 5. Image & Caption
  const img =
    product.image ||
    (product.gallery && product.gallery.length > 0 ? product.gallery[0] : '') ||
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80';

  const caption = `${product.title} · ${product.subtitle || 'Thang Máy Hải Phát'}`;

  return {
    id: product.id,
    title: product.title,
    price,
    priceColor: COLOR_PALETTE[index % COLOR_PALETTE.length],
    desc: product.shortDescription || product.subtitle || '',
    tags,
    img,
    badge,
    caption,
    quoteType,
  };
}

export default function FeaturedElevators() {
  const { openQuoteModal } = useQuickQuote();
  const { products } = useProductsData();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Map products from database API
  const items: FeaturedElevatorItem[] = useMemo(() => {
    if (!products || products.length === 0) {
      return FEATURED_ELEVATORS;
    }
    return products.map((prod, idx) => mapProductToFeaturedElevator(prod, idx));
  }, [products]);

  // Ensure selectedIndex is always valid
  const safeIndex = selectedIndex < items.length ? selectedIndex : 0;
  const activeItem = items[safeIndex] || items[0] || FEATURED_ELEVATORS[0];

  // Preload images into browser cache
  useEffect(() => {
    items.forEach((item) => {
      if (typeof window !== 'undefined' && item.img) {
        const img = new window.Image();
        img.src = item.img;
      }
    });
  }, [items]);

  const handleSelect = (idx: number) => {
    if (idx === selectedIndex) return;
    setSelectedIndex(idx);
    setIsFading(true);

    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
    }

    fadeTimeoutRef.current = setTimeout(() => {
      setIsFading(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  return (
    <section data-reveal="true" className="w-full max-w-5xl xl:max-w-6xl mx-auto py-2 sm:py-4 px-2 sm:px-4 lg:px-8 flex flex-col justify-center transition-all duration-300">
      {/* Section Heading with Badge & Subtitle */}
      <SectionHeader
        badge="Biết trước khoảng giá, không phải đoán"
        title="Sản phẩm thang máy nổi bật"
        subtitle="Những dòng thang máy gia đình được Hải Phát may đo và triển khai nhiều nhất cho nhà phố, biệt thự và công trình cải tạo – tối ưu an toàn, thẩm mỹ và trải nghiệm sử dụng lâu dài."
        className="mb-6 sm:mb-8"
      />

      {/* =========================================================================
          DESKTOP & TABLET LAYOUT (>= md): LAYOUT CŨ (SPLIT 2 COLUMNS, 1 MÀN HÌNH)
          ========================================================================= */}
      <div className="hidden md:flex flex-row items-center justify-center gap-6 lg:gap-10 w-full">
        {/* PHOTO CONTAINER: ALWAYS LOCKED TO 3:4 ASPECT RATIO */}
        {/* Tablet: w-[285px] h-[380px] (3:4) | Desktop: w-[360px] h-[480px] (3:4) */}
        <Link
          href={`/san-pham/${activeItem.id}`}
          className="w-[285px] h-[380px] lg:w-[360px] lg:h-[480px] shrink-0 relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 border border-slate-100 group block cursor-pointer"
          title={`Xem chi tiết ${activeItem.title}`}
        >
          <img
            src={activeItem.img}
            alt={activeItem.caption}
            className={`w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105 ${
              isFading ? 'opacity-30' : 'opacity-100'
            }`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none group-hover:from-black/90 transition-colors" />

          {/* Tag & Caption overlay */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-block bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded uppercase tracking-wider shadow-sm transition-all">
                {activeItem.badge}
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-bold text-amber-300 flex items-center gap-1">
                Xem chi tiết <ArrowRight size={12} />
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold mt-1.5 drop-shadow-md leading-snug group-hover:text-amber-100 transition-colors">
              {activeItem.caption}
            </div>
          </div>
        </Link>

        {/* LIST CONTAINER: Height matches Photo on Tablet & Desktop */}
        <div className="w-full flex-1 md:h-[380px] lg:h-[480px] flex flex-col justify-between py-0.5">
          {items.map((item, idx) => {
            const isActive = safeIndex === idx;

            return (
              <div key={item.id}>
                <Link
                  href={`/san-pham/${item.id}`}
                  onMouseEnter={() => handleSelect(idx)}
                  className={`block border-l-[3.5px] pl-3.5 sm:pl-4 ${items.length > 4 ? 'py-1 sm:py-1.5' : 'py-2 sm:py-2.5'} rounded-r-xl transition-all duration-200 cursor-pointer select-none group/item ${
                    isActive
                      ? 'border-l-[#B45309] bg-slate-50/95 opacity-100 shadow-sm'
                      : 'border-l-transparent opacity-65 hover:opacity-100 hover:border-l-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#002349] group-hover/item:text-[#1E5AA8] transition-colors leading-snug flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <ArrowRight size={13} className="opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-[#1E5AA8] shrink-0" />
                    </h3>
                    <span className={`${item.priceColor} text-[11px] sm:text-xs font-bold shrink-0 ml-2 font-mono`}>
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[11.5px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-slate-100 text-slate-600 text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>

                {/* Divider between items (visible on md+) */}
                {idx < items.length - 1 && (
                  <div className="border-b border-slate-100 ml-4 hidden md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MOBILE LAYOUT (< md): LAYOUT HIỆN TẠI (Ô HÀNG DỌC, ẢNH TRÁI, NỘI DUNG PHẢI + SHADOW)
          ========================================================================= */}
      <div className="md:hidden w-full space-y-3.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/san-pham/${item.id}`}
            className="w-full bg-white rounded-2xl p-3 flex flex-row items-stretch gap-3 shadow-[0_6px_20px_rgba(13,31,53,0.08)] border border-slate-100/90 group block active:scale-[0.99] transition-all"
          >
            {/* LEFT: IMAGE */}
            <div className="w-[110px] shrink-0 relative rounded-xl overflow-hidden bg-slate-900 aspect-[3/4]">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                <span className="inline-block bg-amber-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                  {item.badge}
                </span>
              </div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <div className="flex flex-col justify-between gap-0.5">
                  <h3 className="text-xs font-extrabold text-[#002349] group-hover:text-[#1E5AA8] transition-colors leading-snug flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowRight size={12} className="text-slate-400 group-hover:text-[#1E5AA8] transition-colors shrink-0" />
                  </h3>
                  <span className={`${item.priceColor} text-[11px] font-bold font-mono`}>
                    {item.price}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-slate-100 text-slate-600 text-[9px] font-medium px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openQuoteModal(item.quoteType ? { initialType: item.quoteType } : undefined);
                  }}
                  className="text-[10px] font-bold text-[#1E5AA8] hover:underline inline-flex items-center gap-1 cursor-pointer bg-blue-50/80 px-2 py-1 rounded active:bg-blue-100"
                >
                  <span>Tính giá</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Footer Bar */}
      <div className="mt-6 pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <span>⚡ Khảo sát hố thang &amp; lên bản vẽ 3D miễn phí:</span>
          <a
            href="tel:0898424666"
            className="text-slate-800 hover:text-[#1E5AA8] font-mono font-bold transition-colors inline-flex items-center gap-1"
          >
            <Phone size={11} className="text-[#1E5AA8]" />
            <span>0898.424.666</span>
          </a>
        </div>
        <Link
          href={`/san-pham/${activeItem.id}`}
          className="font-bold text-[#1E5AA8] hover:text-[#174C91] hover:underline inline-flex items-center gap-1 transition-colors"
        >
          <span>Xem chi tiết thông số {activeItem.title}</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}
