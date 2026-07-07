import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Youtube, ArrowUp } from 'lucide-react';

const quickLinks = [
  { label: 'Thang Homelift', href: '/san-pham/thang-homelift' },
  { label: 'Thang tải khách', href: '/san-pham/thang-may-tai-khach' },
  { label: 'Thang quan sát', href: '/san-pham/thang-may-quan-sat' },
  { label: 'Thang bệnh viện', href: '/san-pham/thang-may-benh-vien' },
  { label: 'Thang tải hàng', href: '/san-pham/thang-may-tai-hang' },
];

const serviceLinks = [
  { label: 'Khảo sát - Báo giá', href: '/dich-vu#khao-sat-bao-gia' },
  { label: 'Tư vấn - Thiết kế', href: '/dich-vu#tu-van-thiet-ke' },
  { label: 'Thi công - Lắp đặt', href: '/dich-vu#thi-cong-lap-dat' },
  { label: 'Bảo hành - Bảo trì', href: '/dich-vu#bao-hanh-bao-tri' },
];

const companyLinks = [
  { label: 'Về Hải Phát', href: '/ve-chung-toi' },
  { label: 'Đội ngũ chuyên gia', href: '/ve-chung-toi' },
  { label: 'Chứng nhận & giải thưởng', href: '/ve-chung-toi' },
  { label: 'Tuyển dụng', href: '#' },
  { label: 'Tin tức', href: '#' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0d1f35] text-white">
      {/* CTA band */}
      <div className="bg-[#285c9a] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
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
              href="tel:0800123456"
              className="flex items-center gap-2 bg-white text-[#285c9a] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              <Phone size={15} />
              Gọi ngay
            </a>
            <Link
              to="/lien-he"
              className="flex items-center gap-2 bg-white/15 border border-white/25 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/25 transition-colors"
            >
              Gửi yêu cầu
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src="/image.png" alt="Thang Máy Hải Phát" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Chuyên lắp đặt thang máy gia đình và thang máy tải khách cao cấp. Hơn 15 năm
              kinh nghiệm, phục vụ khách hàng trên toàn quốc.
            </p>

            {/* Social */}
            <div className="flex gap-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-[#285c9a] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} className="text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-[#285c9a] transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={16} className="text-gray-400 hover:text-white" />
              </a>
              <a
                href="tel:0800123456"
                className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-[#285c9a] transition-colors"
                aria-label="Phone"
              >
                <Phone size={16} className="text-gray-400 hover:text-white" />
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
                  <Link
                    to={l.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#285c9a] group-hover:bg-blue-300 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Dịch vụ
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
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
                  <Link
                    to={l.href}
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
                  123 Đường Láng, Đống Đa, Hà Nội
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="text-[#285c9a] mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:0800123456" className="text-gray-400 text-sm hover:text-white transition-colors block">
                    0800 123 456 (Miễn phí)
                  </a>
                  <a href="tel:02412345678" className="text-gray-400 text-sm hover:text-white transition-colors block">
                    024 1234 5678
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="text-[#285c9a] mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:info@haiphat.vn" className="text-gray-400 text-sm hover:text-white transition-colors block">
                    info@haiphat.vn
                  </a>
                  <a href="mailto:sales@haiphat.vn" className="text-gray-400 text-sm hover:text-white transition-colors block">
                    sales@haiphat.vn
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Thang Máy Hải Phát. All rights reserved. · MST: 0123456789
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Điều khoản sử dụng
            </a>
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
