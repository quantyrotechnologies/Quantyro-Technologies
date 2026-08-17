// TODO: replace placeholder org details (address, phone, socials) with real data before launch.
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quantyro Technologies",
    url: "https://www.quantyro.com",
    description: "Global software engineering partner designing, building and scaling web, mobile and AI products.",
    email: "hello@quantyro.studio",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
