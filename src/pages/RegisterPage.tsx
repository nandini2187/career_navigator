import { useState, type FormEvent, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { AuthShell, AuthError, AuthSubmitButton } from '@/components/auth/AuthShell';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';
import { toast } from '@/components/ui/Toaster';

const branches = [
  'Computer Science',
  'Artificial Intelligence',
  'Data Science',
  'Information Technology',
  'Electronics & Communication',
  'Electrical',
  'Mechanical',
  'Civil',
  'Other',
];

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];

export function RegisterPage() {
  const { signUp, session } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    branch: branches[0],
    year: years[0],
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navigate('/dashboard');
  }, [session]);

  const passwordChecks = [
    { label: 'At least 8 characters', ok: form.password.length >= 8 },
    { label: 'Passwords match', ok: !!form.confirmPassword && form.password === form.confirmPassword },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    const { error: signUpError } = await signUp(form.email, form.password, form.fullName);
    setLoading(false);
    if (signUpError) {
      setError(signUpError);
      return;
    }
    toast('Account created! Welcome to Career PilotAI.');
    navigate('/dashboard');
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your personalized career journey in seconds."
      footer={
        <>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="font-semibold text-primary-600 hover:text-primary-700">
            Log in
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <AuthError message={error} />
        <div>
          <label className="input-label" htmlFor="fullName">Full name</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              id="fullName"
              className="input-field pl-10"
              placeholder="Your name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
              autoComplete="name"
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="input-label" htmlFor="email">Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              id="email"
              type="email"
              className="input-field pl-10"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="input-label" htmlFor="branch">Branch</label>
            <select
              id="branch"
              className="input-field"
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
            >
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="input-label" htmlFor="year">Year</label>
            <select
              id="year"
              className="input-field"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <label className="input-label" htmlFor="password">Password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="input-field pl-10 pr-10"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              autoComplete="new-password"
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
        <div className="mt-5">
          <label className="input-label" htmlFor="confirmPassword">Confirm password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              className="input-field pl-10"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
              autoComplete="new-password"
            />
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          {passwordChecks.map((c) => (
            <div key={c.label} className={`flex items-center gap-2 text-xs ${c.ok ? 'text-accent-700' : 'text-ink-400'}`}>
              <Check className={`h-3.5 w-3.5 ${c.ok ? 'text-accent-600' : 'text-ink-300'}`} />
              {c.label}
            </div>
          ))}
        </div>
        <AuthSubmitButton loading={loading} label="Create account" />
        <p className="mt-4 text-center text-xs text-ink-400">
          By creating an account, you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  );
}
