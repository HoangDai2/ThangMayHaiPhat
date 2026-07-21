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
  Store,
  Truck,
  Wrench,
  CheckCircle,
  Facebook,
  Youtube,
  Headphones,
} from 'lucide-react';
import { companyInfo } from '../data/company';
import { useProductsData } from '../hooks/useProductsData';

const reasons = [
  { icon: Home, title: 'Tư vấn thang máy gia đình', desc: 'Lắp mới, thay thế, nâng cấp' },
  { icon: Building2, title: 'Dự án thương mại', desc: 'Tòa nhà, văn phòng, khách sạn' },
  { icon: Wrench, title: 'Bảo trì, sửa chữa', desc: 'Hậu mãi, thay thế linh kiện' },
  { icon: Headphones, title: 'Hỗ trợ kỹ thuật', desc: 'Sự cố khẩn cấp 24/7' },
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
    setLoading(true);
    setError(false);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "e183c617-e789-41ad-97c7-35d2ddc8a7dc",
          subject: "Yêu cầu tư vấn mới từ Trang Liên Hệ",
          from_name: formData.name,
          Họ_tên: formData.name,
          Số_điện_thoại: formData.phone,
          Email: formData.email || 'Không có',
          Sản_phẩm_quan_tâm: productOptions.find(p => p.id === formData.service)?.label || formData.service || 'Chưa chọn',
          Mô_tả: formData.message || 'Không có',
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <header className="bg-[#0d1f35] pt-36 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#285c9a] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#285c9a] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block text-[#285c9a] bg-[#285c9a]/15 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            Liên hệ
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Kết Nối Với Chúng Tôi
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Đội ngũ Hải Phát luôn sẵn sàng lắng nghe và hỗ trợ bạn. Liên hệ ngay để nhận tư vấn
            miễn phí về giải pháp thang máy phù hợp nhất.
          </p>
        </div>
      </header>

      {/* Why Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-[#285c9a]/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#285c9a]/10 flex items-center justify-center mb-3">
                <Icon size={18} className="text-[#285c9a]" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
              <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-[#285c9a] px-6 py-4">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <MessageSquare size={20} />
                  Gửi yêu cầu tư vấn
                </h2>
                <p className="text-blue-100 text-xs mt-1">
                  Điền thông tin, chúng tôi sẽ liên hệ trong vòng 2 giờ làm việc
                </p>
              </div>

              {submitted ? (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Gửi thành công!</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Cảm ơn bạn đã liên hệ. Đội ngũ Hải Phát sẽ phản hồi trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
                    }}
                    className="text-[#285c9a] font-semibold text-sm hover:underline"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
                      Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua Hotline.
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="0901 234 567"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      Sản phẩm quan tâm
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/10 transition-all bg-white"
                    >
                      <option value="">-- Chọn dịch vụ --</option>
                      {productOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      Tin nhắn <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Mô tả nhu cầu của bạn: số tầng, loại thang, vị trí công trình..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#285c9a] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1e4a80] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Gửi yêu cầu
                      </>
                    )}
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    Bằng việc gửi form, bạn đồng ý với{' '}
                    <a href="#" className="text-[#285c9a] hover:underline">
                      chính sách bảo mật
                    </a>{' '}
                    của Hải Phát.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            {/* Hotline Card */}
            <div className="bg-[#285c9a] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Hotline 24/7</h3>
              <a
                href={`tel:${companyInfo.headquarters.hotline.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-2xl font-bold hover:text-blue-200 transition-colors"
              >
                <Phone size={24} />
                {companyInfo.headquarters.hotline}
              </a>
              <p className="text-blue-100 text-sm mt-2">
                Phản hồi trong 2 giờ
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-5">Thông tin liên hệ</h3>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#285c9a]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#285c9a]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Trụ sở chính</div>
                    <div className="text-gray-500 text-xs mt-0.5">{companyInfo.headquarters.address}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#285c9a]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#285c9a]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Điện thoại</div>
                    <a href={`tel:${companyInfo.headquarters.phone.replace(/\s/g, '')}`} className="text-gray-500 text-xs hover:text-[#285c9a] block">
                      {companyInfo.headquarters.phone}
                    </a>
                    <a href="tel:0800123456" className="text-gray-500 text-xs hover:text-[#285c9a] block">
                      0987.603.588 (Hotline)
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#285c9a]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#285c9a]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Email</div>
                    <a href={`mailto:${companyInfo.headquarters.email}`} className="text-gray-500 text-xs hover:text-[#285c9a] block">
                      {companyInfo.headquarters.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#285c9a]/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[#285c9a]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Giờ làm việc</div>
                    <div className="text-gray-500 text-xs mt-0.5">{companyInfo.headquarters.workingHours}</div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="text-gray-700 text-sm font-medium mb-3">Kết nối mạng xã hội</div>
                <div className="flex gap-2">
                  <a
                    href="https://www.facebook.com/thangmayhaiphat"
                    className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-[#285c9a] hover:text-white text-gray-500 transition-colors"
                  >
                    <Facebook size={18} />
                  </a> 
                  <a
                    href="https://zalo.me/0898.424.666"
                    className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-[#285c9a] hover:text-white text-gray-500 transition-colors"
                  >
                    <MessageSquare size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.51918546902!2d105.8077309!3d21.0119023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb9daa0bd23%3A0x3d8690104c1e73b6!2zQ8O0bmcgVHkgVGhhbmcgTcOheSBI4bqjaSBQaMOhdA!5e0!3m2!1svi!2s!4v1783580826957!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hải Phát Office"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Câu hỏi thường gặp</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Thời gian phản hồi yêu cầu tư vấn?',
                a: 'Chúng tôi sẽ phản hồi trong vòng 2 giờ làm việc. Với yêu cầu khẩn cấp, vui lòng gọi hotline 0987 603 588 để được hỗ trợ ngay.',
              },
              {
                q: 'Có tính phí khảo sát không?',
                a: 'Hoàn toàn miễn phí. Đội ngũ kỹ thuật sẽ đến khảo sát và tư vấn giải pháp phù hợp mà không thu bất kỳ chi phí nào.',
              },
              {
                q: 'Thời gian lắp đặt một thang máy gia đình?',
                a: '45 - 60 ngày làm việc tùy theo điều kiện hiện trạng và thời gian chuẩn bị giếng thang.',
              },
              {
                q: 'Có dịch vụ tại tỉnh thành nào?',
                a: 'Hải Phát phục vụ khách hàng trên toàn quốc.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group border border-gray-100 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
