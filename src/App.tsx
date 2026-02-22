import { useState } from 'react'
import {
  FluentProvider,
  webLightTheme,
  Button,
  tokens,
  makeStyles,
  shorthands,
} from '@fluentui/react-components'
import {
  CalendarRegular,
  BuildingRegular,
  ChartMultipleRegular,
} from '@fluentui/react-icons'
import WorkspaceCatalog from '@/components/WorkspaceCatalog'
import MyBookings from '@/components/MyBookings'
import AdminDashboard from '@/components/AdminDashboard'

type View = 'catalog' | 'bookings' | 'admin'

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
    <FluentProvider theme={webLightTheme}>
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
                <Button
                  appearance={currentView === 'catalog' ? 'primary' : 'subtle'}
                  onClick={() => setCurrentView('catalog')}
                  icon={<BuildingRegular />}
                >
                  Browse Workspaces
                </Button>
                <Button
                  appearance={currentView === 'bookings' ? 'primary' : 'subtle'}
                  onClick={() => setCurrentView('bookings')}
                  icon={<CalendarRegular />}
                >
                  My Bookings
                </Button>
                {isAdmin && (
                  <Button
                    appearance={currentView === 'admin' ? 'primary' : 'subtle'}
                    onClick={() => setCurrentView('admin')}
                    icon={<ChartMultipleRegular />}
                  >
                    Admin
                  </Button>
                )}
              </nav>
            </div>

            <nav className={styles.mobileNav}>
              <Button
                appearance={currentView === 'catalog' ? 'primary' : 'outline'}
                onClick={() => setCurrentView('catalog')}
                icon={<BuildingRegular />}
                size="small"
                className={styles.mobileNavButton}
              >
                Workspaces
              </Button>
              <Button
                appearance={currentView === 'bookings' ? 'primary' : 'outline'}
                onClick={() => setCurrentView('bookings')}
                icon={<CalendarRegular />}
                size="small"
                className={styles.mobileNavButton}
              >
                Bookings
              </Button>
              {isAdmin && (
                <Button
                  appearance={currentView === 'admin' ? 'primary' : 'outline'}
                  onClick={() => setCurrentView('admin')}
                  icon={<ChartMultipleRegular />}
                  size="small"
                  className={styles.mobileNavButton}
                >
                  Admin
                </Button>
              )}
            </nav>
          </div>
        </header>

        <main className={styles.main}>
          {currentView === 'catalog' && <WorkspaceCatalog />}
          {currentView === 'bookings' && <MyBookings />}
          {currentView === 'admin' && <AdminDashboard />}
        </main>
      </div>
    </FluentProvider>
  )
}

export default App
