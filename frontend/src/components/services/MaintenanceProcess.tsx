"use client";

import React from "react";
import { 
  ClipboardCheck, 
  Wrench, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Gauge, 
  Layers, 
  ShieldCheck 
} from "lucide-react";

export function MaintenanceProcess() {
  const STEPS = [
    {
      step: "01",
      title: "Tiếp Nhận Hiện Trạng & Nhật Ký Vận Hành",
      time: "15 PHÚT ĐẦU",
      desc: "Kỹ sư trao đổi cùng chủ nhà về tình trạng vận hành trong 60 ngày qua, tra cứu mã lỗi lưu trữ trên biến tần và kiểm tra sơ bộ các nút gọi tầng, đèn cabin.",
      checkpoints: [
        "Tra cứu lịch sử mã lỗi F-code trên biến tần Yaskawa / Fuji",
        "Kiểm tra hệ thống liên lạc Intercom và chuông báo động cứu hộ",
        "Đo độ rung chấn và tiếng ồn khi cabin di chuyển qua từng tầng"
      ],
      icon: ClipboardCheck
    },
    {
      step: "02",
      title: "Bảo Dưỡng Hệ Thống Cơ Khí & Cáp Kéo",
      time: "30 - 45 PHÚT",
      desc: "Kiểm tra cơ cấu chuyển động tải nặng: ray dẫn hướng, đối trọng, pully, độ mòn rãnh cáp và hiệu chỉnh khe hở má phanh từ an toàn tuyệt đối.",
      checkpoints: [
        "Kiểm tra độ giãn, độ mòn cáp tải theo tiêu chuẩn TCVN 6395",
        "Tra dầu bôi trơn chuyên dụng ray dẫn hướng & siết ốc đối trọng",
        "Kiểm tra bộ khống chế vượt tốc Governor và cơ cấu phanh hãm an toàn"
      ],
      icon: Wrench
    },
    {
      step: "03",
      title: "Kiểm Định Hệ Thống Điện & Bộ Cứu Hộ ARD",
      time: "20 - 30 PHÚT",
      desc: "Đo điện áp, dòng khởi động motor, làm sạch bụi tủ điện vi xử lý, kiểm tra cảm biến an toàn cửa quang học Photocell và thử nghiệm ngắt điện lưới giả định.",
      checkpoints: [
        "Test chức năng cứu hộ tự động ARD: tự về tầng gần nhất mở cửa",
        "Vệ sinh tiếp điểm contactor, rơ-le và quạt tản nhiệt tủ điện",
        "Kiểm tra mành hồng ngoại Photocell chống kẹt tay người dùng"
      ],
      icon: Cpu
    },
    {
      step: "04",
      title: "Chạy Thử Full Tải, Bàn Giao & Ký Biên Bản",
      time: "15 PHÚT CUỐI",
      desc: "Chạy thử nghiệm hành trình full tải và không tải, hiệu chỉnh bằng tầng chính xác từng milimet, vệ sinh nóc cabin và bàn giao biên bản kiểm định 2 bên.",
      checkpoints: [
        "Đo độ lệch mặt sàn khi dừng tầng (đảm bảo chuẩn < ±2mm)",
        "Vệ sinh sạch sẽ hố PIT, nóc cabin và rãnh trượt cửa tầng",
        "Ghi sổ nhật ký bảo dưỡng, đại diện kỹ sư & gia chủ ký xác nhận"
      ],
      icon: CheckCircle2
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#285c9a] font-mono text-xs uppercase tracking-widest font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#285c9a]" />
            Quy Chuẩn Vận Hành
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Quy Trình 4 Bước Bảo Trì Tiêu Chuẩn Cơ Điện
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Mỗi lần bảo trì định kỳ kéo dài từ 75 đến 120 phút, thực hiện chuẩn hóa theo danh mục kiểm định của Hải Phát nhằm đảm bảo hệ số an toàn cao nhất.
          </p>
        </div>

        {/* Stepped Process Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.step}
                className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col group"
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#285c9a]/10 text-[#285c9a] group-hover:bg-[#285c9a] group-hover:text-white transition-colors duration-300 flex items-center justify-center font-bold">
                    <Icon size={20} />
                  </div>
                  <div className="flex items-center gap-1.5 text-right">
                    <span className="font-mono text-xs text-slate-400">BƯỚC</span>
                    <span className="font-mono text-2xl font-black text-slate-900 tracking-tight">{step.step}</span>
                  </div>
                </div>

                {/* Duration chip */}
                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded w-fit mb-3 border border-cyan-100">
                  <span>{step.time}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 mb-2.5 leading-snug group-hover:text-[#285c9a] transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {step.desc}
                </p>

                {/* Checkpoints */}
                <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    HẠNG MỤC TRỌNG TÂM:
                  </div>
                  {step.checkpoints.map((cp, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#285c9a] shrink-0 mt-1.5" />
                      <span className="leading-snug">{cp}</span>
                    </div>
                  ))}
                </div>

                {/* Arrow connector for desktop */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-500 shadow-sm">
                    <ArrowRight size={12} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Process Footnote */}
        <div className="mt-12 p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#285c9a] shrink-0" />
            <span>Mọi công tác kiểm tra đều có phiếu nghiệm thu bàn giao và cập nhật vào hồ sơ quản lý thang số hóa.</span>
          </div>
          <a 
            href="#tu-van-bao-gia" 
            className="text-[#285c9a] font-bold hover:underline whitespace-nowrap"
          >
            Đăng ký bảo trì định kỳ ngay &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
