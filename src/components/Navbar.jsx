"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/55 text-slate-900 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between">
          <a
            href="#home"
            className="text-[15px] font-black uppercase tracking-[0.2em] text-slate-950"
            aria-label="Saeed Ahmad, back to top"
          >
            Saeed<span className="text-blue-600">.</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-white/70 hover:text-slate-950"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 text-slate-700 lg:flex">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="rounded-full bg-slate-950 px-4 text-white hover:bg-slate-800"
            >
              <a href="#contact">
                Let&apos;s Talk
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-1 text-slate-700 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="text-slate-800 hover:bg-white/70"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200/70 pb-4 pt-2 lg:hidden">
            {[...navItems, { name: "Contact", href: "#contact" }].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white/80 hover:text-slate-950"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
