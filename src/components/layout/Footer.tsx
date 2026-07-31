import { Github, Linkedin, Twitter, Rocket } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { navigate } from '@/lib/router';

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', path: '/features' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Roadmap', path: '/features' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: '/about' },
      { label: 'Blog', path: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', path: '/features' },
      { label: 'Help Center', path: '/contact' },
      { label: 'Community', path: '/about' },
      { label: 'Status', path: '/about' },
    ],
  },
];

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />

      <div className="container-px relative py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo textClass="text-white" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-400">
              From learning to landing your dream career. The AI-powered career development
              ecosystem built for engineering students.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-300 transition-all hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-white"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white">{section.title}</h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-ink-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-ink-500">
            &copy; {new Date().getFullYear()} Career PilotAI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <Rocket className="h-4 w-4 text-accent-400" />
            <span>Empowering engineers, one career at a time.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
