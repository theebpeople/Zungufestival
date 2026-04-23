'use client';

import { useState } from 'react';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Tab = 'home' | 'brand' | 'stages' | 'activities' | 'cta';

const TABS: { id: Tab; label: string }[] = [
  { id: 'home', label: '01 Home' },
  { id: 'brand', label: '02 Brand & Concept' },
  { id: 'stages', label: '03 Stages' },
  { id: 'activities', label: '04 Activities' },
  { id: 'cta', label: '05 Confirm Interest →' },
];

const GOLD = '#C8A84B';
const TEAL = '#4AAFA0';
const BG = '#04080A';
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
};
const cardBase: React.CSSProperties = {
  padding: '36px 32px',
  border: '1px solid rgba(200,168,75,0.1)',
  background: 'rgba(13,32,24,0.4)',
};
const cardTitle: React.CSSProperties = {
  fontFamily: "'Unbounded', sans-serif",
  fontSize: '16px', fontWeight: 700,
  letterSpacing: '0.04em', marginBottom: '10px',
};
const cardSub: React.CSSProperties = {
  fontSize: '11px', letterSpacing: '0.2em',
  color: MUTED, textTransform: 'uppercase', marginBottom: '16px',
};
const cardBody: React.CSSProperties = { fontSize: '14px', lineHeight: 1.75, color: MUTED };

function SLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ ...sLabel, color: color ?? GOLD }}>
      <span style={{ width: '26px', height: '1px', background: color ?? GOLD, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </div>
  );
}

function CardGrid({ cols, children }: { cols: 2 | 3; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'grid', gap: '2px',
      gridTemplateColumns: cols === 2 ? '1fr 1fr' : 'repeat(3,1fr)',
    }}>
      {children}
    </div>
  );
}

function HomeTab({ onCTA }: { onCTA: () => void }) {
  return (
    <>
      <div style={{ ...section, paddingTop: '80px', background: `linear-gradient(to bottom, rgba(13,32,24,0.6) 0%, ${BG} 100%)` }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.4em', color: TEAL, textTransform: 'uppercase', marginBottom: '16px' }}>Partner Portal</div>
        <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(52px,8vw,96px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.03em', color: CREAM, marginBottom: '0' }}>
          Welcome<br />to the
        </h1>
        <p style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, color: GOLD, lineHeight: 1 }}>Jungle.</p>
        <div style={{ ...bodyText, marginTop: '36px', maxWidth: '620px' }}>
          <p>There&apos;s a private island in the Caribbean that nobody has ever thrown a world-class electronic music festival on.</p>
          <br />
          <p>64 acres. Surrounded by water. Five minutes from the mainland by boat. Stages facing the open sea. You arrive by boat. Before a single note plays, you&apos;re already somewhere else.</p>
          <br />
          <p>That&apos;s Zungu. A festival — on an extraordinary island, in the most beautiful town in Jamaica. The music that came out of this place shaped the world. That&apos;s not the pitch, that&apos;s just the context. The pitch is the island.</p>
          <br />
          <p>From Bob Marley to Lee Scratch Perry, from Shaka Demus and Pliers to Sister Nancy — this island has been exporting feeling for decades. Zungu just brought the speakers back.</p>
          <br />
          <p>If you&apos;re a brand that wants to be somewhere genuinely new — not a tent at an established festival, not a logo on a barrier — this is the conversation. Year 1. First edition. The founding moment.</p>
          <br />
          <p>Take a look around. When you&apos;re ready, tell us where you fit.</p>
        </div>
        <div style={{ marginTop: '36px' }}>
          <button
            onClick={onCTA}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              padding: '14px 28px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
              fontWeight: 700, cursor: 'pointer',
              background: TEAL, color: BG, border: 'none',
            }}
          >
            Confirm Partnership Interest →
          </button>
        </div>
      </div>

      <div style={section}>
        <SLabel>What Partners Get</SLabel>
        <CardGrid cols={3}>
          {[
            { title: "You're in the room first", body: "Year 1 partner status is a different conversation to Year 3. Zamna's founding partners are still there. The ones who came in later are just sponsors. There's a difference — and the audience feels it." },
            { title: "An audience that actually notices", body: "Electronic festival audiences are unusually aware of who is and isn't part of the events they care about. A brand that's genuinely integrated — not slapped on — gets more ROI from this crowd than almost any other live context." },
            { title: "The island does the selling", body: "Your product on a private Caribbean island during a world-class festival weekend — that's the content. Not a brand activation. An actual place your audience will remember and talk about. We just need to agree on how you show up." },
          ].map(c => (
            <div key={c.title} style={cardBase}>
              <div style={{ ...cardTitle, color: TEAL }}>{c.title}</div>
              <div style={cardBody}>{c.body}</div>
            </div>
          ))}
        </CardGrid>
      </div>
    </>
  );
}

function BrandTab() {
  return (
    <>
      <div style={{ ...section, paddingTop: '60px' }}>
        <SLabel>02 — Brand &amp; Concept</SLabel>
        <div style={sTitle}>A new festival.<br /><span style={{ color: GOLD }}>An extraordinary island.</span></div>
        <p style={bodyText}>We are a new entrant in the electronic music festival scene. We know that. The way you win entering late is not by doing what everyone else does slightly better — it&apos;s by having something nobody else has. We have a 64-acre private island in the Caribbean, five minutes by boat from Port Antonio, Jamaica. No existing festival has that.</p>
        <p style={bodyText}>The music is the reason people come. The island is the reason they never forget it. Jamaica&apos;s sonic history — from dub and sound system culture to dancehall and reggae — is context that makes the whole thing richer. It&apos;s not the pitch. The island is the pitch.</p>
      </div>

      <div style={{ ...section, paddingTop: 0 }}>
        <SLabel>The Commissioning Model</SLabel>
        <div style={sTitle}>IP that <span style={{ color: GOLD }}>lives beyond</span> the weekend.</div>
        <p style={bodyText}>Every edition of Zungu commissions original collaborations between Jamaican producers and international artists. The resulting tracks are released on Zungu&apos;s label. The festival owns the publishing, the artists retain performance rights, and every partner associated with the commission is credited in the release.</p>
        <p style={bodyText}>This is not a branding exercise. It&apos;s a documented cultural exchange — one that generates IP, press coverage, and audience engagement that extends well beyond the seven days on the island.</p>
        <div style={{
          borderLeft: `3px solid ${GOLD}`, padding: '20px 32px',
          background: 'rgba(200,168,75,0.04)', margin: '28px 0',
        }}>
          <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(13px,1.8vw,20px)', fontWeight: 300, lineHeight: 1.6, color: '#fff', marginBottom: '8px' }}>
            &ldquo;The booking that generates the think piece sells more tickets than the booking that generates the most social media impressions.&rdquo;
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase' }}>Curation Principle</div>
        </div>
      </div>
    </>
  );
}

function StagesTab() {
  return (
    <>
      <div style={{ ...section, paddingTop: '60px' }}>
        <SLabel>03 — Stage Architecture</SLabel>
        <div style={sTitle}>Three stages.<br /><span style={{ color: GOLD }}>One island.</span></div>
        <p style={bodyText}>Navy Island is 64 acres. Stages face the sea, away from Port Antonio town. Each stage is assigned to one of four Jamaican production companies. The production consortium model distributes operational risk and brings specialist crews and equipment per stage.</p>
      </div>
      <div style={{ ...section, paddingTop: 0 }}>
        <CardGrid cols={3}>
          <div style={cardBase}>
            <div style={{ ...cardTitle, color: CREAM }}>Origins</div>
            <div style={cardSub}>Stage I · Heritage Electronic</div>
            <div style={cardBody}>Jamaican artists, sound system culture, dub and roots electronic. The cultural argument made audible. Equiknoxx, Kode9, Shy FX territory.</div>
          </div>
          <div style={cardBase}>
            <div style={{ ...cardTitle, color: CREAM }}>Zungu Main</div>
            <div style={cardSub}>Stage II · Headline</div>
            <div style={cardBody}>Afro-house, melodic techno, headline international acts. Shimza, Black Coffee, Bontan. The centrepiece. Faces the open sea.</div>
          </div>
          <div style={cardBase}>
            <div style={{ ...cardTitle, color: CREAM }}>Rebirth</div>
            <div style={cardSub}>Stage III · Future Sounds</div>
            <div style={cardBody}>Emerging Jamaican and Caribbean electronic artists. Commissioned acts premiere here. The stage that proves the cultural investment is real.</div>
          </div>
        </CardGrid>
      </div>
    </>
  );
}

function ActivitiesTab() {
  const activities = [
    { title: 'Food Village', sub: 'Revenue · Partnership Opportunity', body: "Portland Parish anchor vendors. Boston Bay Jerk, Norma's at the Sea. National caterers for volume. Open bar built around Appleton Estate rum — exclusivity deal, product supply in exchange for brand prominence." },
    { title: 'Commissioning Sessions', sub: 'Cultural · IP Generation', body: "Live recording sessions between commissioned Jamaican producers and international artists. Small ticketed audience. A named partner can co-commission a track." },
    { title: 'Sunrise Sessions', sub: 'Signature Moment', body: "50–100 people. Water's edge. Dawn. The image that travels. A presenting partner here is part of the image — not a logo in the corner, a name associated with the moment everyone remembers." },
    { title: 'Heritage Talks', sub: 'Cultural · Content', body: "Conversations between artists, producers, historians, and the audience. RA and Mixmag want to cover this. A brand associated with the intellectual content of Zungu reads differently to the target audience than a banner over a stage." },
  ];

  return (
    <>
      <div style={{ ...section, paddingTop: '60px' }}>
        <SLabel>04 — Activity Programme</SLabel>
        <div style={sTitle}>Beyond the music.<br /><span style={{ color: GOLD }}>The full island.</span></div>
        <p style={bodyText}>64 acres of island. Open water. A cultural thesis. The activity programme uses all of it — and every activity is a potential partnership touchpoint.</p>
      </div>
      <div style={{ ...section, paddingTop: 0 }}>
        <CardGrid cols={2}>
          {activities.map(a => (
            <div key={a.title} style={cardBase}>
              <div style={{ ...cardTitle, color: TEAL }}>{a.title}</div>
              <div style={cardSub}>{a.sub}</div>
              <div style={cardBody}>{a.body}</div>
            </div>
          ))}
        </CardGrid>
      </div>
    </>
  );
}

function CTATab() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const interests = [
    { id: 'stage-sponsor', title: 'Stage Partner', desc: 'Brand association with one of the three stages. Naming rights, on-site presence, programming input on your stage. Year 1 opportunity — the founding mythology version.' },
    { id: 'food-bar', title: 'Food & Bar Partner', desc: "Product supply in exchange for exclusivity and brand prominence. Appleton Estate rum is the bar anchor. Red Stripe is the beer conversation. Tell us what you bring." },
    { id: 'commission', title: 'Co-Commission Partner', desc: 'Co-fund an original track. Your brand credited on the release. One Jamaican producer, one international artist, recorded on Navy Island. Real IP, real cultural presence.' },
    { id: 'other', title: 'Something Else', desc: "You have an idea we haven't thought of yet. We're genuinely interested. Tell us." },
  ];

  function toggleInterest(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const selectedTitles = interests.filter(i => selected.includes(i.id)).map(i => i.title);
    try {
      const res = await fetch('/api/partner-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, org, email, message, selected: selectedTitles }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '1px solid rgba(242,235,217,0.15)',
    color: CREAM, fontSize: '14px', padding: '8px 0',
    outline: 'none', fontFamily: "'Space Mono', monospace",
    letterSpacing: '0.05em',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', letterSpacing: '0.35em',
    color: 'rgba(242,235,217,0.4)', textTransform: 'uppercase', marginBottom: '8px',
  };

  return (
    <>
      <div style={{ ...section, paddingTop: '60px' }}>
        <SLabel color={TEAL}>05 — Confirm Interest</SLabel>
        <div style={sTitle}>First edition.<br /><span style={{ color: GOLD }}>One conversation.</span></div>
        <p style={bodyText}>We&apos;re not running an open sponsorship process. We&apos;re talking to a small number of brands who fit — and fitting means understanding what the island, the audience, and the moment actually are. If you&apos;re here, you probably get it. Tell us where you see yourself.</p>
      </div>

      <div style={section}>
        <SLabel>What kind of partnership?</SLabel>
        <div style={{ display: 'grid', gap: '2px', gridTemplateColumns: '1fr 1fr' }}>
          {interests.map(int => (
            <div
              key={int.id}
              onClick={() => toggleInterest(int.id)}
              style={{
                padding: '28px 32px', cursor: 'pointer',
                border: selected.includes(int.id)
                  ? `1px solid rgba(74,175,160,0.5)`
                  : '1px solid rgba(200,168,75,0.1)',
                background: selected.includes(int.id)
                  ? 'rgba(74,175,160,0.06)'
                  : 'rgba(13,32,24,0.3)',
              }}
            >
              <div style={{
                fontFamily: "'Unbounded', sans-serif", fontSize: '14px', fontWeight: 700,
                color: selected.includes(int.id) ? TEAL : CREAM,
                marginBottom: '10px',
              }}>{int.title}</div>
              <div style={cardBody}>{int.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...section, paddingTop: 0 }}>
        <SLabel>Your Details</SLabel>
        {submitted ? (
          <div style={{ padding: '28px', border: '1px solid rgba(74,175,160,0.3)', background: 'rgba(74,175,160,0.05)' }}>
            <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '14px', color: TEAL, marginBottom: '8px' }}>Received.</div>
            <div style={{ fontSize: '13px', color: MUTED, lineHeight: 1.7 }}>We&apos;ll be in touch within 48 hours.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '560px' }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Organisation</label>
              <input type="text" required value={org} onChange={e => setOrg(e.target.value)} placeholder="Brand / company" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Tell us what you have in mind</label>
              <textarea
                value={message} onChange={e => setMessage(e.target.value)}
                placeholder="The more specific the better — we respond better to 'we make rum and we want exclusivity' than 'we'd like to discuss opportunities'"
                rows={5}
                style={{
                  ...inputStyle,
                  borderBottom: 'none',
                  border: '1px solid rgba(242,235,217,0.15)',
                  padding: '12px', resize: 'vertical',
                }}
              />
            </div>
            {error && (
              <div style={{ fontSize: '12px', color: '#E05252', letterSpacing: '0.05em', lineHeight: 1.6 }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px', letterSpacing: '0.35em',
                textTransform: 'uppercase', fontWeight: 700,
                background: loading ? 'rgba(74,175,160,0.4)' : TEAL,
                color: BG,
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Sending...' : 'Send →'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default function PartnerPage() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { signOut } = useClerk();
  const router = useRouter();

  const tabContent: Record<Tab, React.ReactNode> = {
    home: <HomeTab onCTA={() => setActiveTab('cta')} />,
    brand: <BrandTab />,
    stages: <StagesTab />,
    activities: <ActivitiesTab />,
    cta: <CTATab />,
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
              onClick={() => setActiveTab(t.id)}
              style={{
                fontSize: '9px', letterSpacing: '0.4em',
                color: activeTab === t.id ? (t.id === 'cta' ? TEAL : GOLD) : MUTED,
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
              color: activeTab === t.id ? (t.id === 'cta' ? TEAL : GOLD) : MUTED,
              background: 'none', border: 'none',
              borderBottom: activeTab === t.id
                ? `2px solid ${t.id === 'cta' ? TEAL : GOLD}`
                : '2px solid transparent',
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
