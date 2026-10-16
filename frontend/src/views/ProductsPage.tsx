"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Home,
  Building2,
  Truck,
  Eye,
  HeartPulse,
  Clock,
  Shield,
  Zap,
  Star,
  Layers,
  Settings,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Cpu,
  Ruler,
  Gauge,
} from 'lucide-react';
import { Product } from '../data/products';
import { useProductsData } from '../hooks/useProductsData';
import PageHeader from '../components/shared/PageHeader';
import SectionHeader from '../components/shared/SectionHeader';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home: Home,
  building: Building2,
  truck: Truck,
  eye: Eye,
  'heart-pulse': HeartPulse,
};

// ===================== Products List View =====================
export function ProductsList() {
  const { products, loading } = useProductsData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
          <p className="text-sm font-mono text-slate-500">Đang tải danh mục sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Unified High-End Page Header */}
      <PageHeader
        badge="Catalogue Sản Phẩm"
        title="Dòng Thang Máy Cơ Điện Cao Cấp"
        subtitle="Hệ thống thang máy liên doanh và nhập khẩu nguyên chiếc đạt chuẩn chất lượng Châu Âu EN 81 và QCVN. May đo chuẩn xác cho biệt thự, nhà phố và tòa nhà cao tầng."
        breadcrumbs={[{ label: 'Sản phẩm' }]}
        telemetryTag="CHỨNG NHẬN CO/CQ 100% // ISO 9001"
      />

      {/* Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const Icon = iconMap[product.icon] || Building2;
            return (
              <Link
                key={product.id}
                href={`/san-pham/${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-[#285c9a]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Media Image with Dark Gradient Wash */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-900">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/90 via-[#0d1f35]/30 to-transparent" />

                  {/* Icon Node */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-md">
                    <Icon size={20} />
                  </div>

                  {/* Telemetry pill */}
                  <span className="absolute top-4 right-4 bg-[#0d1f35]/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    May Đo Theo Yêu Cầu
                  </span>

                  <div className="absolute bottom-3.5 left-4 right-4">
                    <h3 className="text-white font-extrabold text-lg sm:text-xl drop-shadow group-hover:text-blue-200 transition-colors">
                      {product.title}
                    </h3>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
                  <div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    {/* Mechanical Specifications Pills with font-mono */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {product.specifications.slice(0, 4).map((spec) => (
                        <div
                          key={spec.label}
                          className="bg-slate-50 border border-slate-200/60 p-2 rounded-xl text-center"
                        >
                          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                            {spec.label}
                          </div>
                          <div className="text-xs font-bold text-slate-800 font-mono mt-0.5 truncate">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-mono text-slate-500 font-medium">Bảo hành 36 tháng</span>
                    <span className="inline-flex items-center gap-1.5 text-[#285c9a] font-bold group-hover:gap-2 transition-all">
                      <span>Xem thông số kỹ thuật</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Engineering Standards / Why Choose Hai Phat */}
        <div className="mt-24 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <SectionHeader
            badge="Cam Kết Chất Lượng"
            title="Vì Sao Gia Chủ & Chủ Đầu Tư Chọn Thang Máy Hải Phát?"
            subtitle="Kỷ luật cơ điện chính xác và tôn trọng tính thẩm mỹ kiến trúc là triết lý vận hành cốt lõi trong mọi dự án."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Chuẩn EN 81 & QCVN',
                desc: 'Hệ thống an toàn đa tầng với phanh cơ khí tức thời, cứu hộ tự động ARD khi mất điện lưới.',
                metric: '100% KIỂM ĐỊNH'
              },
              {
                icon: Cpu,
                title: 'Biến Tần Fuji & Montanari',
                desc: 'Trang bị động cơ không hộp số tiết kiệm 40% điện năng, vận hành êm ái dưới 45dB.',
                metric: 'NHẬP KHẨU Ý / NHẬT'
              },
              {
                icon: Clock,
                title: 'Cứu Hộ 24/7 Dưới 30P',
                desc: 'Đội phản ứng nhanh thường trực toàn thời gian, cam kết có mặt xử lý trong vòng 30 phút.',
                metric: 'SLA KHẨN CẤP'
              },
              {
                icon: Star,
                title: 'Hố PIT Nông Từ 200mm',
                desc: 'Giải pháp tối ưu không cần đào sâu hay can thiệp vào móng bè, bảo vệ trọn vẹn phong thủy.',
                metric: 'TIẾT KIỆM KHÔNG GIAN'
              },
            ].map(({ icon: Icon, title, desc, metric }) => (
              <div
                key={title}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-[#285c9a]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#285c9a] flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mb-2">{title}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 font-mono text-[11px] font-bold text-[#285c9a]">
                  {metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-gradient-to-r from-[#0d1f35] to-[#1e4a80] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Tư Vấn May Đo Kích Thước Giếng Thang
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Cần Giải Pháp Thiết Kế Thang Máy Chuẩn Kiến Trúc?
            </h3>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Đội ngũ kỹ sư kết cấu Hải Phát sẽ trực tiếp đến tận chân công trình đo đạc hiện trạng và gửi phối cảnh 3D hoàn toàn miễn phí.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="tel:0898424666"
                className="inline-flex items-center gap-2 bg-white text-[#0d1f35] px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-md active:scale-[0.98]"
              >
                <Phone size={15} className="text-[#285c9a]" />
                <span className="font-mono">Hotline: 0898 424 666</span>
              </a>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors active:scale-[0.98]"
              >
                <Mail size={15} />
                <span>Gửi Yêu Cầu Báo Giá</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== Product Detail View =====================
export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, getById, getRelated } = useProductsData();
  const product = getById(id || '');
  const related = getRelated(id || '', 3);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
          <p className="text-sm font-mono text-slate-500">Đang tải chi tiết sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md">
          <AlertCircle size={44} className="text-rose-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy thông tin sản phẩm</h1>
          <p className="text-sm text-slate-500 mb-5">Sản phẩm này có thể đã được cập nhật hoặc không tồn tại.</p>
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 bg-[#285c9a] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1e4a80] transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Về danh mục sản phẩm</span>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[product.icon] || Building2;
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Product Hero Header with Breadcrumbs */}
      <PageHeader
        badge={product.subtitle || 'Thang Máy Cơ Điện'}
        title={product.title}
        subtitle={product.shortDescription}
        breadcrumbs={[
          { label: 'Sản phẩm', href: '/san-pham' },
          { label: product.title },
        ]}
        telemetryTag="CHỨNG NHẬN CO/CQ // AN TOÀN EN 81"
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Telemetry Specs Strip */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 mb-12 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {product.specifications.slice(0, 4).map((spec, sIdx) => (
              <div key={spec.label} className={`text-center ${sIdx > 0 ? 'pt-3 sm:pt-0' : ''}`}>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {spec.label}
                </div>
                <div className="text-base sm:text-lg font-bold text-[#0d1f35] font-mono mt-1">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Detailed Technical Showcase (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Interactive Image Gallery */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#0d1f35] mb-4 flex items-center gap-2">
                <Layers size={18} className="text-[#285c9a]" />
                <span>Thư Viện Ảnh Cabin & Chi Tiết Cơ Điện</span>
              </h2>

              <div className="relative rounded-2xl overflow-hidden mb-3 bg-slate-900 border border-slate-200/80 aspect-[16/10]">
                <img
                  src={gallery[activeImage]}
                  alt={`${product.title} - Ảnh ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-white font-mono text-xs">
                  {activeImage + 1} / {gallery.length}
                </div>
              </div>

              {gallery.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`rounded-xl overflow-hidden border-2 transition-all aspect-video ${
                        activeImage === idx
                          ? 'border-[#285c9a] ring-2 ring-[#285c9a]/30 scale-[1.02]'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Xem ảnh ${idx + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Deep Description & Cabin Architecture */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0d1f35] mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-[#285c9a]" />
                <span>Tổng Quan Giải Pháp & Kiến Trúc Thiết Kế</span>
              </h2>

              <div className="space-y-6">
                {product.fullDescription.split('\n\n').map((para, idx) => {
                  const isEven = idx % 2 === 0;
                  const imgSrc = gallery[idx % gallery.length] || product.image;

                  return (
                    <div
                      key={idx}
                      className={`flex flex-col gap-6 items-center ${
                        isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                          {para}
                        </p>
                      </div>
                      <div className="w-full sm:w-1/2">
                        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group aspect-[4/3]">
                          <img
                            src={imgSrc}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Prominent Technical Features */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0d1f35] mb-6 flex items-center gap-2">
                <Zap size={20} className="text-[#285c9a]" />
                <span>Tính Năng Kỹ Thuật Nổi Bật</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-3.5">
                {product.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60"
                  >
                    <CheckCircle2 size={16} className="text-[#285c9a] shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Standard Implementation Workflow */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0d1f35] mb-6 flex items-center gap-2">
                <Settings size={20} className="text-[#285c9a]" />
                <span>Quy Trình Thi Công Chuẩn Xác 5 Bước</span>
              </h2>

              <div className="space-y-4">
                {product.process.map(({ step, title, description }) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-xl bg-[#285c9a] flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm">
                        0{step}
                      </div>
                      {step < product.process.length && (
                        <div className="w-0.5 flex-1 bg-slate-200 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-5">
                      <h4 className="font-bold text-[#0d1f35] text-sm sm:text-base mb-1">{title}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical FAQs */}
            <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0d1f35] mb-6 flex items-center gap-2">
                <HelpCircle size={20} className="text-[#285c9a]" />
                <span>Giải Đáp Kỹ Thuật Thường Gặp</span>
              </h2>

              <div className="space-y-3">
                {product.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200/80 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-[#0d1f35] text-sm pr-4">{faq.question}</span>
                      <ChevronRight
                        size={16}
                        className={`text-slate-400 transition-transform flex-shrink-0 ${
                          activeFaq === idx ? 'rotate-90 text-[#285c9a]' : ''
                        }`}
                      />
                    </button>
                    {activeFaq === idx && (
                      <div className="px-4 pb-4 pt-1 bg-slate-50/50 border-t border-slate-100">
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: Technical Sidebar & Fast Inquiry (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Full Mechanical Specs Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-extrabold text-[#0d1f35] text-sm uppercase tracking-wider flex items-center gap-2">
                  <Ruler size={16} className="text-[#285c9a]" />
                  <span>Bảng Thông Số Cơ Khí</span>
                </h3>
                <span className="font-mono text-[10px] bg-blue-50 text-[#285c9a] px-2 py-0.5 rounded font-bold">
                  EN 81-20
                </span>
              </div>

              <div className="space-y-3">
                {product.specifications.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-xs sm:text-sm py-1.5 border-b border-slate-100 last:border-0">
                    <span className="text-slate-500 font-medium">{label}</span>
                    <span className="font-mono font-bold text-[#0d1f35] text-right ml-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Benefits Box */}
            <div className="bg-blue-50/60 rounded-2xl border border-blue-200/60 p-6 shadow-sm">
              <h3 className="font-bold text-[#0d1f35] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                <Shield size={16} className="text-[#285c9a]" />
                <span>Đặc Quyền Của Gia Chủ</span>
              </h3>
              <div className="space-y-2.5">
                {product.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 size={15} className="text-[#285c9a] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Consultation Request Box */}
            <div className="bg-[#0d1f35] text-white rounded-2xl p-6 shadow-lg space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300">
                  Tư Vấn Miễn Phí 1:1
                </span>
                <h4 className="font-bold text-base text-white mt-1">Cần Dự Toán Chi Tiết Cho Sản Phẩm Này?</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Kỹ sư trưởng Hải Phát sẽ phân tích hố thang và gửi bảng báo giá chính xác.
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
                  <Mail size={14} />
                  <span>Gửi Bản Vẽ Hiện Trạng</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        {related.length > 0 && (
          <section className="mt-20 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d1f35]">Dòng Sản Phẩm Cùng Phân Khúc</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Khám phá các cấu hình thang máy tương tự</p>
              </div>
              <Link
                href="/san-pham"
                className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#285c9a] hover:text-[#1e4a80] transition-colors"
              >
                <span>Xem tất cả</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/san-pham/${item.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#285c9a]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/70 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#285c9a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
