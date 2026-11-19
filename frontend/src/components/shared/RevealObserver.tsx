"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const STAGGER_SELECTOR = '[data-reveal-stagger]';
const SINGLE_SELECTOR = '[data-reveal]';

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Kiểm tra môi trường & Accessibility
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let observer: IntersectionObserver | null = null;

    // Đợi 1 frame để Next.js hoàn tất render DOM sau khi chuyển trang
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;

            // Nếu phần tử chưa được thiết lập trạng thái ban đầu
            if (!el.dataset.revealArmed) {
              el.dataset.revealArmed = '1';

              // Nếu đã nằm trong màn hình đầu tiên (above the fold) -> hiển thị ngay lập tức
              if (entry.boundingClientRect.top < window.innerHeight * 0.88) {
                obs.unobserve(el);
                return;
              }

              // Nếu nằm phía dưới -> gán trạng thái chờ (pending = opacity 0)
              if (el.matches(STAGGER_SELECTOR)) {
                Array.from(el.children).forEach((child) => {
                  (child as HTMLElement).dataset.revealState = 'pending';
                });
              } else {
                el.dataset.revealState = 'pending';
              }
              return;
            }

            // Khi cuộn vào tầm nhìn viewport (isIntersecting)
            if (entry.isIntersecting) {
              if (el.matches(STAGGER_SELECTOR)) {
                // Hiệu ứng Stagger so le: mỗi phần tử con cách nhau 80ms
                Array.from(el.children).forEach((child, index) => {
                  const childEl = child as HTMLElement;
                  childEl.style.animationDelay = `${80 * Math.min(index, 8)}ms`;
                  childEl.dataset.revealState = 'in';
                });
              } else {
                el.dataset.revealState = 'in';
              }

              // Chỉ animate 1 lần -> dừng theo dõi để tối ưu GPU & CPU
              obs.unobserve(el);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px -10% 0px',
        }
      );

      // Thu thập các phần tử cần animate
      const elementsToObserve = new Set<HTMLElement>();

      // 1. Các phần tử stagger tường minh (lưới sản phẩm, danh sách thẻ...)
      document.querySelectorAll<HTMLElement>(STAGGER_SELECTOR).forEach((el) => {
        elementsToObserve.add(el);
      });

      // 2. Các phần tử reveal đơn lẻ
      document.querySelectorAll<HTMLElement>(SINGLE_SELECTOR).forEach((el) => {
        elementsToObserve.add(el);
      });

      // 3. Tự động áp dụng cho các section chính trên toàn trang
      document.querySelectorAll<HTMLElement>('main section:not([data-reveal-skip])').forEach((sec) => {
        if (!sec.hasAttribute('data-reveal') && !sec.hasAttribute('data-reveal-stagger')) {
          sec.setAttribute('data-reveal', 'true');
          elementsToObserve.add(sec);
        }
      });

      elementsToObserve.forEach((el) => observer?.observe(el));
    }, 60);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  return null;
}
