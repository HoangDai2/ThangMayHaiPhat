<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Yêu cầu tư vấn mới</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            margin-top: 20px;
        }
        .header {
            background-color: #285c9a;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .field {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
            color: #555555;
        }
        .value {
            margin-top: 5px;
            padding: 10px;
            background-color: #f9f9f9;
            border-left: 4px solid #285c9a;
            border-radius: 4px;
        }
        .footer {
            background-color: #f1f5f9;
            color: #777777;
            text-align: center;
            padding: 15px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Yêu Cầu Tư Vấn Mới</h1>
        </div>
        <div class="content">
            <p>Xin chào,</p>
            <p>Bạn vừa nhận được một yêu cầu tư vấn mới từ website Thang Máy Hải Phát. Dưới đây là thông tin chi tiết:</p>
            
            <div class="field">
                <div class="label">Họ và tên:</div>
                <div class="value">{{ $contact->name }}</div>
            </div>
            
            <div class="field">
                <div class="label">Số điện thoại:</div>
                <div class="value">{{ $contact->phone }}</div>
            </div>

            @if($contact->email)
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">{{ $contact->email }}</div>
            </div>
            @endif
            
            <div class="field">
                <div class="label">Dịch vụ quan tâm:</div>
                <div class="value">{{ $contact->service ?? 'Không xác định' }}</div>
            </div>
            
            <div class="field">
                <div class="label">Lời nhắn:</div>
                <div class="value">{{ $contact->message ?? 'Không có lời nhắn' }}</div>
            </div>
            
            <p style="margin-top: 20px;">Vui lòng liên hệ lại với khách hàng trong thời gian sớm nhất.</p>
        </div>
        <div class="footer">
            Đây là email thông báo tự động từ hệ thống Website Thang Máy Hải Phát. Vui lòng không trả lời trực tiếp email này.
        </div>
    </div>
</body>
</html>
