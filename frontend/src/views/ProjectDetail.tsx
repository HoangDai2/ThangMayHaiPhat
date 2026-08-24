"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, Building2, Zap, Calendar, Shield, ChevronLeft, ArrowRight, Star, Phone, Clock, Layers, Ruler, Gauge, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useProjectsData } from '../hooks/useProjectsData';

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, getById, getRelated } = useProjectsData();
  const project = getById(id || '');
  const related = getRelated(id || '', 3);
  const [activeImage, setActiveImage] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#285c9a]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy dự án</h1>
          <Link href="/du-an" className="text-[#285c9a] font-semibold hover:underline">
            Quay lại danh sách dự án
          </Link>
        </div>
      </div>
    );
  }

  const detailItems = [
    { icon: Building2, label: 'Số tầng', value: `${project.details.floors} tầng` },
    { icon: Ruler, label: 'Tải trọng', value: project.details.capacity },
    { icon: Gauge, label: 'Tốc độ', value: project.details.speed },
    { icon: Zap, label: 'Thương hiệu', value: project.details.brand },
    { icon: Calendar, label: 'Hoàn thành', value: project.details.completionDate },
    { icon: Shield, label: 'Bảo hành', value: project.details.warranty },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35] via-[#0d1f35]/50 to-transparent" />

        {/* Back button */}
        <Link href="/du-an"
          className="absolute top-24 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft size={16} />
          Quay lại
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block bg-[#285c9a] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin size={14} />
              {project.location}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layers size={20} className="text-[#285c9a]" />
                Hình ảnh dự án
              </h2>
              <div className="relative rounded-2xl overflow-hidden mb-3">
                <img
                  src={project.gallery[activeImage]}
                  alt={`${project.title} - Hình ${activeImage + 1}`}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-[#285c9a] ring-2 ring-[#285c9a]/30' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-16 object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-[#285c9a]" />
                Mô tả dự án
              </h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-[#285c9a]" />
                Tính năng nổi bật
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <span className="w-2 h-2 rounded-full bg-[#285c9a] flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonial */}
            {project.testimonial && (
              <section className="bg-[#285c9a]/5 border border-[#285c9a]/10 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={project.testimonial.avatar}
                    alt={project.testimonial.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-white shadow"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed italic mb-3">
                      &quot;{project.testimonial.text}&quot;
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{project.testimonial.name}</div>
                      <div className="text-gray-500 text-xs">{project.testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            {/* Project Details Card */}
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Clock size={18} className="text-[#285c9a]" />
                Thông số kỹ thuật
              </h3>
              <div className="space-y-4">
                {detailItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#285c9a]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#285c9a]" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">{label}</div>
                      <div className="text-gray-900 font-medium text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <a
                  href="tel:0898424666"
                  className="flex items-center justify-center gap-2 bg-[#285c9a] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1e4a80] transition-colors w-full"
                >
                  <Phone size={16} />
                  Hotline: 0898 424 666
                </a>
                <Link href="/lien-he"
                  className="flex items-center justify-center gap-1.5 border border-[#285c9a] text-[#285c9a] py-3 rounded-xl font-semibold text-sm hover:bg-[#285c9a]/5 transition-colors w-full"
                >
                  Yêu cầu tư vấn
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Dự án liên quan</h2>
              <Link href="/du-an"
                className="group flex items-center gap-1.5 text-[#285c9a] font-semibold text-sm hover:gap-2.5 transition-all duration-200"
              >
                Xem tất cả
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.id}
                  href={`/du-an/${p.id}`}
                  className="group relative rounded-2xl overflow-hidden bg-gray-100"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm mb-1">{p.title}</h3>
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <MapPin size={11} />
                      {p.location}
                    </div>
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

// Projects List Page
function ProjectsList() {
  const [category, setCategory] = useState<string>('Tất cả');
  const { projects, loading } = useProjectsData();
  const categories = ['Tất cả', ...new Set(projects.map((p) => p.category))];

  const filtered = category === 'Tất cả' ? projects : projects.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0d1f35] pt-36 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">Dự án tiêu biểu</h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Khám phá các công trình thang máy đã hoàn thành on toàn quốc.
            Từ biệt thự gia đình đến tòa nhà thương mại cao cấp.
          </p>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                category === cat
                  ? 'bg-[#285c9a] text-white shadow-md shadow-[#285c9a]/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#285c9a]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link key={p.id}
              href={`/du-an/${p.id}`}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/70 via-transparent to-transparent" />
              <span className="absolute top-4 right-4 bg-[#285c9a] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {p.category}
              </span>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg mb-1.5 group-hover:text-blue-200 transition-colors">{p.title}</h3>
                <div className="flex items-center gap-1.5 text-white/70 text-sm mb-2">
                  <MapPin size={14} />
                  {p.location}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="bg-white/15 text-white/80 px-2.5 py-1 rounded-full">{p.specs}</span>
                </div>
              </div>

              {/* View detail button */}
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                Xem chi tiết
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="flex justify-between items-center w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 px-10 sm:px-24 py-8 shadow-sm">
            <div className="flex-1">
              <div className="text-4xl font-bold text-[#285c9a] mb-2">{projects.length}+</div>
              <div className="text-gray-500 text-sm font-medium">Dự án hoàn thành</div>
            </div>
            <div className="w-px h-16 bg-gray-200" />
            <div className="flex-1">
              <div className="text-4xl font-bold text-[#285c9a] mb-2">15+</div>
              <div className="text-gray-500 text-sm font-medium">Tỉnh thành</div>
            </div>
            <div className="w-px h-16 bg-gray-200" />
            <div className="flex-1">
              <div className="text-4xl font-bold text-[#285c9a] mb-2">98%</div>
              <div className="text-gray-500 text-sm font-medium">Hài lòng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectDetail, ProjectsList };
