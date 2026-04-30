# Zungu Festival 2027 · Design System

> Dark editorial luxury for a world-class electronic music festival.
> **Navy Island · Port Antonio · Jamaica · MMXXVII · 13–16 June 2027**

This system encodes the brand for **Zungu Festival 2027**, produced by
**Elektric Bangaz / The Events & Branding People (EBP)**. It packages tokens,
type, color, imagery, and a UI kit so any agent can build on-brand artifacts
(decks, web pages, marketing, gates, dashboards) without re-deriving the system.

---

## The Brand

**Zungu** is a 2,000-ticket boutique electronic music festival on a 64-acre
private island off Port Antonio, Jamaica. The pitch is the island itself — not
"a cultural movement," not nostalgia, not festival tropes. Three stages, four
nights, one island. Sound travels out to sea.

- **Origins** (East tip · 500 cap · 6am–10am) — sunrise stage. Jungle, dub, breakfast.
- **Zungu Main** (South face · 2,000 cap · 7pm–6am) — full production headliners.
- **Rebirth** (West end · 800 cap · 4pm–8pm) — sunset house, golden hour.

Audiences are routed through a **gated portal** with three roles:
**Investor** (gold accent, "Patient Capital"),
**Production & Logistics** (cream accent, "Technical Standard"),
**General Admission** (cream accent, "Brutal Luxury").

## Sources

| Source | Path / URL |
|---|---|
| Codebase (Next.js + static HTML) | `github.com/elektricbangaz/Zungufestival` (default branch `main`) |
| Canonical handoff doc | `uploads/ZUNGU HANDOFF.pdf` (extracted: `uploads/ZUNGU_HANDOFF_text.txt`) |
| Logo (gold Z with leaf accents) | `uploads/Elegant golden _Z_ with leaf accents.png` → `assets/zungu-z-mark.png` |
| Navy Island imagery (10 plates) | `uploads/NAVY ISLAND *.png` → `assets/navy-island-*.png` |
| Live design tokens | `src/app/globals.css`, `src/app/page.tsx`, `src/app/dashboard/page.tsx` |
| Static editorial pages | `index.html`, `stages.html`, `activities.html`, `gate.html` |

The full Next.js portal uses Clerk auth, role-aware routing, and a dashboard
that re-uses the gate visuals. The static HTML pages (stages, activities) are
the editorial "long-read" surfaces — they carry the deepest visual vocabulary
(chapter numbers, side dots, gold progress bar, photo grids, time tables,
night-typed sections).

---

## Index

| File / Folder | Purpose |
|---|---|
| `README.md` | This file — context, content & visual fundamentals, iconography |
| `SKILL.md` | Agent skill manifest (cross-compatible with Claude Code skills) |
| `colors_and_type.css` | Tokens — colors, type ramp, spacing, motion, semantic element styles |
| `assets/` | Logos and Navy Island imagery (PNG) |
| `preview/` | Design-system cards for the review pane |
| `ui_kits/zungu-portal/` | UI kit — gate, role select, form, dashboard hero, stage cards |
| `uploads/` | Original source files (handoff PDF + extracted text) |

---

## Content Fundamentals

**Voice — declarative, not promotional.** Zungu does not sell. It states.
Sentences are short, end on certainty. No exclamation marks. No "join us,"
no "experience the magic." The brand is confident enough to be flat.

**Casing — UPPERCASE for everything structural.** Headlines, labels,
buttons, eyebrows, nav, even some body. Mixed-case is reserved for long-form
narrative paragraphs inside chapters and stage descriptions.

**Voice — third person, no "we"/"you" copy.** Examples from live pages:
> *"Tomorrowland built a fantasy world. Zungu doesn't need to build anything. The world is already there."*
> *"The stage does not feel built — it feels grown."*
> *"Origins catches the sunrise. Rebirth catches the sunset. Zungu Main owns the night."*
> *"The island is the set design. Technology amplifies it."*

**Phrasing patterns**
- **Triadic statements** with rhythm: *"Three stages. Three windows. Never competing."*
- **Em-dashes** for pivot beats: *"The stage does not feel built — it feels grown."*
- **Italic // comments** for system prompts: `// ACCESS AUTHORIZATION REQUIRED`, `// SELECT YOUR ACCESS LEVEL`
- **Roman numerals for the year:** MMXXVII (never "2027" in display chrome).
- **Bullet markers** are `·` (middle dot) — never `•`, `–`, or `*`.
- **Chapter labels** number programme: `01 — Navy Island · Port Antonio`.
- **Dates** spelled out: `Saturday · 13 June 2027`.
- **Numbers** use clean comma thousands: `2,000 tickets` (never "2,000–2,500").

**Vocabulary — no festival clichés.** Avoid: "vibes," "experience," "journey,"
"unforgettable," "epic," "vibey." Prefer: *argument, lineage, ritual, handoff,
production, root, spread, return, origin, capital, standard, threshold,
authorization, credential.*

**No emoji. Ever.** Glyphs used as ornaments are unicode geometry: `→ · ↓ ↑ ✕`
and the diamond (`◆` rendered as a 4×4 rotated square).

**Tone shifts by surface**
- **Gate / Auth:** clipped, system-voice. *"Access Authorization Required."*
- **Editorial chapters:** literary, declarative paragraphs.
- **Forms:** `[REQUIRED]`, `ENTER IDENTIFIER`, `SUBMIT CREDENTIALS`.
- **Footer:** dossier-style: `Port Antonio · Jamaica · 2027`.

---

## Visual Foundations

### Colors

Two near-blacks (`#04080A` editorial, `#060808` Next portal — interchangeable),
deep forest green sections, signature **amber gold (`#C8A84B`)**, warm cream
text, and a **burnt rust (`#C45A2A`)** for accent diamonds and the
"Production Unit" tag. Stages and nights each carry their own color:
**Origins** burnt orange, **Rebirth** violet, **Night 2** ocean blue,
**Night 3** afro-house green. Teal `#4AAFA0` is the legacy partner accent
from the original portal.

All semantic foreground roles are encoded in `colors_and_type.css` as
`--fg-1` through `--fg-5`.

### Type

- **Unbounded** (display, `900 / 700 / 300`) — every headline. Tight `-0.05em`
  to `-0.02em` tracking. Often UPPERCASE. Used at hero scale (`clamp(3rem, 11vw, 9rem)`)
  and at chapter scale.
- **Space Mono** (body, `400 / 700`, italic) — everything else. Body, labels,
  buttons, table cells, eyebrows, captions, finest-grain meta.

The signature move is **wide-tracked monospace UPPERCASE labels** sitting next
to **tightly-tracked Unbounded display headlines** — a brutalist editorial
contrast (technical metadata vs. literary statement).

### Spacing & Layout

- **Page gutter:** `8vw` desktop / `5vw` mobile (sometimes `4vw` at 480px).
- **Section padding:** `60–80px` vertical, gutter horizontal.
- **Grid:** chapters use a `flex` 2-column (number + body); stage cards use
  a 3-column grid (`1.4fr .9fr .8fr`); nights use a `1.4fr 1fr` grid (narrative + schedule).
- **Sticky nav:** 52px tall with backdrop-blur, hairline bottom border.
- **Side dot navigation:** 6×6px gold dots, fixed right at `28px`, vertically
  centered. Active dot scales 1.4×.
- **Top progress bar:** `2px` gold (`#C8A84B`) bar tracking scroll position.

### Borders

- **Always 0px radius.** Sharp corners only. Universal.
- **Three hairline weights:** `0.07` (default), `0.20` (emphasized), and
  `0.05` neutral. Borders are gold-tinted (`rgba(200,168,75, …)`) more often
  than white-tinted.
- **Stage cards** use a **3px left border** in the stage's accent color.
- **Schedule rows** use a **2px left border** for the highlighted (headlining) act.

### Background system

- **Body:** flat near-black.
- **Sections** alternate `--bg` and `--green` deep forest.
- **Hero backgrounds:** full-bleed Navy Island photography, 18% opacity,
  `grayscale(1) brightness(0.5)`, with a vertical gradient (`bg → bg/0.5 → 0`)
  layered on top so headline copy has air. A subtle 60×60px gold grid is
  often overlaid at `0.025` opacity for editorial texture.
- **Night sections** carry colored radial-gradient ambient glows (e.g.
  origins-orange in upper right, rebirth-violet centre).
- **Grain overlay:** SVG `feTurbulence` fixed to `body` on every editorial
  surface. Adds analog texture across the whole product.

### Imagery

- **Color vibe:** desaturated, slightly cool, brightness ~0.5–0.8. Never warm
  or candy-saturated. Photography is **always darkened** so display type wins.
- **Subjects:** Navy Island aerial, satellite, water, forest canopy. No
  people-portraits, no crowd shots in gate-level chrome.
- **Treatment:** photo cells use `filter: brightness(.8) saturate(.85)`,
  hover bumps to `1` and `1.1` with a 1.03 scale.
- **Vector island assets** are used in maps and diagrams.

### Components

- **Buttons:** rectangular, `1px` gold border, transparent fill, monospace
  uppercase, tracking `0.15em`. Hover: invert (gold fill, black text). Three
  variants: `primary` (gold-bordered), `secondary` (white-bordered), `gold`
  (filled gold). Press: simple `filter: brightness(1.1)`.
- **Inputs:** white-tinted fill (`rgba(255,255,255,0.05)`), 1px white-tinted
  border, monospace uppercase content, `[REQUIRED]` meta on the right of the
  label. Focus: border becomes gold.
- **Cards:** transparent / 0.02 white fill, hairline gold border. Hover:
  border opacity bumps from `0.22` to `0.66`, fill tints with the accent
  color at `0.08`.
- **Tables:** all hairlines, no fills. Highlighted rows get a left-color-bar.
  Tabular numerals, monospace 9–13px.

### Animation

- **Tone:** restrained. Reveal-on-scroll fades (`opacity 0 → 1`,
  `translateY(16px) → 0`, `0.6s ease`). Hover transitions `200–300ms`.
- **No bounces, no easings that overshoot, no parallax.** The product is
  editorial, not playful.
- **Progress bar** updates at `0.1s linear` — a system feedback line, not an
  animation.

### Hover & press

- **Links / nav:** color-only swap, muted → gold.
- **Buttons (primary):** background+text invert.
- **Cards:** border opacity + faint accent-tint background.
- **Press states:** mostly inherited from hover; gold fill buttons get a
  brightness lift on press (`filter: brightness(1.1)`).

### Transparency, blur, glow

- **Backdrop blur** is reserved for the **sticky nav** (`backdrop-filter: blur(12px)`)
  on top of `rgba(4,8,10,0.85)`.
- **Radial glows** are used twice: a centre gold glow on the gate, and night
  ambient color glows.
- **Shadows are not part of the system.** The system uses **hairline borders +
  near-black surfaces** instead of elevation shadows. Cards do not float.

### Cursor

`cursor: crosshair` everywhere — including buttons. This is part of the brand.

---

## Iconography

The codebase **does not use an icon font or sprite library.** All icons are
inline SVG, hand-rolled, with `stroke="currentColor" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round"` — i.e. **Lucide-style** stroke
icons. Inventory observed in `src/app/dashboard/page.tsx` and `index.html`:

`ArrowRight, X, Compass, ChevronRight, Target, BarChart3`

**Substitution policy.** Because the codebase visibly tracks Lucide's API
(same viewBox, same stroke geometry), the design system **uses Lucide via CDN**
(`unpkg.com/lucide@latest`) for any icon not already in the codebase. **Stroke
weight is always 2.** **Size is 13–24px**, never larger — icons are deferential
to type. **Color** matches surrounding text (gold, rust, or muted).

**Brand glyphs (these ARE the iconography):**
1. **Gold "Z" mark with leaf accents** — `assets/zungu-z-mark.png`. Hero/footer.
2. **Diamond accent** — 4×4 rotated rust square between meta lines.
3. **Block accent** — 8×8 filled gold square inside a gold-bordered diamond
   frame (the Next.js gate logo mark).
4. **Hairline + label** — eyebrow text always preceded by a `28×1` gold
   hairline.

**No emoji.** Ever. Unicode geometry only: `→ ↓ ↑ ✕ · ◆`.

**SVG island maps** (the stage placement svg in `stages.html`) are first-class
brand assets — keep their visual grammar (radial gradients in deep green,
hairline coast paths, dashed sunrise/sunset arcs, monospace labels).

---

## Caveats / Substitutions

- **Fonts** are loaded via Google Fonts (Unbounded + Space Mono). No local
  TTFs were provided in the codebase or uploads — the Google CDN copies are
  the source of truth.
- **Brand strategy long-read** (`zungu-brand-strategy (5).html`, ~3.6 MB) was
  not opened — it is too large to load into context but is referenced if a
  future phase needs financial tables or 15-month timelines.

---

## How to use this system

1. Read `colors_and_type.css` — drop it into any HTML file.
2. Pull components from `ui_kits/zungu-portal/`.
3. Use `assets/` imagery — never invent island visuals.
4. Match the voice in **Content Fundamentals** before writing copy.
5. When in doubt: **uppercase, monospace, 0px radius, gold accent.**
