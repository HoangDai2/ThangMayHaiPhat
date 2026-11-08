import type { Metadata } from 'next';
import Script from 'next/script';
import '../index.css';

export const metadata: Metadata = {
  title: 'Thang Máy Hải Phát - Chuyên Lắp Đặt Thang Máy Hiện Đại, Uy Tín',
  description: 'Thang Máy Hải Phát chuyên lắp đặt thang máy gia đình, thang máy tải khách cao cấp. Hơn 5 năm kinh nghiệm, 1000+ công trình hoàn thành, bảo hành chính hãng toàn quốc.',
  icons: {
    icon: '/logo-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <Script
          id="suppress-event-rejection"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('unhandledrejection', function(event) {
                  if (event.reason instanceof Event || (event.reason && typeof event.reason === 'object' && 'isTrusted' in event.reason)) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);
              }
            `,
          }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2MJTBYK1YN"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-2MJTBYK1YN');
            `,
          }}
        />
      </head>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <main className="overflow-x-hidden w-full flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
