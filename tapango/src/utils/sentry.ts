// Lightweight, opt-in Sentry initialization.
// Works even if the sentry-expo package is not installed.

export function initSentry() {
  try {
    const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
    if (!dsn) {
      return;
    } // Not configured

    // Dynamic import so builds succeed even without the dependency.
    // If you add `sentry-expo`, this will wire up automatically.

    // @ts-ignore - optional dependency
    import('sentry-expo')
      .then((SentryModule: any) => {
        const Sentry = SentryModule.Sentry ?? SentryModule; // compatibility
        if (!Sentry?.init) {
          console.warn('Sentry package present but missing init()');
          return;
        }
        Sentry.init({
          dsn,
          enableInExpoDevelopment: true,
          debug: __DEV__,
          tracesSampleRate: 1.0,
          beforeSend(event: any, hint: any) {
            const msg =
              (event && event.message) ||
              (hint &&
                hint.originalException &&
                hint.originalException.message) ||
              '';
            const matchMsg =
              typeof msg === 'string' &&
              (msg.includes('MCP Integration Test') ||
                msg.includes('test error'));
            const ex =
              event &&
              event.exception &&
              event.exception.values &&
              event.exception.values[0] &&
              event.exception.values[0].value;
            const matchEx =
              typeof ex === 'string' &&
              (ex.includes('MCP Integration Test') ||
                ex.includes('test error'));
            if (matchMsg || matchEx) return null;
            return event;
          },
        });
        try {
          Sentry.setTag('app', 'mobile');
        } catch {}
      })
      .catch(() => {});
  } catch (e) {
    console.warn('Sentry init failed:', e);
  }
}
