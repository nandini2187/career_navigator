import { useState, type FormEvent, type ReactNode } from 'react';
import { Rocket, ArrowLeft, Check } from 'lucide-react';
import { navigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/Toaster';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden overflow-hidden bg-mesh-dark lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary-600/30 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />

        <div className="relative">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-extrabold tracking-tight text-white">
              Career<span className="text-gradient-light">Pilot</span>AI
            </span>
          </button>
        </div>

        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white">
            From learning to <br />
            <span className="text-gradient-light">landing your dream career.</span>
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              'AI-powered personalized roadmaps',
              'Mock interviews with real-time feedback',
              'Placement readiness tracking',
              'Resume analysis and optimization',
            ].map((point) => (
              <li key={point} className="flex items-center gap-3 text-ink-200">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-500/20">
                  <Check className="h-3.5 w-3.5 text-accent-400" />
                </div>
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative text-xs text-ink-500">
          &copy; {new Date().getFullYear()} Career PilotAI. Empowering engineers, one career at a time.
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex min-h-screen items-center justify-center bg-mesh px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <button onClick={() => navigate('/')} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>

          <div className="glass-card p-8">
            <h1 className="font-display text-2xl font-extrabold text-ink-900">{title}</h1>
            <p className="mt-1.5 text-sm text-ink-600">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>

          <div className="mt-6 text-center text-sm text-ink-600">{footer}</div>
        </div>
      </div>
    </div>
  );
}

export function useAuthForm() {
  const [loading, setLoading] = useState(false);
  return { loading, setLoading };
}

export function AuthError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="mb-4 rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700">
      {message}
    </div>
  );
}

export function AuthSubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
      {loading ? 'Please wait...' : label}
    </button>
  );
}

// Re-export the hook for convenience in pages
export { useAuth };
