"use client";

import { useCallback, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Car,
  ExternalLink,
  Github,
  GraduationCap,
  Network,
  Rocket,
  ShoppingCart,
  X,
} from "lucide-react";
import { TextRepel } from "@/components/motion/TextRepel";

// `preview` is shown on the closed card. `details`, `highlights`, and the full
// `technologies` list are reserved for the More details layer.
const projects = [
  {
    title: "Fake News Detection System",
    period: "Jul 2025",
    preview: "Real-time claim verification powered by RAG, FAISS, and Llama 3.",
    details:
      "Built a comprehensive fake-news detection system combining web scraping, NLP, retrieval-augmented generation, FAISS vector search, and Groq's Llama 3 API for intelligent classification.",
    technologies: ["Python", "LLMs", "RAG", "NLP", "FAISS", "Groq API", "Web Scraping"],
    category: "AI / ML",
    highlights: ["91.2% accuracy", "Real-time processing", "Automated fact-checking"],
    metric: "91.2%",
    metricLabel: "classification accuracy",
    source: "https://github.com/fastgenesys/summer_25_fakenews",
    icon: Bot,
  },

  {
    title: "Autonomous Car Simulation",
    period: "May 2025",
    preview: "A deep-learning driving agent for live steering and throttle control in TORCS.",
    details:
      "Created a self-driving TORCS simulation using PyTorch. Sensor streams pass through deep-learning models to generate real-time steering and throttle predictions.",
    technologies: ["PyTorch", "Python", "TORCS", "Deep Learning", "Computer Vision"],
    category: "AI / ML",
    highlights: ["Real-time control", "Sensor fusion", "Neural-network driving"],
    metric: "Real-Time",
    metricLabel: "vehicle control",
    source: "https://github.com/ahmadsaeeduddin/AI-Car_Simulator",
    icon: Car,
  },

  {
    title: "Student Management",
    period: "2025",
    preview: "A role-based academic platform for courses, attendance, records, and grades.",
    details:
      "An end-to-end MERN platform for registration, course assignment, grades, attendance, and academic records with secure role-based dashboards.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript", "HTML", "CSS"],
    category: "Full Stack",
    highlights: ["Role-based dashboards", "Real-time updates", "Secure authentication"],
    metric: "3",
    metricLabel: "user roles",
    source: "https://github.com/zohaib-han/Attendance-System",
    icon: GraduationCap,
  },

  {
    title: "Employee Management",
    period: "2025",
    preview: "A complete employee lifecycle system for HR operations and performance tracking.",
    details:
      "A complete employee lifecycle platform for onboarding, departments, attendance, performance reviews, filtering, and operational summaries.",
    technologies: ["React.js", "MySQL", "Express.js", "Node.js", "JavaScript", "HTML", "CSS"],
    category: "Full Stack",
    highlights: ["Department mapping", "Attendance tracking", "Performance analytics"],
    metric: "6+",
    metricLabel: "HR workflows",
    source: "https://github.com/ahmadsaeeduddin/EmployeeManagement",
    icon: BriefcaseBusiness,
  },

  {
    title: "Rocket Simulation",
    period: "2025 — 2026",
    preview: "Real-time aerodynamics and physics simulation developed in collaboration with NESCOM.",
    details:
      "A final-year project developed with NESCOM: advanced rocket simulation software modeling aerodynamics, environmental conditions, and real-time physics in Unreal Engine.",
    technologies: ["Unreal Engine", "C++", "Python", "Physics Simulation", "Aerodynamics"],
    category: "Simulation",
    highlights: ["Real-time physics", "Environmental modeling", "Industry collaboration"],
    metric: "NESCOM",
    metricLabel: "industry collaboration",
    source: "https://github.com/ibraheem-farrukh/RAC-NESCOM-FYP",
    icon: Rocket,
  },

  {
    title: "Retail Management",
    period: "2025",
    preview: "A desktop retail suite covering inventory, billing, customers, and analytics.",
    details:
      "A JavaFX desktop solution covering inventory, billing, customers, suppliers, invoices, transactions, and sales analytics backed by MySQL.",
    technologies: ["JavaFX", "Java", "MySQL", "JDBC"],
    category: "Desktop App",
    highlights: ["Inventory tracking", "Billing and invoicing", "Sales analytics"],
    metric: "7+",
    metricLabel: "retail modules",
    source: "https://github.com/ahmadsaeeduddin/Retail-Management-System",
    icon: ShoppingCart,
  },

  {
    title: "Parallel Influential User Detection",
    period: "2025",
    preview: "Hybrid MPI and OpenMP graph analysis for influential-user detection at scale.",
    details:
      "A high-performance PSAIIM implementation using MPI, OpenMP, and METIS to identify influential nodes across large social-network datasets.",
    technologies: ["C++", "MPI", "OpenMP", "METIS", "Parallel Computing", "Graph Processing"],
    category: "High Performance",
    highlights: ["Hybrid parallelism", "METIS partitioning", "Large-scale networks"],
    metric: "2",
    metricLabel: "parallel frameworks",
    source: "https://github.com/ahmadsaeeuddin/Parallel-social-behavior-based-algorithm-for-identification-of-influential-users",
    icon: Network,
  },

  {
    title: "Sentiment Analyzer",
    period: "Apr 2025",
    preview: "A four-class neural sentiment classifier trained on social-media text.",
    details:
      "A TensorFlow and Keras sentiment classifier using tokenization, padded sequences, and learned embeddings to classify tweets into four sentiment categories.",
    technologies: ["TensorFlow", "Keras", "Python", "NLP", "Neural Networks"],
    category: "AI / ML",
    highlights: ["91.2% accuracy", "Four sentiment classes", "Twitter dataset"],
    metric: "91.2%",
    metricLabel: "model accuracy",
    source: "https://github.com/ahmadsaeeduddin/Sentiment_analyzer",
    icon: BrainCircuit,
  },
];

// Edit this array to control the text in the moving technology strip.
const projectMarqueeItems = [
  "Generative AI",
  "Agentic Systems",
  "LLM Applications",
  "RAG Systems",
  "Intelligent Automation",
  "AI-Powered Verification",
  "Semantic Search",
  "Vector Retrieval",
  "Real-Time AI",
  "Autonomous Systems",
  "Sensor Fusion",
  "Neural Networks",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "AI Inference",
  "Model Evaluation",
  "Graph Intelligence",
  "High-Performance Computing",
  "Parallel Computing",
  "Distributed Processing",
  "Real-Time Simulation",
  "Physics Simulation",
  "Scalable Systems",
  "Full-Stack Engineering",
  "Unreal Engine",
  "PyTorch",
  "TensorFlow",
  "FAISS",
  "MPI",
  "OpenMP",
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function ProjectVisual({ project }) {
  const Icon = project.icon;

  return (
    <div className="relative mx-auto grid aspect-square w-[min(18rem,70vw)] place-items-center lg:w-[min(20rem,23vw)]" aria-hidden="true">
      <span className="project-orbit absolute inset-[3%] rounded-full border border-dashed border-[#2145D6]/25 dark:border-white/25" />
      <span className="project-orbit project-orbit-reverse absolute -inset-[7%] rounded-full border border-dashed border-[#7A1020]/20 dark:border-white/15" />
      <span className="absolute left-[4%] top-1/2 h-3 w-3 rounded-full bg-[#E5202F] shadow-[0_0_18px_rgba(229,32,47,.85)]" />
      <span className="absolute right-[-5%] top-[28%] h-3 w-3 rounded-full bg-[#5B6DF0] shadow-[0_0_18px_rgba(91,109,240,.9)]" />

      <div className="project-tile relative grid aspect-square w-[66%] place-items-center overflow-hidden rounded-[2rem] border border-[#0B1450]/10 bg-white/60 shadow-[0_30px_60px_-30px_rgba(11,20,80,.45)] backdrop-blur-md dark:border-white/20 dark:bg-white/[0.08] dark:shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)]">
        <span className="absolute inset-0 bg-gradient-to-br from-[#2145D6]/10 via-transparent to-[#E5202F]/10 dark:from-[#2145D6]/20 dark:to-[#E5202F]/20" />
        <Icon className="relative h-[46%] w-[46%] text-[#0B1450] drop-shadow-[0_15px_18px_rgba(11,20,80,.2)] dark:text-white dark:drop-shadow-[0_15px_18px_rgba(0,0,0,.38)]" strokeWidth={1.35} />
      </div>
    </div>
  );
}

function ExpandedProject({ project, onOpenDetails }) {
  return (
    <div className="project-card-content relative z-10 grid h-full items-center gap-8 p-6 sm:p-9 xl:grid-cols-[minmax(0,1.25fr)_minmax(17rem,.75fr)] xl:p-11">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#0B1450]/10 bg-white/65 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1450] shadow-sm dark:border-white/20 dark:bg-white/10 dark:text-white">
            {project.category}
          </span>
          <span className="text-xs font-bold text-[#667492] dark:text-[#9eaae1]">
            {project.period}
          </span>
        </div>

        <h3 className="project-preview-title mt-4 text-[clamp(2rem,3.2vw,3.65rem)] font-black leading-[0.96] tracking-[-0.055em]">
          {project.title.split(" ").map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="project-title-word mr-[0.2em] inline-block"
              style={{ "--word-index": index }}
            >
              {word}
            </span>
          ))}
        </h3>

        <p className="project-preview-copy mt-4 max-w-2xl text-sm font-medium leading-6 text-[#53617f] dark:text-[#b8c1e8] sm:text-[15px]">
          {project.preview}
        </p>

        <div className="mt-6">
          <p className="bg-gradient-to-r from-[#ff6a78] to-[#7c98ff] bg-clip-text text-4xl font-black tracking-[-0.05em] text-transparent sm:text-5xl">
            {project.metric}
          </p>
          <p className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#697696] dark:text-[#8e9acb]">
            {project.metricLabel}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((technology) => (
            <span key={technology} className="rounded-full border border-[#0B1450]/10 bg-white/35 px-3 py-1.5 text-[11px] font-semibold text-[#3f4d6d] transition duration-300 hover:-translate-y-0.5 hover:bg-white/75 dark:border-white/15 dark:bg-transparent dark:text-[#d5dcff] dark:hover:bg-white/10">
              {technology}
            </span>
          ))}
          {project.technologies.length > 4 ? (
            <span className="rounded-full border border-dashed border-[#0B1450]/15 px-3 py-1.5 text-[11px] font-black text-[#7A1020] dark:border-white/20 dark:text-[#ef7180]">
              +{project.technologies.length - 4} more
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onOpenDetails}
          className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#7A1020] via-[#B51B32] to-[#2145D6] px-5 py-3 text-sm font-extrabold text-white shadow-[0_16px_32px_-14px_rgba(33,69,214,.7)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_-14px_rgba(181,27,50,.68)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          More details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>

      <div className="hidden xl:block">
        <ProjectVisual project={project} />
      </div>
    </div>
  );
}

function ProjectDetails({ project, onClose }) {
  return (
    <div className="project-details-enter absolute inset-0 z-30 overflow-y-auto bg-white/95 p-6 backdrop-blur-2xl dark:bg-[#090b12]/95 sm:p-9 xl:p-11">
      <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-center">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#B51B32] dark:text-[#ef7180]">
              Project details
            </p>
            <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.045em] text-[#0B1450] dark:text-white sm:text-5xl">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#0B1450]/10 bg-white text-[#0B1450] shadow-sm transition hover:rotate-90 hover:text-[#B51B32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2145D6] dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-[#53617f] dark:text-[#b8c1e8] sm:text-base">
          {project.details}
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {project.highlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl border border-[#0B1450]/10 bg-[#f5f6fc]/80 p-4 text-sm font-bold text-[#33415f] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#d8ddf7]">
              <span className="mr-2 text-[#B51B32]">{"\u2726"}</span>
              {highlight}
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="rounded-full border border-[#2145D6]/15 bg-[#2145D6]/[0.05] px-3 py-1.5 text-xs font-bold text-[#33415f] dark:border-white/15 dark:bg-white/[0.06] dark:text-[#d5dcff]">
              {technology}
            </span>
          ))}
        </div>

        <a
          href={project.source}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex w-fit items-center gap-3 rounded-xl bg-gradient-to-r from-[#7A1020] via-[#B51B32] to-[#2145D6] px-5 py-3 text-sm font-extrabold text-white shadow-[0_16px_32px_-14px_rgba(33,69,214,.7)] transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2145D6]"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          View source
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  const accordionRef = useRef(null);
  const panelRefs = useRef([]);
  const [current, setCurrent] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const total = projects.length;

  const selectProject = useCallback(
    (index) => {
      setCurrent(index);
      setDetailsOpen(false);

      if (window.innerWidth >= 1024) return;
      window.requestAnimationFrame(() => {
        const container = accordionRef.current;
        const panel = panelRefs.current[index];
        if (!container || !panel) return;
        const targetLeft = panel.offsetLeft - (container.clientWidth - panel.clientWidth) / 2;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        container.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: reducedMotion ? "auto" : "smooth",
        });
      });
    },
    []
  );

  const previous = () => selectProject((current - 1 + total) % total);
  const next = () => selectProject((current + 1) % total);

  const handlePointerMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
    const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
    card.style.setProperty("--project-rotate-y", `${(x - 0.5) * 6}deg`);
    card.style.setProperty("--project-rotate-x", `${-(y - 0.5) * 5}deg`);
    card.style.setProperty("--project-mouse-x", `${x * 100}%`);
    card.style.setProperty("--project-mouse-y", `${y * 100}%`);
  };

  const resetPointer = (event) => {
    const card = event.currentTarget;
    card.style.setProperty("--project-rotate-y", "0deg");
    card.style.setProperty("--project-rotate-x", "0deg");
    card.style.setProperty("--project-mouse-x", "50%");
    card.style.setProperty("--project-mouse-y", "30%");
  };

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f7f8ff_0%,#fff5f5_48%,#f1f3ff_100%)] text-[#0B1450] dark:bg-[linear-gradient(180deg,#08090c_0%,#0b0b12_50%,#090b18_100%)] dark:text-white"
    >
      <div className="pointer-events-none absolute left-[-12vw] top-[20%] -z-10 h-[36vw] w-[36vw] rounded-full bg-[#7A1020]/10 blur-[90px] dark:bg-[#7A1020]/15" />
      <div className="pointer-events-none absolute bottom-[20%] right-[-10vw] -z-10 h-[34vw] w-[34vw] rounded-full bg-[#2145D6]/10 blur-[90px] dark:bg-[#2145D6]/15" />

      <header className="mx-auto max-w-5xl px-5 pb-12 pt-24 text-center sm:px-8 sm:pb-16 sm:pt-28">
        <p className="inline-flex rounded-full border border-[#7A1020]/20 bg-white/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em] text-[#7A1020] shadow-[0_10px_28px_-18px_rgba(122,16,32,.55)] backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.07] dark:text-[#e16a78]">
          Projects
        </p>
        <h2
          data-motion-heading
          className="mt-5 text-balance text-[clamp(2.65rem,4vw,4.6rem)] font-black leading-[0.92] tracking-[-0.06em] text-[#07103f] dark:text-white"
        >
          <TextRepel text="Featured Projects." accentLastCharacter />
        </h2>
      </header>

      <div className="relative">
        <div className="relative mx-auto w-full max-w-[1540px] px-4 pb-6 sm:px-7 lg:px-10">
          <div className="relative w-full">
              <div
                ref={accordionRef}
                data-web-land="projects-carousel"
                className="project-accordion"
                role="group"
                aria-label="Featured projects gallery"
              >
                {projects.map((item, index) => {
                  const active = index === current;
                  const Icon = item.icon;
                  const collapsedGradient =
                    index % 2 === 0
                      ? "from-[#0B1450] via-[#172d93] to-[#2145D6]"
                      : "from-[#4f0c18] via-[#7A1020] to-[#B51B32]";

                  return (
                    <article
                      key={item.title}
                      ref={(node) => {
                        panelRefs.current[index] = node;
                      }}
                      aria-label={item.title}
                      aria-current={active ? "true" : undefined}
                      onMouseEnter={() => {
                        if (!detailsOpen && window.innerWidth >= 1024) selectProject(index);
                      }}
                      onPointerMove={active ? handlePointerMove : undefined}
                      onPointerLeave={active ? resetPointer : undefined}
                      className={`project-accordion-panel relative h-[560px] min-h-[560px] overflow-hidden rounded-[1.65rem] border shadow-[0_32px_72px_-34px_rgba(11,20,80,.55)] sm:h-[520px] sm:min-h-[520px] ${
                        active
                          ? "is-active project-feature-card border-[#0B1450]/10 bg-[linear-gradient(135deg,rgba(255,255,255,.97)_0%,rgba(238,242,255,.95)_52%,rgba(255,235,238,.93)_100%)] text-[#0B1450] dark:border-white/10 dark:bg-[linear-gradient(135deg,#090b12_0%,#101637_52%,#2a1018_100%)] dark:text-white"
                          : `is-collapsed border-white/10 bg-gradient-to-b ${collapsedGradient} text-white`
                      }`}
                    >
                      {active ? (
                        <>
                          <span className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(33,69,214,.2),transparent_66%)] dark:bg-[radial-gradient(circle,rgba(33,69,214,.42),transparent_66%)]" />
                          <span className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(181,27,50,.18),transparent_66%)] dark:bg-[radial-gradient(circle,rgba(181,27,50,.38),transparent_66%)]" />
                          <span className="project-pointer-glow pointer-events-none absolute inset-0" />
                          <span className="project-animated-border pointer-events-none absolute inset-0 rounded-[inherit]" />
                          <ExpandedProject project={item} onOpenDetails={() => setDetailsOpen(true)} />
                          {detailsOpen ? (
                            <ProjectDetails project={item} onClose={() => setDetailsOpen(false)} />
                          ) : null}
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => selectProject(index)}
                          className="group flex h-full w-full flex-col items-center justify-between gap-5 px-3 py-6 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                          aria-label={`Open ${item.title}`}
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10 transition duration-500 group-hover:scale-110 group-hover:bg-white/20">
                            <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                          </span>
                          <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-black tracking-[0.08em] opacity-80 transition-opacity group-hover:opacity-100">
                            {item.title}
                          </span>
                          <span className="h-2 w-2 rounded-full bg-white/65 shadow-[0_0_12px_rgba(255,255,255,.75)]" />
                        </button>
                      )}
                    </article>
                  );
                })}
              </div>

            <div data-web-land="projects-detail" className="mt-4 flex items-center justify-center gap-2 lg:justify-end">
              <button type="button" onClick={previous} aria-label="Previous project" className="grid h-10 w-10 place-items-center rounded-full border border-[#0B1450]/10 bg-white/70 text-[#0B1450] shadow-sm transition hover:-translate-x-0.5 hover:border-[#B51B32]/25 hover:text-[#B51B32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2145D6] dark:border-white/10 dark:bg-white/[0.07] dark:text-white dark:hover:text-[#ef7180]">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={next} aria-label="Next project" className="grid h-10 w-10 place-items-center rounded-full border border-[#0B1450]/10 bg-white/70 text-[#0B1450] shadow-sm transition hover:translate-x-0.5 hover:border-[#2145D6]/25 hover:text-[#2145D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2145D6] dark:border-white/10 dark:bg-white/[0.07] dark:text-white dark:hover:text-[#8290ff]">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mx-8 mb-12 mt-3 rotate-[-2.75deg] overflow-hidden bg-[#0B1450] py-3 text-white shadow-[0_25px_60px_-34px_rgba(11,20,80,.8)] dark:bg-[#721225] sm:py-4">
        <div className="project-marquee flex w-max items-center whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center">
              {projectMarqueeItems.map((technology) => (
                <span key={`${copy}-${technology}`} className="flex items-center text-lg font-black uppercase tracking-[-0.03em] sm:text-2xl lg:text-3xl">
                  {technology}
                  <span className="mx-6 text-[#E5202F] dark:text-[#8290ff] sm:mx-8">{"\u2726"}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-24 pt-4 text-center sm:pb-32">
        <a
          href="https://github.com/ahmadsaeeduddin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0B1450] transition-colors hover:text-[#B51B32] dark:text-slate-300 dark:hover:text-[#ef7180]"
        >
          More work on GitHub
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <style jsx>{`
        .project-feature-card {
          --project-rotate-x: 0deg;
          --project-rotate-y: 0deg;
          --project-mouse-x: 50%;
          --project-mouse-y: 30%;
          transform: perspective(1200px) rotateX(var(--project-rotate-x))
            rotateY(var(--project-rotate-y));
        }

        .project-accordion {
          display: flex;
          width: 100%;
          gap: 0.55rem;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0.25rem;
          scrollbar-width: none;
          scroll-snap-type: x proximity;
        }

        .project-accordion::-webkit-scrollbar {
          display: none;
        }

        .project-accordion-panel {
          flex-basis: 0;
          flex-grow: 0.62;
          min-width: 3.25rem;
          scroll-snap-align: center;
          transition:
            flex-grow 0.85s cubic-bezier(0.22, 1, 0.36, 1),
            flex-basis 0.85s cubic-bezier(0.22, 1, 0.36, 1),
            min-width 0.85s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.5s ease,
            transform 0.5s ease;
          will-change: flex-grow, flex-basis;
        }

        .project-accordion-panel.is-active {
          flex-grow: 7;
          min-width: 0;
        }

        .project-accordion-panel.is-collapsed:hover {
          transform: translateY(-6px);
          box-shadow: 0 34px 72px -30px rgba(11, 20, 80, 0.68);
        }

        .project-pointer-glow {
          background: radial-gradient(
            520px circle at var(--project-mouse-x) var(--project-mouse-y),
            rgba(33, 69, 214, 0.09),
            transparent 62%
          );
        }

        :global(.dark) .project-pointer-glow {
          background: radial-gradient(
            520px circle at var(--project-mouse-x) var(--project-mouse-y),
            rgba(255, 255, 255, 0.13),
            transparent 62%
          );
        }

        .project-animated-border::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1.5px;
          border-radius: inherit;
          background: linear-gradient(115deg, #7a1020, transparent 32%, #2145d6 68%, #b51b32);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.9;
        }

        .project-card-content {
          animation: project-content-in 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .project-preview-title,
        .project-preview-copy {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
        }

        .project-preview-title {
          -webkit-line-clamp: 2;
        }

        .project-preview-copy {
          -webkit-line-clamp: 3;
        }

        .project-details-enter {
          animation: project-details-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .project-title-word {
          opacity: 0;
          transform: translateY(0.8em);
          animation: project-word-in 0.78s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: calc(var(--word-index) * 55ms + 40ms);
        }

        .project-orbit {
          animation: project-orbit 18s linear infinite;
        }

        .project-orbit-reverse {
          animation-duration: 27s;
          animation-direction: reverse;
        }

        .project-tile {
          animation: project-float 5s ease-in-out infinite;
        }

        .project-marquee {
          animation: project-marquee 42s linear infinite;
        }

        @keyframes project-content-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes project-word-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes project-details-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes project-orbit {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes project-float {
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes project-marquee {
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 1023px) {
          .project-accordion-panel {
            flex: 0 0 4.25rem;
            min-width: 4.25rem;
          }

          .project-accordion-panel.is-active {
            flex-basis: min(88vw, 44rem);
            min-width: min(88vw, 44rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-card-content,
          .project-details-enter,
          .project-title-word,
          .project-orbit,
          .project-tile,
          .project-marquee {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
