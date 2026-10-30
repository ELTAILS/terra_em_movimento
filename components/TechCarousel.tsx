"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type TechCarouselProps = {
  technologies: string[];
};

export default function TechCarousel({ technologies }: TechCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);
  const manuallyPausedRef = useRef(false);
  const interactionPausedRef = useRef(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);

  const repeatedTechnologies = [...technologies, ...technologies, ...technologies];

  useGSAP(
    () => {
      const track = trackRef.current;
      const group = track?.firstElementChild;

      if (!track || !(group instanceof HTMLElement)) {
        return;
      }

      const mediaQuery = gsap.matchMedia();

      mediaQuery.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(track, { clearProps: "transform" });
      });

      mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = group.getBoundingClientRect().width;
        const duration = distance / 50;

        timelineRef.current = gsap.to(track, {
          x: -distance,
          duration,
          ease: "none",
          repeat: -1,
          paused: manuallyPausedRef.current || interactionPausedRef.current,
        });
      });

      return () => {
        timelineRef.current = null;
        mediaQuery.revert();
      };
    },
    { scope: rootRef, dependencies: [technologies.length] },
  );

  const pauseForInteraction = () => {
    interactionPausedRef.current = true;
    timelineRef.current?.pause();
  };

  const resumeAfterInteraction = () => {
    interactionPausedRef.current = false;
    if (!manuallyPausedRef.current) {
      timelineRef.current?.resume();
    }
  };

  const toggleManualPause = () => {
    const nextPaused = !manuallyPaused;
    manuallyPausedRef.current = nextPaused;
    setManuallyPaused(nextPaused);

    if (nextPaused) {
      timelineRef.current?.pause();
    } else if (!interactionPausedRef.current) {
      timelineRef.current?.resume();
    }
  };

  return (
    <section
      ref={rootRef}
      className="relative min-w-0 overflow-hidden rounded-xl border border-border bg-surface"
      aria-label="Tecnologias utilizadas"
      onMouseEnter={pauseForInteraction}
      onMouseLeave={resumeAfterInteraction}
      onFocus={pauseForInteraction}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          resumeAfterInteraction();
        }
      }}
    >
      <div className="flex min-h-20 items-center gap-6 px-4 sm:px-6">
        <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary">
          stack.log
        </span>
        <div className="relative min-w-0 flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-surface to-transparent" />
          <div
            ref={trackRef}
            aria-hidden="true"
            inert
            className="flex w-max motion-reduce:flex-wrap motion-reduce:w-full"
          >
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                className="flex min-w-max items-center motion-reduce:min-w-0 motion-reduce:flex-wrap"
              >
                {repeatedTechnologies.map((technology, technologyIndex) => (
                  <span
                    key={`${groupIndex}-${technology}-${technologyIndex}`}
                    className="whitespace-nowrap border-l border-border px-5 py-1 text-sm text-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={toggleManualPause}
          aria-pressed={manuallyPaused}
          className="min-h-6 shrink-0 rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
          {manuallyPaused ? "Retomar animação" : "Pausar animação"}
        </button>
      </div>
      <ul className="sr-only">
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    </section>
  );
}
