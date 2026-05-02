import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const token = await kv.get<string>(`invite:${code}`);

  if (!token) {
    return NextResponse.redirect(new URL('/?expired=1', 'https://zungufestival.com'));
  }

  return NextResponse.redirect(
    new URL(`/deck?invite=${token}`, 'https://zungufestival.com'),
  );
}
