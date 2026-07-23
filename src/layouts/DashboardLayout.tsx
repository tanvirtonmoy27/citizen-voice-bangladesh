import { NavLink, Navigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Users, Building2, Map, BarChart3, Settings,
  LogOut, Moon, Sun, Globe, ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ChatWidget } from '../components/ChatWidget';

const MENUS: Record<string, { to: string; label: string; icon: typeof LayoutDashboard }[]> = {
  citizen: [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/my-reports', label: 'My Reports', icon: FileText },
    { to: '/dashboard/favorites', label: 'Saved / Favorites', icon: BarChart3 },
  ],
  officer: [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/queue', label: 'Complaint Queue', icon: FileText },
    { to: '/dashboard/performance', label: 'My Performance', icon: BarChart3 },
  ],
  admin: [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/queue', label: 'All Complaints', icon: FileText },
    { to: '/dashboard/officers', label: 'Officers', icon: Users },
    { to: '/dashboard/analytics', label: 'Department Analytics', icon: BarChart3 },
  ],
  super_admin: [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/users', label: 'Manage Users', icon: Users },
    { to: '/dashboard/departments', label: 'Departments', icon: Building2 },
    { to: '/dashboard/districts', label: 'Districts', icon: Map },
    { to: '/dashboard/analytics', label: 'System Analytics', icon: BarChart3 },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  ],
};

const ROLE_LABEL: Record<string, string> = {
  citizen: 'Citizen',
  officer: 'Government Officer',
  admin: 'Department Admin',
  super_admin: 'Super Admin',
};

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const { lang, setLang } = useLanguage();
  const { mode, toggleMode } = useTheme();

  if (!user) return <Navigate to="/login" replace />;
  const menu = MENUS[user.role] ?? MENUS.citizen;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      <aside className="w-64 shrink-0 bg-gray-950 text-gray-300 flex flex-col fixed h-screen">
        <div className="p-4 border-b border-gray-800 flex items-center gap-2">
          <span className="w-9 h-9 rounded-lg bg-bd-green text-white flex items-center justify-center font-bold text-sm">CVB</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Citizen Voice</p>
            <p className="text-[11px] text-gray-500">{ROLE_LABEL[user.role]} Panel</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menu.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-bd-green text-white' : 'hover:bg-gray-800 text-gray-300'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800 space-y-2">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-full bg-bd-green/30 text-emerald-300 flex items-center justify-center text-xs font-bold">
              {user.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-white">{user.name}</p>
              <p className="text-[10px] text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs bg-gray-800 hover:bg-gray-700">
              <Globe className="w-3.5 h-3.5" /> {lang === 'en' ? 'বাংলা' : 'EN'}
            </button>
            <button onClick={toggleMode} className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700">
              {mode === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
          <NavLink to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:bg-gray-800">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Site
          </NavLink>
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-gray-800">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </aside>
      <div className="flex-1 ml-64 min-w-0">
        <main className="p-6 max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
