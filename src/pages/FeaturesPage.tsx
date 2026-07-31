import { Brain, Target, FileText, MessageSquare, BarChart3, Trophy, Compass, Map, LineChart, Bell, Users, Sparkles, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Reveal';
import { CTA } from '@/components/home/CTA';
import { navigate } from '@/lib/router';

const featureGroups = [
  {
    icon: Brain,
    title: 'AI Career Mentor',
    tagline: 'Your always-on career copilot',
    description: 'Personalized career guidance, daily recommendations, career planning, and goal tracking — all powered by AI that learns about you.',
    items: [
      'Personalized career guidance based on your branch and goals',
      'Daily recommendations on what to learn and practice',
      'Long-term career planning with milestone tracking',
      'Goal tracking with smart nudges to keep you on pace',
    ],
    accent: 'from-primary-500 to-primary-700',
  },
  {
    icon: Target,
    title: 'Smart Roadmaps',
    tagline: 'A structured path, not chaos',
    description: 'Get an individualized learning roadmap after a quick skill assessment. Know exactly what to learn, in what order, and why.',
    items: [
      'Skill assessment that maps your current strengths and gaps',
      'Individualized roadmap that adapts as you progress',
      'Recommended projects based on your career goals',
      'Progress tracking across every skill and milestone',
    ],
    accent: 'from-accent-500 to-accent-700',
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    tagline: 'Make recruiters say yes',
    description: 'Upload your resume and get AI-driven improvement suggestions that make it stand out to recruiters and pass ATS filters.',
    items: [
      'AI-driven resume analysis with actionable fixes',
      'Keyword and skills gap detection for target roles',
      'Formatting and impact suggestions',
      'Versioned resume history to track improvements',
    ],
    accent: 'from-warning-500 to-warning-700',
  },
  {
    icon: MessageSquare,
    title: 'AI Mock Interviews',
    tagline: 'Practice until it feels easy',
    description: 'Conduct realistic AI-driven mock interviews and get personalized feedback on your answers, structure, and delivery.',
    items: [
      'Role-specific mock interviews for your target career',
      'Personalized feedback on every answer',
      'Behavioral and technical interview modes',
      'Performance trends over time',
    ],
    accent: 'from-primary-600 to-accent-500',
  },
  {
    icon: BarChart3,
    title: 'Placement Readiness Score',
    tagline: 'Always know where you stand',
    description: 'A single, actionable score that combines your skills, projects, resume, and interview performance into one metric.',
    items: [
      'Composite score updated as you complete activities',
      'Breakdown by skill area so you know what to fix',
      'Weekly trends and improvement insights',
      'Benchmark against typical placement readiness',
    ],
    accent: 'from-success-500 to-success-700',
  },
  {
    icon: Trophy,
    title: 'Opportunities Hub',
    tagline: 'Internships, certifications, hackathons',
    description: 'Discover recommended opportunities matched to your career goals and readiness — so you apply to the right things at the right time.',
    items: [
      'Personalized internship recommendations',
      'Certification suggestions for your target roles',
      'Hackathon matching based on your skills',
      'Application tracking in one place',
    ],
    accent: 'from-primary-500 to-primary-800',
  },
];

const extraCapabilities = [
  { icon: Compass, label: 'Career path discovery' },
  { icon: Map, label: 'Branch-aware roadmaps' },
  { icon: LineChart, label: 'Skill progress charts' },
  { icon: Bell, label: 'Smart notifications' },
  { icon: Users, label: 'College dashboards' },
  { icon: Sparkles, label: 'Daily AI tips' },
];

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main>
        <section className="bg-mesh pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="container-px">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="badge bg-primary-100 text-primary-700">Features</span>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
                One platform. <span className="text-gradient">Every step</span> of your career journey.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">
                From assessing your skills to landing your dream job — Career PilotAI covers
                the entire journey with AI-powered tools built for engineering students.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-px space-y-16">
            {featureGroups.map((g, i) => (
              <Reveal key={g.title}>
                <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
                  <div>
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${g.accent} shadow-lg`}>
                      <g.icon className="h-7 w-7 text-white" />
                    </div>
                    <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-400">{g.tagline}</p>
                    <h2 className="mt-1 font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">{g.title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-ink-600">{g.description}</p>
                    <ul className="mt-6 space-y-3">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100">
                            <Check className="h-3.5 w-3.5 text-accent-700" />
                          </div>
                          <span className="text-sm text-ink-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-card relative overflow-hidden p-8">
                    <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${g.accent} opacity-10 blur-2xl`} />
                    <div className="relative space-y-4">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="flex items-center gap-4 rounded-xl border border-ink-100 bg-white/60 p-4">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${g.accent}`}>
                            <g.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2.5 w-3/4 rounded-full bg-ink-200" />
                            <div className="mt-2 h-2 w-1/2 rounded-full bg-ink-100" />
                          </div>
                          <div className={`h-8 w-16 rounded-lg bg-gradient-to-br ${g.accent} opacity-80`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Extra capabilities */}
        <section className="bg-ink-950 py-16 text-white">
          <div className="container-px">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">And so much more</h2>
              <p className="mt-3 text-ink-400">Thoughtful capabilities woven throughout the platform.</p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extraCapabilities.map((c, i) => (
                <Reveal key={c.label} delay={i * 60}>
                  <div className="glass-dark flex items-center gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                      <c.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-ink-200">{c.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button onClick={() => navigate('/register')} className="btn-accent">
                Start your journey free
              </button>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
