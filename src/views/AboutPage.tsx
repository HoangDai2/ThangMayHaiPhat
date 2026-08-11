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
import { companyInfo, milestones, coreValues, teamMembers, certificates, partners } from '../data/company';

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
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
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
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" 
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
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#285c9a]/10 flex items-center justify-center mb-5">
                  <Target size={24} className="text-[#285c9a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sứ mệnh</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{companyInfo.mission}</p>
              </div>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#285c9a]/10 flex items-center justify-center mb-5">
                  <Eye size={24} className="text-[#285c9a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tầm nhìn</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{companyInfo.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Hành trình phát triển</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
              Từ một đội ngũ nhỏ đến thương hiệu thang máy uy tín trên toàn quốc, đồng hành cùng hàng ngàn công trình
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

            <div className="space-y-12 sm:space-y-20">
              {milestones.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-shadow duration-300">
                      <div className="h-40 sm:h-48 overflow-hidden relative">
                        <img 
                          src={`https://picsum.photos/seed/${milestone.year}/600/300`} 
                          alt={milestone.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                           <div className="text-white font-black text-3xl opacity-90 drop-shadow-md">{milestone.year}</div>
                        </div>
                      </div>
                      <div className="p-6 text-left">
                        <h4 className="font-bold text-gray-900 text-lg mb-2">{milestone.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex flex-col items-center justify-start pt-6 z-10 relative">
                    <div className="w-5 h-5 rounded-full bg-[#285c9a] ring-4 ring-white shadow-lg" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
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
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hidden lg:block h-[400px]">
                 <img 
                   src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" 
                   alt="Giá trị cốt lõi" 
                   className="w-full h-full object-cover" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35] via-transparent to-transparent"></div>
              </div>
            </div>
            
            {/* Right side: Values Grid */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {coreValues.map((value) => {
                  const Icon = iconMap[value.icon] || CheckCircle;
                  return (
                    <div
                      key={value.title}
                      className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#285c9a]/30 flex items-center justify-center mb-5 group-hover:bg-[#285c9a]/50 transition-colors">
                        <Icon size={24} className="text-blue-300" />
                      </div>
                      <h4 className="font-bold text-white text-base mb-2">{value.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
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
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-xs">{member.experience}</span>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                        >
                          <Linkedin size={14} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                  <div className="text-[#285c9a] text-xs font-medium mt-0.5">{member.role}</div>
                  <p className="text-gray-500 text-xs leading-relaxed mt-2 line-clamp-2">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Certificates */}
          <div className="mb-14">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Chứng nhận & Đối tác</h2>
              <p className="text-gray-500 text-sm">
                Cam kết chất lượng theo tiêu chuẩn quốc tế
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#285c9a]/10 flex items-center justify-center mx-auto mb-3">
                    <Award size={20} className="text-[#285c9a]" />
                  </div>
                  <div className="font-semibold text-gray-900 text-xs">{cert.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners Logos */}
          <div>
            <div className="text-center mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Đối tác thương hiệu</h3>
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
