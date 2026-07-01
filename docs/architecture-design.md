# PURE EVIL STORE — Frontend Architecture

## Overview
The application follows a **feature-sliced design** mapped to the Next.js App Router paradigm, ensuring scalability, maintainability, and reusability. The architecture adopts atomic design principles specifically for separating UI presentation from business logic and visual effects.

---

## Directory Structure

```txt
src/
├── app/                  # Routing, layouts, and globals.css
├── components/           # Global composite UI (SiteNav, SiteFooter, etc.)
├── features/             # Isolated business logic modules (auth, products, etc.)
├── i18n/                 # next-intl configuration (routing.ts, request.ts)
├── lib/                  # Core utilities and API/infrastructure clients
├── shared/               # Primitive UI elements, constants, shared hooks
└── proxy.ts              # Next.js middleware (next-intl rewrite & routing)
```

---

### 1. `app/` (Next.js App Router)
Responsible ONLY for routing, layouts, metadata, and rendering boundaries.
- `/api`: Backend route handlers.
- `/[locale]`: Internationalized route segments.
- `layout.tsx`: Global root layout.
- `page.tsx`: Landing page wrapper.
- `globals.css`: Global tailwind config and root styling variables.

*Rule:* NEVER place complex business logic directly inside routes. Keep pages as thin wrappers.

```tsx
import { LoginView } from "@/features/auth/views/LoginView"

export default function LoginPage() {
  return <LoginView />
}
```

---

### 2. `features/` (Business Logic Modules)
Encapsulates domain-specific logic. Each feature is fully isolated to keep it independently maintainable.
- `auth/`: Authentication module.
- `products/`: Products and collections module.
- `cart/`: Shopping cart module.
- `orders/`: Order processing module.
- `profile/`: User profile management.

Each feature folder houses its own:
- `components/`: Feature-specific UI components (e.g., `LoginForm.tsx`).
- `views/`: Compositional layers combining components into a full page view (e.g., `LoginView.tsx`).
- `hooks/`: Feature-specific logic hooks (e.g., `useLogin.ts`).
- `services/`: API calls and queries (e.g., `authService.ts`).
- `messages/`: Feature-specific localization files (e.g., `en.json`, `vi.json`).
- `styles/`: Custom feature-specific CSS (e.g., `auth.css`).

*Rule:* Features MUST NOT tightly couple to each other. Communication should happen through shared contracts, types, or public API layers.

---

### 3. `components/` (Global Composite UI)
Global composite UI components that are used across multiple features but are not simple primitive inputs.
- `SiteNav.tsx`: Main horizontal navigation bar.
- `SiteFooter.tsx`: Shared footer.
- `messages/`: Shared localization files (e.g., `en.json`, `vi.json`).

---

### 4. `shared/` (Design System Foundations)
Contains primitive, highly reusable elements decoupled from specific business features.
- `ui/`: Design system primitives (e.g., `button.tsx`, `input.tsx`, `dialog.tsx`).
- `hooks/`: Global reusable utility hooks (e.g., `useMediaQuery.ts`).
- `constants/`: Global constants.
- `types/`: Shared TypeScript interfaces.

*Rule:* Shared UI components MUST be generic, design-system driven, and contain no business logic.

---

### 5. `lib/` (Infrastructure Layer)
Contains configurations and low-level helpers:
- `axios.ts` / `fetcher.ts`
- `env.ts`
- `utils.ts` (Tailwind merge utils, classnames resolver)

---

## UI & Styling Paradigm

### Separation of Concerns (SoC)
1. **Views**: Act strictly as orchestrators. They define page layout composition and pass down props but contain minimal inline styling and zero business logic.
2. **Components**: Focus strictly on rendering specific pieces of UI.
3. **Motion & State Hooks**: Animation orchestration (like delayed reveals and mount tracking) is extracted into custom hooks to keep UI components clean.
4. **Visual Effects (CSS)**: Complex visual effects (gradients, noise, glows, long transition sequences) are extracted into Tailwind `@layer components` within feature-specific CSS files.

### Design System Philosophy
The UI follows a:
- Minimal, dark-first luxury aesthetic
- Brutalist precision & high contrast
- Motion-driven interactive feedback
- Consistent spacing scales: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`

---

## Internationalization (i18n) Architecture

To keep the translation bundle size minimal and prevent translation files from bloating:
1. **Colocated Translations:** Translations are placed in local `messages/` folders within the feature or component that uses them.
2. **Dynamic Request Configuration (`src/i18n/request.ts`):** 
   - The middleware (`src/proxy.ts`) injects the current `x-pathname` header into request headers.
   - The request config reads the path and dynamically imports only the common messages (`src/components/messages/`) and the specific feature messages for the active route.
   - Merges and feeds them to `NextIntlClientProvider`.

---

## Naming Conventions

### Components & Views
Named in `PascalCase`. The component file and exports MUST match.
- `LoginForm.tsx` -> `export function LoginForm() { ... }`
- `LoginView.tsx` -> `export function LoginView() { ... }`

### Hooks
Named in `camelCase` with a `use` prefix.
- `useLogin.ts`
- `useMediaQuery.ts`

### Helper Files & Configs
Named in `camelCase` or `kebab-case`.
- `env.ts`
- `architecture-design.md`

---

## AI Agent Coding Rules

1. **NEVER** place business logic inside app routes.
2. **ALWAYS** isolate feature-specific logic inside `features/[feature]`.
3. **KEEP** components focused and small (ideally 50–150 LOC).
4. **USE** absolute path imports (e.g., `import { Button } from "@/shared/ui/button"`).
5. **NEVER** commit secrets, API keys, or hardcoded sensitive credentials.