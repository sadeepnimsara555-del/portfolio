import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalInfo } from "../data/data";

// ============================================================
//  📧 EmailJS Configuration — keys are read from .env
//  Set these variables in your .env file:
//    VITE_EMAILJS_SERVICE_ID=your_service_id
//    VITE_EMAILJS_TEMPLATE_ID=your_template_id
//    VITE_EMAILJS_PUBLIC_KEY=your_public_key
// ============================================================
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Template variables expected by EmailJS:
//   {{from_name}} — sender's name
//   {{from_email}} — sender's email
//   {{subject}}   — email subject
//   {{message}}   — message body

const SOCIALS = [
  { href: personalInfo.socials.github, Icon: FaGithub, label: "GitHub" },
  { href: personalInfo.socials.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
  { href: personalInfo.socials.email, Icon: Mail, label: "Email" },
];

const InputClass =
  "w-full bg-navy-800/70 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200";

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guard: warn clearly if env vars are not set
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY ||
        EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
      console.error(
        "EmailJS is not configured. Please fill in your VITE_EMAILJS_* values in the .env file."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-navy-900 bg-noise overflow-hidden">
      <div className="orb orb-blue w-[450px] h-[450px] top-[-80px] right-[-100px] opacity-20" />
      <div className="orb orb-violet w-[350px] h-[350px] bottom-0 left-[-60px] opacity-20" />

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
            Let's connect
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-slate-400 text-sm mt-6 max-w-xl mx-auto">
            Whether you have a project in mind, an internship opportunity, or just want to say hi — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Left — Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex flex-col justify-center gap-5"
          >
            <div>
              <h3 className="font-heading font-semibold text-white text-lg mb-1">
                Sadeep Nimsara Godage
              </h3>
              <p className="text-slate-500 text-sm">{personalInfo.location}</p>
            </div>

            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors text-sm group cursor-none"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-700/60 bg-slate-800/40 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                    <Icon size={17} />
                  </div>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              id="contact-form"
              className="glass-card rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="from_name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className={InputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="from_email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className={InputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="contact-subject">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Internship Opportunity / Project Collaboration"
                  className={InputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Hey Sadeep, I'd love to discuss..."
                  className={`${InputClass} resize-none`}
                />
              </div>

              {/* Submit Button */}
              <button
                id="contact-submit"
                type="submit"
                disabled={status === "sending"}
                className="btn-gradient flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm w-full cursor-none disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              {/* Feedback */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3"
                >
                  <CheckCircle size={16} />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
