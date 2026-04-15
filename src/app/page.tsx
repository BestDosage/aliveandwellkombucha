import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import MarqueeSection from "@/components/MarqueeSection";
import StorySection from "@/components/StorySection";
import ProductsSection from "@/components/ProductsSection";
import ProcessSection from "@/components/ProcessSection";
import BenefitsSection from "@/components/BenefitsSection";
import FindUsSection from "@/components/FindUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <HeroSection />
        {/* Wero-style: StatsBar overlaps hero with negative margin + rounded top */}
        <div className="relative z-10 -mt-8 md:-mt-12">
          <div className="rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden">
            <StatsBar />
          </div>
        </div>
        <MarqueeSection />
        <section id="story">
          <StorySection />
        </section>
        <section id="products">
          <ProductsSection />
        </section>
        {/* Process overlaps products with negative margin */}
        <div className="relative z-10 -mt-8 md:-mt-16">
          <div className="rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden">
            <ProcessSection />
          </div>
        </div>
        {/* Benefits overlaps process */}
        <div className="relative z-20 -mt-8 md:-mt-16">
          <div className="rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden">
            <section id="benefits">
              <BenefitsSection />
            </section>
          </div>
        </div>
        <section id="find-us">
          <FindUsSection />
        </section>
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
