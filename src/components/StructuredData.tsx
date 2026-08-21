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
    "@context": "https://schema.org",
    "@type": "Organization",
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
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.orgName,
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
