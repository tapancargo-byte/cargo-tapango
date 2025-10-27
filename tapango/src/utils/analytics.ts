export type AnalyticsEvent = {
  name: string;
  props?: Record<string, any>;
};

let inited = false;

export function initAnalytics() {
  inited = true;
}

export function track(name: string, props?: Record<string, any>) {
  try {
    if (!inited) initAnalytics();
    // Console fallback
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('[analytics]', name, props || {});
    }
    // Best-effort Sentry breadcrumb
    try {
      // Dynamic import to avoid bundling hard dep path errors in web
      // @ts-ignore
      import('@sentry/react-native').then((S) => {
        try {
          S?.addBreadcrumb?.({
            category: 'analytics',
            message: name,
            data: props || {},
          });
        } catch {}
      });
    } catch {}
  } catch {}
}
