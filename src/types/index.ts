export interface SubjectCompetency {
  code: string;
  name: string;
  mark: string; // e.g. "A+ (9.6/10)"
  gradeLetter: 'A+' | 'A' | 'A-';
  transcriptVerified: boolean;
  termAchieved: string;
}

export interface TimeSlot {
  id: string;
  dayOfWeek: string; // e.g. "Monday", "Tuesday"
  dateStr: string;   // e.g. "Oct 27, 2026"
  startTime: string; // e.g. "18:00"
  endTime: string;   // e.g. "19:30"
  isBooked: boolean;
  mode: 'online' | 'campus-library' | 'both';
}

export interface RatingBreakdown {
  clarity: number;
  examPrep: number;
  punctuality: number;
}

export interface VerifiedStatus {
  idVerified: boolean;
  transcriptVerified: boolean;
  neuEmailVerified: boolean;
}

export interface Tutor {
  id: string;
  name: string;
  classCohort: string; // e.g. "K62 International Business", "K63 Auditing"
  studentIdMasked: string; // e.g. "NEU-1120****"
  avatarUrl: string;
  headline: string;
  bio: string;
  gpa: number; // e.g. 3.92
  hourlyRate: number; // in VND (e.g. 110000 VND/hr)
  sessionFee90Min: number; // in VND (e.g. 165000 VND for 90-min session, 150k - 200k)
  subjects: SubjectCompetency[];
  achievements: string[];
  rating: number;
  reviewCount: number;
  ratingBreakdown: RatingBreakdown;
  availableSlots: TimeSlot[];
  verifiedStatus: VerifiedStatus;
  totalSessionsGiven: number;
  completionRate: number;
  responseTimeMinutes: number;
}

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  tuteeName: string;
  tuteeStudentId: string;
  courseCode: string;
  courseName: string;
  slot: TimeSlot;
  durationMinutes: number;
  totalFee: number;
  status: 'escrow_held' | 'confirmed' | 'in_progress' | 'completed' | 'released' | 'disputed';
  learningGoals: string;
  meetingLink?: string;
  escrowId: string;
  createdAt: string;
  reminderEnabled: boolean;
  reminderSettings: {
    before24h: boolean;
    before1h: boolean;
    before15m: boolean;
  };
  hasReview: boolean;
}

export interface Review {
  id: string;
  tutorId: string;
  studentName: string;
  studentCohort: string;
  courseCode: string;
  rating: number;
  clarityScore: number;
  examScore: number;
  punctualityScore: number;
  comment: string;
  date: string;
  verifiedBooking: boolean;
  gradeImprovement?: string; // e.g. "Improved from C+ to A"
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'tutor' | 'tutee';
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
    type: 'pdf' | 'doc' | 'image' | 'link';
  };
}

export interface Conversation {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  tuteeName: string;
  courseContext: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

export interface AppNotification {
  id: string;
  type: 'reminder' | 'escrow' | 'booking' | 'message' | 'review';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  bookingId?: string;
}

export interface CourseFilterOption {
  code: string;
  name: string;
  category: 'Law' | 'Accounting' | 'Marketing' | 'Economics' | 'Finance' | 'Quantitative';
}

export interface StudentUser {
  id: string;
  name: string;
  studentId: string;
  email?: string;
  phoneNumber?: string;
  authMethod: 'google' | 'phone';
  avatarUrl: string;
  classCohort: string;
  isTutorActive: boolean;
  tutorProfile?: {
    hourlyRate: number;
    sessionFee90Min?: number;
    subjects: SubjectCompetency[];
    bio: string;
    availableSlots: TimeSlot[];
    walletBalance: number;
    rating: number;
    reviewCount: number;
  };
}
