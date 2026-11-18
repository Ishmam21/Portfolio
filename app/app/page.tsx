import { Hero } from "./components/hero";
import { Insect } from "./components/insect";
import { Navbar } from "./components/navbar";
import { PixelText } from "./components/pixel-text";
import { ProjectCard } from "./components/project-card";
import { ProjectsGallery } from "./components/projects-gallery";
import { portfolio } from "./content";
import { projects } from "./projects";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <Navbar />
      <main id="home" tabIndex={-1}>
        <Insect />
        <div className="page-content">
          <Hero />
          <section id="about" className="content-section" aria-labelledby="about-title">
            <h2 id="about-title"><PixelText text="About" /></h2>
            <div>
              <p>{portfolio.about}</p>
              <ul className="tags" aria-label="Skills">{portfolio.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </div>
          </section>
          <ProjectsGallery>
            <div className="projects-panel">
              <div className="projects-heading">
                <h2 id="projects-title"><PixelText text="Projects" /></h2>
                <p className="scroll-hint">Scroll to browse <span aria-hidden="true">→</span></p>
              </div>
              <div className="projects-viewport">
                <div className="projects-track">
                  {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
                </div>
              </div>
            </div>
          </ProjectsGallery>
          <section id="experience" className="content-section" aria-labelledby="experience-title">
            <h2 id="experience-title"><PixelText text="Experience" /></h2>
            <p>{portfolio.experience}</p>
          </section>
          <section id="education" className="content-section" aria-labelledby="education-title">
            <h2 id="education-title"><PixelText text="Education" /></h2>
            <div>
              <h3>{portfolio.education.degree}</h3>
              <p>{portfolio.education.school}</p>
            </div>
          </section>
          <section id="contact" className="content-section" aria-labelledby="contact-title">
            <h2 id="contact-title"><PixelText text="Contact" /></h2>
            <p>{portfolio.contact}</p>
          </section>
          <footer><a href="#home">Back to top ↑</a></footer>
        </div>
      </main>
    </>
  );
}
