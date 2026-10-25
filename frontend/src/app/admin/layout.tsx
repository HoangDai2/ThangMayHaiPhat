"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
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
  Users,
  Shield,
  ExternalLink,
  UserCheck,
  Mail,
  ChevronRight,
  Terminal,
  Activity
} from 'lucide-react';

const sidebarItems = [
  { path: '/admin', label: 'Tổng quan', icon: LayoutDashboard, permission: null },
  { path: '/admin/contacts', label: 'Yêu cầu tư vấn', icon: Mail, permission: 'manage-contacts' },
  { path: '/admin/promotions', label: 'Popup Khuyến Mãi', icon: Star, permission: 'manage-promotions' },
  { path: '/admin/projects', label: 'Dự án', icon: FolderKanban, permission: 'manage-projects' },
  { path: '/admin/products', label: 'Sản phẩm', icon: Box, permission: 'manage-products' },
  { path: '/admin/articles', label: 'Bài viết', icon: FileText, permission: 'manage-articles' },
  { path: '/admin/reviews', label: 'Đánh giá', icon: Star, permission: 'manage-reviews' },
  { path: '/admin/images', label: 'Hình ảnh', icon: ImageIcon, permission: 'manage-images' },
  { path: '/admin/users', label: 'Tài khoản', icon: Users, permission: 'manage-users' },
  { path: '/admin/roles', label: 'Phân quyền', icon: Shield, permission: 'manage-users' },
  { path: '/admin/bitrix', label: 'Dữ liệu Bitrix', icon: Briefcase, permission: 'manage-projects' },
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
    const token = Cookies.get('admin_token');
    setIsAuthenticated(!!token);
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || (isAuthenticated && permissionsLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1f35]">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-[#285c9a] border-t-transparent rounded-full animate-spin" />
            <div className="w-12 h-12 border-4 border-blue-400/20 rounded-full absolute inset-0" />
          </div>
          <div className="text-center">
            <p className="text-white font-semibold text-sm tracking-wide">KHỞI ĐỘNG HỆ THỐNG CMS</p>
            <p className="text-blue-300/70 font-mono text-xs mt-1">SYS.AUTH // VERIFYING CREDENTIALS</p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null;
  }

  const handleLogout = async () => {
    Cookies.remove('admin_token');
    router.push('/admin/login');
  };

  const currentItem = sidebarItems.find(item => item.path === pathname) || { label: 'Quản trị hệ thống' };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-[#285c9a] selection:text-white">
      {/* Top Header Bar for Desktop & Mobile */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm/50 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:pl-72 lg:pr-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
              aria-label="Toggle Menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {/* Breadcrumb Info */}
            <div className="flex items-center gap-2 text-xs">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 font-mono text-[11px] font-medium border border-slate-200">
                <Terminal className="w-3 h-3 text-[#285c9a]" />
                PORTAL
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <span className="text-slate-800 font-bold text-sm tracking-tight">{currentItem.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#285c9a] bg-blue-50/80 border border-blue-200 hover:bg-blue-100/80 transition-all shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem Website</span>
            </Link>

            {role && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                <UserCheck className="w-3.5 h-3.5 text-[#285c9a]" />
                <span className="uppercase">{role}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200"
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
        className={`fixed top-0 left-0 h-full w-64 bg-[#0d1f35] text-white transform transition-transform duration-300 z-40 flex flex-col shadow-2xl border-r border-slate-800 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header with Logo */}
        <div className="p-5 border-b border-slate-800/80 bg-[#091524] relative">
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative p-1 rounded-full bg-gradient-to-b from-blue-400/20 to-transparent border border-blue-400/30 group-hover:border-blue-400 transition-all shadow-md shrink-0">
              <img src="/logo-icon.png" alt="Thang Máy Hải Phát" className="w-10 h-10 object-contain rounded-full" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black text-white tracking-wider truncate uppercase">HẢI PHÁT ELEVATOR</span>
              <span className="text-[10px] font-mono text-blue-300 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                CMS CONTROL
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="p-3 flex-1 overflow-y-auto space-y-1 custom-scrollbar">
          <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>DANH MỤC QUẢN TRỊ</span>
            <Activity className="w-3 h-3 text-[#285c9a]" />
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all relative ${
                  isActive
                    ? 'bg-[#285c9a] text-white shadow-lg shadow-blue-950/60 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-white rounded-r-full" />
                )}
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-800/80 bg-[#07111d]">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-slate-300 font-bold">ONLINE</span>
            </div>
            <span className="text-[11px] text-slate-500">v2.5.0-PRO</span>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <main className="lg:ml-64 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
