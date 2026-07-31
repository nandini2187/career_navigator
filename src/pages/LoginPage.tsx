import { useState, type FormEvent, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthShell, AuthError, AuthSubmitButton } from '@/components/auth/AuthShell';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';
import { toast } from '@/components/ui/Toaster';

export function LoginPage() {
  const { signIn, session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navigate('/dashboard');
  }, [session]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);
    if (signInError) {
      setError(signInError);
      return;
    }
    toast('Welcome back! Taking you to your dashboard.');
    navigate('/dashboard');
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue piloting your career."
      footer={
        <>
          Don&rsquo;t have an account?{' '}
          <button onClick={() => navigate('/register')} className="font-semibold text-primary-600 hover:text-primary-700">
            Create one free
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <AuthError message={error} />
        <div>
          <label className="input-label" htmlFor="email">Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              id="email"
              type="email"
              className="input-field pl-10"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <label className="input-label" htmlFor="password">Password</label>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="mb-1.5 text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="input-field pl-10 pr-10"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <AuthSubmitButton loading={loading} label="Log in" />
      </form>
    </AuthShell>
  );
}
