"use client";

import { useState, useEffect } from 'react';
import { X, Search, Loader2, Image as ImageIcon, Upload, Check } from 'lucide-react';
import api from '../../lib/api';

interface ImageUsage {
  type: string;
  id: string | null;
  source: string;
  field: string;
  label: string;
}

export interface ImageItem {
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

interface ImagePickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
}

export default function ImagePickerModal({
  open,
  onClose,
  onSelect,
  title = 'Chọn hình ảnh từ thư viện',
}: ImagePickerModalProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchImages();
      setActiveUrl(null);
    }
  }, [open]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/images');
      if (res.data && Array.isArray(res.data)) {
        setImages(res.data);
      }
    } catch (err) {
      console.error('Lỗi tải thư viện ảnh:', err);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(e.target.files)) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await api.post('/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data?.url) {
          onSelect(res.data.url);
          onClose();
          return;
        }
      }
      await fetchImages();
    } catch (err) {
      console.error(err);
      alert('Tải ảnh thất bại');
    } finally {
      setUploading(false);
    }
  };

  if (!open) return null;

  const categories = ['all', ...Array.from(new Set(images.map((img) => img.category).filter(Boolean)))];

  const filtered = images.filter((img) => {
    const matchCat = selectedCat === 'all' || img.category === selectedCat;
    const matchSearch =
      img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (img.source && img.source.toLowerCase().includes(searchTerm.toLowerCase())) ||
      img.url.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleConfirm = (url: string) => {
    onSelect(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="text-base font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tổng cộng {images.length} hình ảnh trên toàn hệ thống
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#285c9a] text-white hover:bg-[#1e4a80] rounded-xl text-xs font-semibold cursor-pointer shadow-sm transition-all">
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{uploading ? 'Đang tải...' : 'Tải ảnh mới'}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCat === cat
                    ? 'bg-[#285c9a] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc nguồn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
            />
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
              <p className="text-xs">Đang tải thư viện hình ảnh...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <ImageIcon className="w-12 h-12 mb-2 text-slate-300 stroke-1" />
              <p className="text-sm font-medium text-slate-600">Không tìm thấy hình ảnh phù hợp</p>
              <p className="text-xs text-slate-400 mt-1">Hãy thử đổi từ khóa tìm kiếm hoặc chọn danh mục khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((img) => {
                const isSelected = activeUrl === img.url;
                return (
                  <div
                    key={img.id}
                    onClick={() => setActiveUrl(img.url)}
                    onDoubleClick={() => handleConfirm(img.url)}
                    className={`group relative bg-white rounded-xl border overflow-hidden cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#285c9a] ring-2 ring-[#285c9a]/30 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="aspect-square bg-slate-100 overflow-hidden relative">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/70 text-white rounded text-[10px] font-semibold backdrop-blur-sm">
                        {img.category || 'Ảnh'}
                      </span>
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#285c9a]/25 flex items-center justify-center">
                          <div className="w-7 h-7 bg-[#285c9a] text-white rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-slate-800 truncate" title={img.name}>
                        {img.name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5" title={img.source}>
                        {img.source || 'Hệ thống'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-white flex items-center justify-between">
          <p className="text-xs text-slate-500 truncate max-w-md">
            {activeUrl ? `Đã chọn: ${activeUrl}` : 'Nhấp vào ảnh để chọn hoặc nhấp đúp để dùng ngay'}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              disabled={!activeUrl}
              onClick={() => activeUrl && handleConfirm(activeUrl)}
              className="px-5 py-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs font-semibold shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Dùng ảnh này
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
