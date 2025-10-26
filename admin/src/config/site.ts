export const siteConfig = {
  name: 'Tapan Associate Cargo',
  shortName: 'Tapan Cargo',
  tagline: 'Imphal ↔ New Delhi cargo specialists',
  corridor: {
    primary: { from: 'Imphal', to: 'New Delhi' },
    hubs: ['Guwahati'],
  },
  contact: {
    phone: '+91-98765-43210', // TODO: replace with official number
    whatsapp: '+91-9876543210', // digits only for wa.me
    email: 'contact@tapancargo.example', // TODO: official email
    imphalAddress: 'Imphal, Manipur — exact address TBD',
    delhiAddress: 'New Delhi — exact address TBD',
    hours: 'Mon–Sat 09:30–18:30 (IST)',
  },
  legal: {
    gstin: '00ABCDE1234F1Z5', // placeholder
    disclaimer: 'Transit times are indicative and depend on load, lane conditions, and season.',
  },
  social: {
    facebook: 'https://www.facebook.com/100069506915821/about/?_rdr',
  },
  seo: {
    title: 'Tapan Associate Cargo — Imphal ↔ New Delhi corridor cargo',
    description:
      'Door-to-door cargo and logistics specializing in the Imphal ↔ New Delhi corridor. Reliable air and surface freight. 15+ years of service.',
    keywords: 'cargo, logistics, Imphal, New Delhi, air cargo, surface freight, Northeast India',
    ogImage: '/og-image.svg',
    canonical: '/',
  },
} as const;
