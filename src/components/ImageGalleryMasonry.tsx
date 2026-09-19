"use client";
import { useState, useEffect, useCallback } from 'react';
import { Layers, Maximize2, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface ImageGalleryMasonryProps {
  images: string[];
  title?: string;
  sectionTitle?: string;
}

export default function ImageGalleryMasonry({
  images,
  title = "Hình ảnh",
  sectionTitle = "Hình ảnh chi tiết"
}: ImageGalleryMasonryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const validImages = images && images.length > 0 ? images : [];

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : validImages.length - 1));
  }, [lightboxIndex, validImages.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < validImages.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, validImages.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  if (validImages.length === 0) return null;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Layers size={20} className="text-[#285c9a]" />
          {sectionTitle}
        </h2>
        <span className="text-xs sm:text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
          {validImages.length} hình ảnh
        </span>
      </div>

      {/* Masonry Grid (Pinterest style - All images fully shown without cropping) */}
      <div className="columns-1 sm:columns-2 gap-4 [column-fill:_balance]">
        {validImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <img
              src={img}
              alt={`${title} - Hình ${idx + 1}`}
              className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            {/* Hover overlay with zoom button */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <Maximize2 size={13} /> Xem ảnh đầy đủ
              </span>
              <span className="text-white/80 text-xs font-semibold bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg">
                #{idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
          onClick={handleClose}
        >
          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 text-white/90 text-sm font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="truncate max-w-[200px] sm:max-w-md">{title}</span>
              <span className="text-white/40">•</span>
              <span className="text-[#60a5fa] font-semibold whitespace-nowrap">{lightboxIndex + 1} / {validImages.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={validImages[lightboxIndex]}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 transition-colors border border-white/10"
                title="Mở ảnh gốc trong tab mới"
              >
                <ExternalLink size={18} />
              </a>
              <button
                onClick={handleClose}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors border border-white/10"
                title="Đóng (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Prev Button */}
          {validImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all border border-white/15 z-10 hover:scale-110"
              title="Ảnh trước (Mũi tên trái)"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Navigation Next Button */}
          {validImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all border border-white/15 z-10 hover:scale-110"
              title="Ảnh tiếp theo (Mũi tên phải)"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Image Display */}
          <div
            className="relative max-w-[92vw] max-h-[85vh] flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={validImages[lightboxIndex]}
              alt={`${title} - Hình ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded-xl shadow-2xl transition-all duration-300"
            />
          </div>

          {/* Bottom Thumbnails Strip */}
          {validImages.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[90vw] overflow-x-auto flex gap-2 p-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 scrollbar-none z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {validImages.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    lightboxIndex === idx ? 'border-[#38bdf8] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
