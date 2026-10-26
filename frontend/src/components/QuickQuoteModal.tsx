"use client";

import React, { useEffect, useState } from 'react';
import { useQuickQuote } from '../context/QuickQuoteContext';
import QuickQuoteWidget from './QuickQuoteWidget';

export default function QuickQuoteModal() {
  const { isOpen, initialType, closeQuoteModal } = useQuickQuote();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div
      id="quick-quote-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Cửa sổ Báo giá nhanh Thang Máy Hải Phát"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/65 backdrop-blur-sm overflow-y-auto transition-opacity duration-200 animate-fadeIn"
      onClick={closeQuoteModal}
    >
      <div
        className="relative w-full max-w-[510px] my-auto bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden max-h-[92vh] flex flex-col transition-all duration-200 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto flex-1 overscroll-contain">
          <QuickQuoteWidget
            isModal={true}
            initialType={initialType}
            onClose={closeQuoteModal}
          />
        </div>
      </div>
    </div>
  );
}
