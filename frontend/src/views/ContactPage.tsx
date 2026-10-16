"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  Home,
  Wrench,
  CheckCircle,
  Headphones,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { companyInfo } from '../data/company';
import { useProductsData } from '../hooks/useProductsData';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { ZaloIcon } from '../components/icons/ZaloIcon';
import PageHeader from '../components/shared/PageHeader';
import SectionHeader from '../components/shared/SectionHeader';

const reasons = [
  { icon: Home, title: 'Thang Máy Gia Đình & Biệt Thự', desc: 'Lắp mới may đo, cải tạo nhà cũ, hố PIT siêu nông' },
  { icon: Building2, title: 'Tòa Nhà & Khách Sạn', desc: 'Thang tải khách cao tầng, tối ưu tốc độ & lưu lượng' },
  { icon: Wrench, title: 'Bảo Trì & Nâng Cấp', desc: 'Hợp đồng 1 năm, định kỳ 2 tháng/lần, phụ tùng chính hãng' },
  { icon: Headphones, title: 'Cứu Hộ Khẩn Cấp 24/7', desc: 'Đội kỹ thuật thường trực, cam kết có mặt ≤ 30 phút' },
];

export default function ContactPage() {
  const { products } = useProductsData();
  const productOptions = products.map((p) => ({
    id: p.id,
    label: p.title,
  }));

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setLoading(true);
    setError(false);

    try {
      const { default: api } = await import('../lib/api');

      await api.post('/public/contacts', {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        service:
          productOptions.find((p) => p.id === formData.service)?.label ||
          formData.service ||
          'Chưa chọn',
        message: formData.message.trim() || 'Không có',
      });

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    } catch (err: any) {
      console.log('Submission note:', err.response?.data || err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Unified PageHeader */}
      <PageHeader
        badge="Trung Tâm Tiếp Nhận"
        title="Liên Hệ Nhận Tư Vấn & Khảo Sát Hiện Trường"
        subtitle="Đội ngũ kỹ sư trưởng Thang Máy Hải Phát luôn sẵn sàng đồng hành, đo đạc mặt bằng thực tế và lập phương án thiết kế 3D tối ưu cho ngôi nhà của bạn."
        breadcrumbs={[{ label: 'Liên hệ' }]}
        telemetryTag="HOTLINE 24/7 // TIẾP NHẬN TOÀN QUỐC"
      />

      {/* 4 Pillars of Assistance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#285c9a]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3 text-[#285c9a]">
                <Icon size={18} />
              </div>
              <h4 className="font-bold text-slate-900 text-sm leading-snug">{title}</h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form & Office Hub Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Consultation Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="bg-[#0d1f35] text-white p-6 sm:p-7 border-b border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                      <MessageSquare size={20} className="text-[#4a7bbf]" />
                      <span>Đăng Ký Khảo Sát & Nhận Dự Toán</span>
                    </h2>
                    <p className="text-xs text-slate-300 mt-1">
                      Kỹ sư kết cấu sẽ phản hồi và gửi bản vẽ phối cảnh sơ bộ trong 24 giờ.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SLA ≤ 30P
                  </span>
                </div>
              </div>

              {submitted ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Gửi Yêu Cầu Thành Công!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Cảm ơn bạn đã tin tưởng Thang Máy Hải Phát. Đội ngũ chuyên gia kỹ thuật sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#285c9a] text-white rounded-xl text-sm font-semibold hover:bg-[#1e4a80] transition-colors"
                  >
                    <span>Gửi yêu cầu khác</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
                  {error && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
                      <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                      <div>
                        Đã xảy ra lỗi khi gửi form. Vui lòng gọi trực tiếp hotline{' '}
                        <a href="tel:0898424666" className="font-bold underline font-mono">
                          0898 424 666
                        </a>{' '}
                        để được hỗ trợ ngay.
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Họ và tên <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Số điện thoại <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="0912 345 678"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-mono text-sm focus:bg-white focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Địa chỉ Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Sản phẩm / Dịch vụ quan tâm
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 transition-all"
                      >
                        <option value="">-- Chọn nhu cầu của bạn --</option>
                        {productOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                        <option value="Bảo trì định kỳ">Bảo trì & Sửa chữa định kỳ</option>
                        <option value="Cải tạo thang cũ">Nâng cấp / Cải tạo thang máy cũ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mô tả hiện trạng công trình & Yêu cầu <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Số tầng, diện tích giếng thang dự kiến, địa chỉ công trình hoặc yêu cầu đặc biệt..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-md shadow-[#285c9a]/25 hover:shadow-xl hover:shadow-[#285c9a]/35 disabled:opacity-60 active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Đang xử lý dữ liệu...</span>
                      </>
                    ) : (
                      <>
                        <span>Gửi Yêu Cầu Tư Vấn & Nhận Bản Vẽ 3D</span>
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-slate-400 text-xs text-center pt-1 font-mono">
                    Cam kết bảo mật dữ liệu khách hàng theo tiêu chuẩn ISO 9001:2015
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: Direct Contact Details & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 24/7 Hotline Card */}
            <div className="bg-gradient-to-r from-[#0d1f35] to-[#1e4a80] rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <span className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Đường Dây Nóng Kỹ Thuật 24/7
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Cứu Hộ & Tiếp Nhận Sự Cố
                </h3>

                <a
                  href={`tel:${companyInfo.headquarters.hotline.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold font-mono text-white hover:text-blue-300 transition-colors"
                >
                  <Phone size={24} className="text-emerald-400" />
                  <span>{companyInfo.headquarters.hotline}</span>
                </a>

                <p className="text-xs text-blue-100/90 leading-relaxed pt-1">
                  Đội cứu hộ cơ động sẵn sàng có mặt trong vòng ≤ 30 phút tại khu vực nội thành.
                </p>
              </div>
            </div>

            {/* Detailed Headquarter Info Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm space-y-5">
              <h3 className="font-extrabold text-[#0d1f35] text-sm uppercase tracking-wider border-b border-slate-100 pb-3">
                Trụ Sở & Văn Phòng Giao Dịch
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-[#285c9a] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0d1f35]">Trụ sở chính:</div>
                    <div className="text-slate-600 leading-snug mt-0.5">{companyInfo.headquarters.address}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone size={18} className="text-[#285c9a] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0d1f35]">Điện thoại bàn & Hotline:</div>
                    <div className="font-mono font-semibold text-slate-800 mt-0.5">
                      0898.424.666 · 0987.603.588
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail size={18} className="text-[#285c9a] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0d1f35]">Email liên hệ:</div>
                    <div className="text-slate-600 mt-0.5">{companyInfo.headquarters.email}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock size={18} className="text-[#285c9a] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0d1f35]">Giờ làm việc:</div>
                    <div className="text-slate-600 mt-0.5">{companyInfo.headquarters.workingHours}</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Mạng xã hội:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://facebook.com/thangmayhaiphat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#1877F2] text-slate-600 hover:text-white flex items-center justify-center transition-all"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={18} />
                  </a>
                  <a
                    href="https://zalo.me/0898424666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#0068ff] text-slate-600 hover:text-white flex items-center justify-center transition-all"
                    aria-label="Zalo"
                  >
                    <ZaloIcon size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/80 h-56 bg-slate-100 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.51918546902!2d105.8077309!3d21.0119023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb9daa0bd23%3A0x3d8690104c1e73b6!2zQ8O0bmcgVHkgVGhhbmcgTcOheSBI4bqjaSBQaMOhdA!5e0!3m2!1svi!2s!4v1783580826957!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Bản đồ chỉ đường đến Thang Máy Hải Phát"
              />
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mt-20 max-w-4xl mx-auto">
          <SectionHeader
            badge="Hỏi Đáp Kỹ Thuật"
            title="Câu Hỏi Thường Gặp Khi Lắp Đặt Thang Máy"
            subtitle="Tổng hợp những thắc mắc phổ biến nhất của gia chủ trước khi bắt đầu triển khai hố thang."
          />

          <div className="space-y-3.5">
            {[
              {
                q: 'Khảo sát hiện trường và đo đạc có mất phí không?',
                a: 'Thang Máy Hải Phát khảo sát, đo đạc mặt bằng hiện trạng và lên bản vẽ 3D sơ bộ hoàn toàn miễn phí 100% trên toàn quốc.',
              },
              {
                q: 'Thời gian thi công và bàn giao thang máy mất bao lâu?',
                a: 'Thời gian sản xuất và lắp đặt tiêu chuẩn kéo dài từ 30 đến 45 ngày làm việc tùy thuộc vào xuất xứ linh kiện và tiến độ chuẩn bị hố thang của gia chủ.',
              },
              {
                q: 'Nhà có hố PIT nông dưới 300mm có lắp được không?',
                a: 'Hoàn toàn được. Dòng thang máy gia đình công nghệ Fuji Nhật Bản của Hải Phát được thiết kế chuyên biệt cho hố PIT siêu nông từ 200mm, không cần đào sâu cắt móng.',
              },
              {
                q: 'Quy trình bảo trì sau khi hết hạn bảo hành như thế nào?',
                a: 'Khách hàng có thể ký hợp đồng bảo dưỡng định kỳ 1 năm với tần suất 2 tháng/lần. Mọi linh kiện thay thế đều được bảo lưu giá ưu đãi và có bảo hiểm trách nhiệm công cộng.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm transition-colors"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors select-none font-bold text-slate-800 text-sm sm:text-base pr-4">
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-slate-400 group-open:rotate-180 group-open:text-[#285c9a] transition-transform shrink-0 ml-2"
                  />
                </summary>
                <div className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
