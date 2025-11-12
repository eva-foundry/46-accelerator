import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Lock, Sparkle, Translate, FileText, Flask, CheckCircle } from '@phosphor-icons/react'
import { WORKSPACES, WORKSPACE_TYPE_LABELS } from '@/lib/constants'
import type { Workspace } from '@/lib/types'
import BookingDialog from './BookingDialog'

const getWorkspaceIcon = (type: string) => {
  switch (type) {
    case 'protected-b':
      return <Lock size={24} weight="duotone" className="text-primary" />
    case 'ocr-enabled':
      return <FileText size={24} weight="duotone" className="text-teal" />
    case 'translation':
      return <Translate size={24} weight="duotone" className="text-accent" />
    case 'summarization':
      return <Sparkle size={24} weight="duotone" className="text-secondary" />
    default:
      return <Flask size={24} weight="duotone" className="text-muted-foreground" />
  }
}

export default function WorkspaceCatalog() {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)

  const handleBookWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace)
    setBookingDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Available Workspaces</h2>
        <p className="text-muted-foreground mt-1">Select a workspace environment that matches your AI exploration needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORKSPACES.map((workspace) => (
          <Card key={workspace.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getWorkspaceIcon(workspace.type)}
                    <Badge variant="secondary" className="text-xs">
                      {WORKSPACE_TYPE_LABELS[workspace.type]}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{workspace.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm mt-2">{workspace.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Key Features</p>
                <div className="flex flex-wrap gap-1.5">
                  {workspace.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs text-foreground bg-muted px-2 py-1 rounded">
                      <CheckCircle size={12} weight="fill" className="text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="text-sm font-semibold text-foreground">{workspace.capacity} users</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-sm font-semibold text-foreground">${workspace.pricePerWeek}/week</p>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                className="w-full gap-2" 
                onClick={() => handleBookWorkspace(workspace)}
              >
                <Calendar size={18} />
                Book This Workspace
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedWorkspace && (
        <BookingDialog
          workspace={selectedWorkspace}
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
        />
      )}
    </div>
  )
}
