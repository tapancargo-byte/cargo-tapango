import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { JobCard } from '../src/ui/driver/JobCard';
import DriverBid from '../app/(driver)/bid';
import { TransactionRow } from '../src/ui/driver/TransactionRow';

// Basic smoke tests to validate rendering and simple interactions

describe('Driver UI components', () => {
  test('JobCard renders route and payout', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <JobCard id='J1' origin='Imphal' destination='New Delhi' payoutINR={1850} onPress={onPress} />
    );
    expect(getByText('Imphal → New Delhi')).toBeTruthy();
    expect(getByText(/₹1,850/)).toBeTruthy();
  });

  test('TransactionRow formats credit value and date', () => {
    const { getByText } = render(
      <TransactionRow
        title='Delivery payout'
        amountINR={1850}
        type='credit'
        date={new Date('2024-01-01T10:00:00Z').toISOString()}
      />
    );
    expect(getByText(/₹1,850/)).toBeTruthy();
  });

  test('Bid form validates amount and tracking ID', async () => {
    const { getByText, getByLabelText } = render(<DriverBid />);
    const submit = getByText('Submit Offer');
    fireEvent.press(submit);
    expect(getByText('Tracking ID is required')).toBeTruthy();

    const tracking = getByLabelText('Tracking ID');
    fireEvent.changeText(tracking, 'TPG123');
    fireEvent.press(submit);
    expect(getByText('Enter a valid amount')).toBeTruthy();
  });
});
