"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  discount_text: string;
  description: string;
  button_text: string;
  button_link: string;
  image_url?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const emptyForm = (): Partial<Promotion> => ({
  id: '',
  title: '',
  subtitle: '',
  discount_text: '',
  description: '',
  button_text: '',
  button_link: '',
  image_url: '',
  is_active: false,
});

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<Promotion>>(emptyForm());
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setPromotions(data);
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setIsEditing(false);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (p: Promotion) => {
    setForm(p);
    setIsEditing(true);
    setError('');
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa khuyến mãi này?')) return;
    const { error } = await supabase.from('promotions').delete().eq('id', id);
    if (!error) fetchPromotions();
  };

  const toggleActive = async (p: Promotion) => {
    // If activating, we might want to deactivate others (optional, depending on business logic).
    // Let's assume only one should be active at a time.
    if (!p.is_active) {
      await supabase.from('promotions').update({ is_active: false }).neq('id', p.id);
    }

    const { error } = await supabase
      .from('promotions')
      .update({ is_active: !p.is_active })
      .eq('id', p.id);
    
    if (!error) {
      fetchPromotions(); // refetch to get updated states
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `promotions/${fileName}`;

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
      const dataToSave = { ...form, updated_at: new Date().toISOString() };
      delete dataToSave.id;
      delete dataToSave.created_at;

      // If this one is set to active, deactivate others
      if (dataToSave.is_active) {
         await supabase.from('promotions').update({ is_active: false }).neq('id', form.id || '00000000-0000-0000-0000-000000000000');
      }

      if (isEditing && form.id) {
        const { error: updateError } = await supabase
          .from('promotions')
          .update(dataToSave)
          .eq('id', form.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('promotions')
          .insert([dataToSave]);
        if (insertError) throw insertError;
      }

      setModalOpen(false);
      fetchPromotions();
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  const filteredPromotions = promotions.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Khuyến Mãi (Popup)</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý các chương trình khuyến mãi hiển thị trên popup trang chủ</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#285c9a] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#1a4375] transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Thêm Khuyến Mãi</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
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
                <th className="py-4 px-6">Tiêu đề</th>
                <th className="py-4 px-6">Mức giảm</th>
                <th className="py-4 px-6">Nút bấm</th>
                <th className="py-4 px-6">Trạng thái</th>
                <th className="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredPromotions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-800">{p.title}</div>
                    <div className="text-slate-500 text-xs mt-0.5 line-clamp-1">{p.subtitle}</div>
                  </td>
                  <td className="py-4 px-6 font-bold text-red-500">{p.discount_text}</td>
                  <td className="py-4 px-6 text-slate-500 text-xs">
                    <div>{p.button_text}</div>
                    <div className="text-blue-500 hover:underline">{p.button_link}</div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        p.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {p.is_active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      {p.is_active ? 'Đang bật' : 'Đã tắt'}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPromotions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    Chưa có chương trình khuyến mãi nào.
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">{isEditing ? 'Sửa Khuyến Mãi' : 'Thêm Khuyến Mãi'}</h2>
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
              <form id="promoForm" onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hình ảnh nổi bật (Tùy chọn)</label>
                    {form.image_url && (
                      <div className="relative h-32 w-auto inline-block rounded-lg overflow-hidden border border-slate-200 mb-3">
                        <img src={form.image_url} alt="Preview" className="h-full object-cover" />
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
                        value={form.image_url || ''}
                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tiêu đề chính (Ví dụ: ƯU ĐÃI THÁNG VÀNG)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#285c9a]"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tiêu đề phụ</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#285c9a]"
                      value={form.subtitle}
                      onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mức giảm giá (Ví dụ: 10% hoặc 5 Triệu)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#285c9a] font-bold text-red-500"
                      value={form.discount_text}
                      onChange={(e) => setForm({ ...form, discount_text: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Đoạn mô tả chi tiết</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#285c9a]"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Cài đặt Nút bấm</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Text trên nút</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                        value={form.button_text}
                        onChange={(e) => setForm({ ...form, button_text: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Link URL (Ví dụ: #contact)</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                        value={form.button_link}
                        onChange={(e) => setForm({ ...form, button_link: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-slate-300 text-[#285c9a] focus:ring-[#285c9a]"
                      checked={form.is_active}
                      onChange={(e) => setForm({...form, is_active: e.target.checked})}
                    />
                    <span className="text-sm font-semibold text-slate-700">Kích hoạt hiển thị popup này (sẽ tự động tắt các popup khác)</span>
                  </label>
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
                form="promoForm"
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
