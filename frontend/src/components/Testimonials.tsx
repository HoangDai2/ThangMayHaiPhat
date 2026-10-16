"use client";

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Plus } from 'lucide-react';
import { useReviewsData } from '../hooks/useReviewsData';
import ReviewForm from './ReviewForm';
import SectionHeader from './shared/SectionHeader';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
        />
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

  const visible =
    reviews.length === 0
      ? []
      : reviews.length < 3
      ? reviews
      : [
          reviews[current],
          reviews[(current + 1) % reviews.length],
          reviews[(current + 2) % reviews.length],
        ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Actions */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#285c9a] font-mono text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#285c9a] animate-pulse" />
              <span>Phản Hồi & Trải Nghiệm Khách Hàng</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0d1f35] tracking-tight leading-tight">
              Đánh Giá Thực Tế Từ Các Gia Chủ
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Sự hài lòng và an tâm tuyệt đối của khách hàng chính là thước đo giá trị cao nhất cho chất lượng công trình của Thang Máy Hải Phát.
            </p>
          </div>

          {/* Navigation Controls & Write Review CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-1 rounded-xl shadow-sm">
              <button
                onClick={prev}
                disabled={reviews.length < 3}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#285c9a] hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Đánh giá trước"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                disabled={reviews.length < 3}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#285c9a] hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Đánh giá tiếp theo"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm shadow-[#285c9a]/20 active:scale-[0.98]"
            >
              <Plus size={15} className="group-hover:rotate-90 transition-transform" />
              <span>Gửi đánh giá</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 animate-pulse space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-8 h-8 rounded bg-slate-100" />
                  <div className="w-20 h-4 bg-slate-100 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-4/5" />
                  <div className="h-3 bg-slate-100 rounded w-2/3" />
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100" />
                  <div className="space-y-1">
                    <div className="h-3 bg-slate-100 rounded w-24" />
                    <div className="h-2 bg-slate-100 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : visible.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {visible.map((t, i) => (
              <div
                key={`${t.id || 'review'}-${i}`}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#285c9a]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote size={28} className="text-[#285c9a]/20 fill-[#285c9a]/10" />
                    <Stars count={t.rating} />
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed mb-5 line-clamp-4 italic">
                    "{t.text}"
                  </p>
                </div>

                <div>
                  {t.project && (
                    <div className="inline-block text-xs font-semibold text-[#285c9a] bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg mb-4">
                      {t.project}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#285c9a] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-slate-900 font-bold text-sm">{t.name}</div>
                      {t.role && <div className="text-slate-500 text-xs">{t.role}</div>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
            <p className="text-slate-500 text-sm mb-4">Chưa có phản hồi nào được hiển thị.</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#285c9a] text-white rounded-xl text-sm font-semibold hover:bg-[#1e4a80] transition-colors"
            >
              <Star size={15} className="fill-white" />
              <span>Gửi đánh giá đầu tiên</span>
            </button>
          </div>
        )}

        {/* Carousel Dots */}
        {reviews.length > 3 && (
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? 'w-6 h-2 bg-[#285c9a]' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Chuyển đến đánh giá ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Telemetry Proof Strip */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '5+ Năm', label: 'Kinh nghiệm chuyên môn' },
            { value: '1.000+', label: 'Công trình bàn giao' },
            { value: '98%', label: 'Tỷ lệ hài lòng tuyệt đối' },
            { value: '5.0 / 5★', label: 'Điểm đánh giá dịch vụ' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="text-xl sm:text-2xl font-extrabold text-[#285c9a] font-mono mb-1">{value}</div>
              <div className="text-xs text-slate-500 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-xl my-8 shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#0d1f35] text-white">
              <div>
                <h3 className="text-lg font-bold">Chia Sẻ Đánh Giá Của Bạn</h3>
                <p className="text-xs text-blue-200 mt-0.5">Ý kiến đóng góp giúp Hải Phát hoàn thiện dịch vụ tốt hơn</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Đóng biểu mẫu"
              >
                ✕
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
