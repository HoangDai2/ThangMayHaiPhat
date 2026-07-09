import { Phone, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { ZaloIcon } from './icons/ZaloIcon';

export function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded buttons */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Zalo button */}
        <a
          href="https://zalo.me/0800123456"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <span className="bg-white shadow-lg rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat Zalo
          </span>
          <div className="w-12 h-12 rounded-full bg-[#0068ff] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <ZaloIcon size={24} className="text-white" />
          </div>
        </a>

        {/* Phone button */}
        <a
          href="tel:0800123456"
          className="flex items-center gap-3 group"
        >
          <span className="bg-white shadow-lg rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            0800 123 456
          </span>
          <div className="w-12 h-12 rounded-full bg-[#285c9a] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Phone size={22} className="text-white" />
          </div>
        </a>
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gray-600 rotate-90' : 'bg-[#0068ff] hover:bg-[#0052cc]'
        }`}
        aria-label="Toggle contact options"
      >
        {isOpen ? (
          <X size={26} className="text-white" />
        ) : (
          <MessageCircle size={26} className="text-white" />
        )}
      </button>
    </div>
  );
}
