"use client";

import {
  ShieldCheck,
  Banknote,
  FileCheck2,
  Wrench,
  Clock,
} from 'lucide-react';
import SectionHeader from './shared/SectionHeader';

const PROCESS_STEPS = [
  {
    num: 1,
    title: 'Khảo sát miễn phí',
    desc: 'Kỹ sư đến đo giếng thang, hố PIT, chiều cao tầng trên cùng.',
    time: 'Trong 24–48 giờ',
    image: '/189644056_157443963019765_6705723621810017597_n.jpg',
  },
  {
    num: 2,
    title: 'Bản vẽ 3D & báo giá',
    desc: 'Phương án cabin, cửa tầng và báo giá chi tiết từng hạng mục.',
    time: '2–3 ngày',
    image: '/763701258_1499177482225709_114956793849319926_n.jpg',
  },
  {
    num: 3,
    title: 'Thi công lắp đặt',
    desc: 'Đội kỹ thuật của Hải Phát, cập nhật tiến độ qua Zalo hằng tuần.',
    time: '25–35 ngày',
    image: '/483100261_1075555607921234_7097560171354795472_n.jpg',
  },
  {
    num: 4,
    title: 'Kiểm định & bàn giao',
    desc: 'Kiểm định theo QCVN 02:2019, hướng dẫn sử dụng, bảo trì định kỳ.',
    time: 'Bảo trì 2 tháng/lần',
    image: '/762974441_1501082972035160_5634679056048782805_n.jpg',
  },
];

const COMMITMENTS = [
  {
    icon: Banknote,
    title: 'Giá chốt, không phát sinh',
    desc: 'Giá trong hợp đồng là giá cuối, đã gồm lắp đặt và kiểm định lần đầu.',
    dashed: true,
  },
  {
    icon: FileCheck2,
    title: 'Linh kiện có CO/CQ',
    desc: 'Biến tần Fuji (Nhật Bản), động cơ Montanari (Ý). Giấy tờ bàn giao đầy đủ.',
    dashed: false,
  },
  {
    icon: ShieldCheck,
    title: 'Bảo hành 18 tháng',
    desc: 'Bảo trì định kỳ 2 tháng/lần miễn phí trong thời gian bảo hành.',
    dashed: true,
  },
  {
    icon: Wrench,
    title: 'Cứu hộ 24/7',
    desc: 'Cam kết có mặt 1 đến 2 tiếng trong Hà Nội, 2 đến 6 tiếng ngoài Hà Nội.',
    dashed: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-7 sm:py-9 lg:py-10 bg-[#0F2A4A] border-b border-[#0F2A4A]">
      {/* 1. QUY TRÌNH 4 BƯỚC: TỪ KHẢO SÁT ĐẾN BÀN GIAO (GIỮ NGUYÊN ẢNH THẬT) */}
      <div id="quy-trinh" className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          variant="dark"
          badge="Quy Trình 4 Bước"
          title="Từ khảo sát đến bàn giao"
          className="mb-5 sm:mb-7"
        />

        <div data-reveal-stagger="true" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl border border-white/90 shadow-lg shadow-black/15 p-4 flex flex-col justify-between hover:shadow-xl hover:border-white transition-all group"
            >
              <div>
                {/* Image with Step Number */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-[#0d1f35] text-white font-extrabold text-xs flex items-center justify-center shadow-md border border-white/20">
                    {step.num}
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="font-extrabold text-[#0d1f35] text-base sm:text-[17px] leading-snug mb-1.5 group-hover:text-[#1E5AA8] transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Time Tag */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Clock size={12} className="text-amber-600 shrink-0" />
                  <span>Thời gian</span>
                </span>
                <span className="inline-block border border-dashed border-amber-400 bg-amber-50/80 text-amber-800 px-2.5 py-0.5 rounded-md text-xs font-bold font-mono">
                  {step.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CAM KẾT GHI TRONG HỢP ĐỒNG: VÌ SAO CHỦ NHÀ CHỌN HẢI PHÁT */}
      <div id="cam-ket" className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 pt-7 sm:pt-9 border-t border-white/10">
        <SectionHeader
          variant="dark"
          badge="Cam Kết Ghi Trong Hợp Đồng"
          title="Vì sao chủ nhà chọn Hải Phát"
          className="mb-5 sm:mb-7"
        />

        <div data-reveal-stagger="true" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
          {COMMITMENTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-4 sm:p-5 transition-all group shadow-lg shadow-black/15 hover:shadow-xl ${
                  item.dashed
                    ? 'border border-dashed border-amber-300 bg-amber-50 hover:border-amber-400'
                    : 'border border-white/90 bg-white hover:border-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1E5AA8] shrink-0 group-hover:scale-105 transition-transform">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-extrabold text-[#0d1f35] text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
