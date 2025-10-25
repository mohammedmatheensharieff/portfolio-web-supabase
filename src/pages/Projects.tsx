import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  CloudCog,
  Workflow,
  Coins,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Code2,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const projects = [
  {
    title: 'Global Commerce Cloud Backbone',
    focus: 'Multi-cloud architecture & FinOps',
    summary:
      'Led the migration of a commerce platform across AWS and Azure with unified networking, traffic management, and spend telemetry dashboards that inform executive decisions in real time.',
    stack: ['AWS', 'Azure Front Door', 'Terraform', 'Databricks', 'Grafana'],
    outcomes: [
      { label: 'Latency', value: '↓41%', detail: 'Region-aware routing and edge caching' },
      { label: 'Spend Efficiency', value: '+26%', detail: 'Rightsizing, commitments, and unit economics' },
    ],
    links: {
      caseStudy: '/contact?topic=commerce-cloud',
    },
    icon: <CloudCog size={22} />,
  },
  {
    title: 'Continuous Delivery Control Plane',
    focus: 'DevOps enablement & platform engineering',
    summary:
      'Built a self-service deployment engine with GitOps workflows, progressive delivery, and golden-path templates that accelerated release velocity across 40+ services.',
    stack: ['Kubernetes', 'ArgoCD', 'Backstage', 'Helm', 'OpenTelemetry'],
    outcomes: [
      { label: 'Lead Time', value: '↓37%', detail: 'Automated testing gates & rollout policies' },
      { label: 'Deploys', value: '420+ / month', detail: 'Reliable, low-friction releases' },
    ],
    links: {
      caseStudy: '/contact?topic=platform-engineering',
    },
    icon: <Workflow size={22} />,
  },
  {
    title: 'FinOps Control Tower',
    focus: 'Cloud cost governance',
    summary:
      'Designed a FinOps framework for a SaaS scaleup, connecting cost data to product usage, enabling showback/chargeback, and embedding spend alerts into engineering rituals.',
    stack: ['AWS Cost Explorer', 'Finout', 'dbt', 'Looker Studio', 'Lambda'],
    outcomes: [
      { label: 'Forecast Accuracy', value: '±5%', detail: '12-week rolling forecast confidence' },
      { label: 'Waste Eliminated', value: '$2.3M', detail: 'Idle assets and over-provisioning removed' },
    ],
    links: {
      caseStudy: '/contact?topic=finops',
    },
    icon: <Coins size={22} />,
  },
  {
    title: 'Zero-Downtime Reliability Initiative',
    focus: 'SRE & security alignment',
    summary:
      'Implemented chaos engineering, SLO dashboards, and incident response playbooks with security guardrails, improving customer trust and compliance posture.',
    stack: ['Chaos Mesh', 'Honeycomb', 'PagerDuty', 'OPA Gatekeeper', 'Vault'],
    outcomes: [
      { label: 'MTTR', value: '↓63%', detail: 'Faster triage with contextual telemetry' },
      { label: 'Compliance', value: 'SOC2 Type II', detail: 'Achieved ahead of schedule' },
    ],
    links: {
      caseStudy: '/contact?topic=sre',
    },
    icon: <ShieldCheck size={22} />,
  },
  {
    title: 'Fullstack Customer Portal',
    focus: 'Product engineering & experience',
    summary:
      'Delivered a composable React + Node platform for customer onboarding, project tracking, and billing visibility, tying UI flows directly into automation pipelines and FinOps insights.',
    stack: ['TypeScript', 'React (Vite)', 'Express', 'Supabase', 'Tailwind'],
    outcomes: [
      { label: 'Time-to-value', value: '↘ 45%', detail: 'Launch to first customer milestone reduced from weeks to days' },
      { label: 'Support Load', value: '↓ 32%', detail: 'Self-serve workflows and real-time status dashboards' },
    ],
    links: {
      caseStudy: '/contact?topic=fullstack',
    },
    icon: <Code2 size={22} />,
  },
];

export default function Projects() {
  useDocumentTitle('Projects & Case Studies — Mohammed Matheen');

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background-dark via-gray-950 to-background-dark py-16 px-4 sm:px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-gradient-start/20 via-gradient-mid/10 to-gradient-end/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-br from-gradient-mid/20 via-gradient-start/10 to-gradient-end/20 blur-[120px]" />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="mx-auto max-w-6xl space-y-14">
        <motion.header variants={fadeUp} className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gray-300">
            <Sparkles size={14} className="text-gradient-start" />
            DevOps · Cloud · FinOps
          </div>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Impact stories from the platform lane</h1>
          <p className="mx-auto max-w-3xl text-sm text-gray-400 sm:text-base">
            A snapshot of recent work translating engineering ambition into resilient delivery engines. Each engagement
            blends architecture, automation, and FinOps telemetry so teams can move fast without burning trust or budget.
          </p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-gradient-start/60 hover:bg-gradient-start/5"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-gray-400">
                    {project.icon}
                    {project.focus}
                  </span>
                  <ArrowUpRight size={18} className="text-gradient-start opacity-0 transition group-hover:opacity-100" />
                </div>
                <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                <p className="text-sm text-gray-400">{project.summary}</p>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-200 sm:grid-cols-2">
                  {project.outcomes.map((outcome) => (
                    <div key={outcome.label}>
                      <p className="text-xs uppercase tracking-wide text-gray-400">{outcome.label}</p>
                      <p className="text-lg font-semibold text-white">{outcome.value}</p>
                      <p className="text-xs text-gray-400">{outcome.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-300">
                  {project.links?.caseStudy && (
                    <motion.a
                      href={project.links.caseStudy}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 rounded-full border border-gradient-start/50 px-3 py-2 text-gradient-start transition hover:border-gradient-start hover:bg-gradient-start/10"
                    >
                      <ShieldCheck size={16} />
                      Request case study
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
