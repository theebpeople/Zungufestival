'use client';

import { useState } from 'react';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Tab = 'home' | 'brand' | 'stages' | 'activities' | 'marketing' | 'budget';

const TABS: { id: Tab; label: string }[] = [
  { id: 'home', label: '01 Home' },
  { id: 'brand', label: '02 Brand & Concept' },
  { id: 'stages', label: '03 Stages' },
  { id: 'activities', label: '04 Activities' },
  { id: 'marketing', label: '05 Marketing' },
  { id: 'budget', label: '06 Budget & Investment' },
];

const GOLD = '#C8A84B';
const BG = '#04080A';
const GREEN = '#0D2018';
const CREAM = '#F2EBD9';
const MUTED = 'rgba(242,235,217,0.4)';

const sLabel: React.CSSProperties = {
  fontSize: '11px', letterSpacing: '0.6em', color: GOLD,
  textTransform: 'uppercase', marginBottom: '36px',
  display: 'flex', alignItems: 'center', gap: '14px',
};
const sTitle: React.CSSProperties = {
  fontFamily: "'Unbounded', sans-serif",
  fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700,
  lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '28px',
  color: CREAM,
};
const bodyText: React.CSSProperties = {
  fontSize: '15px', lineHeight: 1.85, color: MUTED,
  maxWidth: '680px', marginBottom: '20px',
};
const section: React.CSSProperties = {
  padding: '80px 8vw',
  borderBottom: '1px solid rgba(200,168,75,0.07)',
  position: 'relative',
};
const cardBase: React.CSSProperties = {
  padding: '36px 32px',
  border: '1px solid rgba(200,168,75,0.1)',
  background: 'rgba(13,32,24,0.4)',
};
const cardTitle: React.CSSProperties = {
  fontFamily: "'Unbounded', sans-serif",
  fontSize: '16px', fontWeight: 700,
  color: GOLD, letterSpacing: '0.04em', marginBottom: '10px',
};
const cardSub: React.CSSProperties = {
  fontSize: '11px', letterSpacing: '0.2em',
  color: MUTED, textTransform: 'uppercase', marginBottom: '16px',
};
const cardBody: React.CSSProperties = { fontSize: '14px', lineHeight: 1.75, color: MUTED };
const statNum: React.CSSProperties = {
  fontFamily: "'Unbounded', sans-serif",
  fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 700,
  color: GOLD, lineHeight: 1, marginBottom: '6px',
};
const statLabel: React.CSSProperties = {
  fontSize: '11px', letterSpacing: '0.25em', color: MUTED, textTransform: 'uppercase',
};
const tag: React.CSSProperties = {
  padding: '4px 12px', fontSize: '11px', letterSpacing: '0.2em',
  border: '1px solid rgba(200,168,75,0.2)', color: MUTED, textTransform: 'uppercase',
};

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={sLabel}>
      <span style={{ width: '26px', height: '1px', background: GOLD, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </div>
  );
}

function StatRow({ stats }: { stats: { num: string; label: string }[] }) {
  return (
    <div className="z-stat-row" style={{ display: 'flex', border: '1px solid rgba(200,168,75,0.12)', margin: '28px 0' }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          flex: 1, padding: '28px 24px', textAlign: 'center',
          borderRight: i < stats.length - 1 ? '1px solid rgba(200,168,75,0.08)' : 'none',
        }}>
          <div style={statNum}>{s.num}</div>
          <div style={statLabel}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ cols, children }: { cols: 2 | 3; children: React.ReactNode }) {
  return (
    <div className={cols === 2 ? 'z-grid-2' : 'z-grid-3'} style={{
      display: 'grid', gap: '2px',
      gridTemplateColumns: cols === 2 ? '1fr 1fr' : 'repeat(3,1fr)',
    }}>
      {children}
    </div>
  );
}

function Card({ title, sub, body, titleColor }: { title: string; sub?: string; body: string; titleColor?: string }) {
  return (
    <div className="z-card" style={cardBase}>
      <div style={{ ...cardTitle, color: titleColor ?? GOLD }}>{title}</div>
      {sub && <div style={cardSub}>{sub}</div>}
      <div style={cardBody}>{body}</div>
    </div>
  );
}

function QuoteBlock({ text, attr }: { text: string; attr: string }) {
  return (
    <div style={{
      borderLeft: `3px solid ${GOLD}`, padding: '20px 32px',
      background: 'rgba(200,168,75,0.04)', margin: '28px 0',
    }}>
      <div style={{
        fontFamily: "'Unbounded', sans-serif",
        fontSize: 'clamp(13px,1.8vw,20px)', fontWeight: 300,
        lineHeight: 1.6, color: '#fff', marginBottom: '8px',
      }}>{text}</div>
      <div style={{ fontSize: '10px', letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase' }}>{attr}</div>
    </div>
  );
}

function HomeTab() {
  return (
    <>
      <div className="z-section" style={{ ...section, paddingTop: '80px', background: `linear-gradient(to bottom, ${GREEN} 0%, ${BG} 100%)` }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase', marginBottom: '16px' }}>Investor Portal</div>
        <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(52px,8vw,96px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.03em', color: CREAM, marginBottom: '0' }}>
          Welcome<br />to the
        </h1>
        <p style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, color: GOLD, lineHeight: 1 }}>Jungle.</p>
        <div style={{ ...bodyText, marginTop: '36px', maxWidth: '620px' }}>
          <p>There&apos;s a private island in the Caribbean that nobody has ever thrown a world-class electronic music festival on.</p>
          <br />
          <p>64 acres. Surrounded by water. Five minutes from the mainland by boat. Stages facing the open sea. A glamping village in the trees. Seven days where this island is your entire world.</p>
          <br />
          <p>That&apos;s the sell. Before we mention a single artist name.</p>
          <br />
          <p>Now add this: the island is in Jamaica. A country of less than three million people that has shaped the sound of every continent on earth. From Bob Marley to Lee Scratch Perry, from Shaka Demus and Pliers to Sister Nancy — the music that came out of this island travelled further and hit harder than almost anything that followed it. That&apos;s not a thesis. That&apos;s just what happened.</p>
          <br />
          <p>Tomorrowland sells a fantasy world. Zamna sells a jungle you had to find. Dekmantel sells taste you had to earn. <em style={{ color: CREAM }}>Zungu sells an island.</em> A real one. With a real sound system culture behind it and seven days of electronic music in front of you.</p>
          <br />
          <p>We&apos;re entering the game late — and the only way to do that well is to bring something nobody else has. We have it. The question is whether we execute it properly. That&apos;s what this document is about.</p>
        </div>
      </div>

      <div className="z-section" style={section}>
        <SLabel>At a Glance</SLabel>
        <StatRow stats={[
          { num: '64', label: 'Acres · Navy Island' },
          { num: '2,000', label: 'Tickets Sold' },
          { num: '3', label: 'Stages' },
          { num: 'Jun 17', label: 'Opens · Jun 17, 2027' },
          { num: '~$44K', label: 'Island Lease (7 days)' },
        ]} />
      </div>

      <div className="z-section" style={section}>
        <SLabel>The Open Gates</SLabel>
        <div style={sTitle}>Five decisions that<br /><span style={{ color: GOLD }}>unlock everything else</span>.</div>
        <CardGrid cols={2}>
          <Card title="Gate 1 — Capacity" sub="Decision Required" body="Year 1 is 2,000 ticket holders across GA, VIP, and Glamping tiers. One authoritative number. Every cost line, every logistics decision, every stage capacity flows from this." />
          <Card title="Gate 2 — Port Authority Lease" sub="In Progress" body="Verbal rate confirmed at 1M JMD/day (~$44K USD for 7 days). Must become a signed multi-year agreement before any public announcement or partnership conversation." />
          <Card title="Gate 3 — Production MOU" sub="Outreach Scheduled" body="Four Jamaican production companies — Starlight, Mainevent, Yes Production, Phase Three. One stage each. MOUs convert the concept into a production plan that a financial partner can evaluate." />
          <Card title="Gate 4 — IP Framework" sub="Legal Work Required" body="The commissioning model is the differentiator. It needs to exist as a legal framework before any partnership conversation with a global festival brand. Entertainment lawyer required — music IP specialist." />
        </CardGrid>
      </div>

      <div className="z-section" style={section}>
        <QuoteBlock
          text={'"Zamna\'s founding mythology was built on delivery, not declaration. The mandate is the same: do not announce what Zungu will be. Build what it is."'}
          attr="Strategic Framework"
        />
      </div>
    </>
  );
}

function BrandTab() {
  return (
    <>
      <div className="z-section" style={{ ...section, paddingTop: '60px' }}>
        <SLabel>02 — Brand &amp; Concept</SLabel>
        <div style={sTitle}>A new festival.<br /><span style={{ color: GOLD }}>An extraordinary island.</span></div>
        <p style={bodyText}>We are a new entrant in the electronic music festival scene. We know that. The way you win entering late is not by doing what everyone else does slightly better — it&apos;s by having something nobody else has. We have a 64-acre private island in the Caribbean, five minutes by boat from Port Antonio, Jamaica. No existing festival has that.</p>
        <p style={bodyText}>The music is the reason people come. The island is the reason they never forget it. Jamaica&apos;s sonic history — from dub and sound system culture to dancehall and reggae — is context that makes the whole thing richer. It&apos;s not the pitch. The island is the pitch.</p>
      </div>

      <div className="z-section" style={{ padding: '70px 8vw 0', borderTop: '1px solid rgba(200,168,75,0.15)' }}>
        <div className="z-flex-wrap-mobile" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <div className="z-big-number" style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '90px', fontWeight: 900, color: 'rgba(200,168,75,0.15)', lineHeight: 1, flexShrink: 0 }}>01</div>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.6em', color: GOLD, textTransform: 'uppercase', marginBottom: '8px' }}>The Thesis</div>
            <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(26px,4vw,50px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>The lineage.</div>
            <div style={{ fontSize: '13px', color: MUTED, marginTop: '10px', lineHeight: 1.7, maxWidth: '560px' }}>From dub to jungle to drum &amp; bass to house to techno — the thread is documentable. Zungu doesn&apos;t claim it. It demonstrates it.</div>
          </div>
        </div>
      </div>

      <div className="z-section" style={section}>
        <CardGrid cols={3}>
          <Card title="Origins Stage" sub="Stage I · Heritage Electronic" body="Where the argument starts. Jamaican artists, sound system culture, dub and roots electronic. The booking that generates the Resident Advisor interview. Equiknoxx, Kode9, Shy FX." />
          <Card title="Zungu Main" sub="Stage II · Headline" body="The centrepiece. Afro-house, melodic techno, the international electronic acts with curatorial credibility. Shimza, Black Coffee, Bontan. Not mainstream — correct." />
          <Card title="Rebirth Stage" sub="Stage III · Future Sounds" body="Where the next generation plays. Emerging Jamaican and Caribbean electronic artists. The commissioning model in practice. The stage that proves the cultural investment is real." />
        </CardGrid>
      </div>

      <div className="z-section" style={section}>
        <SLabel>What Makes This Work</SLabel>
        <div style={sTitle}>Three things nobody <span style={{ color: GOLD }}>else has</span>.</div>
        <CardGrid cols={3}>
          <Card title="The Island" body="Navy Island. 64 acres. Private. You arrive by boat. Stages face open water. There is no other festival on earth running on a site like this. That alone is the conversation opener in any room." />
          <Card title="The Location" body="Port Antonio, Portland Parish. Not Kingston. Not Montego Bay. The most beautiful town in Jamaica — off the tourist circuit, genuinely undiscovered at this scale. That's the discovery feeling Zamna had in Tulum in 2017. We have it in 2027." />
          <Card title="The Timing" body="Second week of June. Before Tomorrowland. Clean in the Caribbean calendar. The audience that goes to Belgium in late July is the exact audience looking for somewhere exceptional to start their summer. We are that somewhere." />
        </CardGrid>
      </div>
    </>
  );
}

function StagesTab() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  const stages = [
    {
      id: 's1', name: 'Origins', label: 'Stage I · Heritage Electronic · Northeast Island',
      body: "This is the booking that generates the think piece. One RA interview with Equiknoxx about playing Zungu sells more tickets to the target audience than three mainstream acts combined. The Origins stage is the cultural argument made audible.",
      tags: ['Equiknoxx', 'Kode9', 'Shy FX', 'Sound System Culture', 'Dub / Roots Electronic'],
      stats: [{ num: '~800', label: 'Peak Crowd' }, { num: '6pm–4am', label: 'Operating Hours' }, { num: 'NE', label: 'Island Position' }],
    },
    {
      id: 's2', name: 'Zungu Main', label: 'Stage II · Headline · Central Island',
      body: "The centrepiece. Headline acts with curatorial credibility. Afro-house and the African-Caribbean sonic connection is a documentable curatorial argument — Shimza on this stage tells the RA audience that Zungu understands what it is.",
      tags: ['Shimza', 'Black Coffee', 'Bontan', 'Afro-House', 'Melodic Techno'],
      stats: [{ num: '~1,200', label: 'Peak Crowd' }, { num: '8pm–6am', label: 'Operating Hours' }, { num: 'Central', label: 'Island Position' }],
    },
    {
      id: 's3', name: 'Rebirth', label: 'Stage III · Future Sounds · West Island',
      body: "Where the next generation plays. Emerging Jamaican and Caribbean electronic artists. The commissioning model in practice — artists who've recorded on the island premiere their commissioned tracks here. The stage that proves the cultural investment is real.",
      tags: ['Emerging Jamaican Artists', 'Commissioned Acts', 'Caribbean Electronic'],
      stats: [{ num: '~500', label: 'Peak Crowd' }, { num: '10pm–8am', label: 'Operating Hours' }, { num: 'West', label: 'Island Position' }],
    },
    {
      id: 's4', name: 'Glamping Village', label: 'On-Island Accommodation · Arrival Side',
      body: "On-island accommodation as a separate revenue stream. Glamping pods positioned on the arrival side of the island. Priced as a premium package — reduces off-island economic leakage from Port Antonio and increases per-attendee spend.",
      tags: [],
      stats: [{ num: '3+2', label: 'Nights (Festival + Glamping Extension)' }, { num: 'Premium', label: 'Pricing Tier' }],
    },
  ];

  return (
    <>
      <div className="z-section" style={{ ...section, paddingTop: '60px' }}>
        <SLabel>03 — Stage Architecture</SLabel>
        <div style={sTitle}>Three stages.<br /><span style={{ color: GOLD }}>One island.</span></div>
        <p style={bodyText}>Navy Island is 64 acres. Stages face the sea, away from Port Antonio town — this addresses both acoustics toward the community and the fundamental visual of every attendee facing open water. Each stage is assigned to one of four Jamaican production companies under an MOU structure.</p>
      </div>

      <div className="z-section" style={{ ...section, paddingTop: 0 }}>
        {stages.map(stage => (
          <div key={stage.id} style={{ border: '1px solid rgba(200,168,75,0.12)', marginBottom: '2px' }}>
            <div
              onClick={() => toggle(stage.id)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '28px 32px', cursor: 'pointer',
              }}
            >
              <div>
                <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '18px', fontWeight: 700, color: CREAM }}>{stage.name}</div>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: MUTED, textTransform: 'uppercase', marginTop: '6px' }}>{stage.label}</div>
              </div>
              <div style={{ color: GOLD, fontSize: '24px', fontWeight: 300 }}>{open[stage.id] ? '−' : '+'}</div>
            </div>
            {open[stage.id] && (
              <div style={{ padding: '0 32px 32px' }}>
                <p style={bodyText}>{stage.body}</p>
                {stage.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {stage.tags.map(t => <span key={t} style={tag}>{t}</span>)}
                  </div>
                )}
                <div style={{ display: 'flex', border: '1px solid rgba(200,168,75,0.12)', marginTop: '24px' }}>
                  {stage.stats.map((s, i) => (
                    <div key={i} style={{
                      flex: 1, padding: '20px 24px', textAlign: 'center',
                      borderRight: i < stage.stats.length - 1 ? '1px solid rgba(200,168,75,0.08)' : 'none',
                    }}>
                      <div style={{ ...statNum, fontSize: '22px' }}>{s.num}</div>
                      <div style={statLabel}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function ActivitiesTab() {
  const activities = [
    { title: 'Sound System History Tour', sub: 'Cultural · Daily', body: "Guided experience tracing the lineage from Jamaican sound system culture to global electronic music. Curated by local historians and DJs. Not a lecture — an argument with a soundtrack." },
    { title: 'Island Swim & Marine Experience', sub: 'Leisure · Morning Sessions', body: "The harbour is not a backdrop — it's an amenity. Guided snorkelling, paddleboard access, and morning ocean swims. Pre-music hours only. Quieter, restorative programming that uses the location." },
    { title: 'Commissioning Sessions', sub: 'Cultural · Programme Highlight', body: "Live recording sessions between commissioned Jamaican producers and international artists. Open to a small ticketed audience. The commissioning model made visible — the product being created in front of an audience." },
    { title: 'Food Village', sub: 'Revenue · All Day', body: "Portland Parish anchor vendors — Boston Bay Jerk, Norma's at the Sea, Dickie's Best Kept Secret — alongside national caterers for volume. Jamaican food as a cultural statement. Open bar built around Appleton Estate rum." },
    { title: 'Sunrise Sessions', sub: 'Signature · Dawn', body: "Small, ticketed sunrise sets on the water's edge. 50–100 people. The moment of the weekend. The image that defines Zungu's visual language and travels on social without a single paid promotion." },
    { title: 'Heritage Talks', sub: 'Cultural · Afternoon Programme', body: "Conversations between artists, producers, historians, and the audience. Not panels — conversations. The cultural thesis in dialogue form. RA and Mixmag want to cover this. It generates content that outlasts the weekend." },
  ];

  return (
    <>
      <div className="z-section" style={{ ...section, paddingTop: '60px' }}>
        <SLabel>04 — Activity Programme</SLabel>
        <div style={sTitle}>Beyond the music.<br /><span style={{ color: GOLD }}>The full experience.</span></div>
        <p style={bodyText}>Zungu is not a park-and-listen festival. The island context demands a programme that uses the 64 acres, the water, and the cultural thesis. Every activity is either a cultural argument or a revenue line — ideally both.</p>
      </div>
      <div className="z-section" style={{ ...section, paddingTop: 0 }}>
        <CardGrid cols={2}>
          {activities.map(a => <Card key={a.title} title={a.title} sub={a.sub} body={a.body} />)}
        </CardGrid>
      </div>
    </>
  );
}

function MarketingTab() {
  const phases = [
    { title: 'Phase 1 — Signal', sub: 'Pre-Announcement', body: "A co-commissioned track. One Jamaican producer, one international artist, recorded on Navy Island. Released 6 months before the announcement. No ticket sales yet. The cultural argument in practice before anyone knows what Zungu is." },
    { title: 'Phase 2 — Announce', sub: 'Launch', body: "Jamaican acts announced first. Always. The cultural thesis leads, not the lineup. RA interview with Equiknoxx or Kode9 is the opening move. Mixmag feature follows. Pitchfork and Jamaican cultural media simultaneously." },
    { title: 'Phase 3 — Build', sub: 'Pre-Festival', body: "Build diary content from the island. Behind-the-scenes from load-in. The physical reality of what it takes to bring a festival to a 64-acre private island. Content that no other festival can replicate because no other festival has done this." },
  ];

  return (
    <>
      <div className="z-section" style={{ ...section, paddingTop: '60px' }}>
        <SLabel>05 — Marketing &amp; Promotion</SLabel>
        <div style={sTitle}>Sell the feeling first.<br /><span style={{ color: GOLD }}>Then the names.</span></div>
        <p style={bodyText}>Tomorrowland doesn&apos;t open with a lineup announcement. It opens with a world. Zamna&apos;s first image was a jungle, not a DJ. The feeling — the place, the atmosphere, the sense that you&apos;re somewhere you&apos;ve never been — that lands before any artist name means anything. We run the same sequence.</p>
      </div>

      <div className="z-section" style={{ ...section, paddingTop: 0 }}>
        <SLabel>Story Arc</SLabel>
        <CardGrid cols={3}>
          {phases.map(p => <Card key={p.title} title={p.title} sub={p.sub} body={p.body} />)}
        </CardGrid>
      </div>

      <div className="z-section" style={{ ...section, paddingTop: 0 }}>
        <SLabel>Target Audience</SLabel>
        <div style={sTitle}>Someone who has<br /><span style={{ color: GOLD }}>already been to Belgium</span>.</div>
        <p style={bodyText}>Our primary audience has been to Tomorrowland. Or Zamna. Or Dekmantel. They plan their summers around festivals. They spend real money on experiences — flights, accommodation, tickets — without much persuasion, because they&apos;ve done it before and they know what a good one feels like.</p>
        <p style={bodyText}>What they haven&apos;t done is a world-class electronic festival on a private island in the Caribbean. When that exists and is executed properly, this audience tells each other. That&apos;s not a marketing strategy — it&apos;s just how this community works. The first edition sells itself if the product is right.</p>
        <StatRow stats={[
          { num: '2,000', label: 'Pre-reg target by Dec 2026' },
          { num: '70%', label: 'Presale threshold · hard gate' },
          { num: '40%+', label: 'Pre-reg to ticket conversion target' },
        ]} />
      </div>

      <div className="z-section" style={{ ...section, paddingTop: 0 }}>
        <SLabel>Media Targets</SLabel>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Resident Advisor', 'Mixmag', 'Pitchfork', 'Jamaica Gleaner', 'Jamaica Observer', 'Loop Jamaica', 'RBMA', 'Boiler Room'].map(m => (
            <span key={m} style={tag}>{m}</span>
          ))}
        </div>
      </div>
    </>
  );
}

function BudgetTab() {
  const costRows = [
    { item: 'Artist Fees', notes: 'Headline + support across 3 stages', usd: '$620,000' },
    { item: 'Production (4 companies)', notes: 'Stage build, sound, lighting per MOU', usd: '$700,000' },
    { item: 'Marine Transport', notes: 'Ferry operators, barge schedule, JMA compliance', usd: '$180,000' },
    { item: 'Site Lease', notes: '~1M JMD/day × 7 days', usd: '$44,000' },
    { item: 'Insurance', notes: 'Public liability + event cancellation + marine', usd: '$75,000' },
    { item: 'Medical Infrastructure', notes: 'Field hospital + satellite sick bays + helipad', usd: '$45,000' },
    { item: 'Food Village Infrastructure', notes: 'Stalls, power, cashless terminals', usd: '$80,000' },
    { item: 'Glamping Build', notes: 'Pods, power runs, sanitation', usd: '$220,000' },
    { item: 'Marketing & PR', notes: 'Digital, press, content production', usd: '$180,000' },
    { item: 'Legal & IP', notes: 'Lawyer, contracts, commissioning framework', usd: '$45,000' },
    { item: 'Operations & Staffing', notes: 'Coordinator, crew, security, volunteers', usd: '$145,000' },
    { item: 'Contingency (15%)', notes: 'Island event risk premium', usd: '$266,000' },
  ];

  const thStyle: React.CSSProperties = {
    fontSize: '11px', letterSpacing: '0.3em', color: GOLD,
    textTransform: 'uppercase', padding: '12px 16px', textAlign: 'left',
    borderBottom: '1px solid rgba(200,168,75,0.2)',
  };
  const tdStyle: React.CSSProperties = {
    fontSize: '13px', color: MUTED, padding: '12px 16px',
    borderBottom: '1px solid rgba(200,168,75,0.06)',
  };

  return (
    <>
      <div className="z-section" style={{ ...section, paddingTop: '60px' }}>
        <SLabel>06 — Budget &amp; Investment</SLabel>
        <div style={sTitle}>The numbers.<br /><span style={{ color: GOLD }}>No decoration.</span></div>
        <p style={bodyText}>The financial model is structurally honest and more transparent than most festival proposals at this stage. It acknowledges Year 1 losses, models downside scenarios, and explains the working capital bridge clearly.</p>
      </div>

      <div className="z-section" style={{ ...section, paddingTop: 0 }}>
        <SLabel>Seed Capital Floor</SLabel>
        <StatRow stats={[
          { num: '$518K', label: 'Seed Capital Required' },
          { num: '$248K', label: 'Artist Deposits (40%)' },
          { num: '$175K', label: 'Infrastructure Deposits' },
          { num: '$95K', label: 'Insurance & Legal' },
        ]} />
      </div>

      <div className="z-section" style={{ ...section, paddingTop: 0 }}>
        <SLabel>Cost Structure</SLabel>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(200,168,75,0.12)' }}>
          <thead>
            <tr>
              <th style={thStyle}>Line Item</th>
              <th style={thStyle}>Notes</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>USD</th>
            </tr>
          </thead>
          <tbody>
            {costRows.map(r => (
              <tr key={r.item}>
                <td style={tdStyle}>{r.item}</td>
                <td style={{ ...tdStyle, color: 'rgba(242,235,217,0.25)' }}>{r.notes}</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontFamily: "'Space Mono', monospace", color: CREAM }}>{r.usd}</td>
              </tr>
            ))}
            <tr style={{ background: 'rgba(200,168,75,0.06)' }}>
              <td style={{ ...tdStyle, color: GOLD, fontWeight: 700, borderBottom: 'none' }}>TOTAL YEAR 1</td>
              <td style={{ ...tdStyle, color: MUTED, borderBottom: 'none' }}>Base case, no overrun</td>
              <td style={{ ...tdStyle, textAlign: 'right', color: GOLD, fontWeight: 700, borderBottom: 'none' }}>~$2.44M</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="z-section" style={{ ...section, paddingTop: 0 }}>
        <SLabel>Revenue Model</SLabel>
        <CardGrid cols={3}>
          <Card title="Ticket Revenue" sub="Primary" body="2,000 tickets across three tiers. GA at $350–$450, VIP at $600–$800, Glamping at $1,200–$1,800 (7-day pass, accommodation included). Blended average target: ~$650 per ticket." />
          <Card title="Sponsorship" sub="Secondary" body="Appleton Estate, Red Stripe, Pioneer DJ / Native Instruments. Cultural brand alignment only — no logo soup. Sponsorship target: $300–$400K in Year 1." />
          <Card title="Glamping & F&B" sub="Ancillary" body="On-island accommodation and food/drink. Per-head F&B spend target: $150–$280 USD over 7 days. Open bar model offset by Appleton partnership." />
        </CardGrid>
      </div>

      <div className="z-section" style={section}>
        <QuoteBlock
          text={"\"The festival that executes flawlessly at 2,000 people on a private island in June 2027 has something no amount of money can buy in Year 3: a founding story. You can't retro-fit that. You're either in the room when it starts, or you're not.\""}
          attr="Investment Thesis"
        />
        <StatRow stats={[
          { num: '$650', label: 'Blended Avg Ticket Target' },
          { num: '$6–8M', label: 'Year 3 Revenue Target' },
          { num: '3,500', label: 'Year 3 Target Tickets' },
        ]} />
      </div>
    </>
  );
}

export default function DeckPage() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { signOut } = useClerk();
  const router = useRouter();

  const tabContent: Record<Tab, React.ReactNode> = {
    home: <HomeTab />,
    brand: <BrandTab />,
    stages: <StagesTab />,
    activities: <ActivitiesTab />,
    marketing: <MarketingTab />,
    budget: <BudgetTab />,
  };

  return (
    <div style={{ backgroundColor: BG, color: CREAM, fontFamily: "'Space Mono', monospace", minHeight: '100vh' }}>
      {/* Top nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
        height: '52px', background: 'rgba(4,8,10,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(200,168,75,0.1)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 6vw',
      }}>
        <Image
          src="/logo-z.png" alt="Z" width={28} height={28}
          style={{ cursor: 'pointer', filter: 'drop-shadow(0 0 8px rgba(200,168,75,0.3))' }}
          onClick={() => router.push('/')}
        />
        <div style={{ display: 'flex' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              className="z-nav-tab"
              onClick={() => setActiveTab(t.id)}
              style={{
                fontSize: '9px', letterSpacing: '0.4em',
                color: activeTab === t.id ? GOLD : MUTED,
                textTransform: 'uppercase', padding: '0 18px', height: '52px',
                display: 'flex', alignItems: 'center', cursor: 'pointer',
                background: activeTab === t.id ? 'rgba(200,168,75,0.04)' : 'none',
                border: 'none', borderLeft: '1px solid rgba(200,168,75,0.08)',
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={() => signOut(() => router.push('/'))}
            style={{
              fontSize: '9px', letterSpacing: '0.4em',
              color: 'rgba(242,235,217,0.2)', textTransform: 'uppercase',
              padding: '0 18px', height: '52px',
              display: 'flex', alignItems: 'center', cursor: 'pointer',
              background: 'none', border: 'none',
              borderLeft: '1px solid rgba(200,168,75,0.2)',
              fontFamily: "'Space Mono', monospace",
            }}
          >← Exit</button>
        </div>
      </nav>

      {/* Tab bar */}
      <div style={{
        position: 'sticky', top: '52px', zIndex: 800,
        display: 'flex', overflowX: 'auto',
        borderBottom: '1px solid rgba(200,168,75,0.1)',
        background: 'rgba(4,8,10,0.95)',
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '0 28px', height: '44px', flexShrink: 0,
              fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: activeTab === t.id ? GOLD : MUTED,
              background: 'none', border: 'none',
              borderBottom: activeTab === t.id ? `2px solid ${GOLD}` : '2px solid transparent',
              cursor: 'pointer', fontFamily: "'Space Mono', monospace",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ paddingTop: '52px' }}>
        {tabContent[activeTab]}
      </div>
    </div>
  );
}
