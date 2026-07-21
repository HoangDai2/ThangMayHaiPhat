import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Thang Máy Hải Phát - Chuyên Lắp Đặt Thang Máy Hiện Đại, Uy Tín',
  description: 'Thang Máy Hải Phát chuyên lắp đặt thang máy gia đình, thang máy tải khách cao cấp. Hơn 5 năm kinh nghiệm, 1000+ công trình hoàn thành, bảo hành chính hãng toàn quốc.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
