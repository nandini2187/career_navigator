import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { navigate, useRouter } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Features', path: '/features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const { path } = useRouter();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  const go = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-glass' : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <a href="#/" onClick={go('/')} aria-label="Career PilotAI home">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={`#${link.path}`}
              onClick={go(link.path)}
              className={`nav-link after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-primary-600 after:transition-all after:duration-300 ${
                path === link.path ? 'text-ink-900 after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <button onClick={() => navigate('/dashboard')} className="btn-primary">
              Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="btn-ghost">
                Log in
              </button>
              <button onClick={() => navigate('/register')} className="btn-primary">
                Get started
              </button>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-ink-700 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="glass border-t border-white/40 md:hidden">
          <div className="container-px flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={`#${link.path}`}
                onClick={go(link.path)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
                  path === link.path ? 'bg-primary-50 text-primary-700' : 'text-ink-700 hover:bg-ink-100'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-3 border-t border-ink-200 pt-3">
              {user ? (
                <button onClick={() => navigate('/dashboard')} className="btn-primary flex-1">
                  Dashboard
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="btn-secondary flex-1">
                    Log in
                  </button>
                  <button onClick={() => navigate('/register')} className="btn-primary flex-1">
                    Get started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
