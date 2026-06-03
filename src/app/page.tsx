'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const GOLD = '#C8A84B';
const BLACK = '#04080A';
const CREAM = '#F7F3EC';
const MUTED = 'rgba(242,235,217,0.45)';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
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
      {/* ── Video background ── */}
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
          filter: 'saturate(0.8) brightness(0.45)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(4,8,10,0.92) 0%, rgba(4,8,10,0.6) 40%, rgba(4,8,10,0.2) 75%, rgba(4,8,10,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(200,168,75,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 8vw',
        }}
      >
        {/* Location tag */}
        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.45em',
            color: GOLD,
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ display: 'inline-block', width: 28, height: 1, background: GOLD }} />
          Navy Island · Port Antonio · Jamaica
          <span style={{ display: 'inline-block', width: 28, height: 1, background: GOLD }} />
        </p>

        {/* Z mark */}
        <img
          src="/zungu-z-mark.png"
          alt="Zungu"
          style={{
            width: 'min(80px, 14vw)',
            height: 'auto',
            marginBottom: '1.75rem',
            filter: 'drop-shadow(0 0 32px rgba(200,168,75,0.45))',
          }}
        />

        {/* Wordmark */}
        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(4rem, 13vw, 10rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: CREAM,
            lineHeight: 1,
            textTransform: 'uppercase',
            marginBottom: 0,
          }}
        >
          ZUNGU
        </h1>
        <h2
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(4rem, 13vw, 10rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: GOLD,
            lineHeight: 1,
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          FESTIVAL
        </h2>

        <p
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(0.65rem, 1.1vw, 0.85rem)',
            fontWeight: 300,
            letterSpacing: '0.35em',
            color: 'rgba(247,243,236,0.45)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          MMXXVII
        </p>

        <div style={{ width: 48, height: 1, background: GOLD, marginBottom: '2rem' }} />

        {/* Hero copy */}
        <p
          style={{
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            color: MUTED,
            lineHeight: 1.9,
            maxWidth: 560,
            marginBottom: '0.75rem',
            letterSpacing: '0.03em',
          }}
        >
          For one week, the most beautiful place on earth welcomes you to Zungu.
        </p>
        <p
          style={{
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            color: 'rgba(242,235,217,0.32)',
            lineHeight: 1.9,
            maxWidth: 560,
            marginBottom: '3rem',
            letterSpacing: '0.03em',
          }}
        >
          Where the magic of sound, sea, sand, movement, and Caribbean rhythm invites you into the ultimate electronic music experience.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="mailto:partnership@zungufestival.com?subject=Briefing%20Request"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.4em',
              padding: '14px 32px',
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
            Request Briefing →
          </a>
          <a
            href="/sign-in"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.4em',
              padding: '14px 32px',
              border: `1px solid rgba(200,168,75,0.45)`,
              color: GOLD,
              background: 'transparent',
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: 700,
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(200,168,75,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,75,0.45)'; }}
          >
            Sign In →
          </a>
        </div>

        {/* Footer line */}
        <p
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 9,
            letterSpacing: '0.3em',
            color: 'rgba(200,168,75,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Access by invitation only · partnership@zungufestival.com
        </p>
      </div>
    </div>
  );
}
