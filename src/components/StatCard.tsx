import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: string;
}

export function StatCard({ label, value, icon: Icon, color = 'bg-bd-green', trend }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${color} text-white flex items-center justify-center shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-50 leading-tight">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        {trend && <p className="text-[11px] text-emerald-600 mt-0.5">{trend}</p>}
      </div>
    </div>
  );
}
