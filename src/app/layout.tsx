import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import ScrollRefresh from "@/components/ScrollRefresh";
import GlobalTechBackground from "@/components/GlobalTechBackground";

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

// TODO: replace with the real production domain before launch.
const siteUrl = "https://www.quantyro.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quantyro Technologies — Engineering the Future",
    template: "%s — Quantyro Technologies",
  },
  description: "Quantyro Technologies is a global software engineering partner designing, building and scaling web, mobile and AI products for ambitious companies.",
  openGraph: {
    title: "Quantyro Technologies — Engineering the Future",
    description: "Global software engineering partner for web, mobile, AI, cloud and e-commerce products.",
    url: siteUrl,
    siteName: "Quantyro Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantyro Technologies — Engineering the Future",
    description: "Global software engineering partner for web, mobile, AI, cloud and e-commerce products.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col relative">
        <GlobalTechBackground />
        <StructuredData />
        <ScrollRefresh />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
