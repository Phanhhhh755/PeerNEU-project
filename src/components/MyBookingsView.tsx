import React, { useState } from 'react';
import { 
  Video, 
  MessageSquare, 
  Star, 
  Bell
} from 'lucide-react';
import { Booking, Tutor } from '../types';
import { Language, TRANSLATIONS, formatVND } from '../utils/translations';
import { localizeDayOfWeek, localizeDateStr, getCourseName } from '../utils/localization';

interface MyBookingsViewProps {
  bookings: Booking[];
  tutors: Tutor[];
  currentUserName: string;
  onLaunchCall: (tutor: Tutor) => void;
  onOpenChat: (tutor: Tutor) => void;
  onConfirmReleaseEscrow: (bookingId: string) => void;
  onOpenReviewModal: (booking: Booking) => void;
  onTestPushReminder: (booking: Booking) => void;
  onBrowseTutors: () => void;
  language?: Language;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  tutors,
  currentUserName,
  onLaunchCall,
  onOpenChat,
  onConfirmReleaseEscrow,
  onOpenReviewModal,
  onTestPushReminder,
  onBrowseTutors,
  language = 'vi'
}) => {
  const [roleFilter, setRoleFilter] = useState<'all' | 'learning' | 'tutoring'>('all');
  const t = TRANSLATIONS[language];

  const filteredBookings = bookings.filter((b) => {
    if (roleFilter === 'learning') return b.tuteeName.includes(currentUserName) || b.tuteeName.includes('You') || b.tuteeName.includes('Bạn');
    if (roleFilter === 'tutoring') return b.tutorName.includes(currentUserName);
    return true;
  });

  const upcomingBookings = filteredBookings.filter((b) => b.status === 'escrow_held' || b.status === 'confirmed');
  const pastBookings = filteredBookings.filter((b) => b.status === 'completed' || b.status === 'released');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-support">
            {t.mySessionsTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.mySessionsSub}
          </p>
        </div>

        {/* Role Segmented Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              roleFilter === 'all' ? 'bg-[#00528C] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.allSessions}
          </button>
          <button
            onClick={() => setRoleFilter('learning')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              roleFilter === 'learning' ? 'bg-[#00528C] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.learningSessions}
          </button>
          <button
            onClick={() => setRoleFilter('tutoring')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              roleFilter === 'tutoring' ? 'bg-[#00528C] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tutoringSessions}
          </button>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 font-support">
            {t.upcomingSessions} ({upcomingBookings.length})
          </h3>
          <span className="text-xs text-[#00528C] bg-[#00528C]/8 px-2.5 py-0.5 rounded font-mono font-bold border border-[#00528C]/20">
            {language === 'vi' ? 'Bảo đảm Ký quỹ 100%' : 'Escrow Protected'}
          </span>
        </div>

        {upcomingBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
            <p className="text-xs text-slate-500">{t.noUpcomingSessions}</p>
            <button
              onClick={onBrowseTutors}
              className="px-4 py-2 bg-[#00528C] text-white text-xs font-semibold rounded-xl hover:bg-[#003B66] transition-colors"
            >
              {t.navBrowse}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {upcomingBookings.map((b) => {
              const matchedTutor = tutors.find((t) => t.id === b.tutorId) || tutors[0];

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={b.tutorAvatar}
                        alt={b.tutorName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 font-support">
                          {getCourseName(b.courseCode, language, b.courseName)}
                        </span>
                        <span className="text-xs font-mono text-slate-500">({b.courseCode})</span>
                      </div>

                      <div className="text-xs text-slate-600">
                        {language === 'vi' ? 'Gia sư' : 'Tutor'}: <strong>{b.tutorName}</strong> · {language === 'vi' ? 'Sinh viên' : 'Tutee'}: <strong>{b.tuteeName}</strong>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                        <span>{localizeDayOfWeek(b.slot.dayOfWeek, language)}, {localizeDateStr(b.slot.dateStr, language)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{b.slot.startTime} - {b.slot.endTime}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#00528C] font-bold">
                          {formatVND(b.totalFee)} {language === 'vi' ? 'trong két ký quỹ' : 'in Escrow'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-stretch md:self-auto justify-end flex-wrap">
                    <button
                      onClick={() => onTestPushReminder(b)}
                      className="px-2.5 py-1.5 bg-[#FFC101]/15 hover:bg-[#FFC101]/25 border border-[#FFC101]/40 text-amber-900 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                      title={t.testReminder}
                    >
                      <Bell className="w-3.5 h-3.5 text-amber-700" />
                      <span>{t.testReminder}</span>
                    </button>

                    <button
                      onClick={() => onOpenChat(matchedTutor)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>{t.chat}</span>
                    </button>

                    <button
                      onClick={() => onLaunchCall(matchedTutor)}
                      className="px-3.5 py-1.5 bg-[#00528C] hover:bg-[#003B66] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{t.joinRoom}</span>
                    </button>

                    <button
                      onClick={() => onConfirmReleaseEscrow(b.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                      title={t.releaseEscrow}
                    >
                      {t.releaseEscrow}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past Sessions */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 font-support">
          {t.completedSessions} ({pastBookings.length})
        </h3>

        <div className="grid grid-cols-1 gap-2.5">
          {pastBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl border border-slate-200 p-3.5 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-slate-900">
                  {getCourseName(b.courseCode, language, b.courseName)}
                </span>
                <span className="text-slate-500 ml-2 font-mono">({localizeDateStr(b.slot.dateStr, language)})</span>
                <span className="text-[#00528C] ml-2 font-semibold font-mono">
                  ● {formatVND(b.totalFee)} {language === 'vi' ? 'đã giải ngân' : 'Escrow Paid'}
                </span>
              </div>

              <div>
                {b.hasReview ? (
                  <span className="text-slate-400 font-mono">{t.reviewPublished}</span>
                ) : (
                  <button
                    onClick={() => onOpenReviewModal(b)}
                    className="px-3 py-1 bg-[#FFC101]/20 hover:bg-[#FFC101]/30 border border-[#FFC101]/50 text-amber-900 rounded-lg font-semibold flex items-center gap-1"
                  >
                    <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                    <span>{t.rateTutor}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
