import { portfolio } from "../content";
import { headlinePaths, headlineWidth } from "./banner-art";
import { HeroSky } from "./hero-sky";
import { Insect } from "./insect";
import { PixelText } from "./pixel-text";
import { SkillsMenu } from "./skills-menu";

export function Hero() {
  const lastSpace = portfolio.introduction.lastIndexOf(" ");

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Insect />
      <div className="hero-body">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="sr-only">{portfolio.name}</span>
            <span className="signature-first" aria-hidden="true"><PixelText text={portfolio.givenNames} /></span>
            <svg className="headline" viewBox={`0 0 ${headlineWidth} 90`} shapeRendering="crispEdges" aria-hidden="true">
              {headlinePaths.map((path, index) => (
                <g key={index}>
                  <path d={path} fill="var(--shadow)" transform="translate(6 6)" />
                  <path d={path} fill="var(--ink)" />
                </g>
              ))}
            </svg>
          </h1>
          <p className="hero-role">{portfolio.role}</p>
          <p className="hero-intro">
            {portfolio.introduction.slice(0, lastSpace + 1)}
            <span className="hero-last-word">{portfolio.introduction.slice(lastSpace + 1)}<span className="hero-caret" aria-hidden="true" /></span>
          </p>
        </div>
        <HeroSky />
      </div>
      <SkillsMenu />
    </section>
  );
}
