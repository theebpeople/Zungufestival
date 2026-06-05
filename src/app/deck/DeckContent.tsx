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
  '01': { bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  }, // gold
  '02': { bg: '#060410', accent: '#9B5FC0', rgb: '155,95,192'  }, // purple
  '03': { bg: '#030e06', accent: '#3AAF7A', rgb: '58,175,122'  }, // teal
  '04': { bg: '#060400', accent: '#D4722A', rgb: '212,114,42'  }, // rust
  '05': { bg: '#040810', accent: '#4A8FBD', rgb: '74,143,189'  }, // blue
  '07': { bg: '#060410', accent: '#9B5FC0', rgb: '155,95,192'  }, // purple
  '08': { bg: '#030e06', accent: '#3AAF7A', rgb: '58,175,122'  }, // teal
  '09': { bg: '#060400', accent: '#D4722A', rgb: '212,114,42'  }, // rust
  '10': { bg: '#040810', accent: '#4A8FBD', rgb: '74,143,189'  }, // blue
  '11': { bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  }, // gold
  'cta':{ bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  }, // gold
};

const fontDisplay = "'Unbounded', sans-serif";
const fontMono = "'Space Mono', monospace";

// ── Section IDs for dot-nav ───────────────────────────────────────────────────
const SECTIONS = ['brand', 'meaning', 'island', 'stages', 'experience', 'sound', 'jamaica', 'programming', 'portantonio', 'investor', 'cta'] as const;
type SectionId = typeof SECTIONS[number];

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
      style={{ position: 'relative', ...style }}
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
export default function DeckContent({ navLabel = 'INVESTOR DECK' }: { navLabel?: string }) {
  // Refs for section scroll targets
  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>> = {
    brand: useRef<HTMLElement>(null),
    meaning: useRef<HTMLElement>(null),
    island: useRef<HTMLElement>(null),
    stages: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    sound: useRef<HTMLElement>(null),
    jamaica: useRef<HTMLElement>(null),
    programming: useRef<HTMLElement>(null),
    portantonio: useRef<HTMLElement>(null),
    investor: useRef<HTMLElement>(null),
    cta: useRef<HTMLElement>(null),
  };

  // Nav ref for section scrolls
  const navRefs = {
    brand: useRef<HTMLDivElement>(null),
    meaning: useRef<HTMLDivElement>(null),
    island: useRef<HTMLDivElement>(null),
    stages: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    sound: useRef<HTMLDivElement>(null),
    jamaica: useRef<HTMLDivElement>(null),
    programming: useRef<HTMLDivElement>(null),
    portantonio: useRef<HTMLDivElement>(null),
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
    SECTIONS.forEach((id) => {
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

  function scrollToCta() {
    const el = document.getElementById('section-cta');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  const navLinkStyle: React.CSSProperties = {
    fontSize: 9,
    padding: '4px 0',
    textDecoration: 'none',
    color: muted,
  };

  return (
    <div className="page" style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>

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
      <nav className="nav" style={{ gap: 16 }}>
        {/* Left: Z-mark */}
        <div style={{ flexShrink: 0 }}>
          <img
            src="/zungu-z-mark.png"
            style={{ height: 30, filter: 'drop-shadow(0 0 10px rgba(200,168,75,.3))', display: 'block' }}
            alt="Zungu"
          />
        </div>

        {/* Center: nav links — hidden on portrait tablet via CSS */}
        <div className="deck-chapter-links">
          {(
            [
              ['What Is Zungu?', 'brand'],
              ['What Does Zungu Mean?', 'meaning'],
              ['The Island', 'island'],
              ['The Stages', 'stages'],
              ['The Experience', 'experience'],
              ['The Sound', 'sound'],
              ['Why Jamaica?', 'jamaica'],
              ['Programming', 'programming'],
              ['Port Antonio', 'portantonio'],
              ['Investor Positioning', 'investor'],
            ] as [string, SectionId][]
          ).map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="nav-link"
              style={navLinkStyle}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right: badge + sign out (desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
          <span className="deck-nav-desktop nav-tag">{navLabel.toUpperCase()}</span>
          <a
            href="/dashboard"
            className="deck-nav-desktop nav-link"
            style={{ textDecoration: 'none' }}
          >
            ← Back
          </a>
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

          {/* Chapter links */}
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%', marginBottom: 40 }}>
            {(
              [
                ['What Is Zungu?', 'brand'],
                ['What Does Zungu Mean?', 'meaning'],
                ['The Island', 'island'],
                ['The Stages', 'stages'],
                ['The Experience', 'experience'],
                ['The Sound', 'sound'],
                ['Why Jamaica?', 'jamaica'],
                ['Programming', 'programming'],
                ['Port Antonio', 'portantonio'],
                ['Investor Positioning', 'investor'],
              ] as [string, SectionId][]
            ).map(([label, id]) => (
              <button
                key={id}
                onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 'clamp(1.4rem, 7vw, 2.2rem)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: cream,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px 0',
                  width: '100%',
                  textAlign: 'center',
                  borderBottom: `1px solid ${dim}`,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = cream; }}
              >
                {label}
              </button>
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
            Request Briefing →
          </button>

          <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
            <a
              href="/activities"
              style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: muted, textDecoration: 'none', fontWeight: 700 }}
            >
              Activities
            </a>
            <a
              href="/stages"
              style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: muted, textDecoration: 'none', fontWeight: 700 }}
            >
              Stages
            </a>
            <a
              href="/sign-out"
              style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: muted, textDecoration: 'none', fontWeight: 700 }}
            >
              Sign Out
            </a>
          </div>
        </div>
      )}

      {/* ── Side dots ───────────────────────────────────────────────────── */}
      <div className="side-dots">
        {SECTIONS.map((id) => (
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

      {/* ═══ CHAPTER 1: WHAT IS ZUNGU? ═══ */}
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

      {/* ═══ CHAPTER 2: WHAT DOES ZUNGU MEAN? ═══ */}
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

      {/* ═══ CHAPTER 3: THE ISLAND ═══ */}
      <ChapterWrap bg={CHAPTERS['03'].bg} photo="/photos/navy-island-aerial-hq.png">
      <ChapterDivider num="03" eye="Chapter Three" title="The Island." sub="Navy Island. Port Antonio, Jamaica. 64 acres. The site that makes everything possible." accent={CHAPTERS['03'].accent} chBg={CHAPTERS['03'].bg} rgb={CHAPTERS['03'].rgb} />
      <Section id="island" sectionBg={CHAPTERS['03'].bg} accent={CHAPTERS['03'].accent} rgb={CHAPTERS['03'].rgb}>
        <SectionHead label="The Island" title="Navy Island is the scenery." accent={CHAPTERS['03'].accent} />
        <div style={{ maxWidth: 880, marginBottom: 32 }}>
          {[
            { text: 'It is where the world of Zungu comes alive and the magic of the experience begins.', weight: 300 },
            { text: 'For one week, the island becomes the festival.', weight: 400 },
          ].map(({ text, weight }) => (
            <p key={text} style={{ fontFamily: fontDisplay, fontSize: 'clamp(15px, 2.2vw, 26px)', fontWeight: weight, lineHeight: 1.5, color: cream, marginBottom: 8 }}>{text}</p>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, margin: '32px 0' }}>
            {['The forest becomes movement.', 'The water becomes atmosphere.', 'The stages become landmarks.', 'The night becomes ritual.', 'The island becomes sound.'].map((line) => (
              <div key={line} style={{ border: `1px solid rgba(200,168,75,0.1)`, padding: '22px 20px', background: 'rgba(14,24,18,0.8)' }}>
                <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(13px, 1.6vw, 18px)', fontWeight: 600, color: cream, lineHeight: 1.3, margin: 0 }}>{line}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 8 }}>This is not a field with a stage on it.</p>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(20px, 3vw, 38px)', fontWeight: 700, lineHeight: 1.3, color: gold }}>This is an entire island transformed.</p>
        </div>
      </Section>
      <Section sectionBg={CHAPTERS['03'].bg} accent={CHAPTERS['03'].accent} rgb={CHAPTERS['03'].rgb}>
        <SectionHead label="Marina → Island Crossing Overview" title="The crossing." accent={CHAPTERS['03'].accent} />
        <IslandOverviewMap />
      </Section>
      <Section sectionBg={CHAPTERS['03'].bg} accent={CHAPTERS['03'].accent} rgb={CHAPTERS['03'].rgb}>
        <SectionHead label="Stage Placement · Navy Island" title="Three stages. One island." accent={CHAPTERS['03'].accent} />
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

      {/* ═══ CHAPTER 4: THE STAGES ═══ */}
      <ChapterWrap bg={CHAPTERS['04'].bg} photo="/photos/navy-island-wide.png">
      <ChapterDivider num="04" eye="Chapter Four" title="The Stages." sub="Three stages give Zungu its shape. Each one tied to a natural moment of the island." accent={CHAPTERS['04'].accent} chBg={CHAPTERS['04'].bg} rgb={CHAPTERS['04'].rgb} />
      <Section id="stages" sectionBg={CHAPTERS['04'].bg} accent={CHAPTERS['04'].accent} rgb={CHAPTERS['04'].rgb}>
        <SectionHead label="The Stages" title="Three stages." goldLine="One island." accent={CHAPTERS['04'].accent} />
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
      <Section sectionBg={CHAPTERS['04'].bg} accent={CHAPTERS['04'].accent} rgb={CHAPTERS['04'].rgb}>
        <SectionHead label="The Artists" title="Black Coffee. Not a booking. A co-curator." accent={CHAPTERS['04'].accent} />
        <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 780, marginBottom: 16 }}>Black Coffee runs his own festival — the Black Coffee Weekender in Cape Town, now in its second edition. He curates lineups, commissions collaborations, and has a Grammy for Best Dance/Electronic Album. His Hï Ibiza residency ran 7 consecutive seasons.</p>
        <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 780, marginBottom: 36 }}>His label Soulistic Music signed Shimza. They perform back-to-back. They opened Hï Ibiza together. The conversation is a peer conversation — not a booking form.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {[
            { name: 'Black Coffee', tags: 'Grammy Winner · Soulistic Music · Hï Ibiza · 7 Seasons', bio: 'South African DJ, Grammy-winning artist, festival curator. Runs his own event — the Black Coffee Weekender. Plays the Dominican Republic and Caribbean markets regularly. His Afro-house sound — deep percussion, emotional tension, Afropolitan register — is the exact fit for a Caribbean island at night.', why: 'The co-curation angle: he already curates festivals, has a label relationship with Shimza, and collaborated with Diplo on the Grammy album. This is a peer conversation — not a booking form.', headline: true },
            { name: 'Shimza', tags: 'Soulistic Music · Hï Ibiza · Zamna Tulum', bio: 'South African DJ, signed to Black Coffee\'s Soulistic Music. Performed at the opening of Black Coffee\'s Hï Ibiza residency. Regular at Zamna Tulum, Ibiza Club Chinois, New York, Tokyo. The African-Caribbean sonic connection is a documentable curatorial argument.', why: 'Natural extension of the Black Coffee conversation. The label relationship makes the sequence logical. If Black Coffee is in, Shimza is the next call.', headline: true },
            { name: 'Keinemusik', tags: '&ME · Rampa · Adam Port · Global Circuit', bio: 'Currently the single biggest draw in the boutique festival circuit globally. Kloud shows sell out 5,000–10,000 seat venues in New York, Paris, London. Melodic, afro-infused house — exact register for a Caribbean island. Zamna regulars.', why: 'The FOMO booking. "Keinemusik is playing on a private island in Jamaica" moves in the right rooms immediately.', headline: false },
            { name: 'Diplo', tags: 'Port Antonio Resident · Major Lazer · Grammy Collaborator', bio: 'Permanent residence in Port Antonio, Jamaica. Hosts "Higher Ground" events drawing international fashion and music crowd. Collaborated with Black Coffee on the Grammy-winning album Subconsciously.', why: 'Not a booking. He lives here. The conversation is neighbour to neighbour — which changes the fee, the association, and the story the press tells.', headline: false },
          ].map(({ name, tags, bio, why, headline }) => (
            <div key={name} style={{ border: `1px solid ${headline ? 'rgba(200,168,75,0.4)' : 'rgba(200,168,75,0.12)'}`, padding: '36px 32px', background: headline ? 'rgba(200,168,75,0.04)' : 'rgba(13,31,20,0.4)', position: 'relative' }}>
              {headline && <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: fontMono, fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: gold, fontWeight: 700, border: `1px solid rgba(200,168,75,0.4)`, padding: '3px 8px' }}>HEADLINE</div>}
              <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 900, color: cream, marginBottom: 6, lineHeight: 1.1 }}>{name}</div>
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, marginBottom: 16 }}>{tags}</div>
              <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75, marginBottom: 16 }}>{bio}</p>
              <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.7, fontStyle: 'italic', borderTop: `1px solid rgba(200,168,75,0.1)`, paddingTop: 16, marginTop: 16 }}>{why}</p>
            </div>
          ))}
        </div>
      </Section>
      </ChapterWrap>

      {/* existing PhotoBreak between Ch04 stages and Ch05 */}
      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/island-stages-aerial_zxjfag.png" quote="Origins rises with the sun. Rebirth catches the sunset. Zungu owns the centre." label="Stage Placement · Navy Island" />

      {/* ═══ CHAPTER 5: THE EXPERIENCE ═══ */}
      <ChapterWrap bg={CHAPTERS['05'].bg} photo="/photos/blue-lagoon-port-antonio.jpg">
      <ChapterDivider num="05" eye="Chapter Five" title="The Experience." sub="Zungu is designed as a world guests move through — not a lineup they attend." accent={CHAPTERS['05'].accent} chBg={CHAPTERS['05'].bg} rgb={CHAPTERS['05'].rgb} />
      <Section id="experience" sectionBg={CHAPTERS['05'].bg} accent={CHAPTERS['05'].accent} rgb={CHAPTERS['05'].rgb}>
        <SectionHead label="The Experience" title="Built around movement." accent={CHAPTERS['05'].accent} />
        <div style={{ maxWidth: 880, marginBottom: 40 }}>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>By day, the island opens through food, coffee, bars, water, wellness, art, media, culture, retail, and discovery.</p>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>At sunset, the energy shifts.</p>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>At night, the stages take over.</p>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 32 }}>By sunrise, the island returns to rhythm — slower, deeper, changed.</p>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: gold }}>Zungu is not built around one moment. It is built around movement.</p>
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

      <PhotoBreak src="/photos/boston-bay.jpg" quote="By day the island opens. By night it transforms." label="The Experience · Navy Island" />

      {/* ═══ CHAPTER 7: THE SOUND ═══ */}
      <ChapterWrap bg={CHAPTERS['07'].bg} photo="/photos/pellew-island.jpg">
      <ChapterDivider num="07" eye="Chapter Seven" title="The Sound." sub="Electronic music through a Jamaican lens." accent={CHAPTERS['07'].accent} chBg={CHAPTERS['07'].bg} rgb={CHAPTERS['07'].rgb} />
      <Section id="sound" sectionBg={CHAPTERS['07'].bg} accent={CHAPTERS['07'].accent} rgb={CHAPTERS['07'].rgb}>
        <SectionHead label="The Sound" title="Electronic music through a Jamaican lens." accent={CHAPTERS['07'].accent} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {['Afro-house', 'Tribal house', 'Big-room electronic', 'Tech house', 'Underground house', 'Jungle', 'Drum and bass', 'Dub-influenced club music', 'Jamaican electronic', 'Sunrise sets', 'Sunset sessions', 'Mainstage nights'].map(tag => (
            <span key={tag} style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, border: `1px solid rgba(200,168,75,0.3)`, padding: '7px 14px' }}>{tag}</span>
          ))}
        </div>
        <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 700, color: cream, marginBottom: 8 }}>The sound is global.</p>
        <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 700, color: gold }}>The root is Jamaican.</p>
      </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/navy-island-wide.png" quote="The sound is global. The root is Jamaican." label="The Sound · Navy Island" />

      {/* ═══ CHAPTER 8: WHY JAMAICA? ═══ */}
      <ChapterWrap bg={CHAPTERS['08'].bg} photo="/photos/port-antonio-aerial.jpeg">
      <ChapterDivider num="08" eye="Chapter Eight" title="Why Jamaica?" sub="Because the world already moves to Jamaica." accent={CHAPTERS['08'].accent} chBg={CHAPTERS['08'].bg} rgb={CHAPTERS['08'].rgb} />
      <Section id="jamaica" sectionBg={CHAPTERS['08'].bg} accent={CHAPTERS['08'].accent} rgb={CHAPTERS['08'].rgb}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '6vw' }}>
          <div>
            <SectionHead label="Why Jamaica?" title="The world already moves to Jamaica." accent={CHAPTERS['08'].accent} />
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>Jamaican sound-system culture changed how music is played, felt, remixed, performed, and experienced.</p>
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 24 }}>That influence moved outward — through dancehall, dub, hip-hop, jungle, drum and bass, dubstep, grime, bass culture, and global electronic music.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 700, color: gold, lineHeight: 1.3 }}>Zungu brings the world back to the source.</p>
          </div>
          <div>
            <SectionHead label="Why Navy Island?" title="An island can become a world." accent={CHAPTERS['08'].accent} />
            <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>Navy Island gives Zungu what no built venue can fake: forest, water, separation, mystery, arrival, scale, and transformation.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 700, color: gold, lineHeight: 1.3 }}>For one week, it is not just Navy Island. It is Zungu.</p>
          </div>
        </div>
      </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/navy-island-aerial.jpg" quote="For one week, it is not just Navy Island. It is Zungu." label="Why Jamaica · Portland Parish" />

      {/* ═══ CHAPTER 9: PROGRAMMING ═══ */}
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
        <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: gold, marginTop: 40 }}>The island is not passive. The island performs.</p>
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

      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_FROM_THE_SEA_twhi0w.png" quote="Navy Island is the world. Port Antonio is the heartbeat behind it." label="Port Antonio · Portland Parish · Jamaica" />

      {/* ═══ CHAPTER 10: PORT ANTONIO ═══ */}
      <ChapterWrap bg={CHAPTERS['10'].bg} photo="/photos/port-antonio.jpg">
      <ChapterDivider num="10" eye="Chapter Ten" title="Port Antonio." sub="The ecosystem behind the island." accent={CHAPTERS['10'].accent} chBg={CHAPTERS['10'].bg} rgb={CHAPTERS['10'].rgb} />
      <Section id="portantonio" sectionBg={CHAPTERS['10'].bg} accent={CHAPTERS['10'].accent} rgb={CHAPTERS['10'].rgb}>
        <SectionHead label="Port Antonio" title="The ecosystem behind the island." accent={CHAPTERS['10'].accent} />
        <div style={{ maxWidth: 880, marginBottom: 32 }}>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>Zungu is anchored on Navy Island, but Port Antonio powers the experience. The town supplies the ecosystem: boats, drivers, hotels, villas, guest houses, restaurants, bars, guides, vendors, food suppliers, production crew, wellness practitioners, artists, and mainland activations.</p>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: cream, lineHeight: 1.3, marginBottom: 8 }}>Navy Island is the world.</p>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: gold, lineHeight: 1.3, marginBottom: 24 }}>Port Antonio is the heartbeat behind it.</p>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 8 }}>This is not charity language. It is business logic.</p>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9 }}>The stronger Port Antonio is inside the model, the more locally defensible Zungu becomes.</p>
        </div>
      </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/port-antonio-aerial.jpeg" quote="The ecosystem that makes everything possible." label="Port Antonio · Portland Parish" />

      {/* ═══ CHAPTER 11: INVESTOR POSITIONING ═══ */}
      <ChapterWrap bg={CHAPTERS['11'].bg} photo="/photos/blue-lagoon-port-antonio.jpg">
      <ChapterDivider num="11" eye="Chapter Eleven" title="Investor Positioning." sub="Zungu is a festival, but the opportunity is larger than one event." accent={CHAPTERS['11'].accent} chBg={CHAPTERS['11'].bg} rgb={CHAPTERS['11'].rgb} />
      <Section id="investor" sectionBg={CHAPTERS['11'].bg} accent={CHAPTERS['11'].accent} rgb={CHAPTERS['11'].rgb}>
        <SectionHead label="Investor Positioning" title="Larger than one event." accent={CHAPTERS['11'].accent} />
        <div style={{ maxWidth: 880, marginBottom: 40 }}>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, marginBottom: 16 }}>Zungu is a festival, but the opportunity is larger than one event. It is a Jamaican-born destination brand built across live experience, hospitality, sponsorship, media, artist commissions, local economic participation, and long-term cultural value.</p>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color: gold, lineHeight: 1.3 }}>The first edition creates the founding story. The platform grows from there.</p>
        </div>
        <SectionHead label="Year 1 Revenue · 5,000 Capacity" title="The case at 5,000 tickets." accent={CHAPTERS['11'].accent} />
        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fontMono, fontSize: 12, minWidth: 500, maxWidth: 800 }}>
            <tbody>
              {[
                ['GA Tickets', '3,200 × $400 avg', '$1,280,000'],
                ['VIP Tickets', '1,200 × $700 avg', '$840,000'],
                ['Glamping Tier', '600 × $1,500 avg', '$900,000'],
                ['Sponsorship & Partners', '3–4 cultural brand partners', '$450,000'],
                ['Food & Bar Revenue', '$200 per head × 5,000', '$1,000,000'],
                ['Commissioned IP & Merchandise', 'Year 1 catalog + limited edition', '$120,000'],
              ].map(([label, detail, value]) => (
                <tr key={label} style={{ borderBottom: `1px solid ${dim}` }}>
                  <td style={{ padding: '12px 16px', color: cream }}>{label}</td>
                  <td style={{ padding: '12px 16px', color: muted, fontSize: 10 }}>{detail}</td>
                  <td style={{ padding: '12px 16px', color: gold, fontWeight: 700, textAlign: 'right' }}>{value}</td>
                </tr>
              ))}
              <tr style={{ borderTop: `1px solid ${gold}` }}>
                <td colSpan={2} style={{ padding: '14px 16px', color: cream, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 10 }}>TOTAL REVENUE · Conservative scenario</td>
                <td style={{ padding: '14px 16px', color: gold, fontWeight: 700, fontSize: 18, textAlign: 'right' }}>$4,590,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <SectionHead label="Year 1 Cost Structure" title="What it costs to do this properly." accent={CHAPTERS['11'].accent} />
        <div style={{ overflowX: 'auto', marginBottom: 32 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fontMono, fontSize: 12, minWidth: 500, maxWidth: 800 }}>
            <tbody>
              {[
                ['Artist Fees', 'All acts across 7 days', '$1,000,000'],
                ['Production (4 companies)', 'Starlight, Mainevent, Yes Production, Phase Three', '$700,000'],
                ['Marine Transport', 'Ferry operators, barge schedule', '$180,000'],
                ['Island Lease (7 days)', '~1M JMD/day × 7 days', '$44,000'],
                ['Glamping Build', 'Pods, power, sanitation, access paths', '$220,000'],
                ['Insurance & Legal', 'Island-specific specialist coverage', '$95,000'],
                ['Medical Infrastructure', 'Field hospital + helipad', '$45,000'],
                ['Marketing & Press', 'Cultural story first', '$180,000'],
                ['Operations & Staffing', 'Crew, security, volunteers', '$145,000'],
                ['Food Village Infrastructure', 'Stalls, power, Portland Parish vendors', '$80,000'],
                ['Contingency (15%)', 'Island event risk premium', '$266,000'],
              ].map(([label, detail, value]) => (
                <tr key={label} style={{ borderBottom: `1px solid ${dim}` }}>
                  <td style={{ padding: '12px 16px', color: cream }}>{label}</td>
                  <td style={{ padding: '12px 16px', color: muted, fontSize: 10 }}>{detail}</td>
                  <td style={{ padding: '12px 16px', color: muted, fontWeight: 700, textAlign: 'right' }}>{value}</td>
                </tr>
              ))}
              <tr style={{ borderTop: `1px solid ${dim}` }}>
                <td colSpan={2} style={{ padding: '12px 16px', color: cream, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 10 }}>TOTAL COSTS · Base case</td>
                <td style={{ padding: '12px 16px', color: cream, fontWeight: 700, fontSize: 16, textAlign: 'right' }}>$2,955,000</td>
              </tr>
              <tr style={{ borderTop: `2px solid ${gold}` }}>
                <td colSpan={2} style={{ padding: '14px 16px', color: cream, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: 10 }}>YEAR 1 SURPLUS · Before IP revenue</td>
                <td style={{ padding: '14px 16px', color: teal, fontWeight: 700, fontSize: 20, textAlign: 'right' }}>$1,635,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', border: `1px solid rgba(200,168,75,0.12)`, margin: '28px 0' }}>
          {[['$4.59M', 'Revenue'], ['$2.96M', 'Costs'], ['$920', 'Blended avg'], ['65%', 'Breakeven occupancy']].map(([num, lbl], i, arr) => (
            <div key={lbl} style={{ flex: 1, padding: '28px 22px', borderRight: i < arr.length - 1 ? `1px solid rgba(200,168,75,0.08)` : 'none', textAlign: 'center' }}>
              <span style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 3.5vw, 42px)', fontWeight: 700, color: gold, display: 'block', lineHeight: 1 }}>{num}</span>
              <span style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: muted, display: 'block', marginTop: 6 }}>{lbl}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: 36 }}>
          {[
            { title: '$518K Seed Capital Floor', sub: 'Before ticket sales open', body: 'Artist deposits (40%), infrastructure deposits (25%), insurance and legal. Cannot open ticket sales without this confirmed.' },
            { title: '70% Presale Trigger', sub: 'Hard go/no-go — Feb 5, 2027', body: 'Full cost commitment does not proceed below 70% presale. Non-negotiable. Protects every party in the structure.' },
            { title: '40% Artist Deposits', sub: 'After insurance is bound only', body: 'Artist contracts activate only after insurance is secured and production contracts are signed. No speculative bookings for optics.' },
            { title: '15% Contingency', sub: 'Ring-fenced from day one', body: 'Island event risk premium. Built into the model from the start. Not released without production coordinator approval.' },
          ].map(({ title, sub, body }) => (
            <div key={title} style={{ border: `1px solid ${dim}`, padding: '34px 30px' }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 700, color: cream, lineHeight: 1.2, marginBottom: 6 }}>{title}</div>
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 12 }}>{sub}</div>
              <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.75 }}>{body}</p>
            </div>
          ))}
        </div>
        <QuoteBlock quote="The festival that executes flawlessly at 5,000 people on a private island in June 2027 has something no amount of money can buy in Year 3: a founding story. You can't retro-fit that. You're either in the room when it starts, or you're not." attr="Investment Thesis · Year 1" />
      </Section>
      </ChapterWrap>

      {/* ═══ REQUEST BRIEFING ═══ */}
      <ChapterWrap bg={CHAPTERS['cta'].bg} photo="/photos/aerial-island.jpg">
      <section
        ref={sectionRefs.cta}
        id="section-cta"
        className="section section--tall"
        style={{ position: 'relative' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 55% at 5% 95%, rgba(${CHAPTERS['cta'].rgb},.08) 0%, transparent 55%)`, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SectionHead label="Request Briefing" title="Submit your enquiry." goldLine="We respond by role." accent={CHAPTERS['cta'].accent} />
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 580, marginBottom: 16 }}>Zungu briefing access is reviewed by role. Submit your enquiry and the team will respond with the appropriate investor, production, supplier, strategic partner, or press material.</p>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: muted, lineHeight: 1.9, maxWidth: 580, marginBottom: 40 }}>The next step is a conversation, not a commitment.</p>
          <a href="mailto:partnership@zungufestival.com?subject=Briefing%20Request" style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, padding: '16px 36px', background: gold, color: bg, border: 'none', cursor: 'pointer', display: 'inline-block', textDecoration: 'none' }}>Request Briefing →</a>
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
