import React, { useState, useMemo } from 'react';
import { 
  INITIAL_TUTORS, 
  INITIAL_BOOKINGS, 
  INITIAL_REVIEWS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  DEFAULT_STUDENT_USER
} from './data/mockData';
import { Tutor, TimeSlot, Booking, Review, Message, AppNotification, Conversation, StudentUser } from './types';
import { Language, TRANSLATIONS, formatVND } from './utils/translations';
import { 
  getCourseName, 
  localizeDayOfWeek, 
  localizeDateStr, 
  localizeTutor, 
  getLocalizedCourses,
  getLocalizedNotifications,
  getLocalizedReviews,
  getLocalizedBookings,
  getLocalizedConversations,
  getLocalizedMessages
} from './utils/localization';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CourseFilter } from './components/CourseFilter';
import { TutorCard } from './components/TutorCard';
import { TutorProfileModal } from './components/TutorProfileModal';
import { BookingModal } from './components/BookingModal';
import { MessageDrawer } from './components/MessageDrawer';
import { StudyCallModal } from './components/StudyCallModal';
import { EscrowExplainerModal } from './components/EscrowExplainerModal';
import { ReviewModal } from './components/ReviewModal';
import { MyBookingsView } from './components/MyBookingsView';
import { MyProfileView } from './components/MyProfileView';
import { AuthModal } from './components/AuthModal';
import { NotificationToast, ToastItem } from './components/NotificationToast';

export default function App() {
  // Bilingual language state: 'vi' (default) | 'en'
  const [language, setLanguage] = useState<Language>('vi');
  const t = TRANSLATIONS[language];

  // Navigation tab state: 'find-tutors' | 'my-bookings' | 'my-profile'
  const [activeNavTab, setActiveNavTab] = useState<string>('find-tutors');

  // Authenticated Student User state
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(DEFAULT_STUDENT_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Core Data State (stores raw or user-updated objects)
  const [tutors, setTutors] = useState<Tutor[]>(INITIAL_TUTORS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [runtimeNotifications, setRuntimeNotifications] = useState<AppNotification[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<'rating' | 'price-asc' | 'sessions'>('rating');
  const [filterMode, setFilterMode] = useState<'all' | 'online' | 'campus-library'>('all');
  const [minRating, setMinRating] = useState<number>(0);

  // Modals state
  const [profileModalTutorId, setProfileModalTutorId] = useState<string | null>(null);
  const [bookingModalTutorId, setBookingModalTutorId] = useState<string | null>(null);
  const [bookingInitialSlot, setBookingInitialSlot] = useState<TimeSlot | undefined>(undefined);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [activeChatTutorId, setActiveChatTutorId] = useState<string | null>(null);
  const [activeCallTutorId, setActiveCallTutorId] = useState<string | null>(null);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);

  // Dynamically localized datasets based on active language
  const localizedCourses = useMemo(() => getLocalizedCourses(language), [language]);

  const localizedTutors = useMemo(() => {
    return tutors.map((t) => localizeTutor(t, language));
  }, [tutors, language]);

  const localizedBookings = useMemo(() => {
    return getLocalizedBookings(bookings, language);
  }, [bookings, language]);

  const localizedReviews = useMemo(() => {
    return getLocalizedReviews(reviews, language);
  }, [reviews, language]);

  const localizedConversations = useMemo(() => {
    return getLocalizedConversations(conversations, language);
  }, [conversations, language]);

  const localizedMessages = useMemo(() => {
    return getLocalizedMessages(messages, language);
  }, [messages, language]);

  // Combined notifications (runtime toasts + localized standard notifications)
  const notifications = useMemo(() => {
    const standardNotifs = getLocalizedNotifications(language);
    return [...runtimeNotifications, ...standardNotifs];
  }, [runtimeNotifications, language]);

  // Localized current user
  const effectiveCurrentUser = useMemo(() => {
    if (!currentUser) return null;
    if (currentUser.id === DEFAULT_STUDENT_USER.id) {
      return {
        ...currentUser,
        name: language === 'vi' ? 'An Minh Vũ' : 'An Minh Vu',
        classCohort: language === 'vi' ? 'Lớp K63 · Khoa Kinh doanh Quốc tế NEU' : 'Class K63 · Faculty of International Business'
      };
    }
    return currentUser;
  }, [currentUser, language]);

  // Current selected tutors for modals
  const profileModalTutor = useMemo(() => {
    if (!profileModalTutorId) return null;
    return localizedTutors.find((t) => t.id === profileModalTutorId) || null;
  }, [profileModalTutorId, localizedTutors]);

  const bookingModalTutor = useMemo(() => {
    if (!bookingModalTutorId) return null;
    return localizedTutors.find((t) => t.id === bookingModalTutorId) || null;
  }, [bookingModalTutorId, localizedTutors]);

  const activeChatTutor = useMemo(() => {
    if (!activeChatTutorId) return localizedTutors[0] || null;
    return localizedTutors.find((t) => t.id === activeChatTutorId) || localizedTutors[0];
  }, [activeChatTutorId, localizedTutors]);

  const activeCallTutor = useMemo(() => {
    if (!activeCallTutorId) return null;
    return localizedTutors.find((t) => t.id === activeCallTutorId) || null;
  }, [activeCallTutorId, localizedTutors]);

  // Helper to trigger animated push notifications and alerts
  const triggerToast = (title: string, message: string, type: 'reminder' | 'escrow' | 'success' = 'reminder') => {
    const id = `toast-${Date.now()}`;
    const newToast: ToastItem = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: type === 'escrow' ? 'escrow' : type === 'reminder' ? 'reminder' : 'booking',
      title,
      message,
      timestamp: language === 'vi' ? 'Vừa xong' : 'Just now',
      read: false
    };
    setRuntimeNotifications((prev) => [newNotif, ...prev]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // When user updates their own profile (which can toggle their tutor listing!)
  const handleUpdateCurrentUser = (updatedUser: StudentUser) => {
    setCurrentUser(updatedUser);

    if (updatedUser.isTutorActive && updatedUser.tutorProfile) {
      const existingTutorIndex = tutors.findIndex((t) => t.id === `tutor-${updatedUser.id}`);
      const userTutorCard: Tutor = {
        id: `tutor-${updatedUser.id}`,
        name: updatedUser.name,
        classCohort: updatedUser.classCohort,
        studentIdMasked: updatedUser.studentId,
        avatarUrl: updatedUser.avatarUrl,
        headline: updatedUser.tutorProfile.bio.slice(0, 70) + '...',
        bio: updatedUser.tutorProfile.bio,
        gpa: 3.90,
        hourlyRate: updatedUser.tutorProfile.hourlyRate,
        sessionFee90Min: updatedUser.tutorProfile.sessionFee90Min || 165000,
        subjects: updatedUser.tutorProfile.subjects,
        achievements: [
          language === 'vi' ? 'Danh hiệu Sinh viên Xuất sắc NEU' : 'Dean’s List Academic Honor',
          language === 'vi' ? 'Thủ khoa môn chuyên ngành đạt điểm A+' : 'Verified NEU Course Top Scorer'
        ],
        rating: updatedUser.tutorProfile.rating,
        reviewCount: updatedUser.tutorProfile.reviewCount,
        ratingBreakdown: { clarity: 4.9, examPrep: 4.9, punctuality: 4.9 },
        availableSlots: updatedUser.tutorProfile.availableSlots,
        verifiedStatus: { idVerified: true, transcriptVerified: true, neuEmailVerified: true },
        totalSessionsGiven: 8,
        completionRate: 100,
        responseTimeMinutes: 10
      };

      if (existingTutorIndex >= 0) {
        setTutors((prev) => {
          const next = [...prev];
          next[existingTutorIndex] = userTutorCard;
          return next;
        });
      } else {
        setTutors((prev) => [userTutorCard, ...prev]);
      }
    } else {
      setTutors((prev) => prev.filter((t) => t.id !== `tutor-${updatedUser.id}`));
    }
  };

  // Filtered tutors computation from localizedTutors
  const filteredTutors = useMemo(() => {
    return localizedTutors.filter((tutor) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = tutor.name.toLowerCase().includes(query);
        const matchesBio = tutor.bio.toLowerCase().includes(query);
        const matchesSubject = tutor.subjects.some((s) => {
          const subName = s.name.toLowerCase();
          const subCode = s.code.toLowerCase();
          const altName = getCourseName(s.code, language === 'vi' ? 'en' : 'vi').toLowerCase();
          return subName.includes(query) || subCode.includes(query) || altName.includes(query);
        });
        if (!matchesName && !matchesSubject && !matchesBio) return false;
      }

      if (selectedCategory !== 'all') {
        const hasCategory = tutor.subjects.some((s) => {
          const courseInfo = localizedCourses.find((c) => c.code === s.code);
          return courseInfo?.category === selectedCategory;
        });
        if (!hasCategory) return false;
      }

      if (selectedSubject !== 'all') {
        const hasSubject = tutor.subjects.some((s) => s.code === selectedSubject);
        if (!hasSubject) return false;
      }

      if (filterMode !== 'all') {
        const hasMode = tutor.availableSlots.some((slot) => slot.mode === filterMode || slot.mode === 'both');
        if (!hasMode) return false;
      }

      if (minRating > 0 && tutor.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'sessions') return b.totalSessionsGiven - a.totalSessionsGiven;
      if (selectedSort === 'price-asc') return (a.sessionFee90Min || 165000) - (b.sessionFee90Min || 165000);
      return 0;
    });
  }, [localizedTutors, localizedCourses, searchQuery, selectedCategory, selectedSubject, filterMode, minRating, selectedSort, language]);

  // Open booking modal
  const handleOpenBooking = (tutor: Tutor, slot?: TimeSlot) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setBookingModalTutorId(tutor.id);
    setBookingInitialSlot(slot);
  };

  // Confirm booking
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setBookingModalTutorId(null);

    triggerToast(
      language === 'vi' ? 'Đặt lịch thành công & Đã khóa Ký quỹ' : 'Session Booked & Escrow Vault Locked',
      language === 'vi'
        ? `${formatVND(newBooking.totalFee)} đã được khóa an toàn trong két ký quỹ #${newBooking.escrowId}. Gia sư ${newBooking.tutorName} đã nhận được thông báo.`
        : `${formatVND(newBooking.totalFee)} secured in Escrow #${newBooking.escrowId}. Tutor ${newBooking.tutorName} will be notified.`,
      'escrow'
    );
  };

  // Direct chat opener
  const handleOpenChat = (tutor: Tutor) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveChatTutorId(tutor.id);
    setIsChatOpen(true);
  };

  // Send message
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser?.id || 'tutee-me',
      senderName: effectiveCurrentUser?.name || (language === 'vi' ? 'Bạn' : 'You'),
      senderRole: 'tutee',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, lastMessage: text, lastTimestamp: language === 'vi' ? 'Vừa xong' : 'Just now' }
          : c
      )
    );

    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        conversationId,
        senderId: 'tutor-auto',
        senderName: activeChatTutor?.name || (language === 'vi' ? 'Gia sư' : 'Tutor'),
        senderRole: 'tutor',
        text: language === 'vi'
          ? 'Chào bạn, mình đã nhận tin nhắn! Mình đã chuẩn bị sẵn bộ tài liệu và câu hỏi ôn tập cho buổi học tới nhé. Hẹn gặp bạn!'
          : 'Got your message! I have prepared the practice questions for our upcoming session. See you soon!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), replyMsg]
      }));

      triggerToast(
        language === 'vi' ? `Tin nhắn mới từ ${activeChatTutor?.name || 'Gia sư'}` : `New Message from ${activeChatTutor?.name || 'Tutor'}`,
        language === 'vi' ? '"Chào bạn, mình đã nhận tin nhắn! Mình đã chuẩn bị sẵn tài liệu..."' : '"Got your message! I have prepared the practice questions..."',
        'reminder'
      );
    }, 1500);
  };

  // End call & release escrow
  const handleEndSessionAndReleaseEscrow = () => {
    if (!activeCallTutorId) return;
    const tutorId = activeCallTutorId;
    setActiveCallTutorId(null);

    const matched = bookings.find((b) => b.tutorId === tutorId && b.status === 'escrow_held');
    if (matched) {
      setBookings((prev) =>
        prev.map((b) => (b.id === matched.id ? { ...b, status: 'completed' as const } : b))
      );
      setReviewBooking(matched);
    }

    triggerToast(
      language === 'vi' ? 'Buổi học hoàn thành & Đã giải phóng Ký quỹ' : 'Session Completed & Escrow Released',
      language === 'vi' ? 'Gia sư đã nhận học phí thành công. Vui lòng để lại đánh giá nhé!' : 'Tutor has received payment. Please leave your rating!',
      'success'
    );
  };

  // Confirm manual release of escrow
  const handleConfirmReleaseEscrow = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'completed' as const } : b))
    );

    triggerToast(
      language === 'vi' ? 'Đã duyệt thanh toán Ký quỹ' : 'Escrow Payout Approved',
      language === 'vi'
        ? `Học phí ${formatVND(booking.totalFee)} đã được chuyển vào số dư ví của ${booking.tutorName}.`
        : `Payment of ${formatVND(booking.totalFee)} released to ${booking.tutorName}'s balance.`,
      'escrow'
    );

    setReviewBooking(booking);
  };

  // Submit verified review
  const handleSubmitReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);

    if (reviewBooking) {
      setBookings((prev) =>
        prev.map((b) => (b.id === reviewBooking.id ? { ...b, hasReview: true } : b))
      );
    }

    setTutors((prev) =>
      prev.map((t) => {
        if (t.id === newReview.tutorId) {
          const totalRev = t.reviewCount + 1;
          const updatedRating = (t.rating * t.reviewCount + newReview.rating) / totalRev;
          return {
            ...t,
            reviewCount: totalRev,
            rating: Number(updatedRating.toFixed(2))
          };
        }
        return t;
      })
    );

    triggerToast(
      language === 'vi' ? 'Đã đăng Đánh giá xác thực' : 'Verified Review Published',
      language === 'vi' ? 'Đánh giá của bạn đã được xác thực và cập nhật lên hồ sơ gia sư.' : 'Your review has been verified and added to the tutor profile.',
      'success'
    );
  };

  // Test push reminder
  const handleTestPushReminder = (booking: Booking) => {
    triggerToast(
      language === 'vi' ? `Nhắc nhở: Môn ${getCourseName(booking.courseCode, language, booking.courseName)} trong 1 giờ tới` : `Push Reminder: ${booking.courseName} in 1 Hour`,
      language === 'vi'
        ? `Buổi học gia sư cùng bạn ${booking.tutorName} bắt đầu lúc ${booking.slot.startTime}. Phòng học trực tuyến đã sẵn sàng.`
        : `Your peer tutoring session with ${booking.tutorName} begins at ${booking.slot.startTime}. Meeting room is ready.`,
      'reminder'
    );
  };

  // Share app handler
  const handleShareApp = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerToast(
          language === 'vi' ? 'Đã sao chép liên kết vào bộ nhớ tạm!' : 'Link Copied to Clipboard!',
          language === 'vi' ? 'Chia sẻ link này cho bạn bè sinh viên NEU để cùng trải nghiệm nhé.' : 'Share this link with your NEU classmates so they can test the app.',
          'success'
        );
      }).catch(() => {
        triggerToast('App Share URL', shareUrl, 'reminder');
      });
    } else {
      triggerToast('App Share URL', shareUrl, 'reminder');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        activeNavTab={activeNavTab}
        onSelectNavTab={setActiveNavTab}
        notifications={notifications}
        unreadCount={notifications.filter((n) => !n.read).length}
        onOpenEscrowInfo={() => setIsEscrowModalOpen(true)}
        onOpenMessages={() => {
          if (!currentUser) {
            setIsAuthModalOpen(true);
            return;
          }
          setIsChatOpen(true);
        }}
        unreadMessagesCount={1}
        currentUser={effectiveCurrentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={() => {
          setCurrentUser(null);
          triggerToast(
            language === 'vi' ? 'Đã đăng xuất' : 'Signed Out',
            language === 'vi' ? 'Bạn đã đăng xuất khỏi tài khoản.' : 'You have been signed out.',
            'reminder'
          );
        }}
        onShareApp={handleShareApp}
        language={language}
        onToggleLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeNavTab === 'find-tutors' && (
          <div>
            {/* Clean, simplified Search Header */}
            <HeroSection
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSelectedSubject('all');
              }}
              onOpenEscrowModal={() => setIsEscrowModalOpen(true)}
              language={language}
            />

            {/* Simplified Catalog Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-5">
              {/* Filter controls */}
              <CourseFilter
                courses={localizedCourses}
                selectedSubject={selectedSubject}
                onSelectSubject={(code) => setSelectedSubject(code)}
                selectedSort={selectedSort}
                onSelectSort={setSelectedSort}
                filterMode={filterMode}
                onSelectFilterMode={setFilterMode}
                minRating={minRating}
                onSelectMinRating={setMinRating}
                totalFound={filteredTutors.length}
                language={language}
              />

              {/* Simplified Tutor Cards */}
              {filteredTutors.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-700">{t.noTutorsFound}</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedSubject('all');
                      setFilterMode('all');
                      setMinRating(0);
                    }}
                    className="px-4 py-2 bg-[#00528C] text-white text-xs font-semibold rounded-lg hover:bg-[#003B66] transition-colors"
                  >
                    {t.resetFilters}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTutors.map((tutor) => (
                    <TutorCard
                      key={tutor.id}
                      tutor={tutor}
                      onSelectTutor={(t) => setProfileModalTutorId(t.id)}
                      onBookSlot={(t, slot) => handleOpenBooking(t, slot)}
                      onOpenChat={(t) => handleOpenChat(t)}
                      language={language}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Sessions Tab (Both as Student and as Tutor) */}
        {activeNavTab === 'my-bookings' && (
          <MyBookingsView
            bookings={localizedBookings}
            tutors={localizedTutors}
            currentUserName={effectiveCurrentUser?.name || (language === 'vi' ? 'Bạn' : 'You')}
            onLaunchCall={(t) => setActiveCallTutorId(t.id)}
            onOpenChat={handleOpenChat}
            onConfirmReleaseEscrow={handleConfirmReleaseEscrow}
            onOpenReviewModal={(b) => setReviewBooking(b)}
            onTestPushReminder={handleTestPushReminder}
            onBrowseTutors={() => setActiveNavTab('find-tutors')}
            language={language}
          />
        )}

        {/* My Profile Tab (Dual persona: book tutors as tutee + upload profile as tutor) */}
        {activeNavTab === 'my-profile' && (
          currentUser ? (
            <MyProfileView
              currentUser={effectiveCurrentUser || currentUser}
              availableCourses={localizedCourses}
              onUpdateUser={handleUpdateCurrentUser}
              onBrowseTutors={() => setActiveNavTab('find-tutors')}
              onTriggerToast={triggerToast}
              language={language}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-support">
                {language === 'vi' ? 'Đăng nhập để vào Hồ sơ của tôi' : 'Sign in to access My Profile'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'vi'
                  ? 'Bạn có thể đăng ký gia sư các môn mình đạt điểm cao để trang trải sinh hoạt phí, đồng thời tự đặt gia sư cho các môn cần hỗ trợ.'
                  : 'You can upload your tutor listing to attract tutees and earn living expenses, while also booking your own tutors.'}
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-2.5 bg-[#00528C] hover:bg-[#003B66] text-white text-xs font-bold rounded-xl transition-colors font-support"
              >
                {t.navSignIn}
              </button>
            </div>
          )
        )}
      </main>

      {/* Clean Footer with Official NEU Brand & PeerNEU naming */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#00528C] font-support">PeerNEU</span>
            <span aria-hidden="true">·</span>
            <span>{t.appSubtitle}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{t.neuAffiliation}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEscrowModalOpen(true)}
              className="hover:text-[#00528C] transition-colors"
            >
              {t.navEscrow}
            </button>
            <span aria-hidden="true">·</span>
            <span>© 2026 PeerNEU</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Auth Modal (Google & Phone Sign-In) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          triggerToast(
            language === 'vi' ? `Chào mừng, ${user.name}` : `Welcome, ${user.name}`,
            language === 'vi' ? `Đăng nhập thành công qua ${user.authMethod === 'google' ? 'Google' : 'Số điện thoại'}.` : `Signed in successfully via ${user.authMethod}.`,
            'success'
          );
        }}
        language={language}
      />

      {/* 2. Full Tutor Profile Modal */}
      <TutorProfileModal
        tutor={profileModalTutor}
        onClose={() => setProfileModalTutorId(null)}
        onBookSlot={(t, slot) => handleOpenBooking(t, slot)}
        onOpenChat={(t) => handleOpenChat(t)}
        reviews={localizedReviews}
        language={language}
      />

      {/* 3. Multi-Step Booking & Escrow Checkout Modal */}
      <BookingModal
        key={`${bookingModalTutor?.id || 'none'}-${language}`}
        tutor={bookingModalTutor}
        initialSlot={bookingInitialSlot}
        onClose={() => {
          setBookingModalTutorId(null);
          setBookingInitialSlot(undefined);
        }}
        onConfirmBooking={handleConfirmBooking}
        language={language}
      />

      {/* 4. Escrow Security Modal */}
      <EscrowExplainerModal
        isOpen={isEscrowModalOpen}
        onClose={() => setIsEscrowModalOpen(false)}
        language={language}
      />

      {/* 5. Messenger Drawer */}
      <MessageDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        activeTutor={activeChatTutor}
        conversations={localizedConversations}
        messages={localizedMessages}
        onSendMessage={handleSendMessage}
        onStartCall={(t) => {
          setIsChatOpen(false);
          setActiveCallTutorId(t.id);
        }}
        language={language}
      />

      {/* 6. Live Study Call & Whiteboard Modal */}
      <StudyCallModal
        isOpen={Boolean(activeCallTutor)}
        onClose={() => setActiveCallTutorId(null)}
        tutor={activeCallTutor || localizedTutors[0]}
        onEndSessionAndReleaseEscrow={handleEndSessionAndReleaseEscrow}
      />

      {/* 7. Verified Review Modal */}
      <ReviewModal
        booking={reviewBooking}
        onClose={() => setReviewBooking(null)}
        onSubmitReview={handleSubmitReview}
        language={language}
      />

      {/* 8. Floating Push Reminder Toasts */}
      <NotificationToast
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </div>
  );
}
