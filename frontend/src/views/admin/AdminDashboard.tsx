"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePermissions } from '../../hooks/usePermissions';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Box, 
  FileText, 
  Star, 
  ImageIcon, 
  ArrowRight, 
  Loader2, 
  Layers, 
  Sparkles,
  TrendingUp,
  Clock,
  MapPin,
  Tag
} from 'lucide-react';
import { DbProject } from '../../lib/types';
import api from '../../lib/api';

export default function AdminDashboard() {
  const { hasPermission } = usePermissions();
  const [counts, setCounts] = useState({ projects: 0, products: 0, services: 0, articles: 0, reviews: 0 });
  const [recentProjects, setRecentProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [proj, prod, svc, art, rev] = await Promise.all([
          api.get('/projects'),
          api.get('/products'),
          api.get('/services'),
          api.get('/articles'),
          api.get('/reviews'),
        ]);
        const projData = proj.data || [];
        setCounts({
          projects: projData.length,
          products: (prod.data || []).length,
          services: (svc.data || []).length,
          articles: (art.data || []).length,
          reviews: (rev.data || []).length,
        });
        setRecentProjects(projData.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard counts:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const statCards = [
    { title: 'Dự án thang máy', count: counts.projects, code: 'PRJ.COUNT', icon: FolderKanban, href: '/admin/projects', permission: 'manage_projects' },
    { title: 'Sản phẩm & Linh kiện', count: counts.products, code: 'PRD.COUNT', icon: Box, href: '/admin/products', permission: 'manage_products' },
    { title: 'Bài viết tin tức', count: counts.articles, code: 'ART.COUNT', icon: FileText, href: '/admin/articles', permission: 'manage_articles' },
    { title: 'Đánh giá khách hàng', count: counts.reviews, code: 'REV.COUNT', icon: Star, href: '/admin/reviews', permission: 'manage_reviews' },
  ];

  return (
    <div className="space-y-8">
      {/* Blueprint Control Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1f35] via-[#142e50] to-[#1e4a80] p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-grid-blueprint opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-blue-200 text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>HẢI PHÁT ELEVATOR CMS // CONTROL CENTER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Bảng Điều Khiển Tổng Quan
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Quản trị toàn bộ dữ liệu dự án, hệ thống danh mục thang máy tải khách, bài viết tin tức và phản hồi khách hàng theo thời gian thực.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0d1f35] text-xs font-bold hover:bg-blue-50 transition-all shadow-md group"
            >
              <span>Xem trang chủ</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Telemetry Stats Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#285c9a]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">Thống Kê Dữ Liệu</h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500 font-medium">REALTIME SYNC ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.filter(stat => hasPermission(stat.permission)).map((stat) => {
            const Icon = stat.icon;
            return (
              <Link 
                key={stat.title}
                href={stat.href}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#285c9a]/50 transition-all group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {stat.code}
                    </span>
                    <p className="text-slate-700 text-xs font-semibold">{stat.title}</p>
                  </div>
                  <div className="bg-blue-50/80 border border-blue-100 text-[#285c9a] p-3 rounded-xl group-hover:bg-[#285c9a] group-hover:text-white transition-all shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="text-3xl font-black font-mono text-slate-900 group-hover:text-[#285c9a] transition-colors">
                    {loading ? (
                      <span className="inline-block w-12 h-8 bg-slate-100 rounded-lg animate-pulse" />
                    ) : (
                      stat.count
                    )}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 group-hover:text-[#285c9a] flex items-center gap-1 transition-colors">
                    Chi tiết <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-[#285c9a]" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">Thao Tác Nhanh</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {hasPermission('manage_projects') && (
            <Link 
              href="/admin/projects" 
              className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-blue-50/60 hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#285c9a] flex items-center justify-center font-bold">
                  <FolderKanban className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#285c9a]">Quản lý dự án</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#285c9a] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}

          {hasPermission('manage_products') && (
            <Link 
              href="/admin/products" 
              className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-blue-50/60 hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#285c9a] flex items-center justify-center font-bold">
                  <Box className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#285c9a]">Quản lý sản phẩm</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#285c9a] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}

          {hasPermission('manage_articles') && (
            <Link 
              href="/admin/articles" 
              className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-blue-50/60 hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#285c9a] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#285c9a]">Quản lý bài viết</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#285c9a] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}

          {hasPermission('manage_reviews') && (
            <Link 
              href="/admin/reviews" 
              className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-blue-50/60 hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#285c9a] flex items-center justify-center font-bold">
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#285c9a]">Quản lý đánh giá</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#285c9a] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}
        </div>
      </div>

      {/* Recent Projects Telemetry Table */}
      {hasPermission('manage_projects') && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#285c9a]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">Dự Án Mới Nhất</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">Danh sách công trình thang máy vừa được cập nhật tiến độ vào hệ thống</p>
            </div>
            <Link 
              href="/admin/projects" 
              className="inline-flex items-center gap-1.5 text-[#285c9a] hover:text-[#1e4a80] text-xs font-bold transition-colors bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
            >
              <span>Xem toàn bộ</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-[#285c9a]" />
              <span className="text-xs font-mono text-slate-500">SYS.FETCH // LOADING RECENT DATA</span>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-mono text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4">Dự Án / Thông Số</th>
                    <th className="py-3.5 px-4">Địa Điểm</th>
                    <th className="py-3.5 px-4">Phân Loại</th>
                    <th className="py-3.5 px-4 text-right">Hoàn Thành</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {recentProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" 
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                              <FolderKanban className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 line-clamp-1">{project.title}</p>
                            <p className="font-mono text-xs text-slate-500 line-clamp-1 mt-0.5">{project.specs || 'Chưa cập nhật specs'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs font-medium">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{project.location}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-[#285c9a] border border-blue-100 rounded-lg text-xs font-semibold">
                          <Tag className="w-3 h-3" />
                          <span>{project.category}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                          {project.completion_date || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentProjects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400 text-xs font-mono">
                        KHÔNG CÓ DỰ ÁN NÀO ĐƯỢC TÌM THẤY
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
