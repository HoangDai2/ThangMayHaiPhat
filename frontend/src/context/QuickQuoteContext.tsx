"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ElevatorType = 'khungthep' | 'thangxay';

interface QuickQuoteContextType {
  isOpen: boolean;
  initialType: ElevatorType;
  openQuoteModal: (options?: { initialType?: ElevatorType }) => void;
  closeQuoteModal: () => void;
}

const QuickQuoteContext = createContext<QuickQuoteContextType | undefined>(undefined);

export function QuickQuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialType, setInitialType] = useState<ElevatorType>('khungthep');

  const openQuoteModal = useCallback((options?: { initialType?: ElevatorType }) => {
    if (options?.initialType) {
      setInitialType(options.initialType);
    }
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen for custom event 'open-quick-quote' so any button anywhere can trigger it
  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ initialType?: ElevatorType }>;
      openQuoteModal(customEvent.detail);
    };

    window.addEventListener('open-quick-quote', handleCustomOpen);

    return () => {
      window.removeEventListener('open-quick-quote', handleCustomOpen);
    };
  }, [openQuoteModal]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeQuoteModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeQuoteModal]);

  return (
    <QuickQuoteContext.Provider
      value={{
        isOpen,
        initialType,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </QuickQuoteContext.Provider>
  );
}

export function useQuickQuote() {
  const context = useContext(QuickQuoteContext);
  if (!context) {
    // Graceful fallback if outside provider
    return {
      isOpen: false,
      initialType: 'khungthep' as ElevatorType,
      openQuoteModal: (options?: { initialType?: ElevatorType }) => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('open-quick-quote', { detail: options }));
        }
      },
      closeQuoteModal: () => {},
    };
  }
  return context;
}
