// CHAPTER 01 — THE ISLAND. Copy verbatim from zungu-deck-v3 - FINAL.html.

function ChapterIsland() {
  return (
    <>
      <Chapter num="01" eyebrow="Chapter One" title="The Island." anchor="s-island"
        sub="Navy Island. Port Antonio, Jamaica. 64 acres. The site that makes everything else possible." />

      <section style={{ padding: '60px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>The Site</SLabel>
        <STitle>
          Nobody has done this<br />in the Caribbean. <span style={{ color: C.gold }}>Yet.</span>
        </STitle>
        <Body>
          Navy Island sits in Port Antonio's West Harbour. 64 acres. Surrounded by water
          on every side. The Errol Flynn Marina is the departure point — a five-minute
          crossing that is the first act of the experience. Before a single artist is
          announced, you're already arriving somewhere extraordinary.
        </Body>
        <Body>
          Tomorrowland spent millions building a fantasy world.{' '}
          <em style={{ color: C.cream, fontStyle: 'italic' }}>
            Zungu doesn't need to build one. The world is already there.
          </em>{' '}
          No other festival in the Caribbean has a site like this. That is not a
          marketing claim. It is a fact about real estate.
        </Body>

        <StatRow items={[
          { num: '64',     label: 'Acres · Navy Island' },
          { num: '~5 min', label: 'Water crossing from mainland' },
          { num: '0',      label: 'Comparable sites in the Caribbean' },
          { num: '1M JMD', label: 'Daily lease (verbally confirmed)' },
        ]} />
      </section>

      <section style={{ padding: '40px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>Port Antonio</SLabel>
        <STitle>
          The most beautiful town in Jamaica.<br />
          <span style={{ color: C.gold }}>Undiscovered at this scale.</span>
        </STitle>
        <Body>
          Port Antonio sits outside Jamaica's mass tourism corridor. No cruise ships.
          No all-inclusives. No package holiday energy. The town is known by those who
          seek it — which is exactly the audience Zungu is built for.
        </Body>
        <Body style={{ marginBottom: 48 }}>
          This is the Tulum 2017 feeling. A genuinely undiscovered location at exactly
          the moment a world-class event arrives.{' '}
          <em style={{ color: C.cream, fontStyle: 'italic' }}>
            Port Antonio in 2027 is that conversation.
          </em>
        </Body>
        <Quote attr="Site Strategy">
          Tomorrowland built a fantasy world. Zungu doesn't need to build anything.
          The world is already there.
        </Quote>
      </section>

      <section style={{ padding: '40px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>Geographic Context · Navy Island</SLabel>
        <STitle>
          Five minutes <span style={{ color: C.gold }}>from the mainland.</span>
        </STitle>
        <Body>
          Navy Island sits in Port Antonio's West Harbour. The Errol Flynn Marina is
          the departure point. The crossing is the first act of arrival.
        </Body>
        <MapShell src="../../assets/navy-island-aerial.png"
          caption="Navy Island · Port Antonio West Harbour · Portland Parish, Jamaica" />
      </section>

      <section style={{ padding: '40px 6vw 100px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>Stage Placement · Navy Island</SLabel>
        <STitle>
          Three stages. <span style={{ color: C.gold }}>One island.</span>
        </STitle>
        <Body>
          Provisional placement across the island's natural terrain. Stages face the
          sea — not the town. Final positioning subject to site survey.
        </Body>
        <MapShell src="../../assets/navy-island-stage-map.png" />

        <div style={{ display: 'flex', gap: 0,
          border: '1px solid rgba(200,168,75,0.1)', marginTop: 2, flexWrap: 'wrap' }}>
          {[
            { dot: C.gold, name: 'ZUNGU MAIN', sub: 'Stage II · Headline' },
            { dot: C.teal, name: 'ORIGINS',    sub: 'Stage I · Heritage → Electronic' },
            { dot: C.rust, name: 'REBIRTH',    sub: 'Stage III · Future Sounds' },
            { dot: 'rgba(242,235,217,0.3)', name: 'ARRIVAL DOCK',
              sub: '~5 min from Errol Flynn Marina' },
          ].map((s, i, arr) => (
            <div key={s.name} style={{ flex: 1, minWidth: 140, padding: '16px 20px',
              borderRight: i < arr.length - 1 ? '1px solid rgba(200,168,75,0.08)' : 'none' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%',
                background: s.dot, marginBottom: 8 }} />
              <div style={Z.display({ fontSize: 10, color: C.cream, marginBottom: 2 })}>
                {s.name}
              </div>
              <div style={Z.txt({ fontSize: 8, color: 'rgba(242,235,217,0.45)',
                letterSpacing: '0.2em', textTransform: 'uppercase' })}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
window.ChapterIsland = ChapterIsland;
