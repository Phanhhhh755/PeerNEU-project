import React from 'react';
import { Search, ShieldCheck } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenEscrowModal: () => void;
  language?: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenEscrowModal,
  language = 'vi'
}) => {
  const t = TRANSLATIONS[language];

  const categories = [
    { id: 'all', label: t.allSubjects },
    { id: 'Law', label: language === 'vi' ? 'Luật Kinh tế' : 'Business Law' },
    { id: 'Accounting', label: language === 'vi' ? 'Kế toán & Kiểm toán' : 'Accounting & Auditing' },
    { id: 'Marketing', label: 'Marketing' },
    { id: 'Finance', label: language === 'vi' ? 'Tài chính Doanh nghiệp' : 'Corporate Finance' },
    { id: 'Economics', label: language === 'vi' ? 'Kinh tế Vi mô' : 'Microeconomics' }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-8 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5 text-center">
        {/* Simple Title in NEU Brand Colors */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00528C]/8 text-[#00528C] text-xs font-bold tracking-wide">
            <span>{t.neuAffiliation}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>PeerNEU</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#00528C] tracking-tight font-support">
            {t.heroTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Clean Search Input */}
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder={t.heroSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C] focus:border-transparent transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Subject Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#00528C] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Escrow link */}
        <div className="pt-1">
          <button
            onClick={onOpenEscrowModal}
            className="inline-flex items-center gap-1.5 text-xs text-[#00528C] bg-[#00528C]/8 hover:bg-[#00528C]/15 border border-[#00528C]/20 px-3.5 py-1.5 rounded-full transition-colors font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00528C]" />
            <span>{t.escrowBadge}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
