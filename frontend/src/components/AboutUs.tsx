"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  started: boolean;
}

function CountUp({ end, suffix = '', duration = 2000, started }: CountUpProps) {
  const [count, setCount] = useState(0);

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

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, started]);

  return <>{started ? count : 0}{suffix}</>;
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
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Top: Floating Stats Box overlapping the Hero Banner (Image 2 style) */}
      <div
        ref={ref}
        className="-mt-10 sm:-mt-12 lg:-mt-16 relative z-20 max-w-6xl mx-auto w-full px-2 sm:px-6 mb-4 sm:mb-5 lg:mb-6"
      >
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 p-4 sm:p-5 lg:p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-300/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-slate-100">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center lg:px-4 space-y-1">
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#285c9a] tracking-tight tabular-nums">
                <CountUp end={5} suffix="+" started={isVisible} />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Năm kinh nghiệm</div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center lg:px-4 space-y-1">
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#285c9a] tracking-tight tabular-nums">
                <CountUp end={1000} suffix="+" started={isVisible} />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Dự án thành công</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center lg:px-4 space-y-1">
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#285c9a] tracking-tight tabular-nums">
                <CountUp end={34} started={isVisible} />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Tỉnh thành</div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center lg:px-4 space-y-1">
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#285c9a] tracking-tight tabular-nums">
                <CountUp end={98} suffix="%" started={isVisible} />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: 2-column Layout */}
      <div className="w-full px-5 sm:px-8 md:px-14 mt-8 sm:mt-12 lg:mt-16 mb-12 sm:mb-16 lg:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image & Badge */}
          <div className="relative">
            {/* Decorative background shapes */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#f0f4f8] rounded-3xl -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 border-[16px] border-[#f0f4f8] rounded-full -z-10"></div>

            <div className="relative rounded-3xl overflow-hidden bg-[#f0f4f8] aspect-[4/3] flex items-center justify-center shadow-lg border border-slate-100">
              <img
                src="/472899435_953879650042855_3929925804925066729_n.jpg"
                alt="Đội ngũ Hải Phát đang triển khai giải pháp thang máy"
                className="w-full h-full object-cover text-sm text-slate-500"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 left-6 sm:left-10 bg-white rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col gap-1 z-10 border border-slate-50">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#285c9a] flex items-center tracking-tight">
                <CountUp end={5} suffix="+" started={isVisible} />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium max-w-[130px] leading-snug">
                Năm đồng hành cùng khách hàng
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-block">
                <span className="text-[#285c9a] font-bold tracking-widest uppercase text-xs sm:text-sm">
                  Về chúng tôi
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-[1.2]">
                Hải Phát – Nâng tầm không gian sống Việt
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Được thành lập năm 2015, <b>Thang Máy Hải Phát</b> chuyên cung cấp giải pháp lắp đặt và bảo trì thang máy toàn diện, mang đến sản phẩm an toàn, bền bỉ và thẩm mỹ.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                  <ShieldCheck size={14} />
                  Chứng chỉ CO/CQ
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200">
                  <Building2 size={14} />
                  Thiết bị Liên doanh Chính hãng
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 py-2">
              {[
                'Tư vấn giải pháp phù hợp',
                'Thi công đúng tiến độ',
                'Linh kiện chính hãng',
                'Bảo hành và hỗ trợ 24/7'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#285c9a] shrink-0" />
                  <span className="text-slate-700 font-medium text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/ve-chung-toi"
                className="inline-flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4676] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg group w-fit"
              >
                <span>Tìm hiểu về Hải Phát</span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}