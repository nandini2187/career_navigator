import { useState } from 'react';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Reveal';
import { navigate } from '@/lib/router';

const plans = [
  {
    name: 'Free',
    icon: Sparkles,
    price: { monthly: 0, yearly: 0 },
    description: 'Everything you need to get started on your career journey.',
    cta: 'Start free',
    accent: 'from-ink-400 to-ink-600',
    features: [
      'Career assessment',
      'Basic learning roadmap',
      'Resume builder',
      'Limited AI chats (10 / month)',
      'Placement readiness score',
    ],
  },
  {
    name: 'Premium',
    icon: Crown,
    price: { monthly: 499, yearly: 4990 },
    description: 'For students serious about landing their dream career.',
    cta: 'Go Premium',
    accent: 'from-primary-500 to-accent-500',
    popular: true,
    features: [
      'Everything in Free',
      'Unlimited AI mentor',
      'Advanced interview preparation',
      'AI resume optimization',
      'Premium roadmaps',
      'Placement analytics',
      'Priority opportunity matching',
    ],
  },
  {
    name: 'Campus',
    icon: Zap,
    price: { monthly: 199, yearly: 1990 },
    description: 'For colleges and placement cells tracking students at scale.',
    cta: 'Contact sales',
    accent: 'from-warning-500 to-warning-700',
    features: [
      'Everything in Premium',
      'College-wide dashboards',
      'Bulk student onboarding',
      'Placement analytics for institutions',
      'Dedicated support',
    ],
  },
];

const comparison = [
  { feature: 'Career assessment', free: true, premium: true, campus: true },
  { feature: 'Basic roadmap', free: true, premium: true, campus: true },
  { feature: 'Resume builder', free: true, premium: true, campus: true },
  { feature: 'AI chats', free: '10 / month', premium: 'Unlimited', campus: 'Unlimited' },
  { feature: 'Advanced interview prep', free: false, premium: true, campus: true },
  { feature: 'Resume optimization', free: false, premium: true, campus: true },
  { feature: 'Premium roadmaps', free: false, premium: true, campus: true },
  { feature: 'Placement analytics', free: false, premium: true, campus: true },
  { feature: 'College dashboards', free: false, premium: false, campus: true },
  { feature: 'Priority support', free: false, premium: false, campus: true },
];

export function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main>
        <section className="bg-mesh pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="container-px">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="badge bg-primary-100 text-primary-700">Pricing</span>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
                Simple pricing. <span className="text-gradient">Serious outcomes.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">
                Start free and upgrade when you are ready. No hidden fees, cancel anytime.
              </p>

              {/* Billing toggle */}
              <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white/70 p-1 backdrop-blur">
                <button
                  onClick={() => setBilling('monthly')}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    billing === 'monthly' ? 'bg-primary-600 text-white shadow' : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling('yearly')}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    billing === 'yearly' ? 'bg-primary-600 text-white shadow' : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  Yearly
                  <span className="ml-1.5 rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold text-accent-700">
                    2 months free
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Plans */}
        <section className="py-12 lg:py-16">
          <div className="container-px">
            <div className="grid gap-6 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 100}>
                  <div
                    className={`glass-card relative h-full p-7 ${
                      plan.popular ? 'ring-2 ring-primary-500 shadow-glass-lg' : ''
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                        Most popular
                      </span>
                    )}
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${plan.accent} shadow-lg`}>
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-ink-900">{plan.name}</h3>
                    <p className="mt-1 text-sm text-ink-500">{plan.description}</p>
                    <div className="mt-5 flex items-end gap-1">
                      <span className="font-display text-4xl font-extrabold text-ink-900">
                        &#8377;{billing === 'monthly' ? plan.price.monthly : Math.round(plan.price.yearly / 12)}
                      </span>
                      <span className="mb-1.5 text-sm text-ink-500">/month</span>
                    </div>
                    {billing === 'yearly' && plan.price.yearly > 0 && (
                      <p className="mt-1 text-xs text-ink-400">Billed &#8377;{plan.price.yearly}/year</p>
                    )}
                    <button
                      onClick={() => navigate(plan.name === 'Campus' ? '/contact' : '/register')}
                      className={`mt-6 w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <ul className="mt-7 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100">
                            <Check className="h-3.5 w-3.5 text-accent-700" />
                          </div>
                          <span className="text-sm text-ink-700">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-12 lg:py-20">
          <div className="container-px">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900">
                Compare plans in detail
              </h2>
            </Reveal>
            <Reveal className="mt-10">
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink-100 bg-white/50">
                        <th className="px-6 py-4 font-semibold text-ink-900">Feature</th>
                        <th className="px-6 py-4 text-center font-semibold text-ink-900">Free</th>
                        <th className="px-6 py-4 text-center font-semibold text-primary-700">Premium</th>
                        <th className="px-6 py-4 text-center font-semibold text-ink-900">Campus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.map((row) => (
                        <tr key={row.feature} className="border-b border-ink-50 last:border-0">
                          <td className="px-6 py-4 font-medium text-ink-700">{row.feature}</td>
                          <td className="px-6 py-4 text-center">
                            {typeof row.free === 'boolean' ? (
                              row.free ? <Check className="mx-auto h-5 w-5 text-accent-600" /> : <span className="text-ink-300">&ndash;</span>
                            ) : (
                              <span className="text-xs font-medium text-ink-600">{row.free}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center bg-primary-50/40">
                            {typeof row.premium === 'boolean' ? (
                              row.premium ? <Check className="mx-auto h-5 w-5 text-accent-600" /> : <span className="text-ink-300">&ndash;</span>
                            ) : (
                              <span className="text-xs font-semibold text-primary-700">{row.premium}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof row.campus === 'boolean' ? (
                              row.campus ? <Check className="mx-auto h-5 w-5 text-accent-600" /> : <span className="text-ink-300">&ndash;</span>
                            ) : (
                              <span className="text-xs font-medium text-ink-600">{row.campus}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
