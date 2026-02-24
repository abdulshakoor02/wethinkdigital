

// Enhanced LocalBusiness Schema with SEO focus
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://www.ebusinessplus.ae#organization",
  "name": "ebusiness+",
  "alternateName": "ebusiness+ Solutions",
  "description": "Leading CRM solutions provider in Dubai. We help businesses streamline customer relationships, automate sales workflows, and boost productivity with our integrated CRM platform.",
  "image": "https://www.ebusinessplus.ae/favicon.ico",
  "logo": "https://www.ebusinessplus.ae/favicon.ico",
  "url": "https://www.ebusinessplus.ae",
  "telephone": "+971 58 929 3060",
  "email": "info@ebusinessplus.ae",
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
  "priceRange": "AED 10000 - AED 100000",
  "currenciesAccepted": "AED",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "CRM Solutions",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "CRM Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "CRM Implementation",
              "description": "Complete CRM system implementation for businesses in Dubai"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cloud CRM Solutions",
              "description": "Cloud-based CRM systems for scalable business operations"
            }
          }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "CRM Solutions",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "CRM Implementation",
              "description": "Customer relationship management system setup and customization"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sales Automation",
              "description": "Automate your sales pipeline and improve customer engagement"
            }
          }
        ]
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/ebusinessplus",
    "https://www.linkedin.com/company/ebusinessplus"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Organization Schema for homepage
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.ebusinessplus.ae#organization",
  "name": "ebusiness+",
  "url": "https://www.ebusinessplus.ae",
  "logo": "https://www.ebusinessplus.ae/favicon.ico",
  "description": "Leading CRM solutions provider in Dubai, helping businesses streamline customer relationships and boost productivity.",
  "foundingDate": "2020",
  "founders": [
    {
      "@type": "Person",
      "name": "ebusiness+ Founder"
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
    "https://www.facebook.com/ebusinessplus",
    "https://www.linkedin.com/company/ebusinessplus"
  ]
};

// Professional Service Schema
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ebusiness+ - ERP & CRM Solutions Dubai",
  "description": "Professional ERP and CRM solutions in Dubai providing comprehensive business management systems, automation, and integration services.",
  "provider": {
    "@id": "https://www.ebusinessplus.ae#organization"
  },
  "areaServed": {
    "@type": "City",
    "name": "Dubai",
    "addressCountry": "AE"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "ERP and CRM Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "ERP Solutions Dubai",
          "description": "Enterprise resource planning solutions to streamline business operations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "CRM Solutions Dubai",
          "description": "Customer relationship management systems to improve customer engagement and sales"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Automation",
          "description": "Automate repetitive tasks and streamline business workflows"
        }
      }
    ]
  }
};
