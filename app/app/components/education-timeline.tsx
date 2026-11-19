"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function EducationTimeline({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const timeline = root.current;
    const fill = rail.current;
    if (!timeline || !fill) return;
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const markers = Array.from(timeline.querySelectorAll<HTMLElement>(".education-marker"));
      const setProgress = gsap.quickSetter(fill, "scaleY");
      let stops: number[] = [];

      const measure = () => {
        const top = timeline.getBoundingClientRect().top;
        const centers = markers.map((marker) => {
          const { top: markerTop, height } = marker.getBoundingClientRect();
          return markerTop + height / 2 - top;
        });
        const first = centers[0] ?? 0;
        const length = (centers.at(-1) ?? first) - first;
        timeline.style.setProperty("--education-rail-top", `${first}px`);
        timeline.style.setProperty("--education-rail-height", `${length}px`);
        stops = centers.map((center) => length ? (center - first) / length : 0);
      };

      const render = (progress: number) => {
        setProgress(progress);
        markers.forEach((marker, index) => {
          marker.toggleAttribute("data-reached", progress > 0 && progress >= stops[index]);
        });
      };

      measure();
      const trigger = ScrollTrigger.create({
        id: "education-timeline",
        trigger: timeline,
        start: "clamp(top 76%)",
        end: "clamp(bottom 56%)",
        onUpdate: ({ progress }) => render(progress),
        onRefresh: ({ progress }) => {
          measure();
          render(progress);
        },
      });
      render(trigger.progress);

      return () => {
        trigger.kill();
        fill.style.removeProperty("transform");
        timeline.style.removeProperty("--education-rail-top");
        timeline.style.removeProperty("--education-rail-height");
        markers.forEach((marker) => marker.removeAttribute("data-reached"));
      };
    }, timeline);
    return () => media.revert();
  }, []);

  return (
    <div className="education-timeline" ref={root}>
      <span className="education-rail" ref={rail} aria-hidden="true" />
      {children}
    </div>
  );
}
