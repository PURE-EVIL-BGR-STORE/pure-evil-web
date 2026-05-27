# PURE EVIL — UI/UX DESIGN SYSTEM
## AI AGENT DESIGN PATTERN DOCUMENT

> Design Language:
> Neo Sigil Brutalism / Dark Celestial Sigilism

---

# 1. CORE BRAND FEELING

The UI must feel:

- cold
- elite
- mysterious
- oppressive
- luxurious
- dangerous
- futuristic
- minimal but dominant

This is NOT cyberpunk.
This is NOT colorful gaming UI.
This is NOT soft neumorphism.

The interface should feel like:
- forbidden technology
- underground luxury brand
- cult organization dashboard
- premium dark fashion brand
- anime antagonist energy

---

# 2. VISUAL REFERENCES

Primary inspirations:
- Berserk (Griffith / Eclipse aesthetic)
- Evangelion UI typography
- Dark sigil tattoos
- Gothic cathedral geometry
- Brutalist fashion websites
- Rick Owens aesthetic
- Balenciaga dark campaigns
- Arcane / dystopian interfaces
- FromSoftware menus
- Death Note minimal tension

---

# 3. DESIGN PRINCIPLES

## 3.1 Minimal Surface Noise

Avoid:
- unnecessary gradients
- playful illustrations
- colorful icons
- random shadows
- excessive borders

Use:
- empty space
- tension
- contrast
- large typography
- sharp alignment

---

## 3.2 Strong Visual Hierarchy

The UI should always guide attention through:
1. Symbol / Logo
2. Headline
3. Main CTA
4. Product Visual
5. Secondary Details

---

## 3.3 Luxury Darkness

Black is NOT enough.

Use:
- deep charcoal
- graphite
- gunmetal
- muted silver
- dark crimson accents
- icy blue highlights

Avoid:
- pure white backgrounds
- saturated colors
- neon overload

---

# 4. COLOR SYSTEM

## Primary Colors

```css
--bg-primary: #050505;
--bg-secondary: #0D0D0D;
--surface: #121212;
--surface-soft: #1A1A1A;

--text-primary: #F5F5F5;
--text-secondary: #9A9A9A;

--accent: #8BA6FF;
--accent-dark: #4D5B89;

--danger: #6A0F1A;
--silver: #BFC7D5;
```

---

# 5. TYPOGRAPHY SYSTEM

## Headlines

Style:
- uppercase
- large spacing
- sharp clean fonts
- brutal luxury

Recommended Fonts:
- Space Grotesk
- Satoshi
- General Sans
- Neue Montreal
- Geist
- Bebas Neue (display only)

---

## Typography Rules

### Headlines
- font-weight: 700–900
- letter-spacing: 0.1em
- uppercase preferred

### Body Text
- muted
- clean
- readable
- never playful

---

# 6. LAYOUT SYSTEM

## Layout Philosophy

Use:
- asymmetrical balance
- large empty spaces
- oversized hero sections
- centered sigils/logos
- cinematic spacing

Avoid:
- crowded dashboards
- too many cards
- boxed layouts everywhere

---

## Grid

Preferred:
- 12-column grid
- large gutters
- spacing consistency

Spacing scale:
```txt
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
```

---

# 7. COMPONENT DESIGN RULES

## Buttons

### Primary Button

Style:
- dark
- sharp
- minimal
- high contrast

Properties:
```css
background: #F5F5F5;
color: #050505;
border-radius: 2px;
padding: 14px 24px;
font-weight: 700;
letter-spacing: 0.08em;
text-transform: uppercase;
```

Hover:
- slight opacity shift
- subtle glow
- slow transition

---

## Secondary Button

```css
background: transparent;
border: 1px solid #2A2A2A;
color: #F5F5F5;
```

---

# 8. CARD DESIGN

Cards should feel:
- tactical
- premium
- clean

Use:
- soft borders
- subtle contrast
- minimal blur
- dark surfaces

Avoid:
- heavy shadows
- bright outlines
- colorful gradients

---

# 9. ICONOGRAPHY

Icons must be:
- thin
- geometric
- sharp
- minimal

Use:
- Lucide
- custom sigils
- monochrome icons

Avoid:
- cartoon icons
- emoji style
- colorful SVG packs

---

# 10. ANIMATION SYSTEM

Animations should feel:
- slow
- cinematic
- intentional
- smooth

Avoid:
- bouncy effects
- playful easing
- fast movement

Preferred easing:
```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Preferred duration:
```css
200ms – 600ms
```

---

# 11. UI EFFECTS

Allowed:
- grain/noise texture
- subtle blur
- glass overlays
- ambient glow
- eclipse halos
- thin lines
- sigil overlays

Avoid:
- rainbow glow
- RGB gamer effect
- overexposed bloom

---

# 12. PRODUCT PAGE STYLE

Products should feel:
- rare
- collectible
- elite

Use:
- oversized imagery
- cinematic crop
- monochrome environments
- fashion editorial layout

---

# 13. APP ICON DESIGN

Rules:
- recognizable at 24x24
- one symbol only
- high silhouette clarity
- minimal internal detail

Best choices:
- stylized "P"
- eclipse eye
- sigil emblem
- mirrored rune

---

# 14. BRAND WORDS

Allowed Vocabulary:
- ascend
- eclipse
- void
- pure
- cult
- fallen
- divine
- abyss
- halo
- omen
- sigil
- throne

Avoid:
- cute
- fun
- colorful
- happy
- casual

---

# 15. UI GENERATION PROMPT TEMPLATE

## For AI UI Generation

```txt
Create a dark luxury brutalist UI inspired by Berserk, gothic sigilism, and futuristic fashion brands.

Style:
- cinematic
- minimal
- elite
- mysterious
- sharp geometry
- dark monochrome palette
- silver accents
- subtle glow
- oversized typography
- asymmetrical layout
- premium streetwear aesthetic

Avoid:
- colorful UI
- playful components
- cartoon aesthetics
- excessive gradients
- generic SaaS layouts

Use:
- dark backgrounds
- elegant spacing
- fashion editorial composition
- sharp buttons
- atmospheric visuals
- minimalist icons
```

---

# 16. FRONTEND STACK RECOMMENDATION

Recommended:
- Next.js 15
- TailwindCSS
- Framer Motion
- shadcn/ui
- Lenis smooth scroll
- GSAP (hero animations only)

---

# 17. FINAL DESIGN GOAL

The interface should make users feel:

> "This brand looks dangerous, expensive, and unforgettable."

NOT:
> "This looks like another generic anime clothing store."