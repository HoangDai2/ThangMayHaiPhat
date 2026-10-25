"use client";

import { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, PhoneCall, CheckCircle2, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

interface QuickQuoteWidgetProps {
  className?: string;
  onSuccess?: () => void;
}

type ProjectType = 'nhapho' | 'bietthu' | 'toanha';
type CabinType = 'inox' | 'kinh' | 'caocap';
type StatusType = 'xaymoi' | 'caitao' | 'cogieng';

const CONFIG = {
  priceMillion: {
    nhapho: { base: 290, perFloor: 22 },
    bietthu: { base: 330, perFloor: 25 },
    toanha: { base: 400, perFloor: 30 },
  },
  cabinAdd: {
    inox: 0,
    kinh: 35,
    caocap: 80,
  },
  statusAdd: {
    xaymoi: 0,
    caitao: 25,
    cogieng: -10,
  },
  rangeLow: 0.97,
  rangeHigh: 1.10,
};

const TYPE_LABELS: Record<ProjectType, { title: string; desc: string }> = {
  nhapho: { title: 'Nhà phố', desc: 'nhà ống, liền kề' },
  bietthu: { title: 'Biệt thự', desc: 'thang kính, cao cấp' },
  toanha: { title: 'Tòa nhà', desc: 'khách sạn, văn phòng' },
};

const CABIN_LABELS: Record<CabinType, { title: string; desc: string }> = {
  inox: { title: 'Inox', desc: 'tiêu chuẩn' },
  kinh: { title: 'Kính', desc: 'quan sát' },
  caocap: { title: 'Cao cấp', desc: 'gỗ, đá, mạ' },
};

const STATUS_LABELS: Record<StatusType, { title: string; desc: string }> = {
  xaymoi: { title: 'Đang xây', desc: 'chưa hoàn thiện' },
  caitao: { title: 'Đã ở', desc: 'cần cải tạo' },
  cogieng: { title: 'Đã có giếng', desc: 'có sẵn hố thang' },
};

const TYPE_SPECS: Record<ProjectType, { load: string; pit: string; shaft: string }> = {
  nhapho: {
    load: '300 – 400 kg (4 – 5 người)',
    pit: 'Siêu nông từ 600mm',
    shaft: '1350 × 1350 mm',
  },
  bietthu: {
    load: '400 – 450 kg (5 – 6 người)',
    pit: 'Siêu nông từ 600mm',
    shaft: '1500 × 1500 mm',
  },
  toanha: {
    load: '630 – 1000 kg (8 – 13 người)',
    pit: 'Tiêu chuẩn từ 800mm',
    shaft: '1800 × 2000 mm',
  },
};

const CABIN_SPECS: Record<CabinType, { material: string; aesthetic: string }> = {
  inox: {
    material: 'Inox 304 sọc nhuyễn chống vân tay',
    aesthetic: 'Hiện đại, bền bỉ, dễ vệ sinh',
  },
  kinh: {
    material: 'Kính an toàn 2 lớp (Laminated Glass)',
    aesthetic: 'Quan sát Panorama 360°, thoáng sáng',
  },
  caocap: {
    material: 'Ốp gỗ tự nhiên / Mạ Titan vàng gương',
    aesthetic: 'Đẳng cấp hoàng gia, may đo phong thủy',
  },
};

const round5 = (x: number) => Math.round(x / 5) * 5;

export default function QuickQuoteWidget({ className = '', onSuccess }: QuickQuoteWidgetProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selections
  const [type, setType] = useState<ProjectType>('bietthu');
  const [floors, setFloors] = useState<string>('7+');
  const [cabin, setCabin] = useState<CabinType>('inox');
  const [status, setStatus] = useState<StatusType>('xaymoi');

  // Lead inputs
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Calculate dynamic price
  const calcEstimate = () => {
    const floorNum = floors === '7+' ? 7 : parseInt(floors, 10);
    const p = CONFIG.priceMillion[type];
    const est =
      p.base +
      Math.max(0, floorNum - 3) * p.perFloor +
      CONFIG.cabinAdd[cabin] +
      CONFIG.statusAdd[status];

    const low = round5(est * CONFIG.rangeLow);
    const high = round5(est * CONFIG.rangeHigh);
    return `${low} – ${high} triệu`;
  };

  const validatePhone = (v: string) => {
    const cleaned = v.replace(/[\s.\-()]/g, '');
    return /^(0|\+?84)(3|5|7|8|9)\d{8}$/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setSubmitting(true);

    try {
      const { default: api } = await import('../lib/api');
      await api.post('/public/contacts', {
        name: name.trim() || 'Khách hàng',
        phone: phone.trim(),
        service: `Báo giá nhanh: ${TYPE_LABELS[type].title} (${floors} tầng) - Cabin ${CABIN_LABELS[cabin].title}`,
        message: `Ước tính giá: ${calcEstimate()} | Hiện trạng: ${STATUS_LABELS[status].title}`,
      });
    } catch (err: any) {
      console.log('Submission note:', err?.response?.data || err?.message);
    } finally {
      setSubmitting(false);
      setStep(4);
      if (onSuccess) onSuccess();
    }
  };

  const resetForm = () => {
    setStep(1);
    setPhone('');
    setName('');
    setPhoneError(false);
  };

  return (
    <div
      className={`w-full bg-white rounded-3xl border border-slate-200/90 shadow-[0_14px_45px_rgba(15,42,74,0.06)] p-6 sm:p-7 lg:p-8 xl:p-9 flex flex-col justify-between transition-all ${className}`}
    >
      {/* Top Header & Progress */}
      {step < 4 && (
        <div className="mb-4 sm:mb-5">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2A4A] tracking-tight flex items-center gap-2">
              <span>Báo giá nhanh</span>
            </h2>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 font-mono">
              Bước {step}/3
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#1E5AA8] rounded-full transition-all duration-300 ease-out"
              style={{
                width: step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%',
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: Loại công trình & Số tầng */}
      {step === 1 && (
        <div className="flex-1 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-4 sm:space-y-5">
            {/* Loại công trình */}
            <div>
              <label className="block text-sm font-bold text-[#0F2A4A] mb-2">
                Loại công trình
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {(Object.keys(TYPE_LABELS) as ProjectType[]).map((tKey) => {
                  const isSelected = type === tKey;
                  const item = TYPE_LABELS[tKey];
                  return (
                    <button
                      key={tKey}
                      type="button"
                      onClick={() => setType(tKey)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer select-none text-center min-h-[72px] sm:min-h-[78px] ${
                        isSelected
                          ? 'border-[#1E5AA8] bg-[#EEF4FC] text-[#1E5AA8] shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-bold leading-tight ${
                          isSelected ? 'text-[#1E5AA8]' : 'text-[#0F2A4A]'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`text-[11px] sm:text-xs mt-1 leading-tight font-medium ${
                          isSelected ? 'text-[#1E5AA8]/85' : 'text-slate-400'
                        }`}
                      >
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Số tầng */}
            <div>
              <label className="block text-sm font-bold text-[#0F2A4A] mb-2">
                Số tầng (số điểm dừng)
              </label>
              <div className="grid grid-cols-6 gap-2">
                {['2', '3', '4', '5', '6', '7+'].map((fVal) => {
                  const isSelected = floors === fVal;
                  return (
                    <button
                      key={fVal}
                      type="button"
                      onClick={() => setFloors(fVal)}
                      className={`flex items-center justify-center h-11 sm:h-12 rounded-xl border-2 font-bold text-base sm:text-lg transition-all cursor-pointer select-none ${
                        isSelected
                          ? 'border-[#1E5AA8] bg-[#EEF4FC] text-[#1E5AA8] shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {fVal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Architectural Specs Recommendation Box */}
            <div className="bg-slate-50/90 rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F2A4A] uppercase tracking-wider font-mono">
                  <Sparkles size={13} className="text-[#1E5AA8]" />
                  <span>Cấu hình gợi ý: {TYPE_LABELS[type].title} ({floors} tầng)</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full font-mono">
                  Hố PIT {type === 'toanha' ? '800mm' : '600mm'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200/70">
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Tải trọng tối ưu</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-800 font-mono mt-0.5">
                    {TYPE_SPECS[type].load}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200/70">
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Kích thước hố đề xuất</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-800 font-mono mt-0.5">
                    {TYPE_SPECS[type].shaft}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200/70">
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Động cơ công nghệ</div>
                  <div className="text-xs sm:text-[13px] font-bold text-[#1E5AA8] font-mono mt-0.5">
                    Fuji Japan / Montanari Ý
                  </div>
                </div>
                <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200/70">
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Khoảng giá dự kiến</div>
                  <div className="text-xs sm:text-[13px] font-bold text-amber-600 font-mono mt-0.5">
                    {calcEstimate()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 border-t border-slate-200/60">
                <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
                <span>Kỹ sư khảo sát & lên bản vẽ 2D/3D miễn phí trước khi chốt HĐ.</span>
              </div>
            </div>
          </div>

          {/* Action Button & Footnote */}
          <div className="space-y-2 pt-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-[#1E5AA8] hover:bg-[#174C91] text-white font-bold text-base transition-all shadow-md shadow-[#1E5AA8]/20 hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tiếp tục (Chọn kiểu cabin)</span>
              <ArrowRight size={18} />
            </button>
            <p className="text-[11px] text-slate-400 text-center font-medium">
              Cam kết thiết bị chính hãng 100% CO/CQ • Tiêu chuẩn Châu Âu EN 81
            </p>
          </div>
        </div>
      )}

      {/* STEP 2: Kiểu cabin & Hiện trạng nhà */}
      {step === 2 && (
        <div className="flex-1 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-4 sm:space-y-5">
            {/* Kiểu cabin */}
            <div>
              <label className="block text-sm font-bold text-[#0F2A4A] mb-2">
                Kiểu cabin
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {(Object.keys(CABIN_LABELS) as CabinType[]).map((cKey) => {
                  const isSelected = cabin === cKey;
                  const item = CABIN_LABELS[cKey];
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setCabin(cKey)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer select-none text-center min-h-[72px] sm:min-h-[78px] ${
                        isSelected
                          ? 'border-[#1E5AA8] bg-[#EEF4FC] text-[#1E5AA8] shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-bold leading-tight ${
                          isSelected ? 'text-[#1E5AA8]' : 'text-[#0F2A4A]'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`text-[11px] sm:text-xs mt-1 leading-tight font-medium ${
                          isSelected ? 'text-[#1E5AA8]/85' : 'text-slate-400'
                        }`}
                      >
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hiện trạng */}
            <div>
              <label className="block text-sm font-bold text-[#0F2A4A] mb-2">
                Hiện trạng công trình
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {(Object.keys(STATUS_LABELS) as StatusType[]).map((sKey) => {
                  const isSelected = status === sKey;
                  const item = STATUS_LABELS[sKey];
                  return (
                    <button
                      key={sKey}
                      type="button"
                      onClick={() => setStatus(sKey)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer select-none text-center min-h-[72px] sm:min-h-[78px] ${
                        isSelected
                          ? 'border-[#1E5AA8] bg-[#EEF4FC] text-[#1E5AA8] shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-bold leading-tight ${
                          isSelected ? 'text-[#1E5AA8]' : 'text-[#0F2A4A]'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`text-[11px] sm:text-xs mt-1 leading-tight font-medium ${
                          isSelected ? 'text-[#1E5AA8]/85' : 'text-slate-400'
                        }`}
                      >
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Cabin & Civil Spec Box */}
            <div className="bg-slate-50/90 rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F2A4A] uppercase tracking-wider font-mono">
                  <Sparkles size={13} className="text-[#1E5AA8]" />
                  <span>Chi tiết cấu hình: Cabin {CABIN_LABELS[cabin].title}</span>
                </div>
                <span className="text-[11px] font-bold text-[#1E5AA8] bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full font-mono">
                  {STATUS_LABELS[status].title}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200/70">
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Vật liệu hoàn thiện</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-800 mt-0.5 truncate">
                    {CABIN_SPECS[cabin].material}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200/70">
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Thời gian thi công</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-800 font-mono mt-0.5">
                    {status === 'caitao' ? '15 – 25 ngày (Không bụi)' : '30 – 45 ngày (Chuẩn tiến độ)'}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200/70">
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Tiêu chuẩn an toàn</div>
                  <div className="text-xs sm:text-[13px] font-bold text-emerald-700 font-mono mt-0.5">
                    Châu Âu EN 81 // CO/CQ 100%
                  </div>
                </div>
                <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200/70">
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Khoảng giá cập nhật</div>
                  <div className="text-xs sm:text-[13px] font-bold text-amber-600 font-mono mt-0.5">
                    {calcEstimate()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 border-t border-slate-200/60">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>Bảo hành 18 tháng & Đội ngũ trực cứu hộ 24/7 khẩn cấp.</span>
              </div>
            </div>
          </div>

          {/* Nav Buttons & Footnote */}
          <div className="space-y-2 pt-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 sm:py-4 rounded-xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Quay lại</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 sm:py-4 rounded-xl bg-[#1E5AA8] hover:bg-[#174C91] text-white font-bold text-base transition-all shadow-md shadow-[#1E5AA8]/20 hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Xem giá & Nhận báo giá</span>
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 text-center font-medium">
              Bảo hành chính hãng 18 tháng • Đội ngũ cứu hộ 24/7 khẩn cấp
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: Khoảng giá dự toán & Nhập SĐT */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-3.5">
            {/* Estimate Display Box */}
            <div className="bg-gradient-to-br from-[#0F2A4A] to-[#183E69] text-white rounded-2xl p-4 sm:p-5 shadow-sm">
              <div className="text-xs text-blue-200/90 font-medium">
                Giá tham khảo cho {TYPE_LABELS[type].title.toLowerCase()} {floors} tầng, cabin {CABIN_LABELS[cabin].title.toLowerCase()}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F2B84B] font-mono tracking-tight my-1.5">
                {calcEstimate()}
              </div>
              <p className="text-[11px] text-slate-300/90 leading-tight">
                * Giá chính xác sau khi kỹ sư khảo sát thực địa miễn phí tại công trình.
              </p>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#0F2A4A] mb-1.5">
                Số điện thoại để nhận báo giá chi tiết <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError(false);
                }}
                placeholder="VD: 0912 345 678"
                className={`w-full px-4 py-3 rounded-xl border-2 text-base font-semibold transition-colors focus:outline-none ${
                  phoneError
                    ? 'border-rose-500 bg-rose-50/30 text-rose-900 focus:border-rose-600'
                    : 'border-slate-200 focus:border-[#1E5AA8] bg-white text-slate-900'
                }`}
              />
              {phoneError && (
                <p className="text-xs text-rose-600 mt-1 font-medium">
                  Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 số).
                </p>
              )}
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-600 mb-1.5">
                Tên anh/chị (không bắt buộc)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Anh Minh"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1E5AA8] bg-white text-slate-900"
              />
            </div>

            {/* 3-Point Guarantee Line */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-0.5">
              <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-200/70">
                <div className="text-[10px] text-slate-500 font-medium">Khảo sát & 3D</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">Miễn phí 100%</div>
              </div>
              <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-200/70">
                <div className="text-[10px] text-slate-500 font-medium">Bảo mật SĐT</div>
                <div className="text-xs font-bold text-emerald-700 mt-0.5">Tuyệt đối</div>
              </div>
              <div className="bg-slate-50/80 p-2 rounded-xl border border-slate-200/70">
                <div className="text-[10px] text-slate-500 font-medium">Kỹ sư gọi lại</div>
                <div className="text-xs font-bold text-[#1E5AA8] font-mono mt-0.5">Trong 30P</div>
              </div>
            </div>
          </div>

          {/* Nav Buttons & Footnote */}
          <div className="space-y-2 pt-4">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={submitting}
                className="w-1/3 py-3.5 rounded-xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Quay lại</span>
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3.5 rounded-xl bg-[#1E5AA8] hover:bg-[#174C91] text-white font-bold text-base transition-all shadow-md shadow-[#1E5AA8]/20 hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <span>Nhận báo giá</span>
                    <Check size={18} />
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 text-center leading-relaxed font-medium">
              Kỹ sư gọi lại trong 30 phút (8h–20h). Thông tin chỉ dùng tư vấn, không chia sẻ bên thứ 3.
            </p>
          </div>
        </form>
      )}

      {/* STEP 4: Success State */}
      {step === 4 && (
        <div className="flex-1 flex flex-col justify-center py-6 text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2A4A]">
              Đã nhận yêu cầu thành công!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Kỹ sư Thang Máy Hải Phát sẽ liên hệ cho anh/chị qua SĐT{' '}
              <b className="text-slate-900 font-mono">{phone}</b> trong 30 phút để gửi phương án kỹ thuật và báo giá chi tiết.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5 max-w-xs mx-auto">
            <a
              href="tel:0898424666"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <PhoneCall size={16} />
              <span>Gọi hotline: 0898.424.666</span>
            </a>

            <button
              type="button"
              onClick={resetForm}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs transition-colors cursor-pointer"
            >
              Tính phương án khác
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
