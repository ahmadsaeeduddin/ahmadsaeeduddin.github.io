"use client";

import { useEffect, useRef } from "react";

const SWING_START = -74;
const SWING_END = -28;
const HANG_LENGTH = 78;
const SHOT_DURATION = 240;
const SWING_DURATION = 680;
const DOCK_DURATION = 300;
const EXIT_DURATION = 520;
const TO_RADIANS = Math.PI / 180;

const mix = (from, to, progress) => from + (to - from) * progress;
const easeInOut = (progress) => -(Math.cos(Math.PI * progress) - 1) / 2;

export default function SpiderMenuAnimation({ active, anchorRef, targetRef }) {
  const characterRef = useRef(null);
  const bubbleRef = useRef(null);
  const glowRef = useRef(null);
  const strandRefs = useRef([]);
  const knotRef = useRef(null);
  const animationRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const motionRef = useRef({
    mode: "away",
    startedAt: 0,
    attachedAt: 0,
    startLength: 220,
    last: { x: -160, y: 0, angle: 0 },
    exit: null,
  });

  useEffect(() => {
    const character = characterRef.current;
    const glow = glowRef.current;
    const knot = knotRef.current;
    if (!character || !glow || !knot) return undefined;

    const getAnchor = () => {
      const button = anchorRef.current;
      if (!button) return { x: window.innerWidth - 36, y: 60 };
      const bounds = button.getBoundingClientRect();
      return {
        x: bounds.left + bounds.width / 2,
        y: bounds.bottom - 3,
      };
    };

    const getDockPoint = () => {
      const panel = targetRef.current;
      if (!panel) {
        const anchor = getAnchor();
        return { x: anchor.x - 48, y: anchor.y + 94 };
      }
      const bounds = panel.getBoundingClientRect();
      return {
        x: bounds.left - 45,
        y: bounds.top + Math.min(128, bounds.height * 0.3),
      };
    };

    const hideThread = () => {
      glow.style.opacity = "0";
      strandRefs.current.forEach((strand) => {
        if (strand) strand.style.opacity = "0";
      });
      knot.style.opacity = "0";
    };

    const drawThread = (anchorX, anchorY, handX, handY, vibration = 0) => {
      const deltaX = handX - anchorX;
      const deltaY = handY - anchorY;
      const length = Math.hypot(deltaX, deltaY) || 1;
      const normalX = -deltaY / length;
      const normalY = deltaX / length;
      const controlX = (anchorX + handX) / 2 + normalX * vibration;
      const controlY = (anchorY + handY) / 2 + normalY * vibration + length * 0.018;
      const path = (offset) =>
        `M${anchorX} ${anchorY} Q${controlX + normalX * offset} ${controlY + normalY * offset} ${handX} ${handY}`;

      glow.setAttribute("d", path(0));
      glow.style.opacity = "1";
      [-2.2, 0, 2.2].forEach((offset, index) => {
        const strand = strandRefs.current[index];
        if (!strand) return;
        strand.setAttribute("d", path(offset));
        strand.style.opacity = "0.86";
      });
      knot.setAttribute("transform", `translate(${anchorX} ${anchorY})`);
      knot.style.opacity = "1";
    };

    const hangingPoint = (anchor, angle, length) => ({
      x: anchor.x + length * Math.sin(angle * TO_RADIANS),
      y: anchor.y + length * Math.cos(angle * TO_RADIANS),
    });

    const draw = (now) => {
      const motion = motionRef.current;
      const anchor = getAnchor();
      const dock = getDockPoint();
      let { x, y, angle } = motion.last;

      if (motion.mode === "incoming") {
        const elapsed = now - motion.startedAt;
        const start = hangingPoint(anchor, SWING_START, motion.startLength);

        if (elapsed < SHOT_DURATION) {
          const progress = 1 - Math.pow(1 - elapsed / SHOT_DURATION, 3);
          x = start.x;
          y = start.y;
          angle = 88;
          drawThread(
            mix(start.x, anchor.x, progress),
            mix(start.y, anchor.y, progress),
            start.x,
            start.y
          );
        } else if (elapsed < SHOT_DURATION + SWING_DURATION) {
          const progress = easeInOut((elapsed - SHOT_DURATION) / SWING_DURATION);
          const swingAngle = mix(SWING_START, SWING_END, progress);
          const length =
            HANG_LENGTH +
            (motion.startLength - HANG_LENGTH) * Math.pow(1 - progress, 2.15);
          const point = hangingPoint(anchor, swingAngle, length);
          x = point.x;
          y = point.y;
          angle = 18 - swingAngle * 0.72;
          drawThread(anchor.x, anchor.y, x, y);
        } else if (elapsed < SHOT_DURATION + SWING_DURATION + DOCK_DURATION) {
          const progress = easeInOut(
            (elapsed - SHOT_DURATION - SWING_DURATION) / DOCK_DURATION
          );
          const swingEnd = hangingPoint(anchor, SWING_END, HANG_LENGTH);
          x = mix(swingEnd.x, dock.x, progress);
          y =
            mix(swingEnd.y, dock.y, progress) -
            34 * 4 * progress * (1 - progress);
          angle = mix(18 - SWING_END * 0.72, -7, progress);
          drawThread(anchor.x, anchor.y, x, y, Math.sin(progress * Math.PI) * 4);
        } else {
          motion.mode = "attached";
          motion.attachedAt = now;
        }
      }

      if (motion.mode === "attached") {
        x = dock.x;
        y = dock.y;
        angle = -7;
        hideThread();
        knot.setAttribute("transform", `translate(${dock.x + 49} ${dock.y + 33})`);
        knot.style.opacity = "0.72";
      } else if (motion.mode === "outgoing" && motion.exit) {
        const elapsed = now - motion.startedAt;
        const progress = Math.min(1, elapsed / EXIT_DURATION);
        const exit = motion.exit;
        x = mix(exit.x, -150, progress);
        y = mix(exit.y, Math.max(-100, exit.y - 170), progress) - 90 * 4 * progress * (1 - progress);
        angle = exit.angle - 300 * progress;

        if (progress < 0.36) {
          drawThread(anchor.x, anchor.y, x, y, Math.sin(elapsed * 0.08) * (1 - progress) * 7);
          knot.style.opacity = String(1 - progress / 0.36);
        } else {
          hideThread();
        }

        if (progress >= 1) {
          motion.mode = "away";
          x = -160;
          y = 0;
        }
      } else if (motion.mode === "away") {
        hideThread();
        x = -160;
        y = 0;
      }

      motion.last = { x, y, angle };
      character.style.transform = `translate3d(${x - 10}px, ${y - 13}px, 0) rotate(${angle}deg)`;
      animationRef.current = window.requestAnimationFrame(draw);
    };

    animationRef.current = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(animationRef.current);
  }, [anchorRef, targetRef]);

  useEffect(() => {
    const motion = motionRef.current;
    const button = anchorRef.current;
    if (!button) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = reducedMotion;
    const now = performance.now();
    const bounds = button.getBoundingClientRect();
    const anchorX = bounds.left + bounds.width / 2;
    const anchorY = bounds.bottom - 3;

    if (active) {
      const startLength = Math.max(
        210,
        (anchorX + 90) / Math.sin(Math.abs(SWING_START) * TO_RADIANS)
      );
      motion.startLength = startLength;
      motion.startedAt = now;
      motion.attachedAt = now;
      motion.mode = reducedMotion ? "attached" : "incoming";

      if (!reducedMotion && bubbleRef.current) {
        const startY = anchorY + startLength * Math.cos(SWING_START * TO_RADIANS);
        bubbleRef.current.animate(
          [
            { transform: "scale(0) rotate(-5deg)", opacity: 0 },
            { transform: "scale(1.12) rotate(-5deg)", opacity: 1, offset: 0.35 },
            { transform: "scale(1) rotate(-5deg)", opacity: 1, offset: 0.72 },
            { transform: "scale(0) rotate(-5deg)", opacity: 0 },
          ],
          { duration: 850 }
        );
        bubbleRef.current.style.left = "10px";
        bubbleRef.current.style.top = `${Math.max(72, startY - 30)}px`;
      }
    } else if (motion.mode !== "away") {
      motion.exit = { ...motion.last };
      motion.startedAt = now;
      motion.mode = reducedMotion ? "away" : "outgoing";
    }
  }, [active, anchorRef, targetRef]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[55] overflow-hidden">
      <svg className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <path
          ref={glowRef}
          className="stroke-[#7d89b8]/20 dark:stroke-white/10"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {[0, 1, 2].map((index) => (
          <path
            key={index}
            ref={(node) => {
              strandRefs.current[index] = node;
            }}
            className="stroke-[#4b547f] dark:stroke-white/70"
            strokeWidth={index === 1 ? 1.25 : 0.75}
            strokeLinecap="round"
          />
        ))}
        <g ref={knotRef} opacity="0" className="stroke-[#4b547f] dark:stroke-white/70">
          <circle r="7" fill="none" strokeWidth="0.7" />
          <circle r="3.5" fill="none" strokeWidth="0.7" />
          {[0, 45, 90, 135].map((angle) => (
            <path key={angle} d="M-10 0H10" transform={`rotate(${angle})`} strokeWidth="0.7" />
          ))}
        </g>
      </svg>

      <span
        ref={bubbleRef}
        className="fixed left-0 top-0 border-2 border-[#05060f] bg-white px-2 py-1 font-black text-[10px] tracking-[0.08em] text-[#05060f] opacity-0 shadow-[3px_3px_0_#B51B32]"
      >
        THWIP!
      </span>

      <div
        ref={characterRef}
        className="fixed left-0 top-0 h-[84px] w-[70px] origin-[10px_13px] will-change-transform drop-shadow-[3px_5px_2px_rgba(5,6,15,.2)]"
        style={{ transform: "translate3d(-160px, 0, 0)" }}
      >
        <svg viewBox="0 0 100 120" className="h-full w-full overflow-visible" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="menu-spider-red" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ff4a4f" />
              <stop offset="0.6" stopColor="#E5202F" />
              <stop offset="1" stopColor="#7A1020" />
            </linearGradient>
            <linearGradient id="menu-spider-blue" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--spider-blue-light)" />
              <stop offset="0.6" stopColor="var(--spider-blue-mid)" />
              <stop offset="1" stopColor="var(--spider-blue-dark)" />
            </linearGradient>
          </defs>

          <g fill="none">
            <path d="M39 43 27 34 15 22" stroke="#080b1d" strokeWidth="12" />
            <path d="M39 43 27 34 15 22" stroke="url(#menu-spider-red)" strokeWidth="9" />
            <path d="M61 43 75 53 83 66" stroke="#080b1d" strokeWidth="12" />
            <path d="M61 43 75 53 83 66" stroke="url(#menu-spider-red)" strokeWidth="9" />
            <path d="M44 73 36 91 24 104" stroke="#080b1d" strokeWidth="13" />
            <path d="M44 73 36 91 24 104" stroke="url(#menu-spider-blue)" strokeWidth="10" />
            <path d="M56 73 69 84 79 103" stroke="#080b1d" strokeWidth="13" />
            <path d="M56 73 69 84 79 103" stroke="url(#menu-spider-blue)" strokeWidth="10" />
          </g>

          <ellipse cx="21" cy="105" rx="8" ry="5.5" fill="url(#menu-spider-red)" stroke="#080b1d" strokeWidth="1.5" transform="rotate(-20 21 105)" />
          <ellipse cx="81" cy="105" rx="8" ry="5.5" fill="url(#menu-spider-red)" stroke="#080b1d" strokeWidth="1.5" transform="rotate(20 81 105)" />
          <circle cx="85" cy="68" r="5.5" fill="url(#menu-spider-red)" stroke="#080b1d" strokeWidth="1.5" />
          <circle cx="14" cy="20" r="5.6" fill="url(#menu-spider-red)" stroke="#080b1d" strokeWidth="1.5" />
          <path d="M30 40Q50 33 70 40L61 81Q50 86 39 81Z" fill="url(#menu-spider-red)" stroke="#080b1d" strokeWidth="1.5" />
          <path d="M30 40 40 39 44 81 38 79Z" fill="url(#menu-spider-blue)" opacity="0.95" />
          <path d="M70 40 60 39 56 81 62 79Z" fill="url(#menu-spider-blue)" opacity="0.95" />
          <ellipse cx="50" cy="24" rx="13" ry="15.5" fill="url(#menu-spider-red)" stroke="#080b1d" strokeWidth="1.6" />

          <g fill="none" stroke="#35070c" strokeWidth="0.75" opacity="0.62">
            <path d="M50 8V40M36 13Q50 19 64 13M35 31Q50 37 65 31M38 11 50 24 62 11M50 24 38 36M50 24 62 36" />
            <path d="M50 38V82M50 42 37 79M50 42 63 79M31 48Q50 56 69 48M34 61Q50 68 66 61M37 72Q50 79 63 72" />
          </g>
          <g fill="#f7f8ff" stroke="#080b1d" strokeWidth="1.4">
            <path d="M36.5 19.5Q44 17.5 49 24Q42.5 27.5 36.5 22Z" />
            <path d="M63.5 19.5Q56 17.5 51 24Q57.5 27.5 63.5 22Z" />
          </g>
          <g fill="#080b1d" stroke="#080b1d" strokeWidth="1.2">
            <ellipse cx="50" cy="57" rx="2.5" ry="4" />
            <circle cx="50" cy="52" r="1.8" />
            <path fill="none" d="m48 54-8-5m8 7-9 0m9 2-8 5m12-9 8-5m-8 7h9m-9 2 8 5" />
          </g>
        </svg>
      </div>
    </div>
  );
}
