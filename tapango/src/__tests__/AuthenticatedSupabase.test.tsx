import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useAuth } from '@clerk/clerk-expo';
import {
  AuthenticatedSupabaseProvider,
  useAuthenticatedSupabase,
} from '../contexts/AuthenticatedSupabaseContext';

// Mock Clerk
jest.mock('@clerk/clerk-expo', () => ({
  useAuth: jest.fn(),
}));

// Mock Supabase client creation
jest.mock('../services/supabaseClient', () => ({
  createAuthenticatedSupabaseClient: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockCreateAuthenticatedSupabaseClient = require('../services/supabaseClient')
  .createAuthenticatedSupabaseClient as jest.MockedFunction<any>;

// Test component that uses the context
function TestComponent() {
  const { supabase, isLoading, error } = useAuthenticatedSupabase();

  return (
    <>
      <text testID='loading'>{isLoading.toString()}</text>
      <text testID='error'>{error || 'no-error'}</text>
      <text testID='has-client'>{(!!supabase).toString()}</text>
    </>
  );
}

describe('AuthenticatedSupabaseContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state when Clerk is not loaded', () => {
    mockUseAuth.mockReturnValue({
      isLoaded: false,
      isSignedIn: false,
      getToken: jest.fn(),
    } as any);

    const { getByTestId } = render(
      <AuthenticatedSupabaseProvider>
        <TestComponent />
      </AuthenticatedSupabaseProvider>
    );

    // Should be loading initially and stay loading when Clerk is not loaded
    expect(getByTestId('loading').props.children).toBe('true');
    expect(getByTestId('has-client').props.children).toBe('false');
  });

  it('should clear client when user is not signed in', async () => {
    mockUseAuth.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      getToken: jest.fn(),
    } as any);

    const { getByTestId } = render(
      <AuthenticatedSupabaseProvider>
        <TestComponent />
      </AuthenticatedSupabaseProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
    });

    expect(getByTestId('has-client').props.children).toBe('false');
    expect(getByTestId('error').props.children).toBe('no-error');
  });

  it('should create authenticated client when user is signed in', async () => {
    const mockToken = 'mock-access-token';
    const mockSupabaseClient = { from: jest.fn() };

    mockUseAuth.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      getToken: jest.fn().mockResolvedValue(mockToken),
    } as any);

    mockCreateAuthenticatedSupabaseClient.mockReturnValue(mockSupabaseClient);

    const { getByTestId } = render(
      <AuthenticatedSupabaseProvider>
        <TestComponent />
      </AuthenticatedSupabaseProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
    });

    expect(getByTestId('has-client').props.children).toBe('true');
    expect(getByTestId('error').props.children).toBe('no-error');
    expect(mockCreateAuthenticatedSupabaseClient).toHaveBeenCalledWith(mockToken);
  });

  it('should handle token retrieval errors', async () => {
    const mockError = new Error('Token retrieval failed');

    mockUseAuth.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      getToken: jest.fn().mockRejectedValue(mockError),
    } as any);

    const { getByTestId } = render(
      <AuthenticatedSupabaseProvider>
        <TestComponent />
      </AuthenticatedSupabaseProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
    });

    expect(getByTestId('has-client').props.children).toBe('false');
    expect(getByTestId('error').props.children).toBe('Token retrieval failed');
  });

  it('should handle missing token', async () => {
    mockUseAuth.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      getToken: jest.fn().mockResolvedValue(null),
    } as any);

    const { getByTestId } = render(
      <AuthenticatedSupabaseProvider>
        <TestComponent />
      </AuthenticatedSupabaseProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
    });

    expect(getByTestId('has-client').props.children).toBe('false');
    expect(getByTestId('error').props.children).toBe('Unable to retrieve access token from Clerk');
  });

  it('should handle Supabase client creation failure', async () => {
    const mockToken = 'mock-access-token';

    mockUseAuth.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      getToken: jest.fn().mockResolvedValue(mockToken),
    } as any);

    mockCreateAuthenticatedSupabaseClient.mockReturnValue(null);

    const { getByTestId } = render(
      <AuthenticatedSupabaseProvider>
        <TestComponent />
      </AuthenticatedSupabaseProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
    });

    expect(getByTestId('has-client').props.children).toBe('false');
    expect(getByTestId('error').props.children).toBe(
      'Failed to create authenticated Supabase client'
    );
  });
});

describe('useSupabase hook', () => {
  const { useSupabase } = require('../contexts/AuthenticatedSupabaseContext');

  function TestComponentWithDirectHook() {
    try {
      const supabase = useSupabase();
      return <text testID='success'>has-client</text>;
    } catch (error) {
      return <text testID='error'>{error.message}</text>;
    }
  }

  it('should throw error when client is loading', async () => {
    mockUseAuth.mockReturnValue({
      isLoaded: false,
      isSignedIn: false,
      getToken: jest.fn(),
    } as any);

    const { getByTestId } = render(
      <AuthenticatedSupabaseProvider>
        <TestComponentWithDirectHook />
      </AuthenticatedSupabaseProvider>
    );

    await waitFor(() => {
      expect(getByTestId('error').props.children).toContain('still loading');
    });
  });

  it('should throw error when not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      getToken: jest.fn(),
    } as any);

    const { getByTestId } = render(
      <AuthenticatedSupabaseProvider>
        <TestComponentWithDirectHook />
      </AuthenticatedSupabaseProvider>
    );

    await waitFor(() => {
      expect(getByTestId('error').props.children).toContain('not available');
    });
  });

  it('should return client when ready', async () => {
    const mockToken = 'mock-access-token';
    const mockSupabaseClient = { from: jest.fn() };

    mockUseAuth.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      getToken: jest.fn().mockResolvedValue(mockToken),
    } as any);

    mockCreateAuthenticatedSupabaseClient.mockReturnValue(mockSupabaseClient);

    const { getByTestId } = render(
      <AuthenticatedSupabaseProvider>
        <TestComponentWithDirectHook />
      </AuthenticatedSupabaseProvider>
    );

    await waitFor(() => {
      expect(getByTestId('success').props.children).toBe('has-client');
    });
  });
});
