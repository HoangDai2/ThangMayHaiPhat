"use client";
import { useEffect, useRef, useState } from 'react';

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
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-4">
      <div className="max-w-3xl space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          V&#7873; ch&#250;ng t&#244;i
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed">
          Thang M&#225;y H&#7843;i Ph&#225;t t&#7921; h&#224;o l&#224; &#273;&#417;n v&#7883; chuy&#234;n nghi&#7879;p h&#224;ng &#273;&#7847;u trong l&#297;nh v&#7921;c cung c&#7845;p, l&#7855;p &#273;&#7863;t v&#224; b&#7843;o tr&#236; thang m&#225;y. Ch&#250;ng t&#244;i mang &#273;&#7871;n cho kh&#225;ch h&#224;ng c&#225;c gi&#7843;i ph&#225;p thang m&#225;y to&#224;n di&#7879;n, t&#7915; thi&#7871;t k&#7871;, l&#7921;a ch&#7885;n thi&#7871;t b&#7883; ph&#249; h&#7907;p cho &#273;&#7871;n d&#7883;ch v&#7909; b&#7843;o h&#224;nh b&#7843;o tr&#236; tr&#7885;n g&#243;i. Cam k&#7871;t an to&#224;n, th&#7849;m m&#7929; v&#224; b&#7873;n b&#7881; theo th&#7901;i gian.
        </p>
      </div>

      <div ref={ref} className="w-full lg:w-[460px] shrink-0 flex justify-between items-center">
        <div className="space-y-8">
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight tabular-nums">
              <CountUp end={10} suffix="+" started={isVisible} />
            </div>
            <div className="text-sm text-slate-400 font-medium">N&#259;m kinh nghi&#7879;m</div>
          </div>
          
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight tabular-nums">
              <CountUp end={4000} suffix="+" started={isVisible} />
            </div>
            <div className="text-sm text-slate-400 font-medium">Thang m&#225;y l&#7855;p &#273;&#7863;t</div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight tabular-nums">
              <CountUp end={1000} suffix="+" started={isVisible} />
            </div>
            <div className="text-sm text-slate-400 font-medium">D&#7921; &#225;n th&#224;nh c&#244;ng</div>
          </div>

          <div className="space-y-1.5">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight tabular-nums">
              <CountUp end={95} suffix="%" started={isVisible} />
            </div>
            <div className="text-sm text-slate-400 font-medium">Kh&#225;ch h&#224;ng h&#224;i l&#242;ng</div>
          </div>
        </div>
      </div>
    </div>
  );
}