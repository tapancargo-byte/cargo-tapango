import React from 'react'
import { Stack } from 'tamagui'

export interface CircleProps extends React.ComponentProps<typeof Stack> {
  size: number
}

export const Circle: React.FC<CircleProps> = ({ size, children, ...props }) => {
  return (
    <Stack
      width={size}
      height={size}
      borderRadius={size / 2}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </Stack>
  )
}