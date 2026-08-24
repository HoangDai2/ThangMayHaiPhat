"use client";
import { useState, useEffect } from 'react';
import { X, Loader2, Trash2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MediaLibraryModalProps {
  onClose: () => void;
  onSelect: (url: string) => void;
}

interface MediaFile {
  name: string;
  url: string;
  id: string;
  created_at: string;
}

export default function MediaLibraryModal({ onClose, onSelect }: MediaLibraryModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from('images').list();
    if (error) {
      console.error('Error fetching files:', error);
      setLoading(false);
      return;
    }

    if (data) {
      const fileUrls = data
        .filter((file) => file.name !== '.emptyFolderPlaceholder')
        .map((file) => {
          const { data: urlData } = supabase.storage.from('images').getPublicUrl(file.name);
          return {
            name: file.name,
            url: urlData.publicUrl,
            id: file.id,
            created_at: file.created_at,
          };
        })
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setFiles(fileUrls);
    }
    setLoading(false);
  };

  const handleDelete = async (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    if (!window.confirm('Bạn có chắc chắn muốn xóa ảnh này? Hành động này không thể hoàn tác.')) {
      return;
    }

    setDeletingId(fileName);
    const { error } = await supabase.storage.from('images').remove([fileName]);
    if (error) {
      console.error('Error deleting file:', error);
      alert('Không thể xóa ảnh. Vui lòng thử lại.');
    } else {
      setFiles((prev) => prev.filter((f) => f.name !== fileName));
    }
    setDeletingId(null);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#285c9a]" />
            Thư viện ảnh
          </h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-500">
              <ImageIcon className="w-12 h-12 mb-3 text-slate-300" />
              <p>Thư viện chưa có hình ảnh nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file) => (
                <div
                  key={file.name}
                  onClick={() => {
                    onSelect(file.url);
                    onClose();
                  }}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:ring-2 hover:ring-[#285c9a] hover:border-transparent transition-all"
                >
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-all flex items-center justify-center">
                    <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100">
                      Chọn ảnh
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, file.name)}
                    disabled={deletingId === file.name}
                    className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 hover:bg-rose-600 transition-all shadow-md disabled:opacity-50"
                    title="Xóa ảnh"
                  >
                    {deletingId === file.name ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
