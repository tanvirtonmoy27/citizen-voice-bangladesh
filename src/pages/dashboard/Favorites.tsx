import { useMemo } from 'react';
import { Bookmark } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ComplaintCard } from '../../components/ComplaintCard';

export function Favorites() {
  const { complaints } = useData();
  const saved = useMemo(() => [...complaints].sort((a, b) => b.upvotes - a.upvotes).slice(0, 6), [complaints]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2"><Bookmark className="w-6 h-6 text-amber-500" /> Saved / Favorite Reports</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Reports you've bookmarked to follow their progress.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {saved.map(c => <ComplaintCard key={c.id} complaint={c} />)}
      </div>
    </div>
  );
}
