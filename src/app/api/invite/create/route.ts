import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sign } from '@/lib/invite-token';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get('zungu_guest')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.INVITE_SECRET) {
    return NextResponse.json({ error: 'INVITE_SECRET env var is not set — add it in Vercel project settings' }, { status: 500 });
  }

  const body = await req.json() as { email?: string };
  const email = body.email?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  try {
    const token = await sign(email);
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://zungufestival.com';
    const url = `${base}/deck?invite=${token}`;
    return NextResponse.json({ url });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Failed to sign token';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
