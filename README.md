# EVA Domain Assistant ? Accelerator Portal

<!-- eva-primed -->
<!-- foundation-primer: 2026-03-03 by agent:copilot -->

## EVA Ecosystem Integration

| Tool | Purpose | How to Use |
|------|---------|------------|
| 37-data-model | Single source of truth for all project entities | GET http://localhost:8010/model/projects/46-accelerator |
| 29-foundry | Agentic capabilities (search, RAG, eval, observability) | C:\eva-foundry\eva-foundation\29-foundry |
| 48-eva-veritas | Trust score and coverage audit | MCP tool: audit_repo / get_trust_score |
| 07-foundation-layer | Copilot instructions primer + governance templates | MCP tool: apply_primer / audit_project |

**Agent rule**: Query the data model API before reading source files.
```powershell
Invoke-RestMethod "http://localhost:8010/model/agent-guide"   # complete protocol
Invoke-RestMethod "http://localhost:8010/model/agent-summary" # all layer counts
```

---


> **React 19 ? TypeScript ? Vite ? Fluent UI v9 ? EVA Spark Design System ? EVA Brain v2**
>
> Self-service workspace booking, goal-driven evaluation, cost recovery, and AI-assisted exploration ? all in one portal.

---

## ?? Self-Service EVA Domain Assistant Accelerator Program

Explore generative AI ? on your schedule, with your goals, and your budget.

The Artificial Intelligence Centre of Enablement (AICoE) is proud to announce the launch of the **Self-Service EVA Domain Assistant Accelerator Program**, a next-generation pilot that puts business teams in control of their AI journey. This program builds on the success of EVA DA and introduces workspace-style booking, goal-driven evaluation, and cost recovery options ? all designed to make AI exploration intuitive, measurable, and scalable.

### ?? What's New?

#### ??? EVA DA Booking Portal

Inspired by Archibus, users can now reserve EVA DA environments just like booking office space:

- Choose from specialized AI workspaces (e.g., Protected B, OCR-enabled, translation-focused).
- Set recurring access for sprint reviews, onboarding, or training.
- View availability and usage history.

#### ?? Role-Based Access

EVA DA supports secure, role-based access:

| Role | Permissions |
|---|---|
| **Reader** | View-only access |
| **Contributor** | Upload and manage documents |
| **Admin** | Configure environments and manage team access |

#### ?? Entry & Exit Surveys

To ensure meaningful outcomes, each EVA DA "rental" includes:

**? Entry Survey** ? Before starting, clients define:
- The use case they want to explore.
- Expected benefits, outcomes, and target metrics.
- Any specific AI features or document types they plan to use.

**?? Exit Survey** ? At the end of the rental period, clients report:
- Actual results achieved.
- Lessons learned and blockers encountered.
- Suggestions for future improvements.

These insights continuously improve EVA DA and tailor future AI services to real business needs.

#### ?? Cost Recovery & Funding

To support sustainable scaling, EVA DA now includes a cost recovery model:

- Clients provide accounting information during onboarding.
- The business receives a receipt for funding once the rental is complete.
- Flexible usage plans available:
  - **Blocked time** ? e.g., 2-week sprint access
  - **Model-specific environments** ? e.g., OCR, translation, summarization
  - **Team-based quotas** ? for document uploads and queries

### ?? Why It Matters

This program empowers business teams to:

- Explore AI use cases independently.
- Measure impact and ROI.
- Scale adoption with minimal technical overhead.

It reflects leadership's vision for secure, scalable, and self-directed AI access ? and it's ready for your team.

### ?? Ready to Get Started?

1. Complete the EVA DA registration form
2. Book your EVA DA space
3. Define your goals and start exploring

---

## ??? Developer Reference

### Tech Stack

| Layer | Technology |
|---|---|
| Runtime | React 19 + TypeScript 5.7 |
| Build | Vite 6 |
| Design system | `@eva/gc-design-system` + `@eva/ui` (EVA Spark, sourced from `31-eva-faces/shared/`) |
| Base UI | Fluent UI React v9 (`@fluentui/react-components`) via `GCThemeProvider` |
| AI backend | EVA Brain v2 ? `src/lib/brain-client.ts` ? `/api/brain` proxy ? port 8001 |
| Persistence | Browser `localStorage` via `src/hooks/use-local-storage-state.ts` |

### Phase Status

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Fluent UI migration + localStorage persistence | ? Complete |
| Phase 2 | EVA Spark design system + EVA Brain v2 AI Assistant | ? Complete |

---

## ?? Application Architecture

### Component Tree

```text
main.tsx
  ?? GCThemeProvider  (@eva/gc-design-system)
      ?? App.tsx  (sticky header nav, EvaButton tabs)
          ?? WorkspaceCatalog       ? browse & select workspace
          ?   ?? BookingDialog      ? 3-step booking wizard + entry survey
          ?? MyBookings             ? active & past bookings
          ?   ?? ExitSurveyDialog   ? end-of-rental outcomes capture
          ?   ?? TeamManagementDialog ? RBAC team member management
          ?? AdminDashboard         ? utilization stats, bookings table
          ?? AIAssistant            ? EVA Brain v2 chat panel
```

### Navigation Tabs

| Tab | Icon | View key | Component |
|---|---|---|---|
| Workspace Catalog | ?? BuildingRegular | `catalog` | `WorkspaceCatalog` |
| My Bookings | ?? CalendarRegular | `bookings` | `MyBookings` |
| Admin Dashboard | ?? ChartMultipleRegular | `admin` | `AdminDashboard` |
| AI Assistant | ? SparkleRegular | `assistant` | `AIAssistant` |

### Data Flow

```text
???????????????????????????
?   Browser localStorage  ?
???????????????????????????
?   bookings              ?
?   entry-surveys         ?
?   exit-surveys          ?
?   team-members          ?
???????????????????????????
             ? read / write
  ???????????????????????????????????????
  ?                                      ?
????????????????????    ????????????????????????????
?  BookingDialog   ?    ?  ExitSurveyDialog         ?
?  writes booking  ?    ?  updates status           ?
?  writes survey   ?    ?  writes exit-survey       ?
????????????????????    ?????????????????????????????
       ?                               ?
???????????????????????   ??????????????????????????
?  WorkspaceCatalog   ?   ?  MyBookings            ?
?  launches booking   ?   ?  launches dialogs      ?
???????????????????????   ??????????????????????????
                                        ?
                          ??????????????????????????
                          ?  TeamManagementDialog   ?
                          ?  writes team-members    ?
                          ??????????????????????????

AdminDashboard  ?  reads bookings + surveys (aggregated metrics)
AIAssistant     ?  EVA Brain v2 via /api/brain proxy (stateless chat)
```

---

## ?? AI Assistant (EVA Brain v2)

The **AI Assistant** tab (`src/components/AIAssistant.tsx`) connects live to EVA Brain v2:

- **Health ping** on mount ? shows `Brain Online` / `Brain Offline` badge via `pingBrain()`
- **Offline graceful degradation** ? warning banner + disabled input when brain is unreachable
- **Conversation history** ? full chat history passed on every `chatUngrounded()` call
- **5 starter chips** ? contextual suggestions shown on empty conversation

### Brain Client (`src/lib/brain-client.ts`)

```
Base URL:  VITE_BRAIN_BASE_URL env var  (default: /api/brain  ? Vite proxy ? http://localhost:8001)
Endpoints: POST /v1/chat/ungrounded   (chatUngrounded)
           POST /v1/chat              (chatGrounded ? RAG)
           GET  /v1/health            (pingBrain)
```

Mandatory headers sent on every request:

| Header | Value |
|---|---|
| `X-Actor-OID` | `dev-user` (dev) / authenticated OID (prod) |
| `X-Correlation-ID` | `crypto.randomUUID()` per request |
| `X-Caller-App` | `accelerator` |
| `X-Environment` | `dev` / `prod` |

---

## ?? Screen Inventory

| # | Screen | File | Description |
|---|---|---|---|
| 1 | Workspace Catalog | `src/components/WorkspaceCatalog.tsx` | Browse available EVA DA workspaces |
| 2 | Booking Dialog | `src/components/BookingDialog.tsx` | 3-step wizard: select ? survey ? confirm |
| 3 | My Bookings | `src/components/MyBookings.tsx` | Active and past bookings with actions |
| 4 | Exit Survey Dialog | `src/components/ExitSurveyDialog.tsx` | End-of-rental outcomes and feedback |
| 5 | Team Management Dialog | `src/components/TeamManagementDialog.tsx` | Add members, assign Reader/Contributor/Admin roles |
| 6 | Admin Dashboard | `src/components/AdminDashboard.tsx` | Utilization stats, bookings table, aggregated metrics |
| 7 | AI Assistant | `src/components/AIAssistant.tsx` | EVA Brain v2 chat panel with health ping |

---

## ?? Local Development

```powershell
# Install dependencies
npm install

# Start dev server (port 5173 ? proxies /api/brain ? http://localhost:8001)
npm run dev

# Type-check + production build (quality gate)
npm run build

# Preview production bundle
npm run preview
```

> **EVA Brain v2** must be running on port 8001 for the AI Assistant tab to connect.
> The Vite dev server auto-proxies `/api/brain/*` ? `http://localhost:8001`.
> Without brain, the app loads normally with an "Offline" badge in the AI tab.

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_BRAIN_BASE_URL` | `/api/brain` | Override brain API base URL (e.g. for prod) |

---

## ? Quality Gates

| Check | Command | Status |
|---|---|---|
| Type check + build | `npm run build` | ? Passes |
| Lint | `npm run lint` | ? Passes |
| EVA Brain proxy | `npm run dev` ? `/api/brain/v1/health` | Requires Brain v2 on port 8001 |

---

## License

MIT (see `LICENSE`).
