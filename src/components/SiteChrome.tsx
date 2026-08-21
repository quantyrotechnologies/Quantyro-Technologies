"use client";
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';
import ScrollRefresh from './ScrollRefresh';
import CookieConsent from './CookieConsent';
import type { SocialLink, SiteSettings } from '@/lib/types';

/**
 * The admin panel has its own chrome (AdminSidebar, in the admin route
 * group's layout) — it doesn't want the public Navbar/Footer, and Lenis
 * smooth-scroll actively fights normal scrolling in data-heavy tables and
 * forms. Gating on pathname here (rather than a second root layout) keeps
 * one shared <html>/<body>/font-loading setup for the whole app.
 */
export default function SiteChrome({
  settings,
  socialLinks,
  children,
}: {
  settings: SiteSettings;
  socialLinks: SocialLink[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <SmoothScroll />
      <ScrollRefresh />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer socialLinks={socialLinks} settings={settings} />
      <CookieConsent />
    </>
  );
}
