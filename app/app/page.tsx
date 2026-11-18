import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <Navbar />
      <main id="home" tabIndex={-1}>
        <Hero />
      </main>
    </>
  );
}
