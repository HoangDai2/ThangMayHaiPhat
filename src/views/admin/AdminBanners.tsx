"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, Image, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Banner } from '../../hooks/useBannersData';

const emptyForm = (): Partial<Banner> => ({
  id: '',
  title: '',
  subtitle: '',
  description: '',
  image_url: '',
  link_url: '',
  position: 'hero',
  sort_order: 0,
  is_active: true,
  media_type: 'image',
  video_url: '',
  primary_button_text: '',
  primary_button_link: '',
  secondary_button_text: '',
  secondary_button_link: '',
});

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<Banner>>(emptyForm());
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setBanners(data);
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setIsEditing(false);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (b: Banner) => {
    setForm(b);
    setIsEditing(true);
    setError('');
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa banner này?')) return;
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (!error) fetchBanners();
  };

  const toggleActive = async (b: Banner) => {
    const { error } = await supabase
      .from('banners')
      .update({ is_active: !b.is_active })
      .eq('id', b.id);
    if (!error) {
      setBanners(banners.map((item) => (item.id === b.id ? { ...item, is_active: !b.is_active } : item)));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `banners/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      alert('Lỗi upload ảnh: ' + uploadError.message);
      setUploadingImage(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    setForm({ ...form, image_url: publicUrl });
    setUploadingImage(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const dataToSave = { ...form };
      delete dataToSave.id; // Do not send id if it's empty or during insert/update for uuid

      if (isEditing && form.id) {
        const { error: updateError } = await supabase
          .from('banners')
          .update(dataToSave)
          .eq('id', form.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('banners')
          .insert([dataToSave]);
        if (insertError) throw insertError;
      }

      setModalOpen(false);
      fetchBanners();
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  const filteredBanners = banners.filter((b) =>
    b.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Banner</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý các slide banner hiển thị trên trang chủ</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#285c9a] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#1a4375] transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Thêm Banner</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm banner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#285c9a]/20 focus:border-[#285c9a] transition-all bg-white"
          />
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="py-4 px-6">Banner</th>
                <th className="py-4 px-6">Vị trí & Thứ tự</th>
                <th className="py-4 px-6">Nút bấm</th>
                <th className="py-4 px-6">Trạng thái</th>
                <th className="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredBanners.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      {b.image_url ? (
                        <img src={b.image_url} alt="" className="w-20 h-12 rounded object-cover border border-slate-200" />
                      ) : (
                        <div className="w-20 h-12 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                          <Image className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-slate-800 line-clamp-1">{b.title || '(Không có tiêu đề)'}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{b.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium mr-2">
                      {b.position}
                    </span>
                    <span className="text-slate-500">#{b.sort_order}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs space-y-1">
                    <div>1. {b.primary_button_text}</div>
                    <div>2. {b.secondary_button_text}</div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleActive(b)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        b.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {b.is_active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      {b.is_active ? 'Đang bật' : 'Đã tắt'}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(b)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBanners.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    Không tìm thấy banner nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">{isEditing ? 'Sửa Banner' : 'Thêm Banner Mới'}</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {error && (
                <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-sm rounded-xl border border-rose-100">
                  {error}
                </div>
              )}
              <form id="bannerForm" onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hình ảnh banner</label>
                      {form.image_url && (
                        <div className="relative h-32 rounded-lg overflow-hidden border border-slate-200 mb-3">
                          <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <label className="flex-1 cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-300 border-dashed py-2.5 px-4 rounded-xl text-center transition-colors">
                          <span className="text-sm text-slate-600 font-medium">
                            {uploadingImage ? 'Đang tải lên...' : 'Tải ảnh lên'}
                          </span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                        </label>
                        <input
                          type="text"
                          placeholder="Hoặc dán URL ảnh"
                          className="flex-1 px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#285c9a]/20 focus:border-[#285c9a] text-sm"
                          value={form.image_url}
                          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Thứ tự hiển thị</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#285c9a]"
                        value={form.sort_order}
                        onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tiêu đề (Title)</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#285c9a]"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tiêu đề phụ (Subtitle)</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#285c9a]"
                        value={form.subtitle}
                        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mô tả (Description)</label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#285c9a]"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Cài đặt Nút bấm</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                      <h4 className="text-sm font-bold text-slate-700">Nút chính (Tư vấn)</h4>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Text</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                          value={form.primary_button_text}
                          onChange={(e) => setForm({ ...form, primary_button_text: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Link URL</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                          value={form.primary_button_link}
                          onChange={(e) => setForm({ ...form, primary_button_link: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                      <h4 className="text-sm font-bold text-slate-700">Nút phụ (Xem dự án)</h4>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Text</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                          value={form.secondary_button_text}
                          onChange={(e) => setForm({ ...form, secondary_button_text: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Link URL</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                          value={form.secondary_button_link}
                          onChange={(e) => setForm({ ...form, secondary_button_link: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                disabled={saving}
              >
                Hủy
              </button>
              <button
                type="submit"
                form="bannerForm"
                className="px-5 py-2.5 rounded-xl font-medium bg-[#285c9a] text-white hover:bg-[#1a4375] transition-colors flex items-center gap-2"
                disabled={saving}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEditing ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
