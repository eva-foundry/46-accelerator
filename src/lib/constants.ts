import type { Workspace } from './types'

export const WORKSPACES: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Protected B Environment',
    type: 'protected-b',
    description: 'Secure workspace for handling Protected B classified documents with enhanced security protocols.',
    features: ['Protected B Compliance', 'Encrypted Storage', 'Audit Logging', 'Access Controls'],
    capacity: 10,
    pricePerWeek: 1200
  },
  {
    id: 'ws-2',
    name: 'OCR Processing Suite',
    type: 'ocr-enabled',
    description: 'Specialized environment for optical character recognition and document digitization workflows.',
    features: ['Advanced OCR', 'Multi-language Support', 'Image Enhancement', 'Batch Processing'],
    capacity: 15,
    pricePerWeek: 800
  },
  {
    id: 'ws-3',
    name: 'Translation Hub',
    type: 'translation',
    description: 'Multi-lingual translation workspace supporting English-French and 50+ language pairs.',
    features: ['Neural Translation', 'Context Preservation', 'Terminology Management', 'Quality Scoring'],
    capacity: 12,
    pricePerWeek: 950
  },
  {
    id: 'ws-4',
    name: 'Summarization Studio',
    type: 'summarization',
    description: 'Document summarization and synthesis workspace for executive briefings and research.',
    features: ['Extractive Summaries', 'Abstractive Summaries', 'Key Points Extraction', 'Citation Tracking'],
    capacity: 20,
    pricePerWeek: 700
  },
  {
    id: 'ws-5',
    name: 'General Purpose AI Lab',
    type: 'general',
    description: 'Flexible workspace for general AI exploration and document analysis tasks.',
    features: ['Q&A Interface', 'Document Search', 'Basic Analytics', 'Export Tools'],
    capacity: 25,
    pricePerWeek: 500
  }
]

export const WORKSPACE_TYPE_LABELS: Record<string, string> = {
  'protected-b': 'Protected B',
  'ocr-enabled': 'OCR Enabled',
  'translation': 'Translation',
  'summarization': 'Summarization',
  'general': 'General Purpose'
}

export const ROLE_DESCRIPTIONS: Record<string, string> = {
  reader: 'View-only access to workspace and documents',
  contributor: 'Upload and manage documents, run queries',
  admin: 'Full access including team management and configuration'
}

export const DOCUMENT_TYPES = [
  'PDFs',
  'Word Documents',
  'Spreadsheets',
  'Presentations',
  'Images',
  'Scanned Documents',
  'Technical Reports',
  'Contracts',
  'Research Papers',
  'Email Archives'
]

export const AI_FEATURES = [
  'Question & Answer',
  'Document Summarization',
  'Translation',
  'OCR Processing',
  'Named Entity Recognition',
  'Sentiment Analysis',
  'Topic Modeling',
  'Citation Extraction',
  'Cross-document Search',
  'Automated Tagging'
]
