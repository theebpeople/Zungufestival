import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

const NAV_BADGE_LABELS: Record<string, string> = {
  investor: 'INVESTOR DECK',
  partner: 'PARTNER BRIEF',
  supplier: 'SUPPLIER BRIEF',
  press: 'PRESS MATERIALS',
};

const DEFAULT_BADGE = 'PRIVATE DECK';

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  const role = request.nextUrl.searchParams.get('role') ?? 'investor';
  const badgeLabel = NAV_BADGE_LABELS[role] ?? DEFAULT_BADGE;

  let html = readFileSync(join(process.cwd(), 'deck-private.html'), 'utf-8');
  html = html.replace('INVESTOR DECK', badgeLabel);

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
