"use client";

import React, { useState } from "react";
import { 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  ArrowUpRight, 
  Clock, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Loader2,
  FileCheck2
} from "lucide-react";
import { ZaloIcon } from "../icons/ZaloIcon";
import { FacebookIcon } from "../icons/FacebookIcon";

const BUILDING_TYPES = [
  "Thang máy gia đình / Nhà phố",
  "Biệt thự cao cấp / Villa",
  "Tòa nhà văn phòng / Khách sạn",
  "Nhà xưởng / Thang tải hàng",
  "Cải tạo nhà cũ / Hố thang hẹp",
  "Khác / Tư vấn theo yêu cầu",
];

export function ContactHub() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    buildingType: BUILDING_TYPES[0],
    address: "",
    note: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [ticketId, setTicketId] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setStatus("loading");

    try {
      const { default: api } = await import("../../lib/api");

      const compiledMessage = `[YÊU CẦU BÁO GIÁ DỊCH VỤ THANG MÁY]
- Loại công trình: ${formData.buildingType}
- Địa chỉ khảo sát: ${formData.address || "Chưa cung cấp"}
- Ghi chú kỹ thuật: ${formData.note || "Không có"}
- Nguồn tiếp nhận: Trang Dịch Vụ (Web Hub)`;

      await api.post("/public/contacts", {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        service: `Tư vấn khảo sát: ${formData.buildingType}`,
        message: compiledMessage,
      });

      // Generate a clean reference ticket for user confidence
      const generatedTicket = `HP-${new Date().getFullYear()}${String(Date.now()).slice(-4)}`;
      setTicketId(generatedTicket);
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        buildingType: BUILDING_TYPES[0],
        address: "",
        note: "",
      });
    } catch (err: any) {
      console.warn("Contact form submission note:", err?.message || err);
      // Still provide graceful fallback
      setStatus("error");
    }
  };

  return (
    <section id="tu-van-bao-gia" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-[#285c9a] font-mono text-xs uppercase tracking-widest font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#285c9a]" />
            Phân Hệ Dịch Vụ 01
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Tư Vấn Kỹ Thuật & Khảo Sát Hiện Trường Miễn Phí
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Đội ngũ kỹ sư kết cấu và cơ điện tiếp nhận dữ liệu hố thang, giải đáp trực tiếp 1:1 và lập dự toán tối ưu trong 24 giờ.
          </p>
        </div>

        {/* 2-Column Split: Contact Channels (Left) & Survey Form (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (5 Cols): Direct Multi-Channel Contact Hub */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
              [ DIRECT CONTACT HUB // KÊNH KẾT NỐI TRỰC TIẾP ]
            </div>

            {/* Channel 1: Hotline Kỹ Sư Trực Tiếp (Primary Dark Card) */}
            <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-md transition-all duration-300 hover:shadow-xl hover:border-slate-700">
              <div className="bg-[#0b1728] rounded-[calc(1rem-2px)] p-5 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Đường Dây Nóng Kỹ Thuật</div>
                      <div className="text-lg font-bold text-white tracking-tight">0898 424 666</div>
                    </div>
                  </div>
                  {/* Pulsing online badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    24/7 LIVE
                  </span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Kết nối trực tiếp chuyên viên cứu hộ và kỹ sư trưởng để nhận phương án xử lý sự cố hoặc tư vấn kết cấu thang.
                </p>

                <a
                  href="tel:0898424666"
                  className="group w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#285c9a] hover:bg-[#1e4a80] text-white text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Bấm Gọi Kỹ Sư Ngay</span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <Phone size={13} />
                  </span>
                </a>
              </div>
            </div>

            {/* Channel 2: Zalo Official Account (White Industrial Card) */}
            <div className="p-1 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200">
              <div className="rounded-[calc(1rem-2px)] p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#0068FF]/10 text-[#0068FF] flex items-center justify-center p-1.5">
                      <ZaloIcon size={32} />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Zalo Official Account</div>
                      <div className="text-base font-bold text-slate-900">Gửi Mặt Cắt Hố Thang</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    PHẢN HỒI &lt; 5P
                  </span>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Gửi trực tiếp bản vẽ CAD, hình ảnh mặt bằng hoặc ảnh hiện trạng hố PIT để kỹ sư kiểm tra kích thước lọt lòng.
                </p>

                <a
                  href="https://zalo.me/0898424666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 hover:bg-[#0068FF] text-white text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Mở Zalo Chat 1:1 Với Kỹ Sư</span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight size={14} />
                  </span>
                </a>
              </div>
            </div>

            {/* Channel 3: Fanpage Facebook Chính Thức */}
            <div className="p-1 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
              <div className="rounded-[calc(1rem-2px)] p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center">
                      <FacebookIcon size={22} className="text-[#1877F2]" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Fanpage Chính Thức</div>
                      <div className="text-base font-bold text-slate-900">Thang Máy Hải Phát</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    VIDEO TEST TẢI
                  </span>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Theo dõi nhật ký nghiệm thu thực tế, video vận hành êm ái tại các công trình biệt thự, nhà phố trên toàn quốc.
                </p>

                <a
                  href="https://facebook.com/thangmayhaiphat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 hover:bg-[#1877F2] text-slate-800 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Truy Cập Fanpage Hải Phát</span>
                  <span className="w-7 h-7 rounded-full bg-slate-200 group-hover:bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight size={14} />
                  </span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (7 Cols): Form Khảo Sát & Báo Giá Nhanh */}
          <div className="lg:col-span-7">
            <div className="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-lg">
              <div className="bg-white rounded-xl p-6 sm:p-8">
                
                {/* Form Heading */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Đăng Ký Khảo Sát & Nhận Báo Giá</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Cam kết bảo mật thông tin, phản hồi trong vòng 24 giờ</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-[#285c9a] bg-blue-50 px-2.5 py-1 rounded">
                    <FileSpreadsheet size={14} />
                    <span>SPEC-SHEET</span>
                  </div>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Họ và tên của bạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="VD: Nguyễn Văn Hoàng"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#285c9a] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Số điện thoại liên hệ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="VD: 0987 654 321"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#285c9a] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Building Type */}
                  <div>
                    <label htmlFor="buildingType" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Loại hình công trình cần tư vấn
                    </label>
                    <div className="relative">
                      <select
                        id="buildingType"
                        name="buildingType"
                        value={formData.buildingType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#285c9a] focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        {BUILDING_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <Building2 size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Address */}
                  <div>
                    <label htmlFor="address" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Địa chỉ công trình / Tỉnh thành khảo sát
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="VD: KĐT Vinhomes Ocean Park, Gia Lâm, Hà Nội"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#285c9a] focus:border-transparent transition-all"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <MapPin size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Technical Notes */}
                  <div>
                    <label htmlFor="note" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Ghi chú sơ bộ (Số tầng, tải trọng, kích thước hố thang nếu có)
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      rows={3}
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="VD: Nhà 5 tầng, diện tích hố 1500x1500mm, mong muốn thang kính quan sát hoặc thang inox 304..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#285c9a] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={`group w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-bold text-white text-sm transition-all duration-300 shadow-md ${
                        status === "loading"
                          ? "bg-slate-400 cursor-not-allowed"
                          : "bg-[#285c9a] hover:bg-[#1e4a80] shadow-[#285c9a]/30 active:scale-[0.99]"
                      }`}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Đang gửi thông tin kỹ thuật...</span>
                        </>
                      ) : (
                        <>
                          <span>Gửi Đăng Ký Khảo Sát & Báo Giá</span>
                          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                            <Send size={13} />
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Feedback: Success */}
                  {status === "success" && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
                      <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-emerald-900">
                          Đã tiếp nhận yêu cầu thành công! [Mã phiếu: {ticketId}]
                        </div>
                        <div className="text-emerald-700 mt-0.5">
                          Kỹ sư trưởng của Hải Phát sẽ liên hệ lại qua số điện thoại của bạn trong vòng 30 phút để xác nhận lịch khảo sát hiện trường.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Feedback: Error */}
                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-3">
                      <AlertCircle size={20} className="text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-rose-900">Hệ thống tạm thời bận</div>
                        <div className="text-rose-700 mt-0.5">
                          Vui lòng gọi trực tiếp hotline <a href="tel:0898424666" className="underline font-bold">0898 424 666</a> để được hỗ trợ tức thì.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Trust Footer */}
                  <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      Khảo sát đo đạc 3D miễn phí 100%
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-slate-400" />
                      Minh bạch không phát sinh chi phí
                    </span>
                  </div>

                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
