"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Thang máy không phải do Hải Phát lắp đặt ban đầu có được ký hợp đồng bảo trì không?",
    answer: "Có. Đội ngũ kỹ sư Hải Phát sẽ đến trực tiếp công trình để khảo sát toàn diện hệ thống cơ điện, phanh, tủ điều khiển và ray dẫn hướng hoàn toàn miễn phí. Sau khi đánh giá hiện trạng và lập biên bản kiểm định, chúng tôi sẽ đề xuất gói hợp đồng bảo trì định kỳ phù hợp với đầy đủ cam kết SLA và bảo hiểm kỹ thuật."
  },
  {
    question: "Tại sao chu kỳ bảo trì tiêu chuẩn của Hải Phát lại là 2 tháng / 1 lần?",
    answer: "Chu kỳ 2 tháng/lần là khoảng thời gian tối ưu khoa học theo tiêu chuẩn TCVN và EN 81 đối với thang máy gia đình và tòa nhà văn phòng tầm trung. Sau 60 ngày vận hành, dầu bôi trơn ray dẫn hướng bắt đầu giảm độ nhớt, bụi mịn bám vào tiếp điểm tủ điện và các cơ cấu cơ khí cần được tra siết lại để ngăn ngừa mài mòn trước khi hư hỏng xảy ra."
  },
  {
    question: "Khi thang máy mất điện đột ngột, người bên trong cabin có bị rơi hoặc ngạt thở không?",
    answer: "Tuyệt đối an toàn. Thứ nhất, cabin thang máy luôn có các khe thông gió tự nhiên đối lưu liên tục, không khí không bao giờ bị kín hoàn toàn. Thứ hai, hệ thống cứu hộ tự động ARD (Automatic Rescue Device) lập tức kích hoạt nguồn ắc quy dự phòng, đưa cabin về tầng gần nhất và tự động mở cửa để người dùng bước ra an toàn. Thứ ba, hệ thống phanh cơ khí hãm an toàn độc lập sẽ lập tức khóa cứng cabin vào ray dẫn hướng nếu tốc độ vượt quá ngưỡng quy định."
  },
  {
    question: "Chi phí linh kiện thay thế trong quá trình bảo dưỡng được tính như thế nào?",
    answer: "Hải Phát cam kết minh bạch 100% bằng văn bản. Mọi công tác vệ sinh, tra dầu mỡ, cân chỉnh vi mô, siết ốc và test cứu hộ đều nằm trọn gói trong chi phí bảo dưỡng định kỳ. Trong trường hợp linh kiện cơ điện hao mòn cần thay thế (như đèn chiếu sáng, ắc quy ARD, guốc trượt), kỹ sư sẽ lập biên bản hiện trạng, báo giá theo bảng niêm yết chính hãng và chỉ tiến hành thay thế khi có sự đồng ý của gia chủ."
  },
  {
    question: "Nếu thang máy xảy ra sự cố vào ban đêm hoặc ngày Lễ, Tết thì đội cứu hộ có trực không?",
    answer: "Đội ngũ kỹ thuật cứu hộ khẩn cấp của Hải Phát túc trực 24/7/365, không nghỉ ngày Lễ hay Tết. Tổng đài hotline cứu hộ 0326 629 971 luôn có nhân viên trực máy và kỹ sư phản ứng nhanh sẵn sàng xuất phát trong vòng 30 - 60 phút nội thành."
  }
];

export function ServiceFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#285c9a] font-mono text-xs uppercase tracking-widest font-semibold mb-3">
            <HelpCircle size={14} />
            <span>Hỏi Đáp Kỹ Thuật</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Giải Đáp Thắc Mắc Về Dịch Vụ Thang Máy
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Những băn khoăn phổ biến nhất của các gia chủ và ban quản lý tòa nhà trước khi lựa chọn đơn vị bảo trì.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#285c9a] text-white" : ""
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Prompt */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Bạn cần giải đáp chuyên sâu về thông số kỹ thuật công trình của mình?{" "}
          <a href="tel:0898424666" className="text-[#285c9a] font-bold underline hover:text-[#1e4a80]">
            Gọi ngay 0898 424 666
          </a>
        </div>

      </div>
    </section>
  );
}
