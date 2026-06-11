# PURE EVIL BGR STORE - Source Folder

This directory (`src`) contains all the source code for the PURE EVIL BGR STORE application.

## Project Structure & Architecture

The `src` folder is organized following a modular, **feature-based architecture** (Feature-Sliced Design) combined with atomic design principles for UI.

- **`/app`**: Next.js App Router root. Contains all the application pages, layouts, and API routes.
  - **`/api`**: For all API route handlers.
  - **`(routes)`**: Grouped routes for authentication, dashboard, etc.

- **`/features`**: The core of the business logic. Instead of grouping by file type (e.g., all hooks together), code is grouped by feature (e.g., `auth`, `products`). Each feature module is self-contained and may include:
  - **`/components`**: UI components specific to this feature (e.g., `LoginForm`).
  - **`/hooks`**: Custom hooks specific to this feature (e.g., `useLoginForm`).
  - **`/views`**: Page-level components that compose smaller components (e.g., `LoginView`).
  - **`/services`**: API calls and business logic for the feature.

- **`/shared`**: Foundational code that is shared across multiple features or the entire application.
  - **`/ui`**: Atomic, highly reusable UI components (e.g., `Input`, `Button`, `Sigil`). These should be "dumb" components with no business logic.
  - **`/types`**: Global TypeScript types and interfaces.
  - **`/utils`**: General utility functions.

- **`/components`**: Composite UI components that are used globally but are constructed from multiple atomic `shared/ui` elements (e.g., complex modals, global navigation headers, application layout wrappers).

- **`/lib`**: Configuration for external libraries (e.g., Prisma client, Supabase client, formatting tools).

- **`/styles`**: Global CSS files and Tailwind configurations.
