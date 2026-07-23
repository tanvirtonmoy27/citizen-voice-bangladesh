import { useMemo } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { getDistrict } from '../../data/districts';

export function OfficersList() {
  const { user } = useAuth();
  const { officers } = useData();
  const scoped = useMemo(() => (user?.role === 'admin' ? officers.filter(o => o.departmentId === user.departmentId) : officers), [officers, user]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Officers</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{scoped.length} officers listed.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scoped.map(o => {
          const district = getDistrict(o.districtId);
          return (
            <div key={o.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-bd-green/10 text-bd-green flex items-center justify-center font-bold text-sm">
                  {o.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-50">{o.name}</p>
                  <p className="text-xs text-gray-500">{o.designation} · {district?.nameEn}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 text-center text-xs gap-2">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg py-2">
                  <p className="font-bold text-gray-800 dark:text-gray-100">{o.resolvedCount}</p>
                  <p className="text-gray-400">Resolved</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg py-2">
                  <p className="font-bold text-gray-800 dark:text-gray-100">{o.pendingCount}</p>
                  <p className="text-gray-400">Pending</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg py-2">
                  <p className="font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-0.5"><Star className="w-3 h-3 text-amber-500" />{o.rating}</p>
                  <p className="text-gray-400">Rating</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
