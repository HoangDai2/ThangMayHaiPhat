"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, Image, ToggleLeft, ToggleRight, Eye } from 'lucide-react';
import { supabase, DbArticle } from '../../lib/supabase';
import ImageUpload from '../../components/admin/ImageUpload';
import ArrayInput from '../../components/admin/ArrayInput';

const CATEGORIES = ['Tin tức', 'Hướng dẫn', 'Dự án', 'Sản phẩm', 'Khuyến mãi', 'Khác'];

const emptyForm = (): Partial<DbArticle> => ({
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  cover_image: '',
  author: '',
  category: 'Tin tức',
  tags: [],
  is_published: false,
  published_at: null,
});

export default function AdminArticles() {
  const [articles, setArticles] = useState<DbArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<DbArticle>>(emptyForm());
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<DbArticle | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setArticles(data);
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setEditingId(null);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (article: DbArticle) => {
    setForm({ ...article });
    setEditingId(article.id);
    setError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setError('');
  };

  const set = (field: keyof DbArticle, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

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
      excerpt: form.excerpt || '',
      content: form.content || '',
      cover_image: form.cover_image || '',
      author: form.author || '',
      category: form.category || 'Tin tức',
      tags: form.tags || [],
      is_published: form.is_published ?? false,
      published_at: form.is_published
        ? form.published_at || new Date().toISOString()
        : null,
    };

    let err;
    if (editingId) {
      ({ error: err } = await supabase.from('articles').update(payload).eq('id', editingId));
    } else {
      ({ error: err } = await supabase.from('articles').insert(payload));
    }

    if (err) {
      setError(err.message);
    } else {
      await fetchArticles();
      closeModal();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Xóa bài viết "${title}"?`)) return;
    await supabase.from('articles').delete().eq('id', id);
    await fetchArticles();
  };

  const togglePublish = async (article: DbArticle) => {
    await supabase
      .from('articles')
      .update({
        is_published: !article.is_published,
        published_at: !article.is_published ? new Date().toISOString() : article.published_at,
      })
      .eq('id', article.id);
    await fetchArticles();
  };

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản Lý Bài Viết</h1>
          <p className="text-slate-500 text-sm mt-0.5">Tổng cộng {articles.length} bài viết tin tức & kiến thức</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all"
        >
          <Plus className="w-4 h-4" />
          Thêm bài viết mới
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
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

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="relative h-44 overflow-hidden bg-slate-100">
                {article.cover_image ? (
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <Image className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight line-clamp-2">{article.title}</p>
                  <p className="text-blue-100/90 text-xs mt-0.5">{article.author}</p>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#285c9a] text-white rounded-lg text-xs font-semibold">
                  {article.category}
                </span>
              </div>
              <div className="p-4">
                <p className="text-slate-600 text-xs mb-3 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center justify-between mb-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setPreviewArticle(article);
                      setPreviewOpen(true);
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#285c9a] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Xem nhanh
                  </button>
                  <button
                    onClick={() => togglePublish(article)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                      article.is_published 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    {article.is_published ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                    {article.is_published ? 'Đã xuất bản' : 'Bản nháp'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(article)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-700 rounded-xl hover:bg-blue-50 hover:text-[#285c9a] hover:border-blue-200 transition-all text-xs font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-xl transition-all text-xs font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200/80">
              Không tìm thấy bài viết nào
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h2 className="text-lg font-bold text-slate-800">
                {editingId ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
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
                    placeholder="khuyen-mai-mua-he-2024"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Danh mục</label>
                  <select
                    value={form.category || 'Tin tức'}
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
                  Tiêu đề <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Khuyến mãi mùa hè 2024"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tác giả</label>
                <input
                  type="text"
                  value={form.author || ''}
                  onChange={(e) => set('author', e.target.value)}
                  placeholder="Hải Phát"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <ImageUpload
                label="Ảnh bìa"
                value={form.cover_image || ''}
                onChange={(url) => set('cover_image', url)}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tóm tắt</label>
                <textarea
                  value={form.excerpt || ''}
                  onChange={(e) => set('excerpt', e.target.value)}
                  rows={2}
                  placeholder="Đoạn tóm tắt ngắn..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nội dung</label>
                <textarea
                  value={form.content || ''}
                  onChange={(e) => set('content', e.target.value)}
                  rows={8}
                  placeholder="Nội dung bài viết (hỗ trợ HTML)..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none resize-none font-mono transition-all"
                />
              </div>

              <ArrayInput
                label="Thẻ (tags)"
                values={form.tags || []}
                onChange={(v) => set('tags', v)}
                placeholder="Nhập thẻ rồi Enter..."
              />

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Xuất bản trên website</label>
                <button
                  type="button"
                  onClick={() => set('is_published', !form.is_published)}
                  className={`transition-colors ${form.is_published ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  {form.is_published ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
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
                {editingId ? 'Lưu thay đổi' : 'Thêm bài viết'}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewOpen && previewArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h2 className="text-lg font-bold text-slate-800">{previewArticle.title}</h2>
              <button
                onClick={() => setPreviewOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {previewArticle.cover_image && (
                <img
                  src={previewArticle.cover_image}
                  alt={previewArticle.title}
                  className="w-full h-52 object-cover rounded-xl mb-4 border border-slate-200"
                />
              )}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <span className="px-2.5 py-1 bg-blue-50 text-[#285c9a] border border-blue-100 rounded-lg font-semibold">
                  {previewArticle.category}
                </span>
                <span>Tác giả: {previewArticle.author}</span>
              </div>
              <div
                className="prose prose-sm max-w-none text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: previewArticle.content }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
