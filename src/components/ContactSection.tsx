import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', service: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                lines: ['0800 123 456', '(Miễn phí · 7:00–22:00)'],
              },
              {
                icon: Mail,
                title: 'Email',
                lines: ['info@haiphat.vn', 'sales@haiphat.vn'],
              },
              {
                icon: MapPin,
                title: 'Địa chỉ',
                lines: ['123 Đường Láng, Đống Đa', 'Hà Nội, Việt Nam'],
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

            {/* Map placeholder */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-gray-100 h-44 bg-gray-50 relative">
              <iframe
                title="VietLift Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4068454788!2d105.82970331532978!3d21.022736785995607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zxJDhu6FuZyBMw6FuZywgxJDhu5FuZyDEkGE!5e0!3m2!1svi!2svn!4v1620000000000!5m2!1svi!2svn"
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
              {sent && (
                <div className="mb-5 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
                  Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong vòng 30 phút.
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
                className="group w-full flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#285c9a]/25 hover:shadow-[#285c9a]/40"
              >
                Gửi yêu cầu tư vấn
                <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
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
