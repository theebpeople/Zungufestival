'use client';
import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SignInContent() {
  const params = useSearchParams();
  const role = params.get('role') || 'investor';
  const isPartner = role === 'partner';
  const accent = isPartner ? '#4AAFA0' : '#C8A84B';
  const accentFaint = isPartner ? 'rgba(74,175,160,0.15)' : 'rgba(200,168,75,0.15)';
  const accentGlow = isPartner ? 'rgba(74,175,160,0.06)' : 'rgba(200,168,75,0.06)';

  return (
    <main style={{
      minHeight: '100vh',
      background: '#04080A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'Space Mono, monospace',
      cursor: 'crosshair',
    }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;700;900&family=Space+Mono:wght@400;700&display=swap');

        /* Grain overlay */
        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9999; opacity: 0.45;
        }

        /* ── KILL ALL DEFAULT CLERK STYLES ── */

        /* Hide header — attribute selectors survive Clerk class renames */
        [class*="cl-header"],
        [class*="cl-cardHeader"],
        .cl-headerTitle,
        .cl-headerSubtitle,
        .cl-header { display: none !important; }

        /* Hide social login buttons + divider */
        [class*="cl-socialButton"],
        [class*="cl-socialButtons"],
        [class*="cl-divider"],
        .cl-socialButtonsBlockButton,
        .cl-socialButtonsBlockButtonText,
        .cl-socialButtonsBlockButtonArrow,
        .cl-socialButtonsProviderIcon,
        .cl-socialButtonsRoot,
        .cl-dividerRow,
        .cl-dividerText,
        .cl-dividerLine { display: none !important; }

        /* Hide "Sign up" footer */
        [class*="cl-footer"],
        [class*="cl-footerAction"],
        .cl-footer,
        .cl-footerPages,
        .cl-footerPagesLink { display: none !important; }

        /* Hide "Development mode" banner */
        [class*="cl-badge"],
        [class*="cl-devMode"],
        .cl-internal-wjdkne,
        .cl-badge,
        [data-localization-key="badge__devMode"] { display: none !important; }

        /* ── RESTYLE THE CARD ── */
        .cl-card {
          background: rgba(13,32,24,0.6) !important;
          border: 1px solid ${accentFaint} !important;
          box-shadow: 0 32px 64px rgba(0,0,0,0.6) !important;
          border-radius: 0 !important;
          backdrop-filter: blur(24px) !important;
          padding: 32px !important;
        }

        /* ── FORM FIELDS ── */
        .cl-formFieldLabel {
          font-family: 'Space Mono', monospace !important;
          font-size: 9px !important;
          letter-spacing: 0.35em !important;
          text-transform: uppercase !important;
          color: rgba(242,235,217,0.4) !important;
          margin-bottom: 8px !important;
        }

        .cl-formFieldInput {
          background: rgba(4,8,10,0.95) !important;
          border: 1px solid ${accentFaint} !important;
          border-radius: 0 !important;
          color: #F2EBD9 !important;
          font-family: 'Space Mono', monospace !important;
          font-size: 13px !important;
          height: 48px !important;
          padding: 0 16px !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
          box-shadow: none !important;
        }

        .cl-formFieldInput:focus {
          border-color: ${accent} !important;
          box-shadow: 0 0 0 3px ${accentGlow} !important;
          outline: none !important;
        }

        .cl-formFieldInput::placeholder {
          color: rgba(242,235,217,0.15) !important;
        }

        /* ── PRIMARY BUTTON ── */
        .cl-formButtonPrimary {
          background: ${accent} !important;
          color: #04080A !important;
          border-radius: 0 !important;
          font-family: 'Space Mono', monospace !important;
          font-size: 9px !important;
          letter-spacing: 0.4em !important;
          text-transform: uppercase !important;
          font-weight: 700 !important;
          height: 48px !important;
          box-shadow: none !important;
          border: none !important;
          transition: opacity 0.2s !important;
          width: 100% !important;
        }

        .cl-formButtonPrimary:hover {
          opacity: 0.85 !important;
          background: ${accent} !important;
        }

        /* ── ERROR TEXT ── */
        .cl-formFieldErrorText {
          font-family: 'Space Mono', monospace !important;
          font-size: 9px !important;
          color: #e05a3a !important;
          letter-spacing: 0.05em !important;
        }

        /* ── MUTE CLERK BRANDING (can't fully hide in dev mode) ── */
        .cl-internal-b3fm6y,
        .cl-branded {
          opacity: 0.08 !important;
          filter: grayscale(1) !important;
        }

        /* ── ROOT BOX ── */
        .cl-rootBox { width: 100% !important; }
        .cl-cardBox { width: 100% !important; }
      `}</style>

      <div style={{
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
      }}>

        {/* Diamond mark */}
        <div style={{
          width: '40px', height: '40px',
          border: `1.5px solid rgba(200,168,75,0.5)`,
          transform: 'rotate(45deg)',
          margin: '0 auto 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: '8px', height: '8px',
            background: accent,
            transform: 'rotate(0deg)',
          }} />
        </div>

        {/* Wordmark */}
        <div style={{
          fontFamily: 'Unbounded, sans-serif',
          fontWeight: 900,
          fontSize: '42px',
          letterSpacing: '0.15em',
          color: '#F7F3EC',
          lineHeight: 1,
          marginBottom: '6px',
        }}>
          ZUNGU
        </div>

        {/* Location line */}
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '9px',
          letterSpacing: '0.45em',
          color: accent,
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}>
          Navy Island &nbsp;·&nbsp; MMXXVII
        </div>

        {/* Role line */}
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '8px',
          letterSpacing: '0.3em',
          color: 'rgba(242,235,217,0.25)',
          textTransform: 'uppercase',
          marginBottom: '40px',
        }}>
          // {isPartner ? 'Partner' : 'Investor'} Access
        </div>

        {/* Clerk form — header hidden via CSS + appearance; text set in ClerkProvider localization */}
        <SignIn
          routing="hash"
          forceRedirectUrl={isPartner ? '/partner' : '/deck'}
          appearance={{
            variables: {
              colorPrimary: accent,
              colorBackground: 'transparent',
              colorText: '#F2EBD9',
              colorTextSecondary: 'rgba(242,235,217,0.5)',
              colorInputBackground: 'rgba(4,8,10,0.95)',
              colorInputText: '#F2EBD9',
              colorDanger: '#e05a3a',
              fontFamily: 'Space Mono, monospace',
              borderRadius: '0px',
              spacingUnit: '18px',
            },
            elements: {
              rootBox: { width: '100%' },
              card: 'cl-card',
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
            layout: {
              logoPlacement: 'none',
              showOptionalFields: false,
              socialButtonsVariant: 'iconButton',
              socialButtonsPlacement: 'bottom',
            },
          }}
        />

        {/* Invite note — below clerk, outside its component */}
        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '8px',
          letterSpacing: '0.25em',
          color: 'rgba(242,235,217,0.15)',
          textTransform: 'uppercase',
          marginTop: '24px',
          lineHeight: '1.9',
        }}>
          By invitation only &nbsp;·&nbsp;{' '}
          <a
            href="mailto:partnership@zungufestival.com"
            style={{ color: 'rgba(200,168,75,0.35)', textDecoration: 'none' }}
          >
            partnership@zungufestival.com
          </a>
        </p>

      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
