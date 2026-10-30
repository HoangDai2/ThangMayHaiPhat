"use client";
import { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Loader2,
  Image as ImageIcon,
  Sparkles,
  ArrowLeft,
  Save,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Tag,
  Sliders,
  Calendar,
  ShieldCheck,
  Zap,
  Building,
  Check,
  FileText
} from 'lucide-react';
import api from '../../lib/api';
import { DbProject } from '../../lib/types';
import { products as staticProducts } from '../../data/products';
import { generateSlug } from '../../lib/slug';
import ArrayInput from '../../components/admin/ArrayInput';
import ImageUpload from '../../components/admin/ImageUpload';
import MultiImageUpload from '../../components/admin/MultiImageUpload';

const FALLBACK_CATEGORIES = [
  'Thang Máy Xây',
  'Thang Máy Khung Thép Vách Kính',
  'Thang Homelift',
  'Thang Máy Tải Khách',
  'Thang Máy Tải Hàng',
  'Thang Máy Quan Sát',
  'Thang Máy Bệnh Viện',
];

const emptyForm = (defaultCat = ''): Partial<DbProject> => ({
  slug: '',
  title: '',
  location: '',
  category: defaultCat,
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
  const [productsList, setProductsList] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // View state: 'list' | 'editor'
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [form, setForm] = useState<Partial<DbProject>>(emptyForm());
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let res;
      try {
        res = await api.get('/products?sort_by=created_at&sort_dir=asc');
      } catch {
        res = await api.get('/public/products');
      }
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setProductsList(res.data.map((p: any) => ({ id: String(p.id), title: p.title })));
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách sản phẩm:', err);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('/projects?sort_by=created_at&sort_dir=desc');
      setProjects(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Derive available categories based on Products and existing projects
  const categories = useMemo(() => {
    const fromApi = productsList.map((p) => p.title?.trim()).filter(Boolean);
    const fallback = fromApi.length > 0 ? fromApi : staticProducts.map((p) => p.title?.trim()).filter(Boolean);
    const baseList = fallback.length > 0 ? fallback : FALLBACK_CATEGORIES;

    // Retain existing project categories so older/custom project categories are never dropped
    const fromExistingProjects = projects.map((p) => p.category?.trim()).filter(Boolean) as string[];

    return Array.from(new Set([...baseList, ...fromExistingProjects]));
  }, [productsList, projects]);

  const openAdd = () => {
    const defaultCat = categories[0] || 'Thang Máy Xây';
    setForm(emptyForm(defaultCat));
    setEditingId(null);
    setIsSlugCustomized(false);
    setError('');
    setViewMode('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (project: DbProject) => {
    setForm({ ...project, category: project.category || categories[0] || 'Thang Máy Xây' });
    setEditingId(project.id);
    setIsSlugCustomized(true);
    setError('');
    setViewMode('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToList = () => {
    setViewMode('list');
    setEditingId(null);
    setIsSlugCustomized(false);
    setForm(emptyForm(categories[0] || 'Thang Máy Xây'));
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const set = (field: keyof DbProject, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (val: string) => {
    set('title', val);
    // Tự động sinh slug nếu đang thêm mới và người dùng chưa chủ động tự gõ slug riêng
    if (!editingId && (!isSlugCustomized || !form.slug || form.slug === generateSlug(form.title || ''))) {
      set('slug', generateSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugCustomized(val.trim() !== '');
    set('slug', val);
  };

  const handleAutoGenerateSlug = () => {
    if (form.title?.trim()) {
      set('slug', generateSlug(form.title));
      setIsSlugCustomized(false);
    }
  };

  const handleSave = async () => {
    const title = form.title?.trim() || '';
    let slug = form.slug?.trim() || '';
    if (!slug && title) {
      slug = generateSlug(title);
    }

    if (!title || !slug) {
      setError('Tên dự án và Slug (URL) là bắt buộc');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSaving(true);
    setError('');

    const defaultCat = categories[0] || 'Thang Máy Xây';
    const payload = {
      slug,
      title,
      location: form.location || '',
      category: form.category || defaultCat,
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

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
        setSuccessMessage('Đã cập nhật dự án thành công!');
      } else {
        await api.post('/projects', payload);
        setSuccessMessage('Đã thêm dự án mới thành công!');
      }
      await fetchProjects();
      backToList();
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lưu dự án');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Xóa dự án "${title}"?`)) return;
    try {
      await api.delete(`/projects/${id}`);
      await fetchProjects();
      setSuccessMessage('Đã xóa dự án thành công!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
  };

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.specs && p.specs.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // -------------------------------------------------------------
  // RENDER: FULL-PAGE PROJECT EDITOR VIEW
  // -------------------------------------------------------------
  if (viewMode === 'editor') {
    return (
      <div className="space-y-6 pb-20">
        {/* Editor Top Sticky Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={backToList}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>Quay lại danh sách</span>
            </button>
            <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#285c9a] border border-blue-200/60 uppercase tracking-wider font-mono">
                  {editingId ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
                </span>
                {form.category && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {form.category}
                  </span>
                )}
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate max-w-md mt-0.5">
                {form.title ? form.title : 'Chưa đặt tên dự án'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-auto">
            {editingId && form.slug && (
              <a
                href={`/du-an/${form.slug}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all border border-slate-200"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#285c9a]" />
                <span>Xem trên web</span>
              </a>
            )}
            <button
              type="button"
              onClick={backToList}
              className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 text-xs font-semibold transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-900/15 transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{editingId ? 'Lưu thay đổi' : 'Thêm dự án'}</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium flex items-center justify-between shadow-xs">
            <span>{error}</span>
            <button onClick={() => setError('')} className="p-1 hover:bg-rose-100 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card 1: Thông tin tổng quan */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FileText className="w-5 h-5 text-[#285c9a]" />
                <h2 className="text-base font-bold text-slate-800">Thông tin tổng quan dự án</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tên dự án công trình <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ví dụ: Biệt thự Vinhomes Ocean Park"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Đường dẫn tĩnh (Slug URL) <span className="text-rose-500">*</span>
                  </label>
                  {form.title?.trim() && (
                    <button
                      type="button"
                      onClick={handleAutoGenerateSlug}
                      className="text-[11px] text-[#285c9a] hover:text-[#1e4a80] font-medium flex items-center gap-1 hover:underline cursor-pointer"
                      title="Tạo lại slug từ tên dự án"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Tự động tạo
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={form.slug || ''}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="biet-thu-vinhomes-ocean-park"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all text-slate-800"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Đường dẫn xem chi tiết: <span className="font-mono text-[#285c9a]">/du-an/{form.slug || '...'}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Thông số ngắn tóm tắt
                </label>
                <input
                  type="text"
                  value={form.specs || ''}
                  onChange={(e) => set('specs', e.target.value)}
                  placeholder="Ví dụ: Thang máy gia đình · 4 tầng · Kính cường lực cao cấp"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mô tả chi tiết dự án
                </label>
                <textarea
                  value={form.description || ''}
                  onChange={(e) => set('description', e.target.value)}
                  rows={4}
                  placeholder="Giới thiệu về quy mô dự án, yêu cầu từ chủ đầu tư, giải pháp lắp đặt thang máy Hải Phát đã triển khai..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>
            </div>

            {/* Card 2: Thông số kỹ thuật chi tiết */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Sliders className="w-5 h-5 text-[#285c9a]" />
                <h2 className="text-base font-bold text-slate-800">Thông số kỹ thuật công trình</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Số tầng (Điểm dừng)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.floors || 1}
                    onChange={(e) => set('floors', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Tải trọng thang
                  </label>
                  <input
                    type="text"
                    value={form.capacity || ''}
                    onChange={(e) => set('capacity', e.target.value)}
                    placeholder="320 kg - 450 kg"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Tốc độ di chuyển
                  </label>
                  <input
                    type="text"
                    value={form.speed || ''}
                    onChange={(e) => set('speed', e.target.value)}
                    placeholder="0.5 m/s - 1.0 m/s"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Thương hiệu động cơ
                  </label>
                  <input
                    type="text"
                    value={form.brand || ''}
                    onChange={(e) => set('brand', e.target.value)}
                    placeholder="Mitsubishi / Fuji"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Thời gian hoàn thành
                  </label>
                  <input
                    type="text"
                    value={form.completion_date || ''}
                    onChange={(e) => set('completion_date', e.target.value)}
                    placeholder="Tháng 03/2024"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Chính sách bảo hành
                  </label>
                  <input
                    type="text"
                    value={form.warranty || ''}
                    onChange={(e) => set('warranty', e.target.value)}
                    placeholder="5 năm chính hãng"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Tính năng & Điểm nổi bật */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Zap className="w-5 h-5 text-[#285c9a]" />
                <h2 className="text-base font-bold text-slate-800">Tính năng & Điểm nổi bật công trình</h2>
              </div>
              <ArrayInput
                label="Danh sách tính năng & điểm đặc biệt của dự án"
                values={form.features || []}
                onChange={(v) => set('features', v)}
                placeholder="Nhập tính năng (VD: Hệ thống cứu hộ ARD tự động, kính Panorama...) rồi Enter..."
              />
            </div>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Phân loại & Vị trí */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#285c9a]" />
                Phân loại & Vị trí
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Dòng sản phẩm (Danh mục)
                </label>
                <select
                  value={form.category || categories[0] || ''}
                  onChange={(e) => set('category', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all font-medium text-slate-800 cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Địa điểm thi công
                </label>
                <input
                  type="text"
                  value={form.location || ''}
                  onChange={(e) => set('location', e.target.value)}
                  placeholder="VD: Long Biên, Hà Nội"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>
            </div>

            {/* Card 2: Ảnh đại diện dự án */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#285c9a]" />
                  Ảnh đại diện dự án
                </h3>
                <span className="text-[11px] text-slate-400">Tỷ lệ 16:9</span>
              </div>
              <ImageUpload
                label="ẢNH ĐẠI DIỆN DỰ ÁN"
                value={form.image || ''}
                onChange={(url) => set('image', url)}
              />
            </div>

            {/* Card 3: Bộ sưu tập ảnh công trình */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Bộ sưu tập ảnh thực tế
                </h3>
                <span className="text-[11px] text-slate-500 font-semibold">{form.gallery?.length || 0} ảnh</span>
              </div>
              <MultiImageUpload
                label="BỘ SƯU TẬP ẢNH DỰ ÁN (GALLERY)"
                values={form.gallery || []}
                onChange={(urls) => set('gallery', urls)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: LIST VIEW
  // -------------------------------------------------------------
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản Lý Dự Án</h1>
          <p className="text-slate-500 text-sm mt-0.5">Tổng cộng {projects.length} dự án đã thực hiện & đăng ký</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Thêm dự án mới
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-medium flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="p-1 hover:bg-emerald-100 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên dự án, địa điểm, thông số kỹ thuật..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#285c9a] focus:border-transparent outline-none text-sm font-medium transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          {['all', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
            <div key={project.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm leading-tight">{project.title}</p>
                    <p className="text-blue-100/90 text-xs mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location || 'Chưa cập nhật địa điểm'}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-2.5 py-1 bg-blue-50 text-[#285c9a] border border-blue-100 rounded-lg text-xs font-semibold">
                      {project.category}
                    </span>
                    <span className="text-slate-500 text-xs font-medium">{project.completion_date || 'Mới bàn giao'}</span>
                  </div>
                  <p className="text-slate-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                    {project.description || project.specs || 'Chưa có mô tả dự án'}
                  </p>
                  {project.specs && (
                    <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-1 mb-2">
                      {project.specs}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openEdit(project)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-700 rounded-xl hover:bg-blue-50 hover:text-[#285c9a] hover:border-blue-200 transition-all text-xs font-semibold cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="flex items-center justify-center p-2 bg-slate-50 border border-slate-200/70 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-xl transition-all cursor-pointer"
                    title="Xóa dự án"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200/80">
              Không tìm thấy dự án nào phù hợp với tìm kiếm
            </div>
          )}
        </div>
      )}
    </div>
  );
}
