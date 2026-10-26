"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useQuickQuote } from '../context/QuickQuoteContext';

export default function PricingOverview() {
  const { openQuoteModal } = useQuickQuote();

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
            Giá trọn gói gồm thiết bị, lắp đặt và kiểm định lần đầu. Báo giá chi tiết từng hạng mục sau khảo sát.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mt-10 sm:mt-12 lg:mt-14">
          {/* Card 1: Thang máy gia đình (Highlighted) */}
          <div className="bg-white rounded-3xl border-2 border-[#1E5AA8] shadow-[0_14px_40px_rgba(30,90,168,0.09)] p-6 sm:p-7 flex flex-col justify-between relative transition-all hover:shadow-[0_20px_50px_rgba(30,90,168,0.14)]">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#1E5AA8] text-white shadow-xs w-fit mb-3">
                Phổ biến nhất
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0d1f35] tracking-tight">
                Thang máy gia đình
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 min-h-[38px] leading-relaxed">
                Nhà phố, nhà ống 3–6 tầng, diện tích giếng thang nhỏ.
              </p>

              {/* Dotted Price Box */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/50 border border-dashed border-amber-300 text-left">
                <div className="text-xs text-slate-500 font-medium">Giá từ</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] font-mono tracking-tight mt-0.5">
                  290 triệu
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">
                  nhà 3 tầng, cabin inox
                </div>
              </div>

              {/* Spec Rows */}
              <div className="divide-y divide-slate-100 my-5 text-xs sm:text-sm space-y-2">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Tải trọng</span>
                  <span className="font-bold text-slate-800">350 – 450 kg</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Tốc độ</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    0,4 – 1,0 m/s
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Số điểm dừng</span>
                  <span className="font-bold text-slate-800">tối đa 6</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Hố PIT</span>
                  <span className="font-bold text-slate-800">từ 600 mm</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Bảo hành</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    18 tháng
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => scrollToQuote('thangxay')}
              className="w-full py-3.5 rounded-xl bg-[#1E5AA8] hover:bg-[#174C91] text-white font-bold text-sm sm:text-base text-center transition-all shadow-md shadow-[#1E5AA8]/20 hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              Tính giá cho nhà tôi
            </button>
          </div>

          {/* Card 2: Thang máy kính quan sát */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_30px_rgba(15,42,74,0.04)] p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1E5AA8] border border-blue-200/80 w-fit mb-3">
                Biệt thự
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0d1f35] tracking-tight">
                Thang máy kính quan sát
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 min-h-[38px] leading-relaxed">
                Biệt thự, giếng trời, lắp trong nhà hoặc ngoài công trình.
              </p>

              {/* Dotted Price Box */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/50 border border-dashed border-amber-300 text-left">
                <div className="text-xs text-slate-500 font-medium">Giá từ</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] font-mono tracking-tight mt-0.5">
                  350 triệu
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">
                  nhà 2 tầng, khung thép vách kính
                </div>
              </div>

              {/* Spec Rows */}
              <div className="divide-y divide-slate-100 my-5 text-xs sm:text-sm space-y-2">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Tải trọng</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    350 – 450 kg
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Tốc độ</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    0,4 – 1,0 m/s
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Khung giếng</span>
                  <span className="font-bold text-slate-800">thép sơn tĩnh điện</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Vách</span>
                  <span className="font-bold text-slate-800">kính cường lực</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Bảo hành</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    18 tháng
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => scrollToQuote('khungthep')}
              className="w-full py-3.5 rounded-xl border border-slate-200 hover:border-[#1E5AA8] bg-white hover:bg-blue-50/50 text-[#0d1f35] hover:text-[#1E5AA8] font-bold text-sm sm:text-base text-center transition-all active:scale-[0.98] cursor-pointer"
            >
              Tính giá cho nhà tôi
            </button>
          </div>

          {/* Card 3: Thang máy tải khách */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_30px_rgba(15,42,74,0.04)] p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1E5AA8] border border-blue-200/80 w-fit mb-3">
                Công trình
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0d1f35] tracking-tight">
                Thang máy tải khách
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 min-h-[38px] leading-relaxed">
                Tòa nhà văn phòng, khách sạn, căn hộ dịch vụ.
              </p>

              {/* Dotted Price Box */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/50 border border-dashed border-amber-300 text-left">
                <div className="text-xs text-slate-500 font-medium">Giá từ</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] font-mono tracking-tight mt-0.5">
                  450 triệu
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">
                  5 điểm dừng, tải 630 kg
                </div>
              </div>

              {/* Spec Rows */}
              <div className="divide-y divide-slate-100 my-5 text-xs sm:text-sm space-y-2">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Tải trọng</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    450 – 1.000 kg
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Tốc độ</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    1,0 – 1,75 m/s
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Tiêu chuẩn</span>
                  <span className="font-bold text-slate-800">EN 81-20/50</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Kiểm định</span>
                  <span className="font-bold text-slate-800">QCVN 02:2019</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-500 font-medium">Bảo hành</span>
                  <span className="border border-dashed border-amber-400 bg-amber-50/60 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-slate-800">
                    18 tháng
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={scrollToContact}
              className="w-full py-3.5 rounded-xl border border-slate-200 hover:border-[#1E5AA8] bg-white hover:bg-blue-50/50 text-[#0d1f35] hover:text-[#1E5AA8] font-bold text-sm sm:text-base text-center transition-all active:scale-[0.98] cursor-pointer"
            >
              Nhận báo giá dự án
            </button>
          </div>
        </div>

        {/* Footnote */}
        <div className="text-center mt-8 sm:mt-10 text-xs sm:text-sm text-slate-500 font-medium">
          Giá thay đổi theo số tầng, kiểu cabin, cửa tầng và hiện trạng giếng thang.{' '}
          <Link
            href="/san-pham"
            className="text-[#1E5AA8] hover:text-[#174C91] underline underline-offset-4 font-semibold inline-flex items-center gap-1"
          >
            <span>Xem thông số chi tiết từng dòng</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
