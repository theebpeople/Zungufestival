export default function NotAuthorizedPage() {
  const gold = '#C8A84B';
  const black = '#04080A';
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
        style={{ width: 72, height: 'auto', marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(200,168,75,0.35))', opacity: 0.7 }}
      />
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
      <p style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontSize: 13, color: muted, maxWidth: 400, lineHeight: 1.7, marginBottom: '2rem' }}>
        Your email address is not authorized for this briefing portal. If you received an invite, sign in with the exact email address assigned to your access link. For access issues, contact partnership@zungufestival.com
      </p>
      <a
        href="/sign-in"
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
        Return to Sign In
      </a>
    </div>
  );
}
