'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

const GOLD = '#C8A84B';
const BLACK = '#060808';
const CREAM = '#F7F3EC';
const BORDER = 'rgba(200,168,75,0.18)';
const MUTED = 'rgba(242,235,217,0.45)';

const TIERS = [
  {
    label: 'GA',
    name: 'General Admission',
    count: '3,200 tickets',
    price: '$400',
    priceNote: 'avg · 4-night wristband',
    desc: 'Full island access. All three stages. Every activity zone. The complete Zungu experience.',
    items: ['All-stage access', 'Activity zones', 'Island transport', '18+ only'],
    accent: GOLD,
  },
  {
    label: 'VIP',
    name: 'VIP',
    count: '1,200 tickets',
    price: '$800',
    priceNote: 'avg · 4-night wristband',
    desc: 'Elevated viewing positions, dedicated bars, and priority entry to all three stages.',
    items: ['Dedicated VIP areas', 'Priority stage access', 'Private bars', 'Lounge seating'],
    accent: GOLD,
    topAccent: true,
  },
  {
    label: 'GLAMPING',
    name: 'Glamping',
    count: '600 tickets',
    price: '$1,500',
    priceNote: 'avg · full-stay package',
    desc: 'On-island accommodation. Wake up inside the festival. The most immersive Zungu experience available.',
    items: ['On-island lodging', 'VIP access included', 'Dedicated concierge', 'Limited availability'],
    accent: GOLD,
  },
];

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/deck');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let rafId: number;
    let lastTime: number | null = null;

    function step(now: number) {
      if (lastTime === null) lastTime = now;
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      if (video!.duration) {
        video!.currentTime = video!.currentTime - delta;
        if (video!.currentTime <= 0) video!.currentTime = video!.duration;
      }
      rafId = requestAnimationFrame(step);
    }

    function startLoop() {
      video!.pause();
      lastTime = null;
      rafId = requestAnimationFrame(step);
    }

    if (video.readyState >= 1 && video.duration) {
      video.currentTime = video.duration;
      startLoop();
    } else {
      video.addEventListener('loadedmetadata', () => {
        video!.currentTime = video!.duration;
        startLoop();
      }, { once: true });
    }

    return () => cancelAnimationFrame(rafId);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/partner-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, details: 'Ticket waitlist registration' }),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  function openModal() {
    setForm({ name: '', email: '' });
    setStatus('idle');
    setModal(true);
  }

  return (
    <div style={{ backgroundColor: BLACK, fontFamily: "'Space Mono', monospace" }}>

      {/* ── Hero ── */}
      <div
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        <video
          ref={videoRef}
          src="/photos/aerial-view-from-navy-island-to-port-antonio-town-2026-01-21-22-41-54-utc.mp4"
          muted
          playsInline
          preload="auto"
          poster="/photos/navy-island-aerial-hq.png"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 42%',
            filter: 'saturate(0.8) brightness(0.48)',
            opacity: 0.9,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(6,8,8,1) 0%, rgba(6,8,8,0.7) 35%, rgba(6,8,8,0.15) 65%, rgba(6,8,8,0.3) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(200,168,75,0.06) 0%, transparent 65%)' }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <p
            className="flex items-center gap-3 mb-10 font-bold uppercase"
            style={{ fontSize: 9, letterSpacing: '0.4em', color: GOLD }}
          >
            <span style={{ display: 'inline-block', width: 28, height: 1, background: GOLD }} />
            Navy Island &nbsp;·&nbsp; Port Antonio &nbsp;·&nbsp; Jamaica &nbsp;·&nbsp; June 17–23, 2027
            <span style={{ display: 'inline-block', width: 28, height: 1, background: GOLD }} />
          </p>

          <div className="flex flex-col items-center mb-2">
            <img
              src="/zungu-z-mark.png"
              alt="Zungu"
              style={{ width: 'min(96px,18vw)', height: 'auto', marginBottom: 28, filter: 'drop-shadow(0 0 32px rgba(200,168,75,0.45))' }}
            />
            <h1
              className="font-black uppercase leading-none tracking-tighter"
              style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(4rem, 12vw, 9rem)', color: CREAM, letterSpacing: '-0.03em' }}
            >
              ZUNGU
            </h1>
            <h2
              className="font-black uppercase leading-none tracking-tighter"
              style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(4rem, 12vw, 9rem)', color: GOLD, letterSpacing: '-0.03em' }}
            >
              FESTIVAL
            </h2>
          </div>
          <p
            className="font-light uppercase tracking-[0.35em] mb-10"
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', color: 'rgba(247,243,236,0.55)' }}
          >
            MMXXVII
          </p>

          <div style={{ width: 60, height: 1, background: GOLD, marginBottom: 28 }} />

          <p
            className="font-bold italic uppercase mb-12"
            style={{ fontSize: 13, letterSpacing: '0.25em', color: 'rgba(242,235,217,0.42)', marginBottom: '3.5rem' }}
          >
            An Electronic Music Oasis
          </p>

          <div className="flex gap-6 flex-wrap justify-center">
            <button
              onClick={openModal}
              className="font-bold uppercase transition-all duration-200"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.4em', padding: '14px 28px', border: `1px solid rgba(200,168,75,0.5)`, color: GOLD, background: 'transparent', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(200,168,75,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.5)'; }}
            >
              Join Waitlist
            </button>
            <a
              href="/sign-in"
              className="font-bold uppercase transition-all duration-200"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.4em', padding: '14px 28px', backgroundColor: GOLD, color: BLACK, textDecoration: 'none', display: 'inline-block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#dab84e'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = GOLD; }}
            >
              Sign In →
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2" style={{ color: MUTED, fontSize: 8, letterSpacing: '0.3em' }}>
          <span style={{ textTransform: 'uppercase' }}>Tickets</span>
          <span style={{ fontSize: 16, lineHeight: 1 }}>↓</span>
        </div>
      </div>

      {/* ── Ticket Tiers ── */}
      <section style={{ padding: '96px 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontSize: 8, letterSpacing: '0.45em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
            Tickets · June 17–23, 2027
          </p>
          <h2
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: CREAM, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}
          >
            5,000 tickets.<br />
            <span style={{ color: GOLD }}>One island. Hard cap.</span>
          </h2>
          <p style={{ fontSize: 12, color: MUTED, letterSpacing: '0.06em', lineHeight: 1.9, maxWidth: 560, marginBottom: 64 }}>
            Three tiers. One wristband. The island distributes 5,000 people across three stages and eight activity zones — no stage is ever crushingly full.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
            {TIERS.map((tier) => (
              <div
                key={tier.label}
                style={{
                  backgroundColor: '#0a0e0e',
                  border: `1px solid ${BORDER}`,
                  borderTop: tier.topAccent ? `3px solid ${GOLD}` : `1px solid ${BORDER}`,
                  padding: '36px 32px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div>
                    <p style={{ fontSize: 8, letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>{tier.label}</p>
                    <p style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 15, color: CREAM, fontWeight: 700, letterSpacing: '-0.01em' }}>{tier.name}</p>
                    <p style={{ fontSize: 10, color: MUTED, letterSpacing: '0.1em', marginTop: 4 }}>{tier.count}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 22, color: GOLD, fontWeight: 900 }}>{tier.price}</p>
                    <p style={{ fontSize: 9, color: MUTED, letterSpacing: '0.08em', marginTop: 4 }}>{tier.priceNote}</p>
                  </div>
                </div>

                <p style={{ fontSize: 11, color: MUTED, letterSpacing: '0.06em', lineHeight: 1.8, marginBottom: 24 }}>{tier.desc}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {tier.items.map((item) => (
                    <li key={item} style={{ fontSize: 10, color: 'rgba(242,235,217,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', paddingBottom: 8, borderBottom: `1px solid rgba(200,168,75,0.08)`, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: GOLD, fontSize: 8 }}>◆</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <button
              onClick={openModal}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.4em', padding: '14px 32px', backgroundColor: GOLD, color: BLACK, border: 'none', cursor: 'pointer', fontWeight: 700, textTransform: 'uppercase' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#dab84e'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = GOLD; }}
            >
              Join the Waitlist →
            </button>
            <p style={{ fontSize: 9, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 16 }}>
              Tickets release by invitation. Register to be notified.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '40px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, maxWidth: 1080, margin: '0 auto' }}>
        <p style={{ fontSize: 9, letterSpacing: '0.25em', color: MUTED }}>
          © 2027 ZUNGU FESTIVAL · NAVY ISLAND · PORT ANTONIO · JAMAICA
        </p>
        <div style={{ display: 'flex', gap: 32 }}>
          <a href="/terms" style={{ fontSize: 9, letterSpacing: '0.25em', color: MUTED, textDecoration: 'none', textTransform: 'uppercase' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; }}>
            Terms
          </a>
          <a href="/privacy" style={{ fontSize: 9, letterSpacing: '0.25em', color: MUTED, textDecoration: 'none', textTransform: 'uppercase' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; }}>
            Privacy
          </a>
          <a href="mailto:partnership@zungufestival.com" style={{ fontSize: 9, letterSpacing: '0.25em', color: MUTED, textDecoration: 'none', textTransform: 'uppercase' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; }}>
            Contact
          </a>
        </div>
      </footer>

      {/* ── Waitlist Modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(6,8,8,0.88)', backdropFilter: 'blur(8px)' }}
          onClick={() => setModal(false)}
        >
          <div
            className="relative flex flex-col p-10"
            style={{ border: `1px solid ${BORDER}`, backgroundColor: BLACK, maxWidth: 440, width: '90%' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(false)}
              style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: 'rgba(242,235,217,0.3)', fontSize: 16, cursor: 'pointer', fontFamily: "'Space Mono', monospace" }}
            >
              ✕
            </button>

            <div style={{ width: 32, height: 1, background: GOLD, marginBottom: 24 }} />
            <p style={{ fontSize: 8, letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
              Ticket Waitlist
            </p>
            <p style={{ fontSize: 11, color: MUTED, letterSpacing: '0.08em', marginBottom: 32, lineHeight: 1.8 }}>
              Tickets release by invitation. Register below and you will be notified when access opens.
            </p>

            {status === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Registered.</p>
                <p style={{ fontSize: 11, color: MUTED, letterSpacing: '0.08em', lineHeight: 1.8 }}>You will be contacted when tickets open.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 8, letterSpacing: '0.35em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 8 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Enter name"
                    style={{ width: '100%', backgroundColor: 'transparent', border: `1px solid rgba(200,168,75,0.25)`, color: CREAM, fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '0.06em', padding: '12px 14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 8, letterSpacing: '0.35em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 8 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="Enter email"
                    style={{ width: '100%', backgroundColor: 'transparent', border: `1px solid rgba(200,168,75,0.25)`, color: CREAM, fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '0.06em', padding: '12px 14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ fontSize: 9, color: '#c45a2a', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Submission failed. Try again or email partnership@zungufestival.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.4em', padding: '13px 24px', backgroundColor: status === 'sending' ? 'rgba(200,168,75,0.5)' : GOLD, color: BLACK, border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', fontWeight: 700, textTransform: 'uppercase', marginTop: 8 }}
                >
                  {status === 'sending' ? 'Submitting...' : 'Register →'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
