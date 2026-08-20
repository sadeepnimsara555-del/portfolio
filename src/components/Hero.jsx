import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ChevronDown, Download, Eye } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalInfo } from "../data/data";

// Lazy-load the heavy Three.js canvas
const HeroCanvas = lazy(() => import("./HeroCanvas"));

const ROLES = personalInfo.rotatingRoles;

/** Rotating text that cycles through roles */
function RotatingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = ROLES[index];
    let timeout;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          60
        );
      } else {
        // Pause then erase
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          35
        );
      } else {
        setIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, index]);

  return (
    <span className="gradient-text font-heading font-bold text-2xl md:text-3xl">
      {displayed}
      <span className="animate-pulse text-indigo-400">|</span>
    </span>
  );
}

const SOCIALS = [
  { href: personalInfo.socials.github, Icon: FaGithub, label: "GitHub" },
  { href: personalInfo.socials.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
  { href: personalInfo.socials.email, Icon: Mail, label: "Email" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900"
    >
      {/* Orb decorations */}
      <div className="orb orb-blue w-[500px] h-[500px] top-[-100px] right-[-100px] opacity-60" />
      <div className="orb orb-violet w-[400px] h-[400px] bottom-[-80px] left-[-80px] opacity-50" />

      {/* 3D Canvas — lazy-loaded */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-900/30 via-transparent to-navy-900" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
            👋 Welcome to my portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="section-heading text-4xl sm:text-5xl md:text-7xl text-white mb-3 leading-tight"
        >
          Sadeep{" "}
          <span className="gradient-text">Nimsara</span>
          <br />
          <span className="text-slate-200">Godage</span>
        </motion.h1>

        {/* Rotating Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-6 h-12 flex items-center justify-center"
        >
          <span className="inline-flex items-center px-5 py-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 backdrop-blur-md shadow-lg shadow-indigo-500/10">
            <RotatingText />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          IT undergraduate specializing in AI — experienced in full-stack development
          (MERN), mobile (React Native), Python AI/ML, and Java Spring Boot.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <button
            id="hero-view-projects"
            onClick={() =>
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-gradient flex items-center gap-2 px-7 py-3 rounded-xl text-white font-semibold text-sm shadow-lg cursor-none"
          >
            <Eye size={16} /> View Projects
          </button>

          <button
            id="hero-contact"
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-outline-gradient flex items-center gap-2 px-7 py-3 rounded-xl text-white font-semibold text-sm cursor-none"
          >
            <Mail size={16} /> Contact Me
          </button>

          <a
            id="hero-download-cv"
            href={personalInfo.cvUrl}
            download
            className="flex items-center gap-2 px-7 py-3 rounded-xl text-slate-300 font-semibold text-sm border border-slate-600/50 bg-slate-800/40 hover:bg-slate-700/50 hover:text-white transition-all duration-200 cursor-none"
          >
            <Download size={16} /> Download CV
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex justify-center gap-5"
        >
          {SOCIALS.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group w-10 h-10 rounded-full flex items-center justify-center border border-slate-700/60 bg-slate-800/40 hover:border-indigo-500/60 hover:bg-indigo-500/10 transition-all duration-200 cursor-none"
            >
              <Icon size={18} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-500"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
