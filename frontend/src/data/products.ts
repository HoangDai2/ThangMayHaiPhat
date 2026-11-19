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
    title: 'Thang máy hố xây gia đình',
    subtitle: 'Giải pháp tối ưu cho nhà phố, biệt thự và công trình nhiều tầng',
    icon: 'building',
    image: 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435936672-mrkll2obexe.png',
    shortDescription: 'Hải Phát lắp thang máy hố xây tải 350–650 kg, cabin gia công theo kích thước hố thật của từng nhà.',
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
      { label: 'Số tầng tối đa', value: '9 tầng' },
      { label: 'Tải trọng', value: '350 - 650 kg' },
      { label: 'Kích thước cabin', value: 'Hố từ 1300×1300 mm' },
      { label: 'Công suất', value: '1.0 - 1.5 m/s' },
      { label: 'Bảo hành', value: '18 tháng' },
      { label: 'Bảo trì', value: '2 tháng/lần' },
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
      { question: 'Chi phí thang máy hố xây như thế nào?', answer: 'Giá khởi điểm từ 290 triệu đồng cho nhà 3 tầng, cabin inox tiêu chuẩn.' },
    ],
    relatedProjects: ['landmark-office', 'vinmec-times-city'],
  },
  {
    id: 'f4920e71-6a1e-4ca7-a50d-6efd7a5dadda',
    title: 'Thang máy khung thép vách kính',
    subtitle: 'Đón trọn ánh sáng tự nhiên qua giếng trời, thẩm mỹ sang trọng',
    icon: 'home',
    image: 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423677456-x93ehnbq5h.png',
    shortDescription: 'Thang máy kính hố thép định hình, cabin 4 mặt kính cường lực đón trọn ánh sáng tự nhiên qua giếng trời.',
    fullDescription: `Thang máy khung thép vách kính Hải Phát là sự kết hợp hoàn mỹ giữa kỹ thuật cơ khí chính xác và nghệ thuật kiến trúc hiện đại, nâng tầm đẳng cấp không gian sống cho gia chủ. Kết cấu khung thép định hình chịu lực cao kết hợp 4 mặt kính cường lực an toàn trong suốt mở ra tầm nhìn Panorama 360 độ thoáng đãng.`,
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
      { label: 'Đặc tính', value: 'Kính an toàn 2 lớp' },
      { label: 'Vị trí lắp', value: 'Trong nhà & giếng trời' },
      { label: 'Thời gian lắp', value: 'Lắp đặt 5–7 ngày' },
      { label: 'Bảo hành', value: '18 tháng' },
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
      { question: 'Giá thang khung thép vách kính từ bao nhiêu?', answer: 'Giá trọn gói từ 380 triệu đồng cho nhà 2 tầng bao gồm khung thép định hình và vách kính.' },
    ],
    relatedProjects: ['villa-ecopark', 'house-thao-dien'],
  },
  {
    id: '0857710f-a18b-474c-a736-9ff60cf39642',
    title: 'Thang máy không hố pit (thang máy mini)',
    subtitle: 'Hố PIT siêu nông từ 200mm – dòng thang cứu cánh cho nhà cải tạo',
    icon: 'home',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Thang máy không hố pit – còn gọi là thang máy nhỏ gọn – là dòng thang cứu cánh cho nhà cải tạo đang ở.',
    fullDescription: 'Thang máy gia đình Homelift mini Hải Phát được thiết kế chuyên biệt cho các công trình nhà ở gia đình, biệt thự, nhà phố với hố pit chỉ từ 200mm, không cần đào móng bè.',
    features: [
      'Không cần phòng máy cồng kềnh',
      'Hố PIT siêu nông chỉ từ 200mm',
      'Động cơ Gearless tiết kiệm 40% điện',
      'Vận hành siêu êm ái < 45dB',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    ],
    specifications: [
      { label: 'Hố PIT', value: 'Hố pit chỉ từ 200 mm' },
      { label: 'Hiện trạng', value: 'Nhà đã hoàn thiện' },
      { label: 'Nguồn điện', value: 'Điện 1 pha 220V' },
      { label: 'Tải trọng', value: '250kg - 450kg (3 - 6 người)' },
    ],
    benefits: [
      'Tăng giá trị bất động sản',
      'Thuận tiện di chuyển cho người lớn tuổi',
      'An toàn tuyệt đối chuẩn Châu Âu',
    ],
    process: [],
    faqs: [
      { question: 'Giá thang máy mini bao nhiêu?', answer: 'Giá thang homelift mini không hố pit khởi điểm từ 320 triệu đồng.' },
    ],
    relatedProjects: [],
  },
  {
    id: '9534651f-b83f-49c0-8cb2-6efea1f0017e',
    title: 'Thang máy tải khách & tải hàng công nghiệp',
    subtitle: 'Tải trọng lớn cho nhà xưởng, showroom, văn phòng và khách sạn',
    icon: 'building',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Giải pháp di chuyển chuyên nghiệp, tải trọng lớn cho nhà xưởng, showroom, văn phòng và khách sạn.',
    fullDescription: 'Dòng thang máy tải khách và hàng hóa tiêu chuẩn quốc tế dành cho cao ốc, văn phòng, nhà xưởng công nghiệp.',
    features: [
      'Tốc độ cao từ 1.0m/s đến 2.5m/s',
      'Hệ điều khiển vi xử lý 32-bit thông minh',
      'Tiết kiệm năng lượng chuẩn A+++',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    ],
    specifications: [
      { label: 'Tải trọng', value: 'Tải 500 - 3.000kg' },
      { label: 'Lưu lượng', value: 'Lưu thông lớn' },
      { label: 'Tiêu chuẩn', value: 'Tiêu chuẩn quốc tế' },
    ],
    benefits: [
      'Tối ưu thời gian chờ đợi',
      'Tiết kiệm chi phí bảo trì lâu dài',
    ],
    process: [],
    faqs: [
      { question: 'Giá thang máy tải khách công nghiệp bao nhiêu?', answer: 'Chi phí thang máy tải khách & hàng công nghiệp từ 320 triệu đồng.' },
    ],
    relatedProjects: [],
  },
  {
    id: 'a5e0fdd9-d5f4-448f-b74b-b01034da3ec6',
    title: 'Thang máy kính quan sát Panorama',
    subtitle: 'Nâng tầm đẳng cấp kiến trúc không gian mở 360 độ',
    icon: 'eye',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Thiết kế 4 mặt kính cường lực trong suốt, mang lại trải nghiệm ngắm nhìn toàn cảnh độc đáo.',
    fullDescription: 'Thang máy kính Panorama là sự kết hợp hoàn hảo giữa công nghệ hiện đại và nghệ thuật kiến trúc. Cabin kính trong suốt mang lại cảm giác thông thoáng, tận dụng tối đa ánh sáng tự nhiên.',
    features: [
      'Kính an toàn 2 lớp cường lực',
      'Khung hợp kim nhôm Anode hoặc Inox gương vàng',
      'Đèn LED trần đổi màu ambient',
      'View 360 độ toàn cảnh',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    ],
    specifications: [
      { label: 'Tải trọng', value: '300kg - 630kg' },
      { label: 'Tốc độ', value: '0.5m/s - 1.0m/s' },
      { label: 'Loại kính', value: 'Kính dán an toàn 10.38mm' },
    ],
    benefits: [
      'Tạo điểm nhấn thị giác đẳng cấp',
      'Không gian thoáng đãng không bị bí bách',
    ],
    process: [],
    faqs: [
      { question: 'Giá thang máy kính Panorama bao nhiêu?', answer: 'Giá thang máy kính Panorama từ 380 triệu đồng.' },
    ],
    relatedProjects: [],
  },
  {
    id: 'cf54fb82-40b2-4800-a9d9-8b43c3fa6aa0',
    title: 'Thang máy quan sát ngoài trời',
    subtitle: 'Thang máy kính toàn cảnh cho kiến trúc nổi bật',
    icon: 'eye',
    image: 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786420808857-lsr5o68sgjc.jpg',
    shortDescription: 'Thang máy kính toàn cảnh lắp ngoài công trình, mang lại điểm nhấn kiến trúc độc đáo và trải nghiệm thị giác ấn tượng cho người sử dụng.',
    fullDescription: 'Thang máy quan sát Hải Phát được thiết kế với cabin kính toàn cảnh, lắp đặt bên ngoài các công trình cao tầng như khách sạn, trung tâm thương mại, tòa nhà văn phòng và các công trình biểu tượng.',
    features: [
      'Cabin kính cường lực toàn cảnh 360°',
      'Kính an toàn đa lớp dày 12mm+',
      'Hệ thống chiếu sáng LED trang trí',
      'Đối trọng ẩn không cản tầm nhìn',
      'Vận hành êm ái, chống rung',
    ],
    gallery: [
      'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786421642006-aokmt4tkt19.jpg',
    ],
    specifications: [
      { label: 'Số tầng tối đa', value: '9 tầng' },
      { label: 'Tải trọng', value: '350 - 650 kg' },
      { label: 'Kính cabin', value: 'Kính cường lực 10 - 12 mm' },
      { label: 'Bảo hành', value: '18 tháng' },
    ],
    benefits: [
      'Tăng giá trị thẩm mỹ công trình',
      'Điểm nhấn kiến trúc độc đáo',
    ],
    process: [],
    faqs: [
      { question: 'Giá thang máy quan sát ngoài trời bao nhiêu?', answer: 'Giá thang máy quan sát ngoài trời từ 360 triệu đồng.' },
    ],
    relatedProjects: ['sheraton-da-nang', 'landmark-office'],
  },
];
