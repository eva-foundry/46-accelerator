import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { UserPlus, Trash, Lock, FileText, ShieldCheck } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { Booking, TeamMember, UserRole } from '@/lib/types'
import { ROLE_DESCRIPTIONS } from '@/lib/constants'

interface TeamManagementDialogProps {
  booking: Booking
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TeamManagementDialog({ booking, open, onOpenChange }: TeamManagementDialogProps) {
  const [teamMembers, setTeamMembers] = useKV<Record<string, TeamMember[]>>('team-members', {})

  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [newMemberRole, setNewMemberRole] = useState<UserRole>('reader')

  const members = teamMembers?.[booking.id] || []

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck size={14} weight="fill" className="text-primary" />
      case 'contributor':
        return <FileText size={14} weight="fill" className="text-teal" />
      case 'reader':
        return <Lock size={14} weight="fill" className="text-muted-foreground" />
    }
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'default'
      case 'contributor':
        return 'secondary'
      case 'reader':
        return 'outline'
    }
  }

  const handleAddMember = () => {
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      toast.error('Please enter both name and email')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newMemberEmail)) {
      toast.error('Please enter a valid email address')
      return
    }

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      addedAt: new Date().toISOString()
    }

    setTeamMembers((current) => ({
      ...(current || {}),
      [booking.id]: [...(current?.[booking.id] || []), newMember]
    }))

    toast.success(`${newMemberName} added to team as ${newMemberRole}`)
    setNewMemberName('')
    setNewMemberEmail('')
    setNewMemberRole('reader')
  }

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers((current) => ({
      ...(current || {}),
      [booking.id]: (current?.[booking.id] || []).filter(m => m.id !== memberId)
    }))
    toast.success('Team member removed')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Team Management</DialogTitle>
          <DialogDescription>
            Add team members and assign roles to control workspace access
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="border border-border rounded-lg p-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Add Team Member</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="member-name">Name</Label>
                <Input
                  id="member-name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="member-email">Email</Label>
                <Input
                  id="member-email"
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-role">Role</Label>
              <Select value={newMemberRole} onValueChange={(value) => setNewMemberRole(value as UserRole)}>
                <SelectTrigger id="member-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reader">
                    <div className="flex items-center gap-2">
                      <Lock size={16} />
                      <div>
                        <div className="font-medium">Reader</div>
                        <div className="text-xs text-muted-foreground">View-only access</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="contributor">
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      <div>
                        <div className="font-medium">Contributor</div>
                        <div className="text-xs text-muted-foreground">Upload & manage documents</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} />
                      <div>
                        <div className="font-medium">Admin</div>
                        <div className="text-xs text-muted-foreground">Full access & team management</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[newMemberRole]}</p>
            </div>

            <Button onClick={handleAddMember} className="w-full gap-2">
              <UserPlus size={18} />
              Add Team Member
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Team Members ({members.length})</h3>
            
            {members.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No team members added yet. Add members to collaborate on this workspace.
              </div>
            ) : (
              <div className="space-y-2">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={getRoleBadgeVariant(member.role)} className="gap-1">
                        {getRoleIcon(member.role)}
                        {member.role}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
