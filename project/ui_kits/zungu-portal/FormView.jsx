function FormView({ type, onBack, onSubmit }) {
  const submit = (e) => { e.preventDefault(); onSubmit(); };
  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 24,
      background: C.bg, fontFamily: "'Space Mono', monospace",
      position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url("../../assets/credentials-bg.jpeg")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'saturate(0.7) brightness(0.4)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(6,8,8,0.85) 0%, rgba(6,8,8,0.65) 50%, rgba(6,8,8,0.9) 100%)' }} />
      <div style={{ maxWidth: 720, width: '100%', padding: 64, position: 'relative', zIndex: 2,
        background: 'rgba(6,8,8,0.85)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(200,168,75,0.15)' }}>
        <button onClick={onBack} aria-label="Back"
          style={{ position: 'absolute', top: 30, right: 30, background: 'none',
            border: 'none', color: C.muted, cursor: 'crosshair', padding: 4 }}
          onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
          onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
          <X size={20} />
        </button>
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', marginBottom: 28,
            border: `1px solid ${C.rust}66` }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.35em',
              textTransform: 'uppercase', color: C.rust }}>
              {type === 'investor' ? 'STRATEGIC PARTNER' : 'PRODUCTION UNIT'}
            </h3>
          </div>
          <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 900,
            fontSize: '2.4rem', textTransform: 'uppercase', lineHeight: 1.05,
            letterSpacing: '-0.03em', color: C.white, whiteSpace: 'pre-wrap', marginBottom: 18 }}>
            {type === 'investor' ? 'Patient\nCapital.' : 'Technical\nStandard.'}
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 360, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.05em', color: C.muted }}>
            {type === 'investor'
              ? 'Securing long-term equity in the Portland Parish cultural revitalization project.'
              : 'Registering credentials for the 2027 infrastructure build-out.'}
          </p>
        </div>
        <form onSubmit={submit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 36 }}>
            <InputField label="Entity Name"  placeholder="ENTER IDENTIFIER" />
            <InputField label="Secure Email" placeholder="CONTACT@ZUNGU.COM" type="email" />
            {type === 'investor' ? (
              <>
                <InputField label="Capital Tier"  type="select" options={['$50K – $250K', '$250K – $1M', '$1M+']} />
                <InputField label="Investor Type" type="select" options={['Strategic', 'Individual', 'VC', 'Corporate']} />
              </>
            ) : (
              <>
                <InputField label="Specialization"        type="select" options={['Stage Craft', 'Sound Eng', 'Lighting', 'Talent', 'Logistics']} />
                <InputField label="Reference / Portfolio" placeholder="HTTPS://" />
              </>
            )}
          </div>
          <Button variant="gold" style={{ width: '100%', marginTop: 36, padding: '24px 28px' }}
            onClick={submit}>Submit Credentials</Button>
        </form>
      </div>
    </div>
  );
}
window.FormView = FormView;
