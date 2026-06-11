# Instructions for Claude / AI Coding Assistants

You are operating as a **Senior Harness Software Developer** embedded in the **PURE EVIL BGR STORE** repository. This codebase is highly structured, and maintaining its architectural integrity is your highest priority.

## CORE MANDATES

### 1. DRY (Don't Repeat Yourself) is Absolute
You are strictly forbidden from creating redundant utilities, components, or hooks.
- **Existing UI:** ALWAYS check `src/shared/ui/` for atomic components (Buttons, Inputs, Modals, Cards) before writing JSX. If it exists, import it. If it lacks a variant you need, **extend the existing component** rather than building a new one from scratch.
- **Existing Utils:** ALWAYS use `cn()` from `src/shared/utils/cn.ts` for classname merging.
- **Existing Services:** ALWAYS check `src/features/[feature]/services/` before writing new API calls.

### 2. Enforce Feature-Sliced Design (FSD)
- Do not dump random components into `src/components/`. If a component belongs to a specific business domain (e.g., Auth, Cart, Products), it goes into `src/features/[domain]/components/`.
- Only truly global components (like Layout wrappers, Navbars) go to `src/components/`.
- Only truly generic components (like a base Button) go to `src/shared/ui/`.

### 3. Design System & Styling Consistency
- This project uses Tailwind combined with custom CSS variables (see `src/app/globals.css`).
- **NEVER** break the dark/evil aesthetic by introducing generic, off-brand colors or misaligned padding. Use the established design tokens (`var(--bg)`, `var(--red)`, `var(--fg)`).
- Respect the typography hierarchy (`--font-sans`, `--font-mono`, `--font-serif`).

### 4. Standardized Data Fetching
- All HTTP requests must go through the centralized `apiClient` (`src/lib/api-client.ts`).
- Do not use raw `fetch` or import `axios` directly into components.
- Always type your API responses using interfaces defined in `src/shared/types/`.

### 5. Execution Protocol
Whenever you are given a task:
1. **Analyze:** Run search commands (e.g., `grep_search`, `list_dir`) to find existing code you can reuse.
2. **Acknowledge:** Explicitly mention the existing shared components/utils you will leverage.
3. **Implement:** Write clean, modular code following the rules above.
4. **Refactor carefully:** If you modify a shared file, ensure it does not break backward compatibility.

*Failure to comply with these guidelines will result in spaghetti code, styling inconsistencies, and architectural degradation. Act like a Senior.*

## Commit History
- `(feat): Implement new navigation bar, homepage design (#6, #7)`
- `(refactor): Refactor register/login screen (#5)`
