import { Metadata } from 'next';
import ServicesPage from '../../../views/ServicesPage';

export const metadata: Metadata = {
  title: 'Dịch Vụ Tư Vấn, Lắp Đặt & Bảo Trì Thang Máy Định Kỳ | Thang Máy Hải Phát',
  description: 'Thang Máy Hải Phát cung cấp dịch vụ khảo sát, tư vấn báo giá thang máy miễn phí trong 24h. Hợp đồng bảo trì trọn gói 1 năm, chu kỳ kiểm định 2 tháng/lần với 100% kỹ sư chính quy. Hotline cứu hộ 24/7: 0326 629 971.',
  keywords: [
    'dịch vụ thang máy',
    'bảo trì thang máy',
    'bảo dưỡng thang máy định kỳ',
    'sửa chữa thang máy hà nội',
    'cứu hộ thang máy 24/7',
    'tư vấn thiết kế thang máy gia đình',
    'khảo sát hố thang máy',
    'thang máy hải phát'
  ],
  alternates: {
    canonical: 'https://thangmayhaiphat.vn/dich-vu',
  },
  openGraph: {
    title: 'Dịch Vụ Tư Vấn, Lắp Đặt & Bảo Trì Thang Máy Định Kỳ | Thang Máy Hải Phát',
    description: 'Khảo sát hiện trường miễn phí, lập dự toán trong 24h. Cam kết bảo trì định kỳ 2 tháng/lần bởi 100% kỹ sư đào tạo nội bộ. Hotline cứu hộ khẩn cấp: 0326 629 971.',
    url: 'https://thangmayhaiphat.vn/dich-vu',
    type: 'website',
    siteName: 'Thang Máy Hải Phát',
    locale: 'vi_VN',
    images: [
      {
        url: 'https://thangmayhaiphat.vn/bhbt.png',
        width: 1200,
        height: 630,
        alt: 'Dịch vụ bảo hành bảo trì thang máy Hải Phát',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dịch Vụ Tư Vấn, Lắp Đặt & Bảo Trì Thang Máy | Hải Phát',
    description: 'Bảo trì định kỳ 2 tháng/lần, SLA cứu hộ khẩn cấp có mặt 30-60 phút. Hotline 24/7: 0326 629 971.',
    images: ['https://thangmayhaiphat.vn/bhbt.png'],
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Dịch vụ lắp đặt và bảo trì thang máy',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Công Ty Thang Máy Hải Phát',
      telephone: '0898424666',
      email: 'haiphatthangmay@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Tầng 11, Tòa Nhà Đa Năng, 169 Đ. Nguyễn Ngọc Vũ, Yên Hòa',
        addressLocality: 'Cầu Giấy',
        addressRegion: 'Hà Nội',
        addressCountry: 'VN',
      },
      url: 'https://thangmayhaiphat.vn',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Việt Nam',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Danh Mục Dịch Vụ Kỹ Thuật Thang Máy',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Khảo sát và tư vấn thiết kế hố thang máy miễn phí',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bảo trì bảo dưỡng thang máy định kỳ 2 tháng/lần',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cứu hộ kỹ thuật khẩn cấp 24/7 nội thành dưới 60 phút',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPage />
    </>
  );
}
