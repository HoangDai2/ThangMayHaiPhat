"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  MapPin,
  Building2,
  Zap,
  Calendar,
  Shield,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  Phone,
  Clock,
  Layers,
  Ruler,
  Gauge,
  Loader2,
  CheckCircle2,
  Check,
  X,
  Maximize2,
  ZoomIn,
  MoreHorizontal,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useProjectsData } from '../hooks/useProjectsData';
import PageHeader from '../components/shared/PageHeader';

// ===================== Project Detail Component =====================
function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, getById, getRelated } = useProjectsData();
  const project = getById(id || '');
  const related = getRelated(id || '', 3);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Collect all real project photos (gallery + primary cover image)
  const galleryImages = project
    ? Array.from(
        new Set([
          ...(project.gallery || []),
          project.image,
        ].filter(Boolean))
      )
    : [];

  // Enable keyboard navigation and prevent background scrolling in lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % galleryImages.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, galleryImages.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
          <p className="text-sm font-mono text-slate-500">Đang tải hồ sơ dự án...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md">
          <h1 className="text-xl font-bold text-slate-900 mb-3">Không tìm thấy công trình này</h1>
          <p className="text-sm text-slate-500 mb-5">Dự án có thể đang trong giai đoạn cập nhật hoặc điều chỉnh dữ liệu.</p>
          <Link
            href="/du-an"
            className="inline-flex items-center gap-2 bg-[#285c9a] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1e4a80] transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Về danh sách dự án</span>
          </Link>
        </div>
      </div>
    );
  }

  const detailItems = [
    { icon: Building2, label: 'Số tầng phục vụ', value: `${project.details.floors} tầng` },
    { icon: Ruler, label: 'Tải trọng định mức', value: project.details.capacity },
    { icon: Gauge, label: 'Tốc độ vận hành', value: project.details.speed },
    { icon: Zap, label: 'Công nghệ động cơ', value: project.details.brand },
    { icon: Calendar, label: 'Thời gian bàn giao', value: project.details.completionDate },
    { icon: Shield, label: 'Thời hạn bảo hành', value: project.details.warranty },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Unified PageHeader */}
      <PageHeader
        badge={`Dự Án ${project.category}`}
        title={project.title}
        subtitle={`Công trình bàn giao nghiệm thu chuẩn kỹ thuật tại ${project.location}. Cấu hình: ${project.specs}`}
        breadcrumbs={[
          { label: 'Dự án', href: '/du-an' },
          { label: project.title },
        ]}
        telemetryTag="NGHIỆM THU AN TOÀN // BÀN GIAO 100%"
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Mechanical Telemetry Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 mb-12 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {detailItems.map(({ icon: Icon, label, value }, idx) => (
              <div key={label} className={`text-center ${idx > 0 ? 'pt-3 sm:pt-0' : ''}`}>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                  <Icon size={13} className="text-[#285c9a]" />
                  <span>{label}</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-[#0d1f35] font-mono">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Project Gallery & Technical Writeup (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Gallery Showcase - Pinterest / Masonry Waterfall Layout (Image 2 style) */}
            <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-sm">
              {/* Gallery Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#285c9a] flex items-center justify-center shrink-0 border border-blue-100/60 shadow-sm">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#0d1f35] flex items-center gap-2">
                      <span>Hình Ảnh Thực Tế Tại Công Trình</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ảnh chụp thực tế tiến độ và hoàn thiện tại công trình
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 flex items-center gap-1.5">
                    <Camera size={13} className="text-[#285c9a]" />
                    <span>{galleryImages.length} ảnh thực tế</span>
                  </span>

                  {galleryImages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(0)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#285c9a] hover:bg-[#1e4a80] text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
                      title="Mở chế độ phóng to toàn màn hình"
                    >
                      <Maximize2 size={13} />
                      <span>Xem phóng to</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Masonry Columns Grid (Pinterest Style) */}
              <div className="columns-2 sm:columns-2 md:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="break-inside-avoid mb-3 sm:mb-4 inline-block w-full group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-[#285c9a]/30 transition-all duration-300 cursor-pointer"
                  >
                    {/* Natural aspect ratio image */}
                    <img
                      src={img}
                      alt={`${project.title} - Ảnh ${idx + 1}`}
                      className="w-full h-auto object-cover block group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay & Hover Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4">
                      {/* Top Bar on Hover */}
                      <div className="flex items-center justify-between">
                        <span className="bg-[#0d1f35]/80 backdrop-blur-md text-white font-mono text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
                          #{idx + 1}
                        </span>
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors shadow-sm">
                          <ZoomIn size={14} />
                        </span>
                      </div>

                      {/* Bottom Bar on Hover (with 3-dots button like Image 2!) */}
                      <div className="flex items-center justify-between gap-2 pt-2">
                        <span className="text-white text-[11px] sm:text-xs font-medium drop-shadow truncate">
                          {project.title}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(idx);
                          }}
                          className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all shrink-0"
                          title="Xem ảnh chi tiết"
                          aria-label="Tùy chọn ảnh"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Caption / Hint */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#285c9a]" />
                  <span>Bố cục Pinterest Masonry · Giữ nguyên tỷ lệ ảnh thực tế</span>
                </span>
                <span className="hidden sm:inline">Nhấp vào bất kỳ ảnh nào để xem chi tiết</span>
              </div>
            </section>

            {/* Description & Technical Solutions */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0d1f35] mb-4">
                Thông Tin Chi Tiết & Giải Pháp Thi Công
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
            </section>

            {/* Execution Highlights */}
            {((project as any).highlights || project.features) && ((project as any).highlights || project.features).length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#0d1f35] mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#285c9a]" />
                  <span>Điểm Nhấn Kỹ Thuật Đã Triển Khai</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {((project as any).highlights || project.features).map((highlight: string, hIdx: number) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs sm:text-sm text-slate-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#285c9a] mt-1.5 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: Project Summary & Direct Consultation (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Quick Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-[#0d1f35] text-sm uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Hồ Sơ Kỹ Thuật</span>
                <span className="font-mono text-xs text-[#285c9a] font-bold">HP-ENG</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Địa điểm:</span>
                  <span className="font-semibold text-slate-800 text-right">{project.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Phân loại:</span>
                  <span className="font-semibold text-slate-800">{project.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Cấu hình:</span>
                  <span className="font-mono font-bold text-[#285c9a]">{project.specs}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Tiêu chuẩn:</span>
                  <span className="font-mono font-semibold text-slate-800">EN 81 / QCVN</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Trạng thái:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Đã Bàn Giao
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Consultation Box */}
            <div className="bg-[#0d1f35] text-white rounded-2xl p-6 shadow-lg space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300">
                  Tư Vấn Công Trình Tương Tự
                </span>
                <h4 className="font-bold text-base text-white mt-1">Bạn Chuẩn Bị Xây Dựng Hoặc Cải Tạo?</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Nhận tư vấn phương án giếng thang, hố PIT và lập dự toán chi tiết cho ngôi nhà của bạn.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <a
                  href="tel:0898424666"
                  className="flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98]"
                >
                  <Phone size={15} />
                  <span className="font-mono">Gọi 0898 424 666</span>
                </a>

                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors"
                >
                  <span>Gửi Yêu Cầu Khảo Sát</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects Carousel/Grid */}
        {related.length > 0 && (
          <section className="mt-20 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d1f35]">Công Trình Cùng Phân Khúc</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Tham khảo các giải pháp lắp đặt tương tự</p>
              </div>
              <Link
                href="/du-an"
                className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#285c9a] hover:text-[#1e4a80] transition-colors"
              >
                <span>Xem tất cả dự án</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/du-an/${p.id}`}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#285c9a]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-end min-h-[300px]"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/95 via-[#0d1f35]/50 to-transparent" />

                  <span className="absolute top-3 right-3 bg-[#0d1f35]/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {p.category}
                  </span>

                  <div className="relative z-10 p-5 space-y-1.5">
                    <h3 className="text-white font-bold text-base group-hover:text-blue-200 transition-colors drop-shadow-sm">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="truncate">{p.location}</span>
                      <span className="font-mono text-white/90 font-medium">{p.specs}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div
            className="flex items-center justify-between p-4 sm:p-6 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm bg-white/10 px-3 py-1 rounded-lg border border-white/15">
                {lightboxIndex + 1} / {galleryImages.length}
              </span>
              <div className="hidden sm:block">
                <h3 className="text-sm font-semibold text-white/90 truncate max-w-md">
                  {project.title}
                </h3>
                <p className="text-xs text-white/60">Hình ảnh thực tế bàn giao công trình</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={galleryImages[lightboxIndex]}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Mở ảnh gốc trong tab mới"
              >
                <ExternalLink size={18} />
              </a>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                title="Đóng (Esc)"
                aria-label="Đóng xem ảnh"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Center Image Display with Previous / Next Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
                  )
                }
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
                aria-label="Ảnh trước"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Main Large Image */}
            <div className="relative max-h-[75vh] max-w-[90vw] flex items-center justify-center">
              <img
                src={galleryImages[lightboxIndex]}
                alt={`${project.title} - Ảnh ${lightboxIndex + 1}`}
                className="max-h-[75vh] max-w-[90vw] w-auto h-auto object-contain rounded-2xl shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Button */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev === null ? null : (prev + 1) % galleryImages.length
                  )
                }
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div
              className="p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-center gap-2 overflow-x-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-2 max-w-full overflow-x-auto py-1 px-2">
                {galleryImages.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative rounded-xl overflow-hidden shrink-0 transition-all ${
                      lightboxIndex === idx
                        ? 'ring-2 ring-blue-400 scale-105 opacity-100 w-16 h-12'
                        : 'opacity-50 hover:opacity-90 w-14 h-11'
                    }`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===================== Projects List Component =====================
function ProjectsList() {
  const [category, setCategory] = useState<string>('Tất cả');
  const { projects, loading } = useProjectsData();
  const categories = ['Tất cả', ...new Set(projects.map((p) => p.category))];

  const filtered = category === 'Tất cả' ? projects : projects.filter((p) => p.category === category);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
          <p className="text-sm font-mono text-slate-500">Đang tải danh mục dự án...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Unified PageHeader */}
      <PageHeader
        badge="Thư Viện Công Trình"
        title="Dự Án & Công Trình Tiêu Biểu"
        subtitle="Khám phá các công trình thang máy chất lượng cao đã hoàn thành và bàn giao trên toàn quốc: từ biệt thự tư gia cao cấp, nhà phố hiện đại đến các dự án tòa nhà thương mại."
        breadcrumbs={[{ label: 'Dự án' }]}
        telemetryTag="1.000+ CÔNG TRÌNH TOÀN QUỐC"
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${
                category === cat
                  ? 'bg-[#285c9a] text-white shadow-md shadow-[#285c9a]/25'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Masonry Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/du-an/${p.id}`}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-[#285c9a]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-end min-h-[360px]"
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/95 via-[#0d1f35]/50 to-transparent" />

              {/* Category tag */}
              <span className="absolute top-4 right-4 bg-[#0d1f35]/85 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {p.category}
              </span>

              {/* Hover quick badge */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                <span>Xem chi tiết</span>
                <ArrowRight size={13} />
              </div>

              {/* Info Block */}
              <div className="relative z-10 p-6 space-y-2.5">
                <h3 className="text-white font-extrabold text-lg sm:text-xl leading-snug group-hover:text-blue-200 transition-colors drop-shadow">
                  {p.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin size={13} className="text-[#4a7bbf] shrink-0" />
                  <span className="truncate">{p.location}</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono bg-white/10 px-2.5 py-1 rounded text-white font-semibold">
                    {p.specs}
                  </span>
                  <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Đạt chuẩn QCVN
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Proof Band */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#285c9a] font-mono">
                1.000+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Dự Án Nghiệm Thu</div>
              <div className="text-xs text-slate-500 mt-0.5">Đạt 100% chứng chỉ kiểm định an toàn</div>
            </div>

            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#285c9a] font-mono">
                15+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Tỉnh Thành Phủ Sóng</div>
              <div className="text-xs text-slate-500 mt-0.5">Mạng lưới đội cứu hộ & bảo trì lưu động</div>
            </div>

            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">
                98%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Đánh Giá Hài Lòng</div>
              <div className="text-xs text-slate-500 mt-0.5">Khảo sát trực tiếp từ gia chủ sau bàn giao</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectDetail, ProjectsList };
