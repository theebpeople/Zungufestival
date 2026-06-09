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
  'sound', 'sessions', 'audience', 'stages', 'activities',
  'experience', 'model', 'operations', 'alignment', 'asks', 'contact',
];

const NAV_LINKS = [
  { label: 'Overview', id: 'overview' },
  { label: 'Port Antonio', id: 'portantonio' },
  { label: 'The Island', id: 'island' },
  { label: 'Stages', id: 'stages' },
  { label: 'Model', id: 'model' },
  { label: 'Alignment', id: 'alignment' },
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
function ChapterSection({
  bg, photo, children, id,
}: {
  bg: string; photo?: string; children: React.ReactNode; id?: string;
}) {
  return (
    <div id={id} style={{ position: 'relative', overflow: 'hidden', backgroundColor: bg, borderBottom: `1px solid ${BORDER}` }}>
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

// ── Main page ─────────────────────────────────────────────────────────────────
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

      <style>{`
        @media (max-width: 480px) {
          .hero-wordmark { font-size: 9vw !important; }
          .hero-eyebrow-full { display: none !important; }
          .hero-eyebrow-mobile { display: block !important; }
        }
        @media (max-width: 1100px) {
          .stakeholder-badge-nav {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>

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
        <button onClick={() => scrollTo('hero')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 28, width: 28, objectFit: 'contain' }} />
        </button>

        <div className="deck-chapter-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'center' }}>
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
          <span className="stakeholder-badge-nav" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, border: `1px solid ${GOLD_DIM}`, padding: '4px 10px', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Stakeholder Brief
          </span>
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
      <section id="hero" style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', padding: '80px 8vw',
        backgroundImage: 'url(/photos/navy-island-aerial-hq.png)',
        backgroundSize: 'cover', backgroundPosition: 'center 35%',
      }}>
        {/* Radial vignette — same treatment as /deck */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(4,8,10,0.55) 0%, rgba(4,8,10,0.92) 75%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          {/* Z-mark */}
          <img
            src="/zungu-z-mark.png"
            alt="Zungu Festival"
            style={{ width: 132, height: 132, objectFit: 'contain', display: 'block', margin: '0 auto 28px', filter: 'drop-shadow(0 0 24px rgba(200,168,75,0.55))' }}
          />

          {/* Portal badge */}
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 28, textAlign: 'center' }}>
            // Stakeholder Brief
          </div>

          {/* Eyebrow — desktop full */}
          <div className="hero-eyebrow-full" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 28 }}>
            <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(200,168,75,0.5)' }} />
            <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.75)', fontWeight: 700, whiteSpace: 'nowrap' }}>
              Institutional Stakeholder Brief · Zungu Festival · Port Antonio · Jamaica
            </span>
            <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(200,168,75,0.5)' }} />
          </div>
          {/* Eyebrow — mobile short */}
          <p className="hero-eyebrow-mobile" style={{ display: 'none', fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(200,168,75,0.85)', fontWeight: 700, textAlign: 'center', maxWidth: 'calc(100vw - 48px)', marginBottom: 28, whiteSpace: 'normal', overflow: 'visible' }}>
            Stakeholder Brief · Port Antonio · 2027
          </p>

          {/* H1 */}
          <h1 className="hero-wordmark" style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.95, color: CREAM, marginBottom: 8, textAlign: 'center' }}>
            A PRIVATE ISLAND<br />FESTIVAL.<br /><span style={{ color: GOLD }}>A PORT ANTONIO</span><br />OPPORTUNITY.<br />A JAMAICAN CULTURAL<br />EXPORT.
          </h1>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.04em', lineHeight: 1.8, marginBottom: 24, maxWidth: 520, textAlign: 'center' }}>
            Zungu is a proposed controlled-capacity destination festival on Navy Island, Port Antonio Harbour. Designed to be one of the world&#39;s most distinctive festival experiences — intimate, curated, and rooted in Jamaican culture — it is a serious tourism, economic, and cultural proposition for Portland Parish and for Jamaica.
          </p>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.04em', lineHeight: 1.8, marginBottom: 48, maxWidth: 520, textAlign: 'center' }}>
            This Stakeholder Brief is designed for institutional, governmental, tourism, environmental, and community stakeholders who need to understand the proposition, the model, and the process before formal review begins.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 0, borderTop: `1px solid rgba(200,168,75,0.2)`, paddingTop: 24, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
            {[
              { label: 'Navy Island', value: 'Proposed Site' },
              { label: 'Port Antonio', value: 'Mainland Base' },
              { label: '5,000', value: 'Year One Target' },
              { label: 'June 17–23', value: 'Target Window · 2027' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{ paddingRight: i < arr.length - 1 ? '2.5rem' : 0, marginRight: i < arr.length - 1 ? '2.5rem' : 0, borderRight: i < arr.length - 1 ? `1px solid ${BORDER_MID}` : 'none', marginBottom: '1rem' }}>
                <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 900, color: CREAM, marginBottom: 4 }}>{s.label}</span>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: GOLD }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:partnership@zungufestival.com?subject=Stakeholder%20Meeting%20Request"
              style={{ display: 'inline-block', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontWeight: 700, color: BG, background: GOLD, padding: '14px 28px', textDecoration: 'none' }}>
              Request Stakeholder Meeting
            </a>
            <a href="/stakeholder-brief"
              style={{ display: 'inline-block', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontWeight: 700, color: GOLD, background: 'transparent', border: `1px solid ${GOLD_DIM}`, padding: '14px 28px', textDecoration: 'none' }}>
              Read Full Institutional Brief →
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CH01 — FESTIVAL OVERVIEW
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="01" eye="Festival Overview"
        title="What Zungu Is."
        sub="A controlled-capacity international festival on a private island. A week-long cultural event rooted in Port Antonio."
      />
      <ChapterSection id="overview" bg={BG} photo="/photos/navy-island-wide.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>01</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            CONTROLLED.<br />CURATED.<br />PORT ANTONIO-ROOTED.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Zungu is not a mass-attendance event. It is a destination festival — designed for a specific audience, a specific place, and a specific purpose.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu is a proposed five-to-seven day international festival on Navy Island, Port Antonio Harbour. Year One target capacity is 5,000 guests. The programme centres on electronic music with curated cultural, wellness, and environmental programming shaped by Jamaica's natural landscape and cultural heritage.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                The event is island-accessed — guests cross from Port Antonio by marine transfer and return daily or stay on-site in temporary accommodation. The mainland base in Port Antonio is the logistical and commercial hub. The town, its operators, and its community are the foundation of the festival's operations.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Site', v: 'Navy Island · Port Antonio Harbour · Jamaica' },
              { l: 'Duration', v: '5–7 days · festival week' },
              { l: 'Target capacity', v: '5,000 guests · Year One' },
              { l: 'Target window', v: 'June 17–23 · 2027' },
              { l: 'Stages', v: '3 principal stages · all temporary structure' },
              { l: 'Programme', v: 'Electronic music · cultural · wellness · water' },
              { l: 'Access', v: 'Marine transfer from Port Antonio waterfront' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH02 — PORT ANTONIO CONTEXT
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="02" eye="Port Antonio Context"
        title="Why Port Antonio."
        sub="Port Antonio is not a backdrop. It is the operational base, the economic beneficiary, and the cultural context."
      />
      <ChapterSection id="portantonio" bg={GREEN} photo="/photos/port-antonio.jpg">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>02</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            PORT ANTONIO<br />IS THE<br />FOUNDATION.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Every marine operator, food vendor, cultural contributor, and site-services provider is sourced from Portland Parish first.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Port Antonio is one of the Caribbean's most historically significant and currently underserved tourism destinations. The town has an international reputation — Errol Flynn, Ian Fleming, the Blue Lagoon — but has not benefited from a tourism model that converts that reputation into sustained local economic participation.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu is designed to change that relationship. Every operational requirement of the festival — marine logistics, catering, accommodation referrals, workforce, guides, cultural programme, site services — is specified for Portland Parish procurement first.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                Guests arrive through Port Antonio. They spend in Port Antonio. They leave knowing Port Antonio. That is the economic model.
              </p>
            </div>
            <div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER_MID}`, borderTop: `3px solid ${GOLD}`, padding: '1.5rem' }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 16 }}>Local Participation Structure</p>
                {[
                  { area: 'Marine transport', v: 'Local boat operators · marine service providers' },
                  { area: 'Catering', v: 'Port Antonio vendors · local cuisine programme' },
                  { area: 'Workforce', v: 'Portland Parish hiring priority' },
                  { area: 'Accommodation', v: 'Local guesthouses · hotels · villa network' },
                  { area: 'Cultural programme', v: 'Local artists · sound selectors · creatives' },
                  { area: 'Site services', v: 'Local contractors · cleaning · logistics' },
                  { area: 'Guides & experiences', v: 'Local guide network · Portland Parish day programme' },
                ].map(({ area, v }) => (
                  <div key={area} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 12, padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, paddingTop: 2 }}>{area}</span>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH03 — NAVY ISLAND SITE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="03" eye="Navy Island Site"
        title="The Proposed Site."
        sub="Navy Island is 64 acres in Port Antonio Harbour. All infrastructure is temporary. Full demobilisation follows the event."
      />
      <ChapterSection id="island" bg={BG} photo="/photos/island-stages-aerial.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>03</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            THE ISLAND<br />IS THE<br />VENUE.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Three stage positions respond to the island's natural geography. All structures are temporary. No permanent modification to the island is proposed.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Navy Island sits in Port Antonio Harbour, approximately 500 metres from the Port Antonio waterfront. It is a 64-acre island of forest, shoreline, and open sky. It has no permanent infrastructure of the kind required for a festival operation — power, water, sanitation, and all production structures must be brought in and removed.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                The three stage positions — east, west, and south-centre — are calibrated to the island's natural geography, not imposed on it. The forest, the elevation, and the shoreline are design elements, not obstacles.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                Site use is subject to the relevant permitting, environmental review, and stakeholder approval processes. No activation proceeds until that review is complete.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Site', v: 'Navy Island · Port Antonio Harbour' },
              { l: 'Size', v: '64 acres' },
              { l: 'Crossing', v: '~500m from Port Antonio waterfront' },
              { l: 'Access', v: 'Marine transfer only · no bridge or causeway' },
              { l: 'Infrastructure', v: 'All temporary · full demobilisation post-event' },
              { l: 'Stage positions', v: '3 · East · West · South-centre' },
              { l: 'Permitting', v: 'Subject to relevant authority approval' },
              { l: 'Environmental', v: 'Environmental review required before activation' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH04 — SOUND + ENERGY
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="04" eye="Sound + Energy"
        title="The Programme."
        sub="Electronic music as the anchor. Jamaican sound culture as the context. Three stages, three acoustic environments."
      />
      <ChapterSection id="sound" bg={GREEN}>
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>04</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            ROOTED IN<br />JAMAICAN SOUND<br />CULTURE.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            The Zungu sound identity is anchored in Jamaica's global music contribution — not imported and placed on the island, but drawn from it.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                The musical programme positions Zungu in the intersection of Jamaica's sound system heritage and contemporary global electronic music culture. Curation is built around that crossover — not a generic international festival programme placed on a Jamaican island.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Three stages serve different programme moods: the main stage for headline programming, the forest stage for deeper, more intimate sets, and the beach stage for sunrise and sunset sessions. All three operate simultaneously with acoustic separation managed by stage placement, landform, and directional sound design.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                Sound management — operating hours, direction, levels — is subject to agreement with the relevant local authorities as part of the event licencing process.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Anchor genre', v: 'Electronic music · Jamaican sound heritage' },
              { l: 'Zungu Main', v: 'Headline-scale programme environment' },
              { l: 'Origins', v: 'Intimate canopy programme environment' },
              { l: 'Rebirth', v: 'Shoreline / beach programme environment' },
              { l: 'Sound separation', v: 'Stage placement + directional arrays + landform' },
              { l: 'Sound management', v: 'Subject to local authority licencing' },
              { l: 'Local artists', v: 'Jamaican and Caribbean artists · programme priority' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          ZUNGU SESSIONS — CREATIVE PROGRAMME
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="04b" eye="The Creative Programme"
        title="Zungu Sessions."
        sub="A private creative programme running alongside the main festival — connecting international artists and Jamaican producers across Port Antonio."
      />
      <ChapterSection id="sessions" bg={GREEN}>
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>04</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            NOT A RECORDING DEAL.<br />A CREATIVE ENVIRONMENT.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            During festival week, Zungu creates a private creative programme alongside the main event — bringing selected international artists and Jamaican producers into studios, listening rooms, and creative sessions across Port Antonio.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                The programme is designed to:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                {[
                  'Route international creative talent through Port Antonio',
                  'Create genuine cultural exchange between Jamaican and international artists',
                  'Build a media archive that associates Port Antonio with world-class creative output',
                  'Provide local studios and creative facilities with international exposure',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                    <span style={{ color: GOLD, flexShrink: 0, fontFamily: MONO, fontSize: 12 }}>—</span>
                    <span style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                Geejam and Port Antonio creative spaces are central to this. The sessions are not forced deliverables. They are a curated environment. What happens in them is what makes them valuable.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Programme type', v: 'Private creative sessions · not public events' },
              { l: 'Location', v: 'Geejam · Port Antonio studios · island villas' },
              { l: 'Participants', v: 'Selected international artists + Jamaican producers' },
              { l: 'Deliverables', v: 'None guaranteed — conditions are the product' },
              { l: 'Community benefit', v: 'Local studio exposure · international talent' },
              { l: 'Media value', v: 'Cultural archive · Port Antonio association' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH05 — THE AUDIENCE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="05" eye="The Audience"
        title="Who Comes to Zungu."
        sub="International cultural travellers. Extended-stay. High-spend. Looking for the world's most distinctive festival experiences."
      />
      <ChapterSection id="audience" bg={BG}>
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>05</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            CULTURAL TRAVELLERS.<br />NOT MASS TOURISTS.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            The Zungu audience is self-selecting for quality, experience, and destination. They travel specifically for the event — and they stay for the place.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu's controlled-capacity model, island setting, and premium positioning attract a specific audience profile: international cultural travellers, predominantly 25–45, with travel and discretionary spend patterns that align with extended-stay, experience-first tourism.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                This audience does not come for a weekend and leave. They plan a trip to Jamaica around the festival. They stay in Port Antonio accommodation before and after the event. They engage with local guides, restaurants, and experiences throughout the week. The festival is the anchor — Port Antonio is the destination.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                Many will be first-time visitors to Jamaica. Many will return. The Zungu audience profile is one that Portland Parish and Jamaica Tourism have not previously had access to at this scale.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Profile', v: 'International cultural travellers · 25–45 primary' },
              { l: 'Origin', v: 'UK · Europe · North America · Caribbean diaspora' },
              { l: 'Stay pattern', v: 'Extended · festival week plus pre/post stay' },
              { l: 'Motivation', v: 'Experience-first · destination-led · cultural' },
              { l: 'Spend profile', v: 'Accommodation · dining · transport · activities' },
              { l: 'Repeat potential', v: 'High — audience returns annually to the destination' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH06 — STAGE ARCHITECTURE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="06" eye="Stage Architecture"
        title="Three Stages. Three Environments."
        sub="Each stage responds to a different part of the island. Each serves a different programme. All temporary."
      />
      <ChapterSection id="stages" bg={GREEN}>
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>06</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            ZUNGU.<br />ORIGINS.<br />REBIRTH.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 32 }}>
            The three stages are named for the arc of the festival experience — arriving, going deeper, beginning again.
          </p>

          <a href="/stages?role=stakeholder"
            style={{ display: 'inline-block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' as const, fontWeight: 700, color: GOLD, border: `1px solid ${GOLD_DIM}`, padding: '10px 20px', textDecoration: 'none', marginBottom: 48 }}>
            View Stage Architecture →
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu Main (south-centre) is the headline stage — open sky, facing south, built for the full production weight of international headliners. Origins (east) is the forest stage — intimate, enclosed, a canopy environment that serves as the spiritual heart of the festival. Rebirth (west) is the beach stage — minimal, facing the sunset, built for the beginning and end of each day.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                All three stages are temporary structures, fully demobilised after the event. Stage placement is designed around acoustic separation — simultaneous operation without sound bleed between stages. Structural specifications, sound design, and site layout are detailed in the Production Partner Brief.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Zungu Main', v: 'South-centre · headline-scale programme environment' },
              { l: 'Origins', v: 'East · intimate canopy programme environment' },
              { l: 'Rebirth', v: 'West · shoreline / beach programme environment' },
              { l: 'Simultaneous', v: 'All 3 stages operate simultaneously' },
              { l: 'Acoustic design', v: 'Directional arrays · landform · stage placement' },
              { l: 'Structure', v: 'All temporary · fully demobilised post-event' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH07 — ACTIVITY PROGRAMME
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="07" eye="Activity Programme"
        title="Beyond the Music."
        sub="The island is the programme. Forest, water, wellness, culture, food — all day, every day."
      />
      <ChapterSection id="activities" bg={BG}>
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>07</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            THE ISLAND<br />IS THE<br />PROGRAMME.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 32 }}>
            A significant portion of the Zungu experience happens outside stage hours. The island and Port Antonio are the daytime venue.
          </p>

          <a href="/activities?role=stakeholder"
            style={{ display: 'inline-block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' as const, fontWeight: 700, color: GOLD, border: `1px solid ${GOLD_DIM}`, padding: '10px 20px', textDecoration: 'none', marginBottom: 48 }}>
            View Activity Programme →
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                The daytime activity programme takes guests through the island and into Port Antonio. Forest trails, beach swimming, kayaking and paddle boarding, guided cultural and heritage tours, wellness programming, a local food market, art and craft spaces, and sound system culture workshops are all part of the festival week.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                The mainland programme — Blue Lagoon, Boston Bay, Frenchman's Cove, local guide networks, Portland Parish day experiences — is structured as a formal part of the Zungu week, not an afterthought. Local operators partner with Zungu to programme and deliver these experiences.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Island activities', v: 'Forest trails · beach · water sports · wellness' },
              { l: 'Cultural', v: 'Art · craft · sound system culture · food market' },
              { l: 'Mainland programme', v: 'Blue Lagoon · Boston Bay · Portland guides' },
              { l: 'Local operators', v: 'Activity programme delivered by local providers' },
              { l: 'Structure', v: 'All daytime activity infrastructure is temporary' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH08 — GUEST EXPERIENCE & PROGRAMME
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="08" eye="Guest Experience"
        title="Seven Days in Port Antonio."
        sub="Guests arrive for the festival. They stay for Jamaica. The week is designed to create lasting connection to the destination."
      />
      <ChapterSection id="experience" bg={GREEN} photo="/photos/zungu-glamping-luxe.png">
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>08</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            GUESTS ARRIVE.<br />GUESTS STAY.<br />PORT ANTONIO<br />PARTICIPATES.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            The festival week is designed for extended dwell — on the island, in the town, across Portland Parish.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu is structured as a destination event, not a day-trip. The guest journey begins in Port Antonio: accommodation, orientation, marine transfer to the island. The festival week moves between the island (music and evening programming) and Portland Parish (daytime activities, guided experiences, local dining).
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                On-island accommodation — Navy Obsidian premium units and Island Village — is a premium product positioned for guests who want the full island-immersive experience. Hotel, villa, and guesthouse accommodation in Port Antonio serves the rest of the audience.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                This format puts international visitors inside Port Antonio's economy for seven days. Not for a night. Not for a day-visit. A week.
              </p>
            </div>
            <FactCard rows={[
              { l: 'Duration', v: 'Festival week · 5–7 days' },
              { l: 'On-island stay', v: 'Navy Obsidian + Island Village · temporary · premium tier' },
              { l: 'Town accommodation', v: 'Port Antonio hotels · villas · guesthouses' },
              { l: 'Daytime', v: 'Island activities + Portland Parish programme' },
              { l: 'Evening', v: 'Three stages · island cross · marine transfer' },
              { l: 'Catering', v: 'Jamaican food throughout · local vendors on-site' },
            ]} />
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH09 — ECONOMIC & TOURISM MODEL
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="09" eye="Economic + Tourism Model"
        title="Local First. Always."
        sub="The Zungu model is structured to maximise Portland Parish economic participation across the full festival week."
      />
      <ChapterSection id="model" bg={BG}>
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>09</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            STRUCTURED FOR<br />PORTLAND<br />PARTICIPATION.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            The economic model is not aspirational. Local participation is contractual — written into the event's operational structure from the start.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 32 }}>
                Every operational contract for Zungu is written with a Portland Parish priority clause. Marine operations, catering supply, site workforce, accommodation referrals, cultural programming, and guide services are all tendered locally before going beyond the parish. This is not a goodwill gesture. It is how the event is designed to work.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                {[
                  { t: 'Marine Fleet', d: 'Local boat operators. Primary guest and crew transfer contracts to Portland Parish marine services.' },
                  { t: 'Workforce', d: 'Crew, hospitality, site services, vendors, security support — Portland Parish hiring priority.' },
                  { t: 'Food & Beverage', d: 'On-site vendor programme for Portland and Jamaican food operators. Local supply chain for catering.' },
                  { t: 'Accommodation', d: 'Guest accommodation routed through Port Antonio hotels, villas, and guesthouses before external options.' },
                ].map(({ t, d }) => (
                  <div key={t} style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${BORDER_MID}`, borderTop: `2px solid ${GOLD}`, padding: '1.25rem' }}>
                    <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 10 }}>{t}</p>
                    <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.7 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER_MID}`, borderTop: `3px solid ${GOLD}`, padding: '1.5rem' }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 16 }}>Tourism Alignment</p>
                <p style={{ fontFamily: MONO, fontSize: 13, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
                  Controlled-capacity, extended-stay model delivers higher per-visitor spend and stronger local economic multiplier than volume day-trip tourism.
                </p>
                <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.7, marginBottom: 20 }}>
                  Target stay: full festival week. Typical group: 2–4 guests. Many first-time Jamaica visitors — with high repeat potential for the destination, not just the festival.
                </p>
                <div style={{ height: 1, backgroundColor: BORDER_MID, marginBottom: 16 }} />
                <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.8 }}>
                  The model aligns with Portland's natural strengths: boutique accommodation, coastal experiences, food culture, heritage, wellness, and guided nature tourism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH10 — OPERATING CONSIDERATIONS
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="10" eye="Operating Considerations"
        title="How the Event Works."
        sub="Marine logistics. Power generation. Sanitation. Medical. Security. All planned. All temporary. All subject to authority review."
      />
      <ChapterSection id="operations" bg={GREEN}>
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>10</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            DESIGNED TO<br />OPERATE CLEANLY.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            An island festival requires complete operational self-sufficiency. Every system — power, water, waste, medical, security, transport — must be planned, resourced, and compliant before the event opens.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 3 }}>
            {[
              { t: 'Marine Operations', d: 'All guests, crew, equipment, food, fuel, and waste move by boat between Port Antonio and Navy Island. Marine logistics is the single most complex constraint of the production.' },
              { t: 'Power Generation', d: 'No grid connection on Navy Island. All power generated on-island using temporary diesel generators with battery buffer. N+1 redundancy on primary systems.' },
              { t: 'Water & Sanitation', d: 'All potable water transported to island. All grey water, sewage, and solid waste contained and removed. Zero discharge to island ground or surrounding sea.' },
              { t: 'Medical Provision', d: 'On-island medical unit and qualified paramedics throughout the event. Dedicated fast-vessel for medical evacuation to Port Antonio. Pre-arranged hospital liaison.' },
              { t: 'Security Framework', d: 'Marine perimeter during event hours. Entry control at transfer dock. On-island crowd management. Artist compound security. Coordinated with local police and authorities.' },
              { t: 'Environmental Compliance', d: 'Full site reinstatement within 14 days of event close. No permanent modification to island. Pre and post-event environmental assessment. All permits in place before activation.' },
            ].map(({ t, d }) => (
              <div key={t} style={{ backgroundColor: 'rgba(0,0,0,0.35)', border: `1px solid ${BORDER_MID}`, borderTop: `2px solid ${GOLD}`, padding: '1.5rem' }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 10 }}>{t}</p>
                <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH11 — STAKEHOLDER ALIGNMENT
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="11" eye="Stakeholder Alignment"
        title="Review. Coordinate. Confirm."
        sub="Zungu recognises that an event of this nature requires early, open, and sustained engagement with institutional stakeholders."
      />
      <ChapterSection id="alignment" bg={BG}>
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>11</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            NO ACTIVATION<br />BEFORE REVIEW<br />IS COMPLETE.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            The project is being prepared for early stakeholder dialogue. This brief is the beginning of that conversation, not the end.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Zungu is being developed with full awareness that an event on Navy Island requires engagement across multiple institutional, community, environmental, and regulatory stakeholders. The organisers are not seeking to proceed by exception. They are seeking to proceed by consent.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 20 }}>
                Site use permitting, environmental review, marine access coordination, sound management agreements, operating hours, emergency planning, and demobilisation protocols are all areas where the relevant authorities and stakeholders have formal roles. Zungu supports full engagement with those processes.
              </p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9 }}>
                Community consultation is welcomed. The organisers are committed to open dialogue with Port Antonio residents, community organisations, local representatives, and civil society groups throughout the development process.
              </p>
            </div>
            <div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER_MID}`, borderTop: `3px solid ${GOLD}`, padding: '1.5rem' }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 16 }}>Stakeholder Review Areas</p>
                {[
                  { area: 'Site use / permitting', v: 'Relevant authority approval required' },
                  { area: 'Environmental review', v: 'EIA scope to be determined with relevant body' },
                  { area: 'Marine access', v: 'Port Authority · Coast Guard coordination' },
                  { area: 'Sound / operating hours', v: 'Subject to local authority licensing agreement' },
                  { area: 'Emergency planning', v: 'Emergency services route and protocol planning' },
                  { area: 'Community consultation', v: 'Open to formal consultation process' },
                  { area: 'Site reinstatement', v: 'Full demobilisation plan to be submitted' },
                ].map(({ area, v }) => (
                  <div key={area} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, paddingTop: 2 }}>{area}</span>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CH12 — INSTITUTIONAL ASKS
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider
        num="12" eye="Institutional Asks"
        title="What We Are Seeking."
        sub="Engagement across tourism, environment, marine, community, and government stakeholders — before activation begins."
      />
      <ChapterSection id="asks" bg={GREEN}>
        <div style={{ padding: '80px 8vw', position: 'relative' }}>
          <GhostNum>12</GhostNum>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM, marginBottom: 16 }}>
            EARLY DIALOGUE.<br />CLEAR PROCESS.<br />OPEN OUTCOME.
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            We are not asking for permission to proceed before review. We are asking for the conversation that makes review possible.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3 }}>
            {[
              {
                inst: 'Jamaica Tourism Board / TPDCo',
                ask: 'Dialogue on alignment with national tourism strategy. Understanding of licensing and approval pathways for controlled-capacity events. Support in identifying appropriate stakeholder engagement process.',
              },
              {
                inst: 'Portland Parish Council',
                ask: 'Early dialogue on the event proposal. Understanding of the local approval and consultation process. Engagement with Port Antonio community representatives on the economic participation model.',
              },
              {
                inst: 'NEPA / Environmental Authorities',
                ask: 'Guidance on the environmental review requirements for temporary event use of Navy Island. Understanding of the EIA scope and timeline. Early discussion of demobilisation and reinstatement requirements.',
              },
              {
                inst: 'Port Authority of Jamaica',
                ask: 'Understanding of the marine access, boat operator licensing, and harbour use requirements for a controlled-capacity marine transfer operation between Port Antonio and Navy Island.',
              },
              {
                inst: 'Jamaica Coast Guard',
                ask: 'Early dialogue on marine safety requirements for the crossing operation. Understanding of emergency vessel coordination and marine perimeter requirements during event hours.',
              },
              {
                inst: 'Local Community',
                ask: 'Open consultation with Port Antonio residents, community organisations, and local representatives. Understanding of concerns, expectations, and requirements for community benefit and consent.',
              },
            ].map(({ inst, ask }) => (
              <div key={inst} style={{ backgroundColor: 'rgba(0,0,0,0.35)', border: `1px solid ${BORDER_MID}`, borderTop: `2px solid ${GOLD}`, padding: '1.5rem' }}>
                <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700, marginBottom: 10 }}>{inst}</p>
                <p style={{ fontFamily: MONO, fontSize: 12, color: MUTED, lineHeight: 1.7 }}>{ask}</p>
              </div>
            ))}
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CONTACT
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
            Zungu is seeking early dialogue with institutional, tourism, environmental, marine, community, and public-sector stakeholders. The contact for all stakeholder enquiries is below.
          </p>

          <a
            href="mailto:partnership@zungufestival.com?subject=Stakeholder%20Meeting%20Request"
            style={{
              display: 'inline-block',
              fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em',
              textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700,
              border: `1px solid ${GOLD_DIM}`, padding: '1rem 2rem',
              textDecoration: 'none', transition: 'all 0.2s',
              marginBottom: 32,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(200,168,75,0.08)'; e.currentTarget.style.borderColor = GOLD; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = GOLD_DIM; }}
          >
            partnership@zungufestival.com
          </a>

          <div style={{ marginBottom: 32 }}>
            <a href="/stakeholder-brief"
              style={{ display: 'inline-block', fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: MUTED, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED as string)}>
              Read Full Institutional Brief →
            </a>
          </div>

          <p style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(242,235,217,0.25)', lineHeight: 1.8, maxWidth: 560, marginBottom: 48 }}>
            This brief is a conceptual overview for stakeholder review purposes. Site use, permitting, environmental review, and all operational details are subject to the relevant approval processes. No activation proceeds before the review process is complete.
          </p>

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
