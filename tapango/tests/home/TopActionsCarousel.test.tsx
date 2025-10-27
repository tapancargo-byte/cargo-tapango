import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TopActionsCarousel } from '../../src/components/home/TopActionsCarousel';

const colors = {
  background: '#fff',
  primary: '#0D47A1',
  secondary: '#5E35B1',
  accent: '#FF8F00',
  border: '#eee',
  surface: '#fff',
};

test('TopActionsCarousel renders and fires callbacks', () => {
  const onNew = jest.fn();
  const onTrack = jest.fn();
  const onOrders = jest.fn();

  const { getByA11yLabel, getByText } = render(
    <TopActionsCarousel
      colors={colors as any}
      onNewOrder={onNew}
      onTrack={onTrack}
      onViewOrders={onOrders}
    />
  );

  expect(getByText('Create New Shipment')).toBeTruthy();
  fireEvent.press(getByA11yLabel('Create new shipment'));
  expect(onNew).toHaveBeenCalled();

  fireEvent.press(getByA11yLabel('Track package'));
  expect(onTrack).toHaveBeenCalled();

  fireEvent.press(getByA11yLabel('View orders'));
  expect(onOrders).toHaveBeenCalled();
});
