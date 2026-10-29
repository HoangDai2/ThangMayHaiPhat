"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, KeyRound, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../../lib/api';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/forgot-password', { email: cleanEmail });
      setSuccessMsg(response.data.message || 'Yêu cầu đặt lại mật khẩu đã được xử lý thành công.');
    } catch (err: any) {
      if (err.response?.status === 429) {
        setError('Bạn đã gửi yêu cầu quá nhiều lần. Vui lòng đợi 1 phút trước khi thử lại.');
      } else {
        setError(
          err.response?.data?.message ||
          'Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng kiểm tra lại email hoặc liên hệ quản trị viên.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1f35] via-[#1e4a80] to-[#285c9a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background glow circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-b from-blue-50 to-slate-100 border border-slate-200/80 mb-3 shadow-md">
            <img src="/logo-icon.png" alt="Thang Máy Hải Phát" className="w-16 h-16 object-contain rounded-full" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Quên Mật Khẩu</h1>
          <p className="text-slate-500 text-sm mt-1">Hệ Thống Quản Trị Thang Máy Hải Phát</p>
        </div>

        {successMsg ? (
          <div className="space-y-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-800">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-emerald-900 mb-1">Đã gửi yêu cầu thành công!</p>
                  <p className="leading-relaxed">{successMsg}</p>
                  <p className="text-xs text-emerald-700 mt-2">
                    Vui lòng kiểm tra hòm thư đến hoặc thư mục Spam của địa chỉ <strong>{email}</strong> để hoàn tất việc đổi mật khẩu.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/haiphat/login"
                className="block w-full text-center bg-[#285c9a] hover:bg-[#1e4a80] text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/20 transition-colors text-sm"
              >
                Quay lại trang Đăng nhập
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              Nhập địa chỉ email tài khoản quản trị của bạn. Chúng tôi sẽ gửi hướng dẫn kèm liên kết an toàn để bạn thiết lập mật khẩu mới.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email Quản Trị
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#285c9a] focus:border-transparent outline-none transition-all text-sm font-medium"
                  placeholder="admin@thangmayhaiphat.com"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-xl text-rose-600 text-xs font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#285c9a] hover:bg-[#1e4a80] text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/20 transition-all duration-200 disabled:opacity-70 flex justify-center items-center gap-2 text-sm mt-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang gửi yêu cầu...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Gửi Hướng Dẫn Đặt Lại</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
          <Link
            href="/haiphat/login"
            className="inline-flex items-center gap-1.5 text-[#285c9a] hover:text-[#1e4a80] text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Quay lại Đăng nhập Quản Trị
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors"
          >
            Quay về Trang chủ Hải Phát
          </Link>
        </div>
      </div>
    </div>
  );
}
