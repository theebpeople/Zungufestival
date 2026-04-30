---
name: zungu-design
description: Use this skill to generate well-branded interfaces and assets for Zungu Festival 2027 (a boutique electronic music festival on Navy Island, Port Antonio, Jamaica, produced by Elektric Bangaz / EBP), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Tone & voice**: dark editorial luxury. Declarative, never promotional. UPPERCASE for structure, sentence case for prose, italic-mono `// comments` for meta-labels. No exclamation marks, no emoji.
- **Palette**: near-black `#04080A` background, gold `#C8A84B` accent, cream `#F2EBD9` text, deep forest `#0D2018`, rust `#C45A2A`. See `colors_and_type.css` for the full token set.
- **Type**: Unbounded (display, 900/700/300, tight `-0.05em`) and Space Mono (body, labels, mono — wide `0.25em` tracking on uppercase labels).
- **Always**: `border-radius: 0` on every surface. Grain overlay (SVG `feTurbulence`, `mix-blend-mode: overlay`, ~0.6 opacity) on full-bleed backgrounds. Crosshair cursor on interactive elements.
- **Never**: rounded corners, gradients on UI chrome (only on photo overlays), emoji, drop shadows.

## What's in this skill

| Path | Purpose |
|---|---|
| `README.md` | Brand context, content fundamentals, visual foundations, iconography |
| `colors_and_type.css` | Drop-in tokens — colors, type ramp, spacing, motion, semantic element styles |
| `assets/` | Logos (`zungu-z-logo.png`) + Navy Island imagery (aerial, vector, satellite, sea) |
| `preview/` | Design-system cards (colors, type, components, brand) — useful as references |
| `ui_kits/zungu-portal/` | React UI kit: gate → credentials form → dashboard click-through. Pixel-faithful to `github.com/elektricbangaz/Zungufestival`. |
| `uploads/` | Original handoff PDF and extracted brand text |

## Working rules for this brand

1. **Lead with the gold Z.** It's the only ornament you need for branded surfaces.
2. **Side-dot navigation, not top tabs.** The site uses a vertical dot rail on the right edge with a gold progress bar.
3. **Three role-coded entry points** — Investor (gold), Production (white), General Admission (cream). Maintain that hierarchy if you build any auth or selection surfaces.
4. **Photography is desaturated and dark.** `filter: grayscale(1) brightness(0.5)` over Navy Island imagery, then a `linear-gradient(to top, #04080A, transparent)` mask.
5. **Icons are inline Lucide-style stroke SVGs at 22px, stroke-width 2.** No icon fonts, no emoji.

When in doubt, defer to the README's Content Fundamentals and Visual Foundations sections — they answer most decisions.
