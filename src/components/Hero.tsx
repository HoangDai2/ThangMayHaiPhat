import { ArrowRight, ShieldCheck, Award, Wrench } from 'lucide-react';

const stats = [
  { icon: Award, value: '15+', label: 'Năm kinh nghiệm' },
  { icon: ShieldCheck, value: '500+', label: 'Công trình hoàn thành' },
  { icon: Wrench, value: '24/7', label: 'Hỗ trợ kỹ thuật' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
          alt="Thang máy gia đình sang trọng"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f35]/90 via-[#285c9a]/70 to-[#285c9a]/20" />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[55%] w-px bg-white/5" />
        <div className="absolute top-0 bottom-0 left-[70%] w-px bg-white/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 text-xs font-medium tracking-wide uppercase">
              Tiêu chuẩn châu Âu · Bảo hành 18 tháng
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Giải Pháp{' '}
            <span className="text-blue-300">Thang Máy</span>
            <br />
            Hiện Đại &amp; Uy Tín
          </h1>

          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
            Chuyên lắp đặt thang máy gia đình và thang máy tải khách cao cấp.
            Chúng tôi mang đến sự an toàn, sang trọng và đẳng cấp cho không gian sống của bạn.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#285c9a]/40 hover:shadow-[#285c9a]/60 hover:-translate-y-0.5"
            >
              Tư vấn miễn phí
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#projects"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Xem dự án
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-1.5">
                <Icon size={20} className="text-blue-300" />
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-white/60 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
        <span className="text-white/40 text-xs">Cuộn xuống</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
