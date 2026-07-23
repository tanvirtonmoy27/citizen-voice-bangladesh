export type Status = 'pending' | 'in_progress' | 'solved' | 'rejected';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Role = 'citizen' | 'officer' | 'admin' | 'super_admin';
export type Lang = 'en' | 'bn';

export interface District {
  id: string;
  nameEn: string;
  nameBn: string;
  division: string;
  divisionBn: string;
  lat: number;
  lng: number;
  upazilas: string[];
}

export interface Department {
  id: string;
  nameEn: string;
  nameBn: string;
  categoryIds: string[];
  headOfficer: string;
  avgResponseDays: number;
  contactEmail: string;
  contactPhone: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameBn: string;
  icon: string;
  keywords: string[];
  defaultDeptId: string;
  defaultPriority: Priority;
  estResolutionDays: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  actor: string;
  role: Role;
  action: string;
  note?: string;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
  isOfficial?: boolean;
}

export interface Complaint {
  id: string;
  trackingCode: string;
  title: string;
  description: string;
  categoryId: string;
  districtId: string;
  upazila: string;
  address: string;
  lat: number;
  lng: number;
  status: Status;
  priority: Priority;
  isAnonymous: boolean;
  citizenName: string;
  citizenId: string;
  departmentId: string;
  assignedOfficer?: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
  beforeImage?: string;
  afterImage?: string;
  upvotes: number;
  aiSummary: string;
  aiSpamScore: number;
  aiDuplicateOf?: string;
  estResolutionDate: string;
  timeline: TimelineEvent[];
  comments: Comment[];
  satisfactionRating?: number;
}

export interface Citizen {
  id: string;
  name: string;
  email: string;
  phone: string;
  districtId: string;
  points: number;
  badges: string[];
  reportsCount: number;
  joinedAt: string;
  avatarColor: string;
}

export interface Officer {
  id: string;
  name: string;
  departmentId: string;
  districtId: string;
  designation: string;
  resolvedCount: number;
  pendingCount: number;
  avgResponseDays: number;
  rating: number;
}

export interface Announcement {
  id: string;
  titleEn: string;
  titleBn: string;
  bodyEn: string;
  bodyBn: string;
  date: string;
  type: 'announcement' | 'campaign' | 'alert';
}

export interface Shelter {
  id: string;
  name: string;
  districtId: string;
  capacity: number;
  occupied: number;
  lat: number;
  lng: number;
  contact: string;
}

export interface DisasterAlert {
  id: string;
  type: 'flood' | 'cyclone';
  titleEn: string;
  titleBn: string;
  severity: 'watch' | 'warning' | 'severe';
  districts: string[];
  issuedAt: string;
  descriptionEn: string;
  descriptionBn: string;
}
