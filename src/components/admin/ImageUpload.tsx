"use client";
import { useState } from 'react';
import { Upload, Loader2, Link as LinkIcon, X } from 'lucide-react';
import api from '../../lib/api';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Hình ảnh' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlInput, setUrlInput] = useState('');

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
        const fullUrl = url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
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
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrl(!showUrl)}
          className="text-xs text-orange-500 hover:text-orange-600 flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          Dùng URL
        </button>
      </div>

      {showUrl && (
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
          >
            OK
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors text-sm text-slate-500">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang tải lên...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Chọn file để tải lên
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
        {value && (
          <div className="relative">
            <img src={value} alt="preview" className="h-16 w-16 rounded-lg object-cover border" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
