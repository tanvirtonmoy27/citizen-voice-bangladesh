import { useState } from 'react';
import { Settings as SettingsIcon, RefreshCcw, Bell, Globe2, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export function Settings() {
  const { resetDemoData } = useData();
  const [notif, setNotif] = useState(true);
  const [autoAssign, setAutoAssign] = useState(true);
  const [spamFilter, setSpamFilter] = useState(true);
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2500);
  };

  const Row = ({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{label}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-bd-green' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2"><SettingsIcon className="w-6 h-6 text-gray-500" /> System Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Platform-wide configuration for Citizen Voice Bangladesh.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
        <Row label="Push Notifications" desc="Send citizens status updates on their complaints" value={notif} onChange={() => setNotif(v => !v)} />
        <Row label="AI Auto-Assignment" desc="Automatically assign new complaints to departments" value={autoAssign} onChange={() => setAutoAssign(v => !v)} />
        <Row label="AI Spam Filter" desc="Flag likely spam/fake reports before publishing" value={spamFilter} onChange={() => setSpamFilter(v => !v)} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 space-y-3">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2"><Globe2 className="w-4 h-4" /> Platform Info</p>
        <p className="text-xs text-gray-500">Citizen Voice Bangladesh v1.0.0 — Smart Bangladesh Digital Governance Initiative</p>
        <p className="text-xs text-gray-500 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> All demo data is stored locally in your browser only.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Demo Data</p>
        <p className="text-xs text-gray-500 mb-3">Reset all complaint data back to the original generated demo dataset.</p>
        <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
          <RefreshCcw className="w-4 h-4" /> Reset Demo Data
        </button>
        {resetDone && <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1"><Bell className="w-3.5 h-3.5" /> Demo data has been reset.</p>}
      </div>
    </div>
  );
}
