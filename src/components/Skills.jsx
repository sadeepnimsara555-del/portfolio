import { motion } from "framer-motion";
import { Code2, Layers, Brain, Database, Users } from "lucide-react";
import { skills } from "../data/data";

const ICON_MAP = { Code2, Layers, Brain, Database, Users };

const CATEGORY_COLORS = [
  "from-blue-500/20 to-cyan-500/20 border-blue-500/20",
  "from-indigo-500/20 to-blue-500/20 border-indigo-500/20",
  "from-violet-500/20 to-indigo-500/20 border-violet-500/20",
  "from-purple-500/20 to-violet-500/20 border-purple-500/20",
  "from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/20",
];
const ICON_COLORS = [
  "text-cyan-400",
  "text-blue-400",
  "text-indigo-400",
  "text-violet-400",
  "text-fuchsia-400",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.05, ease: "easeOut" },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 bg-navy-950 bg-noise overflow-hidden">
      <div className="orb orb-blue w-[350px] h-[350px] bottom-0 left-[-80px] opacity-25" />

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
            What I work with
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-white mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        {/* Skill Group Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((group, gi) => {
            const Icon = ICON_MAP[group.icon] || Code2;
            const colorClass = CATEGORY_COLORS[gi % CATEGORY_COLORS.length];
            const iconColor = ICON_COLORS[gi % ICON_COLORS.length];

            return (
              <motion.div
                key={group.category}
                variants={cardVariants}
                className="glass-card rounded-2xl p-6"
              >
                {/* Card Header */}
                <div className={`flex items-center gap-3 mb-5`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${colorClass} border`}>
                    <Icon size={18} className={iconColor} />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm">{group.category}</h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, ti) => (
                    <motion.span
                      key={item}
                      variants={tagVariants}
                      custom={ti}
                      className="tech-tag"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
