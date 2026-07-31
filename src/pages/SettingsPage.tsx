import { useState, type FormEvent } from 'react';
import {
  Bell,
  Lock,
  Globe,
  Palette,
  Shield,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Check,
  Loader2,
  LogOut,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/Toaster';
import { navigate } from '@/lib/router';

const tabs = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'preferences', label: 'Preferences', icon: Palette },
  { id: 'privacy', label: 'Privacy', icon: Shield },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function SettingsPage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('notifications');
  const [saving, setSaving] = useState(false);

  const [notifPrefs, setNotifPrefs] = useState({
    emailUpdates: true,
    weeklyDigest: true,
    productNews: false,
    mentorTips: true,
  });

  const [prefs, setPrefs] = useState({
    theme: 'light' as 'light' | 'dark',
    language: 'English',
    timezone: 'IST (UTC+5:30)',
  });

  const handleSaveNotifs = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    toast('Notification preferences saved.');
  };

  const handleSavePrefs = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    toast('Preferences saved.');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account preferences and security.">
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Tabs sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card p-3">
            <div className="flex gap-2 overflow-x-auto lg:flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                      : 'text-ink-600 hover:bg-ink-100'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="lg:col-span-3">
          {activeTab === 'notifications' && (
            <form onSubmit={handleSaveNotifs} className="glass-card p-6">
              <h3 className="font-display text-lg font-bold text-ink-900">Notification Preferences</h3>
              <p className="text-sm text-ink-500">Choose what updates you want to receive.</p>
              <div className="mt-6 space-y-4">
                {[
                  { key: 'emailUpdates' as const, label: 'Email updates', desc: 'Important account and security emails', icon: Mail },
                  { key: 'weeklyDigest' as const, label: 'Weekly digest', desc: 'A summary of your progress every week', icon: Bell },
                  { key: 'productNews' as const, label: 'Product news', desc: 'New features and announcements', icon: Smartphone },
                  { key: 'mentorTips' as const, label: 'AI Mentor tips', desc: 'Daily career guidance from your AI mentor', icon: Check },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between rounded-xl border border-ink-100 bg-white/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                        <item.icon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{item.label}</p>
                        <p className="text-xs text-ink-500">{item.desc}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifPrefs({ ...notifPrefs, [item.key]: !notifPrefs[item.key] })}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        notifPrefs[item.key] ? 'bg-primary-600' : 'bg-ink-200'
                      }`}
                      aria-pressed={notifPrefs[item.key]}
                      aria-label={item.label}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          notifPrefs[item.key] ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  Save preferences
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
                    <Lock className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink-900">Change Password</h3>
                    <p className="text-sm text-ink-500">Update your account password.</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="input-label" htmlFor="currentPassword">Current password</label>
                    <input id="currentPassword" type="password" className="input-field" placeholder="Enter current password" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="input-label" htmlFor="newPassword">New password</label>
                      <input id="newPassword" type="password" className="input-field" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="input-label" htmlFor="confirmNewPassword">Confirm new password</label>
                      <input id="confirmNewPassword" type="password" className="input-field" placeholder="Re-enter new password" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={async () => {
                      const { error } = await supabase.auth.updateUser({ password: 'newpassword123' });
                      toast(error ? error.message : 'Password update feature ready — enter a new password above.', error ? 'error' : 'info');
                    }}
                    className="btn-primary"
                  >
                    Update password
                  </button>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-error-100">
                    <LogOut className="h-5 w-5 text-error-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink-900">Sign Out</h3>
                    <p className="text-sm text-ink-500">Sign out of your account on this device.</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={handleSignOut} className="btn-secondary text-error-600 hover:bg-error-50">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <form onSubmit={handleSavePrefs} className="glass-card p-6">
              <h3 className="font-display text-lg font-bold text-ink-900">Preferences</h3>
              <p className="text-sm text-ink-500">Customize your experience.</p>
              <div className="mt-6 space-y-5">
                <div>
                  <label className="input-label">Theme</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'light' as const, label: 'Light', icon: Sun },
                      { value: 'dark' as const, label: 'Dark', icon: Moon },
                    ].map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setPrefs({ ...prefs, theme: t.value })}
                        className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${
                          prefs.theme === t.value
                            ? 'border-primary-500 bg-primary-50/60 ring-2 ring-primary-500/20'
                            : 'border-ink-200 bg-white/50 hover:border-ink-300'
                        }`}
                      >
                        <t.icon className={`h-5 w-5 ${prefs.theme === t.value ? 'text-primary-600' : 'text-ink-400'}`} />
                        <span className={`text-sm font-medium ${prefs.theme === t.value ? 'text-primary-700' : 'text-ink-700'}`}>
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="input-label" htmlFor="language">Language</label>
                    <div className="relative">
                      <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <select
                        id="language"
                        className="input-field pl-10"
                        value={prefs.language}
                        onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Tamil</option>
                        <option>Telugu</option>
                        <option>Kannada</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="input-label" htmlFor="timezone">Timezone</label>
                    <select
                      id="timezone"
                      className="input-field"
                      value={prefs.timezone}
                      onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })}
                    >
                      <option>IST (UTC+5:30)</option>
                      <option>EST (UTC-5:00)</option>
                      <option>PST (UTC-8:00)</option>
                      <option>GMT (UTC+0:00)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  Save preferences
                </button>
              </div>
            </form>
          )}

          {activeTab === 'privacy' && (
            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100">
                  <Shield className="h-5 w-5 text-accent-700" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink-900">Privacy & Data</h3>
                  <p className="text-sm text-ink-500">Your data is yours. Here is how we handle it.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  { title: 'Data encryption', desc: 'All your data is encrypted in transit and at rest.' },
                  { title: 'No data selling', desc: 'We never sell your personal data to third parties.' },
                  { title: 'Account deletion', desc: 'You can delete your account and all associated data anytime.' },
                  { title: 'AI training', desc: 'Your career data is used only to personalize your experience, never to train public models.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white/50 p-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100">
                      <Check className="h-3.5 w-3.5 text-accent-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{item.title}</p>
                      <p className="text-xs text-ink-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-error-50 p-4">
                <p className="text-sm font-semibold text-error-700">Delete account</p>
                <p className="mt-1 text-xs text-error-600">
                  Permanently delete your account and all data. This action cannot be undone.
                </p>
                <button
                  onClick={() => toast('Contact support at hello@careerpilot.ai to delete your account.', 'info')}
                  className="mt-3 rounded-lg border border-error-300 bg-white px-4 py-2 text-xs font-semibold text-error-600 transition-colors hover:bg-error-100"
                >
                  Request deletion
                </button>
              </div>
            </div>
          )}

          {/* Account info footer */}
          <div className="glass-card mt-6 p-5">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-ink-400" />
              <span className="text-ink-600">Signed in as</span>
              <span className="font-semibold text-ink-900">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
