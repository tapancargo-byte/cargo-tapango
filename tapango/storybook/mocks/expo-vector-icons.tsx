// @ts-nocheck
import React from 'react'

// Minimal stub for @expo/vector-icons in Storybook web
// Provides a generic Icon that renders a square placeholder
export const createIconSet = () => Icon

export function Icon(props) {
  const { name, size = 24, color = '#666', style } = props || {}
  return (
    <div
      title={name}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        background: 'linear-gradient(135deg, rgba(200,200,220,0.4), rgba(160,160,190,0.2))',
        borderRadius: 4,
        color,
        ...style,
      }}
    />
  )
}

// Export common icon set names that apps often import directly
export const AntDesign = Icon
export const Entypo = Icon
export const EvilIcons = Icon
export const Feather = Icon
export const FontAwesome = Icon
export const FontAwesome5 = Icon
export const FontAwesome6 = Icon
export const Fontisto = Icon
export const Foundation = Icon
export const Ionicons = Icon
export const MaterialIcons = Icon
export const MaterialCommunityIcons = Icon
export const Octicons = Icon
export const SimpleLineIcons = Icon
export const Zocial = Icon

export default {
  createIconSet,
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
}
