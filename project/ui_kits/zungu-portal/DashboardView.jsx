// Dashboard — copy + structure lifted directly from zungu-deck-v3 - FINAL.html
function DashboardView({ role, onReset }) {
  const [progress, setProgress] = React.useState(0);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
      setScrolled(el.scrollTop > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const txt = (s) => ({ fontFamily: "'Space Mono', monospace", ...s });
  const display = (s) => ({ fontFamily: "'Unbounded', sans-serif", ...s });

  // Deck navigation labels
  const navLinks = [
    { label: 'The Island', href: '#s-island' },
    { label: 'Why Now', href: '#s-why' },
    { label: 'The Model', href: '#s-model' },
    { label: 'Numbers', href: '#s-numbers' },
  ];

  // Site stats — verbatim from deck
  const stats = [
    { num: '64',     label: 'Acres · Navy Island' },
    { num: '~5 min', label: 'Water crossing from mainland' },
    { num: '0',      label: 'Comparable sites in the Caribbean' },
    { num: '5,000',  label: 'Capacity · hard cap' },
  ];

  return (
    <div data-screen-label={`Zungu · dashboard · ${role}`}
      style={{ minHeight: '100vh', background: C.bg, color: C.cream,
        fontFamily: "'Space Mono', monospace" }}>

      {/* Top progress bar — deck #prog */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: 2, background: C.gold,
        zIndex: 2000, width: `${progress}%`, transition: 'width 100ms linear' }} />

      {/* Sticky 52px nav — deck .nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 52, zIndex: 1000,
        background: 'rgba(6,8,8,0.93)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(200,168,75,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 6vw' }}>
        <img src="../../assets/zungu-z-mark.png" alt="Z"
          style={{ height: 30, width: 'auto', cursor: 'crosshair',
            filter: 'drop-shadow(0 0 10px rgba(200,168,75,0.3))' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <div style={{ display: 'flex' }}>
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href}
              style={txt({ fontSize: 8, letterSpacing: '0.4em', color: 'rgba(242,235,217,0.45)',
                textTransform: 'uppercase', padding: '0 14px', height: 52,
                display: 'flex', alignItems: 'center', textDecoration: 'none',
                borderLeft: '1px solid rgba(200,168,75,0.07)',
                transition: 'color 200ms, background 200ms' })}
              onMouseEnter={e => { e.target.style.color = C.gold;
                e.target.style.background = 'rgba(200,168,75,0.04)'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(242,235,217,0.45)';
                e.target.style.background = 'transparent'; }}>{label}</a>
          ))}
          <button onClick={onReset}
            style={txt({ fontSize: 8, letterSpacing: '0.4em', color: C.gold,
              textTransform: 'uppercase', padding: '0 14px', height: 52,
              background: 'none', border: 'none',
              borderLeft: '1px solid rgba(200,168,75,0.07)',
              cursor: 'crosshair', fontFamily: "'Space Mono', monospace",
              transition: 'background 200ms' })}
            onMouseEnter={e => (e.target.style.background = 'rgba(200,168,75,0.04)')}
            onMouseLeave={e => (e.target.style.background = 'transparent')}>
            Sign Out →
          </button>
        </div>
      </nav>

      {/* HERO — deck #hero */}
      <section id="hero" style={{ height: '100vh', position: 'relative',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 0 100px' }}>
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'url("../../assets/navy-island-aerial.png")',
          backgroundSize: 'cover', backgroundPosition: 'center 55%',
          transform: scrolled ? 'scale(1)' : 'scale(1.05)',
          transition: 'transform 10s cubic-bezier(.25,.46,.45,.94)',
          filter: 'saturate(.7) brightness(.45)' }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(6,8,8,1) 0%, rgba(6,8,8,.75) 25%, rgba(6,8,8,.1) 55%, rgba(6,8,8,.4) 100%), linear-gradient(to right, rgba(6,8,8,.7) 0%, transparent 55%)' }} />

        <div style={{ position: 'relative', zIndex: 2, padding: '0 8vw' }}>
          <p style={txt({ fontSize: 9, letterSpacing: '0.6em', color: C.gold,
            textTransform: 'uppercase', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 14,
            opacity: 0, animation: 'zfadeUp 1s ease 0.3s forwards' })}>
            <span style={{ width: 28, height: 1, background: C.gold }} />
            Navy Island &nbsp;·&nbsp; Port Antonio &nbsp;·&nbsp; Jamaica &nbsp;·&nbsp; June 17–23, 2027
          </p>
          <img src="../../assets/zungu-z-mark.png" alt="Zungu"
            style={{ width: 'min(110px, 20vw)', height: 'auto', display: 'block',
              marginBottom: 28, filter: 'drop-shadow(0 0 32px rgba(200,168,75,0.5))',
              opacity: 0, animation: 'zfadeUp 1s ease 0.45s forwards' }} />
          <h1 style={display({ fontSize: 'clamp(2rem, 5vw, 4.8rem)', fontWeight: 900,
            lineHeight: 0.9, letterSpacing: '-0.02em', color: '#F7F3EC',
            textTransform: 'uppercase',
            opacity: 0, animation: 'zfadeUp 1s ease 0.55s forwards' })}>
            ZUNGU<em style={{ color: C.gold, fontStyle: 'normal', display: 'block' }}>FESTIVAL</em>
            <span style={display({ fontSize: 'clamp(11px, 1.4vw, 18px)', fontWeight: 300,
              color: 'rgba(247,243,236,0.32)', letterSpacing: '0.3em',
              marginTop: 10, display: 'block' })}>MMXXVII</span>
          </h1>
          <p style={txt({ fontSize: 13, lineHeight: 1.8, color: 'rgba(242,235,217,0.45)',
            maxWidth: 420, marginTop: 24,
            opacity: 0, animation: 'zfadeUp 1s ease 0.7s forwards' })}>
            A 64-acre private island in the Caribbean. <strong style={{ color: C.gold,
              fontWeight: 400 }}>No other festival has this site.</strong> You arrive
            by boat. Before a note plays, you're already somewhere else.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 44, flexWrap: 'wrap',
            opacity: 0, animation: 'zfadeUp 1s ease 0.85s forwards' }}>
            <a href="#s-island"
              style={txt({ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em',
                textTransform: 'uppercase', color: C.bg, background: C.gold,
                padding: '16px 28px', textDecoration: 'none',
                transition: 'all 220ms', cursor: 'crosshair' })}
              onMouseEnter={e => (e.target.style.filter = 'brightness(1.1)')}
              onMouseLeave={e => (e.target.style.filter = '')}>
              Request Briefing →
            </a>
            <a href="#s-island"
              style={txt({ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em',
                textTransform: 'uppercase', color: C.cream,
                border: '1px solid rgba(242,235,217,0.2)',
                padding: '16px 28px', textDecoration: 'none',
                transition: 'all 220ms', cursor: 'crosshair' })}
              onMouseEnter={e => (e.target.style.borderColor = C.gold)}
              onMouseLeave={e => (e.target.style.borderColor = 'rgba(242,235,217,0.2)')}>
              Explore ↓
            </a>
          </div>
        </div>

        {/* Hero stat strip — deck .hero-stats */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
          padding: '20px 8vw', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', borderTop: '1px solid rgba(200,168,75,0.08)',
          opacity: 0, animation: 'zfadeIn 1s ease 1.1s forwards' }}>
          {stats.map(({ num, label }, i) => (
            <div key={i}>
              <div style={display({ fontSize: 24, fontWeight: 900, color: C.cream,
                letterSpacing: '-0.02em', lineHeight: 1 })}>{num}</div>
              <div style={txt({ fontSize: 8, letterSpacing: '0.35em',
                color: 'rgba(242,235,217,0.45)', textTransform: 'uppercase',
                marginTop: 6 })}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER ONE — The Island */}
      <div id="s-island" style={{ padding: '120px 6vw 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={display({ fontSize: 88, fontWeight: 900,
            color: 'rgba(200,168,75,0.08)', lineHeight: 1, flexShrink: 0 })}>01</div>
          <div>
            <div style={txt({ fontSize: 8, letterSpacing: '0.6em', color: C.gold,
              textTransform: 'uppercase', marginBottom: 8 })}>Chapter One</div>
            <div style={display({ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700,
              color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em' })}>
              The Island.
            </div>
            <div style={txt({ fontSize: 11, color: 'rgba(242,235,217,0.45)',
              marginTop: 10, lineHeight: 1.7, maxWidth: 540 })}>
              Navy Island. Port Antonio, Jamaica. 64 acres. The site that makes
              everything else possible.
            </div>
          </div>
        </div>
      </div>

      <section style={{ padding: '60px 6vw 120px', maxWidth: 1200, margin: '0 auto' }}>
        <p style={txt({ fontSize: 9, letterSpacing: '0.6em', color: C.gold,
          textTransform: 'uppercase', marginBottom: 36,
          display: 'flex', alignItems: 'center', gap: 14 })}>
          <span style={{ width: 28, height: 1, background: C.gold }} />
          The Site
        </p>
        <h2 style={display({ fontSize: 'clamp(24px, 4vw, 54px)', fontWeight: 700,
          lineHeight: 1.02, letterSpacing: '-0.025em', marginBottom: 28,
          color: C.cream })}>
          Nobody has done this<br />in the Caribbean. <span style={{ color: C.gold }}>Yet.</span>
        </h2>
        <p style={txt({ fontSize: 13, lineHeight: 1.9, color: 'rgba(242,235,217,0.45)',
          maxWidth: 680, marginBottom: 18 })}>
          Navy Island sits in Port Antonio's West Harbour. 64 acres. Surrounded by water
          on every side. The Errol Flynn Marina is the departure point — a five-minute
          crossing that is the first act of the experience. Before a single artist is
          announced, you're already arriving somewhere extraordinary.
        </p>
        <p style={txt({ fontSize: 13, lineHeight: 1.9, color: 'rgba(242,235,217,0.45)',
          maxWidth: 680, marginBottom: 36 })}>
          Tomorrowland spent millions building a fantasy world. <em style={{ color: C.cream }}>
          Zungu doesn't need to build one. The world is already there.</em>
        </p>

        {/* Map shell — deck .map-shell */}
        <div style={{ width: '100%', height: 420,
          border: '1px solid rgba(200,168,75,0.15)', background: '#0D1F14',
          position: 'relative', overflow: 'hidden', marginTop: 24 }}>
          <img src="../../assets/navy-island-aerial.png" alt="Navy Island"
            style={{ width: '100%', height: '100%', objectFit: 'cover',
              filter: 'saturate(0.7) brightness(0.6)' }} />
        </div>
        <p style={txt({ fontSize: 8, color: 'rgba(242,235,217,0.18)', marginTop: 8,
          letterSpacing: '0.2em', textTransform: 'uppercase' })}>
          Navy Island · Port Antonio West Harbour · Portland Parish, Jamaica
        </p>
      </section>

      {/* WHY NOW chapter */}
      <div id="s-why" style={{ padding: '56px 6vw',
        borderTop: '1px solid rgba(200,168,75,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={display({ fontSize: 88, fontWeight: 900,
            color: 'rgba(200,168,75,0.08)', lineHeight: 1 })}>02</div>
          <div>
            <div style={txt({ fontSize: 8, letterSpacing: '0.6em', color: C.gold,
              textTransform: 'uppercase', marginBottom: 8 })}>Chapter Two</div>
            <div style={display({ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700,
              color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em' })}>
              Why Now.
            </div>
          </div>
        </div>
      </div>

      <section style={{ padding: '60px 6vw 120px', maxWidth: 1200, margin: '0 auto' }}>
        <blockquote style={{ borderLeft: `3px solid ${C.gold}`,
          paddingLeft: 32, margin: 0, maxWidth: 720 }}>
          <p style={display({ fontSize: 'clamp(18px, 2.4vw, 28px)', fontWeight: 300,
            lineHeight: 1.4, color: C.cream, fontStyle: 'italic',
            letterSpacing: '-0.01em', marginBottom: 18 })}>
            "Tomorrowland built a fantasy world. Zungu doesn't need to build anything.
            The world is already there."
          </p>
          <footer style={txt({ fontSize: 9, letterSpacing: '0.4em', color: C.gold,
            textTransform: 'uppercase' })}>— Site Strategy</footer>
        </blockquote>
      </section>

      {/* Footer */}
      <footer style={{ padding: '64px 6vw', textAlign: 'center',
        borderTop: '1px solid rgba(200,168,75,0.08)' }}>
        <img src="../../assets/zungu-z-mark.png" alt="" style={{ height: 36,
          marginBottom: 16, opacity: 0.7 }} />
        <p style={txt({ fontSize: 9, letterSpacing: '0.6em',
          color: 'rgba(242,235,217,0.45)', textTransform: 'uppercase',
          marginBottom: 32 })}>Port Antonio · Jamaica · MMXXVII</p>
        <button onClick={onReset}
          style={txt({ background: 'none', cursor: 'crosshair',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.4em',
            textTransform: 'uppercase', color: C.gold,
            border: 'none', borderBottom: `1px solid ${C.gold}55`,
            paddingBottom: 4, fontFamily: "'Space Mono', monospace" })}>
          ← Reset Session
        </button>
      </footer>
    </div>
  );
}
window.DashboardView = DashboardView;
