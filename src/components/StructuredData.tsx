import { SITE_URL } from "@/lib/site";
import type { SiteSettings, SocialLink } from "@/lib/types";

export default function StructuredData({
  settings,
  socialLinks,
}: {
  settings: SiteSettings;
  socialLinks: SocialLink[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.orgName,
    url: SITE_URL,
    description: settings.description,
    email: settings.contactEmail,
    sameAs: socialLinks.map((s) => s.href).filter((href) => href && href !== '#'),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
