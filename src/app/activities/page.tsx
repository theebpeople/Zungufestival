'use client';

import React, { useState, useEffect } from 'react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const BG      = '#04080A';
const ALT     = '#0D2018';
const GOLD    = '#C8A84B';
const CREAM   = '#F2EBD9';
const MUTED   = 'rgba(242,235,217,0.45)';
const DIM     = 'rgba(242,235,217,0.18)';
const RUST    = '#C45A2A';

const fontDisplay = "'Unbounded', sans-serif";
const fontMono    = "'Space Mono', monospace";

// ── Nav sections ──────────────────────────────────────────────────────────────
const NAV_LINKS  = ['Thesis', 'Zones', 'Commercial', 'Mainland', 'Port Antonio', 'Sustainability'];
const SECTION_IDS = ['hero', 'thesis', 'zones', 'commercial', 'mainland', 'benefit', 'sustainability'];

// ── Zone data ─────────────────────────────────────────────────────────────────
const ZONES = [
  {
    num: '01',
    name: 'THE COVE',
    tag: 'Water + Marine Programming',
    purpose: 'The Cove is the island\'s water-facing daylight zone: guided marine activity, reef-safe exploration, private boat windows, and premium leisure.',
    revLogic: 'Paid excursions, premium charter bookings, water activity partnerships, VIP credit redemptions, private boat packages, and marine sponsor activations.',
    operatorModel: 'Licensed marine operators deliver approved activities under Zungu scheduling, safety, pricing, and capacity controls.',
    partnerOpp: 'Marine equipment, reef-safe sunscreen, beverage, eco partners, camera technology, insurance, tourism, and conservation partners.',
    opNote: 'Reef protocol is mandatory. All activity is subject to marine licensing, operator insurance, environmental approval, weather conditions, and controlled guest windows.',
  },
  {
    num: '02',
    name: 'THE SANCTUM',
    tag: 'Wellness + Recovery',
    purpose: 'The Sanctum is the island\'s recovery environment: quiet, wellness, reset, and premium guest care.',
    revLogic: 'Paid treatments, wellness packages, VIP and Glamping credits, recovery sponsors, hospitality add-ons, and premium booking windows.',
    operatorModel: 'Professional wellness providers deliver services under Zungu scheduling, space, pricing, and guest-flow controls.',
    partnerOpp: 'Hydration, skincare, sleep, athletic recovery, wellness, hospitality, and premium lifestyle partners.',
    opNote: 'No medical or therapeutic claims should be made without qualified professionals, proper licensing, insurance, and waivers.',
  },
  {
    num: '03',
    name: 'THE YARD',
    tag: 'Culture + Sound-System Context',
    purpose: 'The Yard gives the festival its voice in daylight. Sound-system context, vinyl, rum, talks, demonstrations, and Jamaican-rooted programming explain why Zungu belongs here.',
    revLogic: 'Sponsored talks, partner panels, rum and coffee tastings, vinyl market fees, cultural partner fees, and beverage activations.',
    operatorModel: 'Curated by Zungu with local cultural partners, sound-system operators, selectors, artists, and Portland-based contributors.',
    partnerOpp: 'Rum, coffee, record labels, sound-system builders, cultural institutions, tourism, craft, music heritage, and media partners.',
    opNote: 'The Yard must stay sharp. No tourist-performance register. Programming should feel contemporary, credible, and rooted.',
  },
  {
    num: '04',
    name: 'THE STUDIO',
    tag: 'Art + Making + Artist-in-Residence',
    purpose: 'The Studio is the visual culture layer of the island: commissioned work, artist residencies, guest participation, print, object, image, and limited collaborations.',
    revLogic: 'Paid workshops, limited-edition sales, artist collaborations, sponsor-funded residencies, merchandise, prints, and collector items.',
    operatorModel: 'Artist-led and Zungu-curated. Zungu manages space, sales structure, collaboration rights, and brand fit.',
    partnerOpp: 'Art materials, print production, fashion, luxury goods, cultural institutions, collectors, and limited-edition retail partners.',
    opNote: 'Only confirmed workshops should be listed. IP, ownership, revenue splits, and usage rights must be agreed before the festival opens.',
  },
  {
    num: '05',
    name: 'THE MARKET',
    tag: 'Food, Beverage + Vendor Hub',
    purpose: 'The Market is the island\'s commercial village: food, coffee, bars, local vendors, breakfast, late-night food, retail moments, and sponsor activations.',
    revLogic: 'Vendor stall fees, sales commission, bar revenue, coffee sales, late-night food, breakfast counters, premium dining, sponsor activations, and wristband spend.',
    operatorModel: 'Hybrid. Zungu controls the layout, payment system, vendor standards, pricing floors, operating hours, sustainability rules, and approval process. Selected vendors operate individual stalls under contract.',
    partnerOpp: 'Rum, coffee, beverage brands, Portland food vendors, jerk and seafood operators, local producers, packaging, payment partners, fintech, and hospitality sponsors.',
    opNote: 'The Market is one of the most operationally complex zones: power, water, sanitation, cold storage, fire safety, waste management, food permits, vendor onboarding, and POS integration must be locked before opening. Bars are treated as a separate commercial layer within the Market and stage territories.',
  },
  {
    num: '06',
    name: 'THE ZUNGU SHOPPE',
    tag: 'Merchandise + Essentials + Partner Retail',
    purpose: 'The Zungu Shoppe is official retail and guest convenience: merchandise, essentials, artist collaborations, local goods, festival survival items, limited objects, and partner products.',
    revLogic: 'Merchandise margin, essentials margin, artist-collab revenue, local goods commission, partner retail fees, sponsor product placement, and category exclusivity.',
    operatorModel: 'Zungu-controlled or managed through a retail partner. Inventory is planned before the festival, integrated into the payment system, and curated to match the brand.',
    partnerOpp: 'Fashion, streetwear, art, photography, local Jamaican craft, vinyl, zines, sunscreen, hydration tech, charging accessories, coffee, rum, and travel essentials.',
    opNote: 'Inventory planning must happen early. Customs, import, surplus storage, returns, and post-event fulfilment need to be handled before launch.',
  },
  {
    num: '07',
    name: 'THE SIGNAL',
    tag: 'Zungu Radio + Media Hub',
    purpose: 'The Signal is Zungu\'s media point on the island: Zungu Radio, artist interviews, partner content, press briefings, field audio, live recordings, and selected broadcast moments.',
    revLogic: 'Media sponsorship, branded content, Zungu Radio sponsorship, captured-set licensing, interviews, documentary material, post-festival content, and release opportunities.',
    operatorModel: 'Zungu-controlled. Requires a producer, audio engineer, camera team, press coordinator, release management, data uplink, and controlled access.',
    partnerOpp: 'Telecoms, audio equipment, streaming platforms, tourism, airline and travel, beverage, media brands, cultural institutions, and music press.',
    opNote: 'All recordings, interviews, and captured sets require artist approval and signed release forms before broadcast, publication, or licensing.',
  },
  {
    num: '08',
    name: 'THE TRAIL',
    tag: 'Forest Route + Discovery',
    purpose: 'The Trail moves guests through Navy Island\'s interior: forest routes, hidden installations, ecology stops, artist interventions, quiet spaces, and scheduled discovery moments.',
    revLogic: 'Sponsor-funded installations, premium guided walks, environmental activations, partner moments, photography, press value, and low-impact guest distribution.',
    operatorModel: 'Zungu manages route design, safety, wayfinding, and installation placement. Local guides and environmental partners support interpretation, movement, and guest care.',
    partnerOpp: 'Outdoor gear, eco brands, environmental organisations, photography, water partners, tourism, installation materials, and conservation partners.',
    opNote: 'Wayfinding, lighting, staff points, environmental review, and guest limits are essential. High-traffic windows may require guided access only.',
  },
  {
    num: '09',
    name: 'THE PIER',
    tag: 'Controlled Discovery Environment',
    purpose: 'The Pier is an intimate controlled-access environment for sunrise sessions, late-night discovery, VIP priority moments, press access, and small-format programming.',
    revLogic: 'Premium bar revenue, VIP priority access, sponsor activation, timed-release access, limited event add-ons, and media moments.',
    operatorModel: 'Zungu-controlled. Access managed through wristband tier, timed release, or controlled queue. Programming remains separate from the primary stage system.',
    partnerOpp: 'Premium spirits, audio equipment, telecoms, fashion, photography, streaming, and intimate content partners.',
    opNote: 'The Pier is not a fourth primary stage. It is a controlled discovery environment. Structural safety, load limits, lighting, marine safety, and access control must be reviewed before use.',
  },
];

// ── Commercial model ──────────────────────────────────────────────────────────
const COMMERCIAL_LINES = [
  { cat: 'CORE ACCESS',        desc: 'GA, VIP, Glamping, partner allocation, press allocation control.' },
  { cat: 'HOSPITALITY',        desc: 'Accommodation, transfers, concierge, premium lounges, private dinners, The Thirty packages.' },
  { cat: 'BARS',               desc: 'Main bars, stage bars, VIP bars, rum bar, cocktail bars, non-alcoholic bars, bottle service, branded specials, reusable cup deposits.' },
  { cat: 'FOOD',               desc: 'Vendor stall fees, commission, Zungu-operated counters (breakfast, late-night), VIP food credits, Glamping meals, chef dinners, partner dinners.' },
  { cat: 'RETAIL',             desc: 'Zungu Shoppe, essentials, official merchandise, artist collabs, local goods.' },
  { cat: 'ACTIVITIES',         desc: 'Water excursions, wellness bookings, massage, cold plunge, guided walks, workshops, chef dinners, premium tastings, private boats, catamaran.' },
  { cat: 'SPONSORSHIP',        desc: 'Stage, bar, coffee, rum, telecoms, airline/travel, bank/payment, hydration, sustainability, media, wellness.' },
  { cat: 'MEDIA + IP',         desc: 'Zungu Radio, recorded sets, artist interviews, commissioned mixes, documentary content, photo licensing, brand-funded content, compilations.' },
  { cat: 'VENDOR / OPERATOR FEES', desc: 'Stall rental, revenue share, minimum guarantees, category exclusivity, premium location fee, partner activation fees.' },
];

// ── Mainland activations ──────────────────────────────────────────────────────
const MAINLAND = [
  {
    name: 'THE AMBUSH',
    sub: 'Mainland Tactical Forest Activation',
    body: 'Pre-registered, waivered, daytime-only, operator-led, alcohol-separated. A controlled outdoor activation designed for guests who want to move beyond the island perimeter. Revenue: activation fee, guide bookings, specialist operator agreement.',
  },
  {
    name: 'BOSTON BAY FOOD ROUTE',
    sub: 'Partner-Led Culinary Route',
    body: 'A curated route connecting guests to Portland\'s jerk history and local food vendors. Partner-operated with Zungu coordination. Revenue: tour booking fee, vendor participation fee, transport commission.',
  },
  {
    name: 'BLUE LAGOON / MARINE ECOLOGY',
    sub: 'Controlled Nature Route',
    body: 'Marine ecology, photography, and low-impact guest movement. Led by local ecology guides. Revenue: booking fee, guide commission, photography/content value for media partners.',
  },
  {
    name: 'REACH FALLS / GUIDED NATURE',
    sub: 'Guided Inland Experience',
    body: 'Designed for pre-festival arrivals or recovery-day programming. Local guide-led. Revenue: booking commission, local operator fee, transport coordination.',
  },
  {
    name: 'PORT ANTONIO TOWN DINNERS',
    sub: 'Partner Dinners + Investor Events',
    body: 'Curated dinners at Port Antonio restaurants for investors, press, artists, agencies, sponsors, and production leads. Revenue: hospitality package fees, partner dinner fees, investor experience premiums.',
  },
];

// ── Port Antonio benefit ──────────────────────────────────────────────────────
const BENEFIT_ITEMS = [
  { cat: 'MARINE + TRANSPORT',  items: 'Ferry operators, private boats, marine crew, drivers, taxis, shuttle operators, catamaran, logistics.' },
  { cat: 'ACCOMMODATION',       items: 'Hotels, villas, guest houses, AirBnB operators, concierge services, private villa staff.' },
  { cat: 'FOOD + BEVERAGE',     items: 'Restaurants, bars, jerk vendors, seafood suppliers, fresh produce, coffee, rum, patisserie, supermarkets.' },
  { cat: 'PRODUCTION + BUILD',  items: 'Site crew, build team, marine logistics, security, cleaning, waste management, demobilisation.' },
  { cat: 'VENDORS + CRAFT',     items: 'Local craft, fashion, florals, printing, ice, water, equipment rental, local fixers.' },
  { cat: 'GUIDES + WELLNESS',   items: 'Excursion operators, nature guides, wellness practitioners, massage, farmers, marine ecology experts.' },
];

// ── Sustainability ────────────────────────────────────────────────────────────
const SUSTAIN = [
  { label: 'REEF PROTOCOL',           body: 'Reef-safe product requirement for all on-water activity. Enforced by operator contracts and guest briefing.' },
  { label: 'WASTE REMOVAL',           body: 'Full demobilisation waste plan agreed with local authority, site owner, and production partner. No waste left on Navy Island post-event.' },
  { label: 'MARINE CONSERVATION',     body: 'Partnership with marine conservation organisation for reef monitoring and post-event environmental reporting.' },
  { label: 'REFORESTATION',           body: 'Contribution to reforestation programme in Portland Parish. Negotiated as part of site access agreement.' },
  { label: 'LOCAL EMPLOYMENT FIRST',  body: 'Vendor, guide, crew, and specialist operator selection prioritises Portland-based operators wherever operationally practical.' },
  { label: 'HARM REDUCTION',          body: '18+ only. Clear alcohol, drug awareness, and medical protocols. Licensed welfare team on-site.' },
  { label: 'DEMOBILISATION',          body: 'Demobilisation plan to be agreed with site, environmental authority, production partner, and local council before festival opens.' },
];

// ── ZoneCard ──────────────────────────────────────────────────────────────────
function ZoneCard({ zone, alt }: { zone: typeof ZONES[0]; alt: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ backgroundColor: alt ? ALT : BG, borderBottom: `1px solid ${DIM}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', textAlign: 'left', padding: '32px 8vw', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, boxSizing: 'border-box' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <span style={{ fontFamily: fontMono, fontSize: 10, color: GOLD, letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700 }}>{zone.num}</span>
            <div style={{ width: 1, height: 12, background: 'rgba(200,168,75,0.3)' }} />
            <span style={{ fontFamily: fontMono, fontSize: 10, color: MUTED, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{zone.tag}</span>
          </div>
          <h3 style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 900, color: CREAM, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: 0 }}>
            {zone.name}
          </h3>
        </div>
        <span style={{ fontFamily: fontMono, fontSize: 20, color: GOLD, flexShrink: 0, lineHeight: 1, paddingTop: 4 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 8vw 40px', borderTop: `1px solid ${DIM}`, boxSizing: 'border-box' }}>
          <div style={{ paddingTop: 32 }}>
            {[
              { label: 'PURPOSE',              text: zone.purpose },
              { label: 'REVENUE LOGIC',        text: zone.revLogic },
              { label: 'OPERATOR MODEL',       text: zone.operatorModel },
              { label: 'PARTNER OPPORTUNITY',  text: zone.partnerOpp },
              { label: 'OPERATIONAL NOTE',     text: zone.opNote },
            ].map(({ label, text }, i, arr) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, padding: '18px 0', borderBottom: i < arr.length - 1 ? `1px solid ${DIM}` : 'none', alignItems: 'start' }}>
                <span style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, paddingTop: 2 }}>{label}</span>
                <span style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.85 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ActivitiesPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [navVisible, setNavVisible]       = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavVisible(window.scrollY > 120);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div style={{ backgroundColor: BG, color: CREAM, fontFamily: fontMono, minHeight: '100vh' }}>

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 52, zIndex: 900,
        backgroundColor: 'rgba(4,8,10,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${DIM}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5vw', gap: 16,
        transition: 'opacity 0.3s', opacity: navVisible ? 1 : 0,
        pointerEvents: navVisible ? 'auto' : 'none',
      }}>
        <a href="/" style={{ flexShrink: 0 }}>
          <img src="/zungu-z-mark.png" style={{ height: 28, display: 'block', filter: 'drop-shadow(0 0 8px rgba(200,168,75,0.25))' }} alt="Zungu" />
        </a>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' } as React.CSSProperties}>
          {NAV_LINKS.map((link, i) => {
            const id = SECTION_IDS[i + 1];
            return (
              <button key={link} onClick={() => scrollTo(id)} style={{
                fontFamily: fontMono, fontSize: 10, letterSpacing: '0.4em',
                textTransform: 'uppercase', color: activeSection === id ? GOLD : MUTED,
                background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: 700, padding: '4px 0', whiteSpace: 'nowrap', transition: 'color 0.2s',
              }}>
                {link}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }}>
          <a href="/deck"   style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}>View Deck</a>
          <a href="/stages" style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}>Stages</a>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="section-hero" style={{ width: '100%', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', padding: '0 8vw 88px', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://res.cloudinary.com/elektricbangaz/image/upload/v1780459528/stage-beach-activities_tnmqx6.png')`, backgroundSize: 'cover', backgroundPosition: 'center 30%', filter: 'saturate(0.55) brightness(0.28)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,8,10,0.97) 0%, rgba(4,8,10,0.45) 60%, rgba(4,8,10,0.1) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: fontMono, fontSize: 10, color: GOLD, letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.2rem' }}>
            PROGRAMMING + HOSPITALITY
          </p>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(2.4rem, 8vw, 7rem)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '1.8rem', color: CREAM }}>
            NINE ZONES.<br /><span style={{ color: GOLD }}>ONE ISLAND</span><br />IN RHYTHM.
          </h1>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 620, marginBottom: '2.5rem' }}>
            Zungu is not only nighttime music. By day, Navy Island moves through food, water, wellness, art, culture, media, retail, forest routes, and controlled discovery. Nine zones turn the island into a living system before the stages open — creating guest flow, revenue, sponsor value, local operator participation, and a fuller reason to stay.
          </p>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <div style={{ width: '100%', padding: '20px 8vw', backgroundColor: ALT, borderTop: `1px solid ${DIM}`, borderBottom: `1px solid ${DIM}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, boxSizing: 'border-box' }}>
        {[['9', 'Island Zones'], ['2,500–5,000', 'Planning Range'], ['Jun 17–23', 'Target Window · 2027']].map(([val, label]) => (
          <div key={label}>
            <span style={{ fontFamily: fontDisplay, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 900, color: GOLD, display: 'block', lineHeight: 1 }}>{val}</span>
            <span style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: MUTED, display: 'block', marginTop: 5 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER ONE — Programming Thesis
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-thesis" style={{ padding: '96px 8vw', boxSizing: 'border-box', backgroundColor: BG }}>
        <p style={{ fontFamily: fontMono, fontSize: 10, color: GOLD, letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 28 }}>// 01 PROGRAMMING THESIS</p>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 4vw, 52px)', fontWeight: 900, color: CREAM, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 40 }}>
          The island moves before the music starts.
        </h2>
        <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 760, marginBottom: 20 }}>
          Zungu begins before the first headline set. The daytime programme gives the island its rhythm: guests move through water, food, wellness, craft, media, culture, retail, and forest discovery before the stages take over at sunset. This is not filler. It is the hospitality layer, the revenue layer, and the guest-flow system working at once. Every zone serves five purposes: experience, revenue, movement, sponsorship, and local operator opportunity.
        </p>

        {/* Large gold supporting line */}
        <div style={{ margin: '56px 0', borderLeft: `3px solid ${GOLD}`, paddingLeft: 32 }}>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(18px, 2.8vw, 36px)', fontWeight: 700, color: GOLD, lineHeight: 1.3, margin: 0 }}>
            The island is not passive.<br />The island performs.
          </p>
        </div>

        {/* Five pillars grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, marginBottom: 56 }}>
          {[
            { num: '01', label: 'Music + Stages',      sub: 'Three stage territories carry the island from sunrise to sunset to night.' },
            { num: '02', label: 'Food + Beverage',      sub: 'Bars, coffee, food stalls, local vendors, premium dining, and the commercial village.' },
            { num: '03', label: 'Wellness + Recovery',  sub: 'A recovery layer for guests who need to reset before the next movement of the island.' },
            { num: '04', label: 'Water + Nature',        sub: 'Marine programming, forest routes, guided discovery, and low-impact island movement.' },
            { num: '05', label: 'Media + Culture',       sub: 'Zungu Radio, artist interviews, sound-system context, visual art, talks, and press moments.' },
          ].map(({ num, label, sub }) => (
            <div key={num} style={{ border: `1px solid ${DIM}`, padding: '32px 24px', backgroundColor: ALT }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 32, fontWeight: 900, color: 'rgba(200,168,75,0.15)', lineHeight: 1, marginBottom: 14 }}>{num}</div>
              <div style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 700, color: CREAM, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
              <div style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.75 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Operator model box */}
        <div style={{ backgroundColor: ALT, padding: '48px 8vw', margin: '0 -8vw', boxSizing: 'border-box' }}>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 32, maxWidth: 780 }}>
            Zungu owns the commercial framework. Selected local vendors, specialists, and operators deliver within it. Revenue is shared through stall fees, commissions, minimum guarantees, booking fees, category exclusivity, and activation fees. Zungu controls layout, payment system, standards, operating hours, brand presentation, health and safety, and guest experience.
          </p>
          <p style={{ fontFamily: fontDisplay, fontSize: 'clamp(14px, 2vw, 22px)', fontWeight: 700, color: CREAM, letterSpacing: '0.02em', lineHeight: 1.55, margin: 0 }}>
            Own the system.<br />Partner the operations.<br />Control the standards.<br />Share the upside.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER TWO — Island Zones
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-zones" style={{ padding: '96px 0 0', boxSizing: 'border-box', backgroundColor: BG }}>
        <div style={{ padding: '0 8vw 56px', boxSizing: 'border-box' }}>
          <p style={{ fontFamily: fontMono, fontSize: 10, color: GOLD, letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 28 }}>// 02 ISLAND ZONES</p>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 4vw, 52px)', fontWeight: 900, color: CREAM, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 24 }}>
            Nine zones carry the island through the day.
          </h2>
          <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 660 }}>
            Each zone has a purpose, a revenue logic, an operator model, a partner opportunity, and an operational requirement.
          </p>
        </div>
        <div>
          {ZONES.map((zone, i) => <ZoneCard key={zone.num} zone={zone} alt={i % 2 !== 0} />)}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER THREE — Commercial Model
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-commercial" style={{ padding: '96px 8vw', boxSizing: 'border-box', backgroundColor: ALT }}>
        <p style={{ fontFamily: fontMono, fontSize: 10, color: GOLD, letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 28 }}>// 03 COMMERCIAL MODEL</p>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 4vw, 52px)', fontWeight: 900, color: CREAM, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 32 }}>
          The island economy.
        </h2>
        <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 720, marginBottom: 56 }}>
          Ticket revenue is the base. Zungu's commercial model extends across multiple revenue lines that compound through the festival window and beyond. The island is programmed to generate value through access, hospitality, bars, food, retail, activities, sponsorship, media, and vendor/operator participation.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {COMMERCIAL_LINES.map(({ cat, desc }) => (
            <div key={cat} style={{ border: `1px solid ${DIM}`, padding: '28px 24px', backgroundColor: BG }}>
              <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 14 }}>{cat}</div>
              <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.8, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER FOUR — Mainland Activations
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-mainland" style={{ padding: '96px 8vw', boxSizing: 'border-box', backgroundColor: BG }}>
        <p style={{ fontFamily: fontMono, fontSize: 10, color: GOLD, letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 28 }}>// 04 MAINLAND ACTIVATIONS</p>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 4vw, 52px)', fontWeight: 900, color: CREAM, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 32 }}>
          Not every Zungu experience belongs on Navy Island.
        </h2>
        <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 720, marginBottom: 56 }}>
          Selected activations should move through Port Antonio. Mainland programming reduces pressure on the island, creates additional revenue for local operators, gives guests a reason to arrive earlier and stay longer, and makes Port Antonio part of the festival week.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {MAINLAND.map(({ name, sub, body }) => (
            <div key={name} style={{ border: `1px solid ${DIM}`, padding: '36px 28px', backgroundColor: ALT }}>
              <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTED, marginBottom: 10 }}>{sub}</div>
              <h3 style={{ fontFamily: fontDisplay, fontSize: 'clamp(14px, 1.8vw, 20px)', fontWeight: 900, color: CREAM, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 20 }}>{name}</h3>
              <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.85, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER FIVE — Port Antonio Benefit
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-benefit" style={{ padding: '96px 8vw', boxSizing: 'border-box', backgroundColor: ALT }}>
        <p style={{ fontFamily: fontMono, fontSize: 10, color: GOLD, letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 28 }}>// 05 PORT ANTONIO BENEFIT</p>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 4vw, 52px)', fontWeight: 900, color: GOLD, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 40 }}>
          The island is the world.<br />Port Antonio is the heartbeat behind it.
        </h2>
        <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 760, marginBottom: 56 }}>
          Zungu is anchored on Navy Island, but the commercial model is designed to route value through Port Antonio. The town supplies the operating ecosystem: accommodation, marine transport, drivers, food, beverage, guides, vendors, production support, wellness providers, artists, mainland activations, and post-event services. This is not charity language. It is business logic. The stronger Port Antonio is inside the model, the more locally defensible Zungu becomes.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {BENEFIT_ITEMS.map(({ cat, items }) => (
            <div key={cat} style={{ border: `1px solid ${DIM}`, padding: '28px 24px', backgroundColor: BG }}>
              <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 14 }}>{cat}</div>
              <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.8, margin: 0 }}>{items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER SIX — Sustainability
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-sustainability" style={{ padding: '96px 8vw', boxSizing: 'border-box', backgroundColor: BG }}>
        <p style={{ fontFamily: fontMono, fontSize: 10, color: GOLD, letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 28 }}>// 06 SUSTAINABILITY</p>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(22px, 4vw, 52px)', fontWeight: 900, color: CREAM, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 32 }}>
          Sustainability is an operating requirement.
        </h2>
        <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 720, marginBottom: 56 }}>
          Environmental and community protocol is not a marketing position. For Zungu, sustainability is tied to site access, reef protection, waste removal, local employment, harm reduction, marine licensing, demobilisation, and post-event reporting.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {SUSTAIN.map(({ label, body }) => (
            <div key={label} style={{ border: `1px solid ${DIM}`, padding: '28px 24px', backgroundColor: ALT }}>
              <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 14 }}>{label}</div>
              <p style={{ fontFamily: fontMono, fontSize: 15, color: MUTED, lineHeight: 1.85, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer style={{ padding: '60px 8vw', borderTop: `1px solid ${DIM}`, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, backgroundColor: BG }}>
        <div style={{ fontFamily: fontDisplay, fontSize: 'clamp(28px, 6vw, 72px)', fontWeight: 900, color: 'rgba(200,168,75,0.06)', lineHeight: 1, letterSpacing: '-0.03em' }}>
          ZUNGU FESTIVAL
        </div>
        <div style={{ fontFamily: fontMono, fontSize: 10, color: DIM, letterSpacing: '0.25em', textTransform: 'uppercase', lineHeight: 2, textAlign: 'right' }}>
          <div>Confidential concept material · Not for public distribution</div>
          <div>Navy Island · Port Antonio, Jamaica</div>
          <div>Target Window: June 17–23, 2027</div>
        </div>
      </footer>

    </div>
  );
}
