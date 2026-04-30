'use client';

import { SignIn, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GatePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-8 text-center"
      style={{ backgroundColor: '#060808', fontFamily: "'Space Mono', monospace" }}
    >
      {/* Navy Island background — visible but not overwhelming */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/photos/navy-island-aerial.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
          filter: 'saturate(0.6) brightness(0.55)',
          opacity: 0.65,
        }}
      />
      {/* Gradient — heavier at bottom so form is readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,8,8,1) 0%, rgba(6,8,8,0.85) 30%, rgba(6,8,8,0.3) 60%, rgba(6,8,8,0.5) 100%)' }}
      />
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(200,168,75,0.07) 0%, transparent 65%)' }}
      />

      {/* Location eyebrow */}
      <p
        className="relative z-10 text-[9px] font-bold uppercase flex items-center gap-3 mb-8"
        style={{ color: '#C8A84B', letterSpacing: '0.55em' }}
      >
        <span style={{ display: 'inline-block', width: 28, height: 1, background: '#C8A84B' }} />
        Navy Island &nbsp;·&nbsp; Port Antonio &nbsp;·&nbsp; Jamaica &nbsp;·&nbsp; June 17–23, 2027
        <span style={{ display: 'inline-block', width: 28, height: 1, background: '#C8A84B' }} />
      </p>

      {/* Logo — ZUNGU white / FESTIVAL gold / MMXXVII dim */}
      <div className="relative z-10 mb-10 flex flex-col items-center">
        <h1
          className="font-black tracking-tighter uppercase text-center"
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: '#F7F3EC', display: 'block' }}>ZUNGU</span>
          <span style={{ color: '#C8A84B', display: 'block' }}>FESTIVAL</span>
        </h1>
        <p
          className="mt-3 font-light uppercase tracking-[0.35em]"
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(0.65rem, 1.2vw, 0.9rem)',
            color: 'rgba(247,243,236,0.3)',
          }}
        >
          MMXXVII
        </p>
      </div>

      {/* Access label */}
      <p
        className="relative z-10 text-[10px] uppercase font-bold italic mb-8"
        style={{ color: 'rgba(107,99,85,0.85)', letterSpacing: '0.35em' }}
      >
        // ACCESS AUTHORIZATION REQUIRED
      </p>

      {/* Clerk sign-in */}
      <div className="relative z-10 w-full max-w-sm">
        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-transparent shadow-none border-none p-0',
              headerTitle: 'text-white font-mono text-xs uppercase tracking-widest',
              headerSubtitle: 'text-[#6B6355] font-mono text-xs',
              formFieldLabel: 'text-[#C8A84B] font-mono text-[10px] uppercase tracking-[0.25em] font-bold',
              formFieldInput:
                'bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-wider focus:border-[#C8A84B] focus:ring-0 rounded-none',
              formButtonPrimary:
                'bg-transparent border border-[#C8A84B]/50 text-[#C8A84B] font-mono text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-[#C8A84B] hover:text-black transition-all rounded-none shadow-none',
              footerActionLink: 'text-[#C8A84B]',
              footerActionText: 'text-[#6B6355] font-mono text-xs',
              dividerLine: 'bg-white/8',
              dividerText: 'text-[#6B6355] font-mono text-[10px]',
              socialButtonsBlockButton:
                'border border-white/10 bg-transparent text-white font-mono text-xs hover:border-white/30 rounded-none',
              identityPreviewText: 'text-white font-mono text-xs',
              identityPreviewEditButton: 'text-[#C8A84B]',
              alertText: 'font-mono text-xs',
            },
          }}
        />
      </div>
    </div>
  );
}
