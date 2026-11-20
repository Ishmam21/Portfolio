"use client";

import type { MouseEvent } from "react";
import { portfolio } from "../content";
import { scrollToTop } from "./back-to-top";
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
        <svg className="nav-prompt" viewBox="0 0 16 10" shapeRendering="crispEdges" aria-hidden="true">
          <path fill="currentColor" d="M0 0h2v2h2v2h2v2H4v2H2v2H0V8h2V6h2V4H2V2H0z M8 8h8v2H8z" />
        </svg>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {portfolio.navigation.map(({ label, href }) => (
              <li key={href}><a href={href} onClick={href === "#home" ? scrollToTop : navigate}><PixelText text={label} /></a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
