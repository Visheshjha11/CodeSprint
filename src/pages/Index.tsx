import { TopNav } from "@/components/landing/TopNav";
import { HeroArena } from "@/components/landing/HeroArena";
import { WhyDevsFail } from "@/components/landing/WhyDevsLacks";
import { DailyLoop } from "@/components/landing/DailyLoop";
import { GameplayDepth } from "@/components/landing/GameplayDepth";
import { FlowScoreSection } from "@/components/landing/FlowScoreSection";
import { ImmersionShowcase } from "@/components/landing/ImmersionShowcase";
import { ModeShowcase } from "@/components/landing/ModeShowcase";
import { SocialSystems } from "@/components/landing/SocialSystems";
import { RankingLadder } from "@/components/landing/RankingLadder";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <TopNav />
      <main>
        <HeroArena />
        <WhyDevsFail />
        <DailyLoop />
        <GameplayDepth />
        <FlowScoreSection />
        <ImmersionShowcase />
        <ModeShowcase />
        <SocialSystems />
        <RankingLadder />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
