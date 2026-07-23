import { useState } from 'react';
import { Search, ShieldCheck, Ban } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { getDistrict } from '../../data/districts';

export function ManageUsers() {
  const { citizens, officers } = useData();
  const [tab, setTab] = useState<'citizens' | 'officers'>('citizens');
  const [query, setQuery] = useState('');

  const filteredCitizens = citizens.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
  const filteredOfficers = officers.filter(o => o.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Manage Users</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{citizens.length} citizens · {officers.length} officers registered nationwide.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button onClick={() => setTab('citizens')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${tab === 'citizens' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}>Citizens</button>
          <button onClick={() => setTab('officers')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${tab === 'officers' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}>Officers</button>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 flex-1 max-w-xs">
          <Search className="w-4 h-4 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name..." className="bg-transparent text-sm flex-1 focus:outline-none" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-x-auto">
        {tab === 'citizens' ? (
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">Email</th>
                <th className="text-left px-4 py-3 font-semibold">District</th>
                <th className="text-left px-4 py-3 font-semibold">Reports</th>
                <th className="text-left px-4 py-3 font-semibold">Points</th>
                <th className="text-left px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCitizens.slice(0, 25).map(c => (
                <tr key={c.id} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.email}</td>
                  <td className="px-4 py-3 text-gray-500">{getDistrict(c.districtId)?.nameEn}</td>
                  <td className="px-4 py-3 text-gray-500">{c.reportsCount}</td>
                  <td className="px-4 py-3 text-gray-500">{c.points}</td>
                  <td className="px-4 py-3"><button className="flex items-center gap-1 text-xs text-red-500 font-semibold"><Ban className="w-3.5 h-3.5" /> Suspend</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">Designation</th>
                <th className="text-left px-4 py-3 font-semibold">District</th>
                <th className="text-left px-4 py-3 font-semibold">Resolved</th>
                <th className="text-left px-4 py-3 font-semibold">Rating</th>
                <th className="text-left px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfficers.slice(0, 25).map(o => (
                <tr key={o.id} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{o.name}</td>
                  <td className="px-4 py-3 text-gray-500">{o.designation}</td>
                  <td className="px-4 py-3 text-gray-500">{getDistrict(o.districtId)?.nameEn}</td>
                  <td className="px-4 py-3 text-gray-500">{o.resolvedCount}</td>
                  <td className="px-4 py-3 text-gray-500">{o.rating}</td>
                  <td className="px-4 py-3"><button className="flex items-center gap-1 text-xs text-bd-green font-semibold"><ShieldCheck className="w-3.5 h-3.5" /> Verify</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
