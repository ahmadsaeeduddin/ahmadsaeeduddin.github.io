import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import MobileSkillsCarousel from "./skills/MobileSkillsCarousel";
import { skillGroups } from "./skills/skillsData";
import { TextRepel } from "@/components/motion/TextRepel";

const networkNodes = [
  [555, 128, "#2145D6"],
  [780, 105, "#2145D6"],
  [1038, 126, "#B51B32"],
  [1320, 182, "#B51B32"],
  [1482, 322, "#2145D6"],
  [1330, 470, "#2145D6"],
  [1194, 642, "#B51B32"],
  [1000, 744, "#5B6DF0"],
  [805, 694, "#2145D6"],
  [574, 615, "#2145D6"],
  [444, 430, "#B51B32"],
  [620, 312, "#2145D6"],
  [940, 430, "#7A1020"],
];

function SkillsNetwork() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 850"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      fill="none"
    >
      <defs>
        <linearGradient id="skills-network-main" x1="430" y1="180" x2="1350" y2="710" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2145D6" />
          <stop offset="0.48" stopColor="#5B6DF0" />
          <stop offset="0.72" stopColor="#7A1020" />
          <stop offset="1" stopColor="#B51B32" />
        </linearGradient>
      </defs>

      <g stroke="url(#skills-network-main)" strokeLinecap="round">
        <path d="M940 430 C886 342 844 280 780 210" strokeWidth="2" opacity="0.78" />
        <path d="M940 430 C990 344 1020 282 1060 218" strokeWidth="2" opacity="0.78" />
        <path d="M940 430 C846 426 764 420 700 418" strokeWidth="2" opacity="0.82" />
        <path d="M940 430 C1050 428 1138 430 1235 432" strokeWidth="2" opacity="0.82" />
        <path d="M940 430 C862 500 826 558 808 610" strokeWidth="2" opacity="0.78" />
        <path d="M940 430 C948 516 962 590 978 656" strokeWidth="2" opacity="0.76" />
        <path d="M940 430 C1034 490 1114 540 1198 594" strokeWidth="2" opacity="0.78" />

        <path d="M452 94 C570 22 680 80 780 105 S986 96 1038 126 S1196 148 1320 182" strokeWidth="0.85" opacity="0.36" />
        <path d="M390 254 C500 192 548 204 620 312 S742 396 940 430 S1190 356 1320 182" strokeWidth="0.8" opacity="0.32" />
        <path d="M444 430 C514 502 526 568 574 615 S692 704 805 694 S924 710 1000 744" strokeWidth="0.85" opacity="0.36" />
        <path d="M1038 126 C1110 212 1142 304 1198 350 S1284 398 1330 470 S1392 530 1482 550" strokeWidth="0.8" opacity="0.3" />
        <path d="M1194 642 C1280 598 1330 560 1482 550" strokeWidth="0.8" opacity="0.3" />
        <path d="M574 615 C652 550 742 526 840 546 S1044 640 1194 642" strokeWidth="0.72" opacity="0.28" />
        <path d="M555 128 Q650 174 620 312 Q696 316 780 210 Q846 310 940 430 Q1010 280 1038 126" strokeWidth="0.72" opacity="0.28" strokeDasharray="6 8" />
        <path d="M444 430 Q520 398 620 312 Q620 510 574 615 Q700 590 805 694 Q846 558 940 430" strokeWidth="0.72" opacity="0.28" strokeDasharray="6 8" />
        <path d="M940 430 Q1120 382 1235 432 Q1190 520 1194 642 Q1078 614 1000 744" strokeWidth="0.72" opacity="0.28" strokeDasharray="6 8" />
      </g>

      <g>
        {networkNodes.map(([cx, cy, color], index) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={index === networkNodes.length - 1 ? 7 : 4} fill={color} opacity="0.9" />
            <circle cx={cx} cy={cy} r={index === networkNodes.length - 1 ? 12 : 7} stroke={color} strokeWidth="1" opacity="0.22" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function HubMark() {
  return (
    <div className="absolute left-[58.75%] top-[50.5%] z-30 -translate-x-1/2 -translate-y-1/2">
      <div className="relative grid h-40 w-40 place-items-center rounded-full border-[10px] border-white/85 bg-[radial-gradient(circle_at_35%_30%,#526cf4_0%,#17266d_42%,#67192d_75%,#b51b32_100%)] shadow-[0_24px_65px_-20px_rgba(11,20,80,.7),inset_0_0_34px_rgba(255,255,255,.24)] dark:border-white/15">
        <span className="absolute -inset-5 rounded-full border border-dashed border-[#0B1450]/25 dark:border-white/20" />
        <span className="absolute -inset-9 rounded-full border border-[#2145D6]/15 dark:border-white/10" />
        <svg aria-hidden="true" viewBox="0 0 70 70" className="h-20 w-20 overflow-visible">
          <ellipse cx="35" cy="35" rx="28" ry="13" transform="rotate(-43 35 35)" fill="none" stroke="white" strokeWidth="7" />
          <circle cx="58" cy="57" r="5" fill="#E5202F" />
        </svg>
      </div>
    </div>
  );
}

function SkillCard({ group, compact = false }) {
  const Icon = group.icon;
  const isRed = group.tone === "red";

  return (
    <article
      className={`${compact ? "relative" : `absolute ${group.className}`} ${group.shape} group z-20 border bg-white/[0.64] p-5 shadow-[0_22px_60px_-42px_rgba(11,20,80,.62)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.82] dark:bg-[#0b0b0d]/[0.76] dark:hover:bg-[#111114]/90 ${
        isRed ? "border-[#B51B32]/40" : "border-[#2145D6]/40"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border bg-white/75 shadow-[0_12px_30px_-22px_rgba(11,20,80,.65)] dark:bg-white/[0.06] ${
            isRed ? "border-[#B51B32]/30 text-[#B51B32]" : "border-[#2145D6]/30 text-[#2145D6]"
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>

        <div className="min-w-0 pt-1">
          <h3 className="text-base font-black tracking-[-0.025em] text-[#080d35] dark:text-white">
            {group.title}
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {group.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#eaecfb]/90 px-3 py-1 text-[10px] font-semibold text-[#263b9f] dark:bg-white/[0.07] dark:text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function SectionIntro() {
  return (
    <div className="relative z-30 max-w-[22rem]">
      <p className="inline-flex rounded-full border border-[#B51B32]/25 bg-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em] text-[#B51B32] shadow-[0_12px_30px_-22px_rgba(181,27,50,.6)] backdrop-blur-xl dark:border-white/15 dark:bg-black/20 dark:text-[#e16a78]">
        Skills & Technologies
        <span className="ml-2 h-1.5 w-1.5 self-center rounded-full bg-[#B51B32]" />
      </p>
      <h2 data-motion-heading className="mt-6 text-[clamp(3rem,4vw,4.5rem)] font-black leading-[0.92] tracking-[-0.065em] text-[#080d35] dark:text-white">
        <TextRepel text={"Tools for\nBigger Ideas."} accentLastCharacter />
      </h2>
      <p className="mt-5 max-w-[20rem] text-sm leading-6 text-slate-600 dark:text-slate-300">
        A carefully curated toolkit for building intelligent systems, from quick prototypes to dependable production-ready solutions.
      </p>
      <div className="mt-5 flex items-center gap-4">
        <a
          data-web-land="skills-setup"
          href="#experience"
          className="inline-flex items-center gap-3 rounded-full border border-[#0B1450]/10 bg-white/80 px-5 py-3 text-xs font-extrabold text-[#0B1450] shadow-[0_14px_30px_-20px_rgba(11,20,80,.6)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-[#B51B32]/30 hover:text-[#B51B32] dark:border-white/10 dark:bg-white/[0.07] dark:text-white"
        >
          Explore My Setup
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <span className="font-mono text-[9px] font-bold uppercase leading-4 tracking-[0.12em] text-[#0B1450]/65 dark:text-white/55">
          Same tools.
          <br />
          Bigger problems.
        </span>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-[100svh] scroll-mt-6 overflow-hidden bg-[#F5F6FC] text-[#0B1450] dark:bg-[#080809] dark:text-white"
    >
      <Image
        src="/skills-back-2.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-center opacity-50 saturate-[0.78] dark:opacity-[0.12]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(245,246,252,.96)_0%,rgba(245,246,252,.66)_30%,rgba(245,246,252,.55)_70%,rgba(245,246,252,.82)_100%)] dark:bg-[linear-gradient(90deg,rgba(8,8,9,.98)_0%,rgba(8,8,9,.78)_40%,rgba(8,8,9,.7)_70%,rgba(8,8,9,.9)_100%)]" />

      <div className="relative mx-auto hidden h-[58rem] max-w-[1600px] px-8 py-14 xl:block 2xl:h-[60rem]">
        <div className="absolute left-8 top-16">
          <SectionIntro />
        </div>
        <SkillsNetwork />
        <HubMark />
        {skillGroups.map((group) => (
          <SkillCard key={group.id} group={group} />
        ))}

        <span className="absolute bottom-14 left-[9%] z-20 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#0B1450]/60 dark:text-white/45">
          New tools
          <br />
          New possibilities
        </span>
        <span className="absolute right-[6%] top-14 z-20 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#0B1450]/60 dark:text-white/45">
          Constantly
          <br />
          Exploring
        </span>
      </div>

      <div className="relative z-20 mx-auto max-w-5xl px-5 pb-28 pt-16 xl:hidden">
        <SectionIntro />
        <MobileSkillsCarousel />
        <div className="relative mt-12 hidden gap-5 md:grid md:grid-cols-2">
          <span className="pointer-events-none absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-[#2145D6]/30 via-[#5B6DF0]/25 to-[#B51B32]/30" />
          {skillGroups.map((group) => (
            <SkillCard key={group.id} group={group} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
