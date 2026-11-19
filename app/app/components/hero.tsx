"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { portfolio } from "../content";
import { headlinePaths, headlineWidth } from "./banner-art";
import { HeroSky } from "./hero-sky";
import { Insect } from "./insect";
import { PixelText } from "./pixel-text";
import { SkillsMenu } from "./skills-menu";

function TypedText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => /^\s+$/.test(word) ? word : (
          <span className="intro-word" key={wordIndex}>
            {Array.from(word).map((letter, index) => (
              <span className="intro-letter" data-intro-letter key={index}>{letter}</span>
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
    if (!root.current || played.current || window.scrollY > 50 || window.location.hash) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const hero = root.current;
      if (!hero) return;
      const signature = hero.querySelector<HTMLElement>(".signature-first");
      const glyphs = hero.querySelectorAll<SVGGElement>("[data-glyph]");
      const letters = Array.from(hero.querySelectorAll<HTMLElement>("[data-intro-letter]"));
      const caret = hero.querySelector<HTMLElement>(".hero-caret");
      const glyphCursor = hero.querySelector<SVGRectElement>(".glyph-cursor");
      const stars = document.querySelector<HTMLElement>(".page-starfield");
      const mascot = hero.querySelector<HTMLElement>(".insect-follow");
      const mascotEntrance = hero.querySelector<HTMLElement>(".insect-entrance");
      const surroundings = document.querySelectorAll<HTMLElement>(
        ".site-header, .hero-sky, .hero-bottomline, #about, #projects, #experience, #education, #contact, footer",
      );
      if (!signature || !caret || !glyphCursor || !letters.length) return;
      const timeline = gsap.timeline({ onComplete: () => { played.current = true; } });
      gsap.set([stars, mascot, ...surroundings], { autoAlpha: 0 });
      gsap.set(document.body, { "--background-stars-opacity": 0 });
      gsap.set(mascotEntrance, { y: -36 });
      gsap.set(signature, { clipPath: "inset(0 100% 0 0)" });
      gsap.set([...glyphs, ...letters, caret], { opacity: 0 });

      timeline.to(signature, { clipPath: "inset(0 0% 0 0)", duration: 0.38, ease: "steps(14)" });
      timeline.set(glyphCursor, { opacity: 1, attr: { x: 0 } });
      glyphs.forEach((glyph, index) => {
        const time = 0.38 + index * 0.055;
        timeline.set(glyph, { opacity: 1 }, time)
          .set(glyphCursor, { attr: { x: [48, 120, 192, 264, 336, 414][index] } }, time);
      });
      timeline.set(glyphCursor, { opacity: 0 }, 0.76);
      let active: HTMLElement | undefined;
      const clearCursor = () => active?.removeAttribute("data-intro-cursor");
      letters.forEach((letter, index) => {
        const time = 0.76 + index * 0.004;
        timeline.set(letter, { opacity: 1 }, time).call(() => {
          clearCursor();
          active = letter;
          letter.setAttribute("data-intro-cursor", "");
        }, [], time);
      });
      timeline.call(clearCursor).set(caret, { opacity: 1 })
        .to(stars, { autoAlpha: 1, duration: 0.35, ease: "power1.out" })
        .to(document.body, { "--background-stars-opacity": 1, duration: 0.35, ease: "power1.out" }, "<")
        .set(mascot, { autoAlpha: 1 })
        .to(mascotEntrance, { y: 0, duration: 0.4, ease: "power2.out" })
        .to(surroundings, { autoAlpha: 1, duration: 0.3, ease: "power1.out" });
      const reveal = () => {
        if (!timeline.isActive()) return;
        timeline.progress(1);
      };
      window.addEventListener("scroll", reveal, { passive: true });
      window.addEventListener("keydown", reveal);
      return () => {
        window.removeEventListener("scroll", reveal);
        window.removeEventListener("keydown", reveal);
        clearCursor();
      };
    }, root);
    return () => media.revert();
  }, []);

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <Insect />
      <div className="hero-body">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="sr-only">{portfolio.name}</span>
            <span className="signature-first" aria-hidden="true"><PixelText text={portfolio.givenNames} /></span>
            <svg className="headline" viewBox={`0 0 ${headlineWidth} 90`} shapeRendering="crispEdges" aria-hidden="true">
              {headlinePaths.map((path, index) => (
                <g key={index} data-glyph>
                  <path d={path} fill="var(--shadow)" transform="translate(6 6)" />
                  <path d={path} fill="var(--ink)" />
                </g>
              ))}
              <rect className="glyph-cursor" x="0" width="12" height="84" fill="var(--accent)" />
            </svg>
          </h1>
          <p className="hero-role"><TypedText text={portfolio.role} /></p>
          <p className="hero-intro">
            <TypedText text={portfolio.introduction} /><span className="hero-caret" aria-hidden="true" />
          </p>
        </div>
        <HeroSky />
      </div>
      <SkillsMenu />
    </section>
  );
}
