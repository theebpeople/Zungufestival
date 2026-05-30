'use client';
import { useAuth, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const gold = '#C8A84B';
const black = '#060808';
const white = '#F7F3EC';
const muted = '#6B6355';

export default function ActivitiesPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    } else if (isLoaded && isSignedIn) {
      setLoaded(true);
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: black, display: 'flex', flexDirection: 'column' }}>
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
            Activity Programme
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
          src="/api/activities-html"
          style={{ flex: 1, border: 'none', width: '100%', minHeight: 'calc(100vh - 57px)' }}
          title="Zungu Activity Programme"
        />
      )}
    </div>
  );
}
