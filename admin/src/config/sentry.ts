import * as Sentry from '@sentry/react';
import React from 'react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

// Read DSN and environment from Vite env (fallback to CRA env for compatibility)
const env = (import.meta as any)?.env ?? {};
const dsn = env.VITE_SENTRY_DSN || '';
const environment = env.VITE_SENTRY_ENVIRONMENT || env.MODE || (env.DEV ? 'development' : 'production');
const release = env.VITE_APP_VERSION || undefined;

if (dsn && String(dsn).trim() !== '') {
  Sentry.init({
    dsn: String(dsn),
    environment: String(environment),
    tracesSampleRate: environment === 'development' ? 1.0 : 0.1,
    replaysSessionSampleRate: environment === 'development' ? 1.0 : 0.05,
    replaysOnErrorSampleRate: 1.0,
    debug: environment === 'development',
    release,
    integrations: [
      Sentry.reactRouterV7BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration(),
    ],
    sendDefaultPii: true,
    beforeSend(event, hint) {
      const msg = (event && (event as any).message) || (hint && (hint as any).originalException && ((hint as any).originalException.message || String((hint as any).originalException))) || '';
      const ex = event && (event as any).exception && (event as any).exception.values && (event as any).exception.values[0] && (event as any).exception.values[0].value;
      if (typeof msg === 'string' && (msg.includes('MCP Integration Test') || msg.includes('test error'))) return null;
      if (typeof ex === 'string' && (ex.includes('MCP Integration Test') || ex.includes('test error'))) return null;
      return event as any;
    },
  });
  Sentry.setTag('app', 'admin');
} else {
  console.log('Sentry disabled: VITE_SENTRY_DSN (or REACT_APP_SENTRY_DSN) not configured');
}

export { Sentry };
