"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Calendar,
  User,
  ArrowRight,
  ChevronLeft,
  Search,
  Loader2,
  Tag,
  Clock,
  Phone,
  Mail,
  BookOpen,
  Share2,
} from 'lucide-react';
import { useArticlesData } from '../hooks/useArticlesData';
import PageHeader from '../components/shared/PageHeader';
import SectionHeader from '../components/shared/SectionHeader';

const CATEGORIES = ['Tất cả', 'Tin tức', 'Hướng dẫn', 'Dự án', 'Sản phẩm', 'Khuyến mãi', 'Khác'];

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function estimateReadTime(content: string) {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ===================== Articles List Component =====================
export function ArticlesList() {
  const { articles, loading } = useArticlesData();
  const [category, setCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = articles.filter((a) => {
    const matchCat = category === 'Tất cả' || a.category === category;
    const matchSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
          <p className="text-sm font-mono text-slate-500">Đang tải kiến thức & tin tức...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Unified PageHeader */}
      <PageHeader
        badge="Cẩm Nang Kỹ Thuật"
        title="Kiến Thức & Tin Tức Ngành Thang Máy"
        subtitle="Cập nhật những giải pháp thiết kế giếng thang, tiêu chuẩn an toàn cơ điện và hướng dẫn vận hành thang máy từ đội ngũ kỹ sư trưởng Thang Máy Hải Phát."
        breadcrumbs={[{ label: 'Bài viết' }]}
        telemetryTag="CẬP NHẬT ĐỊNH KỲ 2026"
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, tiêu chuẩn kỹ thuật..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#285c9a] focus:ring-2 focus:ring-[#285c9a]/15 shadow-sm transition-all"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${
                  category === cat
                    ? 'bg-[#285c9a] text-white shadow-md shadow-[#285c9a]/25'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center text-slate-500 border border-slate-200 shadow-sm max-w-lg mx-auto">
            <Tag className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-base font-bold text-slate-800">Không tìm thấy bài viết phù hợp</p>
            <p className="text-xs text-slate-500 mt-1">Vui lòng thử lại với từ khóa khác hoặc xóa bộ lọc danh mục.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Article Card */}
            {featured && (
              <Link
                href={`/bai-viet/${featured.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-[#285c9a]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="grid lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto overflow-hidden bg-slate-900">
                    {featured.cover_image ? (
                      <img
                        src={featured.cover_image}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#0d1f35] to-[#1e4a80]">
                        <BookOpen className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-[#285c9a] text-white font-mono text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      Bài Viết Tiêu Điểm
                    </span>
                  </div>

                  <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
                      <span className="bg-blue-50 text-[#285c9a] px-2.5 py-1 rounded-md font-bold">
                        {featured.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {formatDate(featured.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {estimateReadTime(featured.content)} phút đọc
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1f35] group-hover:text-[#285c9a] transition-colors leading-snug">
                      {featured.title}
                    </h2>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {featured.excerpt}
                    </p>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#285c9a] group-hover:gap-3 transition-all">
                        <span>Đọc toàn bộ bài viết</span>
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Remaining Articles Grid */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {rest.map((article) => (
                  <Link
                    key={article.id}
                    href={`/bai-viet/${article.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#285c9a]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden bg-slate-900">
                        {article.cover_image ? (
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#0d1f35] to-[#1e4a80]">
                            <BookOpen className="w-12 h-12 text-white/30" />
                          </div>
                        )}
                        <span className="absolute top-3 left-3 bg-[#0d1f35]/85 backdrop-blur-md text-white font-mono text-[10.5px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                          {article.category}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-2.5">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(article.published_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {estimateReadTime(article.content)}P
                          </span>
                        </div>

                        <h3 className="font-extrabold text-[#0d1f35] text-base sm:text-lg mb-2.5 line-clamp-2 group-hover:text-[#285c9a] transition-colors leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      {article.author ? (
                        <span className="flex items-center gap-1.5 text-slate-500 font-medium truncate max-w-[60%]">
                          <User size={13} className="text-[#285c9a]" />
                          <span className="truncate">{article.author}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">Hải Phát Elevator</span>
                      )}

                      <span className="inline-flex items-center gap-1 text-[#285c9a] font-bold group-hover:gap-2 transition-all">
                        <span>Đọc tiếp</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ===================== Article Detail Component =====================
export function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { loading, getBySlug, getRelated } = useArticlesData();
  const article = getBySlug(slug || '');
  const related = getRelated(slug || '', 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
          <p className="text-sm font-mono text-slate-500">Đang tải nội dung bài viết...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md">
          <h1 className="text-xl font-bold text-slate-900 mb-3">Không tìm thấy bài viết này</h1>
          <p className="text-sm text-slate-500 mb-5">Nội dung có thể đã được gỡ xuống hoặc chuyển sang đường dẫn khác.</p>
          <Link
            href="/bai-viet"
            className="inline-flex items-center gap-2 bg-[#285c9a] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1e4a80] transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Về danh mục bài viết</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Unified PageHeader */}
      <PageHeader
        badge={article.category}
        title={article.title}
        breadcrumbs={[
          { label: 'Bài viết', href: '/bai-viet' },
          { label: article.title },
        ]}
        telemetryTag={`${estimateReadTime(article.content)} PHÚT ĐỌC // XUẤT BẢN ${formatDate(article.published_at)}`}
      />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
          {/* Article Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 text-xs sm:text-sm text-slate-500 font-mono">
            <div className="flex items-center gap-4">
              {article.author && (
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <User size={15} className="text-[#285c9a]" />
                  <span>{article.author}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{formatDate(article.published_at)}</span>
              </span>
            </div>

            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
              <Clock size={13} className="text-[#285c9a]" />
              <span>Thời gian đọc: {estimateReadTime(article.content)} phút</span>
            </span>
          </div>

          {/* Lead Excerpt */}
          {article.excerpt && (
            <div className="bg-blue-50/70 rounded-2xl p-6 border-l-4 border-[#285c9a] text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
              {article.excerpt}
            </div>
          )}

          {/* Featured Cover Image */}
          {article.cover_image && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-900 shadow-sm">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article HTML Body */}
          <article
            className="prose prose-slate max-w-none prose-headings:text-[#0d1f35] prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-[#285c9a] prose-a:font-semibold hover:prose-a:underline prose-img:rounded-2xl prose-img:border prose-img:border-slate-200 prose-img:shadow-sm leading-relaxed text-slate-700 text-base"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              <Tag size={15} className="text-[#285c9a]" />
              <span className="text-xs font-mono uppercase text-slate-500 mr-2">Chủ đề:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Consultation CTA Banner inside Article */}
          <div className="bg-gradient-to-r from-[#0d1f35] to-[#1e4a80] rounded-2xl p-6 sm:p-8 text-white text-center space-y-3 relative overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-grid-blueprint opacity-10 pointer-events-none" />
            <div className="relative z-10 max-w-lg mx-auto">
              <h3 className="text-lg sm:text-xl font-bold">Cần Tư Vấn Kỹ Thuật Trực Tiếp?</h3>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed mt-1">
                Kỹ sư trưởng Hải Phát sẽ trực tiếp giải đáp mọi thắc mắc về kích thước hố thang, tải trọng và giá thành.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <a
                  href="tel:0898424666"
                  className="inline-flex items-center gap-2 bg-white text-[#0d1f35] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-50 transition-colors shadow"
                >
                  <Phone size={14} className="text-[#285c9a]" />
                  <span className="font-mono">Hotline: 0898 424 666</span>
                </a>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
                >
                  <Mail size={14} />
                  <span>Gửi Bản Vẽ Hiện Trạng</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d1f35]">Bài Viết Liên Quan</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Tiếp tục tìm hiểu các kiến thức hữu ích khác</p>
              </div>
              <Link
                href="/bai-viet"
                className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#285c9a] hover:text-[#1e4a80] transition-colors"
              >
                <span>Xem tất cả</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={`/bai-viet/${a.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#285c9a]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-slate-900">
                      {a.cover_image ? (
                        <img
                          src={a.cover_image}
                          alt={a.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#0d1f35] to-[#1e4a80]">
                          <BookOpen className="w-10 h-10 text-white/30" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-[#0d1f35]/85 backdrop-blur-md text-white font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/20">
                        {a.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-2">
                        <Calendar size={12} />
                        <span>{formatDate(a.published_at)}</span>
                      </div>

                      <h3 className="font-bold text-[#0d1f35] text-sm sm:text-base line-clamp-2 group-hover:text-[#285c9a] transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-slate-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                        {a.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#285c9a] font-bold">
                    <span>Đọc chi tiết</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
