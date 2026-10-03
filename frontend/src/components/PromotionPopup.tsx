"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../lib/api';

interface Promotion {
  id: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  discount_text: string | null;
  image_url: string | null;
  link_url: string | null;
  is_active: boolean;
  updated_at: string;
}

export default function PromotionPopup() {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const fetchActivePromotion = async () => {
      try {
        const response = await api.get('/public/promotions/active');
        const activePromo = response.data;
        
        if (!activePromo || !activePromo.id) return;

        // Check local storage for 24h dismissal rule
        const storageKey = `promotion_dismissed_${activePromo.id}`;
        const dismissedAt = localStorage.getItem(storageKey);
        
        if (dismissedAt) {
          const timeSinceDismissal = Date.now() - parseInt(dismissedAt, 10);
          const hours24 = 24 * 60 * 60 * 1000;
          if (timeSinceDismissal < hours24) {
            return; // Don't show if dismissed within 24h
          } else {
            localStorage.removeItem(storageKey); // Expired, remove it
          }
        }

        setPromotion(activePromo);

        // 5-second delay before showing
        setTimeout(() => {
          setIsRendered(true);
          // slight delay for transition
          setTimeout(() => setIsVisible(true), 50);
        }, 5000);

      } catch (error) {
        console.error('Failed to fetch promotion', error);
      }
    };

    fetchActivePromotion();
  }, []);

  const handleDismiss = () => {
    if (promotion) {
      localStorage.setItem(`promotion_dismissed_${promotion.id}`, Date.now().toString());
    }
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 300); // Wait for transition
  };

  const handleAction = () => {
    if (promotion) {
      localStorage.setItem(`promotion_dismissed_${promotion.id}`, Date.now().toString());
    }
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 300);
    
    if (promotion?.link_url) {
      window.open(promotion.link_url, '_blank');
    }
  };

  if (!isRendered || !promotion) return null;

  const isImageOnly = !promotion.title && !promotion.subtitle && !promotion.description && !promotion.discount_text && promotion.image_url;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isVisible ? 'bg-slate-900/60 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0 pointer-events-none'}`}>
      <div 
        className={`relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-10 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        {isImageOnly ? (
          // Mode: Image Only
          <div className="w-full h-full cursor-pointer" onClick={handleAction}>
            <img src={promotion.image_url!} alt="Promotion" className="w-full h-auto max-h-[80vh] object-contain" />
          </div>
        ) : (
          // Mode: Full Info
          <div className="flex flex-col">
            {/* Top Half */}
            {promotion.image_url ? (
              <div className="w-full h-48 sm:h-64 relative">
                <img src={promotion.image_url} alt={promotion.title || 'Promotion'} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {(promotion.title || promotion.subtitle) && (
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    {promotion.title && <h2 className="text-2xl font-bold leading-tight shadow-sm">{promotion.title}</h2>}
                    {promotion.subtitle && <p className="text-white/90 text-sm mt-1">{promotion.subtitle}</p>}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-40 sm:h-48 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e4b85 0%, #2d5f9e 100%)' }}>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-white">
                  {promotion.title && <h2 className="text-2xl sm:text-3xl font-bold leading-tight shadow-sm">{promotion.title}</h2>}
                  {promotion.subtitle && <p className="text-white/80 text-sm sm:text-base mt-2 font-medium">{promotion.subtitle}</p>}
                </div>
              </div>
            )}

            {/* Bottom Half */}
            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
              {promotion.discount_text && (
                <div className="inline-block px-4 py-1.5 bg-rose-100 text-rose-700 font-bold rounded-full text-sm sm:text-base mb-4 shadow-sm border border-rose-200">
                  {promotion.discount_text}
                </div>
              )}
              
              {promotion.description && (
                <p className="text-slate-600 mb-6 text-sm sm:text-base leading-relaxed">
                  {promotion.description}
                </p>
              )}

              <div className="w-full flex gap-3 mt-2">
                <button 
                  onClick={handleDismiss}
                  className="flex-1 py-3 px-4 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Bỏ qua
                </button>
                {promotion.link_url && (
                  <button 
                    onClick={handleAction}
                    className="flex-1 py-3 px-4 rounded-xl font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                    style={{ backgroundColor: '#2d5f9e' }}
                  >
                    Xem chi tiết
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
