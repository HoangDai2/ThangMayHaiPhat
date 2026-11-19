"use client";

import { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Loader2,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Tag,
  Hash,
} from 'lucide-react';
import api from '../../lib/api';
import { DbFaq } from '../../lib/types';
import { fallbackFaqs } from '../../data/faqs';

const DEFAULT_CATEGORIES = [
  'Chi phí & Báo giá',
  'Kỹ thuật & Kích thước',
  'An toàn & Vận hành',
  'Bảo trì & Bảo hành',
  'Tiến độ & Thi công',
];

const emptyForm = (): Partial<DbFaq> => ({
  question: '',
  answer: '',
  category: 'Chi phí & Báo giá',
  sort_order: 1,
  is_published: true,
});

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState<DbFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<DbFaq>>(emptyForm());
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterPublished, setFilterPublished] = useState<string>('all');
  const [customCategoryInput, setCustomCategoryInput] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/faqs');
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setFaqs(response.data);
      } else {
        // Fallback if empty
        setFaqs(fallbackFaqs);
      }
    } catch (err) {
      console.error('Lỗi khi tải faqs từ server:', err);
      // Fallback
      setFaqs(fallbackFaqs);
    }
    setLoading(false);
  };

  const categories = useMemo(() => {
    const set = new Set<string>(DEFAULT_CATEGORIES);
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const matchesSearch =
        searchQuery === '' ||
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;

      const matchesStatus =
        filterPublished === 'all' ||
        (filterPublished === 'published' && f.is_published) ||
        (filterPublished === 'hidden' && !f.is_published);

      return matchesSearch && matchesCat && matchesStatus;
    }).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }, [faqs, searchQuery, selectedCategory, filterPublished]);

  const openAdd = () => {
    const nextOrder = faqs.length > 0 ? Math.max(...faqs.map(f => f.sort_order || 0)) + 1 : 1;
    setForm({
      ...emptyForm(),
      sort_order: nextOrder,
    });
    setEditingId(null);
    setError('');
    setCustomCategoryInput(false);
    setModalOpen(true);
  };

  const openEdit = (faq: DbFaq) => {
    setForm({ ...faq });
    setEditingId(faq.id);
    setError('');
    setCustomCategoryInput(!DEFAULT_CATEGORIES.includes(faq.category));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setError('');
    setCustomCategoryInput(false);
  };

  const set = (field: keyof DbFaq, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.question?.trim()) {
      setError('Câu hỏi là bắt buộc');
      return;
    }
    if (!form.answer?.trim()) {
      setError('Câu trả lời là bắt buộc');
      return;
    }
    if (!form.category?.trim()) {
      setError('Danh mục là bắt buộc');
      return;
    }

    setSaving(true);
    setError('');

    const payload = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      category: form.category.trim(),
      sort_order: Number(form.sort_order) || 0,
      is_published: form.is_published ?? true,
    };

    try {
      if (editingId) {
        await api.put(`/faqs/${editingId}`, payload);
      } else {
        await api.post('/faqs', payload);
      }
      await fetchFaqs();
      closeModal();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi lưu câu hỏi');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, question: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa câu hỏi:\n"${question}"?`)) return;
    try {
      await api.delete(`/faqs/${id}`);
      await fetchFaqs();
    } catch (e: any) {
      console.error(e);
      alert('Xóa câu hỏi thất bại: ' + (e.response?.data?.message || e.message));
    }
  };

  const togglePublish = async (faq: DbFaq) => {
    const nextVal = !faq.is_published;
    // Optimistic local update
    setFaqs((prev) =>
      prev.map((item) => (item.id === faq.id ? { ...item, is_published: nextVal } : item))
    );

    try {
      await api.put(`/faqs/${faq.id}`, { is_published: nextVal });
    } catch (e) {
      console.error('Không thể cập nhật trạng thái:', e);
      // Revert if failed
      setFaqs((prev) =>
        prev.map((item) => (item.id === faq.id ? { ...item, is_published: !nextVal } : item))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#285c9a] uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>KNOWLEDGE BASE & FAQ ENGINE</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Quản Lý Câu Hỏi Thường Gặp (FAQs)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Hệ thống giải đáp thắc mắc khách hàng theo chuẩn tasteskill, câu hỏi rõ ràng, câu trả lời trực diện.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm câu hỏi mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm câu hỏi, câu trả lời hoặc danh mục..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285c9a]/30 focus:border-[#285c9a] text-slate-800 placeholder-slate-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285c9a]/30 focus:border-[#285c9a] text-slate-800 font-medium transition-all"
            >
              <option value="all">Mọi danh mục ({faqs.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({faqs.filter((f) => f.category === cat).length})
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="md:col-span-3">
            <select
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285c9a]/30 focus:border-[#285c9a] text-slate-800 font-medium transition-all"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đang hiển thị ({faqs.filter((f) => f.is_published).length})</option>
              <option value="hidden">Đang ẩn ({faqs.filter((f) => !f.is_published).length})</option>
            </select>
          </div>
        </div>

        {/* Category Pills Quick Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-medium text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Nhanh:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#285c9a] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-[#285c9a] text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200/80">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a] mb-2" />
          <p className="text-slate-500 text-xs font-mono">ĐANG TẢI DỮ LIỆU FAQS...</p>
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-slate-700 font-bold text-base">Không tìm thấy câu hỏi nào phù hợp</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `Không có kết quả nào khớp với từ khóa "${searchQuery}". Hãy thử tìm kiếm bằng từ khóa khác.`
              : 'Chưa có câu hỏi nào trong danh mục này.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterPublished('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-mono">
            <span>HIỂN THỊ {filteredFaqs.length} / {faqs.length} CÂU HỎI</span>
            <span>SẮP XẾP THEO THỨ TỰ ƯU TIÊN</span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredFaqs.map((faq, index) => (
              <div
                key={faq.id || index}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-sm hover:shadow-md ${
                  faq.is_published
                    ? 'border-slate-200/90 hover:border-blue-300'
                    : 'border-slate-200/60 bg-slate-50/60 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 text-[#285c9a] border border-blue-100 text-[11px] font-bold font-mono">
                        <Tag className="w-3 h-3" />
                        {faq.category}
                      </span>

                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-mono font-medium">
                        <Hash className="w-3 h-3 text-slate-400" />
                        Thứ tự: {faq.sort_order}
                      </span>

                      {!faq.is_published && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                          Đang ẩn trên website
                        </span>
                      )}
                    </div>

                    <h3 className="text-slate-900 font-bold text-base sm:text-lg leading-snug">
                      {faq.question}
                    </h3>

                    <p className="text-slate-600 text-sm mt-2 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                      {faq.answer}
                    </p>
                  </div>

                  {/* Actions Column */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button
                      onClick={() => togglePublish(faq)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        faq.is_published
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Nhấn để đổi trạng thái hiển thị"
                    >
                      {faq.is_published ? (
                        <ToggleRight className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-slate-400" />
                      )}
                      <span>{faq.is_published ? 'Hiển thị' : 'Đang ẩn'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEdit(faq)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-[#285c9a] rounded-xl text-xs font-semibold transition-all"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>

                      <button
                        onClick={() => handleDelete(faq.id, faq.question)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 rounded-xl text-xs font-semibold transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/90">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-100/70 text-[#285c9a]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    {editingId ? 'Chỉnh Sửa Câu Hỏi FAQ' : 'Thêm Câu Hỏi FAQ Mới'}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    {editingId ? `ID: ${editingId.slice(0, 8)}...` : 'CHUẨN NỘI DUNG TASTESKILL 2.5'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Question */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Câu hỏi của khách hàng <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={form.question || ''}
                  onChange={(e) => set('question', e.target.value)}
                  placeholder="Ví dụ: Chi phí lắp đặt thang máy gia đình là bao nhiêu?"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285c9a]/30 focus:border-[#285c9a] text-slate-900 font-medium placeholder-slate-400 transition-all resize-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Khuyên dùng: Đặt câu hỏi ngắn gọn theo góc nhìn người mua, dưới 70 ký tự.
                </p>
              </div>

              {/* Category */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Danh mục chuyên môn <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomCategoryInput(!customCategoryInput);
                      if (customCategoryInput) {
                        set('category', DEFAULT_CATEGORIES[0]);
                      }
                    }}
                    className="text-xs text-[#285c9a] hover:underline font-semibold"
                  >
                    {customCategoryInput ? 'Chọn danh mục có sẵn' : '+ Nhập danh mục mới'}
                  </button>
                </div>

                {customCategoryInput ? (
                  <input
                    type="text"
                    value={form.category || ''}
                    onChange={(e) => set('category', e.target.value)}
                    placeholder="Nhập tên danh mục mới..."
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285c9a]/30 focus:border-[#285c9a] text-slate-900 font-medium"
                  />
                ) : (
                  <select
                    value={form.category || ''}
                    onChange={(e) => set('category', e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285c9a]/30 focus:border-[#285c9a] text-slate-900 font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Answer */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Câu trả lời trực tiếp <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.answer || ''}
                  onChange={(e) => set('answer', e.target.value)}
                  placeholder="Trả lời trực diện, số liệu rõ ràng, minh bạch thông số kỹ thuật..."
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285c9a]/30 focus:border-[#285c9a] text-slate-900 placeholder-slate-400 transition-all leading-relaxed"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Khuyên dùng: Bắt đầu ngay bằng câu trả lời (Có/Không/Khoảng giá/Thời gian), tránh vòng vo.
                </p>
              </div>

              {/* Sort order & Is published */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Thứ tự hiển thị
                  </label>
                  <input
                    type="number"
                    value={form.sort_order ?? 0}
                    onChange={(e) => set('sort_order', parseInt(e.target.value, 10) || 0)}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285c9a]/30 focus:border-[#285c9a] text-slate-900 font-medium"
                  />
                  <span className="text-[11px] text-slate-400">Số nhỏ hơn sẽ đứng trước</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Trạng thái hiển thị
                  </label>
                  <label className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={form.is_published ?? true}
                      onChange={(e) => set('is_published', e.target.checked)}
                      className="w-4 h-4 text-[#285c9a] rounded border-slate-300 focus:ring-[#285c9a]"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Hiển thị công khai trên website
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{editingId ? 'Cập nhật câu hỏi' : 'Lưu câu hỏi mới'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
