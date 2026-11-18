import Image from "next/image";
import type { Project } from "../projects";

export function ProjectCard({ project }: { project: Project }) {
  const { title, description, stack, screenshot, github, live } = project;

  return (
    <article className="project-card" tabIndex={0} aria-label={title}>
      <div className="project-media">
        {screenshot ? (
          <Image src={screenshot.src} alt={screenshot.alt} fill sizes="(min-width: 960px) 440px, 90vw" />
        ) : (
          <div className="screenshot-placeholder">
            <span className="placeholder-icon" aria-hidden="true"><i /><i /><i /></span>
            <span>Screenshot placeholder</span>
          </div>
        )}
      </div>
      <div className="project-copy">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="tags" aria-label="Tech stack">{stack.map((item) => <li key={item}>{item}</li>)}</ul>
        {(github || live) && (
          <div className="project-links">
            {github && <a href={github} aria-label={`${title} on GitHub`}>GitHub ↗</a>}
            {live && <a href={live} aria-label={`${title} live demo`}>Live demo ↗</a>}
          </div>
        )}
      </div>
    </article>
  );
}
