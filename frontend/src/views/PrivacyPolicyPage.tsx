"use client";

import { Shield, Lock, FileText, UserCheck, Eye, Database } from 'lucide-react';
import { companyInfo } from '../data/company';
import PageHeader from '../components/shared/PageHeader';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Unified PageHeader */}
      <PageHeader
        badge="Chính Sách & Quy Định"
        title="Chính Sách Bảo Mật Thông Tin"
        subtitle="Thang Máy Hải Phát cam kết bảo vệ dữ liệu cá nhân của khách hàng theo quy chuẩn pháp luật Việt Nam và tiêu chuẩn quản lý chất lượng ISO 9001:2015."
        breadcrumbs={[{ label: 'Chính sách bảo mật' }]}
        telemetryTag="QUY ĐỊNH PHÁP LÝ // BẢO MẬT DỮ LIỆU"
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <Database className="text-[#285c9a]" size={20} />
                <span>1. Mục đích và phạm vi thu thập dữ liệu</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Việc thu thập dữ liệu chủ yếu trên website {companyInfo.name} bao gồm: họ tên, số điện thoại, email và địa chỉ hiện trạng công trình. Đây là các thông tin cần thiết để đội ngũ kỹ thuật liên hệ xác nhận, tư vấn bản vẽ và lên phương án khảo sát hố thang chính xác.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <Eye className="text-[#285c9a]" size={20} />
                <span>2. Phạm vi sử dụng thông tin</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">Chúng tôi sử dụng thông tin do bạn cung cấp để:</p>
              <ul className="list-disc pl-5 text-slate-600 text-sm space-y-2">
                <li>Liên hệ tư vấn kích thước giếng thang, báo giá thiết bị và cử kỹ sư khảo sát.</li>
                <li>Lập hợp đồng kinh tế và cung cấp dịch vụ bảo hành, bảo trì định kỳ.</li>
                <li>Gửi thông báo tiến độ thi công, lịch bàn giao nghiệm thu thiết bị.</li>
                <li>Hỗ trợ xử lý sự cố cứu hộ khẩn cấp 24/7 khi khách hàng yêu cầu.</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <Lock className="text-[#285c9a]" size={20} />
                <span>3. Thời gian lưu trữ dữ liệu</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dữ liệu cá nhân của khách hàng sẽ được lưu trữ an toàn trong suốt chu kỳ vòng đời vận hành thang máy để phục vụ lịch sử bảo hành, bảo trì hoặc cho đến khi khách hàng có yêu cầu hủy bỏ chính thức.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <UserCheck className="text-[#285c9a]" size={20} />
                <span>4. Đơn vị tiếp cận thông tin</span>
              </h2>
              <ul className="list-disc pl-5 text-slate-600 text-sm space-y-2">
                <li>Ban quản trị và kỹ sư chuyên trách của Thang Máy Hải Phát.</li>
                <li>Cơ quan nhà nước có thẩm quyền trong trường hợp có yêu cầu theo quy định pháp luật.</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <FileText className="text-[#285c9a]" size={20} />
                <span>5. Cam kết bảo mật tuyệt đối</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Thông tin cá nhân của bạn được {companyInfo.name} cam kết bảo mật tuyệt đối. Chúng tôi không mua bán, trao đổi hoặc chia sẻ dữ liệu này với bất kỳ bên thứ ba nào vì mục đích thương mại ngoài phạm vi thi công lắp đặt thang máy.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 text-center text-slate-500 text-xs font-mono">
              <p>Phiên bản cập nhật năm {new Date().getFullYear()} · Công Ty Thang Máy Hải Phát</p>
              <p className="mt-1">Hotline giải đáp thắc mắc: {companyInfo.headquarters.hotline}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
