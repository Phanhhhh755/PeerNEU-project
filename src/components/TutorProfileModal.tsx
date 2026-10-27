import React from 'react';
import { X, Star, ShieldCheck, CheckCircle2, MessageSquare, Clock, GraduationCap, Award } from 'lucide-react';
import { Tutor, TimeSlot, Review } from '../types';
import { Language, TRANSLATIONS, formatVND } from '../utils/translations';
import { localizeDayOfWeek, localizeDateStr, localizeSessionMode, getCourseName } from '../utils/localization';

interface TutorProfileModalProps {
  tutor: Tutor | null;
  onClose: () => void;
  onBookSlot: (tutor: Tutor, slot?: TimeSlot) => void;
  onOpenChat: (tutor: Tutor) => void;
  reviews: Review[];
  language?: Language;
}

export const TutorProfileModal: React.FC<TutorProfileModalProps> = ({
  tutor,
  onClose,
  onBookSlot,
  onOpenChat,
  reviews,
  language = 'vi'
}) => {
  if (!tutor) return null;

  const t = TRANSLATIONS[language];
  const tutorReviews = reviews.filter((r) => r.tutorId === tutor.id);
  const fee90Min = tutor.sessionFee90Min || 165000;
  const approxHourly = Math.round((fee90Min * 2 / 3) / 1000) * 1000;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#00528C] uppercase tracking-wider font-support">
              {t.tutorDossier}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-600">{tutor.studentIdMasked}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Header Profile Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={tutor.avatarUrl}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 font-support">{tutor.name}</h2>
                  {tutor.verifiedStatus.idVerified && (
                    <span className="flex items-center gap-1 text-xs font-medium text-[#00528C] bg-[#00528C]/8 px-2 py-0.5 rounded-full border border-[#00528C]/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00528C]" />
                      {t.verifiedStudent}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mt-0.5">{tutor.classCohort}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>GPA {tutor.gpa.toFixed(2)} / 4.0</span>
                  <span aria-hidden="true">·</span>
                  <span>{tutor.totalSessionsGiven} {language === 'vi' ? 'buổi đã dạy' : 'sessions completed'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{language === 'vi' ? 'Phản hồi ~' : 'Responds in ~'}{tutor.responseTimeMinutes}m</span>
                </div>
              </div>
            </div>

            {/* Fee strictly in VND (150k - 200k VND) */}
            <div className="bg-[#00528C]/5 rounded-xl p-3 border border-[#00528C]/20 text-right sm:self-center shrink-0">
              <div className="text-2xl font-black text-[#00528C] font-mono tabular-nums">
                {formatVND(fee90Min)}
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                {t.feePer90Min} ({t.approxPerHour} {formatVND(approxHourly)})
              </p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 font-support">
              {language === 'vi' ? 'Giới thiệu & Phương pháp giảng dạy' : 'About & Teaching Approach'}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{tutor.bio}</p>
          </div>

          {/* Verified Subjects & Academic Transcript Marks */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-support">
                <GraduationCap className="w-4 h-4 text-[#00528C]" />
                {t.verifiedCourseMarks}
              </h4>
              <span className="text-xs text-[#00528C] flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.officialTranscriptConfirmed}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tutor.subjects.map((sub) => (
                <div key={sub.code} className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {getCourseName(sub.code, language, sub.name)}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#00528C] bg-[#00528C]/8 px-2 py-0.5 rounded border border-[#00528C]/15">
                      {sub.mark}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {language === 'vi' ? 'Mã môn' : 'Code'}: {sub.code} · {sub.termAchieved}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Honors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 font-support">
              <Award className="w-4 h-4 text-[#FFC101]" />
              {t.academicHonors}
            </h4>
            <div className="space-y-1.5">
              {tutor.achievements.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00528C]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Free Time Slots Section */}
          <div className="rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-support">
                <Clock className="w-4 h-4 text-[#00528C]" />
                {t.availableSlots}
              </h4>
              <span className="text-xs text-slate-500">{language === 'vi' ? 'Chọn khung giờ phù hợp' : 'Pick any slot to book'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tutor.availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => {
                    onClose();
                    onBookSlot(tutor, slot);
                  }}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#00528C]/5 hover:border-[#00528C]/40 transition-colors text-left flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#00528C]">
                      {localizeDayOfWeek(slot.dayOfWeek, language)} · {localizeDateStr(slot.dateStr, language)}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      {slot.startTime} - {slot.endTime} ({localizeSessionMode(slot.mode, language)})
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#00528C] opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'vi' ? 'Chọn →' : 'Select →'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Rating Breakdown & Verified Reviews */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-support">
                <Star className="w-4 h-4 text-[#FFC101] fill-[#FFC101]" />
                {t.studentReviews} ({tutorReviews.length || tutor.reviewCount})
              </h4>
              <div className="text-xs font-bold text-slate-900 font-mono">
                {tutor.rating.toFixed(2)} / 5.0
              </div>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <div>
                <span className="text-[11px] text-slate-500 block">{t.clarityScore}</span>
                <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                  {tutor.ratingBreakdown.clarity.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">{t.examScore}</span>
                <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                  {tutor.ratingBreakdown.examPrep.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">{t.punctualityScore}</span>
                <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                  {tutor.ratingBreakdown.punctuality.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-3">
              {tutorReviews.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  {language === 'vi' ? 'Chưa có đánh giá văn bản nào trong học kỳ này.' : 'No written reviews yet for this semester.'}
                </p>
              ) : (
                tutorReviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">{rev.studentName}</span>
                        <span className="text-slate-400">· {rev.studentCohort}</span>
                        {rev.verifiedBooking && (
                          <span className="text-[10px] text-[#00528C] bg-[#00528C]/8 px-1.5 py-0.2 rounded border border-[#00528C]/20 font-mono">
                            {language === 'vi' ? 'Buổi học đã xác thực' : 'Verified Booking'}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">{localizeDateStr(rev.date, language)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex text-[#FFC101]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(rev.rating) ? 'fill-[#FFC101]' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      {rev.gradeImprovement && (
                        <span className="text-xs font-mono font-bold text-[#00528C] bg-[#00528C]/8 px-1.5 py-0.2 rounded">
                          {language === 'vi' ? 'Điểm thi' : 'Grade'}: {rev.gradeImprovement}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onOpenChat(tutor);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <span>{t.chatBeforeBooking}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onBookSlot(tutor);
            }}
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#00528C] hover:bg-[#003B66] rounded-xl transition-colors shadow-xs"
          >
            {t.bookSessionWith(tutor.name)}
          </button>
        </div>
      </div>
    </div>
  );
};
