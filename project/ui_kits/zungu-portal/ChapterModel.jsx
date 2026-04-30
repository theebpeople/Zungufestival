// CHAPTER 03 — THE MODEL. Copy verbatim from deck.

function ChapterModel() {
  return (
    <>
      <Chapter num="03" eyebrow="Chapter Three" title="The Model." anchor="s-model"
        sub="Black Coffee as co-curator. Music made on the island. 5,000 tickets, hard cap." />

      <section style={{ padding: '60px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>The Headline Proposition</SLabel>
        <STitle>
          Black Coffee. <span style={{ color: C.gold }}>Not a booking. A co-curator.</span>
        </STitle>
        <Body>
          Black Coffee runs his own festival — the Black Coffee Weekender in Cape
          Town, now in its second edition. He curates lineups, commissions
          collaborations, and has a Grammy for Best Dance/Electronic Album.
        </Body>
        <Body>
          His label Soulistic Music signed Shimza. They perform back-to-back. They
          opened Hï Ibiza together. They share an artistic philosophy and a working
          relationship that makes the outreach sequence logical.
        </Body>
      </section>

      <section style={{ padding: '40px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>The Commissioning Model</SLabel>
        <STitle>
          Music made on the island.{' '}
          <span style={{ color: C.gold }}>IP that outlives the weekend.</span>
        </STitle>
        <Body>
          Every edition of Zungu commissions original collaborations between Jamaican
          producers and international artists. Recorded on Navy Island. Released on
          Zungu's label. The festival owns the publishing.
        </Body>
        <Body>
          This generates IP, press coverage, and audience engagement well beyond
          seven days. The commissioning model is what separates Zungu from every
          festival that books the same artists in a different location.
        </Body>
      </section>

      <section style={{ padding: '40px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>Ticket Architecture</SLabel>
        <STitle>
          5,000 tickets.{' '}
          <span style={{ color: C.gold }}>One island. Hard cap.</span>
        </STitle>
        <Body>
          5,000 is the number that creates urgency without sacrificing the experience.
          At peak moments, 5,000 people distribute across three stages, the food
          village, the water, the glamping village. No stage is overcrowded. No queue
          is unbearable.
        </Body>
        <Body style={{ marginBottom: 36 }}>
          Glamping is not a separate headcount — it is a ticket tier, exactly as
          Tomorrowland's Dreamville operates. One wristband. Different experience
          levels. Same 5,000 people.
        </Body>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 1, background: 'rgba(200,168,75,0.08)' }}>
          {[
            { tier: 'GENERAL', price: '$650', cap: '3,200 tix', desc: 'Day access · arrive by ferry · return same day' },
            { tier: 'GLAMPING', price: '$1,450', cap: '1,200 tix', desc: 'On-island accommodation · all-week wristband' },
            { tier: 'GUEST',   price: '$2,800', cap: '500 tix',   desc: 'Curated villa · private dock · viewing platforms' },
            { tier: 'PATRON',  price: '$5,500', cap: '100 tix',   desc: 'Founding-edition tier · co-curator access' },
          ].map((t) => (
            <div key={t.tier} style={{ background: C.bg, padding: 28 }}>
              <div style={Z.txt({ fontSize: 9, letterSpacing: '0.4em', color: C.gold,
                textTransform: 'uppercase', marginBottom: 14 })}>{t.tier}</div>
              <div style={Z.display({ fontSize: 28, fontWeight: 700, color: C.cream,
                letterSpacing: '-0.02em', marginBottom: 6 })}>{t.price}</div>
              <div style={Z.txt({ fontSize: 8, letterSpacing: '0.25em',
                color: 'rgba(242,235,217,0.45)', textTransform: 'uppercase',
                marginBottom: 14 })}>{t.cap}</div>
              <div style={Z.txt({ fontSize: 11, color: 'rgba(242,235,217,0.55)',
                lineHeight: 1.7 })}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 6vw 100px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>The Audience</SLabel>
        <STitle>
          Someone who has{' '}
          <span style={{ color: C.gold }}>already been to Belgium.</span>
        </STitle>
        <Body>
          Our primary audience has been to Tomorrowland, Zamna, or Dekmantel. They
          plan summers around festivals. They spend real money on experiences without
          much persuasion — because they know what a good one is worth.
        </Body>
        <Body>
          What they haven't done is a world-class electronic festival on a private
          island in the Caribbean with Black Coffee as co-curator. When that exists
          and is executed properly, this audience tells each other about it.
        </Body>
      </section>
    </>
  );
}
window.ChapterModel = ChapterModel;
