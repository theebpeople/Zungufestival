'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

const GOLD = '#C8A84B';
const BLACK = '#04080A';
const CREAM = '#F7F3EC';
const BORDER = 'rgba(200,168,75,0.18)';
const MUTED = 'rgba(242,235,217,0.45)';
const BG_ALT = '#04080A';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', interest: 'investor', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          details: `Company: ${form.company}\nRole: ${form.role}\nInterest: ${form.interest}\n\n${form.message}`,
        }),
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

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    letterSpacing: '0.35em',
    color: GOLD,
    textTransform: 'uppercase',
    fontWeight: 700,
    display: 'block',
    marginBottom: 8,
    fontFamily: "'Space Mono', monospace",
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: `1px solid rgba(200,168,75,0.25)`,
    color: CREAM,
    fontFamily: "'Space Mono', monospace",
    fontSize: 15,
    letterSpacing: '0.06em',
    padding: '12px 14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ backgroundColor: BLACK, fontFamily: "'Space Mono', monospace" }}>

      {/* ── Hero ── */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/elektricbangaz/video/upload/v1780459585/aerial-view-of-navy-island-in-port-antonio-in-jama-2025-12-17-11-59-54-utc_coui1y.mov"
          muted
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_AERIAL_vaapz1.png"
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
            Navy Island &nbsp;·&nbsp; Port Antonio &nbsp;·&nbsp; Jamaica &nbsp;·&nbsp; Target Window: June 17–23, 2027
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
            className="font-light uppercase tracking-[0.35em] mb-6"
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', color: 'rgba(247,243,236,0.55)' }}
          >
            MMXXVII
          </p>

          <div style={{ width: 60, height: 1, background: GOLD, marginBottom: 24 }} />

          <p
            style={{ fontSize: 15, color: MUTED, letterSpacing: '0.05em', lineHeight: 1.8, maxWidth: 520, marginBottom: '2.5rem', textAlign: 'center' }}
          >
            A private-island electronic music festival in Port Antonio, Jamaica.<br />
            Built for 5,000 guests, three stage territories, arrival by boat, hospitality, media capture, and long-term destination IP.
          </p>

          <div className="flex gap-6 flex-wrap justify-center">
            <a
              href="#briefing"
              className="font-bold uppercase transition-all duration-200"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.4em', padding: '14px 28px', backgroundColor: GOLD, color: BLACK, textDecoration: 'none', display: 'inline-block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#dab84e'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = GOLD; }}
            >
              Request Briefing →
            </a>
            <a
              href="/deck"
              className="font-bold uppercase transition-all duration-200"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.4em', padding: '14px 28px', border: `1px solid rgba(200,168,75,0.5)`, color: GOLD, background: 'transparent', textDecoration: 'none', display: 'inline-block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(200,168,75,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.5)'; }}
            >
              View Deck →
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2" style={{ color: MUTED, fontSize: 8, letterSpacing: '0.3em' }}>
          <span style={{ textTransform: 'uppercase' }}>Scroll</span>
          <span style={{ fontSize: 16, lineHeight: 1 }}>↓</span>
        </div>
      </div>

      {/* ── Section 01 — The Proposition ── */}
      <section style={{ padding: '96px 8vw', borderTop: `1px solid ${BORDER}`, backgroundColor: BG_ALT }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.45em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
            01 — Executive Briefing
          </p>
          <h2
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: CREAM, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 28, lineHeight: 1.1 }}
          >
            The proposition.
          </h2>
          <p style={{ fontSize: 15, color: MUTED, letterSpacing: '0.05em', lineHeight: 1.9, maxWidth: 640, marginBottom: 56 }}>
            Zungu is a private-island electronic music festival in Port Antonio, Jamaica.<br /><br />
            It is built around a market correction: Jamaica&rsquo;s influence is embedded in global electronic music, but the island has not yet owned the premium destination-festival category that influence helped create.<br /><br />
            Zungu converts that authorship into a controlled live experience — 5,000 guests, three stages, hospitality, media, partnerships, and long-term intellectual property.
          </p>

          {/* Dossier rows */}
          <div style={{ borderTop: `1px solid rgba(200,168,75,0.12)` }}>
            {[
              { label: 'WHAT', value: 'Private-island electronic music festival. 5,000 guests. Three stages. Seven days. One controlled destination experience.' },
              { label: 'WHERE', value: 'Navy Island, Port Antonio, Jamaica. 64 acres. Five minutes by boat from the Errol Flynn Marina.' },
              { label: 'FORMAT', value: 'Controlled capacity. Arrival by boat. Three stage territories. Daytime programming. Night programming. Hospitality layer.' },
              { label: 'AUDIENCE', value: 'Investors, production partners, strategic partners, press, artist agencies, and tourism stakeholders.' },
              { label: 'OUTCOME', value: 'A destination-festival platform designed for live revenue, hospitality, sponsorship, media capture, and long-term IP.' },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr',
                  gap: 32,
                  padding: '24px 0',
                  borderBottom: `1px solid rgba(200,168,75,0.08)`,
                  alignItems: 'start',
                }}
              >
                <span style={{ fontSize: 10, letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, paddingTop: 2 }}>{label}</span>
                <span style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, letterSpacing: '0.04em' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 02 — The Site Advantage ── */}
      <section style={{ padding: '96px 8vw', borderTop: `1px solid ${BORDER}`, backgroundColor: '#04080A' }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.45em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
            02 — Site Advantage
          </p>
          <h2
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: CREAM, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 28, lineHeight: 1.1 }}
          >
            The island is the moat.
          </h2>
          <p style={{ fontSize: 15, color: MUTED, letterSpacing: '0.05em', lineHeight: 1.9, maxWidth: 640, marginBottom: 56 }}>
            Navy Island gives Zungu what most destination festivals spend years trying to manufacture: arrival, privacy, containment, natural drama, and separation from the mainland.<br /><br />
            The five-minute crossing from the Errol Flynn Marina is not only logistics. It is guest control, operational pacing, and the first act of the experience.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, border: `1px solid rgba(200,168,75,0.12)` }}>
            {[
              { num: '64', label: 'Acres', sub: 'Navy Island' },
              { num: '~5 min', label: 'Crossing', sub: 'From mainland' },
              { num: '5,000', label: 'Guests', sub: 'Year One target' },
              { num: '3', label: 'Stages', sub: 'Stage territories' },
            ].map(({ num, label, sub }, i, arr) => (
              <div
                key={label}
                style={{
                  padding: '32px 24px',
                  borderRight: i < arr.length - 1 ? `1px solid rgba(200,168,75,0.08)` : 'none',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 900, color: GOLD, display: 'block', lineHeight: 1, marginBottom: 8 }}>{num}</span>
                <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: CREAM, fontWeight: 700, display: 'block', marginBottom: 4 }}>{label}</span>
                <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, display: 'block' }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 03 — The Operating Thesis ── */}
      <section style={{ padding: '96px 8vw', borderTop: `1px solid ${BORDER}`, backgroundColor: BG_ALT }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.45em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
            03 — Operating Thesis
          </p>
          <h2
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: CREAM, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 28, lineHeight: 1.1 }}
          >
            Built as a festival. Structured as a platform.
          </h2>
          <p style={{ fontSize: 15, color: MUTED, letterSpacing: '0.05em', lineHeight: 1.9, maxWidth: 640, marginBottom: 56 }}>
            Zungu is not structured as a one-off event.<br /><br />
            The launch format establishes a controlled-capacity festival asset with multiple revenue lines: tickets, VIP, glamping, food and beverage, bars, sponsorship, hospitality partnerships, media capture, artist commissions, and future IP.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            {[
              { title: 'LIVE REVENUE', body: 'Controlled capacity. Tiered ticketing. Glamping. VIP. On-island F&B and bar programme. The island distributes spend across multiple zones.' },
              { title: 'HOSPITALITY', body: 'Glamping, private villas, partner accommodation blocks, concierge programming, and a premium hospitality layer for The Thirty and Obsidian tier guests.' },
              { title: 'PARTNERSHIPS', body: 'Sponsor inventory across stages, bars, wellness, transport, and media. Destination tourism, beverage, telecoms, travel, and luxury brand categories.' },
              { title: 'MEDIA + IP', body: 'Artist commissions recorded on island. Zungu Radio. Press access. Year-round content layer. A media asset that extends value beyond seven days.' },
            ].map(({ title, body }) => (
              <div
                key={title}
                style={{
                  padding: '36px 32px',
                  border: `1px solid rgba(200,168,75,0.1)`,
                  backgroundColor: 'rgba(200,168,75,0.02)',
                }}
              >
                <p style={{ fontSize: 10, letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>{title}</p>
                <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.9, letterSpacing: '0.04em' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 04 — The Partner Tracks ── */}
      <section style={{ padding: '96px 8vw', borderTop: `1px solid ${BORDER}`, backgroundColor: '#04080A' }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.45em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
            04 — Partner Tracks
          </p>
          <h2
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: CREAM, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 28, lineHeight: 1.1 }}
          >
            Built for specific rooms.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: 48 }}>
            {[
              { title: 'INVESTORS', body: 'Capital structure, financial model, revenue assumptions, risk controls, and long-term expansion. Full proposal on request.' },
              { title: 'PRODUCTION PARTNERS', body: 'Stage architecture, marine logistics, power, lighting, sound, site build, safety, and crowd flow. Production brief on request.' },
              { title: 'SUPPLIERS', body: 'Equipment, procurement, infrastructure, accommodation, F&B, transport, staffing, and operations. Supplier brief on request.' },
              { title: 'PRESS', body: 'Approved positioning, media kit, imagery, destination story, artist strategy, and founder briefing. Press pack on request.' },
            ].map(({ title, body }) => (
              <div
                key={title}
                style={{
                  padding: '36px 32px',
                  border: `1px solid rgba(200,168,75,0.1)`,
                }}
              >
                <p style={{ fontSize: 10, letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>{title}</p>
                <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.9, letterSpacing: '0.04em' }}>{body}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="#briefing"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.4em', padding: '14px 32px', backgroundColor: GOLD, color: BLACK, border: 'none', cursor: 'pointer', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#dab84e'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = GOLD; }}
            >
              Request Briefing →
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 05 — Request Briefing ── */}
      <section id="briefing" style={{ padding: '96px 8vw', borderTop: `1px solid ${BORDER}`, backgroundColor: BG_ALT }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.45em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
            05 — Request Briefing
          </p>
          <h2
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: CREAM, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20, lineHeight: 1.1 }}
          >
            Start the conversation.
          </h2>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 48 }}>
            Zungu briefing access is reviewed by role. Submit your enquiry and the team will respond with the appropriate investor, production, supplier, or press material.
          </p>

          {status === 'sent' ? (
            <div style={{ padding: '40px 32px', border: `1px solid ${GOLD}`, textAlign: 'center' }}>
              <div style={{ width: 28, height: 1, background: GOLD, margin: '0 auto 20px' }} />
              <p style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 18, fontWeight: 700, color: GOLD, marginBottom: 12 }}>Received.</p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7 }}>The Zungu team will follow up with the appropriate briefing material.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Company / Organisation</label>
                <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Role / Title</label>
                <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Your role" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Interest Type</label>
                <select
                  value={form.interest}
                  onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as const, backgroundColor: 'transparent' }}
                >
                  {[
                    { value: 'investor', label: 'Investor' },
                    { value: 'production', label: 'Production Partner' },
                    { value: 'supplier', label: 'Supplier' },
                    { value: 'press', label: 'Press' },
                    { value: 'artist', label: 'Artist' },
                    { value: 'agency', label: 'Agency' },
                    { value: 'tourism', label: 'Tourism' },
                    { value: 'government', label: 'Government' },
                    { value: 'other', label: 'Other' },
                  ].map(o => (
                    <option key={o.value} value={o.value} style={{ background: BLACK, color: CREAM }}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Message (optional)</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="What you have in mind"
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
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
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  padding: '14px 24px',
                  backgroundColor: status === 'sending' ? 'rgba(200,168,75,0.5)' : GOLD,
                  color: BLACK,
                  border: 'none',
                  cursor: status === 'sending' ? 'default' : 'pointer',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginTop: 8,
                  alignSelf: 'flex-start',
                }}
              >
                {status === 'sending' ? 'Submitting...' : 'Submit Briefing Request →'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '40px 8vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
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
          <a href="/sign-in" style={{ fontSize: 9, letterSpacing: '0.25em', color: MUTED, textDecoration: 'none', textTransform: 'uppercase' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; }}>
            Partner Sign In
          </a>
        </div>
      </footer>
    </div>
  );
}
