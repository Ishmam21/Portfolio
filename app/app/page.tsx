import Image from "next/image";
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
            </div>
            <div className="projects-progress" aria-hidden="true"><span /></div>
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
            <div className="experience-entry">
              <p className="experience-meta">{portfolio.experience.dates} · Part-time</p>
              <h3>{portfolio.experience.role}</h3>
              <a className="experience-company" href={portfolio.experience.website} target="_blank" rel="noopener noreferrer">
                <Image src="/oddflock.png" alt="" width={44} height={44} />
                {portfolio.experience.company}
              </a>
              <p>{portfolio.experience.summary}</p>
            </div>
          </section>
          <section id="education" tabIndex={-1} className="content-section" aria-labelledby="education-title">
            <h2 id="education-title"><PixelText text="Education" /></h2>
            <EducationTimeline>
              <ol>
                {portfolio.education.map((entry) => (
                  <li className="education-step" key={entry.qualification}>
                    <span className="education-marker" aria-hidden="true" />
                    {"date" in entry && <time dateTime={entry.date}>{entry.label}</time>}
                    <h3>{entry.qualification}</h3>
                    {"institution" in entry && <p>{entry.institution}</p>}
                  </li>
                ))}
              </ol>
            </EducationTimeline>
          </section>
          <section id="contact" tabIndex={-1} className="content-section" aria-labelledby="contact-title">
            <h2 id="contact-title"><PixelText text="Contact" /></h2>
            <ContactLinks />
          </section>
          <footer className="site-footer">
            <a className="footer-top" href="#home"><span className="footer-arrow" aria-hidden="true">↑</span><PixelText text="Back to top" /></a>
            <p>© 2026 Fahim Mubarrat Ishmam <span aria-hidden="true">·</span> All rights reserved.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
