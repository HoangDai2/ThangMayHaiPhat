"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { usePermissions } from '../../hooks/usePermissions';
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
  Shield,
  ExternalLink,
  UserCheck,
  Settings
} from 'lucide-react';

const sidebarItems = [
  { path: '/admin', label: 'Tổng quan', icon: LayoutDashboard, permission: null },
  { path: '/admin/banners', label: 'Banner & Slider', icon: Layout, permission: 'manage_settings' },
  { path: '/admin/projects', label: 'Dự án', icon: FolderKanban, permission: 'manage_projects' },
  { path: '/admin/products', label: 'Sản phẩm', icon: Box, permission: 'manage_products' },
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { hasPermission, loading: permissionsLoading, role } = usePermissions();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || permissionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#285c9a] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium text-sm">Đang tải hệ thống...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null; // Will redirect
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans">
      {/* Top Header Bar for Desktop & Mobile Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="px-4 sm:px-6 lg:pl-72 lg:pr-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden sm:flex items-center gap-2.5">
              <img src="/logo-icon.png" alt="Logo" className="w-6 h-6 object-contain rounded-full border border-slate-200" />
              <span className="w-2 h-2 rounded-full bg-[#285c9a] animate-pulse"></span>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Hệ Thống Quản Trị Hải Phát</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#285c9a] bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem Website</span>
            </Link>

            {role && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                <UserCheck className="w-3.5 h-3.5 text-[#285c9a]" />
                <span>{role}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100"
              title="Đăng xuất"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0d1f35] text-white transform transition-transform duration-300 z-40 flex flex-col shadow-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header with Logo */}
        <div className="p-6 border-b border-slate-800/80 bg-[#0a1829] flex flex-col items-center justify-center text-center relative">
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <Link href="/" className="flex flex-col items-center gap-3 group w-full">
            <div className="relative p-1.5 rounded-full bg-gradient-to-b from-blue-400/20 via-blue-500/10 to-transparent border border-blue-400/20 group-hover:border-blue-400/50 group-hover:scale-105 transition-all shadow-lg shadow-blue-950/60">
              <img src="/logo-icon.png" alt="Thang Máy Hải Phát" className="w-14 h-14 object-contain rounded-full" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-extrabold text-white tracking-wide block">THANG MÁY HẢI PHÁT</span>
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/25">
                Admin Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="p-3 flex-1 overflow-y-auto space-y-1 custom-scrollbar">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Menu Quản Lý
          </div>
          {sidebarItems.map((item) => {
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
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-[#285c9a] text-white shadow-md shadow-blue-950/40 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-800/80 bg-[#091524]">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Hệ thống trực tuyến v1.0</span>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <main className="lg:ml-64 flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

