// @ts-nocheck
// Storybook web stub for expo-haptics

export enum ImpactFeedbackStyle {
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy',
  Rigid = 'Rigid',
  Soft = 'Soft',
}

export enum NotificationFeedbackType {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error',
}

export async function impactAsync(style: ImpactFeedbackStyle = ImpactFeedbackStyle.Light) {
  if (process?.env?.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[expo-haptics mock] impactAsync', style)
  }
}

export async function selectionAsync() {
  if (process?.env?.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[expo-haptics mock] selectionAsync')
  }
}

export async function notificationAsync(type: NotificationFeedbackType = NotificationFeedbackType.Success) {
  if (process?.env?.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[expo-haptics mock] notificationAsync', type)
  }
}

export default {
  ImpactFeedbackStyle,
  NotificationFeedbackType,
  impactAsync,
  selectionAsync,
  notificationAsync,
}
