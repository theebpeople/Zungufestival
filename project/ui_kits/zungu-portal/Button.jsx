function Button({ children, onClick, variant = 'primary', className = '', style = {} }) {
  const base = {
    position: 'relative', padding: '16px 28px', fontWeight: 700,
    fontFamily: "'Space Mono', monospace", fontSize: 11,
    letterSpacing: '0.15em', textTransform: 'uppercase',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    border: '1px solid', borderRadius: 0, cursor: 'crosshair',
    transition: 'all 300ms cubic-bezier(0.22,1,0.36,1)',
  };
  const variants = {
    primary:   { color: C.gold,  borderColor: 'rgba(200,168,75,0.33)', background: 'transparent' },
    secondary: { color: C.white, borderColor: 'rgba(255,255,255,0.2)', background: 'transparent' },
    gold:      { color: C.bg,    borderColor: C.gold,                   background: C.gold },
  };
  const enter = (e) => {
    if (variant === 'primary')   { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.bg; }
    if (variant === 'secondary') { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }
    if (variant === 'gold')      { e.currentTarget.style.filter = 'brightness(1.1)'; }
  };
  const leave = (e) => {
    if (variant === 'primary')   { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.gold; }
    if (variant === 'secondary') { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }
    if (variant === 'gold')      { e.currentTarget.style.filter = ''; }
  };
  return React.createElement('button', {
    onClick, className, style: { ...base, ...variants[variant], ...style },
    onMouseEnter: enter, onMouseLeave: leave,
  }, children);
}
window.Button = Button;
