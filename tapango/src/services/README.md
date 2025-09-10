# Services

This directory contains all business logic services that handle data operations, external integrations, and core application functionality.

## 🎯 Service Architecture

### Single Responsibility
Each service handles one specific domain:
- **Auth Service**: Authentication and user management
- **API Service**: HTTP client and endpoint management  
- **Storage Service**: Local data persistence
- **Location Service**: GPS tracking and geolocation
- **Notification Service**: Push notifications and alerts
- **Payment Service**: Payment processing integration

### Service Layer Benefits
- Separation of concerns from UI components
- Centralized business logic
- Easy testing and mocking
- Consistent error handling
- Reusable across components

## 📋 Service Catalog

### Core Services

#### Authentication Service
```typescript
// authService.ts
export interface AuthService {
  signIn(email: string, password: string): Promise<AuthResult>;
  signOut(): Promise<void>;
  signUp(userData: SignUpData): Promise<AuthResult>;
  resetPassword(email: string): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(): Promise<string>;
}
```

#### API Service  
```typescript
// apiService.ts
export interface ApiService {
  get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T>;
  post<T>(endpoint: string, data?: Record<string, unknown>): Promise<T>;
  put<T>(endpoint: string, data?: Record<string, unknown>): Promise<T>;
  delete<T>(endpoint: string): Promise<T>;
}
```

#### Storage Service
```typescript
// storageService.ts  
export interface StorageService {
  setItem<T>(key: string, value: T): Promise<void>;
  getItem<T>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

## 🔧 Service Template

```typescript
// src/services/exampleService.ts
import { ApiError } from '@/types/errors';

export class ExampleService {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetches example data from the API
   * 
   * @param id - Unique identifier
   * @returns Promise resolving to example data
   * @throws {ApiError} When request fails
   */
  async getExample(id: string): Promise<ExampleData> {
    try {
      const response = await fetch(`${this.baseUrl}/examples/${id}`);
      
      if (!response.ok) {
        throw new ApiError(`Failed to fetch example: ${response.status}`);
      }
      
      return await response.json() as ExampleData;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred');
    }
  }

  /**
   * Creates new example data
   * 
   * @param data - Example data to create
   * @returns Promise resolving to created example
   */
  async createExample(data: CreateExampleData): Promise<ExampleData> {
    try {
      const response = await fetch(`${this.baseUrl}/examples`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(`Failed to create example: ${response.status}`);
      }

      return await response.json() as ExampleData;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to create example');
    }
  }
}

// Export singleton instance
export const exampleService = new ExampleService(
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000'
);
```

## 🧪 Testing Requirements

Every service must have comprehensive tests:

```typescript
// exampleService.test.ts
import { exampleService } from './exampleService';
import { ApiError } from '@/types/errors';

// Mock fetch
global.fetch = jest.fn();

describe('ExampleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getExample', () => {
    it('returns example data for valid id', async () => {
      const mockData = { id: '123', name: 'Test' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await exampleService.getExample('123');
      expect(result).toEqual(mockData);
    });

    it('throws ApiError for 404 response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(exampleService.getExample('invalid')).rejects.toThrow(ApiError);
    });

    it('throws ApiError for network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(exampleService.getExample('123')).rejects.toThrow(ApiError);
    });
  });
});
```

## 🔒 Security Guidelines

### Input Validation
```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const createUser = async (data: unknown) => {
  // Validate input
  const validatedData = CreateUserSchema.parse(data);
  
  // Proceed with validated data
  return await apiService.post('/users', validatedData);
};
```

### Error Handling
```typescript
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Never expose internal errors to users
catch (error) {
  console.error('Internal service error:', error);
  throw new ApiError('Operation failed. Please try again.');
}
```

### Authentication
```typescript
// Always include auth headers
const makeAuthenticatedRequest = async (url: string, options: RequestInit) => {
  const token = await getAuthToken();
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
```

## ⚡ Performance Guidelines

### Request Optimization
- Use request deduplication for identical calls
- Implement proper caching strategies
- Use request/response compression
- Handle timeouts appropriately

### Memory Management
- Clean up resources properly
- Avoid memory leaks in long-running services
- Use weak references where appropriate
- Implement proper cleanup in useEffect

### Error Recovery
- Implement exponential backoff for retries
- Handle offline scenarios gracefully  
- Provide fallback mechanisms
- Cache critical data locally

## 📚 Integration Patterns

### React Query Integration
```typescript
// hooks/useExample.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { exampleService } from '@/services/exampleService';

export const useExample = (id: string) => {
  return useQuery({
    queryKey: ['example', id],
    queryFn: () => exampleService.getExample(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateExample = () => {
  return useMutation({
    mutationFn: exampleService.createExample,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
  });
};
```

### Service Dependencies
```typescript
// Dependency injection pattern
export class OrderService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}
  
  async createOrder(orderData: CreateOrderData) {
    const user = await this.authService.getCurrentUser();
    if (!user) throw new Error('Authentication required');
    
    const order = await this.apiService.post('/orders', {
      ...orderData,
      userId: user.id,
    });
    
    // Cache locally
    await this.storageService.setItem(`order-${order.id}`, order);
    
    return order;
  }
}
```

## 🚀 Best Practices

1. **Single Responsibility**: Each service handles one domain
2. **Interface Segregation**: Define clear service interfaces
3. **Dependency Injection**: Use constructor injection for dependencies
4. **Error Boundaries**: Implement proper error handling
5. **Type Safety**: Use TypeScript strict mode throughout
6. **Testing**: Maintain 95%+ test coverage
7. **Documentation**: Document all public methods with TSDoc
8. **Performance**: Optimize for mobile constraints
