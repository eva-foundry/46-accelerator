# GitHub Copilot Instructions -- EVA Accelerator

**Template Version**: 3.0.0
**Last Updated**: February 23, 2026
**Project**: EVA Accelerator -- React + Fluent UI workspace booking portal -- AI workspace administration and booking UI.
**Path**: `C:\AICOE\eva-foundry\46-accelerator\`
**Stack**: [TODO: language, framework, key libs]
**Category**: User Products
**Maturity**: poc
**WBS**: WBS-046

> This file is the Copilot operating manual for this repository.
> PART 1 is universal -- identical across all EVA Foundation projects.
> PART 2 is project-specific -- fill all [TODO] placeholders during first active session.

---

## PART 1 -- UNIVERSAL RULES
> Applies to every EVA Foundation project. Do not modify.

---

### 1. Session Bootstrap (run in this order, every session)

Before answering any question or writing any code:

1. **Ping 37-data-model API**: `Invoke-RestMethod http://localhost:8010/health`
   - If `{"status":"ok"}` use HTTP queries for all discovery (fastest)
   - If down: `env:PYTHONPATH="C:\AICOE\eva-foundry\37-data-model"; C:\AICOE\.venv\Scripts\python -m uvicorn api.server:app --port 8010 --reload`
   - If no venv: `m = Get-Content C:\AICOE\eva-foundry\37-data-model\model\eva-model.json | ConvertFrom-Json`

2. **Read this project's governance docs** (in order):
   - `README.md` -- identity, stack, quick start
   - `PLAN.md` -- phases, current phase, next tasks
   - `STATUS.md` -- last session snapshot, open blockers
   - `ACCEPTANCE.md` -- DoD checklist, quality gates (if exists)
   - Latest `docs/YYYYMMDD-plan.md` and `docs/YYYYMMDD-findings.md` (if exists)

3. **Read the skills index** (if `.github/copilot-skills/` exists):
   `powershell
   Get-ChildItem ".github/copilot-skills" -Filter "*.skill.md" | Select-Object Name
   `
   - Read `00-skill-index.skill.md` for the skill menu
   - Match the trigger phrase in `triggers:` YAML block to the user's current intent
   - Read the matched skill file in full before doing any work

4. **Query the data model** for this project's record:
   `powershell
   Invoke-RestMethod "http://localhost:8010/model/projects/46-accelerator" | Select-Object id, maturity, notes
   `

5. **Produce a Session Brief** -- one paragraph: active phase, last test count, next task, open blockers.
   Do not skip this. Do not start implementing before the brief is written.

---

### 2. DPDCA Execution Loop

Every session runs this cycle. Do not skip steps.

`
Discover  --> synthesise current sprint from plan + findings docs
Plan      --> pick next unchecked task from YYYYMMDD-plan.md checklist
Do        --> implement -- make the change, do not just describe it
Check     --> run the project test command (see PART 2); must exit 0
Act       --> update STATUS.md, PLAN.md, YYYYMMDD-plan.md, findings doc
Loop      --> return to Discover if tasks remain
`

**Execution Rule**: Make the change. Do not propose, narrate, or ask for permission
on a step you can determine yourself. If uncertain about scope, ask one clarifying
question then proceed.

---

### 3. EVA Data Model API -- Mandatory Protocol

**Full reference**: `C:\AICOE\eva-foundry\37-data-model\USER-GUIDE.md`
Read it at every sprint boundary or when a query pattern is unfamiliar.

**Rule: query the model first -- never grep when the model has the answer**

| You want to know... | Use (1 turn) | Do NOT (10 turns) |
|---|---|---|
| All endpoints for a service | `GET /model/endpoints/` filtered | grep router files |
| What a screen calls | `GET /model/screens/{id}` -> `.api_calls` | read screen source |
| Auth/feature flag for an endpoint | `GET /model/endpoints/{id}` | grep auth middleware |
| What breaks if X changes | `GET /model/impact/?container=X` | trace imports manually |
| Navigate to source line | `.repo_path` + `.repo_line` -> `code --goto` | file_search |

**5-step write cycle (mandatory -- every model change)**

`
1. PUT /model/{layer}/{id}          -- X-Actor: agent:copilot header required
2. GET /model/{layer}/{id}          -- assert row_version incremented + modified_by matches
3. POST /model/admin/export         -- Authorization: Bearer dev-admin
4. scripts/assemble-model.ps1       -- must report 27/27 layers OK
5. scripts/validate-model.ps1       -- must exit 0; [FAIL] lines block; [WARN] are noise
`

---

### 4. Encoding and Output Safety

- All Python scripts: `PYTHONIOENCODING=utf-8` in any .bat wrapper
- All PowerShell output: `[PASS]` / `[FAIL]` / `[WARN]` / `[INFO]` -- never emoji
- Machine-readable outputs (JSON, YAML, evidence files): ASCII-only always
- Markdown human-facing docs: emoji allowed for readability only

---

### 5. Python Environment

`
venv exec: C:\AICOE\.venv\Scripts\python.exe
activate:  C:\AICOE\.venv\Scripts\Activate.ps1
`

Never use bare `python` or `python3`. Always use the full venv path.

---

## PART 2 -- PROJECT-SPECIFIC

### Project Lock

This file is the copilot-instructions for **46-accelerator** (EVA Accelerator).

The workspace-level bootstrap rule "Step 1 -- Identify the active project from the currently open file path"
applies **only at the initial load of this file** (first read at session start).
Once this file has been loaded, the active project is locked to **46-accelerator** for the entire session.
Do NOT re-evaluate project identity from editorContext or terminal CWD on each subsequent request.
Work state and sprint context are read from `STATUS.md` and `PLAN.md` at bootstrap -- not from this file.

---
> Fill all [TODO] values during the first active session on this project.

---

### Project Identity

**Name**: EVA Accelerator
**Folder**: `C:\AICOE\eva-foundry\46-accelerator`
**ADO Epic**: [TODO: link when created]
**37-data-model record**: `GET /model/projects/46-accelerator`
**Maturity**: poc
**Phase**: Phase 2 -- Spark + Brain Connected

**Depends on**:
- 33-eva-brain-v2 -- chat AI (port 8001, `/v1/chat/ungrounded`, `/v1/chat` hybrid RAG)
- 43-spark -- design system (source: 31-eva-faces/shared/eva-ui + gc-design-system)
- 31-eva-faces -- shared `@eva/ui` + `@eva/gc-design-system` packages

**Consumed by**:
- Business teams booking EVA Domain Assistant AI workspaces

---

### Stack and Conventions

```
runtime:    Node 20 / React 19 + TypeScript 5.7
framework: Vite 6 (vite.config.ts)
ui:        @eva/ui + @eva/gc-design-system (Spark stack, sourced from ../31-eva-faces/shared/)
base ui:   @fluentui/react-components v9 (via GCThemeProvider wrapper)
brain api: EVA Brain v2 (port 8001, src/lib/brain-client.ts)
persistence: browser localStorage (src/hooks/use-local-storage-state.ts)
```

---

### Test Command

```powershell
# Type check + build (quality gate)
npm run build
# Dev server (includes /api/brain proxy to port 8001)
npm run dev
```

**Current test count**: 0 formal tests (npm run build is the quality gate)

---

### Key Commands

```powershell
# Dev server (port 5173, auto-proxies /api/brain -> http://localhost:8001)
npm run dev
# Production build
npm run build
# Preview build
npm run preview
```

---

### Critical Patterns

1. **GCThemeProvider wraps the whole app** -- `App.tsx` uses `<GCThemeProvider variant="light">` from `@eva/gc-design-system`. Never revert to raw `FluentProvider + webLightTheme`.
2. **@eva/ui wrappers over raw Fluent primitives** -- use `EvaButton`, `EvaDialog`, `EvaInput`, etc. for all covered components. Raw `Button`, `Dialog`, `Input` from `@fluentui/react-components` are only acceptable for un-wrapped primitives.
3. **Brain API via /api/brain proxy** -- `src/lib/brain-client.ts` calls `/api/brain/v1/chat/ungrounded` (dev proxy -> port 8001). All requests include the four mandatory headers: `X-Actor-OID`, `X-Correlation-ID`, `X-Caller-App: accelerator`, `X-Environment`.

---

### Known Anti-Patterns

| Do NOT | Do instead |
|---|---|
| Import `Button` from `@fluentui/react-components` | Use `EvaButton` from `@eva/ui` |
| Import `FluentProvider, webLightTheme` | Use `GCThemeProvider` from `@eva/gc-design-system` |
| Use `../../31-eva-faces` in paths | Use `../31-eva-faces` (one level up to eva-foundry) |
| Call brain API directly on port 8001 | Use the `/api/brain` Vite proxy (see `src/lib/brain-client.ts`) |

---

### Skills in This Project

`powershell
Get-ChildItem ".github/copilot-skills" -Filter "*.skill.md" | Select-Object Name
`

| Skill file | Trigger phrases | Purpose |
|---|---|---|
| 00-skill-index.skill.md | list skills, what can you do | Skill menu + index |
| [TODO: add skills as they are created] | | |

---

### 37-data-model -- This Project's Entities

`powershell
# Endpoints implemented by this project
Invoke-RestMethod "http://localhost:8010/model/endpoints/" |
  Where-Object { $_.implemented_in -like '*46-accelerator*' } |
  Select-Object id, status

# Feature flags gating this project
Invoke-RestMethod "http://localhost:8010/model/feature_flags/" |
  Where-Object { $_.id -like '*[TODO:feature-prefix]*' }
`

---

### Deployment

**Environment**: [TODO: dev URL] / [TODO: prod URL]
**Deploy**: `[TODO: deploy command]`

---

## PART 3 -- QUALITY GATES

All must pass before merging a PR:

- [ ] Test command exits 0
- [ ] `validate-model.ps1` exits 0 (if any model layer was changed)
- [ ] No encoding violations in new code
- [ ] STATUS.md updated with session summary
- [ ] PLAN.md reflects actual remaining work
- [ ] If new screen / endpoint / component added: model PUT + write cycle closed

---

*Source template*: `C:\AICOE\eva-foundry\07-foundation-layer\02-design\artifact-templates\copilot-instructions-template.md` v3.0.0
*EVA Data Model USER-GUIDE*: `C:\AICOE\eva-foundry\37-data-model\USER-GUIDE.md`
