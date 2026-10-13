"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { useArticlesData } from '../hooks/useArticlesData';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/san-pham' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Dự án', href: '/du-an' },
  { label: 'Bài viết', href: '/bai-viet' },
  { label: 'Về chúng tôi', href: '/ve-chung-toi' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { articles } = useArticlesData();
  const hasArticles = (articles && articles.length > 0) || false;
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [pathname]);

  const filteredNavLinks = navLinks.filter(
    (link) => link.label !== 'Bài viết' || hasArticles
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5'
          : 'bg-transparent lg:bg-[#f8fafc] border-b border-white/20 lg:border-transparent py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          {scrolled ? (
            /* Khi cuộn xuống (nền trắng): Hiển thị logo gốc không nền */
            <img
              src="/logo dang dai khong nen.png"
              alt="Thang Máy Hải Phát"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            /* Khi ở đầu trang (chưa cuộn) */
            <>
              {/* Mobile (nền tối / trong suốt trên banner): Hiển thị logo trắng sáng */}
              <img
                src="/logohp-light.png"
                alt="Thang Máy Hải Phát"
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-[1.02] lg:hidden"
              />
              {/* Desktop (nền sáng #f8fafc): Hiển thị logo gốc không nền */}
              <img
                src="/logo dang dai khong nen.png"
                alt="Thang Máy Hải Phát"
                className="h-14 lg:h-16 w-auto object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-[1.02] hidden lg:block"
              />
            </>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {filteredNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-[#285c9a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA phone on Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:0987603588"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#285c9a] text-sm font-semibold text-[#285c9a] hover:bg-blue-50/80 transition-all duration-200"
          >
            <Phone size={15} />
            0987 603 588
          </a>
          <a
            href="tel:0898424666"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 bg-[#285c9a] text-white hover:bg-[#1e4a80] shadow-sm"
          >
            <Phone size={15} />
            0898 424 666
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled
              ? 'text-slate-800 hover:bg-slate-100'
              : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu Drawer */}
      {menuOpen && (
        <div
          className={`lg:hidden backdrop-blur-xl border-t shadow-2xl absolute top-full left-0 right-0 ${
            scrolled
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-[#091524]/95 border-white/20 text-slate-100'
          }`}
        >
          <nav className="flex flex-col px-4 py-3.5 gap-1">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2.5 px-3 font-medium text-sm rounded-lg transition-colors ${
                  scrolled
                    ? 'text-slate-700 hover:bg-blue-50/80 hover:text-[#285c9a]'
                    : 'text-slate-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div
              className={`mt-3 pt-3 border-t flex flex-col gap-2.5 ${
                scrolled ? 'border-slate-200' : 'border-white/15'
              }`}
            >
              <a
                href="tel:0987603588"
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border font-semibold text-sm transition-colors ${
                  scrolled
                    ? 'border-[#285c9a] text-[#285c9a] hover:bg-blue-50/80'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                <Phone size={15} />
                0987 603 588
              </a>
              <a
                href="tel:0898424666"
                className="flex items-center justify-center gap-2 py-2.5 bg-[#285c9a] text-white rounded-lg font-semibold text-sm shadow-md hover:bg-[#1e4a80] transition-colors"
              >
                <Phone size={15} />
                0898 424 666
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
