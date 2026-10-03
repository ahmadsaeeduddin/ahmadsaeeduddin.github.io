"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const TAU = Math.PI * 2;
const HALF_TURN = Math.PI;
const BLUE = [11, 20, 80];
const PERIWINKLE = [33, 69, 214];
const RED_PINK = [181, 27, 50];
const RED = [122, 16, 32];

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function interpolateColor(from, to, amount) {
  return from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount));
}

function colorAt(progress, dark) {
  if (dark) return "rgb(255,255,255)";

  const value = Math.max(0, Math.min(1, progress));
  let color;

  if (value < 0.46) {
    color = interpolateColor(BLUE, PERIWINKLE, value / 0.46);
  } else if (value < 0.7) {
    color = interpolateColor(PERIWINKLE, RED_PINK, (value - 0.46) / 0.24);
  } else {
    color = interpolateColor(RED_PINK, RED, (value - 0.7) / 0.3);
  }

  return `rgb(${color.join(",")})`;
}

function makeWeb({ corner, width, height, mobile, seed, alpha, sizeFactor }) {
  const random = seededRandom(seed + width * 17 + height * 31);
  const centerX = corner === 0 || corner === 3 ? 0 : width;
  const centerY = corner === 0 || corner === 1 ? 0 : height;
  const startAngle = [0, HALF_TURN / 2, HALF_TURN, HALF_TURN * 1.5][corner] - 0.05;
  const endAngle = startAngle + HALF_TURN / 2 + 0.1;
  const size = Math.hypot(width, height) * sizeFactor;
  const spokeCount = mobile ? 8 : 12 + Math.floor(random() * 3);
  const turns = mobile ? 9 : 14 + Math.floor(random() * 4);
  const spokes = [];
  const spiral = [];

  for (let index = 0; index < spokeCount; index += 1) {
    const angle =
      startAngle +
      ((endAngle - startAngle) * (index + (random() - 0.5) * 0.62)) / (spokeCount - 1);
    const length = size * (1.02 + random() * 0.22);
    spokes.push({
      angle,
      length,
      nodes: [],
      endX: centerX + Math.cos(angle) * length,
      endY: centerY + Math.sin(angle) * length,
    });
  }

  for (let turn = 0; turn < turns; turn += 1) {
    for (let step = 0; step < spokeCount; step += 1) {
      const index = turn % 2 ? spokeCount - 1 - step : step;
      const fraction = (turn + step / spokeCount + 0.42) / turns;
      const spoke = spokes[index];
      const distance = size * fraction * (0.96 + random() * 0.08);
      const x = centerX + Math.cos(spoke.angle) * distance;
      const y = centerY + Math.sin(spoke.angle) * distance;
      const node = {
        baseX: x,
        baseY: y,
        x,
        y,
        velocityX: 0,
        velocityY: 0,
        fraction,
        dew: fraction > 0.14 && random() < (mobile ? 0.08 : 0.13),
        radius: 1.5 + random() * 2.2,
      };
      spoke.nodes.push(node);
      spiral.push(node);
    }
  }

  return { centerX, centerY, size, spokes, spiral, progress: 0, alpha };
}

function updateWeb(web, pointer, motionEnabled) {
  if (web.progress < 1) web.progress += motionEnabled ? 0.009 : 1;
  if (!motionEnabled) return;

  web.spiral.forEach((node) => {
    const deltaX = node.x - pointer.x;
    const deltaY = node.y - pointer.y;
    const distance = Math.hypot(deltaX, deltaY) || 1;

    if (distance < 145) {
      const force = ((145 - distance) / 145) * 2.2;
      node.velocityX += (deltaX / distance) * force;
      node.velocityY += (deltaY / distance) * force;
    }

    node.velocityX += (node.baseX - node.x) * 0.045;
    node.velocityY += (node.baseY - node.y) * 0.045;
    node.velocityX *= 0.86;
    node.velocityY *= 0.86;
    node.x += node.velocityX;
    node.y += node.velocityY;
  });
}

function drawWeb(context, web, lineGradient, width, dark) {
  const reveal = 1 - Math.pow(1 - Math.min(1, web.progress), 3);
  context.save();
  context.beginPath();
  context.arc(web.centerX, web.centerY, web.size * 1.42 * reveal + 1, 0, TAU);
  context.clip();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = lineGradient;

  context.globalAlpha = web.alpha;
  context.lineWidth = 1.25;
  context.beginPath();
  web.spokes.forEach((spoke) => {
    context.moveTo(web.centerX, web.centerY);
    spoke.nodes.forEach((node) => context.lineTo(node.x, node.y));
    context.lineTo(spoke.endX, spoke.endY);
  });
  context.stroke();

  context.globalAlpha = web.alpha * 0.78;
  context.lineWidth = 0.7;
  context.beginPath();
  const spiral = web.spiral;
  if (spiral.length) context.moveTo(spiral[0].x, spiral[0].y);
  for (let index = 1; index < spiral.length; index += 1) {
    const previous = spiral[index - 1];
    const current = spiral[index];
    const middleX = (previous.x + current.x) / 2;
    const middleY = (previous.y + current.y) / 2;
    const distance = Math.hypot(previous.x - current.x, previous.y - current.y);
    context.quadraticCurveTo(
      middleX + (web.centerX - middleX) * 0.07,
      middleY + (web.centerY - middleY) * 0.07 + distance * 0.08,
      current.x,
      current.y
    );
  }
  context.stroke();

  web.spiral.forEach((node) => {
    if (!node.dew) return;
    const color = colorAt(node.x / Math.max(1, width), dark);
    context.globalAlpha = web.alpha + 0.2;
    context.fillStyle = "rgba(255,255,255,0.96)";
    context.strokeStyle = color;
    context.lineWidth = 0.85;
    context.beginPath();
    context.arc(node.x, node.y + node.radius * 0.55, node.radius, 0, TAU);
    context.fill();
    context.stroke();
    context.fillStyle = color;
    context.globalAlpha = web.alpha * 0.7;
    context.beginPath();
    context.arc(
      node.x + node.radius * 0.28,
      node.y + node.radius * 0.85,
      node.radius * 0.32,
      0,
      TAU
    );
    context.fill();
  });

  context.restore();
}

export function HeroConnections() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const pointer = { x: -9999, y: -9999 };
    const dark = resolvedTheme === "dark";
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let webs = [];
    let frameId = 0;
    let visible = true;

    const build = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = width < 768;
      // const configurations = mobile
      //   ? [
      //       { corner: 0, seed: 2145, alpha: 0.46, sizeFactor: 0.82 },
      //       { corner: 1, seed: 2029, alpha: 0.42, sizeFactor: 0.82 },
      //     ]
      //   : [
      //       { corner: 0, seed: 2145, alpha: 0.55, sizeFactor: 0.72 },
      //       { corner: 1, seed: 2029, alpha: 0.52, sizeFactor: 0.72 },
      //       { corner: 2, seed: 5061, alpha: 0.22, sizeFactor: 0.56 },
      //       { corner: 3, seed: 1450, alpha: 0.24, sizeFactor: 0.56 },
      //     ];

      const configurations = [
        { corner: 2, seed: 2145, alpha: 0.55, sizeFactor: 0.72 },
      ]

      webs = configurations.map((configuration) =>
        makeWeb({
          ...configuration,
          alpha: Math.min(0.82, configuration.alpha * (dark ? 1.16 : 1)),
          width,
          height,
          mobile,
        })
      );
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const gradient = context.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, dark ? "#FFFFFF" : "#0B1450");
      gradient.addColorStop(0.44, dark ? "#FFFFFF" : "#2145D6");
      gradient.addColorStop(0.7, dark ? "#F2F2F2" : "#B51B32");
      gradient.addColorStop(1, dark ? "#FFFFFF" : "#7A1020");
      webs.forEach((web) => {
        updateWeb(web, pointer, !reducedQuery.matches);
        drawWeb(context, web, gradient, width, dark);
      });
    };

    const animate = () => {
      draw();
      if (visible && !reducedQuery.matches) frameId = window.requestAnimationFrame(animate);
    };

    const restart = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      build();
      if (visible && !reducedQuery.matches) animate();
      else draw();
    };

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };
    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frameId && !reducedQuery.matches) animate();
      if (!visible && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });

    const resizeObserver = new ResizeObserver(restart);
    visibilityObserver.observe(canvas);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    reducedQuery.addEventListener("change", restart);
    restart();

    return () => {
      window.cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      reducedQuery.removeEventListener("change", restart);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      data-hero-connections
      aria-label="Interactive spider web pattern"
      className="pointer-events-none absolute inset-0 z-[15] h-full w-full"
    />
  );
}
