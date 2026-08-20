import { motion } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalInfo } from "../data/data";

const SOCIALS = [
  { href: personalInfo.socials.github, Icon: FaGithub, label: "GitHub" },
  { href: personalInfo.socials.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
  { href: personalInfo.socials.email, Icon: Mail, label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-950 border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <span className="font-heading font-bold text-lg gradient-text">SNG.</span>
          <p className="text-slate-500 text-xs mt-1">
            © {year} Sadeep Nimsara Godage. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label === "Email" ? `Email: ${personalInfo.socials.rawEmail || "sadeepnimsara555@gmail.com"}` : label}
              onClick={(e) => {
                if (label === "Email") {
                  navigator.clipboard.writeText(personalInfo.socials.rawEmail || "sadeepnimsara555@gmail.com");
                }
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-700/50 bg-slate-800/30 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200 cursor-none"
            >
              <Icon size={15} className="text-slate-400 hover:text-indigo-400 transition-colors" />
            </a>
          ))}
        </div>

        {/* Back to Top */}
        <motion.button
          id="footer-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition-colors cursor-none border border-slate-700/50 rounded-xl px-4 py-2 hover:border-indigo-500/40"
        >
          <ArrowUp size={14} />
          Back to top
        </motion.button>
      </div>
    </footer>
  );
}
