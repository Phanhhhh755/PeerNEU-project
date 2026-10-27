import React, { useState } from 'react';
import { X, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Booking, Review } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface ReviewModalProps {
  booking: Booking | null;
  onClose: () => void;
  onSubmitReview: (newReview: Review) => void;
  language?: Language;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  booking,
  onClose,
  onSubmitReview,
  language = 'vi'
}) => {
  if (!booking) return null;
  const t = TRANSLATIONS[language];

  const [rating, setRating] = useState<number>(5);
  const [clarity, setClarity] = useState<number>(5);
  const [examPrep, setExamPrep] = useState<number>(5);
  const [punctuality, setPunctuality] = useState<number>(5);
  const [gradeImprovement, setGradeImprovement] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      tutorId: booking.tutorId,
      studentName: 'An Minh Vu',
      studentCohort: 'K63 International Business',
      courseCode: booking.courseCode,
      rating,
      clarityScore: clarity,
      examScore: examPrep,
      punctualityScore: punctuality,
      comment,
      date: new Date().toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      verifiedBooking: true,
      gradeImprovement: gradeImprovement || undefined
    };

    onSubmitReview(newRev);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00528C]">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'vi' ? 'Đánh giá buổi học xác thực' : 'Verified Session Review'}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5 font-support">
              {t.reviewModalTitle} ({booking.tutorName})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {language === 'vi' ? 'Môn học' : 'Course'}: <strong>{booking.courseName} ({booking.courseCode})</strong> · {language === 'vi' ? 'Ngày học' : 'Session Date'}: {booking.slot.dateStr}
          </div>

          {/* Overall Stars */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2 font-support">
              {t.overallRating}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating ? 'fill-[#FFC101] text-[#FFC101]' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm font-bold text-slate-900 font-mono ml-2">
                {rating}.0 / 5.0
              </span>
            </div>
          </div>

          {/* Detailed Criteria */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block font-support">
              {language === 'vi' ? 'Chi tiết tiêu chí đánh giá' : 'Teaching Performance Breakdown'}
            </span>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>{t.clarityScore}:</span>
                <span className="font-mono font-bold text-slate-900">{clarity}.0</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={clarity}
                onChange={(e) => setClarity(Number(e.target.value))}
                className="w-full accent-[#00528C] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>{t.examScore}:</span>
                <span className="font-mono font-bold text-slate-900">{examPrep}.0</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={examPrep}
                onChange={(e) => setExamPrep(Number(e.target.value))}
                className="w-full accent-[#00528C] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>{t.punctualityScore}:</span>
                <span className="font-mono font-bold text-slate-900">{punctuality}.0</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={punctuality}
                onChange={(e) => setPunctuality(Number(e.target.value))}
                className="w-full accent-[#00528C] cursor-pointer"
              />
            </div>
          </div>

          {/* Grade Outcome */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5 font-support">
              {t.gradeImprovementLabel}
            </label>
            <input
              type="text"
              placeholder={t.gradeImprovementPlaceholder}
              value={gradeImprovement}
              onChange={(e) => setGradeImprovement(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C]"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5 font-support">
              {t.feedbackLabel}
            </label>
            <textarea
              rows={3}
              required
              placeholder={language === 'vi' ? 'Chia sẻ cảm nhận về cách giảng giải, giải bài tập và hỗ trợ ôn thi của bạn gia sư...' : 'Describe how the tutor helped you understand difficult topics, solved past exam questions...'}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C] leading-relaxed"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00528C] shrink-0" />
            <span>
              {language === 'vi' ? 'Đánh giá này sẽ hiển thị huy hiệu "Đã xác thực buổi học" để giúp ích cho sinh viên NEU khác.' : 'This review will be published with the "Verified Booking" badge to help other NEU students.'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={!comment.trim()}
              className="px-6 py-2 bg-[#00528C] hover:bg-[#003B66] disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              {t.publishReviewBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
