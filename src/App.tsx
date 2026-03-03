// EVA-STORY: F46-01-001
// EVA-STORY: F46-02-002
// EVA-STORY: F46-02-003
// EVA-STORY: F46-03-004
// EVA-FEATURE: F46-01 F46-02 F46-03
import { useState } from 'react'
import {
  tokens,
  makeStyles,
  shorthands,
} from '@fluentui/react-components'
import {
  CalendarRegular,
  BuildingRegular,
  ChartMultipleRegular,
  SparkleRegular,
} from '@fluentui/react-icons'
import { GCThemeProvider } from '@eva/gc-design-system'
import { EvaButton } from '@eva/ui'
import WorkspaceCatalog from '@/components/WorkspaceCatalog'
import MyBookings from '@/components/MyBookings'
import AdminDashboard from '@/components/AdminDashboard'
import AIAssistant from '@/components/AIAssistant'

type View = 'catalog' | 'bookings' | 'admin' | 'assistant'

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground2,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  headerContainer: {
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...shorthands.padding('16px', '24px'),
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
  },
  logo: {
    width: '40px',
    height: '40px',
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorBrandBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForegroundInverted,
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '24px',
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  mobileNav: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
      ...shorthands.gap('8px'),
      marginTop: '16px',
    },
  },
  mobileNavButton: {
    flex: 1,
  },
  main: {
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...shorthands.padding('32px', '24px'),
  },
})

function App() {
  const [currentView, setCurrentView] = useState<View>('catalog')
  const [isAdmin] = useState(true)
  const styles = useStyles()

  return (
    <GCThemeProvider variant="light">
      <div className={styles.root}>
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.headerTop}>
              <div className={styles.brand}>
                <div className={styles.logo}>
                  <BuildingRegular fontSize={24} />
                </div>
                <div className={styles.brandText}>
                  <h1 className={styles.title}>EVA Domain Assistant</h1>
                  <p className={styles.subtitle}>Workspace Booking Portal</p>
                </div>
              </div>

              <nav className={styles.nav}>
                <EvaButton
                  variant={currentView === 'catalog' ? 'primary' : 'subtle'}
                  onClick={() => setCurrentView('catalog')}
                  icon={<BuildingRegular />}
                >
                  Browse Workspaces
                </EvaButton>
                <EvaButton
                  variant={currentView === 'bookings' ? 'primary' : 'subtle'}
                  onClick={() => setCurrentView('bookings')}
                  icon={<CalendarRegular />}
                >
                  My Bookings
                </EvaButton>
                <EvaButton
                  variant={currentView === 'assistant' ? 'primary' : 'subtle'}
                  onClick={() => setCurrentView('assistant')}
                  icon={<SparkleRegular />}
                >
                  AI Assistant
                </EvaButton>
                {isAdmin && (
                  <EvaButton
                    variant={currentView === 'admin' ? 'primary' : 'subtle'}
                    onClick={() => setCurrentView('admin')}
                    icon={<ChartMultipleRegular />}
                  >
                    Admin
                  </EvaButton>
                )}
              </nav>
            </div>

            <nav className={styles.mobileNav}>
              <EvaButton
                variant={currentView === 'catalog' ? 'primary' : 'outline'}
                onClick={() => setCurrentView('catalog')}
                icon={<BuildingRegular />}
                size="small"
                className={styles.mobileNavButton}
              >
                Workspaces
              </EvaButton>
              <EvaButton
                variant={currentView === 'bookings' ? 'primary' : 'outline'}
                onClick={() => setCurrentView('bookings')}
                icon={<CalendarRegular />}
                size="small"
                className={styles.mobileNavButton}
              >
                Bookings
              </EvaButton>
              <EvaButton
                variant={currentView === 'assistant' ? 'primary' : 'outline'}
                onClick={() => setCurrentView('assistant')}
                icon={<SparkleRegular />}
                size="small"
                className={styles.mobileNavButton}
              >
                AI
              </EvaButton>
              {isAdmin && (
                <EvaButton
                  variant={currentView === 'admin' ? 'primary' : 'outline'}
                  onClick={() => setCurrentView('admin')}
                  icon={<ChartMultipleRegular />}
                  size="small"
                  className={styles.mobileNavButton}
                >
                  Admin
                </EvaButton>
              )}
            </nav>
          </div>
        </header>

        <main className={styles.main}>
          {currentView === 'catalog' && <WorkspaceCatalog />}
          {currentView === 'bookings' && <MyBookings />}
          {currentView === 'admin' && <AdminDashboard />}
          {currentView === 'assistant' && <AIAssistant />}
        </main>
      </div>
    </GCThemeProvider>
  )
}

export default App
