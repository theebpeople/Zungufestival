'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BG = '#04080A';
const CREAM = '#F2EBD9';
const GOLD = '#C8A84B';
const TEAL = '#4AAFA0';
const MUTED = 'rgba(242,235,217,0.4)';

export default function InviteToolPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function generate() {
    setError('');
    setLink('');
    setCopied(false);
    setLoading(true);
    try {
      const res = await fetch('/api/invite/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate link');
      setLink(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent',
    border: '1px solid rgba(242,235,217,0.15)',
    color: CREAM, fontSize: '14px', padding: '10px 14px',
    outline: 'none', fontFamily: "'Space Mono', monospace",
    letterSpacing: '0.05em', boxSizing: 'border-box',
  };

  return (
    <div style={{
      backgroundColor: BG, color: CREAM,
      fontFamily: "'Space Mono', monospace",
      minHeight: '100vh', padding: '60px 8vw',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
        <Image
          src="/logo-z.png" alt="Z" width={32} height={32}
          style={{ cursor: 'pointer', filter: 'drop-shadow(0 0 8px rgba(200,168,75,0.3))' }}
          onClick={() => router.push('/')}
        />
        <span style={{ fontSize: '10px', letterSpacing: '0.4em', color: MUTED, textTransform: 'uppercase' }}>
          Invite Tool
        </span>
      </div>

      <div style={{ maxWidth: '560px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.5em', color: GOLD, textTransform: 'uppercase', marginBottom: '16px' }}>
          — Generate Portal Access
        </p>
        <h1 style={{
          fontFamily: "'Unbounded', sans-serif",
          fontSize: 'clamp(22px, 4vw, 38px)', fontWeight: 700,
          lineHeight: 1.1, marginBottom: '16px',
        }}>
          Send a signed link.
        </h1>
        <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, marginBottom: '40px' }}>
          Paste the recipient&apos;s email below. You&apos;ll get a link — when they click it and sign in
          with that exact email, they&apos;ll land directly inside the Partner Portal.
          Links are valid for 30 days.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block', fontSize: '10px', letterSpacing: '0.4em',
              color: MUTED, textTransform: 'uppercase', marginBottom: '8px',
            }}>
              Recipient Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && email && generate()}
              placeholder="director@portauthorityjamaica.gov.jm"
              style={inputStyle}
            />
          </div>

          <button
            onClick={generate}
            disabled={loading || !email}
            style={{
              padding: '12px 24px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700,
              background: loading || !email ? 'rgba(74,175,160,0.3)' : TEAL,
              color: BG, border: 'none',
              cursor: loading || !email ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Generating...' : 'Generate Link →'}
          </button>

          {error && (
            <p style={{ fontSize: '12px', color: '#E05252', lineHeight: 1.6 }}>{error}</p>
          )}
        </div>

        {link && (
          <div style={{
            marginTop: '32px', padding: '24px',
            border: '1px solid rgba(74,175,160,0.3)',
            background: 'rgba(74,175,160,0.04)',
          }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.4em', color: TEAL, textTransform: 'uppercase', marginBottom: '14px' }}>
              — Invite Link Ready
            </p>
            <p style={{
              fontSize: '11px', wordBreak: 'break-all', lineHeight: 1.7,
              color: 'rgba(242,235,217,0.7)', marginBottom: '16px',
            }}>
              {link}
            </p>
            <button
              onClick={copyLink}
              style={{
                padding: '8px 20px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700,
                background: copied ? 'rgba(200,168,75,0.15)' : 'transparent',
                color: copied ? GOLD : TEAL,
                border: `1px solid ${copied ? 'rgba(200,168,75,0.4)' : 'rgba(74,175,160,0.4)'}`,
                cursor: 'pointer',
              }}
            >
              {copied ? 'Copied ✓' : 'Copy Link'}
            </button>
            <p style={{ fontSize: '10px', color: MUTED, marginTop: '12px', lineHeight: 1.6 }}>
              They must sign in with <strong style={{ color: CREAM }}>{email}</strong> for the link to work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
