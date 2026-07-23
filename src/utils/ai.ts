import { categories } from '../data/categories';
import { getDepartment } from '../data/departments';
import type { Complaint, Priority } from '../types';

export interface AIAnalysis {
  categoryId: string;
  categoryConfidence: number;
  priority: Priority;
  departmentId: string;
  departmentName: string;
  estResolutionDays: number;
  summary: string;
  spamScore: number;
  isLikelySpam: boolean;
  duplicateOf?: { id: string; trackingCode: string; title: string; similarity: number };
}

const CRITICAL_WORDS = ['fire', 'collapse', 'die', 'death', 'dead', 'flood', 'gas leak', 'explosion', 'আগুন', 'ধস', 'মৃত্যু'];
const HIGH_WORDS = ['urgent', 'danger', 'dangerous', 'accident', 'injury', 'জরুরি', 'বিপদ'];

export function classifyText(text: string): { categoryId: string; confidence: number } {
  const lower = text.toLowerCase();
  let best = { categoryId: 'other', score: 0 };
  for (const cat of categories) {
    let score = 0;
    for (const kw of cat.keywords) {
      if (lower.includes(kw.toLowerCase())) score += kw.length > 4 ? 2 : 1;
    }
    if (score > best.score) best = { categoryId: cat.id, score };
  }
  const confidence = best.score === 0 ? 0.35 : Math.min(0.5 + best.score * 0.1, 0.97);
  return { categoryId: best.categoryId, confidence };
}

export function estimatePriority(text: string, categoryId: string): Priority {
  const lower = text.toLowerCase();
  if (CRITICAL_WORDS.some(w => lower.includes(w))) return 'critical';
  if (HIGH_WORDS.some(w => lower.includes(w))) return 'high';
  const cat = categories.find(c => c.id === categoryId);
  return cat?.defaultPriority ?? 'medium';
}

export function generateSummary(title: string, description: string): string {
  const clean = description.replace(/\s+/g, ' ').trim();
  const firstSentence = clean.split(/[.!?]/)[0];
  const base = firstSentence.length > 15 ? firstSentence : clean;
  const trimmed = base.length > 140 ? base.slice(0, 137) + '...' : base;
  return `${title} — ${trimmed}`;
}

export function spamScore(title: string, description: string, images: number): number {
  let score = 0;
  const text = `${title} ${description}`;
  if (description.length < 15) score += 40;
  if (!/[a-zA-Z\u0980-\u09FF]{4,}/.test(description)) score += 30;
  if (images === 0) score += 10;
  const repeatChar = /(.)\1{4,}/.test(text);
  if (repeatChar) score += 25;
  const allCaps = title.length > 6 && title === title.toUpperCase();
  if (allCaps) score += 10;
  return Math.min(score, 100);
}

function similarity(a: string, b: string): number {
  const setA = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
  const setB = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersect = 0;
  setA.forEach(w => { if (setB.has(w)) intersect++; });
  return intersect / Math.max(setA.size, setB.size);
}

export function findDuplicate(
  title: string,
  description: string,
  districtId: string,
  categoryId: string,
  existing: Complaint[]
): { id: string; trackingCode: string; title: string; similarity: number } | undefined {
  const candidates = existing.filter(c => c.districtId === districtId && c.categoryId === categoryId);
  let best: { id: string; trackingCode: string; title: string; similarity: number } | undefined;
  for (const c of candidates) {
    const sim = similarity(`${title} ${description}`, `${c.title} ${c.description}`);
    if (sim > 0.35 && (!best || sim > best.similarity)) {
      best = { id: c.id, trackingCode: c.trackingCode, title: c.title, similarity: Math.round(sim * 100) / 100 };
    }
  }
  return best;
}

export function runAIAnalysis(
  title: string,
  description: string,
  districtId: string,
  images: number,
  existing: Complaint[]
): AIAnalysis {
  const { categoryId, confidence } = classifyText(`${title} ${description}`);
  const priority = estimatePriority(`${title} ${description}`, categoryId);
  const cat = categories.find(c => c.id === categoryId)!;
  const dept = getDepartment(cat.defaultDeptId);
  const summary = generateSummary(title, description);
  const spam = spamScore(title, description, images);
  const duplicateOf = findDuplicate(title, description, districtId, categoryId, existing);

  return {
    categoryId,
    categoryConfidence: confidence,
    priority,
    departmentId: cat.defaultDeptId,
    departmentName: dept?.nameEn ?? 'Local Government Division',
    estResolutionDays: cat.estResolutionDays,
    summary,
    spamScore: spam,
    isLikelySpam: spam >= 60,
    duplicateOf,
  };
}

const CHAT_RESPONSES: { patterns: string[]; en: string; bn: string }[] = [
  { patterns: ['track', 'status', 'complaint status'], en: 'You can track any complaint by entering its tracking code (e.g. CVB-2026-00123) on the "Track Complaint" page, or from your Personal Dashboard.', bn: 'আপনি "অভিযোগ ট্র্যাক করুন" পেজে ট্র্যাকিং কোড দিয়ে (যেমন CVB-2026-00123) অথবা আপনার ড্যাশবোর্ড থেকে যেকোনো অভিযোগের অবস্থা দেখতে পারেন।' },
  { patterns: ['anonymous', 'identity', 'hide name'], en: "Yes, you can submit a complaint anonymously. Your name won't be shown publicly, though the platform keeps a private reference for verification.", bn: 'হ্যাঁ, আপনি বেনামে অভিযোগ জমা দিতে পারেন। আপনার নাম প্রকাশ্যে দেখানো হবে না।' },
  { patterns: ['how to report', 'submit complaint', 'report a problem'], en: 'Tap "Report a Problem", choose a category, add photos/video, pin the location on the map, and submit. Our AI will auto-classify and route it to the right department.', bn: '"সমস্যা রিপোর্ট করুন" চাপুন, ক্যাটাগরি বেছে নিন, ছবি/ভিডিও যুক্ত করুন, মানচিত্রে অবস্থান নির্দিষ্ট করুন এবং জমা দিন।' },
  { patterns: ['emergency', 'helpline', 'police', 'fire', 'ambulance'], en: 'For emergencies, open the Emergency tab: Police 999, Fire Service 999, Ambulance 999, National Helpline 333.', bn: 'জরুরি প্রয়োজনে ইমার্জেন্সি ট্যাব খুলুন: পুলিশ ৯৯৯, ফায়ার সার্ভিস ৯৯৯, অ্যাম্বুলেন্স ৯৯৯, জাতীয় হেল্পলাইন ৩৩৩।' },
  { patterns: ['duplicate', 'already reported'], en: 'Our AI checks nearby reports in the same category and flags likely duplicates so you can upvote an existing report instead of creating a new one.', bn: 'আমাদের AI একই এলাকার একই ক্যাটাগরির অভিযোগ পরীক্ষা করে সম্ভাব্য পুনরাবৃত্তি চিহ্নিত করে।' },
  { patterns: ['badge', 'points', 'leaderboard', 'reward'], en: 'You earn points for verified reports, upvotes, and community engagement. Points unlock badges and a spot on the Leaderboard.', bn: 'যাচাইকৃত রিপোর্ট, আপভোট এবং কমিউনিটি অংশগ্রহণের জন্য আপনি পয়েন্ট অর্জন করেন, যা ব্যাজ ও লিডারবোর্ডে স্থান আনলক করে।' },
];

export function chatAssistantReply(message: string, lang: 'en' | 'bn'): string {
  const lower = message.toLowerCase();
  for (const r of CHAT_RESPONSES) {
    if (r.patterns.some(p => lower.includes(p))) return lang === 'bn' ? r.bn : r.en;
  }
  return lang === 'bn'
    ? 'আমি আপনার অভিযোগ ট্র্যাকিং, রিপোর্ট জমা, জরুরি নম্বর এবং প্ল্যাটফর্ম বিষয়ক প্রশ্নে সাহায্য করতে পারি। আরও বিস্তারিত জিজ্ঞাসা করুন।'
    : "I can help with tracking complaints, submitting reports, emergency numbers, and general platform questions. Try asking something like 'How do I report a problem?'";
}
