"use client";
import { useState } from 'react';
import { Upload, Loader2, Link as LinkIcon, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MediaLibraryModal from './MediaLibraryModal';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Hình ảnh' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);

  const processDriveUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };

  const handleFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('images').upload(fileName, file);
    if (!error) {
      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      onChange(data.publicUrl);
    }
    setUploading(false);
  };

  const addUrl = () => {
    if (urlInput.trim()) {
      const processedUrl = processDriveUrl(urlInput.trim());
      onChange(processedUrl);
      setUrlInput('');
      setShowUrl(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowLibrary(true)}
            className="text-xs text-[#285c9a] hover:text-blue-700 flex items-center gap-1"
          >
            <ImageIcon className="w-3 h-3" />
            Thư viện ảnh
          </button>
          <button
            type="button"
            onClick={() => setShowUrl(!showUrl)}
            className="text-xs text-orange-500 hover:text-orange-600 flex items-center gap-1"
          >
            <LinkIcon className="w-3 h-3" />
            Dùng URL / GDrive
          </button>
        </div>
      </div>

      {showUrl && (
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Dán link ảnh hoặc link Google Drive (quyền: Bất kỳ ai có liên kết)..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm whitespace-nowrap"
          >
            Thêm URL
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
              Chọn file từ máy tính
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
          <div className="relative shrink-0">
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

      {showLibrary && (
        <MediaLibraryModal
          onClose={() => setShowLibrary(false)}
          onSelect={(url) => {
            onChange(url);
          }}
        />
      )}
    </div>
  );
}
