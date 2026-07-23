import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  MapPin, Download, ArrowBigUp, Send, User, Building2, Calendar,
  CheckCircle2, Sparkles, ArrowLeft, Bookmark,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { StatusBadge, PriorityBadge } from '../components/Badges';
import { getCategory } from '../data/categories';
import { getDistrict } from '../data/districts';
import { getDepartment } from '../data/departments';
import { formatDateTime, formatDate } from '../utils/format';
import { downloadComplaintPdf } from '../utils/pdf';
import type { Comment } from '../types';

export function ComplaintDetail() {
  const { id } = useParams();
  const { complaints, upvoteComplaint, addComment } = useData();
  const { lang, t } = useLanguage();
  const [commentText, setCommentText] = useState('');
  const [saved, setSaved] = useState(false);

  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-gray-500">Complaint not found.</p>
        <Link to="/track" className="text-bd-green font-semibold mt-3 inline-block">Track another complaint</Link>
      </div>
    );
  }

  const category = getCategory(complaint.categoryId);
  const district = getDistrict(complaint.districtId);
  const dept = getDepartment(complaint.departmentId);

  const postComment = () => {
    if (!commentText.trim()) return;
    const comment: Comment = { id: `c-${Date.now()}`, author: 'You', date: new Date().toISOString(), text: commentText.trim() };
    addComment(complaint.id, comment);
    setCommentText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/transparency" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-bd-green mb-5">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            {complaint.images[0] && <img src={complaint.images[0]} className="w-full h-64 object-cover" />}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <StatusBadge status={complaint.status} />
                <PriorityBadge priority={complaint.priority} />
                <span className="text-xs px-2.5 py-1 rounded-full bg-bd-green/10 text-bd-green dark:text-emerald-300 font-medium">
                  {lang === 'bn' ? category?.nameBn : category?.nameEn}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{complaint.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{complaint.description}</p>

              <div className="flex items-center gap-2 bg-bd-green/5 border border-bd-green/20 rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 mb-4">
                <Sparkles className="w-4 h-4 text-bd-green shrink-0" />
                <span><b>{t('aiSummary')}:</b> {complaint.aiSummary}</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> {complaint.address}, {district ? (lang === 'bn' ? district.nameBn : district.nameEn) : ''}</p>
                <p className="flex items-center gap-2"><Building2 className="w-4 h-4 text-gray-400" /> {lang === 'bn' ? dept?.nameBn : dept?.nameEn}</p>
                <p className="flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /> {t('submittedBy')}: {complaint.isAnonymous ? t('anonymous') : complaint.citizenName}</p>
                <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" /> {formatDate(complaint.createdAt, lang)}</p>
              </div>

              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => upvoteComplaint(complaint.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold text-sm">
                  <ArrowBigUp className="w-4 h-4" /> {complaint.upvotes} {t('upvote')}
                </button>
                <button onClick={() => setSaved(s => !s)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm ${saved ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <Bookmark className="w-4 h-4" /> {saved ? 'Saved' : 'Save'}
                </button>
                <button onClick={() => downloadComplaintPdf(complaint)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bd-green text-white hover:bg-bd-green-dark font-semibold text-sm ml-auto">
                  <Download className="w-4 h-4" /> {t('downloadPdf')}
                </button>
              </div>
            </div>
          </div>

          {(complaint.beforeImage || complaint.afterImage) && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Before & After</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img src={complaint.beforeImage} className="w-full h-40 object-cover rounded-xl mb-2" />
                  <p className="text-xs text-center text-gray-500 font-semibold">BEFORE</p>
                </div>
                <div>
                  {complaint.afterImage ? (
                    <>
                      <img src={complaint.afterImage} className="w-full h-40 object-cover rounded-xl mb-2" />
                      <p className="text-xs text-center text-emerald-600 font-semibold">AFTER — RESOLVED</p>
                    </>
                  ) : (
                    <div className="w-full h-40 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-sm">Work in progress</div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">{t('timeline')}</h3>
            <div className="space-y-5">
              {complaint.timeline.map((ev, i) => (
                <div key={ev.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`w-3 h-3 rounded-full ${i === complaint.timeline.length - 1 ? 'bg-bd-green' : 'bg-gray-300 dark:bg-gray-600'}`} />
                    {i < complaint.timeline.length - 1 && <span className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{ev.action}</p>
                    {ev.note && <p className="text-xs text-gray-500 mt-0.5">{ev.note}</p>}
                    <p className="text-xs text-gray-400 mt-0.5">{ev.actor} · {formatDateTime(ev.date, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">{t('comments')} ({complaint.comments.length})</h3>
            <div className="space-y-4 mb-4">
              {complaint.comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 shrink-0">
                    {c.author.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {c.author} {c.isOfficial && <span className="text-[10px] bg-bd-green/10 text-bd-green px-1.5 py-0.5 rounded ml-1">OFFICIAL</span>}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{c.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDateTime(c.date, lang)}</p>
                  </div>
                </div>
              ))}
              {complaint.comments.length === 0 && <p className="text-sm text-gray-400">No comments yet. Be the first to respond.</p>}
            </div>
            <div className="flex gap-2">
              <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === 'Enter' && postComment()} placeholder="Add a comment..." className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-bd-green" />
              <button onClick={postComment} className="p-2 rounded-lg bg-bd-green text-white"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 text-center">
            <p className="text-xs text-gray-400 mb-2">{t('trackingCode')}</p>
            <p className="font-mono font-bold text-bd-green text-lg mb-4">{complaint.trackingCode}</p>
            <div className="flex justify-center mb-3">
              <QRCodeSVG value={`https://citizenvoice.bd/complaint/${complaint.id}`} size={140} bgColor="transparent" fgColor="currentColor" className="text-gray-900 dark:text-gray-100" />
            </div>
            <p className="text-xs text-gray-400">{t('qrCode')} — scan to open this complaint</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-3 text-sm">
            <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1">Details</h4>
            <div className="flex justify-between"><span className="text-gray-400">{t('assignedOfficer')}</span><span className="font-medium text-gray-700 dark:text-gray-200">{complaint.assignedOfficer ?? 'Not yet assigned'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">{t('estResolution')}</span><span className="font-medium text-gray-700 dark:text-gray-200">{formatDate(complaint.estResolutionDate, lang)}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Upazila</span><span className="font-medium text-gray-700 dark:text-gray-200">{complaint.upazila}</span></div>
            {complaint.satisfactionRating && (
              <div className="flex justify-between"><span className="text-gray-400">{t('satisfaction')}</span><span className="font-medium text-emerald-600 flex items-center gap-1">{complaint.satisfactionRating}/5 <CheckCircle2 className="w-3.5 h-3.5" /></span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
