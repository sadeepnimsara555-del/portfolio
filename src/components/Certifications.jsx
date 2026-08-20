import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "../data/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 bg-navy-900 bg-noise overflow-hidden">
      <div className="orb orb-violet w-[350px] h-[350px] bottom-[-80px] right-0 opacity-20" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Professional credentials
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-white mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {certifications.map((cert) => (
            <motion.a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="glass-card rounded-2xl p-6 flex items-start gap-4 group no-underline cursor-none"
            >
              <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20">
                <Award size={22} className="text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-white text-sm leading-snug mb-1 group-hover:gradient-text transition-all">
                  {cert.title}
                </h3>
                <p className="text-slate-500 text-xs">{cert.issuer}</p>
              </div>
              <ExternalLink
                size={16}
                className="text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0 mt-1"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
