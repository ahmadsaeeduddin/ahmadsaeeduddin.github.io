import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroContent() {
  return (
    <div className="absolute inset-x-4 bottom-[4.5rem] z-40 mx-auto max-w-2xl text-center sm:bottom-[4.75rem] lg:bottom-[5rem]">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.34em] text-blue-700 sm:text-xs">
        AI Engineer
      </p>
      <h1 className="text-balance text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl lg:text-[2.15rem]">
        Building intelligent systems that move ideas forward.
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-pretty text-xs leading-relaxed text-slate-600 sm:text-sm">
        I design practical AI products, agentic workflows, and computer-vision experiences that turn ambitious problems into useful software.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Button
          asChild
          className="h-10 rounded-full bg-slate-950 px-5 text-sm text-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.65)] hover:bg-slate-800"
        >
          <a href="#projects">View My Work</a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-10 rounded-full border-slate-300 bg-white/60 px-5 text-sm text-slate-900 backdrop-blur hover:bg-white"
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
