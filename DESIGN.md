# DESIGN.md

Single source of truth for generating UI screens consistently. When generating any interface, reference these tokens and rules directly — **never invent values, and never use a raw primitive where a semantic token exists.**

**Typefaces:** `Albert Sans` (display/headlines) + `Inter` (UI/body).

**How to read this doc:** Primitives are raw values. Semantic tokens map to primitives and are the *only* thing components may reference. Every color used in a component must resolve through a semantic token in §3.

---

## 1. Brand Personality

- **Editorial, premium, controlled.** The interface is quiet; the content is loud.
- **Light and airy** — default surfaces are `paper` and `white`; pages breathe with open space and large imagery.
- **Architectural** — cool sky tones, clean geometry, and photography carry the mood (reference: [Nordå](https://norda.framer.website/)).
- **Systematic** — strict grids, fixed scales, predictable rhythm.
- **Character in three words:** quiet interface, loud content.

Emotional signal is carried by imagery and typographic scale, not by UI chrome, color, or effects. **Black is reserved for menus and overlays** — not for hero, contact, or content sections.

---

## 2. Design Principles

1. **Neutrals carry the interface; color lives in content.** Default UI surfaces are `bg.base` / `bg.surface` (paper, white, gray). Accent color (`accent.default`, sky blue) is limited to **one filled accent element per screen region** (see §3 Accent Budget) plus imagery. Every screen must read correctly in grayscale before accent is added.
2. **Black is for menus and overlays only.** Use `bg.inverse` for mobile nav overlays, full-screen menus, and modal scrims — not for hero, contact, cards, or content sections. Content sections stay on light surfaces with `fg.primary`.
3. **Everything on an 8px grid.** All margins, padding, and gaps are tokens from §5 (multiples of 8; 4px only for fine adjustments). No off-scale values.
4. **Hierarchy via scale and weight, not decoration.** Two typefaces only. Fixed type scale (§4) with deliberate gaps. No italics or color for emphasis — use `text.body-strong` (weight) instead.
5. **Uppercase micro-labels.** Nav, tabs, badges, button labels, field labels, and metadata use `text.label`/`text.caption` (uppercase, `+0.06em`). Sentence case only for body and large headlines.
6. **Rectilinear shapes.** Containers cap at `radius.md` (8px). No pills, no blobs. Dividers are 1px hard lines. `radius.full` only for circular icon buttons.
7. **Depth from contrast, cropping, and overlap — not shadows.** Default `shadow.none`. Elevation shadows are allowed only for the exceptions listed in §7.
8. **Imagery is the primary emotional signal.** Each screen anchors on at least one large, art-directed image — bright, airy, architectural, or editorial photography with cool sky tones. Images fill containers edge-to-edge, no inner padding, never rounded past the card edge.
9. **Alternate dense and open zones.** Never distribute spacing evenly. Each screen pairs an **open zone** (≥ `space.7` / 64px vertical padding) with a **dense zone** (internal gaps of `space.2`–`space.3`) to control pacing.

---

## 3. Color Tokens

### 3.1 Primitives (never referenced directly by components)
| Token | Value | | Token | Value |
|---|---|---|---|---|
| `black` | `#0A0A0A` | | `paper` | `#F4F2ED` |
| `ink` | `#141414` | | `white` | `#FFFFFF` |
| `charcoal` | `#1F1F1F` | | `accent-sky` | `#5CB8F5` |
| `gray-900` | `#2B2B2B` | | `accent-sky-hover` | `#45ABEF` |
| `gray-700` | `#4A4A4A` | | `accent-sky-active` | `#2E9EE6` |
| `gray-500` | `#757575` | | `accent-blue` | `#0284C7` |
| `gray-300` | `#B5B5B5` | | `accent-red` | `#E8341C` |
| `gray-100` | `#E6E4E0` | | `success` | `#1F8A4C` |
| | | | `warning` | `#C77700` |
| | | | `danger` | `#C4271A` |

### 3.2 Semantic — Surfaces & Text
| Token | Maps to | Use |
|---|---|---|
| `bg.base` | `paper` | Page background (default) |
| `bg.surface` | `white` | Cards/panels (light) |
| `bg.inverse` | `black` | **Menus, mobile overlays, modal scrims only** |
| `bg.surface-inverse` | `charcoal` | Dark cards on inverse overlays (rare) |
| `bg.disabled` | `gray-100` | Disabled control fill (light) |
| `fg.primary` | `ink` | Primary text on light |
| `fg.muted` | `gray-500` | Metadata/captions on light |
| `fg.subtle` | `gray-300` | Hints/disabled text |
| `fg.primary-inverse` | `paper` | Primary text on dark |
| `fg.muted-inverse` | `gray-300` | Metadata/captions on dark |
| `fg.on-accent` | `white` | Text/icon on accent fill |

### 3.3 Semantic — Borders, Accent, State, Feedback
| Token | Maps to | Use |
|---|---|---|
| `border.default` | `gray-100` | Dividers, edges (light) |
| `border.strong` | `gray-300` | Hover/emphasis border (light) |
| `border.inverse` | `gray-700` | Dividers, edges (dark) |
| `accent.default` | `accent-sky` | Single swappable accent fill (sky blue) |
| `accent.hover` | `accent-sky-hover` | Accent hover |
| `accent.active` | `accent-sky-active` | Accent pressed |
| `accent.fg` | `white` | Text/icon on accent |
| `focus.ring` | `accent-blue` | **Fixed** focus ring — deeper blue for contrast against sky accent |
| `overlay.scrim` | `rgba(10,10,10,0.6)` | Modal/sheet backdrop |
| `feedback.success` | `success` | Success text/border/icon |
| `feedback.warning` | `warning` | Warning text/border/icon |
| `feedback.danger` | `danger` | Error text/border/icon |
| `feedback.info` | `accent-blue` | Info text/border/icon |

### 3.4 Background → Foreground Pairing (mandatory)
A component must pick text/border tokens from the row matching its background. Never mix across rows.

| Background | Primary text | Muted text | Border |
|---|---|---|---|
| `bg.base` / `bg.surface` | `fg.primary` | `fg.muted` | `border.default` / `border.strong` |
| `bg.inverse` / `bg.surface-inverse` | `fg.primary-inverse` | `fg.muted-inverse` | `border.inverse` |
| `accent.default` | `accent.fg` | `accent.fg` | none |

### 3.5 Rules
- Components consume **semantic tokens only** (`bg.*`, `fg.*`, `border.*`, `accent.*`, `focus.*`, `overlay.*`, `feedback.*`). Never a primitive.
- **Default surface:** `bg.base` for page, hero, contact, and section backgrounds. Do not default to `bg.inverse` for content.
- **Retheme** per project by repointing `accent.default/hover/active` together. `focus.ring` stays `accent-blue` (deeper) regardless, so keyboard focus remains distinct from the sky accent fill.
- **Accent Budget:** at most **one** accent-filled element per screen region (one per nav, one per card, one per form). Focus rings and feedback colors do not count against this budget.
- `feedback.danger` (`#C4271A`) is intentionally distinct from `accent-sky` (`#5CB8F5`); state must still be disambiguated with icon + text (see §10).

### 3.6 Surface usage (light-first)
| Surface | Use | Text pairing |
|---|---|---|
| `bg.base` | Page, hero, about, footer | `fg.primary` / `fg.muted` |
| `bg.surface` | Cards, contact panel, inputs | `fg.primary` / `fg.muted` |
| `bg.inverse` | Mobile menu overlay only | `fg.primary-inverse` / `fg.muted-inverse` |
| `overlay.scrim` | Modal backdrop | n/a (content behind is inert) |

---

## 4. Typography

**Families:** `display: "Albert Sans", sans-serif` · `ui: "Inter", sans-serif`
**Weights:** `regular 400` · `medium 500` · `semibold 600` · `bold 700`

### 4.1 Size scale (fixed — no in-between values)
| Token | Desktop | Mobile (< `md`/768) |
|---|---|---|
| `caption` | `12px` | `12px` |
| `label` | `14px` | `14px` |
| `body` | `16px` | `16px` |
| `title` | `24px` | `20px` |
| `h2` | `40px` | `28px` |
| `h1` | `72px` | `40px` |
| `display` | `112px` | `56px` |

Mobile values are the *only* permitted responsive overrides; body/label/caption never scale.

### 4.2 Line height & tracking
| Token | Value | Applies to |
|---|---|---|
| `leading.tight` | `1.05` | `display`, `h1` |
| `leading.snug` | `1.25` | `h2`, `title` |
| `leading.normal` | `1.5` | `body` |
| `leading.ui` | `1.2` | `label`, `caption` |
| `tracking.tight` | `-0.02em` | `display`, `h1` |
| `tracking.normal` | `0` | `h2`, `title`, `body` |
| `tracking.label` | `+0.06em` | `label`, `caption` |

### 4.3 Composite text styles (default fg per style)
| Style | Composition | Default color |
|---|---|---|
| `text.display` | display / display / bold / tight | `fg.primary`* |
| `text.h1` | display / h1 / semibold / tight | `fg.primary`* |
| `text.h2` | display / h2 / semibold / snug | `fg.primary`* |
| `text.title` | ui / title / medium / snug | `fg.primary`* |
| `text.body` | ui / body / regular / normal | `fg.primary`* |
| `text.body-strong` | ui / body / semibold / normal | `fg.primary`* |
| `text.label` | ui / label / medium / uppercase / label tracking / ui leading | `fg.primary`* |
| `text.caption` | ui / caption / medium / uppercase / label tracking / ui leading | `fg.muted`* |

*On dark backgrounds swap to the inverse equivalent per §3.4. `text.body-strong` is the **only** inline-emphasis mechanism — no italics, no underline, no color.

---

## 5. Spacing (8px base)

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `space.0` | `0` | | `space.5` | `32px` |
| `space.1` | `4px` | | `space.6` | `48px` |
| `space.2` | `8px` | | `space.7` | `64px` |
| `space.3` | `16px` | | `space.8` | `96px` |
| `space.4` | `24px` | | `space.9` | `128px` |

**Aliases:** `gutter → space.4 (24)` · `gutter-mobile → space.3 (16)` · `section → space.8 (96)` · `inset-card → space.4 (24)`

Only `space.1 (4px)` may break the 8px grid, and only for fine adjustments (icon gaps, label offsets).

---

## 6. Layout

### 6.1 Breakpoints
| Token | Min width |
|---|---|
| `bp.sm` | `640px` |
| `bp.md` | `768px` |
| `bp.lg` | `1024px` |
| `bp.xl` | `1280px` |

### 6.2 Grid & container
| Token | Value |
|---|---|
| `container.max` | `1440px` |
| `content.max` | `1200px` (text-heavy: `720px`) |
| Columns | 4 (< `md`) · 8 (`md`–`lg`) · 12 (≥ `lg`) |
| Gutter | `gutter-mobile` (< `md`) · `gutter` (≥ `md`) |
| Page margin (outer padding) | `space.4` (< `md`) · `space.6` (`md`–`lg`) · `space.7` (≥ `lg`) |

**Card grids:** 1 col (< `md`) · 2 col (`md`–`lg`) · 3 col (≥ `lg`); featured tiles may span 2 columns.

### 6.3 Z-index scale
| Token | Value | Use |
|---|---|---|
| `z.base` | `0` | Default flow |
| `z.raised` | `10` | Hover-lifted media |
| `z.sticky` | `100` | Sticky nav |
| `z.dropdown` | `200` | Menus, popovers |
| `z.scrim` | `900` | Modal backdrop |
| `z.modal` | `1000` | Modal panel |
| `z.toast` | `1100` | Toasts/notifications |

### 6.4 Icon sizes
`icon.sm 16` · `icon.md 20` (default, aligns with `text.label`) · `icon.lg 24` · `icon.xl 32`.

---

## 7. Radius, Shadows & Borders

### 7.1 Radius
| Token | Value | Use |
|---|---|---|
| `radius.none` | `0` | Images, tiles, dividers (default) |
| `radius.sm` | `4px` | Inputs, tags, badges |
| `radius.md` | `8px` | Cards, buttons (container cap) |
| `radius.full` | `9999px` | Circular icon buttons only |

Containers never exceed `radius.md`.

### 7.2 Shadows (default is `none`; all others are exhaustively listed exceptions)
| Token | Value | Only allowed on |
|---|---|---|
| `shadow.none` | `none` | Everything by default |
| `shadow.floating` | `0 8px 24px rgba(10,10,10,0.16)` | Modals, dropdowns/popovers, toasts, FAB over media |
| `shadow.focus` | `0 0 0 3px rgba(2,132,199,0.4)` | Focus ring (uses `focus.ring` / `accent-blue`) |

If a component is not in the "allowed on" list, it uses `shadow.none`.

### 7.3 Borders
`border.width.hairline 1px` · `border.width.strong 2px` · `divider = 1px solid border.default` (light) / `border.inverse` (dark).

---

## 8. Components

**Shared control sizing** (resolves height vs padding): control height is fixed by variant; **vertical padding is `0` with content vertically centered**. Horizontal padding is a token.

| Size | Height | Horizontal padding | Applies to |
|---|---|---|---|
| `sm` | `40px` | `space.3` (16) | compact buttons, inputs in dense rows |
| `md` (default) | `48px` | `space.4` (24) | buttons, inputs, nav CTA |
| `lg` | `56px` | `space.5` (32) | hero CTAs |

Shared rules: one accent-filled element per component instance · default `shadow.none` · labels uppercase (`text.label`/`text.caption`) · every interactive element shows `shadow.focus` on `:focus-visible`.

### Buttons
- **Purpose:** trigger actions; one primary per view.
- **Variants:** Primary (`accent.default` bg → `accent.hover` → `accent.active`, `accent.fg` text, `radius.md`) · Secondary (transparent bg, `border.default`→`border.strong` on hover, `fg.primary`) · Tertiary/text (no bg/border, `fg.primary`, underline on hover only) · Icon-circular (`radius.full`; `shadow.floating` only when floating over media).
- **States:** default · hover (`motion.fast`) · pressed (`accent.active` / bg fill for secondary; shift `distance.sm`, no bounce) · **focus-visible** (`shadow.focus`) · disabled (`bg.disabled` fill or none, `fg.subtle`, no hover, `cursor:not-allowed`) · loading (label replaced by spinner in current text color, width locked) · **selected/toggle** (for segmented actions: `accent.default` fill or `border.strong`).
- **Spacing:** height/padding per sizing table; icon–label gap `space.2`.
- **Rules:** never two primaries in one view; labels are uppercase verbs ≤ 3 words; spinner inherits text color.

### Inputs
- **Purpose:** collect text/selections legibly. Covers text, textarea, select.
- **Style:** `bg.surface`, `border.default`, `radius.sm`, `fg.primary`, caret `accent.default`; persistent uppercase `text.label` above; placeholder `fg.subtle`.
- **States:** default · hover (border → `border.strong`) · focus (border `focus.ring` at `border.width.strong` + `shadow.focus`) · filled (`fg.primary`) · **error** (border `feedback.danger` + leading icon + helper `text.caption` in `feedback.danger`) · **error+focus** (danger border keeps priority, add `shadow.focus`) · disabled (`bg.disabled`, `fg.subtle`) · **read-only** (no border, `bg.base`, `fg.primary`, not focusable as editable).
- **Spacing:** horizontal padding per sizing table; height `md`; label→field `space.2`; field→helper `space.1`; stacked fields `space.4`.
- **Rules:** always a persistent visible label (never placeholder-as-label); required fields marked with a text "(required)" or asterisk **plus** `aria-required` (never color alone); error shown via icon + text + border, never a fill.
- **Select/textarea:** textarea min-height `space.9` (128), resizes vertically only; select uses the same frame with a trailing `icon.md` chevron.

### Cards
- **Purpose:** group one content unit (project tile, case study, panel).
- **Style:** `bg.surface`/`bg.surface-inverse`, `radius.md`, `shadow.none`; media edge-to-edge (`radius.none` at the card boundary); separation via contrast + `border.default`/`border.inverse`.
- **States:** static (no hover) · interactive hover (image scales ≤1.02 inside `overflow:hidden`, `motion.base`; optional accent affordance e.g. arrow) · pressed (`distance.sm` shift) · **focus-visible** (`shadow.focus`) · **selected** (`border.width.strong` `accent.default` border) · **loading/skeleton** (neutral `gray-100`/`gray-900` blocks at final dimensions, no spinner, pulse via opacity only).
- **Spacing:** content inset `inset-card` (24); title→meta `space.2`; between cards `gutter`.
- **Rules:** images never get inner padding or radius past the card edge; one accent element per card; metadata `text.caption`, titles `text.title`/`text.h2`.

### Navigation
- **Purpose:** top-level wayfinding + identity.
- **Style:** horizontal bar on `bg.base`; wordmark left, uppercase `text.label` links, one CTA right; bottom `divider`; `shadow.none`; `z.sticky` if sticky.
- **States:** link default (`fg.primary`/inverse) · hover (`fg.muted`→`fg.primary`, or animated underline `distance.sm`) · **active/current** (full `fg.primary` + persistent 2px underline in `accent.default`) · CTA follows button states · **scrolled/sticky** (background stays solid, divider remains; still no shadow) · **mobile** (< `md`: links collapse into a square `radius.sm` toggle opening a full-screen `bg.inverse` overlay at `z.dropdown`; links stack, `text.h2` scale, gap `space.4`).
- **Spacing:** bar height `space.8`-region (64–96px); horizontal padding = page margin; link gap `space.5`.
- **Rules:** exactly one CTA; ≤ 5 top-level items; hover uses color shift, active always adds the underline (so they never look identical); separate from content with a divider, never a shadow; nav bar stays on `bg.base`, never `bg.inverse`.

### Hero (page pattern)
- **Purpose:** establish identity and anchor the page with imagery.
- **Style:** `bg.base`, `fg.primary`; large `text.display` headline; optional wide media band (`aspect-ratio` ~21:9, `radius.md`, edge-to-edge image inside); metadata row below in `text.caption` / `text.title`.
- **Spacing:** `space.9` vertical padding; media band `space.8` below actions; metadata `space.8` below media.
- **Rules:** no `bg.inverse` hero; one primary CTA; imagery carries the mood — architectural, bright, cool tones.

### Tabs
- **Purpose:** switch between peer views in the same context.
- **Style:** row of uppercase `text.label` over a hairline baseline; active = `border.width.strong` underline in `accent.default`; inactive `fg.muted`; no filled/pill tabs.
- **States:** inactive · hover (`fg.muted`→`fg.primary`) · active (`fg.primary` + sliding underline, `motion.base`, `easing.standard`) · **focus-visible** (`shadow.focus`) · disabled (`fg.subtle`, non-interactive).
- **Spacing:** tab padding `space.2` × `space.3`; tab gap `space.4`; panel `space.5` below the row.
- **Rules:** underline is the only active indicator; single line, no wrap; on overflow the row scrolls horizontally (never wraps to two rows); arrow-key navigation between tabs.

### Badges
- **Purpose:** compact status / category / count markers (non-interactive labels).
- **Variants:** Neutral (`bg` `gray-100`/`gray-900` via surface pairing, `fg.primary`/inverse) · Outline (transparent, `border.default`) · Accent (`accent.default`/`accent.fg`, sparing) · **Status** — Success/Warning/Danger/Info use the matching `feedback.*` color as text + 1px border on a transparent fill, **always paired with an icon or text label** (never color alone). `radius.sm`, `text.caption`.
- **Sizes:** text badge (padding `space.1`×`space.2`) · **count/dot** (min 16px circle for counts; 8px dot for pure status).
- **States:** static by default; **filter chips** (the only interactive badge) get hover (border→`border.strong`) and selected (`accent.default` fill or inverse fill) + removable trailing ✕ with `space.1` gap.
- **Spacing:** padding `space.1` × `space.2`; badge gap `space.2`.
- **Rules:** 1–2 words; one accent badge per row/card max; badges label — they don't navigate (except filter chips).

### Modals
- **Purpose:** focused, interruptive task/confirmation requiring resolution.
- **Style:** centered `bg.surface` panel, `radius.md`, `shadow.floating`, `z.modal`; scrim `overlay.scrim` at `z.scrim`; close ✕ (icon button) top-right; header `text.title`, body `text.body`, right-aligned footer.
- **Sizes:** `sm` 400px · `md` 560px (default) · `lg` 720px (all `max-width: calc(100vw - 2×page-margin)`).
- **States:** enter (scrim fades; panel rises `distance.md` + fades, `motion.base`/`easing.entrance`) · exit (reverse, `easing.exit`) · **long content** (header + footer stay fixed, body scrolls; divider appears above footer when scrolled) · **mobile** (< `sm`: full-screen sheet, `radius.none`, slide up from bottom) · focus trapped, focus restored to trigger on close.
- **Spacing:** panel padding `space.5`; header→body `space.4`; body→footer `space.5`; footer button gap `space.3`.
- **Rules:** one modal at a time, never stacked; footer primary right-most, cancel to its left; `Esc` and scrim-click close **except** destructive confirmations; `shadow.floating` is intentionally allowed here.

### Empty States
- **Purpose:** communicate "nothing here" and direct the next action.
- **Style:** centered block — optional monochrome icon (`icon.xl`), `text.title` headline, `text.body` in `fg.muted`, one action; no border/shadow; sits on `bg.base`.
- **Variants:** first-use (primary button) · no-results/filter (tertiary "Clear filters") · error/failure (secondary "Retry").
- **Spacing:** icon→headline `space.4`; headline→text `space.2`; text→action `space.5`; max width ~420px; `space.8` vertical padding.
- **Rules:** exactly one clear next action (or none if terminal); plain, specific copy stating what's missing and what to do; reuse one layout across all empty states — only icon/copy/action change.

---

## 9. Motion

| Token | Value | Use |
|---|---|---|
| `duration.instant` | `100ms` | Color/hover state |
| `duration.fast` | `200ms` | Buttons, small transitions |
| `duration.base` | `320ms` | Card/panel/tab transitions |
| `duration.slow` | `600ms` | Hero / image reveals |
| `easing.standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default |
| `easing.entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals, slide-ins |
| `easing.exit` | `cubic-bezier(0.4, 0, 1, 1)` | Dismiss |
| `distance.sm` | `8px` | Micro-shifts (press) |
| `distance.md` | `24px` | Slide/reveal offset |

**Rules:** interactive transitions use `fast`/`base` + `easing.standard`; entrances use `easing.entrance`; exits `easing.exit`. No bounce or scale-pop on press. Animate only `transform`/`opacity`/`color`/`border-color` (never layout properties). Respect `prefers-reduced-motion`: drop all transforms, keep opacity/instant color only.

---

## 10. Accessibility

- **Contrast:** body/UI text ≥ 4.5:1; large text (≥ `title`/24px) ≥ 3:1; UI borders/icons that convey meaning ≥ 3:1. Verify accent-on-neutral and text-over-imagery (add a scrim/overlay when text sits on an image).
- **Focus:** every interactive element shows a visible `shadow.focus` ring on `:focus-visible`; never remove outlines without a replacement.
- **Hit targets:** ≥ 44×44px (the 48px `md` control height satisfies this; `sm`/40px only in pointer-dense contexts).
- **Labels:** every input has a persistent visible label; icon-only buttons require `aria-label`.
- **State is never color-only:** error/success/warning/active/selected must pair color with an icon, text, underline, or border (see Inputs, Badges, Tabs).
- **Modals:** trap focus, restore focus to the trigger on close, `Esc` to dismiss, background `aria-hidden`/inert.
- **Motion:** honor `prefers-reduced-motion`.
- **Structure:** semantic landmarks (`nav`, `main`, `footer`), logical heading order (one `h1`/screen), meaningful `alt` text (decorative images `alt=""`).

---

## 11. Do / Don't

**Do**
- Resolve every color through a semantic token from §3; pick text/border from the §3.4 pairing row for the background.
- Default to light surfaces (`bg.base`, `bg.surface`); reserve `bg.inverse` for menus and overlays.
- Keep neutrals dominant; spend the accent budget on one sky-blue filled element per region.
- Snap every dimension to the §5 scale; use §6 tokens for page margins, columns, and z-index.
- Use the fixed type scale with its defined mobile overrides; emphasize with `text.body-strong`.
- Let imagery fill edge-to-edge and carry the emotion — bright, airy, architectural.
- Default to `shadow.none`; only use `shadow.floating` on the components listed in §7.2.
- Pair color-coded state with an icon or text.
- Align controls to the sizing table heights.

**Don't**
- Don't reference a primitive (`gray-500`, `accent-sky`, etc.) directly in a component.
- Don't put `fg.primary` on a dark background (or any cross-row §3.4 pairing).
- Don't use `bg.inverse` for hero, contact, cards, or content sections — only menus/overlays/scrims.
- Don't use accent color in nav bar backgrounds, section backgrounds, or body text, or spend more than one accent fill per region.
- Don't introduce off-scale spacing (10/18px) or off-scale type (18/20/32px desktop).
- Don't add a third typeface, use italics, or use color/underline for inline emphasis.
- Don't use pill containers or radius > `radius.md` on containers.
- Don't apply shadows to cards, inputs, nav, or badges.
- Don't pad the inside of images or round them past the card edge.
- Don't signal state with color alone.
- Don't stack modals, place two primary buttons in one view, or let tabs wrap to two rows.
- Don't distribute spacing evenly — always pair a dense zone with an open zone.
