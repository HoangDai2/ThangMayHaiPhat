import { Metadata } from 'next';
import ServicesPage from '../../../views/ServicesPage';

export const metadata: Metadata = {
  title: 'Dịch Vụ Tư Vấn & Bảo Trì Thang Máy | Thang Máy Hải Phát',
  description: 'Thang Máy Hải Phát cung cấp dịch vụ tư vấn, báo giá thang máy miễn phí 24/7. Nhận gia hạn hợp đồng bảo hành, bảo trì định kỳ 2 tháng/lần cho khách hàng cũ với đội ngũ chuyên nghiệp.',
  openGraph: {
    title: 'Dịch Vụ Tư Vấn & Bảo Trì Thang Máy | Thang Máy Hải Phát',
    description: 'Thang Máy Hải Phát cung cấp dịch vụ tư vấn, báo giá thang máy miễn phí 24/7. Nhận gia hạn hợp đồng bảo hành, bảo trì định kỳ 2 tháng/lần cho khách hàng cũ với đội ngũ chuyên nghiệp.',
    url: 'https://thangmayhaiphat.vn/dich-vu',
    type: 'website',
  },
};

export default function Page() {
  return <ServicesPage />;
}
