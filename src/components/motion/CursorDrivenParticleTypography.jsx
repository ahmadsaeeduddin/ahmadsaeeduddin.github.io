"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const TWO_PI = Math.PI * 2;

const seededOffset = (x, y, salt = 0) => {
  const value = Math.sin(x * 12.9898 + y * 78.233 + salt * 37.719) * 43758.5453;
  return value - Math.floor(value) - 0.5;
};

class Particle {
  constructor(x, y, size, color, dispersion, returnSpeed, reducedMotion) {
    const initialSpread = reducedMotion ? 0 : 10;
    this.x = x + seededOffset(x, y, 1) * initialSpread;
    this.y = y + seededOffset(x, y, 2) * initialSpread;
    this.originX = x;
    this.originY = y;
    this.vx = reducedMotion ? 0 : seededOffset(x, y, 3) * 4;
    this.vy = reducedMotion ? 0 : seededOffset(x, y, 4) * 4;
    this.size = size;
    this.color = color;
    this.dispersion = dispersion;
    this.returnSpeed = returnSpeed;
  }

  update(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.hypot(dx, dy);
    const interactionRadius = 120;

    if (distance > 0 && distance < interactionRadius && mouseX !== -1000) {
      const force = (interactionRadius - distance) / interactionRadius;
      this.vx -= (dx / distance) * force * this.dispersion;
      this.vy -= (dy / distance) * force * this.dispersion;
    }

    this.vx += (this.originX - this.x) * this.returnSpeed;
    this.vy += (this.originY - this.y) * this.returnSpeed;
    this.vx *= 0.85;
    this.vy *= 0.85;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, TWO_PI);
    context.fill();
  }
}

export function CursorDrivenParticleTypography({
  className,
  text,
  fontSize = 240,
  fontFamily = "Inter, ui-sans-serif, system-ui, sans-serif",
  particleSize = 1.35,
  particleDensity = 5,
  dispersionStrength = 13,
  returnSpeed = 0.075,
  color,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let initFrameId = 0;
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let width = 0;
    let height = 0;
    let resizeTimer;
    let mounted = true;

    const render = (animateParticles = true) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        if (animateParticles) particle.update(mouseX, mouseY);
        particle.draw(context);
      });
    };

    const initialize = () => {
      width = Math.max(1, Math.round(container.clientWidth));
      height = Math.max(1, Math.round(container.clientHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const map = document.createElement("canvas");
      map.width = width;
      map.height = height;
      const mapContext = map.getContext("2d", { willReadFrequently: true });
      if (!mapContext) return;

      const computedStyle = window.getComputedStyle(container);
      const colors = [1, 2, 3, 4]
        .map((index) => computedStyle.getPropertyValue(`--particle-color-${index}`).trim())
        .filter(Boolean);
      const fallbackColor = color || computedStyle.color || "#0B1450";

      let effectiveFontSize = Math.min(fontSize, height * 0.94);
      mapContext.font = `900 ${effectiveFontSize}px ${fontFamily}`;
      const availableWidth = width * 0.96;
      const measuredWidth = mapContext.measureText(text).width;
      if (measuredWidth > availableWidth) {
        effectiveFontSize *= availableWidth / measuredWidth;
      }

      mapContext.font = `900 ${effectiveFontSize}px ${fontFamily}`;
      mapContext.textAlign = "center";
      mapContext.textBaseline = "middle";
      if (colors.length > 1 && !color) {
        const gradient = mapContext.createLinearGradient(width * 0.06, 0, width * 0.94, 0);
        colors.forEach((gradientColor, index) => {
          gradient.addColorStop(index / (colors.length - 1), gradientColor);
        });
        mapContext.fillStyle = gradient;
      } else {
        mapContext.fillStyle = fallbackColor;
      }
      mapContext.fillText(text, width / 2, height / 2);

      const pixelMap = mapContext.getImageData(0, 0, width, height);
      const step = Math.max(2, Math.round(particleDensity));
      const reducedMotion = reducedMotionQuery.matches;
      particles = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const pixelIndex = (y * width + x) * 4;
          const alpha = pixelMap.data[pixelIndex + 3];
          if (alpha <= 128) continue;
          const particleColor = `rgba(${pixelMap.data[pixelIndex]}, ${pixelMap.data[pixelIndex + 1]}, ${pixelMap.data[pixelIndex + 2]}, ${alpha / 255})`;
          particles.push(
            new Particle(
              x,
              y,
              particleSize,
              particleColor,
              dispersionStrength,
              returnSpeed,
              reducedMotion
            )
          );
        }
      }

      render(!reducedMotion);
    };

    const animate = () => {
      animationFrameId = 0;
      if (reducedMotionQuery.matches) {
        render(false);
        return;
      }
      render(!reducedMotionQuery.matches);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      mouseX = event.clientX - bounds.left;
      mouseY = event.clientY - bounds.top;
    };

    const handlePointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const scheduleInitialize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(initialize, 80);
    };

    const handleMotionPreference = () => {
      scheduleInitialize();
      if (!reducedMotionQuery.matches && !animationFrameId) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    const resizeObserver = new ResizeObserver(scheduleInitialize);
    const themeObserver = new MutationObserver(scheduleInitialize);
    resizeObserver.observe(container);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave);
    reducedMotionQuery.addEventListener("change", handleMotionPreference);

    const start = () => {
      initialize();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (mounted) initFrameId = window.requestAnimationFrame(start);
      });
    } else {
      initFrameId = window.requestAnimationFrame(start);
    }

    return () => {
      mounted = false;
      window.clearTimeout(resizeTimer);
      window.cancelAnimationFrame(initFrameId);
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [color, dispersionStrength, fontFamily, fontSize, particleDensity, particleSize, returnSpeed, text]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full touch-none", className)}
    >
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
