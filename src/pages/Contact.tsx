import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle,
  Cloud,
  Code2,
  Coins,
  Mail,
  MessageSquare,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Workflow,
} from 'lucide-react';
import api from '../lib/api';
import useDocumentTitle from '../hooks/useDocumentTitle';

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const focusAreas = [
  'Multi-cloud migration or modernization',
  'Platform engineering enablement',
  'FinOps telemetry + unit economics',
  'Reliability, observability & incident drills',
  'Fullstack build or UX redesign',
] as const;

type Focus = (typeof focusAreas)[number] | '';

const quickNotes = [
  'We are scaling a SaaS and need a calmer delivery engine.',
  'Looking for FinOps guardrails tied to product metrics.',
  'Need fractional DevOps/SRE leadership for 6 months.',
  'Exploring a fullstack rebuild with automation baked in.',
];

const stats = [
  {
    icon: <Mail className="h-4 w-4 text-gradient-start" />,
    label: 'Best channel',
    value: 'mohammed@zoeencloud.in',
    detail: 'Direct line for briefs, deep dives, and follow-ups.',
  },
  {
    icon: <TimerReset className="h-4 w-4 text-gradient-start" />,
    label: 'Response pace',
    value: '< 12 hours',
    detail: 'Expect a detailed read on fit, process, and next steps.',
  },
  {
    icon: <Phone className="h-4 w-4 text-gradient-start" />,
    label: 'Timezone',
    value: 'Bengaluru · IST (UTC+5:30)',
    detail: 'Collaborating with founders across EMEA, APAC, North America.',
  },
];

const serviceTiles = [
  {
    icon: <Cloud className="h-5 w-5" />,
    title: 'Cloud Architecture',
    summary: 'Blueprint resilient multi-cloud landing zones, global networking, and governance that scales.',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'DevOps & SRE',
    summary: 'GitOps, CI/CD, incident playbooks, and observability pipelines that keep shipping calm.',
  },
  {
    icon: <Coins className="h-5 w-5" />,
    title: 'FinOps & Economics',
    summary: 'Telemetry, dashboards, and unit economics that connect product velocity to cloud spend.',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Fullstack Delivery',
    summary: 'Composable TypeScript stacks, APIs, and customer experiences ready for production.',
  },
];

export default function Contact() {
  useDocumentTitle('Contact — Mohammed Matheen');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    focus: '' as Focus,
    timeline: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timelineOptions = useMemo(
    () => ['Urgent (0-4 weeks)', 'This quarter', 'This half', 'Exploratory / unsure'],
    []
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    try {
      await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        scope: formData.focus,
        timeline: formData.timeline,
        message: formData.message,
      });
      setStatus('success');
      setFormData({ name: '', email: '', company: '', focus: '', timeline: '', message: '' });
    } catch (error: any) {
      console.error('Error:', error);
      const message =
        error?.response?.data?.message || 'Something glitched. Email me directly at mohammed@zoeencloud.in.';
      setErrorMessage(message);
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background-dark via-black to-background-dark pb-20 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-gradient-start/25 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-gradient-end/15 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 rounded-3xl bg-gradient-to-l from-gradient-end/20 via-transparent to-transparent" />
          <div className="grid gap-10 lg:grid-cols-[1.3fr,0.7fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.38em] text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-gradient-start" />
                Collaboration Brief
              </span>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                Tell me about your mission. I’ll help align cloud, DevOps, FinOps, and product delivery so it ships calm.
              </h1>
              <p className="text-sm text-gray-300 sm:text-base">
                Include the outcomes you need, the friction you’re facing, and any critical dates. You’ll get a response
                outlining fit, process, and measurable milestones.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-gray-300 shadow-lg shadow-black/25"
                  >
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-gray-400">
                      {item.icon}
                      {item.label}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs text-gray-400">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-black/50 p-6 text-sm text-gray-200">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Why teams partner</p>
              <ul className="mt-3 space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-gradient-start" />
                  Hands-on engineering plus leadership enablement for teams adopting modern practices.
                </li>
                <li className="flex items-start gap-2">
                  <Coins className="mt-0.5 h-4 w-4 text-gradient-start" />
                  FinOps guardrails wired into delivery metrics, not treated as a finance-only report.
                </li>
                <li className="flex items-start gap-2">
                  <Rocket className="mt-0.5 h-4 w-4 text-gradient-start" />
                  Clear runway, resilient launches, and confidence shipping into new markets.
                </li>
              </ul>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Example starter note</p>
                <p className="mt-2 text-sm text-gray-300">
                  “We’re scaling our SaaS into APAC. Need a multi-cloud rollout blueprint, GitOps delivery, and FinOps
                  guardrails before Q4.”
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <motion.form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="space-y-6 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-xl shadow-black/30 backdrop-blur"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Start with the essentials</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Project details</h2>
                <p className="mt-2 text-sm text-gray-400">
                  Share as much context as possible. I’ll reply with a plan of action or request a short call if needed.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Name
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                    required
                  />
                </label>
                <label className="flex flex-col text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Work email
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                    required
                  />
                </label>
                <label className="flex flex-col text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Company or project
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                  />
                </label>
                <label className="flex flex-col text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Delivery timeline
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(event) => setFormData({ ...formData, timeline: event.target.value })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                  >
                    <option value="">Select</option>
                    {timelineOptions.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Focus area</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {focusAreas.map((option) => {
                    const selected = formData.focus === option;
                    return (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, focus: prev.focus === option ? '' : option }))}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                          selected
                            ? 'border-gradient-start bg-gradient-start/10 text-white shadow-lg shadow-gradient-mid/20'
                            : 'border-white/10 bg-black/50 text-gray-300 hover:border-gradient-start hover:bg-gradient-start/10 hover:text-white'
                        }`}
                      >
                        <span className="pr-6">{option}</span>
                        {selected ? <ShieldCheck className="h-4 w-4 text-gradient-start" /> : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex flex-col text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                Engagement details
                <textarea
                  id="message"
                  autoComplete="off"
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  rows={7}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                  placeholder="Include context, desired outcomes, timelines, and any constraints."
                  required
                />
              </label>

              <div className="grid gap-2 text-xs text-gray-500">
                <p className="uppercase tracking-[0.3em]">Quick inspiration</p>
                <div className="grid gap-2 md:grid-cols-2">
                  {quickNotes.map((note) => (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, message: note }))}
                      className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-left text-[11px] text-gray-300 transition hover:border-gradient-start hover:text-white"
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.99 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-6 py-3 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-background-dark border-r-transparent" />
                    Sending
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
                >
                  <CheckCircle className="h-4 w-4" />
                  Message received! Expect a response with next steps shortly.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errorMessage || 'Something glitched. Email me directly at mohammed@zoeencloud.in.'}
                </motion.div>
              )}

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-gray-400">
                Prefer email?{' '}
                <a href="mailto:mohammed@zoeencloud.in" className="text-white hover:text-gradient-start">
                  mohammed@zoeencloud.in
                </a>
              </div>
            </motion.form>

            <motion.div variants={fade} className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Services in focus</p>
                <div className="mt-4 grid gap-4">
                  {serviceTiles.map((service) => (
                    <div key={service.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start/30 via-gradient-mid/25 to-gradient-end/30 text-white">
                        {service.icon}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{service.title}</p>
                        <p className="mt-1 text-xs text-gray-400">{service.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Working cadence</p>
                <ul className="mt-3 space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 text-gradient-start" />
                    Remote-first collaboration with focused working sessions and async updates.
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageSquare className="mt-0.5 h-4 w-4 text-gradient-start" />
                    Weekly checkpoint summaries covering progress, metrics, and next actions.
                  </li>
                  <li className="flex items-start gap-2">
                    <Rocket className="mt-0.5 h-4 w-4 text-gradient-start" />
                    Emphasis on measurable outcomes—runway saved, velocity gained, incidents reduced.
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
