"use client";

import { useState, useEffect, useMemo } from 'react';
import {
  Upload,
  Trash2,
  Loader2,
  Image as ImageIcon,
  Copy,
  Search,
  Check,
  Eye,
  ExternalLink,
  Tag,
  RefreshCw,
  FolderOpen,
  X,
  Layers,
} from 'lucide-react';
import api from '../../lib/api';

interface ImageUsage {
  type: string;
  id: string | null;
  source: string;
  field: string;
  label: string;
}

interface ImageItem {
  id: string;
  name: string;
  url: string;
  size: number;
  lastModified: string;
  source: string;
  category: string;
  model_type?: string;
  model_id?: string | null;
  path?: string | null;
  usage_count: number;
  usages?: ImageUsage[];
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return 'Đường dẫn web';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Dự án': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Sản phẩm': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Dịch vụ': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  'Bài viết': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Banner': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Khuyến mãi': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  'Đánh giá': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'Tải lên': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  'Hệ thống': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
};

export default function AdminImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<ImageItem | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/images');
      if (response.data && Array.isArray(response.data)) {
        setImages(response.data);
      }
    } catch (e) {
      console.error('Lỗi khi tải thư viện ảnh:', e);
    }
    setLoading(false);
  };

  const handleUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        await api.post('/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      await fetchImages();
    } catch (e) {
      console.error('Lỗi tải ảnh:', e);
      alert('Tải ảnh lên thất bại');
    }
    setUploading(false);
  };

  const handleDelete = async (img: ImageItem) => {
    const isUsed = img.usage_count > 0;
    const msg = isUsed
      ? `Hình ảnh "${img.name}" đang được sử dụng tại ${img.usage_count} vị trí (${img.source}). Bạn có chắc chắn muốn xóa và gỡ bỏ hình ảnh này khỏi website?`
      : `Bạn có chắc muốn xóa hình ảnh "${img.name}" khỏi hệ thống?`;

    if (!window.confirm(msg)) return;

    try {
      await api.post('/admin/images/delete', {
        url: img.url,
        path: img.path,
        name: img.name,
      });
      if (previewImage?.id === img.id) {
        setPreviewImage(null);
      }
      await fetchImages();
    } catch (e) {
      console.error(e);
      alert('Xóa hình ảnh thất bại');
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      alert('Không thể sao chép URL');
    }
  };

  // Grouped counts for category pills
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: images.length };
    images.forEach((img) => {
      const cat = img.category || 'Khác';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [images]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(images.map((img) => img.category).filter(Boolean)));
    return ['all', ...cats];
  }, [images]);

  const filtered = useMemo(() => {
    return images.filter((img) => {
      const matchCat = selectedCategory === 'all' || img.category === selectedCategory;
      const q = searchTerm.toLowerCase();
      const matchSearch =
        img.name.toLowerCase().includes(q) ||
        (img.source && img.source.toLowerCase().includes(q)) ||
        img.url.toLowerCase().includes(q) ||
        (img.usages && img.usages.some((u) => u.label.toLowerCase().includes(q)));
      return matchCat && matchSearch;
    });
  }, [images, selectedCategory, searchTerm]);

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Thư Viện Hình Ảnh</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Quản lý tập trung toàn bộ <span className="font-semibold text-slate-700">{images.length}</span> hình ảnh trên website (Dự án, Sản phẩm, Bài viết, Banner, Đánh giá & Tải lên)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchImages}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-[#285c9a] hover:border-slate-300 rounded-xl transition-all shadow-sm"
            title="Làm mới danh sách"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <label className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{uploading ? 'Đang tải lên...' : 'Tải ảnh mới'}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6 space-y-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#285c9a] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                <span>{cat === 'all' ? 'Tất cả ảnh' : cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm hình ảnh theo tên file, tên dự án, sản phẩm, bài viết hoặc URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#285c9a] focus:border-transparent outline-none text-xs sm:text-sm font-medium transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white rounded-2xl border border-slate-200/80">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
          <p className="text-sm font-medium text-slate-600">Đang quét toàn bộ hình ảnh website...</p>
        </div>
      ) : (
        <>
          {/* Quick Dropzone */}
          <label className="block border-2 border-dashed border-slate-300 hover:border-[#285c9a] bg-slate-50/50 hover:bg-blue-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all mb-6 group">
            <Upload className="w-7 h-7 text-slate-400 group-hover:text-[#285c9a] mx-auto mb-2 transition-colors" />
            <p className="text-slate-700 font-semibold text-sm">
              Kéo thả hoặc nhấp vào đây để tải lên nhiều hình ảnh cùng lúc
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Hỗ trợ định dạng JPG, PNG, WEBP, GIF, SVG (Tối đa 10MB/file)
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
              disabled={uploading}
            />
          </label>

          {/* Grid of Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((img) => {
              const catStyle = CATEGORY_COLORS[img.category] || {
                bg: 'bg-slate-100',
                text: 'text-slate-700',
                border: 'border-slate-200',
              };

              return (
                <div
                  key={img.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
                >
                  {/* Thumbnail box */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Category badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border shadow-sm backdrop-blur-sm ${catStyle.bg}/90 ${catStyle.text} ${catStyle.border}`}
                      >
                        {img.category}
                      </span>
                    </div>

                    {/* Usage count badge */}
                    {img.usage_count > 0 && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/80 text-white shadow-sm backdrop-blur-sm">
                          <Layers className="w-2.5 h-2.5 text-blue-300" />
                          {img.usage_count}
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay Action Buttons */}
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] transition-opacity flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 p-2 z-20">
                      <button
                        onClick={() => copyUrl(img.url)}
                        className="p-2 bg-white rounded-xl text-slate-700 hover:text-[#285c9a] hover:scale-105 shadow-md transition-all"
                        title="Sao chép URL"
                      >
                        {copiedUrl === img.url ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => setPreviewImage(img)}
                        className="p-2 bg-white rounded-xl text-slate-700 hover:text-[#285c9a] hover:scale-105 shadow-md transition-all"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <a
                        href={img.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-white rounded-xl text-slate-700 hover:text-[#285c9a] hover:scale-105 shadow-md transition-all"
                        title="Mở ảnh gốc"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDelete(img)}
                        className="p-2 bg-white rounded-xl text-slate-400 hover:text-rose-600 hover:scale-105 shadow-md transition-all"
                        title="Xóa ảnh"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-800 truncate" title={img.name}>
                        {img.name}
                      </p>
                      <p
                        className="text-[11px] text-slate-500 truncate mt-0.5 leading-tight"
                        title={img.source}
                      >
                        {img.source || 'Hệ thống'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      <span>{formatBytes(img.size)}</span>
                      {copiedUrl === img.url ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Đã chép
                        </span>
                      ) : (
                        <button
                          onClick={() => copyUrl(img.url)}
                          className="hover:text-[#285c9a] font-medium"
                        >
                          Chép URL
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="col-span-full bg-white rounded-2xl p-16 text-center text-slate-500 border border-slate-200/80">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-300 stroke-1" />
                <p className="text-base font-semibold text-slate-700">Chưa có hình ảnh nào phù hợp</p>
                <p className="text-xs text-slate-400 mt-1">
                  Thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục "Tất cả ảnh"
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Lightbox & Detailed Metadata Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${
                    CATEGORY_COLORS[previewImage.category]?.bg || 'bg-slate-100'
                  } ${CATEGORY_COLORS[previewImage.category]?.text || 'text-slate-700'} ${
                    CATEGORY_COLORS[previewImage.category]?.border || 'border-slate-200'
                  }`}
                >
                  {previewImage.category}
                </span>
                <h3 className="text-sm font-bold text-slate-800 truncate max-w-md" title={previewImage.name}>
                  {previewImage.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {/* Image Preview */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center max-h-[420px]">
                <img
                  src={previewImage.url}
                  alt={previewImage.name}
                  className="max-h-[400px] w-auto max-w-full object-contain"
                />
              </div>

              {/* Info details */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Đường dẫn ảnh (URL)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={previewImage.url}
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-700 select-all"
                    />
                    <button
                      onClick={() => copyUrl(previewImage.url)}
                      className="px-3 py-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      {copiedUrl === previewImage.url ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Usages breakdown */}
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Các vị trí đang sử dụng trên Website ({previewImage.usage_count || 1})
                  </label>
                  {previewImage.usages && previewImage.usages.length > 0 ? (
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {previewImage.usages.map((u, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 bg-white border border-slate-200/80 rounded-lg text-xs text-slate-700 flex items-center justify-between"
                        >
                          <span className="font-medium">{u.label}</span>
                          <span className="text-[10px] font-mono text-slate-400 uppercase px-1.5 py-0.5 bg-slate-100 rounded">
                            {u.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                      {previewImage.source || 'Tệp tải lên độc lập'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <button
                onClick={() => handleDelete(previewImage)}
                className="px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa khỏi website</span>
              </button>

              <div className="flex gap-2">
                <a
                  href={previewImage.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-white flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở tab mới</span>
                </a>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-all"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
