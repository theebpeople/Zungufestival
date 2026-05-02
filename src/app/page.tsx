'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#060808', fontFamily: "'Space Mono', monospace" }}
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
      {/* Gradient — clear upper island, heavy black at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,8,8,1) 0%, rgba(6,8,8,0.7) 35%, rgba(6,8,8,0.15) 65%, rgba(6,8,8,0.3) 100%)' }}
      />
      {/* Subtle gold radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(200,168,75,0.06) 0%, transparent 65%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Eyebrow */}
        <p
          className="flex items-center gap-3 mb-12 font-bold uppercase"
          style={{ fontSize: 9, letterSpacing: '0.55em', color: '#C8A84B' }}
        >
          <span style={{ display: 'inline-block', width: 28, height: 1, background: '#C8A84B' }} />
          Navy Island &nbsp;·&nbsp; Port Antonio &nbsp;·&nbsp; Jamaica &nbsp;·&nbsp; June 17–23, 2027
          <span style={{ display: 'inline-block', width: 28, height: 1, background: '#C8A84B' }} />
        </p>

        {/* Logotype */}
        <div className="flex flex-col items-center mb-2">
          <h1
            className="font-black uppercase leading-none tracking-tighter"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              color: '#F7F3EC',
              letterSpacing: '-0.03em',
            }}
          >
            ZUNGU
          </h1>
          <h2
            className="font-black uppercase leading-none tracking-tighter"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              color: '#C8A84B',
              letterSpacing: '-0.03em',
            }}
          >
            FESTIVAL
          </h2>
        </div>
        <p
          className="font-light uppercase tracking-[0.35em] mb-14"
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(0.6rem, 1.1vw, 0.85rem)',
            color: 'rgba(247,243,236,0.18)',
          }}
        >
          MMXXVII
        </p>

        {/* Separator */}
        <div style={{ width: 60, height: 1, background: '#C8A84B', marginBottom: 28 }} />

        {/* Tagline */}
        <p
          className="font-bold italic uppercase mb-12"
          style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(242,235,217,0.42)' }}
        >
          An island festival. By invitation only.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="mailto:partnership@zungufestival.com"
            className="font-bold uppercase transition-all duration-200"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.4em',
              padding: '14px 28px',
              border: '1px solid rgba(200,168,75,0.5)',
              color: '#C8A84B',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(200,168,75,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = '#C8A84B';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.5)';
            }}
          >
            Request Access
          </a>
          <a
            href="/sign-in"
            className="font-bold uppercase transition-all duration-200"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.4em',
              padding: '14px 28px',
              backgroundColor: '#C8A84B',
              color: '#060808',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#dab84e'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#C8A84B'; }}
          >
            Sign In →
          </a>
        </div>
      </div>

      {/* Bottom contact */}
      <div
        className="absolute bottom-8 left-0 right-0 text-center"
        style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(200,168,75,0.5)' }}
      >
        <a href="mailto:partnership@zungufestival.com" style={{ color: 'inherit', textDecoration: 'none' }}>
          partnership@zungufestival.com
        </a>
      </div>
    </div>
  );
}
