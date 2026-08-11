"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, Image, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase, DbProduct } from '../../lib/supabase';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<DbProduct>>(emptyForm());
  const [error, setError] = useState('');
  const [specInput, setSpecInput] = useState({ label: '', value: '' });
  const [faqInput, setFaqInput] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error && data) setProducts(data);
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setIsEditing(false);
    setError('');
    setSpecInput({ label: '', value: '' });
    setFaqInput({ question: '', answer: '' });
    setModalOpen(true);
  };

  const openEdit = (product: DbProduct) => {
    setForm({ ...product });
    setIsEditing(true);
    setError('');
    setSpecInput({ label: '', value: '' });
    setFaqInput({ question: '', answer: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm(emptyForm());
    setError('');
  };

  const set = (field: keyof DbProduct, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

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
      setError('ID (slug) và Tiêu đề là bắt buộc');
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

    let err: any = null;
    let attempts = 0;

    while (attempts < 5) {
      if (isEditing) {
        ({ error: err } = await supabase.from('products').update(payload).eq('id', form.id!));
      } else {
        ({ error: err } = await supabase.from('products').insert(payload));
      }

      if (!err) break;

      if (err.message && (err.message.includes('schema cache') || err.message.includes('Could not find the'))) {
        const match = err.message.match(/Could not find the '([^']+)' column/);
        if (match && match[1] && match[1] in payload) {
          delete payload[match[1]];
          attempts++;
          continue;
        }
      }
      break;
    }

    if (err) {
      setError(err.message);
    } else {
      await fetchProducts();
      closeModal();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Xóa sản phẩm "${title}"?`)) return;
    await supabase.from('products').delete().eq('id', id);
    await fetchProducts();
  };

  const togglePublish = async (product: DbProduct) => {
    await supabase
      .from('products')
      .update({ is_published: !product.is_published })
      .eq('id', product.id);
    await fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản Lý Sản Phẩm</h1>
          <p className="text-slate-500 text-sm mt-0.5">Tổng cộng {products.length} sản phẩm & linh kiện</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm mới
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
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
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <Image className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight">{product.title}</p>
                  <p className="text-blue-100/90 text-xs font-mono mt-0.5">{product.id}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-slate-600 text-xs mb-3 line-clamp-2 leading-relaxed">{product.short_description}</p>
                <div className="flex items-center justify-between mb-3 pt-2 border-t border-slate-100">
                  <span className="text-slate-500 text-xs font-medium">{product.features?.length || 0} tính năng</span>
                  <button
                    onClick={() => togglePublish(product)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                      product.is_published 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    {product.is_published ? (
                      <ToggleRight className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ToggleLeft className="w-4 h-4 text-slate-400" />
                    )}
                    {product.is_published ? 'Hiển thị' : 'Đang ẩn'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-700 rounded-xl hover:bg-blue-50 hover:text-[#285c9a] hover:border-blue-200 transition-all text-xs font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.title)}
                    className="flex items-center justify-center p-2 bg-slate-50 border border-slate-200/70 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-xl transition-all"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200/80">
              Không tìm thấy sản phẩm nào
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h2 className="text-lg font-bold text-slate-800">
                {isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
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
                    ID (slug) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.id || ''}
                    onChange={(e) => set('id', e.target.value)}
                    disabled={isEditing}
                    placeholder="thang-homelift"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Icon</label>
                  <input
                    type="text"
                    value={form.icon || ''}
                    onChange={(e) => set('icon', e.target.value)}
                    placeholder="home"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tên sản phẩm <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => set('title', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tiêu đề phụ</label>
                <input
                  type="text"
                  value={form.subtitle || ''}
                  onChange={(e) => set('subtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div>
                <ImageUpload
                  value={form.image || ''}
                  onChange={(url) => set('image', url)}
                  label="ẢNH SẢN PHẨM (ẢNH CHÍNH)"
                />
              </div>

              <div>
                <MultiImageUpload
                  values={form.gallery || []}
                  onChange={(urls) => set('gallery', urls)}
                  label="THƯ VIỆN ẢNH (GALLERY)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Mô tả ngắn</label>
                <textarea
                  value={form.short_description || ''}
                  onChange={(e) => set('short_description', e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Mô tả đầy đủ</label>
                <textarea
                  value={form.full_description || ''}
                  onChange={(e) => set('full_description', e.target.value)}
                  rows={4}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none resize-none transition-all"
                />
              </div>

              <ArrayInput
                label="Tính năng"
                values={form.features || []}
                onChange={(v) => set('features', v)}
                placeholder="Nhập tính năng rồi Enter..."
              />

              <ArrayInput
                label="Lợi ích"
                values={form.benefits || []}
                onChange={(v) => set('benefits', v)}
                placeholder="Nhập lợi ích rồi Enter..."
              />

              {/* Specifications */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Thông số kỹ thuật</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Tên thông số"
                    value={specInput.label}
                    onChange={(e) => setSpecInput((s) => ({ ...s, label: e.target.value }))}
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Giá trị"
                    value={specInput.value}
                    onChange={(e) => setSpecInput((s) => ({ ...s, value: e.target.value }))}
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={addSpec}
                    className="p-2.5 bg-[#285c9a] text-white rounded-xl hover:bg-[#1e4a80] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {(form.specifications || []).map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-3.5 py-2 bg-slate-50 rounded-xl mb-1 text-sm border border-slate-200/60">
                    <span className="font-semibold text-slate-700 text-xs">{s.label}</span>
                    <span className="text-slate-600 text-xs font-medium">{s.value}</span>
                    <button onClick={() => removeSpec(i)} className="text-slate-400 hover:text-rose-600 ml-2">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">FAQ (Hỏi đáp)</label>
                <div className="space-y-2 mb-2">
                  <input
                    type="text"
                    placeholder="Câu hỏi"
                    value={faqInput.question}
                    onChange={(e) => setFaqInput((f) => ({ ...f, question: e.target.value }))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Câu trả lời"
                      value={faqInput.answer}
                      onChange={(e) => setFaqInput((f) => ({ ...f, answer: e.target.value }))}
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={addFaq}
                      className="p-2.5 bg-[#285c9a] text-white rounded-xl hover:bg-[#1e4a80] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {(form.faqs || []).map((faq, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl mb-2 border border-slate-200/60 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-800">{faq.question}</span>
                      <button onClick={() => removeFaq(i)} className="text-slate-400 hover:text-rose-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Hiển thị trên website</label>
                <button
                  type="button"
                  onClick={() => set('is_published', !form.is_published)}
                  className={`transition-colors ${form.is_published ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  {form.is_published ? (
                    <ToggleRight className="w-7 h-7" />
                  ) : (
                    <ToggleLeft className="w-7 h-7" />
                  )}
                </button>
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
                {isEditing ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
