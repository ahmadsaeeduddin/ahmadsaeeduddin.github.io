"use client";

import { useEffect, useRef } from "react";
import { MoveHorizontal } from "lucide-react";
import { skillGroups } from "./skillsData";

const CARD_WIDTH = 232;
const CARD_HEIGHT = 300;
const SPACING = 2.8;
const TILT = -6;
const PERSPECTIVE = 1500;
const AUTO_SPEED = 4.2;

function CarouselCard({ group, index, back = false }) {
  const Icon = group.icon;
  const isRed = group.tone === "red";

  return (
    <article
      aria-hidden={back || undefined}
      className={`absolute inset-0 overflow-hidden rounded-[1.65rem] border bg-white/[0.82] p-5 shadow-[0_24px_55px_-24px_rgba(11,20,80,.55),inset_0_1px_0_rgba(255,255,255,.98)] backdrop-blur-2xl dark:bg-[#0b0b0d]/[0.9] dark:shadow-[0_24px_55px_-24px_rgba(0,0,0,.92),inset_0_1px_0_rgba(255,255,255,.08)] ${
        isRed ? "border-[#B51B32]/40" : "border-[#2145D6]/40 dark:border-white/25"
      }`}
      style={{ backfaceVisibility: "hidden" }}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent ${
          isRed ? "via-[#B51B32]" : "via-[#2145D6] dark:via-white"
        } to-transparent`}
      />
      <span
        aria-hidden="true"
        className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl ${
          isRed ? "bg-[#B51B32]/15" : "bg-[#2145D6]/15 dark:bg-white/[0.06]"
        }`}
      />

      <div className="relative flex items-start justify-between">
        <span
          className={`grid h-14 w-14 place-items-center rounded-2xl border bg-white/80 shadow-[0_12px_30px_-20px_rgba(11,20,80,.7)] dark:bg-white/[0.07] ${
            isRed
              ? "border-[#B51B32]/30 text-[#B51B32]"
              : "border-[#2145D6]/30 text-[#2145D6] dark:border-white/20 dark:text-white"
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="font-mono text-[9px] font-black tracking-[0.18em] text-[#0B1450]/35 dark:text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative mt-5 text-xl font-black leading-[1.05] tracking-[-0.045em] text-[#080d35] dark:text-white">
        {group.title}
      </h3>
      <p className="relative mt-2 min-h-10 text-xs leading-5 text-slate-500 dark:text-slate-400">
        {group.description}
      </p>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className={`rounded-full border px-2.5 py-1 text-[9px] font-bold ${
              isRed
                ? "border-[#B51B32]/10 bg-[#B51B32]/[0.06] text-[#7A1020] dark:text-[#ef9aa3]"
                : "border-[#2145D6]/10 bg-[#2145D6]/[0.06] text-[#263b9f] dark:border-white/10 dark:bg-white/[0.06] dark:text-white/75"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function MobileSkillsCarousel() {
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const animationRef = useRef(0);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const visibleRef = useRef(true);
  const reducedMotionRef = useRef(false);
  const dragRef = useRef({ active: false, x: 0 });

  const count = skillGroups.length;
  const angle = 360 / count;
  const factor = 1 + SPACING * 0.15;
  const radius = (CARD_WIDTH * factor) / (2 * Math.tan(Math.PI / count));

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = reducedMotion.matches;
    };
    updateMotionPreference();
    reducedMotion.addEventListener("change", updateMotionPreference);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        lastTimeRef.current = 0;
      },
      { threshold: 0.05 }
    );
    observer.observe(stage);

    const applyRotation = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotationRef.current}deg)`;
    };

    const draw = (now) => {
      const elapsed = lastTimeRef.current
        ? Math.min((now - lastTimeRef.current) / 1000, 0.1)
        : 0;
      lastTimeRef.current = now;

      if (visibleRef.current && !dragRef.current.active) {
        if (Math.abs(velocityRef.current) > 0.02) {
          rotationRef.current += velocityRef.current * elapsed;
          velocityRef.current *= Math.pow(0.94, elapsed * 60);
        } else if (!reducedMotionRef.current) {
          rotationRef.current += AUTO_SPEED * elapsed;
        }
        applyRotation();
      }

      animationRef.current = window.requestAnimationFrame(draw);
    };

    applyRotation();
    animationRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      reducedMotion.removeEventListener("change", updateMotionPreference);
    };
  }, [radius]);

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    event.currentTarget.style.cursor = "grabbing";
    dragRef.current = { active: true, x: event.clientX };
    velocityRef.current = 0;
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.active) return;
    const movement = event.clientX - dragRef.current.x;
    dragRef.current.x = event.clientX;
    rotationRef.current += movement * 0.62;
    velocityRef.current = movement * 24;
  };

  const handlePointerUp = (event) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    event.currentTarget.style.cursor = "grab";
    dragRef.current.active = false;
  };

  return (
    <div className="relative mt-7 md:hidden">
      <div
        ref={stageRef}
        className="relative h-[27rem] w-full cursor-grab touch-pan-y select-none overflow-hidden [perspective:1500px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]" style={{ transform: `translate(-50%, -50%) rotateX(${TILT}deg)` }}>
          <div
            ref={ringRef}
            className="relative [transform-style:preserve-3d] will-change-transform"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          >
            {skillGroups.map((group, index) => (
              <div
                key={group.id}
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{ transform: `rotateY(${index * angle}deg) translateZ(${radius}px)` }}
              >
                <CarouselCard group={group} index={index} />
                <div className="absolute inset-0" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
                  <CarouselCard group={group} index={index} back />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#F5F6FC] to-transparent dark:from-[#080809]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#F5F6FC] to-transparent dark:from-[#080809]" />
      </div>

      <div className="-mt-3 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#0B1450]/50 dark:text-white/45">
        <MoveHorizontal className="h-4 w-4" aria-hidden="true" />
        Drag to explore
      </div>
    </div>
  );
}
