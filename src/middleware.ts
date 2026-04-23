import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isInvestorRoute = createRouteMatcher(['/deck(.*)']);
const isPartnerRoute = createRouteMatcher(['/partner(.*)']);
const isProtectedRoute = createRouteMatcher(['/deck(.*)', '/partner(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // ── GUEST COOKIE BYPASS ──────────────────────────────────────────
  if (req.cookies.get('zungu_guest')?.value === '1' && isProtectedRoute(req)) {
    return NextResponse.next();
  }

  // ── GUEST TOKEN IN URL ───────────────────────────────────────────
  const token = req.nextUrl.searchParams.get('access');
  if (token && token === process.env.GUEST_ACCESS_TOKEN && isProtectedRoute(req)) {
    const cleanUrl = new URL(req.nextUrl.pathname, req.url);
    const res = NextResponse.redirect(cleanUrl);
    res.cookies.set('zungu_guest', '1', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return res;
  }
  // ── END BYPASS ───────────────────────────────────────────────────

  const { userId } = await auth();

  if (isInvestorRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/sign-in?role=investor', req.url));
  }
  if (isPartnerRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/sign-in?role=partner', req.url));
  }

  // ── EMAIL ALLOWLIST ───────────────────────────────────────────────
  // If ALLOWED_EMAILS is set, only those addresses may access protected routes.
  // Leave ALLOWED_EMAILS unset to allow any authenticated Clerk user through.
  const allowedRaw = process.env.ALLOWED_EMAILS;
  if (userId && allowedRaw && isProtectedRoute(req)) {
    const allowlist = allowedRaw.split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
    if (allowlist.length > 0) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const primaryEmail = user.emailAddresses
        .find(e => e.id === user.primaryEmailAddressId)
        ?.emailAddress?.toLowerCase();
      if (!primaryEmail || !allowlist.includes(primaryEmail)) {
        return NextResponse.redirect(new URL('/not-authorized', req.url));
      }
    }
  }
  // ── END ALLOWLIST ─────────────────────────────────────────────────
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
