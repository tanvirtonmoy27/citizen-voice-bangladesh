import type { Category } from '../types';

export const categories: Category[] = [
  { id: 'road', nameEn: 'Road Damage', nameBn: 'সড়ক ক্ষতি', icon: 'Construction', keywords: ['road', 'pothole', 'crack', 'asphalt', 'highway', 'রাস্তা', 'সড়ক'], defaultDeptId: 'rhd', defaultPriority: 'high', estResolutionDays: 14 },
  { id: 'drainage', nameEn: 'Drainage Problem', nameBn: 'ড্রেনেজ সমস্যা', icon: 'Waves', keywords: ['drain', 'drainage', 'sewer', 'clog', 'ড্রেন', 'নর্দমা'], defaultDeptId: 'lgd', defaultPriority: 'medium', estResolutionDays: 10 },
  { id: 'garbage', nameEn: 'Garbage Overflow', nameBn: 'বর্জ্য উপচে পড়া', icon: 'Trash2', keywords: ['garbage', 'waste', 'trash', 'dustbin', 'ময়লা', 'আবর্জনা'], defaultDeptId: 'city_corp', defaultPriority: 'medium', estResolutionDays: 3 },
  { id: 'construction', nameEn: 'Illegal Construction', nameBn: 'অবৈধ নির্মাণ', icon: 'HardHat', keywords: ['illegal', 'construction', 'building', 'encroachment', 'নির্মাণ', 'দখল'], defaultDeptId: 'rajuk', defaultPriority: 'high', estResolutionDays: 30 },
  { id: 'streetlight', nameEn: 'Street Light Failure', nameBn: 'স্ট্রিট লাইট বিকল', icon: 'Lightbulb', keywords: ['street light', 'lamp', 'lighting', 'বাতি', 'লাইট'], defaultDeptId: 'dpdc', defaultPriority: 'low', estResolutionDays: 7 },
  { id: 'waterlogging', nameEn: 'Water Logging', nameBn: 'জলাবদ্ধতা', icon: 'CloudRain', keywords: ['water logging', 'flood', 'waterlog', 'জলাবদ্ধতা', 'পানি'], defaultDeptId: 'lgd', defaultPriority: 'critical', estResolutionDays: 5 },
  { id: 'water_supply', nameEn: 'Water Supply Issue', nameBn: 'পানি সরবরাহ সমস্যা', icon: 'Droplets', keywords: ['water supply', 'tap', 'wasa', 'পানি সরবরাহ'], defaultDeptId: 'wasa', defaultPriority: 'high', estResolutionDays: 5 },
  { id: 'electricity', nameEn: 'Electricity Outage', nameBn: 'বিদ্যুৎ বিভ্রাট', icon: 'Zap', keywords: ['electricity', 'power cut', 'outage', 'transformer', 'বিদ্যুৎ'], defaultDeptId: 'dpdc', defaultPriority: 'high', estResolutionDays: 2 },
  { id: 'traffic', nameEn: 'Traffic Signal Fault', nameBn: 'ট্রাফিক সিগন্যাল ত্রুটি', icon: 'TrafficCone', keywords: ['traffic', 'signal', 'jam', 'ট্রাফিক'], defaultDeptId: 'dtca', defaultPriority: 'medium', estResolutionDays: 6 },
  { id: 'noise', nameEn: 'Noise Pollution', nameBn: 'শব্দ দূষণ', icon: 'Volume2', keywords: ['noise', 'loudspeaker', 'horn', 'শব্দ'], defaultDeptId: 'doe', defaultPriority: 'low', estResolutionDays: 15 },
  { id: 'air_pollution', nameEn: 'Air Pollution', nameBn: 'বায়ু দূষণ', icon: 'Wind', keywords: ['air pollution', 'dust', 'smoke', 'বায়ু দূষণ', 'ধোঁয়া'], defaultDeptId: 'doe', defaultPriority: 'medium', estResolutionDays: 20 },
  { id: 'health', nameEn: 'Public Health Hazard', nameBn: 'জনস্বাস্থ্য ঝুঁকি', icon: 'HeartPulse', keywords: ['health', 'hospital', 'mosquito', 'dengue', 'স্বাস্থ্য'], defaultDeptId: 'dghs', defaultPriority: 'critical', estResolutionDays: 4 },
  { id: 'education', nameEn: 'School Infrastructure', nameBn: 'বিদ্যালয় অবকাঠামো', icon: 'School', keywords: ['school', 'classroom', 'education', 'বিদ্যালয়'], defaultDeptId: 'mopme', defaultPriority: 'medium', estResolutionDays: 25 },
  { id: 'corruption', nameEn: 'Corruption / Bribery', nameBn: 'দুর্নীতি / ঘুষ', icon: 'ShieldAlert', keywords: ['bribe', 'corruption', 'ঘুষ', 'দুর্নীতি'], defaultDeptId: 'acc', defaultPriority: 'critical', estResolutionDays: 30 },
  { id: 'other', nameEn: 'Other', nameBn: 'অন্যান্য', icon: 'FileQuestion', keywords: [], defaultDeptId: 'lgd', defaultPriority: 'low', estResolutionDays: 15 },
];

export function getCategory(id: string) {
  return categories.find(c => c.id === id);
}
