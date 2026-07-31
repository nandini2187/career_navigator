import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useRouter, navigate } from '@/lib/router';
import { Toaster } from '@/components/ui/Toaster';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';

import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { FeaturesPage } from '@/pages/FeaturesPage';
import { PricingPage } from '@/pages/PricingPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';

const publicRoutes = new Set(['/', '/about', '/features', '/pricing', '/contact', '/login', '/register', '/forgot-password']);
const authRoutes = new Set(['/login', '/register', '/forgot-password']);

function pageMeta(path: string): { title: string; description: string } {
  const meta: Record<string, { title: string; description: string }> = {
    '/': {
      title: 'Career PilotAI — From Learning to Landing Your Dream Career',
      description: 'AI-powered career development platform for engineering students. Personalized roadmaps, mock interviews, resume analysis, and placement readiness tracking.',
    },
    '/about': {
      title: 'About | Career PilotAI',
      description: 'Empowering engineering students with personalized AI-driven career guidance, structured learning pathways, and intelligent mentorship.',
    },
    '/features': {
      title: 'Features | Career PilotAI',
      description: 'AI Career Mentor, smart roadmaps, resume analyzer, AI mock interviews, placement readiness scores, and an opportunities hub — all in one platform.',
    },
    '/pricing': {
      title: 'Pricing | Career PilotAI',
      description: 'Free and premium plans for engineering students. Start free and upgrade for unlimited AI mentorship, advanced interview prep, and placement analytics.',
    },
    '/contact': {
      title: 'Contact | Career PilotAI',
      description: 'Get in touch with the Career PilotAI team for questions, partnerships, or campus inquiries.',
    },
  };
  return meta[path] ?? { title: 'Career PilotAI', description: 'AI-powered career development platform for engineering students.' };
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { path } = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, path]);

  if (loading) {
    return <FullScreenLoader />;
  }
  if (!user) {
    return null;
  }
  return <>{children}</>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && user) navigate('/dashboard');
  }, [user, loading]);
  if (loading) return <FullScreenLoader />;
  return <>{children}</>;
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mesh">
      <Logo />
      <Loader2 className="mt-6 h-7 w-7 animate-spin text-primary-600" />
    </div>
  );
}

function Router() {
  const { path } = useRouter();
  const { loading } = useAuth();

  useEffect(() => {
    const meta = pageMeta(path);
    document.title = meta.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', meta.description);
  }, [path]);

  if (loading && !publicRoutes.has(path)) {
    return <FullScreenLoader />;
  }

  switch (path) {
    case '/':
      return <HomePage />;
    case '/about':
      return <AboutPage />;
    case '/features':
      return <FeaturesPage />;
    case '/pricing':
      return <PricingPage />;
    case '/contact':
      return <ContactPage />;
    case '/login':
      return <AuthRoute><LoginPage /></AuthRoute>;
    case '/register':
      return <AuthRoute><RegisterPage /></AuthRoute>;
    case '/forgot-password':
      return <AuthRoute><ForgotPasswordPage /></AuthRoute>;
    case '/dashboard':
    case '/dashboard/roadmap':
    case '/dashboard/courses':
    case '/dashboard/projects':
    case '/dashboard/billing':
      return <ProtectedRoute><DashboardPage /></ProtectedRoute>;
    case '/profile':
      return <ProtectedRoute><ProfilePage /></ProtectedRoute>;
    case '/settings':
      return <ProtectedRoute><SettingsPage /></ProtectedRoute>;
    default:
      return <NotFound />;
  }
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mesh px-6 text-center">
      <p className="font-display text-7xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-2 text-sm text-ink-500">The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')} className="btn-primary mt-6">
        Back to home
      </button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}
