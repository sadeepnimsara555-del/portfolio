import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 bg-navy-900 bg-noise overflow-hidden">
      <div className="orb orb-violet w-[450px] h-[450px] top-[-100px] right-[-120px] opacity-20" />
      <div className="orb orb-blue w-[300px] h-[300px] bottom-[-60px] left-0 opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-2">
            What I've built
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="glass-card rounded-2xl p-7 flex flex-col h-full group"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading font-semibold text-white text-base leading-snug mb-1 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Calendar size={12} />
                    <span>{project.dates}</span>
                  </div>
                </div>

                {/* GitHub Link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub — ${project.title}`}
                  className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border border-slate-700/60 bg-slate-800/40 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200 cursor-none"
                >
                  <FaGithub size={16} className="text-slate-400 hover:text-indigo-400 transition-colors" />
                </a>
              </div>

              {/* Bullets */}
              <ul className="flex-1 flex flex-col gap-2 mb-5">
                {project.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-violet-500" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/sadeepnimsara555-del"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors border border-slate-700/50 rounded-xl px-6 py-3 hover:border-indigo-500/40 cursor-none"
          >
            <FaGithub size={16} />
            View all projects on GitHub
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
