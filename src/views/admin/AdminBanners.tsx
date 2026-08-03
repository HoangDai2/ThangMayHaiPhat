"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Loader2, Image as ImageIcon, ToggleLeft, ToggleRight, Video, Sparkles, Tag, Layout, Wrench, Eye, Check, ArrowRight, Layers } from 'lucide-react';
import { supabase, DbBanner } from '../../lib/supabase';
import ImageUpload from '../../components/admin/ImageUpload';
import { getYouTubeEmbedUrl, isDirectVideo } from '../../lib/video';

const POSITIONS = ['hero', 'sub', 'sidebar'];
const MEDIA_TYPES = ['image', 'video'] as const;

interface BannerTemplate {
  id: string;
  name: string;
  badge: string;
  description: string;
  icon: any;
  defaults: Partial<DbBanner>;
}

const TEMPLATES: BannerTemplate[] = [
  {
    id: 'template_hero',
    name: 'Mẫu 1: Sang Trọng & Hiện Đại',
    badge: 'Hero Trang Chủ',
    description: 'Thiết kế chuẩn trang chủ với tiêu đề lớn, huy hiệu uy tín & hình ảnh công trình sang trọng.',
    icon: Sparkles,
    defaults: {
      title: 'Giải Pháp Thang Máy Hiện Đại & Sang Trọng',
      subtitle: 'Chất lượng khẳng định thương hiệu',
      description: 'Chuyên thiết kế, thi công lắp đặt thang máy gia đình và thang máy tải khách cao cấp chuẩn Châu Âu.',
      media_type: 'image',
      image_url: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
      position: 'hero',
      link_url: '/san-pham',
      sort_order: 1,
      is_active: true,
    },
  },
  {
    id: 'template_video',
    name: 'Mẫu 2: Video Trải Nghiệm Thực Tế',
    badge: 'Video Trang Chủ',
    description: 'Phát video tự động YouTube hoặc file MP4 trực tiếp công trình đang vận hành.',
    icon: Video,
    defaults: {
      title: 'Trải Nghiệm Công Trình Thang Máy Kính Thực Tế',
      subtitle: 'Video Dự Án Tiêu Biểu',
      description: 'Khám phá công nghệ vận hành êm ái, an toàn tuyệt đối qua video trực tiếp công trình Hải Phát.',
      media_type: 'video',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      image_url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
      position: 'hero',
      link_url: '/du-an',
      sort_order: 2,
      is_active: true,
    },
  },
  {
    id: 'template_promo',
    name: 'Mẫu 3: Ưu Đãi & Khuyến Mãi Nổi Bật',
    badge: 'Khuyến Mãi Hot',
    description: 'Tối ưu cho chiến dịch giảm giá chiết khấu, tặng gói bảo trì hoặc quà tặng khách hàng.',
    icon: Tag,
    defaults: {
      title: 'Ưu Đãi 15% Chi Phí Lắp Đặt Thang Máy Gia Đình',
      subtitle: 'Chương Trình Tri Ân Khách Hàng 2026',
      description: 'Tặng ngay gói bảo trì miễn phí 2 năm và gói bảo hiểm an toàn toàn diện khi đăng ký trong tháng này.',
      media_type: 'image',
      image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
      position: 'hero',
      link_url: '/lien-he',
      sort_order: 3,
      is_active: true,
    },
  },
  {
    id: 'template_villa',
    name: 'Mẫu 4: Thang Máy Kính Biệt Thự',
    badge: 'Banner Phụ / Sub',
    description: 'Chuyên biệt cho các dòng sản phẩm biệt thự cao cấp, nâng tầm không gian sống.',
    icon: Layout,
    defaults: {
      title: 'Thang Máy Kính Biệt Thự - Tinh Tế Trong Từng Chi Tiết',
      subtitle: 'Thiết Kế Tối Ưu Diện Tích',
      description: 'Tối ưu không gian lấy sáng, khung kính mạ PVD vàng sang trọng nâng tầm giá trị ngôi nhà bạn.',
      media_type: 'image',
      image_url: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
      position: 'hero',
      link_url: '/san-pham/thang-may-kinh',
      sort_order: 4,
      is_active: true,
    },
  },
  {
    id: 'template_service',
    name: 'Mẫu 5: Dịch Vụ Bảo Trì 24/7',
    badge: 'Dịch vụ 24/7',
    description: 'Mẫu quảng bá dịch vụ ứng cứu khẩn cấp, bảo trì kỹ thuật 24/7.',
    icon: Wrench,
    defaults: {
      title: 'Dịch Vụ Bảo Trì & Ứng Cứu Khẩn Cấp 24/7',
      subtitle: 'An Tâm Trên Mỗi Chuyến Đi',
      description: 'Đội ngũ kỹ thuật viên có mặt chỉ trong 30 phút. Linh kiện chính hãng, bảo hành dài hạn.',
      media_type: 'image',
      image_url: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
      position: 'hero',
      link_url: '/dich-vu',
      sort_order: 5,
      is_active: true,
    },
  },
];

const emptyForm = (): Partial<DbBanner> => ({
  title: '',
  subtitle: '',
  description: '',
  image_url: '',
  video_url: '',
  media_type: 'image',
  link_url: '',
  position: 'hero',
  sort_order: 0,
  is_active: true,
});

export default function AdminBanners() {
  const [banners, setBanners] = useState<DbBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<DbBanner>>(emptyForm());
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>('templates');
  const [error, setError] = useState('');

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
    setEditingId(null);
    setSelectedTemplateId(null);
    setActiveTab('templates');
    setError('');
    setModalOpen(true);
  };

  const openEdit = (banner: DbBanner) => {
    setForm({ ...banner });
    setEditingId(banner.id);
    setSelectedTemplateId(null);
    setActiveTab('custom');
    setError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setSelectedTemplateId(null);
    setError('');
  };

  const applyTemplate = (tpl: BannerTemplate) => {
    setSelectedTemplateId(tpl.id);
    setForm({ ...tpl.defaults });
    setActiveTab('custom');
  };

  const set = (field: keyof DbBanner, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.title?.trim()) {
      setError('Tiêu đề là bắt buộc');
      return;
    }
    setSaving(true);
    setError('');

    const payload: Record<string, any> = {
      title: form.title!.trim(),
      subtitle: form.subtitle || '',
      description: form.description || '',
      image_url: form.image_url || '',
      video_url: form.video_url || '',
      media_type: form.media_type || 'image',
      link_url: form.link_url || '',
      position: form.position || 'hero',
      sort_order: form.sort_order || 0,
      is_active: form.is_active ?? true,
    };

    let err: any = null;
    let attempts = 0;

    while (attempts < 5) {
      if (editingId) {
        ({ error: err } = await supabase.from('banners').update(payload).eq('id', editingId));
      } else {
        ({ error: err } = await supabase.from('banners').insert(payload));
      }

      if (!err) break;

      if (err.message && (err.message.includes('schema cache') || err.message.includes('Could not find the'))) {
        const match = err.message.match(/Could not find the '([^']+)' column/);
        if (match && match[1] && match[1] in payload) {
          delete payload[match[1]];
          attempts++;
          continue;
        }
      }
      break;
    }

    if (err) {
      setError(err.message);
    } else {
      await fetchBanners();
      closeModal();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Xóa banner "${title}"?`)) return;
    await supabase.from('banners').delete().eq('id', id);
    await fetchBanners();
  };

  const toggleActive = async (banner: DbBanner) => {
    await supabase.from('banners').update({ is_active: !banner.is_active }).eq('id', banner.id);
    await fetchBanners();
  };

  const renderMediaPreview = (banner: Partial<DbBanner>) => {
    if (banner.media_type === 'video' && banner.video_url) {
      const ytEmbed = getYouTubeEmbedUrl(banner.video_url);
      if (ytEmbed) {
        return (
          <iframe
            src={ytEmbed}
            className="w-full h-full object-cover pointer-events-none"
            allow="autoplay; encrypted-media"
            title={banner.title || 'Video'}
          />
        );
      }
      if (isDirectVideo(banner.video_url)) {
        return (
          <video
            src={banner.video_url}
            className="w-full h-full object-cover"
            muted
            playsInline
            autoPlay
            loop
          />
        );
      }
    }
    if (banner.image_url) {
      return (
        <img
          src={banner.image_url}
          alt={banner.title || 'Banner'}
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <div className="flex items-center justify-center h-full text-slate-300">
        <ImageIcon className="w-12 h-12" />
      </div>
    );
  };

  const activeTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản Lý Banner & Mẫu Giao Diện</h1>
          <p className="text-slate-500 text-sm mt-0.5">Tổng cộng {banners.length} banner đang lưu trữ trên hệ thống</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openAdd}
            className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-blue-900/10 transition-all"
          >
            <Plus className="w-4 h-4" />
            Tạo từ Kho Mẫu Banner
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="relative h-48 overflow-hidden bg-slate-900">
                {renderMediaPreview(banner)}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight line-clamp-1">{banner.title}</p>
                  <p className="text-blue-100/90 text-xs mt-0.5 line-clamp-1">{banner.subtitle}</p>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/70 backdrop-blur-sm text-white rounded-lg text-xs font-semibold uppercase tracking-wider">
                  {banner.position}
                </span>
                {banner.media_type === 'video' && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#285c9a] text-white rounded-lg text-xs font-semibold flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Video
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3 pt-1 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 text-xs font-medium">Thứ tự sắp xếp: {banner.sort_order}</span>
                  <button
                    onClick={() => toggleActive(banner)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                      banner.is_active 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    {banner.is_active ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                    {banner.is_active ? 'Hiển thị' : 'Đang ẩn'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(banner)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-700 rounded-xl hover:bg-blue-50 hover:text-[#285c9a] hover:border-blue-200 transition-all text-xs font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Tùy chỉnh
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id, banner.title)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 border border-slate-200/70 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-xl transition-all text-xs font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
          {banners.length === 0 && (
            <div className="col-span-2 bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200/80">
              Chưa có banner nào. Hãy nhấp vào <strong>"Tạo từ Kho Mẫu Banner"</strong> để bắt đầu.
            </div>
          )}
        </div>
      )}

      {/* Modal Tùy Chỉnh & Chọn Mẫu Banner */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100 my-auto">
            {/* Header Modal */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {editingId ? 'Chỉnh Sửa Banner' : 'Tạo & Tùy Chỉnh Banner'}
                </h2>
                <p className="text-slate-500 text-xs mt-0.5">Chọn mẫu thiết kế và tùy chỉnh các thông số hiển thị theo ý muốn</p>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs (Bước 1: Kho mẫu | Bước 2: Tùy chỉnh) */}
            <div className="px-6 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('templates')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'templates'
                      ? 'bg-[#285c9a] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Bước 1: Chọn Mẫu Banner ({TEMPLATES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('custom')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'custom'
                      ? 'bg-[#285c9a] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <Edit className="w-3.5 h-3.5" />
                  Bước 2: Tùy Chỉnh Thông Số
                </button>
              </div>

              {activeTemplate && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-[#285c9a] rounded-lg text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  Đã chọn: {activeTemplate.name}
                </span>
              )}
            </div>

            {/* Body Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                  {error}
                </div>
              )}

              {/* TAB 1: KHO MẪU BANNER */}
              {activeTab === 'templates' && (
                <div className="space-y-4">
                  <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#285c9a] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#285c9a] uppercase tracking-wider">Kho Mẫu Thiết Kế Sẵn</h4>
                      <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                        Nhấp chọn một mẫu dưới đây để tự động nạp bố cục chuẩn. Sau khi chọn xong, bạn hoàn toàn có thể tùy chỉnh lại chữ, hình ảnh, video và vị trí hiển thị theo ý muốn.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TEMPLATES.map((tpl) => {
                      const IconComponent = tpl.icon;
                      const isSelected = selectedTemplateId === tpl.id;
                      return (
                        <div
                          key={tpl.id}
                          className={`rounded-2xl border p-4 transition-all flex flex-col justify-between cursor-pointer ${
                            isSelected
                              ? 'border-[#285c9a] ring-2 ring-[#285c9a]/20 bg-blue-50/30 shadow-md'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                          }`}
                          onClick={() => applyTemplate(tpl)}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#285c9a]">
                                <IconComponent className="w-4 h-4 text-[#285c9a]" />
                                {tpl.name}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                {tpl.badge}
                              </span>
                            </div>
                            <p className="text-slate-500 text-xs mb-3 leading-relaxed">{tpl.description}</p>
                            
                            {/* Preview box inside card */}
                            <div className="relative h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-200/60 mb-3">
                              {tpl.defaults.image_url && (
                                <img src={tpl.defaults.image_url} alt={tpl.name} className="w-full h-full object-cover opacity-80" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-3 flex flex-col justify-end">
                                <span className="text-white font-bold text-xs line-clamp-1">{tpl.defaults.title}</span>
                                <span className="text-blue-200 text-[10px] font-medium line-clamp-1">{tpl.defaults.subtitle}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              applyTemplate(tpl);
                            }}
                            className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                              isSelected
                                ? 'bg-[#285c9a] text-white shadow-sm'
                                : 'bg-slate-100 text-slate-700 hover:bg-[#285c9a] hover:text-white'
                            }`}
                          >
                            {isSelected ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                            {isSelected ? 'Đã Chọn Mẫu Này - Nhấp Để Tùy Chỉnh' : 'Chọn & Tùy Chỉnh Mẫu Này'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: TÙY CHỈNH THÔNG SỐ & XEM TRƯỚC HÌNH ẢNH */}
              {activeTab === 'custom' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Form Controls (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Thông Số Tùy Chỉnh</h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('templates')}
                        className="text-xs text-[#285c9a] hover:underline font-semibold"
                      >
                        Đổi Mẫu Thiết Kế Phù Hợp
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Tiêu đề chính <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.title || ''}
                        onChange={(e) => set('title', e.target.value)}
                        placeholder="VD: Giải Pháp Thang Máy Gia Đình Sang Trọng"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Tiêu đề phụ / Huy hiệu (Badge)
                      </label>
                      <input
                        type="text"
                        value={form.subtitle || ''}
                        onChange={(e) => set('subtitle', e.target.value)}
                        placeholder="VD: Chất lượng khẳng định thương hiệu"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Mô tả chi tiết banner
                      </label>
                      <textarea
                        value={form.description || ''}
                        onChange={(e) => set('description', e.target.value)}
                        placeholder="Đoạn văn ngắn mô tả sản phẩm/dịch vụ trên banner..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none resize-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Loại Media Truyền Thông</label>
                      <div className="flex gap-3">
                        {MEDIA_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => set('media_type', type)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all text-xs font-semibold ${
                              form.media_type === type
                                ? 'border-[#285c9a] bg-blue-50/70 text-[#285c9a] shadow-sm'
                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {type === 'image' ? <ImageIcon className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                            <span className="capitalize">{type === 'image' ? 'Hình ảnh' : 'Video YouTube / MP4'}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {form.media_type === 'video' ? (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">URL Video</label>
                        <input
                          type="text"
                          value={form.video_url || ''}
                          onChange={(e) => set('video_url', e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=... hoặc dán link file .mp4"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          Hỗ trợ dán đường dẫn YouTube hoặc file MP4 trực tiếp.
                        </p>
                      </div>
                    ) : (
                      <ImageUpload
                        label="Ảnh Banner"
                        value={form.image_url || ''}
                        onChange={(url) => set('image_url', url)}
                      />
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Đường dẫn khi nhấp (CTA Link)</label>
                        <input
                          type="text"
                          value={form.link_url || ''}
                          onChange={(e) => set('link_url', e.target.value)}
                          placeholder="/san-pham hoặc /lien-he"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Vị trí hiển thị</label>
                        <select
                          value={form.position || 'hero'}
                          onChange={(e) => set('position', e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all capitalize"
                        >
                          {POSITIONS.map((p) => (
                            <option key={p} value={p}>{p === 'hero' ? 'Trang chủ Hero (Chính)' : p === 'sub' ? 'Phụ (Sub Section)' : 'Thanh bên (Sidebar)'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Thứ tự sắp xếp</label>
                        <input
                          type="number"
                          value={form.sort_order || 0}
                          onChange={(e) => set('sort_order', Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                        />
                      </div>
                      <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 mt-auto">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Kích hoạt</label>
                        <button
                          type="button"
                          onClick={() => set('is_active', !form.is_active)}
                          className={`transition-colors ${form.is_active ? 'text-emerald-600' : 'text-slate-300'}`}
                        >
                          {form.is_active ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Preview (5 cols) */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-[#285c9a]" />
                        Xem Trước Giao Diện Thực Tế
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#285c9a] border border-blue-100 uppercase">
                        {form.position || 'hero'}
                      </span>
                    </div>

                    <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative min-h-[280px] flex flex-col justify-between p-5">
                      {/* Media Background */}
                      <div className="absolute inset-0 z-0">
                        {renderMediaPreview(form)}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f35]/90 via-[#285c9a]/70 to-[#285c9a]/30" />
                      </div>

                      {/* Content Overlay */}
                      <div className="relative z-10 space-y-3">
                        {form.subtitle && (
                          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-white/90 text-[10px] font-medium tracking-wide uppercase">
                              {form.subtitle}
                            </span>
                          </div>
                        )}

                        <h2 className="text-lg font-bold text-white leading-tight">
                          {form.title || 'Tiêu đề Banner Tùy Chỉnh'}
                        </h2>

                        {form.description && (
                          <p className="text-xs text-white/80 line-clamp-3 leading-relaxed">
                            {form.description}
                          </p>
                        )}
                      </div>

                      {/* Button CTA Preview */}
                      <div className="relative z-10 pt-4">
                        <div className="inline-flex items-center gap-2 bg-[#285c9a] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md">
                          <span>Khám phá ngay</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic text-center">
                      * Khung xem trước hiển thị thời gian thực theo thông số bạn tùy chỉnh.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Modal Actions */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'custom' ? 'templates' : 'custom')}
                className="text-xs font-semibold text-slate-600 hover:text-[#285c9a] flex items-center gap-1"
              >
                {activeTab === 'custom' ? '← Quay lại Kho Mẫu' : 'Chuyển sang Tùy Chỉnh →'}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 text-xs font-semibold transition-all"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-900/10 transition-all disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? 'Lưu Thay Đổi' : 'Lưu & Xuất Bản Banner'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
