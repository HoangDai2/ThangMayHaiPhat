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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quản lý bài viết</h1>
          <p className="text-slate-500 mt-1">{articles.length} bài viết</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm bài viết
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white'
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
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative h-40 overflow-hidden bg-slate-100">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold text-sm line-clamp-2">{article.title}</p>
                  <p className="text-white/70 text-xs">{article.author}</p>
                </div>
                <span className="absolute top-3 left-3 px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
                  {article.category}
                </span>
              </div>
              <div className="p-4">
                <p className="text-slate-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => {
                      setPreviewArticle(article);
                      setPreviewOpen(true);
                    }}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-orange-500"
                  >
                    <Eye className="w-4 h-4" />
                    Xem nhanh
                  </button>
                  <button
                    onClick={() => togglePublish(article)}
                    className={`flex items-center gap-1 text-xs ${article.is_published ? 'text-green-600' : 'text-slate-400'}`}
                  >
                    {article.is_published ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    {article.is_published ? 'Đăng' : 'Bản nháp'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(article)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
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
              Không tìm thấy bài viết nào
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? 'Sửa bài viết' : 'Thêm bài viết mới'}
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
                    Slug (URL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.slug || ''}
                    onChange={(e) => set('slug', e.target.value)}
                    placeholder="khuyen-mai-mua-he-2024"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Danh mục</label>
                  <select
                    value={form.category || 'Tin tức'}
                    onChange={(e) => set('category', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

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
                <label className="block text-sm font-medium text-slate-700 mb-1">Tác giả</label>
                <input
                  type="text"
                  value={form.author || ''}
                  onChange={(e) => set('author', e.target.value)}
                  placeholder="Hải Phát"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <ImageUpload
                label="Ảnh bìa"
                value={form.cover_image || ''}
                onChange={(url) => set('cover_image', url)}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tóm tắt</label>
                <textarea
                  value={form.excerpt || ''}
                  onChange={(e) => set('excerpt', e.target.value)}
                  rows={2}
                  placeholder="Đoạn tóm tắt ngắn..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung</label>
                <textarea
                  value={form.content || ''}
                  onChange={(e) => set('content', e.target.value)}
                  rows={8}
                  placeholder="Nội dung bài viết (hỗ trợ HTML)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none font-mono"
                />
              </div>

              <ArrayInput
                label="Thẻ (tags)"
                values={form.tags || []}
                onChange={(v) => set('tags', v)}
                placeholder="Nhập thẻ rồi Enter..."
              />

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Xuất bản</label>
                <button
                  type="button"
                  onClick={() => set('is_published', !form.is_published)}
                  className={form.is_published ? 'text-green-500' : 'text-slate-300'}
                >
                  {form.is_published ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
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
                {editingId ? 'Lưu thay đổi' : 'Thêm bài viết'}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewOpen && previewArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800">{previewArticle.title}</h2>
              <button
                onClick={() => setPreviewOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {previewArticle.cover_image && (
                <img
                  src={previewArticle.cover_image}
                  alt={previewArticle.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {previewArticle.category}
                </span>
                <span>{previewArticle.author}</span>
              </div>
              <div
                className="prose prose-sm max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: previewArticle.content }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
