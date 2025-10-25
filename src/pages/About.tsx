import React from 'react';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  BriefcaseIcon,
  CheckCircle,
  Cloud,
  Code2,
  Database,
  Globe,
  Laptop,
  Layers,
  Link as LinkIcon,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';

const containerVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const listVariant = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const highlights = [
  { label: 'Years Leading Transformation', value: '7+', icon: Sparkles },
  { label: 'Cloud Migrations Delivered', value: '34', icon: Cloud },
  { label: 'Automation Pipelines Deployed', value: '58', icon: Code2 },
  { label: 'Teams Mentored', value: '12', icon: Users },
];

const narrative = [
  "I help ambitious teams translate complex business challenges into resilient cloud architectures. I've led cross-functional squads from discovery to delivery, aligning infrastructure decisions with product goals and budget realities.",
  "My sweet spot is where architecture, DevOps, and security converge. I drive hands-on delivery—codifying infrastructure, automating deployments, and installing feedback loops that help teams ship faster without sacrificing reliability.",
  "These days I'm building adaptive multi-cloud environments, advising on FinOps strategies, and coaching teams on adopting modern engineering practices that stick.",
];

const experience = [
  {
    period: '2022 — Present',
    company: 'Zoeen Cloud Solutions',
    title: 'Lead Cloud Architect',
    achievements: [
      'Designed a multi-cloud backbone supporting 45+ microservices with zero downtime deployments',
      'Cut infrastructure spend by 28% through data-backed rightsizing and spot instance orchestration',
      'Created the engineering playbook adopted by platform, security, and analytics teams',
    ],
  },
  {
    period: '2019 — 2022',
    company: 'Asterion Labs',
    title: 'Senior DevOps & Reliability Engineer',
    achievements: [
      'Implemented progressive delivery pipelines for mission-critical SaaS workloads',
      'Introduced automated chaos testing that improved mean time to recovery by 63%',
      'Mentored 9 engineers into platform-focused roles, scaling the DevOps guild',
    ],
  },
  {
    period: '2017 — 2019',
    company: 'Nimbus Digital',
    title: 'Cloud Infrastructure Engineer',
    achievements: [
      'Migrated legacy monolith workloads onto container platforms with full observability',
      'Launched governance guardrails and policy-as-code for regulated clients',
      'Collaborated with product leadership to shape SLAs and error budgets',
    ],
  },
];

const focusAreas = [
  {
    title: 'Cloud Platforms',
    icon: Globe,
    items: ['AWS Advanced Networking Specialty', 'Azure Solutions Architect', 'Google Cloud Professional Architect'],
  },
  {
    title: 'Automation Toolkit',
    icon: Code2,
    items: ['Terraform & Pulumi', 'Crossplane & ArgoCD', 'GitHub Actions, GitLab CI, Jenkins'],
  },
  {
    title: 'Resilience & Security',
    icon: Shield,
    items: ['Zero Trust design', 'Incident response playbooks', 'Kubernetes policy frameworks (OPA/Gatekeeper)'],
  },
];

const ecosystem = [
  {
    category: 'Languages & Runtime',
    tools: ['TypeScript', 'Go', 'Python', 'Node.js', 'Bash'],
  },
  {
    category: 'Data & Messaging',
    tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Supabase'],
  },
  {
    category: 'Observability',
    tools: ['Grafana', 'Prometheus', 'Elastic Stack', 'Datadog', 'Honeycomb'],
  },
  {
    category: 'Collaboration',
    tools: ['Linear', 'Jira', 'Confluence', 'Notion', 'Miro'],
  },
];

const recognitions = [
  {
    title: 'Certified Kubernetes Security Specialist',
    issuer: 'Cloud Native Computing Foundation',
    year: 2023,
  },
  {
    title: 'AWS Community Builder',
    issuer: 'Amazon Web Services',
    year: 2022,
  },
  {
    title: 'HashiCorp Ambassador',
    issuer: 'HashiCorp',
    year: 2021,
  },
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 lg:px-6">
      <motion.section variants={containerVariant} initial="hidden" animate="show" className="mb-16">
        <div className="grid lg:grid-cols-[3fr,2fr] gap-10">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-gradient-start mb-3">Cloud Architect · DevOps Lead</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-tight mb-6">
              Building resilient platforms where engineering momentum and business outcomes stay aligned.
            </h1>
            <div className="space-y-4">
              {narrative.map((paragraph, idx) => (
                <p key={idx} className="text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="mt-8 flex flex-wrap gap-4">
              <a
                href="/Mohammed_Matheen_Resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gradient-start to-gradient-end text-black px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <Layers size={20} />
                Download Full Resume
              </a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-gradient-start/60 px-6 py-3 rounded-lg font-medium text-gray-200 hover:border-white hover:text-white transition-all duration-300"
              >
                <BriefcaseIcon size={20} />
                Discuss a Project
              </motion.a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/30 via-transparent to-gradient-end/30 opacity-80" />
            <div className="relative p-8 space-y-6">
              <div>
                <span className="text-sm uppercase tracking-wide text-gray-400">Current Mission</span>
                <p className="text-lg text-white mt-2">
                  Architecting zero-downtime delivery systems and community programs that help teams scale with confidence.
                </p>
              </div>
              <motion.ul
                variants={listVariant}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-4"
              >
                {highlights.map((highlight) => (
                  <motion.li
                    key={highlight.label}
                    variants={itemVariant}
                    className="rounded-xl bg-gray-950/60 border border-gray-800 px-4 py-5"
                  >
                    <span className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
                      {React.createElement(highlight.icon, { size: 16, className: 'text-gradient-start' })}
                      {highlight.label}
                    </span>
                    <span className="text-2xl font-semibold text-white">{highlight.value}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section variants={containerVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-gradient-start" size={24} />
          <h2 className="text-3xl font-semibold text-white">Experience Timeline</h2>
        </div>
        <div className="space-y-6">
          {experience.map((role) => (
            <motion.article
              key={`${role.company}-${role.period}`}
              variants={itemVariant}
              className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 lg:p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{role.title}</h3>
                  <p className="text-gray-400 text-sm uppercase tracking-wide">{role.company}</p>
                </div>
                <span className="text-sm font-medium text-gradient-start">{role.period}</span>
              </div>
              <ul className="space-y-2 text-gray-300 leading-relaxed">
                {role.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3">
                    <CheckCircle size={18} className="mt-1 text-gradient-start flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section variants={containerVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <BadgeCheck className="text-gradient-start" size={24} />
          <h2 className="text-3xl font-semibold text-white">Focus Areas</h2>
        </div>
        <motion.div
          variants={listVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {focusAreas.map((area) => (
            <motion.div
              key={area.title}
              variants={itemVariant}
              className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(area.icon, { size: 24, className: 'text-gradient-start' })}
                <h3 className="text-xl font-semibold text-white">{area.title}</h3>
              </div>
              <ul className="space-y-3 text-gray-300 leading-relaxed">
                {area.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-gradient-start text-sm mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section variants={containerVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <LinkIcon className="text-gradient-start" size={24} />
          <h2 className="text-3xl font-semibold text-white">Ecosystem & Tooling</h2>
        </div>
        <div className="rounded-3xl border border-gray-800 bg-gray-900/30 p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {ecosystem.map((group) => (
              <div key={group.category} className="space-y-3">
                <p className="text-sm uppercase tracking-wide text-gray-400">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-full border border-gray-700 text-sm text-gray-200 bg-gray-950/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section variants={containerVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Laptop className="text-gradient-start" size={24} />
          <h2 className="text-3xl font-semibold text-white">Recognitions & Community</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {recognitions.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6"
            >
              <p className="text-sm uppercase tracking-wide text-gray-400">{item.year}</p>
              <h3 className="text-lg font-semibold text-white mt-3 mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.issuer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-8 py-10 lg:px-12 lg:py-14"
      >
        <div className="grid lg:grid-cols-[2fr,1fr] gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-4">Let&apos;s shape your next platform launch.</h2>
            <p className="text-gray-300 leading-relaxed">
              I partner with founders, engineering leaders, and platform teams to deliver adaptive cloud systems, lean
              DevOps practices, and security-first roadmaps. If you are scaling and need a co-pilot who can translate
              ambition into a resilient delivery engine, we should talk.
            </p>
          </div>
          <motion.div className="flex lg:justify-end">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gradient-start to-gradient-end text-black px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              <BriefcaseIcon size={20} />
              Start the Conversation
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
