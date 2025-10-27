import { useEffect } from 'react'

interface MetaProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  canonical?: string
}

export function Meta({ title, description, keywords, ogImage, canonical }: MetaProps) {
  useEffect(() => {
    document.title = title

    const ensure = (selector: string, create: () => HTMLElement) => {
      let el = document.head.querySelector(selector) as HTMLElement | null
      if (!el) {
        el = create()
        document.head.appendChild(el)
      }
      return el
    }

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      const sel = `meta[${attr}="${name}"]`
      const el = ensure(sel, () => {
        const m = document.createElement('meta')
        m.setAttribute(attr, name)
        return m
      }) as HTMLMetaElement
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    if (keywords) setMeta('keywords', keywords)
    if (canonical) {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      const url = canonical.startsWith('http') ? canonical : `${window.location.origin}${canonical}`
      link.href = url
    }
    // OpenGraph
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', window.location.href, 'property')
    if (ogImage) setMeta('og:image', ogImage, 'property')
    // Twitter
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    if (ogImage) setMeta('twitter:image', ogImage)
  }, [title, description, keywords, ogImage, canonical])

  return null
}
