"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ProjectsGallery({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = section.current;
    const panel = root?.querySelector<HTMLElement>(".projects-panel");
    const viewport = root?.querySelector<HTMLElement>(".projects-viewport");
    const track = root?.querySelector<HTMLElement>(".projects-track");
    if (!root || !panel || !viewport || !track) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 960px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)", () => {
      viewport.dataset.layout = "";
      const overflow = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      let animation: gsap.Context | undefined;
      let trigger: ScrollTrigger | undefined;

      const sync = () => {
        if (overflow() > 0 && panel.offsetHeight <= window.innerHeight - 64 + 1) {
          if (!animation) {
            viewport.dataset.horizontal = "";
            animation = gsap.context(() => {
              trigger = gsap.to(track, {
                x: () => -overflow(),
                ease: "none",
                scrollTrigger: {
                  id: "projects-gallery",
                  trigger: root,
                  pin: panel,
                  start: "top 64px",
                  end: () => `+=${overflow()}`,
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }).scrollTrigger;
            }, root);
          }
          ScrollTrigger.refresh();
        } else if (animation) {
          animation.revert();
          animation = undefined;
          trigger = undefined;
          delete viewport.dataset.horizontal;
          ScrollTrigger.refresh();
        }
      };

      let focusFrame = 0;
      const revealFocusedCard = (event: FocusEvent) => {
        const card = (event.target as HTMLElement).closest<HTMLElement>(".project-card");
        if (!card || !trigger) return;
        cancelAnimationFrame(focusFrame);
        // Let the browser finish its native focus scroll before positioning the track.
        focusFrame = requestAnimationFrame(() => {
          if (!trigger || !card.contains(document.activeElement)) return;
          const bounds = card.getBoundingClientRect();
          const frame = viewport.getBoundingClientRect();
          if (
            bounds.left >= frame.left - 1 && bounds.right <= frame.right + 1
            && bounds.top >= 64 && bounds.bottom <= window.innerHeight
          ) return;

          const distance = gsap.utils.clamp(1, Math.max(1, overflow() - 1), card.offsetLeft);
          trigger.scroll(trigger.start + distance);
          ScrollTrigger.update();
        });
      };

      const observer = new ResizeObserver(sync);
      observer.observe(viewport);
      observer.observe(panel);
      observer.observe(track);
      window.addEventListener("resize", sync);
      track.addEventListener("focusin", revealFocusedCard);
      sync();

      return () => {
        cancelAnimationFrame(focusFrame);
        observer.disconnect();
        window.removeEventListener("resize", sync);
        track.removeEventListener("focusin", revealFocusedCard);
        animation?.revert();
        delete viewport.dataset.layout;
        delete viewport.dataset.horizontal;
      };
    }, root);

    return () => media.revert();
  }, []);

  return <section ref={section} id="projects" className="projects" aria-labelledby="projects-title">{children}</section>;
}
