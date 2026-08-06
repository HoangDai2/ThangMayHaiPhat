"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';

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
  const pathname = usePathname();

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white py-3 transition-all duration-300">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/logohp.png"
            alt="Thang Máy Hải Phát"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#285c9a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA phone */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:0987603588"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#285c9a] text-sm font-semibold text-[#285c9a] hover:bg-blue-50 transition-all duration-200"
          >
            <Phone size={15} />
            0987 603 588
          </a>
          <a
            href="tel:0898424666"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 bg-[#285c9a] text-white hover:bg-[#1e4a80]"
          >
            <Phone size={15} />
            0898 424 666
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute top-full left-0 right-0">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link key={link.href}
                href={link.href}
                className="py-2.5 px-3 text-gray-700 font-medium text-sm rounded-lg hover:bg-blue-50 hover:text-[#285c9a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <a
                href="tel:0987603588"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#285c9a] text-[#285c9a] font-semibold text-sm hover:bg-blue-50 transition-colors"
              >
                <Phone size={15} />
                0987 603 588
              </a>
              <a
                href="tel:0898424666"
                className="flex items-center justify-center gap-2 py-2.5 bg-[#285c9a] text-white rounded-lg font-semibold text-sm"
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
