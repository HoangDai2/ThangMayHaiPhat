"use client";

import React from "react";
import { PhoneCall, AlertTriangle, ShieldAlert, Clock, MapPin, ChevronRight } from "lucide-react";

export function EmergencyBanner() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Shell: Double-Bezel Architecture */}
        <div className="p-1.5 sm:p-2 rounded-3xl bg-[#0b1728] border-2 border-[#285c9a] shadow-2xl relative overflow-hidden">
          
          {/* Subtle Industrial Grid Background */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Luminous Glow */}
          <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-64 h-64 bg-[#285c9a]/40 rounded-full blur-3xl pointer-events-none" />

          {/* Inner Content Core */}
          <div className="relative z-10 rounded-[calc(1.5rem-2px)] p-6 sm:p-10 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="max-w-2xl text-center lg:text-left">
              
              {/* Telemetry Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs uppercase tracking-wider mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                <span>Đội Phản Ứng Nhanh Kỹ Thuật 24/7/365</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white mb-4">
                Cam Kết Cứu Hộ Khẩn Cấp: <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-white">
                  Có Mặt Trong Vòng 30 - 60 Phút
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Hải Phát bố trí các trạm kỹ sư trực chiến thường trực tại các quận nội thành. Khi phát sinh sự cố kỹ thuật hoặc kẹt thang, xe cứu hộ chuyên dụng lập tức xuất phát với đầy đủ dụng cụ an toàn.
              </p>

              {/* Guarantees chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Clock size={14} className="text-emerald-400" />
                  SLA &lt; 60 PHÚT NỘI THÀNH
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <ShieldAlert size={14} className="text-cyan-400" />
                  ƯU TIÊN CỨU HỘ NGƯỜI SỐ 1
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <MapPin size={14} className="text-amber-400" />
                  PHỦ SÓNG TOÀN KHU VỰC
                </span>
              </div>

            </div>

            {/* Right Action: Massive Click-to-Call Emergency Card */}
            <div className="w-full lg:w-auto flex flex-col items-center sm:items-stretch gap-3 shrink-0">
              <a
                href="tel:0898424666"
                className="group relative inline-flex items-center justify-between gap-4 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-7 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-[#285c9a]/40 active:scale-[0.98] border border-blue-400/40"
              >
                <div className="text-left">
                  <div className="text-[11px] font-mono text-blue-200 uppercase tracking-widest">HOTLINE KHẨN CẤP 24/7</div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">0898 424 666</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                  <PhoneCall size={22} className="animate-bounce" />
                </div>
              </a>

              <div className="text-center text-[11px] font-mono text-slate-400">
                Bấm để thực hiện cuộc gọi cứu trợ trực tiếp
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
