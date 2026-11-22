import Image from "next/image";
import {
  ArrowRight,
  Download,
  Mouse,
  Plus,
  CodeXml,
  ScanLine,
} from "lucide-react";
import { profile, intro } from "@/lib/portfolio";
import { TitleType, Socials } from "./interactive";
export function Hero() {
  return (
    <section id="home" data-nav="home" className="hero">
      <div className="gridbg" aria-hidden="true" />
      <div className="wrap">
        <div className="herobody">
          <div className="heroText">
            <div className="eyebrow">
              <i /> HELLO, WORLD<span className="eyedim"> // </span> I’M
            </div>
            <h1>
              Abhishek <em>Sahani</em>
            </h1>
            <TitleType />
            <p className="intro">{intro}</p>
            <div className="actions">
              <a className="cta primary" href="#projects">
                View Projects <ArrowRight size={16} />
              </a>
              <a
                className="cta secondary"
                href="/resume.pdf"
                download="Abhishek-Sahani-Resume.pdf"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
            <Socials />
          </div>
          <div className="art">
            <Plus className="cross c1" />
            <Plus className="cross c2" />
            <figure className="portrait">
              <figcaption>
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <span>profile.tsx</span>
                <CodeXml size={13} />
              </figcaption>
              <div className="photo">
                <Image
                  src={profile.portrait}
                  alt="Developer at a workstation with code and microservices architecture diagrams"
                  fill
                  priority
                  sizes="(max-width: 600px) 78vw, 330px"
                />
                <span className="framecorner tl" />
                <span className="framecorner tr" />
                <span className="framecorner bl" />
                <span className="framecorner br" />
                <span className="photoid">FIG. 01 — PORTRAIT</span>
              </div>
            </figure>
            <div className="floatlabel">
              <span className="tinyicon">
                <CodeXml size={20} />
              </span>
              <div>
                <small>CORE FOCUS</small>
                <strong>Full Stack Engineering</strong>
              </div>
            </div>
            <ScanLine className="scan" size={17} />
          </div>
        </div>
        <div className="herobottom">
          <a href="#skills">
            <Mouse size={14} /> SCROLL TO EXPLORE
          </a>
          <span>
            <b>01</b> / 06
          </span>
        </div>
      </div>
    </section>
  );
}
