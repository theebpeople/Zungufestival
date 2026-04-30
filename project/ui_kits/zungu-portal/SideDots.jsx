// Side-dot navigation — right rail, gold dot scales 1.5x on active section.
// Lifted from deck `.dots` + `.dot` + `.dot.active`.

function SideDots({ ids }) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const cy = window.innerHeight / 2;
      let bestIdx = 0, bestDist = Infinity;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mid = (r.top + r.bottom) / 2;
        const d = Math.abs(mid - cy);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      setActive(bestIdx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);

  return (
    <div style={{ position: 'fixed', right: 24, top: '50%',
      transform: 'translateY(-50%)', zIndex: 999,
      display: 'flex', flexDirection: 'column', gap: 14 }}>
      {ids.map((id, i) => (
        <a key={id} href={`#${id}`} aria-label={id}
          style={{ width: 5, height: 5, borderRadius: 0, cursor: 'crosshair',
            border: `1px solid rgba(200,168,75,${i === active ? 1 : 0.3})`,
            background: i === active ? C.gold : 'transparent',
            transform: i === active ? 'scale(1.5)' : 'scale(1)',
            transition: 'all 300ms cubic-bezier(.22,1,.36,1)',
            display: 'block' }} />
      ))}
    </div>
  );
}
window.SideDots = SideDots;
