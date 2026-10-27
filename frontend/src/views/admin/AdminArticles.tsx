"use client";
import { useState, useEffect, useRef } from 'react';
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
  Eye,
  ArrowLeft,
  Save,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  Quote,
  Info,
  Link2,
  FileText
} from 'lucide-react';
import api from '../../lib/api';
import { DbArticle } from '../../lib/types';
import ImageUpload from '../../components/admin/ImageUpload';
import ArrayInput from '../../components/admin/ArrayInput';

const CATEGORIES = ['Tin tức', 'Hướng dẫn', 'Dự án', 'Sản phẩm', 'Khuyến mãi', 'Khác'];

const emptyForm = (): Partial<DbArticle> => ({
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  cover_image: '',
  author: 'Hải Phát',
  category: 'Tin tức',
  tags: [],
  is_published: false,
  published_at: null,
});

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

export default function AdminArticles() {
  const [articles, setArticles] = useState<DbArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // View state: 'list' | 'editor'
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<DbArticle>>(emptyForm());
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Slide-over Quick Preview Drawer (replacing old popup modal)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerArticle, setDrawerArticle] = useState<DbArticle | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await api.get('/articles');
      if (response.data) setArticles(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setEditingId(null);
    setError('');
    setEditorTab('write');
    setViewMode('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (article: DbArticle) => {
    setForm({ ...article });
    setEditingId(article.id);
    setError('');
    setEditorTab('write');
    setViewMode('editor');
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToList = () => {
    setViewMode('list');
    setEditingId(null);
    setForm(emptyForm());
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const set = (field: keyof DbArticle, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (val: string) => {
    set('title', val);
    // Auto-suggest slug if creating new and slug hasn't been manually set or matches old slug
    if (!editingId && (!form.slug || form.slug === generateSlug(form.title || ''))) {
      set('slug', generateSlug(val));
    }
  };

  const autoGenerateSlug = () => {
    if (form.title) {
      set('slug', generateSlug(form.title));
    }
  };

  // Helper toolbar tag inserter for content textarea
  const insertTag = (before: string, after: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = form.content || '';
    const selectedText = currentVal.substring(start, end) || defaultPlaceholder;
    const replacement = before + selectedText + after;
    const newVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);
    set('content', newVal);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 50);
  };

  const handleSave = async () => {
    if (!form.title?.trim() || !form.slug?.trim()) {
      setError('Tiêu đề và đường dẫn (slug) là bắt buộc');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      author: form.author || 'Hải Phát',
      category: form.category || 'Tin tức',
      tags: form.tags || [],
      is_published: form.is_published ?? false,
      published_at: form.is_published
        ? form.published_at || new Date().toISOString()
        : null,
    };

    try {
      if (editingId) {
        await api.put(`/articles/${editingId}`, payload);
        setSuccessMessage('Đã cập nhật bài viết thành công!');
      } else {
        await api.post('/articles', payload);
        setSuccessMessage('Đã đăng bài viết mới thành công!');
      }
      await fetchArticles();
      backToList();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lưu bài viết');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Xóa bài viết "${title}"?`)) return;
    try {
      await api.delete(`/articles/${id}`);
      await fetchArticles();
      setSuccessMessage('Đã xóa bài viết thành công!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
  };

  const togglePublish = async (article: DbArticle) => {
    try {
      const payload = {
        is_published: !article.is_published,
        published_at: !article.is_published ? new Date().toISOString() : article.published_at,
      };
      await api.put(`/articles/${article.id}`, payload);
      await fetchArticles();
      setSuccessMessage(`Đã ${!article.is_published ? 'xuất bản' : 'chuyển về bản nháp'} bài viết!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // -------------------------------------------------------------
  // RENDER: FULL-PAGE ARTICLE EDITOR VIEW
  // -------------------------------------------------------------
  if (viewMode === 'editor') {
    return (
      <div className="space-y-6 pb-20">
        {/* Editor Top Navigation & Action Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={backToList}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>Quay lại danh sách</span>
            </button>
            <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#285c9a] border border-blue-200/60 uppercase tracking-wider font-mono">
                  {editingId ? 'Chỉnh sửa bài viết' : 'Soạn bài viết mới'}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    form.is_published
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {form.is_published ? '● Sẽ công khai' : '○ Bản nháp'}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate max-w-md mt-0.5">
                {form.title ? form.title : 'Chưa đặt tiêu đề'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-auto">
            {editingId && form.slug && (
              <a
                href={`/bai-viet/${form.slug}`}
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
              className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 text-xs font-semibold transition-all"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-900/15 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{editingId ? 'Lưu thay đổi' : 'Đăng bài viết'}</span>
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

        {/* Two-Column Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Excerpt Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tiêu đề bài viết <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ví dụ: Báo Giá Lắp Đặt Thang Máy Gia Đình Trọn Gói Mới Nhất 2024"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-lg font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Đoạn tóm tắt ngắn (Excerpt / Mô tả SEO)
                </label>
                <textarea
                  value={form.excerpt || ''}
                  onChange={(e) => set('excerpt', e.target.value)}
                  rows={3}
                  placeholder="Đoạn tóm tắt ngắn khoảng 2-3 câu giới thiệu bài viết, xuất hiện ở thẻ bài viết và tìm kiếm Google..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none resize-none transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Đoạn trích dẫn giúp thu hút người đọc và tối ưu hóa thứ hạng hiển thị trên Google.
                </p>
              </div>
            </div>

            {/* Article Content Area with Tabs (Write vs Live Preview) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              {/* Tab Header & Formatting Tools */}
              <div className="border-b border-slate-200 bg-slate-50/80 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setEditorTab('write')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      editorTab === 'write'
                        ? 'bg-white text-[#285c9a] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Soạn thảo nội dung</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab('preview')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      editorTab === 'preview'
                        ? 'bg-white text-[#285c9a] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem trước giao diện</span>
                  </button>
                </div>

                {editorTab === 'write' && (
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[11px] font-mono text-slate-400 mr-1 hidden sm:inline">Chèn nhanh:</span>
                    <button
                      type="button"
                      onClick={() => insertTag('<h2>', '</h2>', 'Tiêu đề mục (H2)')}
                      title="Tiêu đề H2"
                      className="px-2 py-1 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-0.5"
                    >
                      <Heading2 className="w-3.5 h-3.5 text-[#285c9a]" />
                      <span>H2</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<h3>', '</h3>', 'Tiêu đề con (H3)')}
                      title="Tiêu đề H3"
                      className="px-2 py-1 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-0.5"
                    >
                      <Heading3 className="w-3.5 h-3.5 text-[#285c9a]" />
                      <span>H3</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<strong>', '</strong>', 'văn bản in đậm')}
                      title="In đậm"
                      className="p-1.5 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-slate-700"
                    >
                      <Bold className="w-3.5 h-3.5 text-[#285c9a]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<em>', '</em>', 'văn bản in nghiêng')}
                      title="In nghiêng"
                      className="p-1.5 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-slate-700"
                    >
                      <Italic className="w-3.5 h-3.5 text-[#285c9a]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<ul>\n  <li>', '</li>\n  <li>Ý thứ hai...</li>\n</ul>', 'Ý thứ nhất...')}
                      title="Danh sách gạch đầu dòng"
                      className="p-1.5 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-slate-700"
                    >
                      <List className="w-3.5 h-3.5 text-[#285c9a]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<blockquote>\n  ', '\n</blockquote>', 'Đoạn trích dẫn nổi bật...')}
                      title="Trích dẫn"
                      className="p-1.5 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-slate-700"
                    >
                      <Quote className="w-3.5 h-3.5 text-[#285c9a]" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertTag(
                          '<div class="p-4 my-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl text-slate-800">\n  <p>',
                          '</p>\n</div>',
                          'Thông tin quan trọng cần lưu ý...'
                        )
                      }
                      title="Hộp chú thích nổi bật"
                      className="p-1.5 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-slate-700"
                    >
                      <Info className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertTag(
                          '<a href="https://" class="text-[#285c9a] underline font-medium" target="_blank">',
                          '</a>',
                          'Xem chi tiết tại đây'
                        )
                      }
                      title="Chèn liên kết"
                      className="p-1.5 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-slate-700"
                    >
                      <Link2 className="w-3.5 h-3.5 text-[#285c9a]" />
                    </button>
                  </div>
                )}
              </div>

              {/* Tab 1: Soạn thảo Textarea */}
              {editorTab === 'write' ? (
                <div className="p-5 space-y-3">
                  <textarea
                    ref={textareaRef}
                    value={form.content || ''}
                    onChange={(e) => set('content', e.target.value)}
                    rows={18}
                    placeholder="Nhập nội dung bài viết tại đây (hỗ trợ văn bản thuần và các thẻ HTML: <h2>, <h3>, <p>, <strong>, <ul>, <li>, <blockquote>, <img>...)"
                    className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm leading-relaxed font-mono focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none min-h-[460px] resize-y transition-all"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>
                      Độ dài nội dung: <strong>{(form.content || '').length}</strong> ký tự | Ước tính{' '}
                      <strong>{Math.max(1, Math.ceil((form.content || '').split(/\s+/).length / 200))}</strong> phút đọc
                    </span>
                    <span className="font-mono text-slate-400">HTML FORMAT SUPPORTED</span>
                  </div>
                </div>
              ) : (
                /* Tab 2: Xem trước bài viết (Live Preview) */
                <div className="p-6 sm:p-10 space-y-6 bg-white min-h-[500px]">
                  {form.cover_image && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-900 shadow-sm max-h-[380px]">
                      <img
                        src={form.cover_image}
                        alt={form.title || 'Ảnh bài viết'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="px-2.5 py-1 bg-blue-50 text-[#285c9a] border border-blue-200/60 rounded-md font-bold font-mono">
                        {form.category || 'Tin tức'}
                      </span>
                      <span>Tác giả: <strong>{form.author || 'Hải Phát'}</strong></span>
                      <span>•</span>
                      <span>Ngày: {new Date().toLocaleDateString('vi-VN')}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] leading-tight">
                      {form.title || 'Tiêu đề bài viết sẽ hiển thị ở đây'}
                    </h1>

                    {form.excerpt && (
                      <div className="p-4 bg-slate-50 border-l-4 border-[#285c9a] rounded-r-xl text-slate-700 italic text-sm leading-relaxed">
                        {form.excerpt}
                      </div>
                    )}
                  </div>

                  <hr className="border-slate-100" />

                  {/* Rendered HTML */}
                  {form.content ? (
                    <div
                      className="prose prose-slate max-w-none prose-headings:text-[#0d1f35] prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-[#285c9a] prose-a:font-semibold hover:prose-a:underline prose-img:rounded-2xl prose-img:border prose-img:border-slate-200 prose-img:shadow-sm leading-relaxed text-slate-700 text-sm sm:text-base"
                      dangerouslySetInnerHTML={{ __html: form.content }}
                    />
                  ) : (
                    <div className="py-16 text-center text-slate-400 italic">
                      Chưa có nội dung. Chuyển sang tab "Soạn thảo nội dung" để viết bài.
                    </div>
                  )}

                  {form.tags && form.tags.length > 0 && (
                    <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono uppercase text-slate-400">Thẻ:</span>
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Settings Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Publish Status & Quick Action */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-100">
                Xuất bản & Thao tác
              </h3>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {form.is_published ? 'Đang công khai' : 'Lưu bản nháp'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {form.is_published ? 'Hiển thị trên website' : 'Chỉ lưu trong quản trị'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set('is_published', !form.is_published)}
                  className={`transition-colors p-1 ${form.is_published ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  {form.is_published ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-sm font-bold shadow-md shadow-blue-900/15 transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{editingId ? 'Lưu bài viết' : 'Đăng bài viết mới'}</span>
                </button>
                <button
                  type="button"
                  onClick={backToList}
                  className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold transition-all text-center"
                >
                  Quay lại danh sách
                </button>
              </div>
            </div>

            {/* Card 2: Slug / URL */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Đường dẫn (Slug URL) <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={autoGenerateSlug}
                  title="Tự động tạo đường dẫn từ tiêu đề"
                  className="flex items-center gap-1 text-[11px] font-bold text-[#285c9a] hover:underline"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Tạo từ tiêu đề</span>
                </button>
              </div>
              <input
                type="text"
                value={form.slug || ''}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="khuyen-mai-mua-he-2024"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
              />
              <p className="text-[11px] text-slate-400 break-all">
                Đường dẫn: <span className="font-mono text-[#285c9a]">/bai-viet/{form.slug || '...'}</span>
              </p>
            </div>

            {/* Card 3: Phân loại & Tác giả */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-100">
                Phân loại & Tác giả
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Danh mục bài viết</label>
                <select
                  value={form.category || 'Tin tức'}
                  onChange={(e) => set('category', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tác giả bài viết</label>
                <input
                  type="text"
                  value={form.author || ''}
                  onChange={(e) => set('author', e.target.value)}
                  placeholder="Hải Phát"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>
            </div>

            {/* Card 4: Ảnh đại diện bài viết */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
              <ImageUpload
                label="Ảnh bìa bài viết"
                value={form.cover_image || ''}
                onChange={(url) => set('cover_image', url)}
              />
            </div>

            {/* Card 5: Thẻ bài viết (Tags) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
              <ArrayInput
                label="Thẻ từ khóa (Tags)"
                values={form.tags || []}
                onChange={(v) => set('tags', v)}
                placeholder="Nhập thẻ rồi Enter..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: ARTICLES LIST VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* List Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản Lý Bài Viết</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Tổng cộng {articles.length} bài viết tin tức, cẩm nang và hướng dẫn kỹ thuật
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-blue-900/10 transition-all hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm bài viết mới</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="p-1 hover:bg-emerald-100 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề hoặc tác giả..."
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
                  ? 'bg-[#285c9a] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid or Loading */}
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-9 h-9 animate-spin text-[#285c9a]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                {article.cover_image ? (
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight line-clamp-2">{article.title}</p>
                  <p className="text-blue-100/90 text-xs mt-0.5">{article.author}</p>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#285c9a] text-white rounded-lg text-xs font-semibold shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-slate-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                  {article.excerpt || 'Chưa có đoạn tóm tắt bài viết...'}
                </p>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setDrawerArticle(article);
                        setDrawerOpen(true);
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#285c9a] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem nhanh</span>
                    </button>
                    <button
                      onClick={() => togglePublish(article)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                        article.is_published
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                    >
                      {article.is_published ? (
                        <ToggleRight className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-slate-400" />
                      )}
                      <span>{article.is_published ? 'Đã xuất bản' : 'Bản nháp'}</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(article)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-700 rounded-xl hover:bg-blue-50 hover:text-[#285c9a] hover:border-blue-200 transition-all text-xs font-semibold"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Sửa bài viết</span>
                    </button>
                    <button
                      onClick={() => handleDelete(article.id, article.title)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-xl transition-all text-xs font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-2xl p-16 text-center text-slate-500 border border-slate-200/80">
              <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-bold text-slate-700">Không tìm thấy bài viết nào</p>
              <p className="text-xs text-slate-400 mt-1">Thử thay đổi từ khóa tìm kiếm hoặc bấm Thêm bài viết mới.</p>
            </div>
          )}
        </div>
      )}

      {/* Slide-over Drawer for Quick Preview (Replaces Center Popup Modal) */}
      {drawerOpen && drawerArticle && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-blue-50 text-[#285c9a] border border-blue-200/60 rounded-md text-xs font-bold font-mono uppercase">
                  {drawerArticle.category}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    drawerArticle.is_published
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {drawerArticle.is_published ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              <h2 className="text-xl font-bold text-slate-900 leading-snug">{drawerArticle.title}</h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span>Tác giả: <strong>{drawerArticle.author}</strong></span>
                <span>•</span>
                <span>Đường dẫn: <code className="font-mono text-[#285c9a]">/bai-viet/{drawerArticle.slug}</code></span>
              </div>

              {drawerArticle.cover_image && (
                <div className="rounded-xl overflow-hidden border border-slate-200 max-h-64 bg-slate-900">
                  <img
                    src={drawerArticle.cover_image}
                    alt={drawerArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {drawerArticle.excerpt && (
                <div className="p-4 bg-slate-50 border-l-4 border-[#285c9a] rounded-r-xl text-slate-700 italic text-sm leading-relaxed">
                  {drawerArticle.excerpt}
                </div>
              )}

              <hr className="border-slate-100" />

              <div
                className="prose prose-sm max-w-none prose-headings:text-[#0d1f35] prose-headings:font-bold prose-a:text-[#285c9a] text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: drawerArticle.content || '<p class="italic text-slate-400">Không có nội dung...</p>' }}
              />

              {drawerArticle.tags && drawerArticle.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-mono uppercase text-slate-400">Thẻ:</span>
                  {drawerArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                onClick={() => setDrawerOpen(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
              >
                Đóng
              </button>
              <button
                onClick={() => openEdit(drawerArticle)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Mở trang chỉnh sửa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
