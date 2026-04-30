'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const bg = '#060808';
const gold = '#C8A84B';
const cream = '#F2EBD9';
const muted = 'rgba(242,235,217,0.45)';
const dim = 'rgba(242,235,217,0.18)';
const rust = '#C45A2A';
const teal = '#4AAFA0';
const green = '#0D1F14';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

type PhotoBreakProps = {
  src: string;
  position?: string;
  height?: string;
  label: string;
  title: string;
  accent: string;
  align?: 'left' | 'center' | 'right';
  overlayDir?: 'left' | 'bottom';
};

function PhotoBreak({ src, position = 'center 50%', height = '62vh', label, title, accent, align = 'left', overlayDir = 'left' }: PhotoBreakProps) {
  const overlay =
    overlayDir === 'bottom'
      ? 'linear-gradient(to top, rgba(6,8,8,0.95) 0%, rgba(6,8,8,0.4) 60%, rgba(6,8,8,0.2) 100%)'
      : 'linear-gradient(105deg, rgba(6,8,8,0.82) 0%, rgba(6,8,8,0.35) 60%, rgba(6,8,8,0.5) 100%)';
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${src}')`, backgroundSize: 'cover', backgroundPosition: position, backgroundAttachment: 'fixed' }} />
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end', justifyContent: overlayDir === 'bottom' ? 'flex-end' : 'center', padding: overlayDir === 'bottom' ? '0 max(3rem,8vw) 3.5rem' : '0 max(3rem,8vw)', textAlign: align === 'center' ? 'center' : 'left' }}>
        <motion.p {...inView()} style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: '1.25rem', fontFamily: "'Space Mono', monospace" }}>{label}</motion.p>
        <motion.p {...inView(0.15)} style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(2rem,5.5vw,4rem)', fontWeight: 900, lineHeight: 1.05, color: cream, textTransform: 'uppercase', letterSpacing: '-0.03em', maxWidth: 560 }}>
          {title} <em style={{ fontStyle: 'normal', color: gold }}>{accent}</em>
        </motion.p>
      </div>
    </div>
  );
}

function SLabel({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <motion.p {...inView(delay)} style={{ fontSize: 9, letterSpacing: '0.6em', color: gold, textTransform: 'uppercase', marginBottom: 36, display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'Space Mono', monospace" }}>
      <span style={{ width: 26, height: 1, background: gold, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </motion.p>
  );
}

const stages = [
  { color: gold, name: 'ZUNGU MAIN', sub: 'Stage II · Headline', loc: 'South face', hours: '7pm–6am', desc: 'Full production headline sets. The main stage. The centrepiece of the island.' },
  { color: teal, name: 'ORIGINS', sub: 'Stage I · Heritage', loc: 'East tip', hours: '6am–10am', desc: 'Heritage to electronic. Jamaican roots, dub, jungle. The breakfast stage.' },
  { color: rust, name: 'REBIRTH', sub: 'Stage III · Future', loc: 'West end', hours: '4pm–8pm', desc: 'Sunset house and golden hour. Future sounds facing the open sea.' },
];

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    if (isLoaded && isSignedIn) router.push('/deck');
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: bg, color: cream, fontFamily: "'Space Mono', monospace", overflowX: 'hidden' }}>

      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: 2, background: gold, width: `${scrollPct}%`, zIndex: 2000, transition: 'width 0.1s linear', pointerEvents: 'none' }} />

      {/* Nav */}
      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 52, zIndex: 1000, background: 'rgba(6,8,8,0.93)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(200,168,75,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6vw' }}>
        <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 16, fontWeight: 900, letterSpacing: '-0.03em', color: cream }}>ZUNGU</div>
        <div style={{ display: 'flex' }}>
          {[['Island', '#s-island'], ['Stages', '#s-stages'], ['Access', '#s-access']].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 8, letterSpacing: '0.4em', color: muted, textTransform: 'uppercase', padding: '0 14px', height: 52, display: 'flex', alignItems: 'center', borderLeft: '1px solid rgba(200,168,75,0.07)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = muted; }}
            >{label}</a>
          ))}
        </div>
        <a href="/sign-in" style={{ fontSize: 9, letterSpacing: '0.25em', padding: '6px 14px', border: `1px solid rgba(200,168,75,0.3)`, color: gold, textDecoration: 'none', textTransform: 'uppercase', fontWeight: 700, transition: 'all 0.2s' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = gold; el.style.color = bg; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = gold; }}>Access</a>
      </motion.nav>

      {/* ── HERO ── */}
      <section style={{ height: '100vh', minHeight: 600, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 0 100px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/photos/navy-island-aerial.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 55%', filter: 'saturate(0.7) brightness(0.45)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${bg} 0%, rgba(6,8,8,0.75) 25%, rgba(6,8,8,0.1) 55%, rgba(6,8,8,0.4) 100%), linear-gradient(to right, rgba(6,8,8,0.7) 0%, transparent 55%)` }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 8vw' }}>
          <motion.p {...fadeUp(0.3)} style={{ fontSize: 9, letterSpacing: '0.6em', color: gold, textTransform: 'uppercase', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 28, height: 1, background: gold, display: 'inline-block', flexShrink: 0 }} />
            ZUNGU 2027 · NAVY ISLAND · JUNE 17–23
          </motion.p>
          <motion.h1 {...fadeUp(0.55)} style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(58px,11.5vw,155px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.03em', color: '#F7F3EC' }}>
            PATIENT<br /><em style={{ color: gold, fontStyle: 'normal' }}>CAPITAL</em>
          </motion.h1>
          <motion.span {...fadeUp(0.8)} style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(16px,2.5vw,36px)', fontWeight: 300, color: 'rgba(247,243,236,0.28)', letterSpacing: '0.3em', marginTop: 8, display: 'block' }}>MMXXVII</motion.span>
          <motion.p {...fadeUp(0.95)} style={{ fontSize: 13, lineHeight: 1.8, color: muted, maxWidth: 420, marginTop: 24 }}>
            A <span style={{ color: gold }}>greenfield destination</span> on a private island. <span style={{ color: gold }}>5,000 tickets.</span> Hard cap.
          </motion.p>
          <motion.div {...fadeUp(1.1)} style={{ display: 'flex', gap: 12, marginTop: 44, flexWrap: 'wrap' }}>
            <a href="/sign-in" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', background: gold, color: bg, fontWeight: 700, textDecoration: 'none', transition: 'filter 0.22s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = ''; }}>Investor Access</a>
            <a href="/sign-in?role=partner" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', background: 'transparent', color: gold, border: '1px solid rgba(200,168,75,0.4)', fontWeight: 700, textDecoration: 'none', transition: 'all 0.22s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = gold; el.style.color = bg; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = gold; }}>Partner Portal</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '20px 8vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,168,75,0.08)', flexWrap: 'wrap', gap: '0.5rem' }}>
          {([['52', 'Artists'], ['7', 'Days'], ['500', 'Guests'], ['3', 'Stages']] as [string, string][]).map(([num, label], i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: i > 0 ? '2rem' : 0, flex: 1 }}>
              {i > 0 && <div style={{ width: 1, height: 32, background: 'rgba(200,168,75,0.1)', flexShrink: 0 }} />}
              <div>
                <div style={{ fontFamily: "'Unbounded',sans-serif", fontSize: 'clamp(14px,2vw,24px)', fontWeight: 700, color: gold }}>{num}</div>
                <div style={{ fontSize: 8, letterSpacing: '0.25em', color: dim, textTransform: 'uppercase', marginTop: 3 }}>{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Photo break 1 */}
      <PhotoBreak src="/photos/navy-island-port-antonio.jpeg" position="center 55%" height="62vh" label="Navy Island · Port Antonio · Jamaica" title="You arrive" accent="over water." />

      {/* ── ISLAND ── */}
      <section id="s-island" style={{ padding: '88px 8vw', borderBottom: '1px solid rgba(200,168,75,0.07)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/photos/aerial-island.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.04, pointerEvents: 'none' }} />
        <SLabel>01 — Navy Island · Portland Parish</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <div>
            <motion.h2 {...inView()} style={{ fontFamily: "'Unbounded',sans-serif", fontSize: 'clamp(24px,4vw,54px)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.025em', marginBottom: 28 }}>
              A private island.<br /><span style={{ color: gold }}>Seven days.</span>
            </motion.h2>
            <motion.p {...inView(0.1)} style={{ fontSize: 13, lineHeight: 1.9, color: muted, maxWidth: 520, marginBottom: 18 }}>
              Navy Island sits 200 metres off the coast of Port Antonio in Portland Parish, Jamaica. Accessible only by boat. Uninhabited outside of festival week. Sixty-four acres of rainforest, beach, and open water facing the Caribbean Sea.
            </motion.p>
            <motion.p {...inView(0.2)} style={{ fontSize: 13, lineHeight: 1.9, color: muted, maxWidth: 520 }}>
              There is no comparable site in the Caribbean. <em style={{ color: cream, fontStyle: 'normal' }}>There is no comparable festival anywhere.</em>
            </motion.p>
          </div>
          <div>
            <motion.div {...inView()} style={{ display: 'flex', border: '1px solid rgba(200,168,75,0.12)', marginBottom: 24 }}>
              {([['64 ac', 'Island area'], ['~5 min', 'Boat crossing'], ['0', 'Comparable sites']] as [string, string][]).map(([num, label], i) => (
                <div key={label} style={{ flex: 1, padding: '28px 22px', borderRight: i < 2 ? '1px solid rgba(200,168,75,0.08)' : 'none', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Unbounded',sans-serif", fontSize: 'clamp(18px,2.5vw,32px)', fontWeight: 700, color: gold, lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 8, letterSpacing: '0.25em', color: dim, textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </motion.div>
            <motion.img {...inView(0.1)} src="/photos/NAVY%20ISLAND%20STAGE%20AND%20PATHWAY%20MAP.png" alt="Navy Island stage map" style={{ width: '100%', maxHeight: 340, objectFit: 'cover', display: 'block' }} />
            <motion.img {...inView(0.2)} src="/photos/REFERENCE%20FOR%20MAP%20-%20CROSSING%20.png" alt="Crossing reference" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', display: 'block', marginTop: 2 }} />
          </div>
        </div>
      </section>

      {/* Photo break 2 */}
      <PhotoBreak src="/photos/port-antonio.jpg" position="center 48%" height="58vh" label="Portland Parish · Jamaica" title="The most beautiful" accent="town in Jamaica." align="center" overlayDir="bottom" />

      {/* ── STAGES ── */}
      <section id="s-stages" style={{ padding: '88px 8vw', background: green, borderBottom: '1px solid rgba(200,168,75,0.07)' }}>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <SLabel>02 — The Programme</SLabel>
            <motion.h2 {...inView()} style={{ fontFamily: "'Unbounded',sans-serif", fontSize: 'clamp(24px,4vw,54px)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.025em', marginBottom: 28 }}>
              Three stages.<br /><span style={{ color: gold }}>One island.</span>
            </motion.h2>
            <motion.p {...inView(0.1)} style={{ fontSize: 13, lineHeight: 1.9, color: muted, maxWidth: 520 }}>
              Provisional placement across natural terrain. Stages face the sea — not the town. Final positioning subject to site survey.
            </motion.p>
          </div>
          <motion.img {...inView()} src="/photos/origins-stage.jpg" alt="Origins Stage" style={{ width: 'min(320px,40%)', maxHeight: 260, objectFit: 'cover', flexShrink: 0 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
          {stages.map((s, i) => (
            <motion.div key={s.name} {...inView(i * 0.1)} style={{ padding: '34px 30px', border: '1px solid rgba(200,168,75,0.1)', borderLeft: `3px solid ${s.color}`, background: 'rgba(13,31,20,0.5)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, marginBottom: 16 }} />
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontSize: 14, fontWeight: 700, color: gold, letterSpacing: '0.03em', marginBottom: 6 }}>{s.name}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.3em', color: muted, textTransform: 'uppercase', marginBottom: 16 }}>{s.sub}</div>
              <div style={{ fontSize: 11, color: dim, marginBottom: 4 }}>{s.loc}</div>
              <div style={{ fontSize: 11, color: gold, marginBottom: 16 }}>{s.hours}</div>
              <p style={{ fontSize: 12, lineHeight: 1.8, color: muted }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Photo break 3 */}
      <PhotoBreak src="/photos/NAVY%20ISLAND%20FROM%20THE%20SEA%20.png" position="center 50%" height="60vh" label="Navy Island · Caribbean Sea" title="The island." accent="From the water." />

      {/* Photo break 4 */}
      <PhotoBreak src="/photos/NAVY%20ISLAND%20WIDE%20.png" position="center 42%" height="52vh" label="Navy Island · Portland Parish" title="Sound travels" accent="out to sea." align="right" />

      {/* ── ACCESS ── */}
      <section id="s-access" style={{ padding: '88px 8vw', borderBottom: '1px solid rgba(200,168,75,0.07)' }}>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <SLabel>Credential Access</SLabel>
            <motion.h2 {...inView()} style={{ fontFamily: "'Unbounded',sans-serif", fontSize: 'clamp(24px,4vw,54px)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.025em', marginBottom: 28 }}>
              5,000 tickets.<br /><span style={{ color: gold }}>Hard cap.</span>
            </motion.h2>
            <motion.div {...inView(0.1)} style={{ display: 'flex', border: '1px solid rgba(200,168,75,0.12)', marginBottom: 32, flexWrap: 'wrap' }}>
              {([['3,200', 'General Admission'], ['1,200', 'Premium Access'], ['600', 'On-Island Immersion']] as [string, string][]).map(([num, label], i) => (
                <div key={label} style={{ flex: 1, minWidth: 120, padding: '24px 20px', borderRight: i < 2 ? '1px solid rgba(200,168,75,0.08)' : 'none', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Unbounded',sans-serif", fontSize: 'clamp(18px,2.5vw,30px)', fontWeight: 700, color: gold, lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 8, letterSpacing: '0.25em', color: dim, textTransform: 'uppercase', marginTop: 6, lineHeight: 1.5 }}>{label}</div>
                </div>
              ))}
            </motion.div>
            <motion.div {...inView(0.15)} style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
              <a href="/sign-in" style={{ display: 'inline-flex', padding: '14px 28px', fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', background: gold, color: bg, fontWeight: 700, textDecoration: 'none' }}>Investor Access</a>
              <a href="/sign-in?role=partner" style={{ display: 'inline-flex', padding: '14px 28px', fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', background: 'transparent', color: gold, border: '1px solid rgba(200,168,75,0.4)', fontWeight: 700, textDecoration: 'none' }}>Partner Portal</a>
            </motion.div>
            <p style={{ fontSize: 10, color: dim, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Access by invitation only ·{' '}
              <a href="mailto:partnership@zungufestival.com" style={{ color: gold, textDecoration: 'none' }}>partnership@zungufestival.com</a>
            </p>
          </div>
          <motion.img {...inView(0.2)} src="/photos/NAVY%20ISLAND%20CLOSE%20UP%20.png" alt="Navy Island close up" style={{ width: 'min(340px,42%)', maxHeight: 420, objectFit: 'cover', flexShrink: 0 }} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 8vw', textAlign: 'center', background: bg }}>
        <div style={{ fontFamily: "'Unbounded',sans-serif", fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: cream, marginBottom: '0.5rem' }}>ZUNGU</div>
        <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: dim, marginBottom: '1.25rem' }}>PORT ANTONIO · JAMAICA · MMXXVII</p>
        <p style={{ fontSize: 11, color: dim, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          <a href="mailto:partnership@zungufestival.com" style={{ color: gold, textDecoration: 'none' }}>partnership@zungufestival.com</a>
        </p>
      </footer>
    </div>
  );
}
