import { Megaphone, AlertTriangle, PartyPopper } from 'lucide-react';
import { announcements } from '../data/misc';
import { useLanguage } from '../context/LanguageContext';
import { formatDate } from '../utils/format';

const TYPE_ICON = { announcement: Megaphone, campaign: PartyPopper, alert: AlertTriangle };
const TYPE_STYLE = {
  announcement: 'bg-bd-green/10 text-bd-green',
  campaign: 'bg-blue-100 text-blue-700',
  alert: 'bg-red-100 text-red-700',
};

export function Announcements() {
  const { lang } = useLanguage();
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">Government Announcements & Campaigns</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Stay informed on national initiatives, public awareness campaigns, and important alerts.</p>
      <div className="space-y-4">
        {announcements.map(a => {
          const Icon = TYPE_ICON[a.type];
          return (
            <div key={a.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 flex gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${TYPE_STYLE[a.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-50">{lang === 'bn' ? a.titleBn : a.titleEn}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lang === 'bn' ? a.bodyBn : a.bodyEn}</p>
                <p className="text-xs text-gray-400 mt-2">{formatDate(a.date, lang)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
