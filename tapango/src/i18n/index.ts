export type Locale = 'en' | 'hi'

let currentLocale: Locale = 'en'

const dict: Record<Locale, Record<string, string>> = {
  en: {
    welcome: 'Welcome',
    dashboardSubtitle: 'Your logistics at a glance',
    liveTracking: 'Live Tracking',
    newShipment: 'New Shipment',
    track: 'Track',
    recentShipments: 'Recent Shipments',
    seeAll: 'See All',
    ordersTitle: 'Orders',
    steps: 'Steps',
    queuedActions: 'Queued actions: {total}',
    inTransit: 'In Transit',
    delivered: 'Delivered',
    onSchedule: 'On Schedule',
    delayed: 'Delayed',
    completed: 'Completed',
    drafts: 'Drafts',
    resumeLastDraft: 'Resume Last Draft',
    discardDraft: 'Discard Draft',
    recentAddresses: 'Recent Addresses',
    pickup: 'Pickup',
    delivery: 'Delivery',
    shipmentsInTransit: 'Shipments in transit',
    tapToViewTracking: 'Tap to view real-time tracking',
    ordersActive: 'Active',
    ordersPast: 'Past',
    showingDemoOrders: 'Showing demo orders. Sign in to Supabase or run the dev policy migration to view real orders.',
    signInToSupabase: 'Sign in to Supabase',
    bookShipment: 'Book a Shipment',
    noOrdersTitle: 'No {segment} Orders',
    trackPackage: 'Track Package',
    trackYourShipment: 'Track Your Shipment',
    enterTrackingToGetUpdates: 'Enter your tracking number to get real-time updates',
    from: 'From',
    to: 'To',
    currentLocation: 'Current Location',
    estimatedDelivery: 'Estimated Delivery',
    cargoType: 'Cargo Type',
    weight: 'Weight',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    dashboard: 'Dashboard',
    priceDisclaimer: '*Final price may vary based on actual dimensions and route',
    receipt: 'Receipt',
    enterTrackingNumber: 'Please enter a tracking number',
    trackingNotFound: 'Tracking number not found. Please check and try again.',
    trackingFetchFailed: 'Failed to fetch tracking information. Please try again.',

    // Home specific
    activeShipmentsCount: '{count} Active Shipments',
    notificationsTitle: 'Notifications',
    notificationsNone: 'No new notifications',

    // Booking strings
    bookingTitle: 'Book Cargo Shipment',
    bookingSubtitle: 'Fill in the details below to book your cargo shipment',
    tabAddresses: 'Addresses',
    tabCargo: 'Cargo',
    tabReview: 'Review',
    pickupDeliveryTitle: 'Pickup & Delivery',
    pickupAddress: 'Pickup Address',
    deliveryAddress: 'Delivery Address',
    enterPickupAddress: 'Enter pickup address',
    enterDeliveryAddress: 'Enter delivery address',
    swapAddresses: 'Swap Addresses',
    weightKg: 'Weight (kg)',
    dimensionsCm: 'Dimensions (cm)',
    specialInstructions: 'Special Instructions',
    specialInstructionsPlaceholder: 'Any special handling instructions...',
    shippingOptions: 'Shipping Options',
    urgencyLevel: 'Urgency Level',
    contactPhone: 'Contact Phone',
    weightSummary: 'Weight Summary',
    estimatedCost: 'Estimated Cost',
    progressPrefix: 'Progress:',
    estimatedPrefix: 'Est:',
    bookNow: 'Book now',
    submitting: 'Submitting...',
    saveAsDraft: 'Save as Draft',
    draftSavedTitle: 'Draft saved',
    draftSavedBody: 'Resume from Home → Drafts.',
    bookingSuccessTitle: 'Booking Successful!',
    bookingSuccessBody: 'Your cargo booking has been submitted. You will receive a confirmation shortly.',
    viewOrders: 'View Orders',
    bookAnother: 'Book Another',
    offlineTitle: 'Offline',
    offlineBody: 'Your booking is queued and will be retried later.',
    validationPickupRequired: 'Pickup address is required',
    validationDeliveryRequired: 'Delivery address is required',
    validationCargoTypeRequired: 'Cargo type is required',
    validationWeightRequired: 'Weight is required',
    validationWeightNumber: 'Weight must be a number',
    validationUrgencyRequired: 'Urgency level is required',
    validationContactPhoneRequired: 'Contact phone is required',
    back: 'Back',
    next: 'Next',

    // Stats labels
    statActive: 'Active',
    statDelivered: 'Delivered',
    statSaved: 'Saved',
    statOnTime: 'On-Time',
    // Profile & Settings
    profileRoleCustomer: 'Customer',
    kycProgress: 'KYC Progress',
    preferences: 'Preferences',
    editProfile: 'Edit Profile',
    support: 'Support',
    account: 'Account',
    gstin: 'GSTIN',
    tapToUpdate: 'Tap to update',
    whatsappSupport: 'WhatsApp Support',
    helpSupport: 'Help & Support',

    // Tracking input
    trackingNumberLabel: 'Tracking Number',
    pasteIdHint: 'Paste ID or scan QR from the action menu',
    trackingTimeline: 'Tracking Timeline',
  },
  hi: {
    welcome: 'स्वागत है',
    dashboardSubtitle: 'आपकी लॉजिस्टिक्स एक नज़र में',
    liveTracking: 'लाइव ट्रैकिंग',
    newShipment: 'नया शिपमेंट',
    track: 'ट्रैक करें',
    recentShipments: 'हाल ही के शिपमेंट',
    seeAll: 'सभी देखें',
    queuedActions: 'कतारबद्ध क्रियाएं: {total}',
    inTransit: 'रास्ते में',
    delivered: 'वितरित',
    onSchedule: 'समय पर',
    completed: 'पूरा हुआ',
    drafts: 'ड्राफ्ट',
    resumeLastDraft: 'पिछला ड्राफ्ट फिर शुरू करें',
    discardDraft: 'ड्राफ्ट हटाएं',
    recentAddresses: 'हाल ही के पते',
    pickup: 'पिकअप',
    delivery: 'डिलीवरी',
    shipmentsInTransit: 'रास्ते में शिपमेंट',
    tapToViewTracking: 'रीयल-टाइम ट्रैकिंग देखने के लिए टैप करें',
    ordersActive: 'सक्रिय',
    ordersPast: 'पूर्व',
    showingDemoOrders: 'डेमो ऑर्डर दिखाए जा रहे हैं। वास्तविक ऑर्डर देखने के लिए Supabase में साइन इन करें या dev नीति माइग्रेशन चलाएँ।',
    signInToSupabase: 'Supabase में साइन इन करें',
    bookShipment: 'एक शिपमेंट बुक करें',
    noOrdersTitle: '{segment} ऑर्डर नहीं',
    trackPackage: 'पैकेज ट्रैक करें',
    trackYourShipment: 'अपने शिपमेंट को ट्रैक करें',
    enterTrackingToGetUpdates: 'रीयल-टाइम अपडेट प्राप्त करने के लिए अपना ट्रैकिंग नंबर दर्ज करें',
    from: 'से',
    to: 'तक',
    currentLocation: 'वर्तमान स्थान',
    estimatedDelivery: 'अनुमानित डिलीवरी',
    cargoType: 'कार्गो प्रकार',
    weight: 'वजन',
    theme: 'थीम',
    light: 'लाइट',
    dark: 'डार्क',
    language: 'भाषा',
  },
}

export function t(key: string, params?: Record<string, string | number>): string {
  const table = dict[currentLocale] || dict.en
  let out = table[key] || key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      out = out.replace(new RegExp(`{${k}}`, 'g'), String(v))
    }
  }
  return out
}

export function setLocale(locale: Locale) {
  currentLocale = locale
}

export async function loadLocaleFromStorage() {
  try {
    const { StorageService } = await import('../utils/storage')
    const pref = await StorageService.getLanguagePreference?.()
    if (pref && (pref === 'en' || pref === 'hi')) setLocale(pref)
  } catch {}
}

