export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
}

export const serviceItems: ServiceItem[] = [
  {
    id: 'khao-sat-bao-gia',
    title: 'Khảo Sát - Báo Giá',
    subtitle: 'Khảo sát hiện trạng và báo giá minh bạch',
    icon: 'clipboard-search',
    shortDescription: 'Đối với sản phẩm đặc thù như thang máy, thang cuốn, mỗi khách hàng, mỗi công trình là mỗi yêu cầu khác nhau. Công ty Thang máy Hải Phát theo đuổi tư duy đặt khách hàng làm trọng tâm, chính xác tận tâm. Thang máy Hải Phát sẽ tiếp nhận những yêu cầu kĩ thuật của khách hàng, phân tích và tư vấn những giải pháp tối ưu nhất cho từng công trình từ khâu lên bản vẽ cho đến lúc thực thi.',
    fullDescription: `Dịch vụ khảo sát và báo giá của Hải Phát là bước đầu tiên trong quy trình cung cấp giải pháp thang máy. Đội ngũ kỹ sư giàu kinh nghiệm sẽ đến tận công trình để khảo sát hiện trạng, đo đạc không gian, đánh giá kết cấu và đề xuất giải pháp phù hợp nhất.

Sau khi khảo sát, chúng tôi cung cấp báo giá chi tiết trong vòng 24 giờ, minh bạch từng hạng mục: thiết bị, vật tư, nhân công, vận hành thử và bảo hành. Không phát sinh chi phí ẩn, cam kết giá tốt nhất thị trường.`,
    highlights: [
      'Khảo sát miễn phí trong 48 giờ',
      'Báo giá chi tiết trong 24 giờ',
      'Đo đạc hiện trạng 3D',
      'Đánh giá kết cấu công trình',
      'Đề xuất giải pháp tối ưu',
      'Cam kết không phát sinh chi phí',
    ],
    process: [
      { step: 1, title: 'Tiếp nhận yêu cầu', description: 'Tiếp nhận thông tin qua hotline, website hoặc email. Ghi nhận nhu cầu, loại công trình và vị trí.' },
      { step: 2, title: 'Khảo sát hiện trường', description: 'Kỹ sư đến tận nơi đo đạc, đánh giá kết cấu, không gian và điều kiện lắp đặt.' },
      { step: 3, title: 'Phân tích & Đề xuất', description: 'Phân tích dữ liệu khảo sát, đề xuất giải pháp kỹ thuật và sản phẩm phù hợp nhất.' },
      { step: 4, title: 'Báo giá chi tiết', description: 'Cung cấp báo giá minh bạch từng hạng mục trong vòng 24 giờ sau khảo sát.' },
    ],
  },
  {
    id: 'tu-van-thiet-ke',
    title: 'Tư Vấn - Thiết Kế',
    subtitle: 'Tư vấn giải pháp và thiết kế kỹ thuật chuyên sâu',
    icon: 'ruler',
    shortDescription: 'Thang máy Hải Phát luôn chú trọng đến việc làm hài lòng khách hàng thông qua dịch vụ tư vấn thiết kế và cung cấp giải pháp toàn diện, hiệu quả. Đội ngũ kĩ sư giàu kinh nghiệm của Công ty sẽ tư vấn công trình đảm bảo khai thác tối đa công năng sử dụng mà vẫn mang tính thẩm mỹ cao, hài hòa kiến trúc nội thất tổng thể của ngôi nhà. Dựa theo diện tích mặt bằng, số tầng và khả năng tài chính của gia chủ. Thang máy Hải Phát giúp quý khách đưa ra lựa chọn dễ dàng và hiệu quả nhất cho từng sản phẩm.',
    fullDescription: `Dịch vụ tư vấn và thiết kế của Hải Phát giúp khách hàng lựa chọn giải pháp thang máy tối ưu cho công trình. Đội ngũ kỹ sư và kiến trúc sư sẽ tư vấn về loại thang, tải trọng, tốc độ, cabin và nội thất phù hợp với nhu cầu và ngân sách.

Sau khi thống nhất giải pháp, chúng tôi thiết kế bản vẽ kỹ thuật chi tiết 2D/3D, phối cảnh cabin, bố trí giếng thang và máy phòng. Thiết kế tuân thủ tiêu chuẩn QCVN 06:2022 và EN 81, đảm bảo an toàn và thẩm mỹ.`,
    highlights: [
      'Tư vấn loại thang & tải trọng phù hợp',
      'Bản vẽ kỹ thuật 2D/3D chi tiết',
      'Phối cảnh cabin & nội thất',
      'Bố trí giếng thang tối ưu',
      'Tuân thủ QCVN 06:2022 & EN 81',
      'Thiết kế tối ưu chi phí',
    ],
    process: [
      { step: 1, title: 'Tư vấn giải pháp', description: 'Phân tích nhu cầu, ngân sách và đặc điểm công trình để đề xuất loại thang phù hợp.' },
      { step: 2, title: 'Thiết kế kỹ thuật', description: 'Thiết kế bản vẽ 2D/3D chi tiết: giếng thang, máy phòng, cabin, hệ thống điện.' },
      { step: 3, title: 'Phối cảnh nội thất', description: 'Thiết kế phối cảnh cabin với nhiều lựa chọn vật liệu và phong cách nội thất.' },
      { step: 4, title: 'Duyệt & Hoàn thiện', description: 'Trình duyệt thiết kế, chỉnh sửa theo ý kiến khách hàng và hoàn thiện bản vẽ thi công.' },
    ],
  },
  {
    id: 'thi-cong-lap-dat',
    title: 'Thi Công - Lắp Đặt',
    subtitle: 'Thi công lắp đặt chuyên nghiệp, đúng tiến độ',
    icon: 'wrench',
    shortDescription: 'An Toàn - Chất Lượng - Tiến Độ - Chi Phí". Đây là bốn tiêu chí đánh giá hiệu quả của công tác thi công lắp đặt do Hải Phát giúp quý khách hàng đưa ra lựa chọn dễ dàng nhằm cải thiện và hoàn thiện chất lượng công trình.ật được đào tạo bài bản, thi công lắp đặt theo tiêu chuẩn quốc tế, đúng tiến độ cam kết, không ảnh hưởng công trình.',
    fullDescription: `Dịch vụ thi công và lắp đặt của Hải Phát được thực hiện bởi đội ngũ kỹ thuật được đào tạo bài bản, có chứng chỉ từ các nhà sản xuất hàng đầu. Chúng tôi thi công theo tiêu chuẩn QCVN 06:2022 và EN 81, đảm bảo an toàn tuyệt đối.

Quá trình thi công được quản lý chặt chẽ, đúng tiến độ cam kết, không gây ảnh hưởng đến hoạt động của công trình. Vận hành thử, hiệu chỉnh và kiểm định trước khi bàn giao, đảm bảo thang vận hành êm ái và an toàn.`,
    highlights: [
      'Đội ngũ kỹ thuật có chứng chỉ',
      'Thi công theo chuẩn QCVN & EN 81',
      'Đúng tiến độ cam kết',
      'Không ảnh hưởng công trình',
      'Vận hành thử & hiệu chỉnh',
      'Kiểm định trước khi bàn giao',
    ],
    process: [
      { step: 1, title: 'Chuẩn bị thi công', description: 'Chuẩn bị vật tư, thiết bị, lập kế hoạch thi công và bảo vệ khu vực làm việc.' },
      { step: 2, title: 'Lắp đặt kết cấu', description: 'Lắp đặt khung giếng, ray dẫn hướng, đối trọng và hệ thống điện theo bản vẽ.' },
      { step: 3, title: 'Lắp cabin & Thiết bị', description: 'Lắp cabin, cửa tầng, motor, bảng điều khiển và hệ thống an toàn.' },
      { step: 4, title: 'Vận hành thử & Bàn giao', description: 'Vận hành thử, hiệu chỉnh, kiểm định và bàn giao cho khách hàng.' },
    ],
  },
  {
    id: 'bao-hanh-bao-tri',
    title: 'Bảo Hành - Bảo Trì',
    subtitle: 'Bảo hành 18 tháng và bảo trì định kỳ 2 tháng/lần',
    icon: 'shield-check',
    shortDescription: `• Định kỳ 02 tháng/lân: kỹ thuật viên Thang máy Hải Phát đến kiểm tra các chức năng của hệ thống thang máy, vệ sinh thang và tra thêm dâu nhớt đảm bảo thang vận hành trơn tru, êm ái. Điều này giúp phát hiện kịp thời rủi ro và tình trạng thiết bị để nhanh chóng có biện pháp khắc phục, giảm thiểu rủi ro.
• Khi phát hiện phụ tùng cần thay thế, chúng tôi khuyến cáo khách hàng sử dụng sản phẩm chính hãng để đạt được mức độ tương thích và đáp ứng cao nhất trong quá trình vận hành, kết hợp đảm bảo chất lượng cho tất cả thiết bị trong hệ thống.
• Đảm bảo an toàn và chất lượng vượt trội: Cung cấp dịch vụ bảo trì NHANH CHÓNG, CHUYÊN NGHIỆP và TẬN TÂM bởi đội ngũ kỹ thuật viên được đào tạo bài bản và kinh nghiệm lâu năm. Giải quyết những khiếu nại của khách hàng trong quá trình sử dụng thang máy qua Call center 24/7.`,
    fullDescription: `Dịch vụ bảo hành và bảo trì của Hải Phát cam kết mang lại sự an tâm tuyệt đối cho khách hàng. Bảo hành 18 tháng toàn bộ thiết bị, bảo trì định kỳ miễn phí 2 tháng/lần trong suốt thời gian bảo hành. Đội ngũ kỹ thuật túc trực 24/7, phản ứng sự cố trong vòng 2 giờ tại nội thành. Cung cấp phụ tùng chính hãng với giá cạnh tranh, kho phụ tùng luôn sẵn các linh kiện thông dụng để đảm bảo thang vận hành ổn định.`,
    highlights: [
      'Bảo hành 18 tháng toàn bộ thiết bị',
      'Bảo trì miễn phí 2 tháng/lần trong thời gian bảo hành',
      'Hỗ trợ kỹ thuật 24/7',
      'Phản ứng sự cố trong 2 giờ',
      'Phụ tùng chính hãng, giá cạnh tranh',
      'Kiểm định định kỳ hàng năm',
    ],
    process: [
      { step: 1, title: 'Ký hợp đồng bảo trì', description: 'Ký hợp đồng bảo trì với gói dịch vụ phù hợp: tiêu chuẩn, nâng cao hoặc cao cấp.' },
      { step: 2, title: 'Bảo trì định kỳ', description: 'Bảo trì định kỳ mỗi 2 tháng, kiểm tra toàn bộ hệ thống, vệ sinh và bôi trơn.' },
      { step: 3, title: 'Xử lý sự cố', description: 'Tiếp nhận sự cố 24/7, phản ứng trong 2 giờ, xử lý nhanh chóng và chuyên nghiệp.' },
      { step: 4, title: 'Kiểm định hàng năm', description: 'Phối hợp đơn vị kiểm định, bảo trì và cấp chứng nhận theo quy định pháp luật.' },
    ],
  },
];

export function getServiceItemById(id: string): ServiceItem | undefined {
  return serviceItems.find((s) => s.id === id);
}
