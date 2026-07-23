import { useMemo, useState } from 'react';
import { ShieldCheck, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { ComplaintCard } from '../components/ComplaintCard';
import { districts } from '../data/districts';
import { categories } from '../data/categories';
import { departments } from '../data/departments';

export function Transparency() {
  const { complaints } = useData();
  const { lang } = useLanguage();
  const [districtFilter, setDistrictFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    return complaints.filter(c =>
      (districtFilter === 'all' || c.districtId === districtFilter) &&
      (categoryFilter === 'all' || c.categoryId === categoryFilter) &&
      (statusFilter === 'all' || c.status === statusFilter)
    );
  }, [complaints, districtFilter, categoryFilter, statusFilter]);

  const visible = filtered.slice(0, page * perPage);

  const deptStats = useMemo(() => {
    return departments.map(d => {
      const items = complaints.filter(c => c.departmentId === d.id);
      const solved = items.filter(c => c.status === 'solved').length;
      return { dept: d, total: items.length, solved, rate: items.length ? Math.round((solved / items.length) * 100) : 0 };
    }).sort((a, b) => b.rate - a.rate);
  }, [complaints]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <ShieldCheck className="w-10 h-10 text-bd-green mx-auto mb-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">Public Transparency Portal</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Every citizen can view public reports, government progress, and department performance — no login required.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 mb-8">
        <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Department Resolution Rates</h3>
        <div className="space-y-3">
          {deptStats.slice(0, 6).map(s => (
            <div key={s.dept.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">{lang === 'bn' ? s.dept.nameBn : s.dept.nameEn}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{s.rate}% ({s.solved}/{s.total})</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div className="h-full bg-bd-green rounded-full" style={{ width: `${s.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 mb-6">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300"><Filter className="w-4 h-4" /> Filters</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select value={districtFilter} onChange={e => { setDistrictFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
            <option value="all">All Districts</option>
            {districts.map(d => <option key={d.id} value={d.id}>{lang === 'bn' ? d.nameBn : d.nameEn}</option>)}
          </select>
          <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{lang === 'bn' ? c.nameBn : c.nameEn}</option>)}
          </select>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="solved">Solved</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map(c => <ComplaintCard key={c.id} complaint={c} />)}
      </div>
      {visible.length < filtered.length && (
        <div className="text-center mt-8">
          <button onClick={() => setPage(p => p + 1)} className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
