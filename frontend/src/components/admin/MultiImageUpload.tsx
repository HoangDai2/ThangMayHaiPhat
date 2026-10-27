"use client";
import { useState } from 'react';
import { Upload, Loader2, Link as LinkIcon, X, Plus, FolderOpen } from 'lucide-react';
import api from '../../lib/api';
import ImagePickerModal from './ImagePickerModal';

interface Props {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export default function MultiImageUpload({ values = [], onChange, label = 'Thư viện ảnh' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleFile = async (files: FileList) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await api.post('/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        if (response.data?.url) {
          const url = response.data.url;
          const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
          const fullUrl = url.startsWith('http') || url.startsWith('/') ? url : `${backendBase}${url}`;
          newUrls.push(fullUrl);
        }
      }
      if (newUrls.length > 0) {
        onChange([...values, ...newUrls]);
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
      onChange([...values, urlInput.trim()]);
      setUrlInput('');
      setShowUrl(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
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
            {showUrl ? 'Ẩn URL' : 'Thêm bằng URL'}
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
            Thêm
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2.5">
        {values.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`gallery-${index}`}
              className="h-20 w-20 rounded-xl object-cover border border-slate-200 shadow-sm"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 shadow-md"
              title="Xóa ảnh này"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <label className="h-20 w-20 border-2 border-dashed border-slate-300 hover:border-[#285c9a] hover:bg-blue-50/20 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all text-slate-400 hover:text-[#285c9a]">
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Plus className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold">Tải lên</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFile(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Image Picker Modal */}
      <ImagePickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => onChange([...values, url])}
        title="Chọn ảnh vào bộ sưu tập"
      />
    </div>
  );
}
