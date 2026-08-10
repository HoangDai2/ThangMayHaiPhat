"use client";
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function AboutSection() {
  return (
    <div id="about" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-28 w-28 rounded-2xl bg-[#e8f0fa]" />
          <div className="relative overflow-hidden rounded-[24px] bg-[#e8f0fa] p-3 shadow-sm">
            <img
              src="/image copy.png"
              alt="Đội ngũ Hải Phát đang triển khai giải pháp thang máy"
              className="h-[360px] w-full rounded-[18px] object-cover object-center sm:h-[430px]"
            />
            <div className="absolute bottom-7 left-7 rounded-2xl bg-white px-5 py-4 shadow-xl">
              <div className="text-3xl font-bold text-[#285c9a]">{companyInfo.yearsExperience}+</div>
              <div className="text-xs font-medium text-gray-500">Năm đồng hành cùng khách hàng</div>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-4 h-24 w-24 rounded-full border-[14px] border-[#285c9a]/10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#285c9a]">Về chúng tôi</span>
          <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-[#0d1f35] sm:text-4xl">
            Hải Phát – Nâng tầm không gian sống Việt
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-600">
            {companyInfo.description.split('\n\n')[0]}
          </p>
          <p className="mt-4 text-base leading-7 text-gray-600">
            {companyInfo.description.split('\n\n')[1]}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {['Tư vấn giải pháp phù hợp', 'Thi công đúng tiến độ', 'Linh kiện chính hãng', 'Bảo hành và hỗ trợ 24/7'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-[#173f70]">
                <CheckCircle2 size={18} className="shrink-0 text-[#285c9a]" />
                {item}
              </div>
            ))}
          </div>
          <Link href="/ve-chung-toi" className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#285c9a] px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1e4a80]">
            Tìm hiểu về Hải Phát
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
