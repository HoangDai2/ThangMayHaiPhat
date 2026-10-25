"use client";

import { FileText, CheckCircle, AlertTriangle, Scale, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/company';
import PageHeader from '../components/shared/PageHeader';

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Unified PageHeader */}
      <PageHeader
        badge="Quy Định & Pháp Lý"
        title="Điều Khoản & Điều Kiện Sử Dụng"
        subtitle="Vui lòng đọc kỹ các điều khoản dưới đây trước khi tham khảo dữ liệu kỹ thuật, sử dụng dịch vụ hoặc gửi thông tin khảo sát trên website Thang Máy Hải Phát."
        breadcrumbs={[{ label: 'Điều khoản sử dụng' }]}
        telemetryTag="QUY ĐỊNH PHÁP LÝ // TIÊU CHUẨN XÂY DỰNG"
      />

      {/* Content Container */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <CheckCircle className="text-[#285c9a]" size={20} />
                <span>1. Chấp nhận các điều khoản</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Khi truy cập và tra cứu thông số kỹ thuật trên website của {companyInfo.name}, bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ các quy định được công bố tại đây. Nếu không đồng ý với bất kỳ nội dung nào, bạn có thể ngừng truy cập website.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <ShieldCheck className="text-[#285c9a]" size={20} />
                <span>2. Quyền sở hữu trí tuệ & bản quyền hình ảnh</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Toàn bộ tài liệu kỹ thuật, hình ảnh công trình thực tế, phối cảnh 3D cabin và nhãn hiệu "Thang Máy Hải Phát" đều thuộc quyền sở hữu độc quyền của công ty hoặc các đối tác chuyển giao công nghệ. Nghiêm cấm sao chép vì mục đích thương mại khi chưa có sự chấp thuận bằng văn bản.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <AlertTriangle className="text-[#285c9a]" size={20} />
                <span>3. Trách nhiệm của người sử dụng</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">Người sử dụng cam kết không thực hiện các hành vi:</p>
              <ul className="list-disc pl-5 text-slate-600 text-sm space-y-2">
                <li>Cung cấp số điện thoại hoặc thông tin sai lệch nhằm mục đích phá rối kênh tư vấn.</li>
                <li>Sử dụng các công cụ tự động quét dữ liệu làm gián đoạn hệ thống máy chủ.</li>
                <li>Đăng tải các nội dung vi phạm thuần phong mỹ tục hoặc pháp luật Việt Nam.</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <Scale className="text-[#285c9a]" size={20} />
                <span>4. Giới hạn trách nhiệm về dữ liệu tham khảo</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Các bảng thông số kỹ thuật (kích thước giếng thang, hố PIT, OH) được đăng tải mang tính chất quy chuẩn tham khảo. Mọi số liệu thi công chính thức sẽ được kỹ sư Hải Phát thẩm định và chốt trên bản vẽ thiết kế kết cấu kèm theo hợp đồng kinh tế.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-3 text-[#0d1f35]">
                <FileText className="text-[#285c9a]" size={20} />
                <span>5. Điều chỉnh và hiệu lực áp dụng</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hải Phát có quyền cập nhật các điều khoản này theo yêu cầu thực tế của pháp luật và công nghệ. Các thay đổi sẽ có hiệu lực ngay khi được công bố công khai trên website.
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
