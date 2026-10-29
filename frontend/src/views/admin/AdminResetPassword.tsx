"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, KeyRound, CheckCircle2, AlertCircle, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import api from '../../lib/api';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const qEmail = searchParams.get('email');
    const qToken = searchParams.get('token');
    if (qEmail) setEmail(qEmail);
    if (qToken) setToken(qToken);
  }, [searchParams]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (success && countdown === 0) {
      router.push('/haiphat/login');
    }
    return () => clearTimeout(timer);
  }, [success, countdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Xác nhận mật khẩu không trùng khớp.');
      return;
    }

    if (!token.trim()) {
      setError('Thiếu mã xác thực token. Vui lòng kiểm tra lại liên kết trong email.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/reset-password', {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        'Không thể đặt lại mật khẩu. Liên kết có thể đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md relative z-10">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-b from-blue-50 to-slate-100 border border-slate-200/80 mb-3 shadow-md">
          <img src="/logo-icon.png" alt="Thang Máy Hải Phát" className="w-16 h-16 object-contain rounded-full" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Đặt Lại Mật Khẩu</h1>
        <p className="text-slate-500 text-sm mt-1">Hệ Thống Quản Trị Thang Máy Hải Phát</p>
      </div>

      {success ? (
        <div className="space-y-6 text-center py-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-800">Cập Nhật Mật Khẩu Thành Công!</h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
              Mật khẩu mới đã được lưu vào hệ thống an toàn. Đang tự động chuyển về trang đăng nhập sau{' '}
              <span className="font-bold text-[#285c9a] font-mono text-sm">{countdown}s</span>...
            </p>
          </div>

          <Link
            href="/haiphat/login"
            className="block w-full bg-[#285c9a] hover:bg-[#1e4a80] text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/20 transition-all text-sm"
          >
            Đăng Nhập Ngay
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Tài Khoản
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly={!!searchParams.get('email')}
              className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none transition-all ${
                searchParams.get('email') ? 'opacity-80 bg-slate-100 cursor-not-allowed' : 'focus:bg-white focus:ring-2 focus:ring-[#285c9a]'
              }`}
              placeholder="admin@thangmayhaiphat.com"
            />
          </div>

          {!searchParams.get('token') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Mã Xác Thực Token
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none text-sm font-mono"
                placeholder="Nhập mã token từ email"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Mật Khẩu Mới
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all text-sm font-medium"
                placeholder="Tối thiểu 6 ký tự"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Xác Nhận Mật Khẩu Mới
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all text-sm font-medium"
                placeholder="Nhập lại mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-xl text-rose-600 text-xs font-medium space-y-1.5">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
              <div className="pt-1">
                <Link
                  href="/haiphat/forgot-password"
                  className="inline-flex items-center gap-1 font-bold text-rose-700 underline hover:text-rose-900"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Yêu cầu liên kết mới tại đây
                </Link>
              </div>
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
                <span>Đang xử lý đặt lại...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Xác Nhận Đổi Mật Khẩu</span>
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
          Quay lại Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default function AdminResetPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1f35] via-[#1e4a80] to-[#285c9a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background glow circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <Suspense
        fallback={
          <div className="bg-white/95 rounded-2xl p-8 max-w-md w-full text-center text-slate-600">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#285c9a] mb-2" />
            <p className="text-xs font-mono">Đang tải biểu mẫu xác thực...</p>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

