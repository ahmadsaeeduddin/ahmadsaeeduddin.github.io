import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroContent() {
  return (
    <div
      data-hero-content
      className="absolute inset-x-4 bottom-[4.5rem] z-40 mx-auto max-w-2xl text-center sm:bottom-[4.75rem] lg:bottom-[5rem]"
    >
      <p
        data-hero-role
        className="mb-2 text-[11px] font-bold uppercase tracking-[0.34em] text-[#0B1450] dark:text-slate-300 sm:text-xs"
      >
        AI Engineer | Software Engineer | Rabbit-Hole Diver
      </p>
      <h1 className="text-balance text-2xl font-semibold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-3xl lg:text-[2.15rem]">
        AI that does things, not just demos.
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-pretty text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
        I swing along AI agents, vision systems, and products that make it out of the notebook/GPT Chats and into the real world.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Button
          asChild
          className="h-10 rounded-full bg-[#0B1450] px-5 text-sm text-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.65)] hover:bg-[#7A1020] dark:bg-[#741827] dark:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] dark:hover:bg-[#8F2433]"
        >
          <a href="#projects">See What I've Built</a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-10 rounded-full border-slate-300 bg-white/60 px-5 text-sm text-slate-900 backdrop-blur hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <a href="#contact">
            Let&apos;s Build Something
            <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
}
