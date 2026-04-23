import { NextRequest, NextResponse } from 'next/server';
import { signInviteToken } from '@/lib/invite-token';

export async function POST(req: NextRequest) {
  // Only callable by sessions that hold the guest cookie (i.e. Ingrid via ?access=... link)
  if (req.cookies.get('zungu_guest')?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 422 });
  }

  const token = await signInviteToken(email);
  const base = process.env.NEXT_PUBLIC_APP_URL ?? `https://${req.headers.get('host')}`;
  const url = `${base}/partner?invite=${token}`;

  return NextResponse.json({ url });
}
