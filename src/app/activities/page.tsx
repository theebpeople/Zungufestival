'use client';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const black = '#060808';

export default function ActivitiesPage() {
  const { isLoaded, isSignedIn } = useAuth();
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
    <div style={{ minHeight: '100vh', backgroundColor: black }}>
      {loaded && (
        <iframe
          src="/api/activities-html"
          style={{ border: 'none', width: '100%', height: '100vh', display: 'block' }}
          title="Zungu Activity Programme"
        />
      )}
    </div>
  );
}
