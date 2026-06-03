'use client';

import { useState } from 'react';

const gold = '#C8A84B';
const black = '#060808';
const white = '#F7F3EC';
const muted = '#6B6355';

const ROLES = [
  { value: 'investor', label: 'Investor' },
  { value: 'partner', label: 'Production Partner' },
  { value: 'supplier', label: 'Supplier' },
  { value: 'press', label: 'Press' },
];

export default function InviteTool() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('investor');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    setUrl('');
    try {
      const res = await fetch('/api/invite/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      setUrl(data.url ?? '');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to generate');
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: black,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'Space Mono', monospace",
      }}
    >
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: 10, color: gold, letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
            // PARTNER INVITE TOOL
          </p>
          <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '1.75rem', color: white, fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Generate Briefing Invite
          </h1>
          <p style={{ marginTop: '0.75rem', fontSize: 11, color: muted, lineHeight: 1.6 }}>
            Links expire after 30 days. Recipient must sign in with the exact email address used here.
          </p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: 10, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
            Recipient Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generate()}
            placeholder="director@example.com"
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: white,
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={e => (e.target.style.borderColor = gold)}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: 10, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
            Access Role
          </label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: white,
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              outline: 'none',
              boxSizing: 'border-box',
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            {ROLES.map(r => (
              <option key={r.value} value={r.value} style={{ background: black, color: white }}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generate}
          disabled={!email || loading}
          style={{
            width: '100%',
            padding: '0.875rem',
            background: 'transparent',
            border: `1px solid rgba(200,168,75,${email && !loading ? '0.6' : '0.2'})`,
            color: email && !loading ? gold : muted,
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: email && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Generating...' : 'Generate Link'}
        </button>

        {error && (
          <p style={{ marginTop: '1rem', fontSize: 11, color: '#C45A2A' }}>{error}</p>
        )}

        {url && (
          <div style={{ marginTop: '1.5rem', padding: '1.25rem', border: '1px solid rgba(200,168,75,0.25)', background: 'rgba(200,168,75,0.04)' }}>
            <p style={{ fontSize: 10, color: gold, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
              {ROLES.find(r => r.value === role)?.label ?? 'Invite'} · Valid 30 Days
            </p>
            <p style={{ fontSize: 11, color: white, wordBreak: 'break-all', lineHeight: 1.6, marginBottom: '1rem' }}>
              {url}
            </p>
            <button
              onClick={copy}
              style={{
                padding: '0.5rem 1rem',
                background: copied ? gold : 'transparent',
                border: `1px solid ${gold}`,
                color: copied ? black : gold,
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
