"use client";

import Link from 'next/link';
import { Phone, Headset } from 'lucide-react';
import { ZaloIcon } from './icons/ZaloIcon';
import { FacebookIcon } from './icons/FacebookIcon';

export function FloatingButtons() {
  return (
    <aside aria-label="Kênh liên hệ nhanh" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none">
      {/* Consultation Button */}
      <Link
        href="/lien-he"
        className="pointer-events-auto flex items-center gap-2.5 group focus-visible:outline-none"
        aria-label="Tư vấn ngay"
      >
        <span className="hidden sm:inline-block bg-[#0d1f35]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 whitespace-nowrap">
          Tư vấn ngay
        </span>
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 text-white">
          <Headset size={23} className="text-white group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </Link>

      {/* Facebook Button */}
      <a
        href="https://facebook.com/thangmayhaiphat"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2.5 group focus-visible:outline-none"
        aria-label="Nhắn tin qua Facebook"
      >
        <span className="hidden sm:inline-block bg-[#0d1f35]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 whitespace-nowrap">
          Nhắn tin Facebook
        </span>
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20">
          <FacebookIcon size={24} className="text-white" />
        </div>
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/0898424666"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2.5 group focus-visible:outline-none"
        aria-label="Chat qua Zalo"
      >
        <span className="hidden sm:inline-block bg-[#0d1f35]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 whitespace-nowrap">
          Chat Zalo Kỹ Thuật
        </span>
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20">
          <ZaloIcon size={26} variant="white-bubble" className="text-[#285c9a]" />
        </div>
      </a>

      {/* Hotline Button with Pulse */}
      <a
        href="tel:0898424666"
        className="pointer-events-auto flex items-center gap-2.5 group focus-visible:outline-none"
        aria-label="Gọi hotline cứu hộ 24/7"
      >
        <span className="hidden sm:inline-block bg-[#0d1f35]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 whitespace-nowrap font-mono">
          Hotline: 0898.424.666
        </span>
        <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20">
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
          <Phone size={22} className="text-white group-hover:rotate-12 transition-transform" />
        </div>
      </a>
    </aside>
  );
}
