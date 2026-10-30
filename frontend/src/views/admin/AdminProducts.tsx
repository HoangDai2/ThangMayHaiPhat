"use client";
import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Loader2,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
  HelpCircle,
  Sliders,
  FileText,
  Eye,
  Check
} from 'lucide-react';
import { DbProduct } from '../../lib/supabase';
import api from '../../lib/api';
import { generateSlug } from '../../lib/slug';
import ArrayInput from '../../components/admin/ArrayInput';
import ImageUpload from '../../components/admin/ImageUpload';
import MultiImageUpload from '../../components/admin/MultiImageUpload';

const emptyForm = (): Partial<DbProduct> => ({
  id: '',
  title: '',
  subtitle: '',
  icon: '',
  image: '',
  short_description: '',
  full_description: '',
  features: [],
  gallery: [],
  specifications: [],
  benefits: [],
  faqs: [],
  related_projects: [],
  is_published: true,
});

export default function AdminProducts() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // View state: 'list' | 'editor'
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [isEditing, setIsEditing] = useState(false);
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [form, setForm] = useState<Partial<DbProduct>>(emptyForm());
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [specInput, setSpecInput] = useState({ label: '', value: '' });
  const [faqInput, setFaqInput] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products?sort_by=created_at&sort_dir=asc');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setIsEditing(false);
    setIsSlugCustomized(false);
    setError('');
    setSpecInput({ label: '', value: '' });
    setFaqInput({ question: '', answer: '' });
    setViewMode('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (product: DbProduct) => {
    setForm({ ...product });
    setIsEditing(true);
    setIsSlugCustomized(true);
    setError('');
    setSpecInput({ label: '', value: '' });
    setFaqInput({ question: '', answer: '' });
    setViewMode('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToList = () => {
    setViewMode('list');
    setForm(emptyForm());
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const set = (field: keyof DbProduct, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (val: string) => {
    set('title', val);
    if (!isEditing && (!isSlugCustomized || !form.id || form.id === generateSlug(form.title || ''))) {
      set('id', generateSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugCustomized(val.trim() !== '');
    set('id', val);
  };

  const handleAutoGenerateSlug = () => {
    if (form.title?.trim()) {
      set('id', generateSlug(form.title));
      setIsSlugCustomized(false);
    }
  };

  const addSpec = () => {
    if (!specInput.label.trim() || !specInput.value.trim()) return;
    set('specifications', [...(form.specifications || []), { ...specInput }]);
    setSpecInput({ label: '', value: '' });
  };

  const removeSpec = (i: number) =>
    set('specifications', (form.specifications || []).filter((_, idx) => idx !== i));

  const addFaq = () => {
    if (!faqInput.question.trim() || !faqInput.answer.trim()) return;
    set('faqs', [...(form.faqs || []), { ...faqInput }]);
    setFaqInput({ question: '', answer: '' });
  };

  const removeFaq = (i: number) =>
    set('faqs', (form.faqs || []).filter((_, idx) => idx !== i));

  const handleSave = async () => {
    if (!form.title?.trim() || !form.id?.trim()) {
      setError('Mã định danh (ID/Slug) và Tên sản phẩm là bắt buộc');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSaving(true);
    setError('');

    const payload: Record<string, any> = {
      id: form.id!.trim(),
      title: form.title!.trim(),
      subtitle: form.subtitle || '',
      icon: form.icon || '',
      image: form.image || '',
      short_description: form.short_description || '',
      full_description: form.full_description || '',
      features: form.features || [],
      gallery: form.gallery || [],
      specifications: form.specifications || [],
      benefits: form.benefits || [],
      faqs: form.faqs || [],
      related_projects: form.related_projects || [],
      is_published: form.is_published ?? true,
    };

    try {
      if (isEditing) {
        await api.put(`/products/${form.id}`, payload);
        setSuccessMessage('Đã cập nhật sản phẩm thành công!');
      } else {
        await api.post('/products', payload);
        setSuccessMessage('Đã thêm sản phẩm mới thành công!');
      }
      await fetchProducts();
      backToList();
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi lưu sản phẩm');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Xóa sản phẩm "${title}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
      setSuccessMessage('Đã xóa sản phẩm thành công!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
  };

  const togglePublish = async (product: DbProduct) => {
    try {
      await api.put(`/products/${product.id}`, { is_published: !product.is_published });
      await fetchProducts();
      setSuccessMessage(`Đã ${!product.is_published ? 'hiển thị' : 'ẩn'} sản phẩm "${product.title}"`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------------------------------------------------
  // RENDER: FULL-PAGE PRODUCT EDITOR VIEW
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
                  {isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    form.is_published
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {form.is_published ? '● Hiển thị công khai' : '○ Đang ẩn'}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate max-w-md mt-0.5">
                {form.title ? form.title : 'Chưa đặt tên sản phẩm'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-auto">
            {isEditing && form.id && (
              <a
                href={`/san-pham/${form.id}`}
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
              <span>{isEditing ? 'Lưu thay đổi' : 'Thêm sản phẩm'}</span>
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
            {/* Card 1: Thông tin cơ bản */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FileText className="w-5 h-5 text-[#285c9a]" />
                <h2 className="text-base font-bold text-slate-800">Thông tin sản phẩm</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tên sản phẩm <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ví dụ: Thang Máy Gia Đình Homelift Hải Phát"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Mã ID (Slug URL) <span className="text-rose-500">*</span>
                    </label>
                    {!isEditing && form.title?.trim() && (
                      <button
                        type="button"
                        onClick={handleAutoGenerateSlug}
                        className="text-[11px] text-[#285c9a] hover:text-[#1e4a80] font-medium flex items-center gap-1 hover:underline cursor-pointer"
                        title="Tự động tạo lại slug từ tên"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Tự động tạo
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={form.id || ''}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    disabled={isEditing}
                    placeholder="thang-homelift"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all disabled:bg-slate-100 disabled:text-slate-400"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Đường dẫn: <span className="font-mono text-[#285c9a]">/san-pham/{form.id || '...'}</span>
                    {isEditing && <span className="text-amber-600 block sm:inline sm:ml-1">(Mã ID cố định khi chỉnh sửa)</span>}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Tiêu đề phụ (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={form.subtitle || ''}
                    onChange={(e) => set('subtitle', e.target.value)}
                    placeholder="Giải pháp tối ưu cho biệt thự & nhà phố hiện đại"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mô tả ngắn (Hiển thị ở danh sách sản phẩm)
                </label>
                <textarea
                  value={form.short_description || ''}
                  onChange={(e) => set('short_description', e.target.value)}
                  rows={2}
                  placeholder="Mô tả tóm tắt ngắn gọn về dòng sản phẩm..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mô tả chi tiết sản phẩm
                </label>
                <textarea
                  value={form.full_description || ''}
                  onChange={(e) => set('full_description', e.target.value)}
                  rows={5}
                  placeholder="Giới thiệu chi tiết thông số, ưu điểm nổi trội, tiêu chuẩn kỹ thuật an toàn của sản phẩm..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>
            </div>

            {/* Card 2: Thông số kỹ thuật & Tính năng */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#285c9a]" />
                  <h2 className="text-base font-bold text-slate-800">Thông số kỹ thuật & Tính năng</h2>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {form.specifications?.length || 0} thông số
                </span>
              </div>

              {/* Specifications Input Section */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Bảng thông số kỹ thuật (Tên thông số & Giá trị)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mb-3">
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      placeholder="Tên thông số (VD: Tải trọng)"
                      value={specInput.label}
                      onChange={(e) => setSpecInput((s) => ({ ...s, label: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSpec(); } }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      placeholder="Giá trị (VD: 300kg - 450kg)"
                      value={specInput.value}
                      onChange={(e) => setSpecInput((s) => ({ ...s, value: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSpec(); } }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={addSpec}
                      className="w-full h-full min-h-[42px] flex items-center justify-center gap-1.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Thêm
                    </button>
                  </div>
                </div>

                {/* List of specifications */}
                {(form.specifications || []).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                    {(form.specifications || []).map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all text-sm group"
                      >
                        <div className="truncate pr-2">
                          <span className="font-bold text-slate-700 text-xs mr-2">{s.label}:</span>
                          <span className="text-slate-600 text-xs font-medium">{s.value}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSpec(i)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                          title="Xóa thông số"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50/60 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                    Chưa có thông số kỹ thuật nào được thêm. Nhập Tên thông số và Giá trị ở trên rồi nhấn "Thêm".
                  </div>
                )}
              </div>

              {/* Features Array Input */}
              <div className="pt-4 border-t border-slate-100">
                <ArrayInput
                  label="Tính năng nổi bật"
                  values={form.features || []}
                  onChange={(v) => set('features', v)}
                  placeholder="Nhập tính năng rồi nhấn Enter..."
                />
              </div>

              {/* Benefits Array Input */}
              <div className="pt-4 border-t border-slate-100">
                <ArrayInput
                  label="Lợi ích mang lại"
                  values={form.benefits || []}
                  onChange={(v) => set('benefits', v)}
                  placeholder="Nhập lợi ích rồi nhấn Enter..."
                />
              </div>
            </div>

            {/* Card 3: Câu hỏi thường gặp (FAQs) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#285c9a]" />
                  <h2 className="text-base font-bold text-slate-800">Câu hỏi thường gặp (FAQ)</h2>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {form.faqs?.length || 0} câu hỏi
                </span>
              </div>

              <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <input
                    type="text"
                    placeholder="Nhập câu hỏi (VD: Chi phí lắp đặt dòng thang máy này là bao nhiêu?)"
                    value={faqInput.question}
                    onChange={(e) => setFaqInput((f) => ({ ...f, question: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập câu trả lời chi tiết..."
                    value={faqInput.answer}
                    onChange={(e) => setFaqInput((f) => ({ ...f, answer: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFaq(); } }}
                    className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={addFaq}
                    className="px-4 py-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm FAQ
                  </button>
                </div>
              </div>

              {(form.faqs || []).length > 0 ? (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {(form.faqs || []).map((faq, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1.5 group">
                      <div className="flex justify-between items-start gap-3">
                        <span className="font-bold text-slate-800 text-sm leading-snug">
                          {i + 1}. {faq.question}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFaq(i)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                          title="Xóa câu hỏi này"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-blue-200">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50/60 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  Chưa có câu hỏi thường gặp nào cho sản phẩm này.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card: Trạng thái xuất bản */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-100">
                Trạng thái hiển thị
              </h3>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <div>
                  <p className="text-xs font-bold text-slate-800">Hiển thị trên website</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {form.is_published ? 'Khách hàng có thể tìm kiếm và xem' : 'Sản phẩm tạm thời được ẩn đi'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set('is_published', !form.is_published)}
                  className={`transition-colors cursor-pointer ${form.is_published ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  {form.is_published ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>

            {/* Card: Ảnh đại diện sản phẩm */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Ảnh đại diện chính
                </h3>
                <span className="text-[11px] text-slate-400">Tỷ lệ khuyến nghị 16:9 hoặc 4:3</span>
              </div>
              <ImageUpload
                value={form.image || ''}
                onChange={(url) => set('image', url)}
                label="ẢNH SẢN PHẨM (ẢNH CHÍNH)"
              />
            </div>

            {/* Card: Thư viện ảnh gallery */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Thư viện ảnh chi tiết
                </h3>
                <span className="text-[11px] text-slate-500 font-semibold">{form.gallery?.length || 0} ảnh</span>
              </div>
              <MultiImageUpload
                values={form.gallery || []}
                onChange={(urls) => set('gallery', urls)}
                label="THƯ VIỆN ẢNH (GALLERY)"
              />
            </div>

            {/* Card: Cấu hình biểu tượng */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-100">
                Biểu tượng (Icon đại diện)
              </h3>
              <div>
                <input
                  type="text"
                  value={form.icon || ''}
                  onChange={(e) => set('icon', e.target.value)}
                  placeholder="VD: home, building, shield..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Tên icon Lucide đại diện cho dòng sản phẩm trên thanh menu & trang chủ.
                </p>
              </div>
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
          <h1 className="text-2xl font-bold text-slate-800">Quản Lý Sản Phẩm</h1>
          <p className="text-slate-500 text-sm mt-0.5">Tổng cộng {products.length} sản phẩm & linh kiện</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm mới
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

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên hoặc mã slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#285c9a] focus:border-transparent outline-none text-sm font-medium transition-all"
          />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm leading-tight">{product.title}</p>
                    <p className="text-blue-100/90 text-xs font-mono mt-0.5">{product.id}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                    {product.short_description || product.subtitle || 'Chưa có mô tả ngắn'}
                  </p>
                  <div className="flex items-center justify-between mb-3 pt-2 border-t border-slate-100">
                    <span className="text-slate-500 text-xs font-medium">
                      {product.features?.length || 0} tính năng · {product.specifications?.length || 0} thông số
                    </span>
                    <button
                      onClick={() => togglePublish(product)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        product.is_published 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                      title={product.is_published ? 'Bấm để ẩn sản phẩm' : 'Bấm để hiển thị công khai'}
                    >
                      {product.is_published ? (
                        <ToggleRight className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-slate-400" />
                      )}
                      {product.is_published ? 'Hiển thị' : 'Đang ẩn'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-700 rounded-xl hover:bg-blue-50 hover:text-[#285c9a] hover:border-blue-200 transition-all text-xs font-semibold cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.title)}
                    className="flex items-center justify-center p-2 bg-slate-50 border border-slate-200/70 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-xl transition-all cursor-pointer"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200/80">
              Không tìm thấy sản phẩm nào phù hợp với từ khóa "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
