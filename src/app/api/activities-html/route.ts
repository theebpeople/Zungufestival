import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }
  const html = readFileSync(join(process.cwd(), 'activities.html'), 'utf-8');
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
