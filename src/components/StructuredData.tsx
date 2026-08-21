import { SITE_URL } from "@/lib/site";
import { CITIES } from "@/lib/cities";
import type { SiteSettings, SocialLink } from "@/lib/types";

export default function StructuredData({
  settings,
  socialLinks,
}: {
  settings: SiteSettings;
  socialLinks: SocialLink[];
}) {
  const socialUrls = socialLinks
    .map((s) => s.href)
    .filter((href) => href && href !== '#' && href.startsWith('http'));

  const primaryImage = {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#primaryimage`,
    url: `${SITE_URL}/images/logo.jpeg`,
    contentUrl: `${SITE_URL}/images/logo.jpeg`,
    name: `${settings.orgName || "Quantyro Technologies"} Brand Logo & Software Engineering`,
    caption: `${settings.orgName || "Quantyro Technologies"} — Engineering the Future`,
    description: settings.description || "Global software engineering partner designing, building and scaling web, mobile and AI products.",
    width: "1200",
    height: "630",
  };

  const organization = {
    "@type": ["Organization", "ProfessionalService", "Corporation"],
    "@id": `${SITE_URL}/#organization`,
    name: settings.orgName || "Quantyro Technologies",
    alternateName: ["Quantyro", "Quantyro Tech", "Quantyro Technologies Inc"],
    legalName: settings.orgName || "Quantyro Technologies",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/images/logo.jpeg`,
      caption: `${settings.orgName} Logo`,
    },
    image: primaryImage,
    description: settings.description,
    slogan: settings.tagline || "Engineering the Future",
    email: settings.contactEmail,
    ...(settings.contactPhone ? { telephone: settings.contactPhone } : {}),
    priceRange: "$$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "250",
      reviewCount: "250",
    },
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Web Development",
      "Mobile Application Development",
      "Artificial Intelligence & Machine Learning",
      "Cloud Architecture & DevOps",
      "Enterprise SaaS Systems",
      "UI/UX Product Design",
      "Next.js & React Engineering",
      "Cybersecurity & GDPR Compliance",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: settings.contactEmail,
        ...(settings.contactPhone ? { telephone: settings.contactPhone } : {}),
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
    areaServed: CITIES.map((city) => ({ "@type": "City", name: city })),
    sameAs: socialUrls,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: settings.orgName || "Quantyro Technologies",
    url: SITE_URL,
    inLanguage: "en-US",
    description: settings.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // A single @graph ties these nodes together via @id references instead of
  // shipping them as separate, context-free JSON-LD scripts — lets crawlers
  // resolve "this WebSite is published by this Organization" directly.
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, primaryImage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
