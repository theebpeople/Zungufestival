import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// From address — update to a verified Resend sender domain once DNS is confirmed
const FROM = 'Zungu Festival <onboarding@resend.dev>';
const TEAM_EMAIL = 'access@zungufestival.com';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });

  const { name, org, email, message, selected } = body as {
    name: string;
    org: string;
    email: string;
    message: string;
    selected: string[];
  };

  if (!name || !email || !selected?.length) {
    return NextResponse.json({ error: 'Name, email, and at least one partnership type are required.' }, { status: 422 });
  }

  const partnerTypes = selected.join(', ');
  const teamHtml = `
<div style="font-family:monospace;background:#04080A;color:#F2EBD9;padding:32px;max-width:600px">
  <p style="color:#C8A84B;letter-spacing:0.3em;font-size:11px;text-transform:uppercase;margin-bottom:24px">ZUNGU FESTIVAL — NEW PARTNER INTEREST</p>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:10px 0;color:#C8A84B;width:140px;vertical-align:top">Name</td><td style="padding:10px 0">${name}</td></tr>
    <tr><td style="padding:10px 0;color:#C8A84B;vertical-align:top">Organisation</td><td style="padding:10px 0">${org || '—'}</td></tr>
    <tr><td style="padding:10px 0;color:#C8A84B;vertical-align:top">Email</td><td style="padding:10px 0"><a href="mailto:${email}" style="color:#4AAFA0">${email}</a></td></tr>
    <tr><td style="padding:10px 0;color:#C8A84B;vertical-align:top">Partnership</td><td style="padding:10px 0">${partnerTypes}</td></tr>
    <tr><td style="padding:10px 0;color:#C8A84B;vertical-align:top">Message</td><td style="padding:10px 0;white-space:pre-wrap">${message || '—'}</td></tr>
  </table>
</div>`;

  const confirmHtml = `
<div style="font-family:monospace;background:#04080A;color:#F2EBD9;padding:32px;max-width:600px">
  <p style="color:#C8A84B;letter-spacing:0.3em;font-size:11px;text-transform:uppercase;margin-bottom:24px">ZUNGU FESTIVAL · MMXXVII</p>
  <p style="font-size:18px;font-weight:700;margin-bottom:16px">We received your interest.</p>
  <p style="color:rgba(242,235,217,0.7);line-height:1.8;margin-bottom:24px">
    Thank you, ${name}. The Zungu Festival team will review your submission and be in touch within 48 hours.
  </p>
  <p style="color:rgba(242,235,217,0.5);font-size:12px">
    Navy Island · Port Antonio · Jamaica · June 2027
  </p>
</div>`;

  const [teamResult, confirmResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: TEAM_EMAIL,
      subject: `Partner Interest: ${name}${org ? ` · ${org}` : ''}`,
      html: teamHtml,
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Zungu Festival — We received your interest',
      html: confirmHtml,
    }),
  ]);

  // Team notification is required; confirmation is best-effort
  if (teamResult.status === 'rejected' || teamResult.value.error) {
    const err = teamResult.status === 'rejected' ? teamResult.reason : teamResult.value.error;
    console.error('Resend team email failed:', err);
    return NextResponse.json({ error: 'Failed to send notification. Please try again.' }, { status: 500 });
  }

  if (confirmResult.status === 'rejected' || confirmResult.value.error) {
    console.warn('Resend confirmation email failed (non-fatal):', confirmResult.status === 'rejected' ? confirmResult.reason : confirmResult.value.error);
  }

  return NextResponse.json({ ok: true });
}
