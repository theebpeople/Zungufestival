'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import DeckContentComponent from './DeckContent';

const NAV_LABELS: Record<string, string> = {
  investor: 'Investor Deck',
  partner: 'Partner Brief',
  stakeholder: 'Stakeholder Brief',
  press: 'Press Materials',
};

const VALID_ROLES = ['investor', 'partner', 'press', 'stakeholder'];

function DeckGate() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const metaRole = user?.publicMetadata?.role as string | undefined;
  const urlRole = searchParams.get('role') ?? '';
  const rawRole = metaRole || (urlRole === 'supplier' ? 'stakeholder' : urlRole) || 'investor';
  const role = VALID_ROLES.includes(rawRole) ? rawRole : 'investor';
  const navLabel = NAV_LABELS[role] ?? 'Investor Deck';

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace(`/sign-in?role=${role}`);
    }
  }, [isLoaded, isSignedIn, role, router]);

  if (!isLoaded || !isSignedIn) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#060600', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <img src="/zungu-z-mark.png" alt="Zungu" style={{ width: 48, height: 48, objectFit: 'contain', filter: 'drop-shadow(0 0 16px rgba(200,168,75,0.35))', opacity: 0.85 }} />
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(200,168,75,0.5)', margin: 0 }}>Loading secure deck…</p>
    </div>
  );

  return <DeckContentComponent navLabel={navLabel} role={role} />;
}

export default function DeckPage() {
  return (
    <Suspense>
      <DeckGate />
    </Suspense>
  );
}
