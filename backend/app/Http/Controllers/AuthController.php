<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Mail\ResetPasswordMail;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Thông tin đăng nhập không chính xác.'
            ], 401);
        }

        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Đăng xuất thành công'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user()->load(['roles', 'permissions']));
    }

    /**
     * Send password reset link to user email
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ], [
            'email.required' => 'Vui lòng nhập địa chỉ email.',
            'email.email' => 'Địa chỉ email không đúng định dạng.',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy tài khoản quản trị nào với email này.'
            ], 404);
        }

        // Generate a cryptographically secure token
        $rawToken = Str::random(60);

        // Store token in database (using hash for security)
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($rawToken),
                'created_at' => Carbon::now(),
            ]
        );

        // Construct frontend reset URL
        $frontendOrigin = $request->header('origin') ?: env('FRONTEND_URL', 'http://localhost:3000');
        $resetUrl = rtrim($frontendOrigin, '/') . '/haiphat/reset-password?token=' . urlencode($rawToken) . '&email=' . urlencode($user->email);

        $mailSent = false;
        try {
            Mail::to($user->email)->send(new ResetPasswordMail($user, $resetUrl, $rawToken));
            $mailSent = true;
        } catch (\Throwable $e) {
            Log::error('Lỗi khi gửi email đặt lại mật khẩu: ' . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Yêu cầu thành công! Hướng dẫn đặt lại mật khẩu đã được xử lý và gửi đến ' . $user->email . '.',
            'mail_sent' => $mailSent,
            'dev_reset_url' => config('mail.default') === 'log' ? $resetUrl : null,
        ]);
    }

    /**
     * Reset user password with token
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ], [
            'email.required' => 'Vui lòng cung cấp email.',
            'token.required' => 'Mã xác thực token không được để trống.',
            'password.required' => 'Vui lòng nhập mật khẩu mới.',
            'password.min' => 'Mật khẩu mới phải có ít nhất 6 ký tự.',
            'password.confirmed' => 'Xác nhận mật khẩu không trùng khớp.',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Tài khoản không tồn tại trong hệ thống.'
            ], 404);
        }

        $record = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!$record) {
            return response()->json([
                'message' => 'Yêu cầu đặt lại mật khẩu không hợp lệ hoặc đã được sử dụng.'
            ], 400);
        }

        // Check if token has expired (60 minutes validity)
        if (Carbon::parse($record->created_at)->addMinutes(60)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json([
                'message' => 'Liên kết đặt lại mật khẩu đã hết hạn (chỉ có hiệu lực trong vòng 60 phút). Vui lòng gửi yêu cầu mới.'
            ], 400);
        }

        // Verify token match (either hashed or raw fallback)
        if (!Hash::check($request->token, $record->token) && $request->token !== $record->token) {
            return response()->json([
                'message' => 'Mã xác thực token không chính xác hoặc không hợp lệ.'
            ], 400);
        }

        // Update user password
        $user->password = Hash::make($request->password);
        $user->save();

        // Invalidate reset token
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        // Revoke all current tokens for this user for security
        if (method_exists($user, 'tokens')) {
            $user->tokens()->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Đặt lại mật khẩu thành công! Bạn có thể sử dụng mật khẩu mới để đăng nhập.',
        ]);
    }
}
