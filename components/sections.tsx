import {
  Braces,
  Server,
  PanelsTopLeft,
  CircuitBoard,
  Workflow,
  Database,
  MessageSquare,
  Cloud,
  TestTubeDiagonal,
  Wrench,
  ChevronDown,
  GraduationCap,
  ArrowUpRight,
  Layers,
  ShoppingBag,
  FileJson,
  GitFork,
  ExternalLink,
} from "lucide-react";
import { skills, jobs, projects, profile } from "@/lib/portfolio";
import { Socials, ContactForm } from "./interactive";
const icons = [
  Braces,
  Server,
  PanelsTopLeft,
  CircuitBoard,
  Workflow,
  Database,
  MessageSquare,
  Cloud,
  TestTubeDiagonal,
  Wrench,
];
function Heading({
  n,
  label,
  title,
  desc,
}: {
  n: string;
  label: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="heading">
      <div className="eyebrow">
        <i /> {n} / {label}
      </div>
      <h2>
        {title}
        <em>.</em>
      </h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}
function SkillCard({ group, i }: { group: string[]; i: number }) {
  const Icon = icons[i];
  return (
    <article className={"card skill tone" + (i % 4)}>
      <div className="cardtop">
        <span className="iconbox">
          <Icon size={21} />
        </span>
        <span className="index">{String(i + 1).padStart(2, "0")} / 10</span>
      </div>
      <h3>{group[0]}</h3>
      <div className="tags">
        {group.slice(1).map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </article>
  );
}
export function Skills() {
  return (
    <section id="skills" data-nav="skills" className="section">
      <div className="wrap">
        <Heading
          n="02"
          label="TECH STACK"
          title="Technical Skills"
          desc="The languages, frameworks, and tools behind my work."
        />
        <div className="skillgrid">
          {skills.slice(0, 4).map((g, i) => (
            <SkillCard key={g[0]} group={g} i={i} />
          ))}
        </div>
        <details className="more">
          <summary>
            <span className="closed">Explore all 10 categories</span>
            <span className="expanded">Show fewer categories</span>
            <ChevronDown size={16} />
          </summary>
          <div className="skillgrid">
            {skills.slice(4).map((g, i) => (
              <SkillCard key={g[0]} group={g} i={i + 4} />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section id="about" data-nav="about" className="section">
      <div className="wrap split">
        <Heading n="03" label="PROFILE" title="About Me" />
        <div className="prose">
          <p>
            I am a Java Full Stack Developer with 4+ years of experience designing,
            developing, and supporting enterprise applications across the Java and React
            ecosystems. At Voltuswave Private Limited, I led 14 engineers to deliver
            QMentis (an enterprise AI platform with RAG and MCP), built the Agentic Dashboard
            Builder, integrated enterprise tax-compliance systems (Adaequare GST &amp; Tronstride UAE E-Invoicing APIs),
            and contributed to the Freight desktop application. At RChilli Inc, I delivered the
            Enrich Shopping Cart, automated taxonomy KPI data retrieval pipelines, and optimized
            high-scale production MySQL databases.
          </p>
          <div className="metrics">
            <div>
              <b>14</b>
              <span>Engineers led</span>
            </div>
            <div>
              <b>8</b>
              <span>Month delivery cycle</span>
            </div>
            <div>
              <b>4+</b>
              <span>Years experience</span>
            </div>
          </div>
          <div className="education">
            <GraduationCap />
            <div>
              <h3>Education &amp; Certifications</h3>
              <p>
                {[
                  profile.education.degree,
                  profile.education.institution,
                  profile.education.dates,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {profile.certifications && profile.certifications.length > 0 && (
                <small style={{ display: "block", marginTop: "4px", color: "var(--muted)" }}>
                  Certifications: {profile.certifications.join(" · ")}
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Experience() {
  return (
    <section id="experience" data-nav="experience" className="section">
      <div className="wrap split">
        <Heading
          n="04"
          label="CAREER LOG"
          title="Experience"
          desc="Engineering, project ownership, and technical mentorship."
        />
        <div className="timeline">
          {jobs.map((j) => (
            <article key={j.company}>
              <small>{j.meta}</small>
              <h3>{j.role}</h3>
              <strong>{j.company}</strong>
              <ul>
                {j.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Projects() {
  const projectIcons = [
    CircuitBoard,
    PanelsTopLeft,
    FileJson,
    Layers,
    ShoppingBag,
    Workflow,
    Database,
    TestTubeDiagonal,
  ];
  return (
    <section id="projects" data-nav="projects" className="section">
      <div className="wrap">
        <Heading
          n="05"
          label="SELECTED WORK"
          title="Featured Projects"
          desc="A selection of full-stack applications, backend services, and AI-powered platforms."
        />
        <div className="projectgrid">
          {projects.map((p, i) => {
            const Icon = projectIcons[i] ?? Layers;
            return (
              <article key={p.title} className={"project card tone" + (i % 4)}>
                <div className="cardtop">
                  <span className="iconbox">
                    <Icon size={22} />
                  </span>
                  <span className="index">PROJECT / 0{i + 1}</span>
                </div>
                <small>{p.type}</small>
                <h3 className="wrap-anywhere">{p.title}</h3>
                <p>{p.desc}</p>
                {p.points && p.points.length > 0 && (
                  <ul className="projectbullets">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                )}
                <div className="tags">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="projectlinks">
                  {p.github ? (
                    <a href={p.github}>
                      <GitFork size={14} />
                      GitHub <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    <span>
                      <GitFork size={14} />
                      Source not listed
                    </span>
                  )}
                  {p.demo ? (
                    <a href={p.demo}>
                      <ExternalLink size={14} />
                      Live demo
                    </a>
                  ) : (
                    <span>
                      <ExternalLink size={14} />
                      Demo not listed
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function Contact() {
  return (
    <section id="contact" data-nav="contact" className="section">
      <div className="wrap split">
        <div>
          <Heading
            n="06"
            label="CONTACT"
            title="Let’s Connect"
            desc="Have a role or project in mind? I’m interested in full-stack, backend, and AI engineering opportunities."
          />
          <Socials />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
