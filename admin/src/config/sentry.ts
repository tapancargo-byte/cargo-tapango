import * as Sentry from "@sentry/react";

// Get version from package.json for release tracking
const packageJson = require('../../package.json');

// Read DSN from environment variables
const dsn = process.env.REACT_APP_SENTRY_DSN;
const environment = process.env.REACT_APP_SENTRY_ENVIRONMENT || 'development';

// Only initialize Sentry if DSN is provided
if (dsn && dsn.trim() !== '') {
  Sentry.init({
    dsn: dsn,
    environment: environment,
    // Enable performance monitoring
    tracesSampleRate: environment === 'development' ? 1.0 : 0.1,
    // Enable Session Replay
    replaysSessionSampleRate: environment === 'development' ? 1.0 : 0.05,
    replaysOnErrorSampleRate: 1.0,
    // Enable debug in development
    debug: environment === 'development',
    // Release tracking for health monitoring
    release: packageJson.version,
    // Integrations
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Send default PII for better context
    sendDefaultPii: true,
  });
} else {
  console.log('Sentry disabled: REACT_APP_SENTRY_DSN not configured');
}

export { Sentry };
