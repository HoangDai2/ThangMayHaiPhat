"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePermissions } from '../../hooks/usePermissions';
import { LayoutDashboard, FolderKanban, Box, Briefcase, Loader2, Layout, FileText, Star, ImageIcon, ArrowRight } from 'lucide-react';
import { supabase, DbProject } from '../../lib/supabase';

export default function AdminDashboard() {
  const { hasPermission } = usePermissions();
  const [counts, setCounts] = useState({ projects: 0, products: 0, services: 0, articles: 0, reviews: 0 });
  const [recentProjects, setRecentProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [proj, prod, svc, art, rev, recent] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(4),
      ]);
      setCounts({
        projects: proj.count ?? 0,
        products: prod.count ?? 0,
        services: svc.count ?? 0,
        articles: art.count ?? 0,
        reviews: rev.count ?? 0,
      });
      if (!recent.error && recent.data) setRecentProjects(recent.data);
      setLoading(false);
    })();
  }, []);

  const statCards = [
    { title: 'Dự án thang máy', count: counts.projects, icon: FolderKanban, href: '/admin/projects', permission: 'manage_projects' },
    { title: 'Sản phẩm & Linh kiện', count: counts.products, icon: Box, href: '/admin/products', permission: 'manage_products' },
    { title: 'Bài viết tin tức', count: counts.articles, icon: FileText, href: '/admin/articles', permission: 'manage_articles' },
    { title: 'Đánh giá khách hàng', count: counts.reviews, icon: Star, href: '/admin/reviews', permission: 'manage_reviews' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d1f35] to-[#1e4a80] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none transform translate-x-20 -translate-y-20" />
        <div className="relative z-10">
          <span className="px-3 py-1 bg-white/10 text-blue-200 text-xs font-semibold rounded-full uppercase tracking-wider backdrop-blur-sm border border-white/10">
            Hải Phát Elevator Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-3">Tổng Quan Hệ Thống</h1>
          <p className="text-blue-100/80 text-sm mt-1 max-w-xl">
            Chào mừng bạn đến với trang quản trị Thang Máy Hải Phát. Quản lý toàn bộ thông tin dự án, sản phẩm và nội dung website.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Thống Kê Dữ Liệu</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.filter(stat => hasPermission(stat.permission)).map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title}
                href={stat.href}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#285c9a]/40 transition-all group flex items-center justify-between"
              >
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1.5 group-hover:text-[#285c9a] transition-colors">
                    {loading ? <span className="inline-block w-10 h-8 bg-slate-100 rounded-lg animate-pulse" /> : stat.count}
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-100 text-[#285c9a] p-3.5 rounded-xl group-hover:bg-[#285c9a] group-hover:text-white transition-all shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Thao Tác Nhanh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hasPermission('manage_projects') && (
            <Link href="/admin/projects" className="flex items-center justify-between p-4 bg-slate-50/80 border border-slate-200/60 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-3">
                <FolderKanban className="w-5 h-5 text-[#285c9a]" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-[#285c9a]">Quản lý dự án</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#285c9a] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}
          {hasPermission('manage_products') && (
            <Link href="/admin/products" className="flex items-center justify-between p-4 bg-slate-50/80 border border-slate-200/60 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-3">
                <Box className="w-5 h-5 text-[#285c9a]" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-[#285c9a]">Quản lý sản phẩm</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#285c9a] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}


          {hasPermission('manage_articles') && (
            <Link href="/admin/articles" className="flex items-center justify-between p-4 bg-slate-50/80 border border-slate-200/60 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#285c9a]" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-[#285c9a]">Quản lý bài viết</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#285c9a] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}
          {hasPermission('manage_reviews') && (
            <Link href="/admin/reviews" className="flex items-center justify-between p-4 bg-slate-50/80 border border-slate-200/60 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-[#285c9a]" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-[#285c9a]">Quản lý đánh giá</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#285c9a] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}
          {hasPermission('manage_images') && (
            <Link href="/admin/images" className="flex items-center justify-between p-4 bg-slate-50/80 border border-slate-200/60 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-[#285c9a]" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-[#285c9a]">Thư viện hình ảnh</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#285c9a] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}
        </div>
      </div>

      {/* Recent Projects Table */}
      {hasPermission('manage_projects') && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Dự Án Mới Nhất</h2>
              <p className="text-xs text-slate-500 mt-0.5">Danh sách các dự án thang máy mới được cập nhật</p>
            </div>
            <Link href="/admin/projects" className="inline-flex items-center gap-1 text-[#285c9a] hover:text-[#1e4a80] text-xs font-bold transition-colors">
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-[#285c9a]" />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200/60">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200/60">
                    <th className="py-3.5 px-4">Dự án</th>
                    <th className="py-3.5 px-4">Địa điểm</th>
                    <th className="py-3.5 px-4">Loại</th>
                    <th className="py-3.5 px-4">Hoàn thành</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {recentProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {project.image ? (
                            <img src={project.image} alt={project.title} className="w-11 h-11 rounded-lg object-cover border border-slate-200" />
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                              <FolderKanban className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-800">{project.title}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{project.specs}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium text-xs">{project.location}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 bg-blue-50 text-[#285c9a] border border-blue-100 rounded-lg text-xs font-semibold">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs font-medium">{project.completion_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

