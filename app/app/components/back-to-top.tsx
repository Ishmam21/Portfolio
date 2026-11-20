"use client";

import type { MouseEvent } from "react";
import { PixelText } from "./pixel-text";

export function scrollToTop(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  const { pathname, search, hash } = window.location;
  if (hash) window.history.pushState(window.history.state, "", pathname + search);
  document.getElementById("home")?.focus({ preventScroll: true });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
}

export function BackToTop() {
  return (
    <a className="footer-top" href="#home" onClick={scrollToTop}>
      <span className="footer-arrow" aria-hidden="true">↑</span>
      <PixelText text="Back to top" />
    </a>
  );
}
