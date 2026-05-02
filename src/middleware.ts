import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { verify } from './lib/invite-token';

const GUEST_TOKEN = 'zungu2027nav';
const GUEST_COOKIE = 'zungu_guest';
const INVITED_EMAIL_COOKIE = 'zungu_invited_email';

const isClerkProtectedRoute = createRouteMatcher([
  '/partner(.*)',
  '/deck(.*)',
  '/dashboard(.*)',
  '/stages.html',
  '/activities.html',
  '/brand.html',
]);

const isEmailProtectedRoute = createRouteMatcher(['/partner(.*)', '/deck(.*)']);

const isInviteToolRoute = createRouteMatcher(['/invite-tool(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const cookies = req.cookies;

  if (url.searchParams.get('access') === GUEST_TOKEN) {
    const clean = new URL(url.pathname, req.url);
    url.searchParams.forEach((v, k) => { if (k !== 'access') clean.searchParams.set(k, v); });
    const res = NextResponse.redirect(clean);
    res.cookies.set(GUEST_COOKIE, '1', { httpOnly: true, path: '/', maxAge: 30 * 24 * 60 * 60 });
    return res;
  }

  const inviteParam = url.searchParams.get('invite');
  if (inviteParam) {
    const result = await verify(inviteParam);
    if (result) {
      const clean = new URL(url.pathname, req.url);
      url.searchParams.forEach((v, k) => { if (k !== 'invite') clean.searchParams.set(k, v); });
      const res = NextResponse.redirect(clean);
      res.cookies.set(INVITED_EMAIL_COOKIE, result.email, {
        httpOnly: true,
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      });
      return res;
    }
  }

  if (isInviteToolRoute(req)) {
    return cookies.get(GUEST_COOKIE)
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/', req.url));
  }

  if (!isClerkProtectedRoute(req)) return NextResponse.next();

  const { userId } = await auth();
  if (!userId) {
    // /deck handles its own auth modal — let unauthenticated users through
    if (url.pathname.startsWith('/deck')) return NextResponse.next();
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('role', url.pathname.startsWith('/partner') ? 'partner' : 'investor');
    return NextResponse.redirect(signInUrl);
  }

  if (cookies.get(GUEST_COOKIE)) return NextResponse.next();

  if (!isEmailProtectedRoute(req)) return NextResponse.next();

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const email = user.primaryEmailAddress?.emailAddress;

  const allowedEmails = (process.env.ALLOWED_EMAILS ?? '')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);

  const invitedEmail = cookies.get(INVITED_EMAIL_COOKIE)?.value;

  if (email && allowedEmails.includes(email)) return NextResponse.next();
  if (email && invitedEmail && invitedEmail.toLowerCase() === email.toLowerCase()) return NextResponse.next();

  return NextResponse.redirect(new URL('/not-authorized', req.url));
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/stages.html',
    '/activities.html',
    '/brand.html',
  ],
};
