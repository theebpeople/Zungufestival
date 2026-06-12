'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

/* ── colour tokens ── */
const gold   = '#C8A84B';
const green  = '#3AAF7A';
const blue   = '#4A8FBD';
const teal   = '#2A9B8F';
const amber  = '#C4842A';
const purple = '#9B5FC0';
const black  = '#060808';
const white  = '#F7F3EC';
const muted  = '#6B6355';

/* ── section registry ── */
const SECTIONS = [
  'intro', 'overview', 'portantonio', 'island', 'production',
  'sound', 'audience', 'stages', 'activities', 'accommodation',
  'marine', 'utilities', 'medical', 'environment', 'participation',
  'operations', 'alignment', 'asks', 'contact',
] as const;
type SectionId = typeof SECTIONS[number];

const NAV_LABELS: Record<SectionId, string> = {
  intro:         'Introduction',
  overview:      'Overview',
  portantonio:   'Port Antonio',
  island:        'Navy Island',
  production:    'Production',
  sound:         'Sound',
  audience:      'Audience',
  stages:        'Stages',
  activities:    'Activities',
  accommodation: 'Accommodation',
  marine:        'Marine',
  utilities:     'Utilities',
  medical:       'Medical',
  environment:   'Environment',
  participation: 'Local Economy',
  operations:    'Operations',
  alignment:     'Alignment',
  asks:          'Asks',
  contact:       'Contact',
};

/* ── typography helpers ── */
function Label({ children, color = gold }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ fontSize: 10, color, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
      {children}
    </p>
  );
}
function Head({ children, size = 'clamp(1.8rem,5vw,3.2rem)' }: { children: React.ReactNode; size?: string }) {
  return (
    <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: size, fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '1.5rem', color: white }}>
      {children}
    </h2>
  );
}
function Body({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(247,243,236,0.72)', marginBottom: '1.25rem', maxWidth: 680 }}>
      {children}
    </p>
  );
}
function Divider({ accent = gold }: { accent?: string }) {
  return <div style={{ width: 60, height: 2, backgroundColor: accent, margin: '2rem 0' }} />;
}
function Card({ title, body, accent = gold }: { title: string; body: string; accent?: string }) {
  return (
    <div style={{ padding: '1.5rem', border: `1px solid rgba(255,255,255,0.07)`, backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <p style={{ fontSize: 10, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</p>
      <p style={{ fontSize: '0.88rem', color: 'rgba(247,243,236,0.65)', lineHeight: 1.65 }}>{body}</p>
    </div>
  );
}
function Wrap({ id, bg, children }: { id: string; bg: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ backgroundColor: bg, padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

/* ── main component ── */
function StakeholderBriefInner() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionId>('intro');
  const [navOpen, setNavOpen] = useState(false);
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/sign-in?role=stakeholder');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  if (!isLoaded || !isSignedIn) return null;

  const bg = (variant: string) => {
    const map: Record<string, string> = {
      a: '#060600', b: '#060410', c: '#030e06', d: '#060400',
      e: '#040810', f: '#060608',
    };
    return map[variant] ?? '#060808';
  };

  return (
    <div style={{ backgroundColor: black, fontFamily: "'Space Mono', monospace", color: white, minHeight: '100vh' }}>

      {/* sticky nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(6,8,8,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', gap: '1rem' }}>
        <a href="/stakeholder" style={{ textDecoration: 'none' }}>
          <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 28, width: 'auto', filter: 'drop-shadow(0 0 8px rgba(200,168,75,0.3))' }} />
        </a>
        <div style={{ display: 'none', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }} className="brief-desktop-nav">
          {SECTIONS.filter(s => s !== 'contact').map(id => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontSize: 9, color: activeSection === id ? gold : muted, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace", transition: 'color 0.2s' }}>
              {NAV_LABELS[id]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: gold, border: `1px solid rgba(200,168,75,0.4)`, padding: '0.25rem 0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
            STAKEHOLDER BRIEF
          </span>
          <button onClick={() => setNavOpen(v => !v)}
            style={{ fontSize: 9, color: muted, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>
            SECTIONS
          </button>
        </div>
      </nav>

      {/* mobile section dropdown */}
      {navOpen && (
        <div style={{ position: 'fixed', top: 60, right: 0, width: 220, backgroundColor: '#0a0c0c', border: '1px solid rgba(255,255,255,0.08)', zIndex: 100, padding: '0.5rem 0' }}>
          {SECTIONS.map(id => (
            <button key={id} onClick={() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setNavOpen(false); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.6rem 1.25rem', fontSize: 10, color: activeSection === id ? gold : white, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace" }}>
              {NAV_LABELS[id]}
            </button>
          ))}
        </div>
      )}

      {/* dot nav */}
      <div className="side-dots" style={{ gap: '0.45rem', zIndex: 40 }}>
        {SECTIONS.map(id => (
          <button key={id} title={NAV_LABELS[id]}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            style={{ width: activeSection === id ? 8 : 5, height: activeSection === id ? 8 : 5, borderRadius: '50%', backgroundColor: activeSection === id ? gold : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
        ))}
      </div>

      {/* ── INTRO ── */}
      <section id="intro" style={{ backgroundColor: bg('a'), minHeight: '85vh', display: 'flex', alignItems: 'center', padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,4rem)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Label>Zungu Festival · Institutional Stakeholder Brief · 2027</Label>
          <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(2.5rem,8vw,5rem)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '2rem', color: white }}>
            ZUNGU<br />
            <span style={{ color: gold }}>STAKEHOLDER</span><br />
            BRIEF
          </h1>
          <Divider accent={gold} />
          <Body>
            This is the full institutional brief for Zungu Festival 2027 — a proposed controlled-capacity destination festival on Navy Island, Port Antonio Harbour, Jamaica. It is written for institutional, governmental, tourism, environmental, marine, and community stakeholders who require detailed information before formal review begins.
          </Body>
          <Body>
            It covers the festival concept, the site, the production reality, the audience model, the local economic participation structure, the operational systems, the environmental approach, and the institutional asks. It is a working document — candid about what is proposed, what is subject to review, and what is not yet determined.
          </Body>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '0.85rem 2rem', backgroundColor: gold, color: black, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace" }}>
              Read the Brief
            </button>
            <a href="mailto:partnership@zungufestival.com?subject=Stakeholder%20Meeting%20Request"
              style={{ padding: '0.85rem 2rem', backgroundColor: 'transparent', color: gold, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, border: `1px solid rgba(200,168,75,0.5)`, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontFamily: "'Space Mono', monospace" }}>
              Request Meeting
            </a>
          </div>
        </div>
      </section>

      {/* ── FESTIVAL OVERVIEW ── */}
      <Wrap id="overview" bg={bg('b')}>
        <Label color={blue}>01 · Festival Overview</Label>
        <Head>Zungu: What It Is</Head>
        <Body>
          Zungu is a proposed five-to-seven day international destination festival on Navy Island, Port Antonio Harbour, Jamaica. Year One target capacity is 5,000 guests. The programme centres on electronic music, with a complementary cultural, wellness, and environmental strand shaped by Jamaica's natural landscape and heritage.
        </Body>
        <Body>
          It is not a mass-attendance event. It is a controlled-capacity, experience-first festival — designed for an international audience that travels specifically for the event and stays for the destination. Navy Island is the venue. Port Antonio is the base. Portland Parish is the economic beneficiary.
        </Body>
        <Divider accent={blue} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', backgroundColor: `rgba(74,143,189,0.15)` }}>
          {[
            { k: 'Site', v: 'Navy Island · Port Antonio Harbour · Jamaica' },
            { k: 'Duration', v: '5–7 days · festival week' },
            { k: 'Target capacity', v: '5,000 guests · Year One' },
            { k: 'Target window', v: 'June 17–23 · 2027' },
            { k: 'Stages', v: '3 principal stages · all temporary structure' },
            { k: 'Programme', v: 'Electronic music · cultural · wellness · water activities' },
            { k: 'Access', v: 'Marine transfer from Port Antonio waterfront only' },
            { k: 'Accommodation', v: 'On-island glamping + Port Antonio hotel & villa network' },
          ].map(({ k, v }) => (
            <div key={k} style={{ padding: '1.25rem', backgroundColor: 'rgba(6,4,16,0.9)' }}>
              <p style={{ fontSize: 9, color: blue, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{k}</p>
              <p style={{ fontSize: '0.88rem', color: white }}>{v}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── PORT ANTONIO CONTEXT ── */}
      <Wrap id="portantonio" bg={bg('c')}>
        <Label color={green}>02 · Port Antonio Context</Label>
        <Head>Why Port Antonio</Head>
        <Body>
          Port Antonio is one of the Caribbean's most historically significant and currently underserved tourism destinations. The town has an international reputation — Errol Flynn, Ian Fleming, the Blue Lagoon — but has not benefited from a tourism model that converts that reputation into sustained local economic activity.
        </Body>
        <Body>
          Navy Island sits in Port Antonio Harbour. Its activation is inseparable from the town. Every marine operator, food vendor, accommodation provider, guide, cultural contributor, and site-services provider is structured as a Portland Parish participant first.
        </Body>
        <Body>
          Guests arrive through Port Antonio. They spend in Port Antonio. They leave knowing Port Antonio. The festival is the anchor. The town is the destination.
        </Body>
        <Divider accent={green} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Tourism Context', body: 'Portland Parish receives a fraction of the island-wide tourist spend despite exceptional natural, cultural, and heritage assets. Zungu is designed to direct sustained international visitor spend into the parish.' },
            { title: 'Operational Base', body: 'Port Antonio waterfront is the mainland staging area for all marine logistics, equipment, crew, and guest embarkation. The town is the operational spine of the event.' },
            { title: 'Local Procurement', body: 'All operational contracts — marine, catering, workforce, accommodation, cultural programme, site services — are tendered to Portland Parish providers first. This is structural, not aspirational.' },
            { title: 'Cultural Context', body: "Jamaican music, food, art, and cultural identity are central to the Zungu programme — not decoration. The island's heritage is the festival's foundation." },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={green} />)}
        </div>
      </Wrap>

      {/* ── NAVY ISLAND SITE ── */}
      <Wrap id="island" bg={bg('d')}>
        <Label color={amber}>03 · Navy Island Site</Label>
        <Head>The Proposed Site</Head>
        <Body>
          Navy Island sits in Port Antonio Harbour, approximately 500 metres from the Port Antonio waterfront. It is a 64-acre island of forest, shoreline, and open sky. There is no mains power, no mains water, no sewerage connection, and no permanent infrastructure of the kind required for a festival operation.
        </Body>
        <Body>
          The island is accessible by boat only. All equipment, materials, water, fuel, food, personnel, and guests move between Port Antonio and Navy Island by marine transfer. This is the defining operational constraint — and the defining quality of the guest experience.
        </Body>
        <Body>
          All structures proposed for Navy Island are temporary. No permanent modification to the island's character is proposed. Full demobilisation within 14 days of the event close is a condition of any activation.
        </Body>
        <Divider accent={amber} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', backgroundColor: `rgba(196,132,42,0.15)` }}>
          {[
            { k: 'Location', v: 'Port Antonio Harbour · Portland Parish · Jamaica' },
            { k: 'Size', v: '64 acres' },
            { k: 'Crossing', v: '~500m from Port Antonio waterfront' },
            { k: 'Access', v: 'Boat only · no bridge or causeway' },
            { k: 'Infrastructure', v: 'None suitable for festival scale · all must be brought in' },
            { k: 'Structures', v: 'All temporary · ballast or weight-anchored · no ground penetration' },
            { k: 'Demobilisation', v: 'Full site reinstatement within 14 days of close' },
            { k: 'Permitting', v: 'Site use subject to all relevant authority approvals' },
          ].map(({ k, v }) => (
            <div key={k} style={{ padding: '1.25rem', backgroundColor: 'rgba(6,4,0,0.9)' }}>
              <p style={{ fontSize: 9, color: amber, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{k}</p>
              <p style={{ fontSize: '0.88rem', color: white }}>{v}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── PRODUCTION REALITY ── */}
      <Wrap id="production" bg={bg('e')}>
        <Label color={blue}>04 · Production Reality</Label>
        <Head>What It Takes to Build This</Head>
        <Body>
          Zungu on Navy Island is one of the most technically demanding festival productions possible. Everything must be brought in and removed by boat. There is no grid power, no mains water, no on-island supply chain. A single production partner is responsible for the full technical delivery.
        </Body>
        <Body>
          The production scale is defined by the island constraint, not by the audience size. A 5,000-capacity event on an island 500 metres from shore requires infrastructure planning equivalent to a significantly larger mainland event.
        </Body>
        <Divider accent={blue} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Marine Logistics First', body: 'Marine operations must be planned before every other element. Equipment, materials, crew, guests, food, fuel, and waste all move by water. The marine schedule governs the build programme.' },
            { title: 'Self-Sufficient Systems', body: 'Power generation, water supply, sanitation, and waste management are island-contained. Nothing relies on mainland infrastructure during the event.' },
            { title: 'Single Production Partner', body: 'One company owns the full technical delivery — stages, power, water, sanitation, accommodation, marine, back-of-house, and reinstatement. Not a consortium managed by the organiser.' },
            { title: 'Build and Strike Window', body: 'The full production window spans build, event, and breakdown. Target: T–14 days for island build commencement, T+14 for full reinstatement. All timings subject to permit conditions.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={blue} />)}
        </div>
      </Wrap>

      {/* ── SOUND + ENERGY ── */}
      <Wrap id="sound" bg={bg('a')}>
        <Label color={gold}>05 · Sound + Energy</Label>
        <Head>The Programme</Head>
        <Body>
          The musical programme positions Zungu at the intersection of Jamaica's sound system heritage and contemporary global electronic music culture. The curation is built around that crossover — not a generic international festival programme placed on a Jamaican island.
        </Body>
        <Body>
          Three stages serve different programme moods and acoustic environments. All operate simultaneously during peak evening hours with acoustic separation managed by stage placement, natural landform, and directional sound design. Sound management — hours, direction, levels — is subject to formal agreement with the relevant local authorities as part of the event licence.
        </Body>
        <Divider accent={gold} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Zungu Main (South-centre)', body: 'Headline-scale programme environment. Open-air headliner stage. Full PA, lighting rig, video production, artist infrastructure. Facing south — primary sound direction away from Port Antonio.' },
            { title: 'Origins (East · Forest Stage)', body: 'Intimate canopy programme environment. Natural acoustic treatment. Atmospheric. Programmatic identity of the festival — this is where the music culture lives.' },
            { title: 'Rebirth (West · Beach Stage)', body: 'Shoreline / beach programme environment. Sunrise and sunset programme. Minimal structure. DJ-first with live provision. Facing west — natural sound barrier from main stage operation.' },
            { title: 'Sound Management', body: 'Directional arrays and landform used to minimise sound bleed between stages and off-island. Operating hours, decibel limits, and sound direction subject to local authority licence conditions.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={gold} />)}
        </div>
      </Wrap>

      {/* ── AUDIENCE ── */}
      <Wrap id="audience" bg={bg('b')}>
        <Label color={purple}>06 · The Audience</Label>
        <Head>Who Comes to Zungu</Head>
        <Body>
          Zungu's controlled-capacity model, island setting, and premium positioning attract a specific audience profile: international cultural travellers, predominantly 25–45, with travel and discretionary spend patterns that align with extended-stay, experience-first tourism.
        </Body>
        <Body>
          This audience does not come for a weekend and leave. They plan a trip to Jamaica around the festival. They stay in Port Antonio accommodation before and after the event. They engage with local guides, restaurants, and experiences throughout the week. Many will be first-time visitors to Jamaica — with high potential to return to the destination.
        </Body>
        <Divider accent={purple} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', backgroundColor: 'rgba(155,95,192,0.15)' }}>
          {[
            { k: 'Primary profile', v: 'International cultural travellers · 25–45' },
            { k: 'Origin markets', v: 'UK · Europe · North America · Caribbean diaspora' },
            { k: 'Travel motivation', v: 'Experience-first · destination-led · cultural' },
            { k: 'Stay pattern', v: 'Festival week plus pre/post stay · extended dwell' },
            { k: 'Spend areas', v: 'Accommodation · dining · transport · activities · guides' },
            { k: 'Jamaica experience', v: 'Many first-time visitors · high repeat destination potential' },
          ].map(({ k, v }) => (
            <div key={k} style={{ padding: '1.25rem', backgroundColor: 'rgba(6,4,16,0.9)' }}>
              <p style={{ fontSize: 9, color: purple, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{k}</p>
              <p style={{ fontSize: '0.88rem', color: white }}>{v}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── STAGE ARCHITECTURE ── */}
      <Wrap id="stages" bg={bg('c')}>
        <Label color={green}>07 · Stage Architecture</Label>
        <Head>Three Stages, Three Environments</Head>
        <Body>
          The three stage positions — Zungu Main, Origins, and Rebirth — are calibrated to the island's natural geography. Each serves a distinct programme function and audience mood. Each is a fully temporary structure with complete demobilisation after the event.
        </Body>
        <Divider accent={green} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {[
            {
              title: 'Zungu Main',
              body: 'South-centre position. Headline-scale programme environment. Open-air headliner stage. Full PA system, lighting rig, LED screen or projection wall, artist infrastructure, production wings, covered FOH position. Roof or tensile weather protection required.',
            },
            {
              title: 'Origins (Forest Stage)',
              body: 'East position. Intimate canopy programme environment in island interior. Natural acoustic treatment. Modular line array. Atmospheric lighting. The spiritual centre of the festival — production design must match that intention.',
            },
            {
              title: 'Rebirth (Beach Stage)',
              body: 'West position. Shoreline / beach programme environment. Sunrise and sunset programme. Minimal structure — the environment is the design. Sound must not bleed to Zungu Main. DJ-first with live instrumentation provision.',
            },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={green} />)}
        </div>
        <div style={{ marginTop: '2rem', padding: '1.25rem', border: `1px solid rgba(58,175,122,0.25)`, backgroundColor: 'rgba(58,175,122,0.05)' }}>
          <p style={{ fontSize: 10, color: green, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Sound Design Constraint</p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(247,243,236,0.65)', lineHeight: 1.65 }}>All three stages must operate simultaneously without acoustic bleed between them or off-island. Stage placement is a primary constraint in site layout planning. Directional arrays, natural landform, and acoustic modelling are required before final stage positions are confirmed.</p>
        </div>
      </Wrap>

      {/* ── ACTIVITIES ── */}
      <Wrap id="activities" bg={bg('d')}>
        <Label color={amber}>08 · Activity Programme</Label>
        <Head>The Programme Beyond the Music</Head>
        <Body>
          A significant proportion of the festival experience occurs outside stage hours. The island and Port Antonio are the daytime venue. The activity programme is delivered in partnership with local operators — not imported.
        </Body>
        <Divider accent={amber} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
          {[
            { title: 'Forest Trails', body: 'Cleared and lit pathways through the island interior. Guided and self-guided options. Wayfinding and accessible routes.' },
            { title: 'Water Activities', body: 'Swimming, kayaking, paddle boarding. Lifeguard stations. Beach infrastructure. Equipment storage and changing facilities.' },
            { title: 'Wellness Programme', body: 'Morning yoga, meditation, and movement. Shade structures. Positioned away from stage areas for acoustic separation.' },
            { title: 'Cultural Spaces', body: 'Jamaican artisan market, food demonstration, cultural workshops, sound system culture programming. Delivered by local practitioners.' },
            { title: 'Catering Village', body: '8–12 vendor units. Jamaican food at every station. Local operators programme. Communal seating, shade, waste stations.' },
            { title: 'Portland Parish Day Programme', body: 'Blue Lagoon, Boston Bay, Frenchman\'s Cove, local guide networks. Structured as a formal part of the Zungu week — not an afterthought.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={amber} />)}
        </div>
      </Wrap>

      {/* ── ACCOMMODATION ── */}
      <Wrap id="accommodation" bg={bg('e')}>
        <Label color={blue}>09 · Accommodation Model</Label>
        <Head>On-Island and In Town</Head>
        <Body>
          Accommodation is a split model: premium temporary glamping on-island for guests who want the full island-immersive experience; hotels, villas, and guesthouses in Port Antonio and across Portland Parish for the rest of the audience.
        </Body>
        <Body>
          On-island accommodation is a premium product — not a campsite. All units require power, lighting, real beds, and a minimum furnishing standard. The accommodation offering is a significant part of the event's premium positioning.
        </Body>
        <Divider accent={blue} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Luxury Glamping', body: 'Structured canvas units with real beds, USB power, lighting, and hanging storage. 60–80 units across two island clusters. Premium tier.' },
            { title: 'Eco Cabins', body: 'Prefabricated timber units with integrated power. Higher price point. Extended lead time for fabrication and island installation.' },
            { title: 'Port Antonio Hotels', body: 'Festival accommodation partner network in Port Antonio. Guests routed through local hotels and guesthouses before external options.' },
            { title: 'Villa Network', body: 'Portland Parish villa and private accommodation referral programme. Local owners directly benefiting from festival visitor spend.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={blue} />)}
        </div>
        <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', borderLeft: `3px solid rgba(74,143,189,0.4)` }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(247,243,236,0.5)', lineHeight: 1.7 }}>
            Wash facilities: minimum 1 shower per 15 on-island guests, 1 WC per 25. All grey water to be contained and removed. No discharge to island ground or surrounding water.
          </p>
        </div>
      </Wrap>

      {/* ── MARINE ACCESS ── */}
      <Wrap id="marine" bg={bg('a')}>
        <Label color={teal}>10 · Marine Access</Label>
        <Head>Everything Moves by Water</Head>
        <Body>
          Marine logistics is the single most complex constraint of this production. All build materials, equipment, crew, food and beverage, guests, and waste move between Port Antonio and Navy Island by boat. The marine operation must be planned and approved before any other element is confirmed.
        </Body>
        <Divider accent={teal} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Build Phase Transfer', body: 'Scheduled barge and tender runs for equipment and materials during the build window. Tidal and weather windows must be factored into the build programme.' },
            { title: 'Guest Transfers', body: 'Capacity for up to 3,000 crossings across arrival windows. Ferry schedule, queue management, and wet-weather contingency. Primary marine transfer contract to Portland Parish operators.' },
            { title: 'Crew Movement', body: 'Daily crew transfers — morning in, evening out for non-overnight crew. Dedicated vessels for crew movement separate from guest service.' },
            { title: 'Emergency Vessel', body: 'Dedicated fast-vessel for medical evacuation on standby during all event hours. Coordination with Port Antonio Coast Guard and local marine authority.' },
            { title: 'Waste Removal', body: 'All waste exits island by boat. Compaction units on-island. Removal schedule to licensed mainland facilities. No island disposal of any kind.' },
            { title: 'Resupply', body: 'Generator fuel, catering supplies, and bar stock run on a daily resupply schedule from the mainland base throughout the event.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={teal} />)}
        </div>
        <div style={{ marginTop: '2rem', padding: '1.25rem', border: `1px solid rgba(42,155,143,0.25)`, backgroundColor: 'rgba(42,155,143,0.05)' }}>
          <p style={{ fontSize: 10, color: teal, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Port Authority Engagement</p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(247,243,236,0.65)', lineHeight: 1.65 }}>The marine transfer operation requires early engagement with the Port Authority of Jamaica and Jamaica Coast Guard to understand vessel licensing, harbour use, and marine safety requirements. This engagement is a prerequisite to confirming the marine operations plan.</p>
        </div>
      </Wrap>

      {/* ── POWER, WATER, SANITATION, WASTE ── */}
      <Wrap id="utilities" bg={bg('b')}>
        <Label color={purple}>11 · Power, Water, Sanitation & Waste</Label>
        <Head>Self-Sufficient Systems</Head>
        <Body>
          There is no grid connection, no mains water, and no sewerage on Navy Island. Every utility system must be brought in, operated on-island, and removed after the event. Environmental compliance is non-negotiable — Navy Island is an ecologically sensitive site.
        </Body>
        <Divider accent={purple} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Power Generation', body: 'Diesel generators with hybrid battery buffer. N+1 redundancy on primary stage generators. Preliminary total load estimate: 1.2–1.8 MVA at peak. Production partner to provide detailed load calculation.' },
            { title: 'Distribution', body: 'Temporary cabling from generator positions to stage and zone boards. All routes marked and protected. Acoustic enclosures to minimise noise intrusion into guest areas.' },
            { title: 'Potable Water', body: 'All drinking and catering water barged in. On-island storage with minimum 48-hour reserve at peak occupancy.' },
            { title: 'Grey Water', body: 'All grey water from showers and sinks collected, tankered off-island, and disposed of through licensed mainland facilities.' },
            { title: 'Sewage', body: 'Portable sanitation or contained composting systems. Sealed removal only. Zero discharge to island ground or surrounding sea — this is a licence condition.' },
            { title: 'Solid Waste', body: 'Segregated waste stream — recycling, organic, and general. On-island compaction where possible. All exits by boat to licensed mainland facilities.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={purple} />)}
        </div>
      </Wrap>

      {/* ── MEDICAL, SECURITY & WELFARE ── */}
      <Wrap id="medical" bg={bg('c')}>
        <Label color={green}>12 · Medical, Security & Welfare</Label>
        <Head>Safety on a Remote Site</Head>
        <Body>
          The island's remote access makes safety planning more demanding than a comparable mainland event. Medical provision, emergency evacuation, and security are planned for both the event and the build and breakdown phases. All coordination with local emergency services is required before activation.
        </Body>
        <Divider accent={green} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'On-Island Medical Unit', body: 'Equipped first aid and treatment unit with qualified paramedics. Minimum 2 paramedics on duty during all event hours, 1 during build and breakdown.' },
            { title: 'Evacuation Vessel', body: 'Dedicated fast-vessel for medical evacuation to Port Antonio. Target response time: under 15 minutes to mainland. Pre-arranged liaison with Port Antonio Hospital.' },
            { title: 'Marine Perimeter Security', body: 'Water-based security patrol during all event hours. Prevents unauthorised vessel access to the island during the event.' },
            { title: 'Entry Control', body: 'Accreditation and ticket scanning at transfer dock. Wristband zoning for guest areas, production zones, and artist compound. All entry from single point.' },
            { title: 'Crowd Management', body: 'Trained crowd management staff across all stage and public areas. Dynamic deployment based on programme schedule. Coordinated with local police.' },
            { title: 'Crew Welfare', body: 'On-island rest, shade, and welfare facilities for overnight production crew. Crew catering from mainland base for day crew. Standards to be agreed with production partner.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={green} />)}
        </div>
      </Wrap>

      {/* ── ENVIRONMENTAL RESPONSIBILITY ── */}
      <Wrap id="environment" bg={bg('d')}>
        <Label color={amber}>13 · Environmental Responsibility</Label>
        <Head>Leave No Permanent Mark</Head>
        <Body>
          Navy Island is an ecologically sensitive site. The production partner is contractually required to restore the island to its pre-event condition. Environmental compliance is a condition of the event licence — not a soft requirement.
        </Body>
        <Body>
          Zungu supports a full environmental impact assessment as part of the permitting process and welcomes the relevant environmental authorities as partners in defining the operational parameters for any activation.
        </Body>
        <Divider accent={amber} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'No Ground Penetration', body: 'Structures use ballast or weight anchoring. No driven stakes or concrete in island soil without explicit environmental authority approval.' },
            { title: 'Vegetation Protection', body: 'No cutting, pruning, or damage to existing vegetation. All routing and layout planned around existing canopy and root systems.' },
            { title: 'Beach Preservation', body: 'No permanent structures within 5m of waterline. Temporary boardwalks over sand where required. Beach returns to pre-event condition within 14 days.' },
            { title: 'Marine Protection', body: 'No discharge of any kind into surrounding waters. Fuel and chemical storage away from waterline with secondary containment. Anchoring restrictions around the island during the event.' },
            { title: 'Full Reinstatement', body: 'Complete site reinstatement within 14 days of event close. Photographic record of pre and post condition. Documentation provided to relevant authorities.' },
            { title: 'Carbon Reporting', body: 'Production partner to provide carbon footprint estimate for the production operation as part of post-event reporting.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={amber} />)}
        </div>
      </Wrap>

      {/* ── LOCAL ECONOMIC PARTICIPATION ── */}
      <Wrap id="participation" bg={bg('e')}>
        <Label color={blue}>14 · Local Economic Participation</Label>
        <Head>Portland Parish First</Head>
        <Body>
          Every operational contract for Zungu is structured with a Portland Parish priority clause. Local participation is not aspirational — it is contractual. This section sets out the specific areas of local economic participation built into the event model.
        </Body>
        <Divider accent={blue} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', backgroundColor: 'rgba(74,143,189,0.15)' }}>
          {[
            { k: 'Marine fleet', v: 'Guest and crew transfer contracts to Portland Parish marine operators first' },
            { k: 'Workforce', v: 'Crew, hospitality, site services, security support — local hiring priority' },
            { k: 'Food & beverage', v: 'On-site vendor programme for Portland and Jamaican food operators' },
            { k: 'Catering supply', v: 'Local food supply chain for event catering where quality and volume allow' },
            { k: 'Accommodation', v: 'Guest accommodation routed through Port Antonio properties first' },
            { k: 'Cultural programme', v: 'Jamaican artists, sound selectors, artisans, and cultural practitioners' },
            { k: 'Guide services', v: 'Portland Parish guide network for mainland day programme' },
            { k: 'Site services', v: 'Local contractors for cleaning, logistics, and maintenance support' },
          ].map(({ k, v }) => (
            <div key={k} style={{ padding: '1.25rem', backgroundColor: 'rgba(4,8,16,0.9)' }}>
              <p style={{ fontSize: 9, color: blue, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{k}</p>
              <p style={{ fontSize: '0.88rem', color: white }}>{v}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── OPERATING CONSIDERATIONS ── */}
      <Wrap id="operations" bg={bg('a')}>
        <Label color={teal}>15 · Operating Considerations</Label>
        <Head>Execution Timeline</Head>
        <Body>
          The following is a target operational programme. Final dates are subject to permitting and licence confirmation. All phases are subject to the relevant authority approvals being in place before commencement.
        </Body>
        <Divider accent={teal} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'rgba(42,155,143,0.15)' }}>
          {[
            { phase: 'T–18 months', milestone: 'Stakeholder dialogue begins. Environmental review pathway identified. Site use discussions initiated.' },
            { phase: 'T–12 months', milestone: 'Production partner selected. Permitting applications submitted. Marine operations framework agreed.' },
            { phase: 'T–6 months', milestone: 'All permits in place. Production partner finalising specification. Local procurement contracts issued.' },
            { phase: 'T–90 days', milestone: 'Site survey completed. Marine logistics plan signed off. Generator specification confirmed.' },
            { phase: 'T–60 days', milestone: 'All structural elements ordered. Marine charter agreements in place. Crew confirmed.' },
            { phase: 'T–30 days', milestone: 'Mainland staging yard operational. Equipment arriving. Pre-build inspection.' },
            { phase: 'T–14 days', milestone: 'Build commences on island. Marine transfer schedule active. Generator estate installed.' },
            { phase: 'T–7 days', milestone: 'Stage structures complete. Power tested. Accommodation units installed and dressed.' },
            { phase: 'T–3 days', milestone: 'Full technical rehearsal. All infrastructure live. Safety walkthrough with event team and relevant authorities.' },
            { phase: 'Event Days', milestone: 'All systems operational. Production partner on standby. Daily debrief.' },
            { phase: 'T+3 days', milestone: 'Breakdown commences. Marine removal schedule active.' },
            { phase: 'T+14 days', milestone: 'Full site reinstatement. Environmental inspection. Documentation to organisers and relevant authorities.' },
          ].map(({ phase, milestone }) => (
            <div key={phase} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', padding: '1rem 1.25rem', backgroundColor: 'rgba(6,6,0,0.9)', alignItems: 'start' }}>
              <p style={{ fontSize: 10, color: teal, letterSpacing: '0.1em', fontWeight: 700 }}>{phase}</p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(247,243,236,0.7)', lineHeight: 1.6 }}>{milestone}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── STAKEHOLDER ALIGNMENT ── */}
      <Wrap id="alignment" bg={bg('b')}>
        <Label color={purple}>16 · Stakeholder Alignment</Label>
        <Head>No Activation Before Review Is Complete</Head>
        <Body>
          Zungu is being developed with full awareness that an event on Navy Island requires engagement across multiple institutional, environmental, marine, regulatory, and community stakeholders. The organisers are not seeking to proceed by exception. They are seeking to proceed by consent.
        </Body>
        <Body>
          Community consultation is not an obligation to be discharged. It is a process the organisers are committed to conducting properly — with sufficient time, genuine openness to concerns, and willingness to adjust the event model in response to what is learned.
        </Body>
        <Divider accent={purple} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', backgroundColor: 'rgba(155,95,192,0.15)' }}>
          {[
            { k: 'Site use / permitting', v: 'Relevant authority approval required before any activation' },
            { k: 'Environmental review', v: 'EIA scope to be determined with NEPA and relevant bodies' },
            { k: 'Marine access', v: 'Port Authority of Jamaica · Jamaica Coast Guard coordination' },
            { k: 'Sound management', v: 'Operating hours and decibel limits subject to local authority licence' },
            { k: 'Emergency planning', v: 'Emergency services coordination and route planning required' },
            { k: 'Community consultation', v: 'Open to formal consultation process with Port Antonio community' },
            { k: 'Demobilisation plan', v: 'Full reinstatement plan to be submitted and approved before activation' },
            { k: 'Tourism alignment', v: 'Jamaica Tourism Board / TPDCo engagement on strategy alignment' },
          ].map(({ k, v }) => (
            <div key={k} style={{ padding: '1.25rem', backgroundColor: 'rgba(6,4,16,0.9)' }}>
              <p style={{ fontSize: 9, color: purple, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{k}</p>
              <p style={{ fontSize: '0.88rem', color: white }}>{v}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── INSTITUTIONAL ASKS ── */}
      <Wrap id="asks" bg={bg('c')}>
        <Label color={green}>17 · Institutional Asks</Label>
        <Head>What We Are Seeking</Head>
        <Body>
          The following sets out the specific dialogue Zungu is seeking with each stakeholder group. These are asks for engagement and process — not requests for unconditional approval.
        </Body>
        <Divider accent={green} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {[
            {
              title: 'Jamaica Tourism Board / TPDCo',
              body: 'Dialogue on alignment with national tourism strategy and Portland Parish tourism development priorities. Guidance on licensing and approval pathways for controlled-capacity destination events. Support in identifying appropriate stakeholder engagement process.',
            },
            {
              title: 'Portland Parish Council',
              body: 'Early dialogue on the event proposal and the Portland Parish approval and consultation process. Engagement with Port Antonio community and business representatives on the local economic participation model and review requirements.',
            },
            {
              title: 'NEPA / Environmental Authorities',
              body: 'Guidance on the environmental review requirements for temporary event use of Navy Island. Scoping of EIA requirements and timeline. Early discussion of acceptable demobilisation, reinstatement, and ongoing environmental monitoring requirements.',
            },
            {
              title: 'Port Authority of Jamaica',
              body: 'Understanding of the marine access, vessel operator licensing, and harbour use requirements for a controlled-capacity marine transfer operation between Port Antonio and Navy Island. Identification of any marine infrastructure requirements or restrictions.',
            },
            {
              title: 'Jamaica Coast Guard',
              body: 'Early dialogue on marine safety requirements for the crossing operation and event perimeter. Understanding of emergency vessel coordination, marine safety notification requirements, and coast guard engagement during event hours.',
            },
            {
              title: 'Portland Parish Community',
              body: 'Open consultation with Port Antonio residents, community organisations, business associations, and local representatives. Understanding of concerns, requirements, and expectations. Willingness to adjust the event model in response to community feedback.',
            },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={green} />)}
        </div>
      </Wrap>

      {/* ── CONTACT / CTA ── */}
      <section id="contact" style={{ backgroundColor: bg('a'), padding: 'clamp(4rem,10vw,7rem) clamp(1.5rem,6vw,4rem)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <Label>Institutional Stakeholder Brief · Next Step</Label>
          <Head>Ready to Begin the Conversation?</Head>
          <Body>
            You have read the brief. The next step is the deck — the full visual presentation of the festival, the site, and the programme.
          </Body>
          <a
            href="/deck?role=stakeholder"
            style={{ marginTop: '1rem', display: 'inline-block', padding: '1rem 2.5rem', backgroundColor: gold, color: black, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', fontFamily: "'Space Mono', monospace" }}>
            View Deck →
          </a>
          <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: muted, lineHeight: 1.7 }}>
            For stakeholder meetings: partnership@zungufestival.com
          </p>
        </div>
      </section>

    </div>
  );
}

export default function StakeholderBriefPage() {
  return (
    <Suspense>
      <StakeholderBriefInner />
    </Suspense>
  );
}
