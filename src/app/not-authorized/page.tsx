export default function NotAuthorizedPage() {
  const gold = '#C8A84B';
  const black = '#060808';
  const white = '#F7F3EC';
  const muted = '#6B6355';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: black,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Mono', monospace",
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <img
        src="/zungu-z-mark.png"
        alt="Zungu"
        style={{ width: 48, height: 48, objectFit: 'contain', marginBottom: '2rem', opacity: 0.5 }}
      />
      <p style={{ fontSize: 12, color: muted, letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
        // Access Denied
      </p>
      <h1
        style={{
          fontFamily: "'Unbounded', sans-serif",
          fontSize: 'clamp(2rem, 8vw, 5rem)',
          color: white,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: '1.5rem',
        }}
      >
        Not<br />Authorized
      </h1>
      <p style={{ fontSize: 14, color: muted, maxWidth: 360, lineHeight: 1.8, marginBottom: '2rem' }}>
        Your email address is not on the access list. If you received an invite, ensure you are signing in with the exact email the link was generated for.
      </p>
      <p style={{ fontSize: 13, color: muted, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>
        Contact{' '}
        <a href="mailto:partnership@zungufestival.com" style={{ color: gold, textDecoration: 'none' }}>
          partnership@zungufestival.com
        </a>
      </p>
      <a
        href="/sign-out"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: muted,
          textDecoration: 'none',
          fontWeight: 700,
          padding: '10px 24px',
          border: '1px solid rgba(107,99,85,0.3)',
        }}
      >
        Sign Out
      </a>
    </div>
  );
}
