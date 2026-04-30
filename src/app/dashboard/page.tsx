'use client';

import Image from 'next/image';
import { useUser, useClerk } from '@clerk/nextjs';
import { useState } from 'react';

const C = {
  black: '#060808',
  gold: '#C8A84B',
  cream: '#F2EBD9',
  rust: '#C45A2A',
  muted: '#6B6355',
  white: '#F7F3EC',
};

type Role = 'investor' | 'supplier' | 'attendee' | null;
type Stage = 'select' | 'form' | 'dashboard';

function ArrowRight({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
}
function Target({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
}
function BarChart3({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>;
}
function Compass({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>;
}

function GateButton({ children, onClick, variant = 'primary' }: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'gold';
}) {
  const styles = {
    primary: { color: C.gold, borderColor: `${C.gold}55`, backgroundColor: 'transparent' },
    secondary: { color: C.white, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'transparent' },
    gold: { color: C.black, borderColor: C.gold, backgroundColor: C.gold },
  };
  return (
    <button
      onClick={onClick}
      className="relative px-8 py-4 font-bold transition-all duration-300 uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 border w-full"
      style={{ ...styles[variant], fontFamily: "'Space Mono', monospace", cursor: 'crosshair' }}
      onMouseEnter={e => {
        if (variant === 'primary') { (e.currentTarget as HTMLElement).style.backgroundColor = C.gold; (e.currentTarget as HTMLElement).style.color = C.black; }
        if (variant === 'secondary') (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)';
      }}
      onMouseLeave={e => {
        if (variant === 'primary') { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.gold; }
        if (variant === 'secondary') (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
      }}
    >
      {children}
    </button>
  );
}

function InputField({ label, type = 'text', placeholder, options }: {
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
}) {
  const fieldStyle = {
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: C.white,
    fontFamily: "'Space Mono', monospace",
  };
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex justify-between items-center">
        <label className="text-xs uppercase tracking-[0.25em] font-bold" style={{ color: C.gold, fontFamily: "'Space Mono', monospace" }}>{label}</label>
        <span className="text-[10px]" style={{ color: C.muted, fontFamily: "'Space Mono', monospace" }}>[REQUIRED]</span>
      </div>
      {type === 'select' ? (
        <select
          required
          className="w-full p-4 text-xs focus:outline-none appearance-none uppercase tracking-wider"
          style={{ ...fieldStyle, cursor: 'crosshair' }}
        >
          <option value="">SELECT ONE</option>
          {options?.map(opt => (
            <option key={opt} value={opt} style={{ backgroundColor: C.black, color: C.cream }}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          required
          className="p-4 text-xs focus:outline-none uppercase tracking-wider"
          style={fieldStyle}
          onFocus={e => (e.target.style.borderColor = C.gold)}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      )}
    </div>
  );
}

function RoleSelectView({ onRole }: { onRole: (r: Role) => void }) {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-8 text-center"
      style={{ backgroundColor: C.black }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(200,168,75,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 mb-16 flex flex-col items-center">
        <div className="w-20 h-20 mb-12 relative flex items-center justify-center">
          <div className="absolute inset-0 rotate-45" style={{ border: `1px solid ${C.gold}33` }} />
          <div className="w-12 h-12 flex items-center justify-center" style={{ border: `2px solid ${C.gold}` }}>
            <div className="w-2 h-2" style={{ backgroundColor: C.gold }} />
          </div>
        </div>
        <h1
          className="font-black tracking-tighter uppercase mb-2"
          style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(3.5rem, 10vw, 7rem)', color: C.white, lineHeight: 1 }}
        >
          ZUNGU
        </h1>
        <div className="flex items-center gap-6 uppercase font-bold text-[11px]" style={{ color: C.gold, letterSpacing: '0.4em' }}>
          <span>Navy Island</span>
          <div className="w-1 h-1 rotate-45" style={{ backgroundColor: C.rust }} />
          <span>MMXXVII</span>
        </div>
      </div>

      <div className="relative z-10 max-w-lg w-full">
        <p className="text-xs uppercase tracking-[0.35em] mb-12 font-bold italic" style={{ color: C.muted }}>
          // SELECT YOUR ACCESS LEVEL
        </p>
        <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
          <GateButton onClick={() => onRole('investor')} variant="primary">Investor Entrance</GateButton>
          <GateButton onClick={() => onRole('supplier')} variant="secondary">Production &amp; Logistics</GateButton>
          <GateButton onClick={() => onRole('attendee')} variant="secondary">General Admission</GateButton>
        </div>
      </div>
    </div>
  );
}

function FormView({ type, onBack, onSubmit }: { type: Role; onBack: () => void; onSubmit: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    onSubmit();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6" style={{ backgroundColor: C.black, fontFamily: "'Space Mono', monospace" }}>
      <div className="max-w-2xl w-full p-12 md:p-20 relative" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          onClick={onBack}
          className="absolute top-10 right-10 transition-colors text-[10px] uppercase tracking-widest font-bold"
          style={{ color: C.muted }}
          onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
          onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
        >
          ✕ Back
        </button>

        <div className="mb-16">
          <div className="inline-block px-3 py-1 mb-8" style={{ border: `1px solid ${C.rust}66` }}>
            <h3 className="text-xs uppercase tracking-[0.35em] font-bold" style={{ color: C.rust }}>
              {type === 'investor' ? 'STRATEGIC PARTNER' : 'PRODUCTION UNIT'}
            </h3>
          </div>
          <h2
            className="text-4xl font-black uppercase leading-tight tracking-tighter mb-6 pre-wrap"
            style={{ fontFamily: "'Unbounded', sans-serif", color: C.white }}
          >
            {type === 'investor' ? 'Patient\nCapital.' : 'Technical\nStandard.'}
          </h2>
          <p className="text-sm leading-relaxed max-w-sm uppercase tracking-wider font-bold" style={{ color: C.muted }}>
            {type === 'investor'
              ? 'Securing long-term equity in the Portland Parish cultural revitalization project.'
              : 'Registering credentials for the 2027 infrastructure build-out.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <InputField label="Entity Name" placeholder="ENTER IDENTIFIER" />
            <InputField label="Secure Email" placeholder="CONTACT@DOMAIN.COM" type="email" />
            {type === 'investor' ? (
              <>
                <InputField label="Capital Tier" type="select" options={['$50K – $250K', '$250K – $1M', '$1M+']} />
                <InputField label="Investor Type" type="select" options={['Strategic', 'Individual', 'VC', 'Corporate']} />
              </>
            ) : (
              <>
                <InputField label="Specialization" type="select" options={['Stage Craft', 'Sound Eng', 'Lighting', 'Talent', 'Logistics']} />
                <InputField label="Reference / Portfolio" placeholder="HTTPS://" />
              </>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-12 py-6 font-bold uppercase tracking-[0.15em] text-xs transition-all duration-300"
            style={{ border: `1px solid ${C.gold}`, backgroundColor: C.gold, color: C.black, fontFamily: "'Space Mono', monospace", cursor: 'crosshair' }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.filter = '')}
          >
            Submit Credentials
          </button>
        </form>
      </div>
    </div>
  );
}

function MainDashboard({ role, onReset }: { role: Role; onReset: () => void }) {
  const { signOut } = useClerk();
  const navLinks = [
    { label: 'Vision', href: '#vision' },
    { label: 'Stages', href: '/stages.html' },
    { label: 'Activities', href: '/activities.html' },
  ];
  const goals = [
    { icon: <Target size={22} />, color: C.rust, num: '01', title: 'Cultural Anchor', body: 'Establishing Jamaica as the global destination for high-net-worth electronic music pilgrimage.' },
    { icon: <BarChart3 size={22} />, color: C.gold, num: '02', title: 'Tourism Yield', body: 'Transitioning from low-yield mass tourism to high-margin, low-impact boutique experiences.' },
    { icon: <Compass size={22} />, color: C.rust, num: '03', title: 'Local Equity', body: 'Direct economic integration with Portland Parish labor and supply chains.' },
  ];
  const pages = [
    { label: 'Stage Architecture', sub: '4 stages · Navy Island layout · sound specs', href: '/stages.html', accent: C.gold },
    { label: 'Activity Programme', sub: 'Forest · water · wellness · cultural tours', href: '/activities.html', accent: C.rust },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.black, color: C.white, fontFamily: "'Space Mono', monospace" }}>
      <nav
        className="flex justify-between items-center px-6 md:px-12 py-6 sticky top-0 z-50 backdrop-blur-xl"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(6,8,8,0.92)' }}
      >
        <div className="text-xl font-black tracking-tighter" style={{ fontFamily: "'Unbounded', sans-serif", color: C.white }}>ZUNGU</div>
        <div className="hidden md:flex gap-10">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="text-xs uppercase tracking-[0.25em] font-bold transition-colors" style={{ color: C.muted, textDecoration: 'none' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = C.gold)}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = C.muted)}
            >{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] px-3 py-1.5 uppercase tracking-widest font-bold" style={{ border: `1px solid ${C.gold}55`, color: C.gold }}>{role}</span>
          <button
            onClick={() => signOut({ redirectUrl: '/' })}
            className="text-[10px] uppercase tracking-widest font-bold transition-colors"
            style={{ color: C.muted }}
            onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <header id="vision" className="relative flex items-center justify-center text-center px-6 md:px-12" style={{ minHeight: '88vh', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image src="/photos/navy-island-aerial.jpg" fill className="object-cover" style={{ opacity: 0.18, filter: 'grayscale(1) brightness(0.5)' }} alt="" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.black} 0%, rgba(6,8,8,0.5) 50%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 max-w-4xl w-full">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div style={{ width: 32, height: 1, backgroundColor: C.gold }} />
            <span className="text-xs uppercase tracking-[0.5em] font-bold" style={{ color: C.gold }}>Established 2027 &bull; Port Antonio</span>
            <div style={{ width: 32, height: 1, backgroundColor: C.gold }} />
          </div>
          <h1
            className="font-black uppercase tracking-tighter leading-[0.88] mb-10 pre-wrap"
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(3rem,11vw,9rem)', color: C.white }}
          >
            {role === 'investor' ? 'PATIENT\nCAPITAL' : 'BRUTAL\nLUXURY'}
          </h1>
          <p className="mx-auto text-sm leading-relaxed tracking-widest uppercase max-w-lg font-bold" style={{ color: C.muted }}>
            {role === 'investor'
              ? 'A strategic argument for the revitalization of Navy Island through institutional cultural assets.'
              : 'A greenfield destination experience defined by raw textures and refined architecture.'}
          </p>
        </div>
      </header>

      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.4em] font-bold mb-3 flex items-center gap-3" style={{ color: C.gold }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, backgroundColor: `${C.gold}66` }} />Strategic Goals
        </p>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-12" style={{ fontFamily: "'Unbounded', sans-serif", color: C.white }}>Why Zungu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
          {goals.map(({ icon, color, num, title, body }) => (
            <div key={num} className="p-10" style={{ backgroundColor: C.black, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="mb-6" style={{ color }}>{icon}</div>
              <p className="text-xs uppercase tracking-[0.35em] font-bold mb-3" style={{ color: C.muted }}>Goal {num}</p>
              <h3 className="text-lg font-black uppercase mb-4 tracking-tight" style={{ fontFamily: "'Unbounded', sans-serif", color: C.white }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-xs uppercase tracking-[0.4em] font-bold mb-3 flex items-center gap-3" style={{ color: C.gold }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, backgroundColor: `${C.gold}66` }} />Explore the Festival
        </p>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-12" style={{ fontFamily: "'Unbounded', sans-serif", color: C.white }}>Programme &amp; Venues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pages.map(({ label, sub, href, accent }) => (
            <a key={href} href={href} className="group block p-10 transition-all" style={{ border: `1px solid ${accent}22`, backgroundColor: 'rgba(255,255,255,0.02)', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accent}66`; (e.currentTarget as HTMLElement).style.backgroundColor = `${accent}08`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accent}22`; (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.02)'; }}
            >
              <p className="text-xs uppercase tracking-[0.3em] font-bold mb-3" style={{ color: accent }}>{sub}</p>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4" style={{ fontFamily: "'Unbounded', sans-serif", color: C.white }}>{label}</h3>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold" style={{ color: accent }}>
                View details <ArrowRight size={13} />
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: C.black }}>
        <div className="text-2xl font-black tracking-tighter mb-3" style={{ fontFamily: "'Unbounded', sans-serif", color: C.white }}>ZUNGU</div>
        <p className="text-xs tracking-[0.6em] uppercase mb-10" style={{ color: C.muted }}>Port Antonio &middot; Jamaica &middot; 2027</p>
        <button onClick={onReset} className="text-xs uppercase tracking-widest font-bold pb-1" style={{ color: C.gold, borderBottom: `1px solid ${C.gold}33`, background: 'none', cursor: 'crosshair' }}>
          ← Change Role
        </button>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const [stage, setStage] = useState<Stage>('select');
  const [role, setRole] = useState<Role>(null);

  if (!user) return null;

  const handleRole = (r: Role) => {
    setRole(r);
    setStage(r === 'attendee' ? 'dashboard' : 'form');
  };

  return (
    <>
      {stage === 'select' && <RoleSelectView onRole={handleRole} />}
      {stage === 'form' && <FormView type={role} onBack={() => setStage('select')} onSubmit={() => setStage('dashboard')} />}
      {stage === 'dashboard' && <MainDashboard role={role} onReset={() => { setRole(null); setStage('select'); }} />}
    </>
  );
}
