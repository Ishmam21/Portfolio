"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { portfolio } from "../content";

const iconPaths = {
  github: "M4 3h2v2h3V4h6v1h3V3h2v5h1v7h-2v2h-4v4h-3v-4H9v4H6v-2H4v-2H2v-2h3v2h4v-2H6v-2H4V8z M7 9v2h2V9z M15 9v2h2V9z",
  linkedin: "M3 3h18v18H3z M6 6v3h3V6z M6 11v7h3v-7z M11 11v7h3v-5h2v5h3v-6h-1v-1h-4v1h-1v-1z",
  facebook: "M3 3h18v18H3z M13 21v-7h3l1-3h-4V9h1V8h3V5h-4v1h-2v1h-1v4H7v3h3v7z",
};

export function ContactLinks() {
  const root = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const list = root.current;
    if (!list) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const icons = Array.from(list.querySelectorAll<HTMLElement>(".contact-social"));
      const cleanups = icons.map((link) => {
        const icon = link.querySelector("svg");
        if (!icon) return;
        const lift = gsap.to(icon, { y: -4, duration: 0.22, ease: "power2.out", paused: true });
        const sync = () => {
          if (link.matches(":hover, :focus-visible")) lift.play();
          else lift.reverse();
        };

        for (const event of ["pointerenter", "pointerleave", "focus", "blur"]) {
          link.addEventListener(event, sync);
        }

        return () => {
          for (const event of ["pointerenter", "pointerleave", "focus", "blur"]) {
            link.removeEventListener(event, sync);
          }
        };
      });

      return () => cleanups.forEach((cleanup) => cleanup?.());
    }, list);

    return () => media.revert();
  }, []);

  return (
    <ul className="contact-links" ref={root}>
      {portfolio.contact.map(({ icon, name, handle, href }) => (
        <li key={icon}>
          {icon === "email" ? (
            <a className="contact-email" href={href}>{handle}</a>
          ) : (
            <a className={`contact-social contact-${icon}`} href={href} aria-label={name}>
              <svg viewBox="0 0 24 24" shapeRendering="crispEdges" aria-hidden="true">
                <path d={iconPaths[icon]} fill="currentColor" fillRule="evenodd" />
              </svg>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
