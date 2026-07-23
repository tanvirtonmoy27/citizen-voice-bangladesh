import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Star, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';

export function OfficerPerformance() {
  const { user } = useAuth();
  const { complaints, officers } = useData();
  const me = officers.find(o => o.name === user?.name) ?? officers[0];

  const assigned = useMemo(() => complaints.filter(c => c.assignedOfficer === user?.name || c.departmentId === user?.departmentId), [complaints, user]);

  const monthly = [
    { month: 'Feb', resolved: 12 }, { month: 'Mar', resolved: 18 }, { month: 'Apr', resolved: 15 },
    { month: 'May', resolved: 22 }, { month: 'Jun', resolved: 19 }, { month: 'Jul', resolved: assigned.filter(c => c.status === 'solved').length || 24 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">My Performance</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{me.designation} · Rating {me.rating}/5</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Resolved Cases" value={me.resolvedCount} icon={CheckCircle2} color="bg-emerald-600" />
        <StatCard label="Pending Cases" value={me.pendingCount} icon={Clock} color="bg-red-600" />
        <StatCard label="Avg Response Days" value={me.avgResponseDays} icon={TrendingUp} color="bg-blue-600" />
        <StatCard label="Citizen Rating" value={`${me.rating}/5`} icon={Star} color="bg-amber-500" />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
        <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Monthly Resolutions</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="resolved" fill="#006A4E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
