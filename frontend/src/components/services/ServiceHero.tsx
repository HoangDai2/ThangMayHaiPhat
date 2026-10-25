"use client";

import Link from "next/link";
import { ChevronRight, Home, ShieldCheck, Activity, PhoneCall, Sparkles } from "lucide-react";

export function ServiceHero() {
  return (
    <header className="relative bg-[#0d1f35] text-white pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-800">
      {/* Blueprint Grid & Technical Mesh Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial Glow Accents */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#285c9a]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Industrial Spec Watermark */}
      <div className="absolute right-6 top-28 hidden xl:block font-mono text-[11px] text-slate-500/40 tracking-[0.25em] select-none pointer-events-none text-right">
        <div>SYS.CODE // HP-ELEV-SRV-2026</div>
        <div>SPEC.VER // QCVN 02:2019 / EN 81-20</div>
        <div>STATION // HANOI CENTRAL HQ</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-xs text-slate-300">
            <li className="inline-flex items-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-200"
              >
                <Home size={13} className="text-[#285c9a]" />
                <span>Trang chủ</span>
              </Link>
            </li>
            <li className="text-slate-600">
              <ChevronRight size={13} />
            </li>
            <li aria-current="page" className="font-semibold text-white">
              Dịch vụ kỹ thuật
            </li>
          </ol>
        </nav>

        {/* Hero Grid: Macro Copy Left, Telemetry Badge Board Right */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Positioning */}
          <div className="lg:col-span-7">
            {/* Telemetry Status Chip */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-[#285c9a]/20 border border-[#285c9a]/40 text-[#4a7bbf] text-[11px] font-mono uppercase tracking-wider mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Quy Chuẩn An Toàn Châu Âu EN 81-20/50 & QCVN 02:2019</span>
            </div>

            {/* Iron Rule: 2-Line Desktop H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 max-w-2xl">
              Dịch Vụ Thang Máy Chuyên Nghiệp: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white">
                An Toàn Tuyệt Đối, Bền Bỉ Trọn Đời
              </span>
            </h1>

            {/* Subtext: <= 25 words */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
              Tư vấn khảo sát hố thang miễn phí, thiết kế kỹ thuật chuẩn xác và cam kết hợp đồng bảo dưỡng cơ điện định kỳ minh bạch từng linh kiện.
            </p>

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#tu-van-bao-gia"
                className="group relative inline-flex items-center gap-3 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#285c9a]/25 active:scale-[0.98]"
              >
                <span>Nhận Khảo Sát & Báo Giá</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ChevronRight size={14} />
                </span>
              </a>

              <a
                href="tel:0326629971"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white border border-slate-700 text-sm font-medium transition-all duration-200"
              >
                <PhoneCall size={16} className="text-emerald-400" />
                <span>Hotline Cứu Hộ: <strong className="text-white font-semibold">0326 629 971</strong></span>
              </a>
            </div>
          </div>

          {/* Right Column: Industrial Telemetry Metric Card (Double-Bezel Architecture) */}
          <div className="lg:col-span-5">
            <div className="p-1.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 shadow-2xl backdrop-blur-xl">
              <div className="bg-[#0b1728] rounded-[calc(1rem-2px)] p-6 border border-slate-700/50">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800 text-xs">
                  <span className="font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Activity size={14} className="text-[#285c9a]" />
                    Chỉ Số Cam Kết Dịch Vụ
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/20">
                    SLA ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">Thời Gian Khảo Sát</div>
                    <div className="text-2xl font-bold text-white tracking-tight">24 Giờ</div>
                    <div className="text-[12px] text-slate-400 mt-1">Đo đạc 3D tận nơi miễn phí</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">Chu Kỳ Bảo Trì</div>
                    <div className="text-2xl font-bold text-cyan-400 tracking-tight">02 Tháng</div>
                    <div className="text-[12px] text-slate-400 mt-1">1 lần kiểm định 20+ hạng mục</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">Cứu Hộ Khẩn Cấp</div>
                    <div className="text-2xl font-bold text-emerald-400 tracking-tight">&lt; 60 Phút</div>
                    <div className="text-[12px] text-slate-400 mt-1">Có mặt xử lý nội thành 24/7</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">Nhân Sự Kỹ Thuật</div>
                    <div className="text-2xl font-bold text-white tracking-tight">100%</div>
                    <div className="text-[12px] text-slate-400 mt-1">Kỹ sư chính quy Hải Phát</div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#4a7bbf]" />
                    Bảo hiểm kỹ thuật toàn diện
                  </span>
                  <span className="font-mono text-slate-500">ISO 9001:2015</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
