import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Contrast, Globe, LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS: { key: 'home' | 'reportProblem' | 'map' | 'transparency' | 'leaderboard' | 'emergency' | 'disaster'; to: string }[] = [
  { key: 'home', to: '/' },
  { key: 'reportProblem', to: '/report' },
  { key: 'map', to: '/map' },
  { key: 'transparency', to: '/transparency' },
  { key: 'leaderboard', to: '/leaderboard' },
  { key: 'disaster', to: '/disaster' },
  { key: 'emergency', to: '/emergency' },
];

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { mode, toggleMode, highContrast, toggleHighContrast } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 rounded-lg bg-bd-green text-white flex items-center justify-center font-bold text-sm">CVB</span>
          <div className="leading-tight hidden sm:block">
            <p className="font-bold text-gray-900 dark:text-gray-50 text-sm">{t('appName')}</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">{t('tagline')}</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-bd-green/10 text-bd-green dark:text-emerald-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Switch language"
          >
            <Globe className="w-4 h-4" /> {lang === 'en' ? 'বাংলা' : 'EN'}
          </button>
          <button onClick={toggleMode} className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" title={t('darkMode')}>
            {mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={toggleHighContrast} className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${highContrast ? 'text-yellow-500' : 'text-gray-600 dark:text-gray-300'}`} title={t('highContrast')}>
            <Contrast className="w-4 h-4" />
          </button>
          {user ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-bd-green text-white hover:bg-bd-green-dark"
              >
                <LayoutDashboard className="w-4 h-4" /> {t('dashboard')}
              </button>
              <button onClick={() => { logout(); navigate('/'); }} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" title={t('logout')}>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-bd-green text-white hover:bg-bd-green-dark">
              <ShieldCheck className="w-4 h-4" /> {t('login')}
            </Link>
          )}
        </div>

        <button className="lg:hidden p-2 text-gray-600 dark:text-gray-300" onClick={() => setOpen(o => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 px-4 py-3 space-y-1 bg-white dark:bg-gray-900">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-bd-green/10 text-bd-green' : 'text-gray-700 dark:text-gray-200'}`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold bg-gray-100 dark:bg-gray-800">
              <Globe className="w-4 h-4" /> {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
            <button onClick={toggleMode} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              {mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={toggleHighContrast} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Contrast className="w-4 h-4" />
            </button>
          </div>
          {user ? (
            <button onClick={() => { setOpen(false); navigate('/dashboard'); }} className="w-full mt-2 px-3 py-2 rounded-lg text-sm font-semibold bg-bd-green text-white">
              {t('dashboard')}
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block w-full mt-2 px-3 py-2 rounded-lg text-sm font-semibold bg-bd-green text-white text-center">
              {t('login')}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
