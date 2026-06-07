'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import dynamic from 'next/dynamic';

const StageMap = dynamic(() => import('../deck/maps/StageMap'), { ssr: false });

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
const ORIGINS_C = '#D4722A';
const REBIRTH_C = '#9B5FC0';
const N2_C = '#4A8FBD';
const N3_C = '#3AAF7A';
const DISPLAY = "'Unbounded', sans-serif";
const MONO = "'Space Mono', monospace";

const SECTION_IDS = ['hero', 'island', 'map', 'stages', 'nights', 'production', 'booking', 'partners'];

const NAV_LINKS = [
  { label: 'Island', id: 'island' },
  { label: 'Map', id: 'map' },
  { label: 'Stages', id: 'stages' },
  { label: 'Nights', id: 'nights' },
  { label: 'Production', id: 'production' },
];

// ── Stage data for Ch03 ───────────────────────────────────────────────────────
const STAGES = [
  {
    id: 'zungu',
    bg: '#060600',
    accent: GOLD,
    label: 'Main Stage · South Face · Centre island · Full production',
    title: 'ZUNGU MAIN',
    sub: 'The centre of gravity. Full production. One headliner per night. When Zungu Main is active, nothing else competes.',
    img: '/photos/zungu-main-stage design.png',
    narr: [
      'South-facing. <strong>Sound travels out to sea</strong>, away from Port Antonio. The stage does not feel built — it feels grown. Tropical forest frames every sightline.',
      'Full production at festival scale — LED walls, lighting rig, laser, water feature, pyro. The production serves the environment. <strong>The island is the set design.</strong>',
    ],
    visual: [
      { a: 'Stage Function', v: 'Major acts · headline sets · peak festival nights · ceremonial closes' },
      { a: 'Sonic Identity', v: 'Big room · Afro-house headline · EDM · mainstage electronic' },
      { a: 'Production Read', v: 'Highest specification. Advanced first. Global anchor defines the benchmark.' },
      { a: 'Scale', v: 'Full festival · South face · Forest canopy surround · Year One 5,000 target' },
    ],
    table: [
      { l: 'Position', v: 'South face · Centre island · Sound to sea' },
      { l: 'Hours', v: 'Doors 7pm · First act 8pm · Headline 11pm+' },
      { l: 'Scale', v: 'Full festival · Year One 5,000 target' },
      { l: 'Audio', v: 'd&b or equiv main array · Fill + delay' },
      { l: 'Power', v: 'Generator redundancy ×2' },
      { l: 'Extras', v: 'Laser · Water feature · Pyro capacity' },
    ],
  },
  {
    id: 'origins',
    bg: '#120800',
    accent: ORIGINS_C,
    label: 'Sunrise Stage · East · Earth sound · Tribal fusion',
    title: 'ORIGINS',
    sub: 'The source stage. East-facing. The sun rises directly behind the DJ. The first movement of the island.',
    img: '/photos/zungu-origins-stage-design.png',
    narr: [
      'The eastern tip of the island. <strong>The sun rises directly behind the DJ.</strong> First light through the trees. The silhouette of the selector against the Caribbean dawn.',
      'Origins is not the mainstage. It is the beginning. The breakfast party. The RA moment. The cultural argument stated at 6am, in a clearing, on the island that earned the right to state it.',
    ],
    visual: [
      { a: 'Stage Function', v: 'Sunrise sessions · early-day programming · local selectors · rooted electronic' },
      { a: 'Sonic Identity', v: 'Earth sound · Jungle · Tribal fusion · Jamaican electronic · Deep percussion' },
      { a: 'Production Read', v: 'Sound-first. Low-impact. The sunrise does the visual work. Do not overbuild.' },
      { a: 'Scale', v: 'Intimate · Morning energy · Sound-first' },
    ],
    table: [
      { l: 'Position', v: 'Eastern tip · Crowd faces west into forest' },
      { l: 'Hours', v: '6am – 10am · Closes before daytime programme' },
      { l: 'Scale', v: 'Intimate sunrise stage · Sound-first' },
      { l: 'Audio', v: 'Funktion-One or equiv · Quality first' },
      { l: 'Lighting', v: 'Warm amber wash only · No LED wall' },
      { l: 'Platform', v: 'Elevated · Natural clearing · Bamboo architecture' },
    ],
  },
  {
    id: 'rebirth',
    bg: '#0e0618',
    accent: REBIRTH_C,
    label: 'Sunset Stage · West · Tribal · Tech · Underground house',
    title: 'REBIRTH',
    sub: 'The underground pulse. West-facing. As the island shifts from day to night, Rebirth carries the transition.',
    img: '/photos/zungu-rebirth-stage.png',
    narr: [
      'The western point of the island. <strong>The sun lowers behind the stage.</strong> Golden hour. The crowd moves from the activity programme into the rhythm of the night.',
      'Tribal house. Tech house. Underground house. Hypnotic grooves. Warm percussion. <strong>The island starts to turn.</strong> At 7:45pm, Rebirth hands the crowd to Zungu Main through the forest path.',
    ],
    visual: [
      { a: 'Stage Function', v: 'Sunset sessions · underground programming · transition sets · deeper house' },
      { a: 'Sonic Identity', v: 'Tribal · Tech · Underground house · Afro-tech · Hypnotic grooves' },
      { a: 'Production Read', v: 'Mid-scale. Warm. Sunset-calibrated. Built for transition into night.' },
      { a: 'Scale', v: 'Mid-scale · West point · Sunset transition · Manages forest path handoff at 7:45pm' },
    ],
    table: [
      { l: 'Position', v: 'West end · Sunset directly behind stage' },
      { l: 'Hours', v: '4pm – 8pm · Last act 7:30pm · Handoff 7:45pm' },
      { l: 'Scale', v: 'Mid-scale · Sunset transition stage' },
      { l: 'Audio', v: 'Mid-scale PA · Quality sound for golden hour' },
      { l: 'Lighting', v: 'Warm · Sunset-calibrated · Dusk atmosphere' },
      { l: 'Handoff', v: 'Forest path lit + staffed · 8 min to Zungu Main' },
    ],
  },
];

// ── Festival Week night data ───────────────────────────────────────────────────
const NIGHTS = [
  {
    num: '01', bg: '#060600', accent: ORIGINS_C, tagBorder: 'rgba(212,114,42,0.3)',
    date: 'JUNE 17', tag: 'Arrival Day',
    title: 'ARRIVAL DAY',
    photo: '/photos/zungu-tribal-stage-arrival.png',
    sub: 'Check-in, accommodation access, island orientation, welcome parties, soft openings, partner receptions.',
    narr: [
      '<strong>June 17 is Arrival Day.</strong> Guests arrive by marine transfer from Port Antonio. Check-in, island orientation, first look at the stages in daylight.',
      'Welcome parties at sunset. Soft openings. Partner receptions. The island begins to breathe. Tomorrow, the stages activate.',
    ],
    visual: [
      { a: 'Arrivals', v: 'Marine transfer from Port Antonio · Harbour crossing · Island check-in' },
      { a: 'Accommodation', v: 'Glamping pods · Bamboo structures · Villa allocation · Guest services open' },
      { a: 'Welcome', v: 'Welcome parties · Soft openings · First taste of Zungu food + drink' },
      { a: 'Receptions', v: 'Partner receptions · Press briefings · Artist arrivals · Ground crew orientation' },
    ],
    schedule: [
      { t: 'All day', n: 'Arrival Day', d: 'Marine transfer, check-in, island orientation, accommodation access.', stage: 'Island', sc: '', hl: false, handoff: false },
    ],
  },
  {
    num: '02', bg: '#040810', accent: N2_C, tagBorder: 'rgba(74,143,189,0.3)',
    date: 'JUNE 18', tag: 'Festival Night One',
    title: 'FESTIVAL NIGHT ONE',
    photo: '/photos/zungu-main-stage design.png',
    sub: 'The first full night. All stages open into the official festival programme.',
    narr: [
      '<strong>June 18 is Festival Night One.</strong> The first full night. Origins opens at 6am. Rebirth at 4pm. Zungu Main at 8pm.',
      'Stage readiness at full operational level. Guest flow tested across the island. The world of Zungu begins on the water.',
    ],
    visual: [
      { a: 'Programme', v: 'Official festival programme · All three stages active' },
      { a: 'Origins', v: '6am sunrise sessions · East · First light on the island' },
      { a: 'Rebirth', v: '4pm sunset sessions · West · Golden hour · 7:45pm handoff' },
      { a: 'Zungu Main', v: '8pm · Full production · Doors open · First headline night' },
    ],
    schedule: [
      { t: '6:00am', n: 'Origins opens', d: 'First sunrise session of the festival.', stage: 'Origins', sc: 'o', hl: false, handoff: false },
      { t: '4:00pm', n: 'Rebirth opens', d: 'Sunset sessions begin.', stage: 'Rebirth', sc: 'r', hl: false, handoff: false },
      { t: '8:00pm', n: 'Zungu Main opens', d: 'The first full night at the mainstage.', stage: 'Zungu', sc: 'm', hl: true, handoff: false },
    ],
  },
  {
    num: '03', bg: '#030e06', accent: N3_C, tagBorder: 'rgba(58,175,122,0.3)',
    date: 'JUNE 19', tag: 'Festival Night Two',
    title: 'FESTIVAL NIGHT TWO',
    photo: '/photos/zungu-stage-design-aerial.png',
    sub: 'The island is fully active. Mainstage, underground, sunrise, sunset, and island programming.',
    narr: [
      '<strong>June 19 is Festival Night Two.</strong> The island is fully active. Origins at dawn. Daytime activities. Rebirth at sunset.',
      'Crew rotation in effect. Pop-up events. <strong>The full island rhythm is established.</strong> Zungu Main carries the night into the early hours.',
    ],
    visual: [
      { a: 'Mainstage', v: 'Full mainstage programming · Peak crowd · Deep into the night' },
      { a: 'Underground', v: 'Rebirth sunset sessions · Tribal · Tech · Forest path transition' },
      { a: 'Sunrise', v: 'Origins at 6am · Daytime island activities · Wellness · Water' },
      { a: 'Island', v: 'Full island activation · Pop-ups · Crew rotation · Night two rhythm' },
    ],
    schedule: [
      { t: '6:00am', n: 'Origins opens', d: 'Second sunrise session.', stage: 'Origins', sc: 'o', hl: false, handoff: false },
      { t: '4:00pm', n: 'Rebirth opens', d: 'Sunset sessions · Night two underground programme.', stage: 'Rebirth', sc: 'r', hl: false, handoff: false },
      { t: '8:00pm', n: 'Zungu Main opens', d: 'Night two · Full programme · All production live.', stage: 'Zungu', sc: 'm', hl: true, handoff: false },
    ],
  },
  {
    num: '04', bg: '#060410', accent: REBIRTH_C, tagBorder: 'rgba(155,95,192,0.3)',
    date: 'JUNE 20–23', tag: 'Peak Night & Beyond',
    title: 'PEAK NIGHT & BEYOND',
    photo: '/photos/zungu-origins-stage-design-night.png',
    sub: 'June 20: Peak night. Major acts, full production, highest energy. June 21–23: Recovery, pop-ups, and final hoorah.',
    narr: [
      '<strong>June 20 is Peak Night.</strong> Major acts. Full production at highest specification. Zungu Main at capacity.',
      '<strong>June 21–23:</strong> The island slows. Recovery. Pop-ups. Smaller events, town dinners, media moments, partner gatherings, final hoorah before departure.',
    ],
    visual: [
      { a: 'June 20', v: 'Peak night. Major acts. Full production. Highest energy.' },
      { a: 'June 21', v: 'Recovery shift. Sunrise. Pop-ups. Wellness. Smaller-scale programming.' },
      { a: 'June 22', v: 'Island pop-ups. Port Antonio events. Town dinners. Artist sessions.' },
      { a: 'June 23', v: 'Final hoorah. Departure. Handover to production breakdown.' },
    ],
    schedule: [
      { t: 'JUN 20', n: 'Peak Night', d: 'Major acts, full production, highest energy.', stage: 'All Stages', sc: 'm', hl: true, handoff: false },
      { t: 'JUN 21', n: 'Recovery Shift', d: 'Sunrise, recovery, pop-ups, wellness, reduced-scale programming.', stage: 'Island', sc: 'o', hl: false, handoff: false },
      { t: 'JUN 22', n: 'Island Pop-Ups', d: 'Smaller music moments, partner events, town dinners, media capture.', stage: 'Island', sc: 'r', hl: false, handoff: false },
      { t: 'JUN 23', n: 'Final Hoorah / Departure', d: 'Closing island moment, check-out, guest departures, production handover.', stage: '—', sc: '', hl: false, handoff: true },
    ],
  },
];

// ── ChapterDivider ─────────────────────────────────────────────────────────────
function ChapterDivider({ num, title, goldLine, desc }: { num: string; title: string; goldLine: string; desc: string }) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', backgroundColor: BG, padding: '80px 8vw 40px', borderTop: `1px solid ${BORDER}`, display: 'flex', alignItems: 'flex-start', gap: '3rem', position: 'relative', overflow: 'hidden' }}>
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

// ── SLabel ─────────────────────────────────────────────────────────────────────
function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
      <div style={{ width: 28, height: 1, background: 'rgba(200,168,75,0.5)', flexShrink: 0 }} />
      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700 }}>{children}</span>
    </div>
  );
}

// ── ChapterSection — /deck ChapterWrap pattern ────────────────────────────────
function ChapterSection({
  bg, photo, children, id, minHeight = 'auto',
}: {
  bg: string; photo?: string; children: React.ReactNode; id?: string; minHeight?: string;
}) {
  return (
    <div id={id} style={{ position: 'relative', overflow: 'hidden', backgroundColor: bg, minHeight, borderBottom: `1px solid ${BORDER}` }}>
      {photo && (
        <img
          src={photo}
          alt=""
          aria-hidden
          style={{
            position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0.32, filter: 'saturate(0.5) brightness(0.4)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />
      )}
      {photo && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, ${bg} 28%, ${bg}ee 50%, transparent 82%)`,
          pointerEvents: 'none', zIndex: 0,
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ── Ghost number ──────────────────────────────────────────────────────────────
function GhostNum({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'absolute', right: '6vw', top: 20, fontFamily: DISPLAY, fontSize: '18rem', fontWeight: 900, color: CREAM, opacity: 0.04, lineHeight: 1, zIndex: 0, userSelect: 'none', pointerEvents: 'none' }}>{children}</div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
function StagesPageInner() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') ?? '';
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
          <a href="/partner" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', fontWeight: 700, transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
            ← Back
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
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'saturate(0.8) brightness(0.45)' }}
        >
          <source src="https://res.cloudinary.com/elektricbangaz/video/upload/v1780460482/BANGAZ_FINAL_huedov.webm" type="video/webm" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,8,10,1) 0%, rgba(4,8,10,0.65) 40%, rgba(4,8,10,0.15) 100%), linear-gradient(to right, rgba(4,8,10,0.5) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,168,75,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 24, fontWeight: 700 }}>
            STAGE ARCHITECTURE · NAVY ISLAND · PORT ANTONIO · JAMAICA
          </div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 900, lineHeight: 0.9, color: CREAM, marginBottom: 8 }}>
            THREE<br /><span style={{ color: GOLD }}>STAGES.</span><br />ONE<br />ISLAND.
          </h1>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.06em', lineHeight: 1.8, marginBottom: 48, maxWidth: 520 }}>
            Origins catches the sunrise. Rebirth catches the sunset. Zungu Main owns the night. Every stage responds to the land.
          </p>

          <div style={{ display: 'flex', gap: 0, borderTop: `1px solid rgba(200,168,75,0.2)`, paddingTop: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'ORIGINS', value: 'Sunrise · Earth sound · Tribal fusion' },
              { label: 'ZUNGU', value: 'Centre island · Mainstage · Major acts' },
              { label: 'REBIRTH', value: 'Sunset · Tribal · Tech · Underground' },
              { label: 'PRODUCTION', value: 'Stage requirements · Infrastructure · Delivery' },
              { label: 'PARTNERS', value: 'Build · Technical · Operational' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{ paddingRight: i < arr.length - 1 ? '2.5rem' : 0, marginRight: i < arr.length - 1 ? '2.5rem' : 0, borderRight: i < arr.length - 1 ? `1px solid ${BORDER_MID}` : 'none', marginBottom: '1rem' }}>
                <span style={{ display: 'block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 6 }}>{s.label}</span>
                <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 12, fontWeight: 400, color: CREAM, lineHeight: 1.5 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 01 — THE LOCATION
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="01" title="The Location" goldLine="Navy Island." desc="Zungu does not begin with a stage design. It begins with Navy Island." />

      <ChapterSection id="island" bg={BG} photo="/photos/navy-island-aerial-hq.png" minHeight="85vh">
        <div style={{ position: 'relative', padding: '80px 8vw' }}>
          <GhostNum>01</GhostNum>
          <SLabel>// Navy Island · Port Antonio · Jamaica · 64 Acres</SLabel>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, color: CREAM, marginBottom: 16, textTransform: 'uppercase' as const }}>
            NAVY ISLAND<br /><span style={{ color: GOLD }}>IS THE FIRST STAGE.</span>
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, maxWidth: 520, lineHeight: 1.8, marginBottom: 48, letterSpacing: '0.02em' }}>
            Forest. Shoreline. Open sky. The island is the product.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 15, lineHeight: 1.9, color: MUTED }}>
                <p>Navy Island is a 64-acre private island in Port Antonio harbour, Jamaica. Dense rainforest. Natural shoreline. Open Caribbean sky. Sixty-four acres of island that does not need to be built — it already exists as the most powerful venue in the Caribbean.</p>
                <p style={{ marginTop: 14 }}>The stage positions come from the island itself. Origins faces east — the sunrise. Rebirth faces west — the sunset. Zungu Main sits at the centre, south-facing, sound travelling out to open sea.</p>
              </div>
              <div style={{ marginTop: 32, padding: '24px 28px', borderLeft: `3px solid ${GOLD}`, background: 'rgba(200,168,75,0.03)' }}>
                <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 300, color: CREAM, lineHeight: 1.5 }}>
                  &ldquo;<span style={{ color: GOLD }}>Tomorrowland built a fantasy world. Zungu doesn&rsquo;t need to build anything. The world is already there.</span>&rdquo;
                </p>
                <p style={{ marginTop: 10, fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.55)' }}>Location Strategy</p>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid rgba(242,235,217,0.06)` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, padding: '10px 14px', borderBottom: '1px solid rgba(242,235,217,0.06)', fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)' }}>
                <span>Stage</span><span>Direction</span><span>Identity</span>
              </div>
              {[
                { stage: 'Zungu', dir: 'South face', id: 'Centre-island · Night', c: GOLD },
                { stage: 'Origins', dir: 'East', id: 'Sunrise · Source', c: ORIGINS_C },
                { stage: 'Rebirth', dir: 'West', id: 'Sunset · Underground', c: REBIRTH_C },
                { stage: 'Arrival / Marine', dir: 'South/SW', id: 'Guest arrival · marine transfer', c: DIM },
                { stage: 'Navy Island', dir: '—', id: '64 acres · Caribbean', c: MUTED },
              ].map(({ stage, dir, id, c }) => (
                <div key={stage} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, padding: '11px 14px', borderBottom: '1px solid rgba(242,235,217,0.04)', alignItems: 'start' }}>
                  <span style={{ fontFamily: DISPLAY, fontSize: 10, fontWeight: 700, color: c }}>{stage}</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>{dir}</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>{id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 02 — SITE ARCHITECTURE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="02" title="Site Architecture" goldLine="Three Stages. One Island." desc="Each stage is positioned to a natural moment of the island: sunrise, sunset, and centre-island gathering." />

      <ChapterSection id="map" bg={GREEN} photo="/photos/island-stages-aerial.png" minHeight="80vh">
        <div style={{ position: 'relative', padding: '80px 8vw' }}>
          <GhostNum>02</GhostNum>
          <SLabel>// Site Plan · Navy Island · KML Ground Reference</SLabel>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, color: CREAM, marginBottom: 16, textTransform: 'uppercase' as const }}>
            THREE DIRECTIONS.<br /><span style={{ color: GOLD }}>ONE ISLAND WORLD.</span>
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, maxWidth: 520, lineHeight: 1.8, marginBottom: 48, letterSpacing: '0.02em' }}>
            The stages are not placed randomly. Each responds to geography — east, west, south. One island. Three moments of the day.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
            <div>
              <StageMap />
            </div>

            <div>
              <div style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid rgba(242,235,217,0.06)`, marginBottom: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, padding: '10px 14px', borderBottom: '1px solid rgba(242,235,217,0.06)', fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)' }}>
                  <span>Stage</span><span>Position</span><span>Role</span>
                </div>
                {[
                  { stage: 'Zungu', pos: 'Centre · South face', role: 'Mainstage · Full release', c: GOLD },
                  { stage: 'Origins', pos: 'East · Sunrise', role: 'Source stage · Morning', c: ORIGINS_C },
                  { stage: 'Rebirth', pos: 'West · Sunset', role: 'Underground · Transition', c: REBIRTH_C },
                  { stage: 'Arrival', pos: 'South/SW access', role: 'Marine access · Guest movement', c: DIM },
                ].map(({ stage, pos, role: r, c }) => (
                  <div key={stage} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, padding: '11px 14px', borderBottom: '1px solid rgba(242,235,217,0.04)', alignItems: 'start' }}>
                    <span style={{ fontFamily: DISPLAY, fontSize: 10, fontWeight: 700, color: c }}>{stage}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>{pos}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>{r}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, letterSpacing: '0.02em' }}>
                Final site layout confirmed through survey, permitting, environmental review, and production planning.
              </p>
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 03 — THE THREE STAGES
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="03" title="Three Stages." goldLine="Three Energies." desc="Each stage has a distinct identity, a distinct window of the day, and a distinct production requirement." />

      <div id="stages">
        {STAGES.map((stage, idx) => (
          <ChapterSection key={stage.id} bg={stage.bg} photo={stage.img} minHeight="100vh">
            <div style={{ position: 'relative', padding: '80px 8vw' }}>
              <GhostNum>{String.fromCharCode(65 + idx)}</GhostNum>
              <SLabel>{stage.label}</SLabel>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, color: stage.accent, marginBottom: 16, textTransform: 'uppercase' as const }}>
                {stage.title}
              </h2>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, maxWidth: 520, lineHeight: 1.8, marginBottom: 48, letterSpacing: '0.02em' }}>
                {stage.sub}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
                <div>
                  <div style={{ position: 'relative', overflow: 'hidden', marginBottom: 24, height: 280 }}>
                    <img src={stage.img} alt={stage.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.75) saturate(0.9)', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${stage.bg}cc 0%, transparent 60%)` }} />
                    <div style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: stage.accent, opacity: 0.8 }}>{stage.title} · Navy Island</div>
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 15, lineHeight: 1.9, color: MUTED }}>
                    {stage.narr.map((p, i) => (
                      <p key={i} style={{ marginTop: i > 0 ? 14 : 0 }} dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, `<strong style="color:${CREAM}">`) }} />
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ padding: 20, border: `1px solid ${BORDER_MID}`, background: 'rgba(200,168,75,0.02)', marginBottom: 16 }}>
                    <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, display: 'block', marginBottom: 14 }}>Stage Profile · {stage.title}</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {stage.visual.map(({ a, v }) => (
                        <div key={a} style={{ padding: 12, background: 'rgba(242,235,217,0.02)', border: '1px solid rgba(242,235,217,0.04)' }}>
                          <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.35)', display: 'block', marginBottom: 5 }}>{a}</span>
                          <span style={{ fontFamily: MONO, fontSize: 12, color: 'rgba(242,235,217,0.6)', lineHeight: 1.5 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(242,235,217,0.06)' }}>
                    <div style={{ padding: '8px 14px', borderBottom: '1px solid rgba(242,235,217,0.06)', fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)' }}>Stage Specs</div>
                    {stage.table.map(({ l, v }) => (
                      <div key={l} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, padding: '9px 14px', borderBottom: '1px solid rgba(242,235,217,0.04)' }}>
                        <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,168,75,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{l}</span>
                        <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ChapterSection>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 04 — FESTIVAL WEEK
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="04" title="Festival Week." goldLine="Seven Days. Four Core Nights." desc="The island runs on a rhythm. Each day has its moment. Each night has its release." />

      <div id="nights">
        {NIGHTS.map((night) => (
          <ChapterSection key={night.num} bg={night.bg} photo={night.photo} minHeight="100vh">
            <div style={{ position: 'relative', padding: '80px 8vw' }}>
              <GhostNum>{night.num}</GhostNum>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.45)' }}>{night.date}</span>
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase' as const, padding: '4px 10px', border: `1px solid ${night.tagBorder}`, color: night.accent }}>{night.tag}</span>
              </div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, color: night.accent, marginBottom: 16, textTransform: 'uppercase' as const }}>
                {night.title}
              </h2>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, maxWidth: 520, lineHeight: 1.8, marginBottom: 48, letterSpacing: '0.02em' }}>{night.sub}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
                <div>
                  {night.num === '01' && (
                    <div style={{ position: 'relative', overflow: 'hidden', marginBottom: 24, height: 200 }}>
                      <img src="/photos/zungu-glamping-luxe.png" alt="Glamping accommodation" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.7) saturate(0.85)', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${night.bg}cc 0%, transparent 60%)` }} />
                      <div style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GOLD, opacity: 0.8 }}>Accommodation · Navy Island</div>
                    </div>
                  )}
                  <div style={{ fontFamily: MONO, fontSize: 15, lineHeight: 1.9, color: MUTED }}>
                    {night.narr.map((p, i) => (
                      <p key={i} style={{ marginTop: i > 0 ? 14 : 0 }} dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, `<strong style="color:${CREAM}">`).replace(/<\/strong>/g, '</strong>') }} />
                    ))}
                  </div>
                  <div style={{ marginTop: 28, padding: 20, border: `1px solid ${BORDER_MID}`, background: 'rgba(200,168,75,0.02)' }}>
                    <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, display: 'block', marginBottom: 14 }}>Programme · {night.tag}</span>
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
                        background: row.hl ? 'rgba(200,168,75,0.04)' : row.handoff ? 'rgba(200,168,75,0.04)' : 'transparent',
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
          </ChapterSection>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 05 — PRODUCTION REQUIREMENTS BY STAGE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="05" title="Every Stage" goldLine="Has a Different Build." desc="Three stages. One island. Each operates with different technical, spatial, and operational requirements." />

      <ChapterSection id="production" bg={BG} photo="/photos/navy-island-stage-map.png">
        <div style={{ position: 'relative', padding: '80px 8vw' }}>
          <SLabel>// 05 Production Requirements</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, marginBottom: 48 }}>
            {[
              {
                name: 'ZUNGU MAIN',
                accent: GOLD,
                summary: 'Highest specification. Advanced first.',
                reqs: [
                  'Full LED rig · Lighting rig · Laser · Pyro capacity',
                  'Generator redundancy ×2',
                  'Lead production company required',
                  'Global anchor rider sets mainstage benchmark',
                ],
              },
              {
                name: 'ORIGINS',
                accent: ORIGINS_C,
                summary: 'Sound-first. Low-impact. Do not overbuild.',
                reqs: [
                  'Quality PA · Funktion-One or equiv',
                  'Warm amber wash only · No LED wall',
                  'Elevated natural platform · Bamboo architecture',
                  'Morning access logistics · Small crew',
                ],
              },
              {
                name: 'REBIRTH',
                accent: REBIRTH_C,
                summary: 'Mid-scale. Sunset-calibrated. Manages the handoff.',
                reqs: [
                  'Mid-scale PA · Quality sound for golden hour',
                  'Dusk lighting design · Warm atmosphere',
                  'Forest path lighting + staffing',
                  '7:45pm handoff to Zungu Main · 8 min walk',
                ],
              },
            ].map(({ name, accent, summary, reqs }) => (
              <div key={name} style={{ borderTop: `3px solid ${accent}`, padding: '28px 24px', background: 'rgba(242,235,217,0.01)', border: `1px solid rgba(242,235,217,0.06)`, borderTopColor: accent, borderTopWidth: 3 }}>
                <div style={{ fontFamily: DISPLAY, fontSize: '1rem', fontWeight: 900, color: accent, textTransform: 'uppercase' as const, marginBottom: 10, letterSpacing: '0.02em' }}>{name}</div>
                <p style={{ fontFamily: MONO, fontSize: 15, color: CREAM, lineHeight: 1.6, marginBottom: 20, opacity: 0.8 }}>{summary}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {reqs.map((r, i) => (
                    <div key={i} style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.6, paddingLeft: 14, borderLeft: `2px solid ${accent}33` }}>{r}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 20 }}>Daily Stage Flow</div>
              <div style={{ border: '1px solid rgba(242,235,217,0.06)' }}>
                {[
                  { t: '6:00am', n: 'Origins opens', s: 'ORIGINS', c: ORIGINS_C },
                  { t: '10:00am', n: 'Origins closes · Daytime programme', s: 'ISLAND', c: MUTED },
                  { t: '4:00pm', n: 'Rebirth opens · Sunset sessions', s: 'REBIRTH', c: REBIRTH_C },
                  { t: '7:30pm', n: 'Rebirth last act', s: 'REBIRTH', c: REBIRTH_C },
                  { t: '7:45pm', n: 'Handoff · Forest path to Zungu', s: 'TRANSITION', c: GOLD_DIM },
                  { t: '8:00pm', n: 'Zungu Main opens', s: 'ZUNGU', c: GOLD },
                  { t: '11:00pm+', n: 'Headline · Peak festival', s: 'ZUNGU', c: GOLD },
                ].map(({ t, n, s, c }) => (
                  <div key={t} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 80px', gap: 12, padding: '10px 14px', borderBottom: '1px solid rgba(242,235,217,0.04)', alignItems: 'center' }}>
                    <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,168,75,0.5)' }}>{t}</span>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: CREAM }}>{n}</span>
                    <span style={{ fontFamily: MONO, fontSize: 9, color: c, textAlign: 'right', letterSpacing: '0.1em' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 20 }}>The Hard Rules</div>
              <div style={{ padding: 24, border: `1px solid ${BORDER_MID}`, background: 'rgba(200,168,75,0.025)' }}>
                {[
                  'Origins closes before Rebirth opens. No overlap.',
                  'Rebirth hands off to Zungu by 7:45pm through a lit, staffed forest path.',
                  'Sound from each stage must not bleed into the others.',
                  'All stage crew must have confirmed marine transfer and access route.',
                  'Generator redundancy at Zungu Main is non-negotiable. No single-point power failure.',
                ].map((rule, i) => (
                  <div key={i} style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.7, color: MUTED, paddingLeft: 14, borderLeft: '2px solid rgba(200,168,75,0.2)', marginBottom: 12 }}>{rule}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 06 — YEAR ONE BOOKING MODEL
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="06" title="Year One" goldLine="Booking Model." desc="30–45 artists and selectors across the festival week. This is the working artist-load model for production planning — not a confirmed lineup." />

      <ChapterSection id="booking" bg={BG} photo="/photos/zungu-stage-design-aerial.png" minHeight="85vh">
        <div style={{ position: 'relative', padding: '80px 8vw' }}>
          <GhostNum>06</GhostNum>
          <SLabel>// Year One Planning Assumption · Not a Confirmed Lineup</SLabel>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, color: GOLD, marginBottom: 16, textTransform: 'uppercase' as const }}>
            30–45 ARTISTS.<br /><span style={{ color: CREAM }}>ONE ISLAND.</span><br />ONE WEEK.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, maxWidth: 520, lineHeight: 1.8, marginBottom: 48, letterSpacing: '0.02em' }}>
            The booking model shapes the build. Every confirmed artist affects the stage specification, rider review, equipment, travel, accommodation, and back-of-house planning.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 15, lineHeight: 1.9, color: MUTED, marginBottom: 28 }}>
                <p>Year One planning assumption: 30–45 artists and selectors across the festival week. Production partners should account for this range across rider management, DJ equipment, stage management, artist travel, accommodation, hospitality, marine transfers, security, changeovers, and back-of-house planning.</p>
                <p style={{ marginTop: 14 }}>A private-island festival cannot treat artists as names on a poster only. Each booking affects the stage specification, power load, crew schedule, and marine logistics. Fewer, stronger bookings are more powerful than a crowded lineup.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { tier: 'Global Anchor', count: '1', note: 'Zungu Main. Their rider sets the mainstage benchmark. Advanced first.' },
                  { tier: 'Major Support', count: '2–4', note: 'Zungu Main + Rebirth. Builds credibility around the headline programme.' },
                  { tier: 'Curated Depth', count: '10–20', note: 'All three stages. Afro-house, tribal, tech, underground, organic electronic.' },
                  { tier: 'Local Layer', count: 'Open', note: 'Origins + Rebirth + Pop-ups. Jamaican artists, Portland voices, radio sessions.' },
                ].map(({ tier, count, note }) => (
                  <div key={tier} style={{ padding: 16, background: 'rgba(242,235,217,0.02)', border: '1px solid rgba(242,235,217,0.05)' }}>
                    <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.35)', display: 'block', marginBottom: 5 }}>{tier}</span>
                    <span style={{ fontFamily: DISPLAY, fontSize: '1.4rem', fontWeight: 900, color: GOLD, display: 'block', lineHeight: 1, marginBottom: 8 }}>{count}</span>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(242,235,217,0.06)', marginBottom: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: '10px 14px', borderBottom: '1px solid rgba(242,235,217,0.06)', fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.4)' }}>
                  <span>Area</span><span>What to Plan</span>
                </div>
                {[
                  { area: 'Rider review', plan: 'Per confirmed artist' },
                  { area: 'DJ equipment', plan: 'Stage-assigned baseline' },
                  { area: 'Stage assignment', plan: 'Anchor → Mainstage first' },
                  { area: 'Travel + transfer', plan: 'Air · Marine · Ground' },
                  { area: 'Accommodation', plan: 'Villa / hotel per tier' },
                  { area: 'Hospitality', plan: 'Rider-specified requirements' },
                  { area: 'Security', plan: 'Per artist movement plan' },
                  { area: 'Changeovers', plan: 'Per night schedule' },
                  { area: 'Media permissions', plan: 'Per artist' },
                  { area: 'Back-of-house', plan: 'Green room · crew schedule' },
                ].map(({ area, plan }) => (
                  <div key={area} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: '9px 14px', borderBottom: '1px solid rgba(242,235,217,0.04)' }}>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(200,168,75,0.5)' }}>{area}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>{plan}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: 20, border: `1px solid ${BORDER_MID}`, background: 'rgba(200,168,75,0.025)' }}>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, display: 'block', marginBottom: 14 }}>Benchmark Reference</span>
                {[
                  'BPM Costa Rica: 80+ artists across multiple stages.',
                  'SXM Festival: 40+ artists · comparable island-destination format.',
                  'Zungu Year One: 30–45 — fewer, stronger, controlled.',
                ].map((line, i) => (
                  <p key={i} style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.7, paddingLeft: 12, borderLeft: '2px solid rgba(200,168,75,0.2)', marginBottom: 8 }}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 07 — PRODUCTION PARTNER OPPORTUNITIES
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="07" title="Building the Island" goldLine="Takes Partners." desc="Zungu creates opportunities across staging, technical delivery, infrastructure, logistics, hospitality, transport, sustainability, and guest experience." />

      <ChapterSection id="partners" bg={GREEN} photo="/photos/navy-island-wide.png">
        <div style={{ position: 'relative', padding: '80px 8vw' }}>
          <SLabel>// 07 Production Partner Opportunities</SLabel>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 640, marginBottom: 40 }}>
            Every partner category maps to a defined operational requirement. The island creates real scope across eight areas.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
            {[
              { cat: 'Staging & Structures', desc: 'Main stage, secondary stages, platforms, trusses, temporary structures, access scaffolding.' },
              { cat: 'Audio, Lighting & Video', desc: 'PA systems, lighting rigs, LED walls, lasers, atmospheric effects, FOH infrastructure.' },
              { cat: 'Power & Site Infrastructure', desc: 'Generator supply, power distribution, cabling, backup systems, site utilities.' },
              { cat: 'Marine & Transport', desc: 'Ferry services, marine transfers, guest movement, artist logistics, equipment delivery.' },
              { cat: 'Hospitality & Guest Services', desc: 'Glamping, villas, catering, bar infrastructure, VIP services, wellness, guest experience.' },
              { cat: 'Media & Content', desc: 'Photography, video, livestream, social content, press access management, archiving.' },
              { cat: 'Sustainability & Environmental', desc: 'Waste management, ecological compliance, site restoration, low-impact infrastructure.' },
              { cat: 'Local Operations & Workforce', desc: 'Local crew, security, community engagement, Jamaican partnerships, local operator pipeline.' },
            ].map(({ cat, desc }) => (
              <div key={cat} style={{ padding: '24px 20px', border: `1px solid rgba(200,168,75,0.12)`, borderTop: `3px solid rgba(200,168,75,0.4)`, background: 'rgba(0,0,0,0.3)', transition: 'border-color 0.2s, background 0.2s' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,168,75,0.5)'; el.style.background = 'rgba(200,168,75,0.04)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,168,75,0.12)'; el.style.background = 'rgba(0,0,0,0.3)'; }}
              >
                <div style={{ fontFamily: DISPLAY, fontSize: '0.65rem', fontWeight: 900, color: GOLD, textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: 12, lineHeight: 1.3 }}>{cat}</div>
                <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CLOSING — STAGE PRODUCTION BRIEF
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 8vw', backgroundColor: BG, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 12 }}>// Stage Production Brief</div>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
            Detailed rider management, DJ equipment baseline, back-of-house layout, artist travel, security, technical schedules, cost centres, and changeover planning are developed in the Stage Production Brief.
          </p>
        </div>

        {role === 'stakeholder' && (
          <div style={{ marginTop: 32, padding: '24px 28px', border: `1px solid rgba(200,168,75,0.2)`, background: 'rgba(200,168,75,0.025)', maxWidth: 720 }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 12 }}>// Stakeholder Review Note</div>
            <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
              The stage plan is a conceptual site-use framework. Final placement, operating hours, sound direction, access routes, temporary infrastructure, emergency access, and demobilisation requirements should be reviewed with the relevant site, environmental, marine, safety, and public-sector stakeholders.
            </p>
          </div>
        )}
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

export default function StagesPage() {
  return (
    <Suspense>
      <StagesPageInner />
    </Suspense>
  );
}
