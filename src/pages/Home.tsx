import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Rocket, Sparkles, Cloud, Server, ShieldCheck, Coins, Code2 } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const socials = [
  { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com/mohammedmatheensharieff' },
  { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammedmatheensharieff/' },
  { icon: <Mail size={18} />, label: 'Email', href: 'mailto:mohammed@zoeencloud.in' },
];

const highlights = [
  { icon: <Cloud size={18} />, title: 'Cloud Architect', detail: 'Multi-cloud & platform engineering for scale.' },
  { icon: <Server size={18} />, title: 'DevOps Lead', detail: 'CI/CD, GitOps, and actionable observability.' },
  { icon: <Code2 size={18} />, title: 'Fullstack Builder', detail: 'Product-ready web experiences with performant APIs.' },
  { icon: <Coins size={18} />, title: 'FinOps Strategist', detail: 'Cost governance, spend telemetry, and value dashboards.' },
  { icon: <ShieldCheck size={18} />, title: 'Reliability & SecOps', detail: 'Zero-downtime delivery with secure guardrails.' },
];

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.6, 0, 0.2, 1] },
  },
};

export default function Home() {
  useDocumentTitle('Mohammed Matheen — Cloud Architect & DevOps Lead');

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background-dark via-gray-950 to-background-dark">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-gradient-start/20 via-gradient-mid/10 to-gradient-end/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-gradient-mid/20 via-gradient-start/10 to-gradient-end/20 blur-[120px]" />
      </div>

      <motion.section
        variants={fade}
        initial="hidden"
        animate="show"
        className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-5 text-center sm:px-6"
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gray-300"
          variants={fade}
        >
          <Sparkles size={14} className="text-gradient-start" />
          Cloud Architect · DevOps Lead · FinOps
        </motion.div>

        <motion.h1
          variants={fade}
          className="mt-8 text-4xl font-semibold text-white sm:text-5xl lg:text-6xl"
        >
          Designing modern cloud platforms that ship fast and stay dependable.
        </motion.h1>

        <motion.p
          variants={fade}
          className="mt-6 max-w-3xl text-base text-gray-400 sm:text-lg"
        >
          I help teams launch resilient experiences across AWS, Azure, and GCP by pairing automation and FinOps guardrails.
          Think ship-ready infrastructure, stress-tested delivery, and spend transparency that keeps teams in control.
        </motion.p>

        <motion.div variants={fade} className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-6 py-3 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition hover:-translate-y-0.5 hover:shadow-gradient-mid/40"
          >
            <Rocket size={18} />
            Build Together
          </a>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/30 hover:text-white"
          >
            <ArrowRight size={18} />
            Recent Work
          </a>
        </motion.div>

        <motion.div variants={fade} className="mt-10 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-semibold transition hover:border-white/30 hover:text-white"
            >
              <span className="rounded-full bg-gradient-to-br from-gradient-start/40 via-gradient-mid/40 to-gradient-end/40 p-1 text-background-dark transition group-hover:from-gradient-start group-hover:via-gradient-mid group-hover:to-gradient-end">
                {social.icon}
              </span>
              {social.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={fade}
          className="mt-14 grid w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-black/30 px-4 py-6 text-center"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start/30 via-gradient-mid/25 to-gradient-end/30 text-white">
                {item.icon}
              </span>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-gray-400">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}
