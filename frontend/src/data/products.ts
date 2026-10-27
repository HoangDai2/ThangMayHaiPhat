export interface Product {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  gallery?: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  benefits: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedProjects: string[];
}

export const products: Product[] = [
  {
    id: '5a0c4a0a-aa1f-4ad6-a564-eec5e2a4121e',
    title: 'Thang Máy Xây',
    subtitle: 'Hiệu suất cao cho tòa nhà văn phòng và chung cư',
    icon: 'building',
    image: 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435936672-mrkll2obexe.png',
    shortDescription: 'Giải pháp lý tưởng cho tòa nhà, văn phòng, bệnh viện, khách sạn. Tải trọng lớn, vận hành êm ái, đáp ứng tiêu chuẩn QCVN và EN 81.',
    fullDescription: `Thang máy hố xây Hải Phát là giải pháp vận chuyển tối ưu cho các công trình xây mới, nhà phố, biệt thự và các công trình thương mại với giếng thang đổ cột bê tông và tường gạch kiên cố. Kết cấu bền bỉ trọn đời, tối ưu hóa kích thước cabin lớn nhất trong lòng hố, vận hành êm ái và an toàn tuyệt đối.`,
    features: [
      'Tốc độ vận hành đa dạng',
      'Hệ thống nhóm thông minh',
      'Màn hình LCD 10" - 21"',
      'Nội thất gỗ/inox cao cấp',
      'Hệ thống dự báo tầng',
      'Chống rung vận hành êm',
      'Chế độ tiết kiệm điện',
      'Kết nối BMS tòa nhà',
    ],
    gallery: [
      'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435953008-q97eevv5tcd.png',
      'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435962214-72uzkf3hnhs.jpg',
      'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435966649-c396d01fzmh.png',
      'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435970972-h23t68qhoee.png',
    ],
    specifications: [
      { label: 'Tải trọng', value: '350 - 650 kg' },
      { label: 'Kích thước cabin', value: '1.100 - 1.200 mm' },
      { label: 'Công suất', value: '1.0 - 1.5 m/s' },
      { label: 'Bảo hành', value: '18 tháng' },
      { label: 'Bảo trì', value: '2 tháng/lần' },
      { label: 'Số tầng tối đa', value: '15 Tầng' },
    ],
    benefits: [
      'Tăng năng suất vận chuyển',
      'Giảm thời gian chờ đợi',
      'An toàn tuyệt đối cho người dùng',
      'Tiết kiệm chi phí vận hành',
      'Dễ dàng tích hợp BMS',
      'Vận hành bền bỉ 24/7',
    ],
    process: [
      { step: 1, title: 'Khảo sát & Tư vấn', description: 'Đo đạc hố thang bê tông, hố PIT và tính toán kích thước cabin tối đa.' },
      { step: 2, title: 'Thiết kế kỹ thuật', description: 'Bản vẽ chi tiết mặt cắt giếng thang, vị trí dầm đỡ và ray dẫn hướng.' },
      { step: 3, title: 'Cung cấp thiết bị', description: 'Nhập khẩu động cơ Montanari / Fuji, tủ điều khiển biến tần đồng bộ.' },
      { step: 4, title: 'Lắp đặt & Vận hành', description: 'Lắp đặt cơ khí, kéo cáp, cài đặt vi xử lý và cân chỉnh độ êm ái.' },
      { step: 5, title: 'Kiểm định an toàn', description: 'Kiểm định nhà nước cấp phép hoạt động theo QCVN 02:2019.' },
      { step: 6, title: 'Bảo hành & Hậu mãi', description: 'Bảo hành 18 tháng, bảo dưỡng định kỳ 2 tháng/lần miễn phí.' },
    ],
    faqs: [
      { question: 'Nhà xây mới nên chọn thang máy hố xây khi nào?', answer: 'Thích hợp nhất khi công trình đang làm móng và đổ khung bê tông, giúp tối ưu chi phí khung thép và mở rộng cabin tối đa.' },
      { question: 'Hố PIT thang xây cần sâu bao nhiêu?', answer: 'Hố PIT tiêu chuẩn từ 600mm đến 1.200mm tùy theo tải trọng và tốc độ thiết kế.' },
      { question: 'Chi phí thang máy hố xây như thế nào?', answer: 'Giá khởi điểm từ 275 - 290 triệu đồng cho nhà 2-3 tầng, là phương án kinh tế nhất trong các dòng thang máy.' },
    ],
    relatedProjects: ['landmark-office', 'vinmec-times-city'],
  },
  {
    id: 'f4920e71-6a1e-4ca7-a50d-6efd7a5dadda',
    title: 'Thang Máy Khung Thép Vách Kính',
    subtitle: 'Giải pháp thang máy cao cấp cho không gian sống',
    icon: 'home',
    image: 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423677456-x93ehnbq5h.png',
    shortDescription: 'Thiết kế sang trọng, tối ưu không gian. Phù hợp với nhà phố, biệt thự với cabin kính toàn phần hoặc inox mờ cao cấp.',
    fullDescription: `Thang máy khung thép vách kính Hải Phát mang lại tầm nhìn Panorama 360 độ thoáng đãng và truyền sáng tự nhiên từ giếng trời. Với hố PIT siêu nông chỉ từ 600mm không phá vỡ kết cấu móng bè, khung thép định hình lắp ghép bu-lông sạch sẽ chỉ 5-7 ngày, đây là giải pháp số 1 cho nhà biệt thự và nhà cải tạo đang ở.`,
    features: [
      'Cabin kính cường lực cao cấp',
      'Cửa mở tự động êm ái',
      'Hệ thống an toàn đa điểm',
      'Vận hành siêu êm < 45dB',
      'Đèn LED tiết kiệm điện',
      'Màn hình hiển thị tầng số',
      'Hệ thống báo động tự động',
      'Chống quá tải thông minh',
    ],
    gallery: [
      'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423681161-qenl4co6hv.png',
      'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423685133-hpycnsw9stp.png',
      'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423692032-5i0hisx4uya.png',
    ],
    specifications: [
      { label: 'Số tầng tối đa', value: '6 tầng' },
      { label: 'Tải trọng', value: '350 - 650 kg' },
      { label: 'Kích thước cabin', value: '900 - 1000 mm' },
      { label: 'Công suất', value: '1.0 - 1.5 m/s' },
      { label: 'Bảo hành', value: '18 tháng' },
      { label: 'Bảo trì', value: '2 tháng/lần' },
    ],
    benefits: [
      'Tăng giá trị bất động sản lên 15-20%',
      'Tiện lợi cho người già và trẻ nhỏ',
      'Vận chuyển đồ đạc dễ dàng',
      'Không gian sang trọng, đẳng cấp',
      'Tiết kiệm thời gian di chuyển',
      'An toàn với hệ thống đa lớp',
    ],
    process: [
      { step: 1, title: 'Khảo sát hiện trạng', description: 'Đo đạc lòng cầu thang bộ hoặc giếng trời, kiểm tra độ nông hố PIT.' },
      { step: 2, title: 'Lên bản vẽ 3D', description: 'Phối cảnh khung thép định hình sơn tĩnh điện hoặc mạ PVD kết hợp vách kính.' },
      { step: 3, title: 'Gia công chính xác', description: 'Sản xuất khung thép module tại xưởng bằng công nghệ cắt laser CNC.' },
      { step: 4, title: 'Lắp ráp tại công trình', description: 'Dựng khung bu-lông và lắp ráp vách kính siêu tốc 5–7 ngày không bụi bặm.' },
      { step: 5, title: 'Căn chỉnh & Kiểm định', description: 'Hiệu chỉnh độ êm ái, kiểm định an toàn nghiêm ngặt.' },
      { step: 6, title: 'Bàn giao & Bảo hành', description: 'Bảo hành 18 tháng, chăm sóc kỹ thuật 24/7.' },
    ],
    faqs: [
      { question: 'Nhà đang ở cải tạo có lắp được thang máy kính không?', answer: 'Hoàn toàn được. Hố PIT chỉ cần sâu từ 600mm nên không đụng chạm đến móng bè chống thấm của nhà.' },
      { question: 'Lắp giữa lòng cầu thang bộ có bị bí không?', answer: 'Không, kính cường lực 4 mặt trong suốt đón trọn ánh sáng tự nhiên từ trên nóc nhà xuống các tầng.' },
      { question: 'Giá thang khung thép vách kính từ bao nhiêu?', answer: 'Giá trọn gói từ 380 triệu đồng cho nhà 2 tầng bao gồm khung thép, vách kính cường lực và thiết bị.' },
    ],
    relatedProjects: ['villa-ecopark', 'house-thao-dien'],
  },
];
