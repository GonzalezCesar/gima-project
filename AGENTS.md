# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

GIMA is an asset management and maintenance tracking application built with Next.js 16 App Router, React 19, and TypeScript.

## Commands

```bash
# Development
pnpm dev          # Start dev server at http://localhost:3000

# Build & Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router and React Compiler enabled
- **React 19** with strict mode TypeScript
- **Tailwind CSS 4** via `@tailwindcss/postcss` plugin
- **pnpm** as package manager

### Path Alias
Use `@/*` to import from `src/` (e.g., `import { foo } from "@/lib/utils"`).

### Directory Structure
```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── auth/         # Authentication routes (login)
│   └── dashboard/    # Main application routes
│       ├── activos/       # Asset management
│       ├── mantenimiento/ # Maintenance tracking
│       └── reportes/      # Reports
├── lib/              # Shared utilities and database helpers
├── services/         # Data services and API integration
└── types/            # TypeScript type definitions
```

### Styling
- Uses Tailwind CSS 4 with CSS-first configuration in `globals.css`
- Custom theme variables: `--color-background`, `--color-foreground`
- Font variables: `--font-sans` (Geist), `--font-mono` (Geist Mono)
- Dark mode supported via `prefers-color-scheme`

### ESLint
Uses flat config (ESLint 9) with `next/core-web-vitals` and `next/typescript` presets.
