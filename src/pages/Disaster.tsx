import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CloudRain, Waves, MapPin, Users, Package, UserSearch, AlertTriangle, Phone } from 'lucide-react';
import { disasterAlerts, shelters } from '../data/misc';
import { getDistrict } from '../data/districts';
import { useLanguage } from '../context/LanguageContext';
import { shelterIcon } from '../utils/leafletIcons';
import { formatDateTime } from '../utils/format';

const SEVERITY_STYLE: Record<string, string> = {
  watch: 'bg-amber-100 text-amber-700 border-amber-300',
  warning: 'bg-orange-100 text-orange-700 border-orange-300',
  severe: 'bg-red-100 text-red-700 border-red-300',
};

const RELIEF_TRACKER = [
  { district: 'Bhola', items: 'Rice, Dry Food, Water Purification Tablets', delivered: 1200, target: 1500 },
  { district: "Cox's Bazar", items: 'Tarpaulin, Blankets, Medicine', delivered: 800, target: 1000 },
  { district: 'Patuakhali', items: 'Rice, Saline, Candles', delivered: 950, target: 1100 },
];

const MISSING_PERSONS = [
  { name: 'Abdul Jabbar (62)', lastSeen: 'Char Fasson, Bhola', date: '2026-07-19', contact: '01711-XXXXXX' },
  { name: 'Rina Begum (34)', lastSeen: 'Kalapara, Patuakhali', date: '2026-07-20', contact: '01911-XXXXXX' },
];

export function Disaster() {
  const { lang } = useLanguage();
  const [volunteerSent, setVolunteerSent] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <CloudRain className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">Disaster Response Center</h1>
        <p className="text-gray-500 dark:text-gray-400">Real-time flood & cyclone alerts, shelters, relief tracking, and volunteer coordination.</p>
      </div>

      <section>
        <h2 className="font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" /> Active Alerts</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {disasterAlerts.map(a => (
            <div key={a.id} className={`rounded-2xl border-2 p-5 ${SEVERITY_STYLE[a.severity]} bg-white dark:bg-gray-800`}>
              <div className="flex items-center gap-2 mb-2">
                {a.type === 'flood' ? <Waves className="w-4 h-4" /> : <CloudRain className="w-4 h-4" />}
                <span className="text-xs font-bold uppercase">{a.severity}</span>
              </div>
              <p className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{lang === 'bn' ? a.titleBn : a.titleEn}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{lang === 'bn' ? a.descriptionBn : a.descriptionEn}</p>
              <p className="text-xs text-gray-400">Issued {formatDateTime(a.issuedAt, lang)} · {a.districts.map(d => getDistrict(d)?.nameEn).join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-600" /> Nearby Shelters</h2>
        <div className="h-96 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-4">
          <MapContainer center={[22.5, 90.5]} zoom={7} className="h-full w-full">
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {shelters.map(s => (
              <Marker key={s.id} position={[s.lat, s.lng]} icon={shelterIcon}>
                <Popup>
                  <p className="font-bold text-sm">{s.name}</p>
                  <p className="text-xs">Capacity: {s.occupied}/{s.capacity}</p>
                  <p className="text-xs">Contact: {s.contact}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shelters.map(s => (
            <div key={s.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-50">{s.name}</p>
              <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 mt-2 mb-1 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(s.occupied / s.capacity) * 100}%` }} />
              </div>
              <p className="text-xs text-gray-500">{s.occupied}/{s.capacity} occupied · {s.contact}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <h2 className="font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-emerald-600" /> Relief Distribution Tracker</h2>
          <div className="space-y-4">
            {RELIEF_TRACKER.map(r => (
              <div key={r.district}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-200">{r.district}</span>
                  <span className="text-gray-500">{r.delivered}/{r.target} families</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">{r.items}</p>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(r.delivered / r.target) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <h2 className="font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-purple-600" /> Emergency Volunteer Requests</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Coastal districts need volunteers for shelter management, relief distribution, and first aid support.</p>
          {volunteerSent ? (
            <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl px-4 py-3 text-sm font-medium">
              Thank you! Your volunteer request has been recorded. A coordinator will contact you shortly. (Demo)
            </div>
          ) : (
            <button onClick={() => setVolunteerSent(true)} className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700">
              Register as Volunteer
            </button>
          )}
        </section>
      </div>

      <section>
        <h2 className="font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2"><UserSearch className="w-5 h-5 text-red-500" /> Missing Person Reports</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          {MISSING_PERSONS.map(p => (
            <div key={p.name} className="p-4 flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-50 text-sm">{p.name}</p>
                <p className="text-xs text-gray-500">Last seen: {p.lastSeen} · {p.date}</p>
              </div>
              <a href={`tel:${p.contact}`} className="flex items-center gap-1.5 text-xs font-semibold text-bd-green"><Phone className="w-3.5 h-3.5" /> {p.contact}</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
