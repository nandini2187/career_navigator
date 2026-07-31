import { Brain, Target, FileText, MessageSquare, BarChart3, Trophy, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { navigate } from '@/lib/router';

const features = [
  {
    icon: Brain,
    title: 'AI Career Mentor',
    description: 'Personalized career guidance with daily recommendations, career planning, and goal tracking tailored to your branch and aspirations.',
    color: 'from-primary-500 to-primary-700',
    bg: 'bg-primary-50',
  },
  {
    icon: Target,
    title: 'Smart Roadmaps',
    description: 'Get an individualized learning roadmap based on a skill assessment that maps exactly what to learn and when.',
    color: 'from-accent-500 to-accent-700',
    bg: 'bg-accent-50',
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description: 'Upload your resume and receive AI-driven improvement suggestions to make it stand out to recruiters.',
    color: 'from-warning-500 to-warning-700',
    bg: 'bg-warning-50',
  },
  {
    icon: MessageSquare,
    title: 'AI Mock Interviews',
    description: 'Practice with realistic AI-driven interviews and get personalized feedback on your answers and delivery.',
    color: 'from-primary-500 to-accent-500',
    bg: 'bg-primary-50',
  },
  {
    icon: BarChart3,
    title: 'Placement Readiness Score',
    description: 'Track your skill development and portfolio progress with a single actionable readiness score.',
    color: 'from-success-500 to-success-700',
    bg: 'bg-success-50',
  },
  {
    icon: Trophy,
    title: 'Opportunities Hub',
    description: 'Discover recommended internships, certifications, and hackathons matched to your career goals.',
    color: 'from-primary-600 to-primary-800',
    bg: 'bg-primary-50',
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="badge bg-primary-100 text-primary-700">Core Features</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Everything you need to go from student to hired
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            One platform that assesses, guides, prepares, and tracks your journey — powered by AI.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="group glass-card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} shadow-lg`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.description}</p>
                <button
                  onClick={() => navigate('/features')}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
