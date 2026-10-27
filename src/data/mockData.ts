import { Tutor, CourseFilterOption, Booking, Review, Conversation, Message, AppNotification, StudentUser } from '../types';
import stockFemaleStudent from '../assets/images/stock_student_portrait_female_1792903823110.jpg';
import stockMaleStudent from '../assets/images/stock_student_portrait_male_1792903823249.jpg';

export const STOCK_FEMALE_STUDENT = stockFemaleStudent;
export const STOCK_MALE_STUDENT = stockMaleStudent;

export const AVAILABLE_COURSES: CourseFilterOption[] = [
  { code: 'LAW102', name: 'Business Law (Luật Kinh Tế)', category: 'Law' },
  { code: 'ACT201', name: 'Financial Accounting (Kế Toán Tài Chính)', category: 'Accounting' },
  { code: 'MKT301', name: 'Principles of Marketing (Marketing Căn Bản)', category: 'Marketing' },
  { code: 'FIN305', name: 'Corporate Finance (Tài Chính Doanh Nghiệp)', category: 'Finance' },
  { code: 'ECO101', name: 'Microeconomics (Kinh Tế Vi Mô)', category: 'Economics' },
  { code: 'STA202', name: 'Business Statistics (Thống Kê Doanh Nghiệp)', category: 'Quantitative' },
  { code: 'ACT204', name: 'Cost Accounting & Auditing (Kế Toán Chi Phí)', category: 'Accounting' },
  { code: 'LAW305', name: 'International Commercial Law (Luật Thương Mại Quốc Tế)', category: 'Law' },
];

export const DEFAULT_STUDENT_USER: StudentUser = {
  id: 'student-me',
  name: 'An Minh Vu',
  studentId: 'NEU-11229011',
  email: 'an.vu.k63@neu.edu.vn',
  phoneNumber: '+84 982 451 902',
  authMethod: 'google',
  avatarUrl: STOCK_MALE_STUDENT,
  classCohort: 'Class K63 · Faculty of International Business',
  isTutorActive: true,
  tutorProfile: {
    hourlyRate: 110000,
    sessionFee90Min: 165000,
    subjects: [
      {
        code: 'FIN305',
        name: 'Corporate Finance',
        mark: 'A+ (9.5/10)',
        gradeLetter: 'A+',
        transcriptVerified: true,
        termAchieved: 'Term 1, 2025-2026'
      }
    ],
    bio: 'Junior student specializing in Corporate Finance and DCF valuation models. Ready to help K64 and K65 students conquer midterm formulas!',
    availableSlots: [
      {
        id: 'slot-me-1',
        dayOfWeek: 'Thursday',
        dateStr: 'Nov 05, 2026',
        startTime: '19:00',
        endTime: '20:30',
        isBooked: false,
        mode: 'online'
      },
      {
        id: 'slot-me-2',
        dayOfWeek: 'Sunday',
        dateStr: 'Nov 08, 2026',
        startTime: '14:00',
        endTime: '15:30',
        isBooked: false,
        mode: 'campus-library'
      }
    ],
    walletBalance: 480000,
    rating: 4.90,
    reviewCount: 8
  }
};

export const INITIAL_TUTORS: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'Linh Nguyen',
    classCohort: 'Class K62 · Faculty of Law & Business',
    studentIdMasked: 'NEU-11208942',
    avatarUrl: STOCK_FEMALE_STUDENT,
    headline: 'Dean’s List · 9.8 in Business Law · 120+ Verified Sessions',
    bio: 'Senior student at NEU School of Law. I specialize in breaking down difficult commercial dispute case studies, contract formations, and preparing high-yield midterm/final cheat-sheets. Tutees consistently move from 5-6 points to 8.5+ with structured analytical frameworks.',
    gpa: 3.94,
    hourlyRate: 110000, // 110.000 ₫/hr
    sessionFee90Min: 165000, // 165.000 ₫ / 90 mins
    subjects: [
      {
        code: 'LAW102',
        name: 'Business Law',
        mark: 'A+ (9.8/10)',
        gradeLetter: 'A+',
        transcriptVerified: true,
        termAchieved: 'Term 1, 2024-2025'
      },
      {
        code: 'LAW305',
        name: 'International Commercial Law',
        mark: 'A+ (9.5/10)',
        gradeLetter: 'A+',
        transcriptVerified: true,
        termAchieved: 'Term 2, 2024-2025'
      }
    ],
    achievements: [
      'Rank #1 Department of Economic Law (Term 2)',
      'NEU Academic Excellence Scholarship 2024 & 2025',
      'National University Moot Court Semi-Finalist',
      'Published Review Guide for Law Midterms'
    ],
    rating: 4.96,
    reviewCount: 38,
    ratingBreakdown: {
      clarity: 4.98,
      examPrep: 4.97,
      punctuality: 4.94
    },
    availableSlots: [
      {
        id: 'slot-101',
        dayOfWeek: 'Monday',
        dateStr: 'Oct 27, 2026',
        startTime: '18:30',
        endTime: '20:00',
        isBooked: false,
        mode: 'online'
      },
      {
        id: 'slot-102',
        dayOfWeek: 'Wednesday',
        dateStr: 'Oct 29, 2026',
        startTime: '19:00',
        endTime: '20:30',
        isBooked: false,
        mode: 'both'
      },
      {
        id: 'slot-103',
        dayOfWeek: 'Saturday',
        dateStr: 'Nov 01, 2026',
        startTime: '09:00',
        endTime: '11:00',
        isBooked: false,
        mode: 'campus-library'
      },
      {
        id: 'slot-104',
        dayOfWeek: 'Sunday',
        dateStr: 'Nov 02, 2026',
        startTime: '15:00',
        endTime: '16:30',
        isBooked: false,
        mode: 'online'
      }
    ],
    verifiedStatus: {
      idVerified: true,
      transcriptVerified: true,
      neuEmailVerified: true
    },
    totalSessionsGiven: 124,
    completionRate: 99.2,
    responseTimeMinutes: 12
  },
  {
    id: 'tutor-2',
    name: 'Minh Hoang Pham',
    classCohort: 'Class K62 · School of Accounting & Auditing',
    studentIdMasked: 'NEU-11204481',
    avatarUrl: STOCK_MALE_STUDENT,
    headline: 'High Honors in Accounting · A+ in Financial & Cost Accounting',
    bio: 'Tutoring financial statements, ledger journal entries, depreciation methods, and exam drill questions. I focus on understanding T-accounts and cash flow statements rather than blind memorization so you can tackle unexpected exam problems with confidence.',
    gpa: 3.91,
    hourlyRate: 100000, // 100.000 ₫/hr
    sessionFee90Min: 150000, // 150.000 ₫ / 90 mins
    subjects: [
      {
        code: 'ACT201',
        name: 'Financial Accounting',
        mark: 'A+ (9.7/10)',
        gradeLetter: 'A+',
        transcriptVerified: true,
        termAchieved: 'Term 1, 2024-2025'
      },
      {
        code: 'ACT204',
        name: 'Cost Accounting & Auditing',
        mark: 'A+ (9.6/10)',
        gradeLetter: 'A+',
        transcriptVerified: true,
        termAchieved: 'Term 2, 2024-2025'
      }
    ],
    achievements: [
      'Top 3 Finalist Big 4 University Tax Challenge',
      'NEU Accounting Club Head of Academic Division',
      'PricewaterhouseCoopers Fast-Track Scholar'
    ],
    rating: 4.92,
    reviewCount: 45,
    ratingBreakdown: {
      clarity: 4.94,
      examPrep: 4.95,
      punctuality: 4.88
    },
    availableSlots: [
      {
        id: 'slot-201',
        dayOfWeek: 'Tuesday',
        dateStr: 'Oct 28, 2026',
        startTime: '18:00',
        endTime: '19:30',
        isBooked: false,
        mode: 'online'
      },
      {
        id: 'slot-202',
        dayOfWeek: 'Thursday',
        dateStr: 'Oct 30, 2026',
        startTime: '19:30',
        endTime: '21:00',
        isBooked: false,
        mode: 'online'
      },
      {
        id: 'slot-203',
        dayOfWeek: 'Saturday',
        dateStr: 'Nov 01, 2026',
        startTime: '14:00',
        endTime: '16:00',
        isBooked: false,
        mode: 'campus-library'
      }
    ],
    verifiedStatus: {
      idVerified: true,
      transcriptVerified: true,
      neuEmailVerified: true
    },
    totalSessionsGiven: 89,
    completionRate: 100,
    responseTimeMinutes: 18
  },
  {
    id: 'tutor-3',
    name: 'Phuong Anh Tran',
    classCohort: 'Class K63 · Faculty of Marketing',
    studentIdMasked: 'NEU-11213329',
    avatarUrl: STOCK_FEMALE_STUDENT,
    headline: 'Valedictorian Candidate · A+ in Principles of Marketing & Consumer Behavior',
    bio: 'Marketing at NEU is all about strategic frameworks (STP, 4P/7P, Pestel, Porter 5 forces) tied to real local case studies. I help tutees organize their group assignments, presentation decks, and ace individual closed-book finals.',
    gpa: 3.89,
    hourlyRate: 120000, // 120.000 ₫/hr
    sessionFee90Min: 180000, // 180.000 ₫ / 90 mins
    subjects: [
      {
        code: 'MKT301',
        name: 'Principles of Marketing',
        mark: 'A+ (9.5/10)',
        gradeLetter: 'A+',
        transcriptVerified: true,
        termAchieved: 'Term 1, 2025-2026'
      },
      {
        code: 'STA202',
        name: 'Business Statistics',
        mark: 'A (9.2/10)',
        gradeLetter: 'A',
        transcriptVerified: true,
        termAchieved: 'Term 2, 2024-2025'
      }
    ],
    achievements: [
      'Champion - NEU Creative Marketers Contest 2025',
      'Vice President of Marketing Youth Union',
      'Teaching Assistant for Fundamentals of Digital Marketing'
    ],
    rating: 4.88,
    reviewCount: 29,
    ratingBreakdown: {
      clarity: 4.90,
      examPrep: 4.86,
      punctuality: 4.89
    },
    availableSlots: [
      {
        id: 'slot-301',
        dayOfWeek: 'Wednesday',
        dateStr: 'Oct 29, 2026',
        startTime: '17:30',
        endTime: '19:00',
        isBooked: false,
        mode: 'online'
      },
      {
        id: 'slot-302',
        dayOfWeek: 'Friday',
        dateStr: 'Oct 31, 2026',
        startTime: '18:30',
        endTime: '20:30',
        isBooked: false,
        mode: 'both'
      },
      {
        id: 'slot-303',
        dayOfWeek: 'Sunday',
        dateStr: 'Nov 02, 2026',
        startTime: '10:00',
        endTime: '12:00',
        isBooked: false,
        mode: 'campus-library'
      }
    ],
    verifiedStatus: {
      idVerified: true,
      transcriptVerified: true,
      neuEmailVerified: true
    },
    totalSessionsGiven: 64,
    completionRate: 98.5,
    responseTimeMinutes: 10
  },
  {
    id: 'tutor-4',
    name: 'Duc Hai Vu',
    classCohort: 'Class K62 · School of Banking & Finance',
    studentIdMasked: 'NEU-11206718',
    avatarUrl: STOCK_MALE_STUDENT,
    headline: 'High Honors in Finance · A+ in Corporate Finance & Business Statistics',
    bio: 'Specialist in WACC, DCF valuation, capital budgeting NPV/IRR, bond yield calculations, and hypothesis testing in statistics. I provide step-by-step Excel models and manual calculation shortcuts for the exam hall.',
    gpa: 3.92,
    hourlyRate: 130000, // 130.000 ₫/hr
    sessionFee90Min: 195000, // 195.000 ₫ / 90 mins
    subjects: [
      {
        code: 'FIN305',
        name: 'Corporate Finance',
        mark: 'A+ (9.7/10)',
        gradeLetter: 'A+',
        transcriptVerified: true,
        termAchieved: 'Term 1, 2024-2025'
      },
      {
        code: 'STA202',
        name: 'Business Statistics',
        mark: 'A+ (9.6/10)',
        gradeLetter: 'A+',
        transcriptVerified: true,
        termAchieved: 'Term 2, 2024-2025'
      }
    ],
    achievements: [
      'CFA Institute Research Challenge University Champion',
      'NEU Investment & Securities Club President',
      'Valedictorian Cohort K62 Finance Program'
    ],
    rating: 4.95,
    reviewCount: 31,
    ratingBreakdown: {
      clarity: 4.96,
      examPrep: 4.98,
      punctuality: 4.92
    },
    availableSlots: [
      {
        id: 'slot-401',
        dayOfWeek: 'Tuesday',
        dateStr: 'Oct 28, 2026',
        startTime: '20:00',
        endTime: '21:30',
        isBooked: false,
        mode: 'online'
      },
      {
        id: 'slot-402',
        dayOfWeek: 'Thursday',
        dateStr: 'Oct 30, 2026',
        startTime: '18:00',
        endTime: '20:00',
        isBooked: false,
        mode: 'online'
      }
    ],
    verifiedStatus: {
      idVerified: true,
      transcriptVerified: true,
      neuEmailVerified: true
    },
    totalSessionsGiven: 78,
    completionRate: 99.0,
    responseTimeMinutes: 15
  },
  {
    id: 'tutor-5',
    name: 'Thao Vy Le',
    classCohort: 'Class K63 · Faculty of Economics',
    studentIdMasked: 'NEU-11215502',
    avatarUrl: STOCK_FEMALE_STUDENT,
    headline: 'Economics Top Scorer · A+ Microeconomics & Macroeconomics',
    bio: 'Patient tutor who makes economic intuition crystal clear. We walk through supply-demand shifts, consumer surplus, monopoly deadweight loss, and macroeconomic IS-LM models with visual diagrams that stick in your memory.',
    gpa: 3.87,
    hourlyRate: 100000, // 100.000 ₫/hr
    sessionFee90Min: 150000, // 150.000 ₫ / 90 mins
    subjects: [
      {
        code: 'ECO101',
        name: 'Microeconomics',
        mark: 'A+ (9.6/10)',
        gradeLetter: 'A+',
        transcriptVerified: true,
        termAchieved: 'Term 1, 2025-2026'
      }
    ],
    achievements: [
      'NEU Young Economists Research Award 2025',
      'Head of Peer Mentoring Group - K63 Cohort',
      'Dean’s List Academic Honors'
    ],
    rating: 4.89,
    reviewCount: 22,
    ratingBreakdown: {
      clarity: 4.91,
      examPrep: 4.88,
      punctuality: 4.90
    },
    availableSlots: [
      {
        id: 'slot-501',
        dayOfWeek: 'Thursday',
        dateStr: 'Oct 30, 2026',
        startTime: '17:00',
        endTime: '18:30',
        isBooked: false,
        mode: 'online'
      },
      {
        id: 'slot-502',
        dayOfWeek: 'Saturday',
        dateStr: 'Nov 01, 2026',
        startTime: '10:30',
        endTime: '12:00',
        isBooked: false,
        mode: 'campus-library'
      }
    ],
    verifiedStatus: {
      idVerified: true,
      transcriptVerified: true,
      neuEmailVerified: true
    },
    totalSessionsGiven: 42,
    completionRate: 100,
    responseTimeMinutes: 20
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    tutorId: 'tutor-1',
    studentName: 'Bao Long Nguyen',
    studentCohort: 'K63 International Business',
    courseCode: 'LAW102',
    rating: 5,
    clarityScore: 5,
    examScore: 5,
    punctualityScore: 5,
    comment: 'Linh is an absolute lifesaver for Business Law! I was failing contract formation and tort liability cases until she walked me through her 4-step IRAC answer formula. Scored a 9.0 on my midterm exam.',
    date: 'Oct 18, 2026',
    verifiedBooking: true,
    gradeImprovement: '5.2 → 9.0'
  },
  {
    id: 'rev-2',
    tutorId: 'tutor-1',
    studentName: 'Thu Trang Do',
    studentCohort: 'K64 Auditing',
    courseCode: 'LAW102',
    rating: 5,
    clarityScore: 5,
    examScore: 4.9,
    punctualityScore: 5,
    comment: 'Super organized and punctual. She provided annotated case summaries from previous semesters that matched what professor gave in the mock quiz. Escrow payment was completely smooth.',
    date: 'Oct 12, 2026',
    verifiedBooking: true,
    gradeImprovement: '6.0 → 8.8'
  },
  {
    id: 'rev-3',
    tutorId: 'tutor-2',
    studentName: 'Quoc Anh Le',
    studentCohort: 'K63 Finance & Banking',
    courseCode: 'ACT201',
    rating: 5,
    clarityScore: 4.9,
    examScore: 5,
    punctualityScore: 4.8,
    comment: 'Minh explains accounting logic rather than rote formulas. The cash flow statement adjustment table he drew on the shared whiteboard was 10x clearer than the textbook. Highly recommend.',
    date: 'Oct 20, 2026',
    verifiedBooking: true,
    gradeImprovement: '4.8 → 8.5'
  },
  {
    id: 'rev-4',
    tutorId: 'tutor-3',
    studentName: 'Mai Linh Pham',
    studentCohort: 'K64 Hospitality Management',
    courseCode: 'MKT301',
    rating: 4.9,
    clarityScore: 5,
    examScore: 4.8,
    punctualityScore: 4.9,
    comment: 'Phuong Anh helped our study group structure our entire market segmentation pitch deck. She gave constructive critiques on our consumer persona analysis.',
    date: 'Oct 15, 2026',
    verifiedBooking: true,
    gradeImprovement: 'B → A'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-1001',
    tutorId: 'tutor-1',
    tutorName: 'Linh Nguyen',
    tutorAvatar: STOCK_FEMALE_STUDENT,
    tuteeName: 'An Minh Vu (You)',
    tuteeStudentId: 'NEU-11229011',
    courseCode: 'LAW102',
    courseName: 'Business Law (Luật Kinh Tế)',
    slot: {
      id: 'slot-upcoming-1',
      dayOfWeek: 'Monday',
      dateStr: 'Oct 27, 2026',
      startTime: '18:30',
      endTime: '20:00',
      isBooked: true,
      mode: 'online'
    },
    durationMinutes: 90,
    totalFee: 165000, // 165.000 ₫ for 90 mins
    status: 'escrow_held',
    learningGoals: 'Review Chapter 4 & 5: Commercial Contract Disputes, Force Majeure clauses, and solve 2 past exam mock case problems.',
    meetingLink: 'https://peerneu.edu.vn/room/law102-study-9481',
    escrowId: 'ESC-NEU-20261024-9921',
    createdAt: '2026-10-24 14:20',
    reminderEnabled: true,
    reminderSettings: {
      before24h: true,
      before1h: true,
      before15m: true
    },
    hasReview: false
  },
  {
    id: 'book-1002',
    tutorId: 'tutor-2',
    tutorName: 'Minh Hoang Pham',
    tutorAvatar: STOCK_MALE_STUDENT,
    tuteeName: 'An Minh Vu (You)',
    tuteeStudentId: 'NEU-11229011',
    courseCode: 'ACT201',
    courseName: 'Financial Accounting (Kế Toán Tài Chính)',
    slot: {
      id: 'slot-completed-1',
      dayOfWeek: 'Saturday',
      dateStr: 'Oct 17, 2026',
      startTime: '14:00',
      endTime: '15:30',
      isBooked: true,
      mode: 'online'
    },
    durationMinutes: 90,
    totalFee: 150000, // 150.000 ₫ for 90 mins
    status: 'completed',
    learningGoals: 'Depreciation methods (straight-line vs declining balance) and inventory cost valuation (FIFO / Weighted Average).',
    meetingLink: 'https://peerneu.edu.vn/room/act201-audit-3112',
    escrowId: 'ESC-NEU-20261017-4819',
    createdAt: '2026-10-15 10:11',
    reminderEnabled: true,
    reminderSettings: {
      before24h: true,
      before1h: true,
      before15m: true
    },
    hasReview: true
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    tutorId: 'tutor-1',
    tutorName: 'Linh Nguyen',
    tutorAvatar: STOCK_FEMALE_STUDENT,
    tuteeName: 'An Minh Vu',
    courseContext: 'LAW102 Business Law',
    lastMessage: 'I have attached the sample contract clauses for our Monday session. Take a quick look before 18:30!',
    lastTimestamp: '10:45 AM',
    unreadCount: 1
  },
  {
    id: 'conv-2',
    tutorId: 'tutor-2',
    tutorName: 'Minh Hoang Pham',
    tutorAvatar: STOCK_MALE_STUDENT,
    tuteeName: 'An Minh Vu',
    courseContext: 'ACT201 Financial Accounting',
    lastMessage: 'Great job in our session! Hope the journal entry framework helped with the quiz.',
    lastTimestamp: 'Yesterday',
    unreadCount: 0
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'm-1',
      conversationId: 'conv-1',
      senderId: 'tutee-me',
      senderName: 'An Minh Vu',
      senderRole: 'tutee',
      text: 'Hi Linh! I just booked our Business Law tutoring slot for Monday evening through the escrow system.',
      timestamp: '10:30 AM'
    },
    {
      id: 'm-2',
      conversationId: 'conv-1',
      senderId: 'tutor-1',
      senderName: 'Linh Nguyen',
      senderRole: 'tutor',
      text: 'Hello An! I received the confirmation notification. Your escrow deposit is securely locked. What specific chapters are you focusing on for midterm?',
      timestamp: '10:35 AM'
    },
    {
      id: 'm-3',
      conversationId: 'conv-1',
      senderId: 'tutee-me',
      senderName: 'An Minh Vu',
      senderRole: 'tutee',
      text: 'I am struggling with distinguishing between voidable vs void ab initio contracts, and solving the breach damages question.',
      timestamp: '10:40 AM'
    },
    {
      id: 'm-4',
      conversationId: 'conv-1',
      senderId: 'tutor-1',
      senderName: 'Linh Nguyen',
      senderRole: 'tutor',
      text: 'I have attached the sample contract clauses and my summary matrix for our Monday session. Take a quick look before 18:30!',
      timestamp: '10:45 AM',
      attachment: {
        name: 'NEU_Law102_Contract_Formation_Matrix.pdf',
        size: '1.4 MB',
        type: 'pdf'
      }
    }
  ],
  'conv-2': [
    {
      id: 'm-201',
      conversationId: 'conv-2',
      senderId: 'tutor-2',
      senderName: 'Minh Hoang Pham',
      senderRole: 'tutor',
      text: 'Great job in our session! Hope the journal entry framework helped with the quiz.',
      timestamp: 'Yesterday'
    }
  ]
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'reminder',
    title: 'Upcoming Session in 45 Minutes',
    message: 'Your Business Law session with Linh Nguyen starts at 18:30. In-App Video Call room is ready.',
    timestamp: '10 mins ago',
    read: false,
    bookingId: 'book-1001'
  },
  {
    id: 'notif-2',
    type: 'escrow',
    title: 'Escrow Deposit Held Safely',
    message: '165.000 ₫ is secured in PeerNEU Escrow #ESC-NEU-20261024-9921. Tutor receives funds only after you confirm session completion.',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    type: 'review',
    title: 'Review Verified',
    message: 'Your review for Minh Hoang Pham in ACT201 has been verified and published to his public profile.',
    timestamp: 'Oct 20',
    read: true
  }
];
