'use client';

import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { ExpertiseSection } from '../components/ExpertiseSection';
import { ProjectsCarousel } from '../components/ProjectsCarousel';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0
                      bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <Header />
      <main className="relative z-10 container mx-auto max-w-screen-xl">
        <HeroSection />
        <ExpertiseSection />
        <ProjectsCarousel />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}