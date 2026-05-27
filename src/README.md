# PURE EVIL BGR STORE - Source Folder

This directory (`src`) contains all the source code for the PURE EVIL BGR STORE application.

## Project Structure

The `src` folder is organized into the following directories:

- **`/app`**: This is where the main application logic resides, following the Next.js App Router structure. It includes:
  - **`/api`**: For all your API route handlers.
  - **`layout.tsx`**: The root layout for the application.
  - **`page.tsx`**: The main page of the application.
  - **`globals.css`**: Global styles for the application.

- **`/components`**: This folder is for storing reusable UI components that can be used across the application. Examples include buttons, modals, and cards.

- **`/features`**: This directory contains the implementation of specific application features. Each feature can have its own set of components, hooks, and services.

- **`/hooks`**: Custom React hooks are stored here. These hooks can encapsulate and reuse stateful logic.

- **`/lib`**: This directory is for utility functions, helper scripts, and external library configurations.

- **`/middleware`**: This folder is for Next.js middleware, which allows you to run code before a request is completed.

- **`/shared`**: This directory contains code that is shared across different parts of the application. It is further divided into:
  - **`/types`**: For shared TypeScript types and interfaces.
  - **`/ui`**: For basic UI elements that are shared across multiple components.

- **`/styles`**: This folder is for storing global and component-specific styles. You can have global stylesheets or CSS modules here.
