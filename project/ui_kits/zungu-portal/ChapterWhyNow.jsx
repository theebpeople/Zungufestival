// CHAPTER 02 — WHY NOW. Copy verbatim from deck.

function ChapterWhyNow() {
  return (
    <>
      <Chapter num="02" eyebrow="Chapter Two" title="Why Now." anchor="s-why"
        sub="Jamaica shaped the sound. The island has the site. The window is open." />

      <section style={{ padding: '60px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>The Gap</SLabel>
        <STitle>
          The most musically significant island on earth.{' '}
          <span style={{ color: C.gold }}>No flagship electronic festival.</span>
        </STitle>
        <Body>
          A country of less than three million people has shaped the sound of every
          continent. From Bob Marley to Lee Scratch Perry. From Shaka Demus and
          Pliers to Sister Nancy. The music that came out of Jamaica did not stay in
          Jamaica.
        </Body>
        <Body>
          Sound system culture in Kingston pioneered DJ-led performance — the
          structural template for every club and festival globally. King Tubby and
          Lee Scratch Perry invented studio techniques in their yards that producers
          still use. Yet there is no flagship electronic festival here. That is the
          gap Zungu fills.
        </Body>
      </section>

      <section style={{ padding: '40px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>Competitive Landscape</SLabel>
        <STitle>
          Comparable tier. <span style={{ color: C.gold }}>Distinct territory.</span>
        </STitle>
        <Body>
          Zamna sells a jungle you had to find. SXM sells boutique Caribbean luxury.
          Dekmantel sells curatorial credibility. Tomorrowland sells a fantasy world.
          Zungu sells a private island in Jamaica — with a co-curator who also runs
          his own festival.
        </Body>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 1, marginTop: 32, background: 'rgba(200,168,75,0.08)' }}>
          {[
            { name: 'Tomorrowland',   sells: 'Fantasy world',         scale: '400,000 / weekend' },
            { name: 'Zamna · Tulum',  sells: 'Jungle you had to find', scale: '~10,000 / night' },
            { name: 'Dekmantel',      sells: 'Curatorial credibility', scale: '~10,000 / weekend' },
            { name: 'SXM Festival',   sells: 'Boutique Caribbean lux', scale: '~3,500 / weekend' },
            { name: 'ZUNGU',          sells: 'Private Caribbean island', scale: '5,000 / weekend',
              gold: true },
          ].map((c) => (
            <div key={c.name} style={{ background: C.bg, padding: 28,
              borderTop: c.gold ? `2px solid ${C.gold}` : 'none' }}>
              <div style={Z.display({ fontSize: 13, fontWeight: 700,
                color: c.gold ? C.gold : C.cream, marginBottom: 14 })}>{c.name}</div>
              <div style={Z.txt({ fontSize: 10, color: 'rgba(242,235,217,0.45)',
                lineHeight: 1.7, marginBottom: 12 })}>{c.sells}</div>
              <div style={Z.txt({ fontSize: 8, letterSpacing: '0.2em',
                color: 'rgba(242,235,217,0.18)', textTransform: 'uppercase' })}>
                {c.scale}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56 }}>
          <Quote attr="Precedent · Zamna Tulum, est. 2017">
            Zamna's first year was 800 people in a jungle cenote. No marketing budget.
            Pure word of mouth. Within 4 years it was one of the most influential
            boutique events in the world. Geography plus cultural specificity plus
            discipline beats scale every time.
          </Quote>
        </div>
      </section>
    </>
  );
}
window.ChapterWhyNow = ChapterWhyNow;
