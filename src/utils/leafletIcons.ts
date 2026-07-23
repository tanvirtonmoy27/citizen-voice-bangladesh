import L from 'leaflet';

const iconUrl = 'https://unpkg.com/[email protected]/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/[email protected]/dist/images/[email protected]';
const shadowUrl = 'https://unpkg.com/[email protected]/dist/images/marker-shadow.png';

export const defaultIcon = new L.Icon({
  iconUrl, iconRetinaUrl, shadowUrl,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

function coloredIcon(color: string) {
  return new L.DivIcon({
    className: '',
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 0 2px rgba(0,0,0,0.15)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

export const statusIcons = {
  pending: coloredIcon('#ef4444'),
  in_progress: coloredIcon('#f59e0b'),
  solved: coloredIcon('#10b981'),
  rejected: coloredIcon('#9ca3af'),
};

export const shelterIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:18px;height:18px;border-radius:6px;background:#1D4ED8;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:bold">S</div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});
