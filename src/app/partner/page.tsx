'use client';

import { useClerk, useUser } from '@clerk/nextjs';

const gold = '#C8A84B';
const rust = '#C45A2A';
const black = '#060808';
const white = '#F7F3EC';
const muted = '#6B6355';

const links = [
  { label: 'Investor Deck', sub: 'Full festival proposal & financials', href: '/deck' },
  { label: 'Stage Architecture', sub: 'Three primary stages + The Pier · Navy Island layout · sound specs', href: '/stages', accent: rust },
  { label: 'Activity Programme', sub: 'Forest · water · wellness · cultural tours', href: '/activities' },
  { label: 'Brand Strategy', sub: 'Visual identity · positioning · market analysis', href: '/brand' },
];

export default function PartnerPage() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: black, fontFamily: "'Space Mono', monospace", color: white }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 3rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: 'rgba(6,8,8,0.92)',
          position: 'sticky',
          top: 0,
          backdropFilter: 'blur(12px)',
        }}
      >
        <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 30, width: 'auto', cursor: 'crosshair', filter: 'drop-shadow(0 0 10px rgba(200,168,75,0.3))' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: 10, color: gold, border: `1px solid rgba(200,168,75,0.4)`, padding: '0.3rem 0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
            Partner
          </span>
          <button
            onClick={() => signOut({ redirectUrl: '/' })}
            style={{ fontSize: 10, color: muted, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, fontFamily: "'Space Mono', monospace" }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem' }}>
        <p style={{ fontSize: 12, color: gold, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
          // PARTNER ACCESS
        </p>
        <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1, marginBottom: '3rem' }}>
          Welcome,<br />{user?.firstName ?? 'Partner'}
        </h1>

        <div style={{ display: 'grid', gap: '1px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
          {links.map(({ label, sub, href, accent }) => (
            <a
              key={href}
              href={href}
              style={{
                display: 'block',
                padding: '1.5rem 2rem',
                border: `1px solid rgba(255,255,255,0.06)`,
                backgroundColor: black,
                color: white,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `rgba(200,168,75,0.35)`;
                el.style.backgroundColor = 'rgba(200,168,75,0.04)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.backgroundColor = black;
              }}
            >
              <p style={{ fontSize: 10, color: accent ?? muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{sub}</p>
              <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>{label}</h2>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
