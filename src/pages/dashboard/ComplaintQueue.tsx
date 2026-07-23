import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { PriorityBadge } from '../../components/Badges';
import { getCategory } from '../../data/categories';
import { getDistrict } from '../../data/districts';
import { officerNames } from '../../data/names';
import { formatDate } from '../../utils/format';
import type { Status } from '../../types';

export function ComplaintQueue() {
  const { user } = useAuth();
  const { complaints, updateStatus, assignOfficer } = useData();
  const [statusFilter, setStatusFilter] = useState<'all' | Status>('all');

  const scoped = useMemo(() => {
    if (user?.role === 'officer' || user?.role === 'admin') {
      return complaints.filter(c => c.departmentId === user.departmentId);
    }
    return complaints;
  }, [complaints, user]);

  const filtered = statusFilter === 'all' ? scoped : scoped.filter(c => c.status === statusFilter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Complaint Queue</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{filtered.length} complaints {user?.role !== 'super_admin' ? 'in your department' : 'system-wide'}.</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as 'all' | Status)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="solved">Solved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Tracking</th>
              <th className="text-left px-4 py-3 font-semibold">Title</th>
              <th className="text-left px-4 py-3 font-semibold">Category</th>
              <th className="text-left px-4 py-3 font-semibold">District</th>
              <th className="text-left px-4 py-3 font-semibold">Priority</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">Officer</th>
              <th className="text-left px-4 py-3 font-semibold">Date</th>
              <th className="text-left px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 40).map(c => {
              const category = getCategory(c.categoryId);
              const district = getDistrict(c.districtId);
              return (
                <tr key={c.id} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{c.trackingCode}</td>
                  <td className="px-4 py-3 max-w-[220px] truncate font-medium text-gray-800 dark:text-gray-100">{c.title}</td>
                  <td className="px-4 py-3 text-gray-500">{category?.nameEn}</td>
                  <td className="px-4 py-3 text-gray-500">{district?.nameEn}</td>
                  <td className="px-4 py-3"><PriorityBadge priority={c.priority} /></td>
                  <td className="px-4 py-3">
                    <select
                      value={c.status}
                      onChange={e => updateStatus(c.id, e.target.value as Status, undefined, user?.name)}
                      className="text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-1.5 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="solved">Solved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={c.assignedOfficer ?? ''}
                      onChange={e => assignOfficer(c.id, e.target.value)}
                      className="text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-1.5 py-1 max-w-[130px]"
                    >
                      <option value="">Unassigned</option>
                      {officerNames.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(c.createdAt, 'en')}</td>
                  <td className="px-4 py-3">
                    <Link to={`/complaint/${c.id}`} className="text-bd-green"><ExternalLink className="w-4 h-4" /></Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
