import { AboutSection } from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { WorksSection } from "@/components/portfolio/WorksSection";
import { XrayPortfolioHero } from "@/components/xray/XrayPortfolioHero";

export default function Home() {
  return (
    <main className="bg-white text-[#111111]">
      <XrayPortfolioHero />
      <AboutSection />
      <WorksSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
