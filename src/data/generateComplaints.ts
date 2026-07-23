import { districts } from './districts';
import { categories } from './categories';
import { getDepartment } from './departments';
import { citizenNames, officerNames, streetNames } from './names';
import type { Complaint, Citizen, Officer, Status, Priority, TimelineEvent, Comment } from '../types';
import { generateSummary, spamScore } from '../utils/ai';

// Category-relevant demo images: LoremFlickr returns photos matching these
// keyword tags, so a "Road Damage" report shows a road photo, a "Garbage
// Overflow" report shows a garbage photo, etc. `lock` keeps the same photo
// for the same seed across reloads.
const CATEGORY_IMAGE_KEYWORDS: Record<string, string> = {
  road: 'road,pothole',
  drainage: 'drain,sewer',
  garbage: 'garbage,trash',
  construction: 'construction,building',
  streetlight: 'streetlight,lamp',
  waterlogging: 'flood,street',
  water_supply: 'water,tap',
  electricity: 'powerlines,electricity',
  traffic: 'traffic,intersection',
  noise: 'concert,speaker',
  air_pollution: 'smoke,factory',
  health: 'hospital,clinic',
  education: 'school,classroom',
  corruption: 'office,documents',
  other: 'city,street',
};

function categoryImage(categoryId: string, seed: string): string {
  const keywords = CATEGORY_IMAGE_KEYWORDS[categoryId] ?? CATEGORY_IMAGE_KEYWORDS.other;
  return `https://loremflickr.com/640/420/${keywords}?lock=${seed}`;
}

// Deterministic PRNG (mulberry32)
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42424242);
const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const TEMPLATES: Record<string, { titleEn: string; descEn: string; titleBn: string }[]> = {
  road: [
    { titleEn: 'Large pothole causing accidents', descEn: 'A deep pothole has formed on the main road near {street}, {district}. Several motorbikes have skidded here after rain. Urgent repair needed before more accidents happen.', titleBn: '{street}-এ বড় গর্ত, দুর্ঘটনার আশঙ্কা' },
    { titleEn: 'Road surface completely damaged after monsoon', descEn: 'The asphalt on {street} in {district} has washed away completely, leaving the road unusable for rickshaws and cars. Please repair urgently.', titleBn: '{street}-এ বর্ষার পর সড়ক সম্পূর্ণ ক্ষতিগ্রস্ত' },
    { titleEn: 'Cracks spreading across highway lane', descEn: 'Long cracks are spreading on the highway near {street}, {district}, making it risky for buses and trucks travelling at speed.', titleBn: '{street}-এ মহাসড়কে ফাটল বিস্তৃত হচ্ছে' },
  ],
  drainage: [
    { titleEn: 'Blocked drain causing overflow', descEn: 'The drainage line near {street}, {district} is completely blocked with plastic waste, causing dirty water to overflow onto the street every evening.', titleBn: '{street}-এ ড্রেন বন্ধ, পানি উপচে পড়ছে' },
    { titleEn: 'Open drain without cover is a safety hazard', descEn: 'An open drainage ditch on {street} in {district} has no cover, and a child nearly fell in last week. Needs an urgent cover or fence.', titleBn: '{street}-এ খোলা ড্রেন, নিরাপত্তা ঝুঁকি' },
  ],
  garbage: [
    { titleEn: 'Garbage overflowing for a week', descEn: 'The community bin at {street}, {district} has not been collected for over a week. Garbage is overflowing onto the footpath and smells terrible.', titleBn: '{street}-এ এক সপ্তাহ ধরে ময়লা জমে আছে' },
    { titleEn: 'Illegal dumping near residential area', descEn: 'Trucks are illegally dumping construction waste behind {street}, {district}, blocking the walking path for residents.', titleBn: '{street}-এ আবাসিক এলাকায় অবৈধ বর্জ্য ফেলা হচ্ছে' },
  ],
  construction: [
    { titleEn: 'Building constructed without approved plan', descEn: 'A 6-storey building is being constructed on {street}, {district} without a visible RAJUK approval signboard, encroaching on the neighboring plot.', titleBn: '{street}-এ অনুমোদন ছাড়া ভবন নির্মাণ' },
    { titleEn: 'Illegal structure blocking public pathway', descEn: 'A shop extension on {street}, {district} has encroached on the public footpath, forcing pedestrians onto the road.', titleBn: '{street}-এ অবৈধ স্থাপনা জনসাধারণের পথ বন্ধ করছে' },
  ],
  streetlight: [
    { titleEn: 'Street lights not working for weeks', descEn: 'Most street lights on {street}, {district} have been non-functional for over two weeks, making the area unsafe for women and elderly at night.', titleBn: '{street}-এ কয়েক সপ্তাহ ধরে স্ট্রিট লাইট বিকল' },
  ],
  waterlogging: [
    { titleEn: 'Severe waterlogging after light rain', descEn: 'Even light rain causes knee-deep water logging on {street}, {district}, disrupting daily movement and damaging shop goods.', titleBn: '{street}-এ সামান্য বৃষ্টিতেই তীব্র জলাবদ্ধতা' },
  ],
  water_supply: [
    { titleEn: 'No water supply for three days', descEn: 'Households near {street}, {district} have had no piped water supply for three days. Elderly residents are struggling to fetch water.', titleBn: '{street}-এ তিন দিন ধরে পানি সরবরাহ বন্ধ' },
  ],
  electricity: [
    { titleEn: 'Frequent power outages damaging appliances', descEn: 'Residents of {street}, {district} are facing 4-5 power cuts daily, damaging refrigerators and fans. The local transformer seems faulty.', titleBn: '{street}-এ বারবার বিদ্যুৎ বিভ্রাটে যন্ত্রপাতি ক্ষতিগ্রস্ত' },
  ],
  traffic: [
    { titleEn: 'Traffic signal not functioning at busy intersection', descEn: 'The traffic signal at {street}, {district} has been dark for days, causing dangerous congestion during office hours.', titleBn: '{street}-এ ব্যস্ত মোড়ে ট্রাফিক সিগন্যাল অচল' },
  ],
  noise: [
    { titleEn: 'Loudspeaker noise disturbing residents at night', descEn: 'A wedding venue near {street}, {district} plays loudspeakers past midnight regularly, disturbing students and elderly residents.', titleBn: '{street}-এ রাতে লাউডস্পিকারে শব্দদূষণ' },
  ],
  air_pollution: [
    { titleEn: 'Brick kiln smoke affecting nearby school', descEn: 'A brick kiln near {street}, {district} emits thick black smoke every morning, affecting children at the nearby primary school.', titleBn: '{street}-এ ইটভাটার ধোঁয়ায় দূষণ' },
  ],
  health: [
    { titleEn: 'Stagnant water breeding mosquitoes, dengue risk', descEn: 'Stagnant water near {street}, {district} has become a mosquito breeding ground, and two dengue cases were reported nearby this month.', titleBn: '{street}-এ জমে থাকা পানিতে ডেঙ্গুর ঝুঁকি' },
  ],
  education: [
    { titleEn: 'School roof leaking, classrooms unusable in rain', descEn: 'The primary school on {street}, {district} has a leaking roof, forcing classes to stop whenever it rains.', titleBn: '{street}-এ স্কুলের ছাদ চুইয়ে ক্লাস ব্যাহত' },
  ],
  corruption: [
    { titleEn: 'Bribery demanded for trade license renewal', descEn: 'Shop owners near {street}, {district} report being asked for unofficial payments to renew trade licenses at the local office.', titleBn: '{street}-এ ট্রেড লাইসেন্স নবায়নে ঘুষ দাবি' },
  ],
  other: [
    { titleEn: 'Stray animal population increasing near market', descEn: 'A growing number of stray dogs near {street}, {district} market is worrying shoppers and shopkeepers, especially in the evening.', titleBn: '{street}-এ বাজারে বেওয়ারিশ প্রাণীর সংখ্যা বাড়ছে' },
  ],
};

const STATUSES: Status[] = ['pending', 'in_progress', 'solved', 'rejected'];
const STATUS_WEIGHTS = [0.32, 0.28, 0.35, 0.05];

function weightedStatus(): Status {
  const r = rand();
  let acc = 0;
  for (let i = 0; i < STATUSES.length; i++) {
    acc += STATUS_WEIGHTS[i];
    if (r <= acc) return STATUSES[i];
  }
  return 'pending';
}

function daysAgo(n: number): Date {
  const d = new Date('2026-07-22T10:00:00');
  d.setDate(d.getDate() - n);
  return d;
}

function buildTimeline(status: Status, createdAt: Date, officer: string): TimelineEvent[] {
  const timeline: TimelineEvent[] = [
    { id: 't1', date: createdAt.toISOString(), actor: 'AI System', role: 'citizen', action: 'Complaint submitted and auto-classified by AI' },
  ];
  if (status !== 'pending') {
    const reviewDate = new Date(createdAt); reviewDate.setDate(reviewDate.getDate() + 1);
    timeline.push({ id: 't2', date: reviewDate.toISOString(), actor: officer, role: 'officer', action: 'Reviewed and assigned to field officer' });
  }
  if (status === 'in_progress' || status === 'solved') {
    const startDate = new Date(createdAt); startDate.setDate(startDate.getDate() + 3);
    timeline.push({ id: 't3', date: startDate.toISOString(), actor: officer, role: 'officer', action: 'Work started on-site', note: 'Before photo captured' });
  }
  if (status === 'solved') {
    const doneDate = new Date(createdAt); doneDate.setDate(doneDate.getDate() + randInt(4, 18));
    timeline.push({ id: 't4', date: doneDate.toISOString(), actor: officer, role: 'officer', action: 'Issue resolved and verified', note: 'After photo uploaded' });
  }
  if (status === 'rejected') {
    const rejDate = new Date(createdAt); rejDate.setDate(rejDate.getDate() + 2);
    timeline.push({ id: 't4r', date: rejDate.toISOString(), actor: officer, role: 'officer', action: 'Marked as invalid / out of jurisdiction' });
  }
  return timeline;
}

function buildComments(status: Status, officer: string): Comment[] {
  const comments: Comment[] = [];
  if (rand() > 0.4) {
    comments.push({ id: 'c1', author: pick(citizenNames), date: daysAgo(randInt(1, 20)).toISOString(), text: pick([
      'Facing the same issue here, please resolve soon.',
      'This has been a problem for months, thank you for reporting.',
      'I upvoted this — happens near my house too.',
    ]) });
  }
  if (status === 'in_progress' || status === 'solved') {
    comments.push({ id: 'c2', author: officer, date: daysAgo(randInt(1, 10)).toISOString(), text: pick([
      'Field team dispatched, assessment in progress.',
      'Materials procured, work scheduled this week.',
      'Repair completed, please confirm on your end.',
    ]), isOfficial: true });
  }
  return comments;
}

export function generateComplaints(count: number): Complaint[] {
  const complaints: Complaint[] = [];
  for (let i = 0; i < count; i++) {
    const category = pick(categories);
    const district = pick(districts);
    const templates = TEMPLATES[category.id] ?? TEMPLATES.other;
    const template = pick(templates);
    const street = pick(streetNames);
    const upazila = pick(district.upazilas);
    const titleEn = template.titleEn;
    const descEn = template.descEn.replace('{street}', street).replace('{district}', district.nameEn);
    const status = weightedStatus();
    const createdAt = daysAgo(randInt(1, 150));
    const dept = getDepartment(category.defaultDeptId)!;
    const officer = pick(officerNames);
    const priority: Priority = rand() > 0.85 ? 'critical' : (category.defaultPriority as Priority);
    const isAnonymous = rand() > 0.75;
    const citizen = pick(citizenNames);
    const imgCount = randInt(1, 3);
    const images = Array.from({ length: imgCount }, (_, idx) => categoryImage(category.id, `${i}-${idx}`));
    const estResolution = new Date(createdAt); estResolution.setDate(estResolution.getDate() + category.estResolutionDays);

    const complaint: Complaint = {
      id: `cmp-${i + 1}`,
      trackingCode: `CVB-2026-${String(10000 + i)}`,
      title: titleEn,
      description: descEn,
      categoryId: category.id,
      districtId: district.id,
      upazila,
      address: `${street}, ${upazila}, ${district.nameEn}`,
      lat: district.lat + (rand() - 0.5) * 0.15,
      lng: district.lng + (rand() - 0.5) * 0.15,
      status,
      priority,
      isAnonymous,
      citizenName: isAnonymous ? 'Anonymous Citizen' : citizen,
      citizenId: `citizen-${(i % citizenNames.length) + 1}`,
      departmentId: dept.id,
      assignedOfficer: status === 'pending' ? undefined : officer,
      createdAt: createdAt.toISOString(),
      updatedAt: daysAgo(randInt(0, 5)).toISOString(),
      images,
      beforeImage: status === 'solved' || status === 'in_progress' ? categoryImage(category.id, `before${i}`) : undefined,
      afterImage: status === 'solved' ? categoryImage(category.id, `after${i}`) : undefined,
      upvotes: randInt(0, 340),
      aiSummary: generateSummary(titleEn, descEn),
      aiSpamScore: spamScore(titleEn, descEn, imgCount),
      estResolutionDate: estResolution.toISOString(),
      timeline: buildTimeline(status, createdAt, officer),
      comments: buildComments(status, officer),
      satisfactionRating: status === 'solved' ? randInt(3, 5) : undefined,
    };
    complaints.push(complaint);
  }
  return complaints.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function generateCitizens(): Citizen[] {
  const colors = ['#006A4E', '#F42A41', '#1D4ED8', '#7C3AED', '#EA580C', '#0891B2'];
  return citizenNames.map((name, i) => ({
    id: `citizen-${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@mail.com`,
    phone: `01${randInt(3, 9)}${randInt(10000000, 99999999)}`,
    districtId: pick(districts).id,
    points: randInt(20, 2400),
    badges: pick([
      ['First Report'], ['First Report', 'Community Helper'], ['First Report', 'Community Helper', 'Top Contributor'],
      ['First Report', 'Duplicate Buster'], [],
    ]),
    reportsCount: randInt(1, 40),
    joinedAt: daysAgo(randInt(30, 500)).toISOString(),
    avatarColor: colors[i % colors.length],
  }));
}

export function generateOfficers(): Officer[] {
  return officerNames.map((name, i) => ({
    id: `officer-${i + 1}`,
    name,
    departmentId: pick(['rhd', 'lgd', 'city_corp', 'rajuk', 'dpdc', 'wasa', 'dtca', 'doe', 'dghs', 'mopme']),
    districtId: pick(districts).id,
    designation: pick(['Field Officer', 'Assistant Engineer', 'Executive Officer', 'Sub-Assistant Engineer', 'Inspector']),
    resolvedCount: randInt(15, 220),
    pendingCount: randInt(2, 30),
    avgResponseDays: randInt(2, 15),
    rating: Math.round((3 + rand() * 2) * 10) / 10,
  }));
}
