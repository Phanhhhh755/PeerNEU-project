import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { CourseFilterOption } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import { getCourseName } from '../utils/localization';

interface CourseFilterProps {
  courses: CourseFilterOption[];
  selectedSubject: string;
  onSelectSubject: (code: string) => void;
  selectedSort: 'rating' | 'price-asc' | 'sessions';
  onSelectSort: (sort: 'rating' | 'price-asc' | 'sessions') => void;
  filterMode: 'all' | 'online' | 'campus-library';
  onSelectFilterMode: (mode: 'all' | 'online' | 'campus-library') => void;
  minRating: number;
  onSelectMinRating: (rating: number) => void;
  totalFound: number;
  language?: Language;
}

export const CourseFilter: React.FC<CourseFilterProps> = ({
  courses,
  selectedSubject,
  onSelectSubject,
  selectedSort,
  onSelectSort,
  filterMode,
  onSelectFilterMode,
  minRating,
  onSelectMinRating,
  totalFound,
  language = 'vi'
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="font-bold text-slate-900 font-mono">
          {totalFound} {t.tutorsFound}
        </span>
        {selectedSubject !== 'all' && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#00528C] bg-[#00528C]/8 px-2 py-0.5 rounded border border-[#00528C]/20">
              {getCourseName(selectedSubject, language)}
            </span>
            <button
              onClick={() => onSelectSubject('all')}
              className="text-[11px] text-slate-500 hover:text-[#C41212] hover:underline font-medium"
            >
              {t.clearFilter}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Location format */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => onSelectFilterMode('all')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              filterMode === 'all' ? 'bg-[#00528C] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.anyLocation}
          </button>
          <button
            onClick={() => onSelectFilterMode('online')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              filterMode === 'online' ? 'bg-[#00528C] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.online}
          </button>
          <button
            onClick={() => onSelectFilterMode('campus-library')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              filterMode === 'campus-library' ? 'bg-[#00528C] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.libraryB2}
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5 text-slate-600">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-lg p-1 font-semibold text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#00528C]"
          >
            <option value="rating">{t.topRated}</option>
            <option value="price-asc">{t.lowestFee}</option>
            <option value="sessions">{t.mostSessions}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
