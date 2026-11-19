"use client";

import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Lightbulb,
  Users2,
  Clock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Building2,
  Wrench,
  Cpu,
  Layers,
  FileCheck2,
  BadgeCheck,
  Target,
  Eye,
  Check,
  Workflow,
} from 'lucide-react';
import { companyInfo, milestones, teamMembers, partners } from '../data/company';
import PageHeader from '../components/shared/PageHeader';
import SectionHeader from '../components/shared/SectionHeader';
import { useQuickQuote } from '../context/QuickQuoteContext';

// Standards & Regulations from Profile (pages 8 & 14)
const technicalStandards = [
  {
    code: 'QCVN 02:2019/BLĐTBXH',
    title: 'Quy chuẩn Kỹ thuật Quốc gia về ATLĐ đối với Thang máy',
    scope: 'Bắt buộc áp dụng toàn diện cho khâu thiết kế, lắp đặt và vận hành',
    type: 'Quy chuẩn Quốc gia',
  },
  {
    code: 'QCVN 32:2018/BLĐTBXH',
    title: 'Quy chuẩn Kỹ thuật Quốc gia về ATLĐ đối với Thang máy gia đình',
    scope: 'Quy định các tiêu chuẩn kỹ thuật an toàn riêng cho dòng thang Homelift',
    type: 'Quy chuẩn Quốc gia',
  },
  {
    code: 'TCVN 6395:2008',
    title: 'Thang máy điện – Yêu cầu an toàn về cấu tạo và lắp đặt',
    scope: 'Tiêu chuẩn cốt lõi áp dụng cho hệ thống cơ khí và dẫn động điện',
    type: 'Tiêu chuẩn Việt Nam',
  },
  {
    code: 'TCVN 6396-20:2017',
    title: 'Yêu cầu an toàn về cấu tạo và lắp đặt thang máy chở người & hàng',
    scope: 'Quy chuẩn nghiệm thu chi tiết từng bộ phận cơ điện theo chuẩn quốc tế',
    type: 'Tiêu chuẩn Việt Nam',
  },
  {
    code: 'TCVN 6396-50:2017',
    title: 'Thang máy – Thiết kế, tính toán, kiểm tra và thử nghiệm bộ phận',
    scope: 'Phương pháp kiểm định độ bền chịu lực cabin, cáp kéo và ray dẫn hướng',
    type: 'Tiêu chuẩn Việt Nam',
  },
  {
    code: 'TCVN 5867:2009',
    title: 'Thang máy – Cabin, đối trọng và ray dẫn hướng – Yêu cầu an toàn',
    scope: 'Quy định độ chính xác lắp ráp ray, giảm chấn và cơ cấu đối trọng',
    type: 'Tiêu chuẩn Việt Nam',
  },
  {
    code: 'TCVN 5744:1993',
    title: 'Thang máy – Yêu cầu an toàn trong lắp đặt và sử dụng',
    scope: 'Quy trình an toàn trong suốt các giai đoạn thi công trên công trường',
    type: 'Tiêu chuẩn Việt Nam',
  },
  {
    code: 'TCVN 5308:1991',
    title: 'Quy phạm kỹ thuật an toàn trong xây dựng hố thang máy',
    scope: 'Chuẩn kích thước giếng thang, dầm đà bê tông và độ chống thấm hố PIT',
    type: 'Tiêu chuẩn Việt Nam',
  },
  {
    code: 'TCVN 4756:1989',
    title: 'Quy phạm nối đất và nối không các thiết bị điện thang máy',
    scope: 'Triệt tiêu rò rỉ điện thế, bảo vệ tuyệt đối tính mạng người đi thang',
    type: 'Tiêu chuẩn Việt Nam',
  },
  {
    code: 'TCVN 3245:1986',
    title: 'An toàn phòng cháy và chữa cháy đối với thang máy',
    scope: 'Quy chuẩn chịu nhiệt vật liệu cửa tầng và chế độ cứu hỏa khẩn cấp',
    type: 'Tiêu chuẩn Việt Nam',
  },
];

// 10 Commitments for Maintenance & Warranty from Profile (page 12)
const maintenanceCommitments = [
  'Cung cấp dịch vụ sửa chữa khẩn cấp khi thiết bị dừng hoạt động hay hư hỏng bất thường.',
  'Bảo trì định kỳ phòng ngừa hư hỏng từ sớm theo lịch trình cam kết.',
  'Thực hiện toàn bộ các công việc duy trì hoạt động ổn định, êm ái cho thiết bị thang máy.',
  'Tư vấn kỹ thuật đổi mới và nâng cấp mỹ thuật nội thất cabin theo nhu cầu gia chủ.',
  'Kiểm tra kỹ thuật định kỳ đảm bảo thang luôn đủ điều kiện kiểm định an toàn.',
  'Hướng dẫn và tư vấn vận hành sử dụng đúng kỹ thuật cho khách hàng & ban quản lý.',
  'Bảo trì, căn chỉnh và khắc phục triệt để các hư hỏng cơ khí và điện tử.',
  'Xử lý nhanh chóng các hư hỏng, sự cố phát sinh 24/7/365.',
  'Lắng nghe và giải quyết kịp thời mọi ý kiến, khiếu nại của khách hàng.',
  'Cung cấp các gói dịch vụ bảo dưỡng may đo linh hoạt theo từng đặc thù công trình.',
];

export default function AboutPage() {
  const { openQuoteModal } = useQuickQuote();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#285c9a] selection:text-white">
      {/* 1. Page Header with Anti-Slop Telemetry */}
      <PageHeader
        badge="Hồ Sơ Năng Lực Doanh Nghiệp"
        title="Thang Máy Hải Phát – Nền Tảng Kỹ Thuật Cơ Điện Chuẩn Mực"
        subtitle="Doanh nghiệp chuyên sâu trong sản xuất, lắp ráp, thi công lắp đặt và dịch vụ bảo trì thang máy tại Việt Nam. Tuân thủ nghiêm ngặt hệ thống quy chuẩn an toàn lao động quốc gia QCVN và tiêu chuẩn quốc tế."
        breadcrumbs={[{ label: 'Về chúng tôi' }]}
        telemetryTag="ISO 9001:2015 · EN 81-20/50 · 1.000+ CÔNG TRÌNH"
      />

      {/* 2. Hard Facts Telemetry Strip */}
      <section className="bg-slate-50 border-b border-slate-200 py-8">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">Thành Lập</span>
                <Building2 size={16} className="text-[#285c9a]" />
              </div>
              <div className="text-3xl font-extrabold text-[#0d1f35] font-mono">2020</div>
              <p className="text-xs text-slate-600 mt-1">Hơn 5 năm phát triển bền vững</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">Bàn Giao Thực Tế</span>
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-[#285c9a] font-mono">~1.100</div>
              <p className="text-xs text-slate-600 mt-1">Công trình toàn quốc & quốc tế (Lào)</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">Cứu Hộ Khẩn Cấp</span>
                <Clock size={16} className="text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] font-mono">1 – 2 Giờ</div>
              <p className="text-xs text-slate-600 mt-1">Hà Nội (2–6 giờ ngoài Hà Nội) 24/7</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">Mạng Lưới Phục Vụ</span>
                <Layers size={16} className="text-[#285c9a]" />
              </div>
              <div className="text-3xl font-extrabold text-[#0d1f35] font-mono">35+ Tỉnh</div>
              <p className="text-xs text-slate-600 mt-1">Phủ sóng bảo trì toàn quốc</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI
         ========================================================================= */}
      <section id="tam-nhin-su-menh" className="py-20 sm:py-28 bg-white border-b border-slate-200 scroll-mt-28">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="01. Định Hướng Chiến Lược"
            title="Tầm Nhìn, Sứ Mệnh & Hệ Giá Trị Cốt Lõi"
            subtitle="Nguyên tắc kỹ thuật và đạo đức kinh doanh định hình từng bộ thang máy xuất xưởng từ Thang Máy Hải Phát."
          />

          {/* Vision & Mission Split Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16 items-stretch">
            {/* Tầm nhìn */}
            <div className="relative rounded-2xl p-8 sm:p-10 bg-slate-900 text-white border border-slate-800 flex flex-col justify-between overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-grid-blueprint opacity-15 pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#285c9a]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#285c9a]/40 border border-[#4a7bbf]/40 flex items-center justify-center text-blue-300">
                    <Eye size={24} />
                  </div>
                  <span className="font-mono text-xs text-blue-300 uppercase tracking-widest font-semibold">
                    Định Hướng Dài Hạn
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                  Tầm Nhìn Phát Triển
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {companyInfo.vision}
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>TIÊU CHUẨN: QCVN / ISO</span>
                <span className="text-blue-300">NĂNG LỰC TOÀN CẦU</span>
              </div>
            </div>

            {/* Sứ mệnh */}
            <div className="relative rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-[#0d1f35] to-[#16365c] text-white border border-slate-700 flex flex-col justify-between overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-grid-blueprint opacity-15 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <Target size={24} />
                  </div>
                  <span className="font-mono text-xs text-emerald-300 uppercase tracking-widest font-semibold">
                    Cam Kết Xã Hội
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                  Sứ Mệnh Doanh Nghiệp
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {companyInfo.mission}
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>GIÁ TRỊ THỰC CHO CỘNG ĐỒNG</span>
                <span className="text-emerald-300">AN TOÀN TUYỆT ĐỐI</span>
              </div>
            </div>
          </div>

          {/* 4 Giá trị cốt lõi (Chuẩn HSNL Trang 10) */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#285c9a] font-bold">
                4 Trụ Cột Nền Tảng
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-[#0d1f35] mt-1">
                Hệ Giá Trị Cốt Lõi Của Thang Máy Hải Phát
              </h4>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Giá trị 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#285c9a] hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#285c9a]/10 text-[#285c9a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Award size={24} />
                  </div>
                  <span className="font-mono text-[11px] text-[#285c9a] font-bold block mb-1">
                    TRỤ CỘT 01
                  </span>
                  <h5 className="text-lg font-bold text-[#0d1f35] mb-2">Chất Lượng Vượt Trội</h5>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Sản phẩm thang máy chất lượng, đáp ứng các tiêu chuẩn an toàn quốc tế và Việt Nam. Vận hành êm ái, bền bỉ qua hàng triệu chu kỳ đóng mở.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200/80 font-mono text-[11px] text-slate-500">
                  Chuẩn an toàn EN 81 & QCVN
                </div>
              </div>

              {/* Giá trị 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#285c9a] hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#285c9a]/10 text-[#285c9a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="font-mono text-[11px] text-[#285c9a] font-bold block mb-1">
                    TRỤ CỘT 02
                  </span>
                  <h5 className="text-lg font-bold text-[#0d1f35] mb-2">Trách Nhiệm Toàn Diện</h5>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Đồng hành cùng Quý Khách Hàng và Đối Tác suốt quá trình triển khai dự án và cung cấp dịch vụ bảo trì, sửa chữa lâu dài, tận tâm.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200/80 font-mono text-[11px] text-slate-500">
                  Bảo hành & cứu hộ 24/7/365
                </div>
              </div>

              {/* Giá trị 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#285c9a] hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#285c9a]/10 text-[#285c9a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Lightbulb size={24} />
                  </div>
                  <span className="font-mono text-[11px] text-[#285c9a] font-bold block mb-1">
                    TRỤ CỘT 03
                  </span>
                  <h5 className="text-lg font-bold text-[#0d1f35] mb-2">Sáng Tạo Và Đổi Mới</h5>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Đội ngũ chuyên gia luôn đưa ra các giải pháp thang máy phù hợp, tối ưu hóa không gian hố thang, tiết kiệm chi phí và điện năng tiêu thụ.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200/80 font-mono text-[11px] text-slate-500">
                  Công nghệ xanh & Pit nông
                </div>
              </div>

              {/* Giá trị 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#285c9a] hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#285c9a]/10 text-[#285c9a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Users2 size={24} />
                  </div>
                  <span className="font-mono text-[11px] text-[#285c9a] font-bold block mb-1">
                    TRỤ CỘT 04
                  </span>
                  <h5 className="text-lg font-bold text-[#0d1f35] mb-2">Tinh Thần Đoàn Kết</h5>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Xây dựng tập thể gắn kết, kỹ thuật viên được đào tạo bài bản, lấy sự hài lòng và an toàn của khách hàng làm thước đo thành công.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200/80 font-mono text-[11px] text-slate-500">
                  Kỹ sư đào tạo chính quy
                </div>
              </div>
            </div>
          </div>

          {/* Sơ đồ bộ máy & Đội ngũ lãnh đạo */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#285c9a] font-bold">
                  Bộ Máy Vận Hành
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#0d1f35] mt-1">
                  Đội Ngũ Lãnh Đạo & Điều Hành Doanh Nghiệp
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                Bộ máy tổ chức chặt chẽ với các phòng ban chuyên trách, đảm bảo tính pháp lý, an toàn lao động và chất lượng thi công tại mọi điểm công trình.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-md hover:border-[#285c9a]/40 transition-all flex flex-col group"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                    <img
                      src={member.image.startsWith('/') ? member.image : `/${member.image}`}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="font-mono text-[10px] text-blue-300 uppercase tracking-widest">
                        Thang Máy Hải Phát
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white border-t border-slate-100 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-bold text-[#0d1f35] text-base">{member.name}</h5>
                      <p className="text-[#285c9a] text-xs font-semibold mt-0.5">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: LỊCH SỬ HÌNH THÀNH & CỘT MỐC PHÁT TRIỂN
         ========================================================================= */}
      <section id="lich-su-phat-trien" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 scroll-mt-28">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="02. Chặng Đường Phát Triển"
            title="Lịch Sử Hình Thành & Cột Mốc Phát Triển"
            subtitle="Từ những ngày đầu khởi nghiệp vượt thách thức đại dịch 2020 đến cột mốc gần 1.000 công trình bàn giao thành công."
          />

          {/* Timeline Cards */}
          <div className="relative mt-12">
            {/* Timeline track line on desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-300 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
              {milestones.map((item, index) => (
                <div
                  key={item.year}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#285c9a] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-black text-[#285c9a] group-hover:scale-105 transition-transform">
                        {item.year}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-[#285c9a] font-mono text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0d1f35] mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-[#285c9a]">
                    <Check size={12} />
                    <span>Cột mốc xác thực</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Proof Highlights */}
          <div className="mt-12 bg-[#0d1f35] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden border border-slate-800">
            <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="font-mono text-xs text-blue-300 uppercase tracking-widest font-semibold">
                  Mở Rộng Địa Bàn & Năng Lực Quốc Tế
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Hiện Diện Tại Hàng Ngàn Đô Thị Trọng Điểm & Nước Bạn Lào
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Thang Máy Hải Phát tự hào đã thi công và bàn giao tại các khu đô thị hàng đầu: Vinhomes Riverside, Vinhomes Ocean Park 1 & 2, Ecopark, Ciputra, Gamuda Gardens, Louis City, Dương Nội,... và vươn xa tới Phú Quốc, Bình Phước cũng như các công trình hợp tác tại nước bạn Lào.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/du-an"
                  className="inline-flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  <span>Xem Danh Sách Dự Án</span>
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:0898424666"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all"
                >
                  <Phone size={15} />
                  <span>Hotline: 0898 424 666</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: LĨNH VỰC HOẠT ĐỘNG
         ========================================================================= */}
      <section id="linh-vuc-hoat-dong" className="py-20 sm:py-28 bg-white border-b border-slate-200 scroll-mt-28">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="03. Năng Lực Cung Cấp"
            title="Lĩnh Vực Hoạt Động & Năng Lực Kỹ Thuật"
            subtitle="Hải Phát chuyên sản xuất, lắp ráp, phân phối thiết bị và thi công các dòng thang máy chuyên dụng đạt chứng nhận của cơ quan thanh tra an toàn lao động nhà nước."
          />

          {/* 3 Lĩnh vực hoạt động chính (HSNL Trang 7) */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#285c9a] flex items-center justify-center mb-4">
                  <Workflow size={24} />
                </div>
                <h4 className="text-lg font-bold text-[#0d1f35] mb-2">
                  Sản Xuất, Lắp Ráp & Bảo Trì
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Chuyên sản xuất, lắp ráp, sửa chữa và bảo trì thang máy tải khách, gia đình, tải hàng, thang cuốn và máy nâng chuyển các loại. Được Thanh tra Nhà nước về an toàn lao động xác nhận và cấp phép.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 font-mono text-[11px] text-[#285c9a] font-semibold">
                Năng lực xưởng cơ khí chính xác
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#285c9a] flex items-center justify-center mb-4">
                  <Cpu size={24} />
                </div>
                <h4 className="text-lg font-bold text-[#0d1f35] mb-2">
                  Mua Bán Vật Tư & Phụ Tùng Máy
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Cung cấp, phân phối máy kéo, tủ điều khiển vi xử lý, cáp tải chuyên dụng và linh phụ kiện chính hãng nhập khẩu từ các thương hiệu hàng đầu thế giới: Mitsubishi, Fuji, Montanari, Kone,...
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 font-mono text-[11px] text-[#285c9a] font-semibold">
                CO/CQ xuất xứ minh bạch
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#285c9a] flex items-center justify-center mb-4">
                  <Layers size={24} />
                </div>
                <h4 className="text-lg font-bold text-[#0d1f35] mb-2">
                  Tư Vấn & May Đo Giải Pháp
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Sẵn sàng giải quyết mọi yêu cầu về tư vấn kỹ thuật, xây dựng phương án lắp mới hoặc cải tạo hố thang tối ưu kinh tế và diện tích, chính sách hậu mãi chu đáo và an toàn tuyệt đối.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 font-mono text-[11px] text-[#285c9a] font-semibold">
                Khảo sát hiện trạng 3D miễn phí
              </div>
            </div>
          </div>

          {/* Direct link to dedicated Products page */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="font-bold text-[#0d1f35] text-base sm:text-lg">
                Khám phá các dòng sản phẩm thang máy Hải Phát
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Xem chi tiết thông số kỹ thuật, bản vẽ giếng thang và phối cảnh nội thất cabin tại trang danh mục sản phẩm.
              </p>
            </div>
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0"
            >
              <span>Xem Danh Mục Sản Phẩm</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: TIÊU CHUẨN CHẤT LƯỢNG & PHÁP LÝ KỸ THUẬT ĐÁP ỨNG
         ========================================================================= */}
      <section id="tieu-chuan-phap-ly" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 scroll-mt-28">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="04. Tuân Thủ Nghiêm Ngặt"
            title="Tiêu Chuẩn Chất Lượng & Pháp Lý Kỹ Thuật Đáp Ứng"
            subtitle="Mọi sản phẩm và công trình thang máy hiệu Hải Phát trước khi bàn giao đều được cơ quan Nhà nước có thẩm quyền kiểm định an toàn và Thanh tra ATLĐ cấp giấy phép sử dụng."
          />

          {/* Legal Compliance & Safety Qualification Card */}
          <div className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#285c9a] font-bold">
                  Tư Cách Pháp Nhân & Đầy Đủ Giấy Phép
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#0d1f35] mt-1">
                  Đơn Vị Chuyên Ngành Được Nhà Nước Cấp Phép Hoạt Động
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Doanh nghiệp hoạt động hợp pháp, đáp ứng đầy đủ các quy định khắt khe về an toàn lao động và thiết bị nâng chuyển chuyên dụng.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-[#285c9a] font-mono text-xs font-bold">
                  PHÁP NHÂN ĐẦY ĐỦ
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
                  ĐẠT CHUẨN AN TOÀN LAO ĐỘNG
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 text-xs text-slate-600">
              <div className="space-y-1">
                <span className="font-semibold text-slate-900 block">Văn phòng điều hành:</span>
                <p>Tòa nhà đa năng - Số 169 Nguyễn Ngọc Vũ, P. Trung Hòa, Q. Cầu Giấy, TP. Hà Nội.</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-slate-900 block">Kiểm định an toàn:</span>
                <p>Mọi công trình đều được Trung tâm Kiểm định Kỹ thuật An toàn Nhà nước nghiệm thu và cấp phép trước khi bàn giao.</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-slate-900 block">Kênh hỗ trợ chính thức:</span>
                <p>Hotline 24/7: <strong className="text-slate-900">0898 424 666</strong> · Email: <strong className="text-slate-900">haiphatthangmay@gmail.com</strong></p>
              </div>
            </div>
          </div>

          {/* Ma trận tiêu chuẩn QCVN & TCVN (Trang 8 & 14-15 HSNL) */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#285c9a] font-bold">
                  Hệ Thống Tiêu Chuẩn Quốc Gia
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#0d1f35] mt-1">
                  Đáp Ứng Đầy Đủ Các Tiêu Chuẩn Thang Máy Việt Nam (TCVN & QCVN)
                </h4>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 font-mono text-xs text-slate-600 shadow-2xs">
                <FileCheck2 size={14} className="text-emerald-600" />
                <span>100% Đạt Chuẩn Kiểm Định</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {technicalStandards.map((std) => (
                <div
                  key={std.code}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#285c9a] hover:shadow-2xs transition-all flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-[#285c9a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <BadgeCheck size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-[#285c9a] bg-blue-50 px-2 py-0.5 rounded">
                        {std.code}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {std.type}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm leading-snug">
                      {std.title}
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {std.scope}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DỊCH VỤ HẬU MÃI & BẢO HÀNH - BẢO TRÌ
         ========================================================================= */}
      <section id="bao-hanh-bao-tri" className="py-20 sm:py-28 bg-white border-b border-slate-200 scroll-mt-28">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="05. Hậu Mãi & Dịch Vụ Khách Hàng"
            title="Dịch Vụ Hậu Mãi & Bảo Hành - Bảo Trì Chuyên Sâu"
            subtitle="Đưa chất lượng bảo trì lên mức cao nhất với đội ngũ chuyên viên kỹ thuật nhiều năm kinh nghiệm, đảm bảo sự vận hành liên tục và an toàn tuyệt đối cho người sử dụng."
          />

          {/* 3 Trụ Cột Dịch Vụ Khách Hàng (HSNL Trang 12) */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-[#0d1f35] text-white border border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-semibold block mb-1">
                  Cứu Hộ 24/7/365
                </span>
                <h4 className="text-xl font-bold text-white mb-2">
                  Phản Hồi Khẩn Cấp 1 – 6 Giờ
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Có mặt nhanh chóng chỉ từ 1 – 6 giờ sau khi nhận được yêu cầu xử lý sự cố từ khách hàng qua đường dây nóng hotline chăm sóc khách hàng 24/7.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/10 font-mono text-xs text-amber-300">
                Hotline trực 24/24: 0898 424 666
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#285c9a] flex items-center justify-center mb-4">
                  <Users2 size={24} />
                </div>
                <span className="font-mono text-xs text-[#285c9a] uppercase tracking-widest font-semibold block mb-1">
                  Chuyên Môn Cao
                </span>
                <h4 className="text-xl font-bold text-[#0d1f35] mb-2">
                  Tư Vấn & CSKH Giàu Kinh Nghiệm
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Đảm bảo mọi điểm chạm trước, trong và sau lắp đặt luôn nhận được sự lắng nghe từ bộ phận kỹ thuật viên có tay nghề cao, cải thiện vấn đề phát sinh kịp thời và chính xác.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 font-mono text-xs text-[#285c9a]">
                Đào tạo trực tiếp từ chuyên gia hãng
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#285c9a] flex items-center justify-center mb-4">
                  <Wrench size={24} />
                </div>
                <span className="font-mono text-xs text-[#285c9a] uppercase tracking-widest font-semibold block mb-1">
                  Phòng Ngừa Từ Sớm
                </span>
                <h4 className="text-xl font-bold text-[#0d1f35] mb-2">
                  Kiểm Định Chất Lượng Định Kỳ
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Định kỳ liên hệ và kiểm tra tình trạng vận hành thang máy nhằm đưa ra giải pháp bảo dưỡng kịp thời, hạn chế tối đa hỏng hóc và chi phí sửa chữa phát sinh khi sử dụng.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 font-mono text-xs text-[#285c9a]">
                Báo cáo kiểm tra chi tiết từng kỳ
              </div>
            </div>
          </div>

          {/* 10 Hạng Mục Cam Kết Bảo Hành & Bảo Trì (HSNL Trang 12) */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#285c9a] font-bold">
                  Quy Trình Nghiêm Ngặt
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#0d1f35] mt-1">
                  10 Hạng Mục Cam Kết Trong Dịch Vụ Bảo Trì Thang Máy
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                Chính sách hậu mãi chu đáo, tận tình và chế độ bảo dưỡng đúng tiêu chuẩn kỹ thuật an toàn cao nhất của Thang Máy Hải Phát.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {maintenanceCommitments.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-3 hover:border-[#285c9a]/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ĐỐI TÁC THIẾT BỊ TOÀN CẦU
         ========================================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#285c9a] font-bold">
              Đối Tác Toàn Cầu
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0d1f35] mt-1">
              Liên Kết Trực Tiếp Cùng Các Thương Hiệu Cơ Điện Thang Máy Hàng Đầu
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-center">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex items-center justify-center h-20 px-6 py-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-[#285c9a]/30 transition-all"
                title={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-9 sm:max-h-10 w-auto max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CHỐT CHUYỂN ĐỔI (CONVERSION CALL TO ACTION)
         ========================================================================= */}
      <section className="py-20 bg-gradient-to-r from-[#0d1f35] via-[#16365c] to-[#0d1f35] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-300 font-semibold">
            Đồng Hành Cùng Không Gian Sống Bền Vững
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Liên Hệ Ngay Với Chuyên Gia Kỹ Thuật Thang Máy Hải Phát
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Nhận tư vấn giải pháp thiết kế hố thang, kích thước giếng thang và khảo sát hiện trạng miễn phí tận công trình trong vòng 24–48 giờ.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Calculator size={16} />
              <span>Dự Toán & Báo Giá Nhanh</span>
            </button>
            <a
              href="tel:0898424666"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95"
            >
              <Phone size={16} className="text-amber-400" />
              <span className="font-mono">Hotline: 0898 424 666</span>
            </a>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/15 border border-white/10 text-white px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all"
            >
              <span>Gửi Yêu Cầu Khảo Sát</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span>TRỤ SỞ: 169 NGUYỄN NGỌC VŨ, CẦU GIẤY, HÀ NỘI</span>
            <span>EMAIL: HAIPHATTHANGMAY@GMAIL.COM</span>
          </div>
        </div>
      </section>
    </div>
  );
}