"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  Folder,
  GraduationCap,
  Home,
  Layers3,
  MessageCircle,
  UserRound,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: UserRound },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Skills", href: "#skills", icon: Layers3 },
  { name: "Experience", href: "#experience", icon: BriefcaseBusiness },
  { name: "Projects", href: "#projects", icon: Folder },
];

function OrbitMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 52 52" className="h-10 w-10 overflow-visible">
      <defs>
        <linearGradient id="hero-nav-orbit" x1="7" y1="43" x2="44" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B1450" />
          <stop offset="0.52" stopColor="#2145D6" />
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
        stroke="url(#hero-nav-orbit)"
        strokeWidth="4.5"
      />
      <path d="M4 10.5v5M1.5 13h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-[#0B1450] dark:text-white" />
      <circle cx="43" cy="42" r="2" className="fill-[#7A1020]" />
    </svg>
  );
}

function SparkBurst() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute right-2 top-1 h-1.5 w-1.5 scale-50 rounded-full bg-[#B51B32] opacity-0 shadow-[0_0_8px_2px_rgba(181,27,50,.45)] transition-all duration-200 group-hover/navitem:scale-100 group-hover/navitem:opacity-100" />
      <span className="absolute bottom-1 left-2 h-1 w-1 rotate-45 bg-[#7A1020] opacity-0 transition-all delay-75 duration-200 group-hover/navitem:-translate-x-1 group-hover/navitem:opacity-100" />
      <span className="absolute bottom-2 right-5 h-1 w-1 rounded-full bg-[#E04455] opacity-0 transition-all delay-100 duration-200 group-hover/navitem:translate-y-1 group-hover/navitem:opacity-100" />
    </span>
  );
}

export function Navbar() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [activeHref, setActiveHref] = useState("#home");
  const [heroNavigationVisible, setHeroNavigationVisible] = useState(true);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-32% 0px -58% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateNavigationMode = () => {
      frameId = 0;
      const hero = document.querySelector("#home");
      if (!hero) return;

      const bounds = hero.getBoundingClientRect();
      const heroIsActive = bounds.bottom > window.innerHeight * 0.45 && bounds.top < window.innerHeight * 0.45;
      setHeroNavigationVisible(heroIsActive);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateNavigationMode);
    };

    updateNavigationMode();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!heroNavigationVisible) setPanelOpen(true);
  }, [heroNavigationVisible]);

  const navigateToSection = (event, href) => {
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const targetTop = target.getBoundingClientRect().top + window.scrollY - 24;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.history.pushState(null, "", href);
    setActiveHref(href);
    window.scrollTo({ top: Math.max(0, targetTop), behavior: reducedMotion ? "auto" : "smooth" });
  };

  const dockVisible = !heroNavigationVisible && panelOpen;

  return (
    <nav
      data-site-navbar
      aria-label="Primary navigation"
      className="pointer-events-none fixed inset-0 z-50"
    >
      <div
        className={`pointer-events-auto absolute left-1/2 top-3 flex w-[min(80rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center justify-between rounded-[1.7rem] border border-[#0B1450]/15 bg-white/[0.68] px-4 py-2 shadow-[0_18px_58px_-30px_rgba(11,20,80,.46),inset_0_1px_0_rgba(255,255,255,.96)] backdrop-blur-3xl backdrop-saturate-150 transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none dark:border-white/10 dark:bg-[#09090a]/82 dark:shadow-[0_18px_58px_-30px_rgba(0,0,0,.92),inset_0_1px_0_rgba(255,255,255,.06)] sm:px-6 ${
          heroNavigationVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-[calc(100%+2rem)] opacity-0"
        }`}
      >
        <a
          href="#home"
          onClick={(event) => navigateToSection(event, "#home")}
          className="group/brand flex shrink-0 items-center gap-2 text-[#0B1450] dark:text-white"
          aria-label="Saeed, back to the hero"
        >
          <OrbitMark />
          <span className="text-sm font-black uppercase tracking-[0.3em] transition-colors group-hover/brand:text-[#7A1020] sm:text-[15px]">
            Saeed<span className="text-[#7A1020]">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <a
              key={`hero-${item.name}`}
              href={item.href}
              onClick={(event) => navigateToSection(event, item.href)}
              className="group/navitem relative px-1 py-2 text-sm font-semibold text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#B51B32] dark:text-slate-300 dark:hover:text-[#d65a68]"
            >
              {item.name}
              <span
                className={`absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-all ${
                  item.href === activeHref
                    ? "bg-[#7A1020] shadow-[0_0_7px_2px_rgba(122,16,32,.3)]"
                    : "scale-50 bg-transparent group-hover/navitem:scale-100 group-hover/navitem:bg-[#B51B32]"
                }`}
              />
              <SparkBurst />
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            className="group/navitem relative hidden h-10 overflow-visible rounded-full bg-gradient-to-r from-[#0B1450] via-[#14246e] to-[#3629b7] px-4 text-xs font-bold text-white shadow-[0_12px_24px_-12px_rgba(33,69,214,.72)] transition-all hover:-translate-y-0.5 hover:from-[#7A1020] hover:via-[#A0162B] hover:to-[#B51B32] dark:from-[#242426] dark:via-[#181819] dark:to-[#741827] sm:inline-flex"
          >
            <a href="#contact" onClick={(event) => navigateToSection(event, "#contact")}>
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
              Let&apos;s Talk
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              <SparkBurst />
            </a>
          </Button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPanelOpen((open) => !open)}
        aria-expanded={panelOpen}
        aria-controls="bottom-navigation-dock"
        aria-label={panelOpen ? "Hide navigation" : "Show navigation"}
        tabIndex={heroNavigationVisible ? -1 : 0}
        className={`absolute left-1/2 z-20 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-[#0B1450]/15 bg-white/75 text-[#0B1450] shadow-[0_12px_32px_-15px_rgba(11,20,80,.5)] backdrop-blur-2xl transition-[bottom,color,background-color,transform,opacity] duration-500 ease-out hover:scale-105 hover:border-[#B51B32]/30 hover:text-[#B51B32] motion-reduce:transition-none dark:border-white/12 dark:bg-[#0b0b0c]/82 dark:text-white dark:hover:text-[#d65a68] ${
          heroNavigationVisible ? "pointer-events-none translate-y-5 opacity-0" : "pointer-events-auto translate-y-0 opacity-100"
        }`}
        style={{ bottom: panelOpen ? "4.85rem" : "0.8rem" }}
      >
        {panelOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </button>

      <div
        id="bottom-navigation-dock"
        className={`pointer-events-auto absolute bottom-0 left-1/2 flex w-[min(58rem,100vw)] items-center gap-1.5 overflow-visible rounded-b-none rounded-t-[1.65rem] border border-b-0 border-[#0B1450]/15 bg-white/[0.68] p-1.5 shadow-[0_22px_65px_-28px_rgba(11,20,80,.5),inset_0_1px_0_rgba(255,255,255,.96)] backdrop-blur-3xl backdrop-saturate-150 transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none dark:border-white/10 dark:border-b-0 dark:bg-[#09090a]/86 dark:shadow-[0_22px_65px_-28px_rgba(0,0,0,.92),inset_0_1px_0_rgba(255,255,255,.06)] ${
          dockVisible
            ? "-translate-x-1/2 translate-y-0 opacity-100"
            : "-translate-x-1/2 translate-y-[calc(100%+2rem)] opacity-0"
        }`}
      >
        <div className="relative flex min-w-0 flex-1 items-center justify-around gap-1 overflow-x-auto px-1 sm:gap-2 sm:px-2">
          <span className="pointer-events-none absolute left-7 right-7 top-[1.17rem] h-px bg-gradient-to-r from-transparent via-[#0B1450]/20 to-transparent dark:via-white/15" />

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeHref === item.href;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(event) => navigateToSection(event, item.href)}
                className="group/navitem relative z-10 flex min-w-[2.65rem] flex-col items-center gap-0.5 rounded-xl px-0.5 py-0.5 text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#B51B32] dark:text-slate-300 dark:hover:text-[#d65a68] sm:min-w-[4.35rem] sm:px-1"
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-[0.7rem] border backdrop-blur-xl transition-all duration-300 group-hover/navitem:border-[#B51B32]/35 group-hover/navitem:text-[#B51B32] ${
                    active
                      ? "border-[#2145D6]/55 bg-white/90 text-[#2145D6] shadow-[0_8px_22px_-10px_rgba(33,69,214,.65)] dark:border-white/30 dark:bg-white/10 dark:text-white"
                      : "border-white/75 bg-white/50 text-[#0B1450]/80 shadow-[0_8px_20px_-14px_rgba(11,20,80,.38)] dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-300"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span
                  className={`hidden text-[9px] leading-none sm:block ${
                    active ? "font-extrabold text-[#0B1450] dark:text-white" : "font-semibold"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-all ${
                    active
                      ? "bg-[#7A1020] shadow-[0_0_7px_2px_rgba(122,16,32,.3)]"
                      : "scale-50 bg-transparent"
                  }`}
                />
                <SparkBurst />
              </a>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 border-l border-[#0B1450]/10 pl-1.5 dark:border-white/10">
          <div className="hidden rounded-xl border border-[#0B1450]/10 bg-white/35 p-0.5 dark:border-white/10 dark:bg-white/[0.035] sm:block">
            <ThemeToggle />
          </div>

          <Button
            asChild
            className="group/navitem relative h-10 w-auto min-w-[5.5rem] overflow-visible rounded-xl bg-gradient-to-r from-[#0B1450] via-[#14246e] to-[#3629b7] px-3 py-1 text-xs font-bold text-white shadow-[0_12px_24px_-12px_rgba(33,69,214,.72)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#7A1020] hover:via-[#A0162B] hover:to-[#B51B32] hover:shadow-[0_12px_26px_-10px_rgba(181,27,50,.58)] dark:from-[#242426] dark:via-[#181819] dark:to-[#741827] sm:min-w-[6.75rem] sm:px-4"
          >
            <a
              href="#contact"
              onClick={(event) => navigateToSection(event, "#contact")}
              className="flex flex-row items-center justify-center gap-2 whitespace-nowrap leading-none"
            >
              <span>Let&apos;s Talk</span>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <SparkBurst />
            </a>
          </Button>
        </div>

        <span className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B51B32]/60 to-transparent" />
      </div>
    </nav>
  );
}
