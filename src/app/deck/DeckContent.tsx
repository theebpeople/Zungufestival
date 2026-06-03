'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const GOLD = '#C8A84B';
const CREAM = '#F2EBD9';
const MUTED = 'rgba(242,235,217,0.45)';
const DIM = 'rgba(242,235,217,0.18)';
const BG = '#04080A';
const ALT = '#0D2018';

const sectionStyle = (bg?: string): React.CSSProperties => ({
  padding: '96px 8vw',
  background: bg || BG,
  width: '100%',
  boxSizing: 'border-box',
});

const GoldLabel = ({ text }: { text: string }) => (
  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: GOLD, letterSpacing: '0.15em', marginBottom: 32, textTransform: 'uppercase' as const }}>
    {text}
  </p>
);

const BodyText = ({ text, style }: { text: string; style?: React.CSSProperties }) => (
  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 760, margin: 0, ...style }}>
    {text}
  </p>
);

export default function DeckContent({ navLabel }: { navLabel?: string }) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const exploreRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: BG, color: CREAM, fontFamily: 'Space Mono, monospace' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(4,8,10,0.92)',
        borderBottom: `1px solid ${DIM}`,
        padding: '0 8vw',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        <span style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 13, color: GOLD, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
          ZUNGU
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexShrink: 0 }}>
          {user && (
            <span style={{ fontSize: 10, color: MUTED, fontFamily: 'Space Mono, monospace' }}>
              {user.emailAddresses?.[0]?.emailAddress}
            </span>
          )}
          <button
            onClick={handleSignOut}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 10,
              color: CREAM,
              background: 'transparent',
              border: `1px solid ${DIM}`,
              padding: '6px 14px',
              cursor: 'pointer',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            SIGN OUT
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_AERIAL_vaapz1.png"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.55)',
            zIndex: 0,
          }}
        >
          <source src="https://res.cloudinary.com/elektricbangaz/video/upload/v1780459585/aerial-view-of-navy-island-in-port-antonio-in-jama-2025-12-17-11-59-54-utc_coui1y.mov" type="video/mp4" />
        </video>
        <div style={{ position: 'relative', zIndex: 1, padding: '0 8vw' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: GOLD, letterSpacing: '0.18em', marginBottom: 32, textTransform: 'uppercase' }}>
            EXECUTIVE BRIEFING · NAVY ISLAND · PORT ANTONIO · JAMAICA
          </p>
          <h1 style={{
            fontFamily: 'Unbounded, sans-serif',
            fontSize: 'clamp(40px, 9vw, 120px)',
            color: CREAM,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            margin: '0 0 24px',
            fontWeight: 900,
          }}>
            ZUNGU FESTIVAL
          </h1>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 'clamp(18px, 2.5vw, 32px)', color: GOLD, letterSpacing: '0.3em', marginBottom: 40 }}>
            MMXXVII
          </p>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 640, margin: '0 auto 48px' }}>
            For one week, the most beautiful place on earth welcomes you to Zungu. Where the magic of sound, sea, sand, movement, and Caribbean rhythm invites you into the ultimate electronic music experience.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:partnership@zungufestival.com"
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 12,
                color: BG,
                background: GOLD,
                padding: '14px 28px',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                display: 'inline-block',
              }}
            >
              Request Briefing →
            </a>
            <button
              onClick={scrollToExplore}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 12,
                color: CREAM,
                background: 'transparent',
                border: `1px solid ${DIM}`,
                padding: '14px 28px',
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
            >
              Explore ↓
            </button>
          </div>
        </div>
      </section>

      {/* WHAT IS ZUNGU? */}
      <div ref={exploreRef} />
      <section style={sectionStyle()}>
        <GoldLabel text="// WHAT IS ZUNGU?" />
        <BodyText text="Zungu is a private-island electronic music festival in Port Antonio, Jamaica. But it is not just an event on an island. It is what happens when an entire island moves in rhythm — stages, people, sound, food, water, art, light, culture, and night coming together as one living world. For one week, Navy Island becomes Zungu." />
      </section>

      {/* WHAT DOES ZUNGU MEAN? */}
      <section style={sectionStyle()}>
        <GoldLabel text="// WHAT DOES ZUNGU MEAN?" />
        <BodyText text={'Zungu begins with rhythm. The name borrows its pulse from Yellowman\'s "Zungguzungguguzungguzeng" — one of dancehall\'s most iconic sounds. A phrase built from energy, instinct, repetition, and movement. It does not need to be translated to be felt. For Zungu, the meaning is simple: Everything in rhythm. The crowd. The bass. The island. The night. The culture. The world coming back to Jamaica.'} />
      </section>

      {/* THE BRAND THESIS */}
      <section style={sectionStyle(ALT)}>
        <GoldLabel text="// THE BRAND THESIS" />
        <BodyText text="Jamaica gave the world rhythm. From sound systems to dub, dancehall, bass culture, remix culture, MC culture, jungle, drum and bass, dubstep, and global club music — Jamaica's influence has moved through the world for decades. Zungu brings that movement home. Not as nostalgia. Not as a lecture. As a festival. A Jamaican-born electronic music destination built for the world." />
      </section>

      {/* THE ISLAND */}
      <section style={sectionStyle()}>
        <GoldLabel text="// THE ISLAND" />
        <BodyText text="Navy Island is the scenery. It is where the world of Zungu comes alive and the magic of the experience begins. For one week, the island becomes the festival. The forest becomes movement. The water becomes atmosphere. The stages become landmarks. The night becomes ritual. The island becomes sound. This is not a field with a stage on it. This is an entire island transformed." />
        <div style={{ marginTop: 48 }}>
          <img
            src="https://res.cloudinary.com/elektricbangaz/image/upload/v1773236490/NAVY_ISLAND_AERIAL_vaapz1.png"
            alt="Navy Island Aerial"
            style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 560 }}
          />
        </div>
      </section>

      {/* THE STAGES */}
      <section style={sectionStyle(ALT)}>
        <GoldLabel text="// THE STAGES" />
        <BodyText text="Three stages give Zungu its shape. The stages are not just places to perform. They are the rhythm of the island." />
        <div style={{ display: 'flex', gap: 24, marginTop: 48, flexWrap: 'wrap' }}>
          {[
            {
              name: 'ORIGINS',
              accent: '#D4722A',
              desc: 'Faces the sunrise. Earth sound. Tribal fusion. Organic electronic. Deep percussion. Rooted rhythms. The beginning.',
            },
            {
              name: 'REBIRTH',
              accent: '#9B5FC0',
              desc: 'Faces the sunset. Tribal. Tech. Underground house. Hypnotic grooves. Golden hour energy. The transformation.',
            },
            {
              name: 'ZUNGU',
              accent: GOLD,
              desc: 'Sits at the centre of the island. The mainstage. Major acts. Big-room energy. Full production. The moments that define the week.',
            },
          ].map((stage) => (
            <div
              key={stage.name}
              style={{
                flex: '1 1 260px',
                borderTop: `3px solid ${stage.accent}`,
                paddingTop: 32,
              }}
            >
              <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 16, color: stage.accent, marginBottom: 16, letterSpacing: '0.05em' }}>
                {stage.name}
              </p>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 14, color: MUTED, lineHeight: 1.75, margin: 0 }}>
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE EXPERIENCE */}
      <section style={sectionStyle()}>
        <GoldLabel text="// THE EXPERIENCE" />
        <BodyText text="Zungu is designed as a world guests move through. By day, the island opens through food, coffee, bars, water, wellness, art, media, culture, retail, and discovery. At sunset, the energy shifts. At night, the stages take over. By sunrise, the island returns to rhythm — slower, deeper, changed. Zungu is not built around one moment. It is built around movement." />
      </section>

      {/* FESTIVAL WEEK */}
      <section style={sectionStyle()}>
        <GoldLabel text="// FESTIVAL WEEK" />
        <BodyText text="Zungu is a seven-day island experience." />
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column' }}>
          {[
            {
              date: 'JUNE 17',
              desc: 'Arrival, check-in, welcome parties, soft openings, partner receptions, island orientation, and the first taste of Zungu.',
            },
            {
              date: 'JUNE 18–21',
              desc: 'Core festival nights. The island is fully alive: stages, programming, food, bars, water, wellness, pop-ups, late-night sound, and sunrise sessions.',
            },
            {
              date: 'JUNE 21–23',
              desc: 'Recovery, smaller island events, Port Antonio dinners, media moments, artist sessions, pop-ups, final gatherings, and departure.',
            },
            {
              date: 'AFTER GUESTS LEAVE',
              desc: 'Production breakdown begins. The week is not only about the main nights. It is about the island becoming a world, then slowly returning to itself.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                paddingBottom: 40,
                paddingLeft: 32,
                borderLeft: `2px solid ${DIM}`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: -7,
                  top: 4,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: GOLD,
                }}
              />
              <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 11, color: GOLD, letterSpacing: '0.12em', marginBottom: 10, marginTop: 0 }}>
                {item.date}
              </p>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 14, color: MUTED, lineHeight: 1.75, maxWidth: 640, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE SOUND */}
      <section style={sectionStyle(ALT)}>
        <GoldLabel text="// THE SOUND" />
        <BodyText text="Zungu is electronic music through a Jamaican lens. The sound is global. The root is Jamaican." />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 32 }}>
          {[
            'Afro-house',
            'Tribal house',
            'Big-room electronic',
            'Tech house',
            'Underground house',
            'Jungle',
            'Drum and bass',
            'Dub-influenced club music',
            'Jamaican electronic',
            'Sunrise sets',
            'Sunset sessions',
            'Mainstage nights',
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 11,
                color: CREAM,
                border: `1px solid ${DIM}`,
                padding: '8px 16px',
                letterSpacing: '0.05em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* WHY JAMAICA? / WHY NAVY ISLAND? */}
      <section style={sectionStyle()}>
        <div style={{ display: 'flex', gap: '8vw', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <GoldLabel text="// WHY JAMAICA?" />
            <BodyText text="Because the world already moves to Jamaica. Jamaican sound-system culture changed how music is played, felt, remixed, performed, and experienced. That influence moved outward — through dancehall, dub, hip-hop, jungle, drum and bass, dubstep, grime, bass culture, and global electronic music. Zungu brings the world back to the source." />
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <GoldLabel text="// WHY NAVY ISLAND?" />
            <BodyText text="Because an island can become a world. Navy Island gives Zungu what no built venue can fake: forest, water, separation, mystery, arrival, scale, and transformation. For one week, it is not just Navy Island. It is Zungu." />
          </div>
        </div>
      </section>

      {/* PROGRAMMING */}
      <section style={sectionStyle(ALT)}>
        <GoldLabel text="// PROGRAMMING" />
        <BodyText text="Zungu is not only nighttime music. The island moves all day. Food. Coffee. Bars. Water. Wellness. Art. Culture. Media. The Zungu Shoppe. The Trail. The Pier. The Signal. Every zone has a purpose: guest experience, revenue, sponsor value, local operator participation, and movement across the island. The island is not passive. The island performs." />
      </section>

      {/* POP-UPS */}
      <section style={sectionStyle()}>
        <GoldLabel text="// POP-UPS" />
        <BodyText text="Not every Zungu moment needs a main stage. Some moments are discovered. Beach selectors. Forest listening sessions. Zungu Radio recordings. The Signal sessions. Shoppe takeovers. Partner lounge music. Pier moments. Welcome party sets. Recovery day selectors. Final hoorah programming. The three stages give Zungu its structure. The pop-ups give the island life between the major moments." />
      </section>

      {/* ZUNGU RADIO / THE SIGNAL */}
      <section style={sectionStyle()}>
        <GoldLabel text="// ZUNGU RADIO / THE SIGNAL" />
        <BodyText text="Zungu does not disappear when the festival ends. Through Zungu Radio and The Signal, the sound continues: artist interviews, commissioned mixes, live recordings, field audio, press moments, and stories from the island. The festival creates the moment. The media keeps it moving." />
      </section>

      {/* PORT ANTONIO */}
      <section style={sectionStyle(ALT)}>
        <GoldLabel text="// PORT ANTONIO" />
        <BodyText text="Zungu is anchored on Navy Island, but Port Antonio powers the experience. The town supplies the ecosystem: boats, drivers, hotels, villas, guest houses, restaurants, bars, guides, vendors, food suppliers, production crew, wellness practitioners, artists, and mainland activations. Navy Island is the world. Port Antonio is the heartbeat behind it. This is not charity language. It is business logic. The stronger Port Antonio is inside the model, the more locally defensible Zungu becomes." />
      </section>

      {/* INVESTOR POSITIONING */}
      <section style={sectionStyle()}>
        <GoldLabel text="// INVESTOR POSITIONING" />
        <BodyText text="Zungu is a festival, but the opportunity is larger than one event. It is a Jamaican-born destination brand built across live experience, hospitality, sponsorship, media, artist commissions, local economic participation, and long-term cultural value. The first edition creates the founding story. The platform grows from there." />
      </section>

      {/* SHORT POSITIONING LINES */}
      <section style={sectionStyle(ALT)}>
        <GoldLabel text="// ZUNGU" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            'For one week, the most beautiful place on earth welcomes you to Zungu.',
            'For one week, Navy Island becomes Zungu.',
            'Zungu means everything in rhythm.',
            'Jamaica gave the world rhythm. Zungu brings the world back to the source.',
            "The world has moved to Jamaica's rhythm. Now the rhythm has a home.",
            'An island transformed by sound.',
            'The island is not passive. The island performs.',
            'The festival creates the moment. The media keeps it moving.',
            'Navy Island is the world. Port Antonio is the heartbeat behind it.',
          ].map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'Unbounded, sans-serif',
                fontSize: 'clamp(16px, 2.5vw, 28px)',
                color: i % 2 === 0 ? CREAM : GOLD,
                lineHeight: 1.4,
                padding: '28px 0',
                borderBottom: `1px solid ${DIM}`,
                margin: 0,
                fontWeight: i % 2 === 0 ? 400 : 700,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* REQUEST BRIEFING */}
      <section style={{ ...sectionStyle(), textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'Unbounded, sans-serif',
          fontSize: 'clamp(24px, 4vw, 56px)',
          color: GOLD,
          letterSpacing: '0.05em',
          marginBottom: 32,
          marginTop: 0,
        }}>
          REQUEST BRIEFING
        </h2>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 600, margin: '0 auto 48px' }}>
          Zungu briefing access is reviewed by role. Submit your enquiry and the team will respond with the appropriate investor, production, supplier, strategic partner, or press material.
        </p>
        <a
          href="mailto:partnership@zungufestival.com?subject=Briefing%20Request"
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 13,
            color: BG,
            background: GOLD,
            padding: '18px 40px',
            textDecoration: 'none',
            letterSpacing: '0.12em',
            display: 'inline-block',
          }}
        >
          REQUEST BRIEFING →
        </a>
      </section>

      {/* FOOTER */}
      <div style={{
        padding: '40px 8vw',
        borderTop: `1px solid ${DIM}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        background: BG,
      }}>
        <span style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 11, color: GOLD, letterSpacing: '0.12em' }}>ZUNGU FESTIVAL</span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: DIM }}>CONFIDENTIAL · FOR AUTHORISED RECIPIENTS ONLY</span>
      </div>
    </div>
  );
}
