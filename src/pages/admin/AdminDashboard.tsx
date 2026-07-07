import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Box, Briefcase, Loader2 } from 'lucide-react';
import { supabase, DbProject } from '../../lib/supabase';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ projects: 0, products: 0, services: 0 });
  const [recentProjects, setRecentProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [proj, prod, svc, recent] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(4),
      ]);
      setCounts({
        projects: proj.count ?? 0,
        products: prod.count ?? 0,
        services: svc.count ?? 0,
      });
      if (!recent.error && recent.data) setRecentProjects(recent.data);
      setLoading(false);
    })();
  }, []);

  const statCards = [
    { title: 'Dự án', count: counts.projects, icon: FolderKanban, color: 'bg-blue-500', href: '/admin/projects' },
    { title: 'Sản phẩm', count: counts.products, icon: Box, color: 'bg-green-500', href: '/admin/products' },
    { title: 'Dịch vụ', count: counts.services, icon: Briefcase, color: 'bg-purple-500', href: '/admin/services' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Tổng quan</h1>
        <p className="text-slate-500 mt-1">Chào mừng bạn đến với trang quản trị Hải Phát</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">
                    {loading ? <span className="inline-block w-8 h-8 bg-slate-100 rounded animate-pulse" /> : stat.count}
                  </p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/projects" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <FolderKanban className="w-5 h-5 text-orange-500" />
            <span className="text-slate-700">Quản lý dự án</span>
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <Box className="w-5 h-5 text-orange-500" />
            <span className="text-slate-700">Quản lý sản phẩm</span>
          </Link>
          <Link to="/admin/services" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <Briefcase className="w-5 h-5 text-orange-500" />
            <span className="text-slate-700">Quản lý dịch vụ</span>
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Dự án gần đây</h2>
          <Link to="/admin/projects" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
            Xem tất cả
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 text-sm border-b">
                  <th className="pb-3 font-medium">Dự án</th>
                  <th className="pb-3 font-medium">Địa điểm</th>
                  <th className="pb-3 font-medium">Loại</th>
                  <th className="pb-3 font-medium">Hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {project.image && (
                          <img src={project.image} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
                        )}
                        <div>
                          <p className="font-medium text-slate-800">{project.title}</p>
                          <p className="text-sm text-slate-500">{project.specs}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600">{project.location}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-4 text-slate-600">{project.completion_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
