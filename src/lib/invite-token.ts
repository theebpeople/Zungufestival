// HMAC-SHA256 signed invite tokens using Web Crypto (no external dependencies).
// Token format: base64url(payload_json) + '.' + base64url(signature)

function b64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function b64urlDecode(s: string): Uint8Array {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/').padEnd(s.length + (4 - s.length % 4) % 4, '=');
  return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
}

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']
  );
}

export async function signInviteToken(email: string, expiryDays = 30): Promise<string> {
  const secret = process.env.INVITE_SECRET;
  if (!secret) throw new Error('INVITE_SECRET env var is not set');
  const payload = b64url(new TextEncoder().encode(JSON.stringify({
    email,
    exp: Math.floor(Date.now() / 1000) + expiryDays * 86400,
  })));
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return `${payload}.${b64url(sig)}`;
}

export async function verifyInviteToken(token: string): Promise<{ email: string } | null> {
  try {
    const secret = process.env.INVITE_SECRET;
    if (!secret) return null;
    const dot = token.lastIndexOf('.');
    if (dot < 0) return null;
    const payload = token.slice(0, dot);
    const sigBytes = b64urlDecode(token.slice(dot + 1)).slice();
    const key = await getKey(secret);
    const ok = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload));
    if (!ok) return null;
    const data = JSON.parse(new TextDecoder().decode(b64urlDecode(payload))) as { email: string; exp: number };
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}
