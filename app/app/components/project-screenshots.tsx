"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectScreenshot } from "../projects";

export function ProjectScreenshots({ screenshots, title }: {
  screenshots: ProjectScreenshot[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const count = screenshots.length;
  const screenshot = screenshots[index];
  if (!screenshot) return null;

  function step(direction: number) {
    setIndex((current) => (current + direction + count) % count);
  }

  return (
    <div className="project-screenshots" role="group" aria-label={`${title} screenshots`}>
      <div className="screenshot-stage">
        {count > 1 && (
          <button className="screenshot-arrow" type="button" aria-label={`Previous ${title} screenshot`} onClick={() => step(-1)}>‹</button>
        )}
        <a className="project-photo" href={screenshot.src} target="_blank" rel="noreferrer" aria-label={`Open full-size screenshot: ${screenshot.alt}`}>
          <Image src={screenshot.src} alt={screenshot.alt} fill loading={index === 0 ? "eager" : "lazy"} sizes="(min-width: 960px) 55vw, 92vw" />
        </a>
        {count > 1 && (
          <button className="screenshot-arrow" type="button" aria-label={`Next ${title} screenshot`} onClick={() => step(1)}>›</button>
        )}
      </div>
      {count > 1 && (
        <p className="screenshot-count" aria-live="polite">
          {index + 1} / {count}
          <span className="sr-only">. {screenshot.alt}</span>
        </p>
      )}
    </div>
  );
}
