"use client";

import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { ZaloIcon } from './icons/ZaloIcon';
import SectionHeader from './shared/SectionHeader';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    setStatus('submitting');

    try {
      const { default: api } = await import('../lib/api');
      
      await api.post('/public/contacts', {
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service || 'Chưa chọn',
        message: form.message || 'Không có',
      });

      setStatus('success');
      setForm({ name: '', phone: '', service: '', message: '' });
    } catch (error: any) {
      console.log('Submission note:', error.response?.data || error.message);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Khảo Sát Miễn Phí"
          title="Liên Hệ Nhận Tư Vấn & Khảo Sát Hiện Trường"
          subtitle="Đội ngũ kỹ sư trưởng Thang Máy Hải Phát sẵn sàng đến tận nơi tư vấn giải pháp hố PIT, kích thước giếng thang và lập bản vẽ 3D may đo cho ngôi nhà của bạn."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Contact Info & Office Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-6 shadow-sm">
              <h3 className="text-base font-extrabold text-[#0d1f35] uppercase tracking-wider font-mono border-b border-slate-200/80 pb-3">
                Kênh Hỗ Trợ Trực Tiếp
              </h3>

              {/* Direct channels */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#285c9a] shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Hotline 24/7 (Kỹ thuật & Cứu hộ)
                    </div>
                    <a href="tel:0326629971" className="text-base sm:text-lg font-extrabold text-[#0d1f35] font-mono hover:text-[#285c9a] block">
                      0326 629 971
                    </a>
                    <a href="tel:0987603588" className="text-xs sm:text-sm font-semibold text-slate-600 font-mono hover:text-[#285c9a] block mt-0.5">
                      Kinh doanh: 0987 603 588
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#285c9a] shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Hộp Thư Điện Tử
                    </div>
                    <a href="mailto:haiphatthangmay@gmail.com" className="text-sm font-medium text-slate-800 hover:text-[#285c9a] break-all">
                      haiphatthangmay@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#285c9a] shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Trụ Sở Văn Phòng
                    </div>
                    <div className="text-sm font-medium text-slate-800 leading-snug">
                      Tầng 11, Tòa Nhà Đa Năng, 169 Đ. Nguyễn Ngọc Vũ, Yên Hòa, Cầu Giấy, Hà Nội
                    </div>
                  </div>
                </div>
              </div>

              {/* Zalo Quick Contact Card */}
              <a
                href="https://zalo.me/0898424666"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 bg-blue-50/80 rounded-xl border border-blue-200/60 hover:bg-blue-100/70 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0068ff] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <ZaloIcon size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0068ff] uppercase tracking-wide">Chat Trực Tiếp Qua Zalo</div>
                  <div className="text-xs text-slate-600 font-mono font-semibold">Kỹ sư phản hồi trong 5 phút</div>
                </div>
              </a>
            </div>

            {/* Google Maps Embed Frame */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 h-48 bg-slate-100 shadow-sm">
              <iframe
                title="Bản đồ chỉ đường đến Thang Máy Hải Phát"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.51906091662!2d105.80515597584109!3d21.011907288356106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb9daa0bd23%3A0x3d8690104c1e73b6!2zQ8O0bmcgVHkgVGhhbmcgTcOheSBI4bqjaSBQaMOhdA!5e0!3m2!1svi!2s!4v1783673071879!5m2!1svi!2s"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Technical Consultation Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0d1f35]">
                    Đăng Ký Khảo Sát & Báo Giá Cơ Điện
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mọi thông tin được cam kết bảo mật theo tiêu chuẩn nội bộ của Hải Phát
                  </p>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] font-semibold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SLA ≤ 60 Phút</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Yêu cầu đã được gửi thành công!</div>
                      <div className="text-xs text-emerald-700 mt-0.5">
                        Kỹ sư Hải Phát sẽ liên hệ lại với bạn trong vòng 60 phút làm việc.
                      </div>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5">
                    <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Hệ thống đang bận.</div>
                      <div className="text-xs text-rose-700 mt-0.5">
                        Vui lòng gọi hotline trực tiếp <a href="tel:0898424666" className="underline font-bold font-mono">0898 424 666</a> để được hỗ trợ nhanh nhất.
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Họ Và Tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Số Điện Thoại <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0912 345 678"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Dòng Thang Máy / Loại Công Trình
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 transition-all"
                  >
                    <option value="">-- Chọn loại thang máy dự kiến lắp đặt --</option>
                    <option value="Thang máy gia đình">Thang máy gia đình (Biệt thự, nhà phố)</option>
                    <option value="Thang máy tải khách">Thang máy tải khách (Tòa nhà, khách sạn)</option>
                    <option value="Thang máy quan sát kính">Thang máy quan sát lồng kính ngoài trời</option>
                    <option value="Bảo trì sửa chữa">Dịch vụ bảo trì / Nâng cấp thang máy cũ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Mô Tả Hiện Trạng Công Trình & Ghi Chú
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Ví dụ: Nhà xây mới 5 tầng, vị trí giếng trời, hố PIT sâu khoảng 300mm, mong muốn tải trọng 450kg..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 resize-none focus:bg-white focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group w-full flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] disabled:bg-slate-400 text-white py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-md shadow-[#285c9a]/25 hover:shadow-xl hover:shadow-[#285c9a]/35 disabled:shadow-none active:scale-[0.98]"
                >
                  <span>{status === 'submitting' ? 'Đang Gửi Yêu Cầu...' : 'Gửi Yêu Cầu Khảo Sát & Nhận Báo Giá'}</span>
                  {status !== 'submitting' && (
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 font-mono">
                  <Clock size={13} className="text-[#285c9a]" />
                  <span>Kỹ sư túc trực 24/7 – Phản hồi trong 60 phút</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
