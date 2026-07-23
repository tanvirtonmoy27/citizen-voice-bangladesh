import { useMemo } from 'react';
import { Download } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, Legend,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { districts } from '../../data/districts';
import { categories } from '../../data/categories';
import { departments } from '../../data/departments';

function downloadCsv(rows: (string | number)[][], filename: string) {
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export function Analytics() {
  const { user } = useAuth();
  const { complaints } = useData();
  const scoped = useMemo(() => (user?.role === 'admin' ? complaints.filter(c => c.departmentId === user.departmentId) : complaints), [complaints, user]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    scoped.forEach(c => { map[c.categoryId] = (map[c.categoryId] || 0) + 1; });
    return categories.map(cat => ({ name: cat.nameEn, value: map[cat.id] || 0 })).filter(d => d.value > 0).sort((a, b) => b.value - a.value);
  }, [scoped]);

  const byDistrict = useMemo(() => {
    const map: Record<string, number> = {};
    scoped.forEach(c => { map[c.districtId] = (map[c.districtId] || 0) + 1; });
    return districts.map(d => ({ name: d.nameEn, value: map[d.id] || 0 })).filter(d => d.value > 0).sort((a, b) => b.value - a.value).slice(0, 10);
  }, [scoped]);

  const monthlyTrend = [
    { month: 'Feb', reports: 180, solved: 120 }, { month: 'Mar', reports: 210, solved: 150 },
    { month: 'Apr', reports: 195, solved: 160 }, { month: 'May', reports: 240, solved: 190 },
    { month: 'Jun', reports: 260, solved: 205 }, { month: 'Jul', reports: scoped.length, solved: scoped.filter(c => c.status === 'solved').length },
  ];

  const deptPerf = useMemo(() => {
    return departments.map(d => {
      const items = complaints.filter(c => c.departmentId === d.id);
      const solved = items.filter(c => c.status === 'solved').length;
      return { name: d.nameEn.split(' ').slice(0, 2).join(' '), rate: items.length ? Math.round((solved / items.length) * 100) : 0 };
    });
  }, [complaints]);

  const exportCsv = () => {
    const rows: (string | number)[][] = [['Tracking Code', 'Title', 'Category', 'District', 'Status', 'Priority', 'Created At']];
    scoped.forEach(c => rows.push([c.trackingCode, c.title, c.categoryId, c.districtId, c.status, c.priority, c.createdAt]));
    downloadCsv(rows, 'citizen-voice-report-export.csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Insights across categories, districts, and department performance.</p>
        </div>
        <button onClick={exportCsv} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bd-green text-white font-semibold text-sm hover:bg-bd-green-dark">
          <Download className="w-4 h-4" /> Export Report (CSV)
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Reports by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byCategory} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis type="number" fontSize={12} />
              <YAxis dataKey="name" type="category" fontSize={11} width={110} />
              <Tooltip />
              <Bar dataKey="value" fill="#006A4E" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Reports by District (Top 10)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byDistrict}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" fontSize={10} angle={-30} textAnchor="end" height={60} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#F42A41" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="reports" stroke="#1D4ED8" strokeWidth={2} />
              <Line type="monotone" dataKey="solved" stroke="#006A4E" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Department Resolution Rate</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deptPerf}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" fontSize={9} angle={-25} textAnchor="end" height={70} />
              <YAxis fontSize={12} unit="%" />
              <Tooltip />
              <Bar dataKey="rate" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
