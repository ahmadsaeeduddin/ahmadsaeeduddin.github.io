import { BrainCircuit, ScanEye, Sparkles, Workflow } from "lucide-react";
import { FloatingFeatureCard } from "./FloatingFeatureCard";
import { HeroContent } from "./HeroContent";
import { HeroName } from "./HeroName";
import { ScrollIndicator } from "./ScrollIndicator";

const features = [
  {
    title: "AI Systems",
    detail: "Intelligence",
    icon: BrainCircuit,
    position: "lg:left-[8%] lg:top-[27%] xl:left-[12%]",
  },
  {
    title: "Agentic Workflows",
    detail: "Automation",
    icon: Workflow,
    position: "lg:right-[7%] lg:top-[29%] xl:right-[11%]",
  },
  {
    title: "Startups",
    detail: "Products",
    icon: Sparkles,
    position: "lg:left-[11%] lg:top-[49%] xl:left-[16%]",
  },
  {
    title: "Computer Vision",
    detail: "Perception",
    icon: ScanEye,
    position: "lg:right-[9%] lg:top-[50%] xl:right-[14%]",
  },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[820px] overflow-hidden bg-[#f5faff] text-slate-950 lg:min-h-[720px]"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,1)_0%,rgba(235,246,255,0.92)_36%,rgba(244,248,255,1)_72%)]" />
      <div className="absolute left-[-10%] top-[22%] z-0 h-[38rem] w-[38rem] rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute right-[-13%] top-[8%] z-0 h-[34rem] w-[34rem] rounded-full bg-violet-200/20 blur-3xl" />

      <HeroName />

      <div
        data-hero-3d-mount
        aria-label="Reserved space for the interactive 3D artifact"
        className="absolute left-1/2 top-[18%] z-20 aspect-square w-[min(70vw,19rem)] -translate-x-1/2 sm:top-[17%] sm:w-[min(58vw,24rem)] lg:top-[14%] lg:w-[min(38vw,30rem)]"
      >
        <div className="absolute inset-[7%] rounded-full border border-white/80 bg-white/10 shadow-[inset_0_0_80px_rgba(255,255,255,0.8),0_40px_90px_-65px_rgba(37,99,235,0.65)] backdrop-blur-[2px]" />
        <div className="absolute inset-[21%] rounded-full border border-blue-200/35" />
        <div className="absolute bottom-[8%] left-1/2 h-8 w-[68%] -translate-x-1/2 rounded-[50%] bg-blue-300/15 blur-xl" />
      </div>

      <div className="absolute inset-x-3 top-[45%] z-30 grid grid-cols-2 gap-2.5 sm:inset-x-8 sm:top-[47%] sm:gap-4 lg:inset-0 lg:top-0 lg:block">
        {features.map((feature) => (
          <FloatingFeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            detail={feature.detail}
            className={`relative justify-start lg:absolute ${feature.position}`}
          />
        ))}
      </div>

      <HeroContent />
      <ScrollIndicator />
    </section>
  );
}
