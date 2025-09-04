

// Enhanced LocalBusiness Schema with SEO focus
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "DigitalMarketingAgency"],
  "@id": "https://www.wethinkdigital.solutions#organization",
  "name": "WeThinkDigital",
  "alternateName": "WeThinkDigital Solutions",
  "description": "Best SEO services in Dubai and top digital marketing company offering proven strategies for business growth. Leading SEO service provider in Dubai, UAE.",
  "image": "https://www.wethinkdigital.solutions/wethinkdigital.ico",
  "logo": "https://www.wethinkdigital.solutions/wethinkdigital.ico",
  "url": "https://www.wethinkdigital.solutions",
  "telephone": "+971 58 929 3060",
  "email": "hello@wethinkdigital.solutions",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Business Bay",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "00000",
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
    "https://www.linkedin.com/company/wethinkdigital",
    "https://www.instagram.com/wethinkdigital"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Organization Schema for homepage
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.wethinkdigital.solutions#organization",
  "name": "WeThinkDigital",
  "url": "https://www.wethinkdigital.solutions",
  "logo": "https://www.wethinkdigital.solutions/wethinkdigital.ico",
  "description": "Best digital marketing company in Dubai offering top-tier SEO services, web development, and digital marketing solutions for businesses in UAE.",
  "foundingDate": "2020",
  "founders": [
    {
      "@type": "Person",
      "name": "WeThinkDigital Founder"
    }
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
    "https://www.linkedin.com/company/wethinkdigital"
  ]
};

// Professional Service Schema
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "WeThinkDigital - SEO Services Dubai",
  "description": "Professional SEO services in Dubai providing comprehensive digital marketing solutions including search engine optimization, web development, and online marketing strategies.",
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
