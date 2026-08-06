"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, Image } from 'lucide-react';
import { supabase, DbProject } from '../../lib/supabase';
import ArrayInput from '../../components/admin/ArrayInput';

const CATEGORIES = ['Gia đình', 'Tải khách', 'Thương mại', 'Tải hàng'];

const emptyForm = (): Partial<DbProject> => ({
  slug: '',
  title: '',
  location: '',
  category: 'Gia đình',
  image: '',
  specs: '',
  description: '',
  floors: 1,
  capacity: '',
  speed: '',
  brand: '',
  completion_date: '',
  warranty: '',
  features: [],
  gallery: [],
  testimonial: null,
});

export default function AdminProjects() {
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<DbProject>>(emptyForm());
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setProjects(data);
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setEditingId(null);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (project: DbProject) => {
    setForm({ ...project });
    setEditingId(project.id);
    setError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setError('');
  };

  const handleSave = async () => {
    if (!form.title?.trim() || !form.slug?.trim()) {
      setError('Tiêu đề và slug là bắt buộc');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      slug: form.slug!.trim(),
      title: form.title!.trim(),
      location: form.location || '',
      category: form.category || 'Gia đình',
      image: form.image || '',
      specs: form.specs || '',
      description: form.description || '',
      floors: form.floors || 1,
      capacity: form.capacity || '',
      speed: form.speed || '',
      brand: form.brand || '',
      completion_date: form.completion_date || '',
      warranty: form.warranty || '',
      features: form.features || [],
      gallery: form.gallery || [],
      testimonial: form.testimonial || null,
    };

    let err;
    if (editingId) {
      ({ error: err } = await supabase.from('projects').update(payload).eq('id', editingId));
    } else {
      ({ error: err } = await supabase.from('projects').insert(payload));
    }

    if (err) {
      setError(err.message);
    } else {
      await fetchProjects();
      closeModal();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Xóa dự án "${title}"?`)) return;
    await supabase.from('projects').delete().eq('id', id);
    await fetchProjects();
  };

  const set = (field: keyof DbProject, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản Lý Dự Án</h1>
          <p className="text-slate-500 text-sm mt-0.5">Tổng cộng {projects.length} dự án đã đăng ký</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all"
        >
          <Plus className="w-4 h-4" />
          Thêm dự án mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, địa điểm, thông số..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#285c9a] focus:border-transparent outline-none text-sm font-medium transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          {['all', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#285c9a] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <Image className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight">{project.title}</p>
                  <p className="text-blue-100/90 text-xs mt-0.5">{project.location}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-2.5 py-1 bg-blue-50 text-[#285c9a] border border-blue-100 rounded-lg text-xs font-semibold">
                    {project.category}
                  </span>
                  <span className="text-slate-500 text-xs font-medium">{project.completion_date}</span>
                </div>
                <p className="text-slate-600 text-xs mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openEdit(project)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-700 rounded-xl hover:bg-blue-50 hover:text-[#285c9a] hover:border-blue-200 transition-all text-xs font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="flex items-center justify-center p-2 bg-slate-50 border border-slate-200/70 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-xl transition-all"
                    title="Xóa dự án"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h2 className="text-lg font-bold text-slate-800">
                {editingId ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Slug (URL) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.slug || ''}
                    onChange={(e) => set('slug', e.target.value)}
                    placeholder="villa-ecopark"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Danh mục
                  </label>
                  <select
                    value={form.category || 'Gia đình'}
                    onChange={(e) => set('category', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tên dự án <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Biệt thự Vinhomes Ocean Park"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Địa điểm</label>
                  <input
                    type="text"
                    value={form.location || ''}
                    onChange={(e) => set('location', e.target.value)}
                    placeholder="Hà Nội"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Thông số ngắn</label>
                  <input
                    type="text"
                    value={form.specs || ''}
                    onChange={(e) => set('specs', e.target.value)}
                    placeholder="Thang máy gia đình · 4 tầng"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">URL ảnh đại diện</label>
                <input
                  type="text"
                  value={form.image || ''}
                  onChange={(e) => set('image', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
                {form.image && (
                  <img src={form.image} alt="preview" className="mt-2 h-24 rounded-xl object-cover border border-slate-200" />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Mô tả</label>
                <textarea
                  value={form.description || ''}
                  onChange={(e) => set('description', e.target.value)}
                  rows={3}
                  placeholder="Mô tả chi tiết dự án..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Số tầng</label>
                  <input
                    type="number"
                    min={1}
                    value={form.floors || 1}
                    onChange={(e) => set('floors', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tải trọng</label>
                  <input
                    type="text"
                    value={form.capacity || ''}
                    onChange={(e) => set('capacity', e.target.value)}
                    placeholder="320 kg"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tốc độ</label>
                  <input
                    type="text"
                    value={form.speed || ''}
                    onChange={(e) => set('speed', e.target.value)}
                    placeholder="0.5 m/s"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Thương hiệu</label>
                  <input
                    type="text"
                    value={form.brand || ''}
                    onChange={(e) => set('brand', e.target.value)}
                    placeholder="Mitsubishi"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Hoàn thành</label>
                  <input
                    type="text"
                    value={form.completion_date || ''}
                    onChange={(e) => set('completion_date', e.target.value)}
                    placeholder="Tháng 3/2024"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Bảo hành</label>
                  <input
                    type="text"
                    value={form.warranty || ''}
                    onChange={(e) => set('warranty', e.target.value)}
                    placeholder="5 năm"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
              </div>

              <ArrayInput
                label="Tính năng"
                values={form.features || []}
                onChange={(v) => set('features', v)}
                placeholder="Nhập tính năng rồi Enter..."
              />

              <ArrayInput
                label="Gallery (URL ảnh)"
                values={form.gallery || []}
                onChange={(v) => set('gallery', v)}
                placeholder="https://..."
              />
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
                {editingId ? 'Lưu thay đổi' : 'Thêm dự án'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
