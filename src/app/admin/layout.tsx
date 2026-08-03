"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import Cookies from 'js-cookie';
import api from '../../lib/api';
import {
  LayoutDashboard,
  FolderKanban,
  Box,
  Briefcase,
  LogOut,
  Menu,
  X,
  ImageIcon,
  FileText,
  Star,
  Layout,
  Users,
  Shield
} from 'lucide-react';

const sidebarItems = [
  { path: '/admin', label: 'Tổng quan', icon: LayoutDashboard, permission: null },
  { path: '/admin/projects', label: 'Dự án', icon: FolderKanban, permission: 'manage_projects' },
  { path: '/admin/products', label: 'Sản phẩm', icon: Box, permission: 'manage_products' },
  { path: '/admin/services', label: 'Dịch vụ', icon: Briefcase, permission: 'manage_services' },
  { path: '/admin/banners', label: 'Banner', icon: Layout, permission: 'manage_banners' },
  { path: '/admin/articles', label: 'Bài viết', icon: FileText, permission: 'manage_articles' },
  { path: '/admin/reviews', label: 'Đánh giá', icon: Star, permission: 'manage_reviews' },
  { path: '/admin/images', label: 'Hình ảnh', icon: ImageIcon, permission: 'manage_images' },
  { path: '/admin/users', label: 'Tài khoản', icon: Users, permission: 'manage_all' },
  { path: '/admin/roles', label: 'Phân quyền', icon: Shield, permission: 'manage_all' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hasPermission, loading: permissionsLoading, role } = usePermissions();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!permissionsLoading && !role) {
      router.replace('/admin/login');
    }
  }, [permissionsLoading, role, router]);

  if (permissionsLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100">Đang tải...</div>;
  }

  if (!role) {
    return null; // Will redirect
  }

  const handleLogout = async () => {
    try {
      await api.post('/admin/logout');
    } catch (e) {
      console.error(e);
    }
    Cookies.remove('admin_token');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800 text-white transform transition-transform duration-300 z-40 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-slate-700">
          <Link href="/" className="text-xl font-bold text-orange-500 block">
            Hải Phát Admin
          </Link>
          {role && (
            <div className="mt-2 text-sm text-slate-400 bg-slate-700/50 inline-block px-2 py-1 rounded">
              Vai trò: <span className="text-white font-medium">{role}</span>
            </div>
          )}
        </div>
        <nav className="p-4 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            // Check permission
            if (item.permission && !hasPermission(item.permission)) {
              return null;
            }

            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen p-6 pt-16 lg:pt-6">
        {children}
      </main>
    </div>
  );
}
