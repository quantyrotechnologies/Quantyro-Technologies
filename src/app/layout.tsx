import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import SiteChrome from "@/components/SiteChrome";
import { SITE_URL } from "@/lib/site";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getSocialLinks } from "@/lib/data/socialLinks";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  variable: "--font-plex-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Quantyro Technologies — Engineering the Future",
    template: "%s — Quantyro Technologies",
  },
  description: "Quantyro Technologies is a global software engineering partner designing, building and scaling web, mobile and AI products for ambitious companies.",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Quantyro Technologies — Engineering the Future",
    description: "Global software engineering partner for web, mobile, AI, cloud and e-commerce products.",
    url: SITE_URL,
    siteName: "Quantyro Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantyro Technologies — Engineering the Future",
    description: "Global software engineering partner for web, mobile, AI, cloud and e-commerce products.",
  },
  // Webmaster tool ownership verification — each env var is blank until you
  // create a (free) account and paste in the code Next.js then emits the
  // matching <meta> tag; leaving one unset simply omits that tag.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "AfCP-DfObAIuMV7LdQrUS3rrxkMT_haujmRZH_doRW4",
    other: {
      ...(process.env.BING_SITE_VERIFICATION && { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }),
      ...(process.env.AHREFS_SITE_VERIFICATION && { 'ahrefs-site-verification': process.env.AHREFS_SITE_VERIFICATION }),
    },
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, socialLinks] = await Promise.all([getSiteSettings(), getSocialLinks()]);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NKWDCM2P";
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "yd247lp1ji";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${plexMono.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId={gtmId} />
      <body suppressHydrationWarning className="min-h-full flex flex-col relative">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Preconnect to GA, GTM & Microsoft Clarity hosts */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />

        {/* Microsoft Clarity (User Recording & Heatmaps) */}
        {clarityId && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");
              `,
            }}
          />
        )}

        <StructuredData settings={settings} socialLinks={socialLinks} />
        <SiteChrome settings={settings} socialLinks={socialLinks}>
          {children}
        </SiteChrome>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}

