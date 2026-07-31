import { CheckCircle2, Compass, Map, Award } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const benefits = [
  {
    icon: Compass,
    title: 'Clarity on your career path',
    description: 'Stop guessing. Our AI assesses your interests and skills to recommend the right career direction.',
  },
  {
    icon: Map,
    title: 'A structured roadmap, not chaos',
    description: 'No more scattered resources. Follow a clear, step-by-step path from where you are to where you want to be.',
  },
  {
    icon: Award,
    title: 'Industry-ready skills',
    description: 'Bridge the gap between your college curriculum and what companies actually expect from graduates.',
  },
  {
    icon: CheckCircle2,
    title: 'Confidence in interviews',
    description: 'Walk into interviews prepared. Practice with AI mock interviews and get actionable feedback.',
  },
];

export function Benefits() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-primary-600/30 blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />

      <div className="container-px relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="badge bg-white/10 text-accent-300">Why Career PilotAI</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              The problem is real. <br />
              <span className="text-gradient-light">The solution is here.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-300">
              Engineering graduates face a broken journey — scattered information, skill
              mismatches, and late preparation. Career PilotAI fixes that by being the
              personalized coach every student deserves.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'No more uncertainty about choosing the right career path',
                'Stop spending on multiple platforms without a roadmap',
                'Never start preparing too late again',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                  <span className="text-sm text-ink-200">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <div className="glass-dark h-full rounded-2xl p-6 transition-all duration-300 hover:border-primary-500/40">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
                    <b.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-white">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{b.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
