import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, CheckCircle2, Clock, AlertTriangle, Star, Award, Users, Building2,
  TrendingUp, ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { ComplaintCard } from '../../components/ComplaintCard';
import { departments } from '../../data/departments';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid,
} from 'recharts';

const COLORS = ['#006A4E', '#F42A41', '#1D4ED8', '#F59E0B', '#7C3AED', '#0891B2'];

export function DashboardHome() {
  const { user } = useAuth();
  const { complaints, citizens, officers } = useData();

  const myReports = useMemo(() => complaints.filter(c => c.citizenId === user?.id || (!c.isAnonymous && c.citizenName === user?.name)), [complaints, user]);
  const deptComplaints = useMemo(() => complaints.filter(c => c.departmentId === user?.departmentId), [complaints, user]);

  const categoryChart = useMemo(() => {
    const map: Record<string, number> = {};
    complaints.forEach(c => { map[c.categoryId] = (map[c.categoryId] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, value]) => ({ name, value }));
  }, [complaints]);

  const statusPie = useMemo(() => {
    const s = { pending: 0, in_progress: 0, solved: 0, rejected: 0 };
    complaints.forEach(c => { s[c.status]++; });
    return [
      { name: 'Pending', value: s.pending },
      { name: 'In Progress', value: s.in_progress },
      { name: 'Solved', value: s.solved },
      { name: 'Rejected', value: s.rejected },
    ];
  }, [complaints]);

  if (user?.role === 'citizen') {
    const points = citizens.find(c => c.name === user.name)?.points ?? 340;
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-gray-500 dark:text-gray-400">Here's your civic activity overview.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="My Reports" value={myReports.length || 12} icon={FileText} color="bg-blue-600" />
          <StatCard label="Resolved" value={myReports.filter(c => c.status === 'solved').length || 5} icon={CheckCircle2} color="bg-emerald-600" />
          <StatCard label="Reward Points" value={points} icon={Star} color="bg-amber-500" />
          <StatCard label="Badges Earned" value={3} icon={Award} color="bg-purple-600" />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-gray-50">Recent Reports</h2>
          <Link to="/dashboard/my-reports" className="text-sm font-semibold text-bd-green flex items-center gap-1">View All <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(myReports.length ? myReports : complaints).slice(0, 3).map(c => <ComplaintCard key={c.id} complaint={c} />)}
        </div>
      </div>
    );
  }

  if (user?.role === 'officer') {
    const assigned = complaints.filter(c => c.assignedOfficer === user.name || c.departmentId === user.departmentId);
    const pending = assigned.filter(c => c.status === 'pending').length;
    const solved = assigned.filter(c => c.status === 'solved').length;
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Officer Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your assigned complaints and track performance.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pending Complaints" value={pending || 8} icon={Clock} color="bg-red-600" />
          <StatCard label="Resolved" value={solved || 34} icon={CheckCircle2} color="bg-emerald-600" />
          <StatCard label="Avg Response (days)" value="6.4" icon={TrendingUp} color="bg-blue-600" />
          <StatCard label="Citizen Rating" value="4.3/5" icon={Star} color="bg-amber-500" />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-gray-50">Pending Queue</h2>
          <Link to="/dashboard/queue" className="text-sm font-semibold text-bd-green flex items-center gap-1">View Queue <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assigned.slice(0, 3).map(c => <ComplaintCard key={c.id} complaint={c} />)}
        </div>
      </div>
    );
  }

  if (user?.role === 'admin') {
    const total = deptComplaints.length;
    const solved = deptComplaints.filter(c => c.status === 'solved').length;
    const dept = departments.find(d => d.id === user.departmentId);
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{dept?.nameEn} — Admin Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Department-wide performance and complaint management.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Complaints" value={total} icon={FileText} color="bg-blue-600" />
          <StatCard label="Solved" value={solved} icon={CheckCircle2} color="bg-emerald-600" />
          <StatCard label="Avg Response (days)" value={dept?.avgResponseDays ?? '-'} icon={Clock} color="bg-amber-500" />
          <StatCard label="Officers" value={officers.filter(o => o.departmentId === user.departmentId).length || 6} icon={Users} color="bg-purple-600" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Monthly Complaint Trend (Demo)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[
              { month: 'Feb', reports: 22 }, { month: 'Mar', reports: 31 }, { month: 'Apr', reports: 28 },
              { month: 'May', reports: 40 }, { month: 'Jun', reports: 35 }, { month: 'Jul', reports: total || 45 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="reports" fill="#006A4E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // super_admin
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">System-Wide Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">National statistics across all districts and departments.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Reports" value={complaints.length} icon={FileText} color="bg-blue-600" />
        <StatCard label="Solved" value={complaints.filter(c => c.status === 'solved').length} icon={CheckCircle2} color="bg-emerald-600" />
        <StatCard label="Critical Issues" value={complaints.filter(c => c.priority === 'critical').length} icon={AlertTriangle} color="bg-red-600" />
        <StatCard label="Active Citizens" value={citizens.length} icon={Users} color="bg-purple-600" />
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Top Problem Categories</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryChart} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis type="number" fontSize={12} />
              <YAxis dataKey="name" type="category" fontSize={11} width={90} />
              <Tooltip />
              <Bar dataKey="value" fill="#F42A41" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Reports by Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusPie} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
                {statusPie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Link to="/dashboard/departments" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 font-semibold text-sm text-gray-700 dark:text-gray-200 hover:border-bd-green">
          <Building2 className="w-4 h-4" /> Manage Departments
        </Link>
        <Link to="/dashboard/users" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 font-semibold text-sm text-gray-700 dark:text-gray-200 hover:border-bd-green">
          <Users className="w-4 h-4" /> Manage Users
        </Link>
      </div>
    </div>
  );
}
