import { NextResponse } from 'next/server';
export async function GET() {
  return new NextResponse(
    'Legacy deck retired. Use /deck.',
    { status: 410, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
}
