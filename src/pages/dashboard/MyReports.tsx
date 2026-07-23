import { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ComplaintCard } from '../../components/ComplaintCard';
import { FileText } from 'lucide-react';

export function MyReports() {
  const { user } = useAuth();
  const { complaints } = useData();
  const myReports = useMemo(() => complaints.filter(c => c.citizenName === user?.name || c.citizenId === user?.id), [complaints, user]);
  const list = myReports.length ? myReports : complaints.slice(0, 6);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2"><FileText className="w-6 h-6 text-bd-green" /> My Reports</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">All complaints you've submitted to Citizen Voice Bangladesh.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(c => <ComplaintCard key={c.id} complaint={c} />)}
      </div>
    </div>
  );
}
