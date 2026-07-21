"use client";
import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { ProjectCategory } from '../data/projects';
import { useProjectsData } from '../hooks/useProjectsData';

const categories: ProjectCategory[] = ['Gia đình', 'Tải khách', 'Thương mại'];

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory | 'Tất cả'>('Tất cả');
  const { projects } = useProjectsData();

  const filtered = active === 'Tất cả' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-[#285c9a] text-sm font-semibold tracking-widest uppercase mb-3">
              Dự án tiêu biểu
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Công Trình Đã Hoàn Thành
            </h2>
          </div>
          <Link href="/du-an"
            className="group inline-flex items-center gap-1.5 text-[#285c9a] font-semibold text-sm whitespace-nowrap hover:gap-2.5 transition-all duration-200"
          >
            Xem tất cả dự án
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['Tất cả', ...categories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-[#285c9a] text-white shadow-md shadow-[#285c9a]/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(0, 6).map((project) => (
            <Link key={project.id}
              href={`/du-an/${project.id}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-100"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-transparent to-transparent" />

              {/* Category badge */}
              <span className="absolute top-3 right-3 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs px-2.5 py-1 rounded-full">
                {project.category}
              </span>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm mb-1">{project.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <MapPin size={11} />
                    {project.location}
                  </div>
                  <span className="text-white/60 text-xs">{project.specs}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 bg-[#285c9a]/5 border border-[#285c9a]/10 rounded-2xl px-8 py-5">
            <div className="text-left">
              <div className="text-2xl font-bold text-[#285c9a]">500+</div>
              <div className="text-gray-500 text-xs">Công trình trên toàn quốc</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-left">
              <div className="text-2xl font-bold text-[#285c9a]">98%</div>
              <div className="text-gray-500 text-xs">Khách hàng hài lòng</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <Link href="/lien-he"
              className="ml-2 bg-[#285c9a] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1e4a80] transition-colors"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
