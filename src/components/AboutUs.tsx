"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
                <CountUp end={10} suffix="+" started={isVisible} />
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
                <CountUp end={4000} suffix="+" started={isVisible} />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Thang máy lắp đặt</div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center lg:px-4 space-y-1">
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#285c9a] tracking-tight tabular-nums">
                <CountUp end={95} suffix="%" started={isVisible} />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Title, Full Paragraph & CTA button wrapped in a styled card box */}
      <div className="w-full">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 px-5 sm:px-8 md:px-12 py-4 sm:py-5 lg:py-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-300/40 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[#285c9a] font-semibold tracking-widest uppercase text-xs sm:text-sm">
                Về chúng tôi
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                Giới thiệu về Thang máy Hải Phát
              </h2>
            </div>
            <div className="shrink-0">
              <Link
                href="/ve-chung-toi"
                className="inline-flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4676] text-white px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md group w-fit whitespace-nowrap"
              >
                <span>Tìm hiểu thêm về chúng tôi</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed text-justify w-full">
            Được thành lập vào năm 2020, Thang Máy Hải Phát có trụ sở tại Tầng 11, Tòa Nhà Đa Năng, 169 Đ. Nguyễn Ngọc Vũ, Yên Hòa, Hà Nội, Việt Nam và hoạt động trong lĩnh vực cung cấp, lắp đặt, bảo trì thang máy. Chúng tôi cung cấp các giải pháp thang máy toàn diện, cam kết mang đến những sản phẩm an toàn, bền bỉ và có tính thẩm mỹ cao. Hải Phát sử dụng thiết bị đồng bộ liên doanh từ các thương hiệu uy tín như Mitsubishi, Fuji, Sicor Italy, Montanari, Schneider và Ziehl-Abegg. Tất cả thiết bị, linh kiện chính đều có đầy đủ chứng chỉ CO (Certificate of Origin) và CQ (Certificate of Quality), đảm bảo nguồn gốc xuất xứ rõ ràng, chất lượng đạt tiêu chuẩn và mang đến sự an tâm cho khách hàng trong suốt quá trình sử dụng.
          </p>
        </div>
      </div>
    </div>
  );
}