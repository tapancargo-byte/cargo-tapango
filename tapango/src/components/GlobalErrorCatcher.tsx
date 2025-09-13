import React, { useEffect } from 'react'
import { useAppToast } from '../ui/tg/ToastHost'

export const GlobalErrorCatcher: React.FC = () => {
  const toast = useAppToast()

  useEffect(() => {
    const handler = (error: any, isFatal?: boolean) => {
      if (__DEV__) {
        console.error(error)
        return
      }
      const title = isFatal ? 'App error' : 'Unexpected error'
      const msg = String(error?.message ?? error)
      try { toast.show(title, msg, { variant: 'error' }) } catch {}
      try { require('../utils/sentry').captureException?.(error) } catch {}
    }
    // @ts-ignore
    const prev = (global as any).ErrorUtils?.getGlobalHandler?.()
    // @ts-ignore
    ;(global as any).ErrorUtils?.setGlobalHandler?.(handler)
    return () => {
      // @ts-ignore
      if (prev) (global as any).ErrorUtils?.setGlobalHandler?.(prev)
    }
  }, [toast])

  return null
}
