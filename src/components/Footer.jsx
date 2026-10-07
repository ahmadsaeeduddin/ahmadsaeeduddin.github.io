import {
  Activity,
  ArrowRight,
  ArrowUp,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ahmadsaeeduddin",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/saeed-ud-din-ahmad",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:ahmadsaeeduddin@gmail.com",
    icon: Mail,
  },
];

function ContactRow({ icon: Icon, title, children, accent = "blue" }) {
  const red = accent === "red";

  return (
    <div className="flex items-center gap-4">
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border bg-white/70 shadow-[0_14px_28px_-18px_rgba(11,20,80,.55)] backdrop-blur-xl dark:bg-white/[0.06] ${
          red
            ? "border-[#E5202F]/10 text-[#E5202F] dark:border-[#E5202F]/20"
            : "border-[#2145D6]/10 text-[#2145D6] dark:border-[#5B6DF0]/20 dark:text-[#8290ff]"
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-sm font-extrabold text-[#07103f] dark:text-white">
          {title}
          {red ? <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_9px_rgba(16,185,129,.65)]" /> : null}
        </p>
        <div className="mt-1 truncate text-xs font-medium text-[#71809f] dark:text-slate-400 sm:text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (event, href) => {
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", href);
  };

  const backToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden border-t border-[#0B1450]/[0.08] bg-[#f8f8fc] text-[#0B1450] dark:border-white/[0.08] dark:bg-[#08090c] dark:text-white"
    >
      <img
        src="/footer-back.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-bottom opacity-[0.38] dark:opacity-[0.14]"
      />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-white/45 dark:bg-[#08090c]/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-white/75 to-transparent dark:from-[#08090c]/90" />

      <div className="mx-auto w-full max-w-[1640px] px-5 pb-7 pt-20 sm:px-8 lg:px-12 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.72fr_1fr_1.05fr] lg:gap-0">
          <div data-web-land="footer-brand" className="lg:pr-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5202F]/20 bg-white/65 px-4 py-2 text-[9px] font-black uppercase tracking-[0.32em] text-[#53617f] shadow-[0_10px_28px_-20px_rgba(229,32,47,.6)] backdrop-blur-xl dark:border-[#E5202F]/25 dark:bg-white/[0.05] dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] shadow-[0_0_8px_rgba(255,90,54,.65)]" />
              Let&apos;s build together
            </span>

            <h2 className="mt-7 max-w-[12ch] text-4xl font-black leading-[0.95] tracking-[-0.045em] text-[#07103f] dark:text-white sm:text-5xl lg:text-[3.3rem]">
              Saeed Ud Din Ahmad<span className="text-[#ff5638]">.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm font-medium leading-7 text-[#71809f] dark:text-slate-400 sm:text-base">
              AI/ML Engineer &amp; Full Stack Developer passionate about creating useful,
              intelligent products and pushing ideas beyond the prototype.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={name}
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-[#0B1450]/[0.08] bg-white/65 text-[#455271] shadow-[0_14px_30px_-20px_rgba(11,20,80,.6)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#E5202F]/20 hover:text-[#E5202F] hover:shadow-[0_18px_34px_-18px_rgba(229,32,47,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2145D6] dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-[#ef7180]"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="grid h-12 w-12 place-items-center rounded-2xl border border-[#0B1450]/[0.08] bg-white/65 text-base font-black text-[#455271] shadow-[0_14px_30px_-20px_rgba(11,20,80,.6)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#E5202F]/20 hover:text-[#E5202F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2145D6] dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-[#ef7180]"
              >
                X
              </a>
            </div>
          </div>

          <div className="border-[#0B1450]/[0.08] lg:border-l lg:px-11 dark:lg:border-white/[0.08]">
            <p className="text-[10px] font-black uppercase tracking-[0.38em] text-[#5f6b89] dark:text-slate-400">
              Navigation
            </p>
            <nav aria-label="Footer navigation" className="mt-8 space-y-4">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => scrollTo(event, link.href)}
                  className="group flex w-fit items-center gap-4 text-sm font-semibold text-[#485674] transition-colors hover:text-[#E5202F] focus-visible:outline-none focus-visible:text-[#E5202F] dark:text-slate-300 dark:hover:text-[#ef7180] sm:text-base"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff7990] ring-4 ring-[#ff7990]/10 transition duration-300 group-hover:scale-125 group-hover:bg-[#E5202F]" />
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="border-[#0B1450]/[0.08] lg:border-l lg:px-11 dark:lg:border-white/[0.08]">
            <p className="text-[10px] font-black uppercase tracking-[0.38em] text-[#5f6b89] dark:text-slate-400">
              Get in touch
            </p>
            <div className="mt-8 space-y-7">
              <ContactRow icon={Mail} title="Email">
                <a href="mailto:ahmadsaeeduddin@gmail.com" className="transition-colors hover:text-[#2145D6] dark:hover:text-[#8290ff]">
                  ahmadsaeeduddin@gmail.com
                </a>
              </ContactRow>
              <ContactRow icon={MapPin} title="Location">
                Islamabad, Pakistan
              </ContactRow>
              <ContactRow icon={MessageSquare} title="Open to Opportunities" accent="red">
                Let&apos;s discuss your ideas!
              </ContactRow>
            </div>
          </div>

          <div className="lg:pl-11">
            <a
              href="mailto:ahmadsaeeduddin@gmail.com?subject=Let%27s%20build%20something"
              className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/65 p-7 shadow-[0_28px_70px_-38px_rgba(11,20,80,.65)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_75px_-34px_rgba(122,16,32,.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2145D6] dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_28px_70px_-38px_rgba(0,0,0,.95)] sm:p-8"
            >
              <span className="absolute -right-4 -top-7 h-28 w-28 rounded-full bg-gradient-to-br from-[#ff8ea4] via-[#7b62df] to-[#2145D6] opacity-85 shadow-[0_20px_45px_-15px_rgba(33,69,214,.65)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12" />
              <span className="absolute right-[-2.4rem] top-[-3.1rem] h-36 w-40 rotate-12 rounded-[50%] border border-[#E5202F]/35" />
              <span className="absolute right-[-3.4rem] top-[-1.1rem] h-24 w-48 -rotate-[32deg] rounded-[50%] border border-[#2145D6]/30" />

              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#f7edff] to-[#ffeef4] text-[#7c3ee5] shadow-[0_14px_30px_-18px_rgba(124,62,229,.7)] dark:from-white/10 dark:to-[#7A1020]/20 dark:text-[#b794ff]">
                <Send className="h-6 w-6 -rotate-12" aria-hidden="true" />
              </span>

              <h3 className="relative mt-7 max-w-[12ch] text-3xl font-black leading-[1.05] tracking-[-0.04em] text-[#07103f] dark:text-white">
                Have a project in mind?
              </h3>
              <p className="relative mt-4 max-w-[30ch] text-sm font-medium leading-6 text-[#71809f] dark:text-slate-400">
                I&apos;m always open to new opportunities, collaborations, or a good technology conversation.
              </p>

              <span className="relative mt-auto ml-auto grid h-12 w-12 place-items-center rounded-full bg-white text-[#07103f] shadow-[0_12px_28px_-14px_rgba(11,20,80,.55)] transition duration-300 group-hover:translate-x-1 group-hover:bg-[#0B1450] group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-[#B51B32]">
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-5 border-t border-[#0B1450]/[0.09] pt-7 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6d7895] dark:border-white/[0.08] dark:text-slate-500 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p>© {currentYear} Saeed Ud Din Ahmad. All rights reserved.</p>

          <p className="flex flex-wrap items-center gap-3 md:justify-center">
            <Activity className="h-5 w-5 text-[#ff5638]" aria-hidden="true" />
            <span>Built with curiosity</span>
            <span className="text-[#E5202F]">•</span>
            <span>Always learning</span>
            <span className="text-[#E5202F]">•</span>
            <span>Higher possibilities</span>
          </p>

          <div className="flex items-center gap-5 md:justify-end">
            <button
              type="button"
              onClick={backToTop}
              className="inline-flex items-center gap-2 transition-colors hover:text-[#E5202F] focus-visible:outline-none focus-visible:text-[#E5202F]"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              Back to top
            </button>
            <span className="h-5 w-px bg-[#0B1450]/10 dark:bg-white/10" />
            <span className="inline-flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#E5202F]" aria-hidden="true" />
              Keep building!
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
