import { useParams, Link } from 'react-router-dom';
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
} from 'lucide-react';
import { useArticlesData } from '../hooks/useArticlesData';

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

// ===================== Articles List =====================
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0d1f35] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#285c9a] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#285c9a] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block text-[#285c9a] bg-[#285c9a]/15 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            Tin tức & Bài viết
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Kiến thức & Tin tức Thang máy
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Cập nhật những tin tức mới nhất, hướng dẫn sử dụng và kiến thức về thang máy
            từ đội ngũ chuyên gia của Hải Phát.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#285c9a] focus:border-[#285c9a] outline-none shadow-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-[#285c9a] text-white shadow-md shadow-[#285c9a]/25'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#285c9a]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center text-gray-500 shadow-sm">
            <Tag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Không tìm thấy bài viết nào</p>
            <p className="text-sm mt-1">Thử thay đổi từ khóa hoặc danh mục tìm kiếm.</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <Link
                to={`/bai-viet/${featured.slug}`}
                className="group block mb-8 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto overflow-hidden bg-gray-100">
                    {featured.cover_image ? (
                      <img
                        src={featured.cover_image}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#0d1f35] to-[#1e4a80]">
                        <Tag className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-[#285c9a] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Nổi bật
                    </span>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="bg-blue-50 text-[#285c9a] px-2.5 py-1 rounded-full font-medium">
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
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#285c9a] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-[#285c9a] font-semibold text-sm group-hover:gap-3 transition-all">
                      Đọc bài viết
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid of remaining articles */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <Link
                  key={article.id}
                  to={`/bai-viet/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {article.cover_image ? (
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#0d1f35] to-[#1e4a80]">
                        <Tag className="w-12 h-12 text-white/30" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#285c9a] text-xs font-semibold px-2.5 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <Calendar size={12} />
                      {formatDate(article.published_at)}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-[#285c9a] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      {article.author ? (
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <User size={13} />
                          {article.author}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="flex items-center gap-1 text-xs text-[#285c9a] font-semibold group-hover:gap-2 transition-all">
                        Đọc tiếp
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ===================== Article Detail =====================
export function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { loading, getBySlug, getRelated, articles } = useArticlesData();
  const article = getBySlug(slug || '');
  const related = getRelated(slug || '', 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
          <Link to="/bai-viet" className="text-[#285c9a] font-semibold hover:underline">
            Quay lại danh sách bài viết
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative h-[45vh] min-h-[350px] overflow-hidden">
        {article.cover_image ? (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0d1f35] to-[#1e4a80]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35] via-[#0d1f35]/50 to-transparent" />

        <Link
          to="/bai-viet"
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft size={16} />
          Quay lại
        </Link>

        <div className="absolute bottom-0 left-0 right-0 pb-8 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-[#285c9a] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              {article.author && (
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {article.author}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(article.published_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {estimateReadTime(article.content)} phút đọc
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light border-l-4 border-[#285c9a] pl-4">
            {article.excerpt}
          </p>
        )}

        {/* Article body */}
        <article
          className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-[#285c9a] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md prose-headings:scroll-mt-20 [&_p]:leading-relaxed [&_li]:text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={16} className="text-gray-400" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 text-sm px-3 py-1.5 rounded-lg hover:bg-[#285c9a]/10 hover:text-[#285c9a] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share / CTA */}
        <div className="mt-10 bg-gradient-to-r from-[#285c9a] to-[#1e4a80] rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Cần tư vấn thêm?</h3>
          <p className="text-blue-100 text-sm mb-6 max-w-lg mx-auto">
            Liên hệ với đội ngũ chuyên gia của Hải Phát để được tư vấn miễn phí về giải pháp
            thang máy phù hợp cho công trình của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:0800123456"
              className="flex items-center justify-center gap-2 bg-white text-[#285c9a] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              <Phone size={16} />
              Hotline: 0800 123 456
            </a>
            <Link
              to="/lien-he"
              className="flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/25 transition-colors"
            >
              <Mail size={16} />
              Gửi yêu cầu tư vấn
            </Link>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Bài viết liên quan</h2>
              <Link
                to="/bai-viet"
                className="group flex items-center gap-1.5 text-[#285c9a] font-semibold text-sm hover:gap-2.5 transition-all duration-200"
              >
                Xem tất cả
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link
                  key={a.id}
                  to={`/bai-viet/${a.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    {a.cover_image ? (
                      <img
                        src={a.cover_image}
                        alt={a.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#0d1f35] to-[#1e4a80]">
                        <Tag className="w-10 h-10 text-white/30" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#285c9a] text-xs font-semibold px-2.5 py-1 rounded-full">
                      {a.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                      <Calendar size={12} />
                      {formatDate(a.published_at)}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-[#285c9a] transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{a.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
