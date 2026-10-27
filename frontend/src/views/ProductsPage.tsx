"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
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
  Calculator,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';
import { Product } from '../data/products';
import { useProductsData } from '../hooks/useProductsData';
import PageHeader from '../components/shared/PageHeader';
import SectionHeader from '../components/shared/SectionHeader';
import { useQuickQuote } from '../context/QuickQuoteContext';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home: Home,
  building: Building2,
  truck: Truck,
  eye: Eye,
  'heart-pulse': HeartPulse,
};

// ===================== Products List View (Tailored for 2 Flagship Solutions) =====================
export function ProductsList() {
  const { products, loading } = useProductsData();
  const { openQuoteModal } = useQuickQuote();
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

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

  // Helper to get active preview image
  const getProductImage = (product: Product) => {
    const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
    const activeIdx = activeImageIndices[product.id] ?? 0;
    return gallery[activeIdx] || product.image;
  };

  // Comparison matrix criteria
  const comparisonRows = [
    {
      criterion: 'Kết cấu giếng thang',
      desc: 'Vật liệu và phương thức dựng trục thang máy',
      xay: 'Cột bê tông cốt thép kết hợp tường gạch 110 – 220mm kiên cố',
      kinh: 'Hệ khung thép định hình chịu lực cao, sơn tĩnh điện hoặc mạ PVD',
    },
    {
      criterion: 'Yêu cầu chiều sâu Hố PIT',
      desc: 'Mức độ can thiệp vào nền móng công trình',
      xay: 'PIT tiêu chuẩn 1.000 – 1.400mm (chịu lực tối đa cho tải trọng lớn)',
      kinh: 'PIT siêu nông chỉ từ 600 – 1600mm (an toàn tuyệt đối, không đụng móng bè)',
    },
    {
      criterion: 'Chiều cao tầng trên cùng (OH)',
      desc: 'Không gian kỹ thuật đỉnh giếng thang',
      xay: 'OH tiêu chuẩn ≥ 3.800 – 4.200mm',
      kinh: 'OH thấp chỉ từ 2.800 – 3.200mm (phù hợp nhà hạn chế chiều cao tầng tum)',
    },
    {
      criterion: 'Thẩm mỹ & Ánh sáng tự nhiên',
      desc: 'Hiệu ứng thị giác và kết nối không gian nội thất',
      xay: 'Kín đáo, bề thế; đồng bộ ốp đá Marble, Granite hoặc ốp gỗ cao cấp',
      kinh: 'Vách kính trong suốt 360°, truyền sáng tự nhiên từ giếng trời xuống các tầng',
    },
    {
      criterion: 'Thời gian & Quy trình thi công',
      desc: 'Tiến độ lắp đặt phần cơ khí tại công trình',
      xay: 'Lắp ráp cơ điện 10 – 15 ngày (sau khi công trình hoàn thiện phần thô)',
      kinh: 'Lắp ráp cơ khí siêu tốc 5 – 7 ngày, thi công sạch sẽ, hầu như không bụi bặm',
    },
    {
      criterion: 'Khả năng ứng dụng cải tạo',
      desc: 'Mức độ tương thích với nhà đang ở',
      xay: 'Tối ưu cho công trình xây mới từ móng, cần đổ giếng thang từ đầu',
      kinh: 'Lý tưởng cho nhà cải tạo đang ở, dựng khung độc lập không cần đập phá tường',
    },
    {
      criterion: 'Dải tải trọng khả dụng',
      desc: 'Sức chứa và lưu lượng hành khách',
      xay: '350kg – 650kg+ (chở 4 – 9 người, vận hành tần suất cao liên tục)',
      kinh: '350kg – 650kg (chở 4 – 9 người, tối ưu cho gia đình và biệt thự)',
    },
    {
      criterion: 'Suất đầu tư kết cấu',
      desc: 'Hiệu quả chi phí và định vị công trình',
      xay: 'Tiết kiệm chi phí giếng thang, giải pháp kinh tế và bền bỉ trọn đời',
      kinh: 'Mức đầu tư phân khúc cao cấp, nâng tầm đẳng cấp kiến trúc không gian sống',
    },
  ];

  // Scenarios for guidance
  const scenarios = [
    {
      tag: 'Nhà Xây Mới Từ Đầu',
      title: 'Công Trình Đang Thi Công Móng & Thô',
      recommend: 'Khuyên Dùng: Thang Máy Hố Xây',
      desc: 'Tận dụng hệ dầm cột bê tông của nhà giúp tiết kiệm đáng kể chi phí khung thép, đồng thời mở rộng diện tích cabin tối đa trong lòng hố.',
      type: 'thangxay' as const,
      badgeStyle: 'bg-blue-50 text-[#285c9a] border-blue-200',
    },
    {
      tag: 'Nhà Cải Tạo Đang Ở',
      title: 'Nhà Đã Hoàn Thiện Cần Lắp Thêm Thang',
      recommend: 'Khuyên Dùng: Thang Khung Thép Kính',
      desc: 'Hố PIT chỉ từ 600mm không phá vỡ móng bè chống thấm. Khung thép bắt bu-lông độc lập, thi công nhanh 5–7 ngày không gây bụi bặm.',
      type: 'khungthep' as const,
      badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      tag: 'Lắp Giữa Lòng Cầu Thang',
      title: 'Nhà Phố / Biệt Thự Có Giếng Trời Cầu Thang',
      recommend: 'Khuyên Dùng: Thang Khung Thép Kính',
      desc: 'Vách kính cường lực 4 mặt đón trọn ánh sáng tự nhiên từ mái kính xuống các tầng, loại bỏ hoàn toàn cảm giác ngột ngạt của giếng bê tông.',
      type: 'khungthep' as const,
      badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      tag: 'Tòa Nhà Văn Phòng & Khách Sạn',
      title: 'Công Trình Cho Thuê / Lưu Lượng Người Đông',
      recommend: 'Khuyên Dùng: Thang Máy Hố Xây',
      desc: 'Tải trọng lớn đến 650kg+, vận hành liên tục 24/7 bền bỉ. Kết cấu tường bao quanh giúp cách âm tối đa giữa các phòng.',
      type: 'thangxay' as const,
      badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <PageHeader
        badge="Giải Pháp Cơ Điện May Đo"
        title="2 Hệ Thống Thang Máy Chủ Lực"
        subtitle="May đo chính xác theo hiện trạng kiến trúc công trình: từ hệ giếng thang hố xây truyền thống đến khung thép vách kính toàn cảnh."
        breadcrumbs={[{ label: 'Sản phẩm' }]}
        telemetryTag="CHỨNG NHẬN CO/CQ // EN 81-20"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* SECTION 1: Dual Flagship Architectural Showcase */}
        <section>
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] tracking-tight">
              2 Dòng Cấu Trúc Cơ Điện Tiêu Biểu
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Mỗi giải pháp được thiết kế tối ưu hóa cho từng điều kiện móng, kết cấu chịu lực và gu thẩm mỹ riêng biệt của từng gia chủ.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {products.map((product, pIdx) => {
              const isGlass = product.title.toLowerCase().includes('kính');
              const quoteType = isGlass ? 'khungthep' : 'thangxay';
              const activeImg = getProductImage(product);
              const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
              const activeIdx = activeImageIndices[product.id] ?? 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Identification Bar */}
                  <div className="p-4 sm:p-6 pb-3.5 sm:pb-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#285c9a] flex items-center justify-center font-mono font-bold text-xs border border-blue-100">
                        0{pIdx + 1}
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[#285c9a] uppercase tracking-wider block">
                          {isGlass ? 'Hệ Khung Thép Panoramic' : 'Hệ Hố Xây Bê Tông'}
                        </span>
                        <span className="text-xs text-slate-500">
                          {isGlass ? 'Lấy sáng & Tiết kiệm diện tích' : 'Bền bỉ & Tải trọng tối đa'}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium border border-slate-200/60">
                      100% May Đo
                    </span>
                  </div>

                  {/* Interactive Media Showcase */}
                  <div className="p-4 sm:p-6 pt-4 sm:pt-5">
                    {/* Product Title & Subtitle - Cleanly placed outside image for maximum readability */}
                    <div className="mb-3.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0d1f35] tracking-tight">
                        {product.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5 line-clamp-1">
                        {product.subtitle || 'Giải pháp thang máy cao cấp tiêu chuẩn Châu Âu'}
                      </p>
                    </div>

                    {/* Image Container - Clean, unobstructed view of elevator architecture */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 group/media shadow-inner select-none">
                      <img
                        src={activeImg}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-105"
                      />
                      
                      {/* Subtle Top Gradient for Badge Legibility */}
                      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none z-10">
                        <span className="bg-[#0d1f35]/85 backdrop-blur-md text-white font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg border border-white/15 shadow-sm">
                          {isGlass ? 'Hố PIT Nông Từ 600mm' : 'Tải Trọng Đến 650kg+'}
                        </span>
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md font-mono border border-white/10 shadow-sm">
                          {activeIdx + 1}/{gallery.length} ảnh
                        </span>
                      </div>

                      {/* Navigation Arrows for Mobile & Desktop */}
                      {gallery.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveImageIndices((prev) => ({
                                ...prev,
                                [product.id]: (activeIdx - 1 + gallery.length) % gallery.length,
                              }));
                            }}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md z-10 cursor-pointer"
                            aria-label="Xem ảnh trước"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveImageIndices((prev) => ({
                                ...prev,
                                [product.id]: (activeIdx + 1) % gallery.length,
                              }));
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md z-10 cursor-pointer"
                            aria-label="Xem ảnh tiếp theo"
                          >
                            <ChevronRight size={18} />
                          </button>

                          {/* Dots Indicator */}
                          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full z-10">
                            {gallery.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                  setActiveImageIndices((prev) => ({
                                    ...prev,
                                    [product.id]: idx,
                                  }))
                                }
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                  activeIdx === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Đến ảnh ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Switcher - Evenly distributed grid for easy touch on mobile */}
                    {gallery.length > 1 && (
                      <div
                        className={`grid gap-2 sm:gap-2.5 mt-3 mb-1 ${
                          gallery.length === 2
                            ? 'grid-cols-2'
                            : gallery.length === 3
                            ? 'grid-cols-3'
                            : 'grid-cols-4'
                        }`}
                      >
                        {gallery.map((thumbUrl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              setActiveImageIndices((prev) => ({
                                ...prev,
                                [product.id]: idx,
                              }))
                            }
                            className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                              activeIdx === idx
                                ? 'border-[#285c9a] ring-2 ring-[#285c9a]/25 shadow-sm scale-[1.02]'
                                : 'border-slate-200/90 opacity-60 hover:opacity-100 hover:border-slate-300'
                            }`}
                            aria-label={`Xem góc chụp ${idx + 1}`}
                          >
                            <img
                              src={thumbUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-1 right-1 font-mono text-[9px] bg-black/60 text-white px-1 rounded">
                              #{idx + 1}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Short Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-3 mb-5">
                      {product.shortDescription}
                    </p>

                    {/* Technical Specifications Grid */}
                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                      {product.specifications.slice(0, 4).map((spec) => (
                        <div
                          key={spec.label}
                          className="bg-slate-50 border border-slate-200/70 p-3 rounded-xl"
                        >
                          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            {spec.label}
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900 font-mono mt-0.5">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Engineering Strengths List */}
                    <div className="border-t border-slate-100 pt-4 space-y-2 mb-2">
                      {(isGlass
                        ? [
                            'Hố PIT nông từ 600mm, không đục phá móng bè chống thấm',
                            'Chiều cao tầng trên cùng (OH) thấp linh hoạt từ 2.800mm',
                            'Vách kính an toàn 360°, đón trọn ánh sáng tự nhiên giếng trời',
                            'Lắp ráp cơ khí nhanh 5 – 7 ngày, thi công sạch sẽ không bụi',
                          ]
                        : [
                            'Tiết kiệm chi phí giếng thang xây thô bằng tường gạch & bê tông',
                            'Tiết diện lòng cabin rộng tối đa trong cùng kích thước hố thang',
                            'Cách âm đa tầng vượt trội, vận hành siêu tĩnh lặng dưới 45dB',
                            'Đa dạng hoàn thiện cửa tầng: ốp đá Granite, Marble, Inox gương',
                          ]
                      ).map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 size={16} className="text-[#285c9a] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="p-4 sm:p-6 pt-3.5 sm:pt-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <Link
                      href={`/san-pham/${product.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-[0.98]"
                    >
                      <span>Xem Chi Tiết Kỹ Thuật</span>
                      <ArrowRight size={15} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => openQuoteModal({ initialType: quoteType })}
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Calculator size={15} className="text-[#285c9a]" />
                      <span>Dự Toán Nhanh</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Comprehensive Comparison Matrix */}
        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm overflow-hidden">
          <SectionHeader
            badge="So Sánh Kỹ Thuật"
            title="Nên Chọn Thang Hố Xây Hay Thang Khung Kính?"
            subtitle="Bảng phân tích 8 tiêu chí kết cấu và công năng then chốt giúp gia chủ cùng kiến trúc sư đưa ra phương án tối ưu nhất."
          />

          {/* Desktop & Tablet Comparison Table */}
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-4 px-5 text-xs font-mono uppercase tracking-wider text-slate-500 w-1/4">
                    Tiêu Chí Kỹ Thuật
                  </th>
                  <th className="py-4 px-5 text-sm font-bold text-[#0d1f35] w-3/8 bg-blue-50/40 border-l border-r border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-[#285c9a]" />
                      <span>Thang Máy Hố Xây</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 text-sm font-bold text-[#0d1f35] w-3/8">
                    <div className="flex items-center gap-2">
                      <Home size={16} className="text-[#285c9a]" />
                      <span>Thang Khung Thép Kính</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900">{row.criterion}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{row.desc}</div>
                    </td>
                    <td className="py-4 px-5 text-slate-700 bg-blue-50/20 border-l border-r border-slate-200/60">
                      {row.xay}
                    </td>
                    <td className="py-4 px-5 text-slate-700">
                      {row.kinh}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900 text-xs sm:text-sm">
                    Lựa chọn giải pháp
                  </td>
                  <td className="py-4 px-5 border-l border-r border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => openQuoteModal({ initialType: 'thangxay' })}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white py-2.5 px-3 rounded-xl font-bold text-xs transition-colors"
                    >
                      <Calculator size={13} />
                      <span>Dự Toán Thang Hố Xây</span>
                    </button>
                  </td>
                  <td className="py-4 px-5">
                    <button
                      type="button"
                      onClick={() => openQuoteModal({ initialType: 'khungthep' })}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0d1f35] hover:bg-slate-800 text-white py-2.5 px-3 rounded-xl font-bold text-xs transition-colors"
                    >
                      <Calculator size={13} />
                      <span>Dự Toán Thang Kính</span>
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* SECTION 3: Scenario Selector Navigator */}
        <section>
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] tracking-tight">
              Gợi Ý Lựa Chọn Theo Hiện Trạng Công Trình
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Xác định nhanh phương án kỹ thuật thích hợp nhất dựa trên giai đoạn thi công thực tế của ngôi nhà.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((sc, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#285c9a]/40 transition-all duration-300"
              >
                <div>
                  <span className="font-mono text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-2">
                    {sc.tag}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mb-3 leading-snug">
                    {sc.title}
                  </h3>
                  <div
                    className={`inline-block px-2.5 py-1 rounded-md font-bold text-xs border mb-3 ${sc.badgeStyle}`}
                  >
                    {sc.recommend}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {sc.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => openQuoteModal({ initialType: sc.type })}
                    className="w-full inline-flex items-center justify-between text-xs font-bold text-[#285c9a] hover:text-[#1e4a80] group"
                  >
                    <span>Nhận tư vấn phương án này</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Engineering Standards & Why Hai Phat */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] tracking-tight">
              Kỷ Luật Kỹ Thuật & Tiêu Chuẩn Châu Âu
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Mọi linh kiện truyền động và hệ thống an toàn đều tuân thủ quy chuẩn EN 81-20/50 và QCVN 02:2019/BXD.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Chuẩn EN 81 & QCVN',
                desc: 'Hệ thống phanh cơ khí tức thời, cứu hộ tự động ARD khi mất điện và cảm biến đa tầng quang học.',
                metric: '100% KIỂM ĐỊNH',
              },
              {
                icon: Cpu,
                title: 'Động Cơ Fuji & Montanari',
                desc: 'Động cơ không hộp số tiết kiệm 40% điện năng, vận hành siêu tĩnh lặng dưới ngưỡng 45dB.',
                metric: 'NHẬP KHẨU Ý / NHẬT',
              },
              {
                icon: Clock,
                title: 'Cứu Hộ 24/7 Dưới 120 Phút',
                desc: 'Đội kỹ thuật thường trực toàn thời gian tại Hà Nội & các tỉnh lân cận, cam kết SLA khẩn cấp.',
                metric: 'SLA KHẨN CẤP',
              },
              {
                icon: Star,
                title: 'May Đo Từng Milimét',
                desc: 'Kỹ sư trực tiếp đo đạc hố thang thực tế, tối ưu hóa kích thước cabin lớn nhất cho công trình.',
                metric: 'TỐI ƯU KHÔNG GIAN',
              },
            ].map(({ icon: Icon, title, desc, metric }) => (
              <div
                key={title}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-[#285c9a]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
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
        </section>

        {/* SECTION 5: Consultation / Fast Quote CTA Card */}
        <section className="bg-gradient-to-r from-[#0d1f35] to-[#1e4a80] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Khảo Sát & Tư Vấn 1:1 Miễn Phí
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Cần Giải Pháp Thiết Kế Thang Máy Chuẩn Kiến Trúc?
            </h3>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Đội ngũ kỹ sư kết cấu Hải Phát sẽ trực tiếp đến tận chân công trình đo đạc hiện trạng và gửi phối cảnh 3D hố thang hoàn toàn miễn phí.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="tel:0898424666"
                className="inline-flex items-center gap-2 bg-white text-[#0d1f35] px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-md active:scale-[0.98]"
              >
                <Phone size={15} className="text-[#285c9a]" />
                <span className="font-mono">Hotline: 0898 424 666</span>
              </a>
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors active:scale-[0.98] cursor-pointer"
              >
                <Mail size={15} />
                <span>Gửi Yêu Cầu Báo Giá</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ===================== Product Detail View =====================
export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, getById, getRelated } = useProductsData();
  const { openQuoteModal } = useQuickQuote();
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
            <section className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-[#0d1f35] mb-3 sm:mb-4 flex items-center gap-2">
                <Layers size={18} className="text-[#285c9a]" />
                <span>Thư Viện Ảnh Cabin & Chi Tiết Cơ Điện</span>
              </h2>

              <div className="relative rounded-2xl overflow-hidden mb-3 bg-slate-900 border border-slate-200/80 aspect-[4/3] sm:aspect-[16/10] select-none group/detailMedia">
                <img
                  src={gallery[activeImage]}
                  alt={`${product.title} - Ảnh ${activeImage + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                
                {/* Counter Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-white font-mono text-xs border border-white/10 z-10">
                  {activeImage + 1} / {gallery.length} ảnh
                </div>

                {/* Arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length)}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md z-10 cursor-pointer"
                      aria-label="Ảnh trước"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveImage((prev) => (prev + 1) % gallery.length)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md z-10 cursor-pointer"
                      aria-label="Ảnh tiếp"
                    >
                      <ChevronRight size={18} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full z-10">
                      {gallery.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImage(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            activeImage === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                          }`}
                          aria-label={`Ảnh ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {gallery.length > 1 && (
                <div
                  className={`grid gap-2 pt-1 ${
                    gallery.length === 2
                      ? 'grid-cols-2'
                      : gallery.length === 3
                      ? 'grid-cols-3'
                      : 'grid-cols-4 sm:grid-cols-6'
                  }`}
                >
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`rounded-xl overflow-hidden border-2 transition-all aspect-[4/3] cursor-pointer ${
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
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
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
                <button
                  type="button"
                  onClick={() => openQuoteModal({
                    initialType: product.title.toLowerCase().includes('kính') ? 'khungthep' : 'thangxay'
                  })}
                  className="w-full flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <Calculator size={16} />
                  <span>Dự Toán & Báo Giá Nhanh (30s)</span>
                </button>

                <a
                  href="tel:0898424666"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors"
                >
                  <Phone size={14} />
                  <span className="font-mono">Gọi Hotline: 0898 424 666</span>
                </a>

                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 text-blue-200/80 hover:text-white py-1.5 font-medium text-xs transition-colors"
                >
                  <Mail size={13} />
                  <span>Hoặc gửi bản vẽ hiện trạng</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Showcase (Optimized for 1 or more related items) */}
        {related.length > 0 && (
          <section className="mt-20 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d1f35]">
                  {related.length === 1 ? 'Giải Pháp Cơ Điện Đối Ứng' : 'Dòng Sản Phẩm Cùng Phân Khúc'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {related.length === 1
                    ? 'Xem xét giải pháp kết cấu giếng thang thay thế để so sánh chi phí & công năng'
                    : 'Khám phá các cấu hình thang máy tương tự'}
                </p>
              </div>
              <Link
                href="/san-pham"
                className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#285c9a] hover:text-[#1e4a80] transition-colors"
              >
                <span>Xem tất cả sản phẩm</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {related.length === 1 ? (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-5/12 h-64 rounded-2xl overflow-hidden relative bg-slate-900 shrink-0">
                  <img
                    src={related[0].image}
                    alt={related[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white font-mono text-xs bg-[#285c9a]/90 px-3 py-1 rounded-md backdrop-blur-sm">
                    Giải Pháp Đối Ứng
                  </span>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {related[0].title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {related[0].shortDescription}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {related[0].specifications.slice(0, 3).map((spec) => (
                      <div key={spec.label} className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">{spec.label}</div>
                        <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Link
                      href={`/san-pham/${related[0].id}`}
                      className="inline-flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
                    >
                      <span>Khám phá cấu hình này</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
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
            )}
          </section>
        )}
      </div>
    </div>
  );
}
