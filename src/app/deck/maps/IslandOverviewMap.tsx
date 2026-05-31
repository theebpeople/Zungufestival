'use client';

import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const gold = '#C8A84B';
const cream = '#F2EBD9';

function makeCircleIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid rgba(6,8,8,0.8);box-shadow:0 0 8px ${color}66;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  });
}

const navyIcon = makeCircleIcon(gold);
const marinaIcon = makeCircleIcon(cream);

const navyIsland: [number, number] = [18.1874, -76.454];
const errolFlynnMarina: [number, number] = [18.18272, -76.45366];

export default function IslandOverviewMap() {
  return (
    <div style={{ width: '100%', height: 500, overflow: 'hidden', border: '1px solid rgba(200,168,75,0.2)' }}>
      <MapContainer
        center={[18.185, -76.454]}
        zoom={15}
        style={{ width: '100%', height: '100%', background: '#060808' }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={navyIsland} icon={navyIcon}>
          <Popup>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#060808', lineHeight: 1.6 }}>
              <strong style={{ color: gold }}>⚑ Navy Island</strong><br />
              64 Acres · Festival Site
            </div>
          </Popup>
        </Marker>
        <Marker position={errolFlynnMarina} icon={marinaIcon}>
          <Popup>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#060808', lineHeight: 1.6 }}>
              <strong>Errol Flynn Marina</strong><br />
              Departure · ~5 min crossing
            </div>
          </Popup>
        </Marker>
        <Polyline
          positions={[errolFlynnMarina, navyIsland]}
          pathOptions={{ color: gold, weight: 1.5, dashArray: '6 4', opacity: 0.7 }}
        />
      </MapContainer>
    </div>
  );
}
