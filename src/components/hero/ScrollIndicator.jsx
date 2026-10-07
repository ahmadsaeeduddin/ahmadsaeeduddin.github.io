import { ArrowDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <a
      data-scroll-indicator
      href="#about"
      className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:bottom-5 sm:text-[10px]"
      aria-label="Scroll to the About section"
    >
      <span>Scroll to explore</span>
      <span className="grid h-6 w-6 place-items-center rounded-full border border-slate-300 bg-white/60 dark:border-white/20 dark:bg-white/5">
        <ArrowDown className="h-3 w-3" aria-hidden="true" />
      </span>
    </a>
  );
}
