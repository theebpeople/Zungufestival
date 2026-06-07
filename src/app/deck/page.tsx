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

  if (!isLoaded || !isSignedIn) return null;

  return <DeckContentComponent navLabel={navLabel} role={role} />;
}

export default function DeckPage() {
  return (
    <Suspense>
      <DeckGate />
    </Suspense>
  );
}
