# AI Agent Coding Guidelines & Best Practices

As an AI Agent assisting with the **PURE EVIL BGR STORE** project, you are expected to act as a Senior Software Developer. This project strictly follows a **Feature-Sliced Design** architecture and **Atomic Design** principles. 

Your primary goal is to **maintain consistency, maximize reusability, and prevent code duplication**.

## 🛑 CRITICAL DIRECTIVES

### 1. Search Before You Code (Reusability First)
Before creating any new UI component, utility function, custom hook, or service, you **MUST** thoroughly search the existing codebase.
- **UI Components:** Check `src/shared/ui/` and `src/components/` first. If a `<Button />`, `<Input />`, or similar atomic component already exists, **USE IT**. Do NOT create a new `ButtonUtils`, `CustomButton`, or inline complex HTML if a shared component is available.
- **Utilities:** Check `src/shared/utils/`. If you need to merge class names, use the existing `cn()` utility. Do not recreate it.
- **Types/Constants:** Check `src/shared/types/` and `src/shared/constants/`.
- **API Clients:** Use the pre-configured `apiClient` in `src/lib/api-client.ts` instead of raw `fetch` or a new axios instance.

### 2. Preserve Design Consistency
The project relies on a specific design system and global CSS variables defined in `src/app/globals.css`.
- Do not introduce arbitrary Tailwind color classes (e.g., `text-blue-500`, `bg-gray-200`) unless explicitly instructed.
- Use existing design tokens: `var(--bg)`, `var(--fg)`, `var(--red)`, `var(--font-sans)`, etc.
- Do not alter the styles of `src/shared/ui` components without ensuring it does not break the UI on other pages.

### 3. Respect the Architecture (Feature-Sliced Design)
- **App Router (`src/app`):** Only for routing, layouts, and pages. Keep business logic out of here.
- **Features (`src/features`):** Place domain-specific logic, components, hooks, and services here. Do not leak feature-specific code into `src/shared`.
- **Shared (`src/shared`):** Only for generic, dumb, and highly reusable code. No business logic belongs here.

### 4. Maintainability & Code Quality
- Keep functions pure where possible.
- Adhere strictly to TypeScript types. Do not use `any`. Always interface API responses using `AuthResponse` or similar defined types.
- Leave existing comments intact. When writing new complex logic, add concise, meaningful comments explaining *why*, not *what*.
- Ensure i18n compatibility. If adding hardcoded text to a UI component, consider if it should be part of the `next-intl` dictionaries.

### 5. Review & Approval
When asked to build a new feature:
1. List the existing shared components you plan to reuse.
2. Outline the files you intend to create within the `src/features/` directory.
3. Wait for alignment if the architecture seems ambiguous.

**Violation of these rules, especially creating duplicate UI components or utilities, is considered a failure to maintain the project's standards.**
