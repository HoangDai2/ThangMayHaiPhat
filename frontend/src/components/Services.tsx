"use client";

import {
  ShieldCheck,
  Banknote,
  FileCheck2,
  Wrench,
} from 'lucide-react';

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
    desc: 'Kỹ thuật viên có mặt trong 30 phút tại nội thành Hà Nội.',
    dashed: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/60">
      {/* 1. QUY TRÌNH 4 BƯỚC: TỪ KHẢO SÁT ĐẾN BÀN GIAO (GIỮ NGUYÊN ẢNH THẬT) */}
      <div id="quy-trinh" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="text-xs sm:text-sm font-bold text-amber-600 uppercase tracking-wider font-mono">
            Quy trình 4 bước
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0d1f35] tracking-tight">
            Từ khảo sát đến bàn giao
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(15,42,74,0.04)] p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all group"
            >
              <div>
                {/* Image with Step Number */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#0d1f35] text-white font-extrabold text-sm flex items-center justify-center shadow-md border border-white/20">
                    {step.num}
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="font-extrabold text-[#0d1f35] text-lg mb-2 group-hover:text-[#1E5AA8] transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Time Tag */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="inline-block border border-dashed border-amber-400 bg-amber-50/70 text-amber-800 px-3 py-1 rounded-lg text-xs font-bold font-mono">
                  {step.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CAM KẾT GHI TRONG HỢP ĐỒNG: VÌ SAO CHỦ NHÀ CHỌN HẢI PHÁT */}
      <div id="cam-ket" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="text-xs sm:text-sm font-bold text-amber-600 uppercase tracking-wider font-mono">
            Cam kết ghi trong hợp đồng
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0d1f35] tracking-tight">
            Vì sao chủ nhà chọn Hải Phát
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {COMMITMENTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all group hover:shadow-md ${
                  item.dashed
                    ? 'border border-dashed border-amber-300 bg-amber-50/25 hover:bg-amber-50/40'
                    : 'border border-slate-200 bg-white hover:border-slate-300 shadow-[0_8px_30px_rgba(15,42,74,0.04)]'
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1E5AA8] mb-4 group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-extrabold text-[#0d1f35] text-base sm:text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </section>
  );
}
