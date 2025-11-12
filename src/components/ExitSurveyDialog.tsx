import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle, Receipt } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { Booking, ExitSurvey } from '@/lib/types'

interface ExitSurveyDialogProps {
  booking: Booking
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ExitSurveyDialog({ booking, open, onOpenChange }: ExitSurveyDialogProps) {
  const [bookings, setBookings] = useKV<Booking[]>('bookings', [])
  const [exitSurveys, setExitSurveys] = useKV<ExitSurvey[]>('exit-surveys', [])

  const [actualResults, setActualResults] = useState('')
  const [goalsAchieved, setGoalsAchieved] = useState<'yes' | 'no' | ''>('')
  const [lessonsLearned, setLessonsLearned] = useState('')
  const [blockers, setBlockers] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [rating, setRating] = useState('')
  const [department, setDepartment] = useState('')
  const [costCenter, setCostCenter] = useState('')
  const [approverName, setApproverName] = useState('')
  const [approverEmail, setApproverEmail] = useState('')

  const handleSubmit = () => {
    if (!actualResults.trim() || !goalsAchieved || !lessonsLearned.trim() || !rating) {
      toast.error('Please complete all required fields')
      return
    }

    if (!department.trim() || !costCenter.trim() || !approverName.trim() || !approverEmail.trim()) {
      toast.error('Please complete all accounting information fields')
      return
    }

    const newExitSurvey: ExitSurvey = {
      bookingId: booking.id,
      actualResults,
      goalsAchieved: goalsAchieved === 'yes',
      lessonsLearned,
      blockers,
      suggestions,
      rating: parseInt(rating),
      accountingInfo: {
        department,
        costCenter,
        approverName,
        approverEmail
      }
    }

    setExitSurveys((current) => [...(current || []), newExitSurvey])
    setBookings((current) =>
      (current || []).map((b) =>
        b.id === booking.id
          ? { ...b, exitSurveyCompleted: true, status: 'completed' as const }
          : b
      )
    )

    toast.success('Exit survey submitted! Receipt will be generated.')
    handleClose()
  }

  const handleClose = () => {
    setActualResults('')
    setGoalsAchieved('')
    setLessonsLearned('')
    setBlockers('')
    setSuggestions('')
    setRating('')
    setDepartment('')
    setCostCenter('')
    setApproverName('')
    setApproverEmail('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Exit Survey & Cost Recovery</DialogTitle>
          <DialogDescription>
            Help us improve EVA DA by sharing your experience and providing accounting information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="actual-results">What results did you achieve? *</Label>
            <Textarea
              id="actual-results"
              value={actualResults}
              onChange={(e) => setActualResults(e.target.value)}
              placeholder="Describe the outcomes and accomplishments from your workspace usage..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Did you achieve your stated goals? *</Label>
            <RadioGroup value={goalsAchieved} onValueChange={(value) => setGoalsAchieved(value as 'yes' | 'no')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="goals-yes" />
                <Label htmlFor="goals-yes" className="font-normal cursor-pointer">Yes, goals were achieved</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="goals-no" />
                <Label htmlFor="goals-no" className="font-normal cursor-pointer">No, goals were not fully achieved</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lessons">Key Lessons Learned *</Label>
            <Textarea
              id="lessons"
              value={lessonsLearned}
              onChange={(e) => setLessonsLearned(e.target.value)}
              placeholder="What insights did you gain from using EVA DA?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blockers">Blockers or Challenges (optional)</Label>
            <Textarea
              id="blockers"
              value={blockers}
              onChange={(e) => setBlockers(e.target.value)}
              placeholder="Describe any obstacles you encountered..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="suggestions">Suggestions for Improvement (optional)</Label>
            <Textarea
              id="suggestions"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder="How can we make EVA DA better?"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Overall Experience Rating *</Label>
            <RadioGroup value={rating} onValueChange={setRating}>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-center space-x-2">
                    <RadioGroupItem value={num.toString()} id={`rating-${num}`} />
                    <Label htmlFor={`rating-${num}`} className="font-normal cursor-pointer">{num}</Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">1 = Poor, 5 = Excellent</p>
            </RadioGroup>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Receipt size={20} className="text-primary" />
              <h3 className="text-base font-semibold text-foreground">Accounting Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g., IT Services"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost-center">Cost Center *</Label>
                <Input
                  id="cost-center"
                  value={costCenter}
                  onChange={(e) => setCostCenter(e.target.value)}
                  placeholder="e.g., CC-12345"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="approver-name">Approver Name *</Label>
                <Input
                  id="approver-name"
                  value={approverName}
                  onChange={(e) => setApproverName(e.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="approver-email">Approver Email *</Label>
                <Input
                  id="approver-email"
                  type="email"
                  value={approverEmail}
                  onChange={(e) => setApproverEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-1">Cost Recovery Summary</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="font-bold text-accent text-lg">${booking.totalCost}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              A receipt will be generated and sent to the approver for funding processing.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} className="gap-2">
              <CheckCircle size={16} />
              Submit & Generate Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
