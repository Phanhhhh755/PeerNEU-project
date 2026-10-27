import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, RefreshCcw, FileCheck } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface EscrowExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const EscrowExplainerModal: React.FC<EscrowExplainerModalProps> = ({
  isOpen,
  onClose,
  language = 'vi'
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00528C]" />
            <h3 className="text-base font-bold text-slate-900 font-support">
              {t.escrowModalTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="bg-[#00528C]/8 border border-[#00528C]/25 rounded-2xl p-4 text-xs text-slate-800 leading-relaxed">
            <span className="font-bold block text-sm text-[#00528C] mb-1 font-support">
              {language === 'vi' ? 'Cam kết 100% Không rủi ro cho Sinh viên NEU' : 'Zero-Risk Guarantee for NEU Students'}
            </span>
            {t.escrowModalSub}
          </div>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#00528C]/10 text-[#00528C] flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-support">
                {t.pillar1Title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.pillar1Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#00528C]/10 text-[#00528C] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-support">
                {t.pillar2Title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.pillar2Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFC101]/20 text-amber-800 flex items-center justify-center">
                <RefreshCcw className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-support">
                {t.pillar3Title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.pillar3Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#C41212]/10 text-[#C41212] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-support">
                {t.pillar4Title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.pillar4Desc}
              </p>
            </div>
          </div>

          {/* Student Protection Rules */}
          <div className="border-t border-slate-200 pt-4 space-y-2 text-xs text-slate-600">
            <span className="font-bold text-slate-900 block font-support">
              {language === 'vi' ? 'Quy tắc an toàn khi học cùng Gia sư:' : 'Safety Guidelines for Students:'}
            </span>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00528C] mt-0.5 shrink-0" />
              <span>{language === 'vi' ? 'Luôn nhắn tin và tham gia phòng học trực tuyến ngay trên nền tảng PeerNEU.' : 'Always communicate through the in-app chat and live study room on PeerNEU.'}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00528C] mt-0.5 shrink-0" />
              <span>{language === 'vi' ? 'Tuyệt đối không chuyển khoản cọc học phí ra ngoài tài khoản cá nhân không được bảo hộ.' : 'Never wire deposits to untrusted private personal bank accounts outside the escrow system.'}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#00528C] hover:bg-[#003B66] text-white text-xs font-semibold rounded-xl transition-colors"
          >
            {t.understandAgree}
          </button>
        </div>
      </div>
    </div>
  );
};
