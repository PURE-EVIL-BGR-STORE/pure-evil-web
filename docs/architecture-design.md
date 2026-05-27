# PURE EVIL BGR STORE — Frontend Architecture

# Architecture Design: PURE EVIL BGR STORE

## Overview
The application follows a **feature-sliced design** mapped to the Next.js App Router paradigm, ensuring scalability, maintainability, and reusability. The architecture adopts atomic design principles specifically for separating UI presentation from business logic and visual effects.

## Directory Structure

### 1. `app/` (Next.js App Router)
Handles routing, layout composition, and data fetching entries.
- `/api`: Backend route handlers.
- `/(auth)`: Route group for authentication pages.
- `layout.tsx`: Global root layout.
- `page.tsx`: Landing page.

### 2. `shared/` (Cross-feature Foundations)
Contains atomic, highly reusable elements decoupled from specific business features.
- `ui/`: Pure functional components (Buttons, Inputs, Cards, Typography, Icons/Sigils).
- `styles/`: Global CSS variables, design tokens, utility classes, and global animations.
- `types/`: Global TypeScript interfaces.
- `lib/`: Core utilities (e.g., API clients, formatters).

### 3. `features/` (Business Logic Modules)
Encapsulates domain-specific logic to keep it isolated and independently maintainable.
- `auth/`: Authentication module.
  - `login/`: Sub-module for the login page.
    - `components/`: Feature-specific UI components (e.g., `login-form`, `brand-mark`).
    - `hooks/`: Feature-specific logic (e.g., `use-login-form`, `use-login-motion`).
    - `views/`: Compositional layers combining components into a full page view (e.g., `login-view`).
    - `styles/`: Feature-specific CSS for complex effects (e.g., `login.css`).

### 4. `components/` (Global Composite UI)
For larger UI blocks used globally but made from smaller `shared/ui` pieces (e.g., global navigation, footers, complex interactive modals).

## UI & Styling Paradigm

### Separation of Concerns (SoC)
1. **Views (`views/login-view.tsx`)**: Act strictly as orchestrators. They define the layout composition and pass down state/props but contain minimal inline styling and zero business logic.
2. **Components (`components/*.tsx`)**: Focus strictly on rendering specific pieces of UI. They are broken down by their conceptual role (e.g., `atmosphere-background` for purely visual backgrounds, `auth-card` as a wrapper, `login-form` for interactive inputs).
3. **Motion & State (`hooks/*.ts`)**: Animation orchestration (like delayed reveals and mount tracking) is extracted into custom hooks (e.g., `use-login-motion`) to keep the View clean.
4. **Visual Effects (`styles/*.css`)**: Complex visual effects (gradients, noise, glows, long transition sequences) are extracted into Tailwind `@layer components` within feature-specific CSS files (e.g., `login.css`). This removes horizontal scroll from JSX and standardizes repeated effects.

### CSS Layering Strategy
- **Base**: Global resets and native element styling.
- **Components**: Extracted complex Tailwind patterns (e.g., `.auth-card-glow`, `.login-atmosphere`).
- **Utilities**: One-off overrides (handled directly by standard Tailwind classes in JSX).

## Best Practices Enforced
- **No inline styles** for complex atmospheres; use extracted CSS layers.
- **No "God Components"**: Break down views into logical chunks (Shell, Background, Card, Form).
- **Reusable Primitives**: Inputs and Buttons must come from `shared/ui`.
- **Hook-driven Logic**: Forms and Animations rely on custom hooks.

# Overview

This project follows a scalable enterprise frontend architecture using:

- Next.js 16 App Router
- TypeScript
- TailwindCSS
- Feature-Based Structure
- Design System Principles
- AI-Agent Readability Standards

The architecture is optimized for:

- Scalability
- Maintainability
- Team collaboration
- Predictable structure
- Fast onboarding
- AI-assisted development

---

# Root Structure

```txt
src/
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── middleware/
├── shared/
├── styles/
```

---

# 1. app/

The `app/` directory is ONLY responsible for:

- Routing
- Layouts
- Metadata
- Route groups
- Loading states
- Error boundaries
- Server Components boundaries

NEVER place business logic directly inside routes.

---

## Example

```txt
app/
├── layout.tsx
├── page.tsx
├── globals.css
│
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   └── loading.tsx
│
├── api/
│   └── auth/
│       └── route.ts
```

---

# Route Philosophy

Each route should be VERY thin.

GOOD:

```tsx
import { LoginView } from "@/features/auth/views/login-view";

export default function LoginPage() {
  return <LoginView />;
}
```

BAD:

```tsx
export default function LoginPage() {
  // 400 lines of business logic
}
```

---

# 2. features/

The `features/` directory contains ALL business/domain logic.

Each feature is fully isolated.

---

## Example

```txt
features/
├── auth/
│   ├── components/
│   ├── views/
│   ├── hooks/
│   ├── services/
│   ├── stores/
│   ├── schemas/
│   ├── types/
│   └── utils/
│
├── products/
├── cart/
├── checkout/
├── user/
└── admin/
```

---

# Feature Rules

Each feature should own:

- UI related to the feature
- Hooks
- API calls
- Validation schemas
- Types
- State management
- Business logic

Features MUST NOT tightly couple to each other.

Communication should happen through:

- shared/
- lib/
- API contracts

---

# 3. components/

Global reusable application components.

Use this ONLY for generic components reused across multiple features.

---

## Example

```txt
components/
├── layout/
├── navigation/
├── modals/
├── providers/
├── animations/
└── marketing/
```

---

# Component Rules

If a component is tightly related to ONE feature:

→ place it inside `features/`

If reused globally:

→ place it inside `components/`

---

# 4. shared/

The shared design system layer.

Contains primitive reusable UI and shared contracts.

---

## Example

```txt
shared/
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   ├── dialog.tsx
│   └── card.tsx
│
├── constants/
├── types/
├── configs/
└── validators/
```

---

# Shared UI Rules

Shared UI components MUST:

- Be generic
- Be reusable
- Have no business logic
- Have no feature dependency
- Be design-system driven

---

# 5. hooks/

Global reusable hooks.

---

## Example

```txt
hooks/
├── use-mobile.ts
├── use-debounce.ts
├── use-local-storage.ts
└── use-scroll-position.ts
```

---

# Hook Rules

Global hooks only.

Feature-specific hooks belong inside:

```txt
features/[feature]/hooks/
```

---

# 6. lib/

Infrastructure layer.

Contains:

- API clients
- Configs
- Helpers
- External integrations
- Utility functions

---

## Example

```txt
lib/
├── axios.ts
├── fetcher.ts
├── env.ts
├── utils.ts
├── auth.ts
├── stripe.ts
└── logger.ts
```

---

# 7. middleware/

Request interception layer.

Used for:

- Authentication
- Redirects
- Security
- Headers
- Edge logic

---

# 8. styles/

Global styling architecture.

---

## Example

```txt
styles/
├── globals.css
├── typography.css
├── animations.css
├── themes.css
└── utilities.css
```

---

# Design System Philosophy

The UI system follows:

- Minimal
- Dark-first
- Cyberpunk luxury
- Brutalist precision
- High contrast
- Motion-driven feedback
- Clean spacing hierarchy

---

# UI Rules

## Spacing

Use consistent spacing scale:

```txt
4px
8px
12px
16px
24px
32px
48px
64px
```

---

## Radius

Use consistent rounded system:

```txt
rounded-md
rounded-xl
rounded-2xl
```

Avoid random radius values.

---

## Typography

Use clear hierarchy:

```txt
text-xs
text-sm
text-base
text-lg
text-xl
text-2xl
text-4xl
```

---

## Shadows

Prefer subtle layered shadows.

Avoid heavy glow spam.

---

## Animation

Use animation ONLY when it improves:

- Feedback
- Focus
- Hierarchy
- Interactivity

Avoid decorative motion spam.

---

# AI Agent Coding Rules

AI agents MUST follow these rules:

---

## 1. NEVER place business logic inside app routes

Routes are composition layers ONLY.

---

## 2. ALWAYS isolate features

Business logic belongs in:

```txt
features/[feature]
```

---

## 3. KEEP components small

Preferred:

- 50–150 LOC per component

Avoid:

- 500+ line mega components

---

## 4. USE composition over inheritance

Prefer:

```tsx
<Card>
  <CardHeader />
  <CardContent />
</Card>
```

Avoid giant prop APIs.

---

## 5. NEVER duplicate UI patterns

Create reusable primitives.

---

## 6. USE absolute imports

GOOD:

```tsx
import { Button } from "@/shared/ui/button";
```

BAD:

```tsx
import { Button } from "../../../shared/ui/button";
```

---

# Naming Convention

---

## Components

```txt
PascalCase
```

Example:

```txt
LoginForm.tsx
ProductCard.tsx
```

---

## Hooks

```txt
camelCase with use prefix
```

Example:

```txt
useLogin.ts
useCart.ts
```

---

## Files

```txt
kebab-case
```

Example:

```txt
login-form.tsx
product-card.tsx
```

---

# State Management

Preferred order:

1. Local state
2. URL state
3. Context
4. Zustand
5. Server cache

Avoid global state abuse.

---

# Data Fetching

Preferred:

- Server Components
- Server Actions
- React Query (client cache)
- Streaming/Suspense

Avoid unnecessary client fetching.

---

# Performance Rules

ALWAYS:

- Lazy load heavy components
- Use dynamic imports
- Optimize images
- Avoid unnecessary rerenders
- Memoize expensive computations
- Keep bundle size minimal

---

# Security Rules

NEVER:

- Expose secrets client-side
- Trust frontend validation only
- Store sensitive tokens insecurely
- Use unsafe HTML rendering

---

# Final Philosophy

The codebase should feel:

- Predictable
- Structured
- Minimal
- Modular
- Fast
- Elegant
- Maintainable
- AI-readable
- Enterprise-ready