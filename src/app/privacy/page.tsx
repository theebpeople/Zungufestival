import Link from 'next/link';

const GOLD = '#C8A84B';
const BLACK = '#060808';
const CREAM = '#F7F3EC';
const BORDER = 'rgba(200,168,75,0.18)';
const MUTED = 'rgba(242,235,217,0.45)';

const SECTIONS = [
  {
    title: 'What Data We Collect',
    body: [
      'Contact information: name, email address, and phone number provided when joining the waitlist, registering for an account, or submitting a partnership enquiry.',
      'Account information: authentication credentials managed via our secure identity provider (Clerk). We do not store passwords directly.',
      'Transaction data: ticket purchase details including tier, quantity, and payment reference. Payment card data is processed by our payment provider and is never stored on our systems.',
      'Device and usage data: IP address, browser type, operating system, pages visited, and time spent on the site, collected automatically via server logs and analytics.',
      'Communications: records of emails or enquiries sent to partnership@zungufestival.com.',
    ],
  },
  {
    title: 'How We Use Your Data',
    body: [
      'To process ticket purchases and manage your festival registration.',
      'To send event information, schedule updates, and operational communications relating to Zungu Festival 2027.',
      'To respond to waitlist registrations and partnership enquiries.',
      'To administer investor and partner access to gated areas of the site.',
      'To improve the website and festival experience through aggregated, anonymised usage analytics.',
      'To comply with legal obligations and enforce our Terms & Conditions.',
      'We do not sell, rent, or share your personal data with third parties for their own marketing purposes.',
    ],
  },
  {
    title: 'Legal Basis for Processing',
    body: [
      'Contract: processing is necessary to fulfil a ticket purchase or registration.',
      'Legitimate interests: where we have a genuine business need, such as fraud prevention and site security.',
      'Consent: for marketing communications. You may withdraw consent at any time.',
      'Legal obligation: where we are required to retain data by law.',
    ],
  },
  {
    title: 'Third-Party Services',
    body: [
      'Authentication: Clerk (clerk.com) manages user sign-in and session security.',
      'Email delivery: Resend (resend.com) is used to process and deliver transactional emails.',
      'Hosting: the website is hosted on Vercel (vercel.com). Usage data including IP addresses may be processed by Vercel\'s infrastructure.',
      'Database: attendee and waitlist data is stored in a secure serverless PostgreSQL database (Neon).',
      'Each third-party provider operates under its own privacy policy. We select providers that meet appropriate data protection standards.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'Waitlist and enquiry data is retained for up to 24 months following the festival date.',
      'Ticket and transaction records are retained for 7 years to comply with financial record-keeping requirements.',
      'Account data is retained until you request deletion or your account is inactive for more than 36 months.',
      'You may request deletion of your data at any time by contacting partnership@zungufestival.com.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'Access: you may request a copy of the personal data we hold about you.',
      'Rectification: you may ask us to correct inaccurate or incomplete data.',
      'Erasure: you may request that we delete your personal data, subject to legal retention requirements.',
      'Portability: you may request your data in a structured, machine-readable format.',
      'Objection: you may object to processing based on legitimate interests.',
      'To exercise any of these rights, contact us at partnership@zungufestival.com. We will respond within 30 days.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'The site uses strictly necessary cookies to maintain authentication sessions and security tokens.',
      'We use first-party analytics to understand aggregate traffic patterns. No third-party advertising cookies are used.',
      'You may disable cookies via your browser settings, though this may affect the functionality of gated areas of the site.',
    ],
  },
  {
    title: 'Contact & Complaints',
    body: [
      'For any privacy-related queries, contact: partnership@zungufestival.com.',
      'If you are located in the UK or EU and believe your rights have been violated, you have the right to lodge a complaint with your local supervisory authority (ICO in the UK; your national DPA in the EU).',
      'This Privacy Policy is subject to revision. Material changes will be communicated via the website and, where appropriate, by email.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: BLACK, fontFamily: "'Space Mono', monospace", minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px 120px' }}>

        {/* Header */}
        <Link href="/" style={{ fontSize: 8, letterSpacing: '0.35em', color: GOLD, textDecoration: 'none', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 64 }}>
          ← Zungu Festival
        </Link>

        <p style={{ fontSize: 8, letterSpacing: '0.45em', color: GOLD, textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
          Legal · Privacy Policy
        </p>
        <h1
          style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: CREAM, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}
        >
          Privacy<br /><span style={{ color: GOLD }}>Policy</span>
        </h1>
        <p style={{ fontSize: 11, color: MUTED, letterSpacing: '0.08em', lineHeight: 1.9, marginBottom: 8 }}>
          Zungu Festival 2027 · Navy Island · Port Antonio · Jamaica
        </p>
        <p style={{ fontSize: 10, color: 'rgba(242,235,217,0.3)', letterSpacing: '0.1em', marginBottom: 64 }}>
          Last updated: June 2026 · Applies to zungufestival.com and all subdomains
        </p>

        <div style={{ width: 40, height: 1, background: GOLD, marginBottom: 64 }} />

        <p style={{ fontSize: 12, color: MUTED, letterSpacing: '0.06em', lineHeight: 1.9, marginBottom: 64 }}>
          Zungu Festival ("we", "us", "the organiser") is committed to protecting your personal data. This Privacy Policy explains what data we collect, how we use it, and your rights. It applies to all users of zungufestival.com and attendees of Zungu Festival 2027.
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
            <Link href="/terms" style={{ fontSize: 9, letterSpacing: '0.2em', color: MUTED, textDecoration: 'none', textTransform: 'uppercase' }}>
              Terms & Conditions
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
