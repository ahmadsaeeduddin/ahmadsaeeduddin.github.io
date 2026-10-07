"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function TextRepel({
  text,
  className,
  letterClassName,
  radius = 120,
  strength = 45,
  mode = "repel",
  stiffness = 180,
  damping = 14,
  mass = 0.4,
  accentLastCharacter = false,
  accentClassName = "text-[#B51B32]",
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const letterElements = Array.from(container.querySelectorAll("[data-repel-letter]"));
    let letters = [];
    let animationFrameId = 0;
    let previousTime = performance.now();

    const captureOrigins = () => {
      letterElements.forEach((element) => {
        element.style.transform = "";
      });
      const containerBounds = container.getBoundingClientRect();
      letters = letterElements.map((element) => {
        const bounds = element.getBoundingClientRect();
        return {
          element,
          originX: bounds.left - containerBounds.left + bounds.width / 2,
          originY: bounds.top - containerBounds.top + bounds.height / 2,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
        };
      });
    };

    const animate = (time) => {
      const delta = Math.min(0.032, Math.max(0.001, (time - previousTime) / 1000));
      previousTime = time;
      const mouse = mouseRef.current;
      const spring = stiffness / Math.max(0.1, mass);
      const friction = Math.exp((-damping * delta) / Math.max(0.1, mass));

      letters.forEach((letter) => {
        let targetX = 0;
        let targetY = 0;

        if (!reducedMotion.matches && mouse.x > -9000) {
          const dx = letter.originX - mouse.x;
          const dy = letter.originY - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < radius) {
            const force = (1 - distance / radius) ** 2 * strength;
            const direction = mode === "attract" ? -1 : 1;
            targetX = (dx / distance) * force * direction;
            targetY = (dy / distance) * force * direction;
          }
        }

        letter.vx += (targetX - letter.x) * spring * delta;
        letter.vy += (targetY - letter.y) * spring * delta;
        letter.vx *= friction;
        letter.vy *= friction;
        letter.x += letter.vx * delta;
        letter.y += letter.vy * delta;
        letter.element.style.transform = `translate3d(${letter.x.toFixed(2)}px, ${letter.y.toFixed(2)}px, 0) rotate(${(letter.x * 0.3).toFixed(2)}deg)`;
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      const bounds = container.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const resizeObserver = new ResizeObserver(captureOrigins);
    resizeObserver.observe(container);
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);
    captureOrigins();
    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [damping, mass, mode, radius, stiffness, strength, text]);

  const characters = Array.from(text);
  const lastVisibleIndex = characters.reduce(
    (lastIndex, character, index) => (character.trim() ? index : lastIndex),
    -1
  );

  return (
    <span
      ref={containerRef}
      data-text-repel
      className={cn("inline cursor-default select-none", className)}
      aria-label={text.replace(/\n/g, " ")}
    >
      {characters.map((character, index) => {
        if (character === "\n") return <br key={`break-${index}`} />;
        if (character === " ") return <span key={`space-${index}`}> </span>;

        return (
          <span
            key={`${character}-${index}`}
            data-repel-letter
            aria-hidden="true"
            className={cn(
              "inline-block whitespace-pre will-change-transform",
              letterClassName,
              accentLastCharacter && index === lastVisibleIndex && accentClassName
            )}
          >
            {character}
          </span>
        );
      })}
    </span>
  );
}
