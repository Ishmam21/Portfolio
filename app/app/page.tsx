import { ContactLinks } from "./components/contact-links";
import { EducationTimeline } from "./components/education-timeline";
import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import { PageStarfield } from "./components/page-starfield";
import { PixelText } from "./components/pixel-text";
import { ProjectCard } from "./components/project-card";
import { ProjectsGallery } from "./components/projects-gallery";
import { portfolio } from "./content";
import { projects } from "./projects";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <PageStarfield />
      <Navbar />
      <main id="home" tabIndex={-1}>
        <div className="page-content">
          <Hero />
          <section id="about" tabIndex={-1} className="content-section" aria-labelledby="about-title">
            <h2 id="about-title"><PixelText text="About" /></h2>
            <div>
              <p>{portfolio.about}</p>
            </div>
          </section>
        </div>
        <ProjectsGallery>
          <div className="projects-panel">
            <div className="projects-heading">
              <h2 id="projects-title"><PixelText text="Projects" /></h2>
              <p className="scroll-hint">Scroll to browse <span aria-hidden="true">→</span></p>
            </div>
            <div className="projects-viewport">
              <div className="projects-track">
                {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
              </div>
            </div>
          </div>
        </ProjectsGallery>
        <div className="page-content">
          <section id="experience" tabIndex={-1} className="content-section" aria-labelledby="experience-title">
            <h2 id="experience-title"><PixelText text="Experience" /></h2>
            <p>{portfolio.experience}</p>
          </section>
          <section id="education" tabIndex={-1} className="content-section" aria-labelledby="education-title">
            <h2 id="education-title"><PixelText text="Education" /></h2>
            <EducationTimeline />
          </section>
          <section id="contact" tabIndex={-1} className="content-section" aria-labelledby="contact-title">
            <h2 id="contact-title"><PixelText text="Contact" /></h2>
            <ContactLinks />
          </section>
          <footer><a href="#home">Back to top ↑</a></footer>
        </div>
      </main>
    </>
  );
}
