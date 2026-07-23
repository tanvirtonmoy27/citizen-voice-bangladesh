import { useMemo } from 'react';
import { Building2, Mail, Phone } from 'lucide-react';
import { departments } from '../../data/departments';
import { useData } from '../../context/DataContext';

export function ManageDepartments() {
  const { complaints } = useData();
  const stats = useMemo(() => departments.map(d => {
    const items = complaints.filter(c => c.departmentId === d.id);
    const solved = items.filter(c => c.status === 'solved').length;
    return { ...d, total: items.length, solved };
  }), [complaints]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Manage Departments</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{departments.length} government departments connected to the platform.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(d => (
          <div key={d.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
            <div className="w-10 h-10 rounded-xl bg-bd-green/10 text-bd-green flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <p className="font-semibold text-gray-900 dark:text-gray-50 text-sm mb-1">{d.nameEn}</p>
            <p className="text-xs text-gray-500 mb-3">Head: {d.headOfficer}</p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg py-2 text-center">
                <p className="font-bold text-gray-800 dark:text-gray-100">{d.total}</p>
                <p className="text-gray-400">Total</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg py-2 text-center">
                <p className="font-bold text-gray-800 dark:text-gray-100">{d.solved}</p>
                <p className="text-gray-400">Solved</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1"><Mail className="w-3 h-3" /> {d.contactEmail}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1.5"><Phone className="w-3 h-3" /> {d.contactPhone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
