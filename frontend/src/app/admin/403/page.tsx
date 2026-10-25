import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-100 mb-6">
          <ShieldAlert className="w-10 h-10 text-rose-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Từ chối truy cập (403)
        </h1>
        
        <p className="text-slate-600 mb-8 text-lg">
          Bạn không có quyền truy cập. Vui lòng liên hệ admin.
        </p>
        
        <Link 
          href="/admin"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#285c9a] text-white rounded-xl font-semibold hover:bg-[#1e4a80] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Về trang tổng quan
        </Link>
      </div>
    </div>
  );
}
