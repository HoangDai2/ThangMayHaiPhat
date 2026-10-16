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
  CheckCircle2,
} from 'lucide-react';
import { useProductsData } from '../hooks/useProductsData';
import { useServicesData } from '../hooks/useServicesData';
import SectionHeader from './shared/SectionHeader';

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
    <section id="services" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/60">
      {/* 1. PROFESSIONAL SERVICE WORKFLOW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Tiêu Chuẩn Kỹ Thuật"
          title="Quy Trình Dịch Vụ Cơ Điện Chuyên Nghiệp"
          subtitle="Đồng hành khép kín cùng gia chủ trong toàn bộ vòng đời sản phẩm từ khảo sát thực địa đến vận hành và bảo trì trọn đời."
        />

        {/* Timeline Workflow */}
        <div className="relative mt-12 max-w-5xl mx-auto w-full">
          {/* Vertical Track Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#285c9a]/20 via-slate-300 to-[#285c9a]/20 transform md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {serviceItems.map((service, idx) => {
              const Icon = serviceIconMap[service.icon] || Settings;
              const isEven = idx % 2 === 1;
              const isLast = idx === serviceItems.length - 1;

              return (
                <div
                  key={service.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } group ${!isLast ? 'md:pb-16' : ''}`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-slate-200 shadow-md group-hover:border-[#285c9a] group-hover:scale-110 transition-all duration-300 z-10">
                    <div className="flex items-center justify-center w-full h-full rounded-full bg-slate-50 group-hover:bg-[#285c9a] transition-colors duration-300">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#285c9a] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Card Content with Double-Bezel Structure */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#285c9a]/40 transition-all duration-300 group-hover:-translate-y-1">
                      <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-5 bg-slate-100">
                        <img
                          src={[
                            '/189644056_157443963019765_6705723621810017597_n.jpg',
                            '/763701258_1499177482225709_114956793849319926_n.jpg',
                            '/483100261_1075555607921234_7097560171354795472_n.jpg',
                            '/762974441_1501082972035160_5634679056048782805_n.jpg'
                          ][idx % 4]}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 bg-[#0d1f35]/90 backdrop-blur-md px-3 py-1 rounded-lg text-white font-mono text-xs font-semibold uppercase tracking-wider border border-white/10">
                          Giai Đoạn 0{idx + 1}
                        </div>
                      </div>

                      <h3 className="font-extrabold text-[#0d1f35] text-lg sm:text-xl mb-2.5 group-hover:text-[#285c9a] transition-colors">
                        {service.title}
                      </h3>

                      <div className="text-slate-600 text-sm leading-relaxed">
                        {service.shortDescription.includes('•') ? (
                          <ul className="space-y-2 mt-2">
                            {service.shortDescription.split('•').filter(Boolean).map((part, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#285c9a] shrink-0 mt-0.5" />
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
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. PREMIUM PRODUCT CATALOG */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <SectionHeader
          badge="Danh Mục Sản Phẩm"
          title="Dòng Thang Máy Cơ Điện Cao Cấp"
          subtitle="Các dòng thang máy nhập khẩu nguyên chiếc & liên doanh chính hãng, đáp ứng hoàn hảo từ thang máy gia đình, biệt thự cao cấp đến thang tải khách chuyên dụng."
          action={
            <Link
              href="/san-pham"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#285c9a] hover:text-[#1e4a80] transition-colors"
            >
              <span>Xem tất cả sản phẩm</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {/* 3-Column Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const Icon = productIconMap[product.icon] || Building2;
            return (
              <Link
                key={product.id}
                href={`/san-pham/${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#285c9a]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Media Image with Dark Gradient Wash */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/85 via-[#0d1f35]/30 to-transparent" />
                  
                  {/* Category icon badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Icon size={18} />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-white font-bold text-lg sm:text-xl drop-shadow-sm group-hover:text-blue-200 transition-colors">
                      {product.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Mechanical Features */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    {/* Features Badges */}
                    <ul className="grid grid-cols-2 gap-2 mb-5">
                      {product.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200/60 px-2.5 py-1.5 rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#285c9a] flex-shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-500 uppercase tracking-wide">
                      Tiêu chuẩn EN 81
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#285c9a] font-bold text-xs sm:text-sm group-hover:gap-2 transition-all">
                      <span>Chi tiết kỹ thuật</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
