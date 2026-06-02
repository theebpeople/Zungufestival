'use client';

import { SignIn } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

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
    label: 'Production Partner',
    sub: 'Staging · logistics · production brief',
    photo: '/photos/zungu-beach-stage-aerial.png',
  },
  {
    role: 'supplier',
    label: 'Supplier',
    sub: 'Equipment · procurement · vendor brief',
    photo: '/photos/zungu-beach-stage-small.png',
  },
  {
    role: 'press',
    label: 'Press',
    sub: 'Media kit · assets · press contacts',
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
  const isPartner = role === 'partner';
  const portalLabel =
    role === 'investor'
      ? 'Investor'
      : role === 'partner'
        ? 'Production Partner'
        : role === 'supplier'
          ? 'Supplier'
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
        [class*="cl-formFieldInput"] {
          background: rgba(6,8,8,0.95) !important;
          border: 1px solid rgba(200,168,75,0.22) !important;
          color: #F7F3EC !important;
          font-family: 'Space Mono', monospace !important;
          font-size: 14px !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
        [class*="cl-formFieldInput"]:focus { border-color: #C8A84B !important; outline: none !important; box-shadow: none !important; }
        [class*="cl-formFieldInput"]::placeholder { color: rgba(242,235,217,0.28) !important; opacity: 1 !important; }
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
        [class*="cl-rootBox"] * { font-family: 'Space Mono', monospace !important; }
        [class*="cl-card"] { background: transparent !important; box-shadow: none !important; border: none !important; }
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
          color: muted,
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

function SignInContent() {
  const searchParams = useSearchParams();
  const urlRole = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const activeRole = urlRole ?? selectedRole;

  if (!activeRole) {
    return <PortalChooser onSelect={setSelectedRole} />;
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
