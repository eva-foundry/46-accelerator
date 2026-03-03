// EVA-STORY: F46-03-001
// EVA-FEATURE: F46-03
/**
 * EVA Brain v2 API client
 *
 * Connects to eva-brain-api (port 8001) via the Vite dev proxy at /api/brain.
 * Production: set VITE_BRAIN_BASE_URL to the deployed ingress URL.
 *
 * All protected routes require four mandatory request headers:
 *   X-Actor-OID        -- AAD Object ID of the acting user (or "dev-user" in dev)
 *   X-Correlation-ID   -- Per-request UUID for distributed tracing
 *   X-Caller-App       -- Identifies this application ("accelerator")
 *   X-Environment      -- Deployment environment ("dev" | "prod")
 *
 * Reference: 33-eva-brain-v2/services/eva-brain-api/app/routes/chat.py
 */

const BRAIN_BASE = import.meta.env.VITE_BRAIN_BASE_URL ?? '/api/brain'

// ---------------------------------------------------------------------------
// Types (mirror the Pydantic models in chat.py)
// ---------------------------------------------------------------------------

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatRequest {
  query: string
  top_k?: number
  conversation_history?: ChatMessage[]
  indexes?: string[] | null
  cost_tags?: Record<string, string> | null
}

export interface ChatCitation {
  id: string
  relevance_score: number
  title?: string
  excerpt?: string
}

export interface ChatResponse {
  answer: string
  citations: ChatCitation[]
  model: string
  tokens_used: number
  indexes_searched: string[]
  approach: string
  explain?: string
  query_hash?: string
}

// ---------------------------------------------------------------------------
// Header factory
// ---------------------------------------------------------------------------

function brainHeaders(actorOid = 'dev-user'): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-Actor-OID': actorOid,
    'X-Correlation-ID': crypto.randomUUID(),
    'X-Caller-App': 'accelerator',
    'X-Environment': import.meta.env.MODE === 'production' ? 'prod' : 'dev',
  }
}

// ---------------------------------------------------------------------------
// Chat
// ---------------------------------------------------------------------------

/**
 * Send a message to EVA Brain via the ungrounded (pure LLM) endpoint.
 * No retrieval is performed — suited for booking portal assistance where
 * the LLM answers from general knowledge + conversation context.
 *
 * Use chatGrounded() when jurisprudence retrieval is needed.
 */
export async function chatUngrounded(
  query: string,
  history: ChatMessage[] = [],
  actorOid?: string,
): Promise<ChatResponse> {
  const body: ChatRequest = {
    query,
    top_k: 5,
    conversation_history: history,
    cost_tags: {
      phase: 'booking',
      task: 'assistant-chat',
      project: '46-accelerator',
    },
  }

  const res = await fetch(`${BRAIN_BASE}/v1/chat/ungrounded`, {
    method: 'POST',
    headers: brainHeaders(actorOid),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`Brain API error ${res.status}: ${text}`)
  }

  return res.json() as Promise<ChatResponse>
}

/**
 * Send a message via the hybrid RAG endpoint (retrieves from jurisprudence indexes).
 * Use this when the user asks case-law or legal-policy questions.
 */
export async function chatGrounded(
  query: string,
  history: ChatMessage[] = [],
  indexes?: string[],
  actorOid?: string,
): Promise<ChatResponse> {
  const body: ChatRequest = {
    query,
    top_k: 5,
    conversation_history: history,
    indexes: indexes ?? null,
    cost_tags: {
      phase: 'booking',
      task: 'rag-chat',
      project: '46-accelerator',
    },
  }

  const res = await fetch(`${BRAIN_BASE}/v1/chat`, {
    method: 'POST',
    headers: brainHeaders(actorOid),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`Brain API error ${res.status}: ${text}`)
  }

  return res.json() as Promise<ChatResponse>
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------

export async function pingBrain(): Promise<boolean> {
  try {
    const res = await fetch(`${BRAIN_BASE}/v1/health`, { method: 'GET' })
    return res.ok
  } catch {
    return false
  }
}
