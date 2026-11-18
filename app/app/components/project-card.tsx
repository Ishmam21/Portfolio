import { projectAnchor, type Project } from "../projects";
import { ProjectScreenshots } from "./project-screenshots";

export function ProjectCard({ project }: { project: Project }) {
  const { title, description, stack, screenshots, github, live, docs } = project;

  return (
    <article id={projectAnchor(project.id)} className="project-card" tabIndex={0} aria-label={title}>
      <div className="project-media">
        {screenshots?.length ? (
          <ProjectScreenshots screenshots={screenshots} title={title} />
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
        {(github || live || docs) && (
          <div className="project-links">
            {github && <a href={github} aria-label={`${title} on GitHub`}>GitHub ↗</a>}
            {live && <a href={live} aria-label={`${title} live demo`}>Live demo ↗</a>}
            {docs && <a href={docs} aria-label={`${title} API docs`}>API docs ↗</a>}
          </div>
        )}
      </div>
    </article>
  );
}
