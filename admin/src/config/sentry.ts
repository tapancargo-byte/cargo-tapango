import * as Sentry from '@sentry/react';

// Read DSN and environment from Vite env (fallback to CRA env for compatibility)
const dsn = (import.meta as any)?.env?.VITE_SENTRY_DSN || process.env.REACT_APP_SENTRY_DSN;
const environment = (import.meta as any)?.env?.VITE_SENTRY_ENVIRONMENT || process.env.REACT_APP_SENTRY_ENVIRONMENT || (process.env.NODE_ENV || 'development');
const release = (import.meta as any)?.env?.VITE_APP_VERSION || undefined;

if (dsn && String(dsn).trim() !== '') {
  Sentry.init({
    dsn: String(dsn),
    environment: String(environment),
    tracesSampleRate: environment === 'development' ? 1.0 : 0.1,
    replaysSessionSampleRate: environment === 'development' ? 1.0 : 0.05,
    replaysOnErrorSampleRate: 1.0,
    debug: environment === 'development',
    release,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    sendDefaultPii: true,
  });
} else {
  console.log('Sentry disabled: VITE_SENTRY_DSN (or REACT_APP_SENTRY_DSN) not configured');
}

export { Sentry };
