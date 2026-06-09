# ZUNGU FESTIVAL — PROJECT STATUS (Source of Truth)

> **Read this first.** This document defines the approved content model, design system,
> and repo state. If anything in the codebase or an older file contradicts this document,
> this document wins. Last updated: 2026-06-09 (post PR #7 merge).

---

## 1. Current approved model

### Financial / access model (LOCKED)
- **Base Case Gross Access Revenue: US$3,690,000.**
- US$5,685,000 may appear **only** as a "superseded model" note. Never present it as the current model.
- Products:
  | Product | Price | Allocation |
  |---|---|---|
  | Full Week | US$600 | 3,500 |
  | VIP | US$1,350 | 900 |
  | The Thirty | US$12,500 | 30 |
- No glamping product/tier in the access model. No "570 guests × US$3,500" row.
  (Glamping image *files* still exist under `public/photos/` — filenames only, not copy.)

### Accommodation model
- Five tiers as rendered in `/deck`. Navy Obsidian = "High-spec on-island accommodation
  zone … 60–80 units across two clusters." No glamping tier, no per-tier guest-count revenue rows.

### Stage-capacity language rule (CRITICAL)
- **Per-stage capacity figures are ABANDONED.** Never write "2,000–3,000 capacity",
  "500–800 capacity", "300–500 capacity", etc. in any stakeholder- or public-facing copy.
- Use branded, non-capacity language:
  - **Zungu Main** · Headline-scale programme environment
  - **Origins** · Intimate canopy programme environment
  - **Rebirth** · Shoreline / beach programme environment
- Always use the branded stage names (Zungu Main / Origins / Rebirth), not
  "Main Stage / Forest Stage / Beach Stage".
- **Sole exception:** `/production-brief` (production-partner-facing) retains
  "Design crowd load" figures. Do not copy those figures anywhere else.

### Artist language rules
- Artists are **targets, not bookings**. Never write "confirmed", "booked", "headlining",
  or "co-curation". The deck explicitly says "These are not confirmed bookings."
- Artist cards carry role-split copy: `whyInvPrt` (investor/partner) vs `whyPress` (press),
  selected via `safeRole === 'press' ? whyPress : whyInvPrt`.
- `strategic: true` renders the STRATEGIC TARGET badge (Black Coffee, Shimza).
- No "Zungu owns publishing", no "commissions original collaborations", no guaranteed
  recordings/output language. Zungu Sessions: "Deliverables: None guaranteed —
  conditions are the product."

---

## 2. Current routes (Next.js App Router, `src/app/`)

| Route | Purpose | Gating |
|---|---|---|
| `/` | Landing | Public |
| `/sign-in`, `/sign-out` | Auth | Public |
| `/deck` | Investor/partner/press/stakeholder deck | Clerk + email allowlist; client redirect if unauthenticated |
| `/stakeholder` | Institutional stakeholder brief (CH01–04, 04b, 05–12) | Clerk + allowlist |
| `/stakeholder-brief` | **Legacy** stakeholder page (cleaned of capacity language, still routable) | Clerk + allowlist |
| `/stages` | Stage architecture | Clerk + allowlist |
| `/production-brief` | Production-partner brief (retains Design crowd load) | Clerk + allowlist |
| `/partner`, `/activities`, `/brand` | Partner/activities/brand portals | Clerk + allowlist |
| `/dashboard`, `/invite-tool`, `/not-authorized` | Admin/utility | Clerk |

## 3. Role visibility model
- Roles: `investor`, `partner`, `press`, `stakeholder` — from `user.publicMetadata.role`
  or validated `?role=` param.
- Middleware (`src/middleware.ts`): Clerk protection + `ALLOWED_EMAILS` env allowlist;
  guest cookie `zungu_guest` (`?access=zungu2027nav`) bypasses the email check for
  authenticated users only; invite-token flow.
- Deck sections are role-gated via `visibleSections` (e.g. `financial` hidden from press).

---

## 4. Design system
- Tokens: `bg #04080A`, `gold #C8A84B`, `cream #F2EBD9`, muted `rgba(242,235,217,0.45)`;
  display font Unbounded, mono font Space Mono.
- Z-mark = **`public/zungu-z-mark.png`** everywhere. Do **not** use
  `public/logo-flat-black.png` or `public/logo-wordmark-black.png` (legacy).
- Hero system (deck + stakeholder): centered poster layout, radial vignette
  `radial-gradient(ellipse at 50% 40%, rgba(4,8,10,0.55) 0%, rgba(4,8,10,0.92) 75%)`,
  `hero-wordmark` / `hero-eyebrow-full` / `hero-eyebrow-mobile` classes with ≤480px
  media rules; nav links collapse via `deck-chapter-links`.
- Stakeholder page stays institutional in tone — no consumer/ticket-sales CTAs.

---

## 5. Legacy files — DO NOT USE AS REFERENCE

These predate the approved model and contain superseded copy (old US$5,685,000 model,
glamping tiers, per-stage capacities, old logos). They are slated for removal/archive:

- Root HTML: `deck-private.html`, `gate.html`, `brand.html`, `stages.html`,
  `activities.html`, `zungu-deck-v3 - FINAL.html`, `zungu-activities-2027 (1).html`
- `Designing a legendary Zungu Festival offsite - Claude_files/` (saved browser page, ~130 files)
- `project/` (old design-kit: previews, `ui_kits/zungu-portal/Chapter*.jsx`, uploads incl.
  `ZUNGU HANDOFF.pdf`, duplicate deck HTML)
- `public/logo-flat-black.png`, `public/logo-wordmark-black.png`
- `vercel.json` rewrites to `/deck.html` and `/activities.html` are inert legacy
  (the HTML targets don't exist in `public/`); remove in a cleanup PR.

The **only** sources of truth for copy are the live `src/app/**` pages and this document.

---

## 6. Branch / PR status (as of 2026-06-09)

- **`main`** — production trunk. Vercel GitHub integration auto-deploys `main` to production.
- **PR #7** (`claude/optimistic-einstein-tNBbx` → `main`) — **MERGED** (`d943d45`):
  webcopy revision, stage-capacity removal, financial-model verification, artist-language
  cleanup, stakeholder hero alignment, deck mobile hero fix. Clean build confirmed pre-push.
- Stale `claude/*` branches and `sync-from-main` are pending the audited cleanup pass
  (see PR/issue history). Verified before deletion: merged status + `git cherry`
  patch-equivalence vs `main`.

## 7. Remaining manual QA

- **Authenticated visual QA on Vercel production** (cannot be done from CI/container —
  Clerk-gated): `/deck` mobile + desktop, `/stakeholder` mobile + desktop,
  `/stakeholder-brief`, `/stages`, `/production-brief`.
- Confirm hero rendering: wordmark fits at 390px, eyebrow swap works, stakeholder hero
  centered with Z-mark.
- Possible follow-up: fix post-sign-out redirect (was on unmerged branch
  `claude/jolly-hypatia-kwkgX`, not in `main`).
