// HMAC-SHA256 invite token signing using Web Crypto API (Edge-compatible, no new dependencies)

const ENC = new TextEncoder();
const DEC = new TextDecoder();

function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let str = '';
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function fromb64url(s: string): Uint8Array {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (padded.length % 4)) % 4;
  const bin = atob(padded + '='.repeat(padLen));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    ENC.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

export async function sign(email: string, expiryDays = 30): Promise<string> {
  const secret = process.env.INVITE_SECRET;
  if (!secret) throw new Error('INVITE_SECRET not configured');
  const exp = Math.floor(Date.now() / 1000) + expiryDays * 86400;
  const payloadBytes = ENC.encode(JSON.stringify({ email, exp }));
  const payload = b64url(payloadBytes.buffer as ArrayBuffer);
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, ENC.encode(payload));
  return `${payload}.${b64url(sig)}`;
}

export async function verify(token: string): Promise<{ email: string } | null> {
  const secret = process.env.INVITE_SECRET;
  if (!secret) return null;
  const dot = token.lastIndexOf('.');
  if (dot === -1) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  try {
    const key = await getKey(secret);
    const valid = await crypto.subtle.verify('HMAC', key, fromb64url(sig), ENC.encode(payload));
    if (!valid) return null;
    const data = JSON.parse(DEC.decode(fromb64url(payload)));
    if (!data.email || !data.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
    return { email: data.email as string };
  } catch {
    return null;
  }
}
