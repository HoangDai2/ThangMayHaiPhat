"use client";
import React, { useState } from 'react';
import { 
  FileText, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  Users, 
  Facebook, 
  Phone, 
  MessageCircle, 
  Send,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage() {
  const [phoneInput, setPhoneInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setPhoneInput('');
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-[#0d1f35] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-[#285c9a]/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[80%] rounded-full bg-gradient-to-tr from-[#3a7bd5]/20 to-transparent blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10">
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/20">
            Giải Pháp Toàn Diện
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Dịch Vụ Chuyên Nghiệp <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Từ Thang Máy Hải Phát</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Đồng hành cùng bạn trong toàn bộ vòng đời thang máy, đảm bảo an toàn, nhanh chóng và chất lượng cao nhất.
          </p>
        </div>
      </div>

      {/* Service 1: Tư Vấn & Báo Giá */}
      <div className="w-full bg-white border-b border-gray-100 shadow-sm py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <span className="inline-block text-[#285c9a] text-sm font-semibold tracking-widest uppercase mb-3">
                Tư vấn & Báo giá
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Giải Pháp Tối Ưu, Hoàn Toàn Miễn Phí
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                Để nhận được báo giá chi tiết và bản vẽ thiết kế sơ bộ miễn phí, quý khách vui lòng liên hệ trực tiếp với chúng tôi. Đội ngũ kỹ sư giàu kinh nghiệm của Hải Phát sẵn sàng hỗ trợ bạn khảo sát tận nơi.
              </p>

              <div className="flex gap-4 items-center mb-10">
                <span className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-sm font-semibold text-[#285c9a]">
                  <Clock size={16} /> Hỗ trợ 24/7
                </span>
                <span className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-sm font-semibold text-green-600">
                  <ShieldCheck size={16} /> Miễn phí 100%
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://zalo.me/yourzalonumber" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white hover:bg-blue-50 border border-gray-100 hover:border-blue-100 transition-all shadow-sm hover:shadow-md group/link">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 group-hover/link:scale-110 transition-transform">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Chat qua Zalo</div>
                    <div className="text-sm text-gray-500">Phản hồi dưới 5 phút</div>
                  </div>
                </a>

                <a href="https://facebook.com/thangmayhaiphat" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white hover:bg-indigo-50 border border-gray-100 hover:border-indigo-100 transition-all shadow-sm hover:shadow-md group/link">
                  <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0 group-hover/link:scale-110 transition-transform">
                    <Facebook className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Nhắn tin Facebook</div>
                    <div className="text-sm text-gray-500">Trực tuyến 24/7</div>
                  </div>
                </a>
                
                <a href="tel:0912345678" 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-[#0d1f35] hover:bg-[#1a385e] border border-gray-800 transition-all shadow-lg hover:shadow-xl sm:col-span-2 group/link">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 group-hover/link:scale-110 transition-transform">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg">Hotline Tư Vấn Trực Tiếp</div>
                    <div className="text-emerald-400 font-bold">091.234.5678</div>
                  </div>
                </a>
              </div>
              
              <div className="mt-8">
                <Link href="/lien-he" className="inline-flex items-center gap-2 bg-[#285c9a] hover:bg-[#1a4375] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#285c9a]/30 transition-all hover:-translate-y-1">
                  Chuyển đến trang Liên Hệ
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex">
              <div className="relative rounded-3xl overflow-hidden w-full h-full min-h-[400px] shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" 
                  alt="Tư vấn lắp đặt thang máy" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white">
                  <div className="bg-green-500 p-2 rounded-full">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Đội ngũ kỹ sư tận tâm</div>
                    <div className="text-sm text-gray-200">Luôn mang đến bản vẽ hoàn hảo nhất</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Service 2: Bảo Hành Bảo Trì */}
      <div className="w-full bg-gray-50 border-b border-gray-100 shadow-sm py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-stretch">
            
            {/* Left Content (Text) */}
            <div className="w-full lg:w-1/2">
              <span className="inline-block text-[#d97706] text-sm font-semibold tracking-widest uppercase mb-3">
                Khách hàng cũ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Bảo Hành & Bảo Trì Định Kỳ
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                Dành riêng cho khách hàng cũ. Đảm bảo thang máy luôn vận hành êm ái, bền bỉ và an toàn tuyệt đối với dịch vụ chuyên nghiệp từ chính những kỹ thuật viên của Thang Máy Hải Phát.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                    <FileText className="text-[#d97706]" size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Ký hợp đồng 1 năm</h4>
                  <p className="text-xs text-gray-500">Cam kết dài hạn</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                    <Wrench className="text-[#d97706]" size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Bảo trì định kỳ</h4>
                  <p className="text-xs text-gray-500">2 tháng / 1 lần</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                    <Users className="text-[#d97706]" size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Nhân sự đào tạo</h4>
                  <p className="text-xs text-gray-500">Trực tiếp từ công ty</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full -z-0 opacity-50"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Đăng Ký Gia Hạn / Ký Mới</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Để lại số điện thoại, chuyên viên của chúng tôi sẽ gọi lại ngay lập tức.
                  </p>

                  <form onSubmit={handleSubmitPhone} className="relative flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="block w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-[#285c9a] focus:border-[#285c9a] text-gray-900 font-medium transition-colors"
                        placeholder="Số điện thoại của bạn..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-bold transition-all sm:w-auto
                        ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#285c9a] hover:bg-[#1a4375] shadow-lg shadow-[#285c9a]/30'}`}
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
                      {!isSubmitting && <Send size={18} />}
                    </button>
                  </form>

                  {submitSuccess && (
                    <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-center text-sm font-medium border border-green-200 animate-fade-in">
                      Cảm ơn bạn! Chúng tôi sẽ gọi lại cho bạn sớm nhất có thể.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="w-full lg:w-1/2 flex">
              <div className="relative rounded-3xl overflow-hidden w-full h-full min-h-[400px] shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80" 
                  alt="Bảo trì bảo dưỡng thang máy" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f59e0b]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white">
                  <div className="bg-[#f59e0b] p-2 rounded-full">
                    <ShieldCheck size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold">An Toàn Tuyệt Đối</div>
                    <div className="text-sm text-gray-100">Bảo vệ khoản đầu tư của bạn với dịch vụ tốt nhất</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
