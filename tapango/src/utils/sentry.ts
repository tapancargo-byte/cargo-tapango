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
        });
      })
      .catch(() => {
        console.warn(
          'Sentry DSN set but `sentry-expo` not installed. Skipping Sentry init.'
        );
      });
  } catch (e) {
    console.warn('Sentry init failed:', e);
  }
}
