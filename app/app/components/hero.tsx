"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { portfolio } from "../content";
import { headlinePaths, headlineCursor, headlineWidth } from "./banner-art";
import { PixelText } from "./pixel-text";

function TypedText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => /^\s+$/.test(word) ? word : (
          <span className="type-word" key={wordIndex}>
            {Array.from(word).map((character, index) => (
              <span className="type-character" data-letter key={index}>{character}</span>
            ))}
          </span>
        ))}
      </span>
    </>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const played = useRef(false);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!root.current) return;
      const glyphs = Array.from(root.current.querySelectorAll<SVGGElement>("[data-glyph]"));
      const letters = Array.from(root.current.querySelectorAll<HTMLElement>("[data-letter]"));
      const cursor = root.current.querySelector<SVGRectElement>(".headline-cursor");
      const lastLetter = letters.at(-1);
      if (!cursor || !lastLetter) return;
      if (played.current) {
        lastLetter.setAttribute("data-cursor", "");
        return () => lastLetter.removeAttribute("data-cursor");
      }

      const timeline = gsap.timeline({ onComplete: () => { played.current = true; } });
      gsap.set([...glyphs, ...letters], { opacity: 0 });
      gsap.set(cursor, { opacity: 1, attr: { x: 0 } });

      glyphs.forEach((glyph, index) => {
        timeline.set(glyph, { opacity: 1 }, 0.045 + index * 0.055)
          .set(cursor, { attr: { x: headlineCursor[index] } }, 0.045 + index * 0.055);
      });

      let active: HTMLElement | undefined;
      const clearCursor = () => active?.removeAttribute("data-cursor");
      timeline.set(cursor, { opacity: 0 }, 0.39);
      letters.forEach((letter, index) => {
        const time = 0.39 + index * 0.008;
        timeline.set(letter, { opacity: 1 }, time).call(() => {
          clearCursor();
          active = letter;
          letter.setAttribute("data-cursor", "");
        }, [], time);
      });

      return clearCursor;
    }, root);

    return () => media.revert();
  }, []);

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero-body">
        <div className="hero-squares" aria-hidden="true"><i /><i /><i /></div>
        <h1 id="hero-title">
          <span className="sr-only">{portfolio.wordmark}</span>
          <svg className="headline" viewBox={`0 0 ${headlineWidth} 90`} shapeRendering="crispEdges" aria-hidden="true">
            {headlinePaths.map((path, index) => (
              <g key={index} data-glyph>
                <path d={path} fill="var(--shadow)" transform="translate(6 6)" />
                <path d={path} fill="var(--ink)" />
              </g>
            ))}
            <rect className="headline-cursor blink" x={headlineCursor.at(-1)} width="36" height="84" fill="var(--accent)" />
          </svg>
        </h1>
        <p className="hero-role"><TypedText text={portfolio.role} /></p>
        <p className="hero-intro"><TypedText text={portfolio.introduction} /></p>
      </div>
      <div className="hero-bottomline"><PixelText text={portfolio.topics} /></div>
    </section>
  );
}
