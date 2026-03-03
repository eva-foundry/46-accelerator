# ACCEPTANCE.md — EVA Accelerator (46-accelerator)

Definition of Done for all user stories. Phase 1 and Phase 2 criteria are verified.

---

## Feature: Fluent UI Migration [ID=F46-01]

### Story: Migrate App shell and navigation [ID=F46-01-001]
- [x] `App.tsx` uses `FluentProvider` or `GCThemeProvider` as root theme wrapper
- [x] No legacy radix/shadcn imports in `App.tsx`
- [x] Nav renders without errors
- [x] `npm run build` exits 0

### Story: Migrate BookingDialog to Fluent UI [ID=F46-01-002]
- [x] `BookingDialog.tsx` uses only Fluent UI primitives
- [x] 3-step wizard renders: workspace selection → entry survey → confirm
- [x] No `@radix-ui/*` or `components/ui/*` imports

### Story: Migrate ExitSurveyDialog to Fluent UI [ID=F46-01-003]
- [x] `ExitSurveyDialog.tsx` uses only Fluent UI dialog, fields, radio groups
- [x] No legacy UI imports

### Story: Migrate TeamManagementDialog to Fluent UI [ID=F46-01-004]
- [x] `TeamManagementDialog.tsx` uses Fluent UI member form, role select, badges
- [x] Reader / Contributor / Admin roles selectable

### Story: Migrate MyBookings to Fluent UI [ID=F46-01-005]
- [x] `MyBookings.tsx` renders booking cards with status badges using Fluent UI
- [x] Empty-state renders when no bookings

### Story: Migrate AdminDashboard to Fluent UI [ID=F46-01-006]
- [x] `AdminDashboard.tsx` renders stat cards, utilization bars, bookings table
- [x] No legacy UI imports

### Story: Wire localStorage persistence hook [ID=F46-01-007]
- [x] `src/hooks/use-local-storage-state.ts` exports a typed hook
- [x] `bookings`, `entry-surveys`, `exit-surveys`, `team-members` all persist across page reload
- [x] No in-component raw `localStorage.getItem/setItem` calls

---

## Feature: EVA Spark Design System Integration [ID=F46-02]

### Story: Wire @eva/gc-design-system and @eva/ui dependencies [ID=F46-02-001]
- [x] `package.json` has `"@eva/gc-design-system": "file:../31-eva-faces/shared/gc-design-system"`
- [x] `package.json` has `"@eva/ui": "file:../31-eva-faces/shared/eva-ui"`
- [x] `vite.config.ts` aliases resolve `@eva/*` to `../31-eva-faces/shared/*/src`
- [x] `tsconfig.json` has `@eva/*` path mappings
- [x] `npm run build` exits 0

### Story: Replace FluentProvider with GCThemeProvider in App.tsx [ID=F46-02-002]
- [x] `App.tsx` imports `GCThemeProvider` from `@eva/gc-design-system`
- [x] No `import { FluentProvider, webLightTheme }` in `App.tsx`
- [x] App renders with correct token values

### Story: Replace raw Button with EvaButton in App.tsx navigation [ID=F46-02-003]
- [x] All nav tab buttons in `App.tsx` use `EvaButton` from `@eva/ui`
- [x] `variant` prop used (not `appearance`)
- [x] No raw `Button` import from `@fluentui/react-components` in `App.tsx`

---

## Feature: EVA Brain v2 AI Assistant [ID=F46-03]

### Story: Implement brain-client.ts typed API client [ID=F46-03-001]
- [x] `src/lib/brain-client.ts` exists
- [x] Exports `chatUngrounded`, `chatGrounded`, `pingBrain`
- [x] All requests include `X-Actor-OID`, `X-Correlation-ID`, `X-Caller-App: accelerator`, `X-Environment`
- [x] `BRAIN_BASE` reads from `VITE_BRAIN_BASE_URL` env var with fallback to `/api/brain`
- [x] TypeScript compiles without errors

### Story: Add /api/brain Vite proxy [ID=F46-03-002]
- [x] `vite.config.ts` has `server.proxy['/api/brain']` → `http://localhost:8001`
- [x] Path rewrite strips `/api/brain` prefix before forwarding
- [x] `npm run dev` auto-proxies brain calls in development

### Story: Build AIAssistant chat panel component [ID=F46-03-003]
- [x] `src/components/AIAssistant.tsx` exists
- [x] `pingBrain()` called on mount; `brainOnline` state drives `EvaBadge`
- [x] Offline state shows warning banner and disables `Textarea`
- [x] Conversation history array passed on every `chatUngrounded()` call
- [x] 5 starter suggestion chips shown on empty conversation
- [x] Error responses render in visually distinct error bubble
- [x] Uses `EvaButton`, `EvaSpinner`, `EvaBadge` from `@eva/ui`

### Story: Add AI Assistant view to App.tsx [ID=F46-03-004]
- [x] `type View` includes `'assistant'`
- [x] `SparkleRegular` icon used for AI Assistant nav tab
- [x] `{currentView === 'assistant' && <AIAssistant />}` rendered in main content area

---

## Feature: Governance and Evidence [ID=F46-04]

### Story: Create PLAN.md, STATUS.md, ACCEPTANCE.md [ID=F46-04-001]
- [x] `PLAN.md` created with phases, features F46-01 to F46-06, all stories with IDs
- [x] `STATUS.md` created with session snapshots and open items table
- [x] `ACCEPTANCE.md` created with DoD checklist per story

### Story: Add EVA-STORY tags to all source files [ID=F46-04-002]
- [ ] `src/App.tsx` has `// EVA-STORY: F46-02-002` header
- [ ] `src/main.tsx` has `// EVA-STORY: F46-02-001` header
- [ ] All 7 screen components have `// EVA-STORY: F46-XX-XXX` + `// EVA-FEATURE: F46-XX`
- [ ] `src/lib/brain-client.ts` has `// EVA-STORY: F46-03-001`
- [ ] `node src/cli.js audit --repo .` MTI ≥ 70 (run from `48-eva-veritas`)

### Story: Update 37-data-model project record [ID=F46-04-003]
- [ ] `GET /model/projects/46-accelerator` → `row_version ≥ 2`
- [ ] `phase` = `Phase 2 — Spark + Brain Connected — COMPLETE`
- [ ] `status` = `active`
- [ ] `modified_by` = `agent:copilot`
- [ ] `POST /model/admin/commit` → `status: PASS`

---

## Feature: Booking Screens @eva/ui Migration [ID=F46-05]

### Story: Migrate WorkspaceCatalog to @eva/ui [ID=F46-05-001]
- [ ] All action buttons in `WorkspaceCatalog.tsx` use `EvaButton`
- [ ] Status indicators use `EvaBadge` where available
- [ ] No raw `Button` import from `@fluentui/react-components` in this file

### Story: Migrate BookingDialog to @eva/ui [ID=F46-05-002]
- [ ] Dialog trigger and actions use `EvaButton`
- [ ] No raw `Button` import in `BookingDialog.tsx`

### Story: Migrate MyBookings to @eva/ui [ID=F46-05-003]
- [ ] Booking card action buttons use `EvaButton`
- [ ] Status badges use `EvaBadge`

### Story: Migrate ExitSurveyDialog to @eva/ui [ID=F46-05-004]
- [ ] Dialog action buttons use `EvaButton`

### Story: Migrate TeamManagementDialog to @eva/ui [ID=F46-05-005]
- [ ] Action buttons use `EvaButton`
- [ ] Role badges use `EvaBadge`

---

## Feature: GitHub Actions CI [ID=F46-06]

### Story: Add CI workflow [ID=F46-06-001]
- [ ] `.github/workflows/ci.yml` exists
- [ ] Triggers on push and PR to `main`
- [ ] Filter path: `eva-foundation/46-accelerator/**`
- [ ] Steps: checkout, Node 20, `npm ci --legacy-peer-deps`, `npm run build`, `npm run lint`
- [ ] Workflow passes on clean repo

---

## Global Quality Gates (all phases)

- [ ] `npm run build` exits 0 — no TypeScript errors, no Vite build errors
- [ ] `npm run lint` exits 0 — no ESLint errors
- [ ] EVA Veritas MTI ≥ 70 — `node C:\AICOE\eva-foundation\48-eva-veritas\src\cli.js audit --repo .`
- [ ] 37-data-model `POST /model/admin/commit` → `PASS, violations: 0`
- [ ] No encoding violations in committed files (ASCII-only for machine-readable outputs)
- [ ] `STATUS.md` updated with session summary before closing
