import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ArrowRight,
  Wallet,
  GraduationCap
} from 'lucide-react';
import { StudentUser, TimeSlot, CourseFilterOption } from '../types';
import { Language, TRANSLATIONS, formatVND } from '../utils/translations';
import { localizeDayOfWeek, localizeDateStr, getCourseName } from '../utils/localization';

interface MyProfileViewProps {
  currentUser: StudentUser;
  availableCourses: CourseFilterOption[];
  onUpdateUser: (updatedUser: StudentUser) => void;
  onBrowseTutors: () => void;
  onTriggerToast: (title: string, message: string, type?: 'reminder' | 'escrow' | 'success') => void;
  language?: Language;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  currentUser,
  availableCourses,
  onUpdateUser,
  onBrowseTutors,
  onTriggerToast,
  language = 'vi'
}) => {
  const t = TRANSLATIONS[language];
  const [isTutorActive, setIsTutorActive] = useState<boolean>(currentUser.isTutorActive);
  
  // Fee per 90-min session in VND hovering 150k - 200k
  const [sessionFee90Min, setSessionFee90Min] = useState<number>(165000);
  const [bio, setBio] = useState<string>(
    currentUser.tutorProfile?.bio ||
    (language === 'vi'
      ? 'Sinh viên đạt học bổng xuất sắc, sẵn sàng chia sẻ kinh nghiệm ôn thi, giải case study và chữa bài tập cho các bạn khóa dưới.'
      : 'High-performing student ready to tutor classmates in course concepts, homework problems, and exam review.')
  );
  const [slots, setSlots] = useState<TimeSlot[]>(
    currentUser.tutorProfile?.availableSlots || [
      {
        id: 'slot-usr-1',
        dayOfWeek: language === 'vi' ? 'Thứ Năm' : 'Thursday',
        dateStr: language === 'vi' ? '05/11/2026' : 'Nov 05, 2026',
        startTime: '19:00',
        endTime: '20:30',
        isBooked: false,
        mode: 'online'
      }
    ]
  );
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(availableCourses[0]?.code || 'LAW102');
  const [markAchieved, setMarkAchieved] = useState<string>('A+ (9.5/10)');

  // New slot inputs
  const [newDay, setNewDay] = useState(language === 'vi' ? 'Thứ Sáu' : 'Friday');
  const [newDate, setNewDate] = useState(language === 'vi' ? '06/11/2026' : 'Nov 06, 2026');
  const [newStart, setNewStart] = useState('18:00');
  const [newEnd, setNewEnd] = useState('19:30');

  // Wallet
  const [walletBalance, setWalletBalance] = useState<number>(currentUser.tutorProfile?.walletBalance || 480000);

  const handleAddSlot = () => {
    const newSlot: TimeSlot = {
      id: `slot-user-${Date.now()}`,
      dayOfWeek: newDay,
      dateStr: newDate,
      startTime: newStart,
      endTime: newEnd,
      isBooked: false,
      mode: 'online'
    };
    setSlots([...slots, newSlot]);
  };

  const handleRemoveSlot = (id: string) => {
    setSlots(slots.filter((s) => s.id !== id));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const courseNameLocalized = getCourseName(selectedSubjectCode, language);
    const updatedUser: StudentUser = {
      ...currentUser,
      isTutorActive,
      tutorProfile: {
        hourlyRate: Math.round(sessionFee90Min / 1.5),
        sessionFee90Min,
        subjects: [
          {
            code: selectedSubjectCode,
            name: courseNameLocalized,
            mark: markAchieved,
            gradeLetter: 'A+',
            transcriptVerified: true,
            termAchieved: 'Term 1, 2025-2026'
          }
        ],
        bio,
        availableSlots: slots,
        walletBalance,
        rating: currentUser.tutorProfile?.rating || 4.90,
        reviewCount: currentUser.tutorProfile?.reviewCount || 8
      }
    };

    onUpdateUser(updatedUser);
    onTriggerToast(
      language === 'vi' ? 'Đã lưu hồ sơ thành công' : 'Profile Updated',
      isTutorActive
        ? (language === 'vi'
            ? 'Hồ sơ gia sư của bạn đã xuất hiện trên hệ thống PeerNEU. Bạn cũng có thể tìm và đặt lịch các gia sư khác bất cứ lúc nào!'
            : 'Your tutor listing is live on PeerNEU. You can also browse and book other tutors anytime!')
        : (language === 'vi'
            ? 'Hồ sơ cá nhân của bạn đã được cập nhật.'
            : 'Your personal profile has been saved.'),
      'success'
    );
  };

  const handleWithdraw = () => {
    if (walletBalance <= 0) return;
    const amount = walletBalance;
    setWalletBalance(0);
    onTriggerToast(
      language === 'vi' ? 'Lệnh rút tiền đã được gửi' : 'Payout Dispatched',
      language === 'vi'
        ? `Đã chuyển ${formatVND(amount)} về tài khoản ngân hàng sinh viên của bạn.`
        : `${formatVND(amount)} transferred to your bank account.`,
      'success'
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: User Identity */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 font-support">{currentUser.name}</h2>
              <span className="flex items-center gap-1 text-xs font-semibold text-[#00528C] bg-[#00528C]/8 px-2 py-0.5 rounded border border-[#00528C]/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.verifiedStudent}
              </span>
            </div>
            <p className="text-xs text-slate-600">{currentUser.classCohort}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
              <span>{currentUser.studentId}</span>
              <span aria-hidden="true">·</span>
              <span>{currentUser.email || currentUser.phoneNumber}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onBrowseTutors}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#00528C] hover:bg-[#003B66] rounded-xl transition-colors shadow-2xs self-stretch sm:self-auto justify-center"
        >
          <span>{t.navBrowse}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
        {/* Toggle: Dual Persona Tutor Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#00528C]/5 border border-[#00528C]/20">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#00528C]" />
              <h3 className="text-sm font-bold text-[#00528C] font-support">
                {t.offerTutoringToggle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {t.offerTutoringSub}
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={isTutorActive}
              onChange={(e) => setIsTutorActive(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00528C]" />
          </label>
        </div>

        {/* If Tutor Mode is Active */}
        {isTutorActive ? (
          <div className="space-y-6 pt-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 font-support">
                {t.courseExcelIn}
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                {t.courseExcelSub}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.subjectLabel}</label>
                  <select
                    value={selectedSubjectCode}
                    onChange={(e) => setSelectedSubjectCode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C]"
                  >
                    {availableCourses.map((c) => (
                      <option key={c.code} value={c.code}>
                        {getCourseName(c.code, language, c.name)} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.achievedMark}
                  </label>
                  <input
                    type="text"
                    value={markAchieved}
                    onChange={(e) => setMarkAchieved(e.target.value)}
                    placeholder="e.g. A+ (9.5/10)"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C] font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Expected Tutor Fee in pure VND hovering around 150k - 200k */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1 font-support">
                  {t.expectedFeeLabel}
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    step="5000"
                    min="100000"
                    max="300000"
                    value={sessionFee90Min}
                    onChange={(e) => setSessionFee90Min(Number(e.target.value))}
                    className="w-full text-xs p-3 pr-12 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C] font-mono font-bold text-slate-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-[20px] text-xs font-bold text-[#00528C] font-mono pointer-events-none select-none">
                    đ
                  </span>
                </div>
                <span className="text-[11px] text-[#00528C] font-semibold mt-1 block">
                  {t.feeHint} ({formatVND(sessionFee90Min)})
                </span>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1 font-support">
                  {t.introLabel}
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={t.introPlaceholder}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C]"
                />
              </div>
            </div>

            {/* Manage Available Free Time Slots */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-support">
                  {t.freeSlotsLabel} ({slots.length})
                </span>
                <span className="text-xs text-slate-500">{t.slotsDesc}</span>
              </div>

              {/* Add slot strip */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                  className="p-2 bg-white border border-slate-300 rounded-lg text-xs"
                >
                  {language === 'vi' ? (
                    <>
                      <option value="Thứ Hai">Thứ Hai</option>
                      <option value="Thứ Ba">Thứ Ba</option>
                      <option value="Thứ Tư">Thứ Tư</option>
                      <option value="Thứ Năm">Thứ Năm</option>
                      <option value="Thứ Sáu">Thứ Sáu</option>
                      <option value="Thứ Bảy">Thứ Bảy</option>
                      <option value="Chủ Nhật">Chủ Nhật</option>
                    </>
                  ) : (
                    <>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </>
                  )}
                </select>

                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder={language === 'vi' ? '06/11/2026' : 'Nov 06, 2026'}
                  className="p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono w-28"
                />

                <input
                  type="time"
                  value={newStart}
                  onChange={(e) => setNewStart(e.target.value)}
                  className="p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                />

                <input
                  type="time"
                  value={newEnd}
                  onChange={(e) => setNewEnd(e.target.value)}
                  className="p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                />

                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="px-3 py-2 bg-[#00528C] hover:bg-[#003B66] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addTimeSlot}</span>
                </button>
              </div>

              {/* Slots list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {slots.map((s) => (
                  <div
                    key={s.id}
                    className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800">
                        {localizeDayOfWeek(s.dayOfWeek, language)} · {localizeDateStr(s.dateStr, language)}
                      </span>
                      <span className="text-slate-500 font-mono ml-2">{s.startTime} - {s.endTime}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(s.id)}
                      className="text-slate-400 hover:text-[#C41212] p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Wallet & Payout in VND */}
            <div className="p-4 rounded-xl bg-[#00528C] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-[11px] text-slate-200 uppercase tracking-wider block font-semibold">
                  {t.tutorWallet}
                </span>
                <div className="text-2xl font-black font-mono tabular-nums mt-0.5">
                  {formatVND(walletBalance)}
                </div>
                <p className="text-xs text-slate-200 mt-1">{t.walletSub}</p>
              </div>

              <button
                type="button"
                onClick={handleWithdraw}
                disabled={walletBalance <= 0}
                className="px-4 py-2 bg-white hover:bg-slate-100 disabled:opacity-40 text-[#00528C] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Wallet className="w-4 h-4" />
                <span>{t.withdrawPayout}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-slate-500 space-y-2">
            <p className="leading-relaxed">{t.tuteeOnlyMsg}</p>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#00528C] hover:bg-[#003B66] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
          >
            {t.saveProfileBtn}
          </button>
        </div>
      </form>
    </div>
  );
};
