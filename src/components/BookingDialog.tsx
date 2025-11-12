import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Calendar, ArrowRight, ArrowLeft, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { Workspace, Booking, EntrySurvey } from '@/lib/types'
import { DOCUMENT_TYPES, AI_FEATURES } from '@/lib/constants'

interface BookingDialogProps {
  workspace: Workspace
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = 'dates' | 'survey' | 'confirmation'

export default function BookingDialog({ workspace, open, onOpenChange }: BookingDialogProps) {
  const [currentStep, setCurrentStep] = useState<Step>('dates')
  const [bookings, setBookings] = useKV<Booking[]>('bookings', [])
  const [surveys, setSurveys] = useKV<EntrySurvey[]>('entry-surveys', [])

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [useCase, setUseCase] = useState('')
  const [expectedBenefits, setExpectedBenefits] = useState('')
  const [targetMetrics, setTargetMetrics] = useState('')
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>([])
  const [selectedAIFeatures, setSelectedAIFeatures] = useState<string[]>([])
  const [teamSize, setTeamSize] = useState('1')

  const calculateCost = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const weeks = Math.ceil((end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))
    return weeks * workspace.pricePerWeek
  }

  const handleDatesContinue = () => {
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates')
      return
    }
    if (new Date(startDate) >= new Date(endDate)) {
      toast.error('End date must be after start date')
      return
    }
    setCurrentStep('survey')
  }

  const handleSurveySubmit = () => {
    if (!useCase.trim() || !expectedBenefits.trim() || !targetMetrics.trim()) {
      toast.error('Please complete all required survey fields')
      return
    }
    if (selectedDocTypes.length === 0) {
      toast.error('Please select at least one document type')
      return
    }
    if (selectedAIFeatures.length === 0) {
      toast.error('Please select at least one AI feature')
      return
    }

    const bookingId = `booking-${Date.now()}`
    const totalCost = calculateCost()

    const newBooking: Booking = {
      id: bookingId,
      workspaceId: workspace.id,
      userId: 'current-user',
      userName: 'Current User',
      startDate,
      endDate,
      status: 'active',
      entrySurveyCompleted: true,
      exitSurveyCompleted: false,
      totalCost,
      createdAt: new Date().toISOString()
    }

    const newSurvey: EntrySurvey = {
      bookingId,
      useCase,
      expectedBenefits,
      targetMetrics,
      documentTypes: selectedDocTypes,
      aiFeatures: selectedAIFeatures,
      teamSize: parseInt(teamSize)
    }

    setBookings((current) => [...(current || []), newBooking])
    setSurveys((current) => [...(current || []), newSurvey])

    setCurrentStep('confirmation')
    toast.success('Workspace booked successfully!')
  }

  const handleClose = () => {
    setCurrentStep('dates')
    setStartDate('')
    setEndDate('')
    setUseCase('')
    setExpectedBenefits('')
    setTargetMetrics('')
    setSelectedDocTypes([])
    setSelectedAIFeatures([])
    setTeamSize('1')
    onOpenChange(false)
  }

  const progress = currentStep === 'dates' ? 33 : currentStep === 'survey' ? 66 : 100

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book {workspace.name}</DialogTitle>
          <DialogDescription>
            Complete the booking process to reserve your workspace
          </DialogDescription>
        </DialogHeader>

        <Progress value={progress} className="mb-6" />

        {currentStep === 'dates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {startDate && endDate && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">Booking Summary</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground">
                    {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (7 * 24 * 60 * 60 * 1000))} weeks
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="font-bold text-accent">${calculateCost()}</span>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDatesContinue} className="gap-2">
                Continue to Survey
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'survey' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="use-case">What is your use case? *</Label>
              <Textarea
                id="use-case"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                placeholder="Describe the business problem or opportunity you want to explore..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected-benefits">Expected Benefits & Outcomes *</Label>
              <Textarea
                id="expected-benefits"
                value={expectedBenefits}
                onChange={(e) => setExpectedBenefits(e.target.value)}
                placeholder="What do you hope to achieve with this workspace?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-metrics">Target Metrics *</Label>
              <Input
                id="target-metrics"
                value={targetMetrics}
                onChange={(e) => setTargetMetrics(e.target.value)}
                placeholder="e.g., Process 500 documents, reduce review time by 30%"
              />
            </div>

            <div className="space-y-2">
              <Label>Document Types * (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
                {DOCUMENT_TYPES.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox
                      id={`doc-${type}`}
                      checked={selectedDocTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        setSelectedDocTypes((current) =>
                          checked
                            ? [...current, type]
                            : current.filter((t) => t !== type)
                        )
                      }}
                    />
                    <Label htmlFor={`doc-${type}`} className="text-sm font-normal cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>AI Features Needed * (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
                {AI_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Checkbox
                      id={`ai-${feature}`}
                      checked={selectedAIFeatures.includes(feature)}
                      onCheckedChange={(checked) => {
                        setSelectedAIFeatures((current) =>
                          checked
                            ? [...current, feature]
                            : current.filter((f) => f !== feature)
                        )
                      }}
                    />
                    <Label htmlFor={`ai-${feature}`} className="text-sm font-normal cursor-pointer">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team-size">Team Size</Label>
              <Input
                id="team-size"
                type="number"
                min="1"
                max={workspace.capacity}
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
              />
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('dates')} className="gap-2">
                <ArrowLeft size={16} />
                Back
              </Button>
              <Button onClick={handleSurveySubmit} className="gap-2">
                Complete Booking
                <CheckCircle size={16} />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'confirmation' && (
          <div className="space-y-6 py-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle size={40} weight="duotone" className="text-accent" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-muted-foreground">
                  Your workspace has been reserved. You'll receive access instructions via email.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Workspace</span>
                <span className="font-medium text-foreground">{workspace.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Period</span>
                <span className="font-medium text-foreground">
                  {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                <span className="text-muted-foreground">Total Cost</span>
                <span className="font-bold text-accent text-lg">${calculateCost()}</span>
              </div>
            </div>

            <Button onClick={handleClose} className="w-full gap-2">
              <Calendar size={18} />
              View My Bookings
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
