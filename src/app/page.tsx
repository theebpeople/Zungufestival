'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const GOLD = '#C8A84B';
const BLACK = '#04080A';
const CREAM = '#F7F3EC';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) router.push('/deck');
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

  return (
    <div
      style={{
        backgroundColor: BLACK,
        fontFamily: "'Space Mono', monospace",
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Video background — vivid, minimal darkening ── */}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/elektricbangaz/video/upload/f_auto,q_auto/v1780459585/aerial-view-of-navy-island-in-port-antonio-in-jama-2025-12-17-11-59-54-utc_coui1y.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 35%',
          filter: 'saturate(1.05) brightness(0.72)',
        }}
      />
      {/* Subtle vignette — keep island visible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(4,8,10,0.35) 0%, rgba(4,8,10,0.15) 30%, rgba(4,8,10,0.25) 65%, rgba(4,8,10,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '0 6vw',
        }}
      >
        {/* Location strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ display: 'inline-block', width: 40, height: 1, background: 'rgba(200,168,75,0.7)' }} />
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.4em',
              color: 'rgba(200,168,75,0.85)',
              textTransform: 'uppercase',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            Navy Island &nbsp;·&nbsp; Port Antonio &nbsp;·&nbsp; Jamaica &nbsp;·&nbsp; June 17–23, 2027
          </span>
          <span style={{ display: 'inline-block', width: 40, height: 1, background: 'rgba(200,168,75,0.7)' }} />
        </div>

        {/* Wordmark */}
        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(4.5rem, 14vw, 11rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: CREAM,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          ZUNGU
        </h1>
        <h2
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(4.5rem, 14vw, 11rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: GOLD,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          FESTIVAL
        </h2>

        {/* MMXXVII */}
        <p
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
            fontWeight: 300,
            letterSpacing: '0.4em',
            color: 'rgba(247,243,236,0.38)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          MMXXVII
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="mailto:partnership@zungufestival.com?subject=Access%20Request"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.35em',
              padding: '13px 28px',
              backgroundColor: 'rgba(200,168,75,0.15)',
              border: `1px solid rgba(200,168,75,0.6)`,
              color: GOLD,
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: 700,
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = 'rgba(200,168,75,0.25)';
              el.style.borderColor = GOLD;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = 'rgba(200,168,75,0.15)';
              el.style.borderColor = 'rgba(200,168,75,0.6)';
            }}
          >
            Request Access
          </a>
          <a
            href="/sign-in"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.35em',
              padding: '13px 28px',
              backgroundColor: GOLD,
              color: BLACK,
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: 700,
              textTransform: 'uppercase',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#dab84e'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = GOLD; }}
          >
            Sign In →
          </a>
        </div>
      </div>

      {/* ── Bottom email ── */}
      <p
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          fontSize: 9,
          letterSpacing: '0.25em',
          color: 'rgba(200,168,75,0.4)',
          textTransform: 'lowercase',
        }}
      >
        partnership@zungufestival.com
      </p>
    </div>
  );
}
