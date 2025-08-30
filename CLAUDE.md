# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BoardGameBoost is a community platform for the Yogyakarta Board Game Design Club built with Next.js 15, TypeScript, and Firebase. It helps board game designers manage projects, run playtests, collect feedback, and iterate on their designs. The platform focuses on community-driven feedback and iterative design improvement.

**Project Management**: This project is managed via CCPM (Claude Code Project Management) located in the adjacent ccpm folder. All epics and issues are managed centrally through CCPM. Use `/pm:*` commands from the ccpm folder to manage this project.

## Core Architecture

### Tech Stack

- **Frontend**: Next.js 15 with Turbopack, React 18, TypeScript
- **UI**: Tailwind CSS with shadcn/ui components (Radix UI primitives)
- **Backend**: Firebase (authentication, database, hosting)
- **Styling**: Custom design system with Space Grotesk (headers) and Inter (body) fonts

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - shadcn/ui component library
- `src/components/` - Custom components (dashboard-nav, project-card, icons)
- `src/lib/` - Utilities, data, and TypeScript types
- `src/hooks/` - React hooks
- `docs/` - Project documentation including style blueprint

### Data Models

Key entities defined in `src/lib/types.ts`:

- `User` - Member profiles with points and membership tiers
- `GameProject` - Game development tracking with stages and materials
- `PlayTestSession` - Playtesting session management
- `Feedback` - Structured feedback with ratings and comments
- `GameIteration` - Version control for game iterations

## Development Commands

```bash
# Development server with Turbopack (port 9002)
npm run dev

# Production build
npm run build

# Linting and type checking
npm run lint
npm run typecheck

# Production server
npm start
```

## Design System

Follows the blueprint in `docs/blueprint.md`:

- **Colors**: Soft green primary (#A7D1AB), light green background (#E5EBE3), light orange accent (#E5B9A5)
- **Typography**: Space Grotesk for headings, Inter for body text
- **Components**: Built on shadcn/ui with custom styling
- **Layout**: Sidebar navigation with responsive mobile-first design

## Testing and Quality

Always run these commands before committing:

- `npm run lint` - ESLint checks
- `npm run typecheck` - TypeScript validation
- `npm run build` - Production build verification
