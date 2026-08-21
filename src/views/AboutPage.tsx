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
  Linkedin,
  Target,
  Eye,
} from 'lucide-react';
import { companyInfo, coreValues, teamMembers, partners } from '../data/company';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  shield: Shield,
  award: Award,
  heart: Heart,
  lightbulb: Lightbulb,
  users: Users,
  check: CheckCircle,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="bg-[#0d1f35] pt-36 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#285c9a] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#285c9a] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-[#285c9a] bg-[#285c9a]/15 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                Về chúng tôi
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
                Nâng Tầm Cuộc Sống Việt
              </h1>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                {companyInfo.description.split('\n\n')[0]}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Calendar size={16} className="text-[#285c9a]" />
                  Thành lập {companyInfo.founded}
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Building2 size={16} className="text-[#285c9a]" />
                  {companyInfo.yearsExperience}+ năm kinh nghiệm
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative w-full">
              <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
                <img
                  src="/539928420_1207135848096542_3586556978112750775_n.jpg"
                  alt="Hải Phát team"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-5 -left-5 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#285c9a] flex items-center justify-center">
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Đạt chứng nhận</div>
                      <div className="font-bold text-gray-900 text-sm">ISO 9001:2015</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100 py-8 -mt-6 relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
              {companyInfo.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[#285c9a]">{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 h-[300px] sm:h-[400px] lg:h-full w-full rounded-3xl overflow-hidden relative shadow-lg">
              <img 
                src="/682852976_1412723337537791_2243820393777372314_n.jpg" 
                alt="Tầm nhìn và sứ mệnh"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Định hướng tương lai</h3>
                <p className="text-white/80 text-sm">Kiến tạo không gian sống hiện đại và an toàn cho mọi công trình.</p>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden group hover:shadow-xl transition-shadow flex flex-col h-full min-h-[250px]">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600" alt="Mission" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/95 via-[#0d1f35]/70 to-[#0d1f35]/30" />
                <div className="relative z-10 flex flex-col h-full justify-end">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4">
                    <Target size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Sứ mệnh</h3>
                  <p className="text-white/80 leading-relaxed text-sm">{companyInfo.mission}</p>
                </div>
              </div>
              
              {/* Vision Card */}
              <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden group hover:shadow-xl transition-shadow flex flex-col h-full min-h-[250px]">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600" alt="Vision" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/95 via-[#0d1f35]/70 to-[#0d1f35]/30" />
                <div className="relative z-10 flex flex-col h-full justify-end">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4">
                    <Eye size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Tầm nhìn</h3>
                  <p className="text-white/80 leading-relaxed text-sm">{companyInfo.vision}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Core Values */}
      <section className="py-16 sm:py-24 bg-[#0d1f35] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#285c9a] rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1e4a80] rounded-full blur-[100px] opacity-30 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left side: Heading & Image */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <span className="inline-block text-[#60a5fa] bg-blue-500/10 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                Lõi Niềm Tin
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Giá trị cốt lõi</h2>
              <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Những nguyên tắc định hướng mọi hoạt động của Hải Phát. Chúng tôi cam kết mang lại giá trị bền vững và trải nghiệm tốt nhất cho khách hàng.
              </p>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hidden lg:block w-full aspect-square border border-white/10 group bg-[#0d1f35]">
                 <img 
                   src="/475733604_967114985385988_6712307638728245450_n.jpg" 
                   alt="Giá trị cốt lõi" 
                   className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/30 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
            
            {/* Right side: Values Grid */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {coreValues.map((value, idx) => {
                  const Icon = iconMap[value.icon] || CheckCircle;
                  const bgImages = [
                    'https://images.unsplash.com/photo-1541888046428-d81bb19240f5?auto=format&fit=crop&q=80&w=400',
                    'https://images.unsplash.com/photo-1428366890462-dd4baecf492b?auto=format&fit=crop&q=80&w=400',
                    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400',
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400'
                  ];
                  return (
                    <div
                      key={value.title}
                      className="relative group rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 min-h-[220px]"
                    >
                      <img 
                        src={bgImages[idx % bgImages.length]} 
                        alt={value.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/95 via-[#0d1f35]/70 to-[#0d1f35]/30"></div>
                      <div className="relative z-10 p-5 flex flex-col h-full justify-end">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 group-hover:bg-blue-500/50 transition-colors">
                          <Icon size={20} className="text-white" />
                        </div>
                        <h4 className="font-bold text-white text-base mb-1">{value.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{value.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Đội ngũ lãnh đạo</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Những người đã xây dựng và phát triển Hải Phát trong suốt chặng đường
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={member.image.startsWith('/') ? member.image : `/${member.image}`}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-end bg-white">
                  <h4 className="font-bold text-gray-900 text-base">{member.name}</h4>
                  <div className="text-[#285c9a] text-sm font-medium mt-1">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Partners Logos */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Đối tác thương hiệu</h2>
              <p className="text-gray-500 text-sm">
                Đồng hành cùng những thương hiệu hàng đầu thế giới
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {partners.map((partner) => (
                <div key={partner.name} className="flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-[#285c9a] to-[#1e4a80]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Sẵn sàng nâng cấp không gian sống?
          </h3>
          <p className="text-blue-100 text-sm mb-6 max-w-xl mx-auto">
            Liên hệ ngay với chúng tôi để nhận tư vấn miễn phí về giải pháp thang máy phù hợp nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${companyInfo.headquarters.hotline.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 bg-white text-[#285c9a] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              <Phone size={16} />
              {companyInfo.headquarters.hotline}
            </a>
            <Link href="/lien-he"
              className="flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/25 transition-colors"
            >
              Liên hệ tư vấn
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
