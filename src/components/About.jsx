"use client";

import { useEffect, useRef } from "react";
import { BrainCircuit, Code2, Plane, Search } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_FRAME_COUNT = 120;
const getAboutFramePath = (index) =>
  `/aboutme-back/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

const journey = [
  {
    title: "Building things",
    detail: "Ideas are better when they actually work.",
    icon: Code2,
  },
  {
    title: "Chasing hard problems",
    detail: "AI, robotics, research — anything with a “how?” attached.",
    icon: BrainCircuit,
  },
  {
    title: "Going places",
    detail: "New cities, new people, new perspectives.",
    icon: Plane,
  },
  {
    title: "Staying curious",
    detail: "There’s always another rabbit hole.",
    icon: Search,
  },
];

const stats = [
  { value: "BUILD > TALK", label: "Ship something.", accent: "text-[#2145D6]" },
  {
    value: "WHY NOT?",
    label: "My favorite starting point.",
    accent: "text-[#B51B32]",
  },
  {
    value: "ENDURANCE MODE",
    label: "Best reset button.",
    accent: "text-[#2145D6]",
  },
  {
    value: "NEXT → ?",
    label: "Still figuring it out.",
    accent: "text-[#B51B32]",
  },
];

function JourneyRail() {
  return (
    <div className="relative space-y-4 pl-1">
      <span className="absolute bottom-7 left-[1.48rem] top-7 w-px bg-gradient-to-b from-[#2145D6]/35 via-[#0B1450]/45 to-[#7A1020]/35 dark:from-white/20 dark:via-white/35 dark:to-white/10" />
      {journey.map(({ title, detail, icon: Icon }, index) => (
        <div key={title} className="group relative flex items-center gap-3.5">
          <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#0B1450]/15 bg-white/75 text-[#0B1450] shadow-[0_12px_35px_-22px_rgba(11,20,80,.5)] backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-1 dark:border-white/12 dark:bg-[#111113]/85 dark:text-white">
            <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-black uppercase tracking-[0.17em] text-[#0B1450] dark:text-white">
              {title}
            </span>
            <span className="mt-1 block text-xs leading-[1.15rem] tracking-[0.06em] text-slate-500 dark:text-slate-400">
              {detail}
            </span>
          </span>
          {index < journey.length - 1 ? (
            <span className="absolute left-[1.29rem] top-[3.15rem] z-10 h-1.5 w-1.5 rounded-full bg-[#B51B32] shadow-[0_0_8px_1px_rgba(181,27,50,.32)]" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function StatGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map(({ value, label, accent }) => (
        <article
          key={label}
          className="group rounded-2xl border border-[#0B1450]/10 bg-white/[0.58] p-3.5 shadow-[0_18px_45px_-30px_rgba(11,20,80,.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#B51B32]/25 hover:bg-white/[0.82] dark:border-white/10 dark:bg-[#0b0b0d]/[0.58] dark:hover:bg-[#111114]/80"
        >
          <div className="flex items-start justify-between gap-3">
            <strong
              className={`text-[11px] font-black uppercase leading-4 tracking-[0.08em] ${accent} dark:text-white`}
            >
              {value}
            </strong>
            <span
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${accent === "text-[#B51B32]" ? "bg-[#B51B32]" : "bg-[#2145D6]"}`}
            />
          </div>
          <span className="mt-2 block text-[11px] font-medium leading-[1.1rem] text-slate-500 dark:text-slate-400">
            {label}
          </span>
        </article>
      ))}
    </div>
  );
}

export function About() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const bioPanelRef = useRef(null);
  const interestsPanelRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const bioPanel = bioPanelRef.current;
    const interestsPanel = interestsPanelRef.current;
    if (!section || !canvas || !bioPanel || !interestsPanel) return undefined;

    const context = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frames = new Array(ABOUT_FRAME_COUNT);
    let gsapContext;
    let drawRequest = 0;
    let requestedFrame = reducedMotion.matches ? ABOUT_FRAME_COUNT - 1 : 0;
    let currentFrame = requestedFrame;
    let disposed = false;

    const findLoadedFrame = (index) => {
      if (frames[index]?.complete) return frames[index];

      for (let offset = 1; offset < ABOUT_FRAME_COUNT; offset += 1) {
        const previous = index - offset;
        const next = index + offset;
        if (previous >= 0 && frames[previous]?.complete) return frames[previous];
        if (next < ABOUT_FRAME_COUNT && frames[next]?.complete) return frames[next];
      }
      return null;
    };

    const drawFrame = (index) => {
      const image = findLoadedFrame(index);
      if (!image || !canvas.width || !canvas.height) return;

      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = image.naturalWidth / image.naturalHeight;
      const isMobile = canvas.clientWidth < 1024;
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;

      context.fillStyle = document.documentElement.classList.contains("dark")
        ? "#080809"
        : "#F6F7FC";
      context.fillRect(0, 0, canvas.width, canvas.height);

      if (isMobile) {
        // Keep substantially more of the original 16:9 frame visible on narrow
        // screens instead of applying the aggressive object-cover crop.
        sourceWidth = image.naturalWidth * 0.68;
        sourceX = (image.naturalWidth - sourceWidth) / 2;

        const destinationWidth = canvas.width;
        const destinationHeight =
          destinationWidth * (sourceHeight / sourceWidth);
        const destinationY = canvas.height * 0.045;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(
          image,
          sourceX,
          0,
          sourceWidth,
          sourceHeight,
          0,
          destinationY,
          destinationWidth,
          destinationHeight
        );
        currentFrame = index;
        return;
      }

      if (canvasRatio > imageRatio) {
        sourceHeight = image.naturalWidth / canvasRatio;
        sourceY = (image.naturalHeight - sourceHeight) / 2;
      } else {
        sourceWidth = image.naturalHeight * canvasRatio;
        sourceX = (image.naturalWidth - sourceWidth) / 2;
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
      currentFrame = index;
    };

    const requestFrame = (index) => {
      requestedFrame = Math.max(0, Math.min(ABOUT_FRAME_COUNT - 1, index));
      if (drawRequest) return;

      drawRequest = window.requestAnimationFrame(() => {
        drawRequest = 0;
        drawFrame(requestedFrame);
      });
    };

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
      const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      requestFrame(currentFrame);
    };

    const loadFrame = (index) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = getAboutFramePath(index);
      frames[index] = image;
      image.onload = () => {
        if (!disposed && index === requestedFrame) requestFrame(requestedFrame);
      };
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    if (reducedMotion.matches) {
      loadFrame(ABOUT_FRAME_COUNT - 1);
    } else {
      loadFrame(0);
      loadFrame(ABOUT_FRAME_COUNT - 1);
      for (let index = 1; index < ABOUT_FRAME_COUNT - 1; index += 1) {
        loadFrame(index);
      }

      const playhead = { frame: 0 };

      gsapContext = gsap.context(() => {
        gsap.to(playhead, {
          frame: ABOUT_FRAME_COUNT - 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.12,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            requestFrame(Math.round(playhead.frame));
          },
        });

        const mobilePanels = gsap.matchMedia();
        mobilePanels.add(
          "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          () => {
            gsap.set([bioPanel, interestsPanel], {
              autoAlpha: 0,
              yPercent: 16,
            });

            const panelTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.35,
                invalidateOnRefresh: true,
              },
            });

            panelTimeline
              .to(bioPanel, {
                autoAlpha: 1,
                yPercent: 0,
                duration: 14,
                ease: "power2.out",
              })
              .to(bioPanel, { autoAlpha: 1, duration: 24 })
              .to(bioPanel, {
                autoAlpha: 0,
                yPercent: -18,
                duration: 12,
                ease: "power2.in",
              })
              .to(
                interestsPanel,
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: 14,
                  ease: "power2.out",
                },
                ">-2"
              )
              .to(interestsPanel, { autoAlpha: 1, duration: 24 })
              .to(interestsPanel, {
                autoAlpha: 0,
                yPercent: -18,
                duration: 12,
                ease: "power2.in",
              });
          }
        );
      }, section);

      ScrollTrigger.refresh();
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(drawRequest);
      resizeObserver.disconnect();
      frames.forEach((image) => {
        if (image) image.onload = null;
      });
      gsapContext?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-[340svh] scroll-mt-[8rem] bg-[#F6F7FC] text-[#0B1450] motion-reduce:h-auto dark:bg-[#080809] dark:text-white lg:h-[260svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:relative lg:sticky lg:top-0 lg:h-[100svh]">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full transform-gpu contrast-[1.06] saturate-[1.05] [backface-visibility:hidden] dark:brightness-[0.78] dark:contrast-[1.08] dark:saturate-[0.9]"
        />

        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(246,247,252,.98)_0%,rgba(246,247,252,.88)_18%,rgba(246,247,252,.38)_34%,rgba(246,247,252,0)_44%,rgba(246,247,252,0)_57%,rgba(246,247,252,.45)_69%,rgba(246,247,252,.92)_84%,rgba(246,247,252,.98)_100%)] dark:bg-[linear-gradient(90deg,rgba(8,8,9,.98)_0%,rgba(8,8,9,.9)_18%,rgba(8,8,9,.42)_34%,rgba(8,8,9,.04)_44%,rgba(8,8,9,.04)_57%,rgba(8,8,9,.48)_69%,rgba(8,8,9,.92)_84%,rgba(8,8,9,.98)_100%)] lg:block" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(246,247,252,.45)_0%,transparent_22%,transparent_72%,rgba(246,247,252,.72)_100%)] dark:bg-[linear-gradient(180deg,rgba(8,8,9,.55)_0%,transparent_22%,transparent_70%,rgba(8,8,9,.82)_100%)] lg:block" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,247,252,.02)_0%,rgba(246,247,252,.1)_30%,rgba(246,247,252,.88)_51%,rgba(246,247,252,.99)_100%)] dark:bg-[linear-gradient(180deg,rgba(8,8,9,.06)_0%,rgba(8,8,9,.16)_30%,rgba(8,8,9,.9)_51%,rgba(8,8,9,.99)_100%)] lg:hidden" />

        <div className="absolute inset-0 z-10 mx-auto max-w-[1600px] motion-reduce:relative motion-reduce:min-h-[100svh] motion-reduce:space-y-6 motion-reduce:px-5 motion-reduce:pb-24 motion-reduce:pt-[42svh] sm:motion-reduce:px-8 lg:relative lg:grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_clamp(20rem,32vw,31rem)_minmax(0,1fr)] lg:items-center lg:gap-5 lg:px-8 lg:pb-28 lg:pt-16 xl:gap-8 xl:px-12">
        <div
          ref={bioPanelRef}
          className="absolute inset-x-5 bottom-[5.75rem] max-h-[59svh] overflow-y-auto sm:inset-x-8 motion-reduce:relative motion-reduce:inset-auto motion-reduce:max-h-none motion-reduce:overflow-visible lg:static lg:max-h-none lg:overflow-visible lg:pr-1 xl:pr-4"
        >
          <div className="rounded-[2rem] border border-white/55 bg-white/[0.58] p-5 shadow-[0_28px_80px_-50px_rgba(11,20,80,.58)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/[0.62] sm:p-7 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none lg:dark:bg-transparent">
            <p data-web-land="about-bio" className="inline-flex rounded-full border border-[#7A1020]/20 bg-white/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em] text-[#7A1020] shadow-[0_10px_28px_-18px_rgba(122,16,32,.55)] backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.07] dark:text-[#e16a78]">
              About me
            </p>
            <h2 data-motion-heading className="mt-5 text-balance text-[clamp(2.65rem,4vw,4.6rem)] font-black leading-[0.92] tracking-[-0.06em] text-[#080d35] dark:text-white">
              Tingling with questions.
            </h2>

            <div className="mt-5 space-y-3 text-[17px] leading-6 text-slate-600 dark:text-slate-300 sm:text-sm">
              <p>
                I&apos;m a Computer Science student at{" "}
                <strong className="font-bold text-[#0B1450] dark:text-white">
                  FAST National University
                </strong>
                , where I teach machines to learn, build full-stack things, and
                ask &quot;wait, why does that work?&quot; a few too many times.
              </p>
              <p>
                Give me a messy problem and I&apos;ll happily lose a weekend
                turning it into something that actually works. Bonus points if
                it&apos;s weird, hard, or both.
              </p>
              <p className="border-l-2 border-[#B51B32]/45 pl-4 text-[#0B1450]/75 dark:text-white/70">
                I bounce between AI products, software engineering, research,
                travel, and community building, and somehow it all ends up
                connected.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden="true">
          <span className="absolute left-1/2 top-[14%] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/10 px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-white/65 opacity-0 backdrop-blur-sm transition-opacity duration-500 xl:opacity-100">
            Looking toward what&apos;s next
          </span>
        </div>

        <aside
          ref={interestsPanelRef}
          className="invisible absolute inset-x-5 bottom-[5.75rem] max-h-[59svh] translate-y-[16%] overflow-y-auto opacity-0 sm:inset-x-8 motion-reduce:visible motion-reduce:relative motion-reduce:inset-auto motion-reduce:max-h-none motion-reduce:translate-y-0 motion-reduce:overflow-visible motion-reduce:opacity-100 lg:visible lg:static lg:mt-0 lg:max-h-none lg:translate-y-0 lg:overflow-visible lg:opacity-100 lg:pl-2 xl:pl-5"
        >
          <div className="rounded-[2rem] border border-white/60 bg-white/[0.56] p-5 shadow-[0_28px_80px_-50px_rgba(11,20,80,.58)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/[0.64] sm:p-6">
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#B51B32] dark:text-[#e16a78]">
              What keeps me moving
            </p>
            <h3 className="mt-2 max-w-sm text-xl font-black leading-tight tracking-[-0.04em] text-[#080d35] dark:text-white">
              A few things I keep coming back to
              <span className="text-[#B51B32]">.</span>
            </h3>
            <div className="mt-5">
              <JourneyRail />
            </div>
            <div className="mt-6 border-t border-[#0B1450]/10 pt-5 dark:border-white/10">
              <StatGrid />
            </div>
          </div>
        </aside>
        </div>
      </div>
    </section>
  );
}
