/* ════════════════════════════════════════════════════════════════
   ZUNGU · SITE CHROME JS
   - Mobile drawer toggle
   - Section reveal via Motion One inView() with spring easing
   - Spring-eased scroll on internal anchor clicks
   - Active section highlight in top bar
   ════════════════════════════════════════════════════════════════ */

import { animate, inView } from 'https://cdn.jsdelivr.net/npm/motion@11.11.17/+esm';

/* ─── 1. Drawer ─────────────────────────────────────────────── */
const menu = document.querySelector('.site-bar__menu');
const drawer = document.querySelector('.site-drawer');
if (menu && drawer) {
  const setOpen = (open) => {
    drawer.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menu.addEventListener('click', () => setOpen(!drawer.classList.contains('is-open')));
  drawer.addEventListener('click', (e) => {
    if (e.target.matches('a, .site-drawer__item')) setOpen(false);
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
}

/* ─── 2. Spring-eased anchor scroll ─────────────────────────── */
const easeSpring = [0.16, 1, 0.3, 1]; // out-expo-ish, framer-motion-feel
const SPRING = { duration: 0.95, ease: easeSpring };

function springScrollTo(target) {
  if (!target) return;
  const offset = 56 + 12; // top-bar height + breathing room
  const rect = target.getBoundingClientRect();
  const destY = window.scrollY + rect.top - offset;
  const startY = window.scrollY;
  const obj = { y: startY };
  animate(obj, { y: destY }, {
    ...SPRING,
    onUpdate: (v) => window.scrollTo(0, v),
  });
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  springScrollTo(target);
  history.replaceState(null, '', '#' + id);
});

/* ─── 3. Reveal on inView with spring ───────────────────────── */
document.querySelectorAll('[data-reveal]').forEach((el) => {
  inView(el, () => {
    animate(el,
      { opacity: [0, 1], transform: ['translateY(28px)', 'translateY(0px)'] },
      { duration: 0.85, ease: easeSpring, delay: parseFloat(el.dataset.revealDelay) || 0 }
    );
    el.classList.add('is-visible');
    return () => {}; // do not re-trigger on exit
  }, { amount: 0.15, margin: '0px 0px -60px 0px' });
});

/* ─── 4. Auto-attribute likely reveal targets ───────────────── */
// (Pages can opt-out with data-no-auto-reveal.)
const AUTO_SELECTORS = [
  'section', '.ch-div', '.chapter',
  '.pcard', '.ccard', '.tcard', '.tlcard', '.gcard', '.pcard2', '.rmcard',
  '.zone-card', '.wellness-card', '.sustain-item', '.vip-tier', '.principle',
  '.loc-card', '.aud-card', '.type-card', '.vis-rule-card', '.ask-card',
  '.revcard', '.proof-card', '.hard-rule-card',
];
if (!document.body.dataset.noAutoReveal) {
  AUTO_SELECTORS.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (el.hasAttribute('data-reveal')) return;
      el.setAttribute('data-reveal', '');
      // staggered children pickup
      const sibIndex = [...el.parentElement.children].filter(c => c.matches(sel)).indexOf(el);
      if (sibIndex > 0 && sibIndex < 8) {
        el.dataset.revealDelay = (sibIndex * 0.06).toFixed(2);
      }
      inView(el, () => {
        animate(el,
          { opacity: [0, 1], transform: ['translateY(28px)', 'translateY(0px)'] },
          { duration: 0.85, ease: easeSpring, delay: parseFloat(el.dataset.revealDelay) || 0 }
        );
        el.classList.add('is-visible');
        return () => {};
      }, { amount: 0.12, margin: '0px 0px -40px 0px' });
    });
  });
}

/* ─── 5. Active section pill in top bar ─────────────────────── */
const sectionLinks = document.querySelectorAll('.site-bar__section[href^="#"]');
const linkMap = new Map();
sectionLinks.forEach((a) => {
  const id = a.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) linkMap.set(target, a);
});
if (linkMap.size > 0) {
  const setActive = (link) => {
    sectionLinks.forEach(l => l.classList.remove('is-active'));
    if (link) link.classList.add('is-active');
  };
  linkMap.forEach((link, target) => {
    inView(target, () => {
      setActive(link);
      return () => {};
    }, { amount: 0.25 });
  });
}

/* ─── 6. Scroll progress (existing #progress / #progress-bar) ─ */
const progress = document.querySelector('#progress, #progress-bar, #prog');
if (progress) {
  const updateProgress = () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop || document.body.scrollTop;
    const height = (doc.scrollHeight - doc.clientHeight) || 1;
    progress.style.width = Math.min(100, (scrolled / height) * 100) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ─── 7. Parallax on [data-parallax] (optional, opt-in) ────── */
document.querySelectorAll('[data-parallax]').forEach((el) => {
  const onScroll = () => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const pct = (vh - r.top) / (vh + r.height);
    const y = Math.max(-60, Math.min(60, (pct - 0.5) * 120));
    el.style.transform = `translate3d(0, ${y}px, 0) scale(1.06)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
