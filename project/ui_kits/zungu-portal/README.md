# Zungu Portal · UI Kit

Recreates the gated portal — the canonical surface for the Zungu brand.
Source: `github.com/elektricbangaz/Zungufestival` → `src/app/page.tsx`,
`src/app/dashboard/page.tsx`, `index.html`.

## Files
- `index.html` — interactive demo. Lands on the Gate, lets you pick a role, fills the form, lands on the dashboard hero. Click `← Reset Session` to go back.
- `tokens.jsx` — exports `C` (color tokens) and shared style helpers.
- `Icons.jsx` — Lucide-style stroke icons (`ArrowRight`, `X`, `Compass`, `ChevronRight`, `Target`, `BarChart3`).
- `Button.jsx` — three variants: `primary` (gold-bordered), `secondary` (white-bordered), `gold` (filled).
- `InputField.jsx` — labeled input + select with `[REQUIRED]` meta and gold focus.
- `GateView.jsx` — the access screen with brand glyph, ZUNGU wordmark, role buttons.
- `FormView.jsx` — split credentialing form (investor / supplier).
- `DashboardView.jsx` — sticky nav + hero + Strategic Goals grid + Programme cards.

## Components used in the live codebase
- All inline SVG icons in `dashboard/page.tsx` are recreated 1:1.
- The `Button` hover invert pattern is lifted from `src/app/dashboard/page.tsx`.
- The Gate radial glow + diamond glyph match `src/app/page.tsx`.

## To run
Open `index.html` directly. React 18 + Babel-standalone are loaded from CDN.
