import { portfolio } from "../content";

export function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#home" aria-label={`${portfolio.name}, home`}>
          <span aria-hidden="true" className="wordmark-prompt">&gt;_</span>
          {portfolio.wordmark}<span className="wordmark-period">.</span>
        </a>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {portfolio.navigation.map((item) => (
              <li key={item.label}>
                {item.enabled ? (
                  <a href={item.href} aria-current="page">{item.label}</a>
                ) : (
                  <span className="nav-inactive" role="link" aria-disabled="true" title="Section coming soon">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
