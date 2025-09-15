import React from 'react';
import { render } from '@testing-library/react-native';
import Jobs from '../app/(driver)/index';

jest.mock('../src/services/driverData', () => ({
  fetchDriverJobs: jest.fn(async () => []),
}));

describe('Jobs screen state handling', () => {
  it('renders empty state when no jobs', async () => {
    const { findByText } = render(<Jobs />);
    expect(await findByText('No jobs right now')).toBeTruthy();
  });
});
