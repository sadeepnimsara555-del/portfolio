import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { personalInfo } from "../data/data";

/**
 * Professional 3D Round Profile Frame
 * Features:
 * - Auto-running dual counter-rotating cybernetic dashed/dotted orbital lines
 * - Auto-orbiting energy comet pulse around the circular frame
 * - Smooth 3D interactive mouse parallax tilt with spring physics
 * - Multi-layer 3D depth separation
 * - High-visibility elevated 3D location badge (positioned in front)
 */
export default function ProfileFrame3D() {
  const frameRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics springs for natural 3D tilt
  const springConfig = { damping: 24, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);

  // Dynamic light reflection position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]), springConfig);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full cursor-pointer select-none flex items-center justify-center"
      >
        {/* ── Layer 0: Background Ambient Glow Halo ── */}
        <div
          className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-600/35 via-indigo-500/30 to-violet-600/35 blur-2xl transition-opacity duration-300 pointer-events-none"
          style={{
            transform: "translateZ(-25px)",
            opacity: isHovered ? 0.95 : 0.5,
          }}
        />

        {/* ── Layer 1: Auto-Running Outer Dashed Cyber Ring (Counter-Clockwise) ── */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 sm:-inset-5 pointer-events-none z-10"
          style={{
            transform: "translateZ(8px)",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 300 300">
            <circle
              cx="150"
              cy="150"
              r="142"
              fill="none"
              stroke="url(#outerDashedGradient)"
              strokeWidth="1.8"
              strokeDasharray="4 8"
              opacity="0.65"
            />
            {/* Tech markers along the ring */}
            <circle cx="150" cy="8" r="3" fill="#38bdf8" />
            <circle cx="150" cy="292" r="3" fill="#818cf8" />
            <circle cx="8" cy="150" r="3" fill="#c084fc" />
            <circle cx="292" cy="150" r="3" fill="#38bdf8" />

            <defs>
              <linearGradient id="outerDashedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* ── Layer 2: Auto-Running Inner Dotted Ring + Orbiting Comet (Clockwise) ── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-1.5 sm:-inset-2 pointer-events-none z-10"
          style={{
            transform: "translateZ(18px)",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 280 280">
            <circle
              cx="140"
              cy="140"
              r="134"
              fill="none"
              stroke="url(#innerDottedGradient)"
              strokeWidth="2"
              strokeDasharray="6 10"
              opacity="0.8"
            />
            {/* Glowing Orbiting Energy Comet */}
            <circle cx="140" cy="6" r="4.5" fill="#22d3ee" filter="url(#glowFilter)" />

            <defs>
              <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="innerDottedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* ── Layer 3: 3D Outer Solid Gradient Bezel Ring ── */}
        <div
          className="absolute inset-0 rounded-full p-[3.5px] bg-gradient-to-tr from-indigo-500 via-sky-400 to-violet-500 shadow-2xl shadow-indigo-950/80 transition-shadow duration-300"
          style={{
            transform: "translateZ(26px)",
          }}
        >
          <div className="w-full h-full rounded-full bg-navy-950/90 backdrop-blur-sm" />
        </div>

        {/* ── Layer 4: 3D Inner Glowing Accent Ring ── */}
        <div
          className="absolute inset-2 sm:inset-2.5 rounded-full p-[2px] bg-gradient-to-br from-blue-400/80 via-indigo-500/80 to-violet-500/80"
          style={{
            transform: "translateZ(38px)",
          }}
        >
          <div className="w-full h-full rounded-full bg-navy-900/90" />
        </div>

        {/* ── Layer 5: 3D Elevated Circular Portrait ── */}
        <div
          className="relative w-[calc(100%-20px)] h-[calc(100%-20px)] sm:w-[calc(100%-24px)] sm:h-[calc(100%-24px)] rounded-full overflow-hidden shadow-inner"
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src="/profile.jpg"
            alt={personalInfo.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />

          {/* ── Layer 6: Dynamic 3D Lens Sheen / Holographic Glare ── */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full mix-blend-overlay transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.5 : 0.15,
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.95) 0%, rgba(129,140,248,0.3) 45%, transparent 75%)`
              ),
              transform: "translateZ(56px)",
            }}
          />
        </div>

        {/* ── Layer 7: 3D Floating Location Pill (High Z-Index & in Front of Picture) ── */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-navy-900/98 border border-indigo-500/50 backdrop-blur-xl shadow-2xl shadow-black/80 whitespace-nowrap pointer-events-auto"
          style={{
            transform: "translateZ(90px)",
            zIndex: 50,
          }}
        >
          <MapPin size={13} className="text-indigo-400 shrink-0" />
          <span className="text-white text-xs font-medium tracking-wide">
            {personalInfo.location}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
