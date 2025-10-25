import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CloudCog,
  Code2,
  Coins,
  Github,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const heroStats = [
  {
    icon: <Activity className="h-4 w-4 text-gradient-start" />,
    label: 'Deployments under management',
    value: '320+ pipelines',
  },
  {
    icon: <BarChart3 className="h-4 w-4 text-gradient-mid" />,
    label: 'Average cloud spend optimized',
    value: '40% efficiency gain',
  },
  {
    icon: <ShieldCheck className="h-4 w-4 text-gradient-end" />,
    label: 'Reliability targets hit',
    value: '99.95%+ SLOs',
  },
];

const projects = [
  {
    title: 'Global Commerce Cloud Backbone',
    focus: 'Multi-cloud architecture & FinOps',
    summary:
      'Led the migration of a commerce platform across AWS and Azure with unified networking, traffic management, and spend telemetry dashboards that inform executive decisions in real time.',
    stack: ['AWS', 'Azure Front Door', 'Terraform', 'Databricks', 'Grafana'],
    outcomes: [
      { label: 'Latency', value: '↓41%', detail: 'Region-aware routing and edge caching.' },
      { label: 'Spend efficiency', value: '+26%', detail: 'Rightsizing and unit economics instrumentation.' },
    ],
    links: { caseStudy: '/contact?topic=commerce-cloud' },
    icon: <CloudCog className="h-5 w-5" />,
  },
  {
    title: 'Continuous Delivery Control Plane',
    focus: 'DevOps enablement & platform engineering',
    summary:
      'Built a self-service deployment engine with GitOps workflows, progressive delivery, and golden-path templates that accelerated release velocity across 40+ services.',
    stack: ['Kubernetes', 'Argo CD', 'Backstage', 'Helm', 'OpenTelemetry'],
    outcomes: [
      { label: 'Lead time', value: '↓37%', detail: 'Automated testing gates & rollout policies.' },
      { label: 'Deploys', value: '420+/month', detail: 'Reliable, low-friction releases.' },
    ],
    links: { caseStudy: '/contact?topic=platform-engineering' },
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: 'FinOps Control Tower',
    focus: 'Cloud cost governance',
    summary:
      'Designed a FinOps framework for a SaaS scaleup, connecting cost data to product usage, enabling showback/chargeback, and embedding spend alerts into engineering rituals.',
    stack: ['AWS Cost Explorer', 'Finout', 'dbt', 'Looker Studio', 'Lambda'],
    outcomes: [
      { label: 'Forecast accuracy', value: '±5%', detail: '12-week rolling forecast confidence.' },
      { label: 'Waste eliminated', value: '$2.3M', detail: 'Idle assets and over-provisioning removed.' },
    ],
    links: { caseStudy: '/contact?topic=finops' },
    icon: <Coins className="h-5 w-5" />,
  },
  {
    title: 'Zero-Downtime Reliability Initiative',
    focus: 'SRE & security alignment',
    summary:
      'Implemented chaos engineering, SLO dashboards, and incident response playbooks with security guardrails, improving customer trust and compliance posture.',
    stack: ['Chaos Mesh', 'Honeycomb', 'PagerDuty', 'OPA Gatekeeper', 'Vault'],
    outcomes: [
      { label: 'MTTR', value: '↓63%', detail: 'Faster triage with contextual telemetry.' },
      { label: 'Compliance', value: 'SOC2 Type II', detail: 'Achieved ahead of schedule.' },
    ],
    links: { caseStudy: '/contact?topic=sre' },
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: 'Fullstack Customer Portal',
    focus: 'Product engineering & experience',
    summary:
      'Delivered a composable React + Node platform for customer onboarding, project tracking, and billing visibility, tying UI flows directly into automation pipelines and FinOps insights.',
    stack: ['TypeScript', 'React (Vite)', 'Express', 'PostgreSQL', 'Tailwind'],
    outcomes: [
      {
        label: 'Time-to-value',
        value: '↘ 45%',
        detail: 'Launch to first milestone reduced from weeks to days.',
      },
      { label: 'Support load', value: '↓32%', detail: 'Self-serve workflows and real-time status dashboards.' },
    ],
    links: { caseStudy: '/contact?topic=fullstack' },
    icon: <Code2 className="h-5 w-5" />,
  },
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Projects() {
  useDocumentTitle('Projects & Case Studies — Mohammed Matheen');

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background-dark via-black to-background-dark pb-20 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-36 left-1/4 h-80 w-80 rounded-full bg-gradient-start/25 blur-[140px]" />
        <div className="absolute bottom-0 right-1/5 h-72 w-72 rounded-full bg-gradient-end/15 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 rounded-3xl bg-gradient-to-l from-gradient-end/20 via-transparent to-transparent" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-5 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.38em] text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-gradient-start" />
                Field Notes
              </span>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                Shipping calm, observable platforms that respect customer trust and cloud budgets.
              </h1>
              <p className="text-sm text-gray-300 sm:text-base">
                Each engagement blends architecture, DevOps enablement, and cost telemetry. Here’s a sampling of
                programs where we turned runway and ambition into resilient systems.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1">
                  <Github className="h-3.5 w-3.5 text-gradient-start" />
                  Hands-on engineering leadership
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1">
                  <ArrowRight className="h-3.5 w-3.5 text-gradient-mid" />
                  FinOps-first playbooks
                </span>
              </div>
            </div>
            <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-gray-200 sm:grid-cols-2">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-gray-400">
                    {stat.icon}
                    {stat.label}
                  </div>
                  <p className="mt-2 text-lg font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.header>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fade}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-black/40 p-6 shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-gradient-start/70"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.32em] text-gray-300">
                  {project.icon}
                  {project.focus}
                </span>
                <ArrowUpRight className="h-4 w-4 text-gradient-start opacity-0 transition group-hover:opacity-100" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{project.title}</h2>
              <p className="mt-3 text-sm text-gray-300">{project.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-gray-200 sm:grid-cols-2">
                {project.outcomes.map((outcome) => (
                  <div key={outcome.label}>
                    <p className="text-xs uppercase tracking-[0.32em] text-gray-400">{outcome.label}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{outcome.value}</p>
                    <p className="text-xs text-gray-400">{outcome.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.links?.caseStudy && (
                  <motion.a
                    href={project.links.caseStudy}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full border border-gradient-start/60 px-4 py-2 text-xs font-semibold text-gradient-start transition hover:bg-gradient-start/10"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Request case study
                  </motion.a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
