'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/* ── colour tokens ── */
const gold   = '#C8A84B';
const rust   = '#C45A2A';
const green  = '#3AAF7A';
const blue   = '#4A8FBD';
const purple = '#9B5FC0';
const black  = '#060808';
const white  = '#F7F3EC';
const muted  = '#6B6355';

/* ── section registry ── */
const SECTIONS = [
  'intro', 'site', 'base', 'stages', 'activities', 'accommodation',
  'marine', 'power', 'sanitation', 'medical', 'security',
  'boh', 'environment', 'scope', 'timeline', 'cta',
] as const;
type SectionId = typeof SECTIONS[number];

const NAV_LABELS: Record<SectionId, string> = {
  intro:         'Brief',
  site:          'Site',
  base:          'Base Ops',
  stages:        'Stages',
  activities:    'Activities',
  accommodation: 'Stay',
  marine:        'Marine',
  power:         'Power',
  sanitation:    'Sanitation',
  medical:       'Medical',
  security:      'Security',
  boh:           'Back of House',
  environment:   'Environment',
  scope:         'Scope',
  timeline:      'Timeline',
  cta:           'Contact',
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
    <p style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(247,243,236,0.72)', marginBottom: '1.25rem', maxWidth: 680 }}>
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
function ProductionBriefInner() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<SectionId>('intro');
  const [navOpen, setNavOpen] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', capacity: '', message: '' });
  const [sent, setSent] = useState(false);
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});

  const rawRole = searchParams.get('role') ?? '';
  const safeRole = rawRole === 'investor' || rawRole === 'partner' ? rawRole : 'partner';

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/sign-in?role=partner');
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/partner-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, role: 'partner', type: 'production-brief' }),
    });
    setSent(true);
  }

  if (!isLoaded || !isSignedIn) return null;

  const bg = (ch: string) => {
    const map: Record<string, string> = {
      '01': '#060600', '02': '#060410', '03': '#030e06', '04': '#060400',
      '05': '#040810', '06': '#060600', '07': '#060410', '08': '#030e06',
    };
    return map[ch] ?? '#060808';
  };

  return (
    <div style={{ backgroundColor: black, fontFamily: "'Space Mono', monospace", color: white, minHeight: '100vh' }}>

      {/* sticky nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(6,8,8,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', gap: '1rem' }}>
        <a href="/partner?role=partner" style={{ textDecoration: 'none' }}>
          <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 28, width: 'auto', filter: 'drop-shadow(0 0 8px rgba(200,168,75,0.3))' }} />
        </a>
        <div style={{ display: 'none', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }} className="brief-desktop-nav">
          {SECTIONS.filter(s => s !== 'cta').map(id => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontSize: 9, color: activeSection === id ? gold : muted, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace", transition: 'color 0.2s' }}>
              {NAV_LABELS[id]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: gold, border: `1px solid rgba(200,168,75,0.4)`, padding: '0.25rem 0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
            PRODUCTION BRIEF
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
      <section id="intro" style={{ backgroundColor: '#060600', minHeight: '85vh', display: 'flex', alignItems: 'center', padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,4rem)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Label>Zungu Festival · Production Partner Brief</Label>
          <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(2.5rem,8vw,5rem)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '2rem', color: white }}>
            BUILD THE<br />
            <span style={{ color: gold }}>UNREPEATABLE</span>
          </h1>
          <Divider accent={gold} />
          <Body>
            Zungu is a five-to-seven day cultural festival on Navy Island, Portland Parish, Jamaica. The island has no permanent infrastructure. Everything you see, hear, eat, sleep on, and experience will be built — and removed — by a single production partner.
          </Body>
          <Body>
            This brief sets out the site, the scope, the technical requirements, and the execution timeline for that partner. It is a working document, not a final specification. We are looking for a partner who can look at this and say: we know how to do this.
          </Body>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => setShowCTA(true)}
              style={{ padding: '0.85rem 2rem', backgroundColor: gold, color: black, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace" }}>
              Express Interest
            </button>
            <button onClick={() => document.getElementById('site')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '0.85rem 2rem', backgroundColor: 'transparent', color: gold, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, border: `1px solid rgba(200,168,75,0.5)`, cursor: 'pointer', fontFamily: "'Space Mono', monospace" }}>
              Read the Brief
            </button>
          </div>
        </div>
      </section>

      {/* ── SITE ── */}
      <Wrap id="site" bg="#060410">
        <Label color={purple}>01 · The Site</Label>
        <Head>Navy Island,<br />Portland Parish</Head>
        <Body>
          Navy Island sits approximately 500m off the coast of Port Antonio. It is 64 acres of forested land with natural beach access on three sides. There is no mains power, no mains water, no sewerage connection, and no permanent structures of the kind needed for a festival operation.
        </Body>
        <Body>
          The island is accessible by boat only. All equipment, materials, water, fuel, food, and personnel move by marine transfer. This is the defining constraint of the production — and the defining quality of the guest experience.
        </Body>
        <Divider accent={purple} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', backgroundColor: 'rgba(155,95,192,0.15)' }}>
          {[
            { k: 'Site area', v: '64 acres of forested island' },
            { k: 'Crossing', v: '~500m from Port Antonio waterfront' },
            { k: 'Beaches', v: '3 accessible beach areas' },
            { k: 'Elevation', v: 'Varied — hilltop vantage possible' },
            { k: 'Access', v: 'Boat only — no bridge or causeway' },
            { k: 'Existing infra', v: 'None suitable for festival scale' },
          ].map(({ k, v }) => (
            <div key={k} style={{ padding: '1.25rem', backgroundColor: 'rgba(6,4,16,0.9)' }}>
              <p style={{ fontSize: 9, color: purple, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{k}</p>
              <p style={{ fontSize: '0.88rem', color: white }}>{v}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── BASE OPS ── */}
      <Wrap id="base" bg="#030e06">
        <Label color={green}>02 · Base of Operations</Label>
        <Head>Port Antonio<br />Staging Area</Head>
        <Body>
          The mainland base will be established on the Port Antonio waterfront. This is where all logistics, crew catering, equipment staging, generator fuel management, and return logistics are coordinated. The base is the operational spine — Navy Island is the guest-facing experience.
        </Body>
        <Divider accent={green} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Staging Yard', body: 'Secure compound for pre-staged equipment, pallets, and rigging. Must accommodate HGV access and laydown.' },
            { title: 'Crew Hub', body: 'Catering, welfare, and rest facilities for up to 300 crew at peak build. Separate from guest zones.' },
            { title: 'Marine Dispatch', body: 'Controlled loading dock with scheduled boat runs. All island materials log in here.' },
            { title: 'Fuel & Power Store', body: 'Bonded fuel storage for generator estate. Managed rotation with safety compliance to local regulations.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={green} />)}
        </div>
      </Wrap>

      {/* ── STAGES ── */}
      <Wrap id="stages" bg="#060400">
        <Label color={rust}>03 · Stage Architecture</Label>
        <Head>Three Stages,<br />Three Environments</Head>
        <Body>
          Zungu runs three distinct stages, each with a different acoustic profile, capacity, and aesthetic. The physical design of each stage is part of the festival's identity. Production partner will work with our creative director on final stage builds.
        </Body>
        <Divider accent={rust} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {[
            {
              title: 'Main Stage (Zungu Main)',
              body: 'Open-air headliner stage. Design crowd load: 2,000–3,000. Full PA system, lighting rig, LED screen or video projection wall, artist infrastructure, production wings, and covered FOH position. Roof or tensile weather protection required.',
            },
            {
              title: 'Forest Stage (Origins)',
              body: 'Enclosed canopy environment in the island interior. Design crowd load: 500–800. Natural acoustic treatment. Modular line array. Atmospheric lighting. This is where the festival\'s identity lives — production design must match that intention.',
            },
            {
              title: 'Shoreline Stage (Rebirth)',
              body: 'Sunset/transition programme. Design crowd load: 800–1,200. Minimal structure — the environment is the design. Sound must not bleed to Main Stage. DJ-first configuration with live instrumentation provision.',
            },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={rust} />)}
        </div>
        <div style={{ marginTop: '2rem', padding: '1.25rem', border: `1px solid rgba(196,90,42,0.25)`, backgroundColor: 'rgba(196,90,42,0.05)' }}>
          <p style={{ fontSize: 10, color: rust, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Sound Design Note</p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(247,243,236,0.65)', lineHeight: 1.65 }}>All three stages must operate simultaneously without acoustic bleed between them. Stage placement is a primary constraint in site layout planning. Directional arrays and natural landform should be used where possible.</p>
        </div>
      </Wrap>

      {/* ── ACTIVITIES ── */}
      <Wrap id="activities" bg="#040810">
        <Label color={blue}>04 · Activity Infrastructure</Label>
        <Head>The Programme<br />Beyond the Music</Head>
        <Body>
          A significant portion of the festival experience occurs outside stage hours. The production partner is responsible for infrastructure that supports all non-musical programming.
        </Body>
        <Divider accent={blue} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
          {[
            { title: 'Forest Trails', body: 'Cleared and lit pathways connecting stage and accommodation zones. Wayfinding, safety lighting, and accessible routes.' },
            { title: 'Water Activities', body: 'Beach infrastructure for swimming, kayaking, and paddleboard. Lifeguard stations, equipment storage, and changing facilities.' },
            { title: 'Wellness Pavilions', body: 'Shade structures and flooring for yoga, meditation, and movement programming. Morning-oriented positioning away from stage noise.' },
            { title: 'Cultural Spaces', body: 'Modular exhibition and workshop areas for artisans, food demonstrators, and cultural practitioners. Power, shade, and furniture required.' },
            { title: 'Catering Village', body: 'Central food court with 8–12 vendor units, communal seating, shade, waste stations, and power distribution.' },
            { title: 'Bar Network', body: 'Satellite bar points across site — minimum 4 locations with chilled storage, drainage, and POS power.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={blue} />)}
        </div>
      </Wrap>

      {/* ── ACCOMMODATION ── */}
      <Wrap id="accommodation" bg="#060600">
        <Label color={gold}>05 · Accommodation</Label>
        <Head>On-Island<br />Sleeping</Head>
        <Body>
          A proportion of guests will sleep on the island. Accommodation is a premium product — not a campsite. Infrastructure must reflect that positioning. All units require power, lighting, bedding, and a minimum level of furnishing.
        </Body>
        <Divider accent={gold} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Navy Obsidian', body: 'High-spec on-island accommodation zone. Structured premium units with real beds, lighting, USB power, and hanging storage. 60–80 units across two clusters.' },
            { title: 'The Thirty Compound', body: 'Exclusive on-island compound for The Thirty package guests. Private suites, dedicated facilities, concierge-level fitout. Separate from general accommodation zones.' },
            { title: 'Island Village', body: 'On-island accommodation for full-week guests. Communal wash facilities, shared social spaces. Minimum standard: weatherproof, ventilated, lockable.' },
            { title: 'Full Week + VIP Mainland Guests', body: 'Guests arriving by marine transfer from Port Antonio hotels and villas. No on-island accommodation required. Transfer scheduling, marine logistics, and arrival flow are a primary production workstream.' },
            { title: 'Artist + Crew Compound', body: 'Separate village for artists and crew with private accommodation, dedicated catering, and secure perimeter. Production partner manages security boundary.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={gold} />)}
        </div>
        <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', borderLeft: `3px solid rgba(200,168,75,0.4)` }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(247,243,236,0.5)', lineHeight: 1.7 }}>
            Wash facilities: minimum 1 shower per 15 guests, 1 WC per 25 guests. All grey water to be contained and removed. No discharge to island ground or surrounding water.
          </p>
        </div>
      </Wrap>

      {/* ── MARINE ── */}
      <Wrap id="marine" bg="#060410">
        <Label color={purple}>06 · Marine Operations</Label>
        <Head>Everything Moves<br />By Water</Head>
        <Body>
          Marine logistics is the single most complex constraint of this production. All build materials, all equipment, all crew, all food and beverage, all guests, and all waste move between Port Antonio and Navy Island by boat. The marine operation must be planned before anything else.
        </Body>
        <Divider accent={purple} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Build Phase Transfer', body: 'Scheduled barge/tender runs for equipment and materials during the build window. Tidal and weather windows must be accounted for in the build programme.' },
            { title: 'Guest Transfers', body: 'Capacity for up to 3,000 crossings across arrival windows. Ferry schedule, queue management, and wet-weather alternatives.' },
            { title: 'Crew Rotation', body: 'Daily crew transfers — morning in, evening out for non-overnight crew. Minimum 2 vessels dedicated to crew movement.' },
            { title: 'Emergency Protocol', body: 'Dedicated medical and emergency vessel on standby during all event hours. Coordination with Port Antonio Coast Guard and local marine authority.' },
            { title: 'Waste Removal', body: 'All waste exits island by boat. Compactor units and waste management schedule required. No island disposal.' },
            { title: 'Fuel & Consumables', body: 'Generator fuel, catering supplies, and bar stock run on a resupply schedule from the mainland base throughout the event.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={purple} />)}
        </div>
      </Wrap>

      {/* ── POWER ── */}
      <Wrap id="power" bg="#030e06">
        <Label color={green}>07 · Power</Label>
        <Head>Generator Estate<br />&amp; Distribution</Head>
        <Body>
          There is no grid connection on Navy Island. All power is generated on-island using diesel generators with a hybrid battery buffer where feasible. The generator estate must be sized to handle simultaneous peak load across all three stages, catering, accommodation, and public infrastructure.
        </Body>
        <Divider accent={green} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
          {[
            { title: 'Total Load Estimate', body: 'Preliminary estimate: 1.2–1.8 MVA at peak. Production partner to provide detailed load calculation as part of technical response.' },
            { title: 'Generator Configuration', body: 'N+1 redundancy on primary stage generators. Separate generator sets for catering, accommodation, and public infrastructure.' },
            { title: 'Distribution', body: 'Temporary cabling routes from generator positions to stage and zone distribution boards. All routes to be marked and protected.' },
            { title: 'Hybrid Buffer', body: 'Battery storage units to reduce generator runtime during off-peak hours and provide UPS for critical systems.' },
            { title: 'Fuel Management', body: 'On-island fuel storage with daily resupply from mainland base. Spill containment and compliance with Jamaican environmental regulations.' },
            { title: 'Noise Mitigation', body: 'Generator positioning and acoustic enclosures to minimise noise intrusion into guest and stage areas.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={green} />)}
        </div>
      </Wrap>

      {/* ── SANITATION ── */}
      <Wrap id="sanitation" bg="#060400">
        <Label color={rust}>08 · Sanitation</Label>
        <Head>Water, Waste<br />&amp; Welfare</Head>
        <Body>
          All water is transported to the island. There is no borehole or mains connection. All wastewater, sewage, and solid waste must be contained and removed. Environmental compliance is non-negotiable — Navy Island is an ecologically sensitive site.
        </Body>
        <Divider accent={rust} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Potable Water', body: 'All drinking and catering water barged in. On-island storage tanks with a minimum 48-hour reserve capacity at peak occupancy.' },
            { title: 'Grey Water', body: 'All grey water from showers and sinks collected, tankered off-island, and disposed of through licensed facilities on the mainland.' },
            { title: 'Sewage', body: 'Portable sanitation units or contained composting systems. Zero discharge to ground or sea. Sealed removal only.' },
            { title: 'WC Provision', body: 'Minimum 1 WC per 100 guests in public areas, 1 per 50 in accommodation zones. Premium toilet units in VIP and artist areas.' },
            { title: 'Solid Waste', body: 'Segregated waste stream — recycling, organic, and general. On-island compaction where possible. All exits by boat to licensed mainland facilities.' },
            { title: 'Environmental Audit', body: 'Pre and post event environmental assessment required. Production partner to provide compliance documentation to event organisers.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={rust} />)}
        </div>
      </Wrap>

      {/* ── MEDICAL ── */}
      <Wrap id="medical" bg="#040810">
        <Label color={blue}>09 · Medical</Label>
        <Head>On-Site Medical<br />&amp; Evacuation</Head>
        <Body>
          A full medical provision is required on-island for the duration of the event, including build and breakdown phases. Given the island's remote access, evacuation protocols are a primary planning consideration.
        </Body>
        <Divider accent={blue} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Medical Unit', body: 'Equipped first aid and medical treatment unit with qualified paramedics. Minimum 2 paramedics during all event hours, 1 during build.' },
            { title: 'Triage Area', body: 'Shaded, accessible, and clearly signed triage area away from public circulation. Power for equipment.' },
            { title: 'Evacuation Vessel', body: 'Dedicated fast vessel for medical evacuation to Port Antonio. Response time target: under 15 minutes to mainland.' },
            { title: 'Hospital Liaison', body: 'Pre-arranged coordination with Port Antonio Hospital. Production partner to confirm this relationship before event.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={blue} />)}
        </div>
      </Wrap>

      {/* ── SECURITY ── */}
      <Wrap id="security" bg="#060600">
        <Label color={gold}>10 · Security</Label>
        <Head>Island Security<br />Framework</Head>
        <Body>
          The island perimeter is a natural boundary. Access control is primarily managed at the marine transfer points. On-island security covers zones, crowd management, and artist protection.
        </Body>
        <Divider accent={gold} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Marine Perimeter', body: 'Water-based security patrol during all event hours. Prevents unauthorised vessel access.' },
            { title: 'Entry Control', body: 'Accreditation and ticket scanning at transfer dock. Wristband zoning for guest areas, production areas, and artist compound.' },
            { title: 'Crowd Management', body: 'Trained crowd management staff across all stage and public areas. Dynamic deployment based on programme schedule.' },
            { title: 'Artist Security', body: 'Dedicated security for artist compound and backstage areas. Close protection available on request.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={gold} />)}
        </div>
      </Wrap>

      {/* ── BOH ── */}
      <Wrap id="boh" bg="#060410">
        <Label color={purple}>11 · Back of House</Label>
        <Head>Production &amp; Crew<br />Infrastructure</Head>
        <Body>
          Production infrastructure must be self-contained and operate independently from guest areas. Crew welfare, catering, and logistics must be resourced to operate across a 10–14 day window (build, event, breakdown).
        </Body>
        <Divider accent={purple} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Production Office', body: 'On-island production HQ with comms, power, and shelter. Serves as nerve centre during build and event phases.' },
            { title: 'Crew Catering', body: 'Hot meals service for crew three times daily during build. Event phase crew catering from mainland base for day crew.' },
            { title: 'Tool & Equipment Store', body: 'Secure, weather-protected storage for tools, spare parts, and critical consumables. Inventory management system.' },
            { title: 'Waste Holding', body: 'Dedicated BOH waste compound with segregation, compaction, and scheduled marine removal.' },
            { title: 'Communications', body: 'Radio network covering all zones. Production partner to supply radios and repeater infrastructure for island-wide coverage.' },
            { title: 'Crew Welfare', body: 'On-island rest areas, shade, and welfare facilities for overnight crew. Minimum standard: dry, ventilated, with power.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={purple} />)}
        </div>
      </Wrap>

      {/* ── ENVIRONMENT ── */}
      <Wrap id="environment" bg="#030e06">
        <Label color={green}>12 · Environmental</Label>
        <Head>Leave No<br />Permanent Mark</Head>
        <Body>
          Navy Island is an ecologically sensitive site. The production partner is contractually required to restore the island to its pre-event condition. Environmental compliance is not a soft requirement — it is a condition of the event licence.
        </Body>
        <Divider accent={green} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'No Ground Penetration', body: 'Structures must use ballast, weight, or non-invasive anchoring. No driven stakes or concrete in island soil without explicit approval.' },
            { title: 'Tree Protection', body: 'No cutting, pruning, or damage to existing vegetation. All routing planned around existing canopy.' },
            { title: 'Beach Preservation', body: 'No permanent structures within 5m of waterline. Temporary boardwalks to be used over sand where required.' },
            { title: 'Marine Protection', body: 'No discharge of any kind into surrounding waters. Fuel and chemical storage away from waterline with secondary containment.' },
            { title: 'Reinstatement', body: 'Full site reinstatement within 14 days of event close. Photographic evidence of pre and post condition required.' },
            { title: 'Carbon Reporting', body: 'Production partner to provide carbon footprint estimate for the production operation as part of post-event reporting.' },
          ].map(c => <Card key={c.title} title={c.title} body={c.body} accent={green} />)}
        </div>
      </Wrap>

      {/* ── SCOPE ── */}
      <Wrap id="scope" bg="#060400">
        <Label color={rust}>13 · Scope Summary</Label>
        <Head>What We Need<br />From You</Head>
        <Body>
          We are looking for a single production partner who can own the full technical delivery. We are not looking for a consortium of sub-contractors managed by the event organiser — we want one company that takes responsibility for the below.
        </Body>
        <Divider accent={rust} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', backgroundColor: 'rgba(196,90,42,0.15)' }}>
          {[
            'Site survey & logistics planning',
            'Marine operations & transfer management',
            'Power generation & distribution',
            'Water & sanitation systems',
            'Stage builds & audio-visual',
            'Accommodation units & camp infrastructure',
            'Activity & catering infrastructure',
            'BOH & crew welfare',
            'Security framework',
            'Medical provision',
            'Environmental compliance',
            'Full site reinstatement',
          ].map(item => (
            <div key={item} style={{ padding: '1rem 1.25rem', backgroundColor: 'rgba(6,4,0,0.9)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: rust, fontSize: 12 }}>✓</span>
              <p style={{ fontSize: '0.85rem', color: white }}>{item}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── TIMELINE ── */}
      <Wrap id="timeline" bg="#040810">
        <Label color={blue}>14 · Execution Timeline</Label>
        <Head>Build, Run,<br />Restore</Head>
        <Body>
          The following is a target programme. Final dates are subject to final permitting and licence confirmation. Production partner should flag any constraints against this timeline as part of their response.
        </Body>
        <Divider accent={blue} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'rgba(74,143,189,0.15)' }}>
          {[
            { phase: 'T–90 days', milestone: 'Site survey completed. Marine logistics plan signed off. Generator specification confirmed.' },
            { phase: 'T–60 days', milestone: 'All structural elements ordered. Marine charter agreements in place. Crew confirmed.' },
            { phase: 'T–30 days', milestone: 'Mainland staging yard operational. Equipment beginning to arrive. Pre-build inspection.' },
            { phase: 'T–14 days', milestone: 'Build commences on island. Marine transfer schedule active. Generator estate installed.' },
            { phase: 'T–7 days', milestone: 'Stage structures complete. Power tested. Accommodation units installed and dressed.' },
            { phase: 'T–3 days', milestone: 'Full technical rehearsal. All infrastructure live. Safety walkthrough with event team.' },
            { phase: 'T–1 day', milestone: 'Final checks. Crew briefings. Medical and security operational.' },
            { phase: 'Event Days', milestone: 'All systems operational. Production partner on standby throughout. Daily debrief.' },
            { phase: 'T+3 days', milestone: 'Breakdown commences. Marine removal schedule active.' },
            { phase: 'T+14 days', milestone: 'Full site reinstatement. Environmental inspection. Documentation to organiser.' },
          ].map(({ phase, milestone }) => (
            <div key={phase} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', padding: '1rem 1.25rem', backgroundColor: 'rgba(4,8,16,0.9)', alignItems: 'start' }}>
              <p style={{ fontSize: 10, color: blue, letterSpacing: '0.1em', fontWeight: 700 }}>{phase}</p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(247,243,236,0.7)', lineHeight: 1.6 }}>{milestone}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── CTA ── */}
      <section id="cta" style={{ backgroundColor: '#060600', padding: 'clamp(4rem,10vw,7rem) clamp(1.5rem,6vw,4rem)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <Label>Production Partner · Next Step</Label>
          <Head>Ready to Build<br />Something Unprecedented?</Head>
          <Body>
            You have read the brief. The next step is the deck — stages, activities, and the full programme detail.
          </Body>
          <a
            href="/deck?role=partner"
            style={{ marginTop: '1rem', display: 'inline-block', padding: '1rem 2.5rem', backgroundColor: gold, color: black, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', fontFamily: "'Space Mono', monospace" }}>
            View Deck →
          </a>
        </div>
      </section>

      {/* ── MODAL ── */}
      {showCTA && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setShowCTA(false); }}>
          <div style={{ backgroundColor: '#0a0c0c', border: '1px solid rgba(255,255,255,0.08)', maxWidth: 540, width: '100%', padding: 'clamp(1.5rem,4vw,2.5rem)', maxHeight: '90vh', overflowY: 'auto' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontSize: 12, color: gold, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>Received</p>
                <p style={{ fontSize: '0.9rem', color: 'rgba(247,243,236,0.7)', lineHeight: 1.7 }}>We'll be in touch with next steps.</p>
                <button onClick={() => { setShowCTA(false); setSent(false); }}
                  style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', backgroundColor: 'transparent', color: gold, border: `1px solid rgba(200,168,75,0.4)`, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', fontFamily: "'Space Mono', monospace" }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <p style={{ fontSize: 10, color: gold, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 700 }}>Production Partner · Expression of Interest</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { key: 'name', label: 'Contact Name', type: 'text' },
                    { key: 'company', label: 'Company Name', type: 'text' },
                    { key: 'email', label: 'Email Address', type: 'email' },
                    { key: 'capacity', label: 'Relevant Experience (island / remote / festival)', type: 'text' },
                  ].map(({ key, label, type }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: 9, color: muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{label}</label>
                      <input
                        type={type}
                        required
                        value={(form as Record<string, string>)[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        style={{ width: '100%', padding: '0.7rem 0.9rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: white, fontSize: '0.85rem', fontFamily: "'Space Mono', monospace", outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 9, color: muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: white, fontSize: '0.85rem', fontFamily: "'Space Mono', monospace", outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button type="submit"
                      style={{ flex: 1, padding: '0.85rem', backgroundColor: gold, color: black, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace" }}>
                      Send
                    </button>
                    <button type="button" onClick={() => setShowCTA(false)}
                      style={{ padding: '0.85rem 1.25rem', backgroundColor: 'transparent', color: muted, border: `1px solid rgba(255,255,255,0.1)`, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Space Mono', monospace" }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductionBriefPage() {
  return (
    <Suspense>
      <ProductionBriefInner />
    </Suspense>
  );
}
