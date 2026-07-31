import { useState, type FormEvent, useEffect } from 'react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AuthShell, AuthError, AuthSubmitButton } from '@/components/auth/AuthShell';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Forgot Password | Career PilotAI';
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: resetError } = await resetPassword(email);
    setLoading(false);
    if (resetError) {
      setError(resetError);
      return;
    }
    setSent(true);
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we will send you a reset link."
      footer={
        <>
          Remembered your password?{' '}
          <button onClick={() => navigate('/login')} className="font-semibold text-primary-600 hover:text-primary-700">
            Back to login
          </button>
        </>
      }
    >
      {sent ? (
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100">
            <CheckCircle2 className="h-8 w-8 text-accent-600" />
          </div>
          <h3 className="mt-5 font-display text-lg font-bold text-ink-900">Check your inbox</h3>
          <p className="mt-2 text-sm text-ink-600">
            We have sent a password reset link to <span className="font-semibold text-ink-900">{email}</span>.
            Follow the link to reset your password.
          </p>
          <button onClick={() => navigate('/login')} className="btn-secondary mt-6 w-full">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </button>
        </div>
      ) : (
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
          <AuthSubmitButton loading={loading} label="Send reset link" />
        </form>
      )}
    </AuthShell>
  );
}
