import { Link } from 'react-router-dom';
import { MapPin, ArrowBigUp, MessageSquare, Clock } from 'lucide-react';
import type { Complaint } from '../types';
import { StatusBadge, PriorityBadge } from './Badges';
import { getCategory } from '../data/categories';
import { getDistrict } from '../data/districts';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { timeAgo } from '../utils/format';

export function ComplaintCard({ complaint }: { complaint: Complaint }) {
  const { t, lang } = useLanguage();
  const { upvoteComplaint } = useData();
  const category = getCategory(complaint.categoryId);
  const district = getDistrict(complaint.districtId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow animate-fade-up">
      {complaint.images[0] && (
        <Link to={`/complaint/${complaint.id}`}>
          <img src={complaint.images[0]} alt={complaint.title} className="w-full h-40 object-cover" loading="lazy" />
        </Link>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <StatusBadge status={complaint.status} />
          <PriorityBadge priority={complaint.priority} />
          <span className="text-xs px-2 py-1 rounded-full bg-bd-green/10 text-bd-green dark:text-emerald-300 font-medium">
            {lang === 'bn' ? category?.nameBn : category?.nameEn}
          </span>
        </div>
        <Link to={`/complaint/${complaint.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-1 hover:text-bd-green">
            {complaint.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {district ? (lang === 'bn' ? district.nameBn : district.nameEn) : ''} · {complaint.upazila}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <button
            onClick={() => upvoteComplaint(complaint.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowBigUp className="w-4 h-4" />
            {complaint.upvotes}
          </button>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            {complaint.comments.length} {t('comments')}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {timeAgo(complaint.createdAt, lang)}
          </span>
        </div>
      </div>
    </div>
  );
}
