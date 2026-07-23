import type { Lang } from '../types';

export function timeAgo(iso: string, lang: Lang): string {
  const now = new Date('2026-07-22T10:00:00').getTime();
  const then = new Date(iso).getTime();
  const diffMs = Math.max(now - then, 0);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days === 0) return lang === 'bn' ? 'আজ' : 'today';
  if (days === 1) return lang === 'bn' ? '১ দিন আগে' : '1 day ago';
  if (days < 30) return lang === 'bn' ? `${days} দিন আগে` : `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return lang === 'bn' ? `${months} মাস আগে` : `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return lang === 'bn' ? `${years} বছর আগে` : `${years} year${years > 1 ? 's' : ''} ago`;
}

export function formatDate(iso: string, lang: Lang): string {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(iso: string, lang: Lang): string {
  const d = new Date(iso);
  return d.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
