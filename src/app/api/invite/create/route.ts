import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { sign } from '@/lib/invite-token';

function shortCode(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let code = '';
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  for (const b of arr) code += chars[b % chars.length];
  return code;
}

async function getDb() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) throw new Error('No Neon DATABASE_URL env var found');
  const sql = neon(url);
  await sql`
    CREATE TABLE IF NOT EXISTS invite_codes (
      code      VARCHAR(8) PRIMARY KEY,
      token     TEXT        NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL
    )
  `;
  return sql;
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get('zungu_guest')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.INVITE_SECRET) {
    return NextResponse.json({ error: 'INVITE_SECRET env var is not set' }, { status: 500 });
  }

  const body = await req.json() as { email?: string; role?: string };
  const email = body.email?.trim().toLowerCase();
  const role = body.role?.trim() ?? 'investor';
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  try {
    const token = await sign(email, role);
    const code = shortCode();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const sql = await getDb();
    await sql`
      INSERT INTO invite_codes (code, token, expires_at)
      VALUES (${code}, ${token}, ${expiresAt.toISOString()})
    `;
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://zungufestival.com';
    return NextResponse.json({ url: `${base}/i/${code}` });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
