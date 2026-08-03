"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, Image, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase, DbProduct } from '../../lib/supabase';
import ArrayInput from '../../components/admin/ArrayInput';

const emptyForm = (): Partial<DbProduct> => ({
  id: '',
  title: '',
  subtitle: '',
  icon: '',
  image: '',
  short_description: '',
  full_description: '',
  features: [],
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quản lý sản phẩm</h1>
          <p className="text-slate-500 mt-1">{products.length} sản phẩm</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative h-44 overflow-hidden bg-slate-100">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold text-sm">{product.title}</p>
                  <p className="text-white/70 text-xs font-mono">{product.id}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-slate-600 text-sm mb-3 line-clamp-2">{product.short_description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-500 text-xs">{product.features?.length || 0} tính năng</span>
                  <button
                    onClick={() => togglePublish(product)}
                    className={`flex items-center gap-1 text-xs ${product.is_published ? 'text-green-600' : 'text-slate-400'}`}
                  >
                    {product.is_published ? (
                      <ToggleRight className="w-5 h-5" />
                    ) : (
                      <ToggleLeft className="w-5 h-5" />
                    )}
                    {product.is_published ? 'Hiện' : 'Ẩn'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.title)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 bg-white rounded-xl p-12 text-center text-slate-500">
              Không tìm thấy sản phẩm nào
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800">
                {isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    ID (slug) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.id || ''}
                    onChange={(e) => set('id', e.target.value)}
                    disabled={isEditing}
                    placeholder="thang-homelift"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                  <input
                    type="text"
                    value={form.icon || ''}
                    onChange={(e) => set('icon', e.target.value)}
                    placeholder="home"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => set('title', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề phụ</label>
                <input
                  type="text"
                  value={form.subtitle || ''}
                  onChange={(e) => set('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL ảnh</label>
                <input
                  type="text"
                  value={form.image || ''}
                  onChange={(e) => set('image', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {form.image && (
                  <img src={form.image} alt="preview" className="mt-2 h-24 rounded-lg object-cover" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả ngắn</label>
                <textarea
                  value={form.short_description || ''}
                  onChange={(e) => set('short_description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả đầy đủ</label>
                <textarea
                  value={form.full_description || ''}
                  onChange={(e) => set('full_description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Thông số kỹ thuật</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Tên thông số"
                    value={specInput.label}
                    onChange={(e) => setSpecInput((s) => ({ ...s, label: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Giá trị"
                    value={specInput.value}
                    onChange={(e) => setSpecInput((s) => ({ ...s, value: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addSpec}
                    className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {(form.specifications || []).map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg mb-1 text-sm">
                    <span className="font-medium text-slate-700">{s.label}</span>
                    <span className="text-slate-500">{s.value}</span>
                    <button onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-600 ml-2">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">FAQ</label>
                <div className="space-y-2 mb-2">
                  <input
                    type="text"
                    placeholder="Câu hỏi"
                    value={faqInput.question}
                    onChange={(e) => setFaqInput((f) => ({ ...f, question: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Câu trả lời"
                      value={faqInput.answer}
                      onChange={(e) => setFaqInput((f) => ({ ...f, answer: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={addFaq}
                      className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {(form.faqs || []).map((faq, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg mb-2 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">{faq.question}</span>
                      <button onClick={() => removeFaq(i)} className="text-red-400 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-500">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Hiển thị trên website</label>
                <button
                  type="button"
                  onClick={() => set('is_published', !form.is_published)}
                  className={`${form.is_published ? 'text-green-500' : 'text-slate-300'}`}
                >
                  {form.is_published ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
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
                {isEditing ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
