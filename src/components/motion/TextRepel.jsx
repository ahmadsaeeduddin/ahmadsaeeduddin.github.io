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
  accentClassName = "text-[#B51B32] dark:text-[#a0a0a0]",
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

  const tokens = text.split(/(\n|\s+)/).filter(Boolean);
  const visibleCharacterCount = Array.from(text).filter(
    (character) => !/\s/.test(character)
  ).length;
  let visibleCharacterIndex = 0;

  return (
    <span
      ref={containerRef}
      data-text-repel
      className={cn("inline cursor-default select-none", className)}
      aria-label={text.replace(/\n/g, " ")}
    >
      {tokens.map((token, tokenIndex) => {
        if (token === "\n") {
          return <br key={`break-${tokenIndex}`} aria-hidden="true" />;
        }

        if (/^\s+$/.test(token)) {
          return (
            <span key={`space-${tokenIndex}`} aria-hidden="true">
              {token}
            </span>
          );
        }

        return (
          <span
            key={`${token}-${tokenIndex}`}
            className="inline-block whitespace-nowrap"
            aria-hidden="true"
          >
            {Array.from(token).map((character, characterIndex) => {
              const currentVisibleIndex = visibleCharacterIndex;
              visibleCharacterIndex += 1;

              return (
                <span
                  key={`${character}-${characterIndex}`}
                  data-repel-letter
                  className={cn(
                    "inline-block whitespace-pre will-change-transform",
                    letterClassName,
                    accentLastCharacter &&
                      currentVisibleIndex === visibleCharacterCount - 1 &&
                      accentClassName
                  )}
                >
                  {character}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
