import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  CloudCog,
  Coins,
  Download,
  Globe,
  Layers,
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
    label: 'Cloud transformations',
    value: '34',
    detail: 'End-to-end migrations shipped across AWS, Azure, GCP.',
  },
  {
    label: 'Automation pipelines',
    value: '58',
    detail: 'CI/CD tracks hardened with observability & guardrails.',
  },
  {
    label: 'Spend efficiency',
    value: '↑28%',
    detail: 'Average improvement through FinOps frameworks & telemetry.',
  },
];

const focusPillars = [
  {
    title: 'Platform Engineering',
    caption: 'Calm, observable delivery engines',
    icon: CloudCog,
    points: [
      'Blueprint pragmatic multi-cloud topologies and landing zones.',
      'Codify infrastructure with Terraform, Pulumi, Crossplane.',
      'Install golden paths that keep delivery aligned with compliance.',
    ],
  },
  {
    title: 'DevOps Leadership',
    caption: 'Velocity without losing trust',
    icon: Users,
    points: [
      'Coach teams on GitOps, progressive delivery, and incident response.',
      'Wire telemetry (Grafana, Honeycomb, PagerDuty) into engineering rituals.',
      'Run ship room sessions that translate metrics into action.',
    ],
  },
  {
    title: 'FinOps & Economics',
    caption: 'Spend transparency that sticks',
    icon: Coins,
    points: [
      'Connect product usage to cost with Finout, Looker Studio, dbt.',
      'Roll out showback/chargeback and budget guardrails that teams love.',
      'Forecast cloud runway with ±5% confidence over 12+ weeks.',
    ],
  },
];

const experienceTimeline = [
  {
    period: 'Nov 2022 — Present',
    role: 'Cloud Architect & DevOps Lead',
    company: 'NirogStreet · Bengaluru',
    highlights: [
      'Lead infrastructure automation across Jenkins, Terraform, Kubernetes, securing dependable release cadences.',
      'Own observability (Teleport, Grafana, Loki, Prometheus) to keep teams incident-ready.',
      'Embed FinOps workflows that tie platform velocity to responsible spend.',
    ],
  },
  {
    period: 'Sep 2021 — Nov 2022',
    role: 'Cloud Architect',
    company: 'HybridSkill (HCL) · Bengaluru',
    highlights: [
      'Migrated legacy estates to AWS with auto-scaling, CloudWatch, and guardrails for compliance.',
      'Launched FinOps governance and visibility dashboards embraced by engineering + finance.',
      'Enabled self-service infrastructure that unblocked product teams.',
    ],
  },
  {
    period: 'Jun 2021 — Aug 2021',
    role: 'DevOps Engineer',
    company: 'Saaspect · Bengaluru',
    highlights: [
      'Automated backups, system updates, and deployments to slash operational toil.',
      'Integrated automation into CI/CD for faster, safer feedback loops.',
      'Established proactive monitoring and cron-based maintenance routines.',
    ],
  },
  {
    period: 'Mar 2020 — May 2020',
    role: 'Data Analyst',
    company: 'EthicalByte (Uber) · Remote',
    highlights: [
      'Analyzed operations data using Python & Pandas to surface performance opportunities.',
      'Built demand models that improved forecasting accuracy for partners.',
      'Delivered dashboards that shifted strategic resource allocation.',
    ],
  },
];

const toolkit = [
  {
    category: 'Languages & Runtime',
    items: ['TypeScript', 'Go', 'Python', 'Node.js', 'Bash'],
  },
  {
    category: 'Delivery & Automation',
    items: ['Terraform', 'Pulumi', 'Crossplane', 'Argo CD', 'GitHub Actions', 'Jenkins'],
  },
  {
    category: 'Data & Messaging',
    items: ['PostgreSQL', 'Redis', 'Kafka', 'PlanetScale', 'BigQuery'],
  },
  {
    category: 'Observability & Ops',
    items: ['Grafana', 'Prometheus', 'Datadog', 'Honeycomb', 'PagerDuty', 'Elastic'],
  },
  {
    category: 'Frontend & DX',
    items: ['React', 'Next.js', 'Vite', 'Tailwind', 'Storybook', 'Framer Motion'],
  },
  {
    category: 'FinOps & Analytics',
    items: ['Finout', 'AWS Cost Explorer', 'Azure Cost Management', 'Looker Studio', 'dbt'],
  },
];

const recognitions = [
  {
    title: 'AWS Solutions Architect — Associate (Learning Path)',
    issuer: 'Amazon Web Services',
    year: 2023,
  },
  {
    title: 'Associate Cloud Engineer',
    issuer: 'Google Cloud',
    year: 2021,
  },
  {
    title: 'Google Cloud Infrastructure (Core Services)',
    issuer: 'Google Cloud Skill Boost',
    year: 2021,
  },
  {
    title: 'Migrating to Google Cloud',
    issuer: 'Google Cloud Skill Boost',
    year: 2022,
  },
  {
    title: 'Docker Essentials & Developer Introduction',
    issuer: 'IBM SkillsBuild',
    year: 2020,
  },
  {
    title: 'Cyber Security Awareness (ANSEC)',
    issuer: 'Safex ANSEC',
    year: 2022,
  },
];

export default function About() {
  useDocumentTitle('About — Mohammed Matheen');

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background-dark via-black to-background-dark pb-20 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-gradient-start/25 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-gradient-end/15 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6">
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
                I help founders and engineering teams ship calm platforms where architecture, DevOps, FinOps, and product
                engineering move together.
              </h1>
              <p className="text-sm text-gray-300 sm:text-base">
                Migrations, delivery engines, spend telemetry, and customer-facing apps—handled as one program. I blend
                hands-on engineering with enablement so modern practices sustain long after launch.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-6 py-3 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition hover:-translate-y-0.5 hover:shadow-gradient-mid/40"
                >
                  <Briefcase className="h-4 w-4" />
                  Discuss a project
                </Link>
                <a
                  href="/mohammed.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/40 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                  Download resume
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/50 p-6">
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Current Mission</p>
                  <p className="mt-2 text-sm text-gray-200">
                    Architecting zero-downtime delivery systems, embedding FinOps guardrails, and coaching teams to keep
                    progress measurable after launch.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-white/10 bg-black/40 p-4">
                      <p className="text-xs uppercase tracking-[0.32em] text-gray-400">{stat.label}</p>
                      <p className="mt-2 text-xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-1 text-[11px] text-gray-400">{stat.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="mb-8 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-gradient-start" />
            <h2 className="text-3xl font-semibold text-white">How I operate</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {focusPillars.map((pillar) => (
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
                    <p className="text-xs uppercase tracking-[0.32em] text-gray-400">{pillar.caption}</p>
                    <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                  </div>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <CheckCircle2 className="mt-[2px] h-4 w-4 flex-shrink-0 text-gradient-start" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <div className="mb-8 flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-gradient-start" />
            <h2 className="text-3xl font-semibold text-white">Experience timeline</h2>
          </div>
          <div className="relative space-y-6 border-l border-white/10 pl-6">
            <span className="absolute left-0 top-2 h-3 w-3 -translate-x-[7px] rounded-full bg-gradient-start" />
            {experienceTimeline.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.period}`}
                variants={fade}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl border border-white/10 bg-black/35 p-6 shadow-lg shadow-black/20"
              >
                <span className="absolute left-[-13px] top-6 h-3 w-3 rounded-full border border-gradient-start bg-background-dark" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-gray-400">{item.period}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.role}</h3>
                    <p className="text-sm text-gray-400">{item.company}</p>
                  </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="h-3.5 w-3.5 text-gradient-start" />
                  {item.period}
                </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <ArrowRight className="mt-1 h-3 w-3 flex-shrink-0 text-gradient-start" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <div className="mb-8 flex items-center gap-3">
            <Layers className="h-6 w-6 text-gradient-start" />
            <h2 className="text-3xl font-semibold text-white">Toolkit & operating system</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {toolkit.map((group) => (
              <motion.div
                key={group.category}
                variants={fade}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-black/30 p-6 transition hover:border-gradient-start/60"
              >
                <p className="text-sm uppercase tracking-[0.32em] text-gray-400">{group.category}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-gray-200 transition hover:border-gradient-start/60 hover:text-white"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <div className="mb-8 flex items-center gap-3">
            <Globe className="h-6 w-6 text-gradient-start" />
            <h2 className="text-3xl font-semibold text-white">Certifications & community</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recognitions.map((item) => (
              <motion.div
                key={`${item.title}-${item.year}`}
                variants={fade}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-black/35 p-6 transition hover:border-gradient-start/60"
              >
                <p className="text-xs uppercase tracking-[0.32em] text-gray-400">{item.year}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{item.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 rounded-3xl bg-gradient-to-l from-gradient-end/20 via-transparent to-transparent" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Next Step</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Ready to align platform velocity with business outcomes?
                </h2>
                <p className="mt-4 text-sm text-gray-300">
                  Whether you need a partner to lead a migration, bootstrap platform engineering, or tighten FinOps &
                  incident response loops, I can help your team move confidently.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-6 py-3 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition hover:-translate-y-0.5 hover:shadow-gradient-mid/40"
                >
                  <Briefcase className="h-4 w-4" />
                  Start a conversation
                </Link>
                <a
                  href="/mohammed.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/40 hover:text-white"
                >
                  <Layers className="h-4 w-4" />
                  View full CV
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
