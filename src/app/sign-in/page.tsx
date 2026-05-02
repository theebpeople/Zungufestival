'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const gold = '#C8A84B';
const rust = '#C45A2A';
const black = '#060808';
const white = '#F7F3EC';
const muted = '#6B6355';

function SignInContent() {
  const searchParams = useSearchParams();
  const isPartner = searchParams.get('role') === 'partner';

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: black,
        fontFamily: "'Space Mono', monospace",
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        /* Hide Clerk chrome */
        [class*="cl-header"],[class*="cl-cardHeader"] { display: none !important; }
        [class*="cl-socialButtons"],[class*="cl-divider"] { display: none !important; }
        [class*="cl-footer"],[class*="cl-footerAction"],[class*="cl-footerPages"] { display: none !important; }
        [class*="cl-badge"],[data-localization-key="badge__devMode"] { display: none !important; }
        [class*="cl-internal-b3fm6y"] { display: none !important; }

        /* Form field labels */
        [class*="cl-formFieldLabel"],[class*="cl-label"] {
          font-family: 'Space Mono', monospace !important;
          font-size: 9px !important;
          letter-spacing: 0.3em !important;
          text-transform: uppercase !important;
          color: #C8A84B !important;
          font-weight: 700 !important;
        }

        /* Inputs */
        [class*="cl-formFieldInput"] {
          background: rgba(6,8,8,0.95) !important;
          border: 1px solid rgba(200,168,75,0.22) !important;
          color: #F7F3EC !important;
          font-family: 'Space Mono', monospace !important;
          font-size: 11px !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
        [class*="cl-formFieldInput"]:focus {
          border-color: #C8A84B !important;
          outline: none !important;
          box-shadow: none !important;
        }

        /* Submit button */
        [class*="cl-formButtonPrimary"] {
          background: #C8A84B !important;
          color: #060808 !important;
          font-family: 'Space Mono', monospace !important;
          font-size: 9px !important;
          font-weight: 700 !important;
          letter-spacing: 0.35em !important;
          text-transform: uppercase !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
        [class*="cl-formButtonPrimary"]:hover {
          background: #dab84e !important;
          box-shadow: none !important;
        }

        /* Any remaining text in the Clerk widget */
        [class*="cl-rootBox"] * {
          font-family: 'Space Mono', monospace !important;
        }
        [class*="cl-card"] {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }

        /* Error/hint text */
        [class*="cl-formFieldHintText"],[class*="cl-formFieldErrorText"] {
          font-family: 'Space Mono', monospace !important;
          font-size: 9px !important;
          color: #C45A2A !important;
        }
      `}</style>

      {/* HQ aerial background — very dim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/photos/NAVY%20ISLAND%20AERIAL.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
          filter: 'saturate(0.6) brightness(0.18)',
          opacity: 0.85,
        }}
      />
      {/* Dark vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(6,8,8,0.55) 0%, rgba(6,8,8,0.92) 75%)',
        }}
      />

      {/* Logo mark */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 80, height: 80, marginBottom: '2.5rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, transform: 'rotate(45deg)', border: '1px solid rgba(200,168,75,0.2)' }} />
          <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${gold}` }}>
            <div style={{ width: 8, height: 8, backgroundColor: gold }} />
          </div>
        </div>

        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            color: white,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          ZUNGU
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: gold, fontSize: 11, letterSpacing: '0.4em', fontWeight: 700, textTransform: 'uppercase' }}>
          <span>Navy Island</span>
          <div style={{ width: 4, height: 4, transform: 'rotate(45deg)', backgroundColor: rust }} />
          <span>MMXXVII</span>
        </div>
      </div>

      {/* Role label */}
      <p
        style={{
          position: 'relative',
          zIndex: 10,
          fontSize: 10,
          textTransform: 'uppercase',
          fontWeight: 700,
          fontStyle: 'italic',
          marginBottom: '2rem',
          color: isPartner ? gold : muted,
          letterSpacing: '0.35em',
        }}
      >
        {isPartner ? '// PARTNER ACCESS' : '// INVESTOR ACCESS'}
      </p>

      {/* Clerk sign-in */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 384 }}>
        <SignIn
          routing="hash"
          forceRedirectUrl={isPartner ? '/partner' : '/deck'}
          appearance={{
            variables: {
              colorPrimary: gold,
              colorText: white,
              colorBackground: black,
              colorInputBackground: 'rgba(255,255,255,0.05)',
              colorInputText: white,
              fontFamily: "'Space Mono', monospace",
              borderRadius: '0px',
            },
            elements: {
              rootBox: { width: '100%' },
              card: { background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 },
              cardHeader: { display: 'none' },
              header: { display: 'none' },
              headerTitle: { display: 'none' },
              headerSubtitle: { display: 'none' },
              socialButtonsRoot: { display: 'none' },
              socialButtonsBlockButton: { display: 'none' },
              dividerRow: { display: 'none' },
              dividerLine: { display: 'none' },
              footer: { display: 'none' },
              footerAction: { display: 'none' },
              footerPages: { display: 'none' },
            },
          }}
        />
      </div>

      {/* Invite note */}
      <p
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '2rem',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: muted,
        }}
      >
        Access by invitation only ·{' '}
        <a href="mailto:partnership@zungufestival.com" style={{ color: gold, textDecoration: 'none' }}>
          partnership@zungufestival.com
        </a>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
