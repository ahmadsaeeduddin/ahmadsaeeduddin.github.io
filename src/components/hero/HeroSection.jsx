"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, ScanEye, Sparkles, Workflow } from "lucide-react";
import { FloatingFeatureCard } from "./FloatingFeatureCard";
import { HeroConnections } from "./HeroConnections";
import { HeroContent } from "./HeroContent";
import { HeroName } from "./HeroName";
import { ScrollIndicator } from "./ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Brains for Products",
    detail: "Intelligence",
    callout: "Reason · Retrieve",
    icon: BrainCircuit,
    motion: "top-left",
    position: "lg:left-[8%] lg:top-[27%] xl:left-[12%]",
  },
  {
    title: "Agentic Orchestration",
    detail: "Autopilot",
    callout: "AGENTS ON THE LOOSE",
    icon: Workflow,
    motion: "top-right",
    position: "lg:right-[7%] lg:top-[29%] xl:right-[11%]",
  },
  {
    title: "Ideas",
    detail: "Products",
    callout: "Zero to launch",
    icon: Sparkles,
    motion: "bottom-left",
    position: "lg:left-[11%] lg:top-[49%] xl:left-[16%]",
  },
  {
    title: "Vision",
    detail: "Perception",
    callout: "TEACHING PIXELS TO THINK",
    icon: ScanEye,
    motion: "bottom-right",
    position: "lg:right-[9%] lg:top-[50%] xl:right-[14%]",
  },
];

export function HeroSection() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const navbar = document.querySelector("[data-site-navbar]");
    const mainNavbar = document.querySelector("[data-main-navbar]");
    const name = hero.querySelector("[data-hero-name]");
    const cards = gsap.utils.toArray(hero.querySelectorAll("[data-hero-card]"));
    const content = hero.querySelector("[data-hero-content]");
    const role = hero.querySelector("[data-hero-role]");
    const indicator = hero.querySelector("[data-scroll-indicator]");
    const connections = hero.querySelector("[data-hero-connections]");
    const atmosphere = gsap.utils.toArray(hero.querySelectorAll("[data-hero-atmosphere]"));
    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([navbar, mainNavbar, name, cards, content, role, indicator, connections, atmosphere], {
          clearProps: "all",
        });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(navbar, { autoAlpha: 0, y: -14 });
        gsap.set(cards, { autoAlpha: 0, y: 22, scale: 0.96 });
        gsap.set(name, { autoAlpha: 0.78, yPercent: 24 });
        gsap.set(role, { autoAlpha: 0.45, y: 10, scale: 0.96 });
        gsap.set(indicator, { autoAlpha: 0 });

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .to(navbar, { autoAlpha: 1, y: 0, duration: 0.65 })
          .to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.68,
              stagger: 0.11,
            },
            "-=0.18"
          )
          .to(indicator, { autoAlpha: 1, duration: 0.5 }, "-=0.18");

        const indicatorLoop = gsap.to(indicator, {
          y: 5,
          duration: 1.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });

        const buildScrollTimeline = ({ mobile }) => {
          const distance = mobile ? 0.78 : 1.12;
          const outward = mobile ? 16 : 44;

          return gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: () => `+=${Math.round(window.innerHeight * distance)}`,
                pin: true,
                pinSpacing: true,
                scrub: 1.15,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              name,
              { yPercent: 24, autoAlpha: 0.78 },
              { yPercent: mobile ? -17 : -34, autoAlpha: 1 },
              0
            )
            .to(
              cards,
              {
                x: (_, element) => (element.dataset.motion.includes("left") ? -outward : outward),
                y: (_, element) => (element.dataset.motion.includes("top") ? -12 : 16),
              },
              0
            )
            .to(content, { y: mobile ? -2 : -8 }, 0.08)
            .fromTo(
              role,
              { autoAlpha: 0.45, y: 10, scale: 0.96 },
              { autoAlpha: 1, y: 0, scale: 1.06 },
              0.12
            )
            .fromTo(connections, { autoAlpha: 0.7 }, { autoAlpha: 0.12 }, 0)
            .to(atmosphere, { y: (_, element) => (element.dataset.depth === "far" ? -18 : -34) }, 0)
            .to(indicator, { autoAlpha: 0, y: 12, duration: 0.18 }, 0)
            .to(mainNavbar, { autoAlpha: 0, y: -20, duration: 0.28 }, 0.72);
        };

        const responsiveScroll = gsap.matchMedia();
        responsiveScroll.add("(max-width: 767px)", () => {
          const timeline = buildScrollTimeline({ mobile: true });
          return () => timeline.kill();
        });
        responsiveScroll.add("(min-width: 768px)", () => {
          const timeline = buildScrollTimeline({ mobile: false });
          return () => timeline.kill();
        });

        const nameX = gsap.quickTo(name, "x", { duration: 1.1, ease: "power3.out" });
        const atmosphereX = atmosphere.map((layer, index) =>
          gsap.quickTo(layer, "x", { duration: 1.4 + index * 0.15, ease: "power3.out" })
        );
        const handlePointerMove = (event) => {
          const rect = hero.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          atmosphereX.forEach((move, index) => move(px * (10 + index * 6)));
          nameX(px * 12 + py * 2);
        };

        const handlePointerLeave = () => {
          nameX(0);
          atmosphereX.forEach((move) => move(0));
        };

        hero.addEventListener("pointermove", handlePointerMove, { passive: true });
        hero.addEventListener("pointerleave", handlePointerLeave);

        return () => {
          intro.kill();
          indicatorLoop.kill();
          responsiveScroll.revert();
          hero.removeEventListener("pointermove", handlePointerMove);
          hero.removeEventListener("pointerleave", handlePointerLeave);
        };
      });
    }, hero);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-[100svh] min-h-[820px] overflow-hidden bg-[#F5F6FC] text-slate-950 transition-colors duration-500 dark:bg-[#070708] dark:text-white lg:min-h-[720px]"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.98)_0%,rgba(241,244,255,0.94)_40%,rgba(245,246,252,1)_76%)] transition-opacity duration-500 dark:opacity-0" />
      <div
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 dark:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 18%, rgba(255,255,255,.065) 0%, rgba(255,255,255,.018) 28%, transparent 52%), linear-gradient(180deg, #0c0c0d 0%, #070708 58%, #040405 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 dark:opacity-[0.045]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(128deg, transparent 0 42px, rgba(255,255,255,.12) 43px, transparent 44px)",
        }}
      />
      <div
        data-hero-atmosphere
        data-depth="near"
        className="absolute left-[-10%] top-[22%] z-0 h-[38rem] w-[38rem] rounded-full bg-[#0B1450]/10 blur-3xl dark:bg-white/[0.018]"
      />
      <div
        data-hero-atmosphere
        data-depth="far"
        className="absolute right-[-13%] top-[8%] z-0 h-[34rem] w-[34rem] rounded-full bg-[#7A1020]/10 blur-3xl dark:bg-white/[0.012]"
      />

      <HeroConnections />
      <HeroName />

      <div className="absolute inset-x-3 top-[45%] z-30 grid grid-cols-2 gap-2.5 sm:inset-x-8 sm:top-[47%] sm:gap-4 lg:inset-0 lg:top-0 lg:block">
        {features.map((feature) => (
          <FloatingFeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            detail={feature.detail}
            callout={feature.callout}
            motion={feature.motion}
            className={`relative justify-start lg:absolute ${feature.position}`}
          />
        ))}
      </div>

      <HeroContent />
      <ScrollIndicator />
    </section>
  );
}
