import { Link } from 'react-router-dom';
import {
  Search,
  Ruler,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { useServicesData } from '../hooks/useServicesData';
import { Loader2 } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'clipboard-search': Search,
  ruler: Ruler,
  wrench: Wrench,
  'shield-check': ShieldCheck,
};

export function ServicesList() {
  const { services: serviceItems, loading } = useServicesData();
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
            Dịch vụ
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Quy Trình Dịch Vụ Chuyên Nghiệp
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Từ khảo sát ban đầu đến bảo trì hậu mãi, chúng tôi đồng hành cùng bạn
            trong toàn bộ vòng đời của thang máy.
          </p>
        </div>
      </header>

      {/* Services Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
        <div className="space-y-6">
          {serviceItems.map((service, idx) => {
            const Icon = iconMap[service.icon] || Settings;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Icon & Step */}
                  <div className="lg:w-1/3 bg-gradient-to-br from-[#0d1f35] to-[#1e4a80] p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-1">
                      Bước {idx + 1}
                    </div>
                    <h3 className="text-white font-bold text-xl">{service.title}</h3>
                    <p className="text-blue-200/70 text-xs mt-2 max-w-xs">{service.subtitle}</p>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:w-2/3 p-8">
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      {service.fullDescription}
                    </p>

                    {/* Highlights */}
                    <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                      {service.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2">
                          <CheckCircle size={15} className="text-[#285c9a] flex-shrink-0" />
                          <span className="text-gray-700 text-xs">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Mini process steps */}
                    <div className="flex flex-wrap gap-2">
                      {service.process.map((p) => (
                        <span
                          key={p.step}
                          className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs px-3 py-1.5 rounded-lg"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#285c9a]/10 text-[#285c9a] font-bold flex items-center justify-center text-[10px]">
                            {p.step}
                          </span>
                          {p.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Tại sao chọn Hải Phát?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Chúng tôi cam kết mang đến dịch vụ thang máy tốt nhất với đội ngũ chuyên nghiệp
              và giải pháp toàn diện.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: ShieldCheck, title: 'Bảo hành 18 tháng', desc: 'Bảo hành 18 tháng toàn bộ thiết bị, bảo trì định kỳ 2 tháng/lần.' },
              { icon: Star, title: '15+ năm kinh nghiệm', desc: 'Đội ngũ chuyên gia với kinh nghiệm sâu trong ngành thang máy.' },
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
                href="tel:0800123456"
                className="flex items-center justify-center gap-2 bg-white text-[#285c9a] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
              >
                <Phone size={16} />
                Hotline: 0800 123 456
              </a>
              <Link
                to="/lien-he"
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
