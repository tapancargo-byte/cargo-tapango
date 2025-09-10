import React from 'react'
import { cn } from '../../lib/utils'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'dashboard' | 'table' | 'chart'
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  variant = 'default',
  breakpoint = 'lg'
}) => {
  const containerVariants = {
    default: 'container mx-auto px-4 sm:px-6 lg:px-8',
    dashboard: 'w-full max-w-none px-4 sm:px-6 lg:px-8 2xl:px-12',
    table: 'w-full overflow-hidden',
    chart: 'w-full h-full min-h-0'
  }

  const responsiveClasses = {
    sm: '@container/sm',
    md: '@container/md',
    lg: '@container/lg',
    xl: '@container/xl',
    '2xl': '@container/2xl'
  }

  return (
    <div
      className={cn(
        containerVariants[variant],
        responsiveClasses[breakpoint],
        className
      )}
      style={{
        containerType: 'inline-size',
        containerName: breakpoint
      }}
    >
      {children}
    </div>
  )
}

export const ResponsiveGrid: React.FC<{
  children: React.ReactNode
  className?: string
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
}> = ({
  children,
  className,
  cols = { default: 1, md: 2, lg: 3, xl: 4 }
}) => {
  const gridClasses = [
    'grid gap-4 sm:gap-6',
    cols.default && `grid-cols-${cols.default}`,
    cols.sm && `@sm:grid-cols-${cols.sm}`,
    cols.md && `@md:grid-cols-${cols.md}`,
    cols.lg && `@lg:grid-cols-${cols.lg}`,
    cols.xl && `@xl:grid-cols-${cols.xl}`,
    cols['2xl'] && `@2xl:grid-cols-${cols['2xl']}`
  ].filter(Boolean).join(' ')

  return (
    <div className={cn(gridClasses, className)}>
      {children}
    </div>
  )
}

export const ResponsiveStack: React.FC<{
  children: React.ReactNode
  className?: string
  direction?: 'vertical' | 'horizontal' | 'responsive'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}> = ({
  children,
  className,
  direction = 'responsive',
  spacing = 'md'
}) => {
  const spacingClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  }

  const directionClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-row',
    responsive: 'flex flex-col @md:flex-row'
  }

  return (
    <div className={cn(
      directionClasses[direction],
      spacingClasses[spacing],
      'items-start',
      className
    )}>
      {children}
    </div>
  )
}

// Responsive utility hooks
export const useResponsiveBreakpoints = () => {
  const [breakpoint, setBreakpoint] = React.useState<string>('sm')

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width >= 1536) setBreakpoint('2xl')
      else if (width >= 1280) setBreakpoint('xl')
      else if (width >= 1024) setBreakpoint('lg')
      else if (width >= 768) setBreakpoint('md')
      else setBreakpoint('sm')
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return {
    breakpoint,
    isMobile: breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: ['lg', 'xl', '2xl'].includes(breakpoint),
    isLargeDesktop: ['xl', '2xl'].includes(breakpoint)
  }
}

export const useContainerQueries = (ref: React.RefObject<HTMLElement>) => {
  const [containerWidth, setContainerWidth] = React.useState(0)

  React.useEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return {
    containerWidth,
    isNarrow: containerWidth < 400,
    isMedium: containerWidth >= 400 && containerWidth < 800,
    isWide: containerWidth >= 800
  }
}
