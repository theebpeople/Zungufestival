'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const BG = '#04080A';
const GREEN = '#0D2018';
const GOLD = '#C8A84B';
const CREAM = '#F2EBD9';
const MUTED = 'rgba(242,235,217,0.45)';
const DIM = 'rgba(242,235,217,0.18)';
const BORDER = 'rgba(200,168,75,0.07)';
const BORDER_MID = 'rgba(200,168,75,0.12)';
const GOLD_DIM = 'rgba(200,168,75,0.45)';

// Stage accent colours
const ORIGINS_C = '#D4722A';
const REBIRTH_C = '#9B5FC0';
const N2_C = '#4A8FBD';
const N3_C = '#3AAF7A';

const DISPLAY = "'Unbounded', sans-serif";
const MONO = "'Space Mono', monospace";

const SECTION_IDS = ['hero', 'island', 'map', 'stages', 'nights', 'handoff'];

const NAV_LINKS = [
  { label: 'Island', id: 'island' },
  { label: 'Map', id: 'map' },
  { label: 'Stages', id: 'stages' },
  { label: 'Nights', id: 'nights' },
  { label: 'Handoff', id: 'handoff' },
];

// ── Chapter divider ───────────────────────────────────────────────────────────
function ChapterDivider({ num, title, goldLine, desc }: { num: string; title: string; goldLine: string; desc: string }) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', backgroundColor: BG, padding: '80px 8vw 40px', borderTop: `1px solid ${BORDER}`, display: 'flex', alignItems: 'flex-start', gap: '3rem', position: 'relative', overflow: 'hidden' }}>
      {/* Ghost number */}
      <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(4rem, 9vw, 8rem)', fontWeight: 900, color: 'rgba(200,168,75,0.06)', lineHeight: 1, flexShrink: 0, marginTop: '-0.1em', userSelect: 'none', pointerEvents: 'none' }}>
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 28, height: 1, background: 'rgba(200,168,75,0.5)', flexShrink: 0 }} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700 }}>
            Chapter {num}
          </span>
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM }}>
          {title}<br /><span style={{ color: GOLD }}>{goldLine}</span>
        </h2>
        {desc && (
          <p style={{ marginTop: 12, fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 540, letterSpacing: '0.02em' }}>
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
      <div style={{ width: 28, height: 1, background: 'rgba(200,168,75,0.5)', flexShrink: 0 }} />
      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700 }}>{children}</span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function StagesPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('hero');
  const [navScrolled, setNavScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push('/sign-in');
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (!isLoaded || !isSignedIn) return null;

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', fontFamily: MONO, color: CREAM }}>

      {/* ── Scroll progress ── */}
      <motion.div style={{ scaleX, transformOrigin: 'left', position: 'fixed', top: 0, left: 0, height: 2, background: GOLD, zIndex: 1000, width: '100%' }} />

      {/* ── Nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8vw', height: 52,
        backgroundColor: navScrolled ? 'rgba(4,8,10,0.97)' : 'rgba(4,8,10,0.85)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${navScrolled ? BORDER_MID : BORDER}`,
        transition: 'background-color 0.3s, border-color 0.3s',
      }}>
        <button onClick={() => scrollTo('hero')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, whiteSpace: 'nowrap' }}>
          <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 28, width: 28, objectFit: 'contain' }} />
          <span style={{ fontFamily: DISPLAY, fontSize: 13, fontWeight: 900, letterSpacing: '0.08em', color: CREAM, textTransform: 'uppercase' }}>Zungu 2027</span>
        </button>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'center', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' } as React.CSSProperties}>
          {NAV_LINKS.map((l) => (
            <button key={l.label} onClick={() => scrollTo(l.id)} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTED, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', whiteSpace: 'nowrap' }}>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD_DIM}`, padding: '4px 10px', fontWeight: 700 }}>
            Stage Architecture
          </span>
          <a href="/sign-out" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', fontWeight: 700, transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
            Sign Out
          </a>
        </div>
      </nav>

      {/* ── Side dots ── */}
      <div style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 800, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SECTION_IDS.map((id) => (
          <button key={id} onClick={() => scrollTo(id)} title={id} style={{ width: activeSection === id ? 8 : 6, height: activeSection === id ? 8 : 6, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, backgroundColor: activeSection === id ? GOLD : GOLD_DIM, transition: 'all 0.3s' }} />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', padding: '80px 8vw' }}>
        {/* Background video */}
        <video
          autoPlay muted loop playsInline
          poster="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/island-stages-aerial_zxjfag.png"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'saturate(0.8) brightness(0.45)' }}
        >
          <source src="https://res.cloudinary.com/elektricbangaz/video/upload/v1780460482/BANGAZ_FINAL_huedov.webm" type="video/webm" />
        </video>
        {/* Gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,8,10,1) 0%, rgba(4,8,10,0.65) 40%, rgba(4,8,10,0.15) 100%), linear-gradient(to right, rgba(4,8,10,0.5) 0%, transparent 65%)' }} />
        {/* Gold grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,168,75,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 24, fontWeight: 700 }}>
            STAGE ARCHITECTURE · NAVY ISLAND · PORT ANTONIO · JAMAICA
          </div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 900, lineHeight: 0.9, color: CREAM, marginBottom: 8 }}>
            THREE<br /><span style={{ color: GOLD }}>STAGES.</span><br />ONE<br />ISLAND.
          </h1>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.06em', lineHeight: 1.8, marginBottom: 48, maxWidth: 480 }}>
            The island is the scenery. It is where the world of Zungu comes alive and the magic of the experience begins. Origins rises with the sun. Rebirth catches the sunset. Zungu stands at the centre. Three stages. Three energies. One island transformed by sound.
          </p>

          {/* Hero stats — bordered box */}
          <div style={{ display: 'flex', gap: 0, borderTop: `1px solid rgba(200,168,75,0.2)`, paddingTop: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'ORIGINS', value: 'Sunrise · Earth sound · Tribal fusion' },
              { label: 'ZUNGU', value: 'Centre island · Mainstage · Big room' },
              { label: 'REBIRTH', value: 'Sunset · Tribal · Tech · Underground house' },
              { label: 'JUN 17–23', value: 'Arrival · Festival nights · Closing events' },
              { label: '5,000', value: 'Year One target' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{ paddingRight: i < arr.length - 1 ? '2.5rem' : 0, marginRight: i < arr.length - 1 ? '2.5rem' : 0, borderRight: i < arr.length - 1 ? `1px solid ${BORDER_MID}` : 'none' }}>
                <span style={{ display: 'block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 6 }}>{s.label}</span>
                <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 12, fontWeight: 400, color: CREAM, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 01 — THE LOCATION
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="01" title="The Location" goldLine="Navy Island is where Zungu begins." desc="Zungu does not begin with a stage design. It begins with Navy Island: forest, shoreline, water, open sky, and the feeling of an entire island becoming something else for one week. The island is the scenery. It is where the world of Zungu comes alive and the magic of the experience begins. Every stage responds to the island. Origins faces the sunrise. Rebirth faces the sunset. Zungu stands in the centre. The geography gives each stage its reason for existing." />

      <section id="island" style={{ padding: '60px 8vw', borderBottom: `1px solid ${BORDER}`, backgroundColor: BG }}>
        <SLabel>// 01 THE LOCATION</SLabel>

        {/* Photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '360px 240px', gap: 3 }}>
          {[
            { src: 'https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_AERIAL_vaapz1.png', cap: 'Navy Island · Aerial · Port Antonio harbour', tall: true },
            { src: '/photos/navy-island-satellite.png', cap: '64 acres · Dense forest canopy', tall: false },
            { src: '/photos/reference-for-map-crossing.png', cap: 'Island perimeter · Stage placement zones', tall: false },
          ].map(({ src, cap, tall }) => (
            <div key={src} style={{ overflow: 'hidden', position: 'relative', background: GREEN, gridRow: tall ? '1 / 3' : undefined }}>
              <img src={src} alt={cap} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8) saturate(0.85)', transition: 'filter 0.5s, transform 0.6s', display: 'block' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLImageElement; el.style.filter = 'brightness(1) saturate(1.1)'; el.style.transform = 'scale(1.03)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLImageElement; el.style.filter = 'brightness(0.8) saturate(0.85)'; el.style.transform = 'scale(1)'; }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px 12px', background: 'linear-gradient(transparent, rgba(4,8,10,0.85))', fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.7)' }}>
                {cap}
              </div>
            </div>
          ))}
        </div>

        {/* Stage zones aerial */}
        <div style={{ marginTop: 3, position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/island-stages-aerial_zxjfag.png"
            alt="Navy Island — Stage Zones Aerial"
            loading="lazy"
            style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block', filter: 'brightness(0.8) saturate(0.85)' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px 12px', background: 'linear-gradient(transparent, rgba(4,8,10,0.85))', fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.7)' }}>
            Stage Zones · Aerial · Navy Island · Port Antonio
          </div>
        </div>

        {/* Quote block */}
        <div style={{ margin: '40px 0', padding: '24px 28px', borderLeft: `3px solid ${GOLD}`, background: 'rgba(200,168,75,0.03)' }}>
          <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', fontWeight: 300, color: CREAM, lineHeight: 1.5 }}>
            &ldquo;<span style={{ color: GOLD }}>For one week, Navy Island becomes Zungu.</span>&rdquo;
          </p>
          <p style={{ marginTop: 10, fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.55)' }}>Location Strategy</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 02 — SITE ARCHITECTURE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="02" title="Site Architecture" goldLine="Three stages. Three directions. One island world." desc="The stages are not placed randomly across Navy Island. Each one is tied to a natural moment of the island. Origins belongs to sunrise. Rebirth belongs to sunset. Zungu belongs to the centre. Together, they create the rhythm of the festival: the beginning, the transformation, and the full release." />

      <section id="map" style={{ padding: '60px 8vw', borderBottom: `1px solid ${BORDER}`, backgroundColor: GREEN }}>
        <SLabel>// 02 SITE ARCHITECTURE</SLabel>

        <div style={{ marginTop: 40, border: `1px solid ${BORDER_MID}`, background: 'rgba(13,32,24,0.5)', padding: 32 }}>
          <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 860, margin: '0 auto', display: 'block' }}>
            <defs>
              <radialGradient id="ig" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2d5a3d" stopOpacity=".85" />
                <stop offset="100%" stopColor="#1a3a2a" stopOpacity=".6" />
              </radialGradient>
            </defs>
            <rect width="820" height="360" fill="#050d10" />
            <g stroke="rgba(29,74,90,.1)" strokeWidth=".5">
              <line x1="0" y1="72" x2="820" y2="72" /><line x1="0" y1="144" x2="820" y2="144" />
              <line x1="0" y1="216" x2="820" y2="216" /><line x1="0" y1="288" x2="820" y2="288" />
            </g>
            <path d="M130,195 C118,172 124,148 150,133 C172,120 208,112 255,105 C302,98 355,93 405,91 C455,89 500,92 538,100 C576,108 600,120 618,136 C636,152 640,170 632,186 C624,202 607,213 584,220 C561,227 532,231 500,234 C468,237 432,240 396,243 C360,246 323,249 290,251 C257,253 228,253 205,250 C182,247 160,241 145,231 C132,223 126,208 130,195 Z" fill="url(#ig)" stroke="rgba(200,168,75,.18)" strokeWidth="1.2" />
            <g fill="#2d5a3d" fillOpacity=".45">
              <circle cx="260" cy="162" r="8" /><circle cx="300" cy="152" r="6" /><circle cx="345" cy="155" r="9" /><circle cx="385" cy="148" r="7" /><circle cx="320" cy="180" r="6" />
              <circle cx="360" cy="190" r="7" /><circle cx="278" cy="190" r="5" /><circle cx="420" cy="162" r="7" /><circle cx="460" cy="152" r="8" />
              <circle cx="440" cy="185" r="6" /><circle cx="488" cy="168" r="7" /><circle cx="400" cy="210" r="5" />
            </g>
            <g transform="translate(382,255)">
              <circle r="20" fill="rgba(200,168,75,.12)" stroke="rgba(200,168,75,.5)" strokeWidth="1.5" />
              <circle r="9" fill="rgba(200,168,75,.9)" />
              <line x1="0" y1="20" x2="0" y2="44" stroke="rgba(200,168,75,.3)" strokeWidth="1" strokeDasharray="3,2" />
              <text y="57" textAnchor="middle" fill="rgba(200,168,75,.85)" fontSize="10" fontFamily="'Space Mono',monospace" letterSpacing="1.5">ZUNGU MAIN</text>
              <text y="70" textAnchor="middle" fill="rgba(200,168,75,.4)" fontSize="7.5" fontFamily="'Space Mono',monospace">SOUTH · FULL PRODUCTION</text>
            </g>
            <g transform="translate(636,178)">
              <circle r="13" fill="rgba(212,114,42,.12)" stroke="rgba(212,114,42,.5)" strokeWidth="1.5" />
              <circle r="6" fill="rgba(212,114,42,.9)" />
              <line x1="13" y1="0" x2="42" y2="0" stroke="rgba(212,114,42,.3)" strokeWidth="1" strokeDasharray="3,2" />
              <text x="48" y="4" fill="rgba(212,114,42,.85)" fontSize="10" fontFamily="'Space Mono',monospace" letterSpacing="1.5">ORIGINS</text>
              <text x="48" y="16" fill="rgba(212,114,42,.4)" fontSize="7.5" fontFamily="'Space Mono',monospace">EAST TIP · SUNRISE</text>
            </g>
            <g transform="translate(148,188)">
              <circle r="13" fill="rgba(155,95,192,.12)" stroke="rgba(155,95,192,.5)" strokeWidth="1.5" />
              <circle r="6" fill="rgba(155,95,192,.9)" />
              <line x1="-13" y1="0" x2="-42" y2="0" stroke="rgba(155,95,192,.3)" strokeWidth="1" strokeDasharray="3,2" />
              <text x="-48" y="4" textAnchor="end" fill="rgba(155,95,192,.85)" fontSize="10" fontFamily="'Space Mono',monospace" letterSpacing="1.5">REBIRTH</text>
              <text x="-48" y="16" textAnchor="end" fill="rgba(155,95,192,.4)" fontSize="7.5" fontFamily="'Space Mono',monospace">WEST · SUNSET</text>
            </g>
            <g transform="translate(382,318)">
              <rect x="-14" y="-5" width="28" height="9" fill="none" stroke="rgba(200,168,75,.2)" strokeWidth="1" />
              <text y="20" textAnchor="middle" fill="rgba(200,168,75,.2)" fontSize="7" fontFamily="'Space Mono',monospace">FERRY DOCK</text>
            </g>
            <path d="M162,200 Q270,235 370,248" stroke="rgba(200,168,75,.12)" strokeWidth="1.5" strokeDasharray="5,4" fill="none" />
            <text x="755" y="26" fill="rgba(200,168,75,.22)" fontSize="8" fontFamily="'Space Mono',monospace">N ↑</text>
            <text x="382" y="350" textAnchor="middle" fill="rgba(200,168,75,.1)" fontSize="8" fontFamily="'Space Mono',monospace" letterSpacing={2}>PORT ANTONIO ↓</text>
          </svg>

          <div style={{ display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { color: 'rgba(200,168,75,0.9)', label: 'Zungu Main · South' },
              { color: 'rgba(212,114,42,0.9)', label: 'Origins · East · Sunrise' },
              { color: 'rgba(155,95,192,0.9)', label: 'Rebirth · West · Sunset' },
              { color: 'rgba(200,168,75,0.3)', label: 'Ferry Dock', bordered: true },
            ].map(({ color, label, bordered }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: MUTED }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, border: bordered ? `1px solid ${color}` : 'none', flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20, fontFamily: MONO, fontSize: 10, color: MUTED, lineHeight: 1.8, letterSpacing: '0.02em', maxWidth: 720, margin: '20px auto 0' }}>Provisional stage placement across Navy Island&rsquo;s natural terrain. Final positioning, orientation, production layout, access routes, and sound direction remain subject to site survey, environmental review, safety planning, and production partner assessment.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 03 — THREE WORLDS
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="03" title="The Three Stages." goldLine="Each stage has a reason." desc="Zungu is built around three stage identities. Origins is the opening force: sunrise, earth, rhythm, percussion, and fusion. Zungu is the mainstage: centre island, full production, major acts, big-room energy, and the peak festival moments. Rebirth is the underground pulse: sunset, tribal, tech, house, deeper sounds, and the transition from day into night. Together, they turn Navy Island into a complete electronic music world." />

      <section id="stages" style={{ padding: '60px 8vw', borderBottom: `1px solid ${BORDER}`, backgroundColor: BG }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 40 }}>

          {/* ZUNGU MAIN */}
          <div style={{ position: 'relative', overflow: 'hidden', borderLeft: `3px solid ${GOLD}`, background: 'linear-gradient(135deg, #080f0b, #040a06)' }}>
            <div style={{ padding: '40px 48px' }}>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, display: 'inline-block', padding: '4px 10px', border: `1px solid rgba(200,168,75,0.3)`, color: GOLD, marginBottom: 16 }}>
                Centre Island · Mainstage · Big Room
              </span>
              <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 5vw, 4.8rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: 8, color: GOLD }}>ZUNGU</div>
              <div style={{ fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.04em', marginBottom: 32, lineHeight: 1.6 }}>Zungu is the heart of the island.</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.9fr 0.8fr', gap: 40 }}>
                <div style={{ fontFamily: MONO, fontSize: 14, lineHeight: 1.9, color: MUTED }}>
                  <p>Zungu is the mainstage. Positioned at the centre of the island, it is where the largest moments happen: the major acts, the full production, the biggest crowd energy, and the nights people remember. <strong style={{ color: CREAM }}>This is where Zungu becomes massive.</strong> Big room. Mainstage electronic. Global headline energy. Full-scale lighting. Screens. Lasers. Sound. Movement. Release.</p>
                  <p style={{ marginTop: 14 }}>If Origins is the beginning and Rebirth is the transformation, <strong style={{ color: CREAM }}>Zungu is the centre of gravity.</strong></p>
                  <p style={{ marginTop: 14 }}>Zungu is the primary stage for major acts, headline sets, opening ceremonies, peak festival nights, closing moments, and large-scale production.</p>
                </div>
                <div>
                  {[
                    { l: 'Stage Function', v: 'Zungu is the primary stage for major acts, headline sets, opening ceremonies, peak festival nights, closing moments, and large-scale production.' },
                    { l: 'Production', v: 'Full production / Large-format lighting / LED and visual world-building / Laser and atmospheric effects / Main audio system / Ceremonial moments / Highest stage specification' },
                  ].map(({ l, v }) => (
                    <div key={l} style={{ marginBottom: 16 }}>
                      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)', display: 'block', marginBottom: 4 }}>{l}</span>
                      <span style={{ fontFamily: MONO, fontSize: 15, color: 'rgba(242,235,217,0.65)', lineHeight: 1.5 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)', display: 'block', marginBottom: 12 }}>Sonic Identity</span>
                  {['Big room electronic', 'Mainstage house', 'Afro-house headline energy', 'EDM', 'Festival anthems', 'Peak-time electronic', 'Major international acts', 'High-impact local support'].map((v) => (
                    <span key={v} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '5px 10px', border: `1px solid`, borderColor: v.length < 25 ? 'rgba(200,168,75,0.3)' : 'rgba(242,235,217,0.05)', color: v.length < 25 ? GOLD : 'rgba(242,235,217,0.22)', display: 'block', marginBottom: 6, width: 'fit-content' }}>{v}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(242,235,217,0.05)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['Full production', 'Large-format lighting', 'LED and visual world-building', 'Laser and atmospheric effects', 'Main audio system', 'Ceremonial moments', 'Highest stage specification'].map((p) => (
                  <span key={p} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.05em', color: 'rgba(242,235,217,0.2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 5, color: GOLD, opacity: 0.4 }}>●</span>{p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ORIGINS */}
          <div style={{ position: 'relative', overflow: 'hidden', borderLeft: `3px solid ${ORIGINS_C}`, background: 'linear-gradient(135deg, #120800, #0a0500)' }}>
            <div style={{ padding: '40px 48px' }}>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, display: 'inline-block', padding: '4px 10px', border: `1px solid rgba(212,114,42,0.3)`, color: ORIGINS_C, marginBottom: 16 }}>
                Sunrise Stage · Earth Sound · Tribal Fusion
              </span>
              <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 5vw, 4.8rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: 8, color: ORIGINS_C }}>ORIGINS</div>
              <div style={{ fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.04em', marginBottom: 32, lineHeight: 1.6 }}>Origins is called Origins because it faces the sunrise.</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.9fr 0.8fr', gap: 40 }}>
                <div style={{ fontFamily: MONO, fontSize: 14, lineHeight: 1.9, color: MUTED }}>
                  <p>The eastern tip of the island. The crowd faces west — the forest behind them. <strong style={{ color: CREAM }}>The sun rises directly behind the DJ.</strong> First light through the trees. The silhouette of the selector against the Caribbean dawn.</p>
                  <p style={{ marginTop: 14 }}>The breakfast party. Jungle, deep percussion, early morning energy. Intimate at 500. <strong style={{ color: CREAM }}>The RA moment.</strong> Equiknoxx, Kode9, Shy FX — the acts that carry the cultural argument, playing at dawn on the island that the argument is about.</p>
                  <p style={{ marginTop: 14 }}>Origins is where Zungu tells its origin story — through a 6am set in a clearing, with the sun coming up behind it.</p>
                </div>
                <div>
                  {[
                    { l: 'Position', v: 'Eastern tip. Crowd faces west into forest. Sunrise directly behind the stage.' },
                    { l: 'Capacity', v: '500 maximum. Intimate. No upgrade wristband.' },
                    { l: 'Hours', v: '6am – 10am. Closes before noon daytime programme.' },
                    { l: 'Production', v: 'Quality sound first. Minimal lighting — the sunrise is the light show.' },
                  ].map(({ l, v }) => (
                    <div key={l} style={{ marginBottom: 16 }}>
                      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)', display: 'block', marginBottom: 4 }}>{l}</span>
                      <span style={{ fontFamily: MONO, fontSize: 15, color: 'rgba(242,235,217,0.65)', lineHeight: 1.5 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)', display: 'block', marginBottom: 12 }}>Sonic Identity</span>
                  {['Jungle · Drum & Bass', 'Jamaican electronic', 'Breakfast party', 'Deep percussion', 'The RA moment', 'Roots & lineage'].map((v, i) => (
                    <span key={v} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '5px 10px', border: `1px solid`, borderColor: i < 4 ? 'rgba(212,114,42,0.3)' : 'rgba(242,235,217,0.05)', color: i < 4 ? ORIGINS_C : 'rgba(242,235,217,0.22)', display: 'block', marginBottom: 6, width: 'fit-content' }}>{v}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(242,235,217,0.05)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['Funktion-One or equiv', 'Warm amber wash only', 'No LED wall — the sky is the backdrop', 'Elevated platform in natural clearing'].map((p) => (
                  <span key={p} style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(242,235,217,0.2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 5, color: GOLD, opacity: 0.4 }}>●</span>{p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* REBIRTH */}
          <div style={{ position: 'relative', overflow: 'hidden', borderLeft: `3px solid ${REBIRTH_C}`, background: 'linear-gradient(135deg, #0e0618, #080410)' }}>
            <div style={{ padding: '40px 48px' }}>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, display: 'inline-block', padding: '4px 10px', border: `1px solid rgba(155,95,192,0.3)`, color: REBIRTH_C, marginBottom: 16 }}>
                Sunset Stage · 800 Cap · 4pm – 8pm · Each Evening
              </span>
              <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 5vw, 4.8rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: 8, color: REBIRTH_C }}>REBIRTH</div>
              <div style={{ fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.04em', marginBottom: 32, lineHeight: 1.6 }}>West-facing. The sun sets behind the crowd. Sunset house. The golden hour. The bridge into the night.</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.9fr 0.8fr', gap: 40 }}>
                <div style={{ fontFamily: MONO, fontSize: 14, lineHeight: 1.9, color: MUTED }}>
                  <p>The western end — the widest point of the island. The crowd faces east toward the forest interior. <strong style={{ color: CREAM }}>The sun sets behind them into the open Caribbean.</strong> Everything turns amber. The water glows.</p>
                  <p style={{ marginTop: 14 }}>Sunset house. Melodic, hypnotic, warm. <strong style={{ color: CREAM }}>The bridge between day and night.</strong> The last act of Rebirth walks the crowd directly into Zungu Main&rsquo;s opening — connected by a lit forest path. 8–12 minutes through the trees.</p>
                  <p style={{ marginTop: 14 }}>Mid-scale production. 800 capacity. The sunset does the visual work.</p>
                </div>
                <div>
                  {[
                    { l: 'Position', v: 'Western end, widest point. Sun sets behind crowd — Caribbean backdrop.' },
                    { l: 'Capacity', v: '800 maximum. Open entry from 4pm.' },
                    { l: 'Hours', v: '4pm – 8pm. Last act 7:30pm. Handoff walk at 7:45pm.' },
                    { l: 'Handoff', v: 'Crowd walks lit forest path to Zungu Main. 8–12 minutes. Staffed and guided.' },
                  ].map(({ l, v }) => (
                    <div key={l} style={{ marginBottom: 16 }}>
                      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)', display: 'block', marginBottom: 4 }}>{l}</span>
                      <span style={{ fontFamily: MONO, fontSize: 15, color: 'rgba(242,235,217,0.65)', lineHeight: 1.5 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)', display: 'block', marginBottom: 12 }}>Sonic Identity</span>
                  {['Sunset house', 'Melodic & hypnotic', 'Afrotech · Organic', 'The golden hour', 'Building energy', 'Bridge to Zungu Main'].map((v, i) => (
                    <span key={v} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '5px 10px', border: `1px solid`, borderColor: i < 4 ? 'rgba(155,95,192,0.3)' : 'rgba(242,235,217,0.05)', color: i < 4 ? REBIRTH_C : 'rgba(242,235,217,0.22)', display: 'block', marginBottom: 6, width: 'fit-content' }}>{v}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(242,235,217,0.05)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['Mid-scale warm array', 'Dusk-calibrated lighting — amber + coral', 'Small rear LED screen', 'Forest path lighting — this team manages'].map((p) => (
                  <span key={p} style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(242,235,217,0.2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 5, color: GOLD, opacity: 0.4 }}>●</span>{p}
                  </span>
                ))}
              </div>
            </div>
            {/* Rebirth stage aerial */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459534/stage-rebirth-aerial_ruosnd.png"
                alt="Rebirth Stage — Aerial Concept"
                loading="lazy"
                style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(0.9)' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 10px', background: 'linear-gradient(transparent, rgba(14,6,24,0.9))', fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: REBIRTH_C }}>
                Rebirth Stage · West End · Sunset · 800 Cap
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 04 — FOUR NIGHTS
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="04" title="Four Nights." goldLine="One Argument." desc="Each night is a chapter. The root. The spread. The return. The origin. Jamaica's DNA — exported, mutated, and brought home." />

      {/* NIGHTS */}
      <div id="nights">
        {[
          {
            num: '01', bg: '#060600', accent: ORIGINS_C, tagBorder: 'rgba(212,114,42,0.3)',
            date: 'Target Window: June 17–23, 2027', tag: 'The Root',
            title: 'THE ROOT',
            sub: "Booking direction: tribal house, deep percussion, Jamaican-rooted electronic influence. Night 1 anchors the argument.",
            narr: [
              '<strong>Night 1 belongs to the argument itself.</strong> Tribal house. Deep, hypnotic, rooted in percussion lineage that Jamaica planted in global music. The crowd arrives not yet knowing what this festival is. Night 1 tells them.',
              'Origins opens at 6am with a local Portland Parish selector. The island speaks first. Rebirth opens at 4pm. The crowd walks the forest path at 7:45pm. Headline booking direction: tribal house, deep hypnotic, peak at 11pm minimum.',
              'Production concept: natural materials, organic forms. The stage technology is present but deferential. The forest is the dominant visual.',
            ],
            visual: [
              { a: 'Lighting', v: 'Warm amber. Low production. Let the forest be visible.' },
              { a: 'Stage dress', v: 'Natural materials. Woven textures. No chrome or glass.' },
              { a: 'LED content', v: 'Earthy tones, Jamaican landscape, deep root textures.' },
              { a: 'Energy arc', v: 'Slow build, deep hold, late peak. Let the crowd settle in.' },
            ],
            schedule: [
              { t: '6:00am', n: 'Origins Opens', d: 'Portland Parish selector — the island speaks first', stage: 'Origins', sc: 'o', hl: false, handoff: false },
              { t: '4:00pm', n: 'Rebirth Opens', d: 'Warm house. The golden hour begins.', stage: 'Rebirth', sc: 'r', hl: false, handoff: false },
              { t: '7:45pm', n: '→ The Handoff', d: 'Forest path lit. 8–12 minutes. The ritual begins.', stage: '↓', sc: '', hl: false, handoff: true },
              { t: '8:00pm', n: 'Zungu Main Opens', d: 'Portland Parish selector. Opening set.', stage: 'Zungu Main', sc: 'm', hl: false, handoff: false },
              { t: '9:30pm', n: 'Support Act', d: 'Booking direction: tribal house / deep percussion', stage: 'Zungu Main', sc: 'm', hl: false, handoff: false },
              { t: '11:00pm', n: 'HEADLINE (Booking Direction)', d: 'Tribal house, deep hypnotic — bookings in development', stage: 'Zungu Main', sc: 'm', hl: true, handoff: false },
              { t: '2:00am', n: 'After set', d: 'Extended wind-down.', stage: 'Zungu Main', sc: 'm', hl: false, handoff: false },
              { t: '3:00am', n: 'Zungu Main Closes', d: 'Night 1 complete.', stage: '—', sc: '', hl: false, handoff: false },
            ],
          },
          {
            num: '02', bg: '#040810', accent: N2_C, tagBorder: 'rgba(74,143,189,0.3)',
            date: 'Target Window: June 17–23, 2027', tag: 'The Spread',
            title: 'THE SPREAD',
            sub: 'Booking direction: Afro-tech, Latin house, global south electronic, diaspora mutations. Night 2 follows the music outward.',
            narr: [
              '<strong>Night 2 follows the music outward.</strong> Jamaica exported its DNA to Brazil, to Lagos, to London. Night 2 plays back what those cities did with it. Afrotech, Latin house, global south mutation.',
              'Origins plays a harder jungle set morning. Rebirth leans into Afrotech at sunset. Night 2 headline booking direction: Afrotech, global south electronic, diaspora mutations.',
            ],
            visual: [
              { a: 'Lighting', v: 'Electric blue and deep ocean tones. More production than Night 1.' },
              { a: 'Stage dress', v: 'Digital / industrial contrast. The music has left the island.' },
              { a: 'LED content', v: 'Global city imagery, fractal patterns, diaspora movement.' },
              { a: 'Energy arc', v: 'Harder build than Night 1. The crowd knows the space now.' },
            ],
            schedule: [
              { t: '6:00am', n: 'Origins: Jungle', d: 'Harder jungle set. The morning is deeper now.', stage: 'Origins', sc: 'o', hl: false, handoff: false },
              { t: '4:00pm', n: 'Rebirth: Afrotech', d: 'Global south energy at golden hour.', stage: 'Rebirth', sc: 'r', hl: false, handoff: false },
              { t: '7:45pm', n: '→ The Handoff', d: 'Forest path. The ritual, second night.', stage: '↓', sc: '', hl: false, handoff: true },
              { t: '8:00pm', n: 'Zungu Main Opens', d: 'Support: Afrotech / global south direction', stage: 'Zungu Main', sc: 'm', hl: false, handoff: false },
              { t: '11:00pm', n: 'HEADLINE (Booking Direction)', d: 'Afrotech / global south mutation — bookings in development', stage: 'Zungu Main', sc: 'm', hl: true, handoff: false },
              { t: '4:00am', n: 'Zungu Main Closes', d: 'Night 2 complete.', stage: '—', sc: '', hl: false, handoff: false },
            ],
          },
          {
            num: '03', bg: '#030e06', accent: N3_C, tagBorder: 'rgba(58,175,122,0.3)',
            date: 'Target Window: June 17–23, 2027', tag: 'The Return',
            title: 'THE RETURN',
            sub: 'Booking direction: Afro-house, South African house, peak headline programming. Peak night.',
            narr: [
              '<strong>Night 3 is the peak. The argument resolves.</strong> Afro-house — the clearest example of Jamaica\'s exported DNA mutating, evolving, and returning home. The closing statement of that argument, delivered at full production on the island that started it.',
              'Headline booking direction: Afro-house, South African house. Full production. Full 5am close. The longest night of the festival.',
              'All artist bookings are in development. Names listed elsewhere on this site reflect booking direction only.',
            ],
            visual: [
              { a: 'Lighting', v: 'Deep green and gold. The island reclaims the production.' },
              { a: 'Stage dress', v: 'Tropical maximalism. The most elaborate of the four nights.' },
              { a: 'LED content', v: 'Continental imagery, migratory patterns, return arc.' },
              { a: 'Energy arc', v: 'Slowest build to the biggest peak. Closes at 5am.' },
            ],
            schedule: [
              { t: '4:00pm', n: 'Rebirth: Afro-house', d: 'Booking direction: Afro-house at golden hour.', stage: 'Rebirth', sc: 'r', hl: false, handoff: false },
              { t: '7:45pm', n: '→ The Handoff', d: 'Forest path. The crowd walks with intention.', stage: '↓', sc: '', hl: false, handoff: true },
              { t: '8:00pm', n: 'Zungu Main Opens', d: 'Support: Afro-house direction', stage: 'Zungu Main', sc: 'm', hl: false, handoff: false },
              { t: '10:00pm', n: 'SUPPORT HEADLINE (Booking Direction)', d: 'Afro-house · setup for peak close', stage: 'Zungu Main', sc: 'm', hl: true, handoff: false },
              { t: '12:00am', n: 'PEAK HEADLINE (Booking Direction)', d: 'Afro-house peak — bookings in development · to 5am', stage: 'Zungu Main', sc: 'm', hl: true, handoff: false },
              { t: '5:00am', n: 'Zungu Main Closes', d: 'The peak has passed. The island is still.', stage: '—', sc: '', hl: false, handoff: false },
            ],
          },
          {
            num: '04', bg: '#060410', accent: REBIRTH_C, tagBorder: 'rgba(155,95,192,0.3)',
            date: 'Target Window: June 17–23, 2027', tag: 'The Origin',
            title: 'THE ORIGIN',
            sub: 'Booking direction: Jamaican electronic, jungle, drum and bass, dub-influenced club music, local selectors. The island closes in its own voice.',
            narr: [
              '<strong>Night 4 returns to source.</strong> Pure Jamaican electronic: jungle, drum and bass, dub-influenced club music, local Portland Parish selectors. Booking direction includes Jamaican experimental electronic and UK-Jamaican diaspora acts.',
              'This is the night that makes the cultural argument plainly, without intermediary, on the island that earned the right to state it. Night 4 is not the biggest night. It is the most important one.',
            ],
            visual: [
              { a: 'Lighting', v: 'Deep purple and amber. Stripped back. Production steps aside.' },
              { a: 'Stage dress', v: 'Minimal. The music is the event.' },
              { a: 'LED content', v: 'Jamaican flora, roots imagery, slow organic movement.' },
              { a: 'Energy arc', v: 'Gentle. Respectful. Earned. A close, not a climax.' },
            ],
            schedule: [
              { t: '4:00pm', n: 'Rebirth: Farewell', d: 'Final Rebirth sunset. The last golden hour.', stage: 'Rebirth', sc: 'r', hl: false, handoff: false },
              { t: '7:45pm', n: '→ Final Handoff', d: 'Last walk through the forest. They go slowly.', stage: '↓', sc: '', hl: false, handoff: true },
              { t: '8:00pm', n: 'Portland Parish Selector', d: 'Local voice opens the final night.', stage: 'Zungu Main', sc: 'm', hl: false, handoff: false },
              { t: '10:00pm', n: 'JAMAICAN ELECTRONIC (Booking Direction)', d: 'Booking direction: Jamaican experimental electronic — bookings in development', stage: 'Zungu Main', sc: 'm', hl: true, handoff: false },
              { t: '12:00am', n: 'UK-JAMAICAN CLOSING (Booking Direction)', d: 'Booking direction: jungle, drum and bass, dub — diaspora brought home', stage: 'Zungu Main', sc: 'm', hl: true, handoff: false },
              { t: '2:00am', n: 'Zungu Main Closes', d: 'The mythology is earned.', stage: '—', sc: '', hl: false, handoff: false },
              { t: '6:00am', n: 'Origins: Final Sunrise', d: 'Local selector. Dawn. The island closes how it opened.', stage: 'Origins', sc: 'o', hl: false, handoff: false },
            ],
          },
        ].map((night) => (
          <div key={night.num} style={{ minHeight: '100vh', padding: '80px 8vw', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', borderBottom: `1px solid ${BORDER}`, backgroundColor: night.bg }}>
            {/* Ghost number */}
            <div style={{ fontFamily: DISPLAY, fontSize: '18rem', fontWeight: 900, lineHeight: 1, position: 'absolute', right: '6vw', top: 20, opacity: 0.04, pointerEvents: 'none', color: CREAM }}>
              {night.num}
            </div>
            {/* Radial gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 60% at ${night.num === '01' ? '85% 30%' : night.num === '02' ? '15% 40%' : night.num === '03' ? '60% 25%' : '40% 60%'}, rgba(${night.num === '01' ? '212,114,42' : night.num === '02' ? '74,143,189' : night.num === '03' ? '58,175,122' : '155,95,192'},.09) 0%, transparent 60%)`, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.45)' }}>{night.date}</span>
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase' as const, padding: '4px 10px', border: `1px solid ${night.tagBorder}`, color: night.accent }}>{night.tag}</span>
              </div>
              <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 900, lineHeight: 0.88, marginBottom: 8, color: night.accent }}>{night.title}</div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, maxWidth: 560, lineHeight: 1.8, marginBottom: 40, letterSpacing: '0.02em' }}>{night.sub}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
                {/* Narrative + visual concept */}
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 14, lineHeight: 1.9, color: MUTED }}>
                    {night.narr.map((p, i) => (
                      <p key={i} style={{ marginTop: i > 0 ? 14 : 0 }} dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, `<strong style="color:${CREAM}">`).replace(/<\/strong>/g, '</strong>') }} />
                    ))}
                  </div>
                  {/* Visual concept box */}
                  <div style={{ marginTop: 28, padding: 20, border: `1px solid ${BORDER_MID}`, background: 'rgba(200,168,75,0.02)' }}>
                    <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, display: 'block', marginBottom: 14 }}>Visual Concept · Night {night.num}</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {night.visual.map(({ a, v }) => (
                        <div key={a} style={{ padding: 12, background: 'rgba(242,235,217,0.02)', border: '1px solid rgba(242,235,217,0.04)' }}>
                          <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.35)', display: 'block', marginBottom: 5 }}>{a}</span>
                          <span style={{ fontFamily: MONO, fontSize: 13, color: 'rgba(242,235,217,0.6)', lineHeight: 1.5 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Schedule table */}
                <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(242,235,217,0.05)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px', gap: 12, padding: '10px 14px', borderBottom: '1px solid rgba(242,235,217,0.06)', fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)' }}>
                    <span>Time</span><span>Programme</span><span style={{ textAlign: 'right' }}>Stage</span>
                  </div>
                  {night.schedule.map((row, i) => {
                    const stageColor = row.sc === 'm' ? GOLD : row.sc === 'o' ? ORIGINS_C : row.sc === 'r' ? REBIRTH_C : 'rgba(242,235,217,0.2)';
                    return (
                      <div key={i} style={{
                        display: 'grid', gridTemplateColumns: '60px 1fr 80px', gap: 12, padding: '11px 14px',
                        borderBottom: '1px solid rgba(242,235,217,0.04)',
                        borderLeft: row.hl ? `2px solid ${night.accent}` : row.handoff ? '2px solid rgba(200,168,75,0.3)' : 'none',
                        background: row.hl ? `rgba(${night.num === '01' ? '212,114,42' : night.num === '02' ? '74,143,189' : night.num === '03' ? '58,175,122' : '155,95,192'},.04)` : row.handoff ? 'rgba(200,168,75,0.04)' : 'transparent',
                        alignItems: 'start',
                      }}>
                        <span style={{ fontFamily: MONO, fontSize: 9, color: row.handoff ? GOLD : 'rgba(200,168,75,0.5)', paddingTop: 2 }}>{row.t}</span>
                        <div>
                          <span style={{ fontFamily: MONO, fontSize: 13, color: CREAM, display: 'block', marginBottom: 3, fontWeight: 700 }}>{row.n}</span>
                          <span style={{ fontFamily: MONO, fontSize: 12, color: 'rgba(242,235,217,0.3)', lineHeight: 1.4 }}>{row.d}</span>
                        </div>
                        <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: stageColor, textAlign: 'right', paddingTop: 2 }}>{row.stage}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 05 — HANDOFF
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="05" title="No Split" goldLine="Crowd. Ever." desc="Three stages. Three windows. Never competing. The crowd moves as one body. The forest path is not logistics — it is the ritual that ties the day together." />

      <section id="handoff" style={{ padding: '60px 8vw', borderBottom: `1px solid ${BORDER}`, backgroundColor: BG }}>
        <SLabel>05 — The Handoff Model</SLabel>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 40 }}>
          {/* Left: Timeline */}
          <div>
            {[
              { t: '6:00am', label: 'Origins Opens', body: 'East-facing. 500 cap. Sunrise directly behind the DJ. Jungle. Jamaican electronic.', key: true, color: ORIGINS_C },
              { t: '8:00am', label: 'Origins Second Act', body: 'Runs until 10am. Closes before the daytime activity programme.', key: false, color: null },
              { t: '10:00am', label: 'All Stages Dark', body: '10am–4pm. Activities own the island. No music competes with the daytime programme.', key: false, color: null },
              { t: '4:00pm', label: 'Rebirth Opens', body: 'West-facing. 800 cap. Sunset house. The crowd assembles for the golden hour.', key: true, color: REBIRTH_C },
              { t: '7:00pm', label: 'Zungu Main Doors', body: 'Gates open. First act 8pm. Rebirth still active — transition begins.', key: false, color: GOLD },
              { t: '7:45pm', label: 'The Handoff Moment', body: 'Rebirth last act ends. Forest path lit. Staffed. The crowd walks from sunset into night. 8–12 minutes through the trees. This is the ritual. The island pivots.', key: true, color: GOLD, ritual: true },
              { t: '8:00pm', label: 'Zungu Main: Full Crowd', body: 'No split. Everyone in one place. The night builds from here.', key: false, color: GOLD },
              { t: '11:00pm', label: 'Headline Set', body: 'Full production. Total theatrical commitment.', key: true, color: GOLD },
              { t: '12:00am', label: 'The Pier Opens', body: '200 cap only. Discovery. No announced lineup. You find it or you don\'t.', key: false, color: null },
              { t: '3–5am', label: 'Zungu Main Closes', body: 'Night-dependent. Night 3 to 5am. Night 4 to 2am. The Pier runs to sunrise.', key: true, color: GOLD },
            ].map(({ t, label, body, key, color, ritual }) => (
              <div key={t} style={{ display: 'grid', gridTemplateColumns: '72px 1fr' }}>
                <div style={{ position: 'relative', padding: '12px 14px 12px 0', textAlign: 'right', borderRight: `1px solid rgba(200,168,75,0.1)` }}>
                  <span style={{ fontFamily: MONO, fontSize: 9, color: key ? GOLD : 'rgba(200,168,75,0.4)', fontWeight: key ? 700 : 400 }}>{t}</span>
                  <div style={{ position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)', width: key ? 9 : 7, height: key ? 9 : 7, borderRadius: '50%', background: key ? GOLD : 'rgba(200,168,75,0.2)' }} />
                </div>
                <div style={{ padding: '10px 0 10px 20px', borderBottom: '1px solid rgba(242,235,217,0.03)', background: ritual ? 'rgba(200,168,75,0.04)' : 'transparent', borderLeft: ritual ? `2px solid rgba(200,168,75,0.3)` : 'none', paddingLeft: ritual ? 18 : 20 }}>
                  <strong style={{ display: 'block', marginBottom: 3, fontSize: 14, color: color || CREAM }}>{label}</strong>
                  <span style={{ fontFamily: MONO, fontSize: 13, color: ritual ? 'rgba(200,168,75,0.6)' : 'rgba(242,235,217,0.4)', lineHeight: 1.6 }}>{body}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Hard rules + production table */}
          <div>
            <div style={{ padding: 24, border: `1px solid ${BORDER_MID}`, background: 'rgba(200,168,75,0.025)', marginBottom: 20 }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, display: 'block', marginBottom: 16 }}>The Hard Rules</span>
              {[
                'Origins and Rebirth <strong>never run simultaneously</strong> with each other or with Zungu Main.',
                'When Black Coffee is playing, <strong>no other stage exists.</strong> The Pier opens midnight only — after the headline has the crowd.',
                'The forest path between Rebirth and Zungu Main is <strong>fully lit and staffed</strong> every evening. The walk is part of the experience.',
                'All activity zones close at 3:30pm. <strong>Rebirth opens 4pm.</strong> The transition is managed, not abrupt.',
                'The Pier runs midnight to sunrise at 200 cap, <strong>by discovery only</strong>. No wristband upgrade. No announcement. You find it or you don\'t.',
              ].map((rule, i) => (
                <div key={i} style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.7, color: 'rgba(242,235,217,0.4)', paddingLeft: 14, borderLeft: '2px solid rgba(200,168,75,0.2)', marginBottom: 12 }}
                  dangerouslySetInnerHTML={{ __html: rule.replace(/<strong>/g, `<strong style="color:${CREAM}">`).replace(/<\/strong>/g, '</strong>') }} />
              ))}
            </div>

            {/* Production table */}
            <div style={{ border: '1px solid rgba(242,235,217,0.06)' }}>
              {[
                { stage: 'Main', color: GOLD, sc: 'm', desc: 'Lead production company. Full LED, lighting, sound, pyro. Generator redundancy ×2.' },
                { stage: 'Origins', color: ORIGINS_C, sc: 'o', desc: 'Second company. Sound quality first. Warm amber lighting only. Sunrise does the visual work.' },
                { stage: 'Rebirth', color: REBIRTH_C, sc: 'r', desc: 'Third company. Mid-scale. Dusk-calibrated warm lighting. Manages forest path during handoff.' },
                { stage: 'The Pier', color: DIM, sc: 'p', desc: 'Fourth company. Minimal. 200 cap. Sound and basic lighting only. The sea is the production.' },
              ].map(({ stage, color, desc }) => (
                <div key={stage} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', borderBottom: '1px solid rgba(242,235,217,0.04)' }}>
                  <span style={{ padding: 14, borderRight: '1px solid rgba(242,235,217,0.04)', fontFamily: DISPLAY, fontSize: 9, fontWeight: 700, color, display: 'flex', alignItems: 'center' }}>{stage}</span>
                  <span style={{ padding: '14px 16px', fontFamily: MONO, fontSize: 13, color: 'rgba(242,235,217,0.4)', lineHeight: 1.6 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: BG, padding: '40px 8vw', borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: '1.4rem', fontWeight: 900, color: 'rgba(200,168,75,0.15)' }}>ZUNGU 2027</div>
        <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.2em', color: 'rgba(242,235,217,0.12)', textAlign: 'right', lineHeight: 2 }}>
          Stage Architecture · Internal Working Document<br />
          Navy Island · Port Antonio · Jamaica<br />
          June 17–23, 2027 · 18+ Adults Only · 5,000 Tickets
        </div>
      </footer>

    </div>
  );
}
