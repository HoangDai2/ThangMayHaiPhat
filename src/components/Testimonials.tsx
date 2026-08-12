"use client";
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useReviewsData } from '../hooks/useReviewsData';
import ReviewForm from './ReviewForm';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className={i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { reviews, loading } = useReviewsData();
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (reviews.length > 0) setCurrent(0);
  }, [reviews.length]);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  const visible = reviews.length > 0
    ? [
        reviews[current],
        reviews[(current + 1) % reviews.length],
        reviews[(current + 2) % reviews.length],
      ]
    : [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-[#285c9a] text-sm font-semibold tracking-widest uppercase mb-3">
              Khách hàng nói gì
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Đánh Giá Từ Khách Hàng
            </h2>
          </div>

          {/* Navigation + CTA */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={reviews.length < 3}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#285c9a] hover:text-[#285c9a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                disabled={reviews.length < 3}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#285c9a] hover:text-[#285c9a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#285c9a] text-white rounded-xl text-sm font-semibold hover:bg-[#1e4a80] transition-colors"
            >
              <Star size={15} className="fill-white" />
              Viết đánh giá
            </button>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="w-7 h-7 rounded bg-gray-100" />
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <div key={s} className="w-3 h-3 rounded bg-gray-100" />
                    ))}
                  </div>
                </div>
                <div className="space-y-2 mb-5">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-4/5" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
                <div className="h-5 bg-gray-100 rounded-full w-40 mb-5" />
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100" />
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-100 rounded w-24" />
                    <div className="h-2 bg-gray-100 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : visible.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-5">
            {visible.map((t, i) => (
              <div
                key={t.id}
                className={`bg-white rounded-2xl p-6 border transition-all duration-300 ${
                  i === 0
                    ? 'border-[#285c9a]/30 shadow-lg shadow-[#285c9a]/5'
                    : 'border-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Quote size={28} className="text-[#285c9a]/15 fill-[#285c9a]/10" />
                  <Stars count={t.rating} />
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-4">{t.text}</p>

                {t.project && (
                  <div className="text-xs text-[#285c9a] font-medium bg-[#285c9a]/8 px-3 py-1.5 rounded-full inline-block mb-5">
                    {t.project}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#285c9a]/10 flex items-center justify-center text-[#285c9a] font-semibold text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-gray-900 font-semibold text-sm">{t.name}</div>
                    {t.role && <div className="text-gray-400 text-xs">{t.role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-sm mb-4">Chưa có đánh giá nào. Hãy là người đầu tiên chia sẻ!</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#285c9a] text-white rounded-xl text-sm font-semibold hover:bg-[#1e4a80] transition-colors"
            >
              <Star size={15} className="fill-white" />
              Viết đánh giá đầu tiên
            </button>
          </div>
        )}

        {/* Dot indicators */}
        {reviews.length > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? 'w-6 h-2 bg-[#285c9a]' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '5+', label: 'Năm kinh nghiệm' },
            { value: '1000+', label: 'Công trình hoàn thành' },
            { value: '98%', label: 'Tỷ lệ hài lòng' },
            { value: '5★', label: 'Đánh giá trung bình' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center py-5 bg-white rounded-xl border border-gray-100">
              <div className="text-2xl font-bold text-[#285c9a] mb-1">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-xl my-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Viết đánh giá</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Đóng"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-6">
              <ReviewForm />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
