"use client";

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useReviewsData } from '../hooks/useReviewsData';
import ReviewForm from './ReviewForm';
import SectionHeader from './shared/SectionHeader';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 shrink-0" aria-label={`${count} sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? 'text-[#EEBF4F] fill-[#EEBF4F]' : 'text-slate-200 fill-slate-200'}
        />
      ))}
    </div>
  );
}

function getNameInitial(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'K';
  const givenName = parts[parts.length - 1];
  return givenName.charAt(0).toUpperCase();
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
      : reviews.length < 2
      ? reviews
      : [
          reviews[current],
          reviews[(current + 1) % reviews.length],
        ];

  return (
    <section className="pt-8 sm:pt-12 lg:pt-12 pb-12 sm:pb-16 lg:pb-16 bg-[#F3F4F5] border-b border-slate-200/60">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Actions */}
        <SectionHeader
          align="left"
          badge="Phản Hồi & Trải Nghiệm Khách Hàng"
          title="Đánh Giá Thực Tế Từ Các Gia Chủ"
          subtitle="Sự hài lòng và an tâm tuyệt đối của khách hàng chính là thước đo giá trị cao nhất cho chất lượng công trình của Thang Máy Hải Phát."
          className="mb-10"
          action={
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-1 rounded-xl shadow-sm">
                <button
                  onClick={prev}
                  disabled={reviews.length < 2}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#002349] hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Đánh giá trước"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  disabled={reviews.length < 2}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#002349] hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
          }
        />

        {/* Reviews Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 sm:p-8 border border-[#002349]/10 animate-pulse space-y-5">
                <div className="space-y-2.5">
                  <div className="h-3.5 bg-slate-100 rounded w-full" />
                  <div className="h-3.5 bg-slate-100 rounded w-11/12" />
                  <div className="h-3.5 bg-slate-100 rounded w-4/5" />
                  <div className="h-3.5 bg-slate-100 rounded w-2/3" />
                </div>
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-slate-100" />
                    <div className="space-y-1.5">
                      <div className="h-3.5 bg-slate-100 rounded w-24" />
                      <div className="h-2.5 bg-slate-100 rounded w-32" />
                    </div>
                  </div>
                  <div className="w-24 h-4 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : visible.length > 0 ? (
          <div data-reveal-stagger="true" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((t, i) => (
              <div
                key={`${t.id || 'review'}-${i}`}
                className="relative overflow-hidden bg-white rounded-xl p-6 sm:p-8 border border-[#002349]/10 shadow-[0_2px_12px_rgba(0,35,73,0.04)] hover:border-[#002349]/25 hover:shadow-[0_6px_20px_rgba(0,35,73,0.08)] transition-all duration-200 flex flex-col justify-between"
              >
                {/* Subtle watermark quote mark at top-right */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 36"
                  className="pointer-events-none select-none absolute -top-1 right-5 w-12 h-10 text-slate-100 fill-current"
                >
                  <path d="M18.6 0C20.2 3.2 21 6.8 21 10.8c0 9.6-5.7 18.2-15.6 24.4L0 29.8c5.6-3.7 8.9-7.9 9.8-12.6H2.4V0h16.2zm26.4 0c1.6 3.2 2.4 6.8 2.4 10.8 0 9.6-5.7 18.2-15.6 24.4L26.4 29.8c5.6-3.7 8.9-7.9 9.8-12.6h-7.4V0H45z" />
                </svg>

                <p className="relative z-10 text-[#041527] text-[15px] leading-[1.75] font-normal mb-6">
                  {t.text}
                </p>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#002349] text-[#EEBF4F] flex items-center justify-center font-bold text-base shrink-0">
                        {getNameInitial(t.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-[#041527] font-bold text-[15px] leading-snug truncate">
                        {t.name}
                      </div>
                      {t.role && (
                        <div className="text-[#7E8B9B] text-xs mt-0.5 truncate">
                          {t.role}
                        </div>
                      )}
                    </div>
                  </div>

                  <Stars count={t.rating} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-[#002349]/10">
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
        {reviews.length > 2 && (
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? 'w-6 h-2 bg-[#002349]' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
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
