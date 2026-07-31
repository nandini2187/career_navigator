import { ArrowRight, Play, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { navigate } from '@/lib/router';

const trustBadges = [
  { icon: ShieldCheck, label: 'Privacy-first' },
  { icon: Sparkles, label: 'AI-powered' },
  { icon: TrendingUp, label: 'Proven outcomes' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl animate-pulse-slow" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-accent-400/20 blur-3xl animate-pulse-slow" />

      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/80 px-4 py-1.5 text-xs font-semibold text-primary-700 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Your AI career copilot for engineering
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              From learning to <span className="text-gradient">landing</span> your dream career
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              Career PilotAI is your personalized AI career coach — assessing your skills,
              building a structured roadmap, sharpening your resume, and preparing you for
              interviews, all in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={() => navigate('/register')} className="btn-primary group">
                Start free today
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => navigate('/features')} className="btn-secondary group">
                <Play className="h-4 w-4 text-primary-600" />
                See how it works
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              {trustBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-sm font-medium text-ink-600">
                  <b.icon className="h-4 w-4 text-accent-600" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative">
            <div className="glass-card relative overflow-hidden p-6 lg:p-8">
              <div className="absolute right-4 top-4 flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-error-400" />
                <span className="h-3 w-3 rounded-full bg-warning-400" />
                <span className="h-3 w-3 rounded-full bg-success-400" />
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Placement Readiness
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="font-display text-5xl font-extrabold text-ink-900">78</span>
                  <span className="mb-1.5 text-lg font-semibold text-ink-500">/ 100</span>
                  <span className="mb-1.5 ml-auto inline-flex items-center gap-1 rounded-full bg-success-100 px-2.5 py-1 text-xs font-bold text-success-700">
                    <TrendingUp className="h-3 w-3" /> +12 this week
                  </span>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: '78%' }} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { label: 'Data Structures', value: 85, color: 'bg-primary-500' },
                  { label: 'System Design', value: 64, color: 'bg-accent-500' },
                  { label: 'Resume Strength', value: 92, color: 'bg-success-500' },
                  { label: 'Interview Prep', value: 71, color: 'bg-warning-500' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="mb-1 flex justify-between text-xs font-medium text-ink-600">
                      <span>{s.label}</span>
                      <span>{s.value}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary-100 bg-primary-50/60 p-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm text-ink-700">
                  <span className="font-semibold">AI Mentor tip:</span> Practice 2 more system
                  design problems this week to stay on track.
                </p>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 hidden glass-card animate-float p-4 sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-ink-500">Roadmap progress</p>
                  <p className="text-sm font-bold text-ink-900">On track for placements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
