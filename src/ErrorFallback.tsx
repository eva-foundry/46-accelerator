import {
  Button,
  Card,
  makeStyles,
  shorthands,
  Text,
  Title3,
  tokens,
} from '@fluentui/react-components'
import { ArrowClockwiseRegular, WarningRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.padding('16px'),
    backgroundColor: tokens.colorNeutralBackground1,
  },
  container: {
    width: '100%',
    maxWidth: '640px',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  warning: {
    ...shorthands.border('1px', 'solid', tokens.colorPaletteRedBorder1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorPaletteRedBackground1,
    ...shorthands.padding('16px'),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('8px'),
  },
  warningTitle: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    color: tokens.colorPaletteRedForeground1,
    fontWeight: 600,
  },
  detailsHeader: {
    color: tokens.colorNeutralForeground3,
    fontWeight: 600,
    fontSize: '13px',
  },
  pre: {
    ...shorthands.padding('10px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorPaletteRedForeground1,
    fontSize: '12px',
    maxHeight: '180px',
    overflow: 'auto',
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
})

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  const styles = useStyles()

  // When encountering an error in the development mode, rethrow it and don't display the boundary.
  // The parent UI will take care of showing a more helpful dialog.
  if (import.meta.env.DEV) throw error;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.warning}>
          <div className={styles.warningTitle}>
            <WarningRegular fontSize={18} />
            <Title3>This application has encountered a runtime error</Title3>
          </div>
          <Text>
            Something unexpected happened while running the application. The error details are shown below. Contact the application owner and let them know about this issue.
          </Text>
        </div>
        
        <Card>
          <div className={styles.container} style={{ gap: '8px', padding: '16px' }}>
            <Text className={styles.detailsHeader}>Error Details:</Text>
            <pre className={styles.pre}>
            {error.message}
            </pre>
          </div>
        </Card>
        
        <Button 
          onClick={resetErrorBoundary} 
          appearance="secondary"
          icon={<ArrowClockwiseRegular />}
          style={{ width: '100%' }}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
