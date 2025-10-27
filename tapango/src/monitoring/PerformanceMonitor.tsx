import React from 'react';
import { InteractionManager, Platform } from 'react-native';

// Performance metrics interface
interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

// Performance monitoring class
class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private listeners: ((metric: PerformanceMetric) => void)[] = [];
  private isEnabled: boolean = __DEV__;

  // Enable/disable monitoring
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  // Start tracking a metric
  startMetric(name: string, metadata?: Record<string, any>): void {
    if (!this.isEnabled) {
      return;
    }

    const startTime = Performance.now() || Date.now();
    const entry: PerformanceMetric = {
      name,
      startTime,
      ...(metadata ? { metadata } : {}),
    };
    this.metrics.set(name, entry);
  }

  // End tracking a metric
  endMetric(name: string, additionalMetadata?: Record<string, any>): PerformanceMetric | null {
    if (!this.isEnabled) {
      return null;
    }

    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`Performance metric '${name}' was not started`);
      return null;
    }

    const endTime = Performance.now() || Date.now();
    const duration = endTime - metric.startTime;

    const completedMetric: PerformanceMetric = {
      ...metric,
      endTime,
      duration,
      metadata: {
        ...metric.metadata,
        ...additionalMetadata,
      },
    };

    this.metrics.delete(name);
    this.notifyListeners(completedMetric);

    return completedMetric;
  }

  // Get all tracked metrics
  getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  // Add listener for completed metrics
  addListener(listener: (metric: PerformanceMetric) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners
  private notifyListeners(metric: PerformanceMetric): void {
    this.listeners.forEach((listener) => listener(metric));
  }

  // Track user flow
  trackUserFlow(
    flowName: string,
    metadata?: Record<string, any>
  ): {
    step: (stepName: string, stepMetadata?: Record<string, any>) => void;
    complete: (completionMetadata?: Record<string, any>) => void;
  } {
    const flowKey = `flow_${flowName}`;
    this.startMetric(flowKey, { type: 'user_flow', ...metadata });

    return {
      step: (stepName: string, stepMetadata?: Record<string, any>) => {
        const stepKey = `${flowKey}_step_${stepName}`;
        this.startMetric(stepKey, {
          type: 'flow_step',
          flowName,
          stepName,
          ...stepMetadata,
        });
        // Auto-complete step after 50ms (next tick)
        setTimeout(() => this.endMetric(stepKey), 50);
      },
      complete: (completionMetadata?: Record<string, any>) => {
        this.endMetric(flowKey, completionMetadata);
      },
    };
  }

  // Track API calls
  trackAPICall(
    endpoint: string,
    method: string = 'GET'
  ): {
    success: (response?: any) => void;
    error: (error: Error) => void;
  } {
    const apiKey = `api_${method}_${endpoint.replace(/\//g, '_')}`;
    this.startMetric(apiKey, {
      type: 'api_call',
      endpoint,
      method,
    });

    return {
      success: (response?: any) => {
        this.endMetric(apiKey, {
          status: 'success',
          responseSize: JSON.stringify(response || {}).length,
        });
      },
      error: (error: Error) => {
        this.endMetric(apiKey, {
          status: 'error',
          errorMessage: error.message,
        });
      },
    };
  }

  // Clear all metrics
  clear(): void {
    this.metrics.clear();
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hooks for performance monitoring
export const usePerformanceTracking = (screenName: string) => {
  React.useEffect(() => {
    const metricName = `screen_${screenName}`;
    performanceMonitor.startMetric(metricName, {
      type: 'screen_render',
      screenName,
    });

    const cleanup = InteractionManager.runAfterInteractions(() => {
      performanceMonitor.endMetric(metricName, {
        interactive: true,
      });
    });

    return () => {
      cleanup.cancel();
      // End metric if it's still running
      if (performanceMonitor.getMetrics().some((m) => m.name === metricName)) {
        performanceMonitor.endMetric(metricName, {
          interrupted: true,
        });
      }
    };
  }, [screenName]);
};

// Hook for tracking component render performance
export const useRenderPerformance = (componentName: string) => {
  const renderCount = React.useRef(0);
  const lastRenderTime = React.useRef(0);

  React.useEffect(() => {
    renderCount.current += 1;
    const currentTime = Performance.now() || Date.now();

    if (lastRenderTime.current > 0) {
      const timeSinceLastRender = currentTime - lastRenderTime.current;

      // Track re-renders that take too long
      if (timeSinceLastRender > 100) {
        performanceMonitor.startMetric(`component_${componentName}_slow_render`, {
          type: 'component_render',
          componentName,
          renderCount: renderCount.current,
          timeSinceLastRender,
        });

        // End immediately as this is a point-in-time metric
        performanceMonitor.endMetric(`component_${componentName}_slow_render`);
      }
    }

    lastRenderTime.current = currentTime;
  });

  return {
    renderCount: renderCount.current,
  };
};

// Hook for tracking async operations
export const useAsyncOperationTracking = () => {
  const trackAsync = React.useCallback(
    <T,>(
      operationName: string,
      asyncOperation: Promise<T>,
      metadata?: Record<string, any>
    ): Promise<T> => {
      const tracker = performanceMonitor.trackAPICall(operationName, 'ASYNC');

      return asyncOperation
        .then((result) => {
          tracker.success(metadata);
          return result;
        })
        .catch((error: unknown) => {
          tracker.error(error as Error);
          throw error;
        });
    },
    []
  );

  return { trackAsync };
};

// Performance monitoring provider
interface PerformanceProviderProps {
  children: React.ReactNode;
  onMetricCompleted?: (metric: PerformanceMetric) => void;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({
  children,
  onMetricCompleted,
}) => {
  React.useEffect(() => {
    if (!onMetricCompleted) {
      return;
    }

    const unsubscribe = performanceMonitor.addListener(onMetricCompleted);
    return unsubscribe;
  }, [onMetricCompleted]);

  return <>{children}</>;
};

// Performance metrics aggregation
export const getPerformanceReport = (): {
  screenRenders: PerformanceMetric[];
  apiCalls: PerformanceMetric[];
  userFlows: PerformanceMetric[];
  averages: {
    screenRenderTime: number;
    apiCallTime: number;
  };
} => {
  const allMetrics = performanceMonitor.getMetrics();

  const screenRenders = allMetrics.filter((m) => m.metadata?.type === 'screen_render');
  const apiCalls = allMetrics.filter((m) => m.metadata?.type === 'api_call');
  const userFlows = allMetrics.filter((m) => m.metadata?.type === 'user_flow');

  const averageScreenRenderTime =
    screenRenders.reduce((sum, m) => sum + (m.duration || 0), 0) / screenRenders.length || 0;
  const averageApiCallTime =
    apiCalls.reduce((sum, m) => sum + (m.duration || 0), 0) / apiCalls.length || 0;

  return {
    screenRenders,
    apiCalls,
    userFlows,
    averages: {
      screenRenderTime: averageScreenRenderTime,
      apiCallTime: averageApiCallTime,
    },
  };
};

// Development-only performance overlay
export const PerformanceOverlay: React.FC = () => {
  const [metrics, setMetrics] = React.useState<PerformanceMetric[]>([]);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!__DEV__) {
      return;
    }

    const unsubscribe = performanceMonitor.addListener((metric) => {
      setMetrics((prev) => [...prev.slice(-9), metric]); // Keep last 10 metrics
    });

    return unsubscribe;
  }, []);

  if (!__DEV__ || !isVisible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: 8,
        fontSize: 12,
        zIndex: 9999,
        maxHeight: 200,
        overflow: 'auto',
      }}
    >
      <button
        onClick={() => setIsVisible(false)}
        style={{ float: 'right', background: 'red', color: 'white', border: 'none' }}
      >
        ×
      </button>
      <h3>Performance Metrics</h3>
      {metrics.map((metric, index) => (
        <div key={index}>
          <strong>{metric.name}:</strong> {metric.duration?.toFixed(2)}ms
          {metric.metadata?.type && <span> ({metric.metadata.type})</span>}
        </div>
      ))}
    </div>
  );
};

// Performance context for React components
interface PerformanceContextType {
  startMetric: (name: string, metadata?: Record<string, any>) => void;
  endMetric: (name: string, metadata?: Record<string, any>) => void;
  trackUserFlow: typeof performanceMonitor.trackUserFlow;
}

const PerformanceContext = React.createContext<PerformanceContextType>({
  startMetric: () => {},
  endMetric: () => {},
  trackUserFlow: () => ({ step: () => {}, complete: () => {} }),
});

export const usePerformanceContext = () => React.useContext(PerformanceContext);

// Polyfill for Performance.now() if not available
const Performance = {
  now: () => {
    if (typeof performance !== 'undefined' && performance.now) {
      return performance.now();
    }
    return Date.now();
  },
};
