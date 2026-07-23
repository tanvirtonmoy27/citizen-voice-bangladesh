import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import {
  FileText, CheckCircle2, Clock, AlertTriangle, MapPinned, Camera, Mic, Languages,
  ShieldCheck, Sparkles, TrendingUp, ArrowRight, Trophy,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { ComplaintCard } from '../components/ComplaintCard';
import { StatCard } from '../components/StatCard';
import { announcements } from '../data/misc';
import { formatDate } from '../utils/format';

export function Home() {
  const { complaints, citizens } = useData();
  const { t, lang } = useLanguage();

  const stats = useMemo(() => {
    const total = complaints.length;
    const solved = complaints.filter(c => c.status === 'solved').length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    const critical = complaints.filter(c => c.priority === 'critical').length;
    return { total, solved, pending, critical };
  }, [complaints]);

  const recent = complaints.slice(0, 6);
  const topContributors = [...citizens].sort((a, b) => b.points - a.points).slice(0, 3);

  const FEATURES = [
    { icon: Camera, title: 'Photo & Video Evidence', desc: 'Attach images or video clips directly from your phone to strengthen your report.' },
    { icon: MapPinned, title: 'Pin Exact Location', desc: 'Drop a precise pin on the interactive map so officers find the problem instantly.' },
    { icon: Mic, title: 'Voice-to-Text', desc: 'Speak your complaint in Bangla or English — our system transcribes it for you.' },
    { icon: Sparkles, title: 'AI Auto-Classification', desc: 'AI detects category, priority, and routes your report to the right department in seconds.' },
    { icon: Languages, title: 'Bangla & English', desc: 'Use the entire platform comfortably in either language, anywhere in the country.' },
    { icon: ShieldCheck, title: 'Anonymous Reporting', desc: 'Report sensitive issues like corruption without revealing your identity.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bd-green via-bd-green-dark to-emerald-950 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-5">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered Smart Governance · Smart Bangladesh 2041
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t('heroTitle')}</h1>
            <p className="text-emerald-50/90 text-base sm:text-lg mb-8 max-w-xl">{t('heroSubtitle')}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/report" className="flex items-center gap-2 bg-white text-bd-green-dark font-semibold px-5 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
                {t('reportNow')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/map" className="flex items-center gap-2 bg-white/10 border border-white/30 font-semibold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors">
                {t('exploreMap')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label={t('totalReports')} value={stats.total.toLocaleString()} icon={FileText} color="bg-blue-600" />
          <StatCard label={t('solvedReports')} value={stats.solved.toLocaleString()} icon={CheckCircle2} color="bg-emerald-600" />
          <StatCard label={t('pendingReports')} value={stats.pending.toLocaleString()} icon={Clock} color="bg-amber-500" />
          <StatCard label={t('criticalIssues')} value={stats.critical.toLocaleString()} icon={AlertTriangle} color="bg-red-600" />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Everything you need to report, and be heard</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">Built for every citizen, from Dhaka to the smallest upazila.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div key={f.title} className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-bd-green/10 text-bd-green dark:text-emerald-300 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent complaints */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Recent Reports from Citizens</h2>
          <Link to="/transparency" className="text-sm font-semibold text-bd-green flex items-center gap-1 hover:underline">
            {t('viewAll')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map(c => <ComplaintCard key={c.id} complaint={c} />)}
        </div>
      </section>

      {/* Leaderboard teaser + announcements */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-gray-900 dark:text-gray-50">Top Contributors</h3>
          </div>
          <div className="space-y-3">
            {topContributors.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c.avatarColor }}>
                  {c.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.reportsCount} reports</p>
                </div>
                <span className="text-sm font-bold text-bd-green">{c.points} pts</span>
              </div>
            ))}
          </div>
          <Link to="/leaderboard" className="mt-4 text-sm font-semibold text-bd-green flex items-center gap-1 hover:underline">
            {t('viewAll')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-bd-green" />
            <h3 className="font-bold text-gray-900 dark:text-gray-50">Government Announcements</h3>
          </div>
          <div className="space-y-4">
            {announcements.slice(0, 3).map(a => (
              <div key={a.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${a.type === 'alert' ? 'bg-red-500' : a.type === 'campaign' ? 'bg-blue-500' : 'bg-bd-green'}`} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{lang === 'bn' ? a.titleBn : a.titleEn}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{lang === 'bn' ? a.bodyBn : a.bodyEn}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{formatDate(a.date, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
