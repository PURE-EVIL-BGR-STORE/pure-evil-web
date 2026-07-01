# PURE EVIL Design System & Core Vibe

This document outlines the core branding, color assets, typography settings, and visual effects for the **Pure Evil Store**. The design philosophy is centered around a **Gothic Luxury / Dark Sigilism** aesthetic: cinematic, high-contrast, obsidian-heavy, and punctuated by striking blood-red accents.

---

## 🎨 Color Palette & Assets

The color system uses CSS variables defined in [globals.css](file:///d:/pure-evil-store/pure-evil-web/src/app/globals.css) and is structured for dark-mode-first screens.

### 🖤 Obsidian & Neutrals (Core Backgrounds)

| Variable | HEX / Value | Role | Usage |
| :--- | :--- | :--- | :--- |
| `--bg` | `#050505` | Obsidian Black | The primary website background. Pitch black for high contrast. |
| `--bg-2` | `#0a0a0a` | Midnight Gray | Background for section headers, ticket tracks, and secondary divs. |
| `--panel` | `#0c0c0c` | Card Background | Base layer for layout cards, product cards, and modals. |
| `--panel-2` | `#101010` | Elevated Panel | Hovered card state or interactive elements requiring depth. |

### 🩸 Brand Accents (Crimson & Blood)

| Variable | HEX / Value | Role | Usage |
| :--- | :--- | :--- | :--- |
| `--red` | `#c5141b` | Blood Red | Brand primary accent. Used for triggers, key focus areas, and underlines. |
| `--red-bright` | `#ff1a1a` | Magma / Neon Red | Hover states, button glows, active states, and focus. |
| `--red-deep` | `#4a0408` | Abyss Maroon | Backdrops, gradient ends, shadow casts, and subtle warnings. |
| `--red-glow` | `rgba(197,20,27,0.35)` | Crimson Aura | Glow filters (backdrop-filters) and shadow highlights for logo elements. |

### 💬 Typography Neutrals (Contrast Text)

| Variable | HEX / Value | Role | Usage |
| :--- | :--- | :--- | :--- |
| `--fg` | `#f5f3f1` | Warm Ivory | High contrast headers, display titles, and body content text. |
| `--muted` | `#b8b5b2` | Warm Muted Gray | General body text, descriptions, and list items. |
| `--faint` | `#8c8885` | Sigil Slate | Category labels, timestamps, placeholders, and inactive status indicators. |
| `--ghost` | `#3e3b39` | Dark Rust | Disabled buttons, inactive border grids, and crossed-out elements. |

---

## ✍️ Typography & Font Pairings

```
Display Header:   CINZEL (Gothic Serif, All Caps, Broad Tracking)
Body Text:        INTER (Sleek Modern Sans-Serif, Thin-to-Medium weights)
Code / UI Specs:  JETBRAINS MONO (Monospaced, Technical details, Specs)
```

1. **Display Font (`--serif` / Cinzel)**:
   - Mood: Art-deco, vintage, luxury, editorial.
   - Recommended weights: `700 (Bold)` or `900 (Black)`.
   - Letter spacing: `0.12em` to `0.46em` (wide tracking for premium presentation).
   - Text transformation: `uppercase` (forced for high editorial visual structure).

2. **Sans Font (`--sans` / Inter)**:
   - Mood: Neutral, highly legible, modern.
   - Recommended weights: `300 (Light)` or `400 (Regular)`.
   - Used for paragraph copy, forms, settings, and general buttons.

3. **Mono Font (`--mono` / JetBrains Mono)**:
   - Mood: Developer, technical, precise, dystopian.
   - Used for label eyebrows (`0.36em` spacing with line prefix), prices, size selectors, and technical specs.

---

## 🌋 Vibe Overlays & Atmospheric Effects

### 1. Film Grain Backdrop (`.grain`)
To provide tactile organic noise over the obsidian colors:
```css
.grain {
  position: fixed; inset: -150%;
  z-index: 9000; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.045;
  mix-blend-mode: screen;
  animation: grain 0.6s steps(2) infinite;
}
```

### 2. Cinematic Vignette (`.vignette`)
Fades the edges of the window to black to draw focus toward the center content:
```css
.vignette {
  position: fixed; inset: 0; z-index: 8000; pointer-events: none;
  background:
    radial-gradient(130% 100% at 50% 0%, transparent 55%, rgba(0,0,0,0.55) 100%),
    radial-gradient(120% 120% at 50% 100%, transparent 60%, rgba(0,0,0,0.6) 100%);
}
```

### 3. Logo Breathing Glow Animation
An organic scaling and filter brightness animation for the logo graphic:
```css
@keyframes breathe {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 42px rgba(197, 20, 27, 0.3)); }
  50% { transform: scale(1.018); filter: drop-shadow(0 0 70px rgba(197, 20, 27, 0.42)); }
}
```

### 4. Slit-Tear Transition Menu (`.pure-evil-nav`)
An interactive slash trigger animation mimicking claw scars slicing open a dimensional void:
- In active state (`.is-torn`), the central red slash disappears, and the top and bottom slashes rotate to form a clean white `X` close trigger.
- Behind it, the left and right canvas panels split apart dynamically (via custom `clip-path` polygons and linear shifts) to reveal the main navigation links.

---

## 📁 Brand Assets Directory

The brand image assets are organized in the `/public` folder:
- **Style Board / Mood Image**: `/public/pure-evil-style-guide.png` — Visual design board showing colors, UI vibe, and typography examples.
- **Master Logos**:
  - `/public/PURE_EVIL_LOGO.png` — Standard bright red sigil.
  - `/public/PURE_EVIL_LOGO_2.png` — Darkened obsidian logo.
  - `/public/PURE_EVIL_LOGO_3.png` — Textured metal sigil.
  - `/public/PURE_EVIL_LOGO_4.png` — Gold metallic logo.
