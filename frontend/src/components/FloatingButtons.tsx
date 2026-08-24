"use client";
import { Phone, Facebook } from 'lucide-react';
import { ZaloIcon } from './icons/ZaloIcon';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Facebook button */}
      <a
        href="https://facebook.com/thangmayhaiphat"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
      >
        <span className="bg-white shadow-lg rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Nhắn tin Facebook
        </span>
        <div className="w-14 h-14 rounded-full bg-[#1877F2] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Facebook size={26} className="text-white" />
        </div>
      </a>

      {/* Zalo button */}
      <a
        href="https://zalo.me/0898424666"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
      >
        <span className="bg-white shadow-lg rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat Zalo
        </span>
        <div className="w-14 h-14 rounded-full bg-[#0068ff] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <ZaloIcon size={26} className="text-white" />
        </div>
      </a>

      {/* Phone button */}
      <a
        href="tel:0898424666"
        className="flex items-center gap-3 group"
      >
        <span className="bg-white shadow-lg rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          0898 424 666
        </span>
        <div className="w-14 h-14 rounded-full bg-[#285c9a] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Phone size={24} className="text-white" />
        </div>
      </a>
    </div>
  );
}
