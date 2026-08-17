"use client";
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { ZaloIcon } from './icons/ZaloIcon';

const quickLinks = [

  { label: 'Thang tải khách', href: '/san-pham/thang-may-tai-khach' },
  { label: 'Thang quan sát', href: '/san-pham/thang-may-quan-sat' },
  { label: 'Thang bệnh viện', href: '/san-pham/thang-may-benh-vien' },
  { label: 'Thang tải hàng', href: '/san-pham/thang-may-tai-hang' },
];


const companyLinks = [
  { label: 'Về Hải Phát', href: '/ve-chung-toi' }
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0d1f35] text-white">
      {/* CTA band */}
      <div className="bg-[#285c9a] py-10">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Sẵn sàng nâng cấp không gian sống?
            </h3>
            <p className="text-blue-200 text-sm">
              Nhận tư vấn thiết kế và báo giá miễn phí trong hôm nay
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="tel:0898424666"
              className="flex items-center gap-2 bg-white text-[#285c9a] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              <Phone size={15} />
              Gọi ngay
            </a>
            <Link href="/lien-he"
              className="flex items-center gap-2 bg-white/15 border border-white/25 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/25 transition-colors"
            >
              Gửi yêu cầu
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src="/image.png" alt="Thang Máy Hải Phát" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Chuyên lắp đặt thang máy gia đình và thang máy tải khách cao cấp. Hơn 5 năm
              kinh nghiệm, phục vụ khách hàng trên toàn quốc.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-11 h-11 bg-[#1877F2] rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm group"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="8 2 18 30" className="text-white" fill="currentColor">
                  <path d="M19.25,32L19.25,19.55L23.42,19.55L24.04,14.7L19.25,14.7L19.25,11.61C19.25,10.2,19.64,9.25,21.64,9.25L24.19,9.25L24.19,4.91C23.75,4.85,22.23,4.72,20.46,4.72C16.78,4.72,14.25,6.97,14.25,11.17L14.25,14.7L10.07,14.7L10.07,19.55L14.25,19.55L14.25,32H19.25Z" />
                </svg>
              </a>
              <a
                href="https://zalo.me/0898.424.666"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center hover:scale-110 transition-transform group"
                aria-label="Zalo"
              >
                <ZaloIcon size={44} />
              </a>
              <a
                href="tel:0987603588"
                className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm group"
                aria-label="Phone"
              >
                <svg width="22" height="22" viewBox="0 0 512 512" className="text-white" fill="currentColor">
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Sản phẩm
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#285c9a] group-hover:bg-blue-300 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Công ty
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#285c9a] group-hover:bg-blue-300 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Liên hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-[#285c9a] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Tầng 11, Tòa Nhà Đa Năng, 169 Nguyễn Ngọc Vũ, Yên Hòa, Hà Nội
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="text-[#285c9a] mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:0987603588" className="text-gray-400 text-sm hover:text-white transition-colors block">
                    0987 603 588
                  </a>
                  <a href="tel:0898424666" className="text-gray-400 text-sm hover:text-white transition-colors block">
                    0898 424 666
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="text-[#285c9a] mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:haiphatthangmay@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors block">
                    haiphatthangmay@gmail.com
                  </a>

                </div>
              </li>
            </ul>

            {/* Cert badges */}
            <div className="mt-5 flex gap-2 flex-wrap">
              {['ISO 9001', 'EN 81', 'QCVN'].map((cert) => (
                <span key={cert} className="bg-white/8 border border-white/10 text-gray-400 text-xs px-2.5 py-1 rounded-lg">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Thang Máy Hải Phát. All rights reserved. · MST: 0109108682
          </p>
          <div className="flex items-center gap-5">
            <Link href="/chinh-sach-bao-mat" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan-su-dung" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Điều khoản sử dụng
            </Link>
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg bg-[#285c9a]/30 flex items-center justify-center hover:bg-[#285c9a] transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
