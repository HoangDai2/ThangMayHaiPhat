import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/san-pham' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Dự án', href: '/du-an' },
  { label: 'Về chúng tôi', href: '/ve-chung-toi' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-[#285c9a] flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="2" width="6" height="18" rx="1.5" fill="white" fillOpacity="0.9"/>
              <rect x="13" y="2" width="6" height="18" rx="1.5" fill="white" fillOpacity="0.5"/>
              <path d="M6 7L6 10M6 12L6 15" stroke="#285c9a" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${scrolled || !isHome ? 'text-[#285c9a]' : 'text-white'}`}>
            Viet<span className={scrolled || !isHome ? 'text-gray-800' : 'text-blue-200'}>Lift</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-[#285c9a] ${
                scrolled || !isHome ? 'text-gray-700' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA phone */}
        <a
          href="tel:0800123456"
          className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            scrolled || !isHome
              ? 'bg-[#285c9a] text-white hover:bg-[#1e4a80]'
              : 'bg-white/15 text-white border border-white/30 hover:bg-white/25 backdrop-blur-sm'
          }`}
        >
          <Phone size={15} />
          0800 123 456
        </a>

        {/* Mobile menu toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled || !isHome ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="py-2.5 px-3 text-gray-700 font-medium text-sm rounded-lg hover:bg-blue-50 hover:text-[#285c9a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:0800123456"
              className="mt-2 flex items-center justify-center gap-2 py-2.5 bg-[#285c9a] text-white rounded-lg font-semibold text-sm"
            >
              <Phone size={15} />
              0800 123 456
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
