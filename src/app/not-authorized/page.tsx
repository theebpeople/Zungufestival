'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NotAuthorizedPage() {
  const router = useRouter();

  return (
    <div style={{
      backgroundColor: '#04080A', color: '#F2EBD9',
      fontFamily: "'Space Mono', monospace",
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 8vw', textAlign: 'center',
    }}>
      <Image
        src="/logo-z.png" alt="Zungu" width={56} height={56}
        style={{ marginBottom: '40px', filter: 'drop-shadow(0 0 16px rgba(200,168,75,0.3))' }}
      />
      <p style={{
        fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase',
        color: 'rgba(242,235,217,0.3)', marginBottom: '24px',
      }}>
        Access Restricted
      </p>
      <h1 style={{
        fontFamily: "'Unbounded', sans-serif",
        fontSize: 'clamp(22px, 4vw, 42px)', fontWeight: 700,
        lineHeight: 1.1, marginBottom: '20px', color: '#F7F3EC',
      }}>
        This is a private portal.
      </h1>
      <p style={{
        fontSize: '14px', lineHeight: 1.8,
        color: 'rgba(242,235,217,0.5)', maxWidth: '480px', marginBottom: '36px',
      }}>
        Your email address is not on the access list. To request access,
        contact{' '}
        <a
          href="mailto:access@zungufestival.com"
          style={{ color: '#C8A84B', textDecoration: 'none' }}
        >
          access@zungufestival.com
        </a>
        .
      </p>
      <button
        onClick={() => router.push('/')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: '12px 24px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
          fontWeight: 700, cursor: 'pointer',
          background: 'transparent', color: '#C8A84B',
          border: '1px solid rgba(200,168,75,0.3)',
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
}
