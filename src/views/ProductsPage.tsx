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
} from 'lucide-react';
import { Product } from '../data/products';
import { useProductsData } from '../hooks/useProductsData';
import { Loader2 } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home: Home,
  building: Building2,
  truck: Truck,
  eye: Eye,
  'heart-pulse': HeartPulse,
};

// Products List Page
export function ProductsList() {
  const { products, loading } = useProductsData();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" /></div>;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <header className="bg-[#0d1f35] pt-36 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#285c9a] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#285c9a] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block text-[#285c9a] bg-[#285c9a]/15 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            Sản phẩm
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Dòng Thang Máy Cao Cấp
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Đa dạng dòng thang máy đáp ứng mọi nhu cầu: từ thang máy gia đình đến thang tải khách, thang quan sát
          </p>
        </div>
      </header>

      {/* Products Grid */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const Icon = iconMap[product.icon] || Building2;
            return (
              <Link key={product.id}
                href={`/san-pham/${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/60 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#285c9a] flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#285c9a] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  {/* Quick specs */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.specifications.slice(0, 2).map((spec) => (
                      <span
                        key={spec.label}
                        className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-full"
                      >
                        {spec.value}
                      </span>
                    ))}
                  </div>

                  <span className="group inline-flex items-center gap-1.5 text-[#285c9a] font-semibold text-sm">
                    Xem chi tiết
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Tại sao chọn Hải Phát?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Chúng tôi cam kết mang đến sản phẩm thang máy tốt nhất với đội ngũ chuyên nghiệp
              và giải pháp toàn diện.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Star, title: '15+ năm kinh nghiệm', desc: 'Đội ngũ chuyên gia với kinh nghiệm sâu trong ngành thang máy.' },
              { icon: Shield, title: 'An toàn tuyệt đối', desc: 'Tuân thủ tiêu chuẩn QCVN, EN 81 với hệ thống an toàn đa lớp.' },
              { icon: Clock, title: 'Hỗ trợ 24/7', desc: 'Đường dây nóng hoạt động 24/7, phản ứng sự cố trong 2 giờ.' },
              { icon: Zap, title: 'Công nghệ tiên tiến', desc: 'Sử dụng công nghệ mới nhất từ các thương hiệu hàng đầu thế giới.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-2xl bg-gray-50">
                <div className="w-14 h-14 rounded-2xl bg-[#285c9a]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-[#285c9a]" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#285c9a] to-[#1e4a80] rounded-2xl p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Cần tư vấn giải pháp thang máy?
            </h3>
            <p className="text-blue-100 text-sm mb-6 max-w-xl mx-auto">
              Liên hệ ngay với đội ngũ chuyên gia của chúng tôi để được tư vấn miễn phí
              về giải pháp thang máy phù hợp nhất cho công trình của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:0898424666"
                className="flex items-center justify-center gap-2 bg-white text-[#285c9a] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
              >
                <Phone size={16} />
                Hotline: 0898 424 666
              </a>
              <Link href="/lien-he"
                className="flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/25 transition-colors"
              >
                <Mail size={16} />
                Gửi yêu cầu tư vấn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Product Detail Page
function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, getById, getRelated } = useProductsData();
  const product = getById(id || '');
  const related = getRelated(id || '', 3);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" /></div>;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle size={48} className="text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-3">Không tìm thấy sản phẩm</h1>
          <Link href="/san-pham" className="text-[#285c9a] font-semibold hover:underline text-sm">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[product.icon] || Building2;
  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35] via-[#0d1f35]/50 to-transparent" />

        {/* Back button */}
        <Link href="/san-pham"
          className="absolute top-24 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft size={16} />
          Quay lại
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#285c9a] flex items-center justify-center">
                <Icon size={20} className="text-white" />
              </div>
              <span className="text-white/70 text-sm">{product.subtitle}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {product.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick Info Bar */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {product.specifications.slice(0, 4).map((spec) => (
              <div key={spec.label} className="text-center">
                <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">{spec.label}</div>
                <div className="text-gray-900 font-bold text-sm">{spec.value.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Giới thiệu sản phẩm</h2>
              <div className="space-y-8">
                {product.fullDescription.split('\n\n').map((para, idx) => {
                  const isEven = idx % 2 === 0;
                  const imgSrc = gallery[idx % gallery.length] || product.image;
                  
                  return (
                    <div key={idx} className={`flex flex-col gap-6 items-center ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                      <div className="flex-1">
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{para}</p>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative group">
                          <img 
                            src={imgSrc} 
                            alt="" 
                            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layers size={20} className="text-[#285c9a]" />
                Hình ảnh sản phẩm
              </h2>
              <div className="relative rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <img
                  src={gallery[activeImage]}
                  alt={`${product.title} - Hình ${activeImage + 1}`}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-[#285c9a] ring-2 ring-[#285c9a]/30' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-14 object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-[#285c9a]" />
                Tính năng nổi bật
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <CheckCircle size={16} className="text-[#285c9a] flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Settings size={20} className="text-[#285c9a]" />
                Quy trình thực hiện
              </h2>
              <div className="space-y-4">
                {product.process.map(({ step, title, description }) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-[#285c9a] flex items-center justify-center text-white font-bold text-sm">
                        {step}
                      </div>
                      {step < product.process.length && (
                        <div className="w-0.5 flex-1 bg-gray-200 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle size={20} className="text-[#285c9a]" />
                Câu hỏi thường gặp
              </h2>
              <div className="space-y-3">
                {product.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 text-sm pr-4">{faq.question}</span>
                      <ChevronRight
                        size={16}
                        className={`text-gray-400 transition-transform flex-shrink-0 ${
                          activeFaq === idx ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {activeFaq === idx && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-5">
              {/* Specifications Card */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <Clock size={18} className="text-[#285c9a]" />
                  Thông số kỹ thuật
                </h3>
                <div className="space-y-3">
                  {product.specifications.map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-gray-900 font-medium text-right ml-2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Card */}
              <div className="bg-[#285c9a]/5 rounded-2xl p-6 border border-[#285c9a]/10">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star size={18} className="text-[#285c9a]" />
                  Lợi ích khách hàng
                </h3>
                <div className="space-y-3">
                  {product.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className="text-[#285c9a] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
                <h4 className="font-bold text-gray-900 mb-2">Cần tư vấn sản phẩm này?</h4>
                <p className="text-gray-500 text-xs mb-4">
                  Liên hệ ngay để được tư vấn miễn phí
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:0898424666"
                    className="flex items-center justify-center gap-2 bg-[#285c9a] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1e4a80] transition-colors w-full"
                  >
                    <Phone size={16} />
                    0898 424 666
                  </a>
                  <Link href="/lien-he"
                    className="flex items-center justify-center gap-2 border border-[#285c9a] text-[#285c9a] py-3 rounded-xl font-semibold text-sm hover:bg-[#285c9a]/5 transition-colors w-full"
                  >
                    Gửi yêu cầu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Sản phẩm liên quan</h2>
              <Link href="/san-pham"
                className="group flex items-center gap-1.5 text-[#285c9a] font-semibold text-sm"
              >
                Xem tất cả
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((s) => {
                const RelIcon = iconMap[s.icon] || Building2;
                return (
                  <Link key={s.id}
                    href={`/san-pham/${s.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/60 to-transparent" />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-[#285c9a] flex items-center justify-center">
                        <RelIcon size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#285c9a] transition-colors">
                        {s.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export { ProductDetail };
