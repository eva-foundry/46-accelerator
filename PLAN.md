<!-- eva-primed-plan -->

## EVA Ecosystem Tools

- Data model: GET http://localhost:8010/model/projects/46-accelerator
- 29-foundry agents: C:\eva-foundry\eva-foundation\29-foundry\agents\
- 48-eva-veritas audit: run audit_repo MCP tool

---

# Project Plan

<!-- veritas-normalized 2026-02-25 prefix=F46 source=PLAN.md -->

## Feature: Fluent UI Migration [ID=F46-01]

### Story: Migrate App shell and navigation [ID=F46-01-001]

### Story: Migrate BookingDialog to Fluent UI [ID=F46-01-002]

### Story: Migrate ExitSurveyDialog to Fluent UI [ID=F46-01-003]

### Story: Migrate TeamManagementDialog to Fluent UI [ID=F46-01-004]

### Story: Migrate MyBookings to Fluent UI [ID=F46-01-005]

### Story: Migrate AdminDashboard to Fluent UI [ID=F46-01-006]

### Story: Wire localStorage persistence hook [ID=F46-01-007]

## Feature: EVA Spark Design System Integration [ID=F46-02]

### Story: Wire @eva/gc-design-system and @eva/ui dependencies [ID=F46-02-001]

### Story: Replace FluentProvider with GCThemeProvider in App.tsx [ID=F46-02-002]

### Story: Replace raw Button with EvaButton in App.tsx navigation [ID=F46-02-003]

## Feature: EVA Brain v2 AI Assistant [ID=F46-03]

### Story: Implement brain-client.ts typed API client [ID=F46-03-001]

### Story: Add /api/brain Vite proxy [ID=F46-03-002]

### Story: Build AIAssistant chat panel component [ID=F46-03-003]

### Story: Add AI Assistant view to App.tsx [ID=F46-03-004]

## Feature: Governance and Evidence [ID=F46-04]

### Story: Create PLAN.md, STATUS.md, ACCEPTANCE.md [ID=F46-04-001]

- [ ] PLAN.md ? all phases, features, stories with IDs [ID=F46-04-001-T01]
- [ ] STATUS.md ? session snapshots, open blockers [ID=F46-04-001-T02]
- [ ] ACCEPTANCE.md ? DoD checklist per story [ID=F46-04-001-T03]

### Story: Add EVA-STORY tags to all source files [ID=F46-04-002]

### Story: Update 37-data-model project record [ID=F46-04-003]

- [ ] PUT `http://localhost:8010/model/projects/46-accelerator` with phase=Phase 2 COMPLETE, status=active [ID=F46-04-003-T01]
- [ ] Verify row_version incremented [ID=F46-04-003-T02]
- [ ] POST /model/admin/commit ? PASS [ID=F46-04-003-T03]

## Feature: Booking Screens @eva/ui Migration [ID=F46-05]

### Story: Migrate WorkspaceCatalog to @eva/ui [ID=F46-05-001]

### Story: Migrate BookingDialog to @eva/ui [ID=F46-05-002]

### Story: Migrate MyBookings to @eva/ui [ID=F46-05-003]

### Story: Migrate ExitSurveyDialog to @eva/ui [ID=F46-05-004]

### Story: Migrate TeamManagementDialog to @eva/ui [ID=F46-05-005]

## Feature: GitHub Actions CI [ID=F46-06]

### Story: Add CI workflow [ID=F46-06-001]

- [ ] Create `.github/workflows/ci.yml` [ID=F46-06-001-T01]
- [ ] Triggers: push/PR to `main` filtering `eva-foundation/46-accelerator/**` [ID=F46-06-001-T02]
- [ ] Steps: checkout, node 20, `npm ci --legacy-peer-deps`, `npm run build`, `npm run lint` [ID=F46-06-001-T03]
