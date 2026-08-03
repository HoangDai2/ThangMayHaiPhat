"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Loader2, Star, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase, DbReview } from '../../lib/supabase';
import ImageUpload from '../../components/admin/ImageUpload';

const emptyForm = (): Partial<DbReview> => ({
  name: '',
  role: '',
  avatar: '',
  rating: 5,
  text: '',
  project: '',
  is_published: true,
  sort_order: 0,
});

export default function AdminReviews() {
  const [reviews, setReviews] = useState<DbReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<DbReview>>(emptyForm());
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setReviews(data);
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setEditingId(null);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (review: DbReview) => {
    setForm({ ...review });
    setEditingId(review.id);
    setError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setError('');
  };

  const set = (field: keyof DbReview, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.name?.trim()) {
      setError('Tên khách hàng là bắt buộc');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      name: form.name!.trim(),
      role: form.role || '',
      avatar: form.avatar || '',
      rating: form.rating ?? 5,
      text: form.text || '',
      project: form.project || '',
      is_published: form.is_published ?? true,
      sort_order: form.sort_order || 0,
    };

    let err;
    if (editingId) {
      ({ error: err } = await supabase.from('reviews').update(payload).eq('id', editingId));
    } else {
      ({ error: err } = await supabase.from('reviews').insert(payload));
    }

    if (err) {
      setError(err.message);
    } else {
      await fetchReviews();
      closeModal();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Xóa đánh giá của "${name}"?`)) return;
    await supabase.from('reviews').delete().eq('id', id);
    await fetchReviews();
  };

  const togglePublish = async (review: DbReview) => {
    await supabase.from('reviews').update({ is_published: !review.is_published }).eq('id', review.id);
    await fetchReviews();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản Lý Đánh Giá</h1>
          <p className="text-slate-500 text-sm mt-0.5">Tổng cộng {reviews.length} đánh giá từ khách hàng</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all"
        >
          <Plus className="w-4 h-4" />
          Thêm đánh giá mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5">
              <div className="flex items-start gap-4">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-slate-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#285c9a] border border-blue-100 flex items-center justify-center font-bold text-base flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{review.name}</p>
                      <p className="text-xs text-slate-500">{review.role}</p>
                    </div>
                    <button
                      onClick={() => togglePublish(review)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                        review.is_published 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                    >
                      {review.is_published ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                      {review.is_published ? 'Hiển thị' : 'Đang ẩn'}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-xs mt-3 line-clamp-3 leading-relaxed">{review.text}</p>
              {review.project && (
                <p className="text-xs text-slate-400 mt-2 font-medium">Dự án: {review.project}</p>
              )}
              <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => openEdit(review)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-700 rounded-xl hover:bg-blue-50 hover:text-[#285c9a] hover:border-blue-200 transition-all text-xs font-semibold"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(review.id, review.name)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-xl transition-all text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Xóa
                </button>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <div className="col-span-2 bg-white rounded-xl p-12 text-center text-slate-500">
              Chưa có đánh giá nào
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h2 className="text-lg font-bold text-slate-800">
                {editingId ? 'Chỉnh sửa đánh giá' : 'Thêm đánh giá mới'}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tên khách hàng <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Nguyễn Văn Minh"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Chức danh / Vai trò</label>
                <input
                  type="text"
                  value={form.role || ''}
                  onChange={(e) => set('role', e.target.value)}
                  placeholder="Chủ hộ, Biệt thự Ecopark"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <ImageUpload
                label="Ảnh đại diện"
                value={form.avatar || ''}
                onChange={(url) => set('avatar', url)}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Đánh giá (số sao)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => set('rating', star)}
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${star <= (form.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 hover:text-amber-200'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nội dung đánh giá</label>
                <textarea
                  value={form.text || ''}
                  onChange={(e) => set('text', e.target.value)}
                  rows={4}
                  placeholder="Hải Phát đã lắp đặt thang máy gia đình..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Dự án liên quan</label>
                <input
                  type="text"
                  value={form.project || ''}
                  onChange={(e) => set('project', e.target.value)}
                  placeholder="Thang máy gia đình · 5 tầng"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Thứ tự</label>
                  <input
                    type="number"
                    value={form.sort_order || 0}
                    onChange={(e) => set('sort_order', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Hiển thị</label>
                  <button
                    type="button"
                    onClick={() => set('is_published', !form.is_published)}
                    className={`transition-colors ${form.is_published ? 'text-emerald-600' : 'text-slate-300'}`}
                  >
                    {form.is_published ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 text-xs font-semibold transition-all"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-900/10 transition-all disabled:opacity-50"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? 'Lưu thay đổi' : 'Thêm đánh giá'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
