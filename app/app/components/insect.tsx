"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { insectPath, insectRaisedPath, insectViewBox } from "./banner-art";

export function Insect() {
  const follow = useRef<HTMLDivElement>(null);
  const drift = useRef<HTMLDivElement>(null);
  const reaction = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 960px)",
    }, ({ conditions }) => {
      const flyer = follow.current;
      const sprite = drift.current;
      const tilt = reaction.current;
      const hero = flyer?.closest(".hero");
      if (!conditions?.motion || !flyer || !sprite || !tilt || !hero) return;

      const desktop = conditions.desktop;
      if (desktop) flyer.dataset.followsScroll = "";
      const setPosition = gsap.quickSetter(flyer, "y", "px");
      const phase = { turn: 0 };
      const x = gsap.quickSetter(sprite, "x", "px");
      const y = gsap.quickSetter(sprite, "y", "px");
      const rotation = gsap.quickSetter(sprite, "rotation", "deg");
      const hover = desktop ? gsap.to(phase, {
        turn: Math.PI * 2,
        duration: 8,
        ease: "none",
        repeat: -1,
        paused: true,
        onUpdate: () => {
          x(10 * Math.sin(2 * phase.turn));
          y(19 * Math.sin(phase.turn));
          rotation(7 * Math.sin(2 * phase.turn));
        },
      }) : undefined;

      let visible = false;
      let maxScroll = 0;
      let travel = 0;
      let position = 0;
      let ticking = false;

      const stop = () => {
        gsap.ticker.remove(tick);
        ticking = false;
      };

      function tick(_time: number, elapsed: number) {
        const scroll = window.scrollY;
        const gallery = ScrollTrigger.getById("projects-gallery");
        const pinDistance = gallery ? Math.max(0, gallery.end - gallery.start) : 0;
        const throughGallery = gallery ? gsap.utils.clamp(0, pinDistance, scroll - gallery.start) : 0;
        const inGallery = !!gallery && scroll >= gallery.start && scroll <= gallery.end;
        hover?.paused(inGallery);

        // Ignore the extra scroll distance used by the horizontal gallery.
        const verticalRange = Math.max(1, maxScroll - pinDistance);
        const progress = gsap.utils.clamp(0, 1, (scroll - throughGallery) / verticalRange);
        const target = progress * travel;
        position += (target - position) * (1 - Math.exp(-Math.min(elapsed, 50) / 110));
        if (Math.abs(target - position) < 0.1) {
          position = target;
          stop();
        }
        setPosition(position);
      }

      const wake = () => {
        if (!desktop || ticking || document.hidden) return;
        ticking = true;
        gsap.ticker.add(tick);
      };

      const measure = () => {
        maxScroll = ScrollTrigger.maxScroll(window);
        travel = Math.max(0, Math.min(
          window.innerHeight * 0.46,
          window.innerHeight - flyer.offsetTop - flyer.offsetHeight - 32,
        ));
        wake();
      };

      let lean: gsap.core.Tween | undefined;
      let lastReaction = -Infinity;
      const react = (event: Event) => {
        if (!visible || document.hidden || performance.now() - lastReaction < 900) return;
        const star = (event as CustomEvent<{ x: number; y: number }>).detail;
        const bounds = tilt.getBoundingClientRect();
        const dx = star.x - bounds.left - bounds.width / 2;
        const dy = star.y - bounds.top - bounds.height / 2;
        if (Math.hypot(dx, dy) > 235) return;

        lastReaction = performance.now();
        lean = gsap.to(tilt, {
          keyframes: [
            { rotation: Math.sign(dx) * 13, duration: .16, ease: "power2.out" },
            { rotation: 0, duration: .4, ease: "power2.inOut" },
          ],
        });
      };

      const sync = () => {
        const active = visible && !document.hidden;
        hero.toggleAttribute("data-hero-paused", !active);
        flyer.toggleAttribute("data-wave-paused", document.hidden || (!desktop && !visible));
        if (!active) lean?.progress(1).kill();
        if (document.hidden) {
          hover?.pause();
          stop();
        } else {
          wake();
        }
      };

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(hero);
      hero.addEventListener("sky-sparkle", react);
      document.addEventListener("visibilitychange", sync);
      if (desktop) {
        window.addEventListener("scroll", wake, { passive: true });
        ScrollTrigger.addEventListener("refresh", measure);
        measure();
      }
      sync();

      return () => {
        stop();
        observer.disconnect();
        hero.removeEventListener("sky-sparkle", react);
        document.removeEventListener("visibilitychange", sync);
        window.removeEventListener("scroll", wake);
        ScrollTrigger.removeEventListener("refresh", measure);
        lean?.kill();
        delete flyer.dataset.followsScroll;
        delete flyer.dataset.wavePaused;
        hero.removeAttribute("data-hero-paused");
        flyer.style.removeProperty("transform");
        sprite.style.removeProperty("transform");
        tilt.style.removeProperty("transform");
      };
    }, follow);
    return () => media.revert();
  }, []);

  return (
    <div className="insect-follow" ref={follow} aria-hidden="true">
      <div className="insect-drift" ref={drift}>
        <div className="insect-reaction" ref={reaction}>
          <div className="insect-entrance">
          <svg viewBox={insectViewBox} shapeRendering="crispEdges">
            <path className="insect-frame" d={insectPath} fill="var(--accent)" />
            <path className="insect-frame insect-frame-raised" d={insectRaisedPath} fill="var(--accent)" />
          </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
