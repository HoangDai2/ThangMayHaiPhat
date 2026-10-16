"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Building2, Award } from 'lucide-react';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  started: boolean;
}

function CountUp({ end, suffix = '', duration = 1200, started }: CountUpProps) {
  const [count, setCount] = useState(end);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    setCount(0);
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, started]);

  return <>{count}{suffix}</>;
}

export default function AboutUs() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Double-Bezel Media Frame */}
        <div className="lg:col-span-6 relative">
          <div className="card-double-bezel">
            <div className="card-inner-core overflow-hidden relative aspect-[4/3] rounded-[calc(1rem-1px)]">
              <img
                src="/472899435_953879650042855_3929925804925066729_n.jpg"
                alt="Đội ngũ kỹ sư Thang Máy Hải Phát triển khai dự án"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Floating Telemetry Badge */}
          <div className="absolute -bottom-5 left-6 sm:left-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-5 flex items-center gap-4 border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#285c9a]">
              <Award size={26} />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#285c9a] font-mono tracking-tight">
                <CountUp end={5} suffix="+" started={isVisible} />
              </div>
              <div className="text-xs text-slate-600 font-medium">
                Năm đồng hành kiến tạo
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content & Core Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#285c9a] font-mono text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#285c9a]" />
              <span>Năng Lực & Uy Tín Doanh Nghiệp</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0d1f35] tracking-tight leading-tight">
              Hải Phát – Nâng Tầm Không Gian Sống Việt
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Được thành lập với sứ mệnh định hình chuẩn mực an toàn và thẩm mỹ cơ điện, <b>Thang Máy Hải Phát</b> cung cấp giải pháp lắp đặt, hiện đại hóa và bảo trì toàn diện. Mọi chi tiết kỹ thuật đều được đo kiểm nghiêm ngặt trước khi bàn giao.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
              <ShieldCheck size={14} className="text-[#285c9a]" />
              Chứng chỉ CO/CQ 100%
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
              <Building2 size={14} className="text-slate-600" />
              Linh kiện chính hãng Fuji & Montanari
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 border-y border-slate-100">
            {[
              'Tư vấn giải pháp may đo chuẩn kiến trúc',
              'Thi công đúng tiến độ cam kết trong hợp đồng',
              'Linh kiện nhập khẩu nguyên đai nguyên kiện',
              'Đội ngũ kỹ sư chính hãng đào tạo chuyên sâu'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#285c9a] shrink-0 mt-0.5" />
                <span className="text-slate-700 text-xs sm:text-sm font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-1">
            <Link
              href="/ve-chung-toi"
              className="group inline-flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-[#285c9a]/20 hover:shadow-lg active:scale-[0.98]"
            >
              <span>Tìm hiểu về Hải Phát</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}