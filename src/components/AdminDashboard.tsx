import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Buildings, Calendar, Users, CurrencyDollar, ChartBar, TrendUp } from '@phosphor-icons/react'
import type { Booking, EntrySurvey, ExitSurvey } from '@/lib/types'
import { WORKSPACES } from '@/lib/constants'

export default function AdminDashboard() {
  const [bookings] = useKV<Booking[]>('bookings', [])
  const [entrySurveys] = useKV<EntrySurvey[]>('entry-surveys', [])
  const [exitSurveys] = useKV<ExitSurvey[]>('exit-surveys', [])

  const allBookings = bookings || []
  const activeBookings = allBookings.filter(b => b.status === 'active')
  const completedBookings = allBookings.filter(b => b.status === 'completed')
  const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalCost, 0)
  const completionRate = allBookings.length > 0 
    ? Math.round((completedBookings.length / allBookings.length) * 100) 
    : 0

  const getWorkspaceName = (workspaceId: string) => {
    return WORKSPACES.find(w => w.id === workspaceId)?.name || 'Unknown'
  }

  const getWorkspaceUtilization = () => {
    return WORKSPACES.map(workspace => {
      const workspaceBookings = allBookings.filter(b => b.workspaceId === workspace.id)
      const activeCount = workspaceBookings.filter(b => b.status === 'active').length
      const utilization = Math.round((activeCount / workspace.capacity) * 100)
      return {
        ...workspace,
        activeBookings: activeCount,
        utilization
      }
    })
  }

  const getAverageSatisfaction = () => {
    const surveys = exitSurveys || []
    if (surveys.length === 0) return 0
    const total = surveys.reduce((sum, s) => sum + s.rating, 0)
    return (total / surveys.length).toFixed(1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground mt-1">Monitor workspace utilization and system metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            <Calendar size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{allBookings.length}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {activeBookings.length} active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <CurrencyDollar size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">${totalRevenue}</div>
            <p className="text-xs text-muted-foreground mt-1">Cost recovery tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            <ChartBar size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{completionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">{completedBookings.length} completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Satisfaction</CardTitle>
            <TrendUp size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{getAverageSatisfaction()}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Buildings size={20} />
            Workspace Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getWorkspaceUtilization().map((workspace) => (
              <div key={workspace.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{workspace.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {workspace.activeBookings}/{workspace.capacity}
                    </Badge>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{workspace.utilization}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${workspace.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {allBookings.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground text-sm">No bookings yet</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Workspace</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allBookings.slice(-10).reverse().map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.userName}</TableCell>
                      <TableCell>{getWorkspaceName(booking.workspaceId)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === 'active' ? 'default' :
                            booking.status === 'completed' ? 'secondary' :
                            'outline'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">${booking.totalCost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
