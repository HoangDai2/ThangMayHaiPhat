"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Loader2, Star, ToggleLeft, ToggleRight } from 'lucide-react';
import api from '../../lib/api';
import { DbReview } from '../../lib/types';
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
    try {
      const response = await api.get('/admin/reviews');
      if (response.data) setReviews(response.data);
    } catch (e) {
      console.error(e);
    }
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

    try {
      if (editingId) {
        await api.put(`/admin/reviews/${editingId}`, payload);
      } else {
        await api.post('/admin/reviews', payload);
      }
      await fetchReviews();
      closeModal();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Xóa đánh giá của "${name}"?`)) return;
    try {
      await api.delete(`/admin/reviews/${id}`);
      await fetchReviews();
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
  };

  const togglePublish = async (review: DbReview) => {
    try {
      await api.put(`/admin/reviews/${review.id}`, { is_published: !review.is_published });
      await fetchReviews();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quản lý đánh giá</h1>
          <p className="text-slate-500 mt-1">{reviews.length} đánh giá</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm đánh giá
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start gap-4">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 font-semibold text-lg flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{review.name}</p>
                      <p className="text-sm text-slate-500">{review.role}</p>
                    </div>
                    <button
                      onClick={() => togglePublish(review)}
                      className={`flex items-center gap-1 text-xs ${review.is_published ? 'text-green-600' : 'text-slate-400'}`}
                    >
                      {review.is_published ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                      {review.is_published ? 'Hiện' : 'Ẩn'}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-orange-400 text-orange-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-sm mt-3 line-clamp-3">{review.text}</p>
              {review.project && (
                <p className="text-xs text-slate-400 mt-2">{review.project}</p>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEdit(review)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(review.id, review.name)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? 'Sửa đánh giá' : 'Thêm đánh giá mới'}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tên khách hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Nguyễn Văn Minh"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Chức danh / Vai trò</label>
                <input
                  type="text"
                  value={form.role || ''}
                  onChange={(e) => set('role', e.target.value)}
                  placeholder="Chủ hộ, Biệt thự Ecopark"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <ImageUpload
                label="Ảnh đại diện"
                value={form.avatar || ''}
                onChange={(url) => set('avatar', url)}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Đánh giá (số sao)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => set('rating', star)}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${star <= (form.rating || 5) ? 'fill-orange-400 text-orange-400' : 'text-slate-200 hover:text-orange-200'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung đánh giá</label>
                <textarea
                  value={form.text || ''}
                  onChange={(e) => set('text', e.target.value)}
                  rows={4}
                  placeholder="Hải Phát đã lắp đặt thang máy gia đình..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dự án liên quan</label>
                <input
                  type="text"
                  value={form.project || ''}
                  onChange={(e) => set('project', e.target.value)}
                  placeholder="Thang máy gia đình · 5 tầng"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Thứ tự</label>
                  <input
                    type="number"
                    value={form.sort_order || 0}
                    onChange={(e) => set('sort_order', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div className="flex items-end gap-3 pb-1">
                  <label className="text-sm font-medium text-slate-700">Hiển thị</label>
                  <button
                    type="button"
                    onClick={() => set('is_published', !form.is_published)}
                    className={form.is_published ? 'text-green-500' : 'text-slate-300'}
                  >
                    {form.is_published ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
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
