// CHAPTER 04 — THE NUMBERS. Copy verbatim from deck.

function ChapterNumbers() {
  return (
    <>
      <Chapter num="04" eyebrow="Chapter Four" title="The Numbers." anchor="s-numbers"
        sub="The case at 5,000 tickets. Conservative model. Hard gates." />

      <section style={{ padding: '60px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>Year 1 Revenue · 5,000 Capacity</SLabel>
        <STitle>The case at <span style={{ color: C.gold }}>5,000 tickets.</span></STitle>
        <StatRow items={[
          { num: '$4.59M', label: 'Year 1 Revenue (conservative)' },
          { num: '$920',   label: 'Blended avg per ticket' },
          { num: '65%',    label: 'Breakeven occupancy' },
          { num: '$7.4B',  label: 'Global electronic market 2024' },
        ]} />
      </section>

      <section style={{ padding: '40px 6vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>Year 1 Cost Structure</SLabel>
        <STitle>What it costs to <span style={{ color: C.gold }}>do this properly.</span></STitle>
        <Body>
          $2.96M in total Year 1 costs covers stages, sound, talent, infrastructure,
          medical, marketing, and a contingency reserve.
        </Body>

        <div style={{ marginTop: 36, border: '1px solid rgba(200,168,75,0.1)' }}>
          {[
            ['Talent · Headline + curated lineup', '$880,000'],
            ['Production · Stages, sound, lighting',  '$640,000'],
            ['Site Infrastructure · Water, power, dock', '$420,000'],
            ['Hospitality · Glamping village, F&B',   '$310,000'],
            ['Medical · Field hospital + helipad',    '$95,000'],
            ['Marketing & Press',                     '$190,000'],
            ['Operations · Staff, security',          '$280,000'],
            ['Contingency Reserve',                   '$145,000'],
          ].map(([label, amt], i, arr) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between',
              padding: '18px 24px',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(200,168,75,0.06)' : 'none' }}>
              <div style={Z.txt({ fontSize: 12, color: 'rgba(242,235,217,0.7)' })}>{label}</div>
              <div style={Z.display({ fontSize: 13, fontWeight: 700, color: C.gold,
                letterSpacing: '-0.01em' })}>{amt}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 6vw 100px', maxWidth: 1200, margin: '0 auto' }}>
        <SLabel>Financial Discipline</SLabel>
        <STitle>
          Hard gates.{' '}
          <span style={{ color: C.gold }}>Money doesn't move until each one is cleared.</span>
        </STitle>
        <Body style={{ marginBottom: 56 }}>
          Capital is gated against milestones — site agreement, headline confirmation,
          ticket pre-sale floor. Each gate is a stop-loss. No gate, no spend.
        </Body>
        <Quote attr="Investment Thesis · Year 1">
          The festival that executes flawlessly at 5,000 people on a private island
          in June 2027 has something no amount of money can buy in Year 3: a
          founding story. You can't retro-fit that. You're either in the room when
          it starts, or you're not.
        </Quote>
      </section>
    </>
  );
}
window.ChapterNumbers = ChapterNumbers;
