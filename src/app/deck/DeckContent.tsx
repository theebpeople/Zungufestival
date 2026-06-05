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

const fontDisplay = "'Unbounded', sans-serif";
const fontMono = "'Space Mono', monospace";

// ── Chapter tints ─────────────────────────────────────────────────────────────
const CHAPTERS: Record<string, { bg: string; accent: string; rgb: string }> = {
  '01': { bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  },
  '02': { bg: '#060410', accent: '#9B5FC0', rgb: '155,95,192'  },
  '03': { bg: '#030e06', accent: '#3AAF7A', rgb: '58,175,122'  },
  '04': { bg: '#060400', accent: '#D4722A', rgb: '212,114,42'  },
  '05': { bg: '#040810', accent: '#4A8FBD', rgb: '74,143,189'  },
  '06': { bg: '#060410', accent: '#9B5FC0', rgb: '155,95,192'  },
  '07': { bg: '#030e06', accent: '#3AAF7A', rgb: '58,175,122'  },
  '08': { bg: '#060400', accent: '#D4722A', rgb: '212,114,42'  },
  '09': { bg: '#040810', accent: '#4A8FBD', rgb: '74,143,189'  },
  '10': { bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  },
  '11': { bg: '#060410', accent: '#9B5FC0', rgb: '155,95,192'  },
  '12': { bg: '#030e06', accent: '#3AAF7A', rgb: '58,175,122'  },
  '13': { bg: '#060400', accent: '#D4722A', rgb: '212,114,42'  },
  '14': { bg: '#040810', accent: '#4A8FBD', rgb: '74,143,189'  },
  'cta':{ bg: '#060600', accent: '#C8A84B', rgb: '200,168,75'  },
};

// ── Section IDs ───────────────────────────────────────────────────────────────
const SECTIONS = [
  'brand', 'meaning', 'opportunity', 'portantonio', 'island', 'jamaica',
  'world', 'sound', 'accommodation', 'commercial', 'financial', 'risk',
  'roadmap', 'investor', 'cta'
] as const;
type SectionId = typeof SECTIONS[number];

const ROLE_SECTIONS: Record<string, readonly SectionId[]> = {
  investor: ['brand','meaning','opportunity','portantonio','island','jamaica','world','sound','accommodation','commercial','financial','risk','roadmap','investor','cta'],
  partner:  ['brand','meaning','portantonio','island','world','sound','cta'],
  press:    ['brand','meaning','portantonio','island','jamaica','world','sound','cta'],
};

const ROLE_CTA = {
  investor: {
    label: 'Request Briefing',
    body: "We're talking to a small number of aligned partners. Tell us where you see yourself.",
  },
  partner: {
    label: 'Request Production Briefing',
    body: "We're looking for an experienced production partner. Tell us about your capacity.",
  },
  press: {
    label: 'Request Media Access',
    body: "Approved materials and accreditation details for a small number of media contacts.",
  },
} as const;

// ── Parallax photo break ───────────────────────────────────────────────────────
function PhotoBreak({ src, quote, label, height = '70vh' }: { src: string; quote: string; label: string; height?: string | number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  return (
    <div ref={ref} style={{ width: '100%', position: 'relative', height, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div style={{ position: 'absolute', inset: '-10%', backgroundImage: `url('${src}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.7) brightness(0.35)', y: bgY }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,8,8,0.7) 0%, rgba(6,8,8,0) 50%)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 clamp(24px,8vw,120px)', width: '100%' }}>
        <p style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.6em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: 20 }}>{label}</p>
        <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(32px,5.5vw,72px)', fontWeight: 900, color: cream, lineHeight: 1.05 }}>{quote}</p>
      </div>
    </div>
  );
}

// ── Chapter divider ────────────────────────────────────────────────────────────
function ChapterDivider({ num, eye, title, sub, accent = gold, chBg = bg, rgb = '200,168,75' }: {
  num: string; eye: string; title: string; sub: string; accent?: string; chBg?: string; rgb?: string;
}) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', backgroundColor: chBg, borderTop: '1px solid rgba(200,168,75,0.07)', padding: '80px 8vw 40px', display: 'flex', alignItems: 'flex-start', gap: '3rem', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 70% at 90% 15%, rgba(${rgb},.11) 0%, transparent 60%)`, pointerEvents: 'none' }} />
      <div style={{ fontFamily: fontDisplay, fontSize: 88, fontWeight: 900, color: accent, opacity: 0.08, lineHeight: 1, flexShrink: 0, userSelect: 'none', position: 'relative', zIndex: 1 }}>{num}</div>
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: accent, flexShrink: 0 }} />
          <p style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.6em', color: accent, textTransform: 'uppercase', fontWeight: 700 }}>{eye}</p>
        </div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(24px,4vw,48px)', fontWeight: 700, color: accent, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 12 }}>{title}</h2>
        <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.7, maxWidth: 540 }}>{sub}</p>
      </div>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({ id, children, sectionBg = bg, accent = gold, rgb = '200,168,75', style }: {
  id?: string; children: React.ReactNode; sectionBg?: string; accent?: string; rgb?: string; style?: React.CSSProperties;
}) {
  return (
    <section id={id ? `section-${id}` : undefined} style={{ width: '100%', boxSizing: 'border-box', backgroundColor: sectionBg, position: 'relative', ...style }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 55% at 5% 95%, rgba(${rgb},.08) 0%, transparent 55%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ padding: '88px 8vw', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>{children}</div>
    </section>
  );
}

// ── Chapter photo wrapper ──────────────────────────────────────────────────────
function ChapterWrap({ bg: chBg, photo, children }: { bg: string; photo: string; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: chBg }}>
      <img src={photo} alt="" aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.32, filter: 'saturate(0.5) brightness(0.4)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${chBg} 28%, ${chBg}ee 50%, transparent 82%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ── Quote block ────────────────────────────────────────────────────────────────
function QuoteBlock({ quote, attr }: { quote: string; attr: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${gold}`, paddingLeft: 28, margin: '48px 0', maxWidth: 680 }}>
      <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px,2.2vw,24px)', fontWeight: 600, color: cream, lineHeight: 1.45, marginBottom: 14, fontStyle: 'italic' }}>&ldquo;{quote}&rdquo;</p>
      <p style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: gold, fontWeight: 700 }}>— {attr}</p>
    </div>
  );
}

// ── Body text ──────────────────────────────────────────────────────────────────
function BodyText({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: fontMono, fontSize: 14, color: muted, lineHeight: 1.9, maxWidth: 680, marginBottom: 18 }}>{children}</p>;
}

// ── Section heading ────────────────────────────────────────────────────────────
function SectionHead({ label, title, titleColor = cream, goldLine, accent = gold }: {
  label?: string; title: string; titleColor?: string; goldLine?: string; accent?: string;
}) {
  return (
    <div style={{ marginBottom: 36 }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
          <div style={{ width: 28, height: 1, background: accent, flexShrink: 0 }} />
          <p style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.6em', textTransform: 'uppercase', color: accent, fontWeight: 700 }}>{label}</p>
        </div>
      )}
      <h3 style={{ fontFamily: fontDisplay, fontSize: 'clamp(24px,4vw,54px)', fontWeight: 700, color: titleColor, lineHeight: 1.02, letterSpacing: '-0.025em', marginBottom: 28 }}>
        {title}{goldLine && (<><br /><span style={{ color: accent }}>{goldLine}</span></>)}
      </h3>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function DeckContent({ navLabel = 'INVESTOR DECK', role = 'investor' }: { navLabel?: string; role?: string }) {
  const safeRole = role === 'investor' || role === 'partner' || role === 'press' ? role : 'partner';
  const visibleSections = ROLE_SECTIONS[safeRole];
  const ctaCopy = ROLE_CTA[safeRole];

  const sectionRefs: Partial<Record<SectionId, React.RefObject<HTMLElement | null>>> = Object.fromEntries(
    SECTIONS.map(id => [id, useRef<HTMLElement>(null)])
  ) as Record<SectionId, React.RefObject<HTMLElement | null>>;

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeSection, setActiveSection] = useState<SectionId>('brand');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [briefingName, setBriefingName] = useState('');
  const [briefingOrg, setBriefingOrg] = useState('');
  const [briefingEmail, setBriefingEmail] = useState('');
  const [briefingMessage, setBriefingMessage] = useState('');
  const [briefingSubmitted, setBriefingSubmitted] = useState(false);
  const [briefingSubmitting, setBriefingSubmitting] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [heroScale, setHeroScale] = useState(1.05);

  useEffect(() => { const t = setTimeout(() => setHeroScale(1), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    visibleSections.forEach(id => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(id); }, { threshold: 0.25 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [visibleSections]);

  function scrollToSection(id: SectionId) { document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth' }); }

  function openBriefing() {
    setBriefingName(''); setBriefingOrg(''); setBriefingEmail(''); setBriefingMessage('');
    setBriefingSubmitted(false); setBriefingOpen(true);
  }

  async function submitBriefing(e: React.FormEvent) {
    e.preventDefault();
    setBriefingSubmitting(true);
    try { await fetch('/api/partner-interest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: safeRole, name: briefingName, org: briefingOrg, email: briefingEmail, message: briefingMessage }) }); } catch {}
    setBriefingSubmitting(false); setBriefingSubmitted(true);
  }

  const rawNavGroups: { label: string; items: [string, SectionId][] }[] = [
    { label: 'Brand',        items: [['What Is Zungu?', 'brand'], ['What Does Zungu Mean?', 'meaning']] },
    { label: 'Opportunity',  items: [['The Opportunity', 'opportunity']] },
    { label: 'The Island',   items: [['Port Antonio', 'portantonio'], ['The Island', 'island'], ['Why Jamaica?', 'jamaica']] },
    { label: 'The Festival', items: [['The World of Zungu', 'world'], ['Sound + Artists', 'sound'], ['Accommodation', 'accommodation']] },
    { label: 'Investment',   items: [['Commercial Model', 'commercial'], ['Year One Financials', 'financial'], ['Risk + Execution', 'risk'], ['Roadmap', 'roadmap'], ['Investor Positioning', 'investor'], ['Request Briefing', 'cta']] },
  ];
  const navGroups = rawNavGroups
    .map(g => ({ ...g, items: g.items.filter(([, id]) => visibleSections.includes(id)) }))
    .filter(g => g.items.length > 0);

  return (
    <div style={{ backgroundColor: bg, color: cream, fontFamily: fontMono, position: 'relative', width: '100%', minHeight: '100vh' }}>

      {/* ── Scroll progress bar ── */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: gold, scaleX, transformOrigin: 'left', zIndex: 1000 }} />

      {/* ── Dot nav ── */}
      <div style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 99 }}>
        {visibleSections.map(id => (
          <button key={id} title={id} onClick={() => scrollToSection(id)} style={{ width: activeSection === id ? 8 : 4, height: activeSection === id ? 8 : 4, borderRadius: '50%', background: activeSection === id ? gold : dim, border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s' }} />
        ))}
      </div>

      {/* ── Briefing modal ── */}
      {briefingOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 980, backgroundColor: 'rgba(6,8,8,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', overflowY: 'auto', fontFamily: fontMono }}>
          <div style={{ position: 'fixed', inset: 0, backgroundImage: "url('/photos/navy-island-aerial-hq.png')", backgroundSize: 'cover', backgroundPosition: 'center 40%', filter: 'saturate(0.5) brightness(0.1)', pointerEvents: 'none', zIndex: 0 }} />
          <button onClick={() => setBriefingOpen(false)} style={{ position: 'fixed', top: 24, right: 28, zIndex: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: fontMono, fontSize: 20, color: muted }}>✕</button>
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 2rem 4rem', minHeight: '100vh' }}>
            <img src="/zungu-z-mark.png" alt="Zungu" style={{ width: 60, marginBottom: '1.5rem', filter: 'drop-shadow(0 0 24px rgba(200,168,75,0.45))' }} />
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(2.5rem,8vw,5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: cream, textTransform: 'uppercase', marginBottom: '0.15rem' }}>REQUEST</h2>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(2.5rem,8vw,5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: gold, textTransform: 'uppercase', marginBottom: '2.5rem' }}>BRIEFING</h2>
            {briefingSubmitted ? (
              <div style={{ textAlign: 'center', maxWidth: 480 }}>
                <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(1.1rem,4vw,1.8rem)', fontWeight: 900, color: cream, marginBottom: '1rem' }}>Enquiry received.</p>
                <p style={{ fontSize: 13, color: muted, lineHeight: 1.9, marginBottom: '2rem' }}>The team will respond with the appropriate material for your access level.</p>
                <button onClick={() => setBriefingOpen(false)} style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, padding: '14px 32px', background: gold, color: bg, border: 'none', cursor: 'pointer' }}>Back to Deck ←</button>
              </div>
            ) : (
              <div style={{ width: '100%', maxWidth: 520 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.4em', color: gold, textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem' }}>// {safeRole.toUpperCase()} BRIEFING REQUEST</p>
                <form onSubmit={submitBriefing} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Name', value: briefingName, set: setBriefingName, type: 'text', required: true },
                    { label: 'Organisation', value: briefingOrg, set: setBriefingOrg, type: 'text', required: false },
                    { label: 'Email', value: briefingEmail, set: setBriefingEmail, type: 'email', required: true },
                  ].map(({ label, value, set, type, required }) => (
                    <div key={label}>
                      <label style={{ fontFamily: fontMono, fontSize: 9, color: muted, letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{label}</label>
                      <input type={type} value={value} onChange={e => set(e.target.value)} required={required} style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${dim}`, color: cream, fontFamily: fontMono, fontSize: 13, outline: 'none' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily: fontMono, fontSize: 9, color: muted, letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Message</label>
                    <textarea value={briefingMessage} onChange={e => setBriefingMessage(e.target.value)} rows={4} style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${dim}`, color: cream, fontFamily: fontMono, fontSize: 13, resize: 'vertical', outline: 'none' }} />
                  </div>
                  <button type="submit" disabled={briefingSubmitting} style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, padding: '16px 32px', background: gold, color: bg, border: 'none', cursor: 'pointer', alignSelf: 'flex-start', marginTop: 8 }}>
                    {briefingSubmitting ? 'Sending…' : 'Submit →'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Nav ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 52, zIndex: 900, backgroundColor: 'rgba(6,8,8,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: `1px solid ${dim}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6vw', gap: 16 }}>
        <img src="/zungu-z-mark.png" style={{ height: 30, filter: 'drop-shadow(0 0 10px rgba(200,168,75,.3))', display: 'block', flexShrink: 0 }} alt="Zungu" />
        <div className="deck-chapter-links" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {navGroups.map(group => (
            <div key={group.label} style={{ position: 'relative' }}>
              <button
                onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
                style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: muted, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 10px' }}
              >
                {group.label}
              </button>
              {openDropdown === group.label && (
                <div style={{ position: 'absolute', top: '100%', left: 0, minWidth: 200, backgroundColor: 'rgba(6,8,8,0.97)', backdropFilter: 'blur(16px)', border: `1px solid rgba(200,168,75,0.12)`, padding: '8px 0', zIndex: 900 }}>
                  {group.items.map(([label, id]) => (
                    <button key={id} onClick={() => { scrollToSection(id); setOpenDropdown(null); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 18px', fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = String(muted); }}
                    >{label}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <a href={`/activities?role=${safeRole}`} className="deck-nav-desktop" style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: muted, textDecoration: 'none', fontWeight: 700 }}>Activities</a>
          <a href={`/stages?role=${safeRole}`} className="deck-nav-desktop" style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: muted, textDecoration: 'none', fontWeight: 700 }}>Stages</a>
          <span className="deck-nav-desktop" style={{ fontFamily: fontMono, fontSize: 9, color: gold, border: `1px solid rgba(200,168,75,0.4)`, padding: '0.3rem 0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>{navLabel.toUpperCase()}</span>
          <button onClick={() => setMobileMenuOpen(true)} className="deck-hamburger" aria-label="Open menu" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px' }}>
            {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 22, height: 2, background: muted }} />)}
          </button>
        </div>
      </nav>

      <style>{`
        @media (min-width: 901px) { .deck-hamburger { display: none !important; } }
        @media (max-width: 900px) { .deck-nav-desktop { display: none !important; } .deck-chapter-links { display: none !important; } }
        body { cursor: crosshair; }
      `}</style>

      {/* ── Mobile menu ── */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 950, backgroundColor: 'rgba(6,8,8,0.97)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: 0 }}>
          <button onClick={() => setMobileMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: muted, fontSize: 22, cursor: 'pointer', fontFamily: fontMono }}>✕</button>
          <img src="/zungu-z-mark.png" alt="Zungu" style={{ width: 48, marginBottom: 40 }} />
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%', marginBottom: 40 }}>
            {navGroups.map(group => (
              <div key={group.label} style={{ width: '100%', borderBottom: `1px solid ${dim}` }}>
                <div style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: gold, padding: '14px 0 4px', textAlign: 'center' }}>{group.label}</div>
                {group.items.map(([label, id]) => (
                  <button key={id} onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }} style={{ display: 'block', width: '100%', fontFamily: fontDisplay, fontSize: 'clamp(14px,3.5vw,20px)', fontWeight: 700, textTransform: 'uppercase', color: cream, letterSpacing: '-0.01em', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', textAlign: 'center' }}>{label}</button>
                ))}
              </div>
            ))}
          </nav>
          <button onClick={() => { openBriefing(); setMobileMenuOpen(false); }} style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, padding: '16px 36px', background: gold, color: bg, border: 'none', cursor: 'pointer' }}>{ctaCopy.label} →</button>
        </div>
      )}

      {/* ── Hero ── */}
      <section style={{ width: '100%', position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('/photos/navy-island-aerial-hq.png')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.7) brightness(0.45)', transform: `scale(${heroScale})`, transition: 'transform 1.8s cubic-bezier(0.16,1,0.3,1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${bg} 0%, rgba(6,8,8,0.55) 40%, rgba(6,8,8,0.1) 100%)` }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 8vw 120px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: gold }} />
            <p style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: gold, fontWeight: 700 }}>Navy Island · Port Antonio · Jamaica · Target Window: June 17–23, 2027</p>
            <div style={{ width: 32, height: 1, background: gold }} />
          </div>
          <img src="/zungu-z-mark.png" width={110} style={{ marginBottom: 24, display: 'block' }} alt="Zungu" />
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(58px,11.5vw,155px)', fontWeight: 900, letterSpacing: '-0.045em', textTransform: 'uppercase', lineHeight: 0.9, color: cream, marginBottom: 24 }}>ZUNGU</h1>
          <p style={{ fontFamily: fontMono, fontSize: 'clamp(10px,1.5vw,14px)', letterSpacing: '0.4em', textTransform: 'uppercase', color: muted, maxWidth: 440, lineHeight: 1.8 }}>A private-island electronic music festival. Navy Island. Port Antonio, Jamaica.</p>
        </div>
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
          {visibleSections.slice(0, 6).map((id, i) => (
            <div key={id} style={{ width: i === 0 ? 20 : 6, height: 2, background: i === 0 ? gold : dim, transition: 'all 0.3s' }} />
          ))}
        </div>
      </section>

      {/* ═══ CHAPTER 01: WHAT IS ZUNGU? ═══ */}
      <ChapterWrap bg={CHAPTERS['01'].bg} photo="/photos/navy-island-aerial.jpg">
        <ChapterDivider num="01" eye="Chapter One" title="What Is Zungu?" sub="For one week, the most beautiful place on earth welcomes you to Zungu." accent={CHAPTERS['01'].accent} chBg={CHAPTERS['01'].bg} rgb={CHAPTERS['01'].rgb} />
        <Section id="brand" sectionBg={CHAPTERS['01'].bg} accent={CHAPTERS['01'].accent} rgb={CHAPTERS['01'].rgb}>
          <SectionHead label="What Is Zungu?" title="An entire island in rhythm." accent={CHAPTERS['01'].accent} />
          <div style={{ maxWidth: 880, marginBottom: 32 }}>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(15px,2.2vw,26px)', fontWeight: 300, lineHeight: 1.5, color: cream, marginBottom: 16 }}>For one week, the most beautiful place on earth welcomes you to Zungu. Where the magic of sound, sea, sand, movement, and Caribbean rhythm invites you into the ultimate electronic music experience.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(15px,2.2vw,26px)', fontWeight: 400, lineHeight: 1.5, color: cream, marginBottom: 16 }}>Zungu is an electronic music festival on a private island. Set on Navy Island in Port Antonio, Jamaica, Zungu transforms an entire island into a world of sound, water, forest, light, food, art, culture, and movement.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(20px,3vw,38px)', fontWeight: 700, lineHeight: 1.3, color: gold, marginTop: 20 }}>For one week, Navy Island becomes Zungu.</p>
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_AERIAL_vaapz1.png" quote="An entire island. One week. Everything in rhythm." label="Zungu · Navy Island · Jamaica" />

      {/* ═══ CHAPTER 02: WHAT DOES ZUNGU MEAN? ═══ */}
      <ChapterWrap bg={CHAPTERS['02'].bg} photo="/photos/navy-island-port-antonio.jpeg">
        <ChapterDivider num="02" eye="Chapter Two" title="What Does Zungu Mean?" sub="The name carries history, movement, and meaning." accent={CHAPTERS['02'].accent} chBg={CHAPTERS['02'].bg} rgb={CHAPTERS['02'].rgb} />
        <Section id="meaning" sectionBg={CHAPTERS['02'].bg} accent={CHAPTERS['02'].accent} rgb={CHAPTERS['02'].rgb}>
          <SectionHead label="What Does Zungu Mean?" title="Everything in rhythm." accent={CHAPTERS['02'].accent} />
          <div style={{ maxWidth: 800, marginBottom: 32 }}>
            <BodyText>Zungu (IsiZulu) — to move in a circle. To rotate around a central point. To go around. To keep returning.</BodyText>
            <BodyText>It is the name of a place — Zungu's Cave, KwaZulu-Natal, South Africa — one of humanity's oldest-known inhabited sites. Rock art. Fire. Shelter. Community gathered around a centre. This is where the name begins.</BodyText>
            <BodyText>It becomes the idea of a festival: gathering around a stage, around sound, around an island, around a fire. Movement in circles. The round of a day — sunrise, daylight, sunset, night, pre-dawn, sunrise again.</BodyText>
            {['Everything in rhythm.', 'The crowd.', 'The bass.', 'The island.', 'The night.', 'The culture.', 'The world coming back to Jamaica.'].map((line, i) => (
              <p key={i} style={{ fontFamily: fontDisplay, fontSize: i === 0 ? 'clamp(18px,2.5vw,30px)' : 'clamp(14px,1.8vw,22px)', fontWeight: i === 0 ? 700 : 300, color: i === 0 ? cream : muted, lineHeight: 1.4, margin: '6px 0' }}>{line}</p>
            ))}
          </div>
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${dim}` }}>
            <SectionHead label="The Brand Thesis" title="Jamaica gave the world rhythm." goldLine="Zungu brings it home." accent={CHAPTERS['02'].accent} />
            <BodyText>From sound systems to dub, dancehall, bass culture, jungle, drum and bass, dubstep, and global club music — Jamaica's influence has moved through the world for decades.</BodyText>
            <QuoteBlock quote="A Jamaican-born electronic music destination built for the world." attr="Core Brand Positioning" />
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_FROM_THE_SEA_twhi0w.png" quote="Jamaica gave the world rhythm. Zungu brings it home." label="The Brand · Port Antonio" />

      {/* ═══ CHAPTER 03: THE OPPORTUNITY — investor only ═══ */}
      {visibleSections.includes('opportunity') && (
        <ChapterWrap bg={CHAPTERS['03'].bg} photo="/photos/port-antonio-aerial.jpeg">
          <ChapterDivider num="03" eye="Chapter Three" title="The Opportunity." sub="Why this. Why now. Why Jamaica." accent={CHAPTERS['03'].accent} chBg={CHAPTERS['03'].bg} rgb={CHAPTERS['03'].rgb} />
          <Section id="opportunity" sectionBg={CHAPTERS['03'].bg} accent={CHAPTERS['03'].accent} rgb={CHAPTERS['03'].rgb}>
            <SectionHead label="The Opportunity" title="Jamaica's first globally positioned private-island electronic music destination." accent={CHAPTERS['03'].accent} />
            <BodyText>The opportunity is not simply to create another festival. The opportunity is to establish Jamaica's first globally positioned private-island electronic music destination.</BodyText>
            <BodyText>The world already moves to Jamaican rhythm. Sound-system culture, dub, dancehall, bass pressure, remix culture, MC culture, jungle, drum and bass, dubstep, grime, and global club music all carry Jamaican influence. That influence has travelled across the world. But Jamaica has not yet owned a premium electronic music destination at international scale. Zungu is built around that gap. A private island. A global sound. A Jamaican root. A destination built for the world.</BodyText>
            <QuoteBlock quote="The category is the opportunity." attr="Zungu Investment Thesis" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2, marginBottom: 40 }}>
              {[
                { title: 'CATEGORY GAP', body: 'Jamaica has global music authority, but no flagship electronic music destination festival positioned for the international premium market.' },
                { title: 'LOCATION GAP', body: 'The Caribbean has destination power, but few electronic festivals with a private-island setting, cultural specificity, and a controlled guest experience.' },
                { title: 'AUDIENCE GAP', body: 'Global festival travellers are looking for experiences that feel rare, immersive, beautiful, and discovered before they become obvious.' },
                { title: 'BRAND GAP', body: 'Zungu can become the Jamaican-born electronic festival brand that connects music, island hospitality, media, tourism, and long-term cultural value.' },
              ].map(({ title, body }) => (
                <div key={title} style={{ border: `1px solid rgba(58,175,122,0.2)`, padding: '28px 24px', background: 'rgba(6,20,12,0.6)' }}>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: CHAPTERS['03'].accent, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>{title}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
            <BodyText>Zungu is not trying to be the biggest festival in the world. It is being designed to own a category no one else can claim in the same way: a private-island electronic music festival rooted in Jamaica.</BodyText>
          </Section>
        </ChapterWrap>
      )}

      <PhotoBreak src="/photos/port-antonio-aerial.jpeg" quote="The category is the opportunity." label="The Opportunity · Jamaica" />

      {/* ═══ CHAPTER 04: PORT ANTONIO ═══ */}
      <ChapterWrap bg={CHAPTERS['04'].bg} photo="/photos/port-antonio.jpg">
        <ChapterDivider num="04" eye="Chapter Four" title="Port Antonio." sub="The ecosystem behind the island." accent={CHAPTERS['04'].accent} chBg={CHAPTERS['04'].bg} rgb={CHAPTERS['04'].rgb} />
        <Section id="portantonio" sectionBg={CHAPTERS['04'].bg} accent={CHAPTERS['04'].accent} rgb={CHAPTERS['04'].rgb}>
          <SectionHead label="Port Antonio" title="The ecosystem behind the island." accent={CHAPTERS['04'].accent} />
          <div style={{ maxWidth: 880, marginBottom: 32 }}>
            <BodyText>Zungu is anchored on Navy Island, but Port Antonio powers the experience. The town supplies the ecosystem: boats, drivers, hotels, villas, guest houses, restaurants, bars, guides, vendors, food suppliers, production crew, wellness practitioners, artists, and mainland activations.</BodyText>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px,2.5vw,32px)', fontWeight: 700, color: cream, lineHeight: 1.3, marginBottom: 8 }}>Navy Island is the world.</p>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px,2.5vw,32px)', fontWeight: 700, color: CHAPTERS['04'].accent, lineHeight: 1.3, marginBottom: 24 }}>Port Antonio is the heartbeat behind it.</p>
            <BodyText>This is not charity language. It is business logic. The stronger Port Antonio is inside the model, the more locally defensible Zungu becomes.</BodyText>
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/port-antonio-aerial.jpeg" quote="The ecosystem that makes everything possible." label="Port Antonio · Portland Parish" />

      {/* ═══ CHAPTER 05: THE ISLAND ═══ */}
      <ChapterWrap bg={CHAPTERS['05'].bg} photo="/photos/navy-island-aerial-hq.png">
        <ChapterDivider num="05" eye="Chapter Five" title="The Island." sub="Navy Island. Port Antonio, Jamaica. 64 acres. The site that makes everything possible." accent={CHAPTERS['05'].accent} chBg={CHAPTERS['05'].bg} rgb={CHAPTERS['05'].rgb} />
        <Section id="island" sectionBg={CHAPTERS['05'].bg} accent={CHAPTERS['05'].accent} rgb={CHAPTERS['05'].rgb}>
          <SectionHead label="The Island" title="Navy Island is the scenery." accent={CHAPTERS['05'].accent} />
          <div style={{ maxWidth: 880, marginBottom: 32 }}>
            <BodyText>It is where the world of Zungu comes alive and the magic of the experience begins. For one week, the island becomes the festival.</BodyText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, margin: '32px 0' }}>
              {['The forest becomes movement.', 'The water becomes atmosphere.', 'The stages become landmarks.', 'The night becomes ritual.', 'The island becomes sound.'].map(line => (
                <div key={line} style={{ border: `1px solid rgba(74,143,189,0.1)`, padding: '22px 20px', background: 'rgba(14,18,24,0.8)' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(13px,1.6vw,18px)', fontWeight: 600, color: cream, lineHeight: 1.3, margin: 0 }}>{line}</p>
                </div>
              ))}
            </div>
            <BodyText>Navy Island gives Zungu what no built venue can fake: forest, water, separation, mystery, arrival, scale, and transformation. It creates natural scarcity, controlled access, strong visual identity, and a festival environment that cannot be easily replicated.</BodyText>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(20px,3vw,38px)', fontWeight: 700, lineHeight: 1.3, color: CHAPTERS['05'].accent }}>This is an entire island transformed.</p>
          </div>
        </Section>
        <Section sectionBg={CHAPTERS['05'].bg} accent={CHAPTERS['05'].accent} rgb={CHAPTERS['05'].rgb}>
          <SectionHead label="Marina → Island Crossing" title="The crossing." accent={CHAPTERS['05'].accent} />
          <IslandOverviewMap />
        </Section>
        <Section sectionBg={CHAPTERS['05'].bg} accent={CHAPTERS['05'].accent} rgb={CHAPTERS['05'].rgb}>
          <SectionHead label="Stage Placement · Navy Island" title="Three stages. One island." accent={CHAPTERS['05'].accent} />
          <p style={{ fontFamily: fontMono, fontSize: 14, color: muted, lineHeight: 1.9, maxWidth: 680, marginBottom: 28 }}>Provisional placement across the island's natural terrain. Stages face the sea — not the town. Final positioning subject to site survey.</p>
          <div style={{ marginBottom: 32 }}><StageMap /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 40px', marginBottom: 48 }}>
            {[{ color: gold, name: 'ZUNGU MAIN', sub: 'Centre Island · Mainstage' }, { color: teal, name: 'ORIGINS', sub: 'Sunrise Stage · Earth Sound' }, { color: rust, name: 'REBIRTH', sub: 'Sunset Stage · Underground House' }, { color: dim, name: 'ARRIVAL DOCK', sub: '~5 min from Errol Flynn Marina' }].map(({ color, name, sub: s }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <div>
                  <span style={{ fontFamily: fontMono, fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: color === dim ? muted : cream, display: 'block' }}>{name}</span>
                  <span style={{ fontFamily: fontMono, fontSize: 8, color: muted, letterSpacing: '0.15em' }}>{s}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: 'relative', marginBottom: 4 }}>
            <video autoPlay muted loop playsInline poster="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/island-stages-aerial_zxjfag.png" style={{ width: '100%', display: 'block', filter: 'saturate(0.8) brightness(0.8)' }}>
              <source src="https://res.cloudinary.com/elektricbangaz/video/upload/v1780459541/aerial-view-from-navy-island-to-port-antonio-town-2026-01-21-22-41-54-utc_kbpltd.mp4" type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(6,8,8,0.85) 0%, rgba(6,8,8,0) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span style={{ fontFamily: fontMono, fontSize: 9, color: cream, letterSpacing: '0.2em', textTransform: 'uppercase' }}>NAVY ISLAND — Aerial · Port Antonio to Navy Island</span>
              <span style={{ fontFamily: fontMono, fontSize: 8, color: muted, letterSpacing: '0.15em' }}>Portland Parish · 2026</span>
            </div>
          </div>
          {[
            { src: '/photos/navy-island-aerial-hq.png', label: 'NAVY ISLAND — Aerial View', sub: '64 acres · Port Antonio · Jamaica' },
            { src: '/photos/navy-island-satellite.png', label: 'NAVY ISLAND — Satellite Overview', sub: 'Caribbean · Portland Parish' },
            { src: '/photos/navy-island-port-antonio.jpeg', label: 'NAVY ISLAND — From Port Antonio', sub: '5-min crossing from Errol Flynn Marina' },
          ].map(({ src, label, sub: s }) => (
            <div key={src} style={{ position: 'relative', marginBottom: 4 }}>
              <img src={src} style={{ width: '100%', display: 'block', filter: 'saturate(0.75) brightness(0.9)' }} alt={label} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(6,8,8,0.85) 0%, rgba(6,8,8,0) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontFamily: fontMono, fontSize: 9, color: cream, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
                <span style={{ fontFamily: fontMono, fontSize: 8, color: muted, letterSpacing: '0.15em' }}>{s}</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${dim}` }}>
            <a href={`/stages?role=${safeRole}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, color: gold, textDecoration: 'none', border: `1px solid rgba(200,168,75,0.3)`, padding: '12px 24px' }}>Full Stage Breakdown →</a>
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/navy-island-wide.png" quote="An entire island transformed." label="The Island · Navy Island · Jamaica" />

      {/* ═══ CHAPTER 06: WHY JAMAICA? — investor + press ═══ */}
      {visibleSections.includes('jamaica') && (
        <ChapterWrap bg={CHAPTERS['06'].bg} photo="/photos/port-antonio-aerial.jpeg">
          <ChapterDivider num="06" eye="Chapter Six" title="Why Jamaica?" sub="Because the world already moves to Jamaica." accent={CHAPTERS['06'].accent} chBg={CHAPTERS['06'].bg} rgb={CHAPTERS['06'].rgb} />
          <Section id="jamaica" sectionBg={CHAPTERS['06'].bg} accent={CHAPTERS['06'].accent} rgb={CHAPTERS['06'].rgb}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '6vw' }}>
              <div>
                <SectionHead label="Why Jamaica?" title="The world already moves to Jamaica." accent={CHAPTERS['06'].accent} />
                <BodyText>Jamaican sound-system culture changed how music is played, felt, remixed, performed, and experienced. That influence moved outward — through dancehall, dub, hip-hop, jungle, drum and bass, dubstep, grime, bass culture, and global electronic music.</BodyText>
                <BodyText>Destination electronic music has become a global travel category. Zungu is designed to own a premium private-island electronic music position in the Caribbean, rooted in Jamaican sound and staged in one of the region's most distinctive locations.</BodyText>
                <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px,2vw,24px)', fontWeight: 700, color: CHAPTERS['06'].accent, lineHeight: 1.3 }}>Zungu brings the world back to the source.</p>
              </div>
              <div>
                <SectionHead label="Why Navy Island?" title="An island can become a world." accent={CHAPTERS['06'].accent} />
                <BodyText>Navy Island gives Zungu what no built venue can fake: forest, water, separation, mystery, arrival, scale, and transformation.</BodyText>
                <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px,2vw,24px)', fontWeight: 700, color: CHAPTERS['06'].accent, lineHeight: 1.3 }}>For one week, it is not just Navy Island. It is Zungu.</p>
              </div>
            </div>
          </Section>
        </ChapterWrap>
      )}

      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459512/island-stages-aerial_zxjfag.png" quote="Zungu brings the world back to the source." label="Why Jamaica · Portland Parish" />

      {/* ═══ CHAPTER 07: THE WORLD OF ZUNGU ═══ */}
      <ChapterWrap bg={CHAPTERS['07'].bg} photo="/photos/navy-island-wide.png">
        <ChapterDivider num="07" eye="Chapter Seven" title="The World of Zungu." sub="One island. Seven days. Everything in rhythm." accent={CHAPTERS['07'].accent} chBg={CHAPTERS['07'].bg} rgb={CHAPTERS['07'].rgb} />
        <Section id="world" sectionBg={CHAPTERS['07'].bg} accent={CHAPTERS['07'].accent} rgb={CHAPTERS['07'].rgb}>
          <SectionHead label="The World of Zungu" title="Zungu is not only a lineup. It is a world guests move through." accent={CHAPTERS['07'].accent} />
          <BodyText>For one week, Navy Island becomes Zungu. The island moves from sunrise to day, from day to sunset, from sunset to night, and from night back into rhythm. The stages give Zungu its structure. The programming gives the island life. The pop-ups create discovery. The week creates the destination.</BodyText>
          <div style={{ marginBottom: 48 }}>
            <SectionHead label="Stage Architecture" title="Three stages give Zungu its shape." accent={CHAPTERS['07'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, marginBottom: 24 }}>
              {[
                { name: 'ORIGINS', sub: 'Sunrise Stage · Earth Sound', body: 'East tip of the island. Deep organic electronic, tribal percussion, earth sound. The source stage.' },
                { name: 'REBIRTH', sub: 'Sunset Stage · Underground House', body: 'West point. Tribal house, tech house, hypnotic grooves. The transformation.' },
                { name: 'ZUNGU', sub: 'Centre Island · Mainstage', body: 'Big-room electronic, Afro-house, peak-time moments. The centre of gravity.' },
              ].map(({ name, sub: s, body }) => (
                <div key={name} style={{ border: `1px solid rgba(58,175,122,0.15)`, padding: '28px 24px', background: 'rgba(6,20,12,0.6)' }}>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: CHAPTERS['07'].accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}>{s}</p>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 900, color: CHAPTERS['07'].accent, letterSpacing: '-0.02em', marginBottom: 12, lineHeight: 1 }}>{name}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
            <BodyText>The stages are not just places to perform. They are how the island becomes a world.</BodyText>
            <a href={`/stages?role=${safeRole}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: fontMono, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, color: CHAPTERS['07'].accent, textDecoration: 'none', border: `1px solid rgba(58,175,122,0.3)`, padding: '10px 20px', marginBottom: 40 }}>View Stage Architecture →</a>
          </div>
          <div style={{ marginBottom: 48 }}>
            <SectionHead label="Programming" title="Zungu is not only nighttime music." accent={CHAPTERS['07'].accent} />
            <BodyText>The island moves from sunrise to day. Day to sunset. Sunset to night. Night to pre-dawn. The schedule gives each moment a purpose. The stages take over at night.</BodyText>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {['Market', 'Shoppe', 'Cove', 'Sanctum', 'Yard', 'Studio', 'Trail', 'Pier', 'Signal'].map(z => (
                <span key={z} style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: CHAPTERS['07'].accent, border: `1px solid rgba(58,175,122,0.25)`, padding: '5px 12px' }}>{z}</span>
              ))}
            </div>
            <BodyText>Each zone has a purpose: guest experience, sponsor inventory, local operator participation, dwell time, and revenue beyond the stages. The island is not passive. The island performs.</BodyText>
            <a href={`/activities?role=${safeRole}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: fontMono, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, color: CHAPTERS['07'].accent, textDecoration: 'none', border: `1px solid rgba(58,175,122,0.3)`, padding: '10px 20px', marginBottom: 40 }}>View Activity Programme →</a>
          </div>
          <div>
            <SectionHead label="Festival Week" title="June 17–23, 2027." accent={CHAPTERS['07'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
              {[
                { date: 'JUNE 17', title: 'Arrival', body: 'Boats from Port Antonio begin the crossing. On-island check-in. Welcome programme. Arrival party.' },
                { date: 'JUNE 18–21', title: 'Core Festival Nights', body: 'Four full festival nights. Three stages. Day programming. Zungu Radio. Sunset sessions. Mainstage.' },
                { date: 'JUNE 21–23', title: 'Recovery + Departure', body: 'Slower pace. Day programme continues. Departure transport back to Port Antonio.' },
                { date: 'POST-EVENT', title: 'Platform', body: 'Media library activated. Commissioned music released. Presale opens for Year Two.' },
              ].map(({ date, title, body }) => (
                <div key={date} style={{ border: `1px solid rgba(58,175,122,0.12)`, padding: '24px 20px', background: 'rgba(6,20,12,0.4)' }}>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: CHAPTERS['07'].accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}>{date}</p>
                  <p style={{ fontFamily: fontDisplay, fontSize: '1rem', fontWeight: 700, color: cream, marginBottom: 10, textTransform: 'uppercase' }}>{title}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/boston-bay.jpg" quote="The island is not passive. The island performs." label="The World of Zungu · Navy Island" />

      {/* ═══ CHAPTER 08: SOUND + ARTISTS ═══ */}
      <ChapterWrap bg={CHAPTERS['08'].bg} photo="/photos/pellew-island.jpg">
        <ChapterDivider num="08" eye="Chapter Eight" title="Sound + Artists." sub="Electronic music through a Jamaican lens." accent={CHAPTERS['08'].accent} chBg={CHAPTERS['08'].bg} rgb={CHAPTERS['08'].rgb} />
        <Section id="sound" sectionBg={CHAPTERS['08'].bg} accent={CHAPTERS['08'].accent} rgb={CHAPTERS['08'].rgb}>
          <SectionHead label="The Sound" title="Electronic music through a Jamaican lens." accent={CHAPTERS['08'].accent} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {['Afro-house','Tribal house','Big-room electronic','Tech house','Underground house','Jungle','Drum and bass','Dub-influenced club music','Jamaican electronic','Sunrise sets','Sunset sessions','Mainstage nights'].map(tag => (
              <span key={tag} style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CHAPTERS['08'].accent, border: `1px solid rgba(212,114,42,0.3)`, padding: '7px 14px' }}>{tag}</span>
            ))}
          </div>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px,2.5vw,30px)', fontWeight: 700, color: cream, marginBottom: 8 }}>The sound is global.</p>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px,2.5vw,30px)', fontWeight: 700, color: CHAPTERS['08'].accent }}>The root is Jamaican.</p>
          <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.8, maxWidth: 680, marginTop: 20 }}>Artist booking is in active development. No bookings are confirmed at this stage. The co-curation approach prioritises artists who bring their own creative vision to the programme.</p>
        </Section>
        <Section sectionBg={CHAPTERS['08'].bg} accent={CHAPTERS['08'].accent} rgb={CHAPTERS['08'].rgb}>
          <SectionHead label="Booking Direction" title="Black Coffee. Not a booking. A co-curator." accent={CHAPTERS['08'].accent} />
          <BodyText>Black Coffee runs his own festival — the Black Coffee Weekender in Cape Town, now in its second edition. He curates lineups, commissions collaborations, and has a Grammy for Best Dance/Electronic Album. His Hï Ibiza residency ran 7 consecutive seasons.</BodyText>
          <BodyText>His label Soulistic Music signed Shimza. They perform back-to-back. They opened Hï Ibiza together. The conversation is a peer conversation — not a booking form.</BodyText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: 24 }}>
            {[
              { name: 'Black Coffee', tags: 'Grammy Winner · Soulistic Music · Hï Ibiza · 7 Seasons', bio: "South African DJ, Grammy-winning artist, festival curator. Runs his own event — the Black Coffee Weekender. His Afro-house sound — deep percussion, emotional tension, Afropolitan register — is the exact fit for a Caribbean island at night.", why: 'The co-curation angle: he already curates festivals, has a label relationship with Shimza, and collaborated with Diplo on the Grammy album. This is a peer conversation — not a booking form.', headline: true },
              { name: 'Shimza', tags: 'Soulistic Music · Hï Ibiza · Zamna Tulum', bio: "South African DJ, signed to Black Coffee's Soulistic Music. Performed at the opening of Black Coffee's Hï Ibiza residency. Regular at Zamna Tulum, Ibiza Club Chinois, New York, Tokyo.", why: 'Natural extension of the Black Coffee conversation. The label relationship makes the sequence logical.', headline: true },
              { name: 'Keinemusik', tags: '&ME · Rampa · Adam Port · Global Circuit', bio: 'Currently the single biggest draw in the boutique festival circuit globally. Kloud shows sell out 5,000–10,000 seat venues in New York, Paris, London. Melodic, afro-infused house — exact register for a Caribbean island.', why: 'The FOMO booking. "Keinemusik is playing on a private island in Jamaica" moves in the right rooms immediately.', headline: false },
              { name: 'Diplo', tags: 'Port Antonio Resident · Major Lazer · Grammy Collaborator', bio: 'Permanent residence in Port Antonio, Jamaica. Hosts "Higher Ground" events drawing international fashion and music crowd. Collaborated with Black Coffee on the Grammy-winning album Subconsciously.', why: 'Not a booking. He lives here. The conversation is neighbour to neighbour — which changes the fee, the association, and the story.', headline: false },
            ].map(({ name, tags, bio, why, headline }) => (
              <div key={name} style={{ border: `1px solid ${headline ? 'rgba(212,114,42,0.4)' : 'rgba(212,114,42,0.12)'}`, padding: '36px 32px', background: headline ? 'rgba(212,114,42,0.04)' : 'rgba(24,12,6,0.4)', position: 'relative' }}>
                {headline && <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: fontMono, fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: CHAPTERS['08'].accent, fontWeight: 700, border: `1px solid rgba(212,114,42,0.4)`, padding: '3px 8px' }}>HEADLINE</div>}
                <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 900, color: cream, marginBottom: 6, lineHeight: 1.1 }}>{name}</div>
                <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: CHAPTERS['08'].accent, marginBottom: 16 }}>{tags}</div>
                <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75, marginBottom: 16 }}>{bio}</p>
                <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.7, fontStyle: 'italic', borderTop: `1px solid rgba(212,114,42,0.1)`, paddingTop: 16, marginTop: 16 }}>{why}</p>
              </div>
            ))}
          </div>
        </Section>
      </ChapterWrap>

      <PhotoBreak src="/photos/navy-island-aerial.jpg" quote="The sound is global. The root is Jamaican." label="Sound + Artists · Navy Island" />

      {/* ═══ CHAPTER 09: ACCOMMODATION — investor only ═══ */}
      {visibleSections.includes('accommodation') && (
        <ChapterWrap bg={CHAPTERS['09'].bg} photo="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459516/zungu-glamping-pods_iiwdwk.png">
          <ChapterDivider num="09" eye="Chapter Nine" title="Accommodation + Hospitality." sub="Where do 5,000 people sleep?" accent={CHAPTERS['09'].accent} chBg={CHAPTERS['09'].bg} rgb={CHAPTERS['09'].rgb} />
          <Section id="accommodation" sectionBg={CHAPTERS['09'].bg} accent={CHAPTERS['09'].accent} rgb={CHAPTERS['09'].rgb}>
            <SectionHead label="Accommodation Strategy" title="A layered stay strategy." accent={CHAPTERS['09'].accent} />
            <BodyText>Zungu is not a campsite with a stage on it. The accommodation model is designed around the reality of Port Antonio as an operating base: a small town with a diverse but limited supply of rooms, guesthouses, villas, and boutique hotels.</BodyText>
            <BodyText>The approach is layered: a small on-island premium overnight population, a larger mainland stay base in Port Antonio and surrounding parishes, and a day-pass system for guests staying further away. The majority of the festival audience will be mainland-based and cross by boat for each session.</BodyText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, marginBottom: 40 }}>
              {[
                { stat: '~5,000', label: 'Year One Target Capacity', sub: 'Subject to site and permit confirmation' },
                { stat: '~150–200', label: 'On-Island Overnight', sub: 'Premium glamping only' },
                { stat: '~3,500+', label: 'Mainland Stay', sub: 'Port Antonio + surrounding parishes' },
                { stat: 'TBD', label: 'Day-Pass Allocation', sub: 'Subject to marine logistics' },
              ].map(({ stat, label, sub: s }) => (
                <div key={label} style={{ border: `1px solid rgba(74,143,189,0.15)`, padding: '28px 22px', textAlign: 'center' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 900, color: CHAPTERS['09'].accent, lineHeight: 1, marginBottom: 8 }}>{stat}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 10, color: cream, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: muted }}>{s}</p>
                </div>
              ))}
            </div>
            <SectionHead label="On-Island Categories" title="Four tiers. One island." accent={CHAPTERS['09'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, marginBottom: 40 }}>
              {[
                { name: 'LUXE GLAMPING VILLAGE', body: 'Pre-erected luxury pods — private structures with bedding, power, lighting, and dedicated welfare facilities. Strictly limited.' },
                { name: 'READY CAMP', body: 'Pre-erected standard units. Shared facilities. Lower price point. Designed for guests who want on-island access but not the premium tier.' },
                { name: 'CREW GARDEN', body: 'On-island accommodation for production crew and key staff. Separated from guest zones. Access-controlled.' },
                { name: 'ISLAND CAMP', body: 'For guests arriving by private vessel or who bring own equipment. Very limited. Subject to site capacity and safety review.' },
              ].map(({ name, body }) => (
                <div key={name} style={{ border: `1px solid rgba(74,143,189,0.12)`, padding: '26px 22px', background: 'rgba(6,14,24,0.5)' }}>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: CHAPTERS['09'].accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>{name}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
            <BodyText>The majority of Zungu guests will stay in Port Antonio and surrounding parishes. Hotel blocks, villa coordination, and guesthouse partnerships are part of the festival infrastructure.</BodyText>
            <div style={{ border: `1px solid rgba(74,143,189,0.1)`, padding: '20px 24px', background: 'rgba(6,14,24,0.4)', marginBottom: 24 }}>
              <p style={{ fontFamily: fontMono, fontSize: 10, color: CHAPTERS['09'].accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8 }}>FINANCIAL NOTE</p>
              <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.8 }}>On-island overnight accommodation is a separate revenue line from ticket access. These figures are not double-counted — they represent distinct revenue streams.</p>
            </div>
            <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.8, maxWidth: 480, fontStyle: 'italic' }}>Stay at Zungu — coming soon</p>
          </Section>
        </ChapterWrap>
      )}

      <PhotoBreak src="https://res.cloudinary.com/elektricbangaz/image/upload/v1780459516/zungu-glamping-pods_iiwdwk.png" quote="The island is the destination. The stay is part of it." label="Accommodation · Navy Island" />

      {/* ═══ CHAPTER 10: COMMERCIAL MODEL — investor only ═══ */}
      {visibleSections.includes('commercial') && (
        <ChapterWrap bg={CHAPTERS['10'].bg} photo="/photos/port-antonio-aerial.jpeg">
          <ChapterDivider num="10" eye="Chapter Ten" title="Commercial Model." sub="Multiple revenue lines. Controlled capacity. Premium yield." accent={CHAPTERS['10'].accent} chBg={CHAPTERS['10'].bg} rgb={CHAPTERS['10'].rgb} />
          <Section id="commercial" sectionBg={CHAPTERS['10'].bg} accent={CHAPTERS['10'].accent} rgb={CHAPTERS['10'].rgb}>
            <SectionHead label="Revenue Architecture" title="Not just a ticketed event." accent={CHAPTERS['10'].accent} />
            <BodyText>Zungu is designed as a destination festival economy — not a single ticketed event. The commercial model distributes revenue across access, accommodation, food and beverage, retail, sponsorship, activities, media, and vendor fees.</BodyText>
            <SectionHead label="Access Tiers" title="Four ticket categories." accent={CHAPTERS['10'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, marginBottom: 40 }}>
              {[
                { tier: 'GA', price: 'From US$350', alloc: '~3,200 tickets', rev: '~US$1,120,000', desc: 'General access to all stages, zones, and daytime programme. Marine transport included. No accommodation.' },
                { tier: 'VIP', price: 'From US$650', alloc: '~1,200 tickets', rev: '~US$780,000', desc: 'Dedicated viewing, priority marine, VIP bar, lounge access, and curated programming.' },
                { tier: 'GLAMPING', price: 'From US$1,400 (pkg)', alloc: '~450 packages', rev: '~US$630,000', desc: 'Access + on-island accommodation. Includes ticket, transfer, and on-island stay.' },
                { tier: 'THE THIRTY', price: 'On application', alloc: '30 guests', rev: 'Structured separately', desc: 'Full-week private island residency. Dedicated crew, custom programme, exclusive access. By invitation.' },
              ].map(({ tier, price, alloc, rev, desc }) => (
                <div key={tier} style={{ border: `1px solid rgba(200,168,75,0.15)`, padding: '28px 24px', background: 'rgba(10,8,0,0.5)' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px,3vw,36px)', fontWeight: 900, color: CHAPTERS['10'].accent, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>{tier}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 10, color: cream, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{price}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: muted, marginBottom: 12 }}>{alloc} · {rev}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.8, maxWidth: 680, marginBottom: 40 }}>Indicative gross access revenue: US$5,685,000 at target allocation. Subject to final pricing, capacity confirmation, and presale performance.</p>
            <SectionHead label="Full Revenue Stack" title="Nine categories." accent={CHAPTERS['10'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, marginBottom: 32 }}>
              {[
                { name: 'ACCESS', body: 'GA, VIP, Glamping, The Thirty. Primary revenue line.' },
                { name: 'ACCOMMODATION', body: 'On-island glamping packages. Separate from ticket access.' },
                { name: 'BARS', body: 'Island-wide bar operations. Per-head spend model. ~$150–200 per guest per day.' },
                { name: 'FOOD', body: 'Food village. Jamaican vendor programme. Portland Parish operators.' },
                { name: 'RETAIL', body: 'The Zungu Shoppe. Limited edition merchandise. Artist collabs.' },
                { name: 'ACTIVITIES', body: 'Paid activity bookings: wellness, water tours, guided forest experiences.' },
                { name: 'SPONSORSHIP', body: '3–4 cultural brand partners. Category exclusivity. Integrated into experience.' },
                { name: 'MEDIA + IP', body: 'Zungu Radio licensing. Commissioned recordings. Live content archive.' },
                { name: 'VENDOR + OPERATOR FEES', body: 'Fees from food, retail, and activity operators for access to the island economy.' },
              ].map(({ name, body }) => (
                <div key={name} style={{ border: `1px solid rgba(200,168,75,0.08)`, padding: '22px 18px' }}>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: CHAPTERS['10'].accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>{name}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px,2vw,24px)', fontWeight: 700, color: CHAPTERS['10'].accent, lineHeight: 1.4 }}>The first edition is not only a ticketed event. It is the launch of a destination festival economy.</p>
          </Section>
        </ChapterWrap>
      )}

      <PhotoBreak src="/photos/port-antonio-aerial.jpeg" quote="Multiple revenue lines. Controlled capacity. Premium yield." label="Commercial Model · Zungu" />

      {/* ═══ CHAPTER 11: YEAR ONE FINANCIALS — investor only ═══ */}
      {visibleSections.includes('financial') && (
        <ChapterWrap bg={CHAPTERS['11'].bg} photo="/photos/navy-island-satellite.png">
          <ChapterDivider num="11" eye="Chapter Eleven" title="Year One Financial Model." sub="The base case. The upside. The discipline." accent={CHAPTERS['11'].accent} chBg={CHAPTERS['11'].bg} rgb={CHAPTERS['11'].rgb} />
          <Section id="financial" sectionBg={CHAPTERS['11'].bg} accent={CHAPTERS['11'].accent} rgb={CHAPTERS['11'].rgb}>
            <SectionHead label="Financial Model" title="A credible base case." accent={CHAPTERS['11'].accent} />
            <BodyText>The Year One model is built around a conservative capacity of 5,000 guests, four ticket tiers, and modelled per-head spending. Additional revenue lines — accommodation, sponsorship, media, retail — are modelled but not fully contracted. The access revenue gives the base case. Everything else is upside.</BodyText>
            <div style={{ overflowX: 'auto', marginBottom: 40 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fontMono, fontSize: 12, minWidth: 500, maxWidth: 800 }}>
                <tbody>
                  {[
                    ['GA Access (3,200 × $350)', 'Modelled', '$1,120,000'],
                    ['VIP Access (1,200 × $650)', 'Modelled', '$780,000'],
                    ['Glamping Packages (450 × $1,400)', 'Modelled', '$630,000'],
                    ['The Thirty', 'Structured separately', 'TBD'],
                    ['Bars + Food (per-head spend)', 'Modelled at $175 avg', '$875,000'],
                    ['Accommodation (on-island)', 'Modelled', 'TBD'],
                    ['Sponsorship', '3–4 partners', 'TBD'],
                    ['Media + IP', 'Year 1 catalogue', 'TBD'],
                    ['Retail + Activities', 'Modelled', 'TBD'],
                  ].map(([label, detail, value]) => (
                    <tr key={label} style={{ borderBottom: `1px solid ${dim}` }}>
                      <td style={{ padding: '12px 16px', color: cream }}>{label}</td>
                      <td style={{ padding: '12px 16px', color: muted, fontSize: 10 }}>{detail}</td>
                      <td style={{ padding: '12px 16px', color: value === 'TBD' ? muted : CHAPTERS['11'].accent, fontWeight: 700, textAlign: 'right' }}>{value}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: `1px solid ${CHAPTERS['11'].accent}` }}>
                    <td colSpan={2} style={{ padding: '14px 16px', color: cream, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 10 }}>MODELLED ACCESS REVENUE</td>
                    <td style={{ padding: '14px 16px', color: CHAPTERS['11'].accent, fontWeight: 700, fontSize: 16, textAlign: 'right' }}>~$3,405,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <SectionHead label="Financial Discipline" title="Four non-negotiable gates." accent={CHAPTERS['11'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: 32 }}>
              {[
                { title: 'SEED CAPITAL FLOOR', sub: 'Before ticket sales open', body: 'Artist deposits (40%), infrastructure deposits, insurance and legal. Cannot open ticket sales without this confirmed.' },
                { title: 'PRESALE TRIGGER (70%)', sub: 'Hard go/no-go date', body: 'Full cost commitment does not proceed below 70% presale. Non-negotiable. Protects every party in the structure.' },
                { title: 'ARTIST DEPOSIT CONTROL', sub: 'After insurance is bound only', body: 'Artist contracts activate only after insurance is secured and production contracts are signed. No speculative bookings.' },
                { title: 'CONTINGENCY (15%)', sub: 'Ring-fenced from day one', body: 'Island event risk premium. Built into the model from the start. Not released without production coordinator approval.' },
              ].map(({ title, sub: s, body }) => (
                <div key={title} style={{ border: `1px solid ${dim}`, padding: '34px 30px' }}>
                  <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: CHAPTERS['11'].accent, marginBottom: 6, fontWeight: 700 }}>{title}</div>
                  <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: 14 }}>{s}</div>
                  <p style={{ fontFamily: fontMono, fontSize: 12, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
            <BodyText>The access revenue gives Zungu a credible base case. The additional revenue lines create upside. The discipline gates protect capital.</BodyText>
          </Section>
        </ChapterWrap>
      )}

      <PhotoBreak src="/photos/navy-island-satellite.png" quote="The base case is credible. The upside is the platform." label="Year One Financials · Zungu" />

      {/* ═══ CHAPTER 12: RISK + EXECUTION — investor only ═══ */}
      {visibleSections.includes('risk') && (
        <ChapterWrap bg={CHAPTERS['12'].bg} photo="/photos/navy-island-aerial.jpg">
          <ChapterDivider num="12" eye="Chapter Twelve" title="Risk + Execution." sub="Ambitious, but not naive." accent={CHAPTERS['12'].accent} chBg={CHAPTERS['12'].bg} rgb={CHAPTERS['12'].rgb} />
          <Section id="risk" sectionBg={CHAPTERS['12'].bg} accent={CHAPTERS['12'].accent} rgb={CHAPTERS['12'].rgb}>
            <SectionHead label="Risk Profile" title="Known risks. Planned mitigations." accent={CHAPTERS['12'].accent} />
            <BodyText>A private-island festival carries a different risk profile to a mainland event. Marine dependency, weather exposure, power isolation, and restricted emergency access are structural challenges that require pre-planned, contracted mitigations — not reactive improvisation.</BodyText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, marginBottom: 40 }}>
              {[
                { area: 'MARINE LOGISTICS', risk: 'Sea conditions, boat capacity, load-in delays.', mit: 'Multiple vessel contracts, tidal scheduling, contingency barge plan, 48hr advance load-in protocol.' },
                { area: 'WEATHER', risk: 'Tropical weather, lightning, wind, June squalls.', mit: 'Dedicated meteorological monitoring. Covered infrastructure for key zones. Evacuation protocol contracted.' },
                { area: 'MEDICAL + SAFETY', risk: 'Remote island medical access.', mit: 'On-island field medical team. Helicopter landing zone. Pre-positioned equipment. Hospital transfer agreement.' },
                { area: 'SECURITY', risk: 'Controlled island access, crowd movement, overnight safety.', mit: 'Marine perimeter. Zoned access control. Contracted security firm with island event experience.' },
                { area: 'POWER', risk: 'No mains grid on Navy Island.', mit: 'Generator fleet. Redundant circuits. Fuel storage and resupply contracted. Noise-managed placement.' },
                { area: 'WATER + SANITATION', risk: 'No permanent infrastructure.', mit: 'Tankered water supply. Temporary sanitation units. Waste removal contracted. Environmental compliance audited.' },
                { area: 'ENVIRONMENTAL', risk: 'Site of ecological significance.', mit: 'Leave-no-trace operating rules. Environmental impact assessment prior to permit. Full site restoration contracted.' },
                { area: 'PRODUCTION', risk: 'Complex multi-vendor island build.', mit: 'Single production coordinator with island or remote-venue experience. Phased build schedule. Daily progress gates.' },
                { area: 'FINANCIAL', risk: 'Capital deployment before ticket sales open.', mit: 'Seed capital floor, 70% presale trigger, 15% contingency. Artist deposits after insurance only.' },
              ].map(({ area, risk, mit }) => (
                <div key={area} style={{ border: `1px solid rgba(58,175,122,0.12)`, padding: '24px 20px', background: 'rgba(4,20,12,0.5)' }}>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: CHAPTERS['12'].accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>{area}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.7, marginBottom: 8 }}><strong style={{ color: cream }}>Risk:</strong> {risk}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.7 }}><strong style={{ color: CHAPTERS['12'].accent }}>Mitigation:</strong> {mit}</p>
                </div>
              ))}
            </div>
            <BodyText>Nothing moves without the preceding gate being cleared. Site before permit. Permit before capital. Capital before artist contracts. Artist contracts before ticket sales. No gate is jumped for speed or optics.</BodyText>
          </Section>
        </ChapterWrap>
      )}

      <PhotoBreak src="/photos/navy-island-aerial.jpg" quote="Ambitious, but not naive." label="Risk + Execution · Zungu" />

      {/* ═══ CHAPTER 13: ROADMAP — investor only ═══ */}
      {visibleSections.includes('roadmap') && (
        <ChapterWrap bg={CHAPTERS['13'].bg} photo="/photos/port-antonio.jpg">
          <ChapterDivider num="13" eye="Chapter Thirteen" title="Roadmap + Platform Value." sub="Year One is the proof. The platform is the opportunity." accent={CHAPTERS['13'].accent} chBg={CHAPTERS['13'].bg} rgb={CHAPTERS['13'].rgb} />
          <Section id="roadmap" sectionBg={CHAPTERS['13'].bg} accent={CHAPTERS['13'].accent} rgb={CHAPTERS['13'].rgb}>
            <SectionHead label="Timeline" title="2025–2028." accent={CHAPTERS['13'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, marginBottom: 48 }}>
              {[
                { year: '2025', label: 'SEED', items: ['Site agreement', 'Investment secured', 'Production partner identified', 'Permit process initiated', 'Founding team in place'] },
                { year: '2026', label: 'BUILD', items: ['Permits confirmed', 'Artist conversations formalised', 'Sponsorship approach', 'Ticket infrastructure', 'Production build planning'] },
                { year: '2027', label: 'LAUNCH', items: ['Presale opens', 'Artist programme announced', 'Festival executes June 17–23', 'Media + IP activated', 'Year 2 presale opens'] },
                { year: '2028', label: 'EXPANSION', items: ['Year Two with founding story', 'Sponsorship renewals', 'Accommodation growth', 'Regional expansion explored', 'Brand licensing assessed'] },
              ].map(({ year, label, items }) => (
                <div key={year} style={{ border: `1px solid rgba(212,114,42,0.15)`, padding: '28px 22px', background: 'rgba(20,8,4,0.5)' }}>
                  <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: CHAPTERS['13'].accent, lineHeight: 1, marginBottom: 4 }}>{year}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: CHAPTERS['13'].accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{label}</p>
                  {items.map(item => <p key={item} style={{ fontFamily: fontMono, fontSize: 11, color: muted, lineHeight: 1.6, marginBottom: 4 }}>— {item}</p>)}
                </div>
              ))}
            </div>
            <SectionHead label="Platform Value" title="Year One creates the founding story." accent={CHAPTERS['13'].accent} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, marginBottom: 32 }}>
              {['REPEAT AUDIENCE', 'SPONSORSHIP RENEWALS', 'MEDIA LIBRARY', 'COMMISSIONED MUSIC', 'TRAVEL PACKAGES', 'MERCHANDISE + RETAIL', 'REGIONAL EXPANSION'].map(item => (
                <div key={item} style={{ border: `1px solid rgba(212,114,42,0.08)`, padding: '18px 16px' }}>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: CHAPTERS['13'].accent, letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(16px,2vw,24px)', fontWeight: 700, color: CHAPTERS['13'].accent, lineHeight: 1.4 }}>Year One creates the founding story. The platform grows from there.</p>
          </Section>
        </ChapterWrap>
      )}

      <PhotoBreak src="/photos/port-antonio.jpg" quote="Year One creates the founding story." label="Roadmap + Platform · Zungu" />

      {/* ═══ CHAPTER 14: THE ASK — investor only ═══ */}
      {visibleSections.includes('investor') && (
        <ChapterWrap bg={CHAPTERS['14'].bg} photo="/photos/navy-island-satellite.png">
          <ChapterDivider num="14" eye="Chapter Fourteen" title="The Ask." sub="Aligned partners. Long-term value. The right next step." accent={CHAPTERS['14'].accent} chBg={CHAPTERS['14'].bg} rgb={CHAPTERS['14'].rgb} />
          <Section id="investor" sectionBg={CHAPTERS['14'].bg} accent={CHAPTERS['14'].accent} rgb={CHAPTERS['14'].rgb}>
            <SectionHead label="Investor Positioning" title="Not pitching a dream." accent={CHAPTERS['14'].accent} />
            <BodyText>We are not pitching a dream. We are presenting a staged, gated, operationally disciplined plan for the first globally positioned private-island electronic music festival in Jamaica. The risk is real. The mitigation is specific. The opportunity is a category with no incumbent.</BodyText>
            <BodyText>We are talking to a small number of partners who fit: investors who understand event and tourism IP, production partners who have built in complex environments, strategic partners who see the cultural and brand value, and press who can tell the founding story with precision.</BodyText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, marginBottom: 40 }}>
              {[
                { track: 'INVESTORS', body: 'Seed capital for the development phase. Return structure discussed based on investment size and timing. Equity, debt, or hybrid. The conversation begins with a briefing.' },
                { track: 'PRODUCTION PARTNERS', body: 'One production coordinator with island or remote-venue experience. The role is not a tender. It is a partnership. We want your technical input in the planning phase, not just the build.' },
                { track: 'STRATEGIC PARTNERS', body: '3–4 cultural brand partners. Category exclusivity. Integration into the guest experience — not logo placement. The brief is available on request.' },
                { track: 'PRESS', body: 'A small number of media contacts will receive approved materials before the public announcement. The founding story is the one that matters.' },
                { track: 'LOCAL + GOVERNMENT', body: 'Portland Parish operators, Jamaican creative businesses, and government partners are part of the model from the start — not afterthoughts.' },
              ].map(({ track, body }) => (
                <div key={track} style={{ border: `1px solid rgba(74,143,189,0.15)`, padding: '28px 24px', background: 'rgba(4,10,20,0.5)' }}>
                  <p style={{ fontFamily: fontMono, fontSize: 9, color: CHAPTERS['14'].accent, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>{track}</p>
                  <p style={{ fontFamily: fontMono, fontSize: 13, color: muted, lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
            <QuoteBlock quote="The festival that executes flawlessly at 5,000 people on a private island in June 2027 has something no amount of money can buy in Year 3: a founding story. You can't retro-fit that. You're either in the room when it starts, or you're not." attr="Investment Thesis · Year 1" />
            <div style={{ marginTop: 32 }}>
              <button onClick={openBriefing} style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, padding: '16px 36px', background: 'none', color: CHAPTERS['14'].accent, border: `1px solid rgba(74,143,189,0.4)`, cursor: 'pointer' }}>Request Briefing →</button>
            </div>
          </Section>
        </ChapterWrap>
      )}

      {/* ═══ CTA ═══ */}
      <ChapterWrap bg={CHAPTERS['cta'].bg} photo="/photos/aerial-island.jpg">
        <section id="section-cta" style={{ position: 'relative', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 8vw' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 55% at 50% 50%, rgba(${CHAPTERS['cta'].rgb},.1) 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: fontMono, fontSize: 8, letterSpacing: '0.55em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: gold }} />
              Access by invitation only
              <span style={{ display: 'inline-block', width: 24, height: 1, background: gold }} />
            </p>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(2.8rem,8vw,6rem)', fontWeight: 900, letterSpacing: '-0.04em', color: cream, lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '0.2rem' }}>REQUEST</h2>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(2.8rem,8vw,6rem)', fontWeight: 900, letterSpacing: '-0.04em', color: gold, lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '2rem' }}>BRIEFING</h2>
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
