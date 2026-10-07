"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Folder,
  GraduationCap,
  Home,
  Layers3,
  Menu,
  MessageCircle,
  UserRound,
  X,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import SpiderMenuAnimation from "./navigation/SpiderMenuAnimation";

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
  const [compactMenuOpen, setCompactMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [heroNavigationVisible, setHeroNavigationVisible] = useState(true);
  const compactMenuButtonRef = useRef(null);
  const compactMenuPanelRef = useRef(null);

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
      const heroIsActive =
        bounds.bottom > window.innerHeight * 0.08 &&
        bounds.top < window.innerHeight * 0.45;
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
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setCompactMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (heroNavigationVisible && window.innerWidth >= 1024) {
      setCompactMenuOpen(false);
    }
  }, [heroNavigationVisible]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("spider-menu-toggle", {
        detail: { open: compactMenuOpen },
      })
    );
  }, [compactMenuOpen]);

  const navigateToSection = (event, href) => {
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const targetTop = target.getBoundingClientRect().top + window.scrollY - 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.history.pushState(null, "", href);
    setActiveHref(href);
    setCompactMenuOpen(false);
    window.scrollTo({ top: Math.max(0, targetTop), behavior: reducedMotion ? "auto" : "smooth" });
  };

  const activeItem = navItems.find((item) => item.href === activeHref) ?? navItems[0];
  const ActiveIcon = activeItem.icon;

  return (
    <nav
      data-site-navbar
      aria-label="Primary navigation"
      className="pointer-events-none fixed inset-0 z-50"
    >
      <div
        className={`pointer-events-auto absolute right-3 top-3 z-40 transition-[transform,opacity] duration-500 ease-out ${
          heroNavigationVisible
            ? "lg:pointer-events-none lg:-translate-y-5 lg:opacity-0"
            : "lg:translate-y-0 lg:opacity-100"
        }`}
      >
        {compactMenuOpen ? (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-[-1] cursor-default bg-[#0B1450]/[0.08] backdrop-blur-[2px] dark:bg-black/25"
            onClick={() => setCompactMenuOpen(false)}
          />
        ) : null}

        <button
          ref={compactMenuButtonRef}
          type="button"
          aria-expanded={compactMenuOpen}
          aria-controls="mobile-navigation-panel"
          onClick={() => setCompactMenuOpen((open) => !open)}
          className={`group relative flex h-12 items-center overflow-hidden rounded-full border bg-white/[0.82] p-1.5 text-[#0B1450] shadow-[0_16px_45px_-18px_rgba(11,20,80,.62),inset_0_1px_0_rgba(255,255,255,.98)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 dark:bg-[#0b0b0d]/90 dark:text-white dark:shadow-[0_16px_45px_-18px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.09)] ${
            compactMenuOpen
              ? "w-12 border-[#B51B32]/35"
              : "w-[9.6rem] border-[#2145D6]/25"
          }`}
        >
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2145D6]/[0.08] via-transparent to-[#B51B32]/[0.08]" />
          <span
            className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white shadow-[0_8px_20px_-8px_rgba(33,69,214,.72)] transition-all duration-300 ${
              compactMenuOpen
                ? "from-[#7A1020] to-[#B51B32]"
                : "from-[#0B1450] to-[#2145D6]"
            }`}
          >
            {compactMenuOpen ? (
              <X className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
            ) : (
              <ActiveIcon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
            )}
          </span>
          <span
            className={`relative ml-2 min-w-0 flex-1 text-left transition-all duration-200 ${
              compactMenuOpen ? "pointer-events-none -translate-x-2 opacity-0" : "opacity-100"
            }`}
          >
            <span className="block truncate text-[8px] font-black uppercase tracking-[0.22em] text-[#7A1020] dark:text-[#ef7b88]">
              Navigate
            </span>
            <span className="block truncate text-xs font-extrabold tracking-[-0.01em]">
              {activeItem.name}
            </span>
          </span>
          <Menu
            className={`relative mr-2 h-4 w-4 shrink-0 transition-all duration-200 ${
              compactMenuOpen ? "scale-50 opacity-0" : "opacity-100"
            }`}
            aria-hidden="true"
          />
        </button>

        <div
          ref={compactMenuPanelRef}
          id="mobile-navigation-panel"
          className={`absolute right-0 top-14 max-h-[calc(100svh-5rem)] w-[min(20rem,calc(100vw-3.5rem))] origin-top-right overflow-y-auto rounded-[1.8rem] bg-gradient-to-br from-[#2145D6]/45 via-white/80 to-[#B51B32]/45 p-px shadow-[0_30px_80px_-26px_rgba(11,20,80,.72)] transition-[transform,opacity,visibility] duration-300 ease-out dark:via-white/15 dark:shadow-[0_30px_80px_-24px_rgba(0,0,0,.95)] ${
            compactMenuOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-3 scale-[0.96] opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-[calc(1.8rem-1px)] bg-white/[0.9] p-4 backdrop-blur-3xl dark:bg-[#0b0b0d]/95">
            <svg
              aria-hidden="true"
              viewBox="0 0 360 210"
              className="pointer-events-none absolute inset-x-0 top-0 h-52 w-full opacity-[0.16] dark:opacity-[0.12]"
              fill="none"
            >
              <path d="M370 5C276 20 245 67 228 143C211 202 134 195 78 226" stroke="#2145D6" />
              <path d="M350 -8C315 57 277 88 196 94C116 100 92 150 62 218" stroke="#B51B32" />
              <path d="M363 51C294 74 260 118 274 200" stroke="#0B1450" strokeDasharray="4 7" />
              <circle cx="228" cy="143" r="3" fill="#2145D6" />
              <circle cx="196" cy="94" r="3" fill="#B51B32" />
              <circle cx="274" cy="199" r="2.5" fill="#0B1450" />
            </svg>

            <div className="relative flex items-center justify-between border-b border-[#0B1450]/10 pb-3 dark:border-white/10">
              <a
                href="#home"
                onClick={(event) => navigateToSection(event, "#home")}
                className="flex items-center gap-2"
              >
                <OrbitMark />
                <span>
                  <span className="block text-sm font-black uppercase tracking-[0.26em] text-[#0B1450] dark:text-white">
                    <span className="text-[#B51B32]">.</span>
                  </span>
                  <span className="block text-[8px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    AI Engineer
                  </span>
                </span>
              </a>
              <ThemeToggle />
            </div>

            <div className="relative mt-3 grid gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeHref === item.href;

                return (
                  <a
                    key={`mobile-${item.name}`}
                    href={item.href}
                    onClick={(event) => navigateToSection(event, item.href)}
                    className={`group flex items-center gap-3 rounded-2xl border px-3 py-2 transition-all duration-200 ${
                      active
                        ? "border-[#2145D6]/20 bg-gradient-to-r from-[#2145D6]/10 to-[#B51B32]/[0.06] text-[#0B1450] shadow-[0_10px_24px_-20px_rgba(33,69,214,.7)] dark:border-white/12 dark:text-white"
                        : "border-transparent text-slate-500 hover:border-[#B51B32]/15 hover:bg-white/70 hover:text-[#B51B32] dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-[#ef7b88]"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors ${
                        active
                          ? "border-[#2145D6]/25 bg-white text-[#2145D6] dark:border-white/15 dark:bg-white/10 dark:text-white"
                          : "border-[#0B1450]/10 bg-white/60 text-[#0B1450]/75 dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-sm font-bold">{item.name}</span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        active
                          ? "bg-[#B51B32] shadow-[0_0_8px_2px_rgba(181,27,50,.3)]"
                          : "scale-50 bg-[#2145D6]/30 group-hover:scale-100 group-hover:bg-[#B51B32]"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            <a
              href="#contact"
              onClick={(event) => navigateToSection(event, "#contact")}
              className="relative mt-3 flex h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B1450] via-[#2145D6] to-[#7A1020] text-sm font-extrabold text-white shadow-[0_14px_28px_-14px_rgba(33,69,214,.8)]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <SpiderMenuAnimation
        active={compactMenuOpen}
        anchorRef={compactMenuButtonRef}
        targetRef={compactMenuPanelRef}
      />

      <div
        data-main-navbar
        className={`pointer-events-auto absolute left-1/2 top-3 hidden w-[min(80rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center justify-between rounded-[1.7rem] border border-[#0B1450]/15 bg-white/[0.68] px-4 py-2 shadow-[0_18px_58px_-30px_rgba(11,20,80,.46),inset_0_1px_0_rgba(255,255,255,.96)] backdrop-blur-3xl backdrop-saturate-150 transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none dark:border-white/10 dark:bg-[#09090a]/82 dark:shadow-[0_18px_58px_-30px_rgba(0,0,0,.92),inset_0_1px_0_rgba(255,255,255,.06)] sm:px-6 lg:flex ${
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
            <span className="text-[#7A1020]">.</span>
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

    </nav>
  );
}
