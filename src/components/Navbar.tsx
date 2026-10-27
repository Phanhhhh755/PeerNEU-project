import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bell, 
  MessageSquare,
  User, 
  LogOut, 
  Clock, 
  Calendar,
  Share2,
  Globe
} from 'lucide-react';
import { AppNotification, StudentUser } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface NavbarProps {
  activeNavTab: string;
  onSelectNavTab: (tab: string) => void;
  notifications: AppNotification[];
  unreadCount: number;
  onOpenEscrowInfo: () => void;
  onOpenMessages: () => void;
  unreadMessagesCount: number;
  currentUser: StudentUser | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  onShareApp: () => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNavTab,
  onSelectNavTab,
  notifications,
  unreadCount,
  onOpenEscrowInfo,
  onOpenMessages,
  unreadMessagesCount,
  currentUser,
  onOpenAuthModal,
  onSignOut,
  onShareApp,
  language,
  onToggleLanguage
}) => {
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Branding with Blank Square Logo Slot on the left of PeerNEU */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onSelectNavTab('find-tutors')}
              className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
            >
              {/* PeerNEU Official Logo (Full HD / 4K Crisp) */}
              <div 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200 border border-[#00528C]/20 bg-[#00528C] flex items-center justify-center"
              >
                <img
                  src="/assets/aistudio/PeerNEU_-_2_ea669d64.png"
                  alt="PeerNEU Logo"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="sync"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#00528C] leading-none font-support group-hover:text-[#003B66] transition-colors">
                  PeerNEU
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                  {t.appSubtitle}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => onSelectNavTab('find-tutors')}
              className={`hover:text-[#00528C] transition-colors whitespace-nowrap pb-1 ${
                activeNavTab === 'find-tutors' ? 'text-[#00528C] font-bold border-b-2 border-[#00528C]' : ''
              }`}
            >
              {t.navBrowse}
            </button>
            <button
              onClick={() => onSelectNavTab('my-bookings')}
              className={`hover:text-[#00528C] transition-colors whitespace-nowrap pb-1 ${
                activeNavTab === 'my-bookings' ? 'text-[#00528C] font-bold border-b-2 border-[#00528C]' : ''
              }`}
            >
              {t.navSessions}
            </button>
            <button
              onClick={() => onSelectNavTab('my-profile')}
              className={`hover:text-[#00528C] transition-colors whitespace-nowrap pb-1 ${
                activeNavTab === 'my-profile' ? 'text-[#00528C] font-bold border-b-2 border-[#00528C]' : ''
              }`}
            >
              {t.navProfile}
            </button>
            <button
              onClick={onOpenEscrowInfo}
              className="flex items-center gap-1.5 hover:text-[#00528C] transition-colors whitespace-nowrap pb-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#00528C]" />
              <span>{t.navEscrow}</span>
            </button>
          </nav>

          {/* Zone 3: Actions + Language Switcher + Official NEU Logo in the Corner */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Language Switcher (VI / EN) */}
            <div className="flex items-center rounded-lg bg-slate-100 p-0.5 text-xs font-bold border border-slate-200">
              <button
                onClick={() => onToggleLanguage('vi')}
                className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
                  language === 'vi'
                    ? 'bg-[#00528C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Chuyển sang Tiếng Việt"
              >
                <span>🇻🇳 VI</span>
              </button>
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-[#00528C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                <span>🇬🇧 EN</span>
              </button>
            </div>

            {/* Share App Button */}
            <button
              onClick={onShareApp}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#00528C] bg-[#00528C]/8 hover:bg-[#00528C]/15 rounded-lg transition-colors border border-[#00528C]/20"
              title={t.navShare}
            >
              <Share2 className="w-3.5 h-3.5 text-[#00528C]" />
              <span>{t.navShare}</span>
            </button>

            {/* Chat Icon Button */}
            <button
              onClick={onOpenMessages}
              className="p-2 text-slate-600 hover:text-[#00528C] rounded-lg hover:bg-slate-100 transition-colors relative"
              title={t.navMessages}
            >
              <MessageSquare className="w-4 h-4" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#C41212] rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                className="p-2 text-slate-600 hover:text-[#00528C] rounded-lg hover:bg-slate-100 transition-colors relative"
                title={t.navAlerts}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFC101] rounded-full ring-2 ring-white" />
                )}
              </button>

              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{t.navAlerts}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{notifications.length}</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-4 text-xs text-slate-500 text-center">{t.noAlerts}</p>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className="p-3 hover:bg-slate-50 transition-colors text-xs">
                          <p className="font-semibold text-slate-900">{notif.title}</p>
                          <p className="text-slate-600 mt-0.5 text-[11px]">{notif.message}</p>
                          <span className="text-[10px] text-slate-400 font-mono mt-1 block">{notif.timestamp}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Auth / Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 hover:border-[#00528C]/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="text-left hidden md:block">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {currentUser.studentId}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-900 block">{currentUser.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{currentUser.studentId}</span>
                    </div>

                    <button
                      onClick={() => {
                        onSelectNavTab('my-profile');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.navProfile}</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectNavTab('my-bookings');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.navSessions}</span>
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          onSignOut();
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#C41212] hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.navSignOut}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#00528C] hover:bg-[#003B66] rounded-xl transition-colors shadow-2xs whitespace-nowrap"
              >
                {t.navSignIn}
              </button>
            )}

            {/* Official NEU Logo in the Corner (High-Res 4K Clean Vector/PNG) */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 shrink-0">
              <a 
                href="https://www.neu.edu.vn" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center gap-2 focus:outline-none"
                title="Đại học Kinh tế Quốc dân (NEU Official)"
              >
                <img
                  src="/assets/images/logo-neu.png"
                  alt={t.officialLogoAlt}
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform drop-shadow-2xs"
                />
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-[10px] font-bold text-[#00528C] leading-tight font-support">
                    ĐH KINH TẾ QUỐC DÂN
                  </span>
                  <span className="text-[8px] text-slate-400 font-semibold tracking-wider">
                    EST. 1956
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
