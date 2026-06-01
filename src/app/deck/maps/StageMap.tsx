'use client';

import { MapContainer, TileLayer, Marker, CircleMarker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const gold = '#C8A84B';
const teal = '#4AAFA0';
const rust = '#C45A2A';
const cream = '#F2EBD9';
const goldDim = 'rgba(200,168,75,0.55)';
const creamDim = 'rgba(242,235,217,0.45)';

interface MarkerDef {
  pos: [number, number];
  label: string;
  sub: string;
  color: string;
  textColor?: string;
}

const markers: MarkerDef[] = [
  { pos: [18.18717, -76.45356], label: 'ZUNGU MAIN', sub: 'Stage II · Headline', color: gold, textColor: '#060808' },
  { pos: [18.18803, -76.45134], label: 'ORIGINS', sub: 'Stage I · Heritage', color: teal, textColor: '#060808' },
  { pos: [18.18677, -76.45592], label: 'REBIRTH', sub: 'Stage III · Future', color: rust, textColor: '#F2EBD9' },
  { pos: [18.18541, -76.45473], label: 'MAIN DOCK', sub: 'Welcome Centre · Arrival', color: cream, textColor: '#060808' },
  { pos: [18.18745, -76.45646], label: 'BEACH 1', sub: 'West Shore', color: teal, textColor: '#060808' },
  { pos: [18.18895, -76.45252], label: 'BEACH 2', sub: 'North Shore', color: teal, textColor: '#060808' },
  { pos: [18.18713, -76.45464], label: 'GLAMPING T1', sub: 'On-Island · Premium', color: goldDim, textColor: '#F2EBD9' },
  { pos: [18.18689, -76.45204], label: 'GLAMPING T2', sub: 'On-Island · Standard', color: goldDim, textColor: '#F2EBD9' },
  { pos: [18.18876, -76.45151], label: 'GLAMPING T3', sub: 'On-Island · Boutique', color: goldDim, textColor: '#F2EBD9' },
  { pos: [18.18272, -76.45366], label: 'DEPARTURE', sub: 'Errol Flynn Marina', color: creamDim, textColor: '#F2EBD9' },
];

const mainDock: [number, number] = [18.18541, -76.45473];
const departure: [number, number] = [18.18272, -76.45366];

export default function StageMap() {
  return (
    <div style={{ width: '100%', height: 500, overflow: 'hidden', border: '1px solid rgba(200,168,75,0.2)' }}>
      <MapContainer
        center={[18.1862, -76.454]}
        zoom={15}
        style={{ width: '100%', height: '100%', background: '#060808' }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {markers.map((m, i) => {
          const icon = L.divIcon({
            className: '',
            html: `<div style="
              background: rgba(6,8,8,0.88);
              border: 1.5px solid ${m.color};
              color: ${m.textColor ?? m.color};
              font-family: 'Space Mono', monospace;
              font-size: 8px;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              padding: 4px 6px;
              width: 130px;
              line-height: 1.5;
              pointer-events: none;
              white-space: nowrap;
            ">
              <span style="color:${m.color}">${m.label}</span><br/>
              <span style="color:rgba(242,235,217,0.5);font-weight:400;">${m.sub}</span>
            </div>`,
            iconSize: [155, 36],
            iconAnchor: [77, 18],
            popupAnchor: [0, -20],
          });
          return (
            <Marker key={i} position={m.pos} icon={icon}>
              <Popup>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, lineHeight: 1.6 }}>
                  <strong style={{ color: m.color }}>{m.label}</strong><br />{m.sub}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {markers.map((m, i) => (
          <CircleMarker
            key={`dot-${i}`}
            center={m.pos}
            radius={4}
            pathOptions={{ color: m.color, fillColor: m.color, fillOpacity: 0.9, weight: 1 }}
          />
        ))}

        <Polyline
          positions={[departure, mainDock]}
          pathOptions={{ color: cream, weight: 1.5, dashArray: '6 4', opacity: 0.5 }}
        />
      </MapContainer>
    </div>
  );
}
