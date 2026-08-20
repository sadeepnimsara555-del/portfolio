import { motion } from "framer-motion";
import { GraduationCap, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { education } from "../data/data";

export default function Education() {
  return (
    <section id="education" className="relative py-28 bg-navy-950 bg-noise overflow-hidden">
      <div className="orb orb-blue w-[300px] h-[300px] top-1/2 right-[-80px] opacity-20" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-2">
            My academic journey
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-white mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px timeline-line opacity-30 md:left-1/2" />

          <div className="flex flex-col gap-10">
            {education.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  viewport={{ once: true, margin: "-60px" }}
                  className={`relative pl-16 md:pl-0 md:w-[46%] ${
                    isLeft ? "md:self-start md:pr-10 md:text-right" : "md:self-end md:pl-10 md:ml-auto"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div
                    className={`absolute top-3 flex items-center justify-center
                      left-3 md:left-auto
                      ${isLeft ? "md:-right-[1.85rem]" : "md:-left-[1.85rem]"}
                    `}
                  >
                    <div className="w-7 h-7 rounded-full bg-navy-900 border-2 border-indigo-500 flex items-center justify-center shadow-glow-violet">
                      <GraduationCap size={12} className="text-indigo-400" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="glass-card rounded-2xl p-6">
                    {/* Date + Current badge */}
                    <div className={`flex items-center gap-2 mb-2 flex-wrap ${isLeft ? "md:justify-end" : ""}`}>
                      <span className="text-xs px-3 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 font-medium">
                        {item.dates}
                      </span>
                      {item.current && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-semibold text-white text-sm leading-snug mb-1">
                      {item.degree}
                    </h3>
                    <p className="text-slate-400 text-xs mb-0">{item.institution}</p>

                    {/* Projects built during this period */}
                    {item.projects && item.projects.length > 0 && (
                      <div className={`mt-4 pt-4 border-t border-white/5`}>
                        <p className={`text-[10px] font-semibold tracking-widest uppercase text-slate-500 mb-2 ${isLeft ? "md:text-right" : ""}`}>
                          Projects Built
                        </p>
                        <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}>
                          {item.projects.map((proj) => (
                            <a
                              key={proj.title}
                              href={proj.liveUrl ?? proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={proj.liveUrl ? "Live Demo" : "GitHub"}
                              className="group/chip inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium
                                bg-slate-800/60 border border-slate-700/50 text-slate-400
                                hover:bg-indigo-500/15 hover:border-indigo-500/40 hover:text-indigo-300
                                transition-all duration-200 cursor-none"
                            >
                              {proj.liveUrl ? (
                                <ExternalLink size={10} className="shrink-0 text-indigo-400" />
                              ) : (
                                <FaGithub size={10} className="shrink-0 text-slate-500 group-hover/chip:text-indigo-400 transition-colors" />
                              )}
                              {proj.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
