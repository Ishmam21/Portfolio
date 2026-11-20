"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap } from "gsap";
import { skillCategories } from "../skills";
import { PixelText } from "./pixel-text";
import { SkillIcon } from "./skill-icon";

export function SkillsMenu() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const previous = useRef(0);
  const tablist = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const positioned = useRef(false);

  useLayoutEffect(() => {
    const container = tablist.current;
    const line = indicator.current;
    const tab = tabs.current[selected];
    if (!container || !line || !tab) return;

    const position = (animate: boolean) => {
      const tabBounds = tab.getBoundingClientRect();
      const containerBounds = container.getBoundingClientRect();
      gsap.killTweensOf(line);
      gsap.to(line, {
        x: tabBounds.left - containerBounds.left,
        y: tabBounds.top - containerBounds.top,
        scaleX: tabBounds.width,
        duration: animate && window.matchMedia("(prefers-reduced-motion: no-preference)").matches ? 0.35 : 0,
        ease: "power2.inOut",
      });
      positioned.current = true;
    };
    position(positioned.current);
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    const observer = new ResizeObserver(() => {
      if (width === container.offsetWidth && height === container.offsetHeight) return;
      width = container.offsetWidth;
      height = container.offsetHeight;
      position(false);
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
      gsap.killTweensOf(line);
    };
  }, [selected]);

  useEffect(() => {
    const menu = root.current;
    if (!menu) return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let visible = false;
    let timer = 0;

    const schedule = () => {
      window.clearTimeout(timer);
      if (!visible || document.hidden || !motion.matches || menu.matches(":hover, :focus-within")) return;
      timer = window.setTimeout(() => setSelected((current) => (current + 1) % skillCategories.length), 3000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }, { threshold: 0.25 });
    observer.observe(menu);
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", schedule);
    menu.addEventListener("pointerenter", schedule);
    menu.addEventListener("pointerleave", schedule);
    menu.addEventListener("focusin", schedule);
    menu.addEventListener("focusout", schedule);
    schedule();
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      motion.removeEventListener("change", schedule);
      menu.removeEventListener("pointerenter", schedule);
      menu.removeEventListener("pointerleave", schedule);
      menu.removeEventListener("focusin", schedule);
      menu.removeEventListener("focusout", schedule);
    };
  }, [selected]);

  useLayoutEffect(() => {
    if (previous.current === selected) return;
    previous.current = selected;
    if (!root.current || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const panel = root.current.querySelector<HTMLElement>('[role="tabpanel"][aria-hidden="false"]');
    if (!panel) return;
    const context = gsap.context(() => {
      gsap.fromTo(panel, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out", clearProps: "transform,opacity" });
    }, root);
    return () => context.revert();
  }, [selected]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = skillCategories.length;
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % count; break;
      case "ArrowLeft": next = (index + count - 1) % count; break;
      case "Home": next = 0; break;
      case "End": next = count - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="hero-bottomline" ref={root}>
      <div className="skills-tabs" role="tablist" aria-label="Skills" ref={tablist}>
        <span className="skills-indicator" ref={indicator} aria-hidden="true" />
        {skillCategories.map(({ label }, index) => (
          <button
            type="button"
            role="tab"
            key={label}
            ref={(tab) => { tabs.current[index] = tab; }}
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            <span className="skill-pointer" aria-hidden="true" />
            <PixelText text={label} />
          </button>
        ))}
      </div>
      <div className="skills-panels">
        {skillCategories.map(({ label, tools }, index) => (
            <div
              className="skills-panel"
              key={label}
              role="tabpanel"
              id={`${id}-panel-${index}`}
              aria-labelledby={`${id}-tab-${index}`}
              aria-hidden={selected !== index}
              inert={selected !== index}
              tabIndex={selected === index ? 0 : -1}
            >
              <ul className="skill-tools">
                {tools.map((tool, toolIndex) => (
                  <li key={tool}>
                    <SkillIcon tool={tool} />
                    <span>{tool}</span>
                    {toolIndex < tools.length - 1 && <span className="skill-separator" aria-hidden="true">·</span>}
                  </li>
                ))}
              </ul>
            </div>
        ))}
      </div>
    </div>
  );
}
