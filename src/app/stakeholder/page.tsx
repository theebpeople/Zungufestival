'use client';

import { useAuth, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const BG = '#04080A';
const GREEN = '#0D2018';
const GOLD = '#C8A84B';
const CREAM = '#F2EBD9';
const MUTED = 'rgba(242,235,217,0.45)';
const BORDER = 'rgba(200,168,75,0.07)';
const BORDER_MID = 'rgba(200,168,75,0.12)';
const GOLD_DIM = 'rgba(200,168,75,0.45)';
const DISPLAY = "'Unbounded', sans-serif";
const MONO = "'Space Mono', monospace";

const SECTION_IDS = [
  'hero', 'overview', 'portantonio', 'island',
  'sound', 'audience',
  'stages', 'activities',
  'experience', 'model', 'operations', 'contact',
];

const NAV_LINKS = [
  { label: 'Overview', id: 'overview' },
  { label: 'Island', id: 'island' },
  { label: 'Stages', id: 'stages' },
  { label: 'Activities', id: 'activities' },
  { label: 'Review', id: 'operations' },
];

// ── ChapterDivider ─────────────────────────────────────────────────────────────
function ChapterDivider({ num, eye, title, sub }: { num: string; eye: string; title: string; sub: string }) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', backgroundColor: BG, padding: '80px 8vw 40px', borderTop: `1px solid ${BORDER}`, display: 'flex', alignItems: 'flex-start', gap: '3rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(4rem, 9vw, 8rem)', fontWeight: 900, color: 'rgba(200,168,75,0.06)', lineHeight: 1, flexShrink: 0, marginTop: '-0.1em', userSelect: 'none', pointerEvents: 'none' }}>
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 28, height: 1, background: 'rgba(200,168,75,0.5)', flexShrink: 0 }} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700 }}>
            {eye}
          </span>
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM }}>
          {title}
        </h2>
        <p style={{ marginTop: 12, fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 540, letterSpacing: '0.02em' }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

// ── ChapterSection ─────────────────────────────────────────────────────────────
function ChapterSection({ bg, photo, children, id }: { bg: string; photo?: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} style={{ position: 'relative', overflow: 'hidden', backgroundColor: bg, borderBottom: `1px solid ${BORDER}` }}>
      {photo && (
        <img src={photo} alt="" aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.32, filter: 'saturate(0.5) brightness(0.4)', pointerEvents: 'none', zIndex: 0 }} />
      )}
      {photo && (
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${bg} 28%, ${bg}ee 50%, transparent 82%)`, pointerEvents: 'none', zIndex: 0 }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ── GhostNum ──────────────────────────────────────────────────────────────────
function GhostNum({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'absolute', right: '6vw', top: 20, fontFamily: DISPLAY, fontSize: '18rem', fontWeight: 900, color: CREAM, opacity: 0.04, lineHeight: 1, zIndex: 0, userSelect: 'none', pointerEvents: 'none' }}>
      {children}
    </div>
  );
}

// ── FactCard ──────────────────────────────────────────────────────────────────
function FactCard({ rows, accent = GOLD }: { rows: { l: string; v: string }[]; accent?: string }) {
  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER_MID}`, borderTop: `3px solid ${accent}`, padding: '1.5rem' }}>
      {rows.map(({ l, v }) => (
        <div key={l} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, paddingTop: 2 }}>{l}</span>
          <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

// ── CtaLinkCard ───────────────────────────────────────────────────────────────
function CtaLinkCard({ eye, title, sub, href }: { eye: string; title: string; sub: string; href: string }) {
  return (
    <a href={href} style={{ display: 'block', marginTop: 16, padding: '1.25rem', border: `1px solid ${BORDER_MID}`, borderTop: `2px solid ${GOLD}`, backgroundColor: 'rgba(200,168,75,0.03)', textDecoration: 'none', transition: 'all 0.2s' }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(200,168,75,0.07)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(200,168,75,0.03)'; }}
    >
      <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 8 }}>{eye}</p>
      <p style={{ fontFamily: DISPLAY, fontSize: '0.95rem', fontWeight: 700, color: CREAM, letterSpacing: '-0.01em', textTransform: 'uppercase' as const, marginBottom: 6 }}>{title} →</p>
      <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.6 }}>{sub}</p>
    </a>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function StakeholderPageInner() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('hero');
  const [navScrolled, setNavScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push('/sign-in?role=stakeholder');
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
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(id); }, { threshold: 0.2 });
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

      <motion.div style={{ scaleX, transformOrigin: 'left', position: 'fixed', top: 0, left: 0, height: 2, background: GOLD, zIndex: 1000, width: '100%' }} />

      {/* ── Nav ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8vw', height: 52, backgroundColor: navScrolled ? 'rgba(4,8,10,0.97)' : 'rgba(4,8,10,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${navScrolled ? BORDER_MID : BORDER}`, transition: 'background-color 0.3s, border-color 0.3s' }}>
        <button onClick={() => scrollTo('hero')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 28, width: 28, objectFit: 'contain' }} />
          <span style={{ fontFamily: DISPLAY, fontSize: 13, fontWeight: 900, letterSpacing: '0.08em', color: CREAM, textTransform: 'uppercase' }}>Zungu 2027</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'center' }}>
          {NAV_LINKS.map((l) => (
            <button key={l.label} onClick={() => scrollTo(l.id)}
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTED, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD_DIM}`, padding: '4px 10px', fontWeight: 700 }}>Institutional Stakeholder</span>
          <button onClick={() => signOut({ redirectUrl: '/sign-in?role=stakeholder' })}
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTED, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* ── Side dots ── */}
      <div style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 800, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SECTION_IDS.map((id) => (
          <button key={id} onClick={() => scrollTo(id)} title={id}
            style={{ width: activeSection === id ? 8 : 6, height: activeSection === id ? 8 : 6, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, backgroundColor: activeSection === id ? GOLD : GOLD_DIM, transition: 'all 0.3s' }} />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', padding: '80px 8vw', backgroundImage: 'url(/photos/navy-island-aerial-hq.png)', backgroundSize: 'cover', backgroundPosition: 'center 35%' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,8,10,1) 0%, rgba(4,8,10,0.7) 40%, rgba(4,8,10,0.2) 100%), linear-gradient(to right, rgba(4,8,10,0.55) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,168,75,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 24, fontWeight: 700 }}>
            // STAKEHOLDER BRIEF · ZUNGU FESTIVAL · PORT ANTONIO · JAMAICA
          </div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.95, color: CREAM, marginBottom: 8 }}>
            ZUNGU FESTIVAL.<br /><span style={{ color: GOLD }}>NAVY ISLAND.</span><br />PORT ANTONIO.
          </h1>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.04em', lineHeight: 1.8, marginBottom: 48, maxWidth: 520 }}>
            Zungu is a proposed private-island electronic music festival and cultural tourism platform for Navy Island, Port Antonio. This stakeholder brief sets out the site context, operating model, local economic participation, environmental considerations, and review pathway intended for early dialogue with relevant authorities and partners.
          </p>
          <div style={{ display: 'flex', gap: 0, borderTop: `1px solid rgba(200,168,75,0.2)`, paddingTop: 24, flexWrap: 'wrap' }}>
            {[
              { label: '64 ACRES', value: 'Navy Island' },
              { label: 'PORT ANTONIO', value: 'Institutional context' },
              { label: '3 STAGES', value: 'Temporary infrastructure' },
              { label: 'LOCAL BENEFIT', value: 'Operators · jobs · economy' },
              { label: 'STAKEHOLDER REVIEW', value: 'Early dialogue sought' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{ paddingRight: i < arr.length - 1 ? '2.5rem' : 0, marginRight: i < arr.length - 1 ? '2.5rem' : 0, borderRight: i < arr.length - 1 ? `1px solid ${BORDER_MID}` : 'none', marginBottom: '1rem' }}>
                <span style={{ display: 'block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 6 }}>{s.label}</span>
                <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CH01 — FESTIVAL OVERVIEW
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="01" eye="Festival Overview" title="What Zungu Is."
        sub="Zungu is a controlled-capacity destination festival proposal designed to activate Navy Island, route value through Port Antonio, and position Portland as a new Caribbean electronic music destination."
      />
      <ChapterSection id="overview" bg={BG} photo="/photos/navy-island-wide.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>01</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            CONTROLLED-CAPACITY.<br />INTERNATIONAL.<br />PORT ANTONIO-ROOTED.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Three stages. Seven days. A curated programme of electronic music on one of the Caribbean's most significant natural sites.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu is designed as a controlled-capacity international festival — not a mass-attendance event. Year One capacity target is 5,000 guests. The programming centres on electronic music, with a complementary cultural and wellness programme drawing on the natural setting of Navy Island.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 32 }}>
                The proposal is designed around Port Antonio as the mainland base for accommodation, marine movement, food, transport, local operators, hospitality, and guest services. The island is the event site. The town is the operating base.
              </p>
              <div style={{ borderTop: `1px solid ${BORDER_MID}`, paddingTop: 20 }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 14 }}>Three Commitments</p>
                {['Activate Navy Island responsibly.', 'Route value through Port Antonio.', 'Position Jamaica within the global electronic music and cultural tourism economy.'].map((c) => (
                  <p key={c} style={{ fontFamily: MONO, fontSize: 13, color: MUTED, lineHeight: 2 }}>
                    <span style={{ color: GOLD }}>—</span> {c}
                  </p>
                ))}
              </div>
            </div>
            <FactCard rows={[
              { l: 'Location', v: 'Navy Island, Port Antonio, Jamaica' },
              { l: 'Capacity', v: 'Year One target: 5,000 guests' },
              { l: 'Duration', v: 'Seven days · festival week' },
              { l: 'Stages', v: '3 principal stages · temporary structure' },
              { l: 'Programming', v: 'Electronic music · cultural programme' },
              { l: 'Model', v: 'Controlled-capacity · international · Port Antonio-rooted' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH02 — PORT ANTONIO CONTEXT
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="02" eye="Port Antonio" title="The Community Context."
        sub="Zungu is designed to create direct economic participation for Port Antonio — not extract from it."
      />
      <ChapterSection id="portantonio" bg={GREEN} photo="/photos/port-antonio.jpg">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>02</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            PORT ANTONIO<br />IS THE<br />FOUNDATION.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Every operator, supplier, and service is prioritised from Port Antonio and Portland Parish first.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Port Antonio has a history as one of Jamaica's most significant coastal destinations — now underserved by the volume-tourism model that dominates other parts of the island. Navy Island sits in Port Antonio Harbour. Its activation is inseparable from the town.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                The Zungu model is structured so that local operators are not peripheral to the festival — they are the festival's infrastructure. Marine transfer, catering, workforce, accommodation, cultural programming, and site services are all structured around Portland Parish participation first.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                Guests arrive through Port Antonio. They spend in Port Antonio. They leave knowing Port Antonio.
              </p>
            </div>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER_MID}`, borderTop: `3px solid ${GOLD}`, padding: '1.5rem' }}>
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 16 }}>Local Participation</p>
              {[
                { area: 'Marine transport', inv: 'Local boat operators · marine service providers' },
                { area: 'Catering & food', inv: 'Port Antonio vendors · local cuisine programme' },
                { area: 'Workforce', inv: 'Portland Parish hiring first' },
                { area: 'Accommodation', inv: 'Local guesthouses · hotels · villa referrals' },
                { area: 'Cultural programme', inv: 'Local artists · sound selectors · creatives' },
                { area: 'Site services', inv: 'Local contractors · cleaning · logistics' },
              ].map(({ area, inv }) => (
                <div key={area} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 12, padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, paddingTop: 2 }}>{area}</span>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{inv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH03 — NAVY ISLAND SITE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="03" eye="The Site" title="Navy Island."
        sub="64 acres. Caribbean. A natural site that requires no permanent construction to host an extraordinary event."
      />
      <ChapterSection id="island" bg={BG} photo="/photos/island-stages-aerial.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>03</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            THE ISLAND<br />IS THE<br />VENUE.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Three stage positions respond to geography — east, west, south. All infrastructure is temporary. Full demobilisation follows the event.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Navy Island sits in Port Antonio Harbour. It is a 64-acre island of forest, shoreline, and open sky. The three stage positions — east (Origins), west (Rebirth), south-centre (Zungu Main) — are calibrated to the island's natural geography, not imposed on it.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                All infrastructure — stages, glamping, power, sanitation, lighting, access paths — is temporary and fully demobilised after the festival. There is no permanent change to the island's physical character.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                The proposal has been structured around the site-use, marine access, and environmental review areas that matter most to the relevant authorities — and we intend to develop the approval pathway with them directly.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Site', v: 'Navy Island · Port Antonio Harbour' },
              { l: 'Size', v: '64 acres' },
              { l: 'Status', v: 'Site use subject to permitting · stakeholder review' },
              { l: 'Infrastructure', v: 'All temporary · fully demobilised post-event' },
              { l: 'Stages', v: '3 positions · East · West · South-centre' },
              { l: 'Access', v: 'Marine transfer only · departure from Port Antonio' },
              { l: 'Glamping', v: 'West/Southwest · temporary structure' },
              { l: 'Environmental', v: 'EIA scope being defined' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH04 — SOUND + ENERGY
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="04" eye="Sound + Energy" title="The Sound. The Crowd. The Energy."
        sub="Zungu is an electronic music festival rooted in island energy, Jamaican rhythm, and global club culture."
      />
      <ChapterSection id="sound" bg={GREEN} photo="/photos/zungu-origins-stage-design-night.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>04</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            THE SOUND.<br />THE CROWD.<br />THE ENERGY.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            The sound moves across Afro-house, tribal house, tech house, underground house, organic electronic, jungle, drum and bass, and Jamaican electronic influence.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                The energy is not designed around mass disorder or uncontrolled party tourism. It is designed around a controlled-capacity, destination-festival audience: international music travellers, Caribbean and Jamaican diaspora, regional creatives, affluent young professionals, electronic music fans, cultural travellers, wellness-oriented guests, and premium hospitality buyers.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                This audience does not only arrive for one night. They arrive for the island, the music, the food, the town, the water, the culture, the after-hours economy, and the experience of being in Port Antonio.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Sound', v: 'Afro-house · tribal · tech · underground · organic electronic' },
              { l: 'Jamaican', v: 'Jungle · drum and bass · Jamaican electronic influence' },
              { l: 'Audience', v: 'International music travellers · diaspora · regional creatives' },
              { l: 'Energy', v: 'Controlled-capacity destination festival — not mass disorder' },
              { l: 'Duration', v: 'Full festival week · guests arrive for the island, not one night' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH05 — THE AUDIENCE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="05" eye="The Audience" title="A Destination Audience."
        sub="Not a one-night crowd. 5,000 guests who arrive for the island, the music, and Port Antonio."
      />
      <ChapterSection id="audience" bg={BG} photo="/photos/zungu-tribal-stage-arrival.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>05</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            A DESTINATION<br />AUDIENCE.<br />NOT A<br />ONE-NIGHT CROWD.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Zungu's Year One target is 5,000 guests. The intended audience is a controlled destination-festival profile — not a mass street-event crowd.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Expected audience segments include: international electronic music travellers, Jamaican diaspora visitors, regional Caribbean guests, creative industry professionals, premium hospitality buyers, wellness and lifestyle travellers, sponsors, media, artists, and cultural partners, and local and Jamaican music audiences.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                The guest profile matters because this audience creates demand beyond the festival gate. They need accommodation, airport transfers, marine transport, restaurants, bars, guides, wellness services, taxis, private drivers, villas, security support, food suppliers, vendors, and post-event services.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                The island is the event site. Port Antonio is the operating base.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Audience', v: 'International · diaspora · regional Caribbean · creative industry' },
              { l: 'Hospitality', v: 'Premium buyers · wellness-oriented · lifestyle travellers' },
              { l: 'Local demand', v: 'Accommodation · marine · restaurants · guides · taxis · villas' },
              { l: 'Duration', v: 'Full festival week · extended dwell' },
              { l: 'Scale', v: 'Year One target: 5,000 guests' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH06 — STAGE ARCHITECTURE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="06" eye="Stage Architecture" title="Three Stages."
        sub="The stage plan is a site-use framework: sunrise, sunset, and centre-island gathering."
      />
      <ChapterSection id="stages" bg={GREEN} photo="/photos/zungu-stage-design-aerial.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>06</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            THREE STAGES.<br />THREE DIRECTIONS.<br />ONE ISLAND.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Origins faces sunrise. Rebirth faces sunset. Zungu Main sits at the centre of the island. Each stage responds to geography, sound direction, guest movement, and temporary infrastructure requirements.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                The stage plan is not only a creative decision. It is part of the site-use model.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Each stage placement factors in sound direction, temporary structures, guest movement, access control, marine coordination, public safety, waste planning, and demobilisation.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 28 }}>
                Origins, Rebirth, and Zungu Main are designed as temporary stage environments. Placement, operating hours, sound direction, and access requirements are being developed through site survey, environmental guidance, and stakeholder coordination.
              </p>
              <div style={{ overflow: 'hidden', border: `1px solid ${BORDER_MID}` }}>
                <img src="/photos/navy-island-stage-map.png" alt="Navy Island stage positions" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', filter: 'saturate(0.7) brightness(0.8)' }} />
                <div style={{ padding: '10px 14px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: MUTED }}>Navy Island · Stage Positions · Site Use Overview</span>
                </div>
              </div>
            </div>
            <div>
              <FactCard rows={[
                { l: 'Origins', v: 'East · sunrise · morning programming · sound-first' },
                { l: 'Zungu Main', v: 'Centre/South · mainstage · primary crowd gathering' },
                { l: 'Rebirth', v: 'West · sunset · transition into night' },
                { l: 'Access', v: 'South/SW · marine arrival · guest movement' },
                { l: 'Review', v: 'sound · operating hours · temporary structures · demobilisation' },
              ]} />
              <CtaLinkCard eye="// Stage Architecture" title="View Stage Architecture" sub="Open stakeholder-safe stage overview" href="/stages?role=stakeholder" />
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH07 — ACTIVITY PROGRAMME
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="07" eye="Activity Programme" title="The Island Moves By Day."
        sub="The daytime programme creates local operator participation, guest flow, and cultural context before the stages open."
      />
      <ChapterSection id="activities" bg={BG} photo="/photos/stage-beach-activities.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>07</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            FOOD.<br />WATER.<br />WELLNESS.<br />CULTURE.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Zungu is not only night-time music. The island programme includes food, wellness, water activity, cultural moments, media, retail, forest routes, and controlled discovery — where Port Antonio participation becomes most visible.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Local food vendors, wellness practitioners, marine operators, guides, cultural partners, craft vendors, media teams, and hospitality providers all operate within the festival week.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 28 }}>
                Our operating plan addresses guest movement, health standards, licensed marine activity, reef protocol, waste management, environmental protection, local vendor participation, and mainland route planning.
              </p>
              <div style={{ overflow: 'hidden', border: `1px solid ${BORDER_MID}` }}>
                <img src="/photos/blue-lagoon-port-antonio.jpg" alt="Portland Parish activity context" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', filter: 'saturate(0.7) brightness(0.8)' }} />
                <div style={{ padding: '10px 14px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: MUTED }}>Portland Parish · Activity Context · Local Operator Integration</span>
                </div>
              </div>
            </div>
            <div>
              <FactCard rows={[
                { l: 'Food + Beverage', v: 'local vendors · health standards · waste controls' },
                { l: 'Water + Marine', v: 'licensed operators · reef protocol · marine safety' },
                { l: 'Wellness', v: 'guest recovery · practitioner standards' },
                { l: 'Culture + Media', v: 'local creatives · Jamaica story · content control' },
                { l: 'Forest Routes', v: 'guest movement · environmental protection' },
                { l: 'Mainland Routes', v: 'Port Antonio operator participation' },
              ]} />
              <CtaLinkCard eye="// Activity Programme" title="View Activity Programme" sub="Open stakeholder-safe activity overview" href="/activities?role=stakeholder" />
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH08 — GUEST EXPERIENCE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="08" eye="Festival Experience" title="Seven Days. Curated."
        sub="The festival is designed for international guests who spend their full week in and around Port Antonio."
      />
      <ChapterSection id="experience" bg={GREEN} photo="/photos/zungu-glamping-luxe.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>08</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            GUESTS ARRIVE.<br />GUESTS STAY.<br />PORT ANTONIO<br />PARTICIPATES.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Guests arrive, stay through the festival week, use local services, participate in curated programming, and create measurable demand across accommodation, transport, food, wellness, and cultural operators.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu is structured as a week-long event. The guest model is built on extended dwell: guests arrive in Port Antonio, cross to the island by marine transfer, stay on-site in luxury temporary accommodation, and use the town and wider Portland Parish throughout the week.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                The daytime activity programme — forest trails, water experiences, wellness, guided cultural tours — takes guests through Portland Parish. Blue Lagoon, Boston Bay, Frenchman's Cove, and local guide networks are all part of the Zungu week.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                This is not a contained festival that tourists pass through. It puts international visitors inside Port Antonio for a full week.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Duration', v: 'Full festival week · on-island and in town' },
              { l: 'Accommodation', v: 'Luxury glamping · local villa network · Portland hotels' },
              { l: 'Transport', v: 'Marine transfer · Portland ground transport' },
              { l: 'Spend areas', v: 'Dining · accommodation · transport · local operators' },
              { l: 'Programme', v: 'Music · wellness · water · culture · forest activities' },
              { l: 'Cultural anchor', v: 'Port Antonio · Blue Lagoon · Boston Bay · local guides' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH09 — ECONOMIC & TOURISM MODEL
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="09" eye="Economic Model" title="Designed for Portland."
        sub="The Zungu model is structured to maximise Portland Parish economic participation across the full festival week."
      />
      <ChapterSection id="model" bg={BG} photo="/photos/navy-island-wide.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>09</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            LOCAL FIRST.<br />ALWAYS.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Zungu is not a touring event. It is rooted in Portland Parish. That rooting is structural — not aspirational.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 32 }}>
                Every year the festival runs, Portland Parish is the primary operational base. The contracts, the workforce, the marine fleet, the food supply, the accommodation network — all structured around local participation.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginBottom: 0 }}>
                {[
                  { t: 'Marine Operations', d: 'Local boat operators. Primary marine transfer contract. Guest movement on the harbour.' },
                  { t: 'Local Workforce', d: 'Local hiring across marine operations, site crew, vendors, hospitality, guest services, cleaning, logistics, wellness, guides, and event support.' },
                  { t: 'Vendor Programme', d: 'Port Antonio food and beverage vendors. On-site cultural market. Jamaican food at every food station.' },
                  { t: 'Accommodation Network', d: 'Local villa and guesthouse referral. Hotel partnership. Guests routed through Portland Parish first.' },
                ].map(({ t, d }) => (
                  <div key={t} style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${BORDER_MID}`, borderTop: `2px solid ${GOLD}`, padding: '1.25rem' }}>
                    <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 10 }}>{t}</p>
                    <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.7 }}>{d}</p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${BORDER_MID}`, paddingTop: 24, marginTop: 24 }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 14 }}>// What 5,000 Guests Means for Portland</p>
                <p style={{ fontFamily: MONO, fontSize: 13, color: MUTED, lineHeight: 1.9 }}>
                  At a Year One target of 5,000 guests staying an average of 3–5 nights in Portland, the local economic effect extends across: hotels, villas, guest houses, and short-stay rentals · marine operators, ferries, boat captains, and dock services · drivers, taxis, shuttles, and private transfers · restaurants, bars, jerk vendors, seafood suppliers, cafés, and caterers · local farmers, coffee suppliers, fresh produce, ice, water, and beverage distributors · guides, wellness practitioners, marine ecology operators, and cultural hosts · stagehands, build crew, cleaners, waste teams, security support, welfare staff, and logistics runners · craft vendors, fashion vendors, printers, signage teams, and local fixers · media crews, photographers, content teams, and post-event production.
                </p>
                <p style={{ fontFamily: MONO, fontSize: 13, color: MUTED, lineHeight: 1.9, marginTop: 16 }}>
                  Zungu's operating model is designed to keep Port Antonio inside the value chain, not outside it.
                </p>
              </div>
            </div>
            <div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER_MID}`, borderTop: `3px solid ${GOLD}`, padding: '1.5rem' }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 16 }}>Tourism Alignment</p>
                <p style={{ fontFamily: MONO, fontSize: 13, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
                  Controlled-capacity model: extended-stay visitors with stronger local spend potential.
                </p>
                <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.7, marginBottom: 4 }}>Target stay pattern: full festival week.</p>
                <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.7, marginBottom: 20 }}>Typical travel group assumption: 2–4 guests.</p>
                <div style={{ height: 1, backgroundColor: BORDER_MID, marginBottom: 16 }} />
                <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.8 }}>
                  The model aligns with Portland's natural strengths: boutique accommodation, coastal tourism, food culture, heritage, wellness, and guided nature experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH10 — OPERATING CONSIDERATIONS
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="10" eye="Operating Considerations" title="The Plan Factors In The Real Issues."
        sub="Zungu's operating plan is being shaped around the practical realities of a private-island festival in Port Antonio Harbour."
      />
      <ChapterSection id="operations" bg={GREEN} photo="/photos/navy-island-stage-map.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>10</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            THE PLAN<br />FACTORS IN<br />THE REAL ISSUES.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Zungu is not approaching Navy Island as an empty backdrop. The island, the town, the harbour, the reef, the community, and the guest journey are all part of the operating model.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu's operating plan is being shaped around: marine arrival and departure, ferry and boat scheduling, guest transfer between mainland and island, site access and temporary infrastructure, stage placement and sound direction, crowd flow and wayfinding, medical, welfare, and harm-reduction planning, waste removal and sanitation, reef protocol and marine environmental care, food hygiene and vendor standards, security coordination, public safety, weather planning, demobilisation and site restoration, local employment and operator participation.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu welcomes community consultation as part of the process. The organisers are committed to open engagement with Port Antonio residents, community organisations, and local representatives.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                The proposal has been structured around the review areas that matter most — not as a wishlist, but as the operating model framework. This is why the stakeholder dialogue matters.
              </p>
            </div>
            <div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER_MID}`, borderTop: `3px solid ${GOLD}`, padding: '1.5rem' }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 16 }}>Operating Plan Includes</p>
                {[
                  { area: 'Marine access', status: 'Port Authority · Coast Guard coordination in development' },
                  { area: 'Environmental review', status: 'EIA pathway to be defined with the relevant authority' },
                  { area: 'Sound management', status: 'Designed around harbour direction · under review' },
                  { area: 'Operating hours', status: 'To be confirmed through the local authority pathway' },
                  { area: 'Emergency access', status: 'Emergency services route planning in progress' },
                  { area: 'Community engagement', status: 'Open to community consultation' },
                  { area: 'Demobilisation', status: 'Full site clearance planned post-event' },
                ].map(({ area, status }) => (
                  <div key={area} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, paddingTop: 2 }}>{area}</span>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CONTACT / NEXT STEP
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterSection id="contact" bg={BG}>
        <div style={{ padding: '80px 8vw' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(200,168,75,0.5)' }} />
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700 }}>// Stakeholder Contact</span>
          </div>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: GOLD, marginBottom: 20 }}>
            REQUEST<br />STAKEHOLDER<br />MEETING.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 480, marginBottom: 40 }}>
            The next step is a stakeholder meeting to review site use, tourism alignment, operating considerations, and the appropriate approval pathway.
          </p>
          <a href="mailto:partnership@zungufestival.com"
            style={{ display: 'inline-block', fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, border: `1px solid ${GOLD_DIM}`, padding: '1rem 2rem', textDecoration: 'none', transition: 'all 0.2s', marginBottom: 48 }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(200,168,75,0.08)'; e.currentTarget.style.borderColor = GOLD; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = GOLD_DIM; }}>
            partnership@zungufestival.com
          </a>
          <div style={{ display: 'inline-block', marginLeft: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, border: `1px solid ${GOLD_DIM}`, padding: '4px 10px', fontWeight: 700 }}>Institutional Stakeholder</span>
          </div>
          <div style={{ marginTop: 48, borderTop: `1px solid ${BORDER_MID}`, paddingTop: 32, maxWidth: 480 }}>
            <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 12 }}>// Procurement + Partner Interest</p>
            <p style={{ fontFamily: MONO, fontSize: 14, color: MUTED, lineHeight: 1.8, marginBottom: 20 }}>
              Zungu is developing dedicated RFP tracks for qualified production, marine, infrastructure, hospitality, environmental, logistics, and local operator partners. Request RFP access if your organisation is interested in participating in the delivery, operation, or support of the festival.
            </p>
            <a href="mailto:partnership@zungufestival.com?subject=Zungu%20RFP%20Access%20Request"
              style={{ display: 'inline-block', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: MUTED, fontWeight: 700, border: `1px solid ${BORDER_MID}`, padding: '0.75rem 1.5rem', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = GOLD_DIM; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; e.currentTarget.style.borderColor = BORDER_MID; }}>
              Request RFP Access →
            </a>
          </div>
          <p style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(242,235,217,0.25)', lineHeight: 1.8, maxWidth: 560, marginTop: 48 }}>
            This brief is a conceptual overview for early stakeholder dialogue. All operational details are subject to the review pathway being developed with the relevant authorities.
          </p>

          <div style={{ marginTop: 48 }}>
            <a
              href="/deck?role=stakeholder"
              style={{
                display: 'inline-block',
                fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em',
                textTransform: 'uppercase' as const, fontWeight: 700,
                color: BG, background: GOLD,
                padding: '14px 32px', textDecoration: 'none',
              }}
            >
              View Deck →
            </a>
          </div>
        </div>
      </ChapterSection>

      {/* ── Footer ── */}
      <footer style={{ padding: '32px 8vw', borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 20, opacity: 0.5 }} />
          <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED, letterSpacing: '0.2em' }}>ZUNGU FESTIVAL 2027</span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(242,235,217,0.2)', letterSpacing: '0.15em' }}>NAVY ISLAND · PORT ANTONIO · JAMAICA</span>
      </footer>
    </div>
  );
}

export default function StakeholderPage() {
  return (
    <Suspense>
      <StakeholderPageInner />
    </Suspense>
  );
}
