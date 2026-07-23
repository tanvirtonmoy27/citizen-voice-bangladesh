import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { defaultIcon } from '../utils/leafletIcons';

interface LocationPickerProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
}

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: e => onChange(e.latlng.lat, e.latlng.lng),
  });
  return null;
}

export function LocationPicker({ lat, lng, onChange }: LocationPickerProps) {
  return (
    <div className="h-64 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <MapContainer center={[lat, lng]} zoom={12} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={defaultIcon} />
        <ClickHandler onChange={onChange} />
      </MapContainer>
    </div>
  );
}
