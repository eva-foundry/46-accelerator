import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, Receipt, ClipboardText, XCircle } from '@phosphor-icons/react'
import type { Booking, EntrySurvey } from '@/lib/types'
import { WORKSPACES } from '@/lib/constants'
import ExitSurveyDialog from './ExitSurveyDialog'
import TeamManagementDialog from './TeamManagementDialog'

export default function MyBookings() {
  const [bookings] = useKV<Booking[]>('bookings', [])
  const [surveys] = useKV<EntrySurvey[]>('entry-surveys', [])
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [exitSurveyOpen, setExitSurveyOpen] = useState(false)
  const [teamManagementOpen, setTeamManagementOpen] = useState(false)

  const userBookings = (bookings || []).filter(b => b.userId === 'current-user')

  const getWorkspace = (workspaceId: string) => {
    return WORKSPACES.find(w => w.id === workspaceId)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-teal text-teal-foreground">Active</Badge>
      case 'pending':
        return <Badge variant="outline">Pending</Badge>
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleExitSurvey = (booking: Booking) => {
    setSelectedBooking(booking)
    setExitSurveyOpen(true)
  }

  const handleTeamManagement = (booking: Booking) => {
    setSelectedBooking(booking)
    setTeamManagementOpen(true)
  }

  if (userBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <Calendar size={40} weight="duotone" className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">No Bookings Yet</h3>
        <p className="text-muted-foreground text-center max-w-md">
          You haven't made any workspace reservations. Browse available workspaces to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">My Bookings</h2>
        <p className="text-muted-foreground mt-1">Manage your workspace reservations and team access</p>
      </div>

      <div className="space-y-4">
        {userBookings.map((booking) => {
          const workspace = getWorkspace(booking.workspaceId)
          if (!workspace) return null

          return (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{workspace.name}</CardTitle>
                      {getStatusBadge(booking.status)}
                    </div>
                    <CardDescription className="text-sm">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total Cost</p>
                    <p className="text-lg font-bold text-accent">${booking.totalCost}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {booking.entrySurveyCompleted && (
                    <Badge variant="outline" className="gap-1.5">
                      <ClipboardText size={14} />
                      Entry Survey Complete
                    </Badge>
                  )}
                  {booking.exitSurveyCompleted && (
                    <Badge variant="outline" className="gap-1.5">
                      <Receipt size={14} />
                      Exit Survey Complete
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {booking.status === 'active' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTeamManagement(booking)}
                        className="gap-1.5"
                      >
                        <Users size={16} />
                        Manage Team
                      </Button>
                      {!booking.exitSurveyCompleted && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExitSurvey(booking)}
                          className="gap-1.5"
                        >
                          <ClipboardText size={16} />
                          Complete Exit Survey
                        </Button>
                      )}
                    </>
                  )}
                  {booking.exitSurveyCompleted && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                    >
                      <Receipt size={16} />
                      View Receipt
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedBooking && (
        <>
          <ExitSurveyDialog
            booking={selectedBooking}
            open={exitSurveyOpen}
            onOpenChange={setExitSurveyOpen}
          />
          <TeamManagementDialog
            booking={selectedBooking}
            open={teamManagementOpen}
            onOpenChange={setTeamManagementOpen}
          />
        </>
      )}
    </div>
  )
}
