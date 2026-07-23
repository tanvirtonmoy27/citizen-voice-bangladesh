import type { District } from '../types';

export const districts: District[] = [
  { id: 'dhaka', nameEn: 'Dhaka', nameBn: 'ঢাকা', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.8103, lng: 90.4125, upazilas: ['Dhamrai', 'Savar', 'Keraniganj', 'Nawabganj'] },
  { id: 'gazipur', nameEn: 'Gazipur', nameBn: 'গাজীপুর', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.9999, lng: 90.4203, upazilas: ['Kaliakair', 'Kapasia', 'Sreepur'] },
  { id: 'narayanganj', nameEn: 'Narayanganj', nameBn: 'নারায়ণগঞ্জ', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.6238, lng: 90.4990, upazilas: ['Bandar', 'Rupganj', 'Sonargaon'] },
  { id: 'tangail', nameEn: 'Tangail', nameBn: 'টাঙ্গাইল', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 24.2513, lng: 89.9167, upazilas: ['Sakhipur', 'Ghatail', 'Madhupur'] },
  { id: 'chattogram', nameEn: 'Chattogram', nameBn: 'চট্টগ্রাম', division: 'Chattogram', divisionBn: 'চট্টগ্রাম', lat: 22.3569, lng: 91.7832, upazilas: ['Patiya', 'Sitakunda', 'Hathazari', 'Anwara'] },
  { id: 'coxsbazar', nameEn: "Cox's Bazar", nameBn: 'কক্সবাজার', division: 'Chattogram', divisionBn: 'চট্টগ্রাম', lat: 21.4272, lng: 92.0058, upazilas: ['Teknaf', 'Ramu', 'Ukhia'] },
  { id: 'cumilla', nameEn: 'Cumilla', nameBn: 'কুমিল্লা', division: 'Chattogram', divisionBn: 'চট্টগ্রাম', lat: 23.4607, lng: 91.1809, upazilas: ['Daudkandi', 'Chandina', 'Laksam'] },
  { id: 'rajshahi', nameEn: 'Rajshahi', nameBn: 'রাজশাহী', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 24.3745, lng: 88.6042, upazilas: ['Paba', 'Godagari', 'Tanore', 'Charghat'] },
  { id: 'bogura', nameEn: 'Bogura', nameBn: 'বগুড়া', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 24.8465, lng: 89.3773, upazilas: ['Shibganj', 'Sherpur', 'Kahaloo'] },
  { id: 'pabna', nameEn: 'Pabna', nameBn: 'পাবনা', division: 'Rajshahi', divisionBn: 'রাজশাহী', lat: 23.9985, lng: 89.2333, upazilas: ['Ishwardi', 'Bera', 'Chatmohar'] },
  { id: 'khulna', nameEn: 'Khulna', nameBn: 'খুলনা', division: 'Khulna', divisionBn: 'খুলনা', lat: 22.8456, lng: 89.5403, upazilas: ['Dumuria', 'Rupsa', 'Paikgacha', 'Terokhada'] },
  { id: 'jessore', nameEn: 'Jessore', nameBn: 'যশোর', division: 'Khulna', divisionBn: 'খুলনা', lat: 23.1667, lng: 89.2167, upazilas: ['Jhikargacha', 'Bagherpara', 'Chaugachha'] },
  { id: 'satkhira', nameEn: 'Satkhira', nameBn: 'সাতক্ষীরা', division: 'Khulna', divisionBn: 'খুলনা', lat: 22.7185, lng: 89.0705, upazilas: ['Kaliganj', 'Shyamnagar', 'Tala'] },
  { id: 'barishal', nameEn: 'Barishal', nameBn: 'বরিশাল', division: 'Barishal', divisionBn: 'বরিশাল', lat: 22.7010, lng: 90.3535, upazilas: ['Bakerganj', 'Babuganj', 'Gournadi'] },
  { id: 'bhola', nameEn: 'Bhola', nameBn: 'ভোলা', division: 'Barishal', divisionBn: 'বরিশাল', lat: 22.6859, lng: 90.6482, upazilas: ['Char Fasson', 'Lalmohan', 'Daulatkhan'] },
  { id: 'patuakhali', nameEn: 'Patuakhali', nameBn: 'পটুয়াখালী', division: 'Barishal', divisionBn: 'বরিশাল', lat: 22.3596, lng: 90.3296, upazilas: ['Kalapara', 'Galachipa', 'Bauphal'] },
  { id: 'sylhet', nameEn: 'Sylhet', nameBn: 'সিলেট', division: 'Sylhet', divisionBn: 'সিলেট', lat: 24.8949, lng: 91.8687, upazilas: ['Beanibazar', 'Golapganj', 'Jaintiapur'] },
  { id: 'moulvibazar', nameEn: 'Moulvibazar', nameBn: 'মৌলভীবাজার', division: 'Sylhet', divisionBn: 'সিলেট', lat: 24.4829, lng: 91.7774, upazilas: ['Sreemangal', 'Kulaura', 'Kamalganj'] },
  { id: 'rangpur', nameEn: 'Rangpur', nameBn: 'রংপুর', division: 'Rangpur', divisionBn: 'রংপুর', lat: 25.7439, lng: 89.2752, upazilas: ['Badarganj', 'Mithapukur', 'Pirganj'] },
  { id: 'dinajpur', nameEn: 'Dinajpur', nameBn: 'দিনাজপুর', division: 'Rangpur', divisionBn: 'রংপুর', lat: 25.6279, lng: 88.6332, upazilas: ['Birganj', 'Parbatipur', 'Fulbari'] },
  { id: 'mymensingh', nameEn: 'Mymensingh', nameBn: 'ময়মনসিংহ', division: 'Mymensingh', divisionBn: 'ময়মনসিংহ', lat: 24.7471, lng: 90.4203, upazilas: ['Trishal', 'Muktagachha', 'Bhaluka'] },
  { id: 'jamalpur', nameEn: 'Jamalpur', nameBn: 'জামালপুর', division: 'Mymensingh', divisionBn: 'ময়মনসিংহ', lat: 24.9375, lng: 89.9373, upazilas: ['Melandaha', 'Islampur', 'Madarganj'] },
  { id: 'noakhali', nameEn: 'Noakhali', nameBn: 'নোয়াখালী', division: 'Chattogram', divisionBn: 'চট্টগ্রাম', lat: 22.8696, lng: 91.0995, upazilas: ['Begumganj', 'Senbagh', 'Companiganj'] },
  { id: 'faridpur', nameEn: 'Faridpur', nameBn: 'ফরিদপুর', division: 'Dhaka', divisionBn: 'ঢাকা', lat: 23.6070, lng: 89.8429, upazilas: ['Boalmari', 'Alfadanga', 'Nagarkanda'] },
];

export const divisions = Array.from(new Set(districts.map(d => d.division)));

export function getDistrict(id: string) {
  return districts.find(d => d.id === id);
}
