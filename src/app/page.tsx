import HeroSection from '@/components/HeroSection';
import EnterpriseTicker from '@/components/EnterpriseTicker';
import ManifestoSection from '@/components/ManifestoSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import StatsSection from '@/components/StatsSection';
import CtaSection from '@/components/CtaSection';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <EnterpriseTicker />
      <ManifestoSection />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <CtaSection />
    </>
  );
}

