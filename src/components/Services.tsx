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

        {/* Services strip */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <span className="inline-block text-[#285c9a] text-sm font-semibold tracking-widest uppercase mb-2">
                Dịch vụ
              </span>
              <h3 className="text-2xl font-bold text-gray-900">Quy Trình Dịch Vụ Chuyên Nghiệp</h3>
              <p className="text-gray-500 text-sm mt-1">Đồng hành cùng bạn trong toàn bộ vòng đời thang máy</p>
            </div>
            <Link href="/dich-vu"
              className="group flex items-center gap-2 text-[#285c9a] font-semibold text-sm hover:gap-3 transition-all"
            >
              Xem tất cả dịch vụ
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceItems.map((service, idx) => {
              const Icon = serviceIconMap[service.icon] || Settings;
              return (
                <Link key={service.id}
                  href={`/dich-vu#${service.id}`}
                  className="group flex items-start gap-4 p-5 rounded-xl bg-gray-50 hover:bg-[#285c9a]/5 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#285c9a]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[#285c9a]" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs font-semibold mb-0.5">Bước {idx + 1}</div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{service.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{service.shortDescription}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
