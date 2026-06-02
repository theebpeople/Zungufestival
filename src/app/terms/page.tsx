import Link from 'next/link';

const GOLD = '#C8A84B';
const BLACK = '#060808';
const CREAM = '#F7F3EC';
const BORDER = 'rgba(200,168,75,0.18)';
const MUTED = 'rgba(242,235,217,0.45)';

const SECTIONS = [
  {
    title: 'Tickets & Admission',
    body: [
      'All ticket sales are final. No refunds will be issued except in the event of festival cancellation by the organiser.',
      'Tickets are non-transferable and must be presented alongside valid government-issued photo identification at the point of entry.',
      'Zungu Festival reserves the right to refuse admission to any individual without obligation to provide a reason.',
      'Tickets remain the property of Zungu Festival until the event commences. Duplicate, forged, or resold tickets above face value will be voided.',
      'The festival is strictly 18+ adults only. Proof of age will be required.',
    ],
  },
  {
    title: 'Festival Rules & Conduct',
    body: [
      'All attendees must comply with the directions of festival staff and security at all times.',
      'The following items are prohibited on festival grounds: illegal substances, glass containers, professional photography equipment (long-lens), weapons of any kind, drones, and laser devices.',
      'Zungu Festival operates a zero-tolerance policy toward harassment, discrimination, or threatening behaviour of any kind. Violators will be removed without refund.',
      'The organiser reserves the right to amend the programme, lineup, stage times, or schedule at any time without prior notice or liability.',
      'Attendees are responsible for their own personal property. Zungu Festival accepts no liability for loss, theft, or damage to personal belongings.',
    ],
  },
  {
    title: 'Island Access & Safety',
    body: [
      'Navy Island is accessed exclusively by official festival ferry services. Attendees must not attempt private water access to or from the island.',
      'All medical emergencies must be reported immediately to festival medical staff. A field medical facility and emergency helipad are operational throughout the event.',
      'Swimming at undesignated areas is prohibited. Designated water activity zones operate under the supervision of qualified safety personnel.',
      'The organiser reserves the right to evacuate the island in the event of a safety emergency, severe weather, or force majeure. No refunds will be issued in such circumstances.',
    ],
  },
  {
    title: 'Glamping & Accommodation',
    body: [
      'Glamping accommodation is issued on an allocation basis. Specific unit types, locations, and configurations cannot be guaranteed.',
      'Check-in is from 14:00 on the first day of the relevant package. Check-out is by 10:00 on the final day.',
      'Damage to glamping structures or equipment caused by the occupant will be charged at full replacement cost.',
      'Glamping packages are non-refundable and non-transferable.',
    ],
  },
  {
    title: 'Liability & Force Majeure',
    body: [
      'Zungu Festival shall not be liable for any loss, injury, or damage suffered by attendees unless caused directly by the proven negligence of the organiser.',
      'The organiser accepts no liability for circumstances beyond its reasonable control, including but not limited to acts of God, government action, severe weather, or civil unrest.',
      'Attendees attend the festival at their own risk. The organiser strongly recommends that all attendees obtain comprehensive travel and event cancellation insurance prior to travel.',
    ],
  },
  {
    title: 'Media & Photography',
    body: [
      'By attending Zungu Festival, attendees consent to being filmed, photographed, or recorded as part of the general crowd. This content may be used for promotional purposes.',
      'Professional media credentials must be obtained in advance. Press access is managed exclusively through the festival press office.',
      'Attendees may not sell, license, or commercially exploit any personal recordings made at the festival.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These Terms & Conditions are governed by the laws of Jamaica. Any disputes shall be subject to the exclusive jurisdiction of the courts of Jamaica.',
      'If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force.',
      'Zungu Festival reserves the right to amend these Terms & Conditions at any time. The version in force at the date of the event shall apply.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: BLACK, fontFamily: "'Space Mono', monospace", minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px 120px' }}>

        {/* Header */}
        <Link href="/" style={{ fontSize: 8, letterSpacing: '0.35em', color: GOLD, textDecoration: 'none', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 64 }}>
          ← Zungu Festival
        </Link>

        <p style={{ fontSize: 8, letterSpacing: '0.45em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
          Legal · Terms & Conditions
        </p>
        <h1
          style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: CREAM, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}
        >
          Terms &<br /><span style={{ color: GOLD }}>Conditions</span>
        </h1>
        <p style={{ fontSize: 11, color: MUTED, letterSpacing: '0.08em', lineHeight: 1.9, marginBottom: 8 }}>
          Zungu Festival 2027 · Navy Island · Port Antonio · Jamaica
        </p>
        <p style={{ fontSize: 10, color: 'rgba(242,235,217,0.3)', letterSpacing: '0.1em', marginBottom: 64 }}>
          Last updated: June 2026 · Subject to revision prior to event
        </p>

        <div style={{ width: 40, height: 1, background: GOLD, marginBottom: 64 }} />

        <p style={{ fontSize: 12, color: MUTED, letterSpacing: '0.06em', lineHeight: 1.9, marginBottom: 64 }}>
          By purchasing a ticket to or attending Zungu Festival 2027, you agree to be bound by the following Terms and Conditions. Please read them carefully before completing your purchase.
        </p>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <div key={section.title} style={{ marginBottom: 56, paddingBottom: 56, borderBottom: i < SECTIONS.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
            <p style={{ fontSize: 8, letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
              0{i + 1}
            </p>
            <h2
              style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 15, color: CREAM, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 24 }}
            >
              {section.title}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {section.body.map((para, j) => (
                <li key={j} style={{ display: 'flex', gap: 16, fontSize: 12, color: MUTED, letterSpacing: '0.06em', lineHeight: 1.9 }}>
                  <span style={{ color: GOLD, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>
                  <span>{para}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 40, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 9, color: 'rgba(242,235,217,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Zungu Festival · Navy Island · Jamaica
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/privacy" style={{ fontSize: 9, letterSpacing: '0.2em', color: MUTED, textDecoration: 'none', textTransform: 'uppercase' }}>
              Privacy Policy
            </Link>
            <Link href="/" style={{ fontSize: 9, letterSpacing: '0.2em', color: MUTED, textDecoration: 'none', textTransform: 'uppercase' }}>
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
