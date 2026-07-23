import type { Announcement, Shelter, DisasterAlert } from '../types';

export const announcements: Announcement[] = [
  { id: 'a1', titleEn: 'Smart Bangladesh Citizen App Crosses 2 Million Users', titleBn: 'স্মার্ট বাংলাদেশ সিটিজেন অ্যাপ ২ মিলিয়ন ব্যবহারকারী অতিক্রম করেছে', bodyEn: 'The Citizen Voice platform has now been used by over 2 million citizens nationwide to report and track public service issues.', bodyBn: 'সিটিজেন ভয়েস প্ল্যাটফর্ম এখন সারাদেশে ২ মিলিয়নেরও বেশি নাগরিক ব্যবহার করছেন।', date: '2026-07-10', type: 'announcement' },
  { id: 'a2', titleEn: 'Monsoon Drainage Cleanup Campaign', titleBn: 'বর্ষা ড্রেনেজ পরিষ্কার অভিযান', bodyEn: 'City corporations across the country are running a month-long drain-clearing campaign ahead of peak monsoon season.', bodyBn: 'বর্ষার আগে দেশব্যাপী ড্রেন পরিষ্কার অভিযান পরিচালিত হচ্ছে।', date: '2026-07-05', type: 'campaign' },
  { id: 'a3', titleEn: 'Heavy Rainfall Alert for Coastal Districts', titleBn: 'উপকূলীয় জেলাগুলোর জন্য ভারী বৃষ্টিপাতের সতর্কতা', bodyEn: 'The Meteorological Department has forecast heavy rainfall in coastal districts over the next 72 hours.', bodyBn: 'আবহাওয়া অধিদপ্তর আগামী ৭২ ঘণ্টায় উপকূলীয় জেলাগুলোতে ভারী বৃষ্টিপাতের পূর্বাভাস দিয়েছে।', date: '2026-07-20', type: 'alert' },
  { id: 'a4', titleEn: 'Digital Citizen Certificate Program Launched', titleBn: 'ডিজিটাল সিটিজেন সার্টিফিকেট প্রোগ্রাম চালু', bodyEn: 'Active contributors can now earn a verifiable Digital Citizen Certificate recognizing their civic engagement.', bodyBn: 'সক্রিয় অবদানকারীরা এখন একটি যাচাইযোগ্য ডিজিটাল সিটিজেন সার্টিফিকেট অর্জন করতে পারবেন।', date: '2026-06-28', type: 'announcement' },
  { id: 'a5', titleEn: 'Tree Plantation Community Challenge', titleBn: 'বৃক্ষ রোপণ কমিউনিটি চ্যালেঞ্জ', bodyEn: 'Join the nationwide tree plantation challenge and earn Environmental Score points on your citizen profile.', bodyBn: 'দেশব্যাপী বৃক্ষরোপণ চ্যালেঞ্জে যুক্ত হয়ে পরিবেশ স্কোর পয়েন্ট অর্জন করুন।', date: '2026-06-15', type: 'campaign' },
];

export const shelters: Shelter[] = [
  { id: 's1', name: 'Bhola Government Primary Shelter', districtId: 'bhola', capacity: 500, occupied: 120, lat: 22.69, lng: 90.65, contact: '01711-000111' },
  { id: 's2', name: 'Patuakhali Cyclone Shelter Centre', districtId: 'patuakhali', capacity: 800, occupied: 310, lat: 22.36, lng: 90.33, contact: '01711-000222' },
  { id: 's3', name: "Cox's Bazar Coastal Shelter", districtId: 'coxsbazar', capacity: 650, occupied: 90, lat: 21.43, lng: 92.01, contact: '01711-000333' },
  { id: 's4', name: 'Barishal Union Multipurpose Shelter', districtId: 'barishal', capacity: 400, occupied: 60, lat: 22.70, lng: 90.35, contact: '01711-000444' },
  { id: 's5', name: 'Satkhira Flood Shelter Point', districtId: 'satkhira', capacity: 350, occupied: 200, lat: 22.72, lng: 89.07, contact: '01711-000555' },
];

export const disasterAlerts: DisasterAlert[] = [
  { id: 'd1', type: 'flood', titleEn: 'Flash Flood Warning — Sylhet & Moulvibazar', titleBn: 'আকস্মিক বন্যা সতর্কতা — সিলেট ও মৌলভীবাজার', severity: 'warning', districts: ['sylhet', 'moulvibazar'], issuedAt: '2026-07-20T09:00:00', descriptionEn: 'Upstream water levels are rising rapidly. Residents near riverbanks are advised to move to higher ground.', descriptionBn: 'উজানে পানির স্তর দ্রুত বাড়ছে। নদীতীরবর্তী বাসিন্দাদের উঁচু স্থানে সরে যাওয়ার পরামর্শ দেওয়া হচ্ছে।' },
  { id: 'd2', type: 'cyclone', titleEn: 'Cyclone Watch — Bay of Bengal Coastal Belt', titleBn: 'ঘূর্ণিঝড় পর্যবেক্ষণ — বঙ্গোপসাগর উপকূল', severity: 'watch', districts: ['coxsbazar', 'bhola', 'patuakhali', 'barishal'], issuedAt: '2026-07-21T14:00:00', descriptionEn: 'A low-pressure system over the Bay of Bengal may intensify. Fishermen are advised not to venture into deep sea.', descriptionBn: 'বঙ্গোপসাগরে একটি লঘুচাপ শক্তিশালী হতে পারে। জেলেদের গভীর সমুদ্রে না যাওয়ার পরামর্শ দেওয়া হচ্ছে।' },
  { id: 'd3', type: 'flood', titleEn: 'River Erosion Alert — Jamalpur', titleBn: 'নদী ভাঙন সতর্কতা — জামালপুর', severity: 'severe', districts: ['jamalpur'], issuedAt: '2026-07-18T11:00:00', descriptionEn: 'Severe riverbank erosion reported near several unions. Emergency relocation support is being coordinated.', descriptionBn: 'বেশ কয়েকটি ইউনিয়নে তীব্র নদী ভাঙনের খবর পাওয়া গেছে। জরুরি স্থানান্তর সহায়তা সমন্বয় করা হচ্ছে।' },
];

export const emergencyNumbers = [
  { nameEn: 'National Emergency (Police/Fire/Ambulance)', nameBn: 'জাতীয় জরুরি সেবা', number: '999', icon: 'ShieldAlert' },
  { nameEn: 'National Helpline (Women & Child)', nameBn: 'জাতীয় হেল্পলাইন (নারী ও শিশু)', number: '109', icon: 'Phone' },
  { nameEn: 'Fire Service & Civil Defence', nameBn: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স', number: '999', icon: 'Flame' },
  { nameEn: 'Ambulance Service', nameBn: 'অ্যাম্বুলেন্স সেবা', number: '199', icon: 'Ambulance' },
  { nameEn: 'Electricity Emergency (DPDC)', nameBn: 'বিদ্যুৎ জরুরি সেবা', number: '16216', icon: 'Zap' },
  { nameEn: 'Titas Gas Emergency', nameBn: 'তিতাস গ্যাস জরুরি সেবা', number: '16496', icon: 'Flame' },
  { nameEn: 'National Info Service (333)', nameBn: 'জাতীয় তথ্য সেবা', number: '333', icon: 'Info' },
  { nameEn: 'Anti-Corruption Hotline', nameBn: 'দুর্নীতি বিরোধী হটলাইন', number: '106', icon: 'ShieldAlert' },
];
