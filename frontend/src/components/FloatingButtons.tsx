"use client";

import Link from 'next/link';
import { Phone, Headset } from 'lucide-react';
import { ZaloIcon } from './icons/ZaloIcon';
import { FacebookIcon } from './icons/FacebookIcon';

export function FloatingButtons() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP FLOATING BUTTONS (Ẩn hoàn toàn trên mobile)       */}
      {/* ============================================================ */}
      <aside
        aria-label="Kênh liên hệ nhanh"
        className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-none"
      >
        {/* Consultation Button */}
        <Link
          href="/lien-he"
          className="pointer-events-auto flex items-center gap-2.5 group focus-visible:outline-none"
          aria-label="Tư vấn ngay"
        >
          <span className="hidden sm:inline-block bg-[#0d1f35]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 whitespace-nowrap">
            Tư vấn ngay
          </span>
          <div className="w-13 h-13 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 text-white">
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
          <div className="w-13 h-13 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20">
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
          <div className="w-13 h-13 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20">
            <ZaloIcon size={26} variant="white-bubble" className="text-[#285c9a]" />
          </div>
        </a>

        {/* Hotline Button with Pulse */}
        <a
          href="tel:0898424666"
          className="pointer-events-auto flex items-center gap-2.5 group focus-visible:outline-none"
          aria-label="Gọi hotline tư vấn 24/7"
        >
          <span className="hidden sm:inline-block bg-[#0d1f35]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 whitespace-nowrap font-mono">
            Hotline: 0898.424.666
          </span>
          <div className="relative w-13 h-13 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20">
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            <Phone size={22} className="text-white group-hover:rotate-12 transition-transform" />
          </div>
        </a>
      </aside>

      {/* ============================================================ */}
      {/* 2. MOBILE LUXURY FLOATING DOCK                               */}
      {/* Thanh điều hướng bo tròn cao cấp đồng bộ với nhận diện Hải Phát */}
      {/* ============================================================ */}
      <nav
        aria-label="Thanh điều hướng liên hệ nhanh di động"
        className="fixed bottom-3 inset-x-3.5 max-w-md mx-auto z-40 md:hidden"
      >
        <div className="relative bg-[#091728]/90 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.12)_inset] px-2 py-2">
          {/* Subtle top ambient glow line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none" />

          <div className="grid grid-cols-4 items-center">
            {/* 1. Hotline / Gọi ngay */}
            <a
              href="tel:0898424666"
              className="flex flex-col items-center justify-center py-1 group select-none active:scale-95 transition-transform duration-150"
              aria-label="Gọi hotline 0898.424.666"
            >
              <div className="relative w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-400/35 flex items-center justify-center text-emerald-400 shadow-sm group-hover:bg-emerald-500/25 transition-colors">
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Phone size={17} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
              </div>
              <span className="text-[10.5px] font-semibold text-slate-200 mt-1 leading-none tracking-tight">
                Gọi ngay
              </span>
            </a>

            {/* 2. Chat Zalo */}
            <a
              href="https://zalo.me/0898424666"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-1 group select-none active:scale-95 transition-transform duration-150"
              aria-label="Chat Zalo Kỹ Thuật"
            >
              <div className="w-9 h-9 rounded-full bg-[#0068ff]/15 border border-[#0068ff]/35 flex items-center justify-center shadow-sm group-hover:bg-[#0068ff]/25 transition-colors">
                <ZaloIcon size={19} variant="white-bubble" className="text-[#0068ff]" />
              </div>
              <span className="text-[10.5px] font-semibold text-slate-200 mt-1 leading-none tracking-tight">
                Chat Zalo
              </span>
            </a>

            {/* 3. Facebook Messenger */}
            <a
              href="https://facebook.com/thangmayhaiphat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-1 group select-none active:scale-95 transition-transform duration-150"
              aria-label="Nhắn tin qua Facebook"
            >
              <div className="w-9 h-9 rounded-full bg-[#1877F2]/15 border border-[#1877F2]/35 flex items-center justify-center shadow-sm group-hover:bg-[#1877F2]/25 transition-colors">
                <FacebookIcon size={18} className="text-[#60a5fa]" />
              </div>
              <span className="text-[10.5px] font-semibold text-slate-200 mt-1 leading-none tracking-tight">
                Facebook
              </span>
            </a>

            {/* 4. Tư vấn / Báo giá (Accent Hero Button) */}
            <Link
              href="/lien-he"
              className="flex flex-col items-center justify-center py-1 group select-none active:scale-95 transition-transform duration-150"
              aria-label="Tư vấn báo giá miễn phí"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#285c9a] to-[#3a7bc8] border border-blue-300/40 flex items-center justify-center text-white shadow-md shadow-[#285c9a]/35 group-hover:brightness-110 transition-all">
                <Headset size={18} className="text-white group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="text-[10.5px] font-semibold text-blue-200 mt-1 leading-none tracking-tight">
                Tư vấn
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
