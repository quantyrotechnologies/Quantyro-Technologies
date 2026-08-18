"use client";
import React, { createContext, useCallback, useContext, useState } from 'react';

interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const ToastContext = createContext<{ showToast: (message: string, type?: 'success' | 'error') => void } | null>(null);

let nextId = 1;

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-[20px] right-[20px] z-[200] flex flex-col gap-[8px] items-end">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-[16px] py-[11px] rounded-[10px] text-[13.5px] font-medium shadow-[0_8px_24px_rgba(10,23,47,0.15)] border flex items-center gap-[8px] animate-toast-in ${
              t.type === 'success'
                ? 'bg-white border-[rgba(23,104,214,0.25)] text-[var(--ink)]'
                : 'bg-white border-red-200 text-red-700'
            }`}
          >
            <span
              className={`w-[7px] h-[7px] rounded-full shrink-0 ${t.type === 'success' ? 'bg-[var(--accent)]' : 'bg-red-500'}`}
            />
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within AdminToastProvider');
  return ctx;
}
