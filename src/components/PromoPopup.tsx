'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  discount_text: string;
  description: string;
  button_text: string;
  button_link: string;
  image_url?: string;
  is_active: boolean;
}

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (!error && data) {
        setPromotion(data);
        
        // Check if the popup was already closed recently for THIS specific promotion
        // We use the promotion ID in the storage key to allow new promotions to show up
        const storageKey = `promoPopupClosed_${data.id}`;
        const lastClosed = localStorage.getItem(storageKey);
        const now = new Date().getTime();
        
        if (!lastClosed || now - parseInt(lastClosed) > 24 * 60 * 60 * 1000) {
          const timer = setTimeout(() => {
            setIsRendered(true);
            setTimeout(() => setIsVisible(true), 50);
          }, 2000);
          return () => clearTimeout(timer);
        }
      }
    };

    fetchPromotion();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsRendered(false);
      if (promotion) {
        localStorage.setItem(`promoPopupClosed_${promotion.id}`, new Date().getTime().toString());
      }
    }, 300); 
  };

  if (!isRendered || !promotion) return null;

  const isImageOnly = Boolean(
    promotion.image_url && 
    !promotion.title?.trim() && 
    !promotion.discount_text?.trim() && 
    !promotion.description?.trim()
  );

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-lg transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
          <button
            onClick={handleClose}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-700 transition-colors z-20 ${
              isImageOnly ? 'bg-white/80 hover:bg-white text-black shadow' : 'bg-black/10 hover:bg-black/20'
            }`}
            aria-label="Đóng popup"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {isImageOnly ? (
            <a href={promotion.button_link || '#'} onClick={handleClose} className="block relative w-full overflow-hidden group max-h-[85vh]">
               <img 
                 src={promotion.image_url} 
                 alt="Promotion" 
                 className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
            </a>
          ) : (
            <>
              {/* Image Section */}
              {promotion.image_url ? (
                <a href={promotion.button_link || '#'} className="block relative h-56 md:h-64 overflow-hidden group">
                   <img 
                     src={promotion.image_url} 
                     alt={promotion.title} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                   />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </a>
              ) : (
                <div className="h-56 bg-gradient-to-r from-brand to-brand-dark relative overflow-hidden flex items-center justify-center">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
                   
                   <div className="text-white text-center z-10 px-6">
                      <h3 className="text-3xl sm:text-4xl font-bold mb-2">{promotion.title}</h3>
                      {promotion.subtitle && <p className="text-white/90 text-sm sm:text-base">{promotion.subtitle}</p>}
                   </div>
                </div>
              )}

              <div className="p-6 sm:p-8 text-center">
                {promotion.discount_text && (
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                    Giảm ngay <span className="text-red-500 text-3xl">{promotion.discount_text}</span>
                  </h4>
                )}
                {promotion.description && (
                  <p className="text-gray-600 mb-8 text-sm sm:text-base whitespace-pre-line">
                    {promotion.description}
                  </p>
                )}
                
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={handleClose}
                    className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Bỏ qua
                  </button>
                  {promotion.button_text && promotion.button_link && (
                    <a 
                      href={promotion.button_link} 
                      onClick={handleClose}
                      className="px-8 py-3 rounded-full bg-brand text-white font-medium hover:bg-brand-dark transition-colors shadow-lg shadow-brand/30"
                    >
                      {promotion.button_text}
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
