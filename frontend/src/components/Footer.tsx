"use client";

import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { ZaloIcon } from './icons/ZaloIcon';
import { useProductsData } from '../hooks/useProductsData';

const companyLinks = [
  { label: 'Về Hải Phát', href: '/ve-chung-toi' },
  { label: 'Dự án tiêu biểu', href: '/du-an' },
  { label: 'Dịch vụ bảo trì', href: '/dich-vu' },
  { label: 'Kiến thức thang máy', href: '/bai-viet' },
  { label: 'Liên hệ tư vấn', href: '/lien-he' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const { products } = useProductsData();
  const dynamicQuickLinks = products.map((p) => ({
    id: p.id,
    label: p.title,
    href: `/san-pham/${p.id}`,
  }));

  return (
    <footer className="bg-[#0d1f35] text-white border-t border-slate-800">
      {/* CTA Band: Pre-Footer Conversion Moment */}
      <div className="bg-gradient-to-r from-[#285c9a] to-[#1e4a80] py-10 relative overflow-hidden border-b border-blue-400/20">
        <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-blue-200 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Khảo Sát Hiện Trạng & Thiết Kế Bản Vẽ 3D Miễn Phí
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Sẵn sàng nâng cấp không gian sống với Thang Máy Hải Phát?
            </h3>
            <p className="text-blue-100/90 text-sm mt-1 max-w-xl">
              Nhận tư vấn kỹ thuật trực tiếp từ kỹ sư trưởng và báo giá minh bạch trong 30 phút.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:0898424666"
              className="group inline-flex items-center gap-2 bg-white text-[#0d1f35] px-5 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all duration-200 shadow-lg active:scale-[0.98]"
            >
              <Phone size={15} className="text-[#285c9a] group-hover:rotate-12 transition-transform" />
              <span>Gọi 0898.424.666</span>
            </a>

            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span>Gửi yêu cầu</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <img
                src="/image.png"
                alt="Thang Máy Hải Phát"
                className="h-14 sm:h-16 w-auto object-contain brightness-105"
              />
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Đơn vị dẫn đầu chuyên tư vấn, thiết kế, thi công lắp đặt và bảo trì thang máy gia đình, biệt thự và thang tải khách tiêu chuẩn quốc tế.
            </p>

            {/* Social channels */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com/thangmayhaiphat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877F2] border border-white/10 flex items-center justify-center text-white hover:scale-105 transition-all shadow-sm"
                aria-label="Facebook Thang Máy Hải Phát"
              >
                <svg width="20" height="20" viewBox="8 2 18 30" fill="currentColor">
                  <path d="M19.25,32L19.25,19.55L23.42,19.55L24.04,14.7L19.25,14.7L19.25,11.61C19.25,10.2,19.64,9.25,21.64,9.25L24.19,9.25L24.19,4.91C23.75,4.85,22.23,4.72,20.46,4.72C16.78,4.72,14.25,6.97,14.25,11.17L14.25,14.7L10.07,14.7L10.07,19.55L14.25,19.55L14.25,32H19.25Z" />
                </svg>
              </a>

              <a
                href="https://zalo.me/0898424666"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#0068ff] border border-white/10 flex items-center justify-center text-white hover:scale-105 transition-all shadow-sm"
                aria-label="Zalo Thang Máy Hải Phát"
              >
                <ZaloIcon size={24} className="text-white" />
              </a>

              <a
                href="tel:0898424666"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#285c9a] border border-white/10 flex items-center justify-center text-white hover:scale-105 transition-all shadow-sm"
                aria-label="Gọi điện thoại"
              >
                <Phone size={18} />
              </a>
            </div>

            {/* Safety Certifications */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Tiêu Chuẩn & Chứng Nhận Kỹ Thuật</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['ISO 9001:2015', 'EN 81-20/50', 'QCVN 02:2019'].map((cert) => (
                  <span
                    key={cert}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Links (Col 5-7) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#285c9a] pl-2.5">
              Dòng Sản Phẩm
            </h4>
            <ul className="space-y-2.5">
              {dynamicQuickLinks.slice(0, 6).map((item, idx) => (
                <li key={item.id ? `${item.id}-${idx}` : `${item.href}-${idx}`}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a7bbf] group-hover:bg-white group-hover:scale-125 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Quick Links (Col 8-9) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#285c9a] pl-2.5">
              Về Doanh Nghiệp
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((item, idx) => (
                <li key={`${item.href}-${idx}`}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a7bbf] group-hover:bg-white group-hover:scale-125 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Col 10-12) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#285c9a] pl-2.5">
              Thông Tin Liên Hệ
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#4a7bbf] shrink-0 mt-1" />
                <span className="leading-snug">
                  Tầng 11, Tòa Nhà Đa Năng, 169 Nguyễn Ngọc Vũ, Trung Hòa, Cầu Giấy, Hà Nội
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <Phone size={16} className="text-[#4a7bbf] shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400">Hotline 24/7 (Kỹ thuật & Cứu hộ):</div>
                  <a href="tel:0898424666" className="text-white font-bold font-mono hover:text-blue-300 block">
                    0898.424.666
                  </a>
                  <div className="text-xs text-slate-400 mt-1">Phòng kinh doanh:</div>
                  <a href="tel:0987603588" className="text-white font-mono hover:text-blue-300 block">
                    0987.603.588
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#4a7bbf] shrink-0" />
                <a href="mailto:haiphatthangmay@gmail.com" className="hover:text-white transition-colors truncate">
                  haiphatthangmay@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800/80 bg-[#091524]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Công Ty Thang Máy Hải Phát. Tất cả quyền được bảo lưu. · Mã số thuế: <span className="font-mono text-slate-300">0109108682</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-white transition-colors">
              Điều khoản sử dụng
            </Link>

            <button
              onClick={scrollTop}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#285c9a] border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Cuộn lên đầu trang"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
