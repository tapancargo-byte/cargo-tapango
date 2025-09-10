import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button Component', () => {
  const defaultProps = {
    title: 'Test Button',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button {...defaultProps} onPress={onPress} />);
    
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading text when loading', () => {
    const { getByText } = render(<Button {...defaultProps} loading />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { getByText } = render(<Button {...defaultProps} variant="secondary" />);
    expect(getByText('Test Button')).toBeTruthy();
  });
});
