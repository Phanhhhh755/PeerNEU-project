import { Tutor, Booking, Review, Conversation, Message, AppNotification, CourseFilterOption, SubjectCompetency, TimeSlot } from '../types';
import { Language } from './translations';

// Course mapping dictionary
export const COURSE_NAMES: Record<string, { vi: string; en: string }> = {
  LAW102: { vi: 'Luật Kinh tế', en: 'Business Law' },
  ACT201: { vi: 'Kế toán Tài chính', en: 'Financial Accounting' },
  MKT301: { vi: 'Nguyên lý Marketing', en: 'Principles of Marketing' },
  FIN305: { vi: 'Tài chính Doanh nghiệp', en: 'Corporate Finance' },
  ECO101: { vi: 'Kinh tế Vi mô', en: 'Microeconomics' },
  STA202: { vi: 'Thống kê Doanh nghiệp', en: 'Business Statistics' },
  ACT204: { vi: 'Kế toán Chi phí & Kiểm toán', en: 'Cost Accounting & Auditing' },
  LAW305: { vi: 'Luật Thương mại Quốc tế', en: 'International Commercial Law' },
};

export const getCourseName = (code: string, lang: Language, fallback?: string): string => {
  if (COURSE_NAMES[code]) {
    return COURSE_NAMES[code][lang];
  }
  if (fallback) {
    if (fallback.includes('(') && fallback.includes(')')) {
      const match = fallback.match(/^(.*?)\s*\((.*?)\)$/);
      if (match) {
        if (lang === 'vi') {
          return match[2].trim() || match[1].trim();
        } else {
          return match[1].trim();
        }
      }
    }
    return fallback;
  }
  return code;
};

// Day of the week translation dictionary
const DAYS_VI_TO_EN: Record<string, string> = {
  'Thứ Hai': 'Monday',
  'Thứ Ba': 'Tuesday',
  'Thứ Tư': 'Wednesday',
  'Thứ Năm': 'Thursday',
  'Thứ Sáu': 'Friday',
  'Thứ Bảy': 'Saturday',
  'Chủ Nhật': 'Sunday',
};

const DAYS_EN_TO_VI: Record<string, string> = {
  Monday: 'Thứ Hai',
  Tuesday: 'Thứ Ba',
  Wednesday: 'Thứ Tư',
  Thursday: 'Thứ Năm',
  Friday: 'Thứ Sáu',
  Saturday: 'Thứ Bảy',
  Sunday: 'Chủ Nhật',
};

export const localizeDayOfWeek = (day: string, lang: Language): string => {
  if (!day) return '';
  if (lang === 'vi') {
    return DAYS_EN_TO_VI[day] || day;
  } else {
    return DAYS_VI_TO_EN[day] || day;
  }
};

// Date translation dictionary
const MONTHS_EN_TO_VI: Record<string, string> = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

const MONTHS_NUM_TO_EN: Record<string, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
  '1': 'Jan',
  '2': 'Feb',
  '3': 'Mar',
  '4': 'Apr',
  '5': 'May',
  '6': 'Jun',
  '7': 'Jul',
  '8': 'Aug',
  '9': 'Sep',
};

export const localizeDateStr = (dateStr: string, lang: Language): string => {
  if (!dateStr) return '';
  
  // Format: "Oct 27, 2026"
  const enMatch = dateStr.match(/^([A-Za-z]{3})\s+(\d{1,2}),?\s+(\d{4})$/);
  if (enMatch) {
    const [, monthStr, dayNum, year] = enMatch;
    if (lang === 'vi') {
      const monthNum = MONTHS_EN_TO_VI[monthStr] || '10';
      const paddedDay = dayNum.padStart(2, '0');
      return `${paddedDay}/${monthNum}/${year}`;
    }
    return dateStr;
  }

  // Format: "27/10/2026"
  const viMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (viMatch) {
    const [, dayNum, monthNum, year] = viMatch;
    if (lang === 'en') {
      const monthEn = MONTHS_NUM_TO_EN[monthNum] || 'Oct';
      const paddedDay = dayNum.padStart(2, '0');
      return `${monthEn} ${paddedDay}, ${year}`;
    }
    return dateStr;
  }

  return dateStr;
};

export const localizeSessionMode = (mode: string, lang: Language): string => {
  if (lang === 'vi') {
    if (mode === 'online') return 'Học Online';
    if (mode === 'campus-library') return 'Thư viện B2';
    if (mode === 'both') return 'Online / Thư viện B2';
    return mode;
  } else {
    if (mode === 'online') return 'Online Call';
    if (mode === 'campus-library') return 'Library B2';
    if (mode === 'both') return 'Online / Library B2';
    return mode;
  }
};

interface LocalizedTutorProfile {
  name: string;
  classCohort: string;
  headline: string;
  bio: string;
  achievements: string[];
}

export const TUTOR_LOCALIZATIONS: Record<string, { vi: LocalizedTutorProfile; en: LocalizedTutorProfile }> = {
  'tutor-1': {
    vi: {
      name: 'Linh Nguyễn',
      classCohort: 'Lớp K62 · Viện Luật & Kinh doanh NEU',
      headline: 'Học bổng Xuất sắc · 9.8 môn Luật Kinh tế · 120+ Buổi gia sư',
      bio: 'Sinh viên năm cuối Viện Luật NEU. Mình chuyên hệ thống hóa các dạng bài tập tình huống tranh chấp hợp đồng thương mại khó, căn cứ miễn trừ trách nhiệm và tổng hợp đề cương ôn thi trọng tâm giữa kỳ/cuối kỳ. Các bạn học viên cùng mình đều tự tin nâng điểm từ 5-6 lên 8.5+ nhờ phương pháp tư duy pháp lý logic, rõ ràng.',
      achievements: [
        'Thủ khoa điểm môn Luật Kinh tế kỳ 2',
        'Học bổng Khuyến khích Học tập NEU các năm 2024 & 2025',
        'Bán kết cuộc thi Diễn án Luật Toàn quốc',
        'Tác giả bộ tài liệu tóm tắt ôn thi Luật cho sinh viên NEU'
      ]
    },
    en: {
      name: 'Linh Nguyen',
      classCohort: 'Class K62 · School of Law & Business',
      headline: 'Dean’s List · 9.8 in Business Law · 120+ Verified Sessions',
      bio: 'Senior student at NEU School of Law. I specialize in breaking down difficult commercial dispute case studies, contract formations, and preparing high-yield midterm/final cheat-sheets. Tutees consistently move from 5-6 points to 8.5+ with structured analytical frameworks.',
      achievements: [
        'Rank #1 Department of Economic Law (Term 2)',
        'NEU Academic Excellence Scholarship 2024 & 2025',
        'National University Moot Court Semi-Finalist',
        'Published Review Guide for Law Midterms'
      ]
    }
  },
  'tutor-2': {
    vi: {
      name: 'Minh Hoàng Phạm',
      classCohort: 'Lớp K62 · Viện Kế toán - Kiểm toán NEU',
      headline: 'Sinh viên Giỏi Kế toán · Điểm A+ Kế toán Tài chính & Kế toán Chi phí',
      bio: 'Hướng dẫn lập báo cáo tài chính, hạch toán định khoản chữ T, phương pháp trích khấu hao và luyện đề thi thực chiến. Mình tập trung giúp bạn hiểu bản chất luồng tiền và cân đối bảng thay vì học vẹt công thức, giúp bạn dễ dàng chinh phục mọi bẫy đề thi của trường.',
      achievements: [
        'Top 3 cuộc thi Thử thách Thuế & Kế toán Sinh viên',
        'Trưởng ban Chuyên môn CLB Kế toán NEU',
        'Học bổng Fast-Track từ công ty Kiểm toán Big 4'
      ]
    },
    en: {
      name: 'Minh Hoang Pham',
      classCohort: 'Class K62 · School of Accounting & Auditing',
      headline: 'High Honors in Accounting · A+ in Financial & Cost Accounting',
      bio: 'Tutoring financial statements, ledger journal entries, depreciation methods, and exam drill questions. I focus on understanding T-accounts and cash flow statements rather than blind memorization so you can tackle unexpected exam problems with confidence.',
      achievements: [
        'Top 3 Finalist Big 4 University Tax Challenge',
        'NEU Accounting Club Head of Academic Division',
        'PricewaterhouseCoopers Fast-Track Scholar'
      ]
    }
  },
  'tutor-3': {
    vi: {
      name: 'Phương Anh Trần',
      classCohort: 'Lớp K63 · Khoa Marketing NEU',
      headline: 'Ứng viên Thủ khoa Marketing · Điểm A+ Marketing Căn bản & Hành vi Người tiêu dùng',
      bio: 'Học Marketing tại NEU cần nắm vững các mô hình cốt lõi (STP, 4P/7P, PESTEL, 5 áp lực cạnh tranh) và liên hệ thực tế doanh nghiệp Việt Nam. Mình đồng hành giúp các bạn tự tin làm bài tập lớn, slide thuyết trình nhóm và ẵm điểm A thi kết thúc học phần.',
      achievements: [
        'Quán quân cuộc thi NEU Creative Marketers Contest 2025',
        'Phó Bí thư Liên Chi đoàn Khoa Marketing',
        'Trợ giảng môn Marketing Căn bản'
      ]
    },
    en: {
      name: 'Phuong Anh Tran',
      classCohort: 'Class K63 · Faculty of Marketing',
      headline: 'Valedictorian Candidate · A+ in Principles of Marketing & Consumer Behavior',
      bio: 'Marketing at NEU is all about strategic frameworks (STP, 4P/7P, Pestel, Porter 5 forces) tied to real local case studies. I help tutees organize their group assignments, presentation decks, and ace individual closed-book finals.',
      achievements: [
        'Champion - NEU Creative Marketers Contest 2025',
        'Vice President of Marketing Youth Union',
        'Teaching Assistant for Fundamentals of Digital Marketing'
      ]
    }
  },
  'tutor-4': {
    vi: {
      name: 'Đức Hải Vũ',
      classCohort: 'Lớp K62 · Viện Ngân hàng - Tài chính NEU',
      headline: 'Xuất sắc Tài chính Doanh nghiệp · Điểm A+ Tài chính & Thống kê',
      bio: 'Chuyên sâu mô hình định giá WACC, DCF, thẩm định dự án đầu tư NPV/IRR, tính toán lợi suất trái phiếu và kiểm định thống kê. Mình chia sẻ mô hình Excel chi tiết và các mẹo bấm máy tính Casio giải nhanh bài tập trong phòng thi.',
      achievements: [
        'Đội trưởng vô địch vòng trường cuộc thi CFA Institute Research Challenge',
        'Chủ tịch CLB Chứng khoán Sinh viên NEU',
        'Sinh viên tiêu biểu Khóa K62 Chương trình Tài chính'
      ]
    },
    en: {
      name: 'Duc Hai Vu',
      classCohort: 'Class K62 · School of Banking & Finance',
      headline: 'High Honors in Finance · A+ in Corporate Finance & Business Statistics',
      bio: 'Specialist in WACC, DCF valuation, capital budgeting NPV/IRR, bond yield calculations, and hypothesis testing in statistics. I provide step-by-step Excel models and manual calculation shortcuts for the exam hall.',
      achievements: [
        'CFA Institute Research Challenge University Champion',
        'NEU Investment & Securities Club President',
        'Valedictorian Cohort K62 Finance Program'
      ]
    }
  },
  'tutor-5': {
    vi: {
      name: 'Thảo Vy Lê',
      classCohort: 'Lớp K63 · Khoa Kinh tế học NEU',
      headline: 'Top 1 môn Kinh tế Vi mô & Vĩ mô · Điểm số A+',
      bio: 'Gia sư kiên nhẫn, giải thích trực quan bản chất kinh tế học. Hướng dẫn chi tiết cách dịch chuyển đường cung - cầu, tính toán thặng dư tiêu dùng, tổn thất vô ích do độc quyền và các mô hình IS-LM bằng hình vẽ trực quan, dễ nhớ.',
      achievements: [
        'Giải thưởng Nghiên cứu Kinh tế Trẻ NEU 2025',
        'Trưởng nhóm Cố vấn học tập Đồng đẳng Khóa K63',
        'Sinh viên Xuất sắc toàn diện NEU'
      ]
    },
    en: {
      name: 'Thao Vy Le',
      classCohort: 'Class K63 · Faculty of Economics',
      headline: 'Economics Top Scorer · A+ Microeconomics & Macroeconomics',
      bio: 'Patient tutor who makes economic intuition crystal clear. We walk through supply-demand shifts, consumer surplus, monopoly deadweight loss, and macroeconomic IS-LM models with visual diagrams that stick in your memory.',
      achievements: [
        'NEU Young Economists Research Award 2025',
        'Head of Peer Mentoring Group - K63 Cohort',
        'Dean’s List Academic Honors'
      ]
    }
  }
};

export const localizeTutor = (tutor: Tutor, lang: Language): Tutor => {
  const loc = TUTOR_LOCALIZATIONS[tutor.id]?.[lang];
  
  return {
    ...tutor,
    name: loc ? loc.name : tutor.name,
    classCohort: loc ? loc.classCohort : tutor.classCohort,
    headline: loc ? loc.headline : tutor.headline,
    bio: loc ? loc.bio : tutor.bio,
    achievements: loc ? loc.achievements : tutor.achievements,
    subjects: tutor.subjects.map((s: SubjectCompetency) => ({
      ...s,
      name: getCourseName(s.code, lang, s.name),
    })),
    availableSlots: tutor.availableSlots.map((slot: TimeSlot) => ({
      ...slot,
      dayOfWeek: localizeDayOfWeek(slot.dayOfWeek, lang),
      dateStr: localizeDateStr(slot.dateStr, lang),
    }))
  };
};

export const getLocalizedCourses = (lang: Language): CourseFilterOption[] => {
  return [
    { code: 'LAW102', name: lang === 'vi' ? 'Luật Kinh tế' : 'Business Law', category: 'Law' },
    { code: 'ACT201', name: lang === 'vi' ? 'Kế toán Tài chính' : 'Financial Accounting', category: 'Accounting' },
    { code: 'MKT301', name: lang === 'vi' ? 'Nguyên lý Marketing' : 'Principles of Marketing', category: 'Marketing' },
    { code: 'FIN305', name: lang === 'vi' ? 'Tài chính Doanh nghiệp' : 'Corporate Finance', category: 'Finance' },
    { code: 'ECO101', name: lang === 'vi' ? 'Kinh tế Vi mô' : 'Microeconomics', category: 'Economics' },
    { code: 'STA202', name: lang === 'vi' ? 'Thống kê Doanh nghiệp' : 'Business Statistics', category: 'Quantitative' },
    { code: 'ACT204', name: lang === 'vi' ? 'Kế toán Chi phí & Kiểm toán' : 'Cost Accounting & Auditing', category: 'Accounting' },
    { code: 'LAW305', name: lang === 'vi' ? 'Luật Thương mại Quốc tế' : 'International Commercial Law', category: 'Law' },
  ];
};

export const getLocalizedNotifications = (lang: Language): AppNotification[] => {
  if (lang === 'vi') {
    return [
      {
        id: 'notif-1',
        type: 'reminder',
        title: 'Buổi học sắp bắt đầu trong 45 phút',
        message: 'Buổi học môn Luật Kinh tế cùng gia sư Linh Nguyễn bắt đầu lúc 18:30. Phòng học trực tuyến đã sẵn sàng đón bạn.',
        timestamp: '10 phút trước',
        read: false,
        bookingId: 'book-1001'
      },
      {
        id: 'notif-2',
        type: 'escrow',
        title: 'Học phí đã được ký quỹ an toàn',
        message: '165.000 ₫ đã được bảo đảm trong két ký quỹ PeerNEU #ESC-NEU-20261024-9921. Gia sư chỉ nhận học phí sau khi bạn xác nhận hoàn thành buổi học.',
        timestamp: '2 giờ trước',
        read: false
      },
      {
        id: 'notif-3',
        type: 'review',
        title: 'Đánh giá đã được xác thực',
        message: 'Đánh giá của bạn dành cho Minh Hoàng (Kế toán Tài chính) đã được xác thực và cập nhật lên hồ sơ công khai.',
        timestamp: '20/10/2026',
        read: true
      }
    ];
  } else {
    return [
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
  }
};

export const getLocalizedReviews = (reviews: Review[], lang: Language): Review[] => {
  const REVIEW_TEXTS: Record<string, { vi: { comment: string; cohort: string }; en: { comment: string; cohort: string } }> = {
    'rev-1': {
      vi: {
        comment: 'Linh thực sự là cứu tinh của mình môn Luật Kinh tế! Trước đó mình rất mông lung với các tình huống giao kết hợp đồng và bồi thường thiệt hại, cho đến khi Linh hướng dẫn công thức phân tích IRAC 4 bước. Thi giữa kỳ mình đạt 9.0 điểm luôn.',
        cohort: 'Lớp K63 Kinh doanh Quốc tế'
      },
      en: {
        comment: 'Linh is an absolute lifesaver for Business Law! I was failing contract formation and tort liability cases until she walked me through her 4-step IRAC answer formula. Scored a 9.0 on my midterm exam.',
        cohort: 'K63 International Business'
      }
    },
    'rev-2': {
      vi: {
        comment: 'Rất đúng giờ và bài bản. Bạn ấy cung cấp bản tóm tắt các án lệ từ các khóa trước rất sát với câu hỏi trong bài kiểm tra thử của thầy cô. Quy trình ký quỹ học phí cực kỳ an tâm.',
        cohort: 'Lớp K64 Kiểm toán'
      },
      en: {
        comment: 'Super organized and punctual. She provided annotated case summaries from previous semesters that matched what professor gave in the mock quiz. Escrow payment was completely smooth.',
        cohort: 'K64 Auditing'
      }
    },
    'rev-3': {
      vi: {
        comment: 'Minh giải thích bản chất kế toán cực kỳ dễ hiểu thay vì bắt học thuộc công thức. Bảng điều chỉnh dòng tiền bạn ấy vẽ trên bảng trắng trực tuyến rõ ràng hơn sách giáo trình nhiều lần. Rất khuyên các bạn nên học!',
        cohort: 'Lớp K63 Tài chính - Ngân hàng'
      },
      en: {
        comment: 'Minh explains accounting logic rather than rote formulas. The cash flow statement adjustment table he drew on the shared whiteboard was 10x clearer than the textbook. Highly recommend.',
        cohort: 'K63 Finance & Banking'
      }
    },
    'rev-4': {
      vi: {
        comment: 'Phương Anh đã hướng dẫn nhóm mình hoàn thiện toàn bộ slide kế hoạch phân khúc thị trường và định vị thương hiệu. Góp ý rất xác đáng và nhiệt tình.',
        cohort: 'Lớp K64 Quản trị Khách sạn'
      },
      en: {
        comment: 'Phuong Anh helped our study group structure our entire market segmentation pitch deck. She gave constructive critiques on our consumer persona analysis.',
        cohort: 'K64 Hospitality Management'
      }
    }
  };

  return reviews.map((r) => {
    const loc = REVIEW_TEXTS[r.id]?.[lang];
    return {
      ...r,
      comment: loc ? loc.comment : r.comment,
      studentCohort: loc ? loc.cohort : r.studentCohort,
      date: localizeDateStr(r.date, lang)
    };
  });
};

export const getLocalizedBookings = (bookings: Booking[], lang: Language): Booking[] => {
  return bookings.map((b) => {
    const tutorLoc = TUTOR_LOCALIZATIONS[b.tutorId]?.[lang];
    return {
      ...b,
      courseName: getCourseName(b.courseCode, lang, b.courseName),
      tutorName: tutorLoc ? tutorLoc.name : b.tutorName,
      tuteeName: lang === 'vi' ? 'An Minh Vũ (Bạn)' : 'An Minh Vu (You)',
      slot: {
        ...b.slot,
        dayOfWeek: localizeDayOfWeek(b.slot.dayOfWeek, lang),
        dateStr: localizeDateStr(b.slot.dateStr, lang),
      }
    };
  });
};

export const getLocalizedConversations = (conversations: Conversation[], lang: Language): Conversation[] => {
  const CONV_TEXTS: Record<string, { vi: { lastMessage: string; context: string }; en: { lastMessage: string; context: string } }> = {
    'conv-1': {
      vi: {
        context: 'LAW102 Luật Kinh tế',
        lastMessage: 'Mình đã gửi kèm các điều khoản mẫu hợp đồng cho buổi học Thứ Hai. Bạn xem qua trước 18:30 nhé!'
      },
      en: {
        context: 'LAW102 Business Law',
        lastMessage: 'I have attached the sample contract clauses for our Monday session. Take a quick look before 18:30!'
      }
    },
    'conv-2': {
      vi: {
        context: 'ACT201 Kế toán Tài chính',
        lastMessage: 'Buổi học hôm nay rất tốt! Chúc bạn làm bài kiểm tra định khoản đạt điểm tối đa nhé.'
      },
      en: {
        context: 'ACT201 Financial Accounting',
        lastMessage: 'Great job in our session! Hope the journal entry framework helped with the quiz.'
      }
    }
  };

  return conversations.map((c) => {
    const loc = CONV_TEXTS[c.id]?.[lang];
    const tutorLoc = TUTOR_LOCALIZATIONS[c.tutorId]?.[lang];
    return {
      ...c,
      tutorName: tutorLoc ? tutorLoc.name : c.tutorName,
      courseContext: loc ? loc.context : c.courseContext,
      lastMessage: loc ? loc.lastMessage : c.lastMessage,
      lastTimestamp: lang === 'vi' ? (c.lastTimestamp === 'Yesterday' ? 'Hôm qua' : c.lastTimestamp) : c.lastTimestamp
    };
  });
};

export const getLocalizedMessages = (messages: Record<string, Message[]>, lang: Language): Record<string, Message[]> => {
  const MSG_TEXTS: Record<string, { vi: string; en: string }> = {
    'm-1': {
      vi: 'Chào Linh! Mình vừa đặt lịch học Luật Kinh tế tối Thứ Hai qua hệ thống ký quỹ PeerNEU nhé.',
      en: 'Hi Linh! I just booked our Business Law tutoring slot for Monday evening through the escrow system.'
    },
    'm-2': {
      vi: 'Chào An! Mình đã nhận được thông báo xác nhận. Học phí đã được ký quỹ an toàn rồi. Giữa kỳ này bạn cần tập trung ôn những chương nào nhất?',
      en: 'Hello An! I received the confirmation notification. Your escrow deposit is securely locked. What specific chapters are you focusing on for midterm?'
    },
    'm-3': {
      vi: 'Mình đang chưa phân biệt rõ hợp đồng vô hiệu tuyệt đối vs vô hiệu tương đối, và cách giải bài tập bồi thường thiệt hại.',
      en: 'I am struggling with distinguishing between voidable vs void ab initio contracts, and solving the breach damages question.'
    },
    'm-4': {
      vi: 'Mình đã đính kèm các điều khoản mẫu và bảng ma trận tóm tắt cho buổi học Thứ Hai. Bạn xem qua trước 18:30 nha!',
      en: 'I have attached the sample contract clauses and my summary matrix for our Monday session. Take a quick look before 18:30!'
    },
    'm-201': {
      vi: 'Buổi học hôm nay rất tốt! Chúc bạn làm bài kiểm tra định khoản đạt điểm tối đa nhé.',
      en: 'Great job in our session! Hope the journal entry framework helped with the quiz.'
    }
  };

  const result: Record<string, Message[]> = {};
  for (const [key, msgList] of Object.entries(messages)) {
    result[key] = msgList.map((m) => {
      const loc = MSG_TEXTS[m.id]?.[lang];
      return {
        ...m,
        text: loc || m.text
      };
    });
  }
  return result;
};
