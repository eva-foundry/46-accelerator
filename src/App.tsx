import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { Calendar, Buildings, Users, ClipboardText, ChartBar } from '@phosphor-icons/react'
import WorkspaceCatalog from '@/components/WorkspaceCatalog'
import MyBookings from '@/components/MyBookings'
import AdminDashboard from '@/components/AdminDashboard'

type View = 'catalog' | 'bookings' | 'admin'

function App() {
  const [currentView, setCurrentView] = useState<View>('catalog')
  const [isAdmin] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Buildings size={24} weight="duotone" className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground tracking-tight">EVA Domain Assistant</h1>
                <p className="text-xs text-muted-foreground">Workspace Booking Portal</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant={currentView === 'catalog' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('catalog')}
                className="gap-2"
              >
                <Buildings size={18} />
                Browse Workspaces
              </Button>
              <Button
                variant={currentView === 'bookings' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('bookings')}
                className="gap-2"
              >
                <Calendar size={18} />
                My Bookings
              </Button>
              {isAdmin && (
                <Button
                  variant={currentView === 'admin' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('admin')}
                  className="gap-2"
                >
                  <ChartBar size={18} />
                  Admin
                </Button>
              )}
            </nav>
          </div>
          
          <nav className="md:hidden flex items-center gap-2 mt-4">
            <Button
              variant={currentView === 'catalog' ? 'default' : 'outline'}
              onClick={() => setCurrentView('catalog')}
              size="sm"
              className="flex-1 gap-1.5"
            >
              <Buildings size={16} />
              <span className="text-xs">Workspaces</span>
            </Button>
            <Button
              variant={currentView === 'bookings' ? 'default' : 'outline'}
              onClick={() => setCurrentView('bookings')}
              size="sm"
              className="flex-1 gap-1.5"
            >
              <Calendar size={16} />
              <span className="text-xs">Bookings</span>
            </Button>
            {isAdmin && (
              <Button
                variant={currentView === 'admin' ? 'default' : 'outline'}
                onClick={() => setCurrentView('admin')}
                size="sm"
                className="flex-1 gap-1.5"
              >
                <ChartBar size={16} />
                <span className="text-xs">Admin</span>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'catalog' && <WorkspaceCatalog />}
        {currentView === 'bookings' && <MyBookings />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      <Toaster />
    </div>
  )
}

export default App
