"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectScreenshot } from "../projects";

export function ProjectScreenshots({ screenshots, title }: {
  screenshots: ProjectScreenshot[];
  title: string;
}) {
  const [{ current, requested, previous }, setFrames] = useState({
    current: 0,
    requested: 0,
    previous: null as number | null,
  });
  const count = screenshots.length;
  const screenshot = screenshots[current];
  if (!screenshot) return null;

  const frames = [...new Set([previous, current, requested])].filter((index) => index !== null);

  function step(direction: number) {
    setFrames((frames) => {
      const next = (frames.requested + direction + count) % count;
      if (next === frames.previous) {
        return { current: next, requested: next, previous: frames.current };
      }
      return { ...frames, requested: next };
    });
  }

  function showLoadedFrame(index: number) {
    setFrames((frames) => {
      if (index !== frames.requested || index === frames.current) return frames;
      return { current: index, requested: index, previous: frames.current };
    });
  }

  return (
    <div className="project-screenshots" role="group" aria-label={`${title} screenshots`}>
      <div className="screenshot-stage">
        {count > 1 && (
          <button className="screenshot-arrow" type="button" aria-label={`Previous ${title} screenshot`} onClick={() => step(-1)}>‹</button>
        )}
        <a className="project-photo" href={screenshot.src} target="_blank" rel="noreferrer" aria-label={`Open full-size screenshot: ${screenshot.alt}`}>
          {frames.map((index) => {
            const frame = screenshots[index];
            const active = index === current;
            return (
              <Image
                key={index}
                src={frame.src}
                alt={active ? frame.alt : ""}
                data-frame={active ? "active" : index === previous ? "outgoing" : "pending"}
                fill
                loading="eager"
                sizes="(min-width: 960px) 55vw, 92vw"
                onLoad={() => showLoadedFrame(index)}
                onAnimationEnd={() => setFrames((frames) =>
                  frames.previous === index ? { ...frames, previous: null } : frames,
                )}
              />
            );
          })}
        </a>
        {count > 1 && (
          <button className="screenshot-arrow" type="button" aria-label={`Next ${title} screenshot`} onClick={() => step(1)}>›</button>
        )}
      </div>
      {count > 1 && (
        <p className="screenshot-count" aria-live="polite">
          {current + 1} / {count}
          <span className="sr-only">. {screenshot.alt}</span>
        </p>
      )}
    </div>
  );
}
