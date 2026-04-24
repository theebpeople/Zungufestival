'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: '#04080A', color: '#F2EBD9', fontFamily: "'Space Mono', monospace", minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Hero image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/hero-port-antonio.jpg"
          alt="Navy Island, Port Antonio, Jamaica"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Hero gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(4,8,10,0.3) 0%, rgba(4,8,10,0.55) 40%, rgba(4,8,10,0.85) 75%, #04080A 100%)',
        }} />
      </div>

      {/* Grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")",
        opacity: 0.45,
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(200,168,75,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 8vw 0' }}>
        <div style={{ paddingBottom: '180px' }} className="z-hero-content">
          <p style={{
            fontSize: '11px', letterSpacing: '0.5em', textTransform: 'uppercase',
            color: 'rgba(242,235,217,0.5)', marginBottom: '36px',
          }}>
            Navy Island &nbsp;·&nbsp; Port Antonio &nbsp;·&nbsp; Jamaica
          </p>

          <Image
            src="/logo-z.png"
            alt="Zungu"
            width={120}
            height={120}
            className="z-home-logo"
            style={{ marginBottom: '28px', filter: 'drop-shadow(0 0 24px rgba(200,168,75,0.4))' }}
          />

          <h1 style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(52px, 11vw, 130px)',
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: '#F7F3EC',
            marginBottom: '32px',
          }}>
            ZUNGU<br /><em style={{ fontStyle: 'italic', color: '#C8A84B' }}>FESTIVAL</em>
            <span style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(11px, 1.4vw, 18px)',
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#C8A84B',
              letterSpacing: '0.35em',
              marginTop: '16px',
            }}>MMXXVII</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 1.6vw, 20px)', lineHeight: 1.7, color: 'rgba(242,235,217,0.7)', maxWidth: '480px', marginBottom: '44px' }}>
            A private island. Open water. Seven days.<br />
            Electronic music the way it was always<br />
            <span style={{ color: '#C8A84B' }}>meant to feel.</span>
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push('/sign-in?role=investor')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '14px 28px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
                fontWeight: 700, cursor: 'pointer',
                background: '#C8A84B', color: '#04080A',
                border: 'none',
              }}
            >
              Investor Access →
            </button>
            <button
              onClick={() => router.push('/sign-in?role=partner')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '14px 28px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
                fontWeight: 700, cursor: 'pointer',
                background: 'transparent', color: '#4AAFA0',
                border: '1px solid rgba(74,175,160,0.4)',
              }}
            >
              Partner Access →
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="z-home-stats" style={{
        position: 'relative', zIndex: 10,
        display: 'flex', borderTop: '1px solid rgba(200,168,75,0.12)',
        backgroundColor: 'rgba(4,8,10,0.95)',
      }}>
        {[
          { num: '64', label: 'Acres · Navy Island' },
          { num: '2,000', label: 'Tickets · Year 1' },
          { num: 'Jun 17', label: 'Opens · 2027' },
          { num: '7', label: 'Days · 6 Nights' },
          { num: '3', label: 'Stages · One Island' },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1, padding: '28px 20px', textAlign: 'center',
            borderRight: i < 4 ? '1px solid rgba(200,168,75,0.08)' : 'none',
          }}>
            <div style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700,
              color: '#C8A84B', lineHeight: 1, marginBottom: '8px',
            }}>{stat.num}</div>
            <div style={{ fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(242,235,217,0.35)', textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
