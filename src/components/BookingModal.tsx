import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Bell } from 'lucide-react';
import { Tutor, TimeSlot, Booking } from '../types';
import { Language, TRANSLATIONS, formatVND } from '../utils/translations';
import { localizeDayOfWeek, localizeDateStr, getCourseName } from '../utils/localization';

interface BookingModalProps {
  tutor: Tutor | null;
  initialSlot?: TimeSlot;
  onClose: () => void;
  onConfirmBooking: (newBooking: Booking) => void;
  language?: Language;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tutor,
  initialSlot,
  onClose,
  onConfirmBooking,
  language = 'vi'
}) => {
  if (!tutor) return null;
  const t = TRANSLATIONS[language];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSubject, setSelectedSubject] = useState(tutor.subjects[0]?.code || '');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>(
    initialSlot || tutor.availableSlots[0] || {
      id: 'custom-slot',
      dayOfWeek: language === 'vi' ? 'Thứ Hai' : 'Monday',
      dateStr: language === 'vi' ? '27/10/2026' : 'Oct 27, 2026',
      startTime: '18:30',
      endTime: '20:00',
      isBooked: false,
      mode: 'online'
    }
  );
  const [durationMinutes, setDurationMinutes] = useState<number>(90);
  const [sessionMode, setSessionMode] = useState<'online' | 'campus-library'>('online');
  const [learningGoals, setLearningGoals] = useState<string>(
    language === 'vi'
      ? 'Ôn tập đề thi giữa kỳ, giải bài tập tình huống và làm rõ các phần lý thuyết khó hiểu.'
      : 'Review key concepts for the upcoming exam, practice past case studies, and clarify difficult points.'
  );

  // Reminders
  const [reminder24h, setReminder24h] = useState<boolean>(true);
  const [reminder1h, setReminder1h] = useState<boolean>(true);
  const [reminder15m, setReminder15m] = useState<boolean>(true);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'neu_pay' | 'card'>('vietqr');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Calculate fee in pure VND (hovering 150k - 200k for 90 mins)
  const base90MinFee = tutor.sessionFee90Min || 165000;
  const totalFeeVND = Math.round((base90MinFee * (durationMinutes / 90)) / 1000) * 1000;
  const selectedSubjectObj = tutor.subjects.find((s) => s.code === selectedSubject) || tutor.subjects[0];

  const handleFinalSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const escrowId = `ESC-NEU-${Date.now().toString().slice(-8)}`;
      const localizedSubName = getCourseName(selectedSubjectObj?.code || 'LAW102', language, selectedSubjectObj?.name);
      const newBooking: Booking = {
        id: `book-${Date.now()}`,
        tutorId: tutor.id,
        tutorName: tutor.name,
        tutorAvatar: tutor.avatarUrl,
        tuteeName: language === 'vi' ? 'An Minh Vũ (Bạn)' : 'An Minh Vu (You)',
        tuteeStudentId: 'NEU-11229011',
        courseCode: selectedSubjectObj?.code || 'LAW102',
        courseName: localizedSubName,
        slot: {
          ...selectedSlot,
          dayOfWeek: localizeDayOfWeek(selectedSlot.dayOfWeek, language),
          dateStr: localizeDateStr(selectedSlot.dateStr, language)
        },
        durationMinutes,
        totalFee: totalFeeVND,
        status: 'escrow_held',
        learningGoals,
        meetingLink: `https://peerneu.edu.vn/room/${selectedSubjectObj?.code.toLowerCase()}-${Date.now().toString().slice(-4)}`,
        escrowId,
        createdAt: new Date().toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        reminderEnabled: true,
        reminderSettings: {
          before24h: reminder24h,
          before1h: reminder1h,
          before15m: reminder15m
        },
        hasReview: false
      };

      onConfirmBooking(newBooking);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header with NEU Blue styling */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#00528C] uppercase tracking-wider block">
              {t.stepOf(step, 3)}: {step === 1 ? t.stepSessionDetails : step === 2 ? t.stepEscrow : t.stepRemindersPay}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5 font-support">
              {t.bookWith} {tutor.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              {/* Course Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  {t.selectSubject}
                </label>
                <div className="space-y-2">
                  {tutor.subjects.map((sub) => (
                    <label
                      key={sub.code}
                      onClick={() => setSelectedSubject(sub.code)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        selectedSubject === sub.code
                          ? 'border-[#00528C] bg-[#00528C]/5 ring-1 ring-[#00528C]'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {getCourseName(sub.code, language, sub.name)} ({sub.code})
                        </div>
                        <div className="text-[11px] text-[#00528C] font-semibold">
                          {t.tutorScore}: {sub.mark}
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="subjectSelect"
                        checked={selectedSubject === sub.code}
                        onChange={() => setSelectedSubject(sub.code)}
                        className="text-[#00528C] focus:ring-[#00528C]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  {t.selectSlot}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tutor.availableSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-xl border text-left transition-colors ${
                        selectedSlot.id === slot.id
                          ? 'border-[#00528C] bg-[#00528C]/5 ring-1 ring-[#00528C]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">
                        {localizeDayOfWeek(slot.dayOfWeek, language)}
                      </div>
                      <div className="text-[11px] text-slate-600 font-mono">
                        {localizeDateStr(slot.dateStr, language)}
                      </div>
                      <div className="text-xs text-[#00528C] font-mono font-bold mt-1">
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                    {t.duration}
                  </label>
                  <select
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C]"
                  >
                    <option value={90}>{t.duration90}</option>
                    <option value={60}>{t.duration60}</option>
                    <option value={120}>{t.duration120}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                    {t.locationFormat}
                  </label>
                  <select
                    value={sessionMode}
                    onChange={(e) => setSessionMode(e.target.value as any)}
                    className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C]"
                  >
                    <option value="online">{t.onlineCallBoard}</option>
                    <option value="campus-library">{t.libraryB2Study}</option>
                  </select>
                </div>
              </div>

              {/* Learning Goals */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  {t.learningGoalsLabel}
                </label>
                <textarea
                  rows={2}
                  value={learningGoals}
                  onChange={(e) => setLearningGoals(e.target.value)}
                  placeholder={t.learningGoalsPlaceholder}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Escrow Guarantee Box in NEU Palette */}
              <div className="bg-[#00528C]/8 border border-[#00528C]/25 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-[#00528C] font-bold text-sm font-support">
                  <ShieldCheck className="w-5 h-5 text-[#00528C] shrink-0" />
                  <span>{t.escrowTitle}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {t.escrowExplanation}
                </p>
                <ul className="text-xs text-slate-800 space-y-1.5 list-disc pl-5">
                  <li>{t.escrowPoint1}</li>
                  <li>{t.escrowPoint2}</li>
                  <li>{t.escrowPoint3}</li>
                </ul>
              </div>

              {/* Price Calculation in pure VND */}
              <div className="rounded-xl border border-slate-200 p-4 space-y-2 bg-slate-50/50">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 font-support">
                  {t.feeCalculation}
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>{t.sessionFee} ({durationMinutes} {language === 'vi' ? 'phút' : 'mins'})</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900">
                    {formatVND(totalFeeVND)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>{t.escrowFee}</span>
                  <span className="font-mono text-[#00528C] font-semibold">{t.free}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
                  <span className="font-support">{t.totalDeposit}</span>
                  <span className="text-xl font-mono tabular-nums text-[#00528C] font-black">
                    {formatVND(totalFeeVND)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {/* Push Notification Reminders */}
              <div className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 font-support">
                    <Bell className="w-4 h-4 text-[#00528C]" />
                    {t.automatedRemindersTitle}
                  </div>
                  <span className="text-[11px] text-[#00528C] font-bold">{t.autoSyncOn}</span>
                </div>
                <p className="text-xs text-slate-500">
                  {t.remindersDesc}
                </p>

                <div className="space-y-2 pt-1 text-xs text-slate-700">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>{t.reminder24h}</span>
                    <input
                      type="checkbox"
                      checked={reminder24h}
                      onChange={(e) => setReminder24h(e.target.checked)}
                      className="rounded text-[#00528C] focus:ring-[#00528C]"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>{t.reminder1h}</span>
                    <input
                      type="checkbox"
                      checked={reminder1h}
                      onChange={(e) => setReminder1h(e.target.checked)}
                      className="rounded text-[#00528C] focus:ring-[#00528C]"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>{t.reminder15m}</span>
                    <input
                      type="checkbox"
                      checked={reminder15m}
                      onChange={(e) => setReminder15m(e.target.checked)}
                      className="rounded text-[#00528C] focus:ring-[#00528C]"
                    />
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  {t.selectPayment}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`p-3 rounded-xl border text-center transition-colors ${
                      paymentMethod === 'vietqr'
                        ? 'border-[#00528C] bg-[#00528C]/8 text-[#00528C] ring-1 ring-[#00528C]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">{t.vietQrMomo}</span>
                    <span className="text-[10px] text-slate-500">{t.vietQrMomoSub}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('neu_pay')}
                    className={`p-3 rounded-xl border text-center transition-colors ${
                      paymentMethod === 'neu_pay'
                        ? 'border-[#00528C] bg-[#00528C]/8 text-[#00528C] ring-1 ring-[#00528C]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">{t.neuPay}</span>
                    <span className="text-[10px] text-slate-500">{t.neuPaySub}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#00528C] bg-[#00528C]/8 text-[#00528C] ring-1 ring-[#00528C]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">{t.visaMaster}</span>
                    <span className="text-[10px] text-slate-500">{t.visaMasterSub}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00528C] shrink-0" />
                <span>{t.escrowProtocolNote}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {t.back}
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as any)}
              className="px-5 py-2 text-xs font-bold text-white bg-[#00528C] hover:bg-[#003B66] rounded-xl transition-colors"
            >
              {t.continueTo}
            </button>
          ) : (
            <button
              onClick={handleFinalSubmit}
              disabled={isProcessing}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#00528C] hover:bg-[#003B66] disabled:opacity-50 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.processing}
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  {t.lockInEscrow} ({formatVND(totalFeeVND)})
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
