import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const faqs = [
  {
    q: 'Who is Career PilotAI for?',
    a: 'Engineering students from 1st to 4th year, fresh graduates, diploma students transitioning into engineering, and anyone preparing for placements across CS, AI, Data Science, IT, Electronics, Electrical, Mechanical, Civil, and more.',
  },
  {
    q: 'How does the AI career mentor work?',
    a: 'After a short skill and interest assessment, our AI builds a personalized roadmap, suggests projects, analyzes your resume, conducts mock interviews, and tracks your placement readiness — updating recommendations daily.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes. The free plan includes career assessment, a basic roadmap, the resume builder, and limited AI chats. Premium unlocks unlimited AI mentorship, advanced interview prep, resume optimization, premium roadmaps, and placement analytics.',
  },
  {
    q: 'Do I need any prior experience?',
    a: 'Not at all. Career PilotAI meets you where you are — whether you are a first-year student exploring options or a final-year student racing toward placements.',
  },
  {
    q: 'Can my college track my progress?',
    a: 'Yes. Institutions can use dashboards to monitor student progress at scale, helping placement cells identify who needs support and when.',
  },
  {
    q: 'How accurate is the placement readiness score?',
    a: 'The score combines your skill assessments, project progress, resume strength, and interview performance into one actionable metric. It updates as you complete activities so you always know where you stand.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="badge bg-primary-100 text-primary-700">FAQ</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Questions, answered
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Everything you need to know before you take off.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-ink-900">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-ink-500 transition-transform duration-300 ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
