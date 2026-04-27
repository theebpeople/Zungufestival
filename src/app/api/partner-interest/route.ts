import { NextResponse } from 'next/server';

const TEAM_EMAIL = 'partnership@zungufestival.com';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, details } = body as { name?: string; email?: string; details?: string };

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ZUNGU <noreply@zungufestival.com>',
      to: [TEAM_EMAIL],
      subject: `New Partner Interest — ${name}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p>${details ? `<p>${details}</p>` : ''}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
