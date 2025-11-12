export type WorkspaceType = 'protected-b' | 'ocr-enabled' | 'translation' | 'summarization' | 'general'

export type UserRole = 'reader' | 'contributor' | 'admin'

export type BookingStatus = 'pending' | 'active' | 'completed' | 'cancelled'

export interface Workspace {
  id: string
  name: string
  type: WorkspaceType
  description: string
  features: string[]
  capacity: number
  pricePerWeek: number
}

export interface Booking {
  id: string
  workspaceId: string
  userId: string
  userName: string
  startDate: string
  endDate: string
  status: BookingStatus
  entrySurveyCompleted: boolean
  exitSurveyCompleted: boolean
  totalCost: number
  createdAt: string
}

export interface EntrySurvey {
  bookingId: string
  useCase: string
  expectedBenefits: string
  targetMetrics: string
  documentTypes: string[]
  aiFeatures: string[]
  teamSize: number
}

export interface ExitSurvey {
  bookingId: string
  actualResults: string
  goalsAchieved: boolean
  lessonsLearned: string
  blockers: string
  suggestions: string
  rating: number
  accountingInfo: {
    department: string
    costCenter: string
    approverName: string
    approverEmail: string
  }
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: UserRole
  addedAt: string
}

export interface BookingWithDetails extends Booking {
  workspace: Workspace
  teamMembers: TeamMember[]
  entrySurvey?: EntrySurvey
  exitSurvey?: ExitSurvey
}
