import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { districts } from '../data/districts';
import { useAuth } from '../context/AuthContext';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [districtId, setDistrictId] = useState(districts[0].id);
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    loginAs('citizen');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="text-center mb-6">
        <UserPlus className="w-10 h-10 text-bd-green mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Create Your Account</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Join Citizen Voice Bangladesh (Demo UI)</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green" />
        <select value={districtId} onChange={e => setDistrictId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green">
          {districts.map(d => <option key={d.id} value={d.id}>{d.nameEn}</option>)}
        </select>
        <input type="password" placeholder="Password" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green" />
        <button onClick={handleRegister} className="w-full py-3 rounded-xl bg-bd-green text-white font-semibold hover:bg-bd-green-dark">
          Create Account
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-bd-green font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
