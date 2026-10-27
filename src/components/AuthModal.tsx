import React, { useState } from 'react';
import { X, Phone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StudentUser } from '../types';
import { STOCK_FEMALE_STUDENT } from '../data/mockData';
import { Language, TRANSLATIONS } from '../utils/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: StudentUser) => void;
  language?: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  language = 'vi'
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  const [authMethod, setAuthMethod] = useState<'google' | 'phone'>('google');
  
  // Phone flow state
  const [phoneStep, setPhoneStep] = useState<'input' | 'otp'>('input');
  const [phoneNumber, setPhoneNumber] = useState('+84 982 451 902');
  const [otpCode, setOtpCode] = useState('');
  const [studentName, setStudentName] = useState('Phuong Anh Tran');
  const [studentId, setStudentId] = useState('NEU-11228941');

  // Google flow state
  const [selectedGoogleEmail, setSelectedGoogleEmail] = useState('phuonganh28102007@gmail.com');

  const handleGoogleSignIn = () => {
    const user: StudentUser = {
      id: `usr-${Date.now()}`,
      name: 'Phương Anh Trần',
      studentId: 'NEU-11228941',
      email: selectedGoogleEmail,
      phoneNumber: '+84 982 451 902',
      authMethod: 'google',
      avatarUrl: STOCK_FEMALE_STUDENT,
      classCohort: 'Lớp K63 · Khoa Marketing NEU',
      isTutorActive: true,
      tutorProfile: {
        hourlyRate: 120000,
        subjects: [
          {
            code: 'MKT301',
            name: 'Nguyên lý Marketing',
            mark: 'A+ (9.6/10)',
            gradeLetter: 'A+',
            transcriptVerified: true,
            termAchieved: 'Học kỳ 1, 2025-2026'
          }
        ],
        bio: 'Sinh viên năm cuối xuất sắc khoa Marketing. Nhiệt tình hướng dẫn ôn thi giữa kỳ, giải case study và xây dựng kế hoạch marketing đạt điểm A.',
        availableSlots: [
          {
            id: 'slot-pa-1',
            dayOfWeek: 'Thứ Tư',
            dateStr: '29/10/2026',
            startTime: '18:00',
            endTime: '19:30',
            isBooked: false,
            mode: 'online'
          }
        ],
        walletBalance: 360000,
        rating: 4.95,
        reviewCount: 14
      }
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setPhoneStep('otp');
    setOtpCode('882194'); // Auto-simulate SMS OTP receipt
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) return;

    const user: StudentUser = {
      id: `usr-${Date.now()}`,
      name: studentName,
      studentId,
      phoneNumber,
      email: `${studentName.toLowerCase().replace(/\s+/g, '')}@neu.edu.vn`,
      authMethod: 'phone',
      avatarUrl: STOCK_FEMALE_STUDENT,
      classCohort: 'Lớp K63 · Khoa Marketing NEU',
      isTutorActive: false
    };

    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/logo-neu.png"
              alt="NEU"
              className="w-8 h-8 object-contain"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight font-support">
                {language === 'vi' ? 'Đăng nhập vào PeerNEU' : 'Sign In to PeerNEU'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'vi' ? 'Cổng kết nối Gia sư & Sinh viên NEU' : 'Student & Peer-Tutor Portal'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Method Selector */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('google');
                setPhoneStep('input');
              }}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-colors ${
                authMethod === 'google'
                  ? 'bg-white text-[#00528C] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{language === 'vi' ? 'Tài khoản Google' : 'Google Account'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMethod('phone')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-colors ${
                authMethod === 'phone'
                  ? 'bg-white text-[#00528C] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-4 h-4 text-[#00528C]" />
              <span>{language === 'vi' ? 'Số điện thoại' : 'Phone Number'}</span>
            </button>
          </div>

          {/* GOOGLE AUTH TAB */}
          {authMethod === 'google' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block font-support">
                  {language === 'vi' ? 'Email Sinh viên NEU hoặc Gmail' : 'NEU Student or Google Email'}
                </label>
                <input
                  type="email"
                  value={selectedGoogleEmail}
                  onChange={(e) => setSelectedGoogleEmail(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C]"
                />
                <span className="text-[11px] text-slate-500 block">
                  {language === 'vi'
                    ? 'Hỗ trợ cả email sinh viên @neu.edu.vn và Gmail cá nhân của bạn'
                    : 'Compatible with both @neu.edu.vn student emails and personal Gmail'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3 px-4 bg-[#00528C] hover:bg-[#003B66] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm font-support"
              >
                <span>{language === 'vi' ? 'Tiếp tục đăng nhập Google' : 'Continue with Google'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 bg-[#00528C]/5 rounded-xl border border-[#00528C]/20 text-xs text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00528C] shrink-0" />
                <span>
                  {language === 'vi'
                    ? 'Một tài khoản duy nhất cho phép bạn vừa đặt gia sư, vừa đăng ký làm gia sư NEU.'
                    : 'One account lets you both book tutors and upload your tutor profile.'}
                </span>
              </div>
            </div>
          )}

          {/* PHONE NUMBER AUTH TAB */}
          {authMethod === 'phone' && (
            <div>
              {phoneStep === 'input' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block font-support">
                      {language === 'vi' ? 'Số điện thoại di động' : 'Phone Number (Vietnam & International)'}
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+84 982 451 902"
                        className="w-full pl-9 text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C] font-mono"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {language === 'vi'
                        ? 'Hệ thống gửi mã xác thực SMS 6 chữ số để bảo mật tài khoản.'
                        : "We'll send a 6-digit SMS verification code to verify your student identity."}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#00528C] hover:bg-[#003B66] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm font-support"
                  >
                    <span>{language === 'vi' ? 'Gửi mã xác thực SMS' : 'Send SMS OTP Code'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-bold uppercase tracking-wider text-slate-600 font-support">
                        {language === 'vi' ? 'Nhập mã OTP 6 số' : 'Enter 6-Digit OTP Code'}
                      </label>
                      <button
                        type="button"
                        onClick={() => setPhoneStep('input')}
                        className="text-[#00528C] hover:underline text-[11px] font-semibold"
                      >
                        {language === 'vi' ? 'Đổi số điện thoại' : 'Change number'}
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="882194"
                      className="w-full text-center text-lg font-bold tracking-widest p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C] font-mono"
                    />
                    <span className="text-[11px] text-[#00528C] block font-medium">
                      {language === 'vi' ? 'Mã OTP mẫu nhận được: 882194' : 'Simulated OTP received: 882194'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block">
                        {language === 'vi' ? 'Họ và tên' : 'Your Name'}
                      </label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block">
                        {language === 'vi' ? 'Mã sinh viên NEU' : 'Student ID'}
                      </label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#00528C] hover:bg-[#003B66] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm font-support"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'vi' ? 'Xác thực & Vào PeerNEU' : 'Verify & Enter PeerNEU'}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
