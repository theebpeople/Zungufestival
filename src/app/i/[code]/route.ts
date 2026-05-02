import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { verify } from '@/lib/invite-token';

const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://zungufestival.com';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  try {
    const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
    if (!url) return NextResponse.redirect(new URL('/?expired=1', base));

    const sql = neon(url);
    const rows = await sql`
      SELECT token FROM invite_codes
      WHERE code = ${code} AND expires_at > NOW()
      LIMIT 1
    `;

    if (!rows.length) {
      return NextResponse.redirect(new URL('/?expired=1', base));
    }

    const token = rows[0].token as string;
    const data = await verify(token);
    const role = data?.role ?? 'investor';

    return NextResponse.redirect(new URL(`/deck?invite=${token}&role=${role}`, base));
  } catch {
    return NextResponse.redirect(new URL('/?expired=1', base));
  }
}
