import React from 'react';
import { Bell, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type?: 'reminder' | 'escrow' | 'success';
}

interface NotificationToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  toasts,
  onDismiss
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-600/90 text-white flex items-center justify-center shrink-0 mt-0.5">
            {toast.type === 'escrow' ? (
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
            ) : toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            ) : (
              <Bell className="w-4 h-4 text-amber-300 animate-bounce" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-white tracking-tight">{toast.title}</h4>
              <span className="text-[10px] text-slate-400 font-mono">Just now</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
