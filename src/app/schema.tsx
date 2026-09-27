

// Enhanced LocalBusiness Schema with SEO focus
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "DigitalMarketingAgency"],
  "@id": "https://www.wethinkdigital.solutions#organization",
  "name": "WeThinkDigital",
  "alternateName": "WeThinkDigital Solutions",
  "description": "WeThinkDigital is an SEO and digital marketing agency in Business Bay, Dubai, working with UAE businesses on technical SEO, local search, conversion-focused content, web development and CRM/lead management.",
  "image": "https://www.wethinkdigital.solutions/wethinkdigital.svg",
  "logo": "https://www.wethinkdigital.solutions/wethinkdigital.svg",
  "url": "https://www.wethinkdigital.solutions",
  "telephone": "+971 58 929 3060",
  "email": "hello@wethinkdigital.solutions",
  "knowsAbout": [
    "Search engine optimisation (SEO)",
    "Technical SEO",
    "Local SEO and Google Business Profile optimisation",
    "Commercial keyword research and search intent",
    "Conversion-focused content",
    "B2B lead generation from organic search",
    "Generative engine optimisation (visibility in AI answers)",
    "Web development",
    "CRM and lead management"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Business Bay",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.1972,
    "longitude": 55.2744
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Dubai",
      "addressCountry": "AE"
    },
    {
      "@type": "Country",
      "name": "United Arab Emirates"
    }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "AED 5000 - AED 50000",
  "currenciesAccepted": "AED",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Marketing Services",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "SEO Services in Dubai",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Local SEO Dubai",
              "description": "Local SEO services to help Dubai businesses rank higher in local search results"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Technical SEO Audit",
              "description": "Comprehensive technical SEO audit and optimization for Dubai websites"
            }
          }
        ]
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/wethinkdigital",
    "https://www.twitter.com/wethinkdigital",
    "https://www.instagram.com/wethinkdigital"
  ],
};

// Organization Schema for homepage
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.wethinkdigital.solutions#organization",
  "name": "WeThinkDigital",
  "url": "https://www.wethinkdigital.solutions",
  "logo": "https://www.wethinkdigital.solutions/wethinkdigital.svg",
  "description": "WeThinkDigital is a Dubai-based SEO and digital marketing agency working with UAE businesses on search-driven growth: SEO, web development, CRM and lead management.",
  "foundingDate": "2020",
  "knowsAbout": [
    "Search engine optimisation (SEO)",
    "Local SEO in Dubai and the UAE",
    "B2B lead generation from organic search",
    "Web development",
    "CRM and lead management"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971 58 929 3060",
    "contactType": "Customer Service",
    "availableLanguage": ["English", "Arabic"],
    "areaServed": "AE"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "sameAs": [
    "https://www.facebook.com/wethinkdigital",
    "https://www.twitter.com/wethinkdigital",
    "https://www.instagram.com/wethinkdigital"
  ]
};

// Professional Service Schema
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "WeThinkDigital - SEO Services Dubai",
  "description": "SEO services in Dubai for UAE businesses: technical SEO, commercial keyword strategy, local search systems, conversion-focused content, and measurement reported against enquiries and revenue.",
  "provider": {
    "@id": "https://www.wethinkdigital.solutions#organization"
  },
  "areaServed": {
    "@type": "City",
    "name": "Dubai",
    "addressCountry": "AE"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "SEO and Digital Marketing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SEO Services Dubai",
          "description": "Comprehensive SEO services to improve search engine rankings and drive organic traffic for Dubai businesses"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Marketing Dubai",
          "description": "Full-service digital marketing including PPC, social media marketing, content marketing, and online advertising"
        }
      }
    ]
  }
};
