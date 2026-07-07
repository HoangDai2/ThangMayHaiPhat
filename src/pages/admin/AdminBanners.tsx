import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Loader2, Image, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase, DbBanner } from '../../lib/supabase';
import ImageUpload from '../../components/admin/ImageUpload';

const POSITIONS = ['hero', 'sub', 'sidebar'];

const emptyForm = (): Partial<DbBanner> => ({
  title: '',
  subtitle: '',
  image_url: '',
  link_url: '',
  position: 'hero',
  sort_order: 0,
  is_active: true,
});

export default function AdminBanners() {
  const [banners, setBanners] = useState<DbBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<DbBanner>>(emptyForm());
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setBanners(data);
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setEditingId(null);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (banner: DbBanner) => {
    setForm({ ...banner });
    setEditingId(banner.id);
    setError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setError('');
  };

  const set = (field: keyof DbBanner, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.title?.trim()) {
      setError('Tiêu đề là bắt buộc');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      title: form.title!.trim(),
      subtitle: form.subtitle || '',
      image_url: form.image_url || '',
      link_url: form.link_url || '',
      position: form.position || 'hero',
      sort_order: form.sort_order || 0,
      is_active: form.is_active ?? true,
    };

    let err;
    if (editingId) {
      ({ error: err } = await supabase.from('banners').update(payload).eq('id', editingId));
    } else {
      ({ error: err } = await supabase.from('banners').insert(payload));
    }

    if (err) {
      setError(err.message);
    } else {
      await fetchBanners();
      closeModal();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Xóa banner "${title}"?`)) return;
    await supabase.from('banners').delete().eq('id', id);
    await fetchBanners();
  };

  const toggleActive = async (banner: DbBanner) => {
    await supabase.from('banners').update({ is_active: !banner.is_active }).eq('id', banner.id);
    await fetchBanners();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quản lý banner</h1>
          <p className="text-slate-500 mt-1">{banners.length} banner</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm banner
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative h-40 overflow-hidden bg-slate-100">
                {banner.image_url ? (
                  <img
                    src={banner.image_url}
                    alt={banner.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <Image className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold text-sm">{banner.title}</p>
                  <p className="text-white/80 text-xs">{banner.subtitle}</p>
                </div>
                <span className="absolute top-3 left-3 px-2 py-1 bg-black/50 text-white rounded-full text-xs">
                  {banner.position}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-500 text-xs">Thứ tự: {banner.sort_order}</span>
                  <button
                    onClick={() => toggleActive(banner)}
                    className={`flex items-center gap-1 text-xs ${banner.is_active ? 'text-green-600' : 'text-slate-400'}`}
                  >
                    {banner.is_active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    {banner.is_active ? 'Hiện' : 'Ẩn'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(banner)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id, banner.title)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
          {banners.length === 0 && (
            <div className="col-span-2 bg-white rounded-xl p-12 text-center text-slate-500">
              Chưa có banner nào
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? 'Sửa banner' : 'Thêm banner mới'}
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
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Khuyến mãi mùa hè 2024"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề phụ</label>
                <input
                  type="text"
                  value={form.subtitle || ''}
                  onChange={(e) => set('subtitle', e.target.value)}
                  placeholder="Giảm 15% chi phí lắp đặt"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <ImageUpload
                label="Ảnh banner"
                value={form.image_url || ''}
                onChange={(url) => set('image_url', url)}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Đường dẫn</label>
                  <input
                    type="text"
                    value={form.link_url || ''}
                    onChange={(e) => set('link_url', e.target.value)}
                    placeholder="/san-pham"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vị trí</label>
                  <select
                    value={form.position || 'hero'}
                    onChange={(e) => set('position', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    {POSITIONS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Thứ tự sắp xếp</label>
                <input
                  type="number"
                  value={form.sort_order || 0}
                  onChange={(e) => set('sort_order', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Hiển thị</label>
                <button
                  type="button"
                  onClick={() => set('is_active', !form.is_active)}
                  className={form.is_active ? 'text-green-500' : 'text-slate-300'}
                >
                  {form.is_active ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
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
                {editingId ? 'Lưu thay đổi' : 'Thêm banner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
