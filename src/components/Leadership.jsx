import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { leadership } from "../data/data";

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-28 bg-navy-950 bg-noise overflow-hidden">
      <div className="orb orb-blue w-[350px] h-[350px] top-0 left-[-80px] opacity-20" />

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
            Beyond the classroom
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-white mb-4">
            Leadership &{" "}
            <span className="gradient-text">Extra-Curricular</span>
          </h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        <div className="flex flex-col gap-6">
          {leadership.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass-card rounded-2xl p-7 flex items-start gap-5"
            >
              <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20">
                <Star size={22} className="text-yellow-400" fill="currentColor" />
              </div>
              <div>
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-white text-base">{item.role}</h3>
                  <span className="text-xs px-3 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                    {item.dates}
                  </span>
                </div>
                <p className="text-slate-500 text-xs mb-2">{item.institution}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
