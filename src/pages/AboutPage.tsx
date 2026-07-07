import { Link } from 'react-router-dom';
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
      <header className="bg-[#0d1f35] py-20 relative overflow-hidden">
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
            <div className="hidden lg:block">
              <div className="relative">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#285c9a]/10 flex items-center justify-center mb-5">
                <Target size={24} className="text-[#285c9a]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sứ mệnh</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{companyInfo.mission}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#285c9a]/10 flex items-center justify-center mb-5">
                <Eye size={24} className="text-[#285c9a]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tầm nhìn</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{companyInfo.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Hành trình phát triển</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Từ một đội ngũ nhỏ đến thương hiệu thang máy uy tín trên toàn quốc
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

            <div className="space-y-10">
              {milestones.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-gray-50 rounded-2xl p-6 ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="text-[#285c9a] font-bold text-2xl mb-2">{milestone.year}</div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{milestone.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#285c9a] ring-4 ring-white shadow" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-[#0d1f35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Giá trị cốt lõi</h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto">
              Những nguyên tắc định hướng mọi hoạt động của Hải Phát
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((value) => {
              const Icon = iconMap[value.icon] || CheckCircle;
              return (
                <div
                  key={value.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#285c9a]/30 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-blue-200" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2">{value.title}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">{value.description}</p>
                </div>
              );
            })}
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

      {/* Office Locations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Văn phòng trên toàn quốc</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Phạm vi phục vụ tại 63 tỉnh thành với mạng lưới văn phòng trải dài
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {companyInfo.branches.map((branch) => (
              <div
                key={branch.city}
                className={`bg-gray-50 rounded-2xl p-6 border ${
                  branch.type === 'Trụ sở chính' ? 'border-[#285c9a]/30' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-gray-900">{branch.city}</h4>
                  {branch.type === 'Trụ sở chính' && (
                    <span className="bg-[#285c9a] text-white text-xs px-2 py-0.5 rounded-full">
                      HQ
                    </span>
                  )}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gray-400" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-gray-400" />
                    <span>{branch.phone}</span>
                  </div>
                </div>
              </div>
            ))}
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
            <Link
              to="/lien-he"
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
