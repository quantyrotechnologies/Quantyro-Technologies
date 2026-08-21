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
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: settings.orgName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.jpeg`,
    description: settings.description,
    email: settings.contactEmail,
    ...(settings.contactPhone ? { telephone: settings.contactPhone } : {}),
    areaServed: CITIES.map((city) => ({ "@type": "City", name: city })),
    sameAs: socialLinks.map((s) => s.href).filter((href) => href && href !== '#'),
  };

  // No potentialAction/SearchAction here — the site has no working search
  // endpoint, and schema must match what the page actually does.
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: settings.orgName,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  // A single @graph ties these nodes together via @id references instead of
  // shipping them as separate, context-free JSON-LD scripts — lets crawlers
  // resolve "this WebSite is published by this Organization" directly.
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
