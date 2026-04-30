function GateView({ onRole }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '32px', textAlign: 'center', background: C.bg,
      fontFamily: "'Space Mono', monospace" }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url("../../assets/navy-island-aerial.png")',
        backgroundSize: 'cover', backgroundPosition: 'center 55%',
        filter: 'saturate(0.7) brightness(0.45)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(6,8,8,1) 0%, rgba(6,8,8,0.75) 25%, rgba(6,8,8,0.1) 55%, rgba(6,8,8,0.4) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(circle at center, rgba(200,168,75,0.06) 0%, transparent 70%)' }} />
      <div style={{ position: 'relative', zIndex: 10, marginBottom: 56,
        display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ fontSize: 9, letterSpacing: '0.6em', color: C.gold,
          textTransform: 'uppercase', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 14,
          fontFamily: "'Space Mono', monospace" }}>
          <span style={{ width: 28, height: 1, background: C.gold }} />
          Navy Island · Port Antonio · Jamaica · June 17–23, 2027
          <span style={{ width: 28, height: 1, background: C.gold }} />
        </p>
        <img src="../../assets/zungu-z-mark.png" alt="Zungu"
          style={{ width: 'min(110px, 20vw)', height: 'auto', marginBottom: 28,
            filter: 'drop-shadow(0 0 32px rgba(200,168,75,0.5))' }} />
        <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 900,
          fontSize: 'clamp(2rem, 5vw, 4.8rem)', lineHeight: 0.9,
          letterSpacing: '-0.02em', color: '#F7F3EC',
          textTransform: 'uppercase', textAlign: 'center' }}>
          ZUNGU<em style={{ color: C.gold, fontStyle: 'normal', display: 'block' }}>FESTIVAL</em>
          <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 300,
            fontSize: 'clamp(11px, 1.4vw, 18px)', color: 'rgba(247,243,236,0.32)',
            letterSpacing: '0.3em', marginTop: 10, display: 'block' }}>MMXXVII</span>
        </h1>
      </div>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 480, width: '100%' }}>
        <p style={{ fontSize: 11, fontStyle: 'italic', fontWeight: 700,
          letterSpacing: '0.35em', textTransform: 'uppercase', color: C.muted, marginBottom: 48 }}>
          // ACCESS AUTHORIZATION REQUIRED
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 320, margin: '0 auto' }}>
          <Button onClick={() => onRole('investor')}  variant="primary"   style={{ width: '100%' }}>Investor Entrance</Button>
          <Button onClick={() => onRole('supplier')}  variant="secondary" style={{ width: '100%' }}>Production &amp; Logistics</Button>
          <Button onClick={() => onRole('attendee')}  variant="secondary" style={{ width: '100%' }}>General Admission</Button>
        </div>
      </div>
    </div>
  );
}
window.GateView = GateView;
