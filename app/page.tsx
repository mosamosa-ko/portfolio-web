import { AboutSection } from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { MobileDesktopNote } from "@/components/portfolio/MobileDesktopNote";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { WorksSection } from "@/components/portfolio/WorksSection";
import { XrayPortfolioHero } from "@/components/xray/XrayPortfolioHero";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white text-[#111111]">
      <XrayPortfolioHero />
      <AboutSection />
      <WorksSection />
      <SkillsSection />
      <ContactSection />
      <MobileDesktopNote />
    </main>
  );
}
