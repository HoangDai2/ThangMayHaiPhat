"use client";
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { ZaloIcon } from './icons/ZaloIcon';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "e183c617-e789-41ad-97c7-35d2ddc8a7dc", // <-- ĐĂNG KÝ MIỄN PHÍ TẠI web3forms.com VÀ DÁN ACCESS KEY VÀO ĐÂY
          subject: "Yêu cầu tư vấn thang máy mới từ Website",
          from_name: form.name,
          Họ_tên: form.name,
          Số_điện_thoại: form.phone,
          Loại_thang_máy: form.service || 'Chưa chọn',
          Mô_tả: form.message || 'Không có',
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setForm({ name: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#285c9a] text-sm font-semibold tracking-widest uppercase mb-3">
            Liên hệ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Nhận Tư Vấn Miễn Phí
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn giải pháp thang máy phù hợp
            nhất cho công trình của bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              {
                icon: Phone,
                title: 'Hotline',
                lines: ['0898 424 666', 'Thứ 2 - Thứ 7: 7:30 - 17:30'],
              },
              {
                icon: Mail,
                title: 'Email',
                lines: ['haiphatthangmay@gmail.com'],
              },
              {
                icon: MapPin,
                title: 'Địa chỉ',
                lines: ['Tầng 11, Tòa Nhà Đa Năng, 169 Đ. Nguyễn Ngọc Vũ, Yên Hòa', 'Hà Nội, Việt Nam'],
              },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#285c9a]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#285c9a]" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{title}</div>
                  {lines.map((l) => (
                    <div key={l} className="text-gray-800 text-sm font-medium">{l}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* Zalo contact */}
            <a
              href="https://zalo.me/0898424666"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-[#0068ff]/5 rounded-xl border border-[#0068ff]/20 hover:bg-[#0068ff]/10 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0068ff] flex items-center justify-center flex-shrink-0">
                <ZaloIcon size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Chat Zalo</div>
                <div className="text-gray-800 text-sm font-medium">0898 424 666</div>
              </div>
            </a>

            {/* Map placeholder */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-gray-100 h-44 bg-gray-50 relative">
              <iframe
                title="Hải Phát Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.51906091662!2d105.80515597584109!3d21.011907288356106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb9daa0bd23%3A0x3d8690104c1e73b6!2zQ8O0bmcgVHkgVGhhbmcgTcOheSBI4bqjaSBQaMOhdA!5e0!3m2!1svi!2s!4v1783673071879!5m2!1svi!2s"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 rounded-2xl p-7 border border-gray-100"
            >
              {status === 'success' && (
                <div className="mb-5 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
                  Cảm ơn bạn! Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm nhất.
                </div>
              )}
              {status === 'error' && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua Hotline.
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Họ và tên <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#285c9a] focus:ring-1 focus:ring-[#285c9a]/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Số điện thoại <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#285c9a] focus:ring-1 focus:ring-[#285c9a]/20 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Loại thang máy quan tâm
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#285c9a] focus:ring-1 focus:ring-[#285c9a]/20 transition-colors"
                >
                  <option value="">-- Chọn loại thang máy --</option>
                  <option>Thang Homelift</option>
                  <option>Thang máy tải khách</option>
                  <option>Thang máy quan sát</option>
                  <option>Thang máy bệnh viện</option>
                  <option>Thang máy tải hàng</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Mô tả yêu cầu
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Nhà bạn mấy tầng? Vị trí lắp đặt? Yêu cầu đặc biệt?"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-[#285c9a] focus:ring-1 focus:ring-[#285c9a]/20 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group w-full flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#285c9a]/25 hover:shadow-[#285c9a]/40 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                {status !== 'submitting' && <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                Chúng tôi phản hồi trong vòng 30 phút trong giờ làm việc
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
