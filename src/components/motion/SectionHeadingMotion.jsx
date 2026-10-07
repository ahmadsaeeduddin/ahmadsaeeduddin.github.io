"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeadingMotion() {
  useEffect(() => {
    const media = gsap.matchMedia();

    const buildHeadingReveals = () => {
      const headings = gsap.utils
        .toArray("[data-motion-heading]")
        .filter((heading) => heading.getClientRects().length > 0);

      const timelines = headings.map((heading, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: "top 94%",
            end: "top 62%",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            heading,
            {
              autoAlpha: 0.08,
              x: 34 * direction,
              y: 34,
              rotateX: -18,
              skewX: 4 * direction,
              clipPath:
                direction < 0
                  ? "inset(0 100% 0 0 round 0.2em)"
                  : "inset(0 0 0 100% round 0.2em)",
              filter: "blur(9px)",
              textShadow: `${-10 * direction}px 8px 0 rgba(181,27,50,0)`,
              transformPerspective: 900,
              transformOrigin: direction < 0 ? "left center" : "right center",
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotateX: 0,
              skewX: 0,
              clipPath: "inset(0 0% 0 0 round 0em)",
              filter: "blur(0px)",
              textShadow: `${-3 * direction}px 3px 0 rgba(181,27,50,.13)`,
              duration: 0.82,
              ease: "power3.out",
            }
          )
          .to(heading, {
            textShadow: "0 0 0 rgba(181,27,50,0)",
            duration: 0.18,
            ease: "none",
          });

        return timeline;
      });

      return () => timelines.forEach((timeline) => timeline.kill());
    };

    media.add("(prefers-reduced-motion: no-preference) and (max-width: 1279px)", buildHeadingReveals);
    media.add("(prefers-reduced-motion: no-preference) and (min-width: 1280px)", buildHeadingReveals);
    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-motion-heading]", { clearProps: "all" });
    });

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      media.revert();
    };
  }, []);

  return null;
}
