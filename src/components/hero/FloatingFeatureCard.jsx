import { cn } from "@/lib/utils";

export function FloatingFeatureCard({ icon: Icon, title, detail, className }) {
  return (
    <article
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-3.5 py-3 shadow-[0_18px_50px_-28px_rgba(30,64,175,0.45)] backdrop-blur-xl sm:px-4",
        className
      )}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 text-blue-700 ring-1 ring-blue-200/70">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-[13px] font-semibold tracking-[-0.01em] text-slate-900 sm:text-sm">
          {title}
        </span>
        <span className="hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
          {detail}
        </span>
      </span>
    </article>
  );
}
