'use client';

import { SignIn, SignUp } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, useMemo } from 'react';

function decodeInviteEmail(token: string): string | null {
  try {
    const payload = token.split('.')[0];
    const padded = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padLen = (4 - (padded.length % 4)) % 4;
    const json = atob(padded + '='.repeat(padLen));
    return JSON.parse(json)?.email ?? null;
  } catch {
    return null;
  }
}

const gold = '#C8A84B';
const rust = '#C45A2A';
const black = '#060808';
const white = '#F7F3EC';
const muted = '#6B6355';

const PORTALS = [
  {
    role: 'investor',
    label: 'Investor',
    sub: 'Fund deck · financials · equity structure',
    photo: '/photos/port-antonio-aerial.jpeg',
  },
  {
    role: 'partner',
    label: 'Production Partners',
    sub: 'Staging · logistics · production brief',
    photo: '/photos/zungu-beach-stage-aerial.png',
  },
  {
    role: 'press',
    label: 'Press',
    sub: 'Media kit · assets · press contacts',
    photo: '/photos/port-antonio.jpg',
  },
  {
    role: 'stakeholder',
    label: 'Stakeholders',
    sub: 'Institutional · Community · Authorities',
    photo: '/photos/port-antonio.jpg',
  },
] as const;

type Portal = (typeof PORTALS)[number];

function PortalCard({
  portal,
  onSelect,
}: {
  portal: Portal;
  onSelect: (role: string) => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={() => onSelect(portal.role)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: 220,
        border: `1px solid ${hover ? 'rgba(200,168,75,0.55)' : 'rgba(200,168,75,0.12)'}`,
        background: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        padding: '1.75rem',
        transition: 'border-color 0.25s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${portal.photo}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: `saturate(0.7) brightness(${hover ? 0.38 : 0.22})`,
          transition: 'filter 0.3s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(6,8,8,0.96) 0%, rgba(6,8,8,0.45) 55%, rgba(6,8,8,0.18) 100%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <p
          style={{
            fontSize: 8,
            letterSpacing: '0.3em',
            color: muted,
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          {portal.sub}
        </p>
        <h3
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: hover ? gold : white,
            transition: 'color 0.2s',
          }}
        >
          {portal.label}
        </h3>
        <div
          style={{
            marginTop: '0.85rem',
            fontSize: 9,
            letterSpacing: '0.3em',
            color: gold,
            textTransform: 'uppercase',
            fontWeight: 700,
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          Sign In →
        </div>
      </div>
    </button>
  );
}

function RequestAccess() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: black,
        fontFamily: "'Space Mono', monospace",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/photos/NAVY%20ISLAND%20AERIAL.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 42%',
          filter: 'saturate(0.6) brightness(0.1)',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(6,8,8,0.5) 0%, rgba(6,8,8,0.92) 75%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 480 }}>
        <img
          src="/zungu-z-mark.png"
          alt="Zungu"
          style={{ width: 60, height: 'auto', marginBottom: '2rem', display: 'block', margin: '0 auto 2rem', filter: 'drop-shadow(0 0 20px rgba(200,168,75,0.35))' }}
        />
        <p style={{ fontSize: 9, letterSpacing: '0.4em', color: gold, textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.5rem' }}>
          Zungu Festival · 2027
        </p>
        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            fontWeight: 900,
            color: white,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          Access by<br />invitation only
        </h1>
        <p style={{ fontSize: 12, color: muted, lineHeight: 1.8, marginBottom: '2.5rem' }}>
          This portal is available to invited partners, investors, press, and institutional stakeholders. If you have received an invitation link, please use it to access your portal.
        </p>
        <div style={{ width: 40, height: 1, background: 'rgba(200,168,75,0.4)', margin: '0 auto 2rem' }} />
        <p style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(200,168,75,0.5)', textTransform: 'lowercase' }}>
          For access requests:{' '}
          <a
            href="mailto:partnership@zungufestival.com?subject=Access%20Request"
            style={{ color: gold, textDecoration: 'none' }}
          >
            partnership@zungufestival.com
          </a>
        </p>
      </div>
    </div>
  );
}

function PortalChooser({ onSelect }: { onSelect: (role: string) => void }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: black,
        fontFamily: "'Space Mono', monospace",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aerial background — very dim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/photos/NAVY%20ISLAND%20AERIAL.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 42%',
          filter: 'saturate(0.6) brightness(0.12)',
          opacity: 0.9,
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(6,8,8,0.4) 0%, rgba(6,8,8,0.88) 70%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '4rem 2rem 2.5rem' }}>
          <p
            style={{
              fontSize: 9,
              letterSpacing: '0.55em',
              color: gold,
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <span
              style={{ display: 'inline-block', width: 24, height: 1, background: gold }}
            />
            Navy Island · Port Antonio · Jamaica · June 17–23, 2027
            <span
              style={{ display: 'inline-block', width: 24, height: 1, background: gold }}
            />
          </p>

          <img
            src="/zungu-z-mark.png"
            alt="Zungu"
            style={{ width: 'min(80px,16vw)', height: 'auto', marginBottom: '1.75rem', display: 'block', margin: '0 auto 1.75rem', filter: 'drop-shadow(0 0 28px rgba(200,168,75,0.45))' }}
          />

          <h1
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: white,
              lineHeight: 1,
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}
          >
            ZUNGU
          </h1>
          <h2
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: gold,
              lineHeight: 1,
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
            }}
          >
            FESTIVAL
          </h2>
          <div
            style={{ width: 48, height: 1, background: gold, margin: '0 auto 2rem' }}
          />
          <p
            style={{
              fontSize: 9,
              letterSpacing: '0.4em',
              color: 'rgba(242,235,217,0.4)',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Select your access portal
          </p>
        </div>

        {/* Portal grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 1,
            maxWidth: 980,
            width: '100%',
            margin: '0 auto',
            padding: '0 2rem 4rem',
          }}
        >
          {PORTALS.map((p) => (
            <PortalCard key={p.role} portal={p} onSelect={onSelect} />
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            padding: '0 2rem 2.5rem',
            fontSize: 9,
            letterSpacing: '0.25em',
            color: 'rgba(200,168,75,0.4)',
          }}
        >
          Access by invitation only ·{' '}
          <a
            href="mailto:partnership@zungufestival.com"
            style={{ color: 'rgba(200,168,75,0.6)', textDecoration: 'none' }}
          >
            partnership@zungufestival.com
          </a>
        </div>
      </div>
    </div>
  );
}

function SignInForm({ role }: { role: string }) {
  const router = useRouter();
  const portalLabel =
    role === 'investor'
      ? 'Investor'
      : role === 'partner'
        ? 'Production Partners'
        : role === 'stakeholder'
          ? 'Institutional Stakeholder'
          : 'Press';
  const photo =
    PORTALS.find((p) => p.role === role)?.photo ?? '/photos/NAVY%20ISLAND%20AERIAL.png';

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
        [class*="cl-header"],[class*="cl-cardHeader"] { display: none !important; }
        [class*="cl-socialButtons"],[class*="cl-divider"] { display: none !important; }
        [class*="cl-badge"],[data-localization-key="badge__devMode"] { display: none !important; }
        [class*="cl-internal-b3fm6y"],[class*="cl-devBrowser"] { display: none !important; }

        [class*="cl-formFieldLabel"],[class*="cl-label"] {
          font-family: 'Space Mono', monospace !important;
          font-size: 9px !important;
          letter-spacing: 0.4em !important;
          text-transform: uppercase !important;
          color: #C8A84B !important;
          font-weight: 700 !important;
        }
        [class*="cl-formFieldInput"],
        [class*="cl-formFieldInput"]:not([type="submit"]) {
          background: rgba(18,24,20,0.97) !important;
          border: 1px solid rgba(200,168,75,0.45) !important;
          color: #F7F3EC !important;
          font-family: 'Space Mono', monospace !important;
          font-size: 14px !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          padding: 12px 14px !important;
          min-height: 46px !important;
        }
        [class*="cl-formFieldInput"]:focus,
        [class*="cl-formFieldInput"]:focus-within {
          border-color: #C8A84B !important;
          outline: none !important;
          box-shadow: 0 0 0 1px #C8A84B !important;
        }
        [class*="cl-formFieldInput"]::placeholder { color: rgba(242,235,217,0.4) !important; opacity: 1 !important; }
        [class*="cl-formFieldInputGroup"],
        [class*="cl-fieldInputGroup"] {
          background: rgba(18,24,20,0.97) !important;
          border: 1px solid rgba(200,168,75,0.45) !important;
          border-radius: 0 !important;
        }
        [class*="cl-formButtonPrimary"] {
          background: #C8A84B !important;
          color: #060808 !important;
          font-family: 'Space Mono', monospace !important;
          font-size: 9px !important;
          font-weight: 700 !important;
          letter-spacing: 0.4em !important;
          text-transform: uppercase !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
        [class*="cl-formButtonPrimary"]:hover { background: #dab84e !important; box-shadow: none !important; }
        [class*="cl-rootBox"] * { font-family: 'Space Mono', monospace !important; color: #F2EBD9 !important; }
        [class*="cl-card"] { background: transparent !important; box-shadow: none !important; border: none !important; }
        /* Ensure any Clerk-rendered text (email display, back link, etc.) is visible */
        [class*="cl-"] p, [class*="cl-"] span, [class*="cl-"] a, [class*="cl-"] button:not([class*="cl-formButtonPrimary"]) {
          color: rgba(242,235,217,0.7) !important;
        }
        [class*="cl-identityPreview"], [class*="cl-identityPreviewText"], [class*="cl-identityPreviewEditButton"] {
          color: #F2EBD9 !important;
        }
        [class*="cl-alternativeMethods"], [class*="cl-alternativeMethodsBlockButton"] {
          color: rgba(242,235,217,0.55) !important;
          border-color: rgba(200,168,75,0.2) !important;
        }
        [class*="cl-backLink"], [class*="cl-backButton"] {
          color: rgba(200,168,75,0.7) !important;
        }
        [class*="cl-formFieldHintText"],[class*="cl-formFieldErrorText"] {
          font-family: 'Space Mono', monospace !important;
          font-size: 12px !important;
          color: #C45A2A !important;
        }

        /* Footer — sign up link */
        [class*="cl-footer"] {
          background: transparent !important;
          border: none !important;
          padding-top: 1.5rem !important;
        }
        [class*="cl-footer"] { background: transparent !important; border: none !important; padding-top: 1.5rem !important; }
        [class*="cl-footerActionText"] {
          font-family: 'Space Mono', monospace !important; font-size: 9px !important;
          color: rgba(242,235,217,0.35) !important; letter-spacing: 0.15em !important;
        }
        [class*="cl-footerActionLink"] {
          font-family: 'Space Mono', monospace !important; font-size: 9px !important;
          color: #C8A84B !important; font-weight: 700 !important; letter-spacing: 0.15em !important; text-decoration: none !important;
        }
        [class*="cl-footerActionLink"]:hover { color: #dab84e !important; }

        /* OTP / verification code inputs */
        [class*="cl-otpCodeField"] input,
        [class*="cl-otpCodeFieldInput"],
        input[data-otp-input],
        input[autocomplete*="one-time-code"] {
          background: rgba(18,24,20,0.97) !important;
          border: 1px solid rgba(200,168,75,0.45) !important;
          color: #F2EBD9 !important;
          -webkit-text-fill-color: #F2EBD9 !important;
          border-radius: 0 !important;
          font-family: 'Space Mono', monospace !important;
          font-weight: 700 !important;
          font-size: 18px !important;
          letter-spacing: 0 !important;
          text-align: center !important;
          box-shadow: none !important;
        }
        [class*="cl-otpCodeField"] input:focus,
        [class*="cl-otpCodeFieldInput"]:focus {
          border-color: #C8A84B !important;
          box-shadow: 0 0 0 1px #C8A84B !important;
        }
        /* "Resend" and secondary links */
        [class*="cl-resendCodeLink"],
        [class*="cl-resendCodeButton"] {
          color: rgba(200,168,75,0.7) !important;
          font-family: 'Space Mono', monospace !important;
          font-size: 10px !important;
          letter-spacing: 0.2em !important;
        }
      `}</style>

      {/* Role-specific background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${photo}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.6) brightness(0.18)',
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, rgba(6,8,8,0.55) 0%, rgba(6,8,8,0.92) 75%)',
        }}
      />

      {/* Back link */}
      <button
        onClick={() => router.push('/sign-in')}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          zIndex: 20,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 9,
          letterSpacing: '0.3em',
          color: 'rgba(242,235,217,0.55)',
          textTransform: 'uppercase',
          fontWeight: 700,
          fontFamily: "'Space Mono', monospace",
        }}
      >
        ← Portals
      </button>

      {/* Branding */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src="/zungu-z-mark.png"
          alt="Zungu"
          style={{ width: 90, height: 'auto', marginBottom: '2rem', filter: 'drop-shadow(0 0 28px rgba(200,168,75,0.4))' }}
        />

        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 6rem)',
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

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            color: gold,
            fontSize: 11,
            letterSpacing: '0.4em',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          <span>Navy Island</span>
          <div
            style={{ width: 4, height: 4, transform: 'rotate(45deg)', backgroundColor: rust }}
          />
          <span>MMXXVII</span>
        </div>
      </div>

      {/* Portal badge */}
      <p
        style={{
          position: 'relative',
          zIndex: 10,
          fontSize: 10,
          textTransform: 'uppercase',
          fontWeight: 700,
          fontStyle: 'italic',
          marginBottom: '2rem',
          color: gold,
          letterSpacing: '0.4em',
        }}
      >
        // {portalLabel.toUpperCase()} ACCESS
      </p>

      {/* Clerk sign-in */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 384 }}>
        <SignIn
          routing="hash"
          forceRedirectUrl={`/partner?role=${role}`}
          appearance={{
            variables: {
              colorPrimary: gold,
              colorText: white,
              colorBackground: black,
              colorInputBackground: 'rgba(18,24,20,0.97)',
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
            },
          }}
        />
      </div>

      <p
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '2rem',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: muted,
        }}
      >
        Access by invitation only ·{' '}
        <a
          href="mailto:partnership@zungufestival.com"
          style={{ color: gold, textDecoration: 'none' }}
        >
          partnership@zungufestival.com
        </a>
      </p>
    </div>
  );
}

function SignUpForm({ role, email }: { role: string; email: string | null }) {
  const router = useRouter();
  const isPartner = role === 'partner';
  const portalLabel =
    role === 'investor' ? 'Investor' :
    role === 'partner' ? 'Production Partner' :
    role === 'supplier' ? 'Supplier' : 'Press';
  const photo = PORTALS.find((p) => p.role === role)?.photo ?? '/photos/NAVY%20ISLAND%20AERIAL.png';

  return (
    <div
      style={{
        minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', backgroundColor: black,
        fontFamily: "'Space Mono', monospace", padding: '2rem', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <style>{`
        [class*="cl-header"],[class*="cl-cardHeader"] { display: none !important; }
        [class*="cl-socialButtons"],[class*="cl-divider"] { display: none !important; }
        [class*="cl-badge"],[data-localization-key="badge__devMode"] { display: none !important; }
        [class*="cl-formFieldLabel"],[class*="cl-label"] {
          font-family: 'Space Mono', monospace !important; font-size: 9px !important;
          letter-spacing: 0.4em !important; text-transform: uppercase !important;
          color: #C8A84B !important; font-weight: 700 !important;
        }
        [class*="cl-formFieldInput"],[class*="cl-formFieldInput"]:not([type="submit"]) {
          background: rgba(18,24,20,0.97) !important; border: 1px solid rgba(200,168,75,0.45) !important;
          color: #F7F3EC !important; font-family: 'Space Mono', monospace !important;
          font-size: 14px !important; border-radius: 0 !important; box-shadow: none !important;
          padding: 12px 14px !important; min-height: 46px !important;
        }
        [class*="cl-formFieldInput"]:focus { border-color: #C8A84B !important; outline: none !important; box-shadow: 0 0 0 1px #C8A84B !important; }
        [class*="cl-formButtonPrimary"] {
          background: #C8A84B !important; color: #060808 !important;
          font-family: 'Space Mono', monospace !important; font-size: 9px !important;
          font-weight: 700 !important; letter-spacing: 0.4em !important;
          text-transform: uppercase !important; border-radius: 0 !important; box-shadow: none !important;
        }
        [class*="cl-rootBox"] * { font-family: 'Space Mono', monospace !important; color: #F2EBD9 !important; }
        [class*="cl-card"] { background: transparent !important; box-shadow: none !important; border: none !important; }
        [class*="cl-otpCodeField"] input, [class*="cl-otpCodeFieldInput"], input[autocomplete*="one-time-code"] {
          background: rgba(18,24,20,0.97) !important; border: 1px solid rgba(200,168,75,0.45) !important;
          color: #F2EBD9 !important; -webkit-text-fill-color: #F2EBD9 !important;
          border-radius: 0 !important; font-family: 'Space Mono', monospace !important;
          font-weight: 700 !important; font-size: 18px !important; text-align: center !important; box-shadow: none !important;
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${photo}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.6) brightness(0.18)', opacity: 0.85 }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(6,8,8,0.55) 0%, rgba(6,8,8,0.92) 75%)' }} />

      <button onClick={() => router.push('/sign-in')} style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(242,235,217,0.55)', textTransform: 'uppercase', fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>
        ← Portals
      </button>

      <div style={{ position: 'relative', zIndex: 10, marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/zungu-z-mark.png" alt="Zungu" style={{ width: 90, height: 'auto', marginBottom: '2rem', filter: 'drop-shadow(0 0 28px rgba(200,168,75,0.4))' }} />
        <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(3rem, 9vw, 6rem)', color: white, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>ZUNGU</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: gold, fontSize: 11, letterSpacing: '0.4em', fontWeight: 700, textTransform: 'uppercase' }}>
          <span>Navy Island</span>
          <div style={{ width: 4, height: 4, transform: 'rotate(45deg)', backgroundColor: rust }} />
          <span>MMXXVII</span>
        </div>
      </div>

      <p style={{ position: 'relative', zIndex: 10, fontSize: 10, textTransform: 'uppercase', fontWeight: 700, fontStyle: 'italic', marginBottom: '2rem', color: gold, letterSpacing: '0.4em' }}>
        // {portalLabel.toUpperCase()} ACCESS — CREATE ACCOUNT
      </p>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 384 }}>
        <SignUp
          routing="hash"
          forceRedirectUrl={isPartner ? '/partner' : `/deck?role=${role}`}
          initialValues={email ? { emailAddress: email } : undefined}
          appearance={{
            variables: {
              colorPrimary: gold, colorText: white, colorBackground: black,
              colorInputBackground: 'rgba(18,24,20,0.97)', colorInputText: white,
              fontFamily: "'Space Mono', monospace", borderRadius: '0px',
            },
            elements: {
              rootBox: { width: '100%' },
              card: { background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 },
              cardHeader: { display: 'none' }, header: { display: 'none' },
              socialButtonsRoot: { display: 'none' }, socialButtonsBlockButton: { display: 'none' },
              dividerRow: { display: 'none' }, dividerLine: { display: 'none' },
            },
          }}
        />
      </div>
    </div>
  );
}

function SignInContent() {
  const searchParams = useSearchParams();
  const urlRole = searchParams.get('role');
  const inviteToken = searchParams.get('invite');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const activeRole = urlRole ?? selectedRole;
  const inviteEmail = useMemo(
    () => (inviteToken ? decodeInviteEmail(inviteToken) : null),
    [inviteToken],
  );

  if (!activeRole) {
    if (!inviteToken) {
      return <RequestAccess />;
    }
    return <PortalChooser onSelect={setSelectedRole} />;
  }

  if (inviteToken) {
    return <SignUpForm role={activeRole} email={inviteEmail} />;
  }

  return <SignInForm role={activeRole} />;
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
