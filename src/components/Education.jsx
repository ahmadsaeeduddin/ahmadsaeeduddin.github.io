"use client";

import { useState } from "react";
import { BookOpen, Calendar, ChevronDown, GraduationCap, Info, MapPin } from "lucide-react";
import { TextRepel } from "@/components/motion/TextRepel";

const educationData = [
  {
    number: "01",
    eyebrow: "Bachelor’s Degree",
    degree: "Bachelor’s in Computer Science",
    institution: "FAST National University of Computer and Emerging Sciences",
    dates: "August 2022 - June 2026",
    location: "Islamabad, Pakistan",
    coursework: [
      "Artificial Intelligence",
      "Deep Learning",
      "AI Product Development",
      "MLOPs",
      "Object Oriented Programming",
      "Data Structures & Algorithms",
      "Computer Networks",
      "Database Systems",
      "Operating Systems",
      "Parallel Computing",
      "Software Engineering",
      "Web Development",
      "Linear Algebra",
      "Probability & Stats",
    ],
    additionalInformation: [
      "Focused on artificial intelligence, intelligent systems, and applied machine learning.",
      "Built practical experience across full-stack development, databases, and computer systems.",
      "Expected graduation: June 2026.",
    ],
  },
  {
    number: "02",
    eyebrow: "Intermediate",
    degree: "Intermediate in Computer Science",
    institution: "Punjab College Blue Area",
    dates: "September 2020 - July 2022",
    location: "Islamabad, Pakistan",
    coursework: ["Mathematics", "Physics", "Computer Science"],
    additionalInformation: [
      "Built a strong foundation in analytical thinking, mathematics, and computing fundamentals.",
      "Developed the academic base that led to further study in computer science and AI.",
      "Completed in July 2022.",
    ],
  },
];

function EducationWeb() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 920"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-45 dark:grayscale dark:opacity-20"
      fill="none"
    >
      <defs>
        <linearGradient id="education-web-blue" x1="0" y1="0" x2="900" y2="760" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B1450" />
          <stop offset="0.58" stopColor="#2145D6" />
          <stop offset="1" stopColor="#5B6DF0" />
        </linearGradient>
        <linearGradient id="education-web-red" x1="1600" y1="0" x2="840" y2="850" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7A1020" />
          <stop offset="0.6" stopColor="#B51B32" />
          <stop offset="1" stopColor="#D94A48" />
        </linearGradient>
      </defs>

      <g stroke="url(#education-web-blue)" strokeWidth="0.85" opacity="0.35" strokeLinecap="round">
        <path d="M-40 74 C122 128 190 226 286 360 S422 596 566 770" />
        <path d="M76 -30 C150 126 142 260 250 382 S316 664 202 940" />
        <path d="M-70 628 C88 552 204 536 322 592 S474 730 642 792" />
      </g>

      <g stroke="url(#education-web-red)" strokeWidth="0.85" opacity="0.32" strokeLinecap="round">
        <path d="M1640 86 C1498 154 1422 252 1324 382 S1184 604 1032 782" />
        <path d="M1532 -34 C1456 130 1464 270 1354 392 S1282 670 1398 942" />
        <path d="M1668 638 C1500 558 1388 548 1270 604 S1110 738 950 804" />
      </g>

      <g fill="#2145D6">
        {[
          [142, 238], [250, 382], [322, 592], [474, 730],
        ].map(([cx, cy]) => <circle key={`blue-${cx}-${cy}`} cx={cx} cy={cy} r="3" />)}
      </g>
      <g fill="#B51B32">
        {[
          [1458, 246], [1354, 392], [1270, 604], [1110, 738],
        ].map(([cx, cy]) => <circle key={`red-${cx}-${cy}`} cx={cx} cy={cy} r="3" />)}
      </g>
    </svg>
  );
}

function NodeWeb({ index }) {
  const gradientId = `node-web-gradient-${index}`;
  const centerX = 80;
  const centerY = 150;
  const baseEndpoints = [
    [0, 34], [94, 0], [260, 30], [430, 100], [520, 238], [358, 356], [142, 406], [0, 318],
  ];
  const endpoints = baseEndpoints;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 430"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-x-8 -top-16 z-0 hidden h-[30rem] w-[calc(100%+4rem)] overflow-visible dark:grayscale sm:block"
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="70" y1="40" x2="535" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B1450" />
          <stop offset="0.46" stopColor="#2145D6" />
          <stop offset="0.72" stopColor="#7A1020" />
          <stop offset="1" stopColor="#B51B32" />
        </linearGradient>
      </defs>

      <g stroke={`url(#${gradientId})`} strokeLinecap="round">
        {endpoints.map(([x, y], spokeIndex) => (
          <path
            key={`spoke-${x}-${y}`}
            d={`M${centerX} ${centerY} Q${(centerX + x) / 2 + (spokeIndex % 2 ? 14 : -12)} ${(centerY + y) / 2} ${x} ${y}`}
            strokeWidth={spokeIndex % 3 === 0 ? "1.15" : "0.8"}
            opacity={spokeIndex % 3 === 0 ? "0.7" : "0.48"}
          />
        ))}
        <ellipse cx={centerX} cy={centerY} rx="78" ry="66" strokeWidth="0.8" opacity="0.32" strokeDasharray="4 6" />
        <ellipse cx={centerX} cy={centerY} rx="132" ry="112" strokeWidth="0.7" opacity="0.22" strokeDasharray="6 8" />
        <path
          d="M4 92 C70 64 144 72 212 116 S328 212 434 236"
          strokeWidth="0.85"
          opacity="0.34"
        />
      </g>

      <g fill={`url(#${gradientId})`}>
        {endpoints.slice(0, 12).map(([x, y], nodeIndex) => (
          <circle key={`node-${x}-${y}`} cx={(centerX + x) / 2} cy={(centerY + y) / 2} r={nodeIndex % 4 === 0 ? "3" : "2"} opacity="0.76" />
        ))}
      </g>
    </svg>
  );
}

function EducationBridgeWeb() {
  const bridgeNodes = [
    [174, 300, 3],
    [144, 390, 4],
    [112, 500, 3],
    [84, 610, 4],
    [62, 704, 3],
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible dark:grayscale lg:block"
      fill="none"
    >
      <defs>
        <linearGradient id="education-bridge-main" x1="180" y1="220" x2="820" y2="790" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B1450" />
          <stop offset="0.38" stopColor="#2145D6" />
          <stop offset="0.68" stopColor="#7A1020" />
          <stop offset="1" stopColor="#B51B32" />
        </linearGradient>
      </defs>

      <g stroke="url(#education-bridge-main)" strokeLinecap="round">
        <path d="M190 226 C206 304 150 342 144 412 C136 494 86 548 82 626 C78 696 62 738 52 790" strokeWidth="1.8" opacity="0.76" />
        <path d="M183 230 C168 310 192 354 156 426 C120 498 120 556 94 630 C70 698 72 746 58 792" strokeWidth="0.95" opacity="0.52" />
        <path d="M198 232 C224 314 116 370 132 452 C146 526 66 568 74 650 C80 712 48 754 48 792" strokeWidth="0.8" opacity="0.4" />
        <path d="M174 300 Q154 346 144 390 Q130 448 112 500 Q94 554 84 610 Q70 664 62 704" strokeWidth="0.7" opacity="0.38" strokeDasharray="6 8" />
      </g>

      <g fill="url(#education-bridge-main)">
        {bridgeNodes.map(([cx, cy, radius]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} />
        ))}
      </g>
      <g fill="white" stroke="url(#education-bridge-main)" strokeWidth="2">
        <circle cx="144" cy="390" r="6" />
        <circle cx="84" cy="610" r="6" />
      </g>
    </svg>
  );
}

function EducationNode({ number }) {
  return (
    <div className="education-node-ring relative z-20 mx-auto grid h-20 w-20 place-items-center rounded-full p-[0.42rem] shadow-[0_18px_38px_-22px_rgba(11,20,80,.75)] sm:h-24 sm:w-24 lg:h-28 lg:w-28 lg:p-[0.62rem]">
      <div className="grid h-full w-full place-items-center rounded-full border border-white/85 bg-[#FAFAFF]/95 shadow-[inset_0_0_28px_rgba(11,20,80,.1)] dark:border-white/15 dark:bg-[#111113]">
        <GraduationCap className="h-8 w-8 text-[#0B1450] dark:text-white sm:h-9 sm:w-9 lg:h-9 lg:w-9" aria-hidden="true" />
      </div>
      <span className="absolute -right-2 -top-3 rounded-lg border border-[#7A1020]/35 bg-white/95 px-2 py-1 text-[10px] font-black text-[#0B1450] shadow-[0_8px_20px_-12px_rgba(122,16,32,.5)] dark:bg-[#111113] dark:text-white lg:-top-5 lg:px-2.5 lg:py-1.5 lg:text-xs">
        {number}
      </span>
      <span className="pointer-events-none absolute inset-[-1.1rem] rounded-full border border-dashed border-[#0B1450]/15 dark:border-white/10" />
    </div>
  );
}

function ExpandablePanel({ id, title, icon: Icon, open, onToggle, preview, children }) {
  return (
    <div className="rounded-2xl border border-[#0B1450]/10 bg-[#F7F7FD]/[0.72] transition-colors dark:border-white/10 dark:bg-white/[0.035]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-bold text-[#0B1450] transition-colors hover:text-[#7A1020] dark:text-white dark:hover:text-[#e16a78] sm:text-sm lg:py-2.5"
      >
        <Icon className="h-4 w-4 text-[#2145D6] dark:text-white" aria-hidden="true" />
        <span>{title}</span>
        <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} aria-hidden="true" />
      </button>
      {!open && preview ? (
        <div className="border-t border-[#0B1450]/[0.08] px-4 pb-3 pt-2.5 dark:border-white/10 lg:pb-2.5 lg:pt-2">
          {preview}
        </div>
      ) : null}
      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#0B1450]/[0.08] px-4 pb-4 pt-3 dark:border-white/10 lg:pb-3 lg:pt-2.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationCard({ education, index }) {
  const [openPanel, setOpenPanel] = useState(null);
  const courseworkId = `education-coursework-${index}`;
  const informationId = `education-information-${index}`;

  const togglePanel = (panel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  return (
    <article
      data-web-land={`education-${index}`}
      className={`relative min-w-0 pt-8 lg:grid lg:w-[84%] lg:items-center lg:gap-5 lg:pt-0 ${
        index === 0
          ? "lg:ml-auto lg:grid-cols-[7rem_minmax(0,1fr)]"
          : "lg:mr-auto lg:grid-cols-[7rem_minmax(0,1fr)]"
      }`}
    >
      <NodeWeb index={index} />
      <div className="absolute left-4 top-0 z-20 sm:left-6 lg:static lg:order-1">
        <EducationNode number={education.number} />
      </div>

      <div className="relative z-10 mt-4 flex flex-col rounded-[1.55rem] border border-white/90 bg-white/[0.72] px-4 pb-4 pt-14 shadow-[0_24px_65px_-42px_rgba(11,20,80,.5),inset_0_1px_0_rgba(255,255,255,.96)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#2145D6]/20 dark:border-white/10 dark:bg-[#0d0d0f]/[0.92] dark:shadow-[0_30px_80px_-46px_rgba(0,0,0,.92)] sm:mt-5 sm:rounded-[1.8rem] sm:px-6 sm:pb-6 sm:pt-16 lg:order-2 lg:mt-0 lg:rounded-[2rem] lg:p-5">
        <span className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#0B1450]/45 to-transparent dark:via-white/20" />

        <div>
          <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.27em] text-[#0B1450]/60 dark:text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2145D6] dark:bg-white" />
            <span>{education.eyebrow}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#7A1020]" />
          </div>

          <h3 className="mt-3 text-xl font-black tracking-[-0.035em] text-[#080d35] dark:text-white sm:text-2xl lg:mt-2 lg:text-xl">
            {education.degree}
          </h3>
          <p className="mt-1 text-sm font-semibold leading-5 text-[#2145D6] dark:text-white/75">
            {education.institution}
          </p>

          <div className="mt-4 grid gap-2 text-xs text-slate-500 dark:text-slate-400 sm:grid-cols-2 lg:mt-3">
            <span className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#0B1450]/65 dark:text-white/60" aria-hidden="true" />
              {education.dates}
            </span>
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0B1450]/65 dark:text-white/60" aria-hidden="true" />
              {education.location}
            </span>
          </div>
        </div>

        <div className="grid gap-3 pt-5 lg:gap-2.5 lg:pt-3.5">
          <ExpandablePanel
            id={courseworkId}
            title={`Relevant Coursework (${education.coursework.length})`}
            icon={BookOpen}
            open={openPanel === "coursework"}
            onToggle={() => togglePanel("coursework")}
            preview={(
              <div className="flex max-w-full items-center gap-2 overflow-hidden whitespace-nowrap">
                {education.coursework.slice(0, 3).map((course, courseIndex) => (
                  <span
                    key={`preview-${course}`}
                    className={`${courseIndex === 2 ? "hidden sm:inline-flex" : "inline-flex"} shrink-0 rounded-full bg-[#e9eaff] px-3 py-1 text-[10px] font-medium text-[#3438a8] dark:bg-white/[0.08] dark:text-white/80 sm:text-xs`}
                  >
                    {course}
                  </span>
                ))}
                {education.coursework.length > 3 ? (
                  <span className="shrink-0 text-sm font-black tracking-[0.18em] text-[#7A1020] dark:text-[#e16a78]">•••</span>
                ) : null}
              </div>
            )}
          >
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-full bg-[#e9eaff] px-3 py-1.5 text-[10px] font-medium text-[#3438a8] dark:bg-white/[0.08] dark:text-white/80 sm:text-xs"
                >
                  {course}
                </span>
              ))}
            </div>
          </ExpandablePanel>

          <ExpandablePanel
            id={informationId}
            title="Additional Information"
            icon={Info}
            open={openPanel === "information"}
            onToggle={() => togglePanel("information")}
          >
            <ul className="grid gap-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
              {education.additionalInformation.map((information) => (
                <li key={information} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7A1020]" />
                  <span>{information}</span>
                </li>
              ))}
            </ul>
          </ExpandablePanel>
        </div>
      </div>
    </article>
  );
}

export function Education() {
  return (
    <section
      id="education"
      className="relative min-h-[100svh] overflow-hidden bg-[#F6F7FC] pb-28 pt-16 text-[#0B1450] dark:bg-[#080809] dark:text-white sm:pt-20 lg:pb-16 lg:pt-10"
    >
      <EducationWeb />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-[#7A1020]/20 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.38em] text-[#7A1020] shadow-[0_10px_28px_-18px_rgba(122,16,32,.55)] backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.07] dark:text-[#e16a78] lg:py-1.5 lg:text-[10px]">
            Education
          </p>
          <h2 data-motion-heading className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.35rem,4.5vw,4.4rem)] font-black leading-[0.98] tracking-[-0.06em] text-[#080d35] dark:text-white lg:mt-3 lg:text-[3.35rem]">
            <TextRepel text="See how far it goes." accentLastCharacter />
          </h2>
        </header>

        <div className="relative mt-9 grid items-start gap-10 sm:mt-12 sm:gap-12 lg:mt-7 lg:gap-9">
          <EducationBridgeWeb />
          {educationData.map((education, index) => (
            <EducationCard
              key={`${education.degree}-${education.institution}`}
              education={education}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
