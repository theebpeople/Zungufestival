import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://zungufestival.com';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  const token = await redis.get<string>(`invite:${code}`);

  if (!token) {
    return NextResponse.redirect(new URL('/?expired=1', base));
  }

  return NextResponse.redirect(new URL(`/deck?invite=${token}`, base));
}
