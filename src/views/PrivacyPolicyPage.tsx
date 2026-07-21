"use client";
import { Shield, Lock, FileText, UserCheck, Eye, Database } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="bg-[#0d1f35] pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#285c9a] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#285c9a] rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 text-[#285c9a] bg-[#285c9a]/15 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            <Shield size={14} />
            Bảo mật thông tin
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-white/70 text-base leading-relaxed mb-6">
            Chúng tôi cam kết bảo vệ sự riêng tư và thông tin cá nhân của bạn. Vui lòng đọc kỹ các chính sách dưới đây để hiểu rõ cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-blue max-w-none prose-headings:text-[#0d1f35] prose-a:text-[#285c9a]">
            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Database className="text-[#285c9a]" />
                1. Mục đích và phạm vi thu thập
              </h2>
              <p className="text-gray-600 mb-4">
                Việc thu thập dữ liệu chủ yếu trên website {companyInfo.name} bao gồm: email, điện thoại, địa chỉ khách hàng. Đây là các thông tin mà chúng tôi cần thành viên cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và để chúng tôi liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên website nhằm đảm bảo quyền lợi cho người tiêu dùng.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Eye className="text-[#285c9a]" />
                2. Phạm vi sử dụng thông tin
              </h2>
              <p className="text-gray-600 mb-4">Website sử dụng thông tin thành viên cung cấp để:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Cung cấp các dịch vụ đến thành viên.</li>
                <li>Gửi các thông báo về các hoạt động trao đổi thông tin giữa thành viên và website.</li>
                <li>Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của thành viên hoặc các hoạt động giả mạo thành viên.</li>
                <li>Liên lạc và giải quyết với thành viên trong những trường hợp đặc biệt.</li>
                <li>Không sử dụng thông tin cá nhân của thành viên ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại {companyInfo.name}.</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Lock className="text-[#285c9a]" />
                3. Thời gian lưu trữ thông tin
              </h2>
              <p className="text-gray-600 mb-4">
                Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của {companyInfo.name}.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <UserCheck className="text-[#285c9a]" />
                4. Những người hoặc tổ chức có thể được tiếp cận với thông tin
              </h2>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Ban quản trị website.</li>
                <li>Cơ quan nhà nước có thẩm quyền trong trường hợp có yêu cầu theo quy định của pháp luật.</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <FileText className="text-[#285c9a]" />
                5. Cam kết bảo mật thông tin cá nhân khách hàng
              </h2>
              <p className="text-gray-600 mb-4">
                Thông tin cá nhân của thành viên trên website được {companyInfo.name} cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của website. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
              </p>
              <p className="text-gray-600 mb-4">
                Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ thành viên.
              </p>
            </div>
            
            <div className="mt-12 text-center text-gray-500 text-sm">
              <p>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
              <p className="mt-2">Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua hotline: {companyInfo.headquarters.hotline}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
