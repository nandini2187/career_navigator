import { Star, Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Final Year, Computer Science',
    initials: 'AS',
    rating: 5,
    text: 'Career PilotAI completely changed how I prepare for placements. The AI mock interviews felt real, and my readiness score went from 54 to 89 in two months.',
    accent: 'from-primary-500 to-primary-700',
  },
  {
    name: 'Priya Nair',
    role: '3rd Year, Information Technology',
    initials: 'PN',
    rating: 5,
    text: 'The personalized roadmap was a lifesaver. I finally knew what to learn and when. No more jumping between random YouTube tutorials.',
    accent: 'from-accent-500 to-accent-700',
  },
  {
    name: 'Rahul Verma',
    role: 'Fresh Graduate, Electronics',
    initials: 'RV',
    rating: 4,
    text: 'The resume analyzer caught things I never would have noticed. I landed three interviews within a week of updating it based on the AI suggestions.',
    accent: 'from-warning-500 to-warning-700',
  },
];

export function Testimonials() {
  return (
    <section className="bg-mesh py-20 lg:py-28">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="badge bg-accent-100 text-accent-700">Testimonials</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Students love their career copilot
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Real stories from engineering students who found their path with Career PilotAI.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="glass-card flex h-full flex-col p-6">
                <Quote className="h-8 w-8 text-primary-200" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-4 w-4 ${idx < t.rating ? 'fill-warning-400 text-warning-400' : 'text-ink-200'}`}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.accent} text-sm font-bold text-white`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
