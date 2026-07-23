import type { Status, Priority } from '../types';
import { useLanguage } from '../context/LanguageContext';

const STATUS_STYLES: Record<Status, string> = {
  pending: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  in_progress: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  solved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  rejected: 'bg-gray-200 text-gray-600 dark:bg-gray-700/40 dark:text-gray-300',
};

const STATUS_DOT: Record<Status, string> = {
  pending: 'bg-red-500',
  in_progress: 'bg-amber-500',
  solved: 'bg-emerald-500',
  rejected: 'bg-gray-400',
};

const STATUS_KEY: Record<Status, 'statusPending' | 'statusInProgress' | 'statusSolved' | 'statusRejected'> = {
  pending: 'statusPending',
  in_progress: 'statusInProgress',
  solved: 'statusSolved',
  rejected: 'statusRejected',
};

export function StatusBadge({ status }: { status: Status }) {
  const { t } = useLanguage();
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {t(STATUS_KEY[status])}
    </span>
  );
}

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-700/40 dark:text-slate-300',
  medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  critical: 'bg-red-600 text-white',
};

const PRIORITY_KEY: Record<Priority, 'priorityLow' | 'priorityMedium' | 'priorityHigh' | 'priorityCritical'> = {
  low: 'priorityLow',
  medium: 'priorityMedium',
  high: 'priorityHigh',
  critical: 'priorityCritical',
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { t } = useLanguage();
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${PRIORITY_STYLES[priority]}`}>
      {t(PRIORITY_KEY[priority])}
    </span>
  );
}
