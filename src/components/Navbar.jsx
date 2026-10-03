"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "#home", active: true },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

function OrbitMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 52 52" className="h-11 w-11 overflow-visible sm:h-12 sm:w-12">
      <defs>
        <linearGradient id="brand-orbit" x1="7" y1="43" x2="44" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B1450" />
          <stop offset="0.5" stopColor="#2145D6" />
          <stop offset="1" stopColor="#7A1020" />
        </linearGradient>
      </defs>
      <ellipse
        cx="26"
        cy="26"
        rx="20"
        ry="10"
        transform="rotate(-42 26 26)"
        fill="none"
        stroke="url(#brand-orbit)"
        strokeWidth="4.5"
        className="transition-[stroke-width,filter] duration-300 group-hover/brand:stroke-[5.5px] group-hover/brand:[filter:drop-shadow(0_0_5px_rgba(181,27,50,.6))] dark:opacity-90"
      />
      <path d="M4 10.5v5M1.5 13h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-[#0B1450] dark:text-white" />
      <circle cx="43" cy="42" r="2" className="fill-[#7A1020] transition-transform duration-300 group-hover/brand:scale-150" />
    </svg>
  );
}

function SparkBurst() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute -right-1 -top-1 h-1.5 w-1.5 scale-50 rounded-full bg-[#B51B32] opacity-0 shadow-[0_0_8px_2px_rgba(181,27,50,.48)] transition-all duration-200 group-hover/navitem:scale-100 group-hover/navitem:opacity-100" />
      <span className="absolute -left-1 top-1/2 h-1 w-1 -translate-y-1/2 rotate-45 bg-[#7A1020] opacity-0 transition-all delay-75 duration-200 group-hover/navitem:-translate-x-1 group-hover/navitem:opacity-100" />
      <span className="absolute bottom-0 right-1/4 h-1 w-1 rounded-full bg-[#E04455] opacity-0 transition-all delay-100 duration-200 group-hover/navitem:translate-y-1 group-hover/navitem:opacity-100" />
    </span>
  );
}

function NavbarTail() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 92"
      fill="none"
      className="pointer-events-none absolute -right-10 top-1/2 hidden h-24 w-24 -translate-y-1/2 overflow-visible text-[#2145D6]/55 xl:block dark:text-white/20"
    >
      <path d="M2 8 C 60 7 84 25 84 46 C 84 67 60 85 2 84" stroke="currentColor" strokeWidth="1.2" />
      <path d="M72 2v10M67 7h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="84" cy="46" r="2" fill="currentColor" />
    </svg>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [boundaryHighlight, setBoundaryHighlight] = useState({ left: 0, width: 0, visible: false });
  const navbarShellRef = useRef(null);

  const showBoundaryHighlight = (element) => {
    const shell = navbarShellRef.current;
    if (!shell || !element) return;

    const shellBounds = shell.getBoundingClientRect();
    const itemBounds = element.getBoundingClientRect();
    const width = Math.max(58, itemBounds.width + 28);
    const left = itemBounds.left - shellBounds.left + itemBounds.width / 2 - width / 2;

    setBoundaryHighlight({ left, width, visible: true });
  };

  const hideBoundaryHighlight = () => {
    setBoundaryHighlight((current) => ({ ...current, visible: false }));
  };

  return (
    <nav
      data-site-navbar
      className="fixed inset-x-0 top-3 z-50 px-3 text-slate-900 dark:text-slate-100 sm:top-5 sm:px-7"
    >
      <div ref={navbarShellRef} className="relative mx-auto max-w-[1440px] rounded-[2rem] border border-[#0B1450]/15 bg-white/2 px-4 shadow-[0_20px_65px_-34px_rgba(11,20,80,0.42),0_0_30px_rgba(33,69,214,0.06),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-3xl backdrop-saturate-150 dark:border-white/10 dark:bg-[#09090a]/78 dark:shadow-[0_20px_65px_-34px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.07)] sm:px-7 lg:px-9">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-px z-20 hidden h-[2px] rounded-full bg-[#B51B32] shadow-[0_0_11px_2px_rgba(181,27,50,0.52)] transition-[left,width,opacity] duration-500 ease-out motion-reduce:transition-none lg:block"
          style={{
            left: boundaryHighlight.left,
            width: boundaryHighlight.width,
            opacity: boundaryHighlight.visible ? 1 : 0,
          }}
        >
          <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#E04455] shadow-[0_0_8px_2px_rgba(224,68,85,0.65)]" />
        </span>
        <NavbarTail />

        <div className="relative z-10 flex h-[4.0rem] items-center justify-between sm:h-[5.02rem]">
          <a
            href="#home"
            className="group/brand flex items-center gap-2.5 text-slate-950 sm:gap-3 dark:text-white"
            aria-label="Saeed Ahmad, back to top"
          >
            <OrbitMark />
            <span className="flex flex-col leading-none">
              <span className="text-[16px] font-black uppercase tracking-[0.34em] transition-colors duration-300 group-hover/brand:text-[#7A1020] sm:text-[17px]">
                Saeed<span className="text-[#7A1020]">.</span>
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex xl:gap-10" onMouseLeave={hideBoundaryHighlight}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={(event) => showBoundaryHighlight(event.currentTarget)}
                onFocus={(event) => showBoundaryHighlight(event.currentTarget)}
                onBlur={hideBoundaryHighlight}
                className={`group/navitem relative px-1 py-3 text-[15px] font-semibold tracking-[-0.01em] transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-[#B51B32] xl:text-base ${
                  item.active ? "text-[#0B1450] dark:text-white" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-all duration-200 group-hover/navitem:bg-[#B51B32] group-hover/navitem:shadow-[0_0_9px_2px_rgba(181,27,50,.55)] ${
                    item.active ? "bg-[#7A1020] shadow-[0_0_7px_1px_rgba(122,16,32,.32)] dark:bg-[#8F2433]" : "scale-50 bg-transparent"
                  }`}
                />
                <SparkBurst />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button
              asChild
              className="group/navitem relative h-12 overflow-visible rounded-full bg-gradient-to-r from-[#0B1450] via-[#14246e] to-[#3629b7] px-6 text-[15px] font-bold text-white shadow-[0_14px_28px_-13px_rgba(33,69,214,0.78)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#7A1020] hover:via-[#A0162B] hover:to-[#B51B32] hover:shadow-[0_14px_30px_-11px_rgba(181,27,50,0.62)] dark:from-[#242426] dark:via-[#181819] dark:to-[#741827] dark:hover:from-[#5f111e] dark:hover:to-[#8F2433]"
            >
              <a href="#contact">
                <MessageCircle className="mr-2 h-[18px] w-[18px]" aria-hidden="true" />
                Let&apos;s Talk
                <ArrowUpRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover/navitem:-translate-y-0.5 group-hover/navitem:translate-x-0.5" aria-hidden="true" />
                <SparkBurst />
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-200 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="h-11 w-11 rounded-full border border-slate-200/80 bg-white/55 text-slate-800 hover:border-[#B51B32]/30 hover:bg-white hover:text-[#B51B32] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="relative z-10 grid gap-1 border-t border-[#0B1450]/10 pb-5 pt-3 dark:border-white/10 lg:hidden">
            {[...navItems, { name: "Contact", href: "#contact" }].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group/navitem relative flex items-center justify-between overflow-hidden rounded-xl px-3 py-3 text-[15px] font-bold text-slate-600 transition-colors hover:bg-[#7A1020]/[0.06] hover:text-[#B51B32] dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-[#d65a68]"
              >
                <span>{item.name}</span>
                <ArrowUpRight className="h-4 w-4 opacity-35 transition-all group-hover/navitem:-translate-y-0.5 group-hover/navitem:translate-x-0.5 group-hover/navitem:opacity-100" />
                <SparkBurst />
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
