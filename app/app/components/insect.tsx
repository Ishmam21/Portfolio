"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { insectPath, insectRaisedPath, insectViewBox } from "./banner-art";

export function Insect() {
  const follow = useRef<HTMLDivElement>(null);
  const drift = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
      const flyer = follow.current;
      const sprite = drift.current;
      if (!flyer || !sprite) return;

      flyer.dataset.followsScroll = "";
      const setPosition = gsap.quickSetter(flyer, "y", "px");
      const phase = { turn: 0 };
      const x = gsap.quickSetter(sprite, "x", "px");
      const y = gsap.quickSetter(sprite, "y", "px");
      const rotation = gsap.quickSetter(sprite, "rotation", "deg");

      const hover = gsap.to(phase, {
        turn: Math.PI * 2,
        duration: 8,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          x(10 * Math.sin(2 * phase.turn));
          y(19 * Math.sin(phase.turn));
          rotation(7 * Math.sin(2 * phase.turn));
        },
      });

      let maxScroll = 0;
      let travel = 0;
      const measure = () => {
        maxScroll = ScrollTrigger.maxScroll(window);
        travel = Math.max(0, Math.min(
          window.innerHeight * 0.46,
          window.innerHeight - flyer.offsetTop - flyer.offsetHeight - 32,
        ));
      };

      let position = 0;
      const tick = (_time: number, elapsed: number) => {
        const scroll = window.scrollY;
        const gallery = ScrollTrigger.getById("projects-gallery");
        const pinDistance = gallery ? Math.max(0, gallery.end - gallery.start) : 0;
        const throughGallery = gallery ? gsap.utils.clamp(0, pinDistance, scroll - gallery.start) : 0;
        const inGallery = !!gallery && scroll >= gallery.start && scroll <= gallery.end;
        if (hover.paused() !== inGallery) hover.paused(inGallery);

        // The horizontal scrub adds scroll distance without advancing the insect's route.
        const verticalRange = Math.max(1, maxScroll - pinDistance);
        const progress = gsap.utils.clamp(0, 1, (scroll - throughGallery) / verticalRange);
        const target = progress * travel;
        position += (target - position) * (1 - Math.exp(-Math.min(elapsed, 50) / 110));
        if (Math.abs(target - position) < 0.1) position = target;
        setPosition(position);
      };

      measure();
      ScrollTrigger.addEventListener("refresh", measure);
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        ScrollTrigger.removeEventListener("refresh", measure);
        delete flyer.dataset.followsScroll;
        flyer.style.removeProperty("transform");
        sprite.style.removeProperty("transform");
      };
    }, follow);
    return () => media.revert();
  }, []);

  return (
    <div className="insect-follow" ref={follow} aria-hidden="true">
      <div className="insect-drift" ref={drift}>
        <svg viewBox={insectViewBox} shapeRendering="crispEdges">
          <path className="insect-frame" d={insectPath} fill="var(--accent)" />
          <path className="insect-frame insect-frame-raised" d={insectRaisedPath} fill="var(--accent)" />
        </svg>
      </div>
    </div>
  );
}
