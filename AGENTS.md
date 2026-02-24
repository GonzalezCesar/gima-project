# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

GIMA (Gestión Inteligente de Activos y Mantenimiento) is an asset management and maintenance tracking application built with Next.js 16 App Router, React 19, and TypeScript. The UI is entirely in Spanish.

## Commands

```bash
pnpm dev       # Start dev server at http://localhost:3000
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run ESLint (flat config, ESLint 9)
```

No test framework is currently configured.

## Architecture

### Tech Stack
- **Next.js 16** with App Router, React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- **React 19** with strict TypeScript
- **Tailwind CSS 4** via `@tailwindcss/postcss` + `tw-animate-css`
- **shadcn/ui** (new-york style, RSC-enabled) — config in `components.json`, UI primitives in `src/components/ui/`
- **lucide-react** for icons
- **pnpm** as package manager (lockfile committed; `package-lock.json` is gitignored)

### Path Alias
`@/*` maps to `src/*` (e.g., `import { cn } from "@/lib/utils"`).

### App Routing & Layout
- `src/app/layout.tsx` — Root layout. Loads two local fonts: **Microgramma** (`--font-microgramma`) and **Archivo** (`--font-archivo`). Wraps all pages in `<MainLayout>`.
- `src/components/layout/MainLayout.tsx` — Client component. Provides `SidebarProvider` context and conditionally renders `<Sidebar>` (hidden on `/auth/*` routes).
- `src/app/page.tsx` — Root page redirects to `/auth/login`.

Top-level routes (all under `src/app/`):
- `auth/login` — Login page (client-side only, no real auth backend yet)
- `dashboard` — Main dashboard with stat cards and chart placeholder
- `mantenimiento/` — Maintenance orders list, calendar view, new order form
- `categorias-activos` — Asset categories
- `reportes` — Reports
- `asistencia` — Attendance (has its own nested layout)
- `configuracion/` — Settings hub with sub-pages: `User`, `idiomas`, `ubicaciones`, `notificaciones`, `seguridad`, `repuestos`, `ia`

### Current Data Layer
There is **no database or API backend yet**. The app uses:
- `src/utils/mockUsers.ts` and `src/utils/mockMantenimiento.ts` — Static mock data arrays
- `src/data/categories.ts` — Static asset category data
- `src/lib/db.ts` and `src/services/dataService.ts` — Empty placeholder files for future DB/service integration
- `src/types/` — TypeScript interfaces: `User`, `UserEstado` (in `user.ts`); `Orden`, `OrdenEstado`, `Prioridad`, `TipoMantenimiento` (in `mantenimiento.ts`); `index.ts` is empty

When connecting a real backend, implement data-fetching functions in `dataService.ts` and use the existing type definitions. Components already handle missing data gracefully (showing `—` placeholders).

### Component Organization
- `src/components/ui/` — Reusable UI primitives (Card, ChartPlaceholder, DeleteAlerta, SidebarContext)
- `src/components/layout/` — App shell: Sidebar, MainLayout, Header, DashboardHeader
- `src/components/dashboard/` — Dashboard-specific (StatCard)
- `src/components/configuracion/` — Settings-specific (TablaDeCategorias, filaDeCategorias)
- `src/components/user/` — User management (UserTable, UserRow, UserModal)

### Styling
- Tailwind CSS 4 with CSS-first configuration in `src/app/globals.css`
- Custom brand colors defined as CSS variables: `--color-gima-blue` (#0066FF), `--color-gima-navy` (#0B2545), `--color-gima-light` (#F0FDFA), `--color-gima-gray` (#64748B)
- Dark mode via `.dark` class (not `prefers-color-scheme`), toggled with `@custom-variant dark (&:is(.dark *))`
- shadcn/ui design tokens (oklch-based) for semantic colors: `--primary`, `--secondary`, `--destructive`, `--muted`, etc.
- Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for conditional class composition

### Conventions
- All page components are client components (`"use client"`) since there is no server-side data fetching yet
- The Sidebar navigation uses a dark navy background (`#001F3F`) with active-state highlighting
- Component naming: PascalCase for files and exports; Spanish for domain terms (e.g., `Orden`, `mantenimiento`, `activos`)
