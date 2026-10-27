import React, { useState } from 'react';
import { 
  UserCheck, 
  DollarSign, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Video, 
  MessageSquare, 
  Upload, 
  ArrowUpRight, 
  Award,
  Wallet
} from 'lucide-react';
import { Tutor, Booking, TimeSlot } from '../types';

interface TutorDashboardProps {
  tutor: Tutor;
  bookings: Booking[];
  onUpdateTutor: (updated: Tutor) => void;
  onLaunchCall: (tutor: Tutor) => void;
  onOpenChat: (tutor: Tutor) => void;
  onConfirmPayout: (amount: number) => void;
  onTriggerNotification: (title: string, message: string) => void;
}

export const TutorDashboard: React.FC<TutorDashboardProps> = ({
  tutor,
  bookings,
  onUpdateTutor,
  onLaunchCall,
  onOpenChat,
  onConfirmPayout,
  onTriggerNotification
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile-form' | 'schedule' | 'wallet'>('overview');

  // Edit form state
  const [name, setName] = useState(tutor.name);
  const [headline, setHeadline] = useState(tutor.headline);
  const [classCohort, setClassCohort] = useState(tutor.classCohort);
  const [hourlyRate, setHourlyRate] = useState(tutor.hourlyRate);
  const [bio, setBio] = useState(tutor.bio);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>(tutor.availableSlots);

  // New slot inputs
  const [newDay, setNewDay] = useState('Monday');
  const [newDate, setNewDate] = useState('Nov 03, 2026');
  const [newStart, setNewStart] = useState('18:00');
  const [newEnd, setNewEnd] = useState('19:30');
  const [newMode, setNewMode] = useState<'online' | 'campus-library' | 'both'>('online');

  // Wallet payout modal state
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [walletBalance, setWalletBalance] = useState(380.00);
  const [escrowLocked, setEscrowLocked] = useState(48.00);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Tutor = {
      ...tutor,
      name,
      headline,
      classCohort,
      hourlyRate: Number(hourlyRate),
      bio,
      availableSlots
    };
    onUpdateTutor(updated);
    onTriggerNotification(
      'Tutor Profile Updated',
      'Your profile changes and free time slots are live on the NEU student network.'
    );
  };

  const handleAddSlot = () => {
    const slot: TimeSlot = {
      id: `slot-${Date.now()}`,
      dayOfWeek: newDay,
      dateStr: newDate,
      startTime: newStart,
      endTime: newEnd,
      isBooked: false,
      mode: newMode
    };
    const updatedSlots = [...availableSlots, slot];
    setAvailableSlots(updatedSlots);
    onUpdateTutor({
      ...tutor,
      availableSlots: updatedSlots
    });
  };

  const handleRemoveSlot = (id: string) => {
    const updatedSlots = availableSlots.filter((s) => s.id !== id);
    setAvailableSlots(updatedSlots);
    onUpdateTutor({
      ...tutor,
      availableSlots: updatedSlots
    });
  };

  const handleWithdrawFunds = () => {
    if (walletBalance <= 0) return;
    const amount = walletBalance;
    setWalletBalance(0);
    setPayoutSuccess(true);
    onConfirmPayout(amount);
    onTriggerNotification(
      'Payout Transferred to Bank',
      `$${amount.toFixed(2)} (~${(amount * 25).toLocaleString()}k VND) sent to student bank account.`
    );
    setTimeout(() => setPayoutSuccess(false), 4000);
  };

  const tutorBookings = bookings.filter((b) => b.tutorId === tutor.id || b.tutorName === tutor.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Tutor Persona Status */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img
              src={tutor.avatarUrl}
              alt={tutor.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{tutor.name}</h2>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Tutor
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{tutor.classCohort}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="font-mono text-slate-600">{tutor.studentIdMasked}</span>
              <span aria-hidden="true">·</span>
              <span>Rate: ${tutor.hourlyRate}/hr</span>
              <span aria-hidden="true">·</span>
              <span>{tutor.totalSessionsGiven} sessions given</span>
            </div>
          </div>
        </div>

        {/* Action Tabs for Tutor */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 md:flex-none px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Bookings
          </button>
          <button
            onClick={() => setActiveTab('profile-form')}
            className={`flex-1 md:flex-none px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'profile-form' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Edit Profile & Marks
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 md:flex-none px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'schedule' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Free Slots ({availableSlots.length})
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 md:flex-none px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'wallet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Wallet (${walletBalance.toFixed(0)})
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & INCOMING SESSIONS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500 block">Total Lifetime Earnings</span>
              <div className="text-2xl font-bold text-slate-900 font-mono mt-1 tabular-nums">
                ${(tutor.totalSessionsGiven * tutor.hourlyRate * 1.2).toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 mt-1">Covers university living expenses & textbooks</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500 block">Escrow Protected In-Transit</span>
              <div className="text-2xl font-bold text-indigo-700 font-mono mt-1 tabular-nums">
                ${escrowLocked.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 mt-1">Held in university escrow pending session end</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500 block">Student Rating Score</span>
              <div className="text-2xl font-bold text-slate-900 font-mono mt-1 tabular-nums">
                {tutor.rating.toFixed(2)} / 5.0
              </div>
              <p className="text-xs text-slate-500 mt-1">Across {tutor.reviewCount} verified tutee evaluations</p>
            </div>
          </div>

          {/* Incoming & Active Student Sessions */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Student Tutoring Sessions
                </h3>
                <p className="text-xs text-slate-500">
                  Tutees who booked slots with you through the escrow platform
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                {tutorBookings.length} Bookings
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {tutorBookings.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No upcoming bookings yet. When students select your available slots, they will appear here.
                </div>
              ) : (
                tutorBookings.map((b) => (
                  <div key={b.id} className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{b.courseName}</span>
                        <span className="text-xs font-mono font-medium text-slate-500">({b.courseCode})</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Escrow Secured: ${b.totalFee.toFixed(2)}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600">
                        Student: <strong className="text-slate-800">{b.tuteeName}</strong> ({b.tuteeStudentId})
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-3">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {b.slot.dayOfWeek}, {b.slot.dateStr}
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {b.slot.startTime} - {b.slot.endTime} ({b.durationMinutes} mins)
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100 max-w-xl">
                        "Goal: {b.learningGoals}"
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onOpenChat(tutor)}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        <span>Chat Tutee</span>
                      </button>

                      <button
                        onClick={() => onLaunchCall(tutor)}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Enter Live Study Room</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROFILE EDIT & MARKS */}
      {activeTab === 'profile-form' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Tutor Profile & Academic Competencies
            </h3>
            <p className="text-xs text-slate-500">
              Upload your details, set expected hourly fee, and verify your marks to gain student trust
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                Class / Cohort & Faculty
              </label>
              <input
                type="text"
                value={classCohort}
                onChange={(e) => setClassCohort(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                Expected Tutor Fee ($/hr)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-mono font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full pl-8 text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                />
              </div>
              <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                Approx {(hourlyRate * 25).toLocaleString()}k VND/hr
              </span>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                Headline / Subtitle
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Introduction & Teaching Philosophy
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed"
            />
          </div>

          {/* Subjects & Uploaded Marks Status */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Course High Marks
              </span>
              <span className="text-xs text-emerald-700 font-medium">NEU Portal Verified</span>
            </div>
            <div className="space-y-2">
              {tutor.subjects.map((sub) => (
                <div key={sub.code} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{sub.name}</span>
                    <span className="text-slate-500 font-mono ml-1.5">({sub.code})</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {sub.mark}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              Save & Update Live Profile
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: MANAGE FREE SLOTS */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Manage Your Available Free Time Slots
            </h3>
            <p className="text-xs text-slate-500">
              Set the hours when you are free to mentor students. Tutees can only book during these verified windows.
            </p>
          </div>

          {/* Add New Slot Strip */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Add New Free Time Slot
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Day of Week</label>
                <select
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Date</label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Start Time</label>
                <input
                  type="time"
                  value={newStart}
                  onChange={(e) => setNewStart(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">End Time</label>
                <input
                  type="time"
                  value={newEnd}
                  onChange={(e) => setNewEnd(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Format</label>
                <select
                  value={newMode}
                  onChange={(e) => setNewMode(e.target.value as any)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option value="online">Online Call</option>
                  <option value="campus-library">Library B2</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAddSlot}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Slot to Schedule</span>
            </button>
          </div>

          {/* Current Slots List */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Active Time Slots Available for Booking
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {slot.dayOfWeek} · {slot.dateStr}
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      {slot.startTime} - {slot.endTime} ({slot.mode})
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveSlot(slot.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Remove slot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WALLET & PAYOUTS */}
      {activeTab === 'wallet' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-indigo-600" />
              Tutor Payouts & Living Expenses Wallet
            </h3>
            <p className="text-xs text-slate-500">
              Funds earned from completed tutoring sessions are automatically credited here and can be withdrawn directly to your student bank account.
            </p>
          </div>

          {payoutSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Withdrawal request processed! Funds dispatched to Techcombank account ending in 8841.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">
                Available Balance
              </span>
              <div className="text-3xl font-black font-mono tabular-nums">
                ${walletBalance.toFixed(2)}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                ~{(walletBalance * 25).toLocaleString()}k VND ready for payout
              </p>

              <button
                onClick={handleWithdrawFunds}
                disabled={walletBalance <= 0}
                className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Withdraw to Student Bank Account</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs text-slate-500 uppercase tracking-wider block">
                Escrow Protected Funds (In Session)
              </span>
              <div className="text-3xl font-black font-mono tabular-nums text-slate-900">
                ${escrowLocked.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 font-mono">
                ~{(escrowLocked * 25).toLocaleString()}k VND locked in escrow
              </p>
              <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-semibold block text-slate-900 mb-1">Escrow Release Policy:</span>
                Funds are immediately moved to your available balance as soon as the tutee confirms completion or 24h after attendance verification.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
