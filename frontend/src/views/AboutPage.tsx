"use client";

import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Award,
  Heart,
  Lightbulb,
  Users,
  CheckCircle,
  ArrowRight,
  Building2,
  Calendar,
  Star,
  Target,
  Eye,
  CheckCircle2,
  Calculator,
} from 'lucide-react';
import { companyInfo, coreValues, teamMembers, partners } from '../data/company';
import PageHeader from '../components/shared/PageHeader';
import SectionHeader from '../components/shared/SectionHeader';
import { useQuickQuote } from '../context/QuickQuoteContext';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  shield: Shield,
  award: Award,
  heart: Heart,
  lightbulb: Lightbulb,
  users: Users,
  check: CheckCircle,
};

export default function AboutPage() {
  const { openQuoteModal } = useQuickQuote();

  return (
    <div className="min-h-screen bg-white">
      {/* Unified PageHeader */}
      <PageHeader
        badge="Hồ Sơ Doanh Nghiệp"
        title="Thang Máy Hải Phát – Nâng Tầm Không Gian Sống Việt"
        subtitle="Hơn 5 năm tiên phong trong lĩnh vực tư vấn, thiết kế, thi công lắp đặt và bảo trì thang máy đạt chuẩn Châu Âu EN 81. Cam kết an toàn tuyệt đối và giá trị bền vững cho mọi công trình."
        breadcrumbs={[{ label: 'Về chúng tôi' }]}
        telemetryTag="ISO 9001:2015 // THÀNH LẬP 2015"
      />

      {/* Stats Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {companyInfo.stats.map((stat, idx) => (
                <div key={stat.label} className={`text-center ${idx > 0 ? 'pt-4 sm:pt-0' : ''}`}>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#285c9a] font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Showcase */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Frame */}
            <div className="lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[480px] w-full rounded-3xl overflow-hidden relative shadow-xl border border-slate-200 bg-slate-900 group">
              <img
                src="/682852976_1412723337537791_2243820393777372314_n.jpg"
                alt="Định hướng phát triển Thang Máy Hải Phát"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/95 via-[#0d1f35]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-blue-300">
                  Tôn Chỉ Hoạt Động
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">Kiến Tạo Không Gian Sống Tiện Nghi</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Đồng hành cùng hàng ngàn tổ ấm Việt với giải pháp may đo cơ điện an toàn nhất.
                </p>
              </div>
            </div>

            {/* Mission & Vision Dual Cards */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[300px] border border-slate-200 bg-slate-900 text-white">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600"
                  alt="Sứ mệnh"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35] via-[#0d1f35]/80 to-transparent" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4">
                    <Target size={24} className="text-white" />
                  </div>
                  <span className="font-mono text-xs text-blue-300 uppercase tracking-widest block mb-1">
                    Trọng Tâm Sứ Mệnh
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Sứ Mệnh Doanh Nghiệp</h3>
                </div>

                <div className="relative z-10 pt-4">
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {companyInfo.mission}
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[300px] border border-slate-200 bg-slate-900 text-white">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600"
                  alt="Tầm nhìn"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35] via-[#0d1f35]/80 to-transparent" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4">
                    <Eye size={24} className="text-white" />
                  </div>
                  <span className="font-mono text-xs text-blue-300 uppercase tracking-widest block mb-1">
                    Định Hướng Chiến Lược
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Tầm Nhìn 2030</h3>
                </div>

                <div className="relative z-10 pt-4">
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {companyInfo.vision}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section (Dark Mechanical Theme) */}
      <section className="py-16 sm:py-24 bg-[#0d1f35] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Hệ Giá Trị Cốt Lõi"
            title={<span className="text-white">Kim Chỉ Nam Định Hướng Mọi Hoạt Động</span>}
            subtitle={<span className="text-slate-300">Những nguyên tắc kỹ thuật và đạo đức nghề nghiệp bất biến trong từng công trình của Hải Phát.</span>}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => {
              const Icon = iconMap[value.icon] || CheckCircle;
              return (
                <div
                  key={value.title}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#285c9a]/40 border border-[#4a7bbf]/40 flex items-center justify-center text-blue-300 mb-4">
                      <Icon size={22} />
                    </div>
                    <div className="font-mono text-xs text-blue-300 font-semibold mb-1">
                      GIÁ TRỊ 0{idx + 1}
                    </div>
                    <h3 className="font-bold text-white text-base sm:text-lg mb-2">{value.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{value.description}</p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 font-mono text-[11px] text-slate-400">
                    TIÊU CHUẨN ISO 9001
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Nhân Sự Chuyên Trách"
            title="Đội Ngũ Lãnh Đạo & Kỹ Sư Trưởng"
            subtitle="Đội ngũ sáng lập và quản lý kỹ thuật giàu kinh nghiệm thực chiến trong ngành cơ điện thang máy."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-xl hover:border-[#285c9a]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                  <img
                    src={member.image.startsWith('/') ? member.image : `/${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/70 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-[#0d1f35] text-base">{member.name}</h4>
                    <div className="text-[#285c9a] text-xs sm:text-sm font-semibold mt-0.5">{member.role}</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 font-mono text-[11px] text-slate-400">
                    Chuyên gia cơ điện
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Brand Partners */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#285c9a] font-semibold">
              Đối Tác Toàn Cầu
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0d1f35] mt-1">
              Hợp Tác Chiến Lược Cùng Các Hãng Công Nghệ Hàng Đầu
            </h3>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-75">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center p-3 rounded-xl bg-white border border-slate-200/60 shadow-sm">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-7 sm:h-8 object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-16 bg-gradient-to-r from-[#285c9a] to-[#1e4a80] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-200">
            Đồng Hành Cùng Không Gian Sống Của Bạn
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Liên Hệ Với Kỹ Sư Trưởng Hải Phát Ngay Hôm Nay
          </h3>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Nhận tư vấn giải pháp giếng thang và khảo sát hiện trạng hoàn toàn miễn phí.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 bg-white text-[#0d1f35] px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow active:scale-[0.98] cursor-pointer"
            >
              <Calculator size={15} className="text-[#285c9a]" />
              <span>Dự Toán & Báo Giá Nhanh</span>
            </button>
            <a
              href="tel:0898424666"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors active:scale-[0.98]"
            >
              <Phone size={15} />
              <span className="font-mono">0898 424 666</span>
            </a>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/15 border border-white/10 text-white px-4 py-3 rounded-xl font-medium text-xs transition-colors"
            >
              <span>Gửi Yêu Cầu Khảo Sát</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
