'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const BG = '#04080A';
const GREEN = '#0D2018';
const GOLD = '#C8A84B';
const GOLD_DIM = 'rgba(200,168,75,0.45)';
const GOLD_FAINT = 'rgba(200,168,75,0.08)';
const CREAM = '#F2EBD9';
const MUTED = 'rgba(242,235,217,0.45)';
const BORDER = 'rgba(200,168,75,0.07)';
const BORDER_MID = 'rgba(200,168,75,0.12)';

const DISPLAY = "'Unbounded', sans-serif";
const MONO = "'Space Mono', monospace";

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Zones', id: 'zones' },
  { label: 'Schedule', id: 'schedule' },
  { label: 'Wellness', id: 'wellness' },
  { label: 'VIP', id: 'vip' },
  { label: 'Sustainability', id: 'sustainability' },
];

const SECTION_IDS = ['hero', 'philosophy', 'zones', 'schedule', 'wellness', 'vip', 'sustainability'];

const PRINCIPLES = [
  {
    num: '01',
    title: 'Simultaneity',
    body: 'Every zone runs in parallel. No queues, no bottlenecks, no single point of congregation except by choice.',
  },
  {
    num: '02',
    title: 'Discovery Over Announcement',
    body: 'Some experiences are not on the programme. You find them by walking into the forest at midnight, or by asking the right person.',
  },
  {
    num: '03',
    title: 'Adults Only, Always',
    body: '18+ throughout. No softening. The bar programme, the wellness spaces, the night activations — all designed for adults who know what they want.',
  },
  {
    num: '04',
    title: 'Local First, Global Stage',
    body: 'Every zone has a Portland Parish operator at its core. Activities are not imported — they are rooted here and elevated for the world.',
  },
];

const ZONES = [
  {
    icon: '🎯',
    name: 'THE AMBUSH',
    sub: 'Forest Combat Zone · Paintball Jamaica',
    desc: 'Deep in the Navy Island forest. 6 sessions daily. Night sessions with UV paint. Day 3 tournament.',
    tag: 'Daytime & Night · Ticketed Sessions · 18+',
  },
  {
    icon: '🌊',
    name: 'THE COVE',
    sub: 'Beach & Water Activation',
    desc: 'Western beach. Dawn paddle SUP 6am (max 12), reef snorkel (marine biologist-led), deep sea fishing charter, kayak exploration, sunset catamaran (live soundsystem), floating DJ set, cliff jump (guided only).',
    tag: '6am – 11pm Daily · Reef-Safe Zone',
  },
  {
    icon: '🌿',
    name: 'THE SANCTUM',
    sub: 'Wellness, Recovery & Ritual',
    desc: 'Adults-only. No phones after entrance gate. Sunrise yoga, cold plunge pool (spring-fed), hot/cold contrast therapy, massage pavilion, sound bath chamber, IV hydration lounge, guided ceremony (Day 3 only, max 8).',
    tag: '5am – Midnight · No Phones · 18+',
  },
  {
    icon: '🏛️',
    name: 'THE YARD',
    sub: 'Culture, Talk & Participation',
    desc: 'Soundsystem history panels, Patois workshop, vinyl market, rum masterclass, film screening (11pm), poetry & spoken word (2–3:30pm).',
    tag: '8am – 3:30pm Cultural · Evening Film',
  },
  {
    icon: '🎨',
    name: 'THE STUDIO',
    sub: 'Art, Making & Creation',
    desc: 'Portland Parish artist-in-residence. Live mural. Ceramics, screen printing, darkroom, indigo dyeing, jewellery-making.',
    tag: '7am – 3pm Daily · Walk-In Welcome',
  },
  {
    icon: '🍽️',
    name: 'THE MARKET',
    sub: 'Food, Drink & Portland Vendors',
    desc: 'All Portland Parish vendors. Boston Bay jerk, seafood raw bar, Blue Mountain coffee (from 5:30am), chef demonstration, rum bar, non-alcoholic programme. 24-hour zone.',
    tag: '5:30am – 3am Daily · All Local',
  },
  {
    icon: '🌲',
    name: 'THE TRAIL',
    sub: 'Forest Immersion & Hidden Activations',
    desc: '2km route. Guided forest walk (7am, max 15), hammock forest (40 hammocks), hidden ambient installation, secret bar (unmarked), aerial silks, night trail (lanterns only, midnight).',
    tag: 'Dawn to Midnight · Mostly Free',
  },
  {
    icon: '🌙',
    name: 'THE PIER',
    sub: 'Intimate Night Stage · No Announced Lineup',
    desc: '200-capacity. No lineup posted. Opens midnight. Sunrise set. Private bar. No phones.',
    tag: 'Midnight – Dawn · 200 Cap · Discovery Only',
  },
];

const DAY_TABS = [
  { id: 'day1', label: 'Day 1', sub: 'Thu 13' },
  { id: 'day2', label: 'Day 2', sub: 'Fri 14' },
  { id: 'day3', label: 'Day 3', sub: 'Sat 15' },
  { id: 'day4', label: 'Day 4', sub: 'Sun 16' },
];

const DAY1_SCHEDULE = [
  { time: '5:30am', events: ['Cold Plunge Opens', 'Blue Mountain Coffee'] },
  { time: '6:00am', events: ['Dawn Paddle SUP', 'Sunrise Yoga', 'Forest Meditation'] },
  { time: '7:00am', events: ['Reef Snorkel', 'Breathwork', 'Guided Forest Walk', 'Full Jamaican Breakfast'] },
  { time: '9:00am', events: ['Kayak Routes', 'Sound Bath #1', 'Paintball Opens', 'Patois Workshop'] },
  { time: '11:00am', events: ['Cliff Jump', 'Nordic Circuit', 'Aerial Silks', 'Soundsystem Panel'] },
  { time: '1:00pm', events: ['Floating DJ Set', 'Sound Bath #2', 'Archery Range', 'Chef Demo'] },
  { time: '2:00pm', events: ['Catamaran Departs', 'Somatic Movement', 'Poetry & Spoken Word'] },
  { time: '3:30pm', events: ['All zones close'] },
  { time: '4:00pm', events: ['STAGES OPEN — Rebirth 4pm · Zungu Main 7pm'] },
];

const DAY2_SCHEDULE = [
  { time: '5:30am', events: ['Cold Plunge Opens', 'Blue Mountain Coffee'] },
  { time: '6:00am', events: ['Dawn Paddle SUP', 'Sunrise Yoga'] },
  { time: '7:00am', events: ['Deep Sea Fishing Charter', 'Breathwork', 'Guided Forest Walk'] },
  { time: '9:00am', events: ['Tournament Qualifiers — Paintball', 'Sound Bath #1', 'Kayak Routes'] },
  { time: '11:00am', events: ['Cliff Jump', 'Nordic Circuit', 'Rum Masterclass', 'Aerial Silks'] },
  { time: '1:00pm', events: ['Sound Bath #2', 'Chef Demo', 'Vinyl Market'] },
  { time: '2:00pm', events: ['Obsidian Catamaran Departs', 'Somatic Movement', 'Poetry & Spoken Word'] },
  { time: '3:30pm', events: ['All zones close'] },
  { time: '4:00pm', events: ['STAGES OPEN'] },
];

const DAY3_SCHEDULE = [
  { time: '5:30am', events: ['Cold Plunge Opens', 'Blue Mountain Coffee'] },
  { time: '6:00am', events: ['Sunrise Yoga', 'Forest Meditation'] },
  { time: '8:00am', events: ['Guided Ceremony — Pre-Registered Only (8 Max)'] },
  { time: '9:00am', events: ['Sound Bath #1', 'Kayak Routes', 'Reef Snorkel'] },
  { time: '11:00am', events: ['Aerial Silks', 'Nordic Circuit', 'Rum Masterclass'] },
  { time: '12:00pm', events: ['Paintball FINAL — Tournament', 'Chef Demo'] },
  { time: '1:00pm', events: ['Sound Bath #2', 'Floating DJ Set'] },
  { time: '2:00pm', events: ['Somatic Movement', 'Poetry & Spoken Word'] },
  { time: '3:30pm', events: ['All zones close'] },
  { time: '4:00pm', events: ['STAGES OPEN'] },
  { time: '12:00am', events: ['BLACK COFFEE — Closes at 5am'] },
];

const DAY4_SCHEDULE = [
  { time: '5:30am', events: ['Cold Plunge Opens', 'Blue Mountain Coffee'] },
  { time: '6:00am', events: ['Sunrise Yoga', 'Final Forest Walk'] },
  { time: '9:00am', events: ['Sound Bath — Farewell Session', 'Kayak Routes'] },
  { time: '11:00am', events: ['Aerial Silks', 'Nordic Circuit'] },
  { time: '12:00pm', events: ['CLOSING CEREMONY — The Yard (Mural Unveiled)'] },
  { time: '1:00pm', events: ['Ferry Departures Begin'] },
  { time: '3:30pm', events: ['All activity zones close'] },
];

const SCHEDULE_BY_DAY: Record<string, typeof DAY1_SCHEDULE> = {
  day1: DAY1_SCHEDULE,
  day2: DAY2_SCHEDULE,
  day3: DAY3_SCHEDULE,
  day4: DAY4_SCHEDULE,
};

const WELLNESS_CARDS = [
  { time: '5:00am – Midnight', title: 'Cold Plunge Pool', desc: 'Spring-fed. 10–14°C. Towels provided. Most-used facility.' },
  { time: '5:45am Daily', title: 'Sunrise Yoga & Breathwork', desc: 'Open air. Ocean-facing. Holotropic breathwork Days 2 & 3.' },
  { time: 'All Day · Bookable', title: 'Massage Pavilion', desc: 'Swedish, deep tissue, sports recovery. 45 or 90 mins. Six beds.' },
  { time: '3× Daily', title: 'Sound Bath', desc: 'Crystal bowls, gongs. 9am, 1pm, 10pm. Evening session candlelight only.' },
  { time: 'Hot/Cold Circuit', title: 'Nordic Contrast Therapy', desc: 'Infrared sauna → cold plunge → rest. 3 cycles recommended.' },
  { time: 'Walk-In · No Queue', title: 'IV Hydration Lounge', desc: 'Electrolyte drip, B12, Vitamin C. 30–45 mins per session.' },
  { time: 'Evening · 60 mins', title: 'Somatic Movement', desc: 'Facilitated body-awareness. Small groups, 12 maximum.' },
  { time: 'Day 3 · Pre-Register · 8 Max', title: 'Guided Ceremony', desc: 'Optional. Curated. Three-hour guided session. Harm-reduction briefing provided.' },
];

const VIP_TIERS = [
  {
    name: 'NAVY',
    label: 'Tier 1',
    bg: GREEN,
    borderColor: BORDER_MID,
    topAccent: false,
    items: [
      'GA + Comfort Upgrades',
      'Dedicated entry lane',
      'Reserved viewing platform',
      'Guaranteed Pier access',
      'Priority booking',
      'Welcome kit (towel, sunscreen, zine)',
      'Info concierge',
      'Late-night jerk credit JMD 3,000',
    ],
  },
  {
    name: 'OBSIDIAN',
    label: 'Tier 2',
    bg: '#0A1A12',
    borderColor: GOLD_DIM,
    topAccent: false,
    items: [
      'All Navy inclusions',
      'Glamping accommodation (pod or bell tent)',
      'Private Obsidian lounge',
      'Daily Sanctum credit (one massage/person/day)',
      'Private catamaran cruise',
      'Artist greenroom access (30 min, one session)',
      'Reserved hammock enclave',
      'Welcome champagne',
      'Obsidian WhatsApp group',
    ],
  },
  {
    name: 'THE THIRTY',
    label: 'Limited to 30 Guests',
    bg: '#060D08',
    borderColor: GOLD,
    topAccent: true,
    items: [
      'All Obsidian inclusions',
      'Private villa (Navy Island hotel, en-suite, sea view)',
      'Personal festival host for 4 days',
      "Private dining — 5-course chef's table",
      'Pier 10 reserved seats nightly',
      'Private Sanctum session',
      'Commissioning credit',
      'Private speedboat transfer',
      'Priority Year 2 allocation',
      'Kingston investor/partner dinner invitation',
      'Naming credit in zine and mural plaque',
    ],
  },
];

const SUSTAIN_ITEMS = [
  { num: '01', title: 'Zero Single-Use Plastics', desc: 'No plastic bottles, cups, or packaging. Reusable cup at entry. NEPA compliance.' },
  { num: '02', title: 'Reef Protection Protocol', desc: 'All water activities guided. Reef-safe sunscreen at entry. Marine biologist on-site. Post-event NEPA report.' },
  { num: '03', title: 'Portland Parish Employment First', desc: 'Every zone coordinator Portland-based. Every food vendor local. Contractual.' },
  { num: '04', title: 'Bilingual Wayfinding', desc: 'English and Jamaican Patois. Patois is the first language of the island.' },
  { num: '05', title: 'Carbon Contribution Line', desc: 'Fixed contribution in every ticket. Portland Parish reforestation and marine conservation.' },
  { num: '06', title: 'Non-Alcoholic Programme', desc: 'Designed by Jamaican nutritionist. Cold-press juices, herbal teas, coconut water cocktails.' },
  { num: '07', title: 'Harm Reduction', desc: 'On-site team, discreet, non-punitive. Testing kits. Water, bananas, electrolytes free at every stage.' },
  { num: '08', title: 'Quiet Zone', desc: 'Forest hammock area: no amplified music, no group noise. For the overwhelmed or introverted.' },
  { num: '09', title: 'Island Restoration', desc: 'Full demobilisation within 24 hours of last ferry. NEPA post-event report as condition of Year 2.' },
];

// ── Shared fade-in wrapper ────────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
}

// ── Chapter divider ────────────────────────────────────────────────────────────
function ChapterDivider({ num, title, prefix = '', light = false }: { num: string; title: string; prefix?: string; light?: boolean }) {
  const bg = light ? '#F0EAD8' : BG;
  const textColor = light ? '#04080A' : CREAM;
  const lineColor = light ? 'rgba(4,8,10,0.12)' : BORDER_MID;
  const goldColor = light ? '#8B6E1F' : GOLD;

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: bg,
        padding: '4rem clamp(24px, 8vw, 112px)',
        borderTop: `1px solid ${lineColor}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 24, height: 1, backgroundColor: goldColor, flexShrink: 0 }} />
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            letterSpacing: '0.4em',
            color: goldColor,
            textTransform: 'uppercase' as const,
            fontWeight: 700,
          }}
        >
          Chapter {num}
        </span>
      </div>
      <h2
        style={{
          fontFamily: DISPLAY,
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: textColor,
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
        }}
      >
        {prefix && <>{prefix} </>}
        <span style={{ color: goldColor }}>{title}</span>
      </h2>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ActivitiesPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('hero');
  const [activeDay, setActiveDay] = useState('day1');
  const [navScrolled, setNavScrolled] = useState(false);

  // Motion scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Auth redirect
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Nav shadow on scroll
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dot nav — IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
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

  const scheduleRows = SCHEDULE_BY_DAY[activeDay] ?? DAY1_SCHEDULE;

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', fontFamily: MONO, color: CREAM }}>

      {/* ── Scroll progress bar ── */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: 'left',
          position: 'fixed',
          top: 0,
          left: 0,
          height: 2,
          background: GOLD,
          zIndex: 1000,
          width: '100%',
        }}
      />

      {/* ── Fixed Nav ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8vw',
          height: 52,
          backgroundColor: navScrolled ? 'rgba(4,8,10,0.97)' : 'rgba(4,8,10,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${navScrolled ? BORDER_MID : BORDER}`,
          transition: 'background-color 0.3s, border-color 0.3s',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 28, width: 28, objectFit: 'contain' }} />
          <span style={{ fontFamily: DISPLAY, fontSize: 13, fontWeight: 900, letterSpacing: '0.08em', color: CREAM, textTransform: 'uppercase' }}>
            Zungu 2027
          </span>
        </button>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.id)}
              style={{
                fontFamily: MONO,
                fontSize: 9,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: MUTED,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Badge + Sign Out */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', whiteSpace: 'nowrap' }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 8,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: GOLD,
              border: `1px solid ${GOLD_DIM}`,
              padding: '4px 10px',
              fontWeight: 700,
            }}
          >
            Activity Programme
          </span>
          <a
            href="/sign-out"
            style={{
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: MUTED,
              textDecoration: 'none',
              fontWeight: 700,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
          >
            Sign Out
          </a>
        </div>
      </nav>

      {/* ── Side dot nav ── */}
      <div
        style={{
          position: 'fixed',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 800,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {SECTION_IDS.map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={id.charAt(0).toUpperCase() + id.slice(1)}
            style={{
              width: activeSection === id ? 8 : 6,
              height: activeSection === id ? 8 : 6,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              backgroundColor: activeSection === id ? GOLD : GOLD_DIM,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          paddingBottom: '8rem',
          paddingTop: 56,
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/photos/stage-beach-activities.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(4,8,10,0.98) 0%, rgba(4,8,10,0.55) 50%, rgba(4,8,10,0.2) 100%)',
          }}
        />
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(200,168,75,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'left', width: '100%', padding: '0 clamp(24px, 8vw, 112px)' }}>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: '0.45em',
              color: GOLD,
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '2rem',
            }}
          >
            Activity Programme · Navy Island · June 2027
          </p>

          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              color: CREAM,
            }}
          >
            EIGHT <span style={{ color: GOLD }}>WORLDS.</span>
            <br />
            ONE ISLAND.
          </h1>

          <p
            style={{
              fontFamily: MONO,
              fontSize: 'clamp(11px, 1.5vw, 14px)',
              color: MUTED,
              lineHeight: 1.9,
              maxWidth: 680,
              margin: '0 auto 3rem',
            }}
          >
            Six am to four am. Every zone running simultaneously. Nobody waiting. Nobody bored. Nobody doing the same thing as everyone else.
          </p>

          {/* Stats grid */}
          <div
            style={{
              display: 'inline-grid',
              gridTemplateColumns: 'repeat(4, auto)',
              gap: '1px',
              backgroundColor: BORDER_MID,
              border: `1px solid ${BORDER_MID}`,
            }}
          >
            {[
              { label: 'Location', value: '64 Acres, Navy Island' },
              { label: 'Format', value: '8 Simultaneous Zones' },
              { label: 'June 2027', value: '13–16 June · 4 Days' },
              { label: 'Capacity', value: '2,000–2,500 · 18+' },
            ].map((s) => (
              <div
                key={s.label}
                style={{ backgroundColor: 'rgba(4,8,10,0.85)', padding: '1.25rem 1rem', textAlign: 'center' }}
              >
                <p style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.35em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>
                  {s.label}
                </p>
                <p style={{ fontFamily: MONO, fontSize: 11, color: CREAM, fontWeight: 700 }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chapter 01 ── */}
      <ChapterDivider num="01" prefix="The Programme" title="Philosophy" />

      {/* ═══════════════════════════════════════════════════════════════════════
          PHILOSOPHY
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="philosophy" style={{ backgroundColor: BG, padding: '5rem clamp(24px, 8vw, 112px)' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Text column */}
          <div>
            <p
              style={{
                fontFamily: MONO,
                fontSize: 'clamp(12px, 1.4vw, 15px)',
                color: MUTED,
                lineHeight: 2.1,
                marginBottom: '2rem',
              }}
            >
              Every zone operates simultaneously. At any given hour, 2,000 adults are choosing their own experience — whether that is deep in the forest with a paintball rifle, suspended in a hammock listening to an ambient installation, sweating in a cold plunge at dawn, or dancing on the main stage at 3am. Nobody is ever waiting. Nobody is ever bored. Nobody is ever doing the same thing as everyone else.
            </p>
            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(13px, 1.6vw, 16px)',
                color: CREAM,
                lineHeight: 1.6,
                fontWeight: 700,
                letterSpacing: '-0.01em',
              }}
            >
              The island is the programme. The programme is the island.
            </p>
          </div>

          {/* Principles column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {PRINCIPLES.map((p, i) => (
              <FadeIn key={p.num} delay={i * 0.08}>
                <div
                  style={{
                    backgroundColor: GOLD_FAINT,
                    border: `1px solid ${BORDER_MID}`,
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      color: GOLD,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      whiteSpace: 'nowrap',
                      paddingTop: 2,
                    }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: 11,
                        fontWeight: 900,
                        color: CREAM,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: 6,
                      }}
                    >
                      {p.title}
                    </p>
                    <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.8 }}>{p.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chapter 02 ── */}
      <ChapterDivider num="02" prefix="Activity" title="Zones" />

      {/* ═══════════════════════════════════════════════════════════════════════
          ZONES
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="zones" style={{ backgroundColor: BG, padding: '5rem clamp(24px, 8vw, 112px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              backgroundColor: BORDER,
              border: `1px solid ${BORDER}`,
            }}
          >
            {ZONES.map((z, i) => (
              <FadeIn key={z.name} delay={i * 0.05}>
                <ZoneCard zone={z} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chapter 03 (light) ── */}
      <ChapterDivider num="03" prefix="The Daily" title="Schedule" light />

      {/* ═══════════════════════════════════════════════════════════════════════
          SCHEDULE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="schedule" style={{ backgroundColor: '#F0EAD8', padding: '5rem clamp(24px, 8vw, 112px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Hard rule cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
            {/* Card 1 — dark */}
            <div
              style={{
                backgroundColor: '#04080A',
                border: '1px solid rgba(200,168,75,0.18)',
                padding: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  letterSpacing: '0.35em',
                  color: GOLD,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Hard Boundary
              </p>
              <p
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                  fontWeight: 900,
                  color: CREAM,
                  letterSpacing: '-0.02em',
                  marginBottom: 10,
                }}
              >
                Activities close. Stages open.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.8 }}>
                All activity zones run 6am – 3:30pm only. From 4pm, the stages own the island.
              </p>
            </div>

            {/* Card 2 — day shape */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(4,8,10,0.1)',
                padding: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  letterSpacing: '0.35em',
                  color: '#04080A',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: 16,
                  opacity: 0.55,
                }}
              >
                Day Shape
              </p>
              {[
                { t: '5:30–7am', label: 'Early risers: Sanctum, coffee, water', bold: false },
                { t: '7am–12pm', label: 'Peak activity: all zones', bold: false },
                { t: '12–2pm', label: 'Midday: food, culture, The Yard', bold: false },
                { t: '2–3:30pm', label: 'Poetry & Spoken Word', bold: false },
                { t: '3:30–4pm', label: 'Wind-down', bold: false },
                { t: '4pm–4am', label: 'Stages only', bold: true },
              ].map((row) => (
                <div key={row.t} style={{ display: 'flex', gap: '1rem', marginBottom: 8, alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      color: GOLD,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      minWidth: 80,
                    }}
                  >
                    {row.t}
                  </span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      color: row.bold ? '#04080A' : 'rgba(4,8,10,0.6)',
                      fontWeight: row.bold ? 700 : 400,
                    }}
                  >
                    {row.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Day tabs */}
          <div
            style={{
              display: 'flex',
              gap: '2px',
              marginBottom: '2rem',
              backgroundColor: 'rgba(4,8,10,0.08)',
              padding: 4,
              width: 'fit-content',
            }}
          >
            {DAY_TABS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDay(d.id)}
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  padding: '10px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeDay === d.id ? '#04080A' : 'transparent',
                  color: activeDay === d.id ? GOLD : 'rgba(4,8,10,0.55)',
                  transition: 'all 0.2s',
                }}
              >
                {d.label}{' '}
                <span style={{ fontSize: 8, opacity: 0.7 }}>{d.sub}</span>
              </button>
            ))}
          </div>

          {/* Time grid */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              backgroundColor: 'rgba(4,8,10,0.1)',
              border: '1px solid rgba(4,8,10,0.1)',
            }}
          >
            {scheduleRows.map((row) => {
              const isStageRow = row.time === '4:00pm' || row.time === '12:00am';
              const isCloseRow = row.time === '3:30pm';
              return (
                <div
                  key={row.time + row.events[0]}
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    padding: '0.85rem 1.25rem',
                    backgroundColor: isStageRow
                      ? '#04080A'
                      : isCloseRow
                      ? 'rgba(200,168,75,0.08)'
                      : 'rgba(255,255,255,0.7)',
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: GOLD,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      minWidth: 64,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {row.time}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {row.events.map((ev) => (
                      <span
                        key={ev}
                        style={{
                          fontFamily: MONO,
                          fontSize: 11,
                          color: isStageRow ? CREAM : '#04080A',
                          fontWeight: isStageRow ? 700 : 400,
                          backgroundColor: isStageRow ? 'rgba(200,168,75,0.15)' : 'rgba(4,8,10,0.07)',
                          padding: '3px 10px',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Chapter 04 ── */}
      <ChapterDivider num="04" prefix="Wellness &" title="Recovery" />

      {/* ═══════════════════════════════════════════════════════════════════════
          WELLNESS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="wellness" style={{ backgroundColor: BG, padding: '5rem clamp(24px, 8vw, 112px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              backgroundColor: BORDER,
              border: `1px solid ${BORDER}`,
            }}
          >
            {WELLNESS_CARDS.map((w, i) => (
              <FadeIn key={w.title} delay={i * 0.05}>
                <WellnessCard card={w} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chapter 05 ── */}
      <ChapterDivider num="05" prefix="VIP" title="Tiers" />

      {/* ═══════════════════════════════════════════════════════════════════════
          VIP
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="vip" style={{ backgroundColor: BG, padding: '5rem clamp(24px, 8vw, 112px)' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {VIP_TIERS.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.1}>
              <div
                style={{
                  backgroundColor: tier.bg,
                  border: `1px solid ${tier.borderColor}`,
                  borderTop: tier.topAccent ? `3px solid ${GOLD}` : `1px solid ${tier.borderColor}`,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: 8,
                      letterSpacing: '0.45em',
                      color: GOLD_DIM,
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    {tier.label}
                  </p>
                  <p
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 16,
                      fontWeight: 900,
                      color: CREAM,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tier.name}
                  </p>
                </div>
                <div style={{ height: 1, backgroundColor: BORDER_MID }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {tier.items.map((item) => (
                    <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ color: GOLD, fontSize: 10, paddingTop: 2, flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.7 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Chapter 06 ── */}
      <ChapterDivider num="06" prefix="Our" title="Sustainability" />

      {/* ═══════════════════════════════════════════════════════════════════════
          SUSTAINABILITY
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="sustainability" style={{ backgroundColor: BG, padding: '5rem clamp(24px, 8vw, 112px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              backgroundColor: BORDER,
              border: `1px solid ${BORDER}`,
            }}
          >
            {SUSTAIN_ITEMS.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.05}>
                <SustainCard item={s} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer
        style={{
          backgroundColor: BG,
          borderTop: `1px solid ${BORDER_MID}`,
          padding: '3rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 900,
            color: 'rgba(200,168,75,0.07)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        >
          ZUNGU 2027
        </span>
        <div style={{ textAlign: 'right' }}>
          {[
            'Navy Island · Port Antonio · Jamaica',
            'June 13–16, 2027 · 18+ Adults Only',
            'Activity Programme · Confidential',
            'Not for Distribution',
          ].map((line) => (
            <p
              key={line}
              style={{
                fontFamily: MONO,
                fontSize: 9,
                color: MUTED,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                lineHeight: 2,
                opacity: 0.6,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ── Sub-components (avoid inline closures recreating on every render) ─────────

type Zone = typeof ZONES[0];
function ZoneCard({ zone }: { zone: Zone }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        backgroundColor: hovered ? GREEN : BG,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        minHeight: 260,
        transition: 'background-color 0.3s',
        height: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontSize: 28 }}>{zone.icon}</span>
      <div>
        <p style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 900, color: CREAM, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {zone.name}
        </p>
        <p style={{ fontFamily: MONO, fontSize: 9, color: GOLD, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>
          {zone.sub}
        </p>
      </div>
      <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.9, flex: 1 }}>{zone.desc}</p>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 8,
          letterSpacing: '0.3em',
          color: GOLD_DIM,
          textTransform: 'uppercase',
          borderTop: `1px solid ${BORDER_MID}`,
          paddingTop: '0.75rem',
          marginTop: 'auto',
          display: 'block',
        }}
      >
        {zone.tag}
      </span>
    </div>
  );
}

type WellnessCardData = typeof WELLNESS_CARDS[0];
function WellnessCard({ card }: { card: WellnessCardData }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        backgroundColor: hovered ? GREEN : BG,
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        minHeight: 220,
        transition: 'background-color 0.3s',
        height: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 700 }}>
        {card.time}
      </span>
      <p style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 900, color: CREAM, letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.3 }}>
        {card.title}
      </p>
      <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.85 }}>{card.desc}</p>
    </div>
  );
}

type SustainItem = typeof SUSTAIN_ITEMS[0];
function SustainCard({ item }: { item: SustainItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        backgroundColor: hovered ? GREEN : BG,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        minHeight: 180,
        transition: 'background-color 0.3s',
        height: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontFamily: MONO, fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: '0.2em' }}>{item.num}</span>
      <p style={{ fontFamily: DISPLAY, fontSize: 11, fontWeight: 900, color: CREAM, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.4 }}>
        {item.title}
      </p>
      <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.85 }}>{item.desc}</p>
    </div>
  );
}
