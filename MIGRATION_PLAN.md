# Fluent UI Migration Plan

## Overview
Migration from shadcn/ui + Tailwind CSS to Microsoft Fluent UI React v9

## Completed Changes

### 1. Package Installation
- ✅ Installed `@fluentui/react-components@^9.54.0`
- ✅ Installed `@fluentui/react-icons@^2.0.258`

### 2. App.tsx - Main Application Shell
- ✅ Replaced shadcn Button with Fluent UI Button
- ✅ Replaced Tailwind classes with Fluent UI `makeStyles`
- ✅ Wrapped app in `FluentProvider` with `webLightTheme`
- ✅ Updated icons from Phosphor to Fluent UI React Icons
- ✅ Maintained responsive design using Fluent UI styling patterns

### 3. WorkspaceCatalog.tsx
- ✅ Replaced shadcn Card components with Fluent UI Card
- ✅ Updated styling from Tailwind to Fluent UI makeStyles
- ✅ Converted Badge components to Fluent UI Badge
- ✅ Updated icons to Fluent UI React Icons
- ✅ Maintained grid layout using Fluent UI styling

## Remaining Components to Migrate

### 4. MyBookings.tsx
**Changes needed:**
- Replace shadcn Card, CardHeader, CardContent with Fluent UI Card
- Replace shadcn Badge with Fluent UI Badge
- Replace shadcn Button with Fluent UI Button  
- Convert Tailwind classes to Fluent UI makeStyles
- Update Phosphor icons to Fluent UI React Icons

### 5. AdminDashboard.tsx
**Changes needed:**
- Replace shadcn Card components with Fluent UI Card
- Replace shadcn Table with Fluent UI DataGrid or native table with Fluent styling
- Replace shadcn Badge with Fluent UI Badge
- Convert Tailwind classes to Fluent UI makeStyles
- Update Phosphor icons to Fluent UI React Icons
- Update progress bars to Fluent UI ProgressBar

### 6. BookingDialog.tsx
**Changes needed:**
- Replace shadcn Dialog with Fluent UI Dialog
- Replace shadcn Input with Fluent UI Input
- Replace shadcn Label with Fluent UI Label
- Replace shadcn Textarea with Fluent UI Textarea
- Replace shadcn Checkbox with Fluent UI Checkbox
- Replace shadcn Progress with Fluent UI ProgressBar
- Update form styling to use Fluent UI Field components
- Convert multi-step wizard UX to Fluent UI patterns

### 7. ExitSurveyDialog.tsx
**Changes needed:**
- Replace shadcn Dialog with Fluent UI Dialog
- Replace shadcn RadioGroup with Fluent UI RadioGroup
- Replace shadcn Input/Textarea with Fluent UI equivalents
- Update form layout using Fluent UI Field components
- Convert Tailwind classes to Fluent UI makeStyles

### 8. TeamManagementDialog.tsx
**Changes needed:**
- Replace shadcn Dialog with Fluent UI Dialog
- Replace shadcn Avatar with Fluent UI Avatar
- Replace shadcn Select with Fluent UI Dropdown or Combobox
- Replace shadcn Badge with Fluent UI Badge
- Update list styling with Fluent UI patterns

## Component Mapping Reference

| shadcn/Tailwind | Fluent UI v9 |
|-----------------|--------------|
| `<Button>` | `<Button>` |
| `<Card>` | `<Card>` |
| `<Badge>` | `<Badge>` |
| `<Dialog>` | `<Dialog>` |
| `<Input>` | `<Input>` |
| `<Label>` | `<Label>` |
| `<Textarea>` | `<Textarea>` |
| `<Checkbox>` | `<Checkbox>` |
| `<RadioGroup>` | `<RadioGroup>` |
| `<Select>` | `<Dropdown>` or `<Combobox>` |
| `<Progress>` | `<ProgressBar>` |
| `<Table>` | `<DataGrid>` or styled `<table>` |
| `<Avatar>` | `<Avatar>` |
| Tailwind classes | `makeStyles()` |
| Phosphor Icons | `@fluentui/react-icons` |

## Styling Migration Pattern

### Before (Tailwind):
```tsx
<div className="flex items-center gap-4 p-6">
```

### After (Fluent UI):
```tsx
const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('16px'),
    ...shorthands.padding('24px'),
  },
})

<div className={styles.container}>
```

## Theme Integration
- Using `webLightTheme` from Fluent UI
- Remove dark mode toggle (unless explicitly needed)
- Colors use Fluent UI design tokens (`tokens.colorBrandBackground`, etc.)
- Typography uses Fluent UI type ramp (Title1, Title2, Title3, Body1, Caption1, etc.)

## Testing Checklist
- [ ] All pages render without errors
- [ ] Booking flow works end-to-end
- [ ] Forms validate properly
- [ ] Dialogs open/close correctly
- [ ] Data persistence (useKV) still functions
- [ ] Responsive design works on mobile
- [ ] Icons display correctly
- [ ] Accessibility maintained (ARIA labels, keyboard nav)

## Notes
- Keep sonner for toast notifications (compatible with Fluent UI)
- Remove or update index.css to remove Tailwind-specific imports
- Update PRD.md to reflect Fluent UI design system
