'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const IslandOverviewMap = dynamic(() => import('./maps/IslandOverviewMap'), { ssr: false });
const StageMap = dynamic(() => import('./maps/StageMap'), { ssr: false });

// ── Design tokens ─────────────────────────────────────────────────────────────
const bg = '#060808';
const green = '#1A3A2A';
const gold = '#C8A84B';
const teal = '#1E6B5C';
const cream = '#F2EBD9';
const muted = 'rgba(107,99,85,0.92)';
const dim = 'rgba(242,235,217,0.18)';
const rust = '#C45A2A';

const fontDisplay = "'Unbounded', sans-serif";
const fontMono = "'Space Mono', monospace";

// ── Section IDs for dot-nav ───────────────────────────────────────────────────
const SECTIONS = ['brand', 'island', 'why', 'artists', 'model', 'numbers', 'roadmap', 'cta'] as const;
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
}

function ChapterDivider({ num, eye, title, sub }: ChapterProps) {
  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: bg,
        borderTop: `1px solid rgba(200,168,75,0.15)`,
      }}
    >
      <div style={{ padding: '72px 8vw 0', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {/* Ghost number — flex item matching .ch-n */}
          <div
            style={{
              fontFamily: fontDisplay,
              fontSize: 88,
              fontWeight: 900,
              color: 'rgba(200,168,75,0.18)',
              lineHeight: 1,
              flexShrink: 0,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {num}
          </div>
          {/* Text content */}
          <div>
            <p style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.6em', color: gold, textTransform: 'uppercase', marginBottom: 10 }}>
              {eye}
            </p>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700, color: cream, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, marginTop: 10, lineHeight: 1.7, maxWidth: 540 }}>
              {sub}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
interface SectionProps {
  id?: string;
  children: React.ReactNode;
  dark?: boolean;
  style?: React.CSSProperties;
}

function Section({ id, children, dark, style }: SectionProps) {
  return (
    <section
      id={id}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: dark ? green : bg,
        ...style,
      }}
    >
      <div style={{ padding: '88px 8vw', boxSizing: 'border-box' }}>
        {children}
      </div>
    </section>
  );
}

// ── Quote block ───────────────────────────────────────────────────────────────
interface QuoteBlockProps {
  quote: string;
  attr: string;
}

function QuoteBlock({ quote, attr }: QuoteBlockProps) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${gold}`,
        paddingLeft: 28,
        margin: '48px 0',
        maxWidth: 680,
      }}
    >
      <p
        style={{
          fontFamily: fontDisplay,
          fontSize: 'clamp(16px, 2.2vw, 24px)',
          fontWeight: 600,
          color: cream,
          lineHeight: 1.45,
          marginBottom: 14,
          fontStyle: 'italic',
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <p
        style={{
          fontFamily: fontMono,
          fontSize: 8,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: gold,
          fontWeight: 700,
        }}
      >
        — {attr}
      </p>
    </div>
  );
}

// ── Body text ─────────────────────────────────────────────────────────────────
function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: fontMono,
        fontSize: 13,
        color: muted,
        lineHeight: 1.9,
        maxWidth: 680,
        marginBottom: 18,
      }}
    >
      {children}
    </p>
  );
}

// ── Section label + title ─────────────────────────────────────────────────────
interface SectionHeadProps {
  label?: string;
  title: string;
  titleColor?: string;
  goldLine?: string;
}

function SectionHead({ label, title, titleColor = cream, goldLine }: SectionHeadProps) {
  return (
    <div style={{ marginBottom: 36 }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
          <div style={{ width: 28, height: 1, background: gold, flexShrink: 0 }} />
          <p
            style={{
              fontFamily: fontMono,
              fontSize: 9,
              letterSpacing: '0.6em',
              textTransform: 'uppercase',
              color: gold,
              fontWeight: 700,
            }}
          >
            {label}
          </p>
        </div>
      )}
      <h3
        style={{
          fontFamily: fontDisplay,
          fontSize: 'clamp(24px, 4vw, 54px)',
          fontWeight: 700,
          color: titleColor,
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          marginBottom: 28,
        }}
      >
        {title}
        {goldLine && (
          <><br /><span style={{ color: gold }}>{goldLine}</span></>
        )}
      </h3>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DeckContent({ navLabel = 'INVESTOR DECK' }: { navLabel?: string }) {
  // Refs for section scroll targets
  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>> = {
    brand: useRef<HTMLElement>(null),
    island: useRef<HTMLElement>(null),
    why: useRef<HTMLElement>(null),
    artists: useRef<HTMLElement>(null),
    model: useRef<HTMLElement>(null),
    numbers: useRef<HTMLElement>(null),
    roadmap: useRef<HTMLElement>(null),
    cta: useRef<HTMLElement>(null),
  };

  // Nav ref for section scrolls
  const navRefs = {
    brand: useRef<HTMLDivElement>(null),
    island: useRef<HTMLDivElement>(null),
    why: useRef<HTMLDivElement>(null),
    artists: useRef<HTMLDivElement>(null),
    model: useRef<HTMLDivElement>(null),
    numbers: useRef<HTMLDivElement>(null),
    roadmap: useRef<HTMLDivElement>(null),
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
    fontFamily: fontMono,
    fontSize: 9,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: muted,
    fontWeight: 700,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 0',
    textDecoration: 'none',
    transition: 'color 0.2s',
  };

  return (
    <div style={{ backgroundColor: bg, color: cream, fontFamily: fontMono, position: 'relative', width: '100%', minHeight: '100vh' }}>

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
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 52,
          zIndex: 900,
          backgroundColor: 'rgba(6,8,8,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${dim}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 6vw',
          gap: 16,
        }}
      >
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
              ['The Brand', 'brand'],
              ['The Island', 'island'],
              ['Why Now', 'why'],
              ['Artists', 'artists'],
              ['The Model', 'model'],
              ['Numbers', 'numbers'],
            ] as [string, SectionId][]
          ).map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              style={navLinkStyle}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right: CTA + activities + badge + sign out (desktop) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexShrink: 0,
          }}
        >
          <button
            onClick={scrollToCta}
            className="deck-nav-desktop"
            style={{
              fontFamily: fontMono,
              fontSize: 9,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '8px 18px',
              background: gold,
              color: bg,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Request Briefing →
          </button>
          <a
            href="/activities"
            className="deck-nav-desktop"
            style={{ ...navLinkStyle, display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            Activities
          </a>
          <a
            href="/stages"
            className="deck-nav-desktop"
            style={{ ...navLinkStyle, display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            Stages
          </a>
          <span
            className="deck-nav-desktop"
            style={{
              fontFamily: fontMono,
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: gold,
              border: `1px solid rgba(200,168,75,0.35)`,
              padding: '4px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            {navLabel.toUpperCase()}
          </span>
          <a
            href="/sign-out"
            className="deck-nav-desktop"
            style={{
              fontFamily: fontMono,
              fontSize: 9,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: muted,
              textDecoration: 'none',
            }}
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
                ['The Brand', 'brand'],
                ['The Island', 'island'],
                ['Why Now', 'why'],
                ['Artists', 'artists'],
                ['The Model', 'model'],
                ['Numbers', 'numbers'],
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
      <div
        style={{
          position: 'fixed',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 800,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {SECTIONS.map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            title={id}
            style={{
              width: activeSection === id ? 8 : 5,
              height: activeSection === id ? 8 : 5,
              borderRadius: '50%',
              background: activeSection === id ? gold : dim,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.25s',
              display: 'block',
            }}
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
            A 64-acre private island in the Caribbean.{' '}
            <strong style={{ color: cream }}>No other festival has this site.</strong>
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
            You arrive by boat. Before a note plays, you&rsquo;re already somewhere else.
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
              onClick={() => scrollToSection('island')}
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

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 1: THE BRAND
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="01"
        eye="Chapter One"
        title="The Brand."
        sub="What Zungu is. What it is not. The mandate, the manifesto, and the positioning that travels into every institutional room."
      />

      {/* Section: The Mandate */}
      <Section id="section-brand">
        <SectionHead label="The Mandate" title="Jamaica shaped the DNA of global electronic music." />
        <div style={{ maxWidth: 880, marginBottom: 32 }}>
          {[
            { text: 'That energy traveled outward.', weight: 300 },
            { text: 'To London. To Berlin. To Belgium. To New York.', weight: 300 },
            { text: 'It became house. Techno. Drum & Bass. The culture as we know it.', weight: 300 },
            { text: 'But the source never positioned itself as the destination.', weight: 400 },
          ].map(({ text, weight }) => (
            <p
              key={text}
              style={{
                fontFamily: fontDisplay,
                fontSize: 'clamp(15px, 2.2vw, 26px)',
                fontWeight: weight,
                lineHeight: 1.5,
                color: cream,
                marginBottom: 6,
              }}
            >
              {text}
            </p>
          ))}
          <p
            style={{
              fontFamily: fontDisplay,
              fontSize: 'clamp(20px, 3vw, 38px)',
              fontWeight: 700,
              lineHeight: 1.3,
              color: gold,
              marginTop: 20,
            }}
          >
            Zungu corrects that.
          </p>
        </div>
        <QuoteBlock
          quote="Jamaica interpreting its own influence — on its own soil — at international production standards."
          attr="Core Brand Positioning"
        />
      </Section>

      {/* Section: What Zungu Is */}
      <Section dark>
        <SectionHead label="What Zungu Is" title="Not a festival." goldLine="A position shift." />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >
          {[
            {
              not: 'A reggae festival with EDM acts',
              is: 'Jamaica reinterpreting its own sonic legacy at world-class scale',
            },
            {
              not: 'A touring circuit stop with a Caribbean backdrop',
              is: 'A permanently rooted cultural institution with commissioning power',
            },
            {
              not: 'A spectacle designed to trend',
              is: 'Infrastructure designed to endure — a cultural node built to last, not perform',
            },
          ].map(({ not, is }) => (
            <div
              key={not}
              style={{
                border: `1px solid rgba(200,168,75,0.1)`,
                padding: '26px 22px',
                background: 'rgba(14,24,18,0.8)',
              }}
            >
              <div style={{ fontFamily: fontMono, fontSize: 7, letterSpacing: '0.5em', color: rust, textTransform: 'uppercase', marginBottom: 9 }}>Not this</div>
              <p style={{ fontFamily: fontMono, fontSize: 13, fontStyle: 'italic', color: 'rgba(242,235,217,0.28)', textDecoration: 'line-through', textDecorationColor: rust, marginBottom: 13, lineHeight: 1.6 }}>{not}</p>
              <div style={{ height: 1, background: 'rgba(200,168,75,0.1)', marginBottom: 13 }} />
              <div style={{ fontFamily: fontMono, fontSize: 7, letterSpacing: '0.5em', color: teal, textTransform: 'uppercase', marginBottom: 9 }}>But this</div>
              <p style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 700, color: cream, lineHeight: 1.4 }}>{is}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: Brand Pillars */}
      <Section>
        <SectionHead label="Brand Pillars" title="What every creative decision" goldLine="must answer to." />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >
          {[
            {
              num: '01',
              title: 'Authorship,\nNot Appropriation',
              body: 'Every asset must feel made in Jamaica, not imported to it. Visual language, music, storytelling — all originate from Jamaican context and expand outward.',
            },
            {
              num: '02',
              title: 'Continuity,\nNot Nostalgia',
              body: 'Zungu honours the past without performing it. Heritage is context, not costume. The visual world must feel contemporary while being undeniably rooted.',
            },
            {
              num: '03',
              title: 'Discipline,\nNot Volume',
              body: 'Every decision about scale, about bookings, about partners — must protect the quality of the experience. The thing that makes Zungu worth attending is also the thing most at risk from over-expansion.',
            },
          ].map(({ num, title, body }) => (
            <div
              key={num}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid rgba(200,168,75,0.11)`,
                padding: '30px 24px',
                position: 'relative',
              }}
            >
              <div style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.4em', color: gold, marginBottom: 13, opacity: 0.7 }}>{num}</div>
              <div style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 700, color: cream, marginBottom: 11, lineHeight: 1.25, whiteSpace: 'pre-line' }}>{title}</div>
              <p style={{ fontFamily: fontMono, fontSize: 13, lineHeight: 1.8, color: 'rgba(242,235,217,0.52)' }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 2: THE ISLAND
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="02"
        eye="Chapter Two"
        title="The Island."
        sub="Navy Island. Port Antonio, Jamaica. 64 acres. The site that makes everything else possible."
      />

      {/* Photo break 1 */}
      <PhotoBreak
        src="/photos/aerial-island.jpg"
        quote="Island. Water. Isolation."
        label="Portland Parish · Caribbean"
      />

      {/* Section: The Site */}
      <Section id="section-island">
        <SectionHead label="The Site" title="Nobody has done this in the Caribbean. Yet." />
        <BodyText>
          Navy Island sits in Port Antonio&rsquo;s West Harbour. 64 acres. Surrounded by water on every side. The Errol Flynn Marina is the departure point — a five-minute crossing that is the first act of the experience. Before a single artist is announced, you&rsquo;re already arriving somewhere extraordinary.
        </BodyText>
        <BodyText>
          Tomorrowland spent millions building a fantasy world. <em>Zungu doesn&rsquo;t need to build one. The world is already there.</em> No other festival in the Caribbean has a site like this. That is not a marketing claim. It is a fact about real estate.
        </BodyText>

        {/* Stat row */}
        <div style={{ display: 'flex', border: `1px solid rgba(200,168,75,0.12)`, margin: '28px 0' }}>
          {[
            ['64', 'Acres · Navy Island'],
            ['~5 min', 'Water crossing from mainland'],
            ['0', 'Comparable sites in the Caribbean'],
            ['1M JMD', 'Daily lease (verbally confirmed)'],
          ].map(([num, label], i, arr) => (
            <div key={label} style={{ flex: 1, padding: '28px 22px', borderRight: i < arr.length - 1 ? `1px solid rgba(200,168,75,0.08)` : 'none', textAlign: 'center' }}>
              <span style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 3.5vw, 42px)', fontWeight: 700, color: gold, display: 'block', lineHeight: 1 }}>{num}</span>
              <span style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: muted, display: 'block', marginTop: 6 }}>{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: Geographic Context */}
      <Section>
        <SectionHead
          label="Port Antonio"
          title="Undiscovered at this scale."
        />
        <BodyText>
          Port Antonio sits outside Jamaica&rsquo;s mass tourism corridor. No cruise ships. No all-inclusives. No package holiday energy. The town is known by those who seek it — which is exactly the audience Zungu is built for.
        </BodyText>
        <BodyText>
          This is the Tulum 2017 feeling. A genuinely undiscovered location at exactly the moment a world-class event arrives. The people who went to Zamna in its first year — 800 people in a jungle cenote — still talk about it. <em>Port Antonio in 2027 is that conversation.</em>
        </BodyText>
        <QuoteBlock
          quote="Tomorrowland built a fantasy world. Zungu doesn't need to build anything. The world is already there."
          attr="Site Strategy"
        />
      </Section>

      {/* Map 1: Overview */}
      <Section>
        <SectionHead label="Marina → Island Crossing Overview" title="The crossing." />
        <div>
          <IslandOverviewMap />
        </div>
      </Section>

      {/* Section: Stage Placement */}
      <Section id="section-island-stages">
        <SectionHead label="Stage Placement · Navy Island" title="Three stages. One island." />
        <BodyText>
          Provisional placement across the island&rsquo;s natural terrain. Stages face the sea — not the town.
          Final positioning subject to site survey.
        </BodyText>

        {/* Map 2: Stage map */}
        <div style={{ marginBottom: 32 }}>
          <StageMap />
        </div>

        {/* Stage legend */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px 40px',
            marginBottom: 48,
          }}
        >
          {[
            { color: gold, name: 'ZUNGU MAIN', sub: 'Stage II · Headline' },
            { color: teal, name: 'ORIGINS', sub: 'Stage I · Heritage → Electronic' },
            { color: rust, name: 'REBIRTH', sub: 'Stage III · Future Sounds' },
            { color: dim, name: 'ARRIVAL DOCK', sub: '~5 min from Errol Flynn Marina' },
          ].map(({ color, name, sub }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: color,
                  flexShrink: 0,
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: fontMono,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: color === dim ? muted : cream,
                    display: 'block',
                  }}
                >
                  {name}
                </span>
                <span
                  style={{
                    fontFamily: fontMono,
                    fontSize: 8,
                    color: muted,
                    letterSpacing: '0.15em',
                  }}
                >
                  {sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stacked map images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <img
            src="/photos/navy-island-stage-map.png"
            style={{ width: '100%', display: 'block', border: `1px solid ${dim}` }}
            alt="Navy Island Stage and Pathway Map"
          />
          <img
            src="/photos/navy-island-satellite.png"
            style={{ width: '100%', display: 'block', border: `1px solid ${dim}` }}
            alt="Navy Island Satellite"
          />
        </div>

        {/* Stage concept images */}
        <div style={{ marginTop: 40 }}>
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 8,
              letterSpacing: '0.45em',
              color: gold,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            // Stage Concepts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { src: '/photos/aerial-island.jpg', label: 'ISLAND OVERVIEW — Three stages. One island.', sub: 'Wide aerial · Three stages visible from above' },
              { src: '/photos/navy-island-wide.png', label: 'NAVY ISLAND — Full extent · Caribbean setting', sub: 'Approached from Port Antonio Marina' },
              { src: '/photos/princess-island-portantonio.jpg', label: 'PORT ANTONIO — Princess Island · Harbour mouth', sub: 'Context · Portland Parish coastline' },
              { src: '/photos/NAVY%20ISLAND%20-%20CLOSE%20UP%20.png', label: 'NAVY ISLAND — Landing zone · Northern tip', sub: 'Arrival dock · ~5 min crossing from Errol Flynn Marina' },
              { src: '/photos/NAVY%20ISLAND%20-%20FROM%20%20tHE%20TOWN%20.png', label: 'NAVY ISLAND — View from Port Antonio', sub: 'The island as attendees first see it' },
              { src: '/photos/stage-beach-aerial.png', label: 'ZUNGU MAIN — South face · Open water', sub: 'Full production · Faces the Caribbean' },
              { src: '/photos/origins-stage.jpg', label: 'ORIGINS — Bamboo architecture', sub: 'East tip · Sunrise · 500 capacity' },
              { src: '/photos/stage-rebirth-aerial.png', label: 'REBIRTH — Island edge · Water surround', sub: 'West point · Sunset facing · 800 capacity' },
              { src: '/photos/stage-beach-activities.png', label: 'THE ISLAND BETWEEN SETS', sub: 'Caribbean water · Daytime programme' },
            ].map(({ src, label, sub }) => (
              <div key={src} style={{ position: 'relative' }}>
                <img
                  src={src}
                  style={{ width: '100%', display: 'block', filter: 'saturate(0.75) brightness(0.9)' }}
                  alt={label}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 16px',
                    background: 'linear-gradient(to top, rgba(6,8,8,0.85) 0%, rgba(6,8,8,0) 100%)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <span style={{ fontFamily: fontMono, fontSize: 9, color: cream, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
                  <span style={{ fontFamily: fontMono, fontSize: 8, color: muted, letterSpacing: '0.15em' }}>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link to full stages breakdown */}
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${dim}` }}>
          <a
            href="/stages"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: fontMono,
              fontSize: 10,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: gold,
              textDecoration: 'none',
              border: `1px solid rgba(200,168,75,0.3)`,
              padding: '12px 24px',
              transition: 'border-color 0.2s',
            }}
          >
            Full Stage Breakdown →
          </a>
          <p style={{ fontFamily: fontMono, fontSize: 10, color: muted, marginTop: 12, letterSpacing: '0.1em' }}>
            Origins · Rebirth · Zungu Main — stage architecture, schedules, and nightly programming
          </p>
        </div>
      </Section>

      {/* Photo break 3 */}
      <PhotoBreak
        src="/photos/navy-island-port-antonio.jpeg"
        quote="You arrive over water."
        label="Navy Island · Port Antonio"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 3: WHY NOW
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="03"
        eye="Chapter Three"
        title="Why Now."
        sub="Jamaica shaped the DNA of global electronic music. Zungu is the first festival to stand on that island and prove it."
      />

      {/* Section: The Gap */}
      <Section id="section-why">
        <SectionHead label="The Gap" title="The most musically significant island on earth. No flagship electronic festival." />
        <BodyText>
          A country of less than three million people has shaped the sound of every continent. From Bob Marley to Lee Scratch Perry. From Shaka Demus and Pliers to Sister Nancy. The music that came out of Jamaica travelled further and hit harder than almost anything that followed it.
        </BodyText>
        <BodyText>
          Sound system culture in Kingston pioneered DJ-led performance — the structural template for every club and festival globally. King Tubby and Lee Scratch Perry invented studio techniques in their yards that became the foundation of electronic music production. The Jamaican diaspora seeded UK rave scenes, directly birthing jungle, drum and bass, and dubstep.
        </BodyText>
        <BodyText>
          <em>That lineage runs straight to every dance floor the bass has ever reached.</em> And yet — no world-class electronic festival has ever stood on that island and made the argument out loud. Not as a lecture. As a party.
        </BodyText>

        {/* Stat row */}
        <div
          style={{
            display: 'flex',
            border: `1px solid rgba(200,168,75,0.12)`,
            margin: '28px 0',
          }}
        >
          {[
            ['0', 'World-class electronic festivals in Jamaica'],
            ['$7.4B', 'Global electronic music market 2024'],
            ['2027', 'The timing window'],
          ].map(([num, label], i, arr) => (
            <div
              key={label}
              style={{
                flex: 1,
                padding: '28px 22px',
                borderRight: i < arr.length - 1 ? `1px solid rgba(200,168,75,0.08)` : 'none',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 'clamp(22px, 3.5vw, 42px)',
                  fontWeight: 700,
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
                  fontSize: 8,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: muted,
                  display: 'block',
                  marginTop: 6,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Photo break 4 */}
      <PhotoBreak
        src="/photos/boston-bay.jpg"
        quote="Boston Bay. The original yard."
        label="Boston Bay · Portland Parish · Birthplace of Jamaican jerk"
        height="60vh"
      />

      {/* Photo break 5 */}
      <PhotoBreak
        src="/photos/blue-lagoon-port-antonio.jpg"
        quote="The water that shaped the sound."
        label="Blue Lagoon · Portland Parish"
        height="60vh"
      />

      {/* Section: The Lineage */}
      <Section dark>
        <SectionHead label="The Lineage" title="Documented. Traceable. Defensible." />

        {/* Timeline */}
        <div style={{ marginTop: 40, position: 'relative', maxWidth: 600 }}>
          <div
            style={{
              position: 'absolute',
              left: 7,
              top: 8,
              bottom: 0,
              width: 1,
              background: `linear-gradient(to bottom, ${gold}, ${dim})`,
            }}
          />
          {[
            {
              year: '1950s – 60s · Sound System Culture',
              body: "Kingston's mobile speaker stacks and MC toasting pioneered DJ-led performance — the structural template for all club and festival culture globally. The sound system was the first festival. Jamaica built it first.",
              filled: true,
            },
            {
              year: '1970s · Dub Engineering',
              body: 'King Tubby and Lee Scratch Perry treated the studio as an instrument — inventing remix culture and electronic production as art. Made in Jamaican yards, without names yet, before anyone called it technique.',
              filled: true,
            },
            {
              year: '1980s – 90s · Diaspora & Bass Music',
              body: 'Jamaican sound system culture seeded UK rave scenes, directly birthing jungle, drum and bass, and dubstep. The thread is documentable. Every genre has a traceable debt to the Jamaican sound system.',
              filled: true,
            },
            {
              year: '2027 · Zungu Festival',
              body: 'Jamaica steps back into the global electronic conversation — not as historical footnote, but as host. The island that exported the sound, hosting the sound. On a private island. For the first time.',
              filled: false,
            },
          ].map(({ year, body, filled }) => (
            <div
              key={year}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                marginBottom: 32,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  border: `2px solid ${gold}`,
                  background: filled ? gold : 'transparent',
                  flexShrink: 0,
                  marginTop: 2,
                  zIndex: 1,
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: fontMono,
                    fontSize: 9,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: gold,
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  {year}
                </span>
                <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.75, margin: 0 }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: Competitive Landscape */}
      <Section>
        <SectionHead label="Competitive Landscape" title="Comparable tier. Distinct territory." />
        <BodyText>
          Zamna sells a jungle you had to find. SXM sells boutique Caribbean luxury. Dekmantel sells curatorial credibility. Tomorrowland sells a fantasy world. Zungu sells a private island in Jamaica — with a documented sonic lineage that none of them have.
        </BodyText>

        {/* Comp table */}
        <div style={{ overflowX: 'auto', marginTop: 32, marginBottom: 40 }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: fontMono,
              fontSize: 11,
              minWidth: 600,
            }}
          >
            <thead>
              <tr style={{ borderBottom: `1px solid ${dim}` }}>
                {['Festival', 'Location', 'Core Proposition', 'Year 1', 'Now'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontSize: 8,
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: gold,
                      fontWeight: 700,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Tomorrowland', 'Belgium', 'Global fantasy world', '~10,000', '200,000+', false],
                ['Zamna', 'Tulum, Mexico', 'Jungle discovery', '800', '30,000+', false],
                ['SXM Festival', 'St. Martin', 'Caribbean boutique', '~2,000', '5,000+', false],
                ['Dekmantel', 'Amsterdam', 'Curatorial authority', '3,000', '35,000', false],
                ['ZUNGU', 'Navy Island, Jamaica', 'Private island · Sonic lineage', '5,000', '—', true],
              ].map(([name, loc, prop, y1, now, highlight]) => (
                <tr
                  key={name as string}
                  style={{
                    borderBottom: `1px solid ${dim}`,
                    background: highlight ? 'rgba(200,168,75,0.07)' : 'transparent',
                  }}
                >
                  <td
                    style={{
                      padding: '12px 16px',
                      color: highlight ? gold : cream,
                      fontWeight: highlight ? 700 : 400,
                      letterSpacing: highlight ? '0.15em' : 0,
                    }}
                  >
                    {name as string}
                  </td>
                  <td style={{ padding: '12px 16px', color: muted }}>{loc as string}</td>
                  <td style={{ padding: '12px 16px', color: muted }}>{prop as string}</td>
                  <td style={{ padding: '12px 16px', color: highlight ? gold : muted }}>{y1 as string}</td>
                  <td style={{ padding: '12px 16px', color: muted }}>{now as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <QuoteBlock
          quote="Zamna's first year was 800 people in a jungle cenote. No marketing budget. Pure word of mouth. Within 4 years it was one of the most influential boutique events in the world. Geography plus cultural specificity plus discipline beats scale every time."
          attr="Precedent · Zamna Tulum, est. 2017"
        />
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 4: ARTISTS
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="04"
        eye="Chapter Four"
        title="The Artists."
        sub="Not just a lineup. A co-curation conversation. The artists who make the audience fly."
      />

      {/* Section: Headline Proposition */}
      <Section id="section-artists">
        <SectionHead label="The Headline Proposition" title="Black Coffee. Not a booking. A co-curator." />
        <BodyText>
          Black Coffee runs his own festival — the Black Coffee Weekender in Cape Town, now in its second edition. He curates lineups, commissions collaborations, and has a Grammy for Best Dance/Electronic Album. His Hï Ibiza residency ran 7 consecutive seasons. He has sold out Madison Square Garden.
        </BodyText>
        <BodyText>
          His label Soulistic Music signed Shimza. They perform back-to-back. They opened Hï Ibiza together. They share an artistic philosophy and a working relationship that makes the outreach sequence logical rather than speculative.
        </BodyText>
        <BodyText>
          The conversation is not: <em>&ldquo;We&rsquo;ll pay your fee.&rdquo;</em> It is: <em>&ldquo;We&rsquo;re building something on a private island in Jamaica — the most musically significant island in the Caribbean. Would you want your name on this from the beginning?&rdquo;</em> A co-curation arrangement — equity and association instead of a guaranteed fee — changes everything about the financial structure.
        </BodyText>

        {/* Artist cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            marginTop: 28,
          }}
        >
          {[
            {
              name: 'Black Coffee',
              tags: 'Grammy Winner · Soulistic Music · Hï Ibiza · 7 Seasons',
              bio: 'South African DJ, Grammy-winning artist, festival curator. Runs his own event — the Black Coffee Weekender. Plays the Dominican Republic and Caribbean markets regularly. His Afro-house sound — deep percussion, emotional tension, Afropolitan register — is the exact fit for a Caribbean island at night.',
              why: 'The co-curation angle: he already curates festivals, has a label relationship with Shimza, and collaborated with Diplo on the Grammy album. This is a peer conversation — not a booking form.',
              headline: true,
            },
            {
              name: 'Shimza',
              tags: 'Soulistic Music · Hï Ibiza · Zamna Tulum',
              bio: 'South African DJ, signed to Black Coffee\'s Soulistic Music. Performed at the opening of Black Coffee\'s Hï Ibiza residency. Regular at Zamna Tulum, Ibiza Club Chinois, New York, Tokyo. The African-Caribbean sonic connection is a documentable curatorial argument — Shimza at Zungu is not a stretch. It is the thesis.',
              why: 'Natural extension of the Black Coffee conversation. The label relationship makes the sequence logical. If Black Coffee is in, Shimza is the next call.',
              headline: true,
            },
            {
              name: 'Keinemusik',
              tags: '&ME · Rampa · Adam Port · Global Circuit',
              bio: 'Currently the single biggest draw in the boutique festival circuit globally. Kloud shows sell out 5,000–10,000 seat venues in New York, Paris, London. Melodic, afro-infused house — exact register for a Caribbean island. Zamna regulars. The audience that follows Keinemusik is looking for the next undiscovered version of what Zamna was in 2017.',
              why: 'The FOMO booking. "Keinemusik is playing on a private island in Jamaica" moves in the right rooms immediately.',
              headline: false,
            },
            {
              name: 'Diplo',
              tags: 'Port Antonio Resident · Major Lazer · Grammy Collaborator',
              bio: 'Permanent residence in Port Antonio, Jamaica. Hosts "Higher Ground" events drawing international fashion and music crowd. Collaborated with Black Coffee on the Grammy-winning album Subconsciously. Bridges the international electronic circuit and the Jamaican market better than almost anyone alive.',
              why: 'Not a booking. He lives here. The conversation is neighbour to neighbour — which changes the fee, the association, and the story the press tells.',
              headline: false,
            },
          ].map(({ name, tags, bio, why, headline }) => (
            <div
              key={name}
              style={{
                border: `1px solid ${headline ? 'rgba(200,168,75,0.4)' : 'rgba(200,168,75,0.12)'}`,
                padding: '36px 32px',
                background: headline ? 'rgba(200,168,75,0.04)' : 'rgba(13,31,20,0.4)',
                position: 'relative',
              }}
            >
              {headline && (
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    fontFamily: fontMono,
                    fontSize: 7,
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: gold,
                    fontWeight: 700,
                    border: `1px solid rgba(200,168,75,0.4)`,
                    padding: '3px 8px',
                  }}
                >
                  HEADLINE
                </div>
              )}
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 'clamp(18px, 2.5vw, 28px)',
                  fontWeight: 900,
                  color: '#fff',
                  marginBottom: 6,
                  lineHeight: 1.1,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontFamily: fontMono,
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: gold,
                  marginBottom: 16,
                }}
              >
                {tags}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.75, marginBottom: 16 }}>
                {bio}
              </p>
              <p
                style={{
                  fontFamily: fontMono,
                  fontSize: 11,
                  color: muted,
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  borderTop: `1px solid rgba(200,168,75,0.1)`,
                  paddingTop: 16,
                  marginTop: 16,
                }}
              >
                {why}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Photo break 5 */}
      <PhotoBreak
        src="/photos/origins-stage.jpg"
        quote="The crowd. The canopy. The sea."
        label="Origins Stage · Zungu 2027"
        height="68vh"
      />

      {/* Section: Commissioning Model */}
      <Section dark>
        <SectionHead label="The Commissioning Model" title="Music made on the island. IP that outlives the weekend." />
        <BodyText>
          Every edition of Zungu commissions original collaborations between Jamaican producers and international artists. Recorded on Navy Island. Released on Zungu&rsquo;s label. The festival owns the publishing, artists retain performance rights, every partner credited on the release.
        </BodyText>
        <BodyText>
          This generates IP, press coverage, and audience engagement well beyond seven days. The commissioning model is what separates Zungu from every festival that books the same artists in a different location.
        </BodyText>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginTop: 28,
          }}
        >
          {[
            {
              title: 'Year 1 Target',
              sub: 'First Edition',
              body: '6–8 original commissioned tracks. One Jamaican producer + one international artist per track. Recorded on the island. Released on Zungu Records before or during the festival week.',
            },
            {
              title: 'The IP Value',
              sub: 'Long-term Asset',
              body: 'Streaming, licensing, merchandise. A catalog that builds year on year. The festival as record label — generating revenue independent of ticket sales, compounding in value.',
            },
            {
              title: 'The Press Story',
              sub: 'Cultural Narrative',
              body: 'RA, Mixmag, Pitchfork are not covering "festival in Jamaica." They\'re covering "Black Coffee and Shimza commissioned a track on a private island with a Jamaican producer." That story writes itself.',
            },
          ].map(({ title, sub, body }) => (
            <div
              key={title}
              style={{
                border: `1px solid ${dim}`,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 700, color: cream, marginBottom: 4 }}>
                {title}
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 12 }}>
                {sub}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.8 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 5: THE MODEL
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="05"
        eye="Chapter Five"
        title="The Model."
        sub="5,000 tickets. 7 days. Three tiers. The structure that makes this sustainable from Year 1."
      />

      {/* Section: Ticket Architecture */}
      <Section id="section-model">
        <SectionHead label="Ticket Architecture" title="5,000 tickets. One island. Hard cap." />
        <BodyText>
          5,000 is the number that creates urgency without sacrificing the experience. At peak moments, 5,000 people distribute across three stages, the food village, the water, the glamping village. No stage is ever crushingly full. The island breathes. And missing it feels like missing something — which is the foundation of FOMO.
        </BodyText>
        <BodyText>
          Glamping is not a separate headcount — it is a ticket tier, exactly as Tomorrowland&rsquo;s Dreamville operates. One wristband. Different experience levels. Same 5,000 people.
        </BodyText>

        {/* Ticket tier cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            marginTop: 28,
          }}
        >
          {[
            {
              tier: 'GA',
              sub: 'General Admission · 3,200 tickets',
              desc: 'Full festival access. Off-island accommodation in Port Antonio. Still an extraordinary experience — the island, the stages, the water, the music.',
              price: '$350 – 450',
              priceLabel: '7-day pass',
              borderColor: 'rgba(200,168,75,0.2)',
              bgColor: bg,
              priceColor: gold,
            },
            {
              tier: 'VIP',
              sub: 'Premium Access · 1,200 tickets',
              desc: 'Festival access plus premium viewing, dedicated bar service, artist access zones. A materially different on-island experience from GA.',
              price: '$600 – 800',
              priceLabel: '7-day pass',
              borderColor: 'rgba(200,168,75,0.4)',
              bgColor: 'rgba(200,168,75,0.05)',
              priceColor: gold,
            },
            {
              tier: 'GLAMPING',
              sub: 'On-Island Immersion · 600 tickets',
              desc: 'Full festival access plus on-island accommodation. You sleep on the island. You wake up on the island. For seven days, Navy Island is your entire world.',
              price: '$1,200 – 1,800',
              priceLabel: '7-day pass · accommodation included',
              borderColor: 'rgba(200,168,75,0.2)',
              bgColor: bg,
              priceColor: gold,
            },
          ].map(({ tier, sub, desc, price, priceLabel, borderColor, bgColor, priceColor }) => (
            <div
              key={tier}
              style={{
                border: `1px solid ${borderColor}`,
                padding: '34px 30px',
                background: bgColor,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 22,
                  fontWeight: 700,
                  color: cream,
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {tier}
              </div>
              <div
                style={{
                  fontFamily: fontMono,
                  fontSize: 8,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: muted,
                  marginBottom: 16,
                }}
              >
                {sub}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.8, flex: 1 }}>
                {desc}
              </p>
              <div style={{ marginTop: 16 }}>
                <div
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: 18,
                    fontWeight: 700,
                    color: priceColor,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {price}
                </div>
                <div
                  style={{
                    fontFamily: fontMono,
                    fontSize: 8,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: dim,
                  }}
                >
                  {priceLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <PhotoBreak
        src="/photos/zungu-glamping-pods.png"
        quote="You wake up on the island."
        label="On-Island Accommodation · Glamping Village"
        height="65vh"
      />

      {/* Section: The Audience */}
      <Section dark>
        <SectionHead label="The Audience" title="Someone who has already been to Belgium." />
        <BodyText>
          Our primary audience has been to Tomorrowland, Zamna, or Dekmantel. They plan summers around festivals. They spend real money on experiences without much persuasion — because they know what a good one feels like.
        </BodyText>
        <BodyText>
          What they haven&rsquo;t done is a world-class electronic festival on a private island in the Caribbean with Black Coffee as co-curator. When that exists and is executed properly, this audience tells each other. <em>The first edition sells itself if the product is right.</em>
        </BodyText>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginTop: 28,
          }}
        >
          {[
            {
              title: 'The Global Electronic Traveller',
              sub: 'Primary · International',
              body: 'Age 25–45. Tomorrowland, Zamna, Dekmantel alumni. Reads RA. Plans summer around festival dates. Spends $3,000–8,000 per festival trip. Shares experience as identity signal. Travels for curation — not celebrity.',
            },
            {
              title: 'The Jamaican Diaspora',
              sub: 'Primary · Cultural',
              body: 'Jamaica-born or second-generation. Living in London, New York, Toronto, Miami. Has been waiting for a premium cultural reason to return — or to bring friends home for the first time. High disposable income, enormous word-of-mouth influence in creative industries.',
            },
            {
              title: 'The Music Professional',
              sub: 'Secondary · Industry',
              body: 'Producers, DJs, A&Rs, booking agents, journalists. Attends festivals as research and participation. If Zungu commissions original work, these people want to be in the room. One music professional equals a thousand ears.',
            },
          ].map(({ title, sub, body }) => (
            <div
              key={title}
              style={{
                border: `1px solid ${dim}`,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 700, color: cream, marginBottom: 4, lineHeight: 1.2 }}>
                {title}
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 12 }}>
                {sub}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.8 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 6: NUMBERS
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="06"
        eye="Chapter Six"
        title="The Numbers."
        sub="Conservative assumptions. Separated cost lines. Built to be stress-tested — not to impress."
      />

      {/* Section: Revenue */}
      <Section id="section-numbers">
        <SectionHead label="Year 1 Revenue · 5,000 Capacity" title="The case at 5,000 tickets." />

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: fontMono,
              fontSize: 12,
              minWidth: 500,
              maxWidth: 800,
            }}
          >
            <tbody>
              {[
                ['GA Tickets', '3,200 × $400 avg', '$1,280,000'],
                ['VIP Tickets', '1,200 × $700 avg', '$840,000'],
                ['Glamping Tier', '600 × $1,500 avg', '$900,000'],
                ['Sponsorship & Partners', '3–4 cultural brand partners', '$450,000'],
                ['Food & Bar Revenue', '$200 per head × 5,000', '$1,000,000'],
                ['Commissioned IP & Merchandise', 'Year 1 catalog + limited edition', '$120,000'],
              ].map(([label, detail, value]) => (
                <tr key={label as string} style={{ borderBottom: `1px solid ${dim}` }}>
                  <td style={{ padding: '12px 16px', color: cream }}>{label as string}</td>
                  <td style={{ padding: '12px 16px', color: muted, fontSize: 10 }}>{detail as string}</td>
                  <td style={{ padding: '12px 16px', color: gold, fontWeight: 700, textAlign: 'right' }}>
                    {value as string}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: `1px solid ${gold}` }}>
                <td
                  colSpan={2}
                  style={{
                    padding: '14px 16px',
                    color: cream,
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontSize: 10,
                  }}
                >
                  TOTAL REVENUE · Conservative scenario
                </td>
                <td
                  style={{
                    padding: '14px 16px',
                    color: gold,
                    fontWeight: 700,
                    fontSize: 18,
                    textAlign: 'right',
                  }}
                >
                  $4,590,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Section: Cost Structure */}
      <Section dark>
        <SectionHead label="Year 1 Cost Structure" title="What it costs to do this properly." />

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: fontMono,
              fontSize: 12,
              minWidth: 500,
              maxWidth: 800,
            }}
          >
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
                <tr key={label as string} style={{ borderBottom: `1px solid ${dim}` }}>
                  <td style={{ padding: '12px 16px', color: cream }}>{label as string}</td>
                  <td style={{ padding: '12px 16px', color: muted, fontSize: 10 }}>{detail as string}</td>
                  <td
                    style={{
                      padding: '12px 16px',
                      color: muted,
                      fontWeight: 700,
                      textAlign: 'right',
                    }}
                  >
                    {value as string}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: `1px solid ${dim}` }}>
                <td
                  colSpan={2}
                  style={{
                    padding: '12px 16px',
                    color: cream,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontSize: 10,
                  }}
                >
                  TOTAL COSTS · Base case
                </td>
                <td
                  style={{
                    padding: '12px 16px',
                    color: cream,
                    fontWeight: 700,
                    fontSize: 16,
                    textAlign: 'right',
                  }}
                >
                  $2,955,000
                </td>
              </tr>
              <tr style={{ borderTop: `2px solid ${gold}` }}>
                <td
                  colSpan={2}
                  style={{
                    padding: '14px 16px',
                    color: cream,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontSize: 10,
                  }}
                >
                  YEAR 1 SURPLUS · Before IP revenue
                </td>
                <td
                  style={{
                    padding: '14px 16px',
                    color: teal,
                    fontWeight: 700,
                    fontSize: 20,
                    textAlign: 'right',
                  }}
                >
                  $1,635,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Stat row */}
        <div
          style={{
            display: 'flex',
            border: `1px solid rgba(200,168,75,0.12)`,
            margin: '28px 0',
          }}
        >
          {[
            ['$4.59M', 'Revenue'],
            ['$2.96M', 'Costs'],
            ['$920', 'Blended avg'],
            ['65%', 'Breakeven occupancy'],
          ].map(([num, label], i, arr) => (
            <div
              key={label}
              style={{
                flex: 1,
                padding: '28px 22px',
                borderRight: i < arr.length - 1 ? `1px solid rgba(200,168,75,0.08)` : 'none',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 'clamp(22px, 3.5vw, 42px)',
                  fontWeight: 700,
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
                  fontSize: 8,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: muted,
                  display: 'block',
                  marginTop: 6,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: Financial Discipline */}
      <Section>
        <SectionHead label="Financial Discipline" title="Hard gates. Money doesn't move until each one is cleared." />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            marginBottom: 36,
          }}
        >
          {[
            {
              title: '$518K Seed Capital Floor',
              sub: 'Before ticket sales open',
              body: 'Artist deposits (40%), infrastructure deposits (25%), insurance and legal. Cannot open ticket sales without this confirmed.',
            },
            {
              title: '70% Presale Trigger',
              sub: 'Hard go/no-go — Feb 5, 2027',
              body: 'Full cost commitment does not proceed below 70% presale. Non-negotiable. Protects every party in the structure.',
            },
            {
              title: '40% Artist Deposits',
              sub: 'After insurance is bound only',
              body: 'Artist contracts activate only after insurance is secured and production contracts are signed. No speculative bookings for optics.',
            },
            {
              title: '15% Contingency',
              sub: 'Ring-fenced from day one',
              body: 'Island event risk premium. Built into the model from the start. Not released without production coordinator approval.',
            },
          ].map(({ title, sub, body }) => (
            <div
              key={title}
              style={{
                border: `1px solid ${dim}`,
                padding: '34px 30px',
              }}
            >
              <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 700, color: cream, lineHeight: 1.2, marginBottom: 6 }}>
                {title}
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 12 }}>
                {sub}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.75 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <QuoteBlock
          quote="The festival that executes flawlessly at 5,000 people on a private island in June 2027 has something no amount of money can buy in Year 3: a founding story. You can't retro-fit that. You're either in the room when it starts, or you're not."
          attr="Investment Thesis · Year 1"
        />
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 7: ROADMAP
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="07"
        eye="Chapter Seven"
        title="The Roadmap."
        sub="Three phases. Mythology earned through delivery, not declared through marketing."
      />

      <Section id="section-roadmap">
        <SectionHead label="Three-Phase Roadmap" title="Boutique → Flagship →" goldLine="Global Node." />
        <p
          style={{
            fontFamily: fontDisplay,
            fontSize: 13,
            fontStyle: 'italic',
            color: gold,
            fontWeight: 300,
            marginBottom: 28,
          }}
        >
          Earned mythology through delivery. Not declared through marketing.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >
          {[
            {
              year: 'Year 1 – 2',
              phase: 'Boutique',
              sub: 'Prove the Model',
              items: [
                'Capacity: 3,500–5,000',
                'Commission 6–8 original tracks',
                'Establish logistics infrastructure',
                'Build institutional partnerships',
                'Document everything',
              ],
              active: true,
            },
            {
              year: 'Year 3 – 5',
              phase: 'Flagship',
              sub: 'Caribbean Authority',
              items: [
                'Expand format & capacity',
                'Caribbean flagship status',
                'Growing IP catalog',
                'EU cultural partnerships active',
                'Port Antonio permanently associated',
              ],
              active: false,
            },
            {
              year: 'Year 5+',
              phase: 'Global Node',
              sub: 'Recognized Circuit Position',
              items: [
                'Jamaica = curator, not footnote',
                'Zungu cited as cultural institution',
                'Commissioning economy established',
                'Generational creative infrastructure',
                'Recognized global electronic node',
              ],
              active: false,
            },
          ].map(({ year, phase, sub, items, active }) => (
            <div
              key={phase}
              style={{
                background: active ? 'rgba(26,58,42,0.5)' : 'rgba(14,24,18,0.5)',
                border: `1px solid ${active ? 'rgba(200,168,75,0.4)' : 'rgba(200,168,75,0.1)'}`,
                padding: '26px 22px',
                position: 'relative',
              }}
            >
              {active && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: gold }} />
              )}
              <div style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.4em', color: gold, marginBottom: 11, textTransform: 'uppercase', opacity: 0.85 }}>{year}</div>
              <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 700, color: cream, marginBottom: 5 }}>{phase}</div>
              <div style={{ fontFamily: fontMono, fontSize: 12, fontStyle: 'italic', color: muted, marginBottom: 16 }}>{sub}</div>
              {items.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 9, marginBottom: 7 }}>
                  <span style={{ color: gold, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: fontMono, fontSize: 13, lineHeight: 1.8, color: 'rgba(242,235,217,0.62)' }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 8: CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="08"
        eye="Chapter Eight"
        title="The Ask."
        sub="We are not pitching a dream. We are presenting a model. The next step is a conversation, not a commitment."
      />

      {/* Section: Three Conversations */}
      <Section id="section-cta" dark>
        <SectionHead label="Three Conversations" title="What Zungu needs. From whom. When." />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            marginTop: 8,
          }}
        >
          {[
            {
              id: '01',
              title: '01 — Strategic Partner / Lead Investor',
              sub: 'Priority · Now',
              body: 'One or two strategic partners who understand the cultural and commercial opportunity — not just the festival, but the IP, the commissioning model, and the long-term brand asset. We are offering a position in the founding architecture.',
              price: '$800K – $2M',
              priceLabel: 'Year 1 investment range',
              borderColor: 'rgba(200,168,75,0.3)',
            },
            {
              id: '02',
              title: '02 — Cultural Institution / Embassy',
              sub: 'MOU by Q3 2026',
              body: '2–3 cultural bodies willing to co-commission original works and provide artist exchange programming. Not a sponsorship. Shared authorship — your institution\'s name on music that outlives the festival.',
              price: null,
              priceLabel: null,
              borderColor: dim,
            },
            {
              id: '03',
              title: '03 — Production Partner',
              sub: 'RFP by Q1 2026',
              body: 'An experienced production partner with island or remote-venue experience. Not a vendor — a co-architect. In exchange: first right of refusal on Years 2–5 as the event scales.',
              price: null,
              priceLabel: null,
              borderColor: dim,
            },
          ].map(({ id, title, sub, body, price, priceLabel, borderColor }) => (
            <div
              key={id}
              style={{
                border: `1px solid ${borderColor}`,
                padding: '34px 30px',
                background: bg,
              }}
            >
              <div style={{ fontFamily: fontDisplay, fontSize: 12, fontWeight: 700, color: cream, marginBottom: 6, lineHeight: 1.3 }}>
                {title}
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 14 }}>
                {sub}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.8 }}>
                {body}
              </p>
              {price && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontFamily: fontDisplay, fontSize: 13, fontWeight: 700, color: gold }}>{price}</div>
                  <div style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: dim, marginTop: 4 }}>{priceLabel}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Section: Confirm Interest */}
      <Section id="cta-form">
        <SectionHead label="Confirm Interest" title="First edition. One conversation." />
        <BodyText>
          We&rsquo;re talking to a small number of partners who fit. Tell us where you see yourself.
        </BodyText>

        {submitted ? (
          <div
            style={{
              padding: '40px 32px',
              border: `1px solid ${gold}`,
              maxWidth: 500,
              textAlign: 'center',
            }}
          >
            <div style={{ width: 28, height: 1, background: gold, margin: '0 auto 20px' }} />
            <p style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 700, color: gold, marginBottom: 12 }}>
              Message received.
            </p>
            <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.7 }}>
              We&rsquo;ll be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: 700 }}>
            {/* i-card interest selector */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                marginBottom: 36,
              }}
            >
              {[
                { opt: 'Strategic Investor', desc: 'Capital partner in the founding architecture. IP, commissioning model, long-term brand asset. Year 1 status can\'t be replicated in Year 3.' },
                { opt: 'Brand Partner', desc: 'Cultural brand integration — stage naming, F&B exclusivity, co-commission association. Present at the founding moment.' },
                { opt: 'Production Partner', desc: 'Operational co-architect with island/remote venue experience. First right of refusal on Years 2–5.' },
                { opt: 'Something Else', desc: 'You have an angle we haven\'t thought of. We\'re genuinely interested. Tell us.' },
              ].map(({ opt, desc }) => (
                <div
                  key={opt}
                  onClick={() => setSelectedInterest(opt)}
                  style={{
                    padding: '34px 30px',
                    border: `1px solid ${selectedInterest === opt ? 'rgba(200,168,75,0.5)' : 'rgba(200,168,75,0.1)'}`,
                    background: selectedInterest === opt ? 'rgba(200,168,75,0.07)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (selectedInterest !== opt) {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(200,168,75,0.05)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.3)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (selectedInterest !== opt) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.1)';
                    }
                  }}
                >
                  {selectedInterest === opt && (
                    <div style={{ position: 'absolute', top: 18, right: 18, color: gold, fontSize: 14, fontFamily: fontMono }}>✓</div>
                  )}
                  <div style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 700, color: cream, marginBottom: 8 }}>{opt}</div>
                  <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* Form fields */}
            {(
              [
                ['Name', formName, setFormName, 'text'],
                ['Organisation', formOrg, setFormOrg, 'text'],
                ['Email', formEmail, setFormEmail, 'email'],
              ] as [string, string, React.Dispatch<React.SetStateAction<string>>, string][]
            ).map(([label, val, setter, type]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontFamily: fontMono,
                    fontSize: 8,
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: gold,
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(6,8,8,0.8)',
                    border: `1px solid ${dim}`,
                    color: cream,
                    fontFamily: fontMono,
                    fontSize: 12,
                    padding: '10px 14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  fontFamily: fontMono,
                  fontSize: 8,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: gold,
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                What you have in mind
              </label>
              <textarea
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  background: 'rgba(6,8,8,0.8)',
                  border: `1px solid ${dim}`,
                  color: cream,
                  fontFamily: fontMono,
                  fontSize: 12,
                  padding: '10px 14px',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              disabled={submitting}
              onClick={async () => {
                if (!formName || !formEmail) return;
                setSubmitting(true);
                setFormError('');
                try {
                  const res = await fetch('/api/partner-interest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: formName,
                      email: formEmail,
                      details: `Organisation: ${formOrg}\nInterest type: ${selectedInterest ?? 'Not specified'}\n\n${formMessage}`,
                    }),
                  });
                  if (!res.ok) throw new Error('send_failed');
                  setSubmitted(true);
                } catch {
                  setFormError('Something went wrong. Please email us directly at partnership@zungufestival.com');
                } finally {
                  setSubmitting(false);
                }
              }}
              style={{
                fontFamily: fontMono,
                fontSize: 12,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '14px 32px',
                background: submitting ? 'rgba(200,168,75,0.5)' : gold,
                color: bg,
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? 'Sending…' : 'Send →'}
            </button>
            {formError && (
              <p style={{ fontFamily: fontMono, fontSize: 12, color: rust, marginTop: 12, lineHeight: 1.6 }}>
                {formError}
              </p>
            )}
          </div>
        )}
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer
        style={{
          padding: '60px 8vw 60px',
          borderTop: `1px solid ${dim}`,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          backgroundColor: bg,
        }}
      >
        <div
          style={{
            fontFamily: fontDisplay,
            fontSize: 'clamp(36px, 8vw, 96px)',
            fontWeight: 900,
            color: 'rgba(200,168,75,0.06)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          ZUNGU FESTIVAL
        </div>

        <div
          style={{
            fontFamily: fontMono,
            fontSize: 9,
            color: dim,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            lineHeight: 2,
            textAlign: 'right',
          }}
        >
          <div>Confidential concept material · Not for public distribution</div>
          <div>Navy Island · Port Antonio, Jamaica</div>
          <div>Target Window: June 17–23, 2027</div>
        </div>
      </footer>
    </div>
  );
}
