"use client";
import { useState, useEffect } from 'react';
import { Upload, Trash2, Loader2, Image as ImageIcon, Copy, Search, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ImageItem {
  name: string;
  url: string;
  size: number;
  lastModified: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function AdminImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from('images').list('', {
      sortBy: { column: 'created_at', order: 'desc' },
      limit: 100,
    });
    if (!error && data) {
      const items = data
        .filter((f) => f.id && !f.id.endsWith('.emptyFolderPlaceholder'))
        .map((f) => ({
          name: f.name,
          url: supabase.storage.from('images').getPublicUrl(f.name).data.publicUrl,
          size: f.metadata?.size || 0,
          lastModified: f.created_at || f.updated_at || '',
        }));
      setImages(items);
    }
    setLoading(false);
  };

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      await supabase.storage.from('images').upload(fileName, file);
    }
    setUploading(false);
    await fetchImages();
  };

  const handleDelete = async (name: string) => {
    if (!window.confirm(`Xóa hình ảnh "${name}"?`)) return;
    await supabase.storage.from('images').remove([name]);
    await fetchImages();
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const filtered = images.filter((img) =>
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Thư Viện Hình Ảnh</h1>
          <p className="text-slate-500 text-sm mt-0.5">Tổng cộng {images.length} hình ảnh đã tải lên hệ thống</p>
        </div>
        <label className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Đang tải lên...' : 'Tải ảnh mới'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
          />
        </label>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm hình ảnh theo tên file..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#285c9a] focus:border-transparent outline-none text-sm font-medium transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
        </div>
      ) : (
        <>
          <label className="block border-2 border-dashed border-slate-300 hover:border-[#285c9a] bg-slate-50/50 hover:bg-blue-50/30 rounded-2xl p-8 text-center cursor-pointer transition-all mb-6 group">
            <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#285c9a] mx-auto mb-2 transition-colors" />
            <p className="text-slate-700 font-semibold text-sm">Kéo thả hoặc nhấp vào đây để tải lên nhiều hình ảnh cùng lúc</p>
            <p className="text-slate-400 text-xs mt-1">Hỗ trợ định dạng JPG, PNG, WEBP, GIF (Tối đa 10MB/file)</p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
            />
          </label>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img) => (
              <div key={img.name} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => copyUrl(img.url)}
                      className="p-2.5 bg-white rounded-xl text-slate-700 hover:text-[#285c9a] shadow-md transition-all"
                      title="Sao chép URL"
                    >
                      {copied === img.url ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(img.name)}
                      className="p-2.5 bg-white rounded-xl text-slate-400 hover:text-rose-600 shadow-md transition-all"
                      title="Xóa ảnh"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-slate-700 font-mono truncate font-semibold">{img.name}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{formatBytes(img.size)}</p>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200/80">
                <ImageIcon className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                Chưa có hình ảnh nào trong thư viện
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
