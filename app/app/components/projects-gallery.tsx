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
    const progress = root?.querySelector<HTMLElement>(".projects-progress span");
    if (!root || !panel || !viewport || !track || !progress) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let trigger: ScrollTrigger | undefined;
    let revealProjectHash: (() => void) | undefined;
    media.add("(min-width: 960px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)", () => {
      viewport.dataset.layout = "";
      const overflow = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const pauseDistance = () => Math.round(window.innerHeight * 0.25);
      let animation: gsap.Context | undefined;
      let stops: { card: HTMLElement; x: number; start: number; end: number }[] = [];
      let scrollDistance = 0;
      let travel = 0;

      const sync = () => {
        if (overflow() > 0 && panel.offsetHeight <= window.innerHeight + 1) {
          if (!animation) {
            viewport.dataset.horizontal = "";
            animation = gsap.context(() => {
              gsap.set(track, { x: 0, force3D: true });
              gsap.set(progress, { scaleX: 0 });
              const setTrack = gsap.quickSetter(track, "x", "px");
              const setProgress = gsap.quickSetter(progress, "scaleX");

              const measure = () => {
                travel = overflow();
                const hold = pauseDistance();
                stops = Array.from(track.querySelectorAll<HTMLElement>(".project-card")).map((card, index) => {
                  const x = Math.min(travel, card.offsetLeft);
                  const start = x + index * hold;
                  return { card, x, start, end: start + hold };
                });
                scrollDistance = travel + stops.length * hold;
                return `+=${scrollDistance}`;
              };

              const playhead = { progress: 0 };
              const render = () => {
                const distance = playhead.progress * scrollDistance;
                let x = 0;
                for (const stop of stops) {
                  if (distance < stop.start) {
                    const span = stop.x - x;
                    const fraction = 1 - (stop.start - distance) / span;
                    x += span * (1 - Math.cos(Math.PI * fraction)) / 2;
                    break;
                  }
                  x = stop.x;
                  if (distance <= stop.end) break;
                }
                setTrack(-x);
                setProgress(travel ? x / travel : 0);
              };

              const motion = gsap.to(playhead, {
                progress: 1,
                ease: "none",
                paused: true,
                onUpdate: render,
              });
              trigger = ScrollTrigger.create({
                animation: motion,
                scrub: 0.22,
                anticipatePin: 1,
                id: "projects-gallery",
                trigger: root,
                pin: panel,
                start: "top top",
                end: measure,
                onRefresh: (self) => {
                  motion.progress(self.progress);
                  render();
                },
              });
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

      const scrollToCard = (card: HTMLElement) => {
        const stop = stops.find((entry) => entry.card === card);
        if (!trigger || !stop) return;
        trigger.scroll(trigger.start + (stop.start + stop.end) / 2);
        ScrollTrigger.update();
        trigger.getTween()?.progress(1);
      };

      const cardFromHash = (hash: string) => {
        const card = document.getElementById(hash.slice(1));
        return card && track.contains(card) && card.matches(".project-card") ? card : null;
      };

      const revealHash = () => {
        const card = cardFromHash(window.location.hash);
        if (card) scrollToCard(card);
      };

      revealProjectHash = revealHash;

      const openCard = (event: MouseEvent) => {
        if (!trigger || event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#project-"]');
        const card = link && cardFromHash(link.hash);
        if (!card) return;

        event.preventDefault();
        if (window.location.hash !== link.hash) history.pushState(null, "", link.hash);
        scrollToCard(card);
        card.focus({ preventScroll: true });
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

          scrollToCard(card);
        });
      };

      const observer = new ResizeObserver(sync);
      observer.observe(viewport);
      observer.observe(panel);
      observer.observe(track);
      window.addEventListener("resize", sync);
      track.addEventListener("focusin", revealFocusedCard);
      document.addEventListener("click", openCard);
      window.addEventListener("hashchange", revealHash);
      sync();

      return () => {
        revealProjectHash = undefined;
        cancelAnimationFrame(focusFrame);
        document.removeEventListener("click", openCard);
        window.removeEventListener("hashchange", revealHash);
        observer.disconnect();
        window.removeEventListener("resize", sync);
        track.removeEventListener("focusin", revealFocusedCard);
        animation?.revert();
        trigger = undefined;
        delete viewport.dataset.layout;
        delete viewport.dataset.horizontal;
      };
    }, root);

    const scrollKey = "portfolio:reload-scroll";
    const saveScroll = () => {
      const top = window.scrollY;
      let afterProjects: number | undefined;
      let galleryProgress: number | undefined;
      if (trigger && top >= trigger.start) {
        if (top > trigger.end) afterProjects = top - trigger.end;
        else galleryProgress = (top - trigger.start) / (trigger.end - trigger.start);
      }

      try {
        sessionStorage.setItem(scrollKey, JSON.stringify({
          url: window.location.href,
          top,
          afterProjects,
          galleryProgress,
        }));
      } catch {
        // Keep native scroll restoration when storage is blocked.
      }
    };
    let savedWhileHidden = false;
    const saveOnHide = () => {
      savedWhileHidden = document.hidden;
      if (savedWhileHidden) saveScroll();
    };
    const saveOnLeave = () => {
      if (!savedWhileHidden) saveScroll();
    };
    document.addEventListener("visibilitychange", saveOnHide);
    window.addEventListener("pagehide", saveOnLeave);

    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = navigation ? navigation.type === "reload" : performance.navigation?.type === 1;
    let restoreFrame = 0;

    const restoreScroll = () => {
      let saved: { url: string; top: number; afterProjects?: number; galleryProgress?: number } | null = null;
      if (isReload) {
        try {
          saved = JSON.parse(sessionStorage.getItem(scrollKey) ?? "null");
          sessionStorage.removeItem(scrollKey);
        } catch {
          // A saved position is optional.
        }
      }

      if (saved?.url === window.location.href && Number.isFinite(saved.top)) {
        let top = saved.top;
        if (trigger && typeof saved.afterProjects === "number") {
          top = trigger.end + saved.afterProjects;
        } else if (trigger && typeof saved.galleryProgress === "number") {
          top = trigger.start + saved.galleryProgress * (trigger.end - trigger.start);
        }
        window.scrollTo({ top, behavior: "instant" });
        return;
      }

      const target = document.getElementById(window.location.hash.slice(1));
      if (trigger && target?.matches("section") && (root.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING)) {
        // The browser may have followed the link before the pin added its spacer.
        target.scrollIntoView({ behavior: "instant", block: "start" });
        return;
      }

      revealProjectHash?.();
    };

    const scheduleRestore = () => {
      restoreFrame = requestAnimationFrame(restoreScroll);
    };
    // A reload can restore scroll against the unpinned page during loading.
    // Apply the saved position after the browser finishes that restoration.
    if (isReload && document.readyState !== "complete") {
      window.addEventListener("pageshow", scheduleRestore, { once: true });
    } else {
      scheduleRestore();
    }

    return () => {
      window.removeEventListener("pageshow", scheduleRestore);
      cancelAnimationFrame(restoreFrame);
      window.removeEventListener("pagehide", saveOnLeave);
      document.removeEventListener("visibilitychange", saveOnHide);
      media.revert();
    };
  }, []);

  return <section ref={section} id="projects" tabIndex={-1} className="projects" aria-labelledby="projects-title">{children}</section>;
}
