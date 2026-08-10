"use client";
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  Settings,
  ArrowRight,
  Home,
  Truck,
  Eye,
  HeartPulse,
  Search,
  Ruler,
  Wrench,
} from 'lucide-react';
import { useProductsData } from '../hooks/useProductsData';
import { useServicesData } from '../hooks/useServicesData';

const productIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home: Home,
  building: Building2,
  truck: Truck,
  eye: Eye,
  'heart-pulse': HeartPulse,
};

const serviceIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'clipboard-search': Search,
  ruler: Ruler,
  wrench: Wrench,
  'shield-check': ShieldCheck,
};

export default function Services() {
  const { products } = useProductsData();
  const { services: serviceItems } = useServicesData();
  
  return (
    <>
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[#285c9a] text-sm font-semibold tracking-widest uppercase mb-3">
            Sản phẩm
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Dòng Thang Máy Cao Cấp
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Đa dạng dòng thang máy đáp ứng mọi nhu cầu: từ homelift gia đình đến thang tải khách,
            thang quan sát, thang bệnh viện và thang tải hàng.
          </p>
        </div>

        {/* Product cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.map((product) => {
            const Icon = productIconMap[product.icon] || Building2;
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
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg">{product.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{product.shortDescription}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-4">
                    {product.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#285c9a] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="group/btn inline-flex items-center gap-1.5 text-[#285c9a] font-semibold text-sm hover:gap-2.5 transition-all duration-200">
                    Xem chi tiết
                    <ArrowRight size={15} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>

    {/* Services strip — full-screen section */}
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#0a1929] via-[#0d1f35] to-[#102845]">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[#285c9a]/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-[#1e4a80]/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <span className="inline-block text-[#a9d0ff] text-sm font-semibold tracking-widest uppercase mb-3">
            Quy trình
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-tight max-w-2xl mx-auto">
            Quy Trình Dịch Vụ Chuyên Nghiệp
          </h3>
          <p className="text-white/50 text-base mt-4 max-w-xl mx-auto">
            Đồng hành cùng bạn trong toàn bộ vòng đời thang máy — từ khảo sát đến bảo trì
          </p>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-[72px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {serviceItems.map((service, idx) => {
            const Icon = serviceIconMap[service.icon] || Settings;
            return (
              <Link key={service.id}
                href={`/dich-vu#${service.id}`}
                className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08] hover:-translate-y-1.5 transition-all duration-300 border border-white/[0.08] hover:border-[#a9d0ff]/30"
              >
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#285c9a] to-[#1e4a80] flex items-center justify-center shadow-lg shadow-[#285c9a]/30 ring-4 ring-[#0d1f35]">
                    <Icon size={26} className="text-white" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#a9d0ff] text-xs font-bold text-[#0d1f35]">
                    {idx + 1}
                  </span>
                </div>
                <h4 className="font-semibold text-white text-lg mb-2">{service.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-3">{service.shortDescription}</p>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/dich-vu"
            className="group inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5"
          >
            Xem tất cả dịch vụ
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
