import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Cloud,
  CloudCog,
  Code2,
  Coins,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const heroStats = [
  {
    label: 'Cloud migrations shipped',
    value: '34',
    icon: Activity,
    description: 'Multi-cloud rollouts with resilient failover and compliance guardrails.',
  },
  {
    label: 'Automation pipelines',
    value: '58',
    icon: BarChart3,
    description: 'GitOps, testing, and release workflows that keep delivery calm.',
  },
  {
    label: 'Average spend saved',
    value: '40%',
    icon: Coins,
    description: 'FinOps guardrails and unit economics aligning product velocity to runway.',
  },
  {
    label: 'Reliability targets met',
    value: '99.95%',
    icon: ShieldCheck,
    description: 'Incident-ready observability, chaos drills, and zero-trust policies.',
  },
];

const pillars = [
  {
    category: 'Cloud Architecture',
    icon: CloudCog,
    summary: 'Multi-cloud landing zones, resilient networking, and blueprint governance that scales.',
    bullets: [
      'Design pragmatic AWS, Azure, and GCP architectures with redundancy by default.',
      'Codify infrastructure with Terraform, Pulumi, Crossplane, and policy guardrails.',
      'Launch observability-first platforms with service catalogues and golden path templates.',
    ],
  },
  {
    category: 'DevOps & SRE',
    icon: Users,
    summary: 'Velocity with control—CI/CD foundations, GitOps, and incident-ready telemetry.',
    bullets: [
      'Build progressive delivery workflows with automated testing and safe rollbacks.',
      'Instrument alerting and tracing (Grafana, Honeycomb, PagerDuty) that guide teams.',
      'Lead runbooks, chaos drills, and ship-room reviews that keep momentum calm.',
    ],
  },
  {
    category: 'FinOps & Economics',
    icon: Coins,
    summary: 'Spend clarity that teams adopt—telemetry, showback, and forecasting within ±5%.',
    bullets: [
      'Connect product usage to cloud cost using Finout, Looker Studio, and dbt.',
      'Implement budget guards, alerts, and executive dashboards leaders rely on.',
      'Coach engineers on unit economics so shipping decisions align with runway.',
    ],
  },
  {
    category: 'Fullstack Product Delivery',
    icon: Code2,
    summary: 'Composable TypeScript stacks, API design, and customer experiences ready for prime time.',
    bullets: [
      'Ship React/Next.js frontends with design systems and performance baked in.',
      'Build Node/Express APIs, Postgres backends, and automation that connect to CI.',
      'Embed DX tooling and docs so teams iterate confidently after launch.',
    ],
  },
];

const capabilityHighlights = [
  {
    icon: <Cloud className="h-5 w-5" />,
    title: 'Cloud Platforms',
    detail: 'Full-stack expertise across AWS, Azure, GCP, curated for high availability and compliance.',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Team Enablement',
    detail: 'Playbooks, workshops, and leadership coaching that make modern practices stick.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Reliability & Security',
    detail: 'Incident response, chaos engineering, and zero-trust guardrails woven through every stack.',
  },
  {
    icon: <Coins className="h-5 w-5" />,
    title: 'FinOps Integration',
    detail: 'Spend telemetry, dashboards, and cost culture adopted by engineering and finance alike.',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Product Engineering',
    detail: 'Customer-facing portals, APIs, and automation pipelines shipping from idea to production.',
  },
];

export default function Home() {
  useDocumentTitle('Mohammed Matheen — Cloud Architect & DevOps Lead');

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background-dark via-black to-background-dark pb-20 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-36 left-1/4 h-80 w-80 rounded-full bg-gradient-start/25 blur-[140px]" />
        <div className="absolute bottom-0 right-1/5 h-80 w-80 rounded-full bg-gradient-end/15 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 sm:px-6">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 rounded-3xl bg-gradient-to-l from-gradient-end/20 via-transparent to-transparent" />
          <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.38em] text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-gradient-start" />
                Cloud · DevOps · FinOps · Fullstack
              </span>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                Partnering with teams to ship modern cloud platforms, compassionate DevOps, trusted FinOps, and polished
                product experiences.
              </h1>
              <p className="text-sm text-gray-300 sm:text-base">
                From blueprint to production, I blend architecture, automation, economics, and customer-facing software
                so launches feel calm, observable, and accountable to the business.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-6 py-3 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition hover:-translate-y-0.5 hover:shadow-gradient-mid/40"
                >
                  <Rocket className="h-4 w-4" />
                  Build together
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/40 hover:text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                  View case studies
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/50 p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-gray-400">Signal board</p>
              <p className="mt-3 text-sm text-gray-200">
                A quick readout from recent programs: runway protected, reliability tightened, and releases accelerated.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-black/40 p-4">
                    {React.createElement(stat.icon, { className: 'h-4 w-4 text-gradient-start' })}
                    <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.32em] text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <div className="mb-8 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-gradient-start" />
            <h2 className="text-3xl font-semibold text-white">End-to-end delivery frame</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fade}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-gradient-start/60"
              >
                <div className="flex items-center gap-3">
                  {React.createElement(pillar.icon, {
                    className: 'h-5 w-5 text-gradient-start transition group-hover:scale-110',
                  })}
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-gray-400">{pillar.category}</p>
                    <h3 className="text-lg font-semibold text-white">{pillar.summary}</h3>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-gray-300">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <ArrowRight className="mt-[2px] h-3.5 w-3.5 flex-shrink-0 text-gradient-start" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <div className="mb-8 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-gradient-start" />
            <h2 className="text-3xl font-semibold text-white">Where I plug in</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilityHighlights.map((capability) => (
              <motion.div
                key={capability.title}
                variants={fade}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-gradient-start/60"
              >
                <div className="flex items-center gap-3 text-white">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start/30 via-gradient-mid/25 to-gradient-end/30 text-white">
                    {capability.icon}
                  </span>
                  <h3 className="text-lg font-semibold">{capability.title}</h3>
                </div>
                <p className="mt-3 text-sm text-gray-300">{capability.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 rounded-3xl bg-gradient-to-l from-gradient-end/20 via-transparent to-transparent" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Invite</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Need a partner to align infrastructure, delivery, and FinOps?
                </h2>
                <p className="mt-4 text-sm text-gray-300">
                  I plug in as an engineering co-pilot—shaping strategy, writing code, and coaching teams—so the systems
                  we ship stay healthy long after launch.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/40 hover:text-white"
                >
                  Explore case studies
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-6 py-3 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition hover:-translate-y-0.5 hover:shadow-gradient-mid/40"
                >
                  <Rocket className="h-4 w-4" />
                  Start a conversation
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
