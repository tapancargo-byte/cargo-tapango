import React from 'react'
import { Animated, Easing } from 'react-native'

export const FadeIn: React.FC<{ children: React.ReactNode; duration?: number; delay?: number }>
  = ({ children, duration = 180, delay = 0 }) => {
  const opacity = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    const start = () => Animated.timing(opacity, { toValue: 1, duration, easing: Easing.out(Easing.ease), useNativeDriver: true }).start()
    if (delay > 0) {
      const id = setTimeout(start, delay)
      return () => { clearTimeout(id) }
    }
    start()
    return () => {}
  }, [opacity, duration, delay])

  return <Animated.View style={{ opacity }}>{children}</Animated.View>
}
