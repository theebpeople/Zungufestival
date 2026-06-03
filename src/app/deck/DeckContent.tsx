'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const IslandOverviewMap = dynamic(() => import('./maps/IslandOverviewMap'), { ssr: false });
const StageMap = dynamic(() => import('./maps/StageMap'), { ssr: false });

// ── Design tokens ─────────────────────────────────────────────────────────────
const bg = '#060808';
const green = '#0D1F14';
const gold = '#C8A84B';
const teal = '#4AAFA0';
const cream = '#F2EBD9';
const muted = 'rgba(242,235,217,0.45)';
const dim = 'rgba(242,235,217,0.18)';
const rust = '#C45A2A';

const fontDisplay = "'Unbounded', sans-serif";
const fontMono = "'Space Mono', monospace";

// ── Section IDs for dot-nav ───────────────────────────────────────────────────
const SECTIONS = ['proposition', 'island', 'port-antonio', 'why', 'experience', 'artists', 'model', 'numbers', 'roadmap', 'cta'] as const;
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
          <div
            style={{
              fontFamily: fontDisplay,
              fontSize: 88,
              fontWeight: 900,
              color: 'rgba(200,168,75,0.08)',
              lineHeight: 1,
              flexShrink: 0,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {num}
          </div>
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
  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>> = {
    proposition: useRef<HTMLElement>(null),
    island: useRef<HTMLElement>(null),
    'port-antonio': useRef<HTMLElement>(null),
    why: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    artists: useRef<HTMLElement>(null),
    model: useRef<HTMLElement>(null),
    numbers: useRef<HTMLElement>(null),
    roadmap: useRef<HTMLElement>(null),
    cta: useRef<HTMLElement>(null),
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [activeSection, setActiveSection] = useState<SectionId>('proposition');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formOrg, setFormOrg] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [heroScale, setHeroScale] = useState(1.05);
  useEffect(() => {
    const t = setTimeout(() => setHeroScale(1), 80);
    return () => clearTimeout(t);
  }, []);

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
        <div style={{ flexShrink: 0 }}>
          <img
            src="/zungu-z-mark.png"
            style={{ height: 30, filter: 'drop-shadow(0 0 10px rgba(200,168,75,.3))', display: 'block' }}
            alt="Zungu"
          />
        </div>

        <div className="deck-chapter-links">
          {(
            [
              ['Proposition', 'proposition'],
              ['The Site', 'island'],
              ['Port Antonio', 'port-antonio'],
              ['Market', 'why'],
              ['Experience', 'experience'],
              ['Sound', 'artists'],
              ['Model', 'model'],
              ['Numbers', 'numbers'],
              ['Roadmap', 'roadmap'],
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

          <img
            src="/zungu-z-mark.png"
            alt="Zungu"
            style={{ width: 48, height: 48, objectFit: 'contain', marginBottom: 40, filter: 'drop-shadow(0 0 16px rgba(200,168,75,0.3))' }}
          />

          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%', marginBottom: 40 }}>
            {(
              [
                ['Proposition', 'proposition'],
                ['The Site', 'island'],
                ['Port Antonio', 'port-antonio'],
                ['Market', 'why'],
                ['Experience', 'experience'],
                ['Sound', 'artists'],
                ['Model', 'model'],
                ['Numbers', 'numbers'],
                ['Roadmap', 'roadmap'],
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${bg} 0%, rgba(6,8,8,0.55) 40%, rgba(6,8,8,0.1) 100%)`,
          }}
        />

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

          <img src="/zungu-z-mark.png" width={110} style={{ marginBottom: 24, display: 'block' }} alt="Zungu" />

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

          <p
            style={{
              fontFamily: fontMono,
              fontSize: 'clamp(12px, 1.4vw, 16px)',
              color: muted,
              lineHeight: 1.8,
              maxWidth: 540,
              marginBottom: 8,
            }}
          >
            A private-island electronic music festival in Port Antonio, Jamaica.
          </p>

          <p
            style={{
              fontFamily: fontMono,
              fontSize: 'clamp(11px, 1.2vw, 14px)',
              color: muted,
              lineHeight: 1.8,
              maxWidth: 520,
              marginBottom: 40,
            }}
          >
            Navy Island is not the backdrop. It is the operating format: arrival by boat, controlled capacity, three stage territories, hospitality, media capture, and a defensible destination platform.
          </p>

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
              onClick={() => scrollToSection('proposition')}
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

        {/* Stats bar */}
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
              ['64', 'Acres', 'Navy Island'],
              ['5,000', 'Guests', 'Year One Target'],
              ['7', 'Days', '6 Nights'],
              ['Jun 17–23', 'Target Window', '2027'],
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
          CHAPTER 1: THE PROPOSITION
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="01"
        eye="Chapter One"
        title="The Proposition."
        sub="A private-island festival platform built around a market correction: Jamaica helped shape global sound, but has not owned the premium destination category that influence helped create."
      />

      <Section id="section-proposition">
        <SectionHead label="The Gap" title="The opportunity no one has taken." />
        <BodyText>
          Jamaica&rsquo;s influence is embedded in the architecture of global electronic music — in sound-system culture, bass pressure, dub engineering, remix logic, MC culture, and the movement of Caribbean music through London, New York, Berlin, and beyond.
        </BodyText>
        <BodyText>
          That influence has travelled further than the island has commercially captured.
        </BodyText>
        <BodyText>
          Zungu is built around that gap: a destination festival on Jamaican soil, designed to convert Jamaican authorship into premium live experience, tourism value, media capture, and long-term intellectual property.
        </BodyText>

        <QuoteBlock quote="The category is the opportunity." attr="Zungu — Investment Thesis" />

        <SectionHead label="The Correction" title="What Zungu is." />
        <BodyText>
          Zungu is a private-island electronic music festival in Port Antonio, Jamaica.
        </BodyText>
        <BodyText>
          It is designed as a controlled, high-value island experience: 5,000 target guests, three primary stages, daytime programming, hospitality, glamping, partner allocation, media capture, and a long-term expansion path beyond Year One.
        </BodyText>

        {/* Dossier rows */}
        <div style={{ marginTop: 40, border: `1px solid rgba(200,168,75,0.12)` }}>
          {[
            { label: 'WHAT', statement: 'Private-island electronic music festival. 5,000 guests. Three stages. Seven days. One controlled destination experience.' },
            { label: 'WHERE', statement: 'Navy Island, Port Antonio, Jamaica. 64 acres. Five minutes by boat from the Errol Flynn Marina.' },
            { label: 'FORMAT', statement: 'Controlled capacity. Arrival by boat. Three stage territories. Daytime programming. Night programming. Hospitality layer.' },
            { label: 'AUDIENCE', statement: 'Investors, production partners, strategic partners, press, artist agencies, and tourism stakeholders.' },
            { label: 'OUTCOME', statement: 'A destination-festival platform designed for live revenue, hospitality, sponsorship, media capture, and long-term IP.' },
          ].map(({ label, statement }, i, arr) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: 24,
                padding: '20px 24px',
                borderBottom: i < arr.length - 1 ? `1px solid rgba(200,168,75,0.08)` : 'none',
                alignItems: 'start',
              }}
            >
              <span style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: gold, fontWeight: 700, paddingTop: 2 }}>
                {label}
              </span>
              <span style={{ fontFamily: fontMono, fontSize: 12, color: cream, lineHeight: 1.7 }}>
                {statement}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 2: THE SITE ADVANTAGE
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="02"
        eye="Chapter Two"
        title="The Site Advantage."
        sub="Navy Island. Port Antonio, Jamaica. 64 acres. The site that makes everything else possible."
      />

      <PhotoBreak
        src="/photos/pellew-island.jpg"
        quote="The site is the moat."
        label="Portland Parish · Caribbean"
      />

      <Section id="section-island">
        <SectionHead label="The Site" title="Most festivals build environments. Zungu begins with one." />
        <BodyText>
          Navy Island sits in Port Antonio&rsquo;s West Harbour. 64 acres. Surrounded by water on every side. The Errol Flynn Marina is the departure point — a five-minute crossing that is the first act of the experience. Before a single artist is announced, you&rsquo;re already arriving somewhere extraordinary.
        </BodyText>
        <BodyText>
          The crossing is not only logistics. It is guest control, operational pacing, and the beginning of the experience. The island gives Zungu what most festivals spend years trying to manufacture: arrival, privacy, containment, natural drama, and separation from the mainland.
        </BodyText>

        <div style={{ display: 'flex', border: `1px solid rgba(200,168,75,0.12)`, margin: '28px 0' }}>
          {[
            ['64', 'Acres · Navy Island'],
            ['~5 min', 'Water crossing from mainland'],
            ['5,000', 'Year One target capacity'],
            ['3', 'Stage territories'],
          ].map(([num, label], i, arr) => (
            <div key={label} style={{ flex: 1, padding: '28px 22px', borderRight: i < arr.length - 1 ? `1px solid rgba(200,168,75,0.08)` : 'none', textAlign: 'center' }}>
              <span style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 3.5vw, 42px)', fontWeight: 700, color: gold, display: 'block', lineHeight: 1 }}>{num}</span>
              <span style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: muted, display: 'block', marginTop: 6 }}>{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          label="Port Antonio"
          title="Outside the mass-tourism corridor."
        />
        <BodyText>
          Port Antonio is outside the mass-tourism corridor: known, but not overexposed; premium, but not overbuilt. The town is sought by those who know it — which is exactly the audience Zungu is built for.
        </BodyText>
        <BodyText>
          The combination of a genuinely undiscovered location and a world-class event creates the conditions for a founding story. The people who attended Zamna in its first year — 800 people in a jungle cenote — still talk about it. <em>Port Antonio in 2027 is that conversation.</em>
        </BodyText>
        <QuoteBlock
          quote="The island is the moat. Most festivals build environments. Zungu begins with one."
          attr="Site Strategy"
        />
      </Section>

      <Section>
        <SectionHead label="Marina → Island Crossing Overview" title="The crossing." />
        <div>
          <IslandOverviewMap />
        </div>
      </Section>

      <Section id="section-island-stages">
        <SectionHead label="Stage Placement · Navy Island" title="Three stages. One island." />
        <BodyText>
          Provisional placement across the island&rsquo;s natural terrain. Stages face the sea — not the town.
          Final positioning subject to site survey.
        </BodyText>

        <div style={{ marginBottom: 32 }}>
          <StageMap />
        </div>

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
              { src: '/photos/island-stages-aerial.png', label: 'ISLAND OVERVIEW — Three stages. One island.', sub: 'Wide aerial concept · Navy Island' },
              { src: '/photos/stage-zungu-aerial.png', label: 'ZUNGU MAIN — Headline stage', sub: 'Stage II · North clearing · Canopy facing sea' },
              { src: '/photos/stage-origins-ground.png', label: 'ORIGINS — Heritage architecture', sub: 'Stage I · Bamboo structure · Natural canopy' },
              { src: '/photos/zungu-rebirth-stage.png', label: 'REBIRTH — Future sounds', sub: 'Stage III · East point · Open horizon' },
              { src: '/photos/zungu-beach-stage-concept.png', label: 'BEACH STAGE — Concept render', sub: 'South shore · Open water surround' },
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

      <PhotoBreak
        src="/photos/navy-island-port-antonio.jpeg"
        quote="You arrive over water."
        label="Navy Island · Port Antonio"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 3: PORT ANTONIO ECONOMIC LOOP
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="03"
        eye="Chapter Three"
        title="Port Antonio Economic Loop."
        sub="Zungu is anchored on Navy Island, but the operating model is designed to move value through Port Antonio."
      />

      <Section id="section-port-antonio">
        <SectionHead label="The Ecosystem" title="The island is the anchor. The town is the system." />
        <BodyText>
          Navy Island gives the project its moat. Port Antonio gives it its operating ecosystem.
        </BodyText>
        <BodyText>
          Zungu creates demand for marine transport, drivers, hotels, villas, guest houses, restaurants, bars, guides, vendors, food suppliers, production crew, security, waste management, wellness practitioners, artists, and mainland excursions.
        </BodyText>
        <BodyText>
          The project should not isolate economic value offshore. It should route spend, employment, training, procurement, and visitor movement through Port Antonio before, during, and after the festival window.
        </BodyText>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            marginTop: 40,
          }}
        >
          {[
            {
              title: 'LOCAL EMPLOYMENT',
              body: 'Paid work across production, build crew, marine transfer, guest services, security, cleaning, artist hospitality, vendor operations, wayfinding, shuttle coordination, stage support, and demobilisation.',
            },
            {
              title: 'VENDOR REVENUE',
              body: 'Food, beverage, coffee, seafood, fresh produce, jerk vendors, florals, ice, water, printing, rentals, local craft, fashion, wellness services, transport, and waste management.',
            },
            {
              title: 'HOSPITALITY SPEND',
              body: 'Hotels, villas, guest houses, restaurants, bars, supermarkets, private drivers, taxis, pre-festival arrivals, post-festival stays, and partner dinners.',
            },
            {
              title: 'MAINLAND ACTIVATIONS',
              body: 'Bookable Port Antonio experiences connected to the festival week: The Ambush, Boston Bay food route, Blue Lagoon ecology route, rafting, Reach Falls, Frenchman\'s Cove, market visits, rum tastings, and cultural programming.',
            },
            {
              title: 'SKILLS TRANSFER',
              body: 'Training and paid exposure in production logistics, marine operations, guest flow, environmental compliance, artist hospitality, safety, media capture, technical staging, and premium event service.',
            },
            {
              title: 'ENVIRONMENTAL CONTRIBUTION',
              body: 'Reef protocol, waste removal, reforestation contribution, marine conservation partnerships, and post-event reporting.',
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              style={{
                border: `1px solid ${dim}`,
                padding: '32px 28px',
                background: 'rgba(13,31,20,0.3)',
              }}
            >
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: 14 }}>
                {title}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.8, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 4: THE MARKET MOMENT
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="04"
        eye="Chapter Four"
        title="The Market Moment."
        sub="Destination electronic music has become a global travel category. Jamaica has the influence, geography, and music authority to claim a premium position within it."
      />

      <Section id="section-why">
        <SectionHead label="The Gap" title="A globally significant music island with no flagship electronic festival." />
        <BodyText>
          Jamaica&rsquo;s role in global music is not symbolic. It is structural. Sound-system culture shaped DJ-led performance. Dub engineering helped establish the studio as an instrument. Jamaican diaspora movements influenced UK rave, jungle, drum and bass, dubstep, and bass-led club culture.
        </BodyText>
        <BodyText>
          A country of less than three million people has shaped the sound of every continent. <em>That lineage runs straight to every dance floor the bass has ever reached.</em> And yet — no world-class electronic festival has ever stood on that island and made the argument out loud.
        </BodyText>

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

      <PhotoBreak
        src="/photos/blue-lagoon-port-antonio.jpg"
        quote="The water that shaped the sound."
        label="Blue Lagoon · Portland Parish"
        height="60vh"
      />

      <Section dark>
        <SectionHead label="The Lineage" title="Documented. Traceable. Defensible." />

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

      <Section>
        <SectionHead label="Competitive Landscape" title="Comparable tier. Distinct territory." />
        <BodyText>
          Zamna sells a jungle you had to find. SXM sells boutique Caribbean luxury. Dekmantel sells curatorial credibility. Zungu sells a private island in Jamaica — with a documented sonic lineage that none of them have.
        </BodyText>

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
          CHAPTER 5: THE EXPERIENCE FORMAT
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="05"
        eye="Chapter Five"
        title="The Experience Format."
        sub="Zungu is designed as movement through terrain, water, hospitality, stage territories, and time of day."
      />

      <Section id="section-experience">
        <SectionHead label="The Format" title="Movement, not one crowd facing one stage." />
        <BodyText>
          The product is not only the lineup. It is the operating sequence.
        </BodyText>
        <BodyText>
          Guests arrive by boat, move through daytime hospitality and island programming, transition into sunset staging, consolidate at the main stage at night, and return through sunrise programming.
        </BodyText>
        <BodyText>
          The island controls the rhythm: arrival, dispersal, transition, concentration, release.
        </BodyText>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 2,
            marginTop: 40,
          }}
        >
          {[
            {
              title: 'ARRIVAL',
              sub: 'Morning',
              body: 'Boat transfer from Errol Flynn Marina. Controlled boarding schedule. Island check-in, wristband scan, zone orientation.',
            },
            {
              title: 'DAY',
              sub: 'Daytime',
              body: 'Eight island zones active: water programming, wellness, culture, food, forest route, studio, market, and broadcast. Guests distributed across terrain.',
            },
            {
              title: 'SUNSET',
              sub: 'Late Afternoon',
              body: 'Origins and Rebirth stages open. Smaller-capacity, curated programming. Natural light transitions into stage lighting. The island transitions into night mode.',
            },
            {
              title: 'NIGHT',
              sub: 'Evening',
              body: 'Zungu Main opens. Headline programming. All three stages active. Peak capacity across the island. Marine transfer continues through the night.',
            },
            {
              title: 'SUNRISE',
              sub: 'Dawn',
              body: 'Selected sunrise programming on The Pier and Cove. Recovery-paced, ambient, water-facing. The island returns to arrival conditions.',
            },
          ].map(({ title, sub, body }) => (
            <div
              key={title}
              style={{
                border: `1px solid ${dim}`,
                padding: '28px 22px',
              }}
            >
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: 6 }}>
                {title}
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 14 }}>
                {sub}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.8, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${dim}` }}>
          <a
            href="/activities"
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
            }}
          >
            Full Programming & Hospitality Breakdown →
          </a>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 6: THE SOUND STRATEGY
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="06"
        eye="Chapter Six"
        title="The Sound Strategy."
        sub="The artist strategy is built around three lanes: global electronic credibility, Jamaican authorship, and commissioning."
      />

      <Section id="section-artists">
        <SectionHead label="Booking Direction" title="Target directions. Not confirmed bookings." />
        <BodyText>
          The artist strategy is built around three lanes: global electronic credibility, Jamaican authorship, and commissioning. Target directions include Afro-house, tribal house, Jamaican electronic, jungle, drum and bass, dub-influenced club music, and curated sunrise/sunset programming.
        </BodyText>
        <BodyText>
          All artist names below represent booking direction and outreach targets. No booking is confirmed at this stage. Labels marked accordingly.
        </BodyText>

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
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  fontFamily: fontMono,
                  fontSize: 7,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: muted,
                  fontWeight: 700,
                  border: `1px solid rgba(200,168,75,0.2)`,
                  padding: '3px 8px',
                }}
              >
                Booking Direction
              </div>
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

      <PhotoBreak
        src="/photos/stage-origins-ground.png"
        quote="The crowd. The canopy. The sea."
        label="The Stage Experience · Zungu 2027"
        height="68vh"
      />

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
              body: 'RA, Mixmag, Pitchfork are not covering "festival in Jamaica." They\'re covering "an artist commissioned a track on a private island with a Jamaican producer." That story writes itself.',
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
          CHAPTER 7: THE OPERATING MODEL
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="07"
        eye="Chapter Seven"
        title="The Operating Model."
        sub="5,000 guests. 7 days. Controlled capacity. The structure that makes this sustainable from Year One."
      />

      <Section id="section-model">
        <SectionHead label="Ticket Architecture" title="5,000 guests. One island. Hard cap." />
        <BodyText>
          5,000 is the number that creates urgency without sacrificing the experience. At peak moments, 5,000 people distribute across three stages, the food village, the water, the glamping village. No stage is ever crushingly full. The island breathes. And missing it feels like missing something.
        </BodyText>
        <BodyText>
          Glamping is not a separate headcount — it is a ticket tier. One wristband. Different experience levels. Same 5,000 people.
        </BodyText>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            marginTop: 28,
          }}
        >
          {[
            {
              tier: 'GA',
              sub: 'Festival Access · 18+',
              desc: 'All stages, island transport. Full festival access. Off-island accommodation in Port Antonio. An extraordinary experience — the island, the stages, the water, the music.',
              price: 'US$600',
              priceLabel: '7-day pass',
              borderColor: 'rgba(200,168,75,0.2)',
              bgColor: bg,
            },
            {
              tier: 'VIP / Navy',
              sub: 'Premium Access',
              desc: 'Dedicated entry, viewing platform, Pier access, concierge service, premium bars. A materially different on-island experience.',
              price: 'US$1,350',
              priceLabel: '7-day pass',
              borderColor: 'rgba(200,168,75,0.4)',
              bgColor: 'rgba(200,168,75,0.05)',
            },
            {
              tier: 'Glamping / Obsidian',
              sub: 'On-Island Immersion',
              desc: 'On-island accommodation, private lounge, Sanctum credit, catamaran access, concierge. You sleep on the island. You wake up on the island.',
              price: 'US$3,500',
              priceLabel: '7-day pass · accommodation included',
              borderColor: 'rgba(200,168,75,0.2)',
              bgColor: bg,
            },
            {
              tier: 'The Thirty',
              sub: 'Villa-Style · 30 places',
              desc: 'Personal host, private dining, greenroom access, speedboat transfer, highest tier of island hospitality. 30 places per edition.',
              price: 'US$12,500',
              priceLabel: '7-day full experience',
              borderColor: 'rgba(200,168,75,0.2)',
              bgColor: bg,
            },
          ].map(({ tier, sub, desc, price, priceLabel, borderColor, bgColor }) => (
            <div
              key={tier}
              style={{
                border: `1px solid ${borderColor}`,
                padding: '34px 30px',
                background: bgColor ?? bg,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 18,
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
                    color: gold,
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

        <p style={{ fontFamily: fontMono, fontSize: 10, color: muted, marginTop: 16, fontStyle: 'italic', lineHeight: 1.7 }}>
          Planning-stage assumptions. Subject to final production cost, marine logistics assessment, and permit conditions.
        </p>
      </Section>

      <PhotoBreak
        src="/photos/zungu-glamping-pods.png"
        quote="You wake up on the island."
        label="On-Island Accommodation · Glamping Village"
        height="65vh"
      />

      <Section dark>
        <SectionHead label="The Audience" title="Someone who has already been to Belgium." />
        <BodyText>
          Our primary audience has been to Tomorrowland, Zamna, or Dekmantel. They plan summers around festivals. They spend real money on experiences without much persuasion — because they know what a good one feels like.
        </BodyText>
        <BodyText>
          What they haven&rsquo;t done is a world-class electronic festival on a private island in the Caribbean. When that exists and is executed properly, this audience tells each other. <em>The first edition sells itself if the product is right.</em>
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
          CHAPTER 8: THE NUMBERS
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="08"
        eye="Chapter Eight"
        title="The Numbers."
        sub="Planning-stage assumptions. Separated cost lines. Built to be stress-tested — not to impress."
      />

      <Section id="section-numbers">
        <SectionHead label="Year One Pricing Architecture" title="The pricing structure." />
        <BodyText>
          Benchmarked against premium destination and electronic music festivals, structured around Zungu&rsquo;s private-island operating model.
        </BodyText>

        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
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
            <thead>
              <tr style={{ borderBottom: `1px solid ${dim}` }}>
                {['Tier', 'Price', 'Notes'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: gold, fontWeight: 700 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['GA — Festival Access', 'US$600', 'All stages, island transport, 18+'],
                ['VIP / Navy', 'US$1,350', 'Dedicated entry, viewing platform, Pier access, concierge, bars'],
                ['Glamping / Obsidian', 'US$3,500', 'Accommodation, private lounge, Sanctum credit, catamaran, concierge'],
                ['The Thirty', 'US$12,500', 'Villa-style, personal host, private dining, greenroom, speedboat transfer'],
              ].map(([tier, price, notes]) => (
                <tr key={tier as string} style={{ borderBottom: `1px solid ${dim}` }}>
                  <td style={{ padding: '12px 16px', color: cream }}>{tier as string}</td>
                  <td style={{ padding: '12px 16px', color: gold, fontWeight: 700 }}>{price as string}</td>
                  <td style={{ padding: '12px 16px', color: muted, fontSize: 10 }}>{notes as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionHead label="Year 1 Revenue · 5,000 Capacity" title="Planning assumptions." />

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
                ['Capacity Assumption', '5,000 target (operating range 2,500–5,000)', 'TBD'],
                ['Average Ticket Yield', 'Blended across all tiers', 'TBD'],
                ['Gross Ticket Revenue', 'Based on final tier mix', 'TBD'],
                ['Sponsorship Target', '3–4 cultural brand partners', 'TBD'],
                ['Hospitality Revenue', 'Glamping, The Thirty, hospitality packages', 'TBD'],
                ['F&B / Bar Revenue', 'Island vendors and licensed operators', 'TBD'],
                ['Estimated Production Cost', 'Subject to site survey and partner RFP', 'TBD'],
                ['Break-Even Attendance', 'Subject to final cost structure', 'TBD'],
                ['Capital Required', 'Subject to production and booking confirmation', 'TBD'],
              ].map(([label, detail, value]) => (
                <tr key={label as string} style={{ borderBottom: `1px solid ${dim}` }}>
                  <td style={{ padding: '12px 16px', color: cream }}>{label as string}</td>
                  <td style={{ padding: '12px 16px', color: muted, fontSize: 10 }}>{detail as string}</td>
                  <td style={{ padding: '12px 16px', color: value === 'TBD' ? muted : gold, fontWeight: 700, textAlign: 'right', fontStyle: value === 'TBD' ? 'italic' : 'normal' }}>
                    {value as string}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontFamily: fontMono, fontSize: 10, color: muted, marginTop: 16, fontStyle: 'italic', lineHeight: 1.7 }}>
          Use of funds: Site access, permits, production deposits, booking deposits, marine logistics, insurance, marketing, staffing, legal, contingency.
        </p>
      </Section>

      <Section dark>
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
              title: 'Seed Capital Floor',
              sub: 'Before ticket sales open',
              body: 'Artist deposits (40%), infrastructure deposits (25%), insurance and legal. Cannot open ticket sales without this confirmed.',
            },
            {
              title: '70% Presale Trigger',
              sub: 'Hard go/no-go gate',
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
          CHAPTER 9: THE ROADMAP
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="09"
        eye="Chapter Nine"
        title="The Roadmap."
        sub="Year One is the proof of concept. The platform is designed to extend."
      />

      <Section id="section-roadmap">
        <SectionHead label="Timeline" title="Four phases. One platform." />

        <div style={{ marginTop: 40, position: 'relative', maxWidth: 700 }}>
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
              year: '2025 — Seed',
              body: 'Site strategy, brand architecture, investor development, partner outreach, early production scoping.',
              filled: true,
            },
            {
              year: '2026 — Build',
              body: 'Permits, site survey, production partners, marine logistics, sponsor commitments, artist holds.',
              filled: true,
            },
            {
              year: '2027 — Launch',
              body: 'Capital close, production build, festival execution, media capture, post-event reporting.',
              filled: false,
            },
            {
              year: '2028 — Expansion',
              body: 'Year Two optimisation, repeat audience, media/IP monetisation, capacity refinement, regional expansion.',
              filled: false,
            },
          ].map(({ year, body, filled }) => (
            <div
              key={year}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                marginBottom: 40,
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
                    marginBottom: 8,
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

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 10: THE ASK
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="10"
        eye="Chapter Ten"
        title="The Ask."
        sub="We are not pitching a dream. We are presenting a model. The next step is a conversation, not a commitment."
      />

      <Section id="section-cta" dark>
        <SectionHead label="Partner Tracks" title="What Zungu needs. From whom. When." />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            marginTop: 8,
          }}
        >
          {[
            {
              id: '01',
              title: 'INVESTORS',
              sub: 'Capital structure · Priority now',
              body: 'Capital participation in the founding architecture. Financial model, revenue assumptions, risk controls, and long-term expansion. One or two strategic partners who understand the cultural and commercial opportunity — not just the festival, but the IP, the commissioning model, and the long-term brand asset.',
              borderColor: 'rgba(200,168,75,0.3)',
            },
            {
              id: '02',
              title: 'PRODUCTION PARTNERS',
              sub: 'RFP by Q1 2026',
              body: 'Stage architecture, marine logistics, power, lighting, sound, site build, safety, and crowd flow. An experienced production partner with island or remote-venue experience. Not a vendor — a co-architect. In exchange: first right of refusal on Years 2–5 as the event scales.',
              borderColor: dim,
            },
            {
              id: '03',
              title: 'STRATEGIC PARTNERS',
              sub: 'MOU by Q3 2026',
              body: 'Tourism, beverage, telecoms, travel, hospitality, luxury, and media. Cultural brand integration — stage naming, F&B exclusivity, co-commission association. Present at the founding moment.',
              borderColor: dim,
            },
            {
              id: '04',
              title: 'PRESS',
              sub: 'Approved positioning available',
              body: 'Founder briefing, approved language, image access, destination story, artist strategy. RA, Mixmag, Pitchfork, Caribbean travel, Jamaica tourism. Brief available on request.',
              borderColor: dim,
            },
          ].map(({ id, title, sub, body, borderColor }) => (
            <div
              key={id}
              style={{
                border: `1px solid ${borderColor}`,
                padding: '34px 30px',
                background: bg,
              }}
            >
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: 6 }}>
                {title}
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 14 }}>
                {sub}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.8 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Local / Government / Tourism */}
        <div
          style={{
            marginTop: 2,
            border: `1px solid ${dim}`,
            padding: '34px 30px',
            background: bg,
          }}
        >
          <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: 6 }}>
            LOCAL / GOVERNMENT / TOURISM STAKEHOLDERS
          </div>
          <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 14 }}>
            Port Antonio · Portland Parish · Jamaica Tourism Board
          </div>
          <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.8 }}>
            Alignment with Port Antonio stakeholders across marine access, hospitality, local employment, vendor participation, environmental protocol, guest movement, and destination positioning.
          </p>
        </div>
      </Section>

      <Section id="cta-form">
        <SectionHead label="Request Briefing" title="Start the conversation." />
        <BodyText>
          Zungu briefing access is reviewed by role. Submit your enquiry and the team will respond with the appropriate investor, production, supplier, or press material.
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
              Received.
            </p>
            <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.7 }}>
              The Zungu team will follow up with the appropriate briefing material.
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: 700 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                marginBottom: 36,
              }}
            >
              {[
                { opt: 'Investor', desc: 'Capital partner in the founding architecture. IP, commissioning model, long-term brand asset. Year 1 status can\'t be replicated in Year 3.' },
                { opt: 'Production Partner', desc: 'Operational co-architect with island/remote venue experience. First right of refusal on Years 2–5.' },
                { opt: 'Strategic Partner', desc: 'Cultural brand integration — stage naming, F&B exclusivity, co-commission association. Present at the founding moment.' },
                { opt: 'Press / Media', desc: 'Approved positioning, founder briefing, imagery, destination story. RA, Mixmag, travel, and tourism media welcome.' },
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
                Message (optional)
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
              {submitting ? 'Sending…' : 'Submit Briefing Request →'}
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
          APPENDIX: BRAND SYSTEM
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="section-appendix"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: green,
          borderTop: `1px solid rgba(200,168,75,0.15)`,
        }}
      >
        <div style={{ padding: '88px 8vw', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
            <div style={{ width: 28, height: 1, background: gold, flexShrink: 0 }} />
            <p style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.6em', textTransform: 'uppercase', color: gold, fontWeight: 700 }}>
              Appendix
            </p>
          </div>

          <h3
            style={{
              fontFamily: fontDisplay,
              fontSize: 'clamp(24px, 4vw, 54px)',
              fontWeight: 700,
              color: cream,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              marginBottom: 28,
            }}
          >
            Brand System.
          </h3>

          <BodyText>
            Zungu&rsquo;s visual identity is built around three elements: the Z-mark, gold on black, and Space Mono. The system is designed to read as institutional, not promotional.
          </BodyText>
          <BodyText>
            Brand guidelines and approved assets are available on request.
          </BodyText>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
              marginTop: 40,
            }}
          >
            {[
              {
                rule: 'MARK',
                detail: 'The Z-mark is the primary identifier. Used alone or with ZUNGU wordmark. Never stretched, recoloured, or placed on busy backgrounds.',
              },
              {
                rule: 'COLOUR',
                detail: 'Gold #C8A84B on Black #060808. Cream #F2EBD9 for body text. Rust #C45A2A for accent only. No bright colours. No gradients except approved overlays.',
              },
              {
                rule: 'TYPOGRAPHY',
                detail: 'Unbounded for display and headlines. Space Mono for all body, labels, and UI copy. No other typefaces. No italic display type.',
              },
              {
                rule: 'TONE',
                detail: 'Institutional. Measured. No superlatives. No exclamation marks. No hyperbole. The work is the argument.',
              },
            ].map(({ rule, detail }) => (
              <div key={rule} style={{ border: `1px solid ${dim}`, padding: '28px 24px' }}>
                <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: 12 }}>
                  {rule}
                </div>
                <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.8, margin: 0 }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
