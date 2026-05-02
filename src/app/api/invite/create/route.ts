import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { sign } from '@/lib/invite-token';

function shortCode(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let code = '';
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  for (const b of arr) code += chars[b % chars.length];
  return code;
}

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
    const code = shortCode();
    // Store for 31 days (token expires in 30)
    await kv.set(`invite:${code}`, token, { ex: 31 * 24 * 60 * 60 });
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://zungufestival.com';
    const url = `${base}/i/${code}`;
    return NextResponse.json({ url });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Failed to sign token';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
