"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function HeroSky() {
  const root = useRef<HTMLDivElement>(null);
  const meteor = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const sky = root.current;
    const shootingStar = meteor.current;
    if (!sky || !shootingStar) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let visible = false;
      let meteorTimer = 0;
      let flight: gsap.core.Timeline | undefined;

      const scheduleMeteor = () => {
        meteorTimer = window.setTimeout(() => {
          if (!visible || document.hidden) return;
          const width = sky.clientWidth;
          const height = sky.clientHeight;
          flight = gsap.timeline({ onComplete: scheduleMeteor })
            .set(shootingStar, { x: width * 0.17, y: height * 0.23, opacity: 0 })
            .to(shootingStar, { x: width * 0.73, y: height * 0.69, duration: 0.68, ease: "none" })
            .to(shootingStar, { opacity: 1, duration: 0.13 }, 0)
            .to(shootingStar, { opacity: 0, duration: 0.24 }, 0.44);
        }, gsap.utils.random(12000, 20000));
      };
      const sync = () => {
        window.clearTimeout(meteorTimer);
        if (visible && !document.hidden) {
          if (!flight?.isActive()) scheduleMeteor();
        } else {
          flight?.kill();
          shootingStar.style.opacity = "0";
        }
      };

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(sky);
      document.addEventListener("visibilitychange", sync);

      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
        window.clearTimeout(meteorTimer);
        flight?.kill();
        shootingStar.removeAttribute("style");
      };
    }, sky);
    return () => media.revert();
  }, []);

  return (
    <div className="hero-sky" ref={root} aria-hidden="true">
      <svg className="shooting-star" ref={meteor} viewBox="0 0 24 14" shapeRendering="crispEdges">
        <path d="M0 0h7v2H0z M6 2h8v2H6z M12 4h7v3h-7z" fill="var(--shadow)" />
        <path d="M15 5h6v3h-6z M18 8h5v3h-5z" fill="var(--accent)" />
        <path d="M20 10h4v4h-4z" fill="var(--ink)" />
      </svg>
    </div>
  );
}
