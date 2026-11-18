import { portfolio } from "../content";
import { PixelText } from "./pixel-text";

export function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <span className="pixel-square" aria-hidden="true" />
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {portfolio.navigation.map(({ label, href }) => (
              <li key={href}><a href={href}><PixelText text={label} /></a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
