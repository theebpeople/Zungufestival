// CHAPTER 05 — THE ASK. Copy verbatim from deck.

function ChapterAsk() {
  return (
    <>
      <Chapter num="05" eyebrow="Chapter Five" title="The Ask." anchor="s-cta"
        sub="What Zungu needs. From whom. When." />

      <section style={{ padding: '60px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>Three Conversations</SLabel>
        <STitle>What Zungu needs. <span style={{ color: C.gold }}>From whom. When.</span></STitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 1, marginTop: 36, background: 'rgba(200,168,75,0.08)' }}>
          {[
            { n: '01', when: 'Now',         who: 'Lead Capital Partner',    what: 'Anchor investment for site agreement + headline confirmation. $1.2M.' },
            { n: '02', when: 'By Q4 2026',  who: 'Production Partners',     what: 'Stage, sound, hospitality. Day-rate or equity.' },
            { n: '03', when: 'By March 27', who: 'Cultural / Press Allies', what: 'Editorial coverage, brand alignment, distribution into the audience.' },
          ].map((c) => (
            <div key={c.n} style={{ background: C.bg, padding: 32 }}>
              <div style={Z.display({ fontSize: 36, fontWeight: 900,
                color: 'rgba(200,168,75,0.18)', lineHeight: 1, marginBottom: 18 })}>{c.n}</div>
              <div style={Z.txt({ fontSize: 9, letterSpacing: '0.4em', color: C.gold,
                textTransform: 'uppercase', marginBottom: 10 })}>{c.when}</div>
              <div style={Z.display({ fontSize: 16, fontWeight: 700, color: C.cream,
                marginBottom: 12 })}>{c.who}</div>
              <div style={Z.txt({ fontSize: 12, color: 'rgba(242,235,217,0.55)',
                lineHeight: 1.75 })}>{c.what}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 6vw 120px', maxWidth: 760, margin: '0 auto' }}>
        <SLabel>Confirm Interest</SLabel>
        <STitle>First edition. <span style={{ color: C.gold }}>One conversation.</span></STitle>
        <Body style={{ marginBottom: 36 }}>
          We're talking to a small number of partners who fit. Tell us where you see
          yourself.
        </Body>

        <form onSubmit={(e) => { e.preventDefault(); alert('Sent. We\'ll be in touch.'); }}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            { label: 'Name',    ph: 'YOUR NAME' },
            { label: 'Email',   ph: 'YOU@EMAIL.COM' },
            { label: 'Entity',  ph: 'COMPANY OR FUND' },
          ].map((f) => (
            <div key={f.label}>
              <label style={Z.txt({ display: 'block', fontSize: 9,
                letterSpacing: '0.35em', color: 'rgba(242,235,217,0.45)',
                textTransform: 'uppercase', marginBottom: 8 })}>{f.label}</label>
              <input placeholder={f.ph}
                style={Z.txt({ width: '100%', background: 'rgba(4,8,10,0.95)',
                  border: '1px solid rgba(200,168,75,0.15)', color: C.cream,
                  fontSize: 13, padding: '14px 16px', outline: 'none',
                  borderRadius: 0, transition: 'border-color 200ms' })}
                onFocus={(e) => e.target.style.borderColor = 'rgba(200,168,75,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(200,168,75,0.15)'} />
            </div>
          ))}
          <div>
            <label style={Z.txt({ display: 'block', fontSize: 9,
              letterSpacing: '0.35em', color: 'rgba(242,235,217,0.45)',
              textTransform: 'uppercase', marginBottom: 8 })}>Where do you see yourself</label>
            <textarea rows={4} placeholder="CAPITAL · PRODUCTION · CULTURAL · OTHER"
              style={Z.txt({ width: '100%', background: 'rgba(4,8,10,0.95)',
                border: '1px solid rgba(200,168,75,0.15)', color: C.cream,
                fontSize: 13, padding: '14px 16px', outline: 'none',
                borderRadius: 0, lineHeight: 1.6, resize: 'vertical',
                transition: 'border-color 200ms' })}
              onFocus={(e) => e.target.style.borderColor = 'rgba(200,168,75,0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(200,168,75,0.15)'} />
          </div>
          <button type="submit"
            style={Z.txt({ marginTop: 12, padding: '18px 28px', background: C.gold,
              color: C.bg, border: 'none', cursor: 'crosshair',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
              textTransform: 'uppercase', borderRadius: 0,
              transition: 'filter 220ms', alignSelf: 'flex-start' })}
            onMouseEnter={(e) => e.target.style.filter = 'brightness(1.1)'}
            onMouseLeave={(e) => e.target.style.filter = ''}>
            Send →
          </button>
        </form>
      </section>
    </>
  );
}
window.ChapterAsk = ChapterAsk;
