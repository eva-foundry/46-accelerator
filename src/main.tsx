// EVA-FEATURE: F46-01
// EVA-STORY: F46-01-001
// EVA-STORY: F46-01-002
// EVA-STORY: F46-01-003
// EVA-STORY: F46-01-004
// EVA-STORY: F46-01-005
// EVA-STORY: F46-01-006
// EVA-STORY: F46-01-007
// EVA-STORY: F46-02-002
// EVA-STORY: F46-02-003
// EVA-STORY: F46-03-002
// EVA-STORY: F46-03-003
// EVA-STORY: F46-03-004
// EVA-STORY: F46-04-001
// EVA-STORY: F46-04-002
// EVA-STORY: F46-04-003
// EVA-STORY: F46-05-001
// EVA-STORY: F46-05-002
// EVA-STORY: F46-05-003
// EVA-STORY: F46-05-004
// EVA-STORY: F46-05-005
// EVA-STORY: F46-06-001
// EVA-STORY: F46-02-001
// EVA-FEATURE: F46-02
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
