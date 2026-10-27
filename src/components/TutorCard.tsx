import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { Tutor, TimeSlot } from '../types';
import { Language, TRANSLATIONS, formatVND } from '../utils/translations';
import { localizeDayOfWeek, getCourseName } from '../utils/localization';

interface TutorCardProps {
  tutor: Tutor;
  onSelectTutor: (tutor: Tutor) => void;
  onBookSlot: (tutor: Tutor, slot?: TimeSlot) => void;
  onOpenChat: (tutor: Tutor) => void;
  language?: Language;
}

export const TutorCard: React.FC<TutorCardProps> = ({
  tutor,
  onSelectTutor,
  onBookSlot,
  language = 'vi'
}) => {
  const t = TRANSLATIONS[language];
  const feeDisplay = formatVND(tutor.sessionFee90Min || 165000);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-[#00528C]/40 transition-all flex flex-col justify-between group">
      <div className="space-y-3.5">
        {/* Row 1: Photo, Name, Student ID & Fee */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 ring-2 ring-transparent group-hover:ring-[#00528C]/20 transition-all">
              <img
                src={tutor.avatarUrl}
                alt={tutor.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 text-sm leading-tight font-support group-hover:text-[#00528C] transition-colors">
                  {tutor.name}
                </h3>
                {tutor.verifiedStatus.idVerified && (
                  <span title={t.verifiedStudent}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00528C] shrink-0" />
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {tutor.studentIdMasked}
              </span>
            </div>
          </div>

          {/* Tutor Fee (Hovering 150k - 200k VND per 90-min session) */}
          <div className="text-right shrink-0">
            <span className="text-base font-extrabold text-[#00528C] font-mono tabular-nums block">
              {feeDisplay}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {t.feePer90Min}
            </span>
          </div>
        </div>

        {/* Row 2: Star Rating */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-1 text-[#FFC101]">
            <Star className="w-4 h-4 fill-[#FFC101]" />
            <span className="font-bold text-slate-900 font-mono">{tutor.rating.toFixed(2)}</span>
          </div>
          <span className="text-slate-400 font-mono">({tutor.reviewCount} {t.reviews})</span>
        </div>

        {/* Row 3: Subjects They Tutor */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            {t.subjectsTutored}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tutor.subjects.map((sub) => (
              <span
                key={sub.code}
                className="text-xs font-semibold text-[#00528C] bg-[#00528C]/8 px-2 py-0.5 rounded-md border border-[#00528C]/15"
              >
                {getCourseName(sub.code, language, sub.name)}
              </span>
            ))}
          </div>
        </div>

        {/* Row 4: Available Time Slots */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            {t.availableSlots}
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {tutor.availableSlots.slice(0, 2).map((slot) => (
              <button
                key={slot.id}
                onClick={() => onBookSlot(tutor, slot)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-[#00528C]/8 border border-slate-200 hover:border-[#00528C]/30 text-left transition-colors text-xs font-mono group/slot"
              >
                <div className="font-bold text-slate-800 group-hover/slot:text-[#00528C]">
                  {localizeDayOfWeek(slot.dayOfWeek, language)}
                </div>
                <div className="text-[10px] text-slate-500">
                  {slot.startTime} - {slot.endTime}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 5: Action Buttons */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelectTutor(tutor)}
          className="text-xs font-semibold text-slate-600 hover:text-[#00528C] transition-colors"
        >
          {t.seeFullProfile}
        </button>

        <button
          onClick={() => onBookSlot(tutor)}
          className="px-4 py-2 text-xs font-bold text-white bg-[#00528C] hover:bg-[#003B66] rounded-xl transition-colors shadow-2xs"
        >
          {t.bookSession}
        </button>
      </div>
    </div>
  );
};
