import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Code2,
  Database,
  Server,
  Globe,
  Terminal,
  ChevronDown,
  Layers,
  Cpu,
  Send,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const TECH_STACK = [
  { name: "MongoDB", category: "Database", icon: "🍃", color: "#00ed64" },
  { name: "Express.js", category: "Backend", icon: "⚡", color: "#ffffff" },
  { name: "React", category: "Frontend", icon: "⚛️", color: "#61dafb" },
  { name: "Node.js", category: "Runtime", icon: "🟢", color: "#8cc84b" },
  // { name: "TypeScript", category: "Language", icon: "🔷", color: "#3178c6" },
  { name: "JavaScript", category: "Language", icon: "🟡", color: "#f7df1e" },
  { name: "Redux", category: "State", icon: "🔮", color: "#764abc" },
  { name: "REST APIs", category: "Protocol", icon: "🔗", color: "#6366f1" },
  // { name: "GraphQL", category: "Query", icon: "🔺", color: "#e535ab" },
  // { name: "Docker", category: "DevOps", icon: "🐳", color: "#2496ed" },
  // { name: "AWS", category: "Cloud", icon: "☁️", color: "#ff9900" },
  { name: "Git", category: "VCS", icon: "🌿", color: "#f05032" },
  { name: "Tailwind CSS", category: "Styling", icon: "🎨", color: "#38bdf8" },
  { name: "JWT Auth", category: "Security", icon: "🔐", color: "#22d3ee" },
  // { name: "Socket.io", category: "Realtime", icon: "🔌", color: "#ffffff" },
  // { name: "Redis", category: "Cache", icon: "🔴", color: "#dc382d" },
];

const PROJECTS_PLACEHOLDER = [
  { id: 1, title: "Invoice management", description: "It manages invoices.", githubLink: "#", webLink: "https://invoice-frontend-rxzv.vercel.app/", imgUrl: "/invoice_img.png" },
  { id: 2, title: "E-commerce", description: "It is a multi product ecommerce system", githubLink: "#", webLink: "https://ecommerce-frontend-gal9.vercel.app/", imgUrl: "/first_ecommerce_img.png" },
  { id: 3, title: "Coffe Shop", description: "It is a coffeshop locator", githubLink: "#", webLink: "https://coffee-shop-app-router.vercel.app/", imgUrl: "/coffee_img.png" },
   { id: 4, title: "E-commerce", description: "It is a multi product ecommerce system", githubLink: "#", webLink: "https://ecommerce-website-2nd-frontend-boom.vercel.app/", imgUrl: "/2nd_ecommerce_img.png" },
  // { id: 5, title: "Project 5", description: "Description for project 5", githubLink: "https://github.com", webLink: "https://example.com", imgUrl: "/photo.jpg" },
  // { id: 6, title: "Project 6", description: "Description for project 6", githubLink: "https://github.com", webLink: "https://example.com", imgUrl: "/photo.jpg" },
];

const EXPERIENCE = [
  // {
  //   role: "Senior MERN Stack Developer",
  //   company: "Tech Company Name",
  //   period: "2022 – Present",
  //   location: "Remote",
  //   highlights: [
  //     "Architected and shipped 3 production-grade SaaS applications used by 10k+ users",
  //     "Led a team of 5 engineers, implementing CI/CD pipelines and code review standards",
  //     "Reduced API response time by 40% through Redis caching and query optimization",
  //   ],
  // },
  // {
  //   role: "Full Stack Developer",
  //   company: "Previous Company",
  //   period: "2020 – 2022",
  //   location: "Hybrid",
  //   highlights: [
  //     "Built RESTful APIs with Express.js serving 50k+ daily requests",
  //     "Migrated legacy jQuery codebase to React with TypeScript",
  //     "Integrated third-party payment gateways (Stripe, PayPal)",
  //   ],
  // },
  {
    role: "Junior Web Developer",
    company: "EasyTech",
    period: "2024 – 2025",
    location: "remote",
    highlights: [
      "Developed responsive frontends using React and modern CSS",
      "Built CRUD applications backed by MongoDB and Node.js",
      // "Collaborated with UI/UX designers to implement pixel-perfect designs",
      "Built RESTful APIs with Express.js",
      "Integrated third-party payment gateways (Stripe)",
       "Architected and developed 1  SaaS application",
      
    ],
  },
];

function useScrollSpy() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map((l) =>
        document.getElementById(l.toLowerCase())
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(NAV_LINKS[i]);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return { active, scrolled };
}

function scrollTo(id: string) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const { active, scrolled } = useScrollSpy();
  const heroRef = useRef<HTMLDivElement>(null);

  // function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   setSent(true);
  //   console.log("Form submitted:", formData);
  //   setTimeout(() => setSent(false), 4000);
  //   setFormData({ name: "", email: "", message: "" });
  // }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    setSent(false);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3_ACCESS,

        name: formData.name,
        email: formData.email,
        message: formData.message,

        subject: `New Portfolio Message from ${formData.name}`,
        from_name: "Portfolio Website",

        botcheck: "",
      }),
    });

    const data = await response.json();

    if (data.success) {
      setSent(true);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 4000);
    } else {
      console.error("Web3Forms error:", data);
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Contact form error:", error);
    alert("Unable to send your message. Please try again.");
  }
}


  return (
    <div
      className="min-h-screen text-foreground"
      style={{ fontFamily: "'Inter', sans-serif", background: "var(--background)" }}
    >
      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(6,6,15,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(99,102,241,0.15)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold text-lg tracking-tight"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--accent)",
            }}
          >
            &lt;dev /&gt;
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-sm transition-colors duration-200"
                style={{
                  color: active === link ? "var(--accent)" : "var(--muted-foreground)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    active === link ? "var(--accent)" : "var(--muted-foreground)")
                }
              >
                {link}
              </button>
            ))}
            <a
              href="mailto:your@email.com"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--foreground)" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-4"
            style={{ background: "rgba(6,6,15,0.97)", borderTop: "1px solid var(--border)" }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => { scrollTo(link); setMenuOpen(false); }}
                className="text-left text-sm py-1"
                style={{ color: "var(--muted-foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="about"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Mesh / grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 60% 40%, rgba(99,102,241,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 20% 80%, rgba(34,211,238,0.07) 0%, transparent 50%),
              linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "auto, auto, 60px 60px, 60px 60px",
          }}
        />

        {/* Glowing orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 65%)",
            top: "50%",
            right: "-10%",
            transform: "translateY(-50%)",
            filter: "blur(1px)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: "rgba(34,211,238,0.08)",
                border: "1px solid rgba(34,211,238,0.25)",
                color: "var(--accent)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--accent)" }}
              />
              Available for hire
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Hi, I'm{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Abbas Ahmad
              </span>
            </h1>

            <div
              className="text-xl md:text-2xl font-semibold mb-6"
              style={{
                color: "var(--muted-foreground)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              MERN Stack Developer
            </div>

            <p
              className="text-base leading-relaxed mb-10 max-w-lg"
              style={{ color: "var(--muted-foreground)" }}
            >
              I build full-stack web applications with MongoDB, Express.js, React, and Node.js.
              Passionate about clean architecture, performance, and developer experience.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("Projects")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 0 30px rgba(99,102,241,0.35)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 40px rgba(99,102,241,0.55)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px rgba(99,102,241,0.35)")
                }
              >
                View Projects <ArrowRight size={16} />
              </button>

              <button
                onClick={() => scrollTo("Contact")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                Contact Me <Mail size={16} />
              </button>
            </div>

            {/* Social links */}
            <div className="flex gap-4 mt-8">
              {[
                { icon: Github, href: "https://github.com/abbasahmad-official", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/abbas-ahmad-mernstackdeveloper/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:abbasahmad8032@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  className="p-2.5 rounded-lg transition-all duration-200"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--muted-foreground)",
                    background: "rgba(13,13,30,0.5)",
                    
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Hero card — right side */}
          <div className="hidden md:flex justify-end">
            <div
              className="relative rounded-2xl p-8 w-80"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "0 0 60px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Code snippet decoration */}
              <div className="mb-6">
                <div
                  className="flex gap-1.5 mb-4"
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
                </div>
                <pre
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--muted-foreground)" }}
                >
                  <span style={{ color: "#6366f1" }}>const</span>{" "}
                  <span style={{ color: "#22d3ee" }}>developer</span>{" = \{"}
                  {"\n"}{"  "}
                  <span style={{ color: "#8b5cf6" }}>name</span>
                  {": "}
                  <span style={{ color: "#34d399" }}>"Abbas Ahmad"</span>,{"\n"}{"  "}
                  <span style={{ color: "#8b5cf6" }}>stack</span>
                  {": "}
                  <span style={{ color: "#34d399" }}>"MERN"</span>,{"\n"}{"  "}
                  <span style={{ color: "#8b5cf6" }}>open</span>
                  {": "}
                  <span style={{ color: "#f59e0b" }}>true</span>,{"\n"}{"  "}
                  <span style={{ color: "#8b5cf6" }}>coffee</span>
                  {": "}
                  <span style={{ color: "#f59e0b" }}>Infinity</span>
                  {"\n\}"}
                </pre>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Years Exp.", value: "5+" },
                  { label: "Projects", value: "30+" },
                  { label: "Clients", value: "20+" },
                  { label: "Commits", value: "2k+" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl p-4 text-center"
                    style={{ background: "rgba(99,102,241,0.06)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="text-2xl font-bold mb-0.5"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo("Skills")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-90 transition-opacity"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span
            className="text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            scroll
          </span>
          <ChevronDown size={16} className="animate-bounce" />
        </button>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel icon={<Cpu size={14} />} text="TECH STACK" />
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            What I work with
          </h2>
          <p
            className="text-base mb-14 max-w-xl"
            style={{ color: "var(--muted-foreground)" }}
          >
            From database to deployment — tools I use daily to build robust full-stack applications.
          </p>

          {/* MERN highlight */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { letter: "M", name: "MongoDB", sub: "NoSQL Database", icon: <Database size={20} />, color: "#00ed64" },
              { letter: "E", name: "Express.js", sub: "Web Framework", icon: <Server size={20} />, color: "#ffffff" },
              { letter: "R", name: "React", sub: "UI Library", icon: <Layers size={20} />, color: "#61dafb" },
              { letter: "N", name: "Node.js", sub: "Runtime", icon: <Terminal size={20} />, color: "#8cc84b" },
            ].map(({ letter, name, sub, icon, color }) => (
              <div
                key={letter}
                className="relative rounded-2xl p-6 overflow-hidden transition-all duration-300 group"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = color + "50";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="absolute top-4 right-4 text-5xl font-black opacity-5 select-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color }}
                >
                  {letter}
                </div>
                <div className="mb-3" style={{ color }}>
                  {icon}
                </div>
                <div
                  className="font-bold text-lg mb-0.5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {sub}
                </div>
              </div>
            ))}
          </div>

          {/* All skills */}
          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map(({ name, category, icon, color }) => (
              <div
                key={name}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-default"
                style={{
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = color + "60";
                  (e.currentTarget as HTMLElement).style.background = color + "10";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "var(--secondary)";
                }}
              >
                <span>{icon}</span>
                {name}
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(99,102,241,0.12)",
                    color: "var(--accent)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        className="py-28"
        style={{ background: "rgba(13,13,30,0.5)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel icon={<Code2 size={14} />} text="PROJECTS" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <h2
                className="text-4xl md:text-5xl font-extrabold mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Featured work
              </h2>
              <p style={{ color: "var(--muted-foreground)" }}>
                Projects will be added here — check back soon.
              </p>
            </div>
            <a
              href="https://github.com/abbasahmad-official"
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium whitespace-nowrap"
              style={{ color: "var(--accent)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              View all on GitHub <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS_PLACEHOLDER.map(({ id, title, description, githubLink, webLink, imgUrl }) => (
              <div
                key={id}
                className="group rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  minHeight: 280,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(99,102,241,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Placeholder image area */}
                <div
                  className="h-44 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(34,211,238,0.04) 100%)`,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="absolute inset-0 "
                    style={{
                      backgroundImage: `url('${imgUrl}')`,
                        // "linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* <div
                    className="relative flex flex-col items-center gap-2"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <Globe size={28} style={{ opacity: 0.4 }} />
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'JetBrains Mono', monospace", opacity: 0.4 }}
                    >
                      project_{id.toString().padStart(2, "0")}
                    </span>
                  </div> */}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                   <div>

                    <div
                      className="text-base font-semibold"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--muted-foreground)" }}
                      >
                      {title}
                    </div>
                     <div
                      className="text-base"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--muted-foreground)", fontSize: "0.875rem" }}
                      >
                      {description}
                    </div>
                      </div>
                    
                    <div className="flex gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}
                      >
                        <Github size={13}  onClick={()=> window.open(`${githubLink}`, "_blank")} style={{cursor: "pointer"}} />
                      </div>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}
                      >
                        <ExternalLink size={13} onClick={()=> window.open(`${webLink}`, "_blank")} style={{cursor: "pointer"}} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["MERN", "Node.js", "React"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(99,102,241,0.1)",
                          color: "var(--primary)",
                          border: "1px solid rgba(99,102,241,0.2)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel icon={<Briefcase size={14} />} text="EXPERIENCE" />
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-14"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Work history
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-0 md:left-8 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, transparent, var(--border), transparent)" }}
            />

            <div className="flex flex-col gap-10">
              {EXPERIENCE.map((job, i) => (
                <div
                  key={i}
                  className="md:pl-24 relative group"
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden md:flex absolute left-5 top-6 w-6 h-6 rounded-full items-center justify-center -translate-x-1/2"
                    style={{
                      background: "var(--background)",
                      border: "2px solid var(--primary)",
                      boxShadow: "0 0 12px rgba(99,102,241,0.35)",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "var(--primary)" }}
                    />
                  </div>

                  <div
                    className="rounded-2xl p-7 transition-all duration-300"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-5">
                      <div>
                        <h3
                          className="text-xl font-bold mb-1"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {job.role}
                        </h3>
                        <div
                          className="font-semibold"
                          style={{ color: "var(--accent)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {job.company}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 md:items-end">
                        <div
                          className="flex items-center gap-1.5 text-sm"
                          style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          <Calendar size={13} /> {job.period}
                        </div>
                        <div
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          <MapPin size={12} /> {job.location}
                        </div>
                      </div>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {job.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "var(--primary)" }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-28"
        style={{ background: "rgba(13,13,30,0.5)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel icon={<Mail size={14} />} text="CONTACT" />
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Let's build something
          </h2>
          <p
            className="text-base mb-14 max-w-xl"
            style={{ color: "var(--muted-foreground)" }}
          >
            Open to full-time roles, freelance projects, and interesting collaborations.
            Drop a message and I'll get back within 24 hours.
          </p>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Info */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {[
                { icon: <Mail size={18} />, label: "Email", value: "abbasahmad8032@gmail.com" },
                { icon: <Github size={18} />, label: "GitHub", value: "github.com/abbasahmad-official" },
                { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/abbas-ahmad-mernstackdeveloper" },
                { icon: <MapPin size={18} />, label: "Location", value: "Nowshera, Pakistan" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid var(--border)",
                      color: "var(--primary)",
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      className="text-xs mb-0.5"
                      style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              
              className="md:col-span-3 flex flex-col gap-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs mb-2"
                    style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "var(--primary)";
                      (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "var(--border)";
                      (e.target as HTMLElement).style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs mb-2"
                    style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "var(--primary)";
                      (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "var(--border)";
                      (e.target as HTMLElement).style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-xs mb-2"
                  style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "var(--secondary)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = "var(--primary)";
                    (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = "var(--border)";
                    (e.target as HTMLElement).style.boxShadow = "none";
                  }}
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 self-start"
                style={{
                  background: sent
                    ? "rgba(52,211,153,0.15)"
                    : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: sent ? "#34d399" : "#fff",
                  border: sent ? "1px solid rgba(52,211,153,0.4)" : "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: sent ? "none" : "0 0 25px rgba(99,102,241,0.3)",
                  cursor: "pointer",
                }}
              >
                {sent ? (
                  "Message sent ✓"
                ) : (
                  <>
                    Send Message <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="font-bold text-sm"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--accent)" }}
          >
            &lt;dev /&gt;
          </div>
          <p
            className="text-xs text-center"
            style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Built with React · MERN Stack Developer · {new Date().getFullYear()}
          </p>
          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com/abbasahmad-official" },
              { icon: Linkedin, href: "https://linkedin.com/in/abbas-ahmad-mernstackdeveloper" },
              { icon: Mail, href: "mailto:abbasahmad8032@email.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                // rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)")
                }
              >

 {/* key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  className="p-2.5 rounded-lg transition-all duration-200"
                  style={{ */}



                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
      style={{
        background: "rgba(99,102,241,0.08)",
        border: "1px solid rgba(99,102,241,0.2)",
        color: "var(--primary)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {icon} {text}
    </div>
  );
}
