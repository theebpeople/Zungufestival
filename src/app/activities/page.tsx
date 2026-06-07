'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ── Design tokens ─────────────────────────────────────────────────────────────
const BG = '#04080A';
const GREEN = '#0D2018';
const GOLD = '#C8A84B';
const CREAM = '#F2EBD9';
const MUTED = 'rgba(242,235,217,0.45)';
const DIM = 'rgba(242,235,217,0.18)';
const RUST = '#C45A2A';
const BORDER = 'rgba(200,168,75,0.07)';
const BORDER_MID = 'rgba(200,168,75,0.12)';
const GOLD_DIM = 'rgba(200,168,75,0.45)';

const DISPLAY = "'Unbounded', sans-serif";
const MONO = "'Space Mono', monospace";

// ── Nav sections ──────────────────────────────────────────────────────────────
const NAV_LINKS = ['Thesis', 'Zones', 'Commercial', 'Mainland', 'Port Antonio', 'Sustainability'];
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
    opNote: 'No medical or therapeutic claims should be made without qualified professionals, proper licensing, insurance, and waivers. Medical-grade recovery services only operate where legally approved and professionally supervised.',
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
    opNote: 'The Market is one of the most operationally complex zones: power, water, sanitation, cold storage, fire safety, waste management, food permits, vendor onboarding, and POS integration must be locked before opening.',
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
  { cat: 'CORE ACCESS', items: 'GA, VIP, Glamping, partner allocation, press allocation control.', model: 'Ticket yield.' },
  { cat: 'HOSPITALITY', items: 'Accommodation, transfers, concierge, premium lounges, private dinners, The Thirty packages.', model: 'Tier markup + hospitality package margin.' },
  { cat: 'BARS', items: 'Main bars, stage bars, VIP bars, rum bar, cocktail bars, non-alcoholic bars, bottle service, branded specials, reusable cup deposits.', model: 'Zungu-controlled or lead bar partner. High-margin. Core profit center.' },
  { cat: 'FOOD', items: 'Vendor stall fees, commission, Zungu-operated counters (breakfast, late-night), VIP food credits, Glamping meals, chef dinners, partner dinners.', model: 'Hybrid. Vendor fees + commission + controlled premium dining.' },
  { cat: 'RETAIL', items: 'Zungu Shoppe, essentials, official merchandise, artist collabs, local goods.', model: 'Zungu-controlled or managed retail partner. Brand/IP monetisation.' },
  { cat: 'ACTIVITIES', items: 'Water excursions, wellness bookings, massage, cold plunge, guided walks, workshops, chef dinners, premium tastings, private boats, catamaran.', model: 'Paid add-ons layered over base ticket value. Booking commission + specialist operator contracts.' },
  { cat: 'SPONSORSHIP', items: 'Stage, bar, coffee, rum, telecoms, airline/travel, bank/payment, hydration, sustainability, media, wellness.', model: 'Each sponsor requires a physical asset or media placement — not only logo. Activation fee.' },
  { cat: 'MEDIA + IP', items: 'Zungu Radio, recorded sets, artist interviews, commissioned mixes, documentary content, photo licensing, brand-funded content, compilations.', model: 'Sponsor-funded production + post-event licensing + Zungu Records catalog.' },
  { cat: 'VENDOR FEES', items: 'Stall rental, revenue share (10–20%), minimum guarantees, category exclusivity, premium location fee, partner activation fees.', model: 'Commercial framework owned by Zungu. Operators lease within it.' },
];

// ── Mainland activations ──────────────────────────────────────────────────────
const MAINLAND = [
  { name: 'THE AMBUSH', sub: 'Mainland Tactical Forest Activation', body: 'Pre-registered, waivered, daytime-only, operator-led, alcohol-separated. A controlled outdoor activation designed for guests who want to move beyond the island perimeter. Revenue: activation fee, guide bookings, specialist operator agreement.' },
  { name: 'BOSTON BAY FOOD ROUTE', sub: 'Partner-Led Culinary Route', body: 'A curated route connecting guests to Portland\'s jerk history and local food vendors. Partner-operated with Zungu coordination. Revenue: tour booking fee, vendor participation fee, transport commission.' },
  { name: 'BLUE LAGOON / MARINE ECOLOGY', sub: 'Controlled Nature Route', body: 'Marine ecology, photography, and low-impact guest movement. Led by local ecology guides. Revenue: booking fee, guide commission, photography/content value for media partners.' },
  { name: 'REACH FALLS / GUIDED NATURE', sub: 'Guided Inland Experience', body: 'Designed for pre-festival arrivals or recovery-day programming. Local guide-led. Revenue: booking commission, local operator fee, transport coordination.' },
  { name: 'PORT ANTONIO TOWN DINNERS', sub: 'Partner Dinners + Investor Events', body: 'Curated dinners at Port Antonio restaurants for investors, press, artists, agencies, sponsors, and production leads. Revenue: hospitality package fees, partner dinner fees, investor experience premiums.' },
];

// ── Port Antonio benefit ──────────────────────────────────────────────────────
const BENEFIT_ITEMS = [
  { cat: 'MARINE + TRANSPORT', items: 'Ferry operators, private boats, marine crew, drivers, taxis, shuttle operators, catamaran, logistics.' },
  { cat: 'ACCOMMODATION', items: 'Hotels, villas, guest houses, AirBnB operators, concierge services, private villa staff.' },
  { cat: 'FOOD + BEVERAGE', items: 'Restaurants, bars, jerk vendors, seafood suppliers, fresh produce, coffee, rum, patisserie, supermarkets.' },
  { cat: 'PRODUCTION + BUILD', items: 'Site crew, build team, marine logistics, security, cleaning, waste management, demobilisation.' },
  { cat: 'VENDORS + CRAFT', items: 'Local craft, fashion, florals, printing, ice, water, equipment rental, local fixers.' },
  { cat: 'GUIDES + WELLNESS', items: 'Excursion operators, nature guides, wellness practitioners, massage, farmers, marine ecology experts.' },
];

// ── Sustainability ────────────────────────────────────────────────────────────
const SUSTAIN = [
  { label: 'REEF PROTOCOL', body: 'Reef-safe product requirement for all on-water activity. Enforced by operator contracts and guest briefing.' },
  { label: 'WASTE REMOVAL', body: 'Full demobilisation waste plan agreed with local authority, site owner, and production partner. No waste left on Navy Island post-event.' },
  { label: 'MARINE CONSERVATION', body: 'Partnership with marine conservation organisation for reef monitoring and post-event environmental reporting.' },
  { label: 'REFORESTATION', body: 'Contribution to reforestation programme in Portland Parish. Negotiated as part of site access agreement.' },
  { label: 'LOCAL EMPLOYMENT FIRST', body: 'Vendor, guide, crew, and specialist operator selection prioritises Portland-based operators wherever operationally practical.' },
  { label: 'HARM REDUCTION', body: '18+ only. Clear alcohol, drug awareness, and medical protocols. Licensed welfare team on-site.' },
  { label: 'DEMOBILISATION', body: 'Demobilisation plan to be agreed with site, environmental authority, production partner, and local council before festival opens.' },
];

// ── ChapterSection — /deck ChapterWrap pattern ────────────────────────────────
function ChapterSection({
  bg, photo, children, id,
}: {
  bg: string; photo?: string; children: React.ReactNode; id?: string;
}) {
  return (
    <div id={id} style={{ position: 'relative', overflow: 'hidden', backgroundColor: bg, borderBottom: `1px solid ${BORDER}` }}>
      {photo && (
        <img
          src={photo}
          alt=""
          aria-hidden
          style={{
            position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0.32, filter: 'saturate(0.5) brightness(0.4)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />
      )}
      {photo && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, ${bg} 28%, ${bg}ee 50%, transparent 82%)`,
          pointerEvents: 'none', zIndex: 0,
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ── SLabel ─────────────────────────────────────────────────────────────────────
function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
      <div style={{ width: 28, height: 1, background: 'rgba(200,168,75,0.5)', flexShrink: 0 }} />
      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700 }}>{children}</span>
    </div>
  );
}

// ── ChapterDivider ────────────────────────────────────────────────────────────
function ChapterDivider({ num, eye, title, sub }: { num: string; eye: string; title: string; sub: string }) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', backgroundColor: BG, borderTop: `1px solid ${BORDER_MID}`, padding: '72px 8vw 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(4rem, 9vw, 8rem)', fontWeight: 900, color: 'rgba(200,168,75,0.06)', lineHeight: 1, flexShrink: 0, userSelect: 'none', pointerEvents: 'none', marginTop: '-0.1em' }}>
          {num}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(200,168,75,0.5)', flexShrink: 0 }} />
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, fontWeight: 700 }}>{eye}</span>
          </div>
          <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, color: CREAM }}>{title}</h2>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, marginTop: 12, lineHeight: 1.8, maxWidth: 540, letterSpacing: '0.02em' }}>{sub}</p>
        </div>
      </div>
    </div>
  );
}

// ── ZoneCard ──────────────────────────────────────────────────────────────────
function ZoneCard({ zone }: { zone: typeof ZONES[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid rgba(200,168,75,0.15)`, backgroundColor: BG, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', textAlign: 'left', padding: '28px 32px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <span style={{ fontFamily: MONO, fontSize: 10, color: GOLD, letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700 }}>{zone.num}</span>
            <div style={{ width: 1, height: 12, background: 'rgba(200,168,75,0.3)' }} />
            <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{zone.tag}</span>
          </div>
          <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 900, color: CREAM, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: 0 }}>
            {zone.name}
          </h3>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 18, color: GOLD, flexShrink: 0, lineHeight: 1, paddingTop: 4 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 32px 32px', borderTop: `1px solid rgba(200,168,75,0.08)` }}>
          <div style={{ paddingTop: 28 }}>
            {[
              { label: 'PURPOSE', text: zone.purpose },
              { label: 'REVENUE LOGIC', text: zone.revLogic },
              { label: 'OPERATOR MODEL', text: zone.operatorModel },
              { label: 'PARTNER OPPORTUNITY', text: zone.partnerOpp },
              { label: 'OPERATIONAL NOTE', text: zone.opNote },
            ].map(({ label, text }, i, arr) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, padding: '16px 0', borderBottom: i < arr.length - 1 ? `1px solid rgba(200,168,75,0.07)` : 'none', alignItems: 'start' }}>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, paddingTop: 2 }}>{label}</span>
                <span style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
function ActivitiesPageInner() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') ?? '';
  const [activeSection, setActiveSection] = useState('hero');
  const [navVisible, setNavVisible] = useState(false);

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
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(id); }, { threshold: 0.25 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div style={{ backgroundColor: BG, color: CREAM, fontFamily: MONO, minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 52, zIndex: 900, backgroundColor: 'rgba(4,8,10,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: `1px solid ${navVisible ? BORDER_MID : BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8vw', gap: 16, transition: 'opacity 0.3s, border-color 0.3s', opacity: navVisible ? 1 : 0, pointerEvents: navVisible ? 'auto' : 'none' }}>
        <a href="/" style={{ flexShrink: 0 }}>
          <img src="/zungu-z-mark.png" style={{ height: 28, display: 'block', filter: 'drop-shadow(0 0 8px rgba(200,168,75,0.25))' }} alt="Zungu" />
        </a>
        <div className="nav-links" style={{ display: 'flex', gap: 24, alignItems: 'center', overflowX: 'auto', flexWrap: 'nowrap', scrollbarWidth: 'none' } as React.CSSProperties}>
          {NAV_LINKS.map((link, i) => {
            const id = SECTION_IDS[i + 1];
            return (
              <button key={link} onClick={() => scrollTo(id)} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: activeSection === id ? GOLD : MUTED, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: '4px 0', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>
                {link}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }}>
          <a href="/stages" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
            Stages
          </a>
          <a href="/partner" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
            ← Back
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="section-hero" style={{ width: '100%', minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', padding: '0 8vw 80px', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('/photos/stage-beach-activities.png')`, backgroundSize: 'cover', backgroundPosition: 'center 30%', filter: 'saturate(0.6) brightness(0.3)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,8,10,0.97) 0%, rgba(4,8,10,0.55) 55%, rgba(4,8,10,0.15) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,168,75,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: MONO, fontSize: 9, color: GOLD, letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>// PROGRAMMING + HOSPITALITY</p>
          <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.5rem, 8vw, 7rem)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '1.5rem', color: CREAM }}>
            NINE ZONES.<br /><span style={{ color: GOLD }}>ONE ISLAND</span><br />IN MOTION.
          </h1>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 600, marginBottom: '2rem' }}>
            Zungu is not only nighttime music. By day, Navy Island moves through food, water, wellness, art, culture, media, retail, and forest discovery before the stages open at sunset. Nine zones turn the island into a living system — creating guest flow, revenue, sponsor value, local operator participation, and a fuller reason to stay.
          </p>
          <div style={{ display: 'flex', width: '100%', borderTop: `1px solid rgba(200,168,75,0.2)`, paddingTop: '1.5rem', flexWrap: 'wrap' }}>
            {[['9', 'Island Zones'], ['5,000', 'Year One Target'], ['Jun 17–23', 'Target Window · 2027']].map(([val, label], i, arr) => (
              <div key={label} style={{ flex: '1 1 120px', paddingRight: i < arr.length - 1 ? '2.5rem' : 0, marginRight: i < arr.length - 1 ? '2.5rem' : 0, borderRight: i < arr.length - 1 ? `1px solid ${BORDER_MID}` : 'none', marginBottom: '1rem' }}>
                <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', fontWeight: 900, color: GOLD, display: 'block', lineHeight: 1 }}>{val}</span>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTED, display: 'block', marginTop: 4 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 01 — PROGRAMMING THESIS
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="01" eye="Chapter One" title="The island moves before the music starts." sub="The island is not passive. The island performs." />
      <ChapterSection id="section-thesis" bg={BG} photo="/photos/navy-island-aerial-hq.png">
        <div style={{ padding: '80px 8vw' }}>
          <SLabel>// Island Programming Model</SLabel>
          <div style={{ maxWidth: 760 }}>
            <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 18 }}>
              Zungu begins before the first headline set. The daytime programme gives the island its rhythm: guests move through water, food, wellness, craft, media, culture, retail, and forest discovery before the stages take over at sunset. This is not filler. It is the hospitality layer, the revenue layer, and the guest-flow system working at once.
            </p>
            <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 40 }}>
              Every zone serves five purposes: experience, revenue, movement, sponsorship, and local operator opportunity.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, marginBottom: 48 }}>
              {[
                { num: '1', label: 'Experience', sub: 'Creating moments beyond the stages.' },
                { num: '2', label: 'Movement', sub: 'Pulling guests through the island safely.' },
                { num: '3', label: 'Revenue', sub: 'Food, bars, retail, activities, hospitality.' },
                { num: '4', label: 'Sponsorship', sub: 'Physical and media inventory for partners.' },
                { num: '5', label: 'Local Operator Opportunity', sub: 'Vendors, guides, wellness, food operators.' },
              ].map(({ num, label, sub }) => (
                <div key={num} style={{ border: `1px solid ${DIM}`, padding: '28px 20px' }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 900, color: 'rgba(200,168,75,0.2)', lineHeight: 1, marginBottom: 12 }}>{num}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: CREAM, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: MUTED, lineHeight: 1.6 }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '28px 32px', border: `1px solid rgba(200,168,75,0.2)`, background: 'rgba(200,168,75,0.03)' }}>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: CREAM }}>Operator model principle:</strong> Zungu owns the commercial framework. Selected local vendors, specialists, and operators deliver services within it. Revenue is shared through stall fees, commissions, minimum guarantees, category exclusivity, and activation fees. Zungu controls layout, payment system, standards, hours, brand presentation, and health and safety.
              </p>
            </div>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 02 — ISLAND ZONES
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="02" eye="Chapter Two" title="Island Zones." sub="Nine zones carry the island through the day. Each zone has a purpose, a revenue logic, an operator model, a partner opportunity, and an operational requirement." />
      <ChapterSection id="section-zones" bg={GREEN} photo="/photos/stage-origins-ground.png">
        <div style={{ padding: '80px 8vw' }}>
          <SLabel>// Nine Zones · Navy Island</SLabel>
          <div style={{ display: 'grid', gap: 2 }}>
            {ZONES.map(zone => <ZoneCard key={zone.num} zone={zone} />)}
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 03 — COMMERCIAL MODEL
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="03" eye="Chapter Three" title="The island economy." sub="Nine revenue categories. Zungu controls the system. Partners and operators deliver within it." />
      <ChapterSection id="section-commercial" bg={BG} photo="/photos/zungu-glamping-luxe.png">
        <div style={{ padding: '80px 8vw' }}>
          <SLabel>// Revenue Architecture</SLabel>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 680, marginBottom: 48 }}>
            Ticket revenue is the base. Zungu's commercial model extends across multiple revenue lines that compound through the festival window and beyond.
          </p>
          <div style={{ display: 'grid', gap: 2, marginBottom: 60 }}>
            {COMMERCIAL_LINES.map(({ cat, items, model }) => (
              <div key={cat} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 280px', gap: 0, border: `1px solid ${DIM}`, overflow: 'hidden' }}>
                <div style={{ padding: '24px 20px', borderRight: `1px solid ${DIM}`, backgroundColor: 'rgba(200,168,75,0.03)' }}>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, fontWeight: 700 }}>{cat}</span>
                </div>
                <div style={{ padding: '24px 24px', borderRight: `1px solid ${DIM}` }}>
                  <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.8, margin: 0 }}>{items}</p>
                </div>
                <div style={{ padding: '24px 20px' }}>
                  <p style={{ fontFamily: MONO, fontSize: 10, color: CREAM, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{model}</p>
                </div>
              </div>
            ))}
          </div>

          <SLabel>// Included vs Paid</SLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {[
              { label: 'Included in Festival Access', color: DIM, items: ['All stages', 'Basic island programming', 'The Trail', 'Selected talks / culture sessions', 'Market access', 'General lounge spaces', 'Basic water/refill access', 'Some sponsor activations'] },
              { label: 'Paid Add-Ons', color: GOLD, items: ['Premium wellness treatments', 'Massage + IV hydration', 'Private boat trips', 'Catamaran + deep sea fishing', 'Guided excursions', 'The Ambush', 'Premium workshops', 'Chef dinners + premium tastings', 'Merchandise'] },
              { label: 'Included in VIP + Glamping', color: RUST, items: ['Priority transfers', 'Private bars + viewing areas', 'Concierge service', 'Meal or drink credits', 'Wellness credits', 'Priority booking windows', 'Private lounges', 'Dedicated facilities'] },
            ].map(({ label, color, items }) => (
              <div key={label} style={{ border: `1px solid ${DIM}`, padding: '28px 24px' }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color, fontWeight: 700, marginBottom: 20 }}>{label}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                      <span style={{ color, flexShrink: 0, fontSize: 10 }}>—</span>
                      <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 04 — MAINLAND ACTIVATIONS
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="04" eye="Chapter Four" title="Not every Zungu experience belongs on Navy Island." sub="Selected activations route guests through Port Antonio." />
      <ChapterSection id="section-mainland" bg={GREEN} photo="/photos/navy-island-wide.png">
        <div style={{ padding: '80px 8vw' }}>
          <SLabel>// Mainland Programme</SLabel>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 680, marginBottom: 48 }}>
            Selected activations should move through Port Antonio. Mainland programming reduces pressure on the island, creates additional revenue for local operators, gives guests a reason to arrive earlier and stay longer, and makes Port Antonio part of the festival week.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            {MAINLAND.map(({ name, sub, body }) => (
              <div key={name} style={{ border: `1px solid ${DIM}`, padding: '32px 28px' }}>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTED, marginBottom: 8 }}>{sub}</div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(14px, 1.8vw, 20px)', fontWeight: 900, color: CREAM, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 16 }}>{name}</h3>
                <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 05 — PORT ANTONIO BENEFIT
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="05" eye="Chapter Five" title="The island is the world. Port Antonio is the heartbeat behind it." sub="Zungu's commercial model is designed to route value through Port Antonio, not isolate it on Navy Island." />
      <ChapterSection id="section-benefit" bg={BG} photo="/photos/navy-island-satellite.png">
        <div style={{ padding: '80px 8vw' }}>
          <SLabel>// Port Antonio Economic Case</SLabel>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 680, marginBottom: 16 }}>
            Zungu is anchored on Navy Island, but the commercial model is designed to route value through Port Antonio. The town supplies the operating ecosystem: accommodation, marine transport, drivers, food, beverage, guides, vendors, production support, wellness providers, artists, mainland activations, and post-event services.
          </p>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 680, marginBottom: 48 }}>
            This is not charity language. It is business logic. The stronger Port Antonio is inside the model, the more locally defensible Zungu becomes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 48 }}>
            {BENEFIT_ITEMS.map(({ cat, items }) => (
              <div key={cat} style={{ border: `1px solid ${DIM}`, padding: '28px 24px', backgroundColor: 'rgba(13,32,24,0.5)' }}>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 14 }}>{cat}</div>
                <p style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.8, margin: 0 }}>{items}</p>
              </div>
            ))}
          </div>
          <div style={{ border: `1px solid rgba(200,168,75,0.2)`, padding: '32px 36px', background: 'rgba(200,168,75,0.03)' }}>
            <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 16 }}>// Operating Principle</p>
            <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(16px, 2.2vw, 24px)', fontWeight: 700, color: CREAM, lineHeight: 1.4, margin: 0 }}>
              Own the system. Partner the operations. Control the standards. Share the upside.
            </p>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 06 — TRAVEL + STAY
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="06" eye="Chapter Six" title="Travel + Stay Connection." sub="The activity programme connects directly to how guests arrive, stay, and depart. Guest movement is part of the operating system." />
      <ChapterSection bg={GREEN} photo="/photos/zungu-tribal-stage-arrival.png">
        <div style={{ padding: '80px 8vw' }}>
          <SLabel>// Guest Journey Architecture</SLabel>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 680, marginBottom: 48 }}>
            The activity programme is not isolated from guest logistics. Arrivals, check-in, marine transfers, accommodation access, and departures are integrated into the zone operating model. The fuller the guest journey, the higher the spend per head and the stronger the case for premium packages.
          </p>
          <div style={{ display: 'flex', gap: 2, marginBottom: 40, overflowX: 'auto' }}>
            {[
              { step: '01', label: 'International Arrival', sub: 'Kingston or Montego Bay. Transfer to Port Antonio.' },
              { step: '02', label: 'Check-In', sub: 'Port Antonio. Accommodation, ferry boarding, briefing.' },
              { step: '03', label: 'Island Movement', sub: 'Marine transfer to Navy Island. Zone access opens.' },
              { step: '04', label: 'Stay', sub: 'On-island glamping, off-island villa or hotel. Full access.' },
              { step: '05', label: 'Departure', sub: 'June 23. Ferry return. Transfer to airport.' },
            ].map(({ step, label, sub }, i, arr) => (
              <div key={step} style={{ flex: '1 1 160px', border: `1px solid ${DIM}`, padding: '24px 20px', position: 'relative', minWidth: 140 }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 900, color: 'rgba(200,168,75,0.08)', lineHeight: 1, marginBottom: 12 }}>{step}</div>
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: MUTED, lineHeight: 1.7 }}>{sub}</div>
                {i < arr.length - 1 && (
                  <div style={{ position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)', fontFamily: MONO, fontSize: 12, color: 'rgba(200,168,75,0.3)', zIndex: 2 }}>→</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: 40 }}>
            {[
              { label: 'Festival Access Only', items: ['Ferry transfer included', 'Island zone access', 'Stage access', 'General Market + Trail'] },
              { label: 'VIP Package', items: ['Priority transfer included', 'VIP bars and viewing', 'Meal and drink credits', 'Concierge service', 'Priority activity booking'] },
              { label: 'Glamping Package', items: ['On-island accommodation', 'Ferry transfer included', 'Dedicated facilities', 'Wellness credits', 'Wake-up programming'] },
              { label: 'The Thirty Concierge', items: ['Full travel coordination', 'Private marine transfer', 'Villa or suite accommodation', 'Private dining', 'Dedicated concierge', 'Artist and investor access'] },
            ].map(({ label, items }) => (
              <div key={label} style={{ border: `1px solid ${DIM}`, padding: '24px 24px' }}>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 16 }}>{label}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                      <span style={{ color: GOLD, flexShrink: 0, fontSize: 10 }}>—</span>
                      <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ border: `1px solid rgba(200,168,75,0.2)`, padding: '28px 32px', background: 'rgba(200,168,75,0.02)' }}>
            <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 12 }}>// Travel Partner Opportunity</p>
            <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, margin: 0 }}>
              Zungu&rsquo;s guest journey connects flight arrival, ground transfer, marine logistics, accommodation, and island access into a packageable system. Travel coordination, transport commissions, accommodation partnerships, and concierge fees represent a commercial layer that compounds the per-head yield. Travel partner terms remain subject to confirmed bookings, operator agreements, and logistics finalisation.
            </p>
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 07 — SUSTAINABILITY
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterDivider num="07" eye="Chapter Seven" title="Sustainability is an operating requirement." sub="Environmental and community protocol is tied to site access, reef protection, waste removal, local employment, harm reduction, marine licensing, demobilisation, and post-event reporting." />
      <ChapterSection id="section-sustainability" bg={BG} photo="/photos/navy-island-stage-map.png">
        <div style={{ padding: '80px 8vw' }}>
          <SLabel>// Environmental + Community Protocol</SLabel>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 680, marginBottom: 48 }}>
            Environmental and community protocol is not a marketing position. For Zungu, sustainability is tied to site access, reef protection, waste removal, local employment, harm reduction, marine licensing, demobilisation, and post-event reporting.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            {SUSTAIN.map(({ label, body }) => (
              <div key={label} style={{ border: `1px solid ${DIM}`, padding: '28px 24px' }}>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 12 }}>{label}</div>
                <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </ChapterSection>

      {/* ══════════════════════════════════════════════════════════════════
          PRODUCTION PARTNER NOTE
      ══════════════════════════════════════════════════════════════════ */}
      <ChapterSection bg={GREEN} photo="/photos/navy-island-aerial-hq.png">
        <div style={{ padding: '80px 8vw' }}>
          <SLabel>// Production Partner Note</SLabel>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 680, marginBottom: 16 }}>
            This page defines the island activity programme and operating logic. It is not the full production manual.
          </p>
          <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 680, marginBottom: 40 }}>
            The activity system described here — nine zones, mainland activations, commercial model, sustainability protocols — requires a Production Brief to move from concept to confirmed operating plan.
          </p>
          <div style={{ border: `1px solid ${DIM}`, padding: '28px 32px', marginBottom: 40 }}>
            <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 20 }}>The Production Brief should cover:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 40px' }}>
              {[
                'Zone-by-zone build specification and site plan',
                'Power distribution across all nine zones',
                'Water supply, sanitation, and waste management',
                'Marine logistics: ferry schedule, boat slots, safety',
                'Vendor onboarding, contracts, and category exclusivity',
                'POS and payment integration across all zones',
                'Food hygiene permits and fire safety per zone',
                'Reef protocol and marine environmental compliance',
                'Wayfinding, zone signage, and guest-flow management',
                'Staffing model: zone managers, crew, security, welfare',
                'Medical provision and harm reduction protocols',
                'Cold storage, ice supply, and refrigeration',
                'Customs, import, and inventory management for retail',
                'Media release and recording consent protocol',
                'Artist session logistics at The Signal',
                'Mainland activation logistics and guide contracts',
                'Demobilisation plan per zone post-festival',
                'Environmental reporting obligations',
                'Insurance, licensing, and regulatory approvals',
                'Build timeline, cost centres, and risk controls',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: GOLD, flexShrink: 0, fontSize: 9, paddingTop: 2 }}>—</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ border: `1px solid rgba(200,168,75,0.25)`, padding: '32px 36px', background: 'rgba(200,168,75,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 10 }}>// Request Production Brief</p>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 480, margin: 0 }}>
                Production partners may request the full Activity Programme Production Brief covering zone build, vendor framework, marine logistics, power and water design, staffing model, risk controls, and execution gates.
              </p>
            </div>
            <a href="/partner" style={{ display: 'inline-block', padding: '14px 28px', border: `1px solid rgba(200,168,75,0.4)`, fontFamily: MONO, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'rgba(200,168,75,0.08)'; el.style.borderColor = GOLD; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'transparent'; el.style.borderColor = 'rgba(200,168,75,0.4)'; }}
            >
              Request Brief →
            </a>
          </div>

          {/* Stakeholder Review Note */}
          {role === 'stakeholder' && (
            <div style={{ marginTop: 48, padding: '24px 28px', border: `1px solid rgba(200,168,75,0.2)`, background: 'rgba(200,168,75,0.025)', maxWidth: 720 }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: GOLD, display: 'block', marginBottom: 12 }}>// Stakeholder Review Note</span>
              <p style={{ fontFamily: MONO, fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                The activity programme is designed to route value through Port Antonio while maintaining controls around local operator participation, environmental protection, guest movement, water activity, waste removal, and mainland activations. Final operating standards should be developed with relevant tourism, environmental, site-use, safety, and municipal stakeholders.
              </p>
            </div>
          )}
        </div>
      </ChapterSection>

      {/* ── Footer ── */}
      <footer style={{ padding: '60px 8vw', borderTop: `1px solid ${BORDER}`, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, backgroundColor: BG }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 6vw, 72px)', fontWeight: 900, color: 'rgba(200,168,75,0.06)', lineHeight: 1, letterSpacing: '-0.03em' }}>
          ZUNGU FESTIVAL
        </div>
        <div style={{ fontFamily: MONO, fontSize: 9, color: DIM, letterSpacing: '0.25em', textTransform: 'uppercase', lineHeight: 2, textAlign: 'right' }}>
          <div>Confidential concept material · Not for public distribution</div>
          <div>Navy Island · Port Antonio, Jamaica</div>
          <div>Target Window: June 17–23, 2027</div>
        </div>
      </footer>
    </div>
  );
}

export default function ActivitiesPage() {
  return (
    <Suspense>
      <ActivitiesPageInner />
    </Suspense>
  );
}
