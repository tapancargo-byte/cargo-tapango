export const formatDate = (iso: string | number | Date, locale: string = 'en-IN') => {
  const d = new Date(iso)
  return d.toLocaleDateString(locale)
}

export const formatDateTime = (iso: string | number | Date, locale: string = 'en-IN') => {
  const d = new Date(iso)
  return d.toLocaleString(locale)
}

