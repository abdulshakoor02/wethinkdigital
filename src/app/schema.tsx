

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WeThinkDigital",
  "image": "https://www.wethinkdigital.solutions/wethinkdigital.ico",
  "@id": "",
  "url": "https://www.wethinkdigital.solutions",
  "telephone": "+971 58 929 3060",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Digital Avenue",
    "addressLocality": "Dubai",
    "postalCode": "00000",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.2048,
    "longitude": 55.2708
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/wethinkdigital",
    "https://www.twitter.com/wethinkdigital",
    "https://www.linkedin.com/company/wethinkdigital"
  ] 
};
