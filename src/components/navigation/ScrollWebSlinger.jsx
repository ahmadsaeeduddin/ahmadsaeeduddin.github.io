"use client";

import { useEffect, useRef } from "react";

const LANDINGS = [
  { selector: '[data-web-land="hero-card"]', edge: "right", dx: -8, incoming: "flip", landing: "squash" },
  { selector: '[data-web-land="about-bio"]', edge: "left", dx: 12, incoming: "swing", landing: "hero", upward: "swing" },
  { selector: '[data-web-land="education-0"]', edge: "right", dx: -18, incoming: "dive", landing: "squash" },
  { selector: '[data-web-land="education-1"]', edge: "left", dx: 18, incoming: "hop", landing: "bounce" },
  { selector: '[data-web-land="skills-setup"]', edge: "right", dx: -8, incoming: "swing", landing: "squash", upward: "swing" },
  { selector: '[data-web-land="experience-card-0"]', edge: "left", dx: 12, incoming: "flip", landing: "roll" },
  { selector: '[data-web-land="experience-venture"]', edge: "right", dx: -16, incoming: "hop", landing: "squash" },
  { selector: '[data-web-land="projects-carousel"]', edge: "right", dx: -18, incoming: "dive", landing: "hero" },
  { selector: '[data-web-land="projects-detail"]', edge: "left", dx: 18, incoming: "swing", landing: "bounce", upward: "swing" },
  { selector: '[data-web-land="contact-card"]', edge: "left", dx: 12, incoming: "flip", landing: "squash" },
  { selector: '[data-web-land="contact-form"]', edge: "right", dx: -16, incoming: "swing", landing: "hero" },
  { selector: '[data-web-land="footer-brand"]', edge: "left", dx: 10, incoming: "hop", landing: "squash" },
];

const TRIGGER_POINT = 0.62;
const TO_RADIANS = Math.PI / 180;
const mix = (from, to, progress) => from + (to - from) * progress;
const ease = (progress) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
const easeOut = (progress) => 1 - Math.pow(1 - progress, 3);

export default function ScrollWebSlinger() {
  const rootRef = useRef(null);
  const characterRef = useRef(null);
  const characterSvgRef = useRef(null);
  const bubbleRef = useRef(null);
  const glowRef = useRef(null);
  const strandRefs = useRef([]);
  const tipRef = useRef(null);
  const knotRef = useRef(null);
  const splatRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const character = characterRef.current;
    const characterSvg = characterSvgRef.current;
    const bubble = bubbleRef.current;
    const glow = glowRef.current;
    const tip = tipRef.current;
    const knot = knotRef.current;
    const splat = splatRef.current;
    if (!root || !character || !characterSvg || !bubble || !glow || !tip || !knot || !splat) {
      return undefined;
    }

    const candidates = LANDINGS.map(({ selector }) =>
      Array.from(document.querySelectorAll(selector))
    );
    const landingElement = (index) =>
      candidates[index]?.find((element) => element.getClientRects().length > 0) ??
      candidates[index]?.[0] ??
      null;

    if (!landingElement(0)) return undefined;

    let splatPath = "";
    const strandCount = 9;
    for (let index = 0; index < strandCount; index += 1) {
      const angle = (index / strandCount) * Math.PI * 2 + 0.2;
      const length = 10 + ((index * 7) % 5) * 1.6;
      splatPath += `M0 0L${Math.cos(angle) * length} ${Math.sin(angle) * length}`;
    }
    [5, 9].forEach((radius) => {
      for (let index = 0; index < strandCount; index += 1) {
        const angle = (index / strandCount) * Math.PI * 2 + 0.2;
        const nextAngle = ((index + 1) / strandCount) * Math.PI * 2 + 0.2;
        const middle = (angle + nextAngle) / 2;
        const distance = radius + (index % 3);
        splatPath += `M${Math.cos(angle) * distance} ${Math.sin(angle) * distance}Q${Math.cos(middle) * distance * 0.78} ${Math.sin(middle) * distance * 0.78} ${Math.cos(nextAngle) * distance} ${Math.sin(nextAngle) * distance}`;
      }
    });
    splat.setAttribute("d", splatPath);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = {
      flip: reducedMotion ? 1 : 720,
      dive: reducedMotion ? 1 : 520,
      hop: reducedMotion ? 1 : 640,
      shot: reducedMotion ? 1 : 260,
      reel: reducedMotion ? 1 : 780,
      shortShot: reducedMotion ? 1 : 220,
      swing: reducedMotion ? 1 : 900,
    };
    let suspended = false;
    let animationFrame = 0;
    let current = 0;
    let position = { x: -180, y: 0 };
    let rotation = 0;
    let flight = null;
    let landingMotion = null;
    let scaleX = 1;
    let scaleY = 1;
    const dustNodes = new Set();

    const getMetrics = () => ({
      width: character.offsetWidth || 80,
      height: character.offsetHeight || 96,
    });

    const setKnot = (opacity, x, y) => {
      knot.style.opacity = String(opacity);
      knot.setAttribute("transform", `translate(${x} ${y})`);
    };

    const hideThread = () => {
      glow.style.opacity = "0";
      strandRefs.current.forEach((strand) => {
        if (strand) strand.style.opacity = "0";
      });
      tip.style.opacity = "0";
      knot.style.opacity = "0";
    };

    const setThread = (x1, y1, x2, y2, options = {}) => {
      const deltaX = x2 - x1;
      const deltaY = y2 - y1;
      const length = Math.hypot(deltaX, deltaY) || 1;
      const normalX = -deltaY / length;
      const normalY = deltaX / length;
      const vibration = options.vibration || 0;
      const sag = (options.slack || 0) * length * 0.18;
      const controlX = (x1 + x2) / 2 + normalX * vibration;
      const controlY = (y1 + y2) / 2 + normalY * vibration + sag;
      const width = length > 200 ? 1.2 : 0.8;
      const path = (offset) =>
        `M${x1} ${y1}Q${controlX + normalX * offset} ${controlY + normalY * offset} ${x2} ${y2}`;

      glow.setAttribute("d", path(0));
      glow.style.opacity = "1";
      [-3, 0, 3].forEach((offset, index) => {
        const strand = strandRefs.current[index];
        if (!strand) return;
        strand.setAttribute("d", path(offset * width));
        strand.style.opacity = "0.9";
      });
      tip.setAttribute("cx", String(x2));
      tip.setAttribute("cy", String(y2));
      tip.style.opacity = options.tip ? "1" : "0";
    };

    const showBubble = (text, x, y) => {
      bubble.textContent = text;
      bubble.style.left = `${Math.max(6, Math.min(window.innerWidth - 104, x))}px`;
      bubble.style.top = `${Math.max(64, y)}px`;
      if (reducedMotion) return;
      bubble.animate(
        [
          { transform: "scale(0) rotate(-4deg)", opacity: 0 },
          { transform: "scale(1.15) rotate(-4deg)", opacity: 1, offset: 0.5 },
          { transform: "scale(1) rotate(-4deg)", opacity: 1, offset: 0.8 },
          { transform: "scale(0) rotate(-4deg)", opacity: 0 },
        ],
        { duration: 900 }
      );
    };

    const createDust = (x, y, count) => {
      if (reducedMotion) return;
      for (let index = 0; index < count; index += 1) {
        const particle = document.createElement("span");
        const direction = index % 2 ? 1 : -1;
        const distance = direction * (14 + ((index * 17) % 34));
        particle.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:8px;height:8px;margin:-4px;border-radius:999px;background:rgba(91,109,240,.28);pointer-events:none;z-index:34;`;
        document.body.appendChild(particle);
        dustNodes.add(particle);
        const particleAnimation = particle.animate(
          [
            { transform: "translate(0,0) scale(.4)", opacity: 0.65 },
            {
              transform: `translate(${distance}px,${-7 - ((index * 5) % 14)}px) scale(${0.65 + (index % 4) * 0.17})`,
              opacity: 0,
            },
          ],
          { duration: 480 + (index % 5) * 55, easing: "ease-out" }
        );
        particleAnimation.onfinish = () => {
          dustNodes.delete(particle);
          particle.remove();
        };
      }
    };

    const perch = (index) => {
      const element = landingElement(index);
      const metrics = getMetrics();
      if (!element) return { x: 4, y: window.innerHeight / 2 };
      const landing = LANDINGS[index];
      const bounds = element.getBoundingClientRect();
      let x = bounds.left;
      if (landing.edge === "right") x = bounds.right - metrics.width;
      if (landing.edge === "center") x = bounds.left + bounds.width / 2 - metrics.width / 2;
      return {
        x: Math.max(4, Math.min(window.innerWidth - metrics.width - 4, x + landing.dx)),
        y: bounds.top - metrics.height + 8 + (landing.dy || 0),
      };
    };

    const hand = (point, angle) => {
      const metrics = getMetrics();
      const radians = angle * TO_RADIANS;
      const centerX = metrics.width / 2;
      const centerY = metrics.height / 2;
      const vectorX = -0.36 * metrics.width;
      const vectorY = -0.33 * metrics.height;
      return {
        x: point.x + centerX + vectorX * Math.cos(radians) - vectorY * Math.sin(radians),
        y: point.y + centerY + vectorX * Math.sin(radians) + vectorY * Math.cos(radians),
      };
    };

    const shortAngle = (angle) => {
      const normalized = ((angle % 360) + 360) % 360;
      return normalized > 180 ? normalized - 360 : normalized;
    };

    const activeIndex = () => {
      let active = 0;
      for (let index = 1; index < LANDINGS.length; index += 1) {
        const element = landingElement(index);
        if (element && element.getBoundingClientRect().top < window.innerHeight * TRIGGER_POINT) {
          active = index;
        }
      }
      return active;
    };

    const landingEffects = {
      squash: (elapsed) =>
        elapsed > 320
          ? { done: true }
          : {
              scaleY:
                elapsed < 90
                  ? mix(1, 0.84, elapsed / 90)
                  : mix(0.84, 1, easeOut((elapsed - 90) / 230)),
            },
      hero: (elapsed) =>
        elapsed > 760
          ? { done: true }
          : {
              scaleY:
                elapsed < 110
                  ? mix(1, 0.64, elapsed / 110)
                  : elapsed < 400
                    ? 0.64
                    : mix(0.64, 1, easeOut((elapsed - 400) / 360)),
            },
      bounce: (elapsed) => {
        if (elapsed > 640) return { done: true };
        if (elapsed < 80) return { scaleY: mix(1, 0.86, elapsed / 80) };
        const progress = (elapsed - 80) / 560;
        return {
          y: -22 * Math.sin(Math.PI * Math.min(1, progress * 1.15)) * (1 - progress),
          scaleY: 1 + 0.07 * Math.sin(Math.PI * progress),
        };
      },
      roll: (elapsed) =>
        elapsed > 520
          ? { done: true }
          : {
              angle: 360 * ease(elapsed / 520),
              y: -12 * Math.sin((Math.PI * elapsed) / 520),
            },
    };

    const bubbleText = {
      flip: "HYAH!",
      dive: "WHOOSH!",
      hop: "HUP!",
      swing: "THWIP!",
      web: "THWIP!",
    };

    const beginFlight = (next, now) => {
      if (reducedMotion) {
        current = next;
        position = perch(next);
        rotation = 0;
        flight = null;
        landingMotion = null;
        return;
      }

      const downward = next > current;
      const mode = downward
        ? LANDINGS[next].incoming
        : LANDINGS[next].upward || "web";
      const target = perch(next);
      flight = {
        from: { ...position },
        initialAngle: shortAngle(rotation),
        to: next,
        startedAt: now,
        mode,
        scrollStart: window.scrollY,
        direction: target.x >= position.x ? 1 : -1,
        swingOffset: next % 2 ? 70 : -70,
      };
      if (mode === "swing") {
        const firstHand = hand(position, flight.initialAngle);
        const targetHand = hand(target, 0);
        flight.anchorX = (firstHand.x + targetHand.x) / 2;
        flight.anchorY =
          Math.min(firstHand.y, targetHand.y) -
          Math.max(170, Math.abs(firstHand.y - targetHand.y) * 0.6 + 130);
      }
      showBubble(bubbleText[mode], position.x + 50, position.y - 24);
      landingMotion = null;
      current = next;
    };

    const finishFlight = (now) => {
      const landingType = LANDINGS[flight.to].landing;
      position = perch(flight.to);
      rotation = 0;
      const metrics = getMetrics();
      const impactX = position.x + metrics.width / 2;
      const impactY = position.y + metrics.height - 5;
      if (landingType === "hero") {
        createDust(impactX, impactY, 10);
        showBubble("THUD!", position.x + 48, position.y - 24);
      } else if (landingType !== "roll") {
        createDust(impactX, impactY, landingType === "bounce" ? 5 : 3);
      }
      landingMotion = { type: landingType, startedAt: now };
      flight = null;
    };

    const animateFlight = (now) => {
      const target = perch(flight.to);
      const elapsed = now - flight.startedAt;
      const mode = flight.mode;
      const from = flight.from;
      scaleX = 1;
      scaleY = 1;

      if (mode === "flip" || mode === "dive" || mode === "hop") {
        const progress = Math.min(1, elapsed / duration[mode]);
        if (mode === "flip") {
          const height = Math.min(
            240,
            70 + Math.hypot(target.x - from.x, target.y - from.y) * 0.22
          );
          position = {
            x: mix(from.x, target.x, progress),
            y: mix(from.y, target.y, progress) - 4 * height * progress * (1 - progress),
          };
          rotation =
            flight.initialAngle * (1 - progress) +
            flight.direction * 360 * progress;
        } else if (mode === "dive") {
          const lift = Math.sin(Math.PI * progress);
          position = {
            x: mix(from.x, target.x, easeOut(progress)),
            y: mix(from.y, target.y, progress * progress) - 30 * lift,
          };
          rotation =
            flight.direction * 62 * lift +
            flight.initialAngle * (1 - progress);
          scaleY = 1 + 0.08 * lift;
          scaleX = 1 - 0.06 * lift;
        } else {
          const curved = ease(progress);
          position = {
            x: mix(from.x, target.x, curved),
            y:
              mix(from.y, target.y, curved) -
              38 * Math.abs(Math.sin(progress * Math.PI * 2)) * (1 - progress * 0.4),
          };
          rotation = flight.initialAngle * (1 - progress);
        }
        if (progress >= 1) finishFlight(now);
        return false;
      }

      if (mode === "swing") {
        const anchor = {
          x: flight.anchorX,
          y: flight.anchorY - (window.scrollY - flight.scrollStart),
        };
        if (elapsed < duration.shortShot) {
          const progress = easeOut(elapsed / duration.shortShot);
          position = from;
          rotation = flight.initialAngle * (1 - elapsed / duration.shortShot);
          const firstHand = hand(position, rotation);
          setThread(
            firstHand.x,
            firstHand.y,
            mix(firstHand.x, anchor.x, progress),
            mix(firstHand.y, anchor.y, progress),
            { slack: 1 - progress, tip: progress < 1 }
          );
          if (progress >= 1) setKnot(1, anchor.x, anchor.y);
          return true;
        }

        const progress = Math.min(
          1,
          (elapsed - duration.shortShot) / duration.swing
        );
        const curved = ease(progress);
        const firstHand = hand(from, flight.initialAngle);
        const targetHand = hand(target, 0);
        const firstAngle = Math.atan2(firstHand.x - anchor.x, firstHand.y - anchor.y);
        const targetAngle = Math.atan2(targetHand.x - anchor.x, targetHand.y - anchor.y);
        const angle = mix(firstAngle, targetAngle, curved);
        const radius = mix(
          Math.hypot(firstHand.x - anchor.x, firstHand.y - anchor.y),
          Math.hypot(targetHand.x - anchor.x, targetHand.y - anchor.y),
          curved
        );
        const arc = Math.sin(Math.PI * curved);
        const animatedHand = {
          x:
            anchor.x +
            radius * Math.sin(angle) +
            (Math.abs(targetAngle - firstAngle) < 0.5
              ? arc * flight.swingOffset
              : 0),
          y: anchor.y + radius * Math.cos(angle),
        };
        rotation = mix(0, 24 - (angle / TO_RADIANS) * 0.9, Math.pow(arc, 0.6));
        const handOffset = hand({ x: 0, y: 0 }, rotation);
        position = {
          x: animatedHand.x - handOffset.x,
          y: animatedHand.y - handOffset.y,
        };
        if (progress >= 1) {
          finishFlight(now);
          return false;
        }
        if (progress < 0.9) {
          setThread(anchor.x, anchor.y, animatedHand.x, animatedHand.y, {
            vibration: 3 * Math.sin(elapsed * 0.05) * (1 - progress),
          });
          setKnot(1, anchor.x, anchor.y);
          return true;
        }
        return false;
      }

      const anchor = {
        x: target.x + getMetrics().width / 2,
        y: target.y + getMetrics().height - 4,
      };
      if (elapsed < duration.shot) {
        position = from;
        rotation = flight.initialAngle * (1 - elapsed / duration.shot);
        const progress = easeOut(elapsed / duration.shot);
        const firstHand = hand(position, rotation);
        setThread(
          firstHand.x,
          firstHand.y,
          mix(firstHand.x, anchor.x, progress),
          mix(firstHand.y, anchor.y, progress),
          { slack: 1 - progress, tip: progress < 1 }
        );
        if (progress >= 1) setKnot(1, anchor.x, anchor.y);
        return true;
      }

      const progress = Math.min(1, (elapsed - duration.shot) / duration.reel);
      const curved = ease(progress);
      const arc = Math.sin(Math.PI * curved);
      const direction = from.x < target.x ? -1 : 1;
      position = {
        x: mix(from.x, target.x, curved) + arc * 50 * direction,
        y: mix(from.y, target.y, curved) - arc * 30,
      };
      rotation = arc * 18 * direction;
      if (progress >= 1) {
        finishFlight(now);
        return false;
      }
      const currentHand = hand(position, rotation);
      setThread(currentHand.x, currentHand.y, anchor.x, anchor.y, {
        vibration:
          5 * Math.exp(-(elapsed - duration.shot) / 260) * Math.sin(elapsed * 0.07),
      });
      setKnot(1, anchor.x, anchor.y);
      return true;
    };

    current = activeIndex();
    position = perch(current);

    const handleMenuState = (event) => {
      suspended = Boolean(event.detail?.open);
      root.style.opacity = suspended ? "0" : "1";
      if (!suspended) {
        current = activeIndex();
        position = perch(current);
        flight = null;
        landingMotion = null;
      }
    };
    window.addEventListener("spider-menu-toggle", handleMenuState);

    const frame = (now) => {
      if (suspended || document.hidden) {
        hideThread();
        animationFrame = window.requestAnimationFrame(frame);
        return;
      }

      const next = activeIndex();
      if (next !== current) beginFlight(next, now);

      let threadVisible = false;
      if (flight) threadVisible = animateFlight(now);
      if (!flight) {
        scaleX = 1;
        scaleY = 1;
        let offsetY = 0;
        let extraRotation = 0;
        if (landingMotion) {
          const result = landingEffects[landingMotion.type](now - landingMotion.startedAt);
          if (result.done) {
            landingMotion = null;
          } else {
            offsetY = result.y || 0;
            extraRotation = result.angle || 0;
            scaleY = result.scaleY || 1;
            scaleX = 1 + (1 - scaleY) * 0.55;
          }
        }
        const target = perch(current);
        position = {
          x: target.x,
          y:
            target.y +
            offsetY +
            (landingMotion || reducedMotion ? 0 : Math.sin(now / 520) * 1.25),
        };
        rotation = extraRotation;
      }

      if (!threadVisible) hideThread();
      characterSvg.style.transform = `scale(${scaleX},${scaleY})`;
      character.style.transform = `translate3d(${position.x}px,${position.y}px,0) rotate(${rotation}deg)`;
      animationFrame = window.requestAnimationFrame(frame);
    };

    animationFrame = window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("spider-menu-toggle", handleMenuState);
      dustNodes.forEach((node) => node.remove());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-scroll-web-slinger
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden opacity-100 transition-opacity duration-200"
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <path
          ref={glowRef}
          className="stroke-[#7d89b8]/20 dark:stroke-white/10"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0"
        />
        {[0, 1, 2].map((index) => (
          <path
            key={index}
            ref={(node) => {
              strandRefs.current[index] = node;
            }}
            className="stroke-[#4b547f] dark:stroke-white/70"
            strokeWidth={index === 1 ? 1.3 : 0.9}
            strokeLinecap="round"
            opacity="0"
          />
        ))}
        <circle
          ref={tipRef}
          r="3.4"
          className="fill-[#e8ecff] stroke-[#4b547f] dark:fill-white dark:stroke-white/70"
          strokeWidth="1"
          opacity="0"
        />
        <g ref={knotRef} opacity="0">
          <path
            ref={splatRef}
            className="fill-white/75 stroke-[#4b547f] dark:fill-white/10 dark:stroke-white/70"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <span
        ref={bubbleRef}
        className="fixed left-0 top-0 border-2 border-[#05060f] bg-white px-2 py-1 font-black text-[10px] tracking-[0.08em] text-[#05060f] opacity-0 shadow-[3px_3px_0_#E5202F]"
      >
        THWIP!
      </span>

      <div
        ref={characterRef}
        data-scroll-web-character
        className="fixed left-0 top-0 h-[86px] w-[72px] origin-center will-change-transform drop-shadow-[3px_5px_2px_rgba(5,6,15,.2)] sm:h-[96px] sm:w-[80px]"
        style={{ transform: "translate3d(-180px,0,0)" }}
      >
        <svg
          ref={characterSvgRef}
          viewBox="0 0 100 120"
          className="h-full w-full origin-[50%_92%] overflow-visible"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="scroll-spider-red" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ff4a4f" />
              <stop offset="0.6" stopColor="#E5202F" />
              <stop offset="1" stopColor="#7A1020" />
            </linearGradient>
            <linearGradient id="scroll-spider-blue" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--spider-blue-light)" />
              <stop offset="0.6" stopColor="var(--spider-blue-mid)" />
              <stop offset="1" stopColor="var(--spider-blue-dark)" />
            </linearGradient>
          </defs>

          <g fill="none">
            <path d="M39 43 27 34 15 22" stroke="#080b1d" strokeWidth="12" />
            <path d="M39 43 27 34 15 22" stroke="url(#scroll-spider-red)" strokeWidth="9" />
            <path d="M61 43 75 53 83 66" stroke="#080b1d" strokeWidth="12" />
            <path d="M61 43 75 53 83 66" stroke="url(#scroll-spider-red)" strokeWidth="9" />
            <path d="M44 73 36 91 24 104" stroke="#080b1d" strokeWidth="13" />
            <path d="M44 73 36 91 24 104" stroke="url(#scroll-spider-blue)" strokeWidth="10" />
            <path d="M56 73 69 84 79 103" stroke="#080b1d" strokeWidth="13" />
            <path d="M56 73 69 84 79 103" stroke="url(#scroll-spider-blue)" strokeWidth="10" />
          </g>

          <ellipse cx="21" cy="105" rx="8" ry="5.5" fill="url(#scroll-spider-red)" stroke="#080b1d" strokeWidth="1.5" transform="rotate(-20 21 105)" />
          <ellipse cx="81" cy="105" rx="8" ry="5.5" fill="url(#scroll-spider-red)" stroke="#080b1d" strokeWidth="1.5" transform="rotate(20 81 105)" />
          <circle cx="85" cy="68" r="5.5" fill="url(#scroll-spider-red)" stroke="#080b1d" strokeWidth="1.5" />
          <circle cx="14" cy="20" r="5.6" fill="url(#scroll-spider-red)" stroke="#080b1d" strokeWidth="1.5" />
          <path d="M30 40Q50 33 70 40L61 81Q50 86 39 81Z" fill="url(#scroll-spider-red)" stroke="#080b1d" strokeWidth="1.5" />
          <path d="M30 40 40 39 44 81 38 79Z" fill="url(#scroll-spider-blue)" opacity="0.95" />
          <path d="M70 40 60 39 56 81 62 79Z" fill="url(#scroll-spider-blue)" opacity="0.95" />
          <ellipse cx="50" cy="24" rx="13" ry="15.5" fill="url(#scroll-spider-red)" stroke="#080b1d" strokeWidth="1.6" />

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
