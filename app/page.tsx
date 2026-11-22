import { Nav } from "@/components/interactive";
import { Hero } from "@/components/hero";
import {
  Skills,
  About,
  Experience,
  Projects,
  Contact,
} from "@/components/sections";
export default function Page() {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Nav />
      <main id="content">
        <Hero />
        <Skills />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="wrap">
        <span>Abhishek Sahani · Engineering Portfolio</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}
