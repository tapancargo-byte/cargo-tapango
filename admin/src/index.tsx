import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

Sentry.init({
  dsn: (import.meta as any)?.env?.VITE_SENTRY_DSN,
  environment: (import.meta as any)?.env?.VITE_SENTRY_ENVIRONMENT || 'development',
  tracesSampleRate: 1.0,
});

// Emit a one-time setup test event in development to verify Sentry ingestion
const __mode = (import.meta as any)?.env?.MODE || (import.meta as any)?.env?.NODE_ENV || 'development';
if (__mode !== 'production' && !(globalThis as any).__SENTRY_FIRST_EVENT) {
  (globalThis as any).__SENTRY_FIRST_EVENT = true;
  Sentry.captureException(new Error('Sentry setup test error (admin)'));
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
