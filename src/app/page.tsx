'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EMAIL = 'partnership@zungufestival.com';
const GOLD = '#C8A84B';
const BLACK = '#060808';
const CREAM = '#F7F3EC';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/deck');
    }
  }, [isLoaded, isSignedIn, router]);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: BLACK, fontFamily: "'Space Mono', monospace" }}
    >
      {/* HQ aerial background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/photos/NAVY%20ISLAND%20AERIAL.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 42%',
          filter: 'saturate(0.8) brightness(0.48)',
          opacity: 0.9,
        }}
      />
      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,8,8,1) 0%, rgba(6,8,8,0.7) 35%, rgba(6,8,8,0.15) 65%, rgba(6,8,8,0.3) 100%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(200,168,75,0.06) 0%, transparent 65%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Eyebrow */}
        <p
          className="flex items-center gap-3 mb-12 font-bold uppercase"
          style={{ fontSize: 9, letterSpacing: '0.55em', color: GOLD }}
        >
          <span style={{ display: 'inline-block', width: 28, height: 1, background: GOLD }} />
          Navy Island &nbsp;·&nbsp; Port Antonio &nbsp;·&nbsp; Jamaica &nbsp;·&nbsp; June 17–23, 2027
          <span style={{ display: 'inline-block', width: 28, height: 1, background: GOLD }} />
        </p>

        {/* Logotype */}
        <div className="flex flex-col items-center mb-2">
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
          className="font-light uppercase tracking-[0.35em] mb-14"
          style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(0.6rem, 1.1vw, 0.85rem)', color: 'rgba(247,243,236,0.18)' }}
        >
          MMXXVII
        </p>

        <div style={{ width: 60, height: 1, background: GOLD, marginBottom: 28 }} />

        <p
          className="font-bold italic uppercase mb-12"
          style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(242,235,217,0.42)' }}
        >
          An Electronic Music Oasis
        </p>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => setModal(true)}
            className="font-bold uppercase transition-all duration-200"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.4em', padding: '14px 28px', border: `1px solid rgba(200,168,75,0.5)`, color: GOLD, background: 'transparent', cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(200,168,75,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.5)'; }}
          >
            Request Access
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

      {/* Bottom contact */}
      <div className="absolute bottom-8 left-0 right-0 text-center" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(200,168,75,0.5)' }}>
        {EMAIL}
      </div>

      {/* Request Access modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(6,8,8,0.88)', backdropFilter: 'blur(8px)' }}
          onClick={() => setModal(false)}
        >
          <div
            className="relative flex flex-col items-center text-center p-12"
            style={{ border: `1px solid rgba(200,168,75,0.2)`, backgroundColor: BLACK, maxWidth: 420, width: '90%' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(false)}
              style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: 'rgba(242,235,217,0.3)', fontSize: 16, cursor: 'pointer', fontFamily: "'Space Mono', monospace" }}
            >
              ✕
            </button>

            <div style={{ width: 32, height: 1, background: GOLD, marginBottom: 24 }} />
            <p style={{ fontSize: 8, letterSpacing: '0.5em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
              Partnership Enquiries
            </p>
            <p style={{ fontSize: 11, color: 'rgba(242,235,217,0.55)', letterSpacing: '0.15em', marginBottom: 32, lineHeight: 1.8, textTransform: 'uppercase' }}>
              Investor and production partner access is by invitation. Send your enquiry and we will respond within 48 hours.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 20px',
                border: `1px solid rgba(200,168,75,0.25)`,
                marginBottom: 16,
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 10, letterSpacing: '0.1em', color: CREAM }}>{EMAIL}</span>
              <button
                onClick={copyEmail}
                style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: copied ? '#5aaf7a' : GOLD, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap' }}
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            <a
              href={`mailto:${EMAIL}?subject=ZUNGU%20Festival%20%E2%80%94%20Partnership%20Enquiry`}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.4em', padding: '12px 24px', backgroundColor: GOLD, color: BLACK, textDecoration: 'none', display: 'inline-block', fontWeight: 700, textTransform: 'uppercase' }}
            >
              Open Email App →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
