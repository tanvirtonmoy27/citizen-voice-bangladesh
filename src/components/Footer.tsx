import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Play, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-950 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-lg bg-bd-green text-white flex items-center justify-center font-bold text-sm">CVB</span>
            <p className="font-bold text-white">{t('appName')}</p>
          </div>
          <p className="text-sm text-gray-400">{t('tagline')}</p>
          <div className="flex items-center gap-3 mt-4">
            <Globe className="w-4 h-4 hover:text-white cursor-pointer" />
            <MessageCircle className="w-4 h-4 hover:text-white cursor-pointer" />
            <Play className="w-4 h-4 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Platform</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/report" className="hover:text-white">{t('reportProblem')}</Link></li>
            <li><Link to="/map" className="hover:text-white">{t('map')}</Link></li>
            <li><Link to="/transparency" className="hover:text-white">{t('transparency')}</Link></li>
            <li><Link to="/leaderboard" className="hover:text-white">{t('leaderboard')}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Services</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/emergency" className="hover:text-white">{t('emergency')}</Link></li>
            <li><Link to="/disaster" className="hover:text-white">{t('disaster')}</Link></li>
            <li><Link to="/announcements" className="hover:text-white">{t('announcements')}</Link></li>
            <li><Link to="/login" className="hover:text-white">Government Login</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3 text-sm">Contact</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> 333 (National Helpline)</li>
            <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> [email protected]</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © 2026 Citizen Voice Bangladesh — {t('footerBuilt')}. {t('footerRights')}
      </div>
    </footer>
  );
}
