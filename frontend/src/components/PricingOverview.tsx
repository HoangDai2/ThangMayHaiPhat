"use client";

import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { useQuickQuote } from '../context/QuickQuoteContext';
import { useProductsData } from '../hooks/useProductsData';

export default function PricingOverview() {
  const { openQuoteModal } = useQuickQuote();
  const { products } = useProductsData();

  // Match the 2 flagship products
  const thangXay = products.find((p) => !p.title.toLowerCase().includes('kính')) || products[0];
  const thangKinh = products.find((p) => p.title.toLowerCase().includes('kính')) || products[1];

  const scrollToQuote = (type?: 'thangxay' | 'khungthep') => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        const el = document.getElementById('quick-quote-card');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
      }
      openQuoteModal(type ? { initialType: type } : undefined);
    }
  };

  const scrollToContact = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      openQuoteModal();
    }
  };

  return (
    <div className="w-full py-6 sm:py-8 lg:py-10">
      <div className="w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs sm:text-sm font-bold text-amber-600 uppercase tracking-wider font-mono">
            Bảng giá tham khảo 2026
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0d1f35] tracking-tight leading-tight">
            Biết trước khoảng giá, không phải đoán
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Báo giá trọn gói 2 dòng thang máy chủ lực của Hải Phát: bao gồm thiết bị đồng bộ, gia công lắp đặt và kiểm định an toàn lần đầu.
          </p>
        </div>

        {/* 2 Flagship Products Pricing Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mt-10 sm:mt-12 lg:mt-14">
          {/* Card 1: Thang Máy Hố Xây (Highlighted) */}
          <div className="bg-white rounded-3xl border-2 border-[#1E5AA8] shadow-[0_14px_40px_rgba(30,90,168,0.09)] p-6 sm:p-7 flex flex-col justify-between relative transition-all hover:shadow-[0_20px_50px_rgba(30,90,168,0.14)] group">
            <div>
              {/* Product Visual Header */}
              {thangXay?.image && (
                <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-900 mb-5 border border-slate-100">
                  <img
                    src={thangXay.image}
                    alt={thangXay.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#1E5AA8] text-white shadow-md">
                      Phổ biến nhất
                    </span>
                    <span className="font-mono text-[11px] bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-md border border-white/20 font-medium">
                      Hố bê tông · May đo
                    </span>
                  </div>

                  {/* Bottom title in image */}
                  <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                    <span className="text-blue-200 text-xs font-mono block">Giải pháp tối ưu chi phí</span>
                    <span className="text-white font-bold text-lg sm:text-xl drop-shadow-sm">
                      {thangXay.title}
                    </span>
                  </div>
                </div>
              )}

              {/* Title & Desc if image is not present or supplementary */}
              {!thangXay?.image && (
                <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#1E5AA8] text-white shadow-xs w-fit mb-3">
                  Phổ biến nhất
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-500 min-h-[38px] leading-relaxed">
                Tối ưu cho nhà phố, nhà ống xây mới, biệt thự và công trình nhiều tầng. Tận dụng kết cấu bê tông giúp tối đa diện tích cabin.
              </p>

              {/* Dotted Price Box */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/50 border border-dashed border-amber-300 text-left">
                <div className="text-xs text-slate-500 font-medium">Giá từ</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] font-mono tracking-tight mt-0.5">
                  290 triệu
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">
                  nhà 3 tầng, cabin inox tiêu chuẩn (từ 275tr / 2 tầng)
                </div>
              </div>

              {/* Spec Rows */}
              <div className="divide-y divide-slate-100 my-5 text-xs sm:text-sm space-y-2">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Tải trọng</span>
                  <span className="font-bold text-slate-800">350 – 650 kg (4–9 người)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Hố PIT</span>
                  <span className="font-bold text-slate-800">từ 600 mm (tiêu chuẩn)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Kết cấu giếng</span>
                  <span className="font-bold text-slate-800">Cột bê tông, tường gạch</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Chiều cao OH</span>
                  <span className="font-bold text-slate-800">≥ 3.800 mm</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Bảo hành</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    18 tháng toàn bộ
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 mt-2">
              <button
                type="button"
                onClick={() => scrollToQuote('thangxay')}
                className="w-full py-3.5 rounded-xl bg-[#1E5AA8] hover:bg-[#174C91] text-white font-bold text-sm sm:text-base text-center transition-all shadow-md shadow-[#1E5AA8]/20 hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                Tính giá cho nhà tôi
              </button>

              {thangXay?.id && (
                <Link
                  href={`/san-pham/${thangXay.id}`}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-[#1E5AA8] bg-slate-50/60 hover:bg-blue-50/50 text-[#0d1f35] hover:text-[#1E5AA8] font-semibold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Xem thông số chi tiết dòng hố xây</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>

          {/* Card 2: Thang Máy Khung Thép Vách Kính */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_30px_rgba(15,42,74,0.04)] p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all group">
            <div>
              {/* Product Visual Header */}
              {thangKinh?.image && (
                <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-900 mb-5 border border-slate-100">
                  <img
                    src={thangKinh.image}
                    alt={thangKinh.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                      Biệt thự & Cải tạo
                    </span>
                    <span className="font-mono text-[11px] bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-md border border-white/20 font-medium">
                      Vách kính Panorama 360°
                    </span>
                  </div>

                  {/* Bottom title in image */}
                  <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                    <span className="text-emerald-200 text-xs font-mono block">Giải pháp kiến trúc cao cấp</span>
                    <span className="text-white font-bold text-lg sm:text-xl drop-shadow-sm">
                      {thangKinh.title}
                    </span>
                  </div>
                </div>
              )}

              {/* Title & Desc if image is not present or supplementary */}
              {!thangKinh?.image && (
                <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1E5AA8] border border-blue-200/80 w-fit mb-3">
                  Biệt thự & Cải tạo
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-500 min-h-[38px] leading-relaxed">
                Biệt thự, giếng trời, nhà cải tạo. Hố PIT siêu nông không đục móng bè, đón sáng tự nhiên, thi công siêu tốc 5–7 ngày.
              </p>

              {/* Dotted Price Box */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/50 border border-dashed border-amber-300 text-left">
                <div className="text-xs text-slate-500 font-medium">Giá từ</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] font-mono tracking-tight mt-0.5">
                  380 triệu
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">
                  nhà 2 tầng, trọn gói khung thép định hình vách kính
                </div>
              </div>

              {/* Spec Rows */}
              <div className="divide-y divide-slate-100 my-5 text-xs sm:text-sm space-y-2">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Tải trọng</span>
                  <span className="font-bold text-slate-800">350 – 650 kg (3–6 người)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Hố PIT</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    Siêu nông từ 600 mm
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Khung giếng</span>
                  <span className="font-bold text-slate-800">Thép định hình sơn tĩnh điện / PVD</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Vách giếng</span>
                  <span className="font-bold text-slate-800">Kính cường lực an toàn 2 lớp</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Bảo hành</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    18 tháng toàn bộ
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 mt-2">
              <button
                type="button"
                onClick={() => scrollToQuote('khungthep')}
                className="w-full py-3.5 rounded-xl border border-slate-200 hover:border-[#1E5AA8] bg-white hover:bg-blue-50/50 text-[#0d1f35] hover:text-[#1E5AA8] font-bold text-sm sm:text-base text-center transition-all active:scale-[0.98] cursor-pointer shadow-sm"
              >
                Tính giá cho nhà tôi
              </button>

              {thangKinh?.id && (
                <Link
                  href={`/san-pham/${thangKinh.id}`}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-[#1E5AA8] bg-slate-50/60 hover:bg-blue-50/50 text-[#0d1f35] hover:text-[#1E5AA8] font-semibold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Xem thông số chi tiết dòng khung thép kính</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Commercial & Custom Projects Banner */}
        <div className="max-w-5xl mx-auto mt-8 sm:mt-10 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0d1f35] via-[#142d4c] to-[#1E5AA8] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 border border-white/10 relative overflow-hidden">
          <div className="flex items-center gap-4 text-center md:text-left z-10">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
              <Building2 size={24} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider mb-1">
                <span>Dự án thương mại</span>
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                <span>Cao ốc & Khách sạn</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                Thang Máy Tải Khách Cho Tòa Nhà, Khách Sạn & Văn Phòng
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                Thiết kế may đo cấu hình tải trọng lớn 450 – 1.000 kg+, tốc độ cao 1,0 – 1,75 m/s, đáp ứng tiêu chuẩn QCVN 02:2019 & EN 81-20/50.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2 z-10"
          >
            <span>Nhận báo giá dự án</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Footnote */}
        <div className="text-center mt-8 sm:mt-10 text-xs sm:text-sm text-slate-500 font-medium">
          Giá trọn gói gồm thiết bị, lắp đặt và kiểm định lần đầu. Chi phí thay đổi theo số tầng và tùy chọn cabin.{' '}
          <Link
            href="/san-pham"
            className="text-[#1E5AA8] hover:text-[#174C91] underline underline-offset-4 font-semibold inline-flex items-center gap-1"
          >
            <span>Xem so sánh chi tiết 2 hệ thống sản phẩm</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
