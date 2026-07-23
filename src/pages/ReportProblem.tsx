import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Upload, MapPin, Sparkles, Loader2, ShieldQuestion, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { districts } from '../data/districts';
import { categories } from '../data/categories';
import { getDepartment } from '../data/departments';
import { runAIAnalysis, type AIAnalysis } from '../utils/ai';
import { LocationPicker } from '../components/LocationPicker';
import { PriorityBadge } from '../components/Badges';
import type { Complaint } from '../types';

export function ReportProblem() {
  const { lang } = useLanguage();
  const { complaints, addComplaint } = useData();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [districtId, setDistrictId] = useState('dhaka');
  const [upazila, setUpazila] = useState(districts[0].upazilas[0]);
  const [address, setAddress] = useState('');
  const [pos, setPos] = useState<{ lat: number; lng: number }>({ lat: districts[0].lat, lng: districts[0].lng });
  const [images, setImages] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [submitted, setSubmitted] = useState<Complaint | null>(null);

  const district = districts.find(d => d.id === districtId)!;

  const handleImages = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).slice(0, 4).map(f => URL.createObjectURL(f));
    setImages(prev => [...prev, ...urls].slice(0, 4));
  };

  const handleVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const sample = lang === 'bn'
        ? 'রাস্তায় বড় গর্ত হয়েছে এবং এটি খুব বিপজ্জনক, দ্রুত মেরামত প্রয়োজন।'
        : 'There is a large pothole on the road and it is very dangerous, urgent repair is needed.';
      setDescription(prev => (prev ? prev + ' ' + sample : sample));
    }, 1800);
  };

  const runAnalysis = () => {
    if (!title.trim() || !description.trim()) return;
    setAnalyzing(true);
    setAnalysis(null);
    setTimeout(() => {
      const result = runAIAnalysis(title, description, districtId, images.length, complaints);
      setAnalysis(result);
      setAnalyzing(false);
    }, 1100);
  };

  const handleSubmit = () => {
    if (!analysis) return;
    const now = new Date().toISOString();
    const dept = getDepartment(analysis.departmentId);
    const complaint: Complaint = {
      id: `cmp-new-${Date.now()}`,
      trackingCode: `CVB-2026-${Math.floor(10000 + Math.random() * 89999)}`,
      title,
      description,
      categoryId: analysis.categoryId,
      districtId,
      upazila,
      address: address || `${upazila}, ${district.nameEn}`,
      lat: pos.lat,
      lng: pos.lng,
      status: 'pending',
      priority: analysis.priority,
      isAnonymous,
      citizenName: isAnonymous ? 'Anonymous Citizen' : 'Md. Rakibul Hasan',
      citizenId: 'citizen-1',
      departmentId: analysis.departmentId,
      createdAt: now,
      updatedAt: now,
      images: images.length ? images : [`https://loremflickr.com/640/420/${analysis.categoryId},bangladesh?lock=${Date.now()}`],
      upvotes: 0,
      aiSummary: analysis.summary,
      aiSpamScore: analysis.spamScore,
      aiDuplicateOf: analysis.duplicateOf?.id,
      estResolutionDate: new Date(Date.now() + analysis.estResolutionDays * 86400000).toISOString(),
      timeline: [{ id: 't1', date: now, actor: 'AI System', role: 'citizen', action: 'Complaint submitted and auto-classified by AI', note: `Routed to ${dept?.nameEn}` }],
      comments: [],
    };
    addComplaint(complaint);
    setSubmitted(complaint);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">Complaint Submitted Successfully</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Your tracking code is below. Save it to check status anytime.</p>
        <p className="text-2xl font-mono font-bold text-bd-green bg-bd-green/10 rounded-xl py-3 mb-6">{submitted.trackingCode}</p>
        <div className="flex justify-center gap-3">
          <button onClick={() => navigate(`/complaint/${submitted.id}`)} className="px-5 py-2.5 rounded-xl bg-bd-green text-white font-semibold hover:bg-bd-green-dark">
            View Complaint
          </button>
          <button onClick={() => navigate('/')} className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">Report a Public Problem</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Describe the issue and our AI will classify it, estimate priority, and route it to the right department.</p>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Complaint Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Large pothole on main road causing accidents"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Description</label>
            <button onClick={handleVoice} className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg ${isRecording ? 'bg-red-100 text-red-600' : 'bg-bd-green/10 text-bd-green'}`}>
              <Mic className="w-3.5 h-3.5" /> {isRecording ? 'Listening...' : 'Voice to Text'}
            </button>
          </div>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe the problem in detail — location landmarks, how long it has existed, who is affected..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">District</label>
            <select
              value={districtId}
              onChange={e => { setDistrictId(e.target.value); const d = districts.find(x => x.id === e.target.value)!; setUpazila(d.upazilas[0]); setPos({ lat: d.lat, lng: d.lng }); }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green"
            >
              {districts.map(d => <option key={d.id} value={d.id}>{lang === 'bn' ? d.nameBn : d.nameEn}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Upazila / Area</label>
            <select value={upazila} onChange={e => setUpazila(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green">
              {district.upazilas.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Street / Landmark (optional)</label>
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g. Near Zero Point, opposite City Hospital" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-bd-green" />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5"><MapPin className="w-4 h-4" /> Pin Exact Location on Map</label>
          <LocationPicker lat={pos.lat} lng={pos.lng} onChange={(lat, lng) => setPos({ lat, lng })} />
          <p className="text-xs text-gray-400 mt-1">Tap on the map to move the pin. Coordinates: {pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">Upload Images / Video</label>
          <div className="flex flex-wrap gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={img} className="w-full h-full object-cover" />
                <button onClick={() => setImages(imgs => imgs.filter((_, idx) => idx !== i))} className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {images.length < 4 && (
              <label className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer text-gray-400 hover:border-bd-green hover:text-bd-green">
                <Upload className="w-5 h-5" />
                <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={e => handleImages(e.target.files)} />
              </label>
            )}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
          <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="w-4 h-4 rounded accent-bd-green" />
          <ShieldQuestion className="w-4 h-4 text-gray-400" /> Submit this complaint anonymously
        </label>

        <button
          onClick={runAnalysis}
          disabled={!title.trim() || !description.trim() || analyzing}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold disabled:opacity-40"
        >
          {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {analyzing ? 'AI is analyzing your report...' : 'Run AI Analysis'}
        </button>

        {analysis && (
          <div className="rounded-2xl border border-bd-green/30 bg-bd-green/5 p-5 space-y-3 animate-fade-up">
            <div className="flex items-center gap-2 text-bd-green dark:text-emerald-300 font-bold">
              <Sparkles className="w-4 h-4" /> AI Analysis Result
            </div>
            {analysis.isLikelySpam && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 rounded-lg px-3 py-2">
                <AlertTriangle className="w-4 h-4" /> This report has a high spam score ({analysis.spamScore}/100). Consider adding more detail before submitting.
              </div>
            )}
            {analysis.duplicateOf && (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 dark:bg-amber-900/30 rounded-lg px-3 py-2">
                <AlertTriangle className="w-4 h-4" /> Possible duplicate of <b>{analysis.duplicateOf.trackingCode}</b> ({Math.round(analysis.duplicateOf.similarity * 100)}% similar) — consider upvoting that report instead.
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-1">Detected Category</p>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{categories.find(c => c.id === analysis.categoryId)?.nameEn} <span className="text-gray-400 font-normal">({Math.round(analysis.categoryConfidence * 100)}% confidence)</span></p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-1">Suggested Priority</p>
                <PriorityBadge priority={analysis.priority} />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-1">Assigned Department</p>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{analysis.departmentName}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-1">Estimated Resolution</p>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{analysis.estResolutionDays} days</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-sm">
              <p className="text-gray-400 text-xs mb-1">AI-Generated Summary</p>
              <p className="text-gray-700 dark:text-gray-200">{analysis.summary}</p>
            </div>
            <button onClick={handleSubmit} className="w-full px-5 py-3 rounded-xl bg-bd-green text-white font-semibold hover:bg-bd-green-dark">
              Confirm & Submit Complaint
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
