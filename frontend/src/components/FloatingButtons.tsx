"use client";

import Link from 'next/link';
import { Phone, Headset, MessageCircle } from 'lucide-react';
import { ZaloIcon } from './icons/ZaloIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { useQuickQuote } from '../context/QuickQuoteContext';

export function FloatingButtons() {
  const { openQuoteModal } = useQuickQuote();

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP FLOATING BUTTONS (Ẩn hoàn toàn trên mobile)       */}
      {/* ============================================================ */}
      <aside
        aria-label="Kênh liên hệ nhanh"
        className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3.5 pointer-events-none"
      >
        {/* Consultation Button */}
        <button
          type="button"
          onClick={() => openQuoteModal()}
          className="pointer-events-auto flex items-center gap-2.5 group focus-visible:outline-none cursor-pointer"
          aria-label="Tư vấn ngay"
        >
          <span className="hidden sm:inline-block bg-[#0d1f35]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 whitespace-nowrap">
            Tư vấn ngay
          </span>
          <div className="w-12 h-12 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200 text-white">
            <Headset size={22} className="text-white group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </button>

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
          <div className="w-12 h-12 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200">
            <FacebookIcon size={22} className="text-white" />
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
          <div className="w-12 h-12 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200">
            <ZaloIcon size={24} variant="white-bubble" className="text-[#285c9a]" />
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
          <div className="relative w-12 h-12 rounded-full bg-[#285c9a] hover:bg-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/35 group-hover:scale-105 active:scale-95 transition-all duration-200">
            <span className="absolute top-[1px] right-[3px] w-3 h-3 rounded-full bg-[#59bdaa] border-2 border-white" />
            <Phone size={22} className="text-white group-hover:rotate-12 transition-transform" />
          </div>
        </a>
      </aside>

      {/* ============================================================ */}
      {/* 2. MOBILE LUXURY STICKY BAR (Tràn viền, bám sát khung đáy)    */}
      {/* Nền trong suốt kính mờ, các nút nổi bật rõ nét như Hình 2     */}
      {/* ============================================================ */}
      <nav
        aria-label="Thanh điều hướng liên hệ nhanh di động"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/90 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_24px_rgba(15,42,74,0.08)] px-2.5 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1.5 items-center">
          {/* 1. Nút Gọi */}
          <a
            href="tel:0898424666"
            className="flex items-center justify-center gap-1 min-h-[44px] px-1 bg-[#15803d] hover:bg-[#166534] active:scale-[0.97] text-white font-bold text-[13px] tracking-tight rounded-xl shadow-sm border border-[#166534] transition-all duration-150 select-none"
            aria-label="Gọi hotline 0898.424.666"
          >
            <Phone size={15} className="text-white shrink-0" />
            <span>Gọi</span>
          </a>

          {/* 2. Nút Zalo */}
          <a
            href="https://zalo.me/0898424666"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 min-h-[44px] px-1 bg-[#0068ff] hover:bg-[#0057d6] active:scale-[0.97] text-white font-bold text-[13px] tracking-tight rounded-xl shadow-sm border border-[#0057d6] transition-all duration-150 select-none"
            aria-label="Chat Zalo Kỹ Thuật"
          >
            <MessageCircle size={15} className="text-white shrink-0" />
            <span>Zalo</span>
          </a>

          {/* 3. Nút Facebook */}
          <a
            href="https://facebook.com/thangmayhaiphat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 min-h-[44px] px-1 bg-[#1877F2] hover:bg-[#1565cf] active:scale-[0.97] text-white font-bold text-[13px] tracking-tight rounded-xl shadow-sm border border-[#1565cf] transition-all duration-150 select-none"
            aria-label="Nhắn tin qua Facebook"
          >
            <FacebookIcon size={15} className="text-white shrink-0" />
            <span>Facebook</span>
          </a>

          {/* 4. Nút Tư vấn */}
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="flex items-center justify-center gap-1 min-h-[44px] px-1 bg-[#1e5aa8] hover:bg-[#184886] active:scale-[0.97] text-white font-bold text-[13px] tracking-tight rounded-xl shadow-sm border border-[#184886] transition-all duration-150 select-none cursor-pointer"
            aria-label="Tư vấn báo giá thang máy"
          >
            <Headset size={15} className="text-white shrink-0" />
            <span>Tư vấn</span>
          </button>
        </div>
      </nav>
    </>
  );
}
