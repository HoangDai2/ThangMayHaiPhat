"use client";
import { useState, useEffect } from 'react';
import { Upload, Trash2, Loader2, Image as ImageIcon, Copy, Search, Check } from 'lucide-react';
import api from '../../lib/api';

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
    try {
      const response = await api.get('/admin/images');
      if (response.data) {
        setImages(response.data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await api.post('/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (e) {
        console.error(e);
      }
    }
    setUploading(false);
    await fetchImages();
  };

  const handleDelete = async (name: string) => {
    if (!window.confirm(`Xóa hình ảnh "${name}"?`)) return;
    try {
      await api.post('/admin/images/delete', { name });
      await fetchImages();
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quản lý hình ảnh</h1>
          <p className="text-slate-500 mt-1">{images.length} hình ảnh</p>
        </div>
        <label className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer">
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          {uploading ? 'Đang tải...' : 'Tải lên'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
          />
        </label>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm hình ảnh theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <>
          <label className="block border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-orange-500 transition-colors mb-6">
            <Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Kéo thả hoặc click để tải lên nhiều hình ảnh</p>
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
              <div key={img.name} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => copyUrl(img.url)}
                      className="p-2 bg-white rounded-lg text-slate-700 hover:bg-slate-100"
                      title="Sao chép URL"
                    >
                      {copied === img.url ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(img.name)}
                      className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-slate-600 truncate font-mono">{img.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{formatBytes(img.size)}</p>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full bg-white rounded-xl p-12 text-center text-slate-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                Chưa có hình ảnh nào
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
