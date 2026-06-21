# Zungu Festival 2027 · Design System

> Dark editorial luxury for a world-class electronic music festival.
> **Navy Island · Port Antonio · Jamaica · MMXXVII · 13–16 June 2027**

This system encodes the brand for **Zungu Festival 2027**, produced by
**Elektric Bangaz / The Events & Branding People (EBP)**. It packages tokens,
type, color, imagery, and a UI kit so any agent can build on-brand artifacts
(decks, web pages, marketing, gates, dashboards) without re-deriving the system.

> **Coding agents:** The canonical design files live under `project/`. Read
> `project/README.md` top to bottom before implementing anything — it contains
> all visual rules, copy voice, token values, and component specs.

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
| `project/README.md` | Full design system spec (tokens, voice, components) |
| `project/SKILL.md` | Agent skill manifest (cross-compatible with Claude Code skills) |
| `project/colors_and_type.css` | Tokens — colors, type ramp, spacing, motion, semantic element styles |
| `project/assets/` | Logos and Navy Island imagery (PNG) |
| `project/preview/` | Design-system cards for the review pane |
| `project/ui_kits/zungu-portal/` | UI kit — gate, role select, form, dashboard hero, stage cards |
| `project/uploads/` | Original source files (handoff PDF + extracted text) |
| `public/` | Assets served by Next.js (photos, Z mark) |

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

---

## How to use this system

1. Read `project/colors_and_type.css` — drop it into any HTML file.
2. Pull components from `project/ui_kits/zungu-portal/`.
3. Use `project/assets/` imagery — never invent island visuals.
4. Match the voice in **Content Fundamentals** before writing copy.
5. When in doubt: **uppercase, monospace, 0px radius, gold accent.**
