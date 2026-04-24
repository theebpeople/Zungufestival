import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { verifyInviteToken } from '@/lib/invite-token';

const isInvestorRoute = createRouteMatcher(['/deck(.*)']);
const isPartnerRoute = createRouteMatcher(['/partner(.*)']);
const isProtectedRoute = createRouteMatcher(['/deck(.*)', '/partner(.*)', '/invite-tool(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // ── GUEST COOKIE BYPASS ──────────────────────────────────────────
  if (req.cookies.get('zungu_guest')?.value === '1' && isProtectedRoute(req)) {
    return NextResponse.next();
  }

  // ── GUEST TOKEN IN URL ───────────────────────────────────────────
  const accessToken = req.nextUrl.searchParams.get('access');
  if (accessToken && accessToken === process.env.GUEST_ACCESS_TOKEN && isProtectedRoute(req)) {
    const cleanUrl = new URL(req.nextUrl.pathname, req.url);
    const res = NextResponse.redirect(cleanUrl);
    res.cookies.set('zungu_guest', '1', {
      httpOnly: true, sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return res;
  }

  // ── INVITE TOKEN IN URL ──────────────────────────────────────────
  // Validates a signed invite token, records the invited email in a cookie,
  // then redirects to the same path without the ?invite= param so the URL is clean.
  const inviteParam = req.nextUrl.searchParams.get('invite');
  if (inviteParam) {
    const result = await verifyInviteToken(inviteParam);
    if (result) {
      const cleanUrl = new URL(req.nextUrl.pathname, req.url);
      // Preserve any other query params except ?invite=
      req.nextUrl.searchParams.forEach((v, k) => {
        if (k !== 'invite') cleanUrl.searchParams.set(k, v);
      });
      const res = NextResponse.redirect(cleanUrl);
      res.cookies.set('zungu_invited_email', result.email, {
        httpOnly: true, sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days — matches token expiry
        path: '/',
      });
      return res;
    }
    // Invalid/expired token — fall through to normal auth flow
  }
  // ── END BYPASSES ─────────────────────────────────────────────────

  const { userId } = await auth();

  if (isInvestorRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/sign-in?role=investor', req.url));
  }
  if (isPartnerRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/sign-in?role=partner', req.url));
  }
  if (req.nextUrl.pathname.startsWith('/invite-tool') && !userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // ── EMAIL ALLOWLIST + INVITE COOKIE CHECK ────────────────────────
  // Access is granted if the Clerk user's email is in ALLOWED_EMAILS (permanent list)
  // OR their email matches the zungu_invited_email cookie set by a valid invite link.
  // If ALLOWED_EMAILS is unset AND no invite cookie exists, any authenticated Clerk user passes.
  const allowedRaw = process.env.ALLOWED_EMAILS;
  const invitedEmailCookie = req.cookies.get('zungu_invited_email')?.value?.toLowerCase();
  const hasAnyRestriction = allowedRaw || invitedEmailCookie;

  if (userId && hasAnyRestriction && isProtectedRoute(req)) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const clerkEmail = user.emailAddresses
      .find(e => e.id === user.primaryEmailAddressId)
      ?.emailAddress?.toLowerCase();

    const inAllowlist = allowedRaw
      ? allowedRaw.split(',').map(e => e.trim().toLowerCase()).includes(clerkEmail ?? '')
      : false;
    const matchesInvite = !!clerkEmail && clerkEmail === invitedEmailCookie;

    if (!inAllowlist && !matchesInvite) {
      return NextResponse.redirect(new URL('/not-authorized', req.url));
    }
  }
  // ── END CHECK ────────────────────────────────────────────────────
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
