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

const DISPLAY = "'Unbounded', sans-serif";
const MONO = "'Space Mono', monospace";

const SECTION_IDS = ['hero', 'location', 'architecture', 'stages', 'week', 'philosophy', 'popups', 'why'];

const NAV_LINKS = [
  { label: 'Location', id: 'location' },
  { label: 'Architecture', id: 'architecture' },
  { label: 'Stages', id: 'stages' },
  { label: 'Week', id: 'week' },
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Pop-Ups', id: 'popups' },
  { label: 'Why', id: 'why' },
];

// ── Section label ─────────────────────────────────────────────────────────────
function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700 }}>{children}</span>
    </div>
  );
}

// ── Sonic tag pill ─────────────────────────────────────────────────────────────
function Tag({ label, accent }: { label: string; accent: string }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' as const, padding: '4px 10px', border: `1px solid ${accent}33`, color: accent, display: 'inline-block', marginRight: 6, marginBottom: 6 }}>
      {label}
    </span>
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
            <button key={l.label} onClick={() => scrollTo(l.id)} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: activeSection === l.id ? GOLD : MUTED, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = activeSection === l.id ? GOLD : MUTED)}>
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
          <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 900, lineHeight: 0.9, color: CREAM, marginBottom: 32 }}>
            THREE<br /><span style={{ color: GOLD }}>STAGES.</span><br />ONE<br />ISLAND.
          </h1>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.03em', lineHeight: 1.8, marginBottom: 48, maxWidth: 560 }}>
            The island is the scenery. It is where the world of Zungu comes alive and the magic of the experience begins. Origins rises with the sun. Rebirth catches the sunset. Zungu stands at the centre. Three stages. Three energies. One island transformed by sound.
          </p>

          {/* Stats bar — full width, no maxWidth */}
          <div style={{ width: '100vw', marginLeft: 'calc(-8vw)', padding: '20px 8vw', borderTop: `1px solid rgba(200,168,75,0.2)`, borderBottom: `1px solid rgba(200,168,75,0.08)`, background: 'rgba(4,8,10,0.5)', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start', boxSizing: 'border-box' }}>
            {[
              { label: 'ORIGINS', value: 'Sunrise · Earth sound · Tribal fusion' },
              { label: 'ZUNGU', value: 'Centre island · Mainstage · Big room' },
              { label: 'REBIRTH', value: 'Sunset · Tribal · Tech · Underground house' },
              { label: 'JUN 17–23', value: 'Arrival · Festival nights · Closing events' },
              { label: '5,000', value: 'Year One target' },
            ].map((s) => (
              <div key={s.label} style={{ minWidth: 120 }}>
                <span style={{ display: 'block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 4 }}>{s.label}</span>
                <span style={{ display: 'block', fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 01 — THE LOCATION
      ══════════════════════════════════════════════════════════════════ */}
      <section id="location" style={{ padding: '96px 8vw', backgroundColor: BG, borderBottom: `1px solid ${BORDER}` }}>
        <SLabel>// 01 THE LOCATION</SLabel>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 32 }}>
          Navy Island is where Zungu begins.
        </h2>
        <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 48, letterSpacing: '0.02em', maxWidth: 760 }}>
          Zungu does not begin with a stage design. It begins with Navy Island: forest, shoreline, water, open sky, and the feeling of an entire island becoming something else for one week. The island is the scenery. It is where the world of Zungu comes alive and the magic of the experience begins. Every stage responds to the island. Origins faces the sunrise. Rebirth faces the sunset. Zungu stands in the centre. The geography gives each stage its reason for existing.
        </p>

        {/* Quote block */}
        <div style={{ padding: '28px 32px', borderLeft: `3px solid ${GOLD}`, background: 'rgba(200,168,75,0.03)', marginBottom: 16 }}>
          <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', fontWeight: 300, color: GOLD, lineHeight: 1.4, margin: 0 }}>
            &ldquo;For one week, Navy Island becomes Zungu.&rdquo;
          </p>
        </div>
        <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM }}>Location Strategy</p>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 02 — SITE ARCHITECTURE
      ══════════════════════════════════════════════════════════════════ */}
      <section id="architecture" style={{ padding: '96px 8vw', backgroundColor: GREEN, borderBottom: `1px solid ${BORDER}` }}>
        <SLabel>// 02 SITE ARCHITECTURE</SLabel>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 32 }}>
          Three stages. Three directions. One island world.
        </h2>
        <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 56, letterSpacing: '0.02em', maxWidth: 760 }}>
          The stages are not placed randomly across Navy Island. Each one is tied to a natural moment of the island. Origins belongs to sunrise. Rebirth belongs to sunset. Zungu belongs to the centre. Together, they create the rhythm of the festival: the beginning, the transformation, and the full release.
        </p>

        {/* Site map image — full width */}
        <div style={{ width: '100vw', marginLeft: 'calc(-8vw)', position: 'relative', marginBottom: 48 }}>
          <img
            src="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/island-stages-aerial_zxjfag.png"
            alt="Provisional stage placement across Navy Island"
            loading="lazy"
            style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(0.85)' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 8vw 20px', background: 'linear-gradient(transparent, rgba(13,32,24,0.95))' }}>
            <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', color: MUTED, lineHeight: 1.7, maxWidth: 700, margin: 0 }}>
              Provisional stage placement across Navy Island&rsquo;s natural terrain. Final positioning, orientation, production layout, access routes, and sound direction remain subject to site survey, environmental review, safety planning, and production partner assessment.
            </p>
          </div>
        </div>

        {/* Legend cards row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { label: 'ORIGINS', desc: 'Sunrise · Earth Sound · Tribal Fusion', accent: ORIGINS_C },
            { label: 'ZUNGU', desc: 'Centre Island · Mainstage · Big Room', accent: GOLD },
            { label: 'REBIRTH', desc: 'Sunset · Tribal · Tech · Underground House', accent: REBIRTH_C },
            { label: 'ARRIVAL / ACCESS', desc: 'Port Antonio · Navy Island', accent: MUTED },
          ].map((card) => (
            <div key={card.label} style={{ padding: '20px 24px', borderLeft: `3px solid ${card.accent}`, background: 'rgba(4,8,10,0.4)', border: `1px solid ${card.accent}22`, borderLeftWidth: 3 }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 11, fontWeight: 700, color: card.accent, letterSpacing: '0.15em', marginBottom: 8 }}>{card.label}</div>
              <div style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 03 — THE THREE STAGES
      ══════════════════════════════════════════════════════════════════ */}
      <section id="stages" style={{ padding: '96px 8vw', backgroundColor: BG, borderBottom: `1px solid ${BORDER}` }}>
        <SLabel>// 03 THE THREE STAGES</SLabel>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 24 }}>
          Each stage has a reason.
        </h2>
        <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 64, letterSpacing: '0.02em', maxWidth: 760 }}>
          Zungu is built around three stage identities. Origins is the opening force: sunrise, earth, rhythm, percussion, and fusion. Zungu is the mainstage: centre island, full production, major acts, big-room energy, and the peak festival moments. Rebirth is the underground pulse: sunset, tribal, tech, house, deeper sounds, and the transition from day into night. Together, they turn Navy Island into a complete electronic music world.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          {/* ORIGINS */}
          <div style={{ backgroundColor: GREEN, borderLeft: `4px solid ${ORIGINS_C}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              <div style={{ padding: '48px 48px' }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: ORIGINS_C, fontWeight: 700, marginBottom: 12 }}>ORIGINS</div>
                <div style={{ fontFamily: MONO, fontSize: 13, color: MUTED, marginBottom: 24 }}>Sunrise Stage · Earth Sound · Tribal Fusion</div>
                <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)', fontWeight: 400, color: CREAM, marginBottom: 20, lineHeight: 1.4 }}>
                  Origins is called Origins because it faces the sunrise.
                </p>
                <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 32, letterSpacing: '0.02em' }}>
                  Origins is where the day begins. Facing the sunrise, Origins carries the first movement of the island: earth sound, tribal percussion, organic electronic music, fusion, deep drums, and music that feels rooted before it becomes electronic. It is not the mainstage. It is the source stage. Origins gives Zungu its beginning — the feeling of the island waking up in rhythm.
                </p>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 12 }}>Sonic Direction</div>
                  <div>
                    {['Earth sound', 'Tribal fusion', 'Organic electronic', 'Deep percussion', 'Afro-rooted rhythms', 'Jamaican electronic influence', 'Sunrise energy', 'Local and emerging selectors'].map((t) => (
                      <Tag key={t} label={t} accent={ORIGINS_C} />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 8 }}>Stage Function</div>
                  <p style={{ fontFamily: MONO, fontSize: 14, color: MUTED, lineHeight: 1.8 }}>
                    Origins is built for sunrise sessions, early-day programming, smaller acts, experimental sounds, local selectors, and fusion sets that connect the festival back to root, rhythm, and land.
                  </p>
                </div>

                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 8 }}>Production</div>
                  <p style={{ fontFamily: MONO, fontSize: 14, color: DIM, lineHeight: 1.8 }}>
                    Natural materials / Warm light / Sound-first production / Low-impact scenic design / The sunrise as the visual moment
                  </p>
                </div>
              </div>
              <div style={{ position: 'relative', minHeight: 400, overflow: 'hidden' }}>
                <img
                  src="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459528/stage-origins-ground_xjpf55.png"
                  alt="Origins Stage"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(0.9)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,32,24,0.6) 0%, transparent 50%)' }} />
              </div>
            </div>
          </div>

          {/* ZUNGU */}
          <div style={{ backgroundColor: GREEN, borderLeft: `4px solid ${GOLD}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              <div style={{ padding: '48px 48px' }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 12 }}>ZUNGU</div>
                <div style={{ fontFamily: MONO, fontSize: 13, color: MUTED, marginBottom: 24 }}>Centre Island · Mainstage · Big Room</div>
                <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)', fontWeight: 400, color: CREAM, marginBottom: 20, lineHeight: 1.4 }}>
                  Zungu is the heart of the island.
                </p>
                <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 32, letterSpacing: '0.02em' }}>
                  Zungu is the mainstage. Positioned at the centre of the island, it is where the largest moments happen: the major acts, the full production, the biggest crowd energy, and the nights people remember. This is where Zungu becomes massive. Big room. Mainstage electronic. Global headline energy. Full-scale lighting. Screens. Lasers. Sound. Movement. Release. If Origins is the beginning and Rebirth is the transformation, Zungu is the centre of gravity.
                </p>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 12 }}>Sonic Direction</div>
                  <div>
                    {['Big room electronic', 'Mainstage house', 'Afro-house headline energy', 'EDM', 'Festival anthems', 'Peak-time electronic', 'Major international acts', 'High-impact local support'].map((t) => (
                      <Tag key={t} label={t} accent={GOLD} />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 8 }}>Stage Function</div>
                  <p style={{ fontFamily: MONO, fontSize: 14, color: MUTED, lineHeight: 1.8 }}>
                    Zungu is the primary stage for major acts, headline sets, opening ceremonies, peak festival nights, closing moments, and large-scale production.
                  </p>
                </div>

                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 8 }}>Production</div>
                  <p style={{ fontFamily: MONO, fontSize: 14, color: DIM, lineHeight: 1.8 }}>
                    Full production / Large-format lighting / LED and visual world-building / Laser and atmospheric effects / Main audio system / Ceremonial moments / Highest stage specification
                  </p>
                </div>
              </div>
              <div style={{ position: 'relative', minHeight: 400, overflow: 'hidden' }}>
                <img
                  src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/stage-zungu-aerial_oog0rn.png"
                  alt="Zungu Mainstage"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(0.9)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,32,24,0.6) 0%, transparent 50%)' }} />
              </div>
            </div>
          </div>

          {/* REBIRTH */}
          <div style={{ backgroundColor: GREEN, borderLeft: `4px solid ${REBIRTH_C}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              <div style={{ padding: '48px 48px' }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: REBIRTH_C, fontWeight: 700, marginBottom: 12 }}>REBIRTH</div>
                <div style={{ fontFamily: MONO, fontSize: 13, color: MUTED, marginBottom: 24 }}>Sunset Stage · Tribal · Tech · Underground House</div>
                <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)', fontWeight: 400, color: CREAM, marginBottom: 20, lineHeight: 1.4 }}>
                  Rebirth is called Rebirth because it faces the sunset.
                </p>
                <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 32, letterSpacing: '0.02em' }}>
                  Rebirth is the sunset stage. As the island shifts from day to night, Rebirth carries the deeper pulse: tribal house, tech house, underground house, hypnotic grooves, warm percussion, and music built for golden hour. It is the stage where the festival changes temperature. The sun lowers. The rhythm deepens. The island starts to turn.
                </p>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 12 }}>Sonic Direction</div>
                  <div>
                    {['Tribal house', 'Tech house', 'Underground house', 'Afro-tech', 'Organic house', 'Melodic house', 'Hypnotic grooves', 'Sunset percussion'].map((t) => (
                      <Tag key={t} label={t} accent={REBIRTH_C} />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 8 }}>Stage Function</div>
                  <p style={{ fontFamily: MONO, fontSize: 14, color: MUTED, lineHeight: 1.8 }}>
                    Rebirth is built for sunset sessions, underground programming, smaller and mid-level acts, warm-up journeys, transition sets, and the deeper house community.
                  </p>
                </div>

                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD_DIM, marginBottom: 8 }}>Production</div>
                  <p style={{ fontFamily: MONO, fontSize: 14, color: DIM, lineHeight: 1.8 }}>
                    Warm lighting / Sunset palette / Dusk-calibrated visuals / Immersive but lower-impact production / Sound and atmosphere over spectacle
                  </p>
                </div>
              </div>
              <div style={{ position: 'relative', minHeight: 400, overflow: 'hidden' }}>
                <img
                  src="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/stage-rebirth-aerial_ruosnd.png"
                  alt="Rebirth Stage"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(0.9)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,32,24,0.6) 0%, transparent 50%)' }} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 04 — FESTIVAL WEEK
      ══════════════════════════════════════════════════════════════════ */}
      <section id="week" style={{ padding: '96px 8vw', backgroundColor: GREEN, borderBottom: `1px solid ${BORDER}` }}>
        <SLabel>// 04 FESTIVAL WEEK</SLabel>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 32 }}>
          Seven days on the island. Four core festival nights. One final hoorah.
        </h2>
        <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 64, letterSpacing: '0.02em', maxWidth: 760 }}>
          Zungu is a seven-day island experience, not a single-night event. The venue opens on June 17 for arrivals, check-in, island orientation, welcome parties, and the first taste of Zungu. The core festival runs from June 18 through the morning of June 21. From June 21 to June 23, the island slows into smaller events, pop-ups, recovery sessions, town dinners, media moments, partner gatherings, and the final hoorah before departure. Production breakdown begins after guests leave and continues through the following week.
        </p>

        {/* Vertical timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 120, top: 0, bottom: 0, width: 1, background: `rgba(200,168,75,0.15)` }} />

          {[
            { date: 'JUNE 17', title: 'Arrival Day', body: 'Check-in, accommodation access, island orientation, welcome parties, soft openings, partner receptions.' },
            { date: 'JUNE 18', title: 'Festival Night One', body: 'The first full night. Stages open into the official festival programme.' },
            { date: 'JUNE 19', title: 'Festival Night Two', body: 'The island is fully active. Mainstage, underground, sunrise, sunset, and island programming.' },
            { date: 'JUNE 20', title: 'Festival Night Three', body: 'Peak night. Major acts, full production, highest energy.' },
            { date: 'JUNE 21', title: 'Festival Morning / Recovery Shift', body: 'Core festival programme resolves into sunrise, recovery, smaller pop-ups, brunch, wellness, and reduced-scale programming.' },
            { date: 'JUNE 22', title: 'Island Pop-Ups / Port Antonio Events', body: 'Smaller music moments, partner events, town dinners, media capture, artist sessions, guest departures.' },
            { date: 'JUNE 23', title: 'Final Hoorah / Departure', body: 'Closing island moment, final gatherings, check-out, guest departures, and handover to production breakdown.' },
          ].map((item, i) => (
            <div key={item.date} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 0, marginBottom: 0, position: 'relative' }}>
              <div style={{ padding: '24px 24px 24px 0', textAlign: 'right' }}>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700 }}>{item.date}</span>
              </div>
              {/* Dot */}
              <div style={{ position: 'absolute', left: 116, top: 28, width: 9, height: 9, borderRadius: '50%', background: i === 0 || i === 3 ? GOLD : GOLD_DIM, border: `1px solid ${GOLD}` }} />
              <div style={{ padding: '20px 0 20px 40px', borderBottom: i < 6 ? `1px solid ${BORDER}` : 'none' }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 14, fontWeight: 700, color: CREAM, marginBottom: 6 }}>{item.title}</div>
                <p style={{ fontFamily: MONO, fontSize: 14, color: MUTED, lineHeight: 1.8, margin: 0 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 05 — PROGRAMMING PHILOSOPHY
      ══════════════════════════════════════════════════════════════════ */}
      <section id="philosophy" style={{ padding: '96px 8vw', backgroundColor: BG, borderBottom: `1px solid ${BORDER}` }}>
        <SLabel>// 05 PROGRAMMING PHILOSOPHY</SLabel>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 32 }}>
          The stages do not stop the island. They move through it.
        </h2>
        <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 64, letterSpacing: '0.02em', maxWidth: 760 }}>
          Zungu is not only a mainstage festival. Music appears across the island in different forms: mainstage moments, sunrise sessions, sunset sets, smaller pop-ups, intimate selectors, radio recordings, brand activations, and unannounced discoveries. The three core stages give Zungu its structure. The smaller pop-ups give the island its surprise.
        </p>

        {/* Stage roles grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
          {[
            { label: 'ORIGINS', role: 'Source stage', desc: 'Sunrise · Earth · Tribal · Rooted · Local', accent: ORIGINS_C },
            { label: 'ZUNGU', role: 'Mainstage', desc: 'Big room · Major acts · Full production', accent: GOLD },
            { label: 'REBIRTH', role: 'Underground stage', desc: 'Sunset · Tribal · Tech · House', accent: REBIRTH_C },
            { label: 'POP-UPS', role: 'Surprise layer', desc: 'Beach · Forest · Signal · Pier · Partner', accent: MUTED },
          ].map((item) => (
            <div key={item.label} style={{ padding: '32px 28px', background: GREEN, borderTop: `3px solid ${item.accent}` }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 700, color: item.accent, letterSpacing: '0.15em', marginBottom: 8 }}>{item.label}</div>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: MUTED, marginBottom: 12 }}>{item.role}</div>
              <div style={{ fontFamily: MONO, fontSize: 13, color: DIM, lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 06 — POP-UP MUSIC MOMENTS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="popups" style={{ padding: '96px 8vw', backgroundColor: GREEN, borderBottom: `1px solid ${BORDER}` }}>
        <SLabel>// 06 POP-UP MUSIC MOMENTS</SLabel>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 32 }}>
          Not every set needs a stage.
        </h2>
        <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 48, letterSpacing: '0.02em', maxWidth: 760 }}>
          Some of the best Zungu moments should feel discovered. Small pop-ups happen across the island between the major shows: selectors at The Market, surprise sessions near The Cove, intimate recordings at The Signal, sunset warm-ups, after-hours pier moments, and partner-led sound moments. These do not replace the three main stages. They make the island feel alive.
        </p>

        {/* Pop-up tags */}
        <div>
          {['Beach selectors', 'Forest listening sessions', 'The Signal recordings', 'Zungu Radio sets', 'Shoppe takeovers', 'Partner lounge music', 'Pier moments', 'Welcome party sets', 'Recovery day selectors', 'Final hoorah programming'].map((t) => (
            <Tag key={t} label={t} accent={GOLD} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 07 — WHY THIS STAGE SYSTEM MATTERS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="why" style={{ padding: '96px 8vw', backgroundColor: BG, borderBottom: `1px solid ${BORDER}` }}>
        <SLabel>// 07 WHY THIS STAGE SYSTEM MATTERS</SLabel>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 32 }}>
          Zungu is not a field of stages. It is an island in rhythm.
        </h2>
        <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 48, letterSpacing: '0.02em', maxWidth: 760 }}>
          The stage system gives the island shape. Origins gives Zungu its beginning. Rebirth gives Zungu its transformation. Zungu gives the festival its centre. The pop-ups give the island life between the major moments. Together, the stages and smaller sound moments create a complete world: sunrise, sunset, night, discovery, recovery, and return.
        </p>

        {/* Production notes */}
        <div style={{ padding: '24px 28px', borderLeft: `2px solid ${BORDER_MID}`, background: 'rgba(200,168,75,0.02)' }}>
          <p style={{ fontFamily: MONO, fontSize: 12, color: DIM, lineHeight: 1.8, margin: 0 }}>
            All stage locations, orientation, operating hours, production scale, sound direction, artist programming, and pop-up formats remain subject to final site survey, environmental review, permit conditions, safety planning, technical design, and production partner assessment.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: BG, padding: '48px 8vw', borderTop: `1px solid ${BORDER}` }}>
        <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', color: DIM, lineHeight: 2, margin: 0 }}>
          ZUNGU 2027 / Stage Architecture · Confidential Working Material / Navy Island · Port Antonio · Jamaica / Target Window: June 17–23, 2027 / 18+ Adults Only · 5,000 Year One Target
        </p>
      </footer>

    </div>
  );
}
