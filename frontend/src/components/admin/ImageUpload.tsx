"use client";
import { useState } from 'react';
import { Upload, Loader2, Link as LinkIcon, X, FolderOpen } from 'lucide-react';
import api from '../../lib/api';
import ImagePickerModal from './ImagePickerModal';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Hình ảnh' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (response.data?.url) {
        const url = response.data.url;
        const fullUrl = url.startsWith('http') || url.startsWith('/') ? url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
        onChange(fullUrl);
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Tải ảnh thất bại');
    } finally {
      setUploading(false);
    }
  };

  const addUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowUrl(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">{label}</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="text-xs text-[#285c9a] hover:text-[#1e4a80] font-semibold flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors shadow-2xs"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#285c9a]" />
            Thư viện ảnh
          </button>
          <button
            type="button"
            onClick={() => setShowUrl(!showUrl)}
            className="text-xs text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <LinkIcon className="w-3 h-3" />
            {showUrl ? 'Ẩn URL' : 'Dùng URL'}
          </button>
        </div>
      </div>

      {showUrl && (
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#285c9a] outline-none"
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-4 py-2 bg-[#285c9a] text-white rounded-xl hover:bg-[#1e4a80] text-xs font-semibold"
          >
            Áp dụng
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-[#285c9a] hover:bg-blue-50/20 transition-all text-xs sm:text-sm text-slate-500 font-medium">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#285c9a]" />
              Đang tải lên...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 text-[#285c9a]" />
              Chọn file từ máy tính
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            disabled={uploading}
          />
        </label>

        {value && (
          <div className="relative group shrink-0">
            <img
              src={value}
              alt="Preview"
              className="h-14 w-14 rounded-xl object-cover border border-slate-200 shadow-sm"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 shadow-md"
              title="Xóa ảnh"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Image Picker Modal */}
      <ImagePickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => onChange(url)}
        title={`Chọn ${label.toLowerCase()} từ thư viện`}
      />
    </div>
  );
}
