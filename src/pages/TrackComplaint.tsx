import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileSearch } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ComplaintCard } from '../components/ComplaintCard';

export function TrackComplaint() {
  const { complaints } = useData();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const found = complaints.find(c => c.trackingCode.toLowerCase() === code.trim().toLowerCase());
    if (found) navigate(`/complaint/${found.id}`);
    else setError('No complaint found with that tracking code. Please check and try again.');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-bd-green/10 text-bd-green flex items-center justify-center mx-auto mb-5">
        <FileSearch className="w-7 h-7" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">Track Your Complaint</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Enter your tracking code (e.g. CVB-2026-10023) to see live status and updates.</p>
      <div className="flex gap-2">
        <input
          value={code}
          onChange={e => { setCode(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="CVB-2026-XXXXX"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-bd-green"
        />
        <button onClick={handleSearch} className="px-5 py-3 rounded-xl bg-bd-green text-white font-semibold hover:bg-bd-green-dark flex items-center gap-2">
          <Search className="w-4 h-4" /> Track
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      <div className="mt-10 text-left">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">Try a sample complaint</p>
        <div className="grid gap-4">
          {complaints.slice(0, 2).map(c => <ComplaintCard key={c.id} complaint={c} />)}
        </div>
      </div>
    </div>
  );
}
