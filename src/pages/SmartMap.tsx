import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { districts } from '../data/districts';
import { categories } from '../data/categories';
import { departments } from '../data/departments';
import { statusIcons } from '../utils/leafletIcons';
import { StatusBadge } from '../components/Badges';
import type { Status } from '../types';

export function SmartMap() {
  const { complaints } = useData();
  const { lang } = useLanguage();
  const [districtFilter, setDistrictFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');

  const filtered = useMemo(() => {
    return complaints.filter(c =>
      (districtFilter === 'all' || c.districtId === districtFilter) &&
      (categoryFilter === 'all' || c.categoryId === categoryFilter) &&
      (statusFilter === 'all' || c.status === statusFilter) &&
      (deptFilter === 'all' || c.departmentId === deptFilter)
    );
  }, [complaints, districtFilter, categoryFilter, statusFilter, deptFilter]);

  const counts = useMemo(() => {
    const c = { pending: 0, in_progress: 0, solved: 0, rejected: 0 } as Record<Status, number>;
    filtered.forEach(x => c[x.status]++);
    return c;
  }, [filtered]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Smart Bangladesh Map</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Live complaint markers across the country — {filtered.length} reports shown.</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Pending ({counts.pending})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> In Progress ({counts.in_progress})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Solved ({counts.solved})</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 mb-4">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300"><Filter className="w-4 h-4" /> Filters</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
            <option value="all">All Districts</option>
            {districts.map(d => <option key={d.id} value={d.id}>{lang === 'bn' ? d.nameBn : d.nameEn}</option>)}
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{lang === 'bn' ? c.nameBn : c.nameEn}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="solved">Solved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
            <option value="all">All Departments</option>
            {departments.map(d => <option key={d.id} value={d.id}>{lang === 'bn' ? d.nameBn : d.nameEn}</option>)}
          </select>
        </div>
      </div>

      <div className="h-[560px] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
        <MapContainer center={[23.685, 90.3563]} zoom={7} className="h-full w-full">
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filtered.map(c => (
            <Marker key={c.id} position={[c.lat, c.lng]} icon={statusIcons[c.status]}>
              <Popup>
                <div className="text-sm">
                  <p className="font-bold mb-1">{c.title}</p>
                  <StatusBadge status={c.status} />
                  <p className="text-xs text-gray-500 mt-1">{c.address}</p>
                  <Link to={`/complaint/${c.id}`} className="text-bd-green font-semibold text-xs block mt-2">View Details →</Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
