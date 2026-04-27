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
      <p style={{ fontSize: 10, color: muted, letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
        // ACCESS DENIED
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
      <p style={{ fontSize: 11, color: muted, maxWidth: 320, lineHeight: 1.7, marginBottom: '2.5rem' }}>
        Your email address is not on the access list. If you received an invite, ensure you are signing in with the exact email the link was generated for.
      </p>
      <p style={{ fontSize: 10, color: muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Contact{' '}
        <a href="mailto:partnership@zungufestival.com" style={{ color: gold, textDecoration: 'none' }}>
          partnership@zungufestival.com
        </a>
      </p>
    </div>
  );
}
