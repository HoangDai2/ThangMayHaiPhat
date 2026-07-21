"use client";
import { FileText, CheckCircle, AlertTriangle, Scale, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function TermsOfUsePage() {
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
            <FileText size={14} />
            Quy định chung
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Điều Khoản Sử Dụng
          </h1>
          <p className="text-white/70 text-base leading-relaxed mb-6">
            Bằng việc truy cập và sử dụng website của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện dưới đây.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-blue max-w-none prose-headings:text-[#0d1f35] prose-a:text-[#285c9a]">
            
            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle className="text-[#285c9a]" />
                1. Chấp nhận các Điều khoản
              </h2>
              <p className="text-gray-600 mb-4">
                Khi sử dụng website của {companyInfo.name}, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý chịu ràng buộc bởi các Điều khoản Sử dụng này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản, vui lòng không sử dụng website của chúng tôi.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <ShieldCheck className="text-[#285c9a]" />
                2. Quyền sở hữu trí tuệ
              </h2>
              <p className="text-gray-600 mb-4">
                Tất cả nội dung trên website này, bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo, biểu tượng, hình ảnh, clip âm thanh, tải xuống kỹ thuật số và biên soạn dữ liệu, đều là tài sản của {companyInfo.name} hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật bản quyền Việt Nam và quốc tế.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <AlertTriangle className="text-[#285c9a]" />
                3. Quy định sử dụng
              </h2>
              <p className="text-gray-600 mb-4">Bạn đồng ý KHÔNG sử dụng website này để:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Thực hiện bất kỳ hành vi vi phạm pháp luật hoặc quy định hiện hành nào.</li>
                <li>Xâm phạm quyền sở hữu trí tuệ hoặc các quyền hợp pháp khác của chúng tôi hoặc của bất kỳ bên thứ ba nào.</li>
                <li>Đăng tải hoặc truyền phát bất kỳ tài liệu có chứa virus phần mềm hoặc bất kỳ mã máy tính, tập tin hoặc chương trình nào khác được thiết kế để làm gián đoạn, phá hủy hoặc hạn chế chức năng của bất kỳ phần mềm hoặc phần cứng máy tính nào.</li>
                <li>Thực hiện các hành vi gây cản trở hoặc phá vỡ tính năng an toàn, bảo mật của website.</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Scale className="text-[#285c9a]" />
                4. Giới hạn trách nhiệm
              </h2>
              <p className="text-gray-600 mb-4">
                {companyInfo.name} không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc mang tính hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng website này. Mặc dù chúng tôi luôn nỗ lực đảm bảo thông tin trên website là chính xác và cập nhật, nhưng không đưa ra bất kỳ sự đảm bảo nào về tính hoàn thiện hoặc chính xác tuyệt đối.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <FileText className="text-[#285c9a]" />
                5. Thay đổi Điều khoản
              </h2>
              <p className="text-gray-600 mb-4">
                Chúng tôi bảo lưu quyền cập nhật hoặc thay đổi các Điều khoản Sử dụng này vào bất kỳ lúc nào mà không cần thông báo trước. Việc bạn tiếp tục sử dụng website sau khi có những thay đổi như vậy đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
              </p>
            </div>
            
            <div className="mt-12 text-center text-gray-500 text-sm">
              <p>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
              <p className="mt-2">Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng này, vui lòng liên hệ với chúng tôi qua hotline: {companyInfo.headquarters.hotline}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
