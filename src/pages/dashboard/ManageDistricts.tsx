import { useMemo } from 'react';
import { Map as MapIcon } from 'lucide-react';
import { districts, divisions } from '../../data/districts';
import { useData } from '../../context/DataContext';

export function ManageDistricts() {
  const { complaints } = useData();
  const stats = useMemo(() => districts.map(d => {
    const items = complaints.filter(c => c.districtId === d.id);
    const solved = items.filter(c => c.status === 'solved').length;
    return { ...d, total: items.length, solved };
  }).sort((a, b) => b.total - a.total), [complaints]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Manage Districts</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{districts.length} districts across {divisions.length} divisions.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">District</th>
              <th className="text-left px-4 py-3 font-semibold">Division</th>
              <th className="text-left px-4 py-3 font-semibold">Upazilas</th>
              <th className="text-left px-4 py-3 font-semibold">Total Reports</th>
              <th className="text-left px-4 py-3 font-semibold">Solved</th>
              <th className="text-left px-4 py-3 font-semibold">Resolution Rate</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(d => (
              <tr key={d.id} className="border-t border-gray-100 dark:border-gray-700">
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100 flex items-center gap-2"><MapIcon className="w-3.5 h-3.5 text-gray-400" /> {d.nameEn}</td>
                <td className="px-4 py-3 text-gray-500">{d.division}</td>
                <td className="px-4 py-3 text-gray-500">{d.upazilas.length}</td>
                <td className="px-4 py-3 text-gray-500">{d.total}</td>
                <td className="px-4 py-3 text-gray-500">{d.solved}</td>
                <td className="px-4 py-3 text-gray-500">{d.total ? Math.round((d.solved / d.total) * 100) : 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
