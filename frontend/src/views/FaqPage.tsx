"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Phone,
  ShieldCheck,
  Zap,
  Wrench,
  Clock,
  Sparkles,
  CheckCircle2,
  ThumbsUp,
  Share2,
  ArrowRight,
  Calculator,
  Building2,
  FileText,
  X,
  MessageSquare,
} from 'lucide-react';
import { useFaqsData, Faq } from '../hooks/useFaqsData';
import { useQuickQuote } from '../context/QuickQuoteContext';
import PageHeader from '../components/shared/PageHeader';

const QUICK_TAGS = [
  'Chi phí trọn gói',
  'Hố pít tối thiểu',
  'Cứu hộ ARD khi mất điện',
  'Điện 1 pha 220V',
  'Bảo dưỡng 2 tháng/lần',
];

export default function FaqPage() {
  const { faqs, loading } = useFaqsData();
  const { openQuoteModal } = useQuickQuote();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-4': true,
    'faq-8': true,
  });
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'yes' | 'no'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const list: string[] = [];
    faqs.forEach((f) => {
      if (f.category && !list.includes(f.category)) {
        list.push(f.category);
      }
    });
    return list;
  }, [faqs]);

  // Filtered FAQ list
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCat = activeCategory === 'all' || faq.category === activeCategory;
      const matchQuery =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    }).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }, [faqs, activeCategory, searchQuery]);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFeedback = (id: string, type: 'yes' | 'no') => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [id]: type,
    }));
  };

  const handleCopy = (faq: Faq) => {
    const textToCopy = `Hỏi: ${faq.question}\nĐáp: ${faq.answer}\n(Nguồn: Thang Máy Hải Phát - https://thangmayhaiphat.com)`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(faq.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': filteredFaqs.slice(0, 15).map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 antialiased selection:bg-[#285c9a] selection:text-white">
      {/* Inject SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section: Precision Technical Tone & Instant Search */}
      <section className="relative bg-[#0d1f35] text-white pt-28 pb-20 sm:pt-32 sm:pb-24 border-b border-slate-800 overflow-hidden">
        {/* Architectural grid background */}
        <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
        <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-blue-300 font-semibold">Câu hỏi thường gặp</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-mono font-bold tracking-wider uppercase mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>HỎI ĐÁP & TƯ VẤN KỸ THUẬT CHUYÊN SÂU</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Giải Đáp Thắc Mắc Về Thang Máy
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Mọi dữ liệu minh bạch trước khi đầu tư: chi phí trọn gói, kích thước hố pít homelift, hệ thống cứu hộ tự động ARD và quy trình bảo dưỡng định kỳ.
            </p>
          </div>

          {/* Search Box in Hero */}
          <div className="mt-8 max-w-2xl">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm câu hỏi theo từ khóa: chi phí, hố pít, mất điện, kích thước..."
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Xóa từ khóa tìm kiếm"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Keyword Pills */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Gợi ý tìm nhanh:</span>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Body with Category Tabs & Split Layout */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs ${activeCategory === 'all'
                  ? 'bg-[#285c9a] text-white shadow-blue-900/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              Tất cả câu hỏi ({faqs.length})
            </button>

            {categories.map((cat) => {
              const count = faqs.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-xs flex items-center gap-1.5 ${activeCategory === cat
                      ? 'bg-[#285c9a] text-white shadow-blue-900/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Two-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Technical Context, Trust Indicators & Direct Help (Col 1-4) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Technical Telemetry Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#285c9a] uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#285c9a]" />
                  <span>TIÊU CHUẨN AN TOÀN HẢI PHÁT</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block text-xs">Cứu hộ ARD tự động</strong>
                      <span className="text-slate-500 leading-snug">
                        Tự động đưa cabin về tầng gần nhất và mở cửa khi mất điện lưới.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block text-xs">SLA Cứu hộ 24/7</strong>
                      <span className="text-slate-500 leading-snug">
                        Cam kết có mặt 1 đến 2 tiếng trong Hà Nội và 2 đến 6 tiếng ngoài Hà Nội.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block text-xs">Bảo hành 18 tháng</strong>
                      <span className="text-slate-500 leading-snug">
                        18 tháng trọn gói cơ điện và 5 năm cho kết cấu khung cơ khí ray.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Wrench className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block text-xs">Bảo dưỡng 2 tháng/lần</strong>
                      <span className="text-slate-500 leading-snug">
                        Tuân thủ tiêu chuẩn QCVN 02:2019/BLĐTBXH với 24 hạng mục kiểm tra.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Engineering Contact Card */}
              <div className="bg-[#0d1f35] text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#285c9a]/30 rounded-full blur-2xl pointer-events-none" />

                <span className="text-[11px] font-mono text-blue-300 font-bold uppercase tracking-wider block mb-2">
                  TƯ VẤN TRỰC TIẾP TỪ KỸ SƯ
                </span>

                <h3 className="text-lg font-black text-white leading-tight">
                  Chưa tìm thấy câu hỏi cho công trình của bạn?
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Gửi kích thước hoặc liên hệ trực tiếp kỹ sư trưởng để nhận bản vẽ 3D và phương án bố trí hố thang trong 60 phút.
                </p>

                <div className="mt-5 space-y-2.5">
                  <a
                    href="tel:0898424666"
                    className="w-full flex items-center justify-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.98]"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Hotline: 0898.424.666</span>
                  </a>

                  <button
                    onClick={() => openQuoteModal()}
                    className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-[0.98]"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Dự toán & báo giá online</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: FAQ Accordion / Cards (Col 5-12) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Header filter status */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-1">
                <span>
                  HIỂN THỊ {filteredFaqs.length} CÂU HỎI {activeCategory !== 'all' ? `THUỘC "${activeCategory.toUpperCase()}"` : ''}
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#285c9a] hover:underline font-bold"
                  >
                    Xóa tìm kiếm
                  </button>
                )}
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                  <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-slate-800 font-bold text-base">Không tìm thấy câu hỏi phù hợp</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                    Không có câu hỏi nào khớp với từ khóa "{searchQuery}". Hãy thử tìm kiếm bằng từ khóa ngắn hơn hoặc liên hệ trực tiếp với chúng tôi.
                  </p>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Xem tất cả câu hỏi
                    </button>
                    <a
                      href="tel:0898424666"
                      className="px-4 py-2 bg-[#285c9a] text-white text-xs font-bold rounded-xl hover:bg-[#1e4a80] transition-colors"
                    >
                      Gọi kỹ sư tư vấn
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredFaqs.map((faq) => {
                    const isOpen = !!openIds[faq.id];
                    const feedback = helpfulFeedback[faq.id];
                    const isCopied = copiedId === faq.id;

                    return (
                      <div
                        key={faq.id}
                        id={faq.id}
                        className={`rounded-2xl border bg-white shadow-sm transition-all overflow-hidden ${isOpen ? 'border-[#285c9a]/50 ring-1 ring-[#285c9a]/15 shadow-md' : 'border-slate-200/90 hover:border-slate-300'
                          }`}
                      >
                        {/* Question Button Header */}
                        <button
                          type="button"
                          onClick={() => toggleOpen(faq.id)}
                          aria-expanded={isOpen}
                          className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#285c9a] px-2 py-0.5 rounded bg-blue-50 border border-blue-100">
                                {faq.category}
                              </span>
                            </div>

                            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#285c9a] transition-colors">
                              {faq.question}
                            </h3>
                          </div>

                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 ${isOpen
                                ? 'bg-[#285c9a] text-white border-[#285c9a] rotate-180'
                                : 'bg-slate-50 text-slate-500 border-slate-200 group-hover:bg-slate-100 group-hover:text-slate-800'
                              }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>

                        {/* Direct Answer Body */}
                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 animate-in fade-in duration-150">
                            <div className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-100/90">
                              {faq.answer}
                            </div>

                            {/* Micro-actions / Feedback */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                              <div className="flex items-center gap-2">
                                <span>Câu trả lời có hữu ích không?</span>
                                <button
                                  type="button"
                                  onClick={() => handleFeedback(faq.id, 'yes')}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${feedback === 'yes'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'hover:bg-slate-100 text-slate-600 border-slate-200'
                                    }`}
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>{feedback === 'yes' ? 'Đã cảm ơn' : 'Hữu ích'}</span>
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleCopy(faq)}
                                className="inline-flex items-center gap-1 text-slate-500 hover:text-[#285c9a] transition-colors font-medium"
                                title="Sao chép câu trả lời"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                                <span>{isCopied ? 'Đã sao chép!' : 'Chia sẻ câu trả lời'}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pre-Close CTA: Direct Hotline & Survey Request */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#0d1f35] to-[#1e4a80] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />

            <div className="relative z-10 max-w-xl text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-xs font-mono font-bold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                KHẢO SÁT & BÁO GIÁ MIỄN PHÍ TẬN NƠI
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Cần bản vẽ thiết kế hố thang cho ngôi nhà của bạn?
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                Đội ngũ kỹ sư Hải Phát khảo sát hiện trạng công trình và cung cấp bản vẽ bố trí 2D/3D chi tiết hoàn toàn miễn phí trong 24 giờ.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href="tel:0898424666"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0d1f35] px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all shadow-lg active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-[#285c9a]" />
                <span>Gọi 0898.424.666</span>
              </a>

              <Link
                href="/lien-he"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]"
              >
                <span>Gửi yêu cầu khảo sát</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
