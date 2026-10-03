function NameWebGrips() {
  return (
    <svg
      aria-hidden="true"
      className="absolute z-10 overflow-visible"
      style={{ left: "-7%", top: "-22%", width: "114%", height: "144%" }}
      viewBox="0 0 1000 260"
      preserveAspectRatio="none"
      fill="none"
    >
      <g className="text-[#0B1450] dark:text-white" stroke="currentColor" strokeWidth="1" opacity="0.76">
        <path d="M -35 42 C 54 54, 92 92, 184 116 S 270 128, 338 142" />
        <path d="M -24 224 C 62 202, 120 171, 194 158 S 270 150, 338 142" />
        <path d="M 92 -18 C 134 24, 150 69, 184 116 Q 139 132 92 168" />
        <path d="M 218 -14 Q 246 54 278 88 T 338 142" />
        <path d="M 184 116 Q 232 104 278 88 Q 292 123 338 142" />
      </g>
      <g className="text-[#7A1020] dark:text-white" stroke="currentColor" strokeWidth="1" opacity="0.76">
        <path d="M 1035 42 C 946 54, 908 92, 816 116 S 730 128, 662 142" />
        <path d="M 1024 224 C 938 202, 880 171, 806 158 S 730 150, 662 142" />
        <path d="M 908 -18 C 866 24, 850 69, 816 116 Q 861 132 908 168" />
        <path d="M 782 -14 Q 754 54 722 88 T 662 142" />
        <path d="M 816 116 Q 768 104 722 88 Q 708 123 662 142" />
      </g>
      <g>
        {[
          [184, 116, "#0B1450", 3.4], [278, 88, "#2145D6", 2.2], [338, 142, "#0B1450", 2.8],
          [816, 116, "#7A1020", 3.4], [722, 88, "#B51B32", 2.2], [662, 142, "#7A1020", 2.8],
        ].map(([cx, cy, color, radius]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={radius * 2.7} fill={color} className="dark:fill-white" opacity="0.12" />
            <circle cx={cx} cy={cy} r={radius} fill={color} className="dark:fill-white" opacity="0.88" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function HeroName() {
  return (
    <div
      data-hero-name
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[13%] z-10 flex justify-center overflow-visible sm:top-[12%] lg:top-[13%]"
    >
      <span className="relative grid select-none [--name-blue:#0B1450] [--name-mid:#2145D6] [--name-pink:#B51B32] [--name-red:#7A1020] dark:[--name-blue:#F5F5F4] dark:[--name-mid:#E7E5E4] dark:[--name-pink:#C7C4C1] dark:[--name-red:#8F2433]">
        <span
          className="col-start-1 row-start-1 bg-clip-text text-[clamp(5.00rem,16vw,15.2rem)] font-black uppercase leading-[0.82] tracking-[-0.085em] text-transparent dark:drop-shadow-[0_0_24px_rgba(255,255,255,0.07)]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--name-blue) 0%, var(--name-blue) 34%, var(--name-mid) 48%, var(--name-pink) 64%, var(--name-red) 100%)",
          }}
        >
          Saeed
        </span>
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 bg-clip-text text-[clamp(5.25rem,18vw,15.5rem)] font-black uppercase leading-[0.82] tracking-[-0.085em] text-transparent opacity-45 mix-blend-overlay dark:opacity-35 dark:mix-blend-screen"
          style={{
            backgroundImage:
              "linear-gradient(132deg, transparent 0 17%, rgba(255,255,255,.85) 17.5% 18.2%, rgba(11,20,80,.28) 18.7% 27%, transparent 27.5%), linear-gradient(48deg, transparent 0 39%, rgba(255,255,255,.7) 39.5% 40.2%, rgba(11,20,80,.2) 40.7% 49%, transparent 49.5%), linear-gradient(118deg, transparent 0 62%, rgba(255,255,255,.72) 62.5% 63.2%, rgba(11,20,80,.24) 63.7% 72%, transparent 72.5%), linear-gradient(42deg, transparent 0 81%, rgba(255,255,255,.7) 81.5% 82.1%, rgba(11,20,80,.2) 82.6% 90%, transparent 90.5%)",
          }}
        >
          Saeed
        </span>
        <NameWebGrips />
      </span>
    </div>
  );
}
