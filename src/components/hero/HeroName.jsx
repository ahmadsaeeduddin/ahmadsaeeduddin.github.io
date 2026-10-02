export function HeroName() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[13%] z-10 flex justify-center overflow-hidden sm:top-[12%] lg:top-[13%]"
    >
      <span className="select-none bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500 bg-clip-text text-[clamp(5.25rem,18vw,15.5rem)] font-black uppercase leading-[0.82] tracking-[-0.085em] text-transparent opacity-90">
        Saeed
      </span>
    </div>
  );
}
