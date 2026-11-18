"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const rowHeight = 54;
const glowRadius = 136;
const nearbyRows = Math.ceil(glowRadius / rowHeight);

function jitter(row: number, column: number, seed: number) {
  const value = Math.sin(row * 95.37 + column * 19.19 + seed) * 43758.5453;
  return value - Math.floor(value);
}

type Star = { element: HTMLSpanElement; x: number; y: number };
type Point = { x: number; y: number };

function isContent(target: Element | null) {
  return target?.closest("header, a, button, input, select, textarea, .hero-copy, .skills-panels, .project-card, .content-section p, .content-section h2, .content-section h3");
}

export function PageStarfield() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = root.current;
    if (!field) return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let rows: Star[][] = [];
    let columns = 0;
    let pinStart = Infinity;
    let pinEnd = Infinity;
    let pinDistance = 0;
    let previousTop: number | undefined;
    let wasLocked = false;
    let pointer: Point | undefined;
    let touch: (Point & { id: number }) | undefined;
    let touching = false;
    let frame = 0;
    let touchTimer = 0;
    let lit = new Set<HTMLSpanElement>();
    let lastSparkle: HTMLSpanElement | undefined;

    const fade = (star: HTMLSpanElement) => {
      star.style.removeProperty("--starlight");
      star.removeAttribute("data-lit");
      star.removeAttribute("data-sparkle");
    };

    const paint = () => {
      frame = 0;
      const position = pointer;
      const next = new Set<HTMLSpanElement>();
      if (position) {
        const bounds = field.getBoundingClientRect();
        const localY = position.y - bounds.top;
        const row = Math.floor(localY / rowHeight);
        const nearby = rows.slice(Math.max(0, row - nearbyRows), row + nearbyRows + 1).flat().flatMap((star) => {
          const x = bounds.left + star.x * bounds.width;
          const y = bounds.top + star.y;
          const distance = Math.hypot(position.x - x, position.y - y);
          if (distance >= glowRadius) return [];
          const target = document.elementFromPoint(x, y);
          return target && !isContent(target) ? [{ ...star, x, y, distance }] : [];
        }).sort((a, b) => a.distance - b.distance);
        const sparkleRadius = touching ? 84 : 64;
        for (const [index, star] of nearby.entries()) {
          const intensity = Math.pow(1 - star.distance / glowRadius, 0.7);
          star.element.style.setProperty("--starlight", intensity.toFixed(2));
          star.element.setAttribute("data-lit", "");
          star.element.toggleAttribute("data-sparkle", index < 2 && star.distance < sparkleRadius);
          next.add(star.element);
        }
        const closest = nearby[0];
        if (closest && closest.distance < sparkleRadius) {
          if (closest.element !== lastSparkle) {
            document.querySelector(".hero")?.dispatchEvent(
              new CustomEvent("sky-sparkle", { detail: { x: closest.x, y: closest.y } }),
            );
          }
          lastSparkle = closest.element;
        } else {
          lastSparkle = undefined;
        }
      } else {
        lastSparkle = undefined;
      }
      for (const star of lit) if (!next.has(star)) fade(star);
      lit = next;
    };

    const queuePaint = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const clear = () => {
      pointer = undefined;
      touching = false;
      queuePaint();
    };

    const positionField = () => {
      const scroll = window.scrollY;
      const locked = pinDistance > 0 && scroll >= pinStart && scroll <= pinEnd;
      const top = locked ? -pinStart : scroll > pinEnd ? pinDistance : 0;

      // Pin the background to the viewport until the vertical page scroll resumes.
      if (top !== previousTop) field.style.setProperty("--starfield-top", `${top}px`);
      if (locked !== wasLocked) field.toggleAttribute("data-locked", locked);
      previousTop = top;
      wasLocked = locked;
    };

    const measure = () => {
      const gallery = ScrollTrigger.getById("projects-gallery");
      pinStart = gallery?.start ?? Infinity;
      pinEnd = gallery?.end ?? Infinity;
      pinDistance = gallery ? Math.max(0, pinEnd - pinStart) : 0;
      const height = Math.max(0, document.body.clientHeight - pinDistance);
      field.style.setProperty("--starfield-height", `${height}px`);
      positionField();

      const count = Math.ceil(height / rowHeight);
      const width = Math.max(3, Math.round(field.clientWidth / 72));
      if (columns === width && rows.length === count) return;
      columns = width;
      const content = document.createDocumentFragment();
      rows = Array.from({ length: count }, (_, row) => Array.from({ length: columns }, (_, column) => {
        const x = (column + 0.12 + jitter(row, column, 4) * 0.76) / columns;
        const y = (row + 0.17 + jitter(row, column, 17) * 0.66) * rowHeight;
        const element = document.createElement("span");
        element.className = "sky-star";
        element.style.left = `${x * 100}%`;
        element.style.top = `${y}px`;
        content.append(element);
        return { element, x, y };
      }));
      field.replaceChildren(content);
      if (pointer) queuePaint();
    };

    const canReact = () => motion.matches && !document.hidden;
    const move = (event: PointerEvent) => {
      if (!canReact() || event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      queuePaint();
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget && !touching) clear();
    };
    const scroll = () => {
      positionField();
      if (pointer && canReact()) queuePaint();
    };
    const startTouch = (event: PointerEvent) => {
      if (canReact() && event.pointerType === "touch" && !isContent(event.target as Element)) {
        touch = { id: event.pointerId, x: event.clientX, y: event.clientY };
      }
    };
    const endTouch = (event: PointerEvent) => {
      const start = touch;
      touch = undefined;
      if (!canReact() || !start || event.pointerId !== start.id
        || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) return;
      pointer = { x: event.clientX, y: event.clientY };
      touching = true;
      queuePaint();
      window.clearTimeout(touchTimer);
      touchTimer = window.setTimeout(clear, 170);
    };
    const cancelTouch = () => { touch = undefined; };

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    ScrollTrigger.addEventListener("refresh", measure);
    measure();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("pointerdown", startTouch, { passive: true });
    window.addEventListener("pointerup", endTouch, { passive: true });
    window.addEventListener("pointercancel", cancelTouch);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", clear);
    motion.addEventListener("change", clear);

    return () => {
      observer.disconnect();
      ScrollTrigger.removeEventListener("refresh", measure);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("pointerdown", startTouch);
      window.removeEventListener("pointerup", endTouch);
      window.removeEventListener("pointercancel", cancelTouch);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", clear);
      motion.removeEventListener("change", clear);
      cancelAnimationFrame(frame);
      window.clearTimeout(touchTimer);
      field.removeAttribute("data-locked");
      field.style.removeProperty("--starfield-height");
      field.style.removeProperty("--starfield-top");
      field.replaceChildren();
    };
  }, []);

  return <div className="page-starfield" ref={root} aria-hidden="true" />;
}
