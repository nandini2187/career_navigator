import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { Benefits } from '@/components/home/Benefits';
import { Stats } from '@/components/home/Stats';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { CTA } from '@/components/home/CTA';

export function HomePage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Benefits />
        <Stats />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
