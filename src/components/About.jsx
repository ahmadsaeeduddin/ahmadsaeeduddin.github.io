import Image from "next/image";
import {
  Code2,
  GraduationCap,
  Mountain,
  Plane,
  Rocket,
  Users,
  Zap,
} from "lucide-react";

const journey = [
  {
    title: "FAST NUCES",
    detail: "Computer Science (BS)",
    icon: GraduationCap,
  },
  {
    title: "Khanabadosh Explorers",
    detail: "Co-founder",
    icon: Plane,
  },
  {
    title: "AI & Full-stack",
    detail: "Building solutions",
    icon: Code2,
  },
  {
    title: "What’s next?",
    detail: "Bigger challenges",
    icon: Mountain,
  },
];

const stats = [
  { value: "10+", label: "Student trips organized", icon: Plane, accent: "text-[#2145D6]" },
  { value: "300+", label: "University students", icon: Users, accent: "text-[#2145D6]" },
  { value: "3+", label: "Years of hands-on work", icon: Zap, accent: "text-[#B51B32]" },
  { value: "∞", label: "Curiosity to keep building", icon: Rocket, accent: "text-[#2145D6]" },
];

function JourneyRail() {
  return (
    <div className="relative space-y-5 pl-2 lg:pl-4">
      <span className="absolute bottom-7 left-[1.68rem] top-7 w-px bg-gradient-to-b from-[#2145D6]/30 via-[#0B1450]/45 to-[#7A1020]/30 dark:from-white/20 dark:via-white/35 dark:to-white/10 lg:left-[2.18rem]" />
      {journey.map(({ title, detail, icon: Icon }, index) => (
        <div key={title} className="group relative flex items-center gap-4">
          <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#0B1450]/15 bg-white/75 text-[#0B1450] shadow-[0_12px_35px_-22px_rgba(11,20,80,.5)] backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-1 dark:border-white/12 dark:bg-[#111113]/85 dark:text-white">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-black uppercase tracking-[0.19em] text-[#0B1450] dark:text-white">
              {title}
            </span>
            <span className="mt-1 block text-xs tracking-[0.12em] text-slate-500 dark:text-slate-400">
              {detail}
            </span>
          </span>
          {index < journey.length - 1 && (
            <span className="absolute left-[1.47rem] top-[3.4rem] z-10 h-1.5 w-1.5 rounded-full bg-[#B51B32] shadow-[0_0_8px_1px_rgba(181,27,50,.32)] lg:left-[1.97rem]" />
          )}
        </div>
      ))}
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative min-h-[100svh] scroll-mt-[8rem] overflow-hidden bg-[#F6F7FC] text-[#0B1450] dark:bg-[#080809] dark:text-white"
    >
      <div className="relative z-0 h-[27rem] overflow-hidden lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[50%]">
        <Image
          src="/aboutme.png"
          alt="Saeed looking over a futuristic city while exploring ideas in AI, software, and travel"
          fill
          priority={false}
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-cover object-[50%_54%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F6F7FC]/5 to-[#F6F7FC] lg:bg-gradient-to-r lg:from-transparent lg:via-[#F6F7FC]/45 lg:to-[#F6F7FC] dark:via-[#080809]/5 dark:to-[#080809] lg:dark:via-[#080809]/50 lg:dark:to-[#080809]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1450]/20 via-transparent to-white/5 dark:from-black/45 dark:to-black/5" />
        <div className="absolute left-7 top-9 hidden max-w-[11rem] -rotate-6 font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.08em] text-[#0B1450]/75 sm:block lg:left-10 lg:top-32 dark:text-white/65">
          Same person.
          <br />
          Bigger problems.
          <br />
          Better ideas.
          <span className="ml-2 inline-block text-2xl text-[#B51B32]">↘</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1600px] lg:grid-cols-[44%_56%]">
        <div className="hidden lg:block" aria-hidden="true" />

        <div className="px-5 pb-14 pt-9 sm:px-9 lg:px-9 lg:py-14 xl:px-12 2xl:px-16">
          <div className="mb-5 flex items-center gap-4 text-[10px] font-bold tracking-[0.22em] text-slate-400">
            <span>01</span>
            <span className="h-px w-9 bg-slate-300 dark:bg-white/20" />
          </div>

          <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-8 2xl:grid-cols-[minmax(0,1fr)_17rem]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[#7A1020]/20 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.38em] text-[#7A1020] shadow-[0_10px_28px_-18px_rgba(122,16,32,.55)] backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.07] dark:text-[#e16a78]">
                About me
              </p>
              <h2 className="max-w-2xl text-balance text-[clamp(2.35rem,3.35vw,4rem)] font-black leading-[0.98] tracking-[-0.055em] text-[#080d35] dark:text-white">
                Curious mind.
                <br />
                Builder at heart<span className="text-[#B51B32]">.</span>
              </h2>

              <div className="mt-5 max-w-2xl space-y-3 text-[13px] leading-6 text-slate-600 dark:text-slate-300 sm:text-sm">
                <p>
                  I&apos;m a Computer Science student at <strong className="font-bold text-[#0B1450] dark:text-white">FAST National University</strong> with a strong interest in artificial intelligence, machine learning, and full-stack development. I enjoy turning complex problems into practical solutions and exploring how technology can create real-world impact.
                </p>
                <p>
                  Beyond academics, I co-founded <strong className="font-bold text-[#0B1450] dark:text-white">Khanabadosh Explorers</strong>, a student travel startup that organized 10+ trips for 300+ university students. Those experiences taught me leadership, project management, and how to build dependable teams.
                </p>
                <p>
                  Technically, I work across AI/ML with TensorFlow and PyTorch, full-stack development with React and Node.js, and modern data systems. I&apos;m particularly interested in natural language processing, computer vision, and intelligent products.
                </p>
              </div>
            </div>

            <JourneyRail />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {stats.map(({ value, label, icon: Icon, accent }) => (
              <article
                key={label}
                className="group rounded-2xl border border-[#0B1450]/10 bg-white/60 p-4 shadow-[0_18px_45px_-30px_rgba(11,20,80,.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#B51B32]/25 hover:bg-white/85 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/[0.07]"
              >
                <Icon className={`mb-3 h-5 w-5 ${accent} dark:text-slate-200`} aria-hidden="true" />
                <strong className="block text-2xl font-black tracking-[-0.04em] text-[#080d35] dark:text-white sm:text-3xl">
                  {value}
                </strong>
                <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {label}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
