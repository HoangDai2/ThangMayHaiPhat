<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt lại mật khẩu quản trị - Thang Máy Hải Phát</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f1f5f9;
            margin: 0;
            padding: 0;
            color: #334155;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        .header {
            background: linear-gradient(135deg, #0d1f35 0%, #1e4a80 50%, #285c9a 100%);
            color: #ffffff;
            padding: 36px 24px;
            text-align: center;
        }
        .logo-title {
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 1px;
            margin: 0 0 8px 0;
            text-transform: uppercase;
        }
        .header-sub {
            font-size: 13px;
            color: #93c5fd;
            margin: 0;
            letter-spacing: 0.5px;
        }
        .content {
            padding: 32px 28px;
            line-height: 1.6;
        }
        .greeting {
            font-size: 16px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 16px;
        }
        .message {
            font-size: 14px;
            color: #475569;
            margin-bottom: 24px;
        }
        .btn-wrapper {
            text-align: center;
            margin: 32px 0;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #285c9a 0%, #1e4a80 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 14px;
            box-shadow: 0 4px 14px rgba(40, 92, 154, 0.35);
        }
        .token-box {
            background-color: #f8fafc;
            border: 1px dashed #cbd5e1;
            border-radius: 10px;
            padding: 16px;
            margin: 24px 0;
            text-align: center;
        }
        .token-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 6px;
        }
        .token-code {
            font-family: monospace;
            font-size: 15px;
            font-weight: 700;
            color: #1e4a80;
            word-break: break-all;
        }
        .warning-box {
            background-color: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 13px;
            color: #991b1b;
            margin-bottom: 24px;
        }
        .url-fallback {
            font-size: 12px;
            color: #64748b;
            margin-top: 24px;
            word-break: break-all;
        }
        .footer {
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            color: #94a3b8;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo-title">THANG MÁY HẢI PHÁT</h1>
            <p class="header-sub">HỆ THỐNG QUẢN TRỊ NỘI BỘ</p>
        </div>
        <div class="content">
            <p class="greeting">Xin chào {{ $user->name }},</p>
            <p class="message">
                Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản quản trị viên của bạn (<strong>{{ $user->email }}</strong>).
                Để thiết lập mật khẩu mới, vui lòng nhấn vào nút bên dưới:
            </p>

            <div class="btn-wrapper">
                <a href="{{ $resetUrl }}" class="btn" target="_blank">Đặt Lại Mật Khẩu Ngay</a>
            </div>

            <div class="warning-box">
                <strong>Lưu ý quan trọng:</strong> Liên kết đặt lại mật khẩu này chỉ có hiệu lực trong vòng <strong>60 phút</strong>. Nếu bạn không yêu cầu đặt lại mật khẩu, bạn có thể yên tâm bỏ qua email này, tài khoản của bạn vẫn được an toàn.
            </div>

            <div class="token-box">
                <div class="token-label">Mã xác thực token (Dành cho thiết bị di động / thủ công):</div>
                <div class="token-code">{{ $token }}</div>
            </div>

            <div class="url-fallback">
                Nếu không nhấn được nút trên, vui lòng sao chép và dán liên kết sau vào trình duyệt:<br>
                <a href="{{ $resetUrl }}" style="color: #285c9a;">{{ $resetUrl }}</a>
            </div>
        </div>
        <div class="footer">
            Đây là email tự động từ Hệ thống Quản trị Thang Máy Hải Phát.<br>
            Vui lòng không trả lời trực tiếp email này.
        </div>
    </div>
</body>
</html>

