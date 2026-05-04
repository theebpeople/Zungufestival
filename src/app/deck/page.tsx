'use client';

import { SignUp } from '@clerk/nextjs';
import { useAuth, useClerk, useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const gold = '#C8A84B';
const rust = '#C45A2A';
const black = '#060808';
const white = '#F7F3EC';
const muted = '#6B6355';

const ROLE_CONFIG: Record<string, { badge: string; copy: string; photo: string }> = {
  investor: {
    badge: 'INVESTOR',
    copy: 'You have been granted access to the Zungu Festival investor deck.',
    photo: '/photos/NAVY%20ISLAND%20AERIAL.png',
  },
  partner: {
    badge: 'PRODUCTION PARTNER',
    copy: 'You have been granted access to the Zungu Festival production brief.',
    photo: '/photos/NAVY%20ISLAND%20STAGE%20AND%20PATHWAY%20MAP.png',
  },
  supplier: {
    badge: 'SUPPLIER',
    copy: 'You have been granted access to the Zungu Festival supplier brief.',
    photo: '/photos/NAVY%20ISLAND%20WIDE%20.png',
  },
  press: {
    badge: 'PRESS',
    copy: 'You have been granted access to the Zungu Festival press materials.',
    photo: '/photos/NAVY%20ISLAND%20-%20FROM%20%20tHE%20TOWN%20.png',
  },
};

const DEFAULT_CONFIG = {
  badge: 'PRIVATE ACCESS',
  copy: 'You have been granted access to this document.',
  photo: '/photos/NAVY%20ISLAND%20AERIAL.png',
};

const NAV_LABELS: Record<string, string> = {
  investor: 'Investor Deck',
  partner: 'Partner Brief',
  supplier: 'Supplier Brief',
  press: 'Press Materials',
};

function DeckContent() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') ?? 'investor';
  const cfg = ROLE_CONFIG[role] ?? DEFAULT_CONFIG;
  const navLabel = NAV_LABELS[role] ?? 'Investor Deck';
  const [loaded, setLoaded] = useState(false);
  const [notAuthorized] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setLoaded(true);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) return null;

  // ── State C: Not authorized ──────────────────────────────────────────────
  if (notAuthorized) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: black,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Space Mono', monospace",
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 400 }}>
          <div style={{ width: 32, height: 1, background: gold, margin: '0 auto 24px' }} />
          <p style={{ fontSize: 9, letterSpacing: '0.45em', color: gold, textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
            // ACCESS DENIED
          </p>
          <p style={{ fontSize: 11, color: 'rgba(242,235,217,0.55)', lineHeight: 1.8, marginBottom: 32 }}>
            This link was issued to a different email address. Please sign in with the address you received the invitation on.
          </p>
          <button
            onClick={() => signOut({ redirectUrl: '/' })}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '12px 24px',
              border: `1px solid ${gold}`,
              color: gold,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // ── State B: Signed in ───────────────────────────────────────────────────
  if (isSignedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: black, fontFamily: "'Space Mono', monospace", display: 'flex', flexDirection: 'column' }}>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            backgroundColor: 'rgba(6,8,8,0.95)',
            flexShrink: 0,
          }}
        >
          <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.02em', color: white }}>ZUNGU</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: 11, color: gold, border: `1px solid rgba(200,168,75,0.4)`, padding: '0.2rem 0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {navLabel}
            </span>
            <button
              onClick={() => signOut({ redirectUrl: '/' })}
              style={{ fontSize: 10, color: muted, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, fontFamily: "'Space Mono', monospace" }}
            >
              Sign Out
            </button>
          </div>
        </nav>

        {loaded && (
          <iframe
            src="/api/deck-html"
            style={{ flex: 1, border: 'none', width: '100%', minHeight: 'calc(100vh - 57px)' }}
            title="Zungu Festival Deck"
          />
        )}
      </div>
    );
  }

  // ── State A: Auth modal ──────────────────────────────────────────────────
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
        /* Hide all Clerk chrome we don't want */
        [class*="cl-header"],[class*="cl-cardHeader"],
        [class*="cl-socialButtons"],[class*="cl-divider"],
        [class*="cl-badge"],[data-localization-key="badge__devMode"],
        [class*="cl-internal-b3fm6y"],[class*="cl-devBrowser"],
        [class*="cl-alternativeMethods"],
        [class*="cl-formFieldAction"],
        [class*="cl-footerPages"],
        [class*="cl-powered"],
        [data-localization-key*="signIn.start.actionLink__use"],
        [data-localization-key*="footer.poweredBy"]
        { display: none !important; }

        [class*="cl-formFieldLabel"],[class*="cl-label"] {
          font-family: 'Space Mono', monospace !important;
          font-size: 9px !important; letter-spacing: 0.3em !important;
          text-transform: uppercase !important; color: #C8A84B !important; font-weight: 700 !important;
        }
        [class*="cl-formFieldInput"] {
          background: rgba(6,8,8,0.95) !important;
          border: 1px solid rgba(200,168,75,0.22) !important;
          color: #F7F3EC !important; font-family: 'Space Mono', monospace !important;
          font-size: 11px !important; border-radius: 0 !important; box-shadow: none !important;
        }
        [class*="cl-formFieldInput"]:focus { border-color: #C8A84B !important; outline: none !important; box-shadow: none !important; }
        [class*="cl-formFieldInput"]::placeholder { color: rgba(242,235,217,0.28) !important; opacity: 1 !important; }
        [class*="cl-formButtonPrimary"] {
          background: #C8A84B !important; color: #060808 !important;
          font-family: 'Space Mono', monospace !important; font-size: 9px !important;
          font-weight: 700 !important; letter-spacing: 0.35em !important;
          text-transform: uppercase !important; border-radius: 0 !important; box-shadow: none !important;
        }
        [class*="cl-formButtonPrimary"]:hover { background: #dab84e !important; box-shadow: none !important; }
        [class*="cl-rootBox"] * { font-family: 'Space Mono', monospace !important; }
        [class*="cl-card"] { background: transparent !important; box-shadow: none !important; border: none !important; }
        [class*="cl-formFieldHintText"],[class*="cl-formFieldErrorText"] {
          font-family: 'Space Mono', monospace !important; font-size: 9px !important; color: #C45A2A !important;
        }
        [class*="cl-footer"] { background: transparent !important; border: none !important; padding-top: 1rem !important; }
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

      {/* Role-specific background photo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${cfg.photo}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.6) brightness(0.15)',
          opacity: 0.9,
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(6,8,8,0.5) 0%, rgba(6,8,8,0.92) 75%)',
        }}
      />

      {/* Branding */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 5.5rem)',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: gold, fontSize: 10, letterSpacing: '0.4em', fontWeight: 700, textTransform: 'uppercase' }}>
          <span>Navy Island</span>
          <div style={{ width: 4, height: 4, transform: 'rotate(45deg)', backgroundColor: rust }} />
          <span>MMXXVII</span>
        </div>
      </div>

      {/* Role badge + copy */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <span
          style={{
            fontSize: 9,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: gold,
            border: `1px solid rgba(200,168,75,0.4)`,
            padding: '0.3rem 0.85rem',
          }}
        >
          {cfg.badge}
        </span>
        <p
          style={{
            fontSize: 10,
            color: 'rgba(242,235,217,0.5)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            maxWidth: 340,
            lineHeight: 1.7,
          }}
        >
          {cfg.copy}
        </p>
      </div>

      {/* Clerk sign-up — inline, no redirect */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 360 }}>
        <SignUp
          routing="hash"
          signInUrl="/sign-in"
          forceRedirectUrl={`/deck?role=${role}`}
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

export default function DeckPage() {
  return (
    <Suspense>
      <DeckContent />
    </Suspense>
  );
}
