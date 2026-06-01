'use client';

import { useAuth } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import DeckContentComponent from './DeckContent';

const NAV_LABELS: Record<string, string> = {
  investor: 'Investor Deck',
  partner: 'Partner Brief',
  supplier: 'Supplier Brief',
  press: 'Press Materials',
};

function DeckGate() {
  const { isLoaded, isSignedIn } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role') ?? 'investor';
  const navLabel = NAV_LABELS[role] ?? 'Investor Deck';

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace(`/sign-in?role=${role}`);
    }
  }, [isLoaded, isSignedIn, role, router]);

  if (!isLoaded || !isSignedIn) return null;

  return <DeckContentComponent navLabel={navLabel} />;
}

export default function DeckPage() {
  return (
    <Suspense>
      <DeckGate />
    </Suspense>
  );
}
