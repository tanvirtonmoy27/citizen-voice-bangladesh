import { Phone, ShieldAlert, Flame, Ambulance, Zap, Info } from 'lucide-react';
import { emergencyNumbers } from '../data/misc';
import { useLanguage } from '../context/LanguageContext';

const ICONS: Record<string, typeof Phone> = { ShieldAlert, Phone, Flame, Ambulance, Zap, Info };

export function Emergency() {
  const { lang } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">Emergency Services</h1>
        <p className="text-gray-500 dark:text-gray-400">Tap any number below to call directly in case of emergency.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {emergencyNumbers.map(e => {
          const Icon = ICONS[e.icon] ?? Phone;
          return (
            <a
              key={e.nameEn}
              href={`tel:${e.number}`}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 hover:border-red-300 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-gray-50">{lang === 'bn' ? e.nameBn : e.nameEn}</p>
                <p className="text-xs text-gray-500">Tap to call now</p>
              </div>
              <p className="text-xl font-bold text-red-600">{e.number}</p>
            </a>
          );
        })}
      </div>

      <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 text-sm text-amber-800 dark:text-amber-300">
        <b>Note:</b> These numbers connect directly to national emergency services. For non-urgent public issues, please use the "Report a Problem" feature instead of calling emergency lines.
      </div>
    </div>
  );
}
