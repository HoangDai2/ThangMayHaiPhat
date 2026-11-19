import { DbFaq } from '../lib/types';

export const fallbackFaqs: DbFaq[] = [
  // Chi phí & Báo giá
  {
    id: 'faq-1',
    question: 'Chi phí lắp đặt trọn gói thang máy gia đình là bao nhiêu?',
    answer: 'Chi phí trọn gói dao động từ 280 triệu đến 650 triệu đồng tùy vào tải trọng (350kg - 630kg), số tầng dừng, loại động cơ và vật liệu cabin kính hay inox hoa văn.',
    category: 'Chi phí & Báo giá',
    sort_order: 1,
    is_published: true,
  },
  {
    id: 'faq-2',
    question: 'Chi phí tiền điện vận hành thang máy hàng tháng khoảng bao nhiêu?',
    answer: 'Khoảng 300.000 đến 500.000 VNĐ/tháng. Động cơ không hộp số nam châm vĩnh cửu thế hệ mới tiết kiệm tới 40% điện năng so với máy kéo truyền thống.',
    category: 'Chi phí & Báo giá',
    sort_order: 2,
    is_published: true,
  },
  {
    id: 'faq-3',
    question: 'Có phát sinh chi phí nào ngoài hợp đồng trọn gói không?',
    answer: 'Không. Hợp đồng Hải Phát là chìa khóa trao tay, bao gồm vận chuyển, thi công cơ điện, kiểm định an toàn quốc gia và 1 năm bảo dưỡng định kỳ miễn phí.',
    category: 'Chi phí & Báo giá',
    sort_order: 3,
    is_published: true,
  },

  // Kỹ thuật & Kích thước
  {
    id: 'faq-4',
    question: 'Nhà cải tạo diện tích hẹp có lắp được thang máy không?',
    answer: 'Hoàn toàn lắp được. Hải Phát có giải pháp homelift khung kính hợp kim chỉ cần diện tích thông thủy từ 1m² (1000mm x 1000mm), không cần đập phá kết cấu chịu lực.',
    category: 'Kỹ thuật & Kích thước',
    sort_order: 4,
    is_published: true,
  },
  {
    id: 'faq-5',
    question: 'Hố pít thang máy gia đình cần đào sâu bao nhiêu?',
    answer: 'Chỉ từ 200mm đến 500mm đối với dòng homelift không phòng máy; từ 800mm đến 1400mm đối với thang tiêu chuẩn tải trọng lớn.',
    category: 'Kỹ thuật & Kích thước',
    sort_order: 5,
    is_published: true,
  },
  {
    id: 'faq-6',
    question: 'Chiều cao tầng trên cùng (OH) tối thiểu là bao nhiêu?',
    answer: 'Tối thiểu 2600mm đối với dòng homelift không phòng máy và từ 3600mm đối với dòng thang có phòng máy tiêu chuẩn.',
    category: 'Kỹ thuật & Kích thước',
    sort_order: 6,
    is_published: true,
  },
  {
    id: 'faq-7',
    question: 'Nhà dùng nguồn điện 1 pha 220V có lắp được thang máy không?',
    answer: 'Có. Hải Phát tích hợp bộ biến tần chuyên dụng chuyển đổi điện 1 pha 220V thành 3 pha, đảm bảo thang vận hành êm ái và không cần xin cấp điện 3 pha phức tạp.',
    category: 'Kỹ thuật & Kích thước',
    sort_order: 7,
    is_published: true,
  },

  // An toàn & Vận hành
  {
    id: 'faq-8',
    question: 'Khi mất điện đột ngột thang máy có bị rơi tự do không?',
    answer: 'Tuyệt đối không. Hệ thống phanh cơ khí an toàn và bộ khống chế vượt tốc governor sẽ lập tức khóa chặt cabin vào ray dẫn hướng khi tốc độ vượt quá ngưỡng định mức.',
    category: 'An toàn & Vận hành',
    sort_order: 8,
    is_published: true,
  },
  {
    id: 'faq-9',
    question: 'Người ở trong cabin khi mất điện xử lý như thế nào?',
    answer: 'Hệ thống cứu hộ tự động ARD sẽ kích hoạt ngay lập tức bằng ắc quy dự phòng, tự động đưa thang về tầng gần nhất và mở cửa cho người ra ngoài an toàn.',
    category: 'An toàn & Vận hành',
    sort_order: 9,
    is_published: true,
  },
  {
    id: 'faq-10',
    question: 'Bị kẹt trong thang máy có nguy cơ ngạt thở không?',
    answer: 'Không bao giờ ngạt khí. Giếng thang và cabin luôn có khe thông gió tự nhiên đối lưu liên tục với bên ngoài, kèm quạt thông gió phụ trợ hoạt động độc lập.',
    category: 'An toàn & Vận hành',
    sort_order: 10,
    is_published: true,
  },

  // Bảo trì & Bảo hành
  {
    id: 'faq-11',
    question: 'Thời gian bảo hành thang máy Hải Phát là bao lâu?',
    answer: '24 tháng toàn diện cho toàn bộ hệ thống cơ điện, động cơ, tủ điều khiển và 5 năm cho kết cấu khung cơ khí ray dẫn hướng.',
    category: 'Bảo trì & Bảo hành',
    sort_order: 11,
    is_published: true,
  },
  {
    id: 'faq-12',
    question: 'Chu kỳ bảo trì định kỳ là bao lâu một lần?',
    answer: 'Định kỳ 2 tháng/lần theo tiêu chuẩn an toàn kỹ thuật QCVN 02:2019/BLĐTBXH, kỹ sư kiểm tra 24 hạng mục an toàn và tra dầu bôi trơn chuyên dụng.',
    category: 'Bảo trì & Bảo hành',
    sort_order: 12,
    is_published: true,
  },
  {
    id: 'faq-13',
    question: 'Khi gặp sự cố, đội cứu hộ có mặt trong bao lâu?',
    answer: 'Cứu hộ cam kết có mặt 1 đến 2 tiếng trong Hà Nội và 2 đến 6 tiếng ngoài Hà Nội qua hotline trực ban 24/7: 0987.603.588.',
    category: 'Bảo trì & Bảo hành',
    sort_order: 13,
    is_published: true,
  },

  // Tiến độ & Thi công
  {
    id: 'faq-14',
    question: 'Thời gian sản xuất và lắp đặt hoàn thiện mất bao lâu?',
    answer: 'Khoảng 25 đến 35 ngày. Giai đoạn sản xuất nhập khẩu linh kiện 15-20 ngày, lắp đặt cơ điện 7-10 ngày, hiệu chỉnh và kiểm định bàn giao 3-5 ngày.',
    category: 'Tiến độ & Thi công',
    sort_order: 14,
    is_published: true,
  },
];
