declare module 'tamagui' {
  // Lightweight fallbacks to ease TS friction while UI stabilizes.
  // Only used for types; runtime still uses real library.
  export const YStack: any
  export const XStack: any
  export const Stack: any
  export const ScrollView: any
  export const Text: any
  // Keeping placeholders for legacy imports. Avoid using H* in new code.
  export const H1: any
  export const H2: any
  export const H4: any
  export const Square: any
  export const Card: any
  export const Separator: any
  export const Label: any
  export const Button: any
  export const Tabs: any
  export const Adapt: any
  export const Sheet: any
  export const Input: any
  export const ListItem: any
  export const Switch: any
  export const TamaguiProvider: any
  export const Theme: any
  export function createTamagui(...args: any[]): any
  export type ButtonProps = any
  export type CardProps = any
  export type InputProps = any
  export type SheetProps = any
  export type SelectProps = any
  export const Select: any
  export function useTheme(): any
}
