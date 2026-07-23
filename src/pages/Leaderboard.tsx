import { useMemo } from 'react';
import { Trophy, Medal, Award, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getDistrict } from '../data/districts';
import { useLanguage } from '../context/LanguageContext';

const RANK_ICON = [Trophy, Medal, Award];
const RANK_COLOR = ['text-amber-500', 'text-gray-400', 'text-orange-400'];

export function Leaderboard() {
  const { citizens } = useData();
  const { lang } = useLanguage();
  const ranked = useMemo(() => [...citizens].sort((a, b) => b.points - a.points), [citizens]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">Top Contributors Leaderboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Citizens making the biggest impact through verified reports and community engagement.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {ranked.slice(0, 3).map((c, i) => {
          const Icon = RANK_ICON[i];
          const district = getDistrict(c.districtId);
          return (
            <div key={c.id} className={`bg-white dark:bg-gray-800 rounded-2xl border ${i === 0 ? 'border-amber-300 shadow-md' : 'border-gray-100 dark:border-gray-700 shadow-sm'} p-5 text-center`}>
              <Icon className={`w-8 h-8 mx-auto mb-2 ${RANK_COLOR[i]}`} />
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2" style={{ backgroundColor: c.avatarColor }}>
                {c.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </div>
              <p className="font-bold text-gray-900 dark:text-gray-50">{c.name}</p>
              <p className="text-xs text-gray-500 mb-2">{lang === 'bn' ? district?.nameBn : district?.nameEn}</p>
              <p className="text-xl font-bold text-bd-green">{c.points} pts</p>
              <p className="text-xs text-gray-400">{c.reportsCount} reports</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Rank</th>
              <th className="text-left px-4 py-3 font-semibold">Citizen</th>
              <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">District</th>
              <th className="text-left px-4 py-3 font-semibold">Reports</th>
              <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Badges</th>
              <th className="text-right px-4 py-3 font-semibold">Points</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((c, i) => {
              const district = getDistrict(c.districtId);
              return (
                <tr key={c.id} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-3 font-semibold text-gray-500">#{i + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: c.avatarColor }}>
                      {c.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-100">{c.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{lang === 'bn' ? district?.nameBn : district?.nameEn}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-gray-400" />{c.reportsCount}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {c.badges.map(b => <span key={b} className="text-[10px] bg-bd-green/10 text-bd-green px-1.5 py-0.5 rounded">{b}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-bd-green">{c.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
