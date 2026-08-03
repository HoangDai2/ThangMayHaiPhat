"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';
import api from '../../lib/api';
import { DbService } from '../../lib/types';
import ArrayInput from '../../components/admin/ArrayInput';

const emptyForm = (): Partial<DbService> => ({
  id: '',
  title: '',
  subtitle: '',
  icon: '',
  short_description: '',
  full_description: '',
  highlights: [],
  process: [],
  is_published: true,
});

export default function AdminServices() {
  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<DbService>>(emptyForm());
  const [error, setError] = useState('');
  const [processInput, setProcessInput] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/services');
      if (response.data) setServices(response.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setIsEditing(false);
    setError('');
    setProcessInput({ title: '', description: '' });
    setModalOpen(true);
  };

  const openEdit = (service: DbService) => {
    setForm({ ...service });
    setIsEditing(true);
    setError('');
    setProcessInput({ title: '', description: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm(emptyForm());
    setError('');
  };

  const set = (field: keyof DbService, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addProcess = () => {
    if (!processInput.title.trim() || !processInput.description.trim()) return;
    const current = form.process || [];
    set('process', [...current, { step: current.length + 1, ...processInput }]);
    setProcessInput({ title: '', description: '' });
  };

  const removeProcess = (i: number) => {
    const filtered = (form.process || []).filter((_, idx) => idx !== i).map((p, idx) => ({ ...p, step: idx + 1 }));
    set('process', filtered);
  };

  const handleSave = async () => {
    if (!form.title?.trim() || !form.id?.trim()) {
      setError('ID (slug) và Tiêu đề là bắt buộc');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      id: form.id!.trim(),
      title: form.title!.trim(),
      subtitle: form.subtitle || '',
      icon: form.icon || '',
      short_description: form.short_description || '',
      full_description: form.full_description || '',
      highlights: form.highlights || [],
      process: form.process || [],
      is_published: form.is_published ?? true,
    };

    try {
      if (isEditing) {
        await api.put(`/admin/services/${form.id}`, payload);
      } else {
        await api.post('/admin/services', payload);
      }
      await fetchServices();
      closeModal();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Xóa dịch vụ "${title}"?`)) return;
    try {
      await api.delete(`/admin/services/${id}`);
      await fetchServices();
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
  };

  const togglePublish = async (service: DbService) => {
    try {
      await api.put(`/admin/services/${service.id}`, { is_published: !service.is_published });
      await fetchServices();
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quản lý dịch vụ</h1>
          <p className="text-slate-500 mt-1">{services.length} dịch vụ</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm dịch vụ
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-xl font-semibold text-slate-800">{service.title}</h3>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-mono">
                      {service.id}
                    </span>
                    <button
                      onClick={() => togglePublish(service)}
                      className={`flex items-center gap-1 text-xs ${service.is_published ? 'text-green-600' : 'text-slate-400'}`}
                    >
                      {service.is_published ? (
                        <ToggleRight className="w-5 h-5" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                      {service.is_published ? 'Hiện' : 'Ẩn'}
                    </button>
                  </div>
                  <p className="text-slate-500 text-sm mb-2">{service.subtitle}</p>
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">{service.short_description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(service.highlights || []).slice(0, 4).map((h, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                        {h}
                      </span>
                    ))}
                    {(service.highlights || []).length > 4 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-full text-xs">
                        +{service.highlights.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(service)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(service.id, service.title)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center text-slate-500">
              Không tìm thấy dịch vụ nào
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800">
                {isEditing ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    ID (slug) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.id || ''}
                    onChange={(e) => set('id', e.target.value)}
                    disabled={isEditing}
                    placeholder="khao-sat-bao-gia"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                  <input
                    type="text"
                    value={form.icon || ''}
                    onChange={(e) => set('icon', e.target.value)}
                    placeholder="clipboard-search"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tên dịch vụ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => set('title', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề phụ</label>
                <input
                  type="text"
                  value={form.subtitle || ''}
                  onChange={(e) => set('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả ngắn</label>
                <textarea
                  value={form.short_description || ''}
                  onChange={(e) => set('short_description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả đầy đủ</label>
                <textarea
                  value={form.full_description || ''}
                  onChange={(e) => set('full_description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                />
              </div>

              <ArrayInput
                label="Điểm nổi bật"
                values={form.highlights || []}
                onChange={(v) => set('highlights', v)}
                placeholder="Nhập điểm nổi bật rồi Enter..."
              />

              {/* Process steps */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Quy trình thực hiện</label>
                <div className="space-y-2 mb-2">
                  <input
                    type="text"
                    placeholder="Tên bước (VD: Khảo sát hiện trường)"
                    value={processInput.title}
                    onChange={(e) => setProcessInput((p) => ({ ...p, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Mô tả bước..."
                      value={processInput.description}
                      onChange={(e) => setProcessInput((p) => ({ ...p, description: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={addProcess}
                      className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {(form.process || []).map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg mb-2 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-700">{step.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{step.description}</p>
                    </div>
                    <button onClick={() => removeProcess(i)} className="text-red-400 hover:text-red-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Hiển thị trên website</label>
                <button
                  type="button"
                  onClick={() => set('is_published', !form.is_published)}
                  className={`${form.is_published ? 'text-green-500' : 'text-slate-300'}`}
                >
                  {form.is_published ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEditing ? 'Lưu thay đổi' : 'Thêm dịch vụ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
