'use client';

import { useClerk, useUser } from '@clerk/nextjs';

const BG   = '#04080A';
const ALT  = '#0D2018';
const GOLD = '#C8A84B';
const CREAM = '#F2EBD9';
const MUTED = 'rgba(242,235,217,0.45)';
const DIM   = 'rgba(242,235,217,0.18)';
const RUST  = '#C45A2A';
const ORIGINS_ACCENT = '#D4722A';
const REBIRTH_ACCENT = '#9B5FC0';

const display = "'Unbounded', sans-serif";
const mono    = "'Space Mono', monospace";

const label = (text: string, color = GOLD) => (
  <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.35em', color, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>
    {text}
  </p>
);

const h2 = (text: string) => (
  <h2 style={{ fontFamily: display, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: CREAM, lineHeight: 1.05, textTransform: 'uppercase', margin: '0 0 32px' }}>
    {text}
  </h2>
);

const body = (text: string, style?: React.CSSProperties) => (
  <p style={{ fontFamily: mono, fontSize: 15, color: MUTED, lineHeight: 1.9, margin: '0 0 20px', ...style }}>
    {text}
  </p>
);

const divider = () => (
  <div style={{ width: '100%', height: 1, background: `rgba(200,168,75,0.12)` }} />
);

export default function DeckContent({ navLabel }: { navLabel?: string }) {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div style={{ backgroundColor: BG, fontFamily: mono, color: CREAM, minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.25rem 8vw',
        backgroundColor: 'rgba(4,8,10,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${DIM}`,
        flexWrap: 'nowrap',
      }}>
        <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 28, filter: `drop-shadow(0 0 8px rgba(200,168,75,0.4))` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'nowrap' }}>
          {navLabel && (
            <span style={{ fontSize: 10, color: GOLD, border: `1px solid rgba(200,168,75,0.4)`, padding: '0.3rem 0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {navLabel}
            </span>
          )}
          {user?.primaryEmailAddress?.emailAddress && (
            <span style={{ fontSize: 10, color: MUTED, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
              {user.primaryEmailAddress.emailAddress}
            </span>
          )}
          <button
            onClick={() => signOut({ redirectUrl: '/' })}
            style={{ fontFamily: mono, fontSize: 10, color: MUTED, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline
          poster="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_AERIAL_vaapz1.png"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.9) brightness(0.55)' }}
        >
          <source src="https://res.cloudinary.com/elektricbangaz/video/upload/v1780459585/aerial-view-of-navy-island-in-port-antonio-in-jama-2025-12-17-11-59-54-utc_coui1y.mov" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,8,10,0.3) 0%, rgba(4,8,10,0.1) 40%, rgba(4,8,10,0.6) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, padding: '0 8vw', maxWidth: 900, width: '100%' }}>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.4em', color: `rgba(200,168,75,0.8)`, textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 700 }}>
            EXECUTIVE BRIEFING · NAVY ISLAND · PORT ANTONIO · JAMAICA
          </p>
          <h1 style={{ fontFamily: display, fontSize: 'clamp(4rem, 13vw, 10rem)', fontWeight: 900, letterSpacing: '-0.03em', color: CREAM, lineHeight: 0.95, textTransform: 'uppercase', margin: '0 0 0.25rem' }}>
            ZUNGU FESTIVAL
          </h1>
          <p style={{ fontFamily: display, fontSize: 'clamp(1rem, 2.5vw, 1.75rem)', fontWeight: 300, letterSpacing: '0.4em', color: GOLD, marginBottom: '2rem' }}>
            MMXXVII
          </p>
          <p style={{ fontFamily: mono, fontSize: 15, color: `rgba(247,243,236,0.75)`, lineHeight: 1.8, marginBottom: '0.75rem', maxWidth: 600, margin: '0 auto 0.75rem' }}>
            For one week, the most beautiful place on earth welcomes you to Zungu.
          </p>
          <p style={{ fontFamily: mono, fontSize: 15, color: `rgba(247,243,236,0.6)`, lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 600, margin: '0 auto 2.5rem' }}>
            Where the magic of sound, sea, sand, movement, and Caribbean rhythm invites you into the ultimate electronic music experience.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:partnership@zungufestival.com?subject=Briefing%20Request"
              style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.3em', padding: '13px 28px', backgroundColor: GOLD, color: BG, textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase' }}>
              Request Briefing →
            </a>
            <a href="#what-is-zungu"
              style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.3em', padding: '13px 28px', backgroundColor: 'transparent', border: `1px solid rgba(200,168,75,0.5)`, color: GOLD, textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase' }}>
              Explore ↓
            </a>
          </div>
        </div>
        <p style={{ position: 'absolute', bottom: '1.75rem', fontFamily: mono, fontSize: 9, letterSpacing: '0.25em', color: `rgba(200,168,75,0.35)`, textTransform: 'lowercase', zIndex: 10 }}>
          partnership@zungufestival.com
        </p>
      </div>

      {/* ── WHAT IS ZUNGU? ── */}
      <section id="what-is-zungu" style={{ backgroundColor: BG, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// WHAT IS ZUNGU?')}
        {h2('What Is Zungu?')}
        {body('Zungu is a private-island electronic music festival in Port Antonio, Jamaica.')}
        {body('But it is not just an event on an island.')}
        {body('It is what happens when an entire island moves in rhythm — stages, people, sound, food, water, art, light, culture, and night coming together as one living world.')}
        <p style={{ fontFamily: display, fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 700, color: GOLD, letterSpacing: '-0.01em', marginTop: 32 }}>
          For one week, Navy Island becomes Zungu.
        </p>
      </section>

      {divider()}

      {/* ── WHAT DOES ZUNGU MEAN? ── */}
      <section style={{ backgroundColor: BG, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// WHAT DOES ZUNGU MEAN?')}
        {h2('What Does Zungu Mean?')}
        {body('Zungu begins with rhythm.')}
        {body('The name borrows its pulse from Yellowman\'s "Zungguzungguguzungguzeng" — one of dancehall\'s most iconic sounds. A phrase built from energy, instinct, repetition, and movement.')}
        {body('It does not need to be translated to be felt.')}
        {body('For Zungu, the meaning is simple:')}
        <div style={{ marginTop: 32, paddingLeft: 0 }}>
          {['Everything in rhythm.', 'The crowd.', 'The bass.', 'The island.', 'The night.', 'The culture.', 'The world coming back to Jamaica.'].map((line, i) => (
            <p key={i} style={{ fontFamily: mono, fontSize: i === 0 ? 18 : 15, color: i === 0 ? CREAM : MUTED, lineHeight: 1.7, margin: '4px 0', fontWeight: i === 0 ? 700 : 400 }}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* ── THE BRAND THESIS ── */}
      <section style={{ backgroundColor: ALT, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// THE BRAND THESIS')}
        {h2('The Brand Thesis')}
        {body('Jamaica gave the world rhythm.')}
        {body('From sound systems to dub, dancehall, bass culture, remix culture, MC culture, jungle, drum and bass, dubstep, and global club music — Jamaica\'s influence has moved through the world for decades.')}
        {body('Zungu brings that movement home.')}
        <div style={{ marginTop: 24 }}>
          {['Not as nostalgia.', 'Not as a lecture.', 'As a festival.'].map((line, i) => (
            <p key={i} style={{ fontFamily: mono, fontSize: 15, color: i === 2 ? CREAM : MUTED, fontWeight: i === 2 ? 700 : 400, lineHeight: 1.7, margin: '4px 0' }}>{line}</p>
          ))}
        </div>
        <p style={{ fontFamily: display, fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 700, color: GOLD, marginTop: 32, lineHeight: 1.4 }}>
          A Jamaican-born electronic music destination built for the world.
        </p>
      </section>

      {/* ── THE ISLAND ── */}
      <section style={{ backgroundColor: BG, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// THE ISLAND')}
        {h2('The Island')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            {body('Navy Island is the scenery.')}
            {body('It is where the world of Zungu comes alive and the magic of the experience begins.')}
            {body('For one week, the island becomes the festival.')}
            <div style={{ margin: '24px 0' }}>
              {['The forest becomes movement.', 'The water becomes atmosphere.', 'The stages become landmarks.', 'The night becomes ritual.', 'The island becomes sound.'].map((line, i) => (
                <p key={i} style={{ fontFamily: mono, fontSize: 15, color: MUTED, lineHeight: 1.8, margin: '4px 0' }}>{line}</p>
              ))}
            </div>
            {body('This is not a field with a stage on it.')}
            <p style={{ fontFamily: mono, fontSize: 15, color: CREAM, fontWeight: 700, lineHeight: 1.8 }}>This is an entire island transformed.</p>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_AERIAL_vaapz1.png"
              alt="Navy Island aerial"
              style={{ width: '100%', display: 'block', filter: 'saturate(0.9) brightness(0.85)' }}
            />
          </div>
        </div>
      </section>

      {/* ── THE STAGES ── */}
      <section style={{ backgroundColor: ALT, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// THE STAGES')}
        {h2('The Stages')}
        {body('Three stages give Zungu its shape.')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', marginTop: 48, backgroundColor: DIM }}>
          {[
            { name: 'ORIGINS', accent: ORIGINS_ACCENT, pos: 'Sunrise Stage', desc: 'Faces the sunrise. Earth sound. Tribal fusion. Organic electronic. Deep percussion. Rooted rhythms. The beginning.' },
            { name: 'REBIRTH', accent: REBIRTH_ACCENT, pos: 'Sunset Stage', desc: 'Faces the sunset. Tribal. Tech. Underground house. Hypnotic grooves. Golden hour energy. The transformation.' },
            { name: 'ZUNGU', accent: GOLD, pos: 'Centre Island · Mainstage', desc: 'Sits at the centre of the island. The mainstage. Major acts. Big-room energy. Full production. The moments that define the week.' },
          ].map(({ name, accent, pos, desc }) => (
            <div key={name} style={{ backgroundColor: ALT, padding: '40px 32px', borderTop: `3px solid ${accent}` }}>
              <p style={{ fontFamily: display, fontSize: 18, fontWeight: 900, color: accent, letterSpacing: '-0.01em', marginBottom: 8 }}>{name}</p>
              <p style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>{pos}</p>
              <p style={{ fontFamily: mono, fontSize: 15, color: MUTED, lineHeight: 1.8 }}>{desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: mono, fontSize: 15, color: MUTED, marginTop: 48, lineHeight: 1.8 }}>
          The stages are not just places to perform.
        </p>
        <p style={{ fontFamily: display, fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 700, color: GOLD, marginTop: 8 }}>
          They are the rhythm of the island.
        </p>
      </section>

      {/* ── THE EXPERIENCE ── */}
      <section style={{ backgroundColor: BG, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// THE EXPERIENCE')}
        {h2('The Experience')}
        {body('Zungu is designed as a world guests move through.')}
        {body('By day, the island opens through food, coffee, bars, water, wellness, art, media, culture, retail, and discovery.')}
        {body('At sunset, the energy shifts.')}
        {body('At night, the stages take over.')}
        {body('By sunrise, the island returns to rhythm — slower, deeper, changed.')}
        {body('Zungu is not built around one moment.')}
        <p style={{ fontFamily: display, fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 700, color: GOLD, marginTop: 16 }}>
          It is built around movement.
        </p>
      </section>

      {/* ── FESTIVAL WEEK ── */}
      <section style={{ backgroundColor: ALT, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// FESTIVAL WEEK')}
        {h2('Festival Week')}
        {body('Zungu is a seven-day island experience.')}
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { date: 'June 17', sub: 'Arrival', desc: 'Arrival, check-in, welcome parties, soft openings, partner receptions, island orientation, and the first taste of Zungu.' },
            { date: 'June 18–21', sub: 'Core Festival Nights', desc: 'The island is fully alive: stages, programming, food, bars, water, wellness, pop-ups, late-night sound, and sunrise sessions.' },
            { date: 'June 21–23', sub: 'Recovery & Departure', desc: 'Recovery, smaller island events, Port Antonio dinners, media moments, artist sessions, pop-ups, final gatherings, and departure.' },
            { date: 'After guests leave', sub: 'Production Breakdown', desc: 'Production breakdown begins. The week is not only about the main nights. It is about the island becoming a world, then slowly returning to itself.' },
          ].map(({ date, sub, desc }, i) => (
            <div key={i} style={{ display: 'flex', gap: '4rem', padding: '36px 0', borderBottom: `1px solid ${DIM}` }}>
              <div style={{ minWidth: 160, flexShrink: 0 }}>
                <p style={{ fontFamily: display, fontSize: 13, fontWeight: 700, color: GOLD, margin: 0, letterSpacing: '-0.01em' }}>{date}</p>
                <p style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>{sub}</p>
              </div>
              <p style={{ fontFamily: mono, fontSize: 15, color: MUTED, lineHeight: 1.8, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE SOUND ── */}
      <section style={{ backgroundColor: BG, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// THE SOUND')}
        {h2('The Sound')}
        {body('Zungu is electronic music through a Jamaican lens.')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '32px 0 40px' }}>
          {['Afro-house', 'Tribal house', 'Big-room electronic', 'Tech house', 'Underground house', 'Jungle', 'Drum and bass', 'Dub-influenced club music', 'Jamaican electronic', 'Sunrise sets', 'Sunset sessions', 'Mainstage nights'].map(tag => (
            <span key={tag} style={{ fontFamily: mono, fontSize: 10, color: GOLD, border: `1px solid rgba(200,168,75,0.35)`, padding: '8px 16px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{tag}</span>
          ))}
        </div>
        {body('The sound is global.')}
        <p style={{ fontFamily: display, fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 700, color: GOLD }}>The root is Jamaican.</p>
      </section>

      {/* ── WHY JAMAICA / WHY NAVY ISLAND ── */}
      <section style={{ backgroundColor: ALT, padding: '96px 8vw', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem' }}>
          <div>
            {label('// WHY JAMAICA?')}
            {h2('Why Jamaica?')}
            {body('Because the world already moves to Jamaica.')}
            {body('Jamaican sound-system culture changed how music is played, felt, remixed, performed, and experienced.')}
            {body('That influence moved outward — through dancehall, dub, hip-hop, jungle, drum and bass, dubstep, grime, bass culture, and global electronic music.')}
            <p style={{ fontFamily: display, fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', fontWeight: 700, color: GOLD, marginTop: 16 }}>Zungu brings the world back to the source.</p>
          </div>
          <div>
            {label('// WHY NAVY ISLAND?')}
            {h2('Why Navy Island?')}
            {body('Because an island can become a world.')}
            {body('Navy Island gives Zungu what no built venue can fake: forest, water, separation, mystery, arrival, scale, and transformation.')}
            <p style={{ fontFamily: display, fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', fontWeight: 700, color: GOLD, marginTop: 16 }}>For one week, it is not just Navy Island. It is Zungu.</p>
          </div>
        </div>
      </section>

      {/* ── PROGRAMMING ── */}
      <section style={{ backgroundColor: BG, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// PROGRAMMING')}
        {h2('Programming')}
        {body('Zungu is not only nighttime music.')}
        {body('The island moves all day.')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '24px 0 32px' }}>
          {['Food', 'Coffee', 'Bars', 'Water', 'Wellness', 'Art', 'Culture', 'Media', 'The Zungu Shoppe', 'The Trail', 'The Pier', 'The Signal'].map(item => (
            <span key={item} style={{ fontFamily: mono, fontSize: 13, color: MUTED, borderLeft: `2px solid rgba(200,168,75,0.35)`, paddingLeft: 12 }}>{item}</span>
          ))}
        </div>
        {body('Every zone has a purpose: guest experience, revenue, sponsor value, local operator participation, and movement across the island.')}
        <p style={{ fontFamily: display, fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', fontWeight: 700, color: GOLD, marginTop: 16 }}>The island is not passive. The island performs.</p>
      </section>

      {/* ── POP-UPS ── */}
      <section style={{ backgroundColor: ALT, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// POP-UPS')}
        {h2('Pop-Ups')}
        {body('Not every Zungu moment needs a main stage.')}
        {body('Some moments are discovered.')}
        <div style={{ margin: '24px 0 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Beach selectors.', 'Forest listening sessions.', 'Zungu Radio recordings.', 'The Signal sessions.', 'Shoppe takeovers.', 'Partner lounge music.', 'Pier moments.', 'Welcome party sets.', 'Recovery day selectors.', 'Final hoorah programming.'].map((item, i) => (
            <p key={i} style={{ fontFamily: mono, fontSize: 15, color: MUTED, margin: 0, lineHeight: 1.6 }}>{item}</p>
          ))}
        </div>
        {body('The three stages give Zungu its structure.')}
        <p style={{ fontFamily: display, fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', fontWeight: 700, color: GOLD, marginTop: 8 }}>The pop-ups give the island life between the major moments.</p>
      </section>

      {/* ── ZUNGU RADIO / THE SIGNAL ── */}
      <section style={{ backgroundColor: BG, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// ZUNGU RADIO · THE SIGNAL')}
        {h2('Zungu Radio / The Signal')}
        {body('Zungu does not disappear when the festival ends.')}
        {body('Through Zungu Radio and The Signal, the sound continues: artist interviews, commissioned mixes, live recordings, field audio, press moments, and stories from the island.')}
        <p style={{ fontFamily: display, fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', fontWeight: 700, color: GOLD, marginTop: 24 }}>
          The festival creates the moment. The media keeps it moving.
        </p>
      </section>

      {/* ── PORT ANTONIO ── */}
      <section style={{ backgroundColor: ALT, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// PORT ANTONIO')}
        {h2('Port Antonio')}
        {body('Zungu is anchored on Navy Island, but Port Antonio powers the experience.')}
        {body('The town supplies the ecosystem: boats, drivers, hotels, villas, guest houses, restaurants, bars, guides, vendors, food suppliers, production crew, wellness practitioners, artists, and mainland activations.')}
        <p style={{ fontFamily: display, fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 700, color: CREAM, marginTop: 32, lineHeight: 1.3 }}>
          Navy Island is the world.<br />Port Antonio is the heartbeat behind it.
        </p>
        <div style={{ marginTop: 32 }}>
          {body('This is not charity language.')}
          <p style={{ fontFamily: mono, fontSize: 15, color: CREAM, fontWeight: 700, lineHeight: 1.8 }}>It is business logic.</p>
          {body('The stronger Port Antonio is inside the model, the more locally defensible Zungu becomes.')}
        </div>
      </section>

      {/* ── INVESTOR POSITIONING ── */}
      <section style={{ backgroundColor: BG, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// INVESTOR POSITIONING')}
        {h2('Investor Positioning')}
        {body('Zungu is a festival, but the opportunity is larger than one event.')}
        {body('It is a Jamaican-born destination brand built across live experience, hospitality, sponsorship, media, artist commissions, local economic participation, and long-term cultural value.')}
        <p style={{ fontFamily: display, fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', fontWeight: 700, color: GOLD, marginTop: 24, lineHeight: 1.5 }}>
          The first edition creates the founding story. The platform grows from there.
        </p>
      </section>

      {/* ── SHORT POSITIONING LINES ── */}
      <section style={{ backgroundColor: ALT, padding: '96px 8vw', boxSizing: 'border-box' }}>
        {label('// POSITIONING')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {[
            { text: 'For one week, the most beautiful place on earth welcomes you to Zungu.', color: CREAM },
            { text: 'For one week, Navy Island becomes Zungu.', color: GOLD },
            { text: 'Zungu means everything in rhythm.', color: CREAM },
            { text: 'Jamaica gave the world rhythm. Zungu brings the world back to the source.', color: GOLD },
            { text: 'The world has moved to Jamaica\'s rhythm. Now the rhythm has a home.', color: CREAM },
            { text: 'An island transformed by sound.', color: GOLD },
            { text: 'The island is not passive. The island performs.', color: CREAM },
            { text: 'The festival creates the moment. The media keeps it moving.', color: GOLD },
            { text: 'Navy Island is the world. Port Antonio is the heartbeat behind it.', color: CREAM },
          ].map(({ text, color }, i) => (
            <p key={i} style={{ fontFamily: display, fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', fontWeight: 700, color, letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0, borderLeft: `2px solid rgba(200,168,75,0.2)`, paddingLeft: '2rem' }}>
              {text}
            </p>
          ))}
        </div>
      </section>

      {/* ── REQUEST BRIEFING ── */}
      <section style={{ backgroundColor: BG, padding: '96px 8vw', boxSizing: 'border-box', textAlign: 'center' }}>
        {label('// REQUEST BRIEFING', GOLD)}
        <h2 style={{ fontFamily: display, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: CREAM, lineHeight: 1.05, textTransform: 'uppercase', margin: '0 0 32px' }}>
          Request Briefing
        </h2>
        <p style={{ fontFamily: mono, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 560, margin: '0 auto 16px' }}>
          Zungu briefing access is reviewed by role.
        </p>
        <p style={{ fontFamily: mono, fontSize: 15, color: MUTED, lineHeight: 1.9, maxWidth: 560, margin: '0 auto 40px' }}>
          Submit your enquiry and the team will respond with the appropriate investor, production, supplier, strategic partner, or press material.
        </p>
        <a
          href="mailto:partnership@zungufestival.com?subject=Briefing%20Request"
          style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.3em', padding: '16px 40px', backgroundColor: GOLD, color: BG, textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', display: 'inline-block' }}
        >
          Request Briefing →
        </a>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ backgroundColor: ALT, padding: '2rem 8vw', borderTop: `1px solid ${DIM}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <img src="/zungu-z-mark.png" alt="Zungu" style={{ height: 24, filter: `drop-shadow(0 0 8px rgba(200,168,75,0.3))`, opacity: 0.6 }} />
        <p style={{ fontFamily: mono, fontSize: 9, color: MUTED, letterSpacing: '0.2em', margin: 0 }}>
          CONFIDENTIAL CONCEPT MATERIAL · NOT FOR PUBLIC DISTRIBUTION
        </p>
        <p style={{ fontFamily: mono, fontSize: 9, color: MUTED, letterSpacing: '0.15em', margin: 0 }}>
          NAVY ISLAND · PORT ANTONIO, JAMAICA · JUNE 17–23, 2027
        </p>
      </div>

    </div>
  );
}
