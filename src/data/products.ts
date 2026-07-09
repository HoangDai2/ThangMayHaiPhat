export interface Product {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
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
    id: 'thang-homelift',
    title: 'Thang Homelift',
    subtitle: 'Giải pháp thang máy cao cấp cho không gian sống',
    icon: 'home',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    shortDescription: 'Thiết kế sang trọng, tối ưu không gian. Phù hợp với nhà phố, biệt thự với cabin kính toàn phần hoặc inox mờ cao cấp.',
    fullDescription: `Thang Homelift Hải Phát được thiết kế riêng biệt cho từng không gian sống, mang đến sự tiện nghi và đẳng cấp cho gia đình bạn. Với công nghệ tiên tiến từ các thương hiệu hàng đầu thế giới như Mitsubishi, Otis, Schindler, chúng tôi cam kết mang đến sản phẩm chất lượng cao với vận hành êm ái, an toàn tuyệt đối.

Dòng thang Homelift của chúng tôi phù hợp với nhiều kiểu kiến trúc khác nhau - từ nhà phố liền kề, biệt thự cổ điển đến biệt thự hiện đại. Cabin có thể tùy chỉnh với nhiều vật liệu cao cấp: kính cường lực trong suốt, inox mờ, gỗ tự nhiên hay laminate chống trầy xước.`,
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
    specifications: [
      { label: 'Tải trọng', value: '250kg - 630kg (3-8 người)' },
      { label: 'Tốc độ', value: '0.4 - 1.0 m/s' },
      { label: 'Số tầng', value: 'Tối đa 12 tầng' },
      { label: 'Kích thước cabin', value: 'Từ 1.0m x 1.2m' },
      { label: 'Công suất motor', value: '2.2 - 5.5 kW' },
      { label: 'Điện áp', value: '220V/380V, 50Hz' },
      { label: 'Bảo hành', value: '18 tháng toàn bộ' },
      { label: 'Bảo trì', value: 'Miễn phí 2 tháng/lần' },
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
      { step: 1, title: 'Khảo sát & Tư vấn', description: 'Đội ngũ kỹ sư giàu kinh nghiệm sẽ đến khảo sát hiện trạng, đo đạc không gian và tư vấn giải pháp phù hợp nhất.' },
      { step: 2, title: 'Thiết kế & Báo giá', description: 'Lên bản vẽ kỹ thuật 3D, phối cảnh nội thất và báo giá chi tiết từng hạng mục.' },
      { step: 3, title: 'Ký hợp đồng & Đặt hàng', description: 'Ký hợp đồng với điều khoản rõ ràng, đặt cọc và tiến hành đặt thiết bị từ nhà sản xuất.' },
      { step: 4, title: 'Thi công lắp đặt', description: 'Đội ngũ kỹ thuật được đào tạo bài bản thi công lắp đặt theo tiêu chuẩn, đúng tiến độ cam kết.' },
      { step: 5, title: 'Nghiệm thu & Bàn giao', description: 'Vận hành thử, kiểm tra an toàn, hướng dẫn sử dụng và bàn giao cho khách hàng.' },
      { step: 6, title: 'Bảo trì & Hậu mãi', description: 'Hỗ trợ kỹ thuật 24/7, bảo trì định kỳ miễn phí và cung cấp phụ tùng chính hãng.' },
    ],
    faqs: [
      { question: 'Nhà tôi diện tích nhỏ, có lắp được thang máy không?', answer: 'Có thể. Chúng tôi có các dòng Homelift mini với kích thước cabin chỉ từ 1.0m x 1.2m, phù hợp với nhà phố nhỏ.' },
      { question: 'Thời gian lắp đặt mất bao lâu?', answer: 'Từ 7-14 ngày làm việc tùy theo độ phức tạp của công trình và điều kiện hiện trạng.' },
      { question: 'Thang Homelift tốn nhiều điện không?', answer: 'Không. Thang tiêu thụ khoảng 2-5 kWh/ngày, tương đương chi phí 5,000-12,000 VND/ngày.' },
      { question: 'Bảo hành như thế nào?', answer: 'Bảo hành 18 tháng toàn bộ thiết bị, bảo trì miễn phí 2 tháng/lần trong thời gian bảo hành, hỗ trợ kỹ thuật 24/7.' },
    ],
    relatedProjects: ['villa-ecopark', 'house-thao-dien'],
  },
  {
    id: 'thang-may-tai-khach',
    title: 'Thang Máy Tải Khách',
    subtitle: 'Hiệu suất cao cho tòa nhà văn phòng và chung cư',
    icon: 'building',
    image: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    shortDescription: 'Giải pháp lý tưởng cho tòa nhà, văn phòng, bệnh viện, khách sạn. Tải trọng lớn, vận hành êm ái, đáp ứng tiêu chuẩn QCVN và EN 81.',
    fullDescription: `Thang máy tải khách Hải Phát là giải pháp vận chuyển tối ưu cho các công trình thương mại, văn phòng, chung cư cao tầng với lưu lượng người lớn. Với công nghệ điều khiển nhóm thông minh, hệ thống phân bổ luồng người tự động giúp giảm thời gian chờ đợi và tăng hiệu suất vận hành.

Chúng tôi cung cấp các dòng thang từ tốc độ tiêu chuẩn 1.0 m/s đến tốc độ cao 2.5 m/s cho các tòa nhà cao tầng. Thiết kế cabin hiện đại với nhiều lựa chọn nội thất cao cấp, đáp ứng mọi yêu cầu thẩm mỹ khắt khe nhất.`,
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
    specifications: [
      { label: 'Tải trọng', value: '630kg - 2000kg (8-26 người)' },
      { label: 'Tốc độ', value: '1.0 - 4.0 m/s' },
      { label: 'Số tầng', value: 'Tối đa 50 tầng' },
      { label: 'Kích thước cabin', value: 'Từ 1.4m x 1.6m' },
      { label: 'Công suất motor', value: '7.5 - 30 kW' },
      { label: 'Điện áp', value: '380V, 50Hz' },
      { label: 'Bảo hành', value: '18 tháng thiết bị' },
      { label: 'Bảo trì', value: '2 tháng/lần trong BH' },
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
      { step: 1, title: 'Tư vấn giải pháp', description: 'Phân tích nhu cầu, lưu lượng người và đặc điểm công trình để đề xuất số lượng và loại thang phù hợp.' },
      { step: 2, title: 'Thiết kế hệ thống', description: 'Thiết kế bố trí thang máy, giếng thang, máy phòng với bản vẽ chi tiết 2D/3D.' },
      { step: 3, title: 'Cung cấp thiết bị', description: 'Nhập khẩu thiết bị chính hãng từ các nhà sản xuất uy tín, đầy đủ CO, CQ.' },
      { step: 4, title: 'Lắp đặt & Vận hành', description: 'Lắp đặt theo tiêu chuẩn QCVN 06:2022, vận hành thử và hiệu chỉnh trước khi bàn giao.' },
      { step: 5, title: 'Đào tạo & Bàn giao', description: 'Đào tạo vận hành cho nhân viên tòa nhà, cung cấp tài liệu và chứng nhận kiểm định.' },
      { step: 6, title: 'Bảo trì chuyên nghiệp', description: 'Hợp đồng bảo trì định kỳ, cung cấp phụ tùng thay thế, hỗ trợ khẩn cấp 24/7.' },
    ],
    faqs: [
      { question: 'Bao nhiêu thang máy cho tòa nhà 20 tầng?', answer: 'Phụ thuộc vào mật độ người. Trung bình cần 1 thang cho mỗi 50-70 người, tối thiểu 2 thang cho tòa nhà trên 10 tầng.' },
      { question: 'Thang máy tốc độ cao có an toàn không?', answer: 'Có. Thang máy tốc độ cao được trang bị hệ thống phanh đa lớp, bộ điều tốc độc lập và cảm biến an toàn đầy đủ theo chuẩn EN 81.' },
      { question: 'Chi phí bảo trì hàng năm khoảng bao nhiêu?', answer: 'Chi phí bảo trì khoảng 8-15 triệu/tháng cho một thang máy, tùy vào số lượng tầng và điều kiện vận hành.' },
      { question: 'Có tích hợp được với hệ thống BMS không?', answer: 'Có. Thang máy của chúng tôi hỗ trợ giao thức giao tiếp chuẩn, dễ dàng tích hợp với hệ thống quản lý tòa nhà.' },
    ],
    relatedProjects: ['landmark-office', 'vinmec-times-city'],
  },
  {
    id: 'thang-may-tai-hang',
    title: 'Thang Máy Tải Hàng',
    subtitle: 'Giải pháp vận chuyển hàng hóa công nghiệp',
    icon: 'truck',
    image: 'https://images.pexels.com/photos/3557590/pexels-photo-3557590.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    shortDescription: 'Thang máy chuyên dụng cho nhà kho, nhà máy sản xuất, bệnh viện với tải trọng lớn và sàn cabin chịu lực cao.',
    fullDescription: `Thang máy tải hàng Hải Phát được thiết kế chuyên biệt cho các nhu cầu vận chuyển hàng hóa trong nhà kho, nhà xưởng, bệnh viện. Với sàn cabin bằng thép chịu lực hoặc gạch granit dày, hệ thống cửa chắn gờ chắc chắn, tải trọng từ 1000kg đến 5000kg.

Dòng thang tải hàng có thể tùy chỉnh theo nhu cầu đặc biệt: thang chở xe đẩy, thang tải ô tô, thang chuyên dụng cho bệnh viện với kích thước cabin lớn để vận chuyển giường bệnh.`,
    features: [
      'Sàn cabin chịu lực cao',
      'Cửa chắn gờ 2 lớp',
      'Tải trọng lên đến 5000kg',
      'Điều khiển từ cabin',
      'Hệ thống cân bằng tự động',
      'Chống rung êm ái',
      'An toàn quá tải',
      'Dễ vệ sinh sàn',
    ],
    specifications: [
      { label: 'Tải trọng', value: '1000kg - 5000kg' },
      { label: 'Tốc độ', value: '0.25 - 1.0 m/s' },
      { label: 'Kích thước cabin', value: 'Tùy chỉnh theo nhu cầu' },
      { label: 'Sàn cabin', value: 'Thép / Gạch granit dày' },
      { label: 'Cửa', value: 'Cửa kéo / Cửa mở tay' },
      { label: 'Động cơ', value: 'AC 3 pha, 380V' },
      { label: 'Bảo hành', value: '3 năm thiết bị' },
      { label: 'Bảo trì', value: '2 tháng/lần trong BH' },
    ],
    benefits: [
      'Vận chuyển hàng nặng dễ dàng',
      'Tăng năng suất kho bãi',
      'An toàn cho người và hàng',
      'Tiết kiệm chi phí nhân công',
      'Vận hành bền bỉ 24/7',
      'Dễ dàng tích hợp hệ thống',
    ],
    process: [
      { step: 1, title: 'Đánh giá nhu cầu', description: 'Xác định tải trọng, kích thước hàng hóa và tần suất vận chuyển để thiết kế phù hợp.' },
      { step: 2, title: 'Thiết kế kỹ thuật', description: 'Thiết kế kết cấu giếng thang, máy phòng và cabin theo tiêu chuẩn chịu lực.' },
      { step: 3, title: 'Chế tạo đặc biệt', description: 'Chế tạo cabin, khung đối trọng và hệ thống cửa chịu lực cao.' },
      { step: 4, title: 'Lắp đặt & Kiểm tra', description: 'Lắp đặt hệ thống, kiểm tra tải trọng và vận hành thử nghiệm.' },
      { step: 5, title: 'Đào tạo vận hành', description: 'Đào tạo vận hành an toàn, quy trình load hàng và xử lý sự cố.' },
      { step: 6, title: 'Bảo trì định kỳ', description: 'Bảo trì định kỳ thay thế các chi tiết chịu lực, đảm bảo vận hành an toàn.' },
    ],
    faqs: [
      { question: 'Thang tải hàng khác thang tải khách thế nào?', answer: 'Thang tải hàng có sàn chịu lực cao, tốc độ chậm hơn, cửa chắn gờ và không có yêu cầu thẩm mỹ nội thất.' },
      { question: 'Có chở được xe tải không?', answer: 'Có dòng thang tải ô tô chuyên dụng với tải trọng 3000-5000kg và kích thước cabin đủ cho xe bán tải.' },
      { question: 'Bảo trì thang tải hàng khác gì thang thường?', answer: 'Bảo trì tập trung vào các chi tiết chịu lực: cáp, rulo, ray dẫn hướng, thay thế định kỳ theo khuyến nghị.' },
      { question: 'Thang tải hàng chạy 24/7 được không?', answer: 'Có với dòng công nghiệp. Thang được thiết kế vận hành liên tục với hệ thống làm mát motor riêng.' },
    ],
    relatedProjects: ['vinmec-times-city'],
  },
  {
    id: 'thang-may-quan-sat',
    title: 'Thang Máy Quan Sát',
    subtitle: 'Thang máy kính toàn cảnh cho kiến trúc nổi bật',
    icon: 'eye',
    image: 'https://images.pexels.com/photos/32260201/pexels-photo-32260201.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    shortDescription: 'Thang máy kính toàn cảnh lắp ngoài công trình, mang lại điểm nhấn kiến trúc độc đáo và trải nghiệm thị giác ấn tượng cho người sử dụng.',
    fullDescription: `Thang máy quan sát Hải Phát được thiết kế với cabin kính toàn cảnh, lắp đặt bên ngoài các công trình cao tầng như khách sạn, trung tâm thương mại, tòa nhà văn phòng và các công trình biểu tượng. Với tầm nhìn 360 độ, thang máy quan sát không chỉ là phương tiện di chuyển mà còn là một điểm nhấn kiến trúc độc đáo, nâng tầm giá trị thẩm mỹ cho công trình.

Cabin kính được chế tạo từ kính cường lực an toàn đa lớp, chịu được chênh lệch áp suất và điều kiện thời tiết khắc nghiệt. Hệ thống dẫn hướng và đối trọng được bố trí khéo léo để không cản trở tầm nhìn, kết hợp với hệ thống chiếu sáng LED tạo hiệu ứng ánh sáng ấn tượng về đêm.`,
    features: [
      'Cabin kính cường lực toàn cảnh 360°',
      'Kính an toàn đa lớp dày 12mm+',
      'Hệ thống chiếu sáng LED trang trí',
      'Đối trọng ẩn không cản tầm nhìn',
      'Vận hành êm ái, chống rung',
      'Chống tia UV, cách nhiệt',
      'Thiết kế chịu điều kiện thời tiết',
      'Hiệu ứng ánh sáng ban đêm',
    ],
    specifications: [
      { label: 'Tải trọng', value: '630kg - 1600kg (8-21 người)' },
      { label: 'Tốc độ', value: '1.0 - 2.5 m/s' },
      { label: 'Số tầng', value: 'Tối đa 40 tầng' },
      { label: 'Kính cabin', value: 'Kính cường lực dày 12-19mm' },
      { label: 'Kiểu lắp', value: 'Ngoài công trình / Trong atrium' },
      { label: 'Điện áp', value: '380V, 50Hz' },
      { label: 'Bảo hành', value: '18 tháng toàn bộ' },
      { label: 'Bảo trì', value: '2 tháng/lần trong BH' },
    ],
    benefits: [
      'Tăng giá trị thẩm mỹ công trình',
      'Điểm nhấn kiến trúc độc đáo',
      'Trải nghiệm thị giác ấn tượng',
      'Thu hút khách hàng, tăng doanh thu',
      'Tối ưu ánh sáng tự nhiên',
      'Nâng tầm thương hiệu tòa nhà',
    ],
    process: [
      { step: 1, title: 'Khảo sát kiến trúc', description: 'Đánh giá kết cấu công trình, vị trí lắp đặt và phong cách kiến trúc để đề xuất giải pháp phù hợp.' },
      { step: 2, title: 'Thiết kế phối cảnh', description: 'Thiết kế 3D phối cảnh cabin và vị trí lắp đặt, đảm bảo hài hòa với kiến trúc tổng thể.' },
      { step: 3, title: 'Chế tạo kính cabin', description: 'Chế tạo cabin kính cường lực theo thiết kế riêng, kiểm tra chất lượng kính đa lớp.' },
      { step: 4, title: 'Lắp đặt kết cấu', description: 'Lắp đặt khung giá, ray dẫn hướng và hệ thống đối trọng ẩn, đảm bảo không cản trở tầm nhìn.' },
      { step: 5, title: 'Lắp cabin & Hiệu chỉnh', description: 'Lắp cabin kính, hệ thống chiếu sáng LED, vận hành thử và hiệu chỉnh độ êm.' },
      { step: 6, title: 'Bàn giao & Bảo trì', description: 'Nghiệm thu, bàn giao và ký hợp đồng bảo trì định kỳ, hỗ trợ kỹ thuật 24/7.' },
    ],
    faqs: [
      { question: 'Thang kính có an toàn khi gặp sự cố không?', answer: 'Có. Kính cường lực đa lớp chịu lực cao, không vỡ thành mảnh nhọn. Thang còn có hệ thống phanh khẩn cấp và bộ điều tốc độc lập.' },
      { question: 'Thang quan sát lắp ngoài có bị ảnh hưởng thời tiết?', answer: 'Không. Kính và khung được thiết kế chịu điều kiện thời tiết khắc nghiệt, chống tia UV, cách nhiệt và chống ăn mòn.' },
      { question: 'Có lắp được cho tòa nhà đang hoạt động không?', answer: 'Có. Chúng tôi có phương án lắp ngoài công trình không ảnh hưởng đến hoạt động bên trong, thi công nhanh chóng.' },
      { question: 'Bảo trì thang kính có phức tạp hơn không?', answer: 'Hơi. Ngoài bảo trì tiêu chuẩn, cần vệ sinh kính định kỳ và kiểm tra độ kín khít, nhưng chi phí không chênh lệch nhiều.' },
    ],
    relatedProjects: ['sheraton-da-nang', 'landmark-office'],
  },
  {
    id: 'thang-may-benh-vien',
    title: 'Thang Máy Bệnh Viện',
    subtitle: 'Thang máy y tế chuyên dụng cho giường bệnh và băng ca',
    icon: 'heart-pulse',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    shortDescription: 'Thang máy y tế chuyên dụng với cabin rộng, sàn chịu lực cao, vận chuyển giường bệnh, băng ca và thiết bị y tế an toàn, êm ái.',
    fullDescription: `Thang máy bệnh viện Hải Phát được thiết kế chuyên biệt cho các cơ sở y tế như bệnh viện, phòng khám, trung tâm chăm sóc sức khỏe. Với cabin rộng rãi để vận chuyển giường bệnh, băng ca, xe lăn và thiết bị y tế cồng kềnh, sàn cabin chịu lực cao và vận hành êm ái đặc biệt để đảm bảo sự thoải mái cho bệnh nhân.

Thang máy bệnh viện tuân thủ các tiêu chuẩn y tế khắt khe: hệ thống cửa mở rộng để giường bệnh ra vào dễ dàng, chế độ vận hành êm ái đặc biệt giảm tối đa rung động, hệ thống ưu tiên cho ca khẩn cấp, và khả năng tích hợp với hệ thống điều hành trung tâm của bệnh viện.`,
    features: [
      'Cabin rộng cho giường bệnh & băng ca',
      'Cửa mở rộng êm ái',
      'Sàn chịu lực cao, chống trượt',
      'Vận hành siêu êm cho bệnh nhân',
      'Chế độ ưu tiên ca khẩn cấp',
      'Hệ thống khử khuẩn UV (tùy chọn)',
      'Bảng điều khiển chống khuẩn',
      'Tích hợp hệ thống điều hành bệnh viện',
    ],
    specifications: [
      { label: 'Tải trọng', value: '1000kg - 2500kg' },
      { label: 'Tốc độ', value: '0.5 - 1.6 m/s' },
      { label: 'Kích thước cabin', value: 'Từ 1.4m x 2.4m' },
      { label: 'Cửa', value: 'Mở tự động 2 cánh rộng' },
      { label: 'Sàn cabin', value: 'Gạch chống trượt y tế' },
      { label: 'Điện áp', value: '380V, 50Hz + UPS dự phòng' },
      { label: 'Bảo hành', value: '18 tháng thiết bị' },
      { label: 'Bảo trì', value: '2 tháng/lần trong BH' },
    ],
    benefits: [
      'Vận chuyển giường bệnh an toàn',
      'Ưu tiên ca khẩn cấp kịp thời',
      'Bệnh nhân thoải mái, ít rung động',
      'Vệ sinh, chống khuẩn dễ dàng',
      'Vận hành liên tục 24/7',
      'Đáp ứng tiêu chuẩn y tế',
    ],
    process: [
      { step: 1, title: 'Khảo sát cơ sở y tế', description: 'Đánh giá nhu cầu vận chuyển, kích thước giường bệnh, luồng di chuyển và quy trình khẩn cấp của bệnh viện.' },
      { step: 2, title: 'Thiết kế chuyên biệt', description: 'Thiết kế cabin rộng, cửa mở rộng, sàn chịu lực và hệ thống ưu tiên ca khẩn cấp theo tiêu chuẩn y tế.' },
      { step: 3, title: 'Cung cấp thiết bị', description: 'Nhập khẩu thiết bị chính hãng với đầy đủ CO/CQ, đáp ứng tiêu chuẩn y tế quốc tế.' },
      { step: 4, title: 'Lắp đặt & Tích hợp', description: 'Lắp đặt theo tiến độ không ảnh hưởng hoạt động bệnh viện, tích hợp hệ thống điều hành trung tâm.' },
      { step: 5, title: 'Vận hành thử & Đào tạo', description: 'Vận hành thử với giường bệnh, đào tạo nhân viên y tế vận hành và xử lý tình huống khẩn cấp.' },
      { step: 6, title: 'Bảo trì chuyên nghiệp', description: 'Bảo trì định kỳ với đội ngũ túc trực 24/7, phản ứng sự cố trong vòng 1 giờ cho cơ sở y tế.' },
    ],
    faqs: [
      { question: 'Thang bệnh viện khác thang tải khách thế nào?', answer: 'Cabin rộng hơn để chở giường bệnh, cửa mở rộng, sàn chịu lực cao, vận hành êm ái hơn và có chế độ ưu tiên ca khẩn cấp.' },
      { question: 'Có vận chuyển được giường ICU không?', answer: 'Có. Cabin được thiết kế rộng đủ cho giường ICU cùng thiết bị y tế đi kèm, với tải trọng từ 1600kg trở lên.' },
      { question: 'Thang có hoạt động khi mất điện không?', answer: 'Có. Hệ thống UPS dự phòng và phát điện dự phòng đảm bảo thang vận hành liên tục trong sự cố mất điện.' },
      { question: 'Thời gian phản ứng sự cố là bao lâu?', answer: 'Với cơ sở y tế, chúng tôi cam kết phản ứng trong vòng 1 giờ tại nội thành và 2 giờ tại các tỉnh lân cận.' },
    ],
    relatedProjects: ['vinmec-times-city'],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(currentId: string, limit: number = 3): Product[] {
  return products.filter((p) => p.id !== currentId).slice(0, limit);
}
