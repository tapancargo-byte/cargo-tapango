import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { KycUploader } from '../src/ui/driver/KycUploader';

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(async () => ({ canceled: true })),
  MediaTypeOptions: { Images: 'Images' },
}));

describe('KycUploader', () => {
  it('renders label and button', () => {
    const { getByText } = render(<KycUploader label='Upload RC' onPick={() => {}} />);
    expect(getByText('Upload RC')).toBeTruthy();
    expect(getByText('Upload')).toBeTruthy();
  });
});
