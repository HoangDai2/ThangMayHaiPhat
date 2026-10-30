"use client";
import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Loader2,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
  Clock,
  ArrowLeft,
  Save,
  Check,
  ExternalLink,
  Sparkles,
  Info,
  Gift,
  Link2,
  FileText
} from 'lucide-react';
import api from '../../lib/api';
import ImageUpload from '../../components/admin/ImageUpload';

export interface Promotion {
  id: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  discount_text: string | null;
  image_url: string | null;
  link_url: string | null;
  delay_seconds?: number;
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
  delay_seconds: 5,
  is_active: true,
});

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // View state: 'list' | 'editor'
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<Promotion>>(emptyForm());
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    setViewMode('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (p: Promotion) => {
    setForm({
      ...p,
      delay_seconds: p.delay_seconds !== undefined && p.delay_seconds !== null ? p.delay_seconds : 5,
    });
    setIsEditing(true);
    setError('');
    setViewMode('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToList = () => {
    setViewMode('list');
    setForm(emptyForm());
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const set = (field: keyof Promotion, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleDelete = async (id: string, title?: string | null) => {
    const name = title || 'này';
    if (!confirm(`Bạn có chắc muốn xóa chương trình khuyến mãi "${name}"?`)) return;
    try {
      await api.delete(`/promotions/${id}`);
      await fetchPromotions();
      setSuccessMessage('Đã xóa chương trình khuyến mãi thành công!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Xóa khuyến mãi thất bại');
    }
  };

  const toggleActive = async (p: Promotion) => {
    try {
      await api.put(`/promotions/${p.id}`, { ...p, is_active: !p.is_active });
      // Tải lại để cập nhật trạng thái (hệ thống chỉ cho phép kích hoạt 1 popup tại 1 thời điểm)
      await fetchPromotions();
      setSuccessMessage(
        !p.is_active
          ? `Đã kích hoạt popup "${p.title || 'Khuyến mãi'}". Các popup khác đã được tắt tự động.`
          : `Đã tắt popup "${p.title || 'Khuyến mãi'}"`
      );
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);

    try {
      const dataToSave: Record<string, any> = {
        title: form.title || '',
        subtitle: form.subtitle || '',
        description: form.description || '',
        discount_text: form.discount_text || '',
        image_url: form.image_url || '',
        link_url: form.link_url || '',
        delay_seconds: form.delay_seconds !== undefined && form.delay_seconds !== null ? Number(form.delay_seconds) : 5,
        is_active: form.is_active ?? true,
      };

      if (isEditing && form.id) {
        await api.put(`/promotions/${form.id}`, dataToSave);
        setSuccessMessage('Đã cập nhật chương trình khuyến mãi thành công!');
      } else {
        await api.post('/promotions', dataToSave);
        setSuccessMessage('Đã tạo chương trình khuyến mãi mới thành công!');
      }

      await fetchPromotions();
      backToList();
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi lưu khuyến mãi');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  const filteredPromotions = promotions.filter((p) => {
    if (!searchTerm) return true;
    return (
      (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.subtitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.discount_text || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // -------------------------------------------------------------
  // RENDER: FULL-PAGE PROMOTION EDITOR VIEW
  // -------------------------------------------------------------
  if (viewMode === 'editor') {
    return (
      <div className="space-y-6 pb-20">
        {/* Editor Top Sticky Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={backToList}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>Quay lại danh sách</span>
            </button>
            <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#285c9a] border border-blue-200/60 uppercase tracking-wider font-mono">
                  {isEditing ? 'Chỉnh sửa popup khuyến mãi' : 'Tạo popup khuyến mãi mới'}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    form.is_active
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {form.is_active ? '● Đang kích hoạt' : '○ Đang tắt'}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate max-w-md mt-0.5">
                {form.title ? form.title : form.image_url ? '(Khuyến mãi dạng chỉ hình ảnh)' : 'Chưa đặt tiêu đề khuyến mãi'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-auto">
            {form.link_url && (
              <a
                href={form.link_url}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all border border-slate-200"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#285c9a]" />
                <span>Xem liên kết</span>
              </a>
            )}
            <button
              type="button"
              onClick={backToList}
              className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 text-xs font-semibold transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-900/15 transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isEditing ? 'Lưu thay đổi' : 'Tạo khuyến mãi'}</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium flex items-center justify-between shadow-xs">
            <span>{error}</span>
            <button onClick={() => setError('')} className="p-1 hover:bg-rose-100 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card 1: Thông tin nội dung */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Gift className="w-5 h-5 text-[#285c9a]" />
                <h2 className="text-base font-bold text-slate-800">Nội dung chương trình khuyến mãi</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tiêu đề khuyến mãi (Title)
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Ví dụ: Ưu Đãi Mùa Hè - Tặng Gói Bảo Trì 2 Năm"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Có thể để trống nếu bạn muốn hiển thị popup ở chế độ <b>Chỉ hình ảnh banner</b>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Tiêu đề phụ (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={form.subtitle || ''}
                    onChange={(e) => set('subtitle', e.target.value)}
                    placeholder="Ví dụ: Áp dụng cho 10 khách hàng đăng ký sớm nhất"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Điểm nhấn giảm giá (Discount Text)
                  </label>
                  <input
                    type="text"
                    value={form.discount_text || ''}
                    onChange={(e) => set('discount_text', e.target.value)}
                    placeholder="Ví dụ: GIẢM NGAY 20% hoặc TẶNG 50 TRIỆU"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-rose-600 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mô tả chi tiết ưu đãi
                </label>
                <textarea
                  value={form.description || ''}
                  onChange={(e) => set('description', e.target.value)}
                  rows={4}
                  placeholder="Mô tả cụ thể về thể lệ chương trình, các dòng thang máy áp dụng, thời hạn áp dụng..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-slate-400" />
                  Đường dẫn liên kết khi khách bấm vào popup (Link URL)
                </label>
                <input
                  type="text"
                  value={form.link_url || ''}
                  onChange={(e) => set('link_url', e.target.value)}
                  placeholder="Ví dụ: /lien-he hoặc https://thangmayhaiphat.vn/san-pham/thang-homelift"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Khi người dùng click vào banner hoặc nút kêu gọi trên popup, họ sẽ được chuyển hướng tới trang này.
                </p>
              </div>
            </div>

            {/* Card 2: Thời gian chờ & Hướng dẫn hiển thị */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Clock className="w-5 h-5 text-[#285c9a]" />
                <h2 className="text-base font-bold text-slate-800">Cấu hình thời gian xuất hiện</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Thời gian chờ trước khi popup bật lên
                </label>
                <div className="relative max-w-xs">
                  <input
                    type="number"
                    min={0}
                    max={300}
                    step={1}
                    value={form.delay_seconds !== undefined && form.delay_seconds !== null ? form.delay_seconds : 5}
                    onChange={(e) => set('delay_seconds', parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3.5 py-2.5 pr-14 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    giây
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Thời gian tính từ lúc khách truy cập vào trang web cho đến khi popup hiển thị (Mặc định: 5 giây, nhập <b>0</b> để bật lên ngay tức thì).
                </p>
              </div>

              {/* Informative helper box */}
              <div className="p-4 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-900 space-y-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <Info className="w-4 h-4 text-[#285c9a]" />
                  <span>Quy tắc hiển thị thông minh của Popup:</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>
                    <b>Chế độ Chỉ hình ảnh:</b> Nếu bạn tải lên hình ảnh banner và bỏ trống Tiêu đề, Mô tả thì popup sẽ hiển thị trọn vẹn banner hình ảnh nổi bật.
                  </li>
                  <li>
                    <b>Chế độ Đầy đủ thông tin:</b> Nếu bạn nhập Tiêu đề, Mô tả và Text giảm giá, popup sẽ hiển thị bố cục thẻ ưu đãi chuyên nghiệp kết hợp hình ảnh minh họa.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Trạng thái kích hoạt */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-100">
                Trạng thái popup
              </h3>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <div>
                  <p className="text-xs font-bold text-slate-800">Kích hoạt popup này</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {form.is_active ? 'Đang bật hiển thị trên website' : 'Đang tạm dừng hiển thị'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set('is_active', !form.is_active)}
                  className={`transition-colors cursor-pointer ${form.is_active ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  {form.is_active ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
                * Lưu ý: Hệ thống chỉ hiển thị tối đa <b>1 popup</b> duy nhất tại một thời điểm để không làm phiền khách hàng. Khi bật popup này, các popup khác sẽ tự động tắt.
              </p>
            </div>

            {/* Card 2: Hình ảnh banner popup */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#285c9a]" />
                  Hình ảnh Banner Popup
                </h3>
              </div>
              <ImageUpload
                label="HÌNH ẢNH KHUYẾN MÃI"
                value={form.image_url || ''}
                onChange={(url) => set('image_url', url)}
              />
              <p className="text-[11px] text-slate-400">
                Khuyến nghị: Định dạng ảnh rõ nét JPG/PNG, kích thước khoảng 800x600px hoặc 600x800px.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: LIST VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/90">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản Lý Popup Khuyến Mãi</h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý nội dung hiển thị ở popup khi khách hàng vào website (Hệ thống tự động hiển thị 1 chương trình được kích hoạt)
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Khuyến Mãi</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-medium flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="p-1 hover:bg-emerald-100 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Toolbar Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm chương trình khuyến mãi theo tiêu đề, ưu đãi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#285c9a] focus:border-transparent outline-none text-sm font-medium transition-all"
          />
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-4 px-6">Hình ảnh & Tiêu đề</th>
                <th className="py-4 px-6">Điểm nhấn giảm giá</th>
                <th className="py-4 px-6">Thời gian chờ</th>
                <th className="py-4 px-6">Liên kết</th>
                <th className="py-4 px-6">Trạng thái</th>
                <th className="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredPromotions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt=""
                          className="w-20 h-14 rounded-xl object-cover border border-slate-200 shadow-2xs"
                        />
                      ) : (
                        <div className="w-20 h-14 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-slate-800 line-clamp-1 text-sm">
                          {p.title || '(Chỉ hình ảnh banner)'}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5 line-clamp-1">{p.subtitle || 'Không có tiêu đề phụ'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-rose-600 text-sm">
                    {p.discount_text || '-'}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#285c9a]" />
                      {p.delay_seconds !== undefined && p.delay_seconds !== null ? p.delay_seconds : 5}s
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    {p.link_url ? (
                      <a
                        href={p.link_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#285c9a] hover:underline font-mono text-xs flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Link</span>
                      </a>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                        p.is_active
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-2xs'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                      title={p.is_active ? 'Nhấn để tắt popup' : 'Nhấn để bật popup này (các popup khác sẽ tự tắt)'}
                    >
                      {p.is_active ? (
                        <ToggleRight className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-slate-400" />
                      )}
                      {p.is_active ? 'Đang kích hoạt' : 'Đang tắt'}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 text-slate-600 hover:text-[#285c9a] hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                        title="Chỉnh sửa khuyến mãi"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                        title="Xóa khuyến mãi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPromotions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Không tìm thấy chương trình khuyến mãi nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
