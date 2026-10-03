"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, Image, ToggleLeft, ToggleRight } from 'lucide-react';
import api from '../../lib/api';

export interface Promotion {
  id: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  discount_text: string | null;
  image_url: string | null;
  link_url: string | null;
  is_active: boolean;
}

const emptyForm = (): Partial<Promotion> => ({
  id: '',
  title: '',
  subtitle: '',
  description: '',
  discount_text: '',
  image_url: '',
  link_url: '',
  is_active: true,
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
    try {
      const response = await api.get('/promotions');
      setPromotions(response.data);
    } catch (err) {
      console.error(err);
    }
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
    if (!confirm('Bạn có chắc muốn xóa chương trình khuyến mãi này?')) return;
    try {
      await api.delete(`/promotions/${id}`);
      fetchPromotions();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleActive = async (p: Promotion) => {
    try {
      await api.put(`/promotions/${p.id}`, { ...p, is_active: !p.is_active });
      // Reload from server to reflect the fact that only 1 can be active at a time
      fetchPromotions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'promotions');

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm({ ...form, image_url: response.data.url });
    } catch (err: any) {
      alert('Lỗi upload ảnh: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const dataToSave = { ...form };
      delete dataToSave.id;

      if (isEditing && form.id) {
        await api.put(`/promotions/${form.id}`, dataToSave);
      } else {
        await api.post('/promotions', dataToSave);
      }

      setModalOpen(false);
      fetchPromotions();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  const filteredPromotions = promotions.filter((p) => {
    if (!searchTerm) return true;
    return (p.title || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#2d5f9e]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Popup Khuyến Mãi</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý nội dung hiển thị ở popup khi người dùng vào trang (Chỉ cho phép hiển thị 1 chương trình mỗi thời điểm)</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#2d5f9e] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#1a4375] transition-colors shadow-sm"
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
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2d5f9e]/20 focus:border-[#2d5f9e] transition-all bg-white"
          />
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="py-4 px-6">Hình ảnh & Tiêu đề</th>
                <th className="py-4 px-6">Text Giảm Giá</th>
                <th className="py-4 px-6">Link</th>
                <th className="py-4 px-6">Trạng thái</th>
                <th className="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredPromotions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      {p.image_url ? (
                        <img src={p.image_url} alt="" className="w-20 h-12 rounded object-cover border border-slate-200" />
                      ) : (
                        <div className="w-20 h-12 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                          <Image className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-slate-800 line-clamp-1">{p.title || '(Chỉ hình ảnh)'}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{p.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-rose-600">
                    {p.discount_text}
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    {p.link_url ? (
                      <a href={p.link_url} target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">
                        Link
                      </a>
                    ) : (
                      '-'
                    )}
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
                     Không tìm thấy chương trình khuyến mãi nào.
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
            <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[90vh]">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                <h2 className="text-xl font-bold text-slate-800">{isEditing ? 'Sửa Khuyến Mãi' : 'Thêm Khuyến Mãi Mới'}</h2>
                <button
                  type="button"
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
                
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hình ảnh (Tuỳ chọn)</label>
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
                            className="flex-1 px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2d5f9e]/20 focus:border-[#2d5f9e] text-sm"
                            value={form.image_url || ''}
                            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
                        <p className="font-semibold mb-1">Ghi chú hiển thị:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Nếu chỉ nhập hình ảnh, bỏ trống tất cả nội dung chữ: Popup sẽ hiển thị chế độ <b>Chỉ hình ảnh</b>.</li>
                          <li>Nếu nhập tiêu đề, mô tả: Hiển thị chế độ <b>Đầy đủ thông tin</b> (với màu chủ đạo là #2d5f9e).</li>
                        </ul>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-[#2d5f9e] border-slate-300 rounded focus:ring-[#2d5f9e]"
                            checked={form.is_active}
                            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                          />
                          <span className="text-sm font-semibold text-slate-700">Kích hoạt hiển thị popup này</span>
                        </label>
                        <p className="text-xs text-slate-500 mt-1 pl-6">Khi bật, các popup khác sẽ tự động tắt.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tiêu đề (Title)</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2d5f9e]"
                          value={form.title || ''}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tiêu đề phụ (Subtitle)</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2d5f9e]"
                          value={form.subtitle || ''}
                          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nội dung Giảm giá nổi bật</label>
                        <input
                          type="text"
                          placeholder="VD: GIẢM NGAY 20%"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2d5f9e]"
                          value={form.discount_text || ''}
                          onChange={(e) => setForm({ ...form, discount_text: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mô tả chi tiết</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2d5f9e]"
                          value={form.description || ''}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="text-sm font-bold text-slate-700 mb-3">Đường dẫn liên kết (khi nhấn vào popup)</h4>
                      <input
                        type="text"
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#2d5f9e]"
                        value={form.link_url || ''}
                        onChange={(e) => setForm({ ...form, link_url: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
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
                  className="px-5 py-2.5 rounded-xl font-medium bg-[#2d5f9e] text-white hover:bg-[#1a4375] transition-colors flex items-center gap-2"
                  disabled={saving}
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isEditing ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
           </div>
         </div>
       )}
     </div>
   );
 }
