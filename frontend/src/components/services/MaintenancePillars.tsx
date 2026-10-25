"use client";

import React from "react";
import { 
  FileCheck2, 
  Wrench, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Scale, 
  Sparkles,
  Award
} from "lucide-react";

export function MaintenancePillars() {
  const PILLARS = [
    {
      code: "PILLAR-01 // LEGAL SLA",
      badge: "Pháp Lý & Minh Bạch",
      title: "Hợp Đồng Bảo Trì Toàn Diện 1 Năm",
      description: "Ràng buộc pháp lý bằng điều khoản SLA rõ ràng, cam kết giá phụ tùng niêm yết không đổi trong suốt chu kỳ.",
      image: "/bhbt.png",
      points: [
        "Ràng buộc cam kết thời gian có mặt cứu hộ & bồi thường nếu vi phạm SLA.",
        "Minh bạch 100% biểu giá linh kiện thay thế chính hãng niêm yết công khai.",
        "Sổ nhật ký bảo dưỡng kỹ thuật số hóa theo dõi lịch sử hao mòn thiết bị.",
        "Bảo hiểm trách nhiệm sự cố bên thứ ba cho toàn bộ hệ thống thang máy."
      ],
      metric: "12 THÁNG",
      metricLabel: "BẢO VỆ TOÀN DIỆN",
      accent: "border-[#285c9a] text-[#285c9a]"
    },
    {
      code: "PILLAR-02 // 60-DAY CYCLE",
      badge: "Kỹ Thuật Chuyên Sâu",
      title: "Chu Kỳ Kiểm Định 2 Tháng / 1 Lần",
      description: "Quy chuẩn kiểm tra 20+ hạng mục cơ điện nghiêm ngặt, loại bỏ hoàn toàn nguy cơ tiềm ẩn trước khi phát sinh sự cố.",
      image: "/493231919_1109987391144722_8013699268272707181_n.jpg",
      points: [
        "Kiểm tra hệ thống phanh cơ, cáp kéo chịu lực và giới hạn an toàn hành trình.",
        "Đo kiểm bộ cứu hộ tự động ARD khi mất điện lưới giả định hàng kỳ.",
        "Tra mỡ chuyên dụng ray dẫn hướng, vệ sinh rãnh trượt cửa tầng và cabin.",
        "Hiệu chỉnh độ êm ái khi dừng tầng chính xác tuyệt đối (sai số < ±2mm)."
      ],
      metric: "20+ HẠNG MỤC",
      metricLabel: "KIỂM ĐỊNH MỖI 60 NGÀY",
      accent: "border-cyan-600 text-cyan-600"
    },
    {
      code: "PILLAR-03 // CERTIFIED ENGINEERS",
      badge: "Đội Ngũ Tận Tâm",
      title: "100% Nhân Sự Đào Tạo Nội Bộ",
      description: "Kỹ sư chính quy tốt nghiệp chuyên ngành cơ điện tử, tuyệt đối không sử dụng thợ phụ kiện hay cộng tác viên ngoài.",
      image: "/539928420_1207135848096542_3586556978112750775_n.jpg",
      points: [
        "Chứng chỉ kiểm định kỹ thuật an toàn lao động Nhóm 3 cấp bởi Cục An Toàn.",
        "Được huấn luyện trực tiếp từ các chuyên gia thang máy nhập khẩu.",
        "Trang bị đầy đủ vali thiết bị đo laser, máy đo độ ồn và xung nhịp biến tần.",
        "Tác phong đồng phục chuẩn chỉ, văn minh và tôn trọng không gian gia chủ."
      ],
      metric: "100% NỘI BỘ",
      metricLabel: "KỸ SƯ CHÍNH HÃNG HẢI PHÁT",
      accent: "border-slate-800 text-slate-800"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[#285c9a] font-mono text-xs uppercase tracking-widest font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#285c9a]" />
            Phân Hệ Dịch Vụ 02
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Gói Bảo Hành & Bảo Trì Định Kỳ: 3 Trụ Cột Cam Kết Vàng
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Hải Phát xây dựng chuẩn mực dịch vụ hậu mãi dựa trên tính minh bạch tuyệt đối, quy trình đo kiểm định kỳ nghiêm ngặt và đạo đức nghề nghiệp của từng kỹ sư.
          </p>
        </div>

        {/* 3 Pillars Grid - Double-Bezel Hardware Architecture */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => (
            <div 
              key={pillar.code}
              className="group p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
            >
              <div className="bg-white rounded-[calc(1rem-2px)] p-6 sm:p-7 flex flex-col h-full">
                
                {/* Visual Media Header */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-5 bg-slate-900">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white font-mono text-[10.5px] uppercase tracking-wider border border-white/20">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Bottom Metric Chip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">{pillar.metricLabel}</div>
                      <div className="text-xl font-black text-white tracking-tight">{pillar.metric}</div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      {idx === 0 && <FileCheck2 size={16} />}
                      {idx === 1 && <Wrench size={16} />}
                      {idx === 2 && <Users size={16} />}
                    </div>
                  </div>
                </div>

                {/* Pillar Typography */}
                <div className="font-mono text-[11px] text-[#285c9a] uppercase tracking-widest mb-1.5 font-semibold">
                  {pillar.code}
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2.5 group-hover:text-[#285c9a] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Checklist Points */}
                <ul className="space-y-3 pt-4 border-t border-slate-100 mt-auto text-xs sm:text-sm text-slate-700">
                  {pillar.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-[#285c9a] shrink-0">
                        <CheckCircle2 size={16} />
                      </span>
                      <span className="leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Status Divider */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>TIÊU CHUẨN ISO 9001:2015</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    CAM KẾT THỰC THI
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
