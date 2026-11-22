"use client";
import { useEffect, useState } from "react";
import {
  CodeXml,
  Menu,
  X,
  Mail,
  GitFork,
  ArrowUpRight,
  ArrowRight,
  Terminal,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/portfolio";
const links = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];
export function Nav() {
  const [active, setActive] = useState("home"),
    [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => {
      const sections = Array.from(
        document.querySelectorAll("section[data-nav]"),
      );
      setActive(
        sections
          .filter((x) => x.getBoundingClientRect().top <= 150)
          .at(-1)
          ?.getAttribute("data-nav") || "home",
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header>
      <div className="wrap navwrap">
        <a href="#home" className="brand" aria-label="Abhishek home">
          <span className="logomark">
            <CodeXml size={22} />
          </span>
          abhishek<span className="dev">.dev</span>
        </a>
        <nav
          id="navigation"
          className={open ? "opened" : ""}
          aria-label="Main navigation"
        >
          {links.map((x, i) => (
            <a
              key={x}
              href={"#" + x.toLowerCase()}
              aria-current={active === x.toLowerCase() ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              <small>0{i + 1}</small> {x}
            </a>
          ))}
        </nav>
        <a className="available" href="#contact">
          <i /> Open to work
        </a>
        <button
          className="menubtn"
          aria-controls="navigation"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function TitleType() {
  const [text, setText] = useState("Software Engineer");
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const titles = [
      "Software Engineer",
      "Java Full Stack Developer",
      "AI Engineer",
    ];
    let i = 0,
      n = titles[0].length,
      del = true,
      t: ReturnType<typeof setTimeout>;
    const tick = () => {
      n += del ? -1 : 1;
      setText(titles[i].slice(0, n));
      let delay = del ? 35 : 75;
      if (n === 0) {
        i = (i + 1) % titles.length;
        del = false;
        delay = 180;
      } else if (n === titles[i].length) {
        del = true;
        delay = 3500;
      }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 3800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="role">
      <Terminal size={22} />
      <span aria-hidden="true">
        {text}
        <b className="cursor">▍</b>
      </span>
      <span className="sr-only">
        Software Engineer, Java Full Stack Developer, AI Engineer
      </span>
    </div>
  );
}
export function Socials() {
  const [note, setNote] = useState("");
  return (
    <div className="socialbox">
      <div className="socials">
        {[
          ["GitHub", profile.github],
          ["LinkedIn", profile.linkedin],
          ["Email", profile.email ? "mailto:" + profile.email : ""],
        ].map(([name, url], i) => {
          const icon =
            i === 0 ? (
              <GitFork size={16} />
            ) : i === 1 ? (
              <b className="inicon">in</b>
            ) : (
              <Mail size={16} />
            );
          return url ? (
            <a key={name} href={url}>
              {icon}
              {name}
              <ArrowUpRight size={12} />
            </a>
          ) : (
            <button
              key={name}
              type="button"
              onClick={() =>
                setNote(
                  name === "Email"
                    ? "An email address has not been added yet."
                    : `The ${name} profile has not been added yet.`,
                )
              }
            >
              {icon}
              {name}
              <ArrowUpRight size={12} />
            </button>
          );
        })}
      </div>
      <span role="status" className="socialnote">
        {note}
      </span>
    </div>
  );
}
export function ContactForm() {
  const [draft, setDraft] = useState(""),
    [copied, setCopied] = useState(false);
  return (
    <form
      onChange={() => {
        setDraft("");
        setCopied(false);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget),
          body = `From: ${d.get("name")} <${d.get("email")}>\n\n${d.get("message")}`;
        if (profile.email) {
          window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(String(d.get("subject")))}&body=${encodeURIComponent(body)}`;
        } else setDraft(`Subject: ${d.get("subject")}\n${body}`);
      }}
    >
      <div className="pair">
        <label>
          Name
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Subject
        <input name="subject" required maxLength={200} />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} required maxLength={5000} />
      </label>
      <p className="hint">
        {profile.email
          ? "Opens a draft in your email app."
          : "Contact details are pending. You can prepare and copy a message draft."}
      </p>
      <Button type="submit" size="lg">
        Prepare email draft <ArrowRight data-icon="inline-end" />
      </Button>
      {draft && (
        <div className="draft" role="status">
          <label>
            Message draft — not sent
            <textarea readOnly value={draft} rows={5} />
          </label>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(draft);
                setCopied(true);
              } catch {
                document
                  .querySelector<HTMLTextAreaElement>(".draft textarea")
                  ?.select();
              }
            }}
          >
            <Copy size={14} />
            {copied ? "Copied" : "Copy draft"}
          </button>
        </div>
      )}
    </form>
  );
}
