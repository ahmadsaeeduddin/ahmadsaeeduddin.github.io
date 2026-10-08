"use client";

import { useLayoutEffect, useRef } from "react";
import { BriefcaseBusiness, Calendar, MapPin, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextRepel } from "@/components/motion/TextRepel";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Intellema",
    title: "AI Engineer",
    period: "Nov 2025 - Present",
    location: "Remote / Islamabad",
    type: "Full-time",
    category: "Professional",
    current: true,
    description:
      "Building agentic AI systems, RAG pipelines, LLM-powered applications, voice AI solutions, and dependable AI backend services for enterprise workflows.",
    punchline:
      "Turning ambitious AI ideas into systems that hold up in production.",
    highlights: ["Agentic AI", "RAG Pipelines", "Voice AI"],
  },
  {
    company: "NESCOM",
    title: "Research Collaboration",
    period: "2025 - 2026",
    location: "Islamabad, Pakistan",
    type: "Research partnership",
    category: "Collaboration",
    current: false,
    description:
      "Collaborating on an aerospace simulation and telemetry platform spanning rocket dynamics, environmental conditions, geospatial data, and 3D visualization.",
    punchline: "Where software, physics, and a little rocket science collide.",
    highlights: ["Rocket Dynamics", "Telemetry", "3D Simulation"],
  },
  {
    company: "Genesys Research Lab",
    title: "NLP / GenAI Intern",
    period: "Jun - Aug 2025",
    location: "On-site",
    type: "Internship",
    category: "Research",
    current: false,
    description:
      "Worked on applied NLP and generative AI projects spanning text analysis, language models, experimentation, and practical AI research.",
    punchline:
      "Research became more interesting when the models met real data.",
    highlights: ["NLP", "Generative AI", "Applied Research"],
  },
  {
    company: "Shaoor",
    title: "Full-Stack Developer",
    period: "Aug - Sep 2025",
    location: "Remote",
    type: "Internship",
    category: "Professional",
    current: false,
    description:
      "Developed full-stack applications with an emphasis on thoughtful user experience, backend integration, and dependable application performance.",
    punchline: "The best interface is only as good as the system behind it.",
    highlights: ["Full-stack", "API Integration", "Performance"],
  },
  {
    company: "Khanabadosh Explorers",
    title: "Co-Founder",
    period: "Mar 2024 - Present",
    location: "Islamabad, Pakistan",
    type: "Own venture",
    category: "Venture",
    current: true,
    description:
      "Built a student travel venture and led trip planning, vendor coordination, logistics, community building, and team execution.",
    punchline: "Ten trips. Three hundred students. Plenty of stories.",
    highlights: ["10+ Trips", "300+ Students", "Leadership"],
  },
  {
    company: "Nimco",
    title: "Co-Founder",
    period: "2024 - Present",
    location: "Islamabad, Pakistan",
    type: "Community venture",
    category: "Impact",
    current: true,
    description:
      "Co-founded a community initiative that turns collective support into direct help through donation drives and coordinated meal distribution.",
    punchline: "Small coordinated actions can travel surprisingly far.",
    highlights: ["PKR 100K+ Raised", "200+ Meals", "Community"],
  },
];

function ExperienceCard({ experience, index }) {
  const isRed = index % 2 === 1;
  const accent = isRed ? "#B51B32" : "#2145D6";
  const darkAccent = isRed ? "#777777" : "#3f3f3f";

  return (
    <article
      data-experience-card
      data-web-land={
        index === 0
          ? "experience-card-0"
          : index === 3
            ? "experience-venture"
            : undefined
      }
      className="absolute left-1/2 top-1/2 h-[68svh] min-h-[31rem] w-[calc(100%_-_2rem)] max-w-[70rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.2rem] border-[3px] border-[#080d35] bg-[#fffaf1] text-[#080d35] shadow-[10px_12px_0_#080d35] will-change-transform motion-reduce:relative motion-reduce:left-auto motion-reduce:top-auto motion-reduce:h-auto motion-reduce:min-h-[30rem] motion-reduce:w-full motion-reduce:translate-x-0 motion-reduce:translate-y-0 dark:border-white/85 dark:bg-[#101013] dark:text-white dark:shadow-[10px_12px_0_rgba(255,255,255,.16)] sm:h-[62svh] sm:rounded-[1.6rem] lg:h-[56svh]"
      style={{
        zIndex: index + 1,
        "--experience-accent": accent,
        "--experience-accent-dark": darkAccent,
        "--experience-stripe-active": isRed ? "#2145D6" : "#B51B32",
        "--experience-stripe-dark": isRed ? "#d4d4d4" : "#858585",
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0 10px, rgba(11,20,80,.055) 10px 11px)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{
          background: "linear-gradient(90deg, var(--experience-active), #111 52%, var(--experience-stripe-active))",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute -left-3 -top-16 font-black leading-none tracking-[-0.1em] opacity-[0.08] dark:opacity-[0.06]"
        style={{ color: "var(--experience-active)", fontSize: "clamp(10rem, 21vw, 18rem)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative grid h-full gap-6 p-6 sm:p-8 md:grid-cols-[0.95fr_1.05fr] md:items-center lg:p-10">
        <div className="relative z-10 self-end md:self-center">
          <div
            className="inline-flex -rotate-1 items-center gap-2 border-2 border-[#080d35] px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-[4px_4px_0_#080d35] dark:border-white/80 dark:shadow-[4px_4px_0_rgba(255,255,255,.16)]"
            style={{ backgroundColor: "var(--experience-active)" }}
          >
            <BriefcaseBusiness className="h-3.5 w-3.5" aria-hidden="true" />
            {experience.category} · {experience.period}
          </div>

          <h3 className="mt-6 max-w-xl text-[clamp(2.35rem,6vw,5.4rem)] font-black leading-[0.82] tracking-[-0.07em] [text-shadow:3px_3px_0_rgba(181,27,50,.2)] dark:[text-shadow:3px_3px_0_rgba(255,255,255,.1)] sm:mt-7">
            {experience.title}
            <span style={{ color: "var(--experience-active)" }}>.</span>
          </h3>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.24em] text-[#0B1450]/70 dark:text-white/60">
            {experience.company}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold text-[#0B1450]/65 dark:text-white/55">
            <span className="flex items-center gap-2">
              <Calendar
                className="h-4 w-4"
                style={{ color: "var(--experience-active)" }}
                aria-hidden="true"
              />
              {experience.type}
            </span>
            <span className="flex items-center gap-2">
              <MapPin
                className="h-4 w-4"
                style={{ color: "var(--experience-active)" }}
                aria-hidden="true"
              />
              {experience.location}
            </span>
          </div>
        </div>

        <div className="relative z-10 self-start md:self-center">
          <div className="relative rounded-[1.5rem] border-[3px] border-[#080d35] bg-white px-5 py-5 text-base font-black leading-6 shadow-[7px_8px_0_#080d35] dark:border-white/80 dark:bg-[#18181c] dark:shadow-[7px_8px_0_rgba(255,255,255,.14)] sm:px-7 sm:py-6 sm:text-xl sm:leading-7">
            {experience.punchline}
            <span className="absolute -bottom-4 left-8 h-7 w-7 rotate-45 border-b-[3px] border-r-[3px] border-[#080d35] bg-white dark:border-white/80 dark:bg-[#18181c]" />
          </div>
          <p className="mt-8 text-sm leading-6 text-[#0B1450]/72 dark:text-white/65 sm:text-base sm:leading-7">
            {experience.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {experience.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-[#0B1450]/15 bg-white/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] dark:border-white/15 dark:bg-white/[0.06]"
              >
                {highlight}
              </span>
            ))}
          </div>
          <div
            className="mt-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: "var(--experience-active)" }}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {experience.current ? "Currently building" : "Chapter complete"}
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-1 right-4 rotate-[-8deg] text-[clamp(3.5rem,9vw,7.5rem)] font-black italic leading-none tracking-[-0.08em] opacity-[0.16]"
        style={{ color: "var(--experience-active)" }}
      >
        {index === experiences.length - 1 ? "THWIP!" : "POW!"}
      </span>
    </article>
  );
}

export function Experience() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray("[data-experience-card]", stage);
        cards.forEach((card, index) => {
          gsap.set(card, {
            xPercent: -50,
            yPercent: index === 0 ? -50 : 72,
            autoAlpha: index === 0 ? 1 : 0.25,
            rotation: index === 0 ? -0.4 : index % 2 ? 3.5 : -3.5,
            scale: 1,
          });
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.round(window.innerHeight * (experiences.length * 0.72))}`,
            pin: stage,
            pinSpacing: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.slice(1).forEach((card, index) => {
          const previous = cards[index];
          const position = index;
          timeline
            .to(
              previous,
              {
                y: -18 - index * 5,
                scale: 0.96 - index * 0.004,
                rotation: index % 2 ? 0.8 : -0.8,
                filter: "brightness(0.78) saturate(0.82)",
                duration: 0.7,
                ease: "power2.inOut",
              },
              position,
            )
            .to(
              card,
              {
                yPercent: -50,
                autoAlpha: 1,
                rotation: index % 2 ? -0.55 : 0.55,
                duration: 0.82,
                ease: "power3.out",
              },
              position,
            );
        });
        return () => timeline.kill();
      });
    }, section);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-[#F5F6FC] text-[#080d35] dark:bg-[#080809] dark:text-white"
    >
      <div
        ref={stageRef}
        className="relative h-[100svh] min-h-[44rem] overflow-hidden motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:overflow-visible motion-reduce:px-4 motion-reduce:py-20"
      >
        <div className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-25 [background-image:radial-gradient(circle_at_18%_24%,rgba(33,69,214,.16),transparent_25%),radial-gradient(circle_at_84%_72%,rgba(181,27,50,.14),transparent_28%)] dark:[background-image:radial-gradient(circle_at_18%_24%,rgba(255,255,255,.1),transparent_25%),radial-gradient(circle_at_84%_72%,rgba(135,135,135,.1),transparent_28%)]" />
        <header className="absolute inset-x-5 top-[5.5%] z-20 mx-auto flex max-w-[70rem] items-end justify-between gap-5 motion-reduce:relative motion-reduce:inset-auto motion-reduce:mb-10 sm:top-[6.5%]">
          <div>
            <p className="inline-flex rounded-full border border-[#7A1020]/20 bg-white/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em] text-[#7A1020] shadow-[0_10px_28px_-18px_rgba(122,16,32,.55)] backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.07] dark:text-white/70 dark:shadow-[0_10px_28px_-18px_rgba(255,255,255,.18)]">
              Experience
            </p>
            <h2
              data-motion-heading
              className="mt-5 text-balance text-[clamp(2.65rem,4vw,4.6rem)] font-black leading-[0.92] tracking-[-0.06em]"
            >
              <TextRepel text="Every role left a mark." accentLastCharacter />
            </h2>
          </div>
          <span className="hidden max-w-[13rem] text-right font-mono text-[9px] font-bold uppercase leading-4 tracking-[0.16em] text-[#0B1450]/45 dark:text-white/40 sm:block">
            Scroll to stack
            <br />
            each chapter
          </span>
        </header>
        <div className="absolute inset-x-0 bottom-[4%] top-[22%] motion-reduce:relative motion-reduce:inset-auto motion-reduce:grid motion-reduce:gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company}-${experience.title}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
