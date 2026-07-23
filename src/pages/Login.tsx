import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, HardHat, Building2, Crown, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';

const ROLES: { role: Role; label: string; desc: string; icon: typeof User }[] = [
  { role: 'citizen', label: 'Citizen', desc: 'Report issues & track complaints', icon: User },
  { role: 'officer', label: 'Government Officer', desc: 'Manage & resolve assigned complaints', icon: HardHat },
  { role: 'admin', label: 'Department Admin', desc: 'Oversee department performance', icon: Building2 },
  { role: 'super_admin', label: 'Super Admin', desc: 'Full system administration access', icon: Crown },
];

export function Login() {
  const [selected, setSelected] = useState<Role>('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginAs(selected);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">Sign in to Citizen Voice Bangladesh (Demo UI — choose a role below)</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {ROLES.map(r => (
          <button
            key={r.role}
            onClick={() => setSelected(r.role)}
            className={`text-left p-4 rounded-2xl border-2 transition-all ${
              selected === r.role ? 'border-bd-green bg-bd-green/5' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <r.icon className={`w-6 h-6 mb-2 ${selected === r.role ? 'text-bd-green' : 'text-gray-400'}`} />
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-50">{r.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{r.desc}</p>
          </button>
        ))}
      </div>

      <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="[email protected]" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green" />
        </div>
        <button onClick={handleLogin} className="w-full py-3 rounded-xl bg-bd-green text-white font-semibold hover:bg-bd-green-dark">
          Sign In as {ROLES.find(r => r.role === selected)?.label}
        </button>
        <p className="text-center text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-bd-green font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
}
