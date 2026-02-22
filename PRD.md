# Planning Guide

## Implementation Status (February 2026)

- Active UI stack is Fluent UI React v9 with TypeScript + Vite.
- Legacy runtime and persistence integration has been removed from the app.
- Legacy CSS scaffold artifacts were removed from the active app surface.
- Data persistence currently uses browser localStorage via a shared hook.
- Validation/completion feedback currently uses lightweight browser alerts.

A comprehensive self-service reservation system for EVA Domain Assistant that enables business teams to book AI workspace environments, manage access, track usage, and recover costs through an intuitive Archibus-inspired booking portal.

**Experience Qualities**:
1. **Professional** - Enterprise-grade interface that instills confidence in business users managing critical AI resources
2. **Efficient** - Streamlined booking flow that minimizes friction while capturing necessary governance data
3. **Transparent** - Clear visibility into availability, costs, and usage metrics throughout the reservation lifecycle

**Complexity Level**: Complex Application (advanced functionality, accounts)
This is a multi-tenant booking system with role-based access, survey workflows, cost tracking, and administrative functions requiring sophisticated state management and user flows.

## Essential Features

### Workspace Booking
- **Functionality**: Users can browse available EVA DA workspaces, view specifications (Protected B, OCR-enabled, translation-focused), check availability calendars, and reserve time slots
- **Purpose**: Enable self-service access to limited AI resources (50 spaces for 100+ clients) with fair allocation
- **Trigger**: User clicks "Book Workspace" from dashboard or workspace catalog
- **Progression**: Browse workspaces → Select workspace type → Choose dates/duration → Review availability → Complete entry survey → Confirm booking → Receive confirmation
- **Success criteria**: Booking saved to system, calendar updated, user receives booking details with access instructions

### Entry Survey
- **Functionality**: Structured form capturing use case, expected benefits, target metrics, document types, and AI features needed
- **Purpose**: Ensure clients define clear goals and help AICoE understand usage patterns for continuous improvement
- **Trigger**: Required step during booking confirmation flow
- **Progression**: Booking details confirmed → Entry survey presented → User defines use case and goals → Sets success metrics → Submits survey → Booking activated
- **Success criteria**: Survey responses stored with booking, user cannot activate workspace without completion

### Role-Based Access Management
- **Functionality**: Admins can assign team members to workspaces with specific roles (Reader, Contributor, Admin) and manage permissions
- **Purpose**: Maintain security and governance while enabling team collaboration
- **Trigger**: Admin selects "Manage Team" on active booking
- **Progression**: View team list → Add team member → Select role type → Set permissions → Send invitation → Member accepts and gains access
- **Success criteria**: Team members can access workspace according to role permissions

### Exit Survey & Cost Recovery
- **Functionality**: At booking end, users complete exit survey reporting results, provide accounting information, and receive funding receipt
- **Purpose**: Measure ROI, capture learnings, and enable sustainable cost recovery for scaling
- **Trigger**: Automated prompt when booking period ends or user initiates early checkout
- **Progression**: Booking ends → Exit survey notification → Report actual results vs. goals → Rate experience → Provide accounting info → Submit → Generate receipt → Close booking
- **Success criteria**: Exit data captured, receipt generated with cost breakdown, workspace released for next booking

### Availability Calendar & Dashboard
- **Functionality**: Visual calendar showing workspace availability, current bookings, upcoming reservations, and usage statistics
- **Purpose**: Help users find available time slots and administrators monitor utilization
- **Trigger**: User navigates to dashboard or workspace detail page
- **Progression**: Load dashboard → View calendar heat map → Filter by workspace type or date → Check availability → Select time slot → Initiate booking
- **Success criteria**: Real-time availability displayed, conflicts prevented, booking patterns visible

## Edge Case Handling

- **Booking Conflicts**: Prevent double-booking through real-time availability checks; suggest alternative time slots if selected period unavailable
- **Incomplete Surveys**: Block workspace activation until entry survey complete; send reminders for overdue exit surveys with grace period
- **Early Termination**: Allow early checkout with partial cost calculation; still require exit survey completion
- **Over-Capacity Demand**: Implement waitlist system with automatic notifications when spaces become available
- **Role Conflicts**: Prevent users from having contradictory permissions; validate role changes don't break access requirements
- **Cost Recovery Failures**: Store accounting information separately; allow admin review and manual processing if automated receipt generation fails
- **Expired Bookings**: Auto-release workspaces after grace period; archive booking data for historical analysis

## Design Direction

The design should evoke trust, clarity, and professional efficiency—feeling like enterprise resource management software (Archibus/Microsoft Bookings) with modern SaaS polish. The interface should feel authoritative yet approachable, with data-dense views that remain scannable. This is a productivity tool for business professionals, so minimal chrome and maximum information density serve the core purpose better than decorative elements.

## Color Selection

**Triadic** color scheme using deep blue (trust/enterprise), warm amber (attention/action), and cool teal (technology/AI), creating professional contrast while maintaining accessibility.

- **Primary Color**: Deep Azure Blue `oklch(0.45 0.15 250)` - Represents enterprise trust, stability, and the Canadian government technology context. Used for primary actions and navigation.
- **Secondary Colors**: 
  - Slate Gray `oklch(0.65 0.02 250)` for secondary UI elements and subtle backgrounds
  - Steel Blue `oklch(0.55 0.08 250)` for data visualization and information hierarchy
- **Accent Color**: Warm Amber `oklch(0.68 0.15 65)` for call-to-action buttons, important notifications, and booking confirmations
- **AI/Tech Accent**: Cool Teal `oklch(0.60 0.12 190)` for AI-specific features, workspace type badges, and technical indicators

**Foreground/Background Pairings**:
- Background (Soft White `oklch(0.98 0 0)`): Foreground Text `oklch(0.25 0.02 250)` - Ratio 12.1:1 ✓
- Card (Pure White `oklch(1 0 0)`): Foreground Text `oklch(0.25 0.02 250)` - Ratio 13.2:1 ✓
- Primary (Deep Azure `oklch(0.45 0.15 250)`): White Text `oklch(0.98 0 0)` - Ratio 7.8:1 ✓
- Secondary (Slate Gray `oklch(0.65 0.02 250)`): Dark Text `oklch(0.25 0.02 250)` - Ratio 4.6:1 ✓
- Accent (Warm Amber `oklch(0.68 0.15 65)`): Dark Text `oklch(0.20 0.02 250)` - Ratio 6.2:1 ✓
- Muted (Light Gray `oklch(0.94 0.01 250)`): Muted Text `oklch(0.50 0.02 250)` - Ratio 5.1:1 ✓

## Font Selection

Typography should convey professionalism and precision—clear hierarchy for data-heavy interfaces while maintaining readability for longer survey content. Using Inter for its excellent screen rendering and tabular number support, paired with system fonts for optimal performance.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight (-0.02em) - Main page headings
  - H2 (Section Title): Inter SemiBold/24px/tight (-0.01em) - Workspace names, section dividers
  - H3 (Card Title): Inter SemiBold/18px/normal - Booking cards, dialog titles
  - Body (Primary): Inter Regular/15px/relaxed (1.6 leading) - Form content, descriptions
  - Body (Secondary): Inter Regular/14px/relaxed (1.5 leading) - Helper text, metadata
  - Label: Inter Medium/13px/normal (0.01em) - Form labels, badges
  - Caption: Inter Regular/12px/normal - Timestamps, supplementary info
  - Mono (Data): SF Mono/14px/normal - Workspace IDs, cost figures

## Animations

Animations should enhance clarity and provide feedback during multi-step workflows without slowing down power users. Subtle, purposeful motion that reinforces the booking flow and state changes.

- **Purposeful Meaning**: Motion communicates progression through booking stages, availability updates, and confirmation states—building confidence in the reservation process
- **Hierarchy of Movement**: Calendar availability changes (high priority) receive immediate updates; booking cards slide in smoothly; survey progress indicators animate to show completion; role badges pulse subtly on assignment

Key animations:
- Calendar cell highlighting on hover (100ms ease)
- Booking card expansion for details (250ms spring)
- Survey step transitions with slide + fade (300ms ease-out)
- Success confirmation with scale + fade (400ms with bounce)
- Loading states for availability checks (skeleton pulse)

## Component Selection

- **Components**:
  - **FluentProvider**: App-wide Fluent theme provider in shell
  - **Card / Badge / Button**: Workspace listings, booking summaries, and status/actions
  - **Dialog / Field / Input / Textarea / Checkbox / RadioGroup / Select**: Booking, survey, and team-management workflows
  - **Table / ProgressBar**: Admin utilization and booking metrics display
  - **Avatar / Text / Title3**: Team roster and content hierarchy in Fluent style

- **Customizations**:
  - LocalStorage state hook (`src/hooks/use-local-storage-state.ts`) for bookings/surveys/team state
  - Multi-step booking and survey dialogs with validation gates
  - Utilization and completion calculations in admin dashboard cards/tables

- **States**:
  - Buttons: Primary/secondary/outline variants for booking and admin actions
  - Inputs: Required-field checks with immediate user feedback
  - Cards: Status and metric grouping for bookings and admin analytics

- **Icon Selection**:
  - Fluent icons for calendar, workspace, surveys, admin metrics, and team management actions

- **Spacing**:
  - Page padding: `p-6` on mobile, `p-8` on desktop
  - Card spacing: `gap-4` for card grids, `p-6` internal padding
  - Form spacing: `gap-6` between sections, `gap-3` between related inputs
  - Component spacing: Consistent `space-y-4` for vertical stacking

- **Mobile**:
  - Stack workspace cards vertically with full-width layout
  - Booking/survey/team management dialogs remain usable on narrow screens
  - Table views maintain horizontal scroll behavior for small viewports
