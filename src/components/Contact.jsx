"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  MoveLeft,
  Send,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextRepel } from "@/components/motion/TextRepel";

gsap.registerPlugin(ScrollTrigger);

const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyKCEWaU4S6eHqW-67ijKDbRBIRy3Zx7Qs0h6An0ODV38SJwYEWV4W-g_RjcL5ftnR22g/exec";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const clamp = (value, minimum, maximum) =>
  Math.max(minimum, Math.min(maximum, value));

function ContactWeb() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-45 dark:opacity-20"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      fill="none"
    >
      <g stroke="#2145D6" strokeWidth="1.1" opacity=".45">
        <path d="M-90 640 C170 485 220 720 470 535 S760 320 930 470" />
        <path d="M-30 725 C210 535 320 820 560 610 S755 440 940 505" />
        <path d="M75 900 C185 670 350 710 470 535 C555 410 660 408 785 438" />
        <path d="M210 900 C270 760 390 742 560 610 C650 540 735 510 850 500" />
      </g>
      <g stroke="#7A1020" strokeWidth="1.1" opacity=".4">
        <path d="M1690 185 C1450 280 1470 500 1245 455 S1040 350 875 465" />
        <path d="M1660 305 C1430 350 1530 620 1265 565 S1050 430 920 505" />
        <path d="M1515-40 C1490 180 1370 260 1245 455 C1170 570 1090 595 975 560" />
      </g>
      <g fill="#2145D6">
        <circle cx="470" cy="535" r="4" />
        <circle cx="560" cy="610" r="3" />
        <circle cx="785" cy="438" r="3" />
      </g>
      <g fill="#7A1020">
        <circle cx="1245" cy="455" r="4" />
        <circle cx="1265" cy="565" r="3" />
        <circle cx="975" cy="560" r="3" />
      </g>
    </svg>
  );
}

export function Contact() {
  const sectionRef = useRef(null);
  const bookRef = useRef(null);
  const coverRef = useRef(null);
  const leftPageRef = useRef(null);
  const rightPageRef = useRef(null);
  const tearSheetRef = useRef(null);
  const tearTargetRef = useRef(null);
  const tearLineRef = useRef(null);
  const dragRef = useRef({ active: false, pointerId: null, startX: 0, progress: 0 });
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const book = bookRef.current;
    const cover = coverRef.current;
    const leftPage = leftPageRef.current;
    const rightPage = rightPageRef.current;
    if (!section || !book || !cover || !leftPage || !rightPage) return undefined;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(book, { scale: 0.88, xPercent: -25, y: 34 });
          gsap.set(leftPage, {
            rotationY: 86,
            transformOrigin: "right center",
          });
          gsap.set(rightPage, {
            rotationY: -86,
            transformOrigin: "left center",
          });
          gsap.set(cover, {
            rotationY: 0,
            transformOrigin: "left center",
            autoAlpha: 1,
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * 0.32)}`,
              scrub: 1.05,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              book,
              { scale: 1, xPercent: 0, y: 0, duration: 0.42, ease: "power2.out" },
              0
            )
            .to(
              cover,
              {
                rotationY: -176,
                autoAlpha: 0,
                duration: 0.5,
                ease: "power2.inOut",
              },
              0.08
            )
            .to(
              leftPage,
              {
                rotationY: 0,
                duration: 0.62,
                ease: "power3.inOut",
              },
              0.1
            )
            .to(
              rightPage,
              {
                rotationY: 0,
                duration: 0.62,
                ease: "power3.inOut",
              },
              0.1
            );

          return () => timeline.kill();
        }
      );

      media.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pages = [leftPage, rightPage];
          gsap.fromTo(
            pages,
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: book,
                start: "top 88%",
                once: true,
              },
            }
          );
        }
      );

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([book, cover, leftPage, rightPage], { clearProps: "all" });
      });
    }, section);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    if (!form.firstName || !form.email || !form.subject || !form.message) {
      return "Please complete your name, email, subject, and message first.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email address before tearing the page.";
    }
    return "";
  };

  const resetDrag = (animate = true) => {
    const sheet = tearSheetRef.current;
    const target = tearTargetRef.current;
    const line = tearLineRef.current;
    dragRef.current = { active: false, pointerId: null, startX: 0, progress: 0 };
    if (!sheet) return;

    if (animate) {
      gsap.to(sheet, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1,
        duration: 0.52,
        ease: "elastic.out(1, .65)",
        overwrite: true,
      });
    } else {
      gsap.set(sheet, { x: 0, y: 0, rotationY: 0, rotationZ: 0, scale: 1 });
    }
    if (target) gsap.to(target, { scale: 1, autoAlpha: 0.5, duration: 0.25 });
    if (line) gsap.to(line, { scaleX: 0, duration: 0.3, transformOrigin: "right" });
  };

  const playTearAway = () =>
    new Promise((resolve) => {
      const sheet = tearSheetRef.current;
      if (!sheet) {
        resolve();
        return;
      }

      gsap
        .timeline({ onComplete: resolve })
        .to(sheet, {
          x: -36,
          y: -12,
          rotationY: 12,
          rotationZ: -3,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(sheet, {
          x: () => Math.max(500, window.innerWidth * 0.58),
          y: () => -Math.max(320, window.innerHeight * 0.48),
          rotationY: 185,
          rotationZ: 19,
          scale: 0.42,
          autoAlpha: 0,
          duration: 0.92,
          ease: "power3.in",
        });
    });

  const playFailedDrop = () =>
    new Promise((resolve) => {
      const sheet = tearSheetRef.current;
      if (!sheet) {
        resolve();
        return;
      }

      gsap.set(sheet, {
        x: 12,
        y: -130,
        rotationY: 0,
        rotationZ: 7,
        scale: 0.95,
        autoAlpha: 1,
      });
      gsap.to(sheet, {
        y: () => Math.max(460, window.innerHeight * 0.62),
        x: -80,
        rotationZ: -14,
        autoAlpha: 0,
        duration: 0.72,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(sheet, { clearProps: "transform,opacity,visibility" });
          resolve();
        },
      });
    });

  const sendMessage = async () => {
    if (status === "sending") return;

    const validationMessage = validate();
    if (validationMessage) {
      setFeedback(validationMessage);
      setStatus("error");
      resetDrag();
      const sheet = tearSheetRef.current;
      if (sheet) {
        gsap.fromTo(
          sheet,
          { x: -8 },
          { x: 8, duration: 0.08, repeat: 5, yoyo: true, clearProps: "x" }
        );
      }
      return;
    }

    setStatus("sending");
    setFeedback("Sending your page through the web...");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("timestamp", new Date().toISOString());

    const request = fetch(SHEETS_ENDPOINT, {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (!response.ok) throw new Error("Message request failed");
      return response;
    });

    const [requestResult] = await Promise.allSettled([request, playTearAway()]);

    if (requestResult.status === "fulfilled") {
      setForm(initialForm);
      setStatus("success");
      setFeedback("Message sent successfully. Your page made it across.");
    } else {
      await playFailedDrop();
      setStatus("error");
      setFeedback("The page lost its thread. Your message is still here—please try again.");
      resetDrag(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleTearStart = (event) => {
    if (status === "sending" || status === "success") return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      progress: 0,
    };
    setFeedback("");
    if (status === "error") setStatus("idle");
  };

  const handleTearMove = (event) => {
    const drag = dragRef.current;
    const sheet = tearSheetRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId || !sheet) return;

    const travel = Math.min(330, sheet.getBoundingClientRect().width * 0.72);
    const progress = clamp((drag.startX - event.clientX) / travel, 0, 1);
    drag.progress = progress;

    gsap.set(sheet, {
      x: -progress * 24,
      y: -progress * 7,
      rotationY: progress * 9,
      rotationZ: -progress * 1.8,
      scale: 1 + progress * 0.012,
      transformOrigin: "left bottom",
    });
    if (tearTargetRef.current) {
      gsap.set(tearTargetRef.current, {
        scale: 1 + progress * 0.16,
        autoAlpha: 0.5 + progress * 0.5,
      });
    }
    if (tearLineRef.current) {
      gsap.set(tearLineRef.current, {
        scaleX: progress,
        transformOrigin: "right",
      });
    }
  };

  const handleTearEnd = (event) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    drag.active = false;

    if (drag.progress >= 0.78) {
      sendMessage();
    } else {
      resetDrag();
    }
  };

  const resetMessage = () => {
    const sheet = tearSheetRef.current;
    setStatus("idle");
    setFeedback("");
    if (sheet) {
      gsap.fromTo(
        sheet,
        { x: 180, y: -100, rotationY: 35, autoAlpha: 0 },
        {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.72,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        }
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate min-h-[100svh] overflow-x-clip bg-[#F5F6FC] text-[#0B1450] dark:bg-[#080809] dark:text-white md:h-[145svh]"
    >
      <ContactWeb />
      <div className="pointer-events-none absolute left-[-12rem] top-[18%] h-[30rem] w-[30rem] rounded-full bg-[#2145D6]/10 blur-[100px] dark:bg-[#2145D6]/[0.08]" />
      <div className="pointer-events-none absolute bottom-[6%] right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[#7A1020]/10 blur-[100px] dark:bg-[#7A1020]/[0.1]" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col px-4 pb-24 pt-20 sm:px-7 md:sticky md:top-0 md:h-[100svh] md:overflow-hidden md:pb-6 md:pt-16 lg:px-10">
        <header className="relative z-30 mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-[#7A1020]/20 bg-white/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em] text-[#7A1020] shadow-[0_10px_28px_-18px_rgba(122,16,32,.55)] backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.07] dark:text-[#e16a78]">
            Let&apos;s connect
          </p>
          <h2
            data-motion-heading
            className="mt-4 text-balance text-[clamp(2.45rem,4.2vw,4.65rem)] font-black leading-[0.94] tracking-[-0.06em] text-[#07103f] dark:text-white"
          >
            <TextRepel
              text="Got a project, an idea, or just a hello?"
              accentLastCharacter
            />
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-[#64708f] dark:text-slate-400 sm:text-base">
            Open the book, leave a note, and pull the page free when it is ready to travel.
          </p>
        </header>

        <div
          ref={bookRef}
          className="contact-book relative z-20 mx-auto mt-8 grid w-full max-w-[1120px] flex-1 grid-cols-1 items-stretch [perspective:1800px] md:mt-5 md:max-h-[650px] md:min-h-[500px] md:grid-cols-2"
        >
          <div
            ref={coverRef}
            aria-hidden="true"
            className="contact-cover absolute bottom-0 left-1/2 top-0 z-40 hidden w-1/2 overflow-hidden rounded-r-[2rem] border border-[#2145D6]/30 bg-[linear-gradient(145deg,#0B1450_0%,#172d93_60%,#7A1020_130%)] p-10 text-white shadow-[0_40px_90px_-35px_rgba(11,20,80,.8)] md:grid md:place-items-center"
          >
            <div className="text-center">
              <MessageCircle className="mx-auto h-12 w-12 opacity-75" strokeWidth={1.3} />
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-white/55">
                Contact notebook
              </p>
              <p className="mt-3 text-4xl font-black tracking-[-0.05em]">Open a conversation.</p>
              <span className="mx-auto mt-7 block h-px w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>

          <article
            ref={leftPageRef}
            data-web-land="contact-card"
            className="contact-page contact-page-left relative overflow-hidden rounded-t-[2rem] border border-[#0B1450]/10 bg-white/80 p-6 shadow-[0_34px_80px_-45px_rgba(11,20,80,.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0e0f14]/95 sm:p-8 md:rounded-l-[2rem] md:rounded-tr-none lg:p-10"
          >
            <span className="absolute inset-y-0 right-0 hidden w-14 bg-[linear-gradient(90deg,transparent,rgba(11,20,80,.06))] dark:bg-[linear-gradient(90deg,transparent,rgba(0,0,0,.4))] md:block" />
            <div className="relative flex h-full flex-col">
              <p className="text-[9px] font-black uppercase tracking-[0.34em] text-[#B51B32] dark:text-[#e16a78]">
                A page for new ideas
              </p>
              <h3 className="mt-4 max-w-sm text-[clamp(2rem,3vw,3.25rem)] font-black leading-[0.98] tracking-[-0.055em] text-[#07103f] dark:text-white">
                Drop me a message<span className="text-[#B51B32]">.</span>
              </h3>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#63708e] dark:text-slate-400">
                Whether it is a question, a collaboration, or an ambitious build, I would love to hear where you want to take it.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <a
                  href="mailto:ahmadsaeeduddin@gmail.com"
                  className="group rounded-2xl border border-[#2145D6]/12 bg-[#F5F6FC]/80 p-4 transition hover:-translate-y-1 hover:border-[#2145D6]/30 dark:border-white/10 dark:bg-white/[0.045]"
                >
                  <Mail className="h-5 w-5 text-[#2145D6] dark:text-[#8290ff]" />
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.12em]">Email</p>
                  <p className="mt-1 break-all text-xs leading-5 text-[#65708c] dark:text-slate-400">
                    ahmadsaeeduddin@gmail.com
                  </p>
                </a>
                <div className="rounded-2xl border border-[#7A1020]/12 bg-[#fff7f7]/75 p-4 dark:border-white/10 dark:bg-white/[0.045]">
                  <MapPin className="h-5 w-5 text-[#B51B32] dark:text-[#e16a78]" />
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.12em]">Location</p>
                  <p className="mt-1 text-xs leading-5 text-[#65708c] dark:text-slate-400">
                    Islamabad, Pakistan
                  </p>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-3 pt-7">
                <a
                  href="https://github.com/ahmadsaeeduddin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-[#0B1450]/10 bg-white/75 transition hover:-translate-y-1 hover:text-[#B51B32] dark:border-white/10 dark:bg-white/[0.06]"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/saeed-ud-din-ahmad"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-[#0B1450]/10 bg-white/75 transition hover:-translate-y-1 hover:text-[#2145D6] dark:border-white/10 dark:bg-white/[0.06]"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <span className="ml-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#7a859f]">
                  Find me elsewhere
                </span>
              </div>
            </div>
          </article>

          <article
            ref={rightPageRef}
            className="contact-page contact-page-right relative min-h-[620px] overflow-hidden rounded-b-[2rem] border border-[#0B1450]/10 bg-[#fbfbff]/90 shadow-[0_34px_80px_-45px_rgba(11,20,80,.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111218]/95 md:min-h-0 md:rounded-r-[2rem] md:rounded-bl-none"
          >
            <span className="absolute inset-y-0 left-0 z-20 hidden w-14 bg-[linear-gradient(90deg,rgba(11,20,80,.075),transparent)] dark:bg-[linear-gradient(90deg,rgba(0,0,0,.45),transparent)] md:block" />

            <div className="absolute inset-6 z-0 grid place-items-center text-center sm:inset-9">
              {status === "success" ? (
                <div className="max-w-sm">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#2145D6]/10 text-[#2145D6] dark:bg-white/10 dark:text-[#8ea0ff]">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 text-3xl font-black tracking-[-0.05em]">Message sent.</h3>
                  <p className="mt-3 text-sm leading-6 text-[#63708e] dark:text-slate-400">{feedback}</p>
                  <button
                    type="button"
                    onClick={resetMessage}
                    className="mt-6 rounded-full border border-[#0B1450]/10 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.12em] shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.08]"
                  >
                    Write another page
                  </button>
                </div>
              ) : status === "sending" ? (
                <div>
                  <Send className="contact-send-flight mx-auto h-10 w-10 text-[#2145D6] dark:text-[#8290ff]" />
                  <p className="mt-4 text-sm font-bold text-[#63708e] dark:text-slate-400">{feedback}</p>
                </div>
              ) : null}
            </div>

            <form
              ref={tearSheetRef}
              data-web-land="contact-form"
              onSubmit={handleSubmit}
              className="contact-tear-sheet relative z-10 flex h-full min-h-[620px] flex-col bg-[linear-gradient(145deg,rgba(255,255,255,.98),rgba(242,245,255,.96)_64%,rgba(255,240,242,.94))] p-6 dark:bg-[linear-gradient(145deg,#101116,#13162a_62%,#261016)] sm:p-8 md:min-h-0 lg:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.32em] text-[#2145D6] dark:text-[#8290ff]">
                    Message page
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                    Put the idea in writing<span className="text-[#B51B32]">.</span>
                  </h3>
                </div>
                <Send className="h-7 w-7 rotate-[-12deg] text-[#B51B32] opacity-75" strokeWidth={1.4} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <label className="contact-field">
                  <span>First name *</span>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Saeed" autoComplete="given-name" />
                </label>
                <label className="contact-field">
                  <span>Last name</span>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Ahmad" autoComplete="family-name" />
                </label>
              </div>
              <label className="contact-field mt-3">
                <span>Email *</span>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" />
              </label>
              <label className="contact-field mt-3">
                <span>Subject *</span>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Let's build something" />
              </label>
              <label className="contact-field mt-3 flex-1">
                <span>Message *</span>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about the idea..." rows={3} />
              </label>

              <div className="relative mt-4 border-t border-dashed border-[#0B1450]/20 pt-4 dark:border-white/20">
                <span
                  ref={tearLineRef}
                  className="absolute -top-px left-0 right-0 h-[2px] origin-right scale-x-0 bg-gradient-to-l from-[#B51B32] via-[#7A1020] to-[#2145D6] shadow-[0_0_14px_rgba(181,27,50,.45)]"
                />
                <div className="flex items-center justify-between gap-3">
                  <div
                    ref={tearTargetRef}
                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#7A1020] opacity-50 dark:text-[#e16a78]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-dashed border-current">
                      <Mail className="h-4 w-4" />
                    </span>
                    Release here
                  </div>
                  <button
                    type="button"
                    disabled={status === "sending" || status === "success"}
                    onPointerDown={handleTearStart}
                    onPointerMove={handleTearMove}
                    onPointerUp={handleTearEnd}
                    onPointerCancel={handleTearEnd}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="contact-tear-handle group inline-flex touch-none items-center gap-3 rounded-full bg-gradient-to-r from-[#7A1020] via-[#B51B32] to-[#2145D6] px-5 py-3 text-xs font-black text-white shadow-[0_16px_34px_-14px_rgba(33,69,214,.7)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
                    aria-label="Drag left to tear and send this message, or press Enter"
                  >
                    <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Drag to tear &amp; send
                  </button>
                </div>
              </div>

              {feedback && status === "error" ? (
                <p className="mt-3 flex items-center gap-2 text-xs font-bold text-[#9A1628] dark:text-[#ff8190]" role="alert">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {feedback}
                </p>
              ) : null}

              <button type="submit" className="sr-only">
                Send message
              </button>
            </form>
          </article>

          <span className="contact-spine pointer-events-none absolute bottom-3 left-1/2 top-3 z-30 hidden w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-[#2145D6]/45 to-transparent shadow-[0_0_18px_rgba(33,69,214,.35)] md:block" />
        </div>
      </div>

      <style jsx>{`
        .contact-book,
        .contact-page,
        .contact-cover {
          transform-style: preserve-3d;
        }

        .contact-page {
          backface-visibility: hidden;
        }

        .contact-page-left::after,
        .contact-page-right::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.18;
          background-image: repeating-linear-gradient(
            112deg,
            transparent 0 18px,
            rgba(11, 20, 80, 0.08) 19px,
            transparent 20px
          );
        }

        .contact-tear-sheet {
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }

        .contact-field {
          display: block;
        }

        .contact-field span {
          display: block;
          margin: 0 0 0.35rem 0.15rem;
          color: #667492;
          font-size: 0.58rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .contact-field input,
        .contact-field textarea {
          width: 100%;
          border: 1px solid rgba(11, 20, 80, 0.1);
          border-radius: 0.85rem;
          background: rgba(255, 255, 255, 0.64);
          padding: 0.68rem 0.85rem;
          color: #0b1450;
          font-size: 0.78rem;
          font-weight: 600;
          outline: none;
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        .contact-field textarea {
          min-height: 5rem;
          resize: none;
        }

        .contact-field input:focus,
        .contact-field textarea:focus {
          border-color: rgba(33, 69, 214, 0.42);
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 0 0 3px rgba(33, 69, 214, 0.08);
        }

        :global(.dark) .contact-field span {
          color: #9da8d4;
        }

        :global(.dark) .contact-field input,
        :global(.dark) .contact-field textarea {
          border-color: rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.045);
          color: #f5f6fc;
        }

        :global(.dark) .contact-field input:focus,
        :global(.dark) .contact-field textarea:focus {
          border-color: rgba(130, 144, 255, 0.45);
          background: rgba(255, 255, 255, 0.07);
        }

        .contact-send-flight {
          animation: contact-send-flight 1.5s ease-in-out infinite;
        }

        @keyframes contact-send-flight {
          50% {
            transform: translate(12px, -12px) rotate(-8deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-send-flight {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
