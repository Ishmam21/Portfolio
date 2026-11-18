"use client";

import type { MouseEvent } from "react";
import { portfolio } from "../content";
import { PixelText } from "./pixel-text";

function navigate(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const hash = event.currentTarget.hash;
  const section = document.getElementById(hash.slice(1));
  if (!section) return;

  event.preventDefault();
  if (window.location.hash !== hash) history.pushState(null, "", hash);
  section.focus({ preventScroll: true });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
}

export function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <span className="pixel-square" aria-hidden="true" />
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {portfolio.navigation.map(({ label, href }) => (
              <li key={href}><a href={href} onClick={navigate}><PixelText text={label} /></a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
