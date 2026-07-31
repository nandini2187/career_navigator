import { useEffect, useState, type FormEvent } from 'react';
import {
  User,
  Mail,
  GraduationCap,
  Target,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  FolderGit2,
  Save,
  Loader2,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/Toaster';
import type { Profile } from '@/types/database';

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

export function ProfilePage() {
  const { profile, user, refreshProfile } = useAuth();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    branch: '',
    year: '',
    career_goal: '',
    bio: '',
    avatar_url: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        email: profile.email || user?.email || '',
        branch: profile.branch || branches[0],
        year: profile.year || years[0],
        career_goal: profile.career_goal || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
      });
    }
  }, [profile, user]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: form.full_name,
        branch: form.branch,
        year: form.year,
        career_goal: form.career_goal,
        bio: form.bio,
        avatar_url: form.avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);
    setSaving(false);
    if (error) {
      toast('Could not save your profile. Please try again.', 'error');
      return;
    }
    await refreshProfile();
    toast('Profile updated successfully.');
  };

  const initials = (form.full_name || user?.email || 'U')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <DashboardLayout title="Profile" subtitle="Manage your personal information and career goals.">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile summary card */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-3xl font-bold text-white shadow-glow">
              {initials}
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
              {form.full_name || 'Your name'}
            </h3>
            <p className="text-sm text-ink-500">{form.email}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {form.branch && (
                <span className="badge bg-primary-100 text-primary-700">
                  <GraduationCap className="h-3 w-3" /> {form.branch}
                </span>
              )}
              {form.year && (
                <span className="badge bg-accent-100 text-accent-700">
                  <Calendar className="h-3 w-3" /> {form.year}
                </span>
              )}
            </div>
            <div className="mt-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink-600">Placement Readiness</span>
                <span className="font-display text-2xl font-extrabold text-gradient">
                  {profile?.placement_readiness_score ?? 0}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/60">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                  style={{ width: `${profile?.placement_readiness_score ?? 0}%` }}
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-ink-100 bg-white/50 p-3">
                <BookOpen className="mx-auto h-5 w-5 text-primary-600" />
                <p className="mt-1 font-display text-lg font-bold text-ink-900">6</p>
                <p className="text-xs text-ink-500">Courses</p>
              </div>
              <div className="rounded-xl border border-ink-100 bg-white/50 p-3">
                <FolderGit2 className="mx-auto h-5 w-5 text-accent-600" />
                <p className="mt-1 font-display text-lg font-bold text-ink-900">4</p>
                <p className="text-xs text-ink-500">Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="glass-card p-6">
            <h3 className="font-display text-lg font-bold text-ink-900">Edit Profile</h3>
            <p className="text-sm text-ink-500">Update your details and career goals.</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="input-label" htmlFor="full_name">Full name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    id="full_name"
                    className="input-field pl-10"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label className="input-label" htmlFor="email">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    id="email"
                    className="input-field pl-10 bg-ink-50/60"
                    value={form.email}
                    disabled
                  />
                </div>
                <p className="mt-1 text-xs text-ink-400">Email cannot be changed here.</p>
              </div>
              <div>
                <label className="input-label" htmlFor="branch">Branch</label>
                <div className="relative">
                  <GraduationCap className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <select
                    id="branch"
                    className="input-field pl-10"
                    value={form.branch}
                    onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  >
                    {branches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="input-label" htmlFor="year">Year</label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <select
                    id="year"
                    className="input-field pl-10"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="input-label" htmlFor="career_goal">Career goal</label>
                <div className="relative">
                  <Target className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    id="career_goal"
                    className="input-field pl-10"
                    value={form.career_goal}
                    onChange={(e) => setForm({ ...form, career_goal: e.target.value })}
                    placeholder="e.g. Software Engineer at a product company"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="input-label" htmlFor="avatar_url">Avatar URL</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    id="avatar_url"
                    className="input-field pl-10"
                    value={form.avatar_url}
                    onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="input-label" htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  rows={4}
                  className="input-field resize-none"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell us a bit about yourself..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => refreshProfile()} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
