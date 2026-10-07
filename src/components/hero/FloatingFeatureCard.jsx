import { cn } from "@/lib/utils";

const calloutLayouts = {
  "top-left": {
    container: "bottom-[calc(100%-0.55rem)] right-[calc(100%-1rem)]",
    label: "left-0 top-0 text-left",
    path: "M 6 13 C 39 13 34 43 79 43 L 136 54",
  },
  "top-right": {
    container: "bottom-[calc(100%-0.55rem)] left-[calc(100%-1rem)]",
    label: "right-0 top-0 text-right",
    path: "M 138 13 C 105 13 110 43 65 43 L 8 54",
  },
  "bottom-left": {
    container: "right-[calc(100%-1rem)] top-[calc(100%-0.55rem)]",
    label: "bottom-0 left-0 text-left",
    path: "M 6 51 C 39 51 34 21 79 21 L 136 8",
  },
  "bottom-right": {
    container: "left-[calc(100%-1rem)] top-[calc(100%-0.55rem)]",
    label: "bottom-0 right-0 text-right",
    path: "M 138 51 C 105 51 110 21 65 21 L 8 8",
  },
};

function FeatureCallout({ text, motion }) {
  const layout = calloutLayouts[motion];
  const isLeft = motion.includes("left");
  const markerId = `callout-arrow-${motion}`;

  return (
    <div
      className={cn(
        "pointer-events-none absolute hidden h-16 w-36 text-[#0B1450] dark:text-white/65 xl:block",
        !isLeft && "text-[#7A1020] dark:text-white/65",
        layout.container
      )}
    >
      <span
        className={cn(
          "absolute whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.17em] text-slate-500 dark:text-slate-300",
          layout.label
        )}
      >
        {text}
      </span>
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 144 64" fill="none">
        <defs>
          <marker id={markerId} markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
            <path d="M 0 0 L 7 3.5 L 0 7 Z" fill="currentColor" />
          </marker>
        </defs>
        <path
          d={layout.path}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          markerEnd={`url(#${markerId})`}
          opacity="0.75"
        />
        <circle cx={isLeft ? 6 : 138} cy={motion.includes("top") ? 13 : 51} r="2.4" fill="currentColor" />
      </svg>
    </div>
  );
}

export function FloatingFeatureCard({ icon: Icon, title, detail, callout, motion, className }) {
  return (
    <article
      data-hero-card
      data-motion={motion}
      data-web-land={motion === "top-left" ? "hero-card" : undefined}
      className={cn(
        "group/card",
        className
      )}
    >
      {callout && <FeatureCallout text={callout} motion={motion} />}

      <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-3.5 py-3 shadow-[0_18px_50px_-28px_rgba(11,20,80,0.38)] backdrop-blur-xl transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out group-hover/card:-translate-y-1 group-hover/card:border-[#0B1450]/20 group-hover/card:bg-white/90 group-hover/card:shadow-[0_22px_55px_-26px_rgba(11,20,80,0.48)] dark:border-white/12 dark:bg-[#0b0b0c]/72 dark:shadow-[0_18px_55px_-28px_rgba(0,0,0,0.9)] dark:group-hover/card:border-white/25 dark:group-hover/card:bg-[#111112]/90 sm:px-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0B1450]/10 to-[#7A1020]/10 text-[#0B1450] ring-1 ring-[#0B1450]/15 transition-transform duration-300 group-hover/card:scale-105 dark:from-white/[0.08] dark:to-white/[0.04] dark:text-slate-200 dark:ring-white/10">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block whitespace-nowrap text-[13px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white sm:text-sm">
            {title}
          </span>
          <span className="hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-400 sm:block">
            {detail}
          </span>
        </span>
      </div>
    </article>
  );
}
