/**
 * TAPANGO Splash & Onboarding Content Variations
 * Professional logistics-focused messaging for the cargo platform
 * Based on modern logistics industry best practices and conversion optimization
 */

export const splashContent = {
  // Main branding taglines
  taglines: [
    "Northeast India's Cargo Network",
    'Imphal to Delhi Express Logistics',
    'Your Trusted Logistics Partner',
    'Professional Cargo Transportation',
    'Connecting Northeast India',
  ],

  // Loading messages that build anticipation
  loadingMessages: {
    logistics: [
      'Starting logistics engine...',
      'Connecting to driver network...',
      'Loading real-time tracking...',
      'Preparing your dashboard...',
      'Ready for delivery!',
    ],
    technical: [
      'Initializing secure platform...',
      'Connecting to GPS satellites...',
      'Loading cargo management system...',
      'Syncing driver availability...',
      'Your logistics hub is ready!',
    ],
    business: [
      'Powering up your business...',
      'Connecting trusted drivers...',
      'Loading delivery solutions...',
      'Preparing cost estimates...',
      "Let's move your cargo!",
    ],
  },
};

export const onboardingContent = {
  // Professional messaging focused on business value
  screens: [
    {
      id: 'welcome',
      variations: {
        professional: {
          title: 'Welcome to TAPANGO',
          subtitle: "Northeast India's Premier Cargo Network",
          description:
            'Connecting Imphal to New Delhi with professional logistics services. Experience seamless cargo transportation with real-time tracking and trusted drivers.',
        },
        businessFocused: {
          title: 'TAPANGO Logistics',
          subtitle: 'Enterprise Cargo Solutions',
          description:
            'Scale your business with reliable cargo transportation. Competitive rates, insured shipments, and dedicated support for your logistics needs.',
        },
        personalApproach: {
          title: 'Welcome to TAPANGO',
          subtitle: 'Your Cargo, Our Priority',
          description:
            "Whether it's personal items or business cargo, we ensure safe and timely delivery across Northeast India with complete peace of mind.",
        },
      },
    },
    {
      id: 'booking',
      variations: {
        efficiency: {
          title: 'Smart Booking System',
          subtitle: 'Book Your Cargo in Under 2 Minutes',
          description:
            'Simply enter pickup and delivery locations, select cargo type, and confirm. Our AI-powered system instantly matches you with the best available driver.',
        },
        simplicity: {
          title: 'Simple Booking Process',
          subtitle: 'Three Steps to Delivery',
          description:
            'Pick location, choose cargo type, book instantly. No complex forms, no waiting - just fast, efficient booking designed for your convenience.',
        },
        technology: {
          title: 'Intelligent Booking',
          subtitle: 'AI-Powered Route Optimization',
          description:
            'Our smart system analyzes traffic, weather, and driver availability to provide the fastest, most cost-effective delivery solution for your cargo.',
        },
      },
    },
    {
      id: 'tracking',
      variations: {
        reliability: {
          title: 'Real-Time Tracking',
          subtitle: '99.2% On-Time Delivery Record',
          description:
            "Monitor your cargo's journey with live GPS tracking, receive instant notifications, and communicate directly with your assigned driver throughout the delivery.",
        },
        transparency: {
          title: 'Complete Visibility',
          subtitle: 'Know Where Your Cargo Is, Always',
          description:
            'Live GPS tracking, photo confirmations, and instant updates keep you informed every step of the way. Full transparency from pickup to delivery.',
        },
        security: {
          title: 'Secure Tracking',
          subtitle: 'Your Cargo, Protected & Monitored',
          description:
            'Advanced security features including real-time GPS, driver verification, and instant alerts ensure your cargo is safe throughout its journey.',
        },
      },
    },
    {
      id: 'getstarted',
      variations: {
        social_proof: {
          title: 'Ready to Ship?',
          subtitle: '5,000+ Successful Deliveries This Month',
          description:
            'Join businesses and individuals who trust TAPANGO for reliable cargo logistics. Competitive rates, insured shipments, and 24/7 customer support.',
        },
        value_proposition: {
          title: 'Start Shipping Smart',
          subtitle: 'Save Time, Money & Effort',
          description:
            'Experience the most efficient cargo delivery service in Northeast India. Instant quotes, flexible scheduling, and guaranteed delivery times.',
        },
        trust_building: {
          title: 'Join TAPANGO Today',
          subtitle: 'Trusted by 10,000+ Customers',
          description:
            'Licensed, insured, and verified drivers. Comprehensive cargo insurance. 24/7 customer support. Your logistics partner you can count on.',
        },
      },
    },
  ],

  // Call-to-action variations
  cta_buttons: {
    action_oriented: [
      'Get Started',
      'Ship Now',
      'Book Delivery',
      'Start Moving',
    ],
    benefit_focused: [
      'Save Time',
      'Get Quote',
      'Try Free',
      'Experience Better',
    ],
    urgency_driven: ['Book Now', 'Ship Today', 'Get Moving', 'Start Delivery'],
  },

  // Value propositions for different user segments
  value_props: {
    businesses: [
      'Reduce shipping costs by up to 30%',
      'Reliable delivery schedules you can count on',
      'Dedicated account management support',
      'Bulk shipping discounts available',
    ],
    individuals: [
      'Safe delivery of your personal items',
      'Affordable rates for all cargo sizes',
      'Real-time updates via SMS and app',
      'Insurance coverage for peace of mind',
    ],
    ecommerce: [
      'Scale your business with reliable logistics',
      'API integration for automated shipping',
      'Bulk rate pricing for high volume',
      'Same-day pickup for urgent orders',
    ],
  },

  // Trust signals to build credibility
  trust_signals: [
    '99.2% On-time delivery rate',
    '5,000+ successful deliveries monthly',
    '10,000+ satisfied customers',
    'Licensed & insured drivers',
    'Full cargo insurance coverage',
    '24/7 customer support',
    'Real-time GPS tracking',
    'Verified driver network',
  ],

  // Regional specific messaging
  regional_focus: {
    imphal_delhi: 'Direct route from Imphal to New Delhi',
    northeast_specialty: 'Northeast India logistics specialists',
    local_knowledge: 'Local expertise, regional connections',
    route_optimization: 'Optimized routes across Northeast corridors',
  },
};

// Content selection utility functions
export const selectContent = {
  // Select content based on user type or A/B test
  getOnboardingContent: (
    userType: 'business' | 'individual' | 'ecommerce' = 'individual',
    variation: string = 'professional'
  ) => {
    return onboardingContent.screens.map((screen) => ({
      ...screen,
      content:
        screen.variations[variation as keyof typeof screen.variations] ||
        screen.variations.professional,
    }));
  },

  // Get appropriate loading messages
  getLoadingMessages: (
    context: 'logistics' | 'technical' | 'business' = 'logistics'
  ) => {
    return splashContent.loadingMessages[context];
  },

  // Get trust signal for specific context
  getTrustSignal: (index?: number) => {
    if (index !== undefined) {
      return onboardingContent.trust_signals[
        index % onboardingContent.trust_signals.length
      ];
    }
    return onboardingContent.trust_signals[
      Math.floor(Math.random() * onboardingContent.trust_signals.length)
    ];
  },
};

export default {
  splash: splashContent,
  onboarding: onboardingContent,
  select: selectContent,
};
