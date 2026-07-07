import { useState } from 'react';
import { Star, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { submitReview } from '../hooks/useReviewsData';

export default function ReviewForm() {
  const [form, setForm] = useState({ name: '', role: '', text: '', project: '' });
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      setError('Vui lòng nhập tên và nội dung đánh giá');
      return;
    }
    setSubmitting(true);
    setError('');

    const { error } = await submitReview({
      name: form.name.trim(),
      role: form.role.trim(),
      rating,
      text: form.text.trim(),
      project: form.project.trim(),
    });

    setSubmitting(false);
    if (error) {
      setError('Không thể gửi đánh giá. Vui lòng thử lại sau.');
      return;
    }
    setSuccess(true);
    setForm({ name: '', role: '', text: '', project: '' });
    setRating(5);
    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Chia sẻ đánh giá của bạn</h3>
        <p className="text-sm text-gray-500">
          Trải nghiệm của bạn sẽ giúp nhiều khách hàng khác đưa ra quyết định tốt hơn.
        </p>
      </div>

      {success && (
        <div className="mb-5 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 size={18} className="flex-shrink-0" />
          Cảm ơn bạn! Đánh giá của bạn đã được gửi và sẽ hiển thị sau khi được duyệt.
        </div>
      )}

      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Đánh giá của bạn <span className="text-red-400">*</span>
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={28}
                  className={
                    star <= (hover || rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-200 fill-gray-200'
                  }
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating === 5 ? 'Rất hài lòng' : rating === 4 ? 'Hài lòng' : rating === 3 ? 'Bình thường' : rating === 2 ? 'Không hài lòng' : 'Rất tệ'}
            </span>
          </div>
        </div>

        {/* Name & Role */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Họ và tên <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#285c9a] focus:ring-1 focus:ring-[#285c9a]/20 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Chức danh / Vai trò
            </label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Chủ hộ, Khách sạn X..."
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#285c9a] focus:ring-1 focus:ring-[#285c9a]/20 transition-colors"
            />
          </div>
        </div>

        {/* Project */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Dự án / Sản phẩm đã sử dụng
          </label>
          <input
            type="text"
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            placeholder="Thang máy gia đình · 5 tầng"
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#285c9a] focus:ring-1 focus:ring-[#285c9a]/20 transition-colors"
          />
        </div>

        {/* Text */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Nội dung đánh giá <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm và dịch vụ của Hải Phát..."
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-[#285c9a] focus:ring-1 focus:ring-[#285c9a]/20 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="group w-full flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#285c9a]/25 hover:shadow-[#285c9a]/40"
        >
          {submitting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              Gửi đánh giá
              <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          Đánh giá sẽ được duyệt trước khi hiển thị công khai
        </p>
      </form>
    </div>
  );
}
