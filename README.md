# EVA Domain Assistant (Workspace Booking Portal)

React + Fluent UI application for booking and administering AI workspaces.

## Current Status

- Fluent UI migration complete across active screens
- Spark-specific runtime/hooks removed (`@github/spark/*`, `useKV`)
- Sonner toast dependency removed; validation feedback uses `window.alert`
- Legacy `src/components/ui/*` modules removed from repository
- App persistence now uses browser localStorage (`src/hooks/use-local-storage-state.ts`)

## Tech Stack

- React 19 + TypeScript + Vite
- Fluent UI React v9 (`@fluentui/react-components`, `@fluentui/react-icons`)
- Browser localStorage persistence via `src/hooks/use-local-storage-state.ts`
- Native form feedback (`window.alert`) for validation and completion notices

## Screen Inventory (Systematic Scan)

All user-visible screens currently mounted by the app shell:

1. `Workspace Catalog` — `src/components/WorkspaceCatalog.tsx`
2. `Booking Dialog` (3-step wizard) — `src/components/BookingDialog.tsx`
3. `My Bookings` — `src/components/MyBookings.tsx`
4. `Exit Survey Dialog` — `src/components/ExitSurveyDialog.tsx`
5. `Team Management Dialog` — `src/components/TeamManagementDialog.tsx`
6. `Admin Dashboard` — `src/components/AdminDashboard.tsx`

Shell/navigation entry point:

- `src/App.tsx` switches between Catalog / Bookings / Admin views.

## Refactor Completed (Fluent UI Migration)

The active app surface has been migrated from legacy `components/ui/*` usage to Fluent UI components and Fluent styling primitives.

### Files Refactored

- `src/App.tsx`
	- Kept Fluent shell and removed external toaster dependency.
- `src/components/BookingDialog.tsx`
	- Migrated dialog, progress indicator, inputs, checkboxes, and actions to Fluent UI.
- `src/components/ExitSurveyDialog.tsx`
	- Migrated dialog, fields, radio groups, and layout to Fluent UI.
- `src/components/TeamManagementDialog.tsx`
	- Migrated dialog, member form, role select, list row rendering, and badges to Fluent UI.
- `src/components/MyBookings.tsx`
	- Migrated cards, status badges, empty-state, and action buttons to Fluent UI.
- `src/components/AdminDashboard.tsx`
	- Migrated stat cards, utilization progress bars, and bookings table to Fluent UI.

### Legacy UI Status

- Legacy `src/components/ui/*` modules were removed from the repository.

## Application Architecture

### High-Level Component Flow

```text
main.tsx
	└─ App.tsx (FluentProvider + top nav)
			├─ WorkspaceCatalog
			│   └─ BookingDialog
			├─ MyBookings
			│   ├─ ExitSurveyDialog
			│   └─ TeamManagementDialog
			└─ AdminDashboard
```

### Data / State Flow

```text
								 +---------------------+
								 | Browser localStorage|
								 |---------------------|
								 | bookings            |
								 | entry-surveys       |
								 | exit-surveys        |
								 | team-members        |
								 +----------+----------+
														^
														|
			+---------------------+----------------------+
			|                                            |
+-----+----------------+               +-----------+----------------+
| BookingDialog        |               | ExitSurveyDialog           |
| writes bookings      |               | updates booking status     |
| writes entry-surveys |               | writes exit-surveys        |
+----------------------+               +----------------------------+
						^                                         ^
						|                                         |
	 +--------+---------+                     +---------+---------+
	 | WorkspaceCatalog |                     | MyBookings        |
	 | launches booking |                     | launches dialogs  |
	 +------------------+                     +---------+---------+
																											|
																											v
																					+-----------+---------+
																					| TeamManagementDialog|
																					| writes team-members |
																					+---------------------+

AdminDashboard reads bookings + surveys for aggregated metrics.
```

## Validation Results

Build/test checks run after refactor:

- `npm run build` ✅ passes
- `npm run lint` ⚠️ blocked by missing ESLint v9 config (`eslint.config.js`) in repository

## Local Development

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview production bundle: `npm run preview`

## License

MIT (see `LICENSE`).
