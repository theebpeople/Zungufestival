function InputField({ label, type = 'text', placeholder, options, defaultValue }) {
  const fill = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: C.cream, fontFamily: "'Space Mono', monospace", fontSize: 12,
    padding: 16, letterSpacing: '0.1em', textTransform: 'uppercase',
    outline: 'none', borderRadius: 0, width: '100%' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
          letterSpacing: '0.25em', textTransform: 'uppercase', color: C.gold }}>{label}</label>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: C.muted }}>[REQUIRED]</span>
      </div>
      {type === 'select' ? (
        <select defaultValue="" style={{ ...fill, appearance: 'none', cursor: 'crosshair' }}>
          <option value="" style={{ background: C.bg, color: C.cream }}>SELECT ONE</option>
          {options.map(o => <option key={o} value={o} style={{ background: C.bg, color: C.cream }}>{o}</option>)}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} defaultValue={defaultValue}
          style={fill}
          onFocus={e => (e.target.style.borderColor = C.gold)}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
      )}
    </div>
  );
}
window.InputField = InputField;
