"use client";
import { useState } from 'react';
import { Upload, Loader2, Link as LinkIcon, X, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Props {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export default function MultiImageUpload({ values = [], onChange, label = 'Thư viện ảnh' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('images').upload(fileName, file);
    if (!error) {
      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      onChange([...values, data.publicUrl]);
    }
    setUploading(false);
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
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrl(!showUrl)}
          className="text-xs text-[#285c9a] hover:text-blue-700 flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          Thêm bằng URL
        </button>
      </div>

      {showUrl && (
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#285c9a] outline-none"
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-3 py-2 bg-[#285c9a] text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Thêm
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {values.map((url, index) => (
          <div key={index} className="relative group">
            <img src={url} alt={`gallery-${index}`} className="h-20 w-20 rounded-lg object-cover border border-slate-200" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        
        <label className="flex flex-col items-center justify-center h-20 w-20 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#285c9a] transition-colors text-slate-500 bg-slate-50 hover:bg-blue-50/50">
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">Tải ảnh</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
}
