"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { portfolio } from "../content";

function TypedText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => (
          <span className="type-word" key={wordIndex}>
            {Array.from(word).map((character, characterIndex) => (
              <span className="type-character" data-character key={characterIndex}>
                {character}
              </span>
            ))}
          </span>
        ))}
      </span>
    </>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const characters = Array.from(
      root.current?.querySelectorAll<HTMLElement>("[data-character]") ?? [],
    );
    if (!characters.length) return;

    const showAll = () => {
      characters.forEach((character) => {
        character.style.removeProperty("opacity");
        character.removeAttribute("data-cursor");
      });
    };
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      let tween: gsap.core.Tween | undefined;
      let watchdog: ReturnType<typeof setTimeout> | undefined;
      try {
        const progress = { count: 0 };
        let revealed = 0;
        gsap.set(characters, { opacity: 0 });
        characters[0].setAttribute("data-cursor", "before");

        tween = gsap.to(progress, {
          count: characters.length,
          duration: characters.length * 0.012,
          ease: "none",
          snap: { count: 1 },
          onUpdate: () => {
            const count = Math.min(characters.length, progress.count);
            if (count === revealed) return;
            characters[Math.max(0, revealed - 1)].removeAttribute("data-cursor");
            for (let i = revealed; i < count; i++) {
              characters[i].style.opacity = "1";
            }
            revealed = count;
            if (count > 0) characters[count - 1].setAttribute("data-cursor", "after");
          },
          onComplete: showAll,
          onInterrupt: showAll,
        });
        watchdog = setTimeout(() => {
          tween?.kill();
          showAll();
        }, characters.length * 12 + 800);
      } catch {
        tween?.kill();
        showAll();
      }

      return () => {
        clearTimeout(watchdog);
        showAll();
      };
    });

    return () => {
      media.revert();
      showAll();
    };
  }, []);

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero-topline" aria-hidden="true">
        <span className="hero-label"><span className="status-indicator" />Personal portfolio</span>
      </div>

      <div className="hero-body">
        <svg className="terminal-prompt" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="m7 9 9 9-9 9M21 27h9" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </svg>
        <div className="hero-copy">
          <p className="hero-greeting">Hello, I’m</p>
          <h1 id="hero-title"><TypedText text={portfolio.name} /></h1>
          <p className="hero-role"><TypedText text={portfolio.role} /></p>
          <p className="hero-intro"><TypedText text={portfolio.introduction} /></p>
        </div>
      </div>

      <div className="hero-bottomline" aria-hidden="true">
        <span>Software <span className="topic-divider">/</span> Machine learning <span className="topic-divider">/</span> AI</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M5 2H2v14h3m8-14h3v14h-3M7 9h4" stroke="currentColor" />
        </svg>
      </div>
    </section>
  );
}
