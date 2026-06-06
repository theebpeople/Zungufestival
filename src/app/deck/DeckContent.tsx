'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const IslandOverviewMap = dynamic(() => import('./maps/IslandOverviewMap'), { ssr: false });
const StageMap = dynamic(() => import('./maps/StageMap'), { ssr: false });

// ── Design tokens ─────────────────────────────────────────────────────────────
const bg    = '#04080A';
const gold  = '#C8A84B';
const teal  = '#4AAFA0';
const cream = '#F2EBD9';
const muted = 'rgba(242,235,217,0.45)';
const dim   = 'rgba(242,235,217,0.18)';
const rust  = '#C45A2A';

// ── Chapter tints (bg + accent per chapter) ───────────────────────────────────
const CHAPTERS: Record<string, { bg: string; accent: string; rgb: string }> = {
  '01': { bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  }, // gold   — brand
  '02': { bg: '#060410', accent: '#9B5FC0', rgb: '155,95,192'  }, // purple — meaning
  '03': { bg: '#030e06', accent: '#3AAF7A', rgb: '58,175,122'  }, // teal   — portantonio
  '04': { bg: '#060400', accent: '#D4722A', rgb: '212,114,42'  }, // rust   — island
  '05': { bg: '#040810', accent: '#4A8FBD', rgb: '74,143,189'  }, // blue   — jamaica
  '06': { bg: '#060410', accent: '#9B5FC0', rgb: '155,95,192'  }, // purple — stages
  '07': { bg: '#030e06', accent: '#3AAF7A', rgb: '58,175,122'  }, // teal   — sound
  '08': { bg: '#060400', accent: '#D4722A', rgb: '212,114,42'  }, // rust   — experience
  '09': { bg: '#040810', accent: '#4A8FBD', rgb: '74,143,189'  }, // blue   — programming
  '10': { bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  }, // gold   — opportunity (investor)
  '11': { bg: '#060410', accent: '#9B5FC0', rgb: '155,95,192'  }, // purple — accommodation (investor)
  '12': { bg: '#030e06', accent: '#3AAF7A', rgb: '58,175,122'  }, // teal   — commercial (investor)
  '13': { bg: '#060400', accent: '#D4722A', rgb: '212,114,42'  }, // rust   — financial (investor)
  '14': { bg: '#040810', accent: '#4A8FBD', rgb: '74,143,189'  }, // blue   — risk (investor)
  '15': { bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  }, // gold   — roadmap (investor)
  '16': { bg: '#060410', accent: '#9B5FC0', rgb: '155,95,192'  }, // purple — investor positioning
  'cta':{ bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  }, // gold
};

const fontDisplay = "'Unbounded', sans-serif";
const fontMono = "'Space Mono', monospace";

// ── Section IDs ───────────────────────────────────────────────────────────────
const SECTIONS = [
  'brand', 'meaning', 'portantonio', 'island', 'jamaica',
  'stages', 'sound', 'experience', 'programming',
  'opportunity', 'accommodation', 'commercial', 'financial', 'risk', 'roadmap',
  'investor', 'cta',
] as const;
type SectionId = typeof SECTIONS[number];

const ROLE_SECTIONS: Record<string, readonly SectionId[]> = {
  investor: [
    'brand', 'meaning', 'portantonio', 'island', 'jamaica',
    'stages', 'sound', 'experience', 'programming',
    'opportunity', 'accommodation', 'commercial', 'financial', 'risk', 'roadmap',
    'investor', 'cta',
  ],
  partner:  ['brand', 'meaning', 'portantonio', 'island', 'stages', 'sound', 'experience', 'programming', 'cta'],
  press:    ['brand', 'meaning', 'portantonio', 'island', 'jamaica', 'stages', 'sound', 'experience', 'programming', 'cta'],
};

const ROLE_CTA = {
  investor: {
    label: 'Request Briefing',
    title: 'What Zungu needs. From whom. When.',
    body: "We're talking to a small number of partners who fit. Tell us where you see yourself.",
  },
  partner: {
    label: 'Request Production Briefing',
    title: 'Ready to build this.',
    body: "We're looking for an experienced production partner with island or remote-venue experience. Tell us about your capacity.",
  },
  press: {
    label: 'Request Media Access',
    title: 'The story is ready.',
    body: "We're providing approved materials, approved facts, and accreditation details to a small number of media contacts. Tell us about your outlet.",
  },
} as const;

// ── Parallax photo break component ───────────────────────────────────────────
interface PhotoBreakProps {
  src: string;
  quote: string;
  label: string;
  height?: string | number;
}

function PhotoBreak({ src, quote, label, height = '70vh' }: PhotoBreakProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        height,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: `url('${src}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.7) brightness(0.35)',
          y: bgY,
        }}
      />
      {/* gradient — bottom fade */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,8,8,0.7) 0%, rgba(6,8,8,0) 50%)', zIndex: 1 }} />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 clamp(24px, 8vw, 120px)',
          width: '100%',
        }}
      >
        <p
          style={{
            fontFamily: fontMono,
            fontSize: 8,
            letterSpacing: '0.6em',
            textTransform: 'uppercase',
            color: gold,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: fontDisplay,
            fontSize: 'clamp(32px, 5.5vw, 72px)',
            fontWeight: 900,
            color: cream,
            lineHeight: 1.05,
          }}
        >
          {quote}
        </p>
      </div>
    </div>
  );
}

// ── Chapter divider ───────────────────────────────────────────────────────────
interface ChapterProps {
  num: string;
  eye: string;
  title: string;
  sub: string;
  accent?: string;
  chBg?: string;
  rgb?: string;
}

function ChapterDivider({ num, eye, title, sub, accent = gold, chBg = bg, rgb = '200,168,75' }: ChapterProps) {
  return (
    <div style={{
      width: '100%', boxSizing: 'border-box',
      borderTop: '1px solid rgba(200,168,75,0.07)',
      padding: '80px 8vw 40px',
      display: 'flex', alignItems: 'flex-start', gap: '3rem',
      position: 'relative',
    }}>
      {/* Radial gradient */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 70% at 90% 15%, rgba(${rgb},.11) 0%, transparent 60%)`, pointerEvents: 'none' }} />
      {/* Ghost number */}
      <div className="chapter-ghost" style={{ color: accent, opacity: 0.08, position: 'relative', zIndex: 1 }}>{num}</div>
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div className="chapter-label">
          <span className="chapter-line" style={{ background: accent }} />
          <span className="t-label" style={{ color: accent }}>{eye}</span>
        </div>
        <h2 className="t-h2 t-display" style={{ color: accent, letterSpacing: '-0.02em' }}>{title}</h2>
        <p className="t-body" style={{ marginTop: 10, maxWidth: 540 }}>{sub}</p>
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
interface SectionProps {
  id?: string;
  children: React.ReactNode;
  sectionBg?: string;
  accent?: string;
  rgb?: string;
  style?: React.CSSProperties;
}

function Section({ id, children, sectionBg = bg, accent = gold, rgb = '200,168,75', style }: SectionProps) {
  return (
    <section
      id={id ? `section-${id}` : undefined}
      className="section section--tall"
      style={{ position: 'relative', background: 'transparent', ...style }}
    >
      {/* Radial gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 55% at 5% 95%, rgba(${rgb},.08) 0%, transparent 55%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </section>
  );
}

// ── Chapter photo wrapper ─────────────────────────────────────────────────────
interface ChapterWrapProps {
  bg: string;
  photo: string;
  children: React.ReactNode;
}
function ChapterWrap({ bg, photo, children }: ChapterWrapProps) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: bg }}>
      <img src={photo} alt="" aria-hidden style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        objectFit: 'cover', objectPosition: 'center',
        opacity: 0.32, filter: 'saturate(0.5) brightness(0.4)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to right, ${bg} 28%, ${bg}ee 50%, transparent 82%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ── Quote block ───────────────────────────────────────────────────────────────
interface QuoteBlockProps {
  quote: string;
  attr: string;
}

function QuoteBlock({ quote, attr }: QuoteBlockProps) {
  return (
    <div className="quote-block" style={{ margin: '48px 0', maxWidth: 680 }}>
      <p className="quote-text" style={{ marginBottom: 14 }}>&ldquo;{quote}&rdquo;</p>
      <p className="quote-attr">— {attr}</p>
    </div>
  );
}

// ── Body text ─────────────────────────────────────────────────────────────────
function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="t-body" style={{ maxWidth: 680, marginBottom: 18 }}>{children}</p>
  );
}

// ── Section label + title ─────────────────────────────────────────────────────
interface SectionHeadProps {
  label?: string;
  title: string;
  titleColor?: string;
  goldLine?: string;
  accent?: string;
}

function SectionHead({ label, title, titleColor = cream, goldLine, accent = gold }: SectionHeadProps) {
  return (
    <div style={{ marginBottom: 36 }}>
      {label && (
        <div className="s-label" style={{ marginBottom: 36 }}>
          <span className="chapter-line" style={{ background: accent }} />
          <span className="t-label" style={{ color: accent }}>{label}</span>
        </div>
      )}
      <h3 className="t-h2 t-display" style={{ color: titleColor, letterSpacing: '-0.025em', lineHeight: 1.02, marginBottom: 28 }}>
        {title}
        {goldLine && (<><br /><span style={{ color: accent }}>{goldLine}</span></>)}
      </h3>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DeckContent({ navLabel = 'INVESTOR DECK', role = 'investor' }: { navLabel?: string; role?: string }) {
  const safeRole = role === 'investor' || role === 'partner' || role === 'press' ? role : 'partner';
  const visibleSections = ROLE_SECTIONS[safeRole];
  const ctaCopy = ROLE_CTA[safeRole];
  // Refs for section scroll targets
  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>> = {
    brand: useRef<HTMLElement>(null),
    meaning: useRef<HTMLElement>(null),
    portantonio: useRef<HTMLElement>(null),
    island: useRef<HTMLElement>(null),
    jamaica: useRef<HTMLElement>(null),
    stages: useRef<HTMLElement>(null),
    sound: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    programming: useRef<HTMLElement>(null),
    opportunity: useRef<HTMLElement>(null),
    accommodation: useRef<HTMLElement>(null),
    commercial: useRef<HTMLElement>(null),
    financial: useRef<HTMLElement>(null),
    risk: useRef<HTMLElement>(null),
    roadmap: useRef<HTMLElement>(null),
    investor: useRef<HTMLElement>(null),
    cta: useRef<HTMLElement>(null),
  };

  // Nav ref for section scrolls
  const navRefs = {
    brand: useRef<HTMLDivElement>(null),
    meaning: useRef<HTMLDivElement>(null),
    portantonio: useRef<HTMLDivElement>(null),
    island: useRef<HTMLDivElement>(null),
    jamaica: useRef<HTMLDivElement>(null),
    stages: useRef<HTMLDivElement>(null),
    sound: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    programming: useRef<HTMLDivElement>(null),
    opportunity: useRef<HTMLDivElement>(null),
    accommodation: useRef<HTMLDivElement>(null),
    commercial: useRef<HTMLDivElement>(null),
    financial: useRef<HTMLDivElement>(null),
    risk: useRef<HTMLDivElement>(null),
    roadmap: useRef<HTMLDivElement>(null),
    investor: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null),
  };

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Active dot nav
  const [activeSection, setActiveSection] = useState<SectionId>('brand');

  // Mobile nav
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Briefing modal
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [briefingRole, setBriefingRole] = useState<string | null>(null);
  const [briefingName, setBriefingName] = useState('');
  const [briefingOrg, setBriefingOrg] = useState('');
  const [briefingEmail, setBriefingEmail] = useState('');
  const [briefingMessage, setBriefingMessage] = useState('');
  const [briefingSubmitted, setBriefingSubmitted] = useState(false);
  const [briefingSubmitting, setBriefingSubmitting] = useState(false);

  function openBriefing() {
    setBriefingRole(null);
    setBriefingName(''); setBriefingOrg(''); setBriefingEmail(''); setBriefingMessage('');
    setBriefingSubmitted(false);
    setBriefingOpen(true);
  }

  async function submitBriefing(e: React.FormEvent) {
    e.preventDefault();
    setBriefingSubmitting(true);
    try {
      await fetch('/api/partner-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: briefingRole, name: briefingName, org: briefingOrg, email: briefingEmail, message: briefingMessage }),
      });
    } catch {}
    setBriefingSubmitting(false);
    setBriefingSubmitted(true);
  }

  const BRIEFING_ROLES = [
    { role: 'investor',  label: 'Investor',              sub: 'Fund deck · financials · equity structure', photo: '/photos/port-antonio-aerial.jpeg' },
    { role: 'partner',   label: 'Production Partners',   sub: 'Staging · logistics · production brief',   photo: '/photos/navy-island-wide.png' },
    { role: 'press',     label: 'Press',                 sub: 'Media kit · assets · press contacts',       photo: '/photos/port-antonio.jpg' },
  ];

  // Desktop dropdown nav
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const rawNavGroups: { label: string; items: [string, SectionId][] }[] = [
    { label: 'Brand', items: [['What Is Zungu?', 'brand'], ['What Does Zungu Mean?', 'meaning']] },
    { label: 'The Island', items: [['Port Antonio', 'portantonio'], ['The Island', 'island'], ['Why Jamaica?', 'jamaica']] },
    { label: 'The Festival', items: [['The Stages', 'stages'], ['The Sound', 'sound'], ['The Experience', 'experience'], ['Programming', 'programming']] },
    { label: 'Investment', items: [
      ['The Opportunity', 'opportunity'],
      ['Where You Stay', 'accommodation'],
      ['Commercial Model', 'commercial'],
      ['Year One Financials', 'financial'],
      ['Risk & Execution', 'risk'],
      ['Roadmap', 'roadmap'],
      ['Investor Positioning', 'investor'],
      ['Request Briefing', 'cta'],
    ]},
  ];
  const navGroups = rawNavGroups
    .map(group => ({ ...group, items: group.items.filter(([, id]) => visibleSections.includes(id)) }))
    .filter(group => group.items.length > 0);

  // CTA form state
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formOrg, setFormOrg] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Hero scale animation
  const [heroScale, setHeroScale] = useState(1.05);
  useEffect(() => {
    const t = setTimeout(() => setHeroScale(1), 80);
    return () => clearTimeout(t);
  }, []);

  // IntersectionObserver for dot nav
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    visibleSections.forEach((id) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollToSection(id: SectionId) {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToCta() { openBriefing(); }

  const navLinkStyle: React.CSSProperties = {
    fontSize: 9,
    padding: '4px 0',
    textDecoration: 'none',
    color: muted,
  };

  const navLinks: [string, SectionId][] = [
    ['What Is Zungu?', 'brand'],
    ['What Does Zungu Mean?', 'meaning'],
    ['Port Antonio', 'portantonio'],
    ['The Island', 'island'],
    ['Why Jamaica?', 'jamaica'],
    ['The Stages', 'stages'],
    ['The Sound', 'sound'],
    ['The Experience', 'experience'],
    ['Programming', 'programming'],
    ['The Opportunity', 'opportunity'],
    ['Where You Stay', 'accommodation'],
    ['Commercial Model', 'commercial'],
    ['Year One Financials', 'financial'],
    ['Risk & Execution', 'risk'],
    ['Roadmap', 'roadmap'],
    ['Investor Positioning', 'investor'],
  ];

  return (
    <div className="page" style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>

      {/* ── Briefing modal ──────────────────────────────────────────────── */}
      {briefingOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 980, backgroundColor: 'rgba(6,8,8,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', overflowY: 'auto', fontFamily: "'Space Mono', monospace" }}>
          {/* Dim aerial bg */}
          <div style={{ position: 'fixed', inset: 0, backgroundImage: "url('/photos/navy-island-aerial-hq.png')", backgroundSize: 'cover', backgroundPosition: 'center 40%', filter: 'saturate(0.5) brightness(0.1)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 50% 35%, rgba(6,8,8,0.5) 0%, rgba(6,8,8,0.92) 70%)', pointerEvents: 'none', zIndex: 0 }} />

          {/* Close */}
          <button onClick={() => setBriefingOpen(false)} style={{ position: 'fixed', top: 24, right: 28, zIndex: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: 20, color: muted, lineHeight: 1 }}>✕</button>

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 2rem 4rem', minHeight: '100vh' }}>

            {/* Branding */}
            <img src="/zungu-z-mark.png" alt="Zungu" style={{ width: 60, marginBottom: '1.5rem', filter: 'drop-shadow(0 0 24px rgba(200,168,75,0.45))' }} />
            <p style={{ fontSize: 8, letterSpacing: '0.55em', color: gold, textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-block', width: 20, height: 1, background: gold }} />
              Navy Island · Port Antonio · Jamaica · June 17–23, 2027
              <span style={{ display: 'inline-block', width: 20, height: 1, background: gold }} />
            </p>
            <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: cream, lineHeight: 1, textTransform: 'uppercase', marginBottom: '0.15rem' }}>REQUEST</h2>
            <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: gold, lineHeight: 1, textTransform: 'uppercase', marginBottom: '2.5rem' }}>BRIEFING</h2>

            {briefingSubmitted ? (
              <div style={{ textAlign: 'center', maxWidth: 480 }}>
                <div style={{ width: 48, height: 1, background: gold, margin: '0 auto 2rem' }} />
                <p style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(1.1rem, 4vw, 1.8rem)', fontWeight: 900, color: cream, marginBottom: '1rem' }}>Enquiry received.</p>
                <p style={{ fontSize: 13, color: muted, lineHeight: 1.9, marginBottom: '2rem' }}>The team will respond with the appropriate material for your access level. The next step is a conversation, not a commitment.</p>
                <button onClick={() => setBriefingOpen(false)} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, padding: '14px 32px', background: gold, color: bg, border: 'none', cursor: 'pointer' }}>Back to Deck ←</button>
              </div>
            ) : !briefingRole ? (
              <>
                <p style={{ fontSize: 9, letterSpacing: '0.4em', color: muted, textTransform: 'uppercase', marginBottom: '2rem' }}>Select your access type</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, maxWidth: 900, width: '100%' }}>
                  {BRIEFING_ROLES.map(({ role, label, sub, photo }) => (
                    <button key={role} onClick={() => setBriefingRole(role)} style={{ position: 'relative', overflow: 'hidden', height: 200, border: '1px solid rgba(200,168,75,0.12)', background: 'none', cursor: 'pointer', textAlign: 'left', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.5)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.12)'; }}
                    >
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${photo}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.6) brightness(0.22)', transition: 'filter 0.3s' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,8,8,0.96) 0%, rgba(6,8,8,0.3) 100%)' }} />
                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <p style={{ fontSize: 8, letterSpacing: '0.3em', color: muted, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{sub}</p>
                        <p style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', color: cream }}>{label}</p>
                        <p style={{ fontSize: 9, letterSpacing: '0.3em', color: gold, textTransform: 'uppercase', fontWeight: 700, marginTop: '0.75rem' }}>Select →</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ width: '100%', maxWidth: 520 }}>
                <button onClick={() => setBriefingRole(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, letterSpacing: '0.3em', color: muted, textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem', display: 'block' }}>← Change access type</button>
                <p style={{ fontSize: 9, letterSpacing: '0.4em', color: gold, textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem' }}>
                  // {BRIEFING_ROLES.find(r => r.role === briefingRole)?.label.toUpperCase()} BRIEFING REQUEST
                </p>
                <form onSubmit={submitBriefing} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Name', value: briefingName, set: setBriefingName, placeholder: 'Your full name', required: true },
                    { label: 'Organisation', value: briefingOrg, set: setBriefingOrg, placeholder: 'Company / fund / publication', required: false },
                    { label: 'Email', value: briefingEmail, set: setBriefingEmail, placeholder: 'your@email.com', required: true },
                  ].map(({ label, value, set, placeholder, required }) => (
                    <div key={label}>
                      <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: 8 }}>{label}</label>
                      <input
                        type={label === 'Email' ? 'email' : 'text'}
                        value={value}
                        onChange={e => set(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(18,24,20,0.97)', border: '1px solid rgba(200,168,75,0.35)', color: cream, fontFamily: "'Space Mono', monospace", fontSize: 14, padding: '12px 14px', outline: 'none' }}
                        onFocus={e => { e.target.style.borderColor = gold; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(200,168,75,0.35)'; }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: 8 }}>Message</label>
                    <textarea
                      value={briefingMessage}
                      onChange={e => setBriefingMessage(e.target.value)}
                      placeholder="Tell us about your interest..."
                      rows={4}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(18,24,20,0.97)', border: '1px solid rgba(200,168,75,0.35)', color: cream, fontFamily: "'Space Mono', monospace", fontSize: 14, padding: '12px 14px', outline: 'none', resize: 'vertical' }}
                      onFocus={e => { e.target.style.borderColor = gold; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(200,168,75,0.35)'; }}
                    />
                  </div>
                  <button type="submit" disabled={briefingSubmitting} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, padding: '16px 32px', background: briefingSubmitting ? 'rgba(200,168,75,0.5)' : gold, color: bg, border: 'none', cursor: briefingSubmitting ? 'default' : 'pointer', marginTop: 8 }}>
                    {briefingSubmitting ? 'Sending...' : 'Submit Enquiry →'}
                  </button>
                  <p style={{ fontSize: 9, letterSpacing: '0.15em', color: muted, textAlign: 'center', marginTop: 8 }}>Access by invitation only · <a href="mailto:partnership@zungufestival.com" style={{ color: gold, textDecoration: 'none' }}>partnership@zungufestival.com</a></p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Scroll progress bar ──────────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: gold,
          scaleX,
          transformOrigin: 'left',
          zIndex: 1000,
        }}
      />

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="nav" style={{ gap: 16 }} onMouseLeave={() => setOpenDropdown(null)}>
        {/* Left: Z-mark */}
        <div style={{ flexShrink: 0 }}>
          <img
            src="/zungu-z-mark.png"
            style={{ height: 30, filter: 'drop-shadow(0 0 10px rgba(200,168,75,.3))', display: 'block' }}
            alt="Zungu"
          />
        </div>

        {/* Center: dropdown nav groups — hidden on mobile */}
        <div className="deck-chapter-links" style={{ gap: 0 }}>
          {navGroups.map((group) => (
            <div
              key={group.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => setOpenDropdown(group.label)}
            >
              <button
                className="nav-link"
                style={{ fontSize: 9, padding: '4px 10px', color: muted, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Space Mono', monospace" }}
              >
                {group.label} ▾
              </button>
              {openDropdown === group.label && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  minWidth: 200,
                  backgroundColor: 'rgba(6,8,8,0.97)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid rgba(200,168,75,0.12)`,
                  padding: '8px 0',
                  zIndex: 900,
                }}>
                  {group.items.map(([label, id]) => (
                    <button
                      key={id}
                      onClick={() => { scrollToSection(id); setOpenDropdown(null); }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '9px 18px',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 9,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: muted,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = String(muted); }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* External links */}
          <a href={`/activities?role=${safeRole}`} className="nav-link" style={{ fontSize: 9, padding: '4px 10px', color: muted, textDecoration: 'none', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Activities</a>
          <a href={`/stages?role=${safeRole}`} className="nav-link" style={{ fontSize: 9, padding: '4px 10px', color: muted, textDecoration: 'none', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Stages</a>
        </div>

        {/* Right: badge + sign out (desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
          <span className="deck-nav-desktop nav-tag">{navLabel.toUpperCase()}</span>
          <a
            href="/sign-out"
            className="deck-nav-desktop nav-link"
            style={{ textDecoration: 'none' }}
          >
            Sign Out
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="deck-hamburger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 2px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{ display: 'block', width: 22, height: 2, background: muted, borderRadius: 0 }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ──────────────────────────────────────── */}
      <style>{`
        @media (min-width: 901px) {
          .deck-hamburger { display: none !important; }
        }
        @media (max-width: 900px) {
          .deck-nav-desktop { display: none !important; }
        }
        body { cursor: crosshair; }
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.5;
        }
      `}</style>

      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 950,
            backgroundColor: 'rgba(6,8,8,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            gap: 0,
          }}
        >
          {/* Close */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              background: 'none',
              border: 'none',
              color: muted,
              fontSize: 22,
              cursor: 'pointer',
              fontFamily: fontMono,
            }}
          >
            ✕
          </button>

          {/* Logo */}
          <img
            src="/zungu-z-mark.png"
            alt="Zungu"
            style={{ width: 48, height: 48, objectFit: 'contain', marginBottom: 40, filter: 'drop-shadow(0 0 16px rgba(200,168,75,0.3))' }}
          />

          {/* Chapter groups */}
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%', marginBottom: 40 }}>
            {navGroups.map((group) => (
              <div key={group.label} style={{ width: '100%', borderBottom: `1px solid ${dim}` }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: gold, padding: '14px 0 4px', textAlign: 'center' }}>{group.label}</div>
                {group.items.map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}
                    style={{
                      fontFamily: fontDisplay,
                      fontSize: 'clamp(1.1rem, 5vw, 1.6rem)',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      color: cream,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px 0',
                      width: '100%',
                      textAlign: 'center',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = cream; }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={() => { scrollToCta(); setMobileMenuOpen(false); }}
            style={{
              fontFamily: fontMono,
              fontSize: 12,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '14px 32px',
              background: gold,
              color: bg,
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              maxWidth: 320,
              marginBottom: 16,
            }}
          >
            {ctaCopy.label} →
          </button>

          <div style={{ display: 'flex', gap: 24, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['Activities', `/activities?role=${safeRole}`], ['Stages', `/stages?role=${safeRole}`], ['Sign Out', '/sign-out']].map(([label, href]) => (
              <a key={href} href={href} style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: muted, textDecoration: 'none', fontWeight: 700 }}>{label}</a>
            ))}
          </div>
        </div>
      )}

      {/* ── Side dots ───────────────────────────────────────────────────── */}
      <div className="side-dots">
        {visibleSections.map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            title={id}
            className={activeSection === id ? 'side-dot side-dot--active' : 'side-dot'}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          height: '100vh',
          minHeight: 600,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/photos/navy-island-aerial-hq.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.7) brightness(0.45)',
            transform: `scale(${heroScale})`,
            transition: 'transform 1.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${bg} 0%, rgba(6,8,8,0.55) 40%, rgba(6,8,8,0.1) 100%)`,
          }}
        />

        {/* Hero content — centered */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '52px 8vw 120px',
            width: '100%',
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: gold }} />
            <p
              style={{
                fontFamily: fontMono,
                fontSize: 9,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: gold,
                fontWeight: 700,
              }}
            >
              Navy Island · Port Antonio · Jamaica · Target Window: June 17–23, 2027
            </p>
            <div style={{ width: 32, height: 1, background: gold }} />
          </div>

          {/* Z-mark */}
          <img src="/zungu-z-mark.png" width={110} style={{ marginBottom: 24, display: 'block' }} alt="Zungu" />

          {/* H1 */}
          <h1
            style={{
              fontFamily: fontDisplay,
              fontSize: 'clamp(58px, 11.5vw, 155px)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: cream,
              margin: 0,
            }}
          >
            ZUNGU<br />
            <span style={{ color: gold }}>FESTIVAL</span>
          </h1>

          {/* Year */}
          <p
            style={{
              fontFamily: fontDisplay,
              fontWeight: 300,
              fontSize: 'clamp(14px, 2.2vw, 26px)',
              color: dim,
              letterSpacing: '0.3em',
              marginTop: 16,
              marginBottom: 32,
            }}
          >
            MMXXVII
          </p>

          {/* Tagline */}
          <p
            style={{
              fontFamily: fontMono,
              fontSize: 'clamp(12px, 1.4vw, 16px)',
              color: muted,
              lineHeight: 1.8,
              maxWidth: 520,
              marginBottom: 8,
            }}
          >
            For one week, the most beautiful place on earth welcomes you to Zungu.
          </p>

          {/* Sub */}
          <p
            style={{
              fontFamily: fontMono,
              fontSize: 'clamp(11px, 1.2vw, 14px)',
              color: muted,
              lineHeight: 1.8,
              maxWidth: 480,
              marginBottom: 40,
            }}
          >
            Where the magic of sound, sea, sand, movement, and Caribbean rhythm invites you into the ultimate electronic music experience.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={scrollToCta}
              style={{
                fontFamily: fontMono,
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '14px 28px',
                background: gold,
                color: bg,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Request Briefing →
            </button>
            <button
              onClick={() => scrollToSection('brand')}
              style={{
                fontFamily: fontMono,
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '14px 28px',
                background: 'transparent',
                color: cream,
                border: `1px solid ${dim}`,
                cursor: 'pointer',
              }}
            >
              Explore ↓
            </button>
          </div>
        </div>

        {/* Stats bar — absolutely pinned to hero bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            padding: '20px 8vw',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid rgba(200,168,75,0.08)`,
          }}
        >
          {[
              ['64', 'Acres', 'Private Island'],
              ['5,000', 'Tickets', 'Year 1'],
              ['7', 'Days', '6 Nights'],
              ['Jun 17', 'Opens', '2027'],
            ].map(([num, label, sub], i, arr) => (
              <React.Fragment key={label}>
                <div>
                  <span
                    style={{
                      fontFamily: fontDisplay,
                      fontSize: 'clamp(14px, 2vw, 24px)',
                      fontWeight: 900,
                      color: gold,
                      display: 'block',
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontFamily: fontMono,
                      fontSize: 9,
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: cream,
                      fontWeight: 700,
                      display: 'block',
                      marginTop: 4,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: fontMono,
                      fontSize: 8,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: muted,
                      display: 'block',
                    }}
                  >
                    {sub}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 1, height: 32, background: 'rgba(200,168,75,0.1)', flexShrink: 0 }} />
                )}
              </React.Fragment>
            ))}
        </div>
      </section>

      {/* ═══ CHAPTER 01: WHAT IS ZUNGU? ═══ */}
      <ChapterWrap bg={CHAPTERS['01'].bg} photo="/photos/navy-island-aerial.jpg">
        <ChapterDivider num="01" eye="Chapter One" title="What Is Zungu?" sub="A private-island electronic music festival in Port Antonio, Jamaica. But not just an event on an island." accent={CHAPTERS['01'].accent} chBg={CHAPTERS['01'].bg} rgb={CHAPTERS['01'].rgb} />
        <Section id="brand" sectionBg={CHAPTERS['01'].bg} accent={CHAPTERS['01'].accent} rgb={CHAPTERS['01'].rgb}>
          <SectionHead label="What Is Zungu?" title="An entire island in rhythm." accent={CHAPTERS['01'].accent} />
          <div style={{ maxWidth: 880, marginBottom: 32 }}>
            {[
              { text: 'Zungu is a private-island electronic music festival in Port Antonio, Jamaica.', weight: 300 },
              { text: 'But it is not just an event on an island.', weight: 400 },
              { text: 'It is what happens when an entire island moves in rhythm — stages, people, sound, food, water, art, light, culture, and night coming together as one living world.', weight: 300 },
            ].map(({ text, weight }) => (
              <p key={text} style={{ fontFamily: fontDisplay, fontSize: 'clamp(15px, 2.2vw, 26px)', fontWeight: weight, lineHeight: 1.5, color: cream, marginBottom: 8 }}>{text}</p>
            ))}
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(20px, 3vw, 38px)', fontWeight: 700, lineHeight: 1.3, color: gold, marginTop: 20 }}>For one week, Navy Island becomes Zungu.</p>
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_AERIAL_vaapz1.png" quote="An entire island. One week. Everything in rhythm." label="Zungu · Navy Island · Jamaica" />

      {/* ═══ CHAPTER 02: WHAT DOES ZUNGU MEAN? ═══ */}
      <ChapterWrap bg={CHAPTERS['02'].bg} photo="/photos/navy-island-port-antonio.jpeg">
        <ChapterDivider num="02" eye="Chapter Two" title="What Does Zungu Mean?" sub="The name borrows its pulse from Yellowman — one of dancehall's most iconic sounds." accent={CHAPTERS['02'].accent} chBg={CHAPTERS['02'].bg} rgb={CHAPTERS['02'].rgb} />
        <Section id="meaning" sectionBg={CHAPTERS['02'].bg} accent={CHAPTERS['02'].accent} rgb={CHAPTERS['02'].rgb}>
          <SectionHead label="What Does Zungu Mean?" title="Everything in rhythm." accent={CHAPTERS['02'].accent} />
          <div style={{ maxWidth: 800, marginBottom: 32 }}>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 20 }}>Zungu begins with rhythm.</p>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 20 }}>The name borrows its pulse from Yellowman&apos;s &ldquo;Zungguzungguguzungguzeng&rdquo; — one of dancehall&apos;s most iconic sounds. A phrase built from energy, instinct, repetition, and movement.</p>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 20 }}>It does not need to be translated to be felt.</p>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: cream, fontWeight: 700, lineHeight: 1.9, marginBottom: 12 }}>For Zungu, the meaning is simple:</p>
            {['Everything in rhythm.', 'The crowd.', 'The bass.', 'The island.', 'The night.', 'The culture.', 'The world coming back to Jamaica.'].map((line, i) => (
              <p key={i} style={{ fontFamily: fontDisplay, fontSize: i === 0 ? 'clamp(18px, 2.5vw, 30px)' : 'clamp(14px, 1.8vw, 22px)', fontWeight: i === 0 ? 700 : 300, color: i === 0 ? cream : muted, lineHeight: 1.4, margin: '6px 0' }}>{line}</p>
            ))}
          </div>
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${dim}` }}>
            <SectionHead label="The Brand Thesis" title="Jamaica gave the world rhythm." goldLine="Zungu brings it home." accent={CHAPTERS['02'].accent} />
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 780, marginBottom: 20 }}>From sound systems to dub, dancehall, bass culture, remix culture, MC culture, jungle, drum and bass, dubstep, and global club music — Jamaica&apos;s influence has moved through the world for decades.</p>
            <QuoteBlock quote="A Jamaican-born electronic music destination built for the world." attr="Core Brand Positioning" />
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_FROM_THE_SEA_twhi0w.png" quote="Jamaica gave the world rhythm. Zungu brings it home." label="The Brand · Port Antonio" />

      {/* ═══ CHAPTER 03: PORT ANTONIO ═══ */}
      <ChapterWrap bg={CHAPTERS['03'].bg} photo="/photos/port-antonio.jpg">
        <ChapterDivider num="03" eye="Chapter Three" title="Port Antonio." sub="The ecosystem behind the island." accent={CHAPTERS['03'].accent} chBg={CHAPTERS['03'].bg} rgb={CHAPTERS['03'].rgb} />
        <Section id="portantonio" sectionBg={CHAPTERS['03'].bg} accent={CHAPTERS['03'].accent} rgb={CHAPTERS['03'].rgb}>
          <SectionHead label="Port Antonio" title="The ecosystem behind the island." accent={CHAPTERS['03'].accent} />
          <div style={{ maxWidth: 880, marginBottom: 32 }}>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>Zungu is anchored on Navy Island, but Port Antonio powers the experience. The town supplies the ecosystem: boats, drivers, hotels, villas, guest houses, restaurants, bars, guides, vendors, food suppliers, production crew, wellness practitioners, artists, and mainland activations.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: cream, lineHeight: 1.3, marginBottom: 8 }}>Navy Island is the world.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: CHAPTERS['03'].accent, lineHeight: 1.3, marginBottom: 24 }}>Port Antonio is the heartbeat behind it.</p>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 8 }}>This is not charity language. It is business logic.</p>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9 }}>The stronger Port Antonio is inside the model, the more locally defensible Zungu becomes.</p>
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/port-antonio-aerial.jpeg" quote="The ecosystem that makes everything possible." label="Port Antonio · Portland Parish" />

      {/* ═══ CHAPTER 04: THE ISLAND ═══ */}
      <ChapterWrap bg={CHAPTERS['04'].bg} photo="/photos/navy-island-aerial-hq.png">
        <ChapterDivider num="04" eye="Chapter Four" title="The Island." sub="Navy Island. Port Antonio, Jamaica. 64 acres. The site that makes everything possible." accent={CHAPTERS['04'].accent} chBg={CHAPTERS['04'].bg} rgb={CHAPTERS['04'].rgb} />
        <Section id="island" sectionBg={CHAPTERS['04'].bg} accent={CHAPTERS['04'].accent} rgb={CHAPTERS['04'].rgb}>
          <SectionHead label="The Island" title="Navy Island is the scenery." accent={CHAPTERS['04'].accent} />
          <div style={{ maxWidth: 880, marginBottom: 32 }}>
            {[
              { text: 'It is where the world of Zungu comes alive and the magic of the experience begins.', weight: 300 },
              { text: 'For one week, the island becomes the festival.', weight: 400 },
            ].map(({ text, weight }) => (
              <p key={text} style={{ fontFamily: fontDisplay, fontSize: 'clamp(15px, 2.2vw, 26px)', fontWeight: weight, lineHeight: 1.5, color: cream, marginBottom: 8 }}>{text}</p>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, margin: '32px 0' }}>
              {['The forest becomes movement.', 'The water becomes atmosphere.', 'The stages become landmarks.', 'The night becomes ritual.', 'The island becomes sound.'].map((line) => (
                <div key={line} style={{ border: `1px solid rgba(212,114,42,0.1)`, padding: '22px 20px', background: 'rgba(14,24,18,0.8)' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(13px, 1.6vw, 18px)', fontWeight: 600, color: cream, lineHeight: 1.3, margin: 0 }}>{line}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 8 }}>This is not a field with a stage on it.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(20px, 3vw, 38px)', fontWeight: 700, lineHeight: 1.3, color: CHAPTERS['04'].accent }}>This is an entire island transformed.</p>
          </div>
        </Section>
        <Section sectionBg={CHAPTERS['04'].bg} accent={CHAPTERS['04'].accent} rgb={CHAPTERS['04'].rgb}>
          <SectionHead label="Marina → Island Crossing Overview" title="The crossing." accent={CHAPTERS['04'].accent} />
          <IslandOverviewMap />
        </Section>
        <Section sectionBg={CHAPTERS['04'].bg} accent={CHAPTERS['04'].accent} rgb={CHAPTERS['04'].rgb}>
          <SectionHead label="Stage Placement · Navy Island" title="Three stages. One island." accent={CHAPTERS['04'].accent} />
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 680, marginBottom: 28 }}>Provisional placement across the island&apos;s natural terrain. Stages face the sea — not the town. Final positioning subject to site survey.</p>
          <div style={{ marginBottom: 32 }}><StageMap /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 40px', marginBottom: 48 }}>
            {[{ color: gold, name: 'ZUNGU MAIN', sub: 'Centre Island · Mainstage' }, { color: teal, name: 'ORIGINS', sub: 'Sunrise Stage · Earth Sound' }, { color: rust, name: 'REBIRTH', sub: 'Sunset Stage · Underground House' }, { color: dim, name: 'ARRIVAL DOCK', sub: '~5 min from Errol Flynn Marina' }].map(({ color, name, sub }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <div>
                  <span style={{ fontFamily: fontMono, fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: color === dim ? muted : cream, display: 'block' }}>{name}</span>
                  <span style={{ fontFamily: fontMono, fontSize: 8, color: muted, letterSpacing: '0.15em' }}>{sub}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Aerial video */}
          <div style={{ position: 'relative', marginBottom: 4 }}>
            <video autoPlay muted loop playsInline poster="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/island-stages-aerial_zxjfag.png" style={{ width: '100%', display: 'block', filter: 'saturate(0.8) brightness(0.8)' }}>
              <source src="https://res.cloudinary.com/elektricbangaz/video/upload/v1780459541/aerial-view-from-navy-island-to-port-antonio-town-2026-01-21-22-41-54-utc_kbpltd.mp4" type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(6,8,8,0.85) 0%, rgba(6,8,8,0) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span style={{ fontFamily: fontMono, fontSize: 9, color: cream, letterSpacing: '0.2em', textTransform: 'uppercase' }}>NAVY ISLAND — Aerial · Port Antonio to Navy Island</span>
              <span style={{ fontFamily: fontMono, fontSize: 8, color: muted, letterSpacing: '0.15em' }}>Portland Parish · 2026</span>
            </div>
          </div>
          {/* Real Navy Island photos only */}
          {[
            { src: '/photos/navy-island-aerial-hq.png', label: 'NAVY ISLAND — Aerial View', sub: '64 acres · Port Antonio · Jamaica' },
            { src: '/photos/navy-island-satellite.png', label: 'NAVY ISLAND — Satellite Overview', sub: 'Caribbean · Portland Parish' },
            { src: '/photos/navy-island-port-antonio.jpeg', label: 'NAVY ISLAND — From Port Antonio', sub: '5-min crossing from Errol Flynn Marina' },
          ].map(({ src, label, sub }) => (
            <div key={src} style={{ position: 'relative', marginBottom: 4 }}>
              <img src={src} style={{ width: '100%', display: 'block', filter: 'saturate(0.75) brightness(0.9)' }} alt={label} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(6,8,8,0.85) 0%, rgba(6,8,8,0) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontFamily: fontMono, fontSize: 9, color: cream, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
                <span style={{ fontFamily: fontMono, fontSize: 8, color: muted, letterSpacing: '0.15em' }}>{sub}</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${dim}` }}>
            <a href="/stages" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, color: gold, textDecoration: 'none', border: `1px solid rgba(200,168,75,0.3)`, padding: '12px 24px' }}>Full Stage Breakdown →</a>
            <p style={{ fontFamily: fontMono, fontSize: 10, color: muted, marginTop: 12, letterSpacing: '0.1em' }}>Origins · Rebirth · Zungu Main — stage architecture, schedules, and nightly programming</p>
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/navy-island-wide.png" quote="An entire island transformed." label="The Island · Navy Island · Jamaica" />

      {/* ═══ CHAPTER 05: WHY JAMAICA? ═══ */}
      <ChapterWrap bg={CHAPTERS['05'].bg} photo="/photos/port-antonio-aerial.jpeg">
        <ChapterDivider num="05" eye="Chapter Five" title="Why Jamaica?" sub="Because the world already moves to Jamaica." accent={CHAPTERS['05'].accent} chBg={CHAPTERS['05'].bg} rgb={CHAPTERS['05'].rgb} />
        <Section id="jamaica" sectionBg={CHAPTERS['05'].bg} accent={CHAPTERS['05'].accent} rgb={CHAPTERS['05'].rgb}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '6vw' }}>
            <div>
              <SectionHead label="Why Jamaica?" title="The world already moves to Jamaica." accent={CHAPTERS['05'].accent} />
              <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>Jamaican sound-system culture changed how music is played, felt, remixed, performed, and experienced.</p>
              <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 24 }}>That influence moved outward — through dancehall, dub, hip-hop, jungle, drum and bass, dubstep, grime, bass culture, and global electronic music.</p>
              <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 700, color: CHAPTERS['05'].accent, lineHeight: 1.3 }}>Zungu brings the world back to the source.</p>
            </div>
            <div>
              <SectionHead label="Why Navy Island?" title="An island can become a world." accent={CHAPTERS['05'].accent} />
              <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>Navy Island gives Zungu what no built venue can fake: forest, water, separation, mystery, arrival, scale, and transformation.</p>
              <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 700, color: CHAPTERS['05'].accent, lineHeight: 1.3 }}>For one week, it is not just Navy Island. It is Zungu.</p>
            </div>
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/island-stages-aerial_zxjfag.png" quote="Zungu brings the world back to the source." label="Why Jamaica · Portland Parish" />

      {/* ═══ CHAPTER 06: THE STAGES ═══ */}
      <ChapterWrap bg={CHAPTERS['06'].bg} photo="/photos/navy-island-wide.png">
        <ChapterDivider num="06" eye="Chapter Six" title="The Stages." sub="Three stages give Zungu its shape. Each one tied to a natural moment of the island." accent={CHAPTERS['06'].accent} chBg={CHAPTERS['06'].bg} rgb={CHAPTERS['06'].rgb} />
        <Section id="stages" sectionBg={CHAPTERS['06'].bg} accent={CHAPTERS['06'].accent} rgb={CHAPTERS['06'].rgb}>
          <SectionHead label="The Stages" title="Three stages." goldLine="One island." accent={CHAPTERS['06'].accent} />
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 680, marginBottom: 40 }}>The stages are not just places to perform. They are the rhythm of the island.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {[
              { name: 'ORIGINS', accent: rust, pos: 'Sunrise Stage', tags: ['Earth sound', 'Tribal fusion', 'Organic electronic', 'Deep percussion'], body: 'Faces the sunrise. Origins carries the first movement of the island: earth sound, tribal percussion, organic electronic music, fusion, deep drums, and music that feels rooted before it becomes electronic. It is the source stage.' },
              { name: 'REBIRTH', accent: '#9B5FC0', pos: 'Sunset Stage', tags: ['Tribal house', 'Tech house', 'Underground house', 'Hypnotic grooves'], body: 'Faces the sunset. As the island shifts from day to night, Rebirth carries the deeper pulse: tribal house, tech house, underground house, hypnotic grooves, warm percussion, and music built for golden hour. The transformation.' },
              { name: 'ZUNGU', accent: gold, pos: 'Centre Island · Mainstage', tags: ['Big room electronic', 'Mainstage house', 'Afro-house', 'Peak-time electronic'], body: 'Sits at the centre of the island. The mainstage. Major acts. Big-room energy. Full production. The moments that define the week. The centre of gravity.' },
            ].map(({ name, accent, pos, tags, body }) => (
              <div key={name} style={{ border: `1px solid rgba(200,168,75,0.1)`, padding: '30px 26px', background: 'rgba(14,24,18,0.8)' }}>
                <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.3em', color: accent, textTransform: 'uppercase', marginBottom: 8 }}>{pos}</div>
                <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 900, color: accent, letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1 }}>{name}</p>
                <p style={{ fontFamily: fontMono, fontSize: 14, color: muted, lineHeight: 1.8, marginBottom: 20 }}>{body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {tags.map(tag => <span key={tag} style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, border: `1px solid ${accent}30`, padding: '4px 10px' }}>{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
          {/* Stage mockup renders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 32 }}>
            {[
              { src: 'https://res.cloudinary.com/elektricbangaz/image/upload/v1780459528/stage-origins-ground_xjpf55.png', label: 'ORIGINS — Earth Sound · Sunrise Stage', sub: 'East tip · First light' },
              { src: 'https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/stage-rebirth-aerial_ruosnd.png', label: 'REBIRTH — Underground House · Sunset Stage', sub: 'West point · Golden hour' },
              { src: 'https://res.cloudinary.com/elektricbangaz/image/upload/v1780459528/stage-beach-aerial_ra09bb.png', label: 'ZUNGU MAIN — Centre Island · Mainstage', sub: 'Full production · Faces the Caribbean' },
            ].map(({ src, label, sub }) => (
              <div key={src} style={{ position: 'relative' }}>
                <img src={src} style={{ width: '100%', display: 'block', filter: 'saturate(0.75) brightness(0.9)' }} alt={label} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(6,8,8,0.85) 0%, rgba(6,8,8,0) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <span style={{ fontFamily: fontMono, fontSize: 9, color: cream, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
                  <span style={{ fontFamily: fontMono, fontSize: 8, color: muted, letterSpacing: '0.15em' }}>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/boston-bay.jpg" quote="Origins rises with the sun. Rebirth catches the sunset. Zungu owns the centre." label="Stage Placement · Navy Island" />

      {/* ═══ CHAPTER 07: THE SOUND + ARTISTS ═══ */}
      <ChapterWrap bg={CHAPTERS['07'].bg} photo="/photos/pellew-island.jpg">
        <ChapterDivider num="07" eye="Chapter Seven" title="The Sound." sub="Electronic music through a Jamaican lens." accent={CHAPTERS['07'].accent} chBg={CHAPTERS['07'].bg} rgb={CHAPTERS['07'].rgb} />
        <Section id="sound" sectionBg={CHAPTERS['07'].bg} accent={CHAPTERS['07'].accent} rgb={CHAPTERS['07'].rgb}>
          <SectionHead label="The Sound" title="Electronic music through a Jamaican lens." accent={CHAPTERS['07'].accent} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {['Afro-house', 'Tribal house', 'Big-room electronic', 'Tech house', 'Underground house', 'Jungle', 'Drum and bass', 'Dub-influenced club music', 'Jamaican electronic', 'Sunrise sets', 'Sunset sessions', 'Mainstage nights'].map(tag => (
              <span key={tag} style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CHAPTERS['07'].accent, border: `1px solid rgba(58,175,122,0.3)`, padding: '7px 14px' }}>{tag}</span>
            ))}
          </div>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 700, color: cream, marginBottom: 8 }}>The sound is global.</p>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 700, color: CHAPTERS['07'].accent }}>The root is Jamaican.</p>
        </Section>
        <Section sectionBg={CHAPTERS['07'].bg} accent={CHAPTERS['07'].accent} rgb={CHAPTERS['07'].rgb}>
          <SectionHead label="The Artists" title="Black Coffee. Not a booking. A co-curator." accent={CHAPTERS['07'].accent} />
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 780, marginBottom: 16 }}>Black Coffee runs his own festival — the Black Coffee Weekender in Cape Town, now in its second edition. He curates lineups, commissions collaborations, and has a Grammy for Best Dance/Electronic Album. His Hï Ibiza residency ran 7 consecutive seasons.</p>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 780, marginBottom: 36 }}>His label Soulistic Music signed Shimza. They perform back-to-back. They opened Hï Ibiza together. The conversation is a peer conversation — not a booking form.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            {[
              { name: 'Black Coffee', tags: 'Grammy Winner · Soulistic Music · Hï Ibiza · 7 Seasons', bio: 'South African DJ, Grammy-winning artist, festival curator. Runs his own event — the Black Coffee Weekender. Plays the Dominican Republic and Caribbean markets regularly. His Afro-house sound — deep percussion, emotional tension, Afropolitan register — is the exact fit for a Caribbean island at night.', why: 'The co-curation angle: he already curates festivals, has a label relationship with Shimza, and collaborated with Diplo on the Grammy album. This is a peer conversation — not a booking form.', headline: true },
              { name: 'Shimza', tags: 'Soulistic Music · Hï Ibiza · Zamna Tulum', bio: 'South African DJ, signed to Black Coffee\'s Soulistic Music. Performed at the opening of Black Coffee\'s Hï Ibiza residency. Regular at Zamna Tulum, Ibiza Club Chinois, New York, Tokyo. The African-Caribbean sonic connection is a documentable curatorial argument.', why: 'Natural extension of the Black Coffee conversation. The label relationship makes the sequence logical. If Black Coffee is in, Shimza is the next call.', headline: true },
              { name: 'Keinemusik', tags: '&ME · Rampa · Adam Port · Global Circuit', bio: 'Currently the single biggest draw in the boutique festival circuit globally. Kloud shows sell out 5,000–10,000 seat venues in New York, Paris, London. Melodic, afro-infused house — exact register for a Caribbean island. Zamna regulars.', why: 'The FOMO booking. "Keinemusik is playing on a private island in Jamaica" moves in the right rooms immediately.', headline: false },
              { name: 'Diplo', tags: 'Port Antonio Resident · Major Lazer · Grammy Collaborator', bio: 'Permanent residence in Port Antonio, Jamaica. Hosts "Higher Ground" events drawing international fashion and music crowd. Collaborated with Black Coffee on the Grammy-winning album Subconsciously.', why: 'Not a booking. He lives here. The conversation is neighbour to neighbour — which changes the fee, the association, and the story the press tells.', headline: false },
            ].map(({ name, tags, bio, why, headline }) => (
              <div key={name} style={{ border: `1px solid ${headline ? 'rgba(58,175,122,0.4)' : 'rgba(58,175,122,0.12)'}`, padding: '36px 32px', background: headline ? 'rgba(58,175,122,0.04)' : 'rgba(13,31,20,0.4)', position: 'relative' }}>
                {headline && <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: fontMono, fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: CHAPTERS['07'].accent, fontWeight: 700, border: `1px solid rgba(58,175,122,0.4)`, padding: '3px 8px' }}>HEADLINE</div>}
                <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 900, color: cream, marginBottom: 6, lineHeight: 1.1 }}>{name}</div>
                <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: CHAPTERS['07'].accent, marginBottom: 16 }}>{tags}</div>
                <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75, marginBottom: 16 }}>{bio}</p>
                <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.7, fontStyle: 'italic', borderTop: `1px solid rgba(58,175,122,0.1)`, paddingTop: 16, marginTop: 16 }}>{why}</p>
              </div>
            ))}
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/navy-island-aerial.jpg" quote="The sound is global. The root is Jamaican." label="The Sound · Navy Island" />

      {/* ═══ CHAPTER 08: THE EXPERIENCE ═══ */}
      <ChapterWrap bg={CHAPTERS['08'].bg} photo="/photos/blue-lagoon-port-antonio.jpg">
        <ChapterDivider num="08" eye="Chapter Eight" title="The Experience." sub="Zungu is designed as a world guests move through — not a lineup they attend." accent={CHAPTERS['08'].accent} chBg={CHAPTERS['08'].bg} rgb={CHAPTERS['08'].rgb} />
        <Section id="experience" sectionBg={CHAPTERS['08'].bg} accent={CHAPTERS['08'].accent} rgb={CHAPTERS['08'].rgb}>
          <SectionHead label="The Experience" title="Built around movement." accent={CHAPTERS['08'].accent} />
          <div style={{ maxWidth: 880, marginBottom: 40 }}>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>By day, the island opens through food, coffee, bars, water, wellness, art, media, culture, retail, and discovery.</p>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>At sunset, the energy shifts.</p>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>At night, the stages take over.</p>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 32 }}>By sunrise, the island returns to rhythm — slower, deeper, changed.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: CHAPTERS['08'].accent }}>Zungu is not built around one moment. It is built around movement.</p>
          </div>
          {/* Experience mockups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { src: 'https://res.cloudinary.com/elektricbangaz/image/upload/v1780459516/zungu-glamping-pods_iiwdwk.png', label: 'GLAMPING — Island Accommodation', sub: 'On-island · Premium pods · Full service' },
              { src: 'https://res.cloudinary.com/elektricbangaz/image/upload/v1780459528/stage-beach-activities_tnmqx6.png', label: 'THE ISLAND BETWEEN SETS', sub: 'Caribbean water · Daytime programme' },
            ].map(({ src, label, sub }) => (
              <div key={src} style={{ position: 'relative' }}>
                <img src={src} style={{ width: '100%', display: 'block', filter: 'saturate(0.75) brightness(0.9)' }} alt={label} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(6,8,8,0.85) 0%, rgba(6,8,8,0) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <span style={{ fontFamily: fontMono, fontSize: 9, color: cream, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
                  <span style={{ fontFamily: fontMono, fontSize: 8, color: muted, letterSpacing: '0.15em' }}>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_FROM_THE_SEA_twhi0w.png" quote="By day the island opens. By night it transforms." label="The Experience · Navy Island" />

      {/* ═══ CHAPTER 09: PROGRAMMING ═══ */}
      <ChapterWrap bg={CHAPTERS['09'].bg} photo="/photos/princess-island-portantonio.jpg">
        <ChapterDivider num="09" eye="Chapter Nine" title="Programming." sub="The island moves all day. Every zone has a purpose." accent={CHAPTERS['09'].accent} chBg={CHAPTERS['09'].bg} rgb={CHAPTERS['09'].rgb} />
        <Section id="programming" sectionBg={CHAPTERS['09'].bg} accent={CHAPTERS['09'].accent} rgb={CHAPTERS['09'].rgb}>
          <SectionHead label="Programming" title="The island moves all day." accent={CHAPTERS['09'].accent} />
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 680, marginBottom: 32 }}>Zungu is not only nighttime music. Every zone has a purpose: guest experience, revenue, sponsor value, local operator participation, and movement across the island.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 2 }}>
            {['Food', 'Coffee', 'Bars', 'Water', 'Wellness', 'Art', 'Culture', 'Media', 'The Zungu Shoppe', 'The Trail', 'The Pier', 'The Signal'].map(item => (
              <div key={item} style={{ border: `1px solid rgba(200,168,75,0.08)`, padding: '18px 16px', background: 'rgba(14,24,18,0.6)' }}>
                <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: CHAPTERS['09'].accent, marginTop: 40 }}>The island is not passive. The island performs.</p>
          <div style={{ marginTop: 48 }}>
            <SectionHead label="Pop-Ups" title="Not every Zungu moment needs a main stage." accent={CHAPTERS['09'].accent} />
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 680, marginBottom: 24 }}>Some moments are discovered. The three stages give Zungu its structure. The pop-ups give the island life between the major moments.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Beach selectors', 'Forest listening sessions', 'Zungu Radio recordings', 'The Signal sessions', 'Shoppe takeovers', 'Partner lounge music', 'Pier moments', 'Welcome party sets', 'Recovery day selectors', 'Final hoorah programming'].map(item => (
                <span key={item} style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: muted, border: `1px solid rgba(200,168,75,0.15)`, padding: '6px 14px' }}>{item}</span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 48 }}>
            <SectionHead label="Zungu Radio · The Signal" title="The festival creates the moment." goldLine="The media keeps it moving." accent={CHAPTERS['09'].accent} />
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 680 }}>Through Zungu Radio and The Signal, the sound continues: artist interviews, commissioned mixes, live recordings, field audio, press moments, and stories from the island.</p>
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/pellew-island.jpg" quote="The island is not passive. The island performs." label="Programming · Navy Island" />

      {/* ═══ CHAPTER 10: THE OPPORTUNITY — investor only ═══ */}
      {visibleSections.includes('opportunity') && (<>
        <ChapterWrap bg={CHAPTERS['10'].bg} photo="/photos/navy-island-aerial.jpg">
          <ChapterDivider num="10" eye="Chapter Ten" title="The Opportunity." sub="A category that doesn't exist yet. A site that can't be replicated." accent={CHAPTERS['10'].accent} chBg={CHAPTERS['10'].bg} rgb={CHAPTERS['10'].rgb} />
          <Section id="opportunity" sectionBg={CHAPTERS['10'].bg} accent={CHAPTERS['10'].accent} rgb={CHAPTERS['10'].rgb} style={{ background: 'transparent' }}>
            <SectionHead label="The Gap" title="No festival owns this." accent={CHAPTERS['10'].accent} />
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 780, marginBottom: 32 }}>The opportunity is not simply to create another festival. The opportunity is to establish Jamaica&apos;s first globally positioned private-island electronic music destination. The world already moves to Jamaican rhythm. That influence has travelled across the world. But Jamaica has not yet owned a premium electronic music destination at international scale. Zungu is built around that gap.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, marginBottom: 40 }}>
              {[
                { title: 'Category Gap', body: 'Jamaica has global music authority, but no flagship electronic music destination festival positioned for the international premium market.' },
                { title: 'Location Gap', body: 'The Caribbean has destination power, but few electronic festivals with a private-island setting, cultural specificity, and a controlled guest experience.' },
                { title: 'Audience Gap', body: 'Global festival travellers are looking for experiences that feel rare, immersive, beautiful, and discovered before they become obvious.' },
                { title: 'Brand Gap', body: 'Zungu can become the Jamaican-born electronic festival brand that connects music, island hospitality, media, tourism, and long-term cultural value.' },
              ].map(({ title, body }) => (
                <div key={title} style={{ border: `1px solid rgba(200,168,75,0.12)`, padding: '28px 24px', background: 'rgba(6,6,0,0.7)' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 700, color: CHAPTERS['10'].accent, marginBottom: 12, lineHeight: 1.3 }}>{title}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 700, color: CHAPTERS['10'].accent }}>A private-island electronic music festival rooted in Jamaica. The category no one else can claim in the same way.</p>
          </Section>
        </ChapterWrap>
        <PhotoBreak src="/photos/navy-island-port-antonio.jpeg" quote="The gap is obvious once you see it." label="Navy Island · Jamaica" />
      </>)}

      {/* ═══ CHAPTER 11: WHERE YOU STAY — investor only ═══ */}
      {visibleSections.includes('accommodation') && (<>
        <ChapterWrap bg={CHAPTERS['11'].bg} photo="/photos/navy-island-wide.png">
          <ChapterDivider num="11" eye="Chapter Eleven" title="Where You Stay." sub="On-island accommodation. A layered stay strategy." accent={CHAPTERS['11'].accent} chBg={CHAPTERS['11'].bg} rgb={CHAPTERS['11'].rgb} />
          <Section id="accommodation" sectionBg={CHAPTERS['11'].bg} accent={CHAPTERS['11'].accent} rgb={CHAPTERS['11'].rgb} style={{ background: 'transparent' }}>
            <SectionHead label="On-Island Accommodation" title="The island is the hotel." accent={CHAPTERS['11'].accent} />
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 780, marginBottom: 32 }}>Zungu is not a festival where thousands of guests arrive and disappear into an already limited hotel market. Port Antonio is not a mass-hotel destination. That is why accommodation is part of the model. Zungu uses a layered stay strategy: Luxe Glamping Village, Ready Camp, Crew Garden, Island Camp, curated mainland stays, and regional day access.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, marginBottom: 40 }}>
              {[
                { tier: 'Luxe Glamping Village', sub: 'Premium on-island accommodation', body: 'The highest-tier on-island stay. Premium finish, full service, dedicated support, and priority access across the island.' },
                { tier: 'Ready Camp', sub: 'Pre-pitched camping', body: 'Pre-pitched and ready on arrival. Essential comfort for guests who want the island without the logistics.' },
                { tier: 'Crew Garden', sub: 'Reserved group camping', body: 'Reserved sections for organised groups, crew, and partner allocations.' },
                { tier: 'Island Camp', sub: 'Controlled bring-your-own camping', body: 'Controlled bring-your-own camping within designated zones. The grassroots layer of the Zungu island experience.' },
              ].map(({ tier, sub, body }) => (
                <div key={tier} style={{ border: `1px solid rgba(155,95,192,0.12)`, padding: '26px 22px', background: 'rgba(6,4,16,0.7)' }}>
                  <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: CHAPTERS['11'].accent, marginBottom: 8 }}>{sub}</div>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(14px, 1.8vw, 20px)', fontWeight: 700, color: cream, marginBottom: 12, lineHeight: 1.2 }}>{tier}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', border: `1px solid rgba(155,95,192,0.12)`, marginBottom: 32, flexWrap: 'wrap' }}>
              {[['5,000', 'Year One Target'], ['1,800–2,500', 'On-Island Overnight'], ['1,000–1,500', 'Mainland Stays'], ['1,000–1,700', 'Day / Regional']].map(([num, lbl], i, arr) => (
                <div key={lbl} style={{ flex: 1, minWidth: 100, padding: '24px 16px', borderRight: i < arr.length - 1 ? `1px solid rgba(155,95,192,0.08)` : 'none', textAlign: 'center' }}>
                  <span style={{ fontFamily: fontDisplay, fontSize: 'clamp(14px, 2vw, 24px)', fontWeight: 700, color: CHAPTERS['11'].accent, display: 'block', lineHeight: 1 }}>{num}</span>
                  <span style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, display: 'block', marginTop: 6 }}>{lbl}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, letterSpacing: '0.1em', textAlign: 'center', padding: '14px', border: `1px solid rgba(155,95,192,0.1)`, maxWidth: 400 }}>Stay at Zungu — coming soon</p>
          </Section>
        </ChapterWrap>
        <PhotoBreak src="/photos/blue-lagoon-port-antonio.jpg" quote="The island doesn't sleep." label="Navy Island · June 2027" />
      </>)}

      {/* ═══ CHAPTER 12: THE COMMERCIAL MODEL — investor only ═══ */}
      {visibleSections.includes('commercial') && (<>
        <ChapterWrap bg={CHAPTERS['12'].bg} photo="/photos/navy-island-satellite.png">
          <ChapterDivider num="12" eye="Chapter Twelve" title="The Commercial Model." sub="Nine revenue lines. One island. One week." accent={CHAPTERS['12'].accent} chBg={CHAPTERS['12'].bg} rgb={CHAPTERS['12'].rgb} />
          <Section id="commercial" sectionBg={CHAPTERS['12'].bg} accent={CHAPTERS['12'].accent} rgb={CHAPTERS['12'].rgb} style={{ background: 'transparent' }}>
            <SectionHead label="Ticket Architecture" title="Four tiers. One week." accent={CHAPTERS['12'].accent} />
            <div style={{ display: 'flex', border: `1px solid rgba(58,175,122,0.12)`, marginBottom: 48, flexWrap: 'wrap' }}>
              {[['GA', 'US$600', 'Festival Access · 3,500 tickets'], ['VIP / Navy', 'US$1,350', '900 tickets'], ['Glamping / Obsidian', 'US$3,500', '570 packages'], ['The Thirty', 'US$12,500', '30 guests']].map(([tier, price, vol], i, arr) => (
                <div key={tier} style={{ flex: 1, minWidth: 120, padding: '28px 16px', borderRight: i < arr.length - 1 ? `1px solid rgba(58,175,122,0.08)` : 'none', textAlign: 'center' }}>
                  <span style={{ fontFamily: fontDisplay, fontSize: 'clamp(14px, 2vw, 22px)', fontWeight: 700, color: CHAPTERS['12'].accent, display: 'block', lineHeight: 1 }}>{tier}</span>
                  <span style={{ fontFamily: fontMono, fontSize: 16, color: cream, display: 'block', marginTop: 8 }}>{price}</span>
                  <span style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: muted, display: 'block', marginTop: 4 }}>{vol}</span>
                </div>
              ))}
            </div>
            <SectionHead label="Revenue Stack" title="Nine revenue lines." accent={CHAPTERS['12'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
              {[
                { line: 'Access', note: 'GA, VIP, Glamping, The Thirty, partner allocation' },
                { line: 'Accommodation', note: 'Glamping, camping tiers, mainland packages where not bundled' },
                { line: 'Bars', note: 'Main, stage, VIP, rum, cocktail, bottle service, branded specials' },
                { line: 'Food', note: 'Vendor commissions, premium dining, breakfast, late-night, partner dinners' },
                { line: 'Retail', note: 'The Zungu Shoppe, merch, essentials, artist collabs, limited objects' },
                { line: 'Activities', note: 'Wellness, guided walks, workshops, water activity, mainland excursions' },
                { line: 'Sponsorship', note: 'Stage, bar, coffee, rum, telecoms, travel, sustainability, wellness, media' },
                { line: 'Media + IP', note: 'Zungu Radio, The Signal, recorded sets, interviews, content, catalog' },
                { line: 'Vendor / Operator Fees', note: 'Stall rentals, commissions, minimum guarantees, category exclusivity' },
              ].map(({ line, note }) => (
                <div key={line} style={{ border: `1px solid rgba(58,175,122,0.08)`, padding: '20px 18px', background: 'rgba(3,14,6,0.6)' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 700, color: cream, marginBottom: 6 }}>{line}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 11, color: muted }}>{note}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px, 2.2vw, 26px)', fontWeight: 700, color: CHAPTERS['12'].accent, marginTop: 40 }}>The first edition is not only a ticketed event. It is the launch of a destination festival economy.</p>
          </Section>
        </ChapterWrap>
        <PhotoBreak src="/photos/port-antonio-aerial.jpeg" quote="Nine revenue lines. One island. One week." label="Commercial Model · Zungu Festival" />
      </>)}

      {/* ═══ CHAPTER 13: YEAR ONE FINANCIALS — investor only ═══ */}
      {visibleSections.includes('financial') && (<>
        <ChapterWrap bg={CHAPTERS['13'].bg} photo="/photos/port-antonio.jpg">
          <ChapterDivider num="13" eye="Chapter Thirteen" title="Year One Financials." sub="The base case, the upside lines, and the discipline." accent={CHAPTERS['13'].accent} chBg={CHAPTERS['13'].bg} rgb={CHAPTERS['13'].rgb} />
          <Section id="financial" sectionBg={CHAPTERS['13'].bg} accent={CHAPTERS['13'].accent} rgb={CHAPTERS['13'].rgb} style={{ background: 'transparent' }}>
            <SectionHead label="Year One Revenue Model" title="The case at 5,000 guests." accent={CHAPTERS['13'].accent} />
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 780, marginBottom: 32 }}>Year One is modelled around 5,000 guests, controlled capacity, premium yield, and multiple revenue lines. The working access model suggests potential gross access revenue of approximately US$5.685M before bars, food, retail, sponsorship, vendor fees, activities, media, accommodation add-ons, and hospitality upsides.</p>
            <div style={{ overflowX: 'auto', marginBottom: 40 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fontMono, fontSize: 12, minWidth: 500, maxWidth: 800 }}>
                <tbody>
                  {[
                    ['GA / Festival Access', '3,500 × US$600', 'US$2,100,000'],
                    ['VIP / Navy', '900 × US$1,350', 'US$1,215,000'],
                    ['Glamping / Obsidian', '570 × US$3,500', 'US$1,995,000'],
                    ['The Thirty', '30 × US$12,500', 'US$375,000'],
                  ].map(([label, detail, value]) => (
                    <tr key={label} style={{ borderBottom: `1px solid ${dim}` }}>
                      <td style={{ padding: '12px 16px', color: cream }}>{label}</td>
                      <td style={{ padding: '12px 16px', color: muted, fontSize: 10 }}>{detail}</td>
                      <td style={{ padding: '12px 16px', color: gold, fontWeight: 700, textAlign: 'right' }}>{value}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: `1px solid ${gold}` }}>
                    <td colSpan={2} style={{ padding: '14px 16px', color: cream, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 10 }}>INDICATIVE GROSS ACCESS REVENUE</td>
                    <td style={{ padding: '14px 16px', color: gold, fontWeight: 700, fontSize: 18, textAlign: 'right' }}>US$5,685,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <SectionHead label="Additional Revenue Lines" title="Beyond access." accent={CHAPTERS['13'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, marginBottom: 40 }}>
              {['F&B + Bars', 'Sponsorship', 'Retail', 'Vendor / Operator Fees', 'Activities', 'Accommodation Add-Ons', 'Media + IP', 'Partner Dinners / Hospitality', 'Mainland Package Commissions'].map(line => (
                <div key={line} style={{ border: `1px solid ${dim}`, padding: '16px 18px', background: 'rgba(6,4,0,0.5)' }}>
                  <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, margin: 0 }}>{line} — <span style={{ color: CHAPTERS['13'].accent }}>TBD</span></p>
                </div>
              ))}
            </div>
            <SectionHead label="Financial Discipline" title="Four gates. Non-negotiable." accent={CHAPTERS['13'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: 36 }}>
              {[
                { title: 'Seed Capital Floor', sub: 'Before ticket sales open', body: 'Ticket sales should not open until minimum capital requirements, insurance path, production budget, legal structure, and site pathway are confirmed.' },
                { title: '70% Presale Trigger', sub: 'Planning gate', body: 'Full production commitment should not proceed below the agreed presale threshold. Hard go/no-go. Protects every party in the structure.' },
                { title: 'Artist Deposit Control', sub: 'After insurance is bound only', body: 'Artist deposits should only be released after insurance, production agreements, legal terms, and financing gates are in place. No speculative bookings for optics.' },
                { title: '15% Contingency', sub: 'Ring-fenced from day one', body: 'A dedicated contingency ring-fenced from the start. Island event risk premium. Not released without production coordinator approval.' },
              ].map(({ title, sub, body }) => (
                <div key={title} style={{ border: `1px solid ${dim}`, padding: '34px 30px' }}>
                  <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 700, color: cream, lineHeight: 1.2, marginBottom: 6 }}>{title}</div>
                  <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 12 }}>{sub}</div>
                  <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px, 2.2vw, 24px)', fontWeight: 700, color: CHAPTERS['13'].accent }}>The access revenue gives Zungu a credible base case. The additional revenue lines create upside. The discipline gates protect capital.</p>
          </Section>
        </ChapterWrap>
      </>)}

      {/* ═══ CHAPTER 14: RISK & EXECUTION — investor only ═══ */}
      {visibleSections.includes('risk') && (<>
        <ChapterWrap bg={CHAPTERS['14'].bg} photo="/photos/navy-island-wide.png">
          <ChapterDivider num="14" eye="Chapter Fourteen" title="Risk & Execution." sub="Ambitious, but not naive." accent={CHAPTERS['14'].accent} chBg={CHAPTERS['14'].bg} rgb={CHAPTERS['14'].rgb} />
          <Section id="risk" sectionBg={CHAPTERS['14'].bg} accent={CHAPTERS['14'].accent} rgb={CHAPTERS['14'].rgb} style={{ background: 'transparent' }}>
            <SectionHead label="Risk Matrix" title="Known risks. Planned mitigations." accent={CHAPTERS['14'].accent} />
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 780, marginBottom: 32 }}>Zungu is ambitious, but not naive. A private-island festival carries a different risk profile from a traditional land-based event. The model must be built around expert partners, phased commitments, permits, marine logistics, safety planning, environmental protocol, insurance, and hard financial gates.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
              {[
                { risk: 'Marine Logistics', body: 'Ferry movement, private boat access, dock capacity, equipment barging, night transfers, weather holds, emergency marine access, Port Authority coordination, and Coast Guard alignment.' },
                { risk: 'Weather', body: 'June window post-peak hurricane season. Historical Jamaica weather data reviewed. Covered stages, drainage infrastructure. Weather clause in all contracts. Insurance covers weather event.' },
                { risk: 'Medical + Safety', body: 'On-island medical post, first-aid points, AEDs, ambulance boat, mainland medical coordination, guest welfare, hydration, heat response, and emergency evacuation.' },
                { risk: 'Security', body: 'Access control, guest screening, wristband checks, crowd movement, glamping access, backstage zones, artist security, marine access, and restricted areas.' },
                { risk: 'Power', body: 'Temporary production power, generator redundancy, fuel logistics, distribution, weatherproofing, emergency lighting, and backup systems.' },
                { risk: 'Water + Sanitation', body: 'Potable water, toilets, showers, handwash stations, greywater, vendor water, bathhouses, waste holding, cleaning crews, and removal from the island.' },
                { risk: 'Environmental', body: 'Reef protection, tree protection, no-build zones, controlled pathways, waste removal, lighting impact, marine activity controls, and post-event restoration.' },
                { risk: 'Production', body: 'Stage build, sound direction, lighting, video, rigging, labour, crew access, vendor build, accommodation build, testing, show operations, and demobilisation.' },
                { risk: 'Financial', body: 'Presale gates, insurance, deposits, contingency, phased commitments, change-order control, and go/no-go decision points.' },
              ].map(({ risk, body }) => (
                <div key={risk} style={{ border: `1px solid rgba(74,143,189,0.1)`, padding: '26px 22px', background: 'rgba(4,8,16,0.7)' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 700, color: CHAPTERS['14'].accent, marginBottom: 10 }}>{risk}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
          </Section>
        </ChapterWrap>
        <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_FROM_THE_SEA_twhi0w.png" quote="The risks are real. The mitigations are built in." label="Risk · Execution · Navy Island" />
      </>)}

      {/* ═══ CHAPTER 15: THE ROADMAP — investor only ═══ */}
      {visibleSections.includes('roadmap') && (<>
        <ChapterWrap bg={CHAPTERS['15'].bg} photo="/photos/princess-island-portantonio.jpg">
          <ChapterDivider num="15" eye="Chapter Fifteen" title="The Roadmap." sub="Year One is the proof of concept. The platform is the opportunity." accent={CHAPTERS['15'].accent} chBg={CHAPTERS['15'].bg} rgb={CHAPTERS['15'].rgb} />
          <Section id="roadmap" sectionBg={CHAPTERS['15'].bg} accent={CHAPTERS['15'].accent} rgb={CHAPTERS['15'].rgb} style={{ background: 'transparent' }}>
            <SectionHead label="Four-Year Arc" title="Boutique to global." accent={CHAPTERS['15'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, marginBottom: 48 }}>
              {[
                { year: '2025 — Seed', body: 'Site strategy, brand architecture, investor development, partner outreach, early production scoping, and concept validation.' },
                { year: '2026 — Build', body: 'Permits, site survey, production partners, marine logistics, sponsor commitments, artist holds, accommodation design, ticketing infrastructure, and market preparation.' },
                { year: '2027 — Launch', body: 'Capital close, production build, festival execution, media capture, guest reporting, partner reporting, and post-event review.' },
                { year: '2028 — Expansion', body: 'Year Two optimisation, repeat audience, partner renewals, media/IP monetisation, capacity refinement, travel packages, and regional expansion.' },
              ].map(({ year, body }) => (
                <div key={year} style={{ border: `1px solid rgba(200,168,75,0.12)`, padding: '28px 24px', background: 'rgba(6,6,0,0.7)' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(14px, 1.8vw, 20px)', fontWeight: 700, color: CHAPTERS['15'].accent, marginBottom: 14, lineHeight: 1.1 }}>{year}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
            <SectionHead label="Platform Value" title="Beyond the festival." accent={CHAPTERS['15'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
              {[
                { title: 'Repeat Audience', note: 'A successful Year One creates urgency for Year Two.' },
                { title: 'Sponsorship Renewals', note: 'Founding partners gain early association with the brand before it scales.' },
                { title: 'Media Library', note: 'Zungu Radio, The Signal, recorded sets, interviews, photography, recap films become reusable assets.' },
                { title: 'Commissioned Music', note: 'Original collaborations between Jamaican producers and international artists create cultural and IP value.' },
                { title: 'Travel Packages', note: 'Accommodation, hospitality, excursions, mainland activations, and return travel build a stronger destination product.' },
                { title: 'Merchandise + Retail', note: 'The Zungu Shoppe, limited objects, artist collaborations, local goods, and essentials expand the brand beyond the event.' },
                { title: 'Regional Expansion', note: 'If Year One proves the model, Zungu can explore future editions, affiliated events, media formats, and regional partnerships.' },
              ].map(({ title, note }) => (
                <div key={title} style={{ border: `1px solid rgba(200,168,75,0.08)`, padding: '20px 18px', background: 'rgba(6,6,0,0.5)' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 700, color: cream, marginBottom: 6 }}>{title}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 11, color: muted }}>{note}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 700, color: CHAPTERS['15'].accent, marginTop: 40 }}>Year One creates the founding story. The platform grows from there.</p>
          </Section>
        </ChapterWrap>
      </>)}

      {/* ═══ CHAPTER 16: INVESTOR POSITIONING — investor only ═══ */}
      {visibleSections.includes('investor') && <ChapterWrap bg={CHAPTERS['16'].bg} photo="/photos/navy-island-satellite.png">
        <ChapterDivider num="16" eye="Chapter Sixteen" title="Investor Positioning." sub="Zungu is a festival, but the opportunity is larger than one event." accent={CHAPTERS['16'].accent} chBg={CHAPTERS['16'].bg} rgb={CHAPTERS['16'].rgb} />
        <Section id="investor" sectionBg={CHAPTERS['16'].bg} accent={CHAPTERS['16'].accent} rgb={CHAPTERS['16'].rgb} style={{ background: 'transparent' }}>
          <SectionHead label="Investor Positioning" title="Larger than one event." accent={CHAPTERS['16'].accent} />
          <div style={{ maxWidth: 880, marginBottom: 40 }}>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>We are not pitching a dream. We are building a Jamaican-born destination festival brand with a controlled-capacity private-island launch, premium pricing, multiple revenue lines, local economic participation, and long-term platform potential.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: CHAPTERS['16'].accent, lineHeight: 1.3 }}>The first edition creates the founding story. The platform grows from there.</p>
          </div>
          <SectionHead label="Partner Tracks" title="Who this is for." accent={CHAPTERS['16'].accent} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2, marginBottom: 40 }}>
            {[
              { track: 'Investors', body: 'Capital participation, strategic introductions, governance alignment, financial discipline, and long-term platform development.' },
              { track: 'Production Partners', body: 'Stage, lighting, sound, marine logistics, safety, power, build, crew, sanitation, and technical execution.' },
              { track: 'Strategic Partners', body: 'Tourism, beverage, telecoms, travel, hospitality, luxury, media, sustainability, and infrastructure alignment.' },
              { track: 'Press', body: 'Founder briefing, approved language, image access, destination positioning, cultural context, and future announcement support.' },
              { track: 'Local / Government / Tourism', body: 'Alignment across marine access, hospitality, local employment, vendor participation, environmental protocol, safety planning, guest movement, and destination positioning.' },
            ].map(({ track, body }) => (
              <div key={track} style={{ border: `1px solid ${dim}`, padding: '30px 26px' }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 700, color: cream, lineHeight: 1.2, marginBottom: 12 }}>{track}</div>
                <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
          <QuoteBlock quote="The festival that executes flawlessly at 5,000 people on a private island in June 2027 has something no amount of money can buy in Year 3: a founding story. You can't retro-fit that. You're either in the room when it starts, or you're not." attr="Investment Thesis · Year 1" />
        </Section>
      </ChapterWrap>}

      {/* ═══ REQUEST BRIEFING — modal trigger section ═══ */}
      <ChapterWrap bg={CHAPTERS['cta'].bg} photo="/photos/aerial-island.jpg">
        <section
          ref={sectionRefs.cta}
          id="section-cta"
          className="section section--tall"
          style={{ position: 'relative', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 55% at 50% 50%, rgba(${CHAPTERS['cta'].rgb},.1) 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.55em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: gold }} />
              Access by invitation only
              <span style={{ display: 'inline-block', width: 24, height: 1, background: gold }} />
            </p>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(2.8rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', color: cream, lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '0.2rem' }}>REQUEST</h2>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(2.8rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', color: gold, lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '2rem' }}>{ctaCopy.label.split(' ').slice(1).join(' ').toUpperCase() || 'BRIEFING'}</h2>
            <p style={{ fontFamily: fontMono, fontSize: 14, color: muted, lineHeight: 1.9, maxWidth: 480, marginBottom: '2.5rem' }}>{ctaCopy.body}</p>
            <button onClick={openBriefing} style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, padding: '18px 48px', background: gold, color: bg, border: 'none', cursor: 'pointer' }}>{ctaCopy.label} →</button>
          </div>
        </section>
      </ChapterWrap>

      {/* ── Footer ── */}
      <footer style={{ width: '100%', boxSizing: 'border-box', backgroundColor: bg, borderTop: `1px solid ${dim}`, padding: '40px 8vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <img src="/zungu-z-mark.png" style={{ height: 32, filter: 'drop-shadow(0 0 10px rgba(200,168,75,.2))', opacity: 0.6 }} alt="Zungu" />
        <div style={{ fontFamily: fontMono, fontSize: 9, color: dim, letterSpacing: '0.25em', textTransform: 'uppercase', lineHeight: 2, textAlign: 'right' }}>
          <div>Confidential concept material · Not for public distribution</div>
          <div>Navy Island · Port Antonio, Jamaica</div>
          <div>Target Window: June 17–23, 2027</div>
        </div>
      </footer>
    </div>
  );
}
