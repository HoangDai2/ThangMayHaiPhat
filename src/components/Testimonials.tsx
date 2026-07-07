import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Văn Minh',
    role: 'Chủ hộ, Biệt thự Ecopark',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    rating: 5,
    text: 'Hải Phát đã lắp đặt thang máy gia đình cho biệt thự của tôi rất chuyên nghiệp. Đội thợ làm việc gọn gàng, đúng tiến độ. Thang máy hoạt động êm ái, thiết kế cabin kính rất đẹp. Tôi rất hài lòng và sẽ giới thiệu cho bạn bè.',
    project: 'Thang máy gia đình · 5 tầng',
  },
  {
    id: 2,
    name: 'Trần Thị Hoa',
    role: 'Giám đốc, Khách sạn Mường Thanh',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    rating: 5,
    text: 'Chúng tôi đã tin tưởng Hải Phát lắp đặt 4 thang máy tải khách cho khách sạn 12 tầng. Chất lượng vượt kỳ vọng, hệ thống hoạt động ổn định sau 2 năm không có sự cố. Dịch vụ bảo trì định kỳ rất chu đáo.',
    project: 'Thang máy tải khách · 12 tầng',
  },
  {
    id: 3,
    name: 'Lê Hoàng Nam',
    role: 'Kiến trúc sư, Studio NAM',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    rating: 5,
    text: 'Tôi thường xuyên hợp tác với Hải Phát trong các dự án thiết kế nội thất cao cấp. Họ luôn tư vấn giải pháp phù hợp nhất với không gian, đảm bảo thẩm mỹ và tính năng. Đây là đối tác tin cậy của tôi.',
    project: 'Thang máy gia đình · Nhiều dự án',
  },
  {
    id: 4,
    name: 'Phạm Thị Lan',
    role: 'Chủ nhà, Quận 7, TP.HCM',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    rating: 5,
    text: 'Nhà tôi 4 tầng, lắp thang máy Hải Phát đã hơn 3 năm. Ba mẹ tôi cao tuổi đi lại rất thuận tiện. Khi có sự cố nhỏ, gọi là có thợ đến ngay trong vòng 1-2 giờ. Rất yên tâm khi sử dụng.',
    project: 'Thang máy gia đình · 4 tầng',
  },
];

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
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#285c9a] hover:text-[#285c9a] transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#285c9a] hover:text-[#285c9a] transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
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
              {/* Quote icon */}
              <div className="flex items-start justify-between mb-4">
                <Quote size={28} className="text-[#285c9a]/15 fill-[#285c9a]/10" />
                <Stars count={t.rating} />
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-4">{t.text}</p>

              {/* Project tag */}
              <div className="text-xs text-[#285c9a] font-medium bg-[#285c9a]/8 px-3 py-1.5 rounded-full inline-block mb-5">
                {t.project}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <div className="text-gray-900 font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
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

        {/* Trust badges */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '15+', label: 'Năm kinh nghiệm' },
            { value: '500+', label: 'Công trình hoàn thành' },
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
    </section>
  );
}
