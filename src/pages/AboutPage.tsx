import { Target, Eye, Heart, Users, GraduationCap, Lightbulb, ShieldCheck, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Reveal';
import { Stats } from '@/components/home/Stats';
import { CTA } from '@/components/home/CTA';

const values = [
  { icon: Users, title: 'Student-first', description: 'Every decision starts with what helps students succeed.' },
  { icon: Lightbulb, title: 'Innovation-driven', description: 'We use AI not as a buzzword, but as a real career copilot.' },
  { icon: ShieldCheck, title: 'Trust & Privacy', description: 'Your data is yours. We protect it and never sell it.' },
  { icon: TrendingUp, title: 'Outcomes over hype', description: 'We measure success by placements, not vanity metrics.' },
];

const team = [
  { name: 'Aditya Rao', role: 'Founder & CEO', initials: 'AR', accent: 'from-primary-500 to-primary-700' },
  { name: 'Sneha Iyer', role: 'Head of AI', initials: 'SI', accent: 'from-accent-500 to-accent-700' },
  { name: 'Karan Mehta', role: 'Lead Product Designer', initials: 'KM', accent: 'from-warning-500 to-warning-700' },
  { name: 'Divya Joshi', role: 'Head of Partnerships', initials: 'DJ', accent: 'from-primary-600 to-accent-500' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-mesh pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="container-px">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="badge bg-primary-100 text-primary-700">About Us</span>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
                We are building the world&rsquo;s most trusted <span className="text-gradient">AI career ecosystem</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">
                Career PilotAI exists to empower every engineering student with personalized,
                AI-driven career guidance — so no one has to navigate their future alone.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Mission / Vision / Problem */}
        <section className="py-20 lg:py-24">
          <div className="container-px">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  tag: 'Our Mission',
                  title: 'Empower every engineering student',
                  body: 'To empower engineering students with personalized AI-driven career guidance, structured learning pathways, industry-ready skill development, and intelligent mentorship.',
                  accent: 'from-primary-500 to-primary-700',
                },
                {
                  icon: Eye,
                  tag: 'Our Vision',
                  title: 'The most trusted career ecosystem',
                  body: 'To become the world\u2019s most trusted AI-powered career development ecosystem, transforming how students learn, prepare, and transition into successful professional careers.',
                  accent: 'from-accent-500 to-accent-700',
                },
                {
                  icon: Heart,
                  tag: 'Why We Exist',
                  title: 'The problem we solve',
                  body: 'Graduates remain unemployed despite having degrees. Companies struggle to find job-ready candidates. Students spend on multiple platforms without a structured roadmap.',
                  accent: 'from-warning-500 to-warning-700',
                },
              ].map((c, i) => (
                <Reveal key={c.tag} delay={i * 100}>
                  <div className="glass-card h-full p-7">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.accent} shadow-lg`}>
                      <c.icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-400">{c.tag}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink-900">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-ink-950 py-20 text-white lg:py-24">
          <div className="container-px">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="badge bg-white/10 text-accent-300">Our Values</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                What we stand for
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div className="glass-dark h-full rounded-2xl p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
                      <v.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm text-ink-300">{v.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Stats />

        {/* Team */}
        <section className="py-20 lg:py-24">
          <div className="container-px">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="badge bg-accent-100 text-accent-700">Our Team</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                The people behind the cockpit
              </h2>
              <p className="mt-4 text-lg text-ink-600">
                Engineers, educators, and designers united by one mission.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <Reveal key={m.name} delay={i * 80}>
                  <div className="glass-card flex flex-col items-center p-6 text-center">
                    <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${m.accent} text-xl font-bold text-white shadow-lg`}>
                      {m.initials}
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-ink-900">{m.name}</h3>
                    <p className="mt-1 text-sm text-ink-500">{m.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
