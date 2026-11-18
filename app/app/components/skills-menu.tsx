"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { skillCategories } from "../skills";
import { PixelText } from "./pixel-text";
import { SkillIcon } from "./skill-icon";

export function SkillsMenu() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

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
    <div className="hero-bottomline">
      <div className="skills-tabs" role="tablist" aria-label="Skills">
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
