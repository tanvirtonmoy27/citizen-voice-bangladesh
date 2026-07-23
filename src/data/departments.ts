import type { Department } from '../types';

export const departments: Department[] = [
  { id: 'rhd', nameEn: 'Roads & Highways Department', nameBn: 'সড়ক ও জনপথ অধিদপ্তর', categoryIds: ['road'], headOfficer: 'Engr. Mahbub Alam', avgResponseDays: 12, contactEmail: '[email protected]', contactPhone: '02-9515-2020' },
  { id: 'lgd', nameEn: 'Local Government Division', nameBn: 'স্থানীয় সরকার বিভাগ', categoryIds: ['drainage', 'waterlogging', 'other'], headOfficer: 'Md. Kamal Hossain', avgResponseDays: 9, contactEmail: '[email protected]', contactPhone: '02-9540-1122' },
  { id: 'city_corp', nameEn: 'City Corporation (Waste Mgmt)', nameBn: 'সিটি কর্পোরেশন (বর্জ্য ব্যবস্থাপনা)', categoryIds: ['garbage'], headOfficer: 'Selina Ahmed', avgResponseDays: 2, contactEmail: '[email protected]', contactPhone: '02-9558-3344' },
  { id: 'rajuk', nameEn: 'RAJUK (Capital Development Authority)', nameBn: 'রাজউক', categoryIds: ['construction'], headOfficer: 'Architect Rashed Karim', avgResponseDays: 21, contactEmail: '[email protected]', contactPhone: '02-9556-7788' },
  { id: 'dpdc', nameEn: 'Dhaka Power Distribution Company', nameBn: 'ঢাকা বিদ্যুৎ বিতরণ কোম্পানি', categoryIds: ['streetlight', 'electricity'], headOfficer: 'Engr. Farida Yasmin', avgResponseDays: 4, contactEmail: '[email protected]', contactPhone: '16216' },
  { id: 'wasa', nameEn: 'Water Supply & Sewerage Authority', nameBn: 'ওয়াসা', categoryIds: ['water_supply'], headOfficer: 'Md. Taqsem A. Khan', avgResponseDays: 5, contactEmail: '[email protected]', contactPhone: '16162' },
  { id: 'dtca', nameEn: 'Dhaka Transport Coordination Authority', nameBn: 'ঢাকা পরিবহন সমন্বয় কর্তৃপক্ষ', categoryIds: ['traffic'], headOfficer: 'Nasreen Sultana', avgResponseDays: 8, contactEmail: '[email protected]', contactPhone: '02-9110-2233' },
  { id: 'doe', nameEn: 'Department of Environment', nameBn: 'পরিবেশ অধিদপ্তর', categoryIds: ['noise', 'air_pollution'], headOfficer: 'Dr. Ziaul Haque', avgResponseDays: 18, contactEmail: '[email protected]', contactPhone: '02-9111-4455' },
  { id: 'dghs', nameEn: 'Directorate General of Health Services', nameBn: 'স্বাস্থ্য অধিদপ্তর', categoryIds: ['health'], headOfficer: 'Dr. Nasima Sultana', avgResponseDays: 3, contactEmail: '[email protected]', contactPhone: '16263' },
  { id: 'mopme', nameEn: 'Ministry of Primary & Mass Education', nameBn: 'প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়', categoryIds: ['education'], headOfficer: 'Habibur Rahman', avgResponseDays: 22, contactEmail: '[email protected]', contactPhone: '02-9540-5566' },
  { id: 'acc', nameEn: 'Anti-Corruption Commission', nameBn: 'দুর্নীতি দমন কমিশন', categoryIds: ['corruption'], headOfficer: 'Md. Moinuddin Abdullah', avgResponseDays: 28, contactEmail: '[email protected]', contactPhone: '106' },
];

export function getDepartment(id: string) {
  return departments.find(d => d.id === id);
}
