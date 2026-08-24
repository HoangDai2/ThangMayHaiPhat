"use client";
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  Settings,
  Clock,
  Headphones,
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
    <section id="services" className="pt-8 pb-16 sm:pb-20 bg-gray-50 flex flex-col space-y-12 sm:space-y-14">
      {/* Services strip (Full Width Edge-to-Edge) */}
      <div className="w-full bg-white border-y border-gray-100 shadow-sm py-16 sm:py-24">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 text-center sm:text-left">
            <div>
              <span className="inline-block text-[#285c9a] text-sm font-semibold tracking-widest uppercase mb-2">
                Dịch vụ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Quy Trình Dịch Vụ Chuyên Nghiệp</h2>
              <p className="text-gray-500 text-sm mt-1">Đồng hành cùng bạn trong toàn bộ vòng đời thang máy</p>
            </div>
          </div>
          <div className="relative mt-12 md:mt-16 max-w-6xl mx-auto w-full">
            {/* Center Line for Desktop, Left Line for Mobile */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 transform md:-translate-x-1/2"></div>

            <div className="space-y-12 md:space-y-0">
              {serviceItems.map((service, idx) => {
                const Icon = serviceIconMap[service.icon] || Settings;
                const isEven = idx % 2 === 1; // 0-indexed, so 1 (Step 2) is even
                const isLast = idx === serviceItems.length - 1;

                return (
                  <div key={service.id} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} group ${!isLast ? 'md:pb-24' : ''}`}>

                    {/* Icon Node */}
                    <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 md:w-[54px] md:h-[54px] rounded-full bg-white border-[3px] md:border-[4px] border-gray-50 shadow-md group-hover:border-[#285c9a]/20 group-hover:scale-110 transition-all duration-500 z-10">
                      <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-50 group-hover:bg-[#285c9a] transition-colors duration-500">
                        <Icon className="w-5 h-5 md:w-[22px] md:h-[22px] text-[#285c9a] group-hover:text-white transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'} mt-1 md:mt-0`}>
                      <div className="block bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-[#285c9a]/10 border border-gray-100 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group-hover:border-[#285c9a]/30">

                        {/* Decorative background element */}
                        <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1.5 h-full bg-gradient-to-b from-[#285c9a] to-[#3a7bd5] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                        <div className="flex flex-col text-left">
                          <img
                            src={[
                              '/189644056_157443963019765_6705723621810017597_n.jpg',
                              '/763701258_1499177482225709_114956793849319926_n.jpg',
                              '/483100261_1075555607921234_7097560171354795472_n.jpg',
                              '/762974441_1501082972035160_5634679056048782805_n.jpg'
                            ][idx % 4]}
                            alt={service.title}
                            className="w-full h-56 md:h-64 object-cover rounded-2xl mb-6 shadow-sm"
                          />
                          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#285c9a]/10 text-[#285c9a] text-xs font-bold tracking-widest uppercase mb-4 w-fit">
                            Bước {idx + 1}
                          </div>
                          <h4 className="font-bold text-gray-900 text-xl md:text-2xl mb-4 group-hover:text-[#285c9a] transition-colors">{service.title}</h4>

                          <div className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {service.shortDescription.includes('•') ? (
                              <ul className="space-y-3">
                                {service.shortDescription.split('•').filter(Boolean).map((part, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#285c9a] mt-2 mr-3" />
                                    <span>{part.trim()}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>{service.shortDescription}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Products section */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="pt-2">
          {/* Products header */}
          <div className="text-center mb-12 sm:mb-14">
            <span className="inline-block text-[#285c9a] text-sm font-semibold tracking-widest uppercase mb-3">
              Sản phẩm
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Dòng Thang Máy Cao Cấp
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
              Các dòng thang máy nhập khẩu & liên doanh chính hãng, đáp ứng đa dạng nhu cầu:
              từ thang máy gia đình đến thang tải khách, thang quan sát
            </p>
          </div>

          {/* Product cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}
