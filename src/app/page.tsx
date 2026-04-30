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
      {/* Navy Island background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/photos/navy-island-aerial.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
          filter: 'saturate(0.7) brightness(0.45)',
          opacity: 0.35,
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,8,8,1) 0%, rgba(6,8,8,0.75) 25%, rgba(6,8,8,0.1) 55%, rgba(6,8,8,0.4) 100%)' }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(200,168,75,0.06) 0%, transparent 70%)' }}
      />

      {/* Location eyebrow */}
      <p
        className="relative z-10 text-[9px] font-bold uppercase flex items-center gap-3 mb-10"
        style={{ color: '#C8A84B', letterSpacing: '0.6em' }}
      >
        <span style={{ display: 'inline-block', width: 28, height: 1, background: '#C8A84B' }} />
        Navy Island &nbsp;·&nbsp; Port Antonio &nbsp;·&nbsp; Jamaica &nbsp;·&nbsp; June 17–23, 2027
        <span style={{ display: 'inline-block', width: 28, height: 1, background: '#C8A84B' }} />
      </p>

      {/* Logo */}
      <div className="relative z-10 mb-12 flex flex-col items-center">
        <div className="w-20 h-20 mb-10 relative flex items-center justify-center">
          <div className="absolute inset-0 rotate-45" style={{ border: '1px solid rgba(200,168,75,0.2)' }} />
          <div className="w-12 h-12 flex items-center justify-center" style={{ border: '2px solid #C8A84B' }}>
            <div className="w-2 h-2" style={{ backgroundColor: '#C8A84B' }} />
          </div>
        </div>

        <h1
          className="font-black tracking-tighter uppercase mb-2"
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            color: '#F7F3EC',
            lineHeight: 1,
          }}
        >
          ZUNGU
        </h1>

        <div
          className="flex items-center gap-5 uppercase font-bold text-[11px]"
          style={{ color: '#C8A84B', letterSpacing: '0.4em' }}
        >
          <span>Navy Island</span>
          <div className="w-1 h-1 rotate-45" style={{ backgroundColor: '#C45A2A' }} />
          <span>MMXXVII</span>
        </div>
      </div>

      {/* Access label */}
      <p
        className="relative z-10 text-[10px] uppercase font-bold italic mb-8"
        style={{ color: '#6B6355', letterSpacing: '0.35em' }}
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
