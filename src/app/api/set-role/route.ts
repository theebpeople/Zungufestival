import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { verify } from '@/lib/invite-token';

const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://zungufestival.com';

const VALID_ROLES = ['investor', 'partner', 'press', 'stakeholder'] as const;
type Role = typeof VALID_ROLES[number];

function isValidRole(r: string): r is Role {
  return (VALID_ROLES as readonly string[]).includes(r);
}

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', base));
  }

  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const fallbackRole = url.searchParams.get('role') ?? 'partner';

  let role: Role = isValidRole(fallbackRole) ? fallbackRole : 'partner';

  if (token) {
    const data = await verify(token);
    if (data?.role && isValidRole(data.role)) {
      role = data.role;
    }
  }

  try {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: { role },
    });
  } catch {
    // Non-fatal: metadata write failed, role still enforced via URL param this session
  }

  const DEST: Record<string, string> = {
    investor:    `/deck?role=investor`,
    partner:     `/production-brief`,
    stakeholder: `/stakeholder`,
    press:       `/deck?role=press`,
  };
  const dest = DEST[role] ?? `/partner?role=${role}`;
  return NextResponse.redirect(new URL(dest, base));
}
