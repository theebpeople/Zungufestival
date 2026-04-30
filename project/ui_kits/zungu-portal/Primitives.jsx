// Shared deck primitives — section labels, chapter intros, quotes, stat rows.
// Style values lifted directly from zungu-deck-v3 - FINAL.html.

const Z = {
  txt:     (s) => ({ fontFamily: "'Space Mono', monospace", ...s }),
  display: (s) => ({ fontFamily: "'Unbounded', sans-serif", ...s }),
};

function SLabel({ children }) {
  return (
    <p style={Z.txt({ fontSize: 9, letterSpacing: '0.6em', color: C.gold,
      textTransform: 'uppercase', marginBottom: 36,
      display: 'flex', alignItems: 'center', gap: 14 })}>
      <span style={{ width: 28, height: 1, background: C.gold, flexShrink: 0 }} />
      {children}
    </p>
  );
}

function STitle({ children, style = {} }) {
  return (
    <h2 style={Z.display({ fontSize: 'clamp(24px, 4vw, 54px)', fontWeight: 700,
      lineHeight: 1.02, letterSpacing: '-0.025em', marginBottom: 28,
      color: C.cream, ...style })}>
      {children}
    </h2>
  );
}

function Body({ children, style = {} }) {
  return (
    <p style={Z.txt({ fontSize: 13, lineHeight: 1.9,
      color: 'rgba(242,235,217,0.45)', maxWidth: 680, marginBottom: 18, ...style })}>
      {children}
    </p>
  );
}

function Chapter({ num, eyebrow, title, sub, anchor }) {
  return (
    <div id={anchor} data-section style={{ padding: '120px 6vw 56px',
      borderTop: num === '01' ? 'none' : '1px solid rgba(200,168,75,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={Z.display({ fontSize: 88, fontWeight: 900,
          color: 'rgba(200,168,75,0.08)', lineHeight: 1, flexShrink: 0 })}>{num}</div>
        <div>
          <div style={Z.txt({ fontSize: 8, letterSpacing: '0.6em', color: C.gold,
            textTransform: 'uppercase', marginBottom: 8 })}>{eyebrow}</div>
          <div style={Z.display({ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700,
            color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em' })}>{title}</div>
          {sub && <div style={Z.txt({ fontSize: 11, color: 'rgba(242,235,217,0.45)',
            marginTop: 10, lineHeight: 1.7, maxWidth: 540 })}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

function Quote({ children, attr }) {
  return (
    <blockquote style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: 32,
      margin: 0, maxWidth: 780 }}>
      <p style={Z.display({ fontSize: 'clamp(18px, 2.4vw, 28px)', fontWeight: 300,
        lineHeight: 1.4, color: C.cream, fontStyle: 'italic',
        letterSpacing: '-0.01em', marginBottom: 18 })}>"{children}"</p>
      <footer style={Z.txt({ fontSize: 9, letterSpacing: '0.4em', color: C.gold,
        textTransform: 'uppercase' })}>— {attr}</footer>
    </blockquote>
  );
}

function StatRow({ items }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap',
      borderTop: '1px solid rgba(200,168,75,0.1)',
      borderBottom: '1px solid rgba(200,168,75,0.1)', margin: '40px 0' }}>
      {items.map((it, i) => (
        <div key={i} style={{ flex: '1 1 200px', padding: '24px 28px',
          borderRight: i < items.length - 1 ? '1px solid rgba(200,168,75,0.08)' : 'none' }}>
          <div style={Z.display({ fontSize: 32, fontWeight: 900, color: C.cream,
            letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 })}>{it.num}</div>
          <div style={Z.txt({ fontSize: 8, letterSpacing: '0.35em',
            color: 'rgba(242,235,217,0.45)', textTransform: 'uppercase' })}>{it.label}</div>
        </div>
      ))}
    </div>
  );
}

function MapShell({ src, caption, height = 420 }) {
  return (
    <>
      <div style={{ width: '100%', height, marginTop: 24,
        border: '1px solid rgba(200,168,75,0.15)', background: '#0D1F14',
        position: 'relative', overflow: 'hidden' }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%',
          objectFit: 'cover', filter: 'saturate(0.7) brightness(0.6)' }} />
      </div>
      {caption && <p style={Z.txt({ fontSize: 8, color: 'rgba(242,235,217,0.18)',
        marginTop: 8, letterSpacing: '0.2em', textTransform: 'uppercase' })}>{caption}</p>}
    </>
  );
}

Object.assign(window, { Z, SLabel, STitle, Body, Chapter, Quote, StatRow, MapShell });
