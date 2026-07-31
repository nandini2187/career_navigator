import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastListeners: ((t: ToastState) => void)[] = [];

export function toast(message: string, type: ToastState['type'] = 'success') {
  toastListeners.forEach((l) => l({ message, type }));
}

export function Toaster() {
  const [current, setCurrent] = useState<ToastState | null>(null);

  useEffect(() => {
    const listener = (t: ToastState) => {
      setCurrent(t);
      setTimeout(() => setCurrent(null), 3500);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  if (!current) return null;

  const colors = {
    success: 'bg-success-500 text-white',
    error: 'bg-error-500 text-white',
    info: 'bg-primary-600 text-white',
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-fade-up">
      <div className={`flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-glass-lg ${colors[current.type]}`}>
        <Check className="h-5 w-5 shrink-0" />
        <span className="text-sm font-medium">{current.message}</span>
      </div>
    </div>
  );
}
