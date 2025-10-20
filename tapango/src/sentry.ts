import * as Sentry from '@sentry/react-native';

const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

if (!sentryDsn) {
  console.warn('Sentry DSN not configured, skipping Sentry initialization');
} else {
  Sentry.init({
    dsn: sentryDsn,
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // Reduce sampling in production
    // Session Replay
    replaysOnErrorSampleRate: 1.0, // Capture 100% of errors with replays
    replaysSessionSampleRate:
      process.env.NODE_ENV === 'production' ? 0.01 : 0.1, // Lower in production
    // Set profiling sample rate
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    environment: process.env.NODE_ENV || 'development',
    // Enable debug mode in development
    debug: process.env.NODE_ENV !== 'production',

    // Enhanced error filtering and context
    // Use a broad signature to satisfy RN types across versions
    beforeSend(event: any, _hint?: any) {
      // Don't send errors in development unless they're intentional test errors
      if (process.env.NODE_ENV === 'development') {
        // Allow test errors through for MCP integration testing
        if (
          event?.exception?.values?.[0]?.value?.includes?.('Sentry test error')
        ) {
          return event;
        }
        // Filter out other errors in development
        return null;
      }
      return event;
    },

    // Performance monitoring
    enableAutoPerformanceTracing: true,

    // Enhanced context for MCP integration
    initialScope: {
      tags: {
        component: 'tapango-mobile',
        platform: 'react-native',
      },
      contexts: {
        app: {
          name: 'TAPANGO',
          version: '1.0.0',
        },
      },
    },

    // Enable user feedback for better MCP integration
    enableUserInteractionTracing: true,
  });

  // Set global context for MCP integration
  Sentry.setContext('mcp_integration', {
    enabled: true,
    version: '1.0.0',
    features: ['error_tracking', 'performance_monitoring', 'session_replay'],
  });
}

// Export helper functions for MCP integration
export const captureTestError = (
  message: string,
  extra?: Record<string, any>
) => {
  return Sentry.captureException(
    new Error(`Sentry test error: ${message}`),
    (scope) => {
      try {
        scope.setTags?.({ test_error: true } as any);
        if (extra) scope.setExtras?.(extra as any);
      } catch {}
      return scope;
    }
  );
};

export const captureMCPEvent = (action: string, data?: Record<string, any>) => {
  const crumb: any = {
    category: 'mcp',
    message: `MCP Action: ${action}`,
    level: 'info',
  };
  if (data) crumb.data = data;
  return Sentry.addBreadcrumb(crumb);
};

export default Sentry;
