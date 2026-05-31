'use client';

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
const SECTIONS = ['island', 'why', 'artists', 'model', 'numbers', 'cta'] as const;
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
        alignItems: 'flex-end',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: `url('${src}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.65) brightness(0.38)',
          y: bgY,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 8vw 52px',
          width: '100%',
        }}
      >
        <div style={{ width: 28, height: 1, background: gold, marginBottom: 18 }} />
        <p
          style={{
            fontFamily: fontDisplay,
            fontSize: 'clamp(20px, 3.5vw, 40px)',
            fontWeight: 700,
            color: cream,
            lineHeight: 1.15,
            marginBottom: 16,
            maxWidth: 600,
          }}
        >
          {quote}
        </p>
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
          {label}
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
        borderTop: `1px solid ${dim}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(60px,6vw,80px) clamp(24px,6vw,96px)', boxSizing: 'border-box', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: '4vw',
          fontFamily: fontDisplay,
          fontSize: 'clamp(100px, 18vw, 220px)',
          fontWeight: 900,
          color: 'rgba(200,168,75,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {num}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: fontMono,
            fontSize: 9,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: gold,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          {eye}
        </p>
        <h2
          style={{
            fontFamily: fontDisplay,
            fontSize: 'clamp(32px, 5.5vw, 68px)',
            fontWeight: 900,
            color: cream,
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: fontMono,
            fontSize: 13,
            color: muted,
            lineHeight: 1.8,
            maxWidth: 640,
          }}
        >
          {sub}
        </p>
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
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px clamp(24px, 6vw, 96px)', boxSizing: 'border-box' }}>
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
        borderLeft: `2px solid ${gold}`,
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
          fontSize: 9,
          letterSpacing: '0.35em',
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
        maxWidth: 720,
        marginBottom: 24,
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
}

function SectionHead({ label, title, titleColor = cream }: SectionHeadProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      {label && (
        <p
          style={{
            fontFamily: fontMono,
            fontSize: 9,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: gold,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          // {label}
        </p>
      )}
      <h3
        style={{
          fontFamily: fontDisplay,
          fontSize: 'clamp(24px, 4vw, 52px)',
          fontWeight: 900,
          color: titleColor,
          lineHeight: 1.1,
          maxWidth: 820,
        }}
      >
        {title}
      </h3>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DeckContent() {
  // Refs for section scroll targets
  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>> = {
    island: useRef<HTMLElement>(null),
    why: useRef<HTMLElement>(null),
    artists: useRef<HTMLElement>(null),
    model: useRef<HTMLElement>(null),
    numbers: useRef<HTMLElement>(null),
    cta: useRef<HTMLElement>(null),
  };

  // Nav ref for section scrolls
  const navRefs = {
    island: useRef<HTMLDivElement>(null),
    why: useRef<HTMLDivElement>(null),
    artists: useRef<HTMLDivElement>(null),
    model: useRef<HTMLDivElement>(null),
    numbers: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null),
  };

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Active dot nav
  const [activeSection, setActiveSection] = useState<SectionId>('island');

  // CTA form state
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formOrg, setFormOrg] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    letterSpacing: '0.3em',
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
          padding: '0 4vw',
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

        {/* Center: nav links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(10px, 2vw, 24px)',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {(
            [
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

          <button
            onClick={scrollToCta}
            style={{
              fontFamily: fontMono,
              fontSize: 9,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '7px 16px',
              background: gold,
              color: bg,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Request Briefing →
          </button>

        </div>

        {/* Right: activities + badge + sign out */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexShrink: 0,
          }}
        >
          <a
            href="/activities"
            style={{ ...navLinkStyle, display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            Activities
          </a>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 8,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: gold,
              border: `1px solid rgba(200,168,75,0.35)`,
              padding: '3px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            INVESTOR DECK
          </span>
          <a
            href="/sign-out"
            style={{
              fontFamily: fontMono,
              fontSize: 9,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: muted,
              textDecoration: 'none',
            }}
          >
            SIGN OUT
          </a>
        </div>
      </nav>

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
          justifyContent: 'flex-end',
        }}
      >
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/photos/NAVY%20ISLAND%20AERIAL.png')`,
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
            background: `linear-gradient(to top, ${bg} 0%, rgba(6,8,8,0.6) 40%, rgba(6,8,8,0.1) 100%)`,
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '0 8vw 100px',
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
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 56 }}>
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

          {/* Stats bar */}
          <div
            style={{
              borderTop: `1px solid ${dim}`,
              paddingTop: 24,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px 48px',
            }}
          >
            {[
              ['64', 'Acres', 'Private Island'],
              ['5,000', 'Tickets', 'Year 1'],
              ['7', 'Days', '6 Nights'],
              ['Jun 17', 'Opens', '2027'],
            ].map(([num, label, sub]) => (
              <div key={label}>
                <span
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: 22,
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
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 1: THE ISLAND
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="01"
        eye="Chapter One"
        title="The Island."
        sub="Navy Island. Port Antonio, Jamaica. 64 acres. The site that makes everything else possible."
      />

      {/* Photo break 1 */}
      <PhotoBreak
        src="/photos/pellew-island.jpg"
        quote="Island. Water. Isolation."
        label="Portland Parish · Caribbean"
      />

      {/* Section: The Site */}
      <Section id="section-island">
        <SectionHead label="The Site" title="Nobody has done this in the Caribbean. Yet." />
        <BodyText>
          Navy Island sits 320 metres off the shore of Port Antonio — a 64-acre private island you can only
          access by boat. Not a public beach. Not a hotel resort. A private island, in the second-most
          historically significant music town in the Caribbean, used once a year for a world-class festival.
        </BodyText>
        <BodyText>
          The entire island is the venue. Every tree, every beach, every trail is the event. No temporary
          tent in a field. No parking lot. An island.
        </BodyText>
        <QuoteBlock
          quote="The site is the argument. Once you say 'private island, Jamaica,' you've already won the first sentence."
          attr="Positioning thesis · Zungu"
        />
      </Section>

      {/* Photo break 2 */}
      <PhotoBreak
        src="/photos/port-antonio.jpg"
        quote="The most beautiful town in Jamaica."
        label="Port Antonio Harbour · Blue Mountains"
      />

      {/* Section: Geographic Context */}
      <Section>
        <SectionHead label="Port Antonio" title="Undiscovered at this scale." />
        <BodyText>
          Port Antonio was where Errol Flynn docked his yacht and never left. It was Ian Fleming&rsquo;s Jamaica.
          It was where the banana boats left for Europe. The Blue Lagoon is 4km from the festival site.
        </BodyText>
        <BodyText>
          Tourism infrastructure exists — there are hotels, transfers, food, boats. But it has not been
          developed in the way Ocho Rios or Montego Bay has been. This is the advantage. The festival
          arrives before the infrastructure catches up.
        </BodyText>
      </Section>

      {/* Map 1: Overview */}
      <Section>
        <SectionHead label="Marina → Island Crossing Overview" title="The crossing." />
        <div style={{ maxWidth: 580 }}>
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
        <div style={{ maxWidth: 680, marginBottom: 32 }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 680 }}>
          <img
            src="/photos/NAVY%20ISLAND%20STAGE%20AND%20PATHWAY%20MAP.png"
            style={{ width: '100%', display: 'block', border: `1px solid ${dim}` }}
            alt="Navy Island Stage and Pathway Map"
          />
          <img
            src="/photos/NAVY%20ISLAND%20-%20SATELITE%20.png"
            style={{ width: '100%', display: 'block', border: `1px solid ${dim}` }}
            alt="Navy Island Satellite"
          />
          <img
            src="/photos/REFERENCE%20FOR%20MAP%20-%20CROSSING%20.png"
            style={{ width: '100%', display: 'block', border: `1px solid ${dim}` }}
            alt="Reference Map - Crossing"
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
              { src: '/photos/island-stages-aerial.png', label: 'ISLAND OVERVIEW — Three stages. One island.', sub: 'Wide aerial concept · Navy Island' },
              { src: '/photos/stage-zungu-aerial.png', label: 'ZUNGU MAIN — Headline stage', sub: 'Stage II · North clearing · Canopy facing sea' },
              { src: '/photos/stage-origins-ground.png', label: 'ORIGINS — Heritage architecture', sub: 'Stage I · Bamboo structure · Natural canopy' },
              { src: '/photos/stage-rebirth-aerial.png', label: 'REBIRTH — Future sounds', sub: 'Stage III · East point · Open horizon' },
              { src: '/photos/stage-beach-aerial.png', label: 'BEACH STAGE — Water\'s edge', sub: 'South shore · Open water surround' },
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
      </Section>

      {/* Photo break 3 */}
      <PhotoBreak
        src="/photos/navy-island-port-antonio.jpeg"
        quote="You arrive over water."
        label="Navy Island · Port Antonio"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 2: WHY NOW
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="02"
        eye="Chapter Two"
        title="Why Now."
        sub="Jamaica shaped the DNA of global electronic music. Zungu is the first festival to stand on that island and prove it."
      />

      {/* Section: The Gap */}
      <Section id="section-why">
        <SectionHead title="The most musically significant island on earth. No flagship electronic festival." />
        <BodyText>
          Electronic music&rsquo;s global dominance is documented and growing. The market hit $7.4 billion in
          2024. Festival tourism is one of the fastest-growing segments in experiential travel. And yet —
          Jamaica, the island that gave the world sound system culture, dub engineering, and the foundational
          techniques behind nearly every genre of bass music — has no flagship electronic festival.
        </BodyText>
        <BodyText>
          That is not an oversight. It is a timing window. The infrastructure exists. The audience is
          global. The site is available. The conversation is ready to happen.
        </BodyText>
        <BodyText>
          Zungu does not position itself as a Caribbean festival. It positions itself as a world-class
          electronic festival that happens to be on a private island in Jamaica — and can therefore make
          a cultural claim no festival in Europe or America can make.
        </BodyText>

        {/* Stat row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '28px 60px',
            marginTop: 48,
            borderTop: `1px solid ${dim}`,
            paddingTop: 36,
          }}
        >
          {[
            ['0', 'World-class electronic festivals in Jamaica'],
            ['$7.4B', 'Global electronic music market 2024'],
            ['2027', 'The timing window'],
          ].map(([num, label]) => (
            <div key={label}>
              <span
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 32,
                  fontWeight: 900,
                  color: gold,
                  display: 'block',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 10,
                  color: muted,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  maxWidth: 200,
                  display: 'block',
                  lineHeight: 1.5,
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
        src="/photos/blue-lagoon-port-antonio.jpg"
        quote="The water that shaped the sound."
        label="Blue Lagoon · Portland Parish"
        height="60vh"
      />

      {/* Section: The Lineage */}
      <Section dark>
        <SectionHead title="Documented. Traceable. Defensible." />
        <BodyText>
          The lineage from Jamaican sound system culture to contemporary electronic music is not a metaphor.
          It is a documented, traceable path that runs through every major development in bass music,
          dub, and electronic production over the past seven decades.
        </BodyText>

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
            ['1950s–60s', 'Sound System Culture', true],
            ['1970s', 'Dub Engineering', true],
            ['1980s–90s', 'Diaspora & Bass Music', true],
            ['2027', 'Zungu Festival', false],
          ].map(([year, label, filled]) => (
            <div
              key={year as string}
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
                    color: filled ? gold : gold,
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: 4,
                  }}
                >
                  {year as string}
                </span>
                <span
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: 18,
                    fontWeight: 700,
                    color: filled ? cream : gold,
                  }}
                >
                  {label as string}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: Competitive Landscape */}
      <Section>
        <SectionHead title="Comparable tier. Distinct territory." />
        <BodyText>
          Zungu sits in a tier with the most respected boutique electronic festivals in the world. The
          distinction is not ambition — it is geography and cultural grounding.
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
          quote="Zamna's first year was 800 people in a jungle cenote. By year three it was the most coveted ticket in electronic music. The model is proven. The question is site."
          attr="Precedent · Zamna Tulum, est. 2017"
        />
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 3: ARTISTS
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="03"
        eye="Chapter Three"
        title="Artists."
        sub="Not just a lineup. A co-curation conversation."
      />

      {/* Section: Headline Proposition */}
      <Section id="section-artists">
        <SectionHead title="Black Coffee. Not a booking. A co-curator." />
        <BodyText>
          Black Coffee is the most decorated African DJ in history — a Grammy winner, the architect of
          Hï Ibiza&rsquo;s most celebrated residency, and one of the few artists who has turned a DJ career
          into a global cultural institution. He is not a booking. He is a conversation.
        </BodyText>
        <BodyText>
          The approach is a co-curation model — not a performance fee negotiation. Zungu&rsquo;s opening is
          framed as a founding event, and the artist relationship is framed accordingly. Year 1 is the
          record. The artists involved become part of the origin story.
        </BodyText>
        <BodyText>
          The island is the argument. A private island in Jamaica, with documented cultural lineage, is a
          different conversation than another European festival billing.
        </BodyText>

        {/* Artist cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 20,
            marginTop: 48,
          }}
        >
          {[
            {
              name: 'Black Coffee',
              role: 'Headline / Co-Curator',
              tags: ['Grammy Winner', 'Soulistic Music', 'Hï Ibiza', '7 Seasons'],
              highlight: true,
            },
            {
              name: 'Shimza',
              role: 'Featured Artist',
              tags: ['Soulistic Music', 'Hï Ibiza', 'Zamna Tulum'],
              highlight: false,
            },
            {
              name: 'Keinemusik',
              role: 'Collective',
              tags: ['&ME', 'Rampa', 'Adam Port', 'Global Circuit'],
              highlight: false,
            },
            {
              name: 'Diplo',
              role: 'Featured Artist',
              tags: ['Port Antonio Resident', 'Major Lazer', 'Grammy Collaborator'],
              highlight: false,
            },
          ].map(({ name, role, tags, highlight }) => (
            <div
              key={name}
              style={{
                border: `1px solid ${highlight ? gold : dim}`,
                padding: 24,
                background: highlight ? 'rgba(200,168,75,0.05)' : 'transparent',
              }}
            >
              {highlight && (
                <div
                  style={{
                    fontFamily: fontMono,
                    fontSize: 8,
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: gold,
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  ★ HEADLINE
                </div>
              )}
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 20,
                  fontWeight: 900,
                  color: highlight ? gold : cream,
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
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: muted,
                  marginBottom: 16,
                }}
              >
                {role}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: fontMono,
                      fontSize: 8,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: gold,
                      border: `1px solid rgba(200,168,75,0.3)`,
                      padding: '3px 8px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Photo break 5 */}
      <PhotoBreak
        src="/photos/stage-origins-ground.png"
        quote="The crowd. The canopy. The sea."
        label="The Stage Experience · Zungu 2027"
        height="68vh"
      />

      {/* Section: Commissioning Model */}
      <Section dark>
        <SectionHead title="Music made on the island. IP that outlives the weekend." />
        <BodyText>
          The commissioning model invites headline artists to create a track or mix recorded on Navy
          Island during the festival week. The resulting material is released as a Zungu-branded catalog
          — a documented sonic record of the first edition.
        </BodyText>
        <BodyText>
          This is not a content play. It is an IP strategy. Year 1 creates the archive. The archive
          creates the mythology. The mythology drives Year 2 demand before a single ticket goes on sale.
        </BodyText>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 20,
            marginTop: 40,
          }}
        >
          {[
            { title: 'Year 1 Target', body: 'Commissioned recordings from headline and supporting acts. Island session footage. Limited physical release.' },
            { title: 'The IP Value', body: 'Each commissioned piece belongs to the Zungu catalog. Rights structure negotiated pre-event. Revenue-share model for artists.' },
            { title: 'The Press Story', body: '"A new album, recorded on a private island in Jamaica, during the festival that made it." That is the pitch to every culture editor on earth.' },
          ].map(({ title, body }) => (
            <div
              key={title}
              style={{
                border: `1px solid ${dim}`,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 14,
                  fontWeight: 700,
                  color: gold,
                  marginBottom: 12,
                }}
              >
                {title}
              </div>
              <p
                style={{
                  fontFamily: fontMono,
                  fontSize: 11,
                  color: muted,
                  lineHeight: 1.8,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 4: THE MODEL
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="04"
        eye="Chapter Four"
        title="The Model."
        sub="5,000 tickets. 7 days. Three tiers."
      />

      {/* Section: Ticket Architecture */}
      <Section id="section-model">
        <SectionHead title="5,000 tickets. One island. Hard cap." />
        <BodyText>
          The island imposes a natural capacity limit. The limit is the product. Scarcity is not a
          marketing technique — it is a physical fact of the site.
        </BodyText>
        <BodyText>
          Three ticket tiers, with accommodation separated from festival access at the VIP/Glamping
          boundary. The hard cap at 5,000 is maintained across all scenarios. There is no stretch
          scenario that pushes past site capacity.
        </BodyText>

        {/* Ticket tier cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 20,
            marginTop: 40,
          }}
        >
          {[
            {
              tier: 'GA',
              price: '$350–450',
              count: '3,200 tickets',
              desc: 'Full festival access. Marine transfer included. No accommodation.',
              color: cream,
            },
            {
              tier: 'VIP',
              price: '$600–800',
              count: '1,200 tickets',
              desc: 'Dedicated zones, priority boarding, private beach access. No accommodation.',
              color: gold,
            },
            {
              tier: 'GLAMPING',
              price: '$1,200–1,800',
              count: '600 tickets',
              desc: 'All-in. On-island accommodation included. Boutique pod setup, full-service.',
              color: teal,
            },
          ].map(({ tier, price, count, desc, color }) => (
            <div
              key={tier}
              style={{
                border: `1px solid ${color === gold ? gold : dim}`,
                padding: 28,
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 28,
                  fontWeight: 900,
                  color,
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {tier}
              </div>
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 18,
                  fontWeight: 700,
                  color: cream,
                  marginBottom: 6,
                }}
              >
                {price}
              </div>
              <div
                style={{
                  fontFamily: fontMono,
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                {count}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: The Audience */}
      <Section dark>
        <SectionHead title="Someone who has already been to Belgium." />
        <BodyText>
          The target Zungu attendee has been to Tomorrowland, or Zamna, or Dekmantel. They are not
          discovering electronic music. They are looking for the next significant site. The island is
          the proposition.
        </BodyText>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 20,
            marginTop: 36,
          }}
        >
          {[
            {
              title: 'The Global Electronic Traveller',
              body: '28–45. Discretionary income. Has structured holidays around festivals. Ibiza, Tulum, Amsterdam. Seeking cultural legitimacy in the next destination.',
            },
            {
              title: 'The Jamaican Diaspora',
              body: 'UK, US, Canada. Connection to Jamaica through family or cultural identity. Has not had a world-class festival reason to return. Zungu is that reason.',
            },
            {
              title: 'The Music Professional',
              body: 'A&R, label, press, management. For whom the island is a working trip. The commissioning model makes attendance a professional event.',
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              style={{
                border: `1px solid ${dim}`,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 15,
                  fontWeight: 700,
                  color: gold,
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                {title}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.8 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 5: NUMBERS
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="05"
        eye="Chapter Five"
        title="Numbers."
        sub="Conservative assumptions. Separated cost lines."
      />

      {/* Section: Revenue */}
      <Section id="section-numbers">
        <SectionHead title="The case at 5,000 tickets." />

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
        <SectionHead title="What it costs to do this properly." />

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
            flexWrap: 'wrap',
            gap: '24px 48px',
            marginTop: 48,
            borderTop: `1px solid ${dim}`,
            paddingTop: 32,
          }}
        >
          {[
            ['$4.59M', 'Revenue'],
            ['$2.96M', 'Costs'],
            ['$920', 'Blended avg'],
            ['65%', 'Breakeven occupancy'],
          ].map(([num, label]) => (
            <div key={label}>
              <span
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 26,
                  fontWeight: 900,
                  color: gold,
                  display: 'block',
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 9,
                  color: muted,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
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
        <SectionHead title="Hard gates. Money doesn't move until each one is cleared." />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 20,
            marginBottom: 48,
          }}
        >
          {[
            {
              value: '$518K',
              label: 'Seed Capital Floor',
              desc: 'Minimum required before pre-sale opens. Covers site, permits, initial production deposits.',
            },
            {
              value: '70%',
              label: 'Presale Trigger',
              desc: 'Artist contracts confirmed only after 70% of ticket inventory is presold.',
            },
            {
              value: '40%',
              label: 'Artist Deposits',
              desc: 'No deposit paid until presale trigger is met. Eliminates sunk-cost exposure on cancellation.',
            },
            {
              value: '15%',
              label: 'Contingency',
              desc: 'Held separately. Released only on board sign-off. Island-specific risk premium.',
            },
          ].map(({ value, label, desc }) => (
            <div
              key={label}
              style={{
                border: `1px solid ${dim}`,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 30,
                  fontWeight: 900,
                  color: gold,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: fontMono,
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: cream,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {label}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 10, color: muted, lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        <QuoteBlock
          quote="The financial structure is built around a single principle: no point of no return until the audience has voted with their money."
          attr="Financial discipline · Zungu"
        />
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTER 6: CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="06"
        eye="Chapter Six"
        title="Next Steps."
        sub="Three conversations. Each one matters."
      />

      {/* Section: Three Conversations */}
      <Section id="section-cta">
        <SectionHead title="What Zungu needs. From whom. When." />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 20,
            marginTop: 40,
          }}
        >
          {[
            {
              num: '01',
              title: 'Strategic Partner / Lead Investor',
              badge: 'Priority · Now',
              badgeColor: gold,
              body: 'Seeking $800K–$2M in strategic capital from an individual or entity aligned with cultural infrastructure, festival development, or Caribbean tourism. Not passive capital — a voice in the room.',
            },
            {
              num: '02',
              title: 'Cultural Institution / Embassy',
              badge: 'MOU by Q3 2026',
              badgeColor: teal,
              body: 'A formal relationship with a cultural body, embassy, or arts institution that adds diplomatic and editorial weight to the Zungu proposition. Jamaica Tourist Board, British Council, or equivalent.',
            },
            {
              num: '03',
              title: 'Production Partner',
              badge: 'RFP by Q1 2026',
              badgeColor: rust,
              body: 'One of four identified production companies — Starlight, Mainevent, Yes Production, Phase Three — confirmed as technical lead. Subject to site survey and RFP process.',
            },
          ].map(({ num, title, badge, badgeColor, body }) => (
            <div
              key={num}
              style={{
                border: `1px solid ${dim}`,
                padding: 28,
              }}
            >
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 40,
                  fontWeight: 900,
                  color: 'rgba(200,168,75,0.12)',
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 16,
                  fontWeight: 700,
                  color: cream,
                  marginBottom: 10,
                  lineHeight: 1.2,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontFamily: fontMono,
                  fontSize: 8,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: badgeColor,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                {badge}
              </div>
              <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.8 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: Confirm Interest */}
      <Section dark id="cta-form">
        <SectionHead title="First edition. One conversation." />
        <BodyText>
          If any part of this resonates — the site, the model, the timing — the next step is a
          conversation. Not a deck review. A conversation. Use this form to signal intent and we will
          follow up within 48 hours.
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
            <p
              style={{
                fontFamily: fontDisplay,
                fontSize: 20,
                fontWeight: 700,
                color: gold,
                marginBottom: 12,
              }}
            >
              Message received.
            </p>
            <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.7 }}>
              We&rsquo;ll be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: 600 }}>
            {/* Interest type selector */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 10,
                marginBottom: 28,
              }}
            >
              {['Strategic Investor', 'Brand Partner', 'Production Partner', 'Something Else'].map(
                (opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedInterest(opt)}
                    style={{
                      fontFamily: fontMono,
                      fontSize: 9,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      padding: '12px 16px',
                      background: 'transparent',
                      color: selectedInterest === opt ? gold : muted,
                      border: `1px solid ${selectedInterest === opt ? gold : dim}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                  >
                    {opt}
                  </button>
                )
              )}
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
              onClick={() => {
                if (formName && formEmail) setSubmitted(true);
              }}
              style={{
                fontFamily: fontMono,
                fontSize: 10,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '14px 32px',
                background: gold,
                color: bg,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send →
            </button>
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
