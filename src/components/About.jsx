import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { MapPin, Cpu, Code2, Smartphone } from "lucide-react";
import { personalInfo } from "../data/data";

// Lazy-load the 3D profile frame canvas
const ProfileFrame3D = lazy(() => import("./ProfileFrame3D"));

const HIGHLIGHTS = [
  { icon: Cpu, label: "AI & Machine Learning", desc: "Python, TensorFlow, Scikit-learn, NLP" },
  { icon: Code2, label: "Full-Stack Development", desc: "MERN stack, Java Spring Boot, REST APIs" },
  { icon: Smartphone, label: "Mobile Development", desc: "React Native cross-platform apps" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-noise overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-violet w-[400px] h-[400px] top-0 right-[-100px] opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Get to know me
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left — 3D Profile Model Frame */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center justify-center relative"
          >
            <div className="relative flex items-center justify-center">
              <Suspense
                fallback={
                  <div className="w-[300px] h-[300px] flex items-center justify-center relative">
                    <div className="w-56 h-56 rounded-full p-1 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 animate-pulse">
                      <img
                        src="/profile.jpg"
                        alt={personalInfo.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                }
              >
                <ProfileFrame3D />
              </Suspense>

              {/* Floating location badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-800/90 border border-indigo-500/30 backdrop-blur-md shadow-lg shadow-indigo-500/20 whitespace-nowrap z-20"
              >
                <MapPin size={12} className="text-indigo-400" />
                <span className="text-slate-300 text-xs font-medium">{personalInfo.location}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Middle — Bio text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-slate-300 text-base leading-8">
              {personalInfo.intro}
            </p>
          </motion.div>

          {/* Right — Highlight cards */}
          <div className="flex flex-col gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i + 2}
                viewport={{ once: true, margin: "-80px" }}
                className="glass-card rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-indigo-500/20">
                  <Icon size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-0.5">{label}</h3>
                  <p className="text-slate-400 text-xs">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
