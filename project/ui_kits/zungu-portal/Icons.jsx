// Lucide-style stroke icons — currentColor, stroke 2.
const _i = (paths) => ({ size = 22, style }) =>
  React.createElement('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
    style,
  }, paths.map((p, i) => React.createElement(p[0], { key: i, ...p[1] })));

const ArrowRight   = _i([['path', { d: 'M5 12h14' }], ['path', { d: 'm12 5 7 7-7 7' }]]);
const X            = _i([['path', { d: 'M18 6 6 18' }], ['path', { d: 'm6 6 12 12' }]]);
const Compass      = _i([['circle', { cx: 12, cy: 12, r: 10 }], ['polygon', { points: '16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76' }]]);
const ChevronRight = _i([['path', { d: 'm9 18 6-6-6-6' }]]);
const Target       = _i([['circle', { cx: 12, cy: 12, r: 10 }], ['circle', { cx: 12, cy: 12, r: 6 }], ['circle', { cx: 12, cy: 12, r: 2 }]]);
const BarChart3    = _i([['path', { d: 'M3 3v18h18' }], ['path', { d: 'M18 17V9' }], ['path', { d: 'M13 17V5' }], ['path', { d: 'M8 17v-3' }]]);

Object.assign(window, { ArrowRight, X, Compass, ChevronRight, Target, BarChart3 });
