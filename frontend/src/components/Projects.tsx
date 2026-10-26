"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Building2, Ruler } from 'lucide-react';
import { ProjectCategory } from '../data/projects';
import { useProjectsData } from '../hooks/useProjectsData';
import SectionHeader from './shared/SectionHeader';
import { useQuickQuote } from '../context/QuickQuoteContext';

const categories: ProjectCategory[] = ['Gia đình', 'Tải khách', 'Thương mại'];

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory | 'Tất cả'>('Tất cả');
  const { projects } = useProjectsData();
  const { openQuoteModal } = useQuickQuote();

  const filtered = active === 'Tất cả' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badge="Hồ Sơ Năng Lực"
          title="Dự Án & Công Trình Đã Hoàn Thành"
          subtitle="Hơn 1.000+ công trình thang máy biệt thự, lâu đài và tòa nhà văn phòng được Thang Máy Hải Phát triển khai bàn giao trên khắp các tỉnh thành toàn quốc."
          action={
            <Link
              href="/du-an"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#285c9a] hover:text-[#1e4a80] transition-colors"
            >
              <span>Xem tất cả dự án</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {(['Tất cả', ...categories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${
                active === cat
                  ? 'bg-[#285c9a] text-white shadow-md shadow-[#285c9a]/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 6).map((project) => (
            <Link
              key={project.id}
              href={`/du-an/${project.id}`}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#285c9a]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-end min-h-[340px]"
            >
              {/* Cover Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/95 via-[#0d1f35]/50 to-transparent" />

              {/* Category Pill Badge */}
              <span className="absolute top-4 right-4 bg-[#0d1f35]/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {project.category}
              </span>

              {/* Project Metadata */}
              <div className="relative z-10 p-5 sm:p-6 space-y-2">
                <h3 className="text-white font-bold text-lg sm:text-xl leading-snug group-hover:text-blue-200 transition-colors drop-shadow-sm">
                  {project.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5 truncate max-w-[65%]">
                    <MapPin size={13} className="text-[#4a7bbf] shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <span className="font-mono bg-white/10 border border-white/15 px-2.5 py-1 rounded-md text-white font-medium shrink-0">
                    {project.specs}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Proof Strip */}
        <div className="mt-14">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 text-center sm:text-left w-full md:w-auto">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#285c9a] font-mono">1.000+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Công trình toàn quốc</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-200 self-center" />
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#285c9a] font-mono">15+ Tỉnh</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Địa bàn phục vụ</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-200 self-center" />
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">98%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Tỷ lệ hài lòng tuyệt đối</div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="group inline-flex items-center gap-2 bg-[#285c9a] hover:bg-[#1e4a80] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-md shadow-[#285c9a]/20 active:scale-[0.98] cursor-pointer"
              >
                <span>Nhận Tư Vấn Dự Án Của Bạn</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
