# PURE EVIL — DESIGN SYSTEM SPECIFICATIONS
## AI AGENT & FIGMA DESIGN PATTERN REFERENCE

This document serves as the absolute styling reference for the **PURE EVIL** project. It specifies all CSS tokens, spacing values, typography specs, color codes, component behaviors, and Figma alignment parameters. Every developer agent or designer must strictly adhere to these values to maintain a unified brand feeling.

---

## 1. BRAND VISUAL ESSENCE (CRIMSON & OBSIDIAN)
The interface represents **Neo-Sigil Brutalism / Dark Gothic Accent**. It must evoke a feeling of cold luxury, power, tension, and mysterious elite presence. 

- **Primary Motif**: Blood red accentuating deep obsidian surfaces.
- **Accents**: Fine gothic geometric lines, subtle text/box shadows simulating soft red mist.
- **Rules**: Zero rounding (or micro-rounding of maximum 2px), absolute alignment, generous screen-space intervals, and responsive contrast.

---

## 2. COLOR PALETTE SYSTEM (RED & BLACK)

The system supports a dual-theme configuration (Dark by default, Light available for adaptability). Theme switching is controlled via standard system media queries or explicit `html.dark` / `html.light` classes.

### 2.1 Theme Swatch Mapping

| Token Name | CSS Variable | Light Theme Hex | Dark Theme Hex | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Obsidian Main** | `--background` / `--bg-primary` | `#FCFCFC` | `#050505` | Canvas background |
| **Obsidian Soft** | `--bg-secondary` | `#F4F4F4` | `#0C0C0C` | Component/Card surfaces |
| **Gothic Surface** | `--surface` | `#EBEBEB` | `#121212` | Hovered surfaces, dropdown wells |
| **Silver / Charcoal**| `--foreground` / `--text-primary` | `#111111` | `#F5F5F5` | Primary text and major icons |
| **Ash / Grey** | `--text-secondary` | `#555555` | `#9E9E9E` | Secondary/description text |
| **Faded Grey** | `--text-muted` | `#888888` | `#525252` | Labels, helper texts, placeholders |
| **Gothic Line** | `--border-soft` | `#E1E1E1` | `#1F1F1F` | Default borders, subtle separators |
| **Blood Red Main** | `--brand-red` / `--accent` | `#C80000` | `#D30000` | Active states, primary borders, accents |
| **Blood Red Dark** | `--brand-red-dark` | `#800000` | `#660000` | Shadows, glowing shadows, depth |
| **Blood Red Bright**| `--brand-red-bright` / `--accent-hover`| `#FF1A1A` | `#FF1A1A` | Focused borders, active state hovers |

### 2.2 Aesthetic Shadows & Effects
- **Gothic Text Glow**:
  ```css
  text-shadow: 0 2px 8px var(--brand-red-dark);
  ```
- **Obsidian Box Glow (Active Card/Input)**:
  ```css
  box-shadow: 0 0 12px var(--accent-shadow); /* accent-shadow is rgba of brand-red-dark */
  ```

---

## 3. TYPOGRAPHY SYSTEM

We use Next.js default **Geist Sans** (fallback to standard grotesque fonts: Inter, Space Grotesk, or Arial). All headings are set to **uppercase** to project a dominant, architectural atmosphere.

### 3.1 Typography Scale Reference Table

| Level | Size (rem) | Size (px) | Line Height | Letter Spacing | Font Weight | Notes / Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Display)** | `3.5rem` (Desktop)<br>`2.5rem` (Mobile) | 56px<br>40px | `1.1` | `0.25em` (25%) | `800` (Extra Bold) | Brand logo alternatives, hero headers |
| **H2 (Title)** | `2.0rem` (Desktop)<br>`1.5rem` (Mobile) | 32px<br>24px | `1.2` | `0.2em` (20%) | `700` (Bold) | Main page titles, card headers |
| **H3 (Subtitle)**| `1.25rem` (Desktop)<br>`1.125rem` (Mobile)| 20px<br>18px | `1.3` | `0.15em` (15%) | `600` (Semi-Bold) | Section headers, panel titles |
| **H4 (Section)** | `1.0rem` | 16px | `1.4` | `0.12em` (12%) | `600` (Semi-Bold) | Component sub-headers |
| **H5 (Label)** | `0.875rem` | 14px | `1.4` | `0.1em` (10%) | `500` (Medium) | Small headings, button labels |
| **H6 (Metadata)**| `0.75rem` | 12px | `1.5` | `0.08em` (8%) | `500` (Medium) | Small metadata, helper text |
| **Body (Large)** | `1.125rem` | 18px | `1.6` | `0.02em` (2%) | `400` (Regular) | Intro paragraphs |
| **Body (Normal)**| `0.875rem` | 14px | `1.6` | `0.02em` (2%) | `400` (Regular) | General paragraph texts |
| **Small text** | `0.75rem` | 12px | `1.5` | `0.05em` (5%) | `400` (Regular) | Errors, validation alerts |
| **Micro text** | `0.625rem` | 10px | `1.4` | `0.2em` (20%) | `300` (Light) | Sigil subtitles, absolute tiny overlays |

---

## 4. SPACING & LAYOUT SYSTEM

Spacing uses a strict vertical grid system with pixel mappings. Spacing values must match Tailwind sizes or direct rem configurations.

| Token | Rem Value | Pixel Value | Typical Application |
| :--- | :--- | :--- | :--- |
| **`xxs`** | `0.25rem` | 4px | Inline icon-to-text spacing, micro gaps |
| **`xs`** | `0.5rem` | 8px | Label-to-input gap, inline element list margin |
| **`sm`** | `0.75rem` | 12px | Underline decorative sizes, metadata gaps |
| **`md`** | `1.0rem` | 16px | Padding inside small tables, row gap |
| **`lg`** | `1.5rem` | 24px | Gap between form groups, default cell padding |
| **`xl`** | `2.0rem` | 32px | Default padding inside auth cards, card gap |
| **`2xl`** | `3rem` | 48px | Margin between headers and forms |
| **`3xl`** | `4rem` | 64px | Top and bottom block padding |
| **`4xl`** | `6rem` | 96px | Hero page vertical empty space, separation |
| **`5xl`** | `8rem` | 128px | Extreme gothic minimalist layout offsets |

---

## 5. INTERACTIVE & INPUT COMPONENT SPECIFICATIONS

### 5.1 Redesigned Input UI Style
Inputs must not look like standard, cheap line inputs. They should be presented as **recessed obsidian boxes** with immediate tactile states.

- **Structure**: Box border layout.
- **Corners**: `0px` border-radius (sharp corners).
- **Background**: `rgba(5, 5, 5, 0.4)` (transparent background blending over card blur).
- **Default Border**: `1px solid var(--border-soft)`.
- **Hover State**: Border shifts to `1px solid rgba(211, 0, 0, 0.5)` (semi-transparent brand red).
- **Focus State**:
  - Border transitions to `1px solid var(--brand-red-bright)` (`#FF1A1A`).
  - Outer glow: `box-shadow: 0 0 10px rgba(211, 0, 0, 0.15)`.
- **Label Color Change**: The label text shifts to `var(--brand-red)` on focus of the sibling input. Set up parent `group` class on form controls to enable `group-focus-within:text-brand-red`.
- **Error State**: Border shifts to `1px solid var(--danger)` with text description in `var(--danger-soft)`.

### 5.2 Autofill Glitch Prevention (CSS)
Browsers inject default background colors (`#E8F0FE` / white) and black text when auto-filling fields. To preserve the dark UI:
```css
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: var(--text-primary) !important;
  -webkit-box-shadow: 0 0 0px 1000px var(--bg-primary) inset !important;
  box-shadow: 0 0 0px 1000px var(--bg-primary) inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
```

### 5.3 Button Specifications
- **Primary Button**:
  - Background: `var(--text-primary)` (pure light text color/white/silver)
  - Color: `var(--bg-primary)` (pure dark obsidian/black)
  - Hover background: `transparent`, hover text: `var(--brand-red-bright)`, hover border: `var(--brand-red-bright)`
  - Transition duration: `500ms` with `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Secondary Button**:
  - Background: `transparent`, Border: `1px solid var(--border-soft)`
  - Color: `var(--text-secondary)`
  - Hover background: `var(--surface)`, Hover border: `var(--brand-red)`

---

## 6. FIGMA IMPORT / DESIGN TRANSLATION GUIDE

For designers translating this code-first layout into Figma components:

1. **Grids**: Use a 12-column desktop grid with a `32px` margin and `24px` gutter. Centered login layouts must use a fixed `448px` width (28rem) card.
2. **Text Styles**:
   - `h1`: 56pt, Bold, Tracking +25%.
   - `h2`: 32pt, Bold, Tracking +20%.
   - `h3`: 20pt, Semi-Bold, Tracking +15%.
   - `p (body)`: 14pt, Regular, Auto height, Tracking +2%.
3. **Corner Radius**: Set all button, input, and card corner roundings to `0` or `2` pixels max.
4. **Color Styles**: Create Figma color styles mapped exactly to the CSS variables in Section 2.1.